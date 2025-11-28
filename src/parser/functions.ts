import type { TypeName } from "../IR/IR_defs.ts";
import type {
  BranchId,
  IR_BranchCallNode,
  IR_CallNode,
  IR_FunctionInputArgType,
  IR_FunctionOutputArgType,
  IRNode,
} from "../IR/IR_node.ts";
import type { ParserState } from "./tokenizer.ts";

export interface FunctionCallType {
  name: string;
  inBranchTag: BranchId | null;
  args: IR_FunctionInputArgType[];
  outs: IR_FunctionOutputArgType[];
  exits: null | Map<BranchId | null, IRNode>;
  id: string;
}

export function systemFunctionIncludes(name: string): boolean {
  return true;
}
export function refractSystemFunction(fun: FunctionCallType): IR_CallNode {
  return {
    kind: "call",
    name: fun.name,
    args: fun.args,
    outputs: fun.outs,
    next: null,
    id: fun.id,
  };
}
export function refractUserFunction(
  fun: FunctionCallType,
): IR_CallNode | IR_BranchCallNode {
  if (fun.exits === null || fun.exits.size === 0) {
    return {
      kind: "call",
      name: fun.name,
      args: fun.args,
      outputs: fun.outs,
      next: null,
      id: fun.id,
    };
  } else {
    const exitHandlers: { branchId: BranchId; node: IRNode }[] = [];
    for (const [k, v] of fun.exits.entries()) {
      if (k === null) {
        console.warn("User functions should not use null branch!");
        continue;
      }
      exitHandlers.push({ branchId: k, node: v });
    }
    return {
      kind: "branchCall",
      componentName: fun.name,
      args: fun.args,
      outputs: fun.outs,
      exitHandlers: exitHandlers,
      next: null,
      id: fun.id,
    };
  }
}
