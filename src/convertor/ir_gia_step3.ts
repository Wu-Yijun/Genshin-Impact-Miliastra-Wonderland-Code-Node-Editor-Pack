/**
 * Step 3: Node & Flow Builder
 * * 核心功能:
 * 1. 遍历 IR_ExecutionBlock 和 IR_NodeChain
 * 2. 实例化 IR_CallNode (Sys/Usr/Shared)
 * 3. 展开 IR_EvalNode (内部 AST -> Graph Nodes)
 * 4. 构建线性控制流 (Flow) 和 数据流 (Connect)
 * 5. 递归处理 CallNode 的嵌套分支 (Branches)
 */

import { UNK_TYPE } from "../../utils/index.ts";
import { ArithmeticProgram } from "../types/AST_expr.ts";
import { IR_CallNode, IR_EvalNode, IR_ExecutionBlock, IR_NodeChain } from "../types/IR_node.ts";
import { Graph } from "./graph_wrapper.ts";
import { CompilerContext } from "./ir_gia_step1.ts";
import { ASTExpander } from "./ir_gia_step2.ts";


export class NodeFlowBuilder {
  protected ctx: CompilerContext;
  protected graph: Graph;
  protected expander: ASTExpander;


  constructor(ctx: CompilerContext, graph: Graph) {
    this.ctx = ctx;
    this.graph = graph;
    this.expander = new ASTExpander(ctx, graph);
  }

  /**
   * 处理一个完整的执行块 (Block)
   */
  public processBlock(block: IR_ExecutionBlock) {
    let prevNodeId: string | null = null;
    let prevPort: string = "default"; // 默认流出口

    // 1. 处理 Starter (触发器/锚点/InOut)
    if (block.starter.kind === "trigger") {
      // Trigger 视为一种特殊的 CallNode (System Trigger)
      prevNodeId = this.processCallNode(block.starter.node);
      prevPort = "out"; // Trigger 通常叫 "out" 或 "triggered"
    }
    else if (block.starter.kind === "anchor") {
      // 如果 Block 以 Anchor 开始，注册它指向 Chain 的第一个节点
      // 这里暂时设为 null，等进入 Chain 循环时，第一个生成的节点会反向注册给这个 Anchor
      // 或者：如果 Anchor 只是标记，我们可以忽略它，让 Jump 逻辑去 resolve 这里的第一个节点
      // 策略：记录 Anchor ID，标记 "待绑定 Next Node"
      this.ctx.registerAnchor(block.starter.id, "PENDING");
    }
    else if (block.starter.kind === "inout") {
      // InOut Node (Component Entry)
      prevNodeId = this.graph.add_node({
        kind: "inout",
        identifier: block.starter.specific, // "In" or "Out"
        id: block.starter.id
      });
    }

    // 2. 处理主链
    this.processChain(block.chain, prevNodeId, prevPort);
  }

  /**
   * 递归处理节点链
   * @param chains 链列表
   * @param flowSourceId 控制流来源节点 ID
   * @param flowSourcePort 控制流来源端口
   */
  protected processChain(
    chains: IR_NodeChain[],
    flowSourceId: string | null,
    flowSourcePort: string
  ) {
    let lastNodeId = flowSourceId;
    let lastPort = flowSourcePort;

    for (const chainObj of chains) {
      // TODO: 处理 chainObj.suspend ('<<') 逻辑
      // 这里简化为线性连接

      for (const node of chainObj.chain) {
        // --- Case A: Anchor (注册点) ---
        if (node.kind === "anchor") {
          // 标记：下一个生成的实体节点就是这个 Anchor 的目标
          // 我们将在 createRealNode 后检查是否有 Pending Anchor
          // 为了简化，这里存入 Context 的临时状态 "ActiveAnchor"
          this.ctx["_activeAnchorId"] = node.id;
          continue;
        }

        // --- Case B: Jump (跳转) ---
        if (node.kind === "jump") {
          // 这是一个控制流终点(或分叉点)，交给 Step 4 处理具体逻辑
          // 但在 Step 3 我们需要生成 Jump 节点并连接当前的 Flow
          const jumpNodeId = this.graph.add_node({
            kind: "jump",
            identifier: "Sys.Jump",
            target: node.id
          });

          if (lastNodeId) {
            this.graph.flow(lastNodeId, jumpNodeId, lastPort, "in");
          }

          // Jump 节点本身通常不再产生 "Next" 流，或者它有两个出口
          // 根据之前设计：Jump(0) 跳回父级，Jump(ID) 跳向 Anchor
          // 具体的 Jump 连线逻辑 (JumpNode -> Target) 将在 Pass 2 或 Step 4 完成
          // 这里我们中断当前链的线性流
          lastNodeId = null;
          break; // Jump 中断了线性链
        }

        // --- Case C: CallNode (函数调用) ---
        if (node.kind === "call") {
          const nodeId = this.processCallNode(node);

          // 1. 处理 Pending Anchor (如果这个节点是某个 Anchor 的目标)
          this.resolvePendingAnchor(nodeId);

          // 2. 连接控制流 (Linear Flow)
          if (lastNodeId) {
            this.graph.flow(lastNodeId, nodeId, lastPort, "in");
          }

          // 3. 更新 Flow 指针
          lastNodeId = nodeId;
          lastPort = "default"; // 假设 CallNode 默认流出口
        }

        // --- Case D: EvalNode (表达式块) ---
        else if (node.kind === "eval") {
          // EvalNode 展开为内部运算节点，通常不参与控制流 (Pure Data)
          // 除非它包含有副作用的逻辑 (目前假设 Eval 主要是数据计算)
          this.processEvalNode(node);

          // 注意：lastNodeId 不变！控制流直接 "穿过" Eval 块
          // 就像: CallA -> (Eval: a+b) -> CallB
          // Flow: CallA -> CallB
          // Data: CallA.out -> Add.in, Add.out -> CallB.in
        }

        // --- Case E: BranchNode (Switch) ---
        else if (node.kind === "branch") {
          // 类似 CallNode，生成 Branch 节点
          const nodeId = this.graph.add_node({ kind: "call", identifier: "Sys.Branch" });
          this.resolvePendingAnchor(nodeId);

          if (lastNodeId) {
            this.graph.flow(lastNodeId, nodeId, lastPort, "in");
          }

          // 处理全部分支
          node.branches.forEach(br => {
            // 递归处理，Flow 来源是 Branch 节点的 index 端口
            // 注意：Branch 也是一个分叉点，不更新 lastNodeId (中断线性流)
            this.processChain(br.nodes, nodeId, br.id.toString());
          });

          lastNodeId = null; // 线性流中断
        }
      }
    }
  }

