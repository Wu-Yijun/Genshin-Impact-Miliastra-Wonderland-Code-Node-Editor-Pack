import type { DefineDecl, GlobalDecl, GlobalVarDecl, ImportDecl, LocalVarDecl, NodeVarDecl, SignalDecl, StructDecl, TimerDecl } from "./IR_decl.ts";
import { ComponentDecl, LambdaDecl, SharedFuncDecl } from "./IR_func.ts";
import { IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_EvalNode, IR_ExecutionBlock, IR_InOutNode, IR_JumpNode, IR_Node, IR_NodeChain, IR_Trigger } from "./IR_node.ts";
import type { IRBase } from "./types.ts";

export type * from "./IR_node.ts";

export type * from "./IR_func.ts";

export type * from "./IR_decl.ts";

export interface IR_GraphModule extends IRBase {
  kind: "module";
  // decls
  imports: ImportDecl[];
  globals: GlobalDecl[];
  node_vars: NodeVarDecl[];
  local_vars: LocalVarDecl[];
  defines: DefineDecl[];
  components: ComponentDecl[];
  lambdas: LambdaDecl[];
  shared_funcs: SharedFuncDecl[];
  // graph
  graph: IR_ExecutionBlock[];
}

export type IRExtend =
  // IR_node.ts
  | IR_ExecutionBlock
  | IR_Trigger
  | IR_NodeChain
  | IR_CallNode
  | IR_EvalNode
  | IR_BranchNode
  | IR_AnchorNode
  | IR_JumpNode
  | IR_InOutNode
  // IR_func.ts
  | SharedFuncDecl
  | LambdaDecl
  // IR_decl.ts
  | ImportDecl
  | GlobalDecl
  | StructDecl
  | GlobalVarDecl
  | TimerDecl
  | SignalDecl
  | NodeVarDecl
  | LocalVarDecl
  | DefineDecl
  // IR.ts
  | IR_GraphModule;