import type { ComponentDecl } from "../types/IR_func.ts";
import type { LocalVarDecl } from "../types/IR_decl.ts";
import type { ParserState } from "../types/types.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { extractBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { parseExecutionBlock } from "./parse_block.ts";
import { parse_branch_id, parse_type, parse_var_decl } from "./parse_utils.ts";
import { expect, next, peek, peekIs, src_pos } from "./utils.ts";
import { parseVarDecl } from "./parse_const.ts";
import { assert } from "../../utils/utils.ts";

/** 声明包含完整执行节点的子图，拥有自定义的入口和出口。
 *  ```ts
 *  function ComponentName(arg_name: type) {
 *    // LocalVarDecl
 *    // IR_ExecutionBlocks
 *    return ExecFun<{out_name: type}>(outBranchId)
 *  }
 *  ```
 */
export function parseComponent(state: ParserState): ComponentDecl {
  const ret: ComponentDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "component",
    name: "",
    args: [],
    locals: [],
    blocks: [],
    returns: [],
    inBranchIds: [],
    outBranchIds: [],
  };

  // function ComponentName
  expect(state, "identifier", "function");
  const nameTok = expect(state, "identifier");
  ret.name = nameTok.value;

  // Parse arguments: (arg_name: type, ...)
  expect(state, "brackets", "(");
  while (!peekIs(state, "brackets", ")")) {
    const argName = expect(state, "identifier").value;
    expect(state, "symbol", ":");
    const typed = try_capture_type(state.tokens, state.index);
    assert(typed.success);
    state.index += typed.tokens.length;
    const argType = parse_type(typed.tokens);

    ret.args.push({ name: argName, type: argType });

    if (peekIs(state, "symbol", ",")) {
      next(state);
    }
  }
  expect(state, "brackets", ")");

  // Parse body: { ... }
  expect(state, "brackets", "{");

  // Parse local variables and execution blocks
  while (!peekIs(state, "brackets", "}")) {
    const t = peek(state);
    if (!t) break;

    if (t.value === "const") {
      // Parse local variable declaration
      const v = parseVarDecl(state, false);
      assert(v.kind === "localVar");
      ret.locals.push(v);
    } else if (t.value === "return") {
      // Parse return statement
      parseReturn(state, ret);
      break; // return is the last statement
    } else {
      // Parse execution block
      ret.blocks.push(parseExecutionBlock(state));
      if (peekIs(state, "symbol", ";")) {
        next(state);
      }
    }
  }

  expect(state, "brackets", "}");

  ret._srcRange.end = src_pos(state);
  return ret;
}

// /** Parse local variable declaration inside component */
// function parseLocalVar(state: ParserState): LocalVarDecl {
//   const ret: LocalVarDecl = {
//     _id: IR_Id_Counter.value,
//     _srcRange: { start: src_pos(state), end: -1 },
//     kind: "localVar",
//     name: "",
//     type: { t: "b", b: "Int" },
//     default: null as any,
//   };

//   expect(state, "identifier", "const");
//   ret.name = expect(state, "identifier").value;

//   if (peekIs(state, "symbol", ":")) {
//     next(state);
//     const typeTokens = extractBalancedTokens(state, "(", ")", 0);
//     ret.type = parse_type(typeTokens.slice(0, -1));
//   }

//   if (peekIs(state, "assign", "=")) {
//     next(state);
//     // Parse default value - simplified for now
//     const valueTok = next(state);
//     // TODO: properly parse NodeVar value
//   }

//   if (peekIs(state, "symbol", ";")) {
//     next(state);
//   }

//   ret._srcRange.end = src_pos(state);
//   return ret;
// }

/** Parse return statement and extract return types and branch IDs */
function parseReturn(state: ParserState, component: ComponentDecl): void {
  expect(state, "identifier", "return");

  // return ExecFun<{out_name: type}>(outBranchId)
  expect(state, "identifier", "ExecFun");

  // Parse return types: <{out_name: type, ...}>
  if (peekIs(state, "math", "<")) {
    next(state);
    expect(state, "brackets", "{");

    while (!peekIs(state, "brackets", "}")) {
      const outName = expect(state, "identifier").value;
      expect(state, "symbol", ":");
      const typed = try_capture_type(state.tokens, state.index);
      assert(typed.success);
      state.index += typed.tokens.length;
      const outType = parse_type(typed.tokens);

      component.returns.push({ name: outName, type: outType });

      if (peekIs(state, "symbol", ",")) {
        next(state);
      }
    }

    expect(state, "brackets", "}");
    expect(state, "math", ">");
  }

  // Parse branch IDs: (outBranchId, ...)
  expect(state, "brackets", "(");
  while (!peekIs(state, "brackets", ")")) {
    const branchId = parse_branch_id(state);
    component.outBranchIds.push(branchId);

    if (peekIs(state, "symbol", ",")) {
      next(state);
    }
  }
  expect(state, "brackets", ")");

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }
}