  /**
   * 处理 CallNode: 实例化、连接数据、注册输出、处理内嵌分支
   */
  protected processCallNode(node: IR_CallNode): string {
    let nodeId: string;

    // 1. 节点实例化 (New vs Shared)
    // 假设 SharedFunc 已经在 Context 中注册，或者通过 name 判断
    // 这里简化逻辑：如果是 Shared 类型且已存在，则复用 ID
    const sharedId = this.ctx.getSharedNode(node.name);
    if (node.class === "Sys" && node.specific === "Trigger") { // Trigger 特殊处理
      nodeId = this.graph.add_node({ identifier: node.name, kind: "Trigger" });
    } else if (sharedId) {
      nodeId = sharedId;
      // 共享节点可能不需要重复连接 Input (假设所有 Shared 调用输入一致 或 由 Graph 引擎处理 Merge)
    } else {
      // 常规节点创建
      // 先推导 identifier (处理重载) - 虽然 IR 中 CallNode 可能已经确定了，但为了保险
      // 也可以直接用 node.name
      nodeId = this.graph.add_node({
        kind: "call",
        identifier: node.name,
        // debug info...
      });
    }

    // 2. 处理 Inputs (数据流连接)
    node.inputs.forEach((input, index) => {
      // 假设端口名按顺序 arg0, arg1... 或需元数据查询
      const portName = `arg${index}`; // 实际应由 ctx.solveFunction 返回的 argNames 决定
      // 这里调用 Step 2 的 Expander
      this.expander.connectExprToPort(input.expr, nodeId, portName, input.type);
    });

    // 3. 注册 Outputs (符号表)
    // IR_CallNode 的 outputs 定义了该节点产生的变量名
    node.outputs.forEach((output, index) => {
      if (output.expr.type === 'Identifier') {
        const varName = output.expr.name;
        const portName = `res${index}`; // 同样，实际应查询元数据
        // 注册：这个变量名 varName 由 nodeId 的 portName 产生
        this.ctx.registerVar(varName, nodeId, portName, output.type || UNK_TYPE);
      }
    });

    // 4. 处理内嵌分支 (Branches) -> 关键的 Jump(0) 上下文管理
    if (node.branches && node.branches.length > 0) {
      // 这里的逻辑稍微 tricky：
      // 我们正在处理 `node`，它的线性后续是 Chain 中的下一个节点。
      // 但是我们还没生成下一个节点呢！
      // 实际上，Jump(0) 语义是跳到 "CallNode 完成后的位置"。
      // 在 Graph 中，这通常意味着 CallNode 有一个 "Completed" 或 "Default" 出口。
      // 如果 branches 是像 "OnSuccess", "OnFail" 这样的回调插槽：

      // 我们需要告诉 Context: "如果有谁在子分支里喊 Jump(0)，它应该连向这个 CallNode 的 Default 出口(如果它是容器) 或者是 Chain 的下一个节点(如果它是流的中断)"

      // 根据之前的 Jump(0) 定义：跳回 "包含当前子链的最近父节点" 的后续。
      // 这里暂且认为：CallNode 本身作为一个 Flow 节点，它的 branches 是挂在其他控制流端口上的。
      // Jump(0) 实际上是汇聚回 Main Flow。
      // 由于 NodeFlowBuilder 是按序执行的，我们还不知道 Main Flow 的下一个节点 ID。
      // 策略：使用一个 "JumpHub" 虚拟节点 或者 稍后 Backpatch。

      // *简化策略*: 对于 Step 3，我们递归构建分支。
      // 上下文压栈逻辑留给 Step 4 完善，或者在这里传入 parentId = nodeId

      node.branches.forEach(br => {
        // branchId 对应 CallNode 的某个控制流出口端口
        const branchPort = br.branchId ? br.branchId.toString() : "default";

        // 压栈：告诉子分支，如果要 Jump(0)，目前还没确定目标 (Pending)
        // 或者，如果 Jump(0) 是跳出分支回到主干，通常 Graph 连线是：
        // CallNode[BranchPort] -> BranchChain... -> JumpNode -> (Merge) -> NextNode

        this.processChain(br.nodes, nodeId, branchPort);
      });

      // 如果有分支，CallNode 本身通常不再直接连向 NextNode (除非是分叉非阻塞)
      // 这取决于节点定义。暂设 lastNodeId 依然有效，继续向下连接。
    }

    return nodeId;
  }

