/**
 * Step 4: Advanced Branching & Jump Handling
 */

import type { ArithmeticProgram } from "../types/AST_expr.ts";
import type { IR_EvalNode, IR_NodeChain } from "../types/IR_node.ts";
import type { BranchId } from "../types/types.ts";
import { NodeFlowBuilder } from "./ir_gia_step3.ts";

// 扩展 NodeFlowBuilder 的原型或子类方法

export class AdvancedNodeFlowBuilder extends NodeFlowBuilder {

  // 用于生成 Jump(0) 的唯一虚拟 Anchor ID
  private _jumpAnchorCounter = 0;
  private getNextJumpAnchorId() {
    return `__virtual_jump_0_${this._jumpAnchorCounter++}`;
  }

  /**
   * [Override] 递归处理节点链 (增强 Jump 支持)
   */
  protected processChain(
    chains: IR_NodeChain[],
    flowSourceId: string | null,
    flowSourcePort: string
  ) {
    let lastNodeId = flowSourceId;
    let lastPort = flowSourcePort;

    for (const chainObj of chains) {
      for (const node of chainObj.chain) {

        // --- A. Anchor 处理 ---
        if (node.kind === "anchor") {
          // 标记 Active Anchor，但不立即注册 (因为具体的 NodeId 还没生成)
          // 等到下面 processCallNode 生成 nodeId 后，会调用 ctx.registerAnchor
          this.ctx["_activeAnchorId"] = node.id;
          continue;
        }

        // --- B. Jump 处理 (无节点化) ---
        if (node.kind === "jump") {
          // 逻辑：
          // 当前流 (lastNodeId) -> 应该直接连向 -> Jump Target
          // 我们不再生成 Sys.Jump 节点。

          if (lastNodeId) {
            let targetAnchorId = node.id;

            // 处理 Jump(0): 转换为虚拟 Anchor ID
            if (node.id === 0) {
              const implicitTarget = this.ctx.getCurrentJumpTarget();
              if (implicitTarget) {
                targetAnchorId = implicitTarget;
              } else {
                console.warn("Jump(0) invalid context");
              }
            }

            // 核心修正：不连线，而是添加到 Pending 列表
            // 因为目标 NodeId 可能未知
            // 如果目标已知 (后向跳转)，ctx 内部可以直接优化处理，或者统一由 resolvePendingJumps 处理
            this.ctx.addPendingJump(lastNodeId, lastPort, targetAnchorId);
          }

          // 中断当前线性流
          lastNodeId = null;
          break;
        }

        // --- C. CallNode 处理 ---
        if (node.kind === "call") {
          // 1. 准备 Jump(0) 的回填锚点 (Context Push)
          let virtualExitId: string | null = null;
          if (node.branches && node.branches.length > 0) {
            virtualExitId = this.getNextJumpAnchorId();
            this.ctx.pushJumpTarget(virtualExitId);
          }

          // 2. 实例化节点
          const nodeId = this.processCallNode(node);

          // 3. 恢复上下文 (Context Pop)
          if (virtualExitId) {
            this.ctx.popJumpTarget();
            // 将 virtualExitId 存入 pendingNextNodeAnchor，
            // 意味着：Chain 中 *下一个* 生成的节点，将承担这个 virtualExitId
            this.ctx["_pendingNextNodeAnchor"] = virtualExitId;
          }

          // 4. [关键] 注册 Anchor
          //    如果当前节点对应 IR 中的 Anchor，或者对应 Jump(0) 的回填 Anchor
          //    这里调用 ctx.registerAnchor，会自动触发 flow 连接 (Pending Jumps)

          // 处理自身的 IR Anchor
          if (this.ctx["_activeAnchorId"] !== undefined) {
            this.ctx.registerAnchor(this.ctx["_activeAnchorId"], nodeId);
            delete this.ctx["_activeAnchorId"];
          }

          // 处理 Jump(0) 的回填 Anchor (来自上一个节点的 Branch)
          if (this.ctx["_pendingNextNodeAnchor"]) {
            this.ctx.registerAnchor(this.ctx["_pendingNextNodeAnchor"], nodeId);
            delete this.ctx["_pendingNextNodeAnchor"];
          }

          // 5. 线性流连接
          if (lastNodeId) {
            this.graph.flow(lastNodeId, nodeId, lastPort, "in");
          }

          lastNodeId = nodeId;
          lastPort = "default";
        }

        // --- D. EvalNode 处理 (无节点化 Const) ---
        else if (node.kind === "eval") {
          this.processEvalNode(node);
          // Eval 不改变 lastNodeId
        }

        // ... BranchNode 处理类似 CallNode
      }
    }
  }

  /**
   * [Override] 处理 EvalNode: 完整支持变量声明与 Return
   */
  protected processEvalNode(node: IR_EvalNode) {
    // 1. 确定 Lambda 类型
    if (node.lambda && typeof node.lambda === 'object' && node.lambda.type === 'ArithmeticProgram') {
      const program = node.lambda as ArithmeticProgram;

      program.body.forEach(stmt => {
        if (stmt.type === 'VariableDeclaration') {
          const res = this.expander.resolveExprInfo(stmt.init);

          if (res.kind === "value") {
            // [修正] 不生成 Sys.Const 节点，直接注册值
            this.ctx.registerVarValue(stmt.identifier, res.val, res.type);
          } else {
            this.ctx.registerVarSource(stmt.identifier, res.info.nodeId, res.info.port, res.info.type);
          }
          this.ctx.checkTypeMatch(stmt.var_type, res.type, stmt.identifier);
        }

        if (stmt.type === 'ReturnStatement') {
          if (node.outputs.length > 0) {
            const outputArg = node.outputs[0];
            const res = this.expander.resolveExprInfo(stmt.argument as any);

            if (outputArg.name) {
              if (res.kind === "value") {
                // [修正] 直接注册值
                this.ctx.registerVarValue(outputArg.name, res.val, res.type);
              } else {
                this.ctx.registerVarSource(outputArg.name, res.info.nodeId, res.info.port, res.info.type);
              }
            }
          }
        }
      });
    } else {
      // ... Single expression handling similar to above
      // 简单的 ASTExpr (Single Expression) -> 视为 return expr
      if (node.outputs.length > 0 && node.lambda) {
        const res = this.expander.resolveExprInfo(node.lambda as any);
        const outputArg = node.outputs[0];
        if (outputArg.name) {
          if (res.kind === "value") {
            this.ctx.registerVarValue(outputArg.name, res.val, res.type);
          } else {
            this.ctx.registerVarSource(outputArg.name, res.info.nodeId, res.info.port, res.info.type);
          }
        }
      }
    }
  }
}