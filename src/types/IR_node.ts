import type { NodeType } from "../../utils/node_data/node_type.ts";
import { BUILD_IN_SYS_NODE } from "./consts.ts";
import type { Token } from "./types.ts";
import type { BranchId, IRBase } from "./types.ts";

/**
 * - `(arg_name =)? expr (as TypeName)?` the arg_name used to refer to this arg in input
 * - `expr (= out_name)? (as TypeName)?` the out_name defined in function outputs
 */
export type IR_FunctionArg = {
  expr: Token[]; // identifier or expression tokens
  name: string | null; // `arg_name =` the alias name used to refer to this arg
  type: NodeType | null;
};

/** 三种执行链定义的开始形式
 *  ```ts
 *  [IR_Trigger].IR_NodeChain;
 *  IR_AnchorNode.IR_NodeChain;
 *  In(BranchId).IR_NodeChain;
 *  ```
 */
export interface IR_ExecutionBlock extends IRBase {
  kind: "block";
  starter: IR_Trigger | IR_AnchorNode | IR_InOutNode;
  chain: IR_NodeChain[];
}

/** 可以作为触发器的调用函数
 * ```ts
 *  OnEventName(args)[outs]
 *  Signal(args)[outs]
 *  Timer(args)[outs]
 * ```
 */
export interface IR_Trigger extends IRBase {
  kind: "trigger";
  node: IR_CallNode & { class: "Sys", specific: "Trigger" | "Timer" | "Signal" };
}



/** 通过`.`连接起节点链, 通过 `<<` `>>` 间隔不同节点链的执行先后. 
 * ```ts
 * << IR_Node.IR_Node.IR_Node
 * >> IR_Node.IR_Node...
 * ```
 */
export interface IR_NodeChain extends IRBase {
  kind: "chain"
  /** A list of ordered node chain: `FX().FY().FZ()...` */
  chain: IR_Node[];
  /** true for `<< Chain.X` and false for `>> Chain.Y`  */
  suspend: boolean;
};

export type IR_Node =
  | IR_CallNode // Identifier
  | IR_EvalNode // "$"
  | IR_BranchNode // {}
  | IR_AnchorNode // Branch["id"] 
  | IR_JumpNode // "id"() or 0()
  | IR_InOutNode; // In("branchId")/Out("branchId") in component (marks input/output)

/**
 * 调用函数, 可以是系统函数或用户自定义函数
 * ```ts
 *  CompName(args) [outs]? ("branchId" = IR_NodeChains)?
 * ```
 */
export interface IR_CallNode extends IRBase {
  kind: "call";
  class: "Sys" | "Usr";
  specific?: typeof BUILD_IN_SYS_NODE[number]; // special built-in
  name: string;

  inputs: IR_FunctionArg[];
  outputs: IR_FunctionArg[];
  // mapping of exit branches optionally specified at call site:
  // e.g. .Comp()( "large" = Log(...), "small" = ... )
  branches: { branchId: BranchId | null; nodes: IR_NodeChain[] }[];
}

/**
 * 通过 lambda 表达式动态生成节点链
 * ```ts
 *  $((args)=> lambda ) [outs]? 
 * ```
 */
export interface IR_EvalNode extends IRBase {
  kind: "eval";
  captures: IR_FunctionArg[]; // list of inputs' captured function-output names this eval depends on (e.g. ["val_a", "val_b"])
  lambda: Token[]; // lambda code body as string (for runtime eval)
  outputs: IR_FunctionArg[]; // mapping of outputs
}

/**
 * 分支节点, 通过 index 决定执行先后顺序
 * ```ts
 *  {
 *    index: IR_NodeChain[],
 *    index: IR_NodeChain[],
 *    index: IR_NodeChain[],
 *  }
 * ```
 */
export interface IR_BranchNode extends IRBase {
  kind: "branch";
  branches: { id: number; nodes: IR_NodeChain[] }[]; // keys are integers
}

/** 标记分支汇入锚点
 * ```ts
 *  Branch["id"]
 * ```
 */
export interface IR_AnchorNode extends IRBase {
  kind: "anchor";
  id: BranchId;
}

/** 跳入特定分支汇入锚点
 * ```ts
 *  "id"()
 *  index()
 * ```
 */
export interface IR_JumpNode extends IRBase {
  kind: "jump";
  id: BranchId;
}

/** 标记复合节点输入/输出
 * ```ts
 * In("branchId")
 * Out("branchId")
 * ```
 */
export interface IR_InOutNode extends IRBase {
  kind: "inout";
  specific: "In" | "Out";
  id: BranchId; // 0 as default
}