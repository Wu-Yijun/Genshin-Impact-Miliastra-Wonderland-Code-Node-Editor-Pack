/**
 * Step 4: Advanced Branching & Jump Handling
 */

import { ArithmeticProgram } from "../types/AST_expr.ts";
import { IR_EvalNode, IR_NodeChain } from "../types/IR_node.ts";
import { BranchId } from "../types/types.ts";
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

        // 1. 检查是否有 pending 的 Jump(0) 需要汇入当前节点
        // 如果上一个节点是 CallNode，且它创建了虚拟 Anchor 等待后续节点
        if (this.ctx["_pendingNextNodeAnchor"]) {
          // 当前生成的节点 node (即将生成) 将是这些 Jump(0) 的目标
          // 我们将在生成具体节点 ID 后立即注册
        }

        // --- Anchor 处理 ---
        if (node.kind === "anchor") {
          this.ctx["_activeAnchorId"] = node.id;
          continue;
        }

        // --- Jump 处理 (核心更新) ---
        if (node.kind === "jump") {
          const jumpNodeId = this.graph.add_node({ kind: "jump", identifier: "Sys.Jump", target: node.id });

          if (lastNodeId) {
            this.graph.flow(lastNodeId, jumpNodeId, lastPort, "in");
          }

          // 解析跳转目标
          let targetAnchorId: BranchId | undefined = node.id;

          // Case: Jump(0) -> 跳回最近父级的 Next
          if (node.id === 0) {
            targetAnchorId = this.ctx.getCurrentJumpTarget();
            if (!targetAnchorId) {
              console.warn(`[FlowWarning] Jump(0) used outside of a branch context.`);
              targetAnchorId = undefined; // 悬空或非法
            }
          }

          // 建立 Jump 连线
          if (targetAnchorId !== undefined) {
            // 这里的 flow 是逻辑上的跳转流，目标是 Anchor 指向的节点
            // Graph API 可能支持直接 flow 到 anchorId (如果引擎支持)，
            // 或者我们需要在 Context 中查找 Anchor 对应的 NodeID。
            // 由于可能是后向引用 (Anchor 在后面)，我们需要 Graph 支持 "Flow to Anchor ID" 
            // 或者在此处记录 "Pending Jump Connection" 待后续 Pass 解决。

            // 策略: 假设 Graph.flow 支持 targetAnchorId 这种占位符，或者我们调用 context 注册
            // 简单起见，假设我们生成一个指向目标的 Flow，如果目标未定则延后

            // 这里使用 Context 的 AnchorMap 尝试解析
            const resolvedNodeId = this.ctx.resolveAnchor(targetAnchorId);
            if (resolvedNodeId) {
              // 目标已存在 (回跳)
              this.graph.flow(jumpNodeId, resolvedNodeId, "out", "in", 0);
            } else {
              // 目标未知 (前向跳转): 记录到 PendingJumps 列表 (需在 Context 实现)
              // 或者，如果 Graph 引擎足够智能，可以直接传入 Anchor ID
              // this.graph.flow_to_anchor(jumpNodeId, "out", targetAnchorId);
            }
          }

          lastNodeId = null; // 中断线性流
          break;
        }

        // --- CallNode 处理 (含 Jump(0) 上下文注入) ---
        if (node.kind === "call") {
          // A. 准备 Jump(0) 的回填锚点
          // 只有当存在分支时才需要。我们在进入分支前生成一个 "Exit Anchor ID"
          // 并告诉 Context: "如果有谁 Jump(0)，就跳到这个 ID"
          // 等当前节点处理完，进入下一个循环时，将下一个节点注册给这个 ID
          let virtualExitId: string | null = null;
          if (node.branches && node.branches.length > 0) {
            virtualExitId = this.getNextJumpAnchorId();
            this.ctx.pushJumpTarget(virtualExitId);
          }

          // B. 实例化节点 (复用 Step 3 逻辑)
          const nodeId = this.processCallNode(node); // 这里会递归处理 branches

          // C. 恢复上下文
          if (virtualExitId) {
            this.ctx.popJumpTarget();
            // 标记：下一个生成的实体节点，必须注册为 virtualExitId 的目标
            // 由于 processChain 是线性循环，我们可以暂存这个 ID，在下一次循环开头处理
            this.ctx["_pendingNextNodeAnchor"] = virtualExitId;
          }

          // D. 连接 Pending Anchor (针对 node 自身的 Anchor)
          this.resolvePendingAnchor(nodeId);

          // E. 同样，如果刚刚有 Jump(0) 的虚拟锚点指向这里 (即 Chain 中上一个 Call 的分支跳到了这里)
          if (this.ctx["_pendingNextNodeAnchor"]) {
            this.ctx.registerAnchor(this.ctx["_pendingNextNodeAnchor"], nodeId);
            delete this.ctx["_pendingNextNodeAnchor"];
          }

          if (lastNodeId) {
            this.graph.flow(lastNodeId, nodeId, lastPort, "in");
          }
          lastNodeId = nodeId;
          lastPort = "default";
        }

        // --- EvalNode 处理 (增强) ---
        else if (node.kind === "eval") {
          this.processEvalNode(node);
          // Eval 不改变 lastNodeId
        }

        // ... BranchNode 处理类似 CallNode (同样需要 Jump(0) 上下文) ...
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
        // --- 处理变量声明 ---
        if (stmt.type === 'VariableDeclaration') {
          // const x = expr;
          // 1. 解析右值 expr -> 得到 SourceInfo 或 Literal Value
          const res = this.expander.resolveExprInfo(stmt.init);

          // 2. 注册到符号表
          if (res.kind === "value") {
            // 如果是字面量，我们需要一个特殊的处理方式。
            // 符号表通常存 NodeID/Port。
            // 策略: 在 Graph 中创建一个 "Const" 节点或者 "Identity" 节点来持有这个值，
            // 这样后续的引用就可以 connect 到它。
            const constNodeId = this.graph.add_node({
              identifier: "Sys.Const",
              value: res.val,
              type: res.type
            });
            this.ctx.registerVar(stmt.identifier, constNodeId, "out", res.type);
          } else {
            // 如果是 Source (中间运算节点的输出)，直接注册
            // 这样后续引用 x 的地方，直接连到那个中间节点，实现了 "无缝" 连接
            this.ctx.registerVar(stmt.identifier, res.info.nodeId, res.info.port, res.info.type);
          }

          // 处理类型覆盖警告
          this.ctx.checkTypeMatch(stmt.var_type, res.type, stmt.identifier);
        }

        // --- 处理 Return ---
        if (stmt.type === 'ReturnStatement') {
          // return expr;
          // 找到对应的 output 定义 (IR_FunctionArg)
          // 假设 EvalNode 只有一个 output，或者按顺序
          // 目前 IR 定义: outputs: (IR_FunctionArg & { kind: "in" })[]
          // 这意味着 Eval 块对外暴露的端口。

          if (node.outputs.length > 0) {
            const outputArg = node.outputs[0]; // 简化：假设单返回值
            const res = this.expander.resolveExprInfo(stmt.argument as any); // 类型转换需注意

            // 注册 EvalNode 的输出变量名 -> 内部计算结果
            if (outputArg.name) {
              if (res.kind === "value") {
                // 同上，生成 Const 节点以供外部连接
                const constNodeId = this.graph.add_node({
                  identifier: "Sys.Const", value: res.val
                });
                this.ctx.registerVar(outputArg.name, constNodeId, "out", res.type);
              } else {
                // 将外部变量名直接指向内部计算节点
                this.ctx.registerVar(outputArg.name, res.info.nodeId, res.info.port, res.info.type);
              }
            }
          }
        }
      });

    } else {
      // 简单的 ASTExpr (Single Expression) -> 视为 return expr
      if (node.outputs.length > 0 && node.lambda) {
        const res = this.expander.resolveExprInfo(node.lambda as any);
        const outputArg = node.outputs[0];
        if (outputArg.name) {
          if (res.kind === "value") {
            const constNodeId = this.graph.add_node({ identifier: "Sys.Const", value: res.val });
            this.ctx.registerVar(outputArg.name, constNodeId, "out", res.type);
          } else {
            this.ctx.registerVar(outputArg.name, res.info.nodeId, res.info.port, res.info.type);
          }
        }
      }
    }
  }
}