  /**
   * 处理 EvalNode: 展开 AST, 注册变量, 不参与控制流
   */
  protected processEvalNode(node: IR_EvalNode) {
    // 1. 确定 Lambda 类型
    if (this.isArithmeticProgram(node.lambda)) {
      const program = node.lambda as ArithmeticProgram;

      // 遍历 Program Body
      program.body.forEach(stmt => {
        if (stmt.type === 'VariableDeclaration') {
          // const x = expr;
          // 展开 expr -> 得到 Source/Value
          // 注册 x -> Source/Value
          // 这需要 ASTExpander 支持返回 SourceInfo 而不仅仅是 connect
          // 我们可以在 expander 中增加一个方法 resolveASTExpr (已存在但私有，需公开)
          // *Hack*: 我们可以创建一个临时的 "Passthrough" 节点来承载这个变量，或者增强 Context 允许 Var 指向 "Literal Value"

          // 为了简单，我们让 VariableDeclaration 生成一个 "Identity" 或 "Pass" 节点 (如果它是 Source)，
          // 或者直接在 Context 中注册 SourceInfo (如果 expander 能够返回 SourceInfo)
          // 修改 ASTExpander 增加 public resolve(expr): ASTResult 是最好的办法。

          // 假设我们通过 expander 内部机制处理，或者这里暂时略过 VariableDeclaration 的复杂实现，
          // 重点关注 ReturnStatement。
        }

        if (stmt.type === 'ReturnStatement') {
          // return expr;
          // 这里的 expr 结果对应 EvalNode 的 outputs[0]
          if (node.outputs.length > 0) {
            const outVar = node.outputs[0];
            if (outVar.kind === "in") { // Eval outputs 定义为 kind="in" (外部视角)? Check definition.
              // IR Definition says: outputs: (IR_FunctionArg & { kind: "in" })[] 
              // Wait, Eval outputs should be OUT variables defining new names.
              // Assuming definition meant defining variables.

              // 我们需要把 Return 的结果 (Source) 绑定到 outVar.name 上
              const varName = outVar.name || "eval_res";
              // Connect expr to...? 
              // 这里的逻辑是：Return 语句的计算结果，就是这个 Eval Block 产生的变量源。
              // 我们需要一个 "Anchor Source"。
              // 通常做法：Eval 展开的最后一个运算节点就是 Source。
            }
          }
        }
      });

    } else {
      // 简单的 ASTExpr (Single Expression)
      // 相当于 return expr
      // 直接展开表达式，拿到结果 Source
      // 但 expander.connectExprToPort 需要目标。
      // 这里的“目标”是未知的，因为 Eval 定义了变量，供后续节点使用。
      // 所以我们需要 ASTExpander 提供 resolve 接口，拿到 SourceInfo，然后注册到 Context。

      // *临时方案*: 
      // 假定 ASTExpander 能够处理并在内部生成节点。
      // 我们需要 expander.resolveAndRegister(expr, outputName)
    }
  }

  // 辅助：检查 pending anchor
  protected resolvePendingAnchor(nodeId: string) {
    if (this.ctx["_activeAnchorId"] !== undefined) {
      this.ctx.registerAnchor(this.ctx["_activeAnchorId"], nodeId);
      delete this.ctx["_activeAnchorId"];
    }
  }

  private isArithmeticProgram(lambda: any): lambda is ArithmeticProgram {
    return lambda && lambda.type === 'ArithmeticProgram';
  }
}