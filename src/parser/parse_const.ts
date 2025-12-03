import type { DefineDecl, LocalVarDecl } from "../types/IR_decl.ts";
import type { LambdaDecl, SharedFuncDecl } from "../types/IR_func.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { extractBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { name_style, parse_branch_id, parse_type, parse_var_decl } from "./parse_utils.ts";
import { assert, expect, next, peek, peekIs, src_pos } from "./utils.ts";

/** Parse const declarations - can be LocalVar, Define, SharedFunc, or Lambda
 * - LocalVarDecl: `const _var_name: type = defaultValue;`
 * - DefineDecl: `const VAR_NAME: type = defaultValue;`
 * - SharedFuncDecl: `const sharedFuncName = Shared(ComponentName)` or `const sharedFuncName = Shared(ComponentName, PortId)`
 * - LambdaDecl: `const lambdaName = (arg_name: type) => { body; return ret; }`
 */
export function parseConst(state: ParserState): LocalVarDecl | DefineDecl | SharedFuncDecl | LambdaDecl {
  // Check if it's a Shared function declaration
  if (peek(state, 2)?.value === "=" && peek(state, 3)?.value === "Shared") {
    return parseSharedFunc(state);
  }

  // Check if it's a lambda declaration (arrow function)
  if (peek(state, 2)?.value === "=" && peek(state, 3)?.value === "(") {
    return parseLambda(state);
  }

  // Otherwise it's a variable declaration (LocalVar or Define)
  // Determine by naming convention
  const style = name_style(peek(state, 1)!.value);
  const isDefine = style === "UPPER_SNAKE_CASE";

  return parseVarDecl(state, isDefine);
}

/** 声明共享复合节点
 * ```ts
 *  const sharedFuncName = Shared(ComponentName)
 *  const sharedFuncName = Shared(ComponentName, PortId)
 * ```
 */
function parseSharedFunc(state: ParserState): SharedFuncDecl {
  const ret: SharedFuncDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "shared",
    name: undefined as any,
    component_name: "",
    port: null,
  };

  expect(state, "identifier", "const");
  ret.name = expect(state, "identifier").value;
  expect(state, "assign", "=");
  expect(state, "identifier", "Shared");
  expect(state, "brackets", "(");

  ret.component_name = expect(state, "identifier").value;

  if (peekIs(state, "symbol", ",")) {
    next(state);
    ret.port = parse_branch_id(state);
  }

  expect(state, "brackets", ")");

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}

/** 声明纯函数
 * ```ts
 *  const lambdaName = (arg_name: type) => {
 *    body;
 *    return ret;
 *  }
 * ```
 */
function parseLambda(state: ParserState): LambdaDecl {
  const ret: LambdaDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "lambda",
    name: undefined as any,
    args: [],
    body: [],
    returns_type: undefined as any,
  };
  expect(state, "identifier", "const");
  ret.name = expect(state, "identifier").value;
  expect(state, "assign", "=");

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

  if (peekIs(state, "symbol", ":")) {
    next(state);
    const typed = try_capture_type(state.tokens, state.index);
    assert(typed.success);
    state.index += typed.tokens.length;
    const argType = parse_type(typed.tokens);
    ret.returns_type = argType;
  }

  expect(state, "arrow", "=>");

  // Parse body: { ... }
  expect(state, "brackets", "{");

  // Extract all tokens until the closing brace
  const bodyTokens = extractBalancedTokens(state, "{", "}", 1);
  ret.body = bodyTokens.slice(0, -1); // Remove closing brace

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}

/** Parse variable declaration (LocalVar or Define)
 * - LocalVarDecl: `const _var_name: type = defaultValue;`
 * - DefineDecl: `const VAR_NAME: type = defaultValue;`
 */
function parseVarDecl(state: ParserState, isDefine: boolean): LocalVarDecl | DefineDecl {
  const ret: LocalVarDecl | DefineDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: isDefine ? "define" : "localVar",
    name: undefined as any,
    type: undefined as any,
    default: undefined as any,
  };

  expect(state, "identifier", "const");
  const { name, value } = parse_var_decl(state);
  ret.name = name;
  ret.default = value;
  ret.type = value.type;

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}
