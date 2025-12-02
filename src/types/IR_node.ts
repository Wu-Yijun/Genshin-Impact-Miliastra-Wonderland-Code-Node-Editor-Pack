import type { BranchId } from "./IR_defs.ts";
import type { Token } from "./parser.ts";
import type { SysTypeNames } from "./types.ts";


/**
 * - `(arg_name =)? expr (as TypeName)?` the arg_name used to refer to this arg in input
 * - `expr (= out_name)? (as TypeName)?` the out_name defined in function outputs
 */
export type IR_FunctionArg = {
  expr: Token[]; // identifier or expression tokens
  name: string | null; // `arg_name =` the alias name used to refer to this arg
  type: SysTypeNames | null;
};

export type IRNodeBlock = {
  /** A list of ordered node chain: `FX().FY().FZ()...` */
  chain: IRNode[];
  /** true for `<< Chain.X` and false for `>> Chain.Y`  */
  suspend: boolean;
}[];

export type IRNode =
  | IR_CallNode // remain
  | IR_EvalNode // remain
  | IR_BranchNode // remain
  | IR_AnchorNode // Branch["id"] 
  | IR_JumpNode // "id"() or 0()
  | IR_InOutNode; // In("branchId")/Out("branchId") in component (marks input/output)

export interface IRBase {
  uniqueId: number;
  kind: string;
  // debug info
  srcRange: { start: number; end: number; };
}

export interface IR_CallNode extends IRBase {
  kind: "call";
  class: "Sys" | "Usr";
  specific?: "If" | "Switch" | "Loop" | "ForEach" | "SetVal" | "Timer" | "Signal" | "In" | "Out"; // special built-in
  name: string;

  inputs: IR_FunctionArg[];
  outputs: IR_FunctionArg[];
  // mapping of exit branches optionally specified at call site:
  // e.g. .Comp()( "large" = Log(...), "small" = ... )
  branches: { branchId: BranchId; node: IRNode }[];
}

export interface IR_EvalNode extends IRBase {
  kind: "eval";
  captures: string[]; // list of inputs' captured function-output names this eval depends on (e.g. ["val_a", "val_b"])
  lambda: Token[]; // lambda code body as string (for runtime eval)
  outputs: IR_FunctionArg[]; // mapping of outputs
}

export interface IR_BranchNode extends IRBase {
  kind: "branch";
  branches: { id: number; node: IRNodeBlock }[]; // keys are integers
}

export interface IR_AnchorNode extends IRBase {
  kind: "anchor";
  id: BranchId;
}

export interface IR_JumpNode extends IRBase {
  kind: "jump";
  id: BranchId;
}
export interface IR_InOutNode extends IRBase {
  kind: "inout";
  specific: "In" | "Out";
  id: BranchId;
}