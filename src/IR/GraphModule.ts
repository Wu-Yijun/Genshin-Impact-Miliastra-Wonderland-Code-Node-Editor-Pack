import type {
  GlobalDecl,
  NodeVarDecl,
  SignalDecl,
  StructDecl,
  TimerDecl,
} from "./userDecl.ts";
import type { TriggerDecl } from "./trigger.ts";
import type { AnchorRef } from "./anchor.ts";
import type { IRNode } from "./IR_node.ts";
import type { ComponentDecl, PureFuncDecl, SystemFnDecl } from "./component.ts";

export interface GraphModule {
  // metadata
  name: string;
  filename: string;

  // declarations (from file header)
  structs: StructDecl[]; // interface definitions
  globals: GlobalDecl[]; // declare class This { ... }
  nodeVars: NodeVarDecl[]; // declare class node { ... }
  timers: TimerDecl[]; // Timer names
  signals: SignalDecl[]; // Signal names & signatures

  // components and helper functions
  components: ComponentDecl[]; // control-flow components (capitalized)
  functions: PureFuncDecl[]; // pure computation lambdas (lowercase)
  systemFns: SystemFnDecl[]; // (optional) pre-bound system functions / builtins

  // triggers defined in this graph
  triggers: TriggerDecl[]; // each maps to an execution tree
  branches: Record<string, IRNode>;

  // anchors index (populated by parser)
  anchors: Record<string, AnchorRef>;

  // optional: top-level IR nodes (if any)
  nodes: IRNode[]; // optional flat list
}
