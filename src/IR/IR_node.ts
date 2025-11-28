import type { BranchId, NodeId, TypeName, VarName } from "./IR_defs.ts";
export type { BranchId };

/** Get an unique id that like `${inc_digit}_${timestamp}`  */
export const allocNodeId = (function () {
  let counter = 0; // 这个 counter 变量存在于闭包作用域中
  return function (): string {
    counter += 1;
    const time = Date.now();
    return `${counter}_${time}`;
  };
})();

export type IR_FunctionInputArgType = {
  name?: string;
  expr: string;
  type?: TypeName;
};
export type IR_FunctionOutputArgType = {
  alias: string;
  name?: string;
  type?: TypeName;
};

export type IRNode =
  | IR_CallNode
  | IR_EvalNode
  | IR_BranchNode
  | IR_IfNode
  | IR_SwitchNode
  | IR_LoopNode
  | IR_ForEachNode
  | IR_AnchorNode // Branch["id"] definition
  | IR_JumpNode // >> "id" or >> 0 or >> null
  | IR_MultiJumpNode // < "id1", "id2", ... >
  | IR_BranchCallNode // calling a component (composite node)
  | IR_ReturnNode; // return / Out() in component (marks output/exit)

export interface IRBase {
  id: NodeId;
  kind: string;
  // optional debug info
  srcRange?: { start: number; end: number; line?: number; col?: number };
}

export interface IR_CallNode extends IRBase {
  kind: "call";
  name: string; // function name
  /** Name is used to match function defined name, expr to get value ref, type should match(For type checking purpose)
   *
   * Like `Fun(a = b as C, d as E, f)` means:
   *  - {name: "a", expr: "b", type: "C"},
   *  - {expr: "d", type: "E"},
   *  - {expr: "f"},
   */
  args: IR_FunctionInputArgType[];
  /** Name is used to match function defined out name, alias to get value ref, type should match(For type checking purpose)
   *
   * Like `Fun()[a = b as C, d as E, f]` means:
   *  - {alias: "a", name: "b", type: "C"},
   *  - {alias: "d", type: "E"},
   *  - {alias: "f"},
   */
  outputs: IR_FunctionOutputArgType[];
  // control flow: next node in sequence (null if end)
  next: IRNode | null;
}

export interface IR_EvalNode extends IRBase {
  kind: "eval";
  capture: string[]; // list of function-output names this eval depends on (e.g. ["val_a", "val_b"])
  lambdaParams: string[]; // e.g. ["a","b"]  - parameters order
  lambdaBody: string; // lambda code body as string (for runtime eval)
  outputs: IR_FunctionOutputArgType[]; // mapping of outputs
  next: IRNode | null;
}

export interface IR_BranchNode extends IRBase {
  kind: "branch";
  branches: { id: number; node: IRNode }[]; // keys are integers
  // after branch block, there might be a continuation (the `.next` executes after each branch has returned to merge point)
  next: IRNode | null; // continuation after branches (i.e. the node after `.}` in source)
}

export interface IR_IfNode extends IRBase {
  kind: "if";
  conditionExpr: string; // raw condition expression (string) - can be evaluated at runtime via Function
  trueNode: IRNode | null; // node representing the true branch (could be sequence)
  falseNode: IRNode | null; // node representing the false branch
  next: IRNode | null; // continuation after If block (merge point)
}

export interface IR_SwitchNode extends IRBase {
  kind: "switch";
  switchExpr: string; // raw expression to evaluate
  cases: { key: BranchId; node: IRNode }[]; // literal keys only (strings/numbers/booleans)
  defaultCase: IRNode | null;
  next: IRNode | null;
}

export interface IR_LoopNode extends IRBase {
  kind: "loop";
  startExpr: string; // raw expression or literal
  endExpr: string; // raw expression or literal (inclusive or exclusive per spec; doc says inclusive)
  loopId: string | null; // optional ID for StopLoop
  loopVar: string | null; // name of loop variable (e.g. "i")
  trueNode: IRNode | null; // iteration body node (executed per i until end)
  falseNode: IRNode | null; // executed after normal loop termination
  next: IRNode | null;
}

export interface IR_ForEachNode extends IRBase {
  kind: "foreach";
  listExpr: string; // raw expression representing the list
  loopId: string | null; // optional ID for StopLoop
  iterVar: string | null; // iteration variable name
  trueNode: IRNode | null;
  falseNode: IRNode | null;
  next: IRNode | null;
}

export interface IR_AnchorNode extends IRBase {
  kind: "anchor";
  anchorId: BranchId;
  // next points to the sequence starting at this anchor
  next: IRNode | null;
}

export interface IR_JumpNode extends IRBase {
  kind: "jump";
  target: BranchId | 0 | null; // 0 => merge to next continuation; null => end this branch (no continuation)
  // if target is BranchId, runtime will lookup AnchorRef to continue at anchor
  // If the jump is ">> 0", it's understood to jump to the immediate continuation (module-level or parent block next)
  next: undefined;
}

export interface IR_MultiJumpNode extends IRBase {
  kind: "multiJump";
  targets: BranchId[];
  // if target is BranchId, runtime will lookup AnchorRef to continue at anchor
  // If the jump is ">> 0", it's understood to jump to the immediate continuation (module-level or parent block next)
  next: IRNode | null;
}

export interface IR_BranchCallNode extends IRBase {
  kind: "branchCall";
  componentName: string;
  /** Name is used to match function defined name, expr to get value ref, type should match(For type checking purpose)
   *
   * Like `Fun(a = b as C, d as E, f)` means:
   *  - {name: "a", expr: "b", type: "C"},
   *  - {expr: "d", type: "E"},
   *  - {expr: "f"},
   */
  args: IR_FunctionInputArgType[];
  /** Name is used to match function defined out name, alias to get value ref, type should match(For type checking purpose)
   *
   * Like `Fun()[a = b as C, d as E, f]` means:
   *  - {alias: "a", name: "b", type: "C"},
   *  - {alias: "d", type: "E"},
   *  - {alias: "f"},
   */
  outputs: IR_FunctionOutputArgType[];
  // mapping of exit branches optionally specified at call site:
  // e.g. .Comp()( "large" = Log(...), "small" = ... )
  exitHandlers: { branchId: BranchId; node: IRNode }[];
  next: IRNode | null; // continuation after component call (applies if Out() returns to here)
}

export interface IR_ReturnNode extends IRBase {
  kind: "return";
  outputs: IR_FunctionOutputArgType[]; // local outputs to return
  exitId: BranchId | null; // exit branch id (if Out("id"))
  next: IRNode | null; // nodes after the Out() in component body (will execute after returning)
}
