import type { DefineDecl, LocalVarDecl } from "../types/IR_decl.ts";
import type { LambdaDecl, SharedFuncDecl } from "../types/IR_func.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { extractBalancedTokens } from "./balanced_extract.ts";
import { name_style, parse_branch_id, parse_type } from "./parse_utils.ts";
import { expect, next, peek, peekIs, src_pos } from "./utils.ts";

/** Parse const declarations - can be LocalVar, Define, SharedFunc, or Lambda
 * - LocalVarDecl: `const _var_name: type = defaultValue;`
 * - DefineDecl: `const VAR_NAME: type = defaultValue;`
 * - SharedFuncDecl: `const sharedFuncName = Shared(ComponentName)` or `const sharedFuncName = Shared(ComponentName, PortId)`
 * - LambdaDecl: `const lambdaName = (arg_name: type) => { body; return ret; }`
 */
export function parseConst(state: ParserState): LocalVarDecl | DefineDecl | SharedFuncDecl | LambdaDecl {
  const startPos = src_pos(state);

  expect(state, "identifier", "const");
  const nameTok = expect(state, "identifier");
  const name = nameTok.value;

  // Check if it's a Shared function declaration
  if (peekIs(state, "assign", "=") && peek(state, 1)?.value === "Shared") {
    return parseSharedFunc(state, name, startPos);
  }

  // Check if it's a lambda declaration (arrow function)
  if (peekIs(state, "assign", "=") && peek(state, 1)?.value === "(") {
    return parseLambda(state, name, startPos);
  }

  // Otherwise it's a variable declaration (LocalVar or Define)
  // Determine by naming convention
  const style = name_style(name);
  const isDefine = style === "UPPER_SNAKE_CASE";

  return parseVarDecl(state, name, startPos, isDefine);
}

/** 声明共享复合节点
 * ```ts
 *  const sharedFuncName = Shared(ComponentName)
 *  const sharedFuncName = Shared(ComponentName, PortId)
 * ```
 */
function parseSharedFunc(state: ParserState, name: string, startPos: number): SharedFuncDecl {
  const ret: SharedFuncDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: startPos, end: -1 },
    kind: "shared",
    name,
    component_name: "",
    port: null,
  };

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

  ret._srcRange.end = src_pos(state, true);
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
function parseLambda(state: ParserState, name: string, startPos: number): LambdaDecl {
  const ret: LambdaDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: startPos, end: -1 },
    kind: "lambda",
    name,
    args: [],
    body: [],
    returns: [],
  };

  expect(state, "assign", "=");

  // Parse arguments: (arg_name: type, ...)
  expect(state, "brackets", "(");
  while (!peekIs(state, "brackets", ")")) {
    const argName = expect(state, "identifier").value;
    expect(state, "symbol", ":");
    const typeTokens = extractBalancedTokens(state, "(", ")", 0);
    const argType = parse_type(typeTokens.slice(0, -1));

    ret.args.push({ name: argName, type: argType });

    if (peekIs(state, "symbol", ",")) {
      next(state);
    }
  }
  expect(state, "brackets", ")");

  expect(state, "arrow", "=>");

  // Parse body: { ... }
  expect(state, "brackets", "{");

  // Extract all tokens until the closing brace
  const bodyTokens = extractBalancedTokens(state, "{", "}", 1);
  ret.body = bodyTokens.slice(0, -1); // Remove closing brace

  // TODO: Parse return statement to extract return types
  // For now, we leave returns empty

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state, true);
  return ret;
}

/** Parse variable declaration (LocalVar or Define)
 * - LocalVarDecl: `const _var_name: type = defaultValue;`
 * - DefineDecl: `const VAR_NAME: type = defaultValue;`
 */
function parseVarDecl(state: ParserState, name: string, startPos: number, isDefine: boolean): LocalVarDecl | DefineDecl {
  const ret: LocalVarDecl | DefineDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: startPos, end: -1 },
    kind: isDefine ? "define" : "localVar",
    name,
    type: { t: "b", b: "Int" }, // Default type
    default: null as any,
  };

  // Parse type annotation: : type
  if (peekIs(state, "symbol", ":")) {
    next(state);
    const typeTokens = extractBalancedTokens(state, "(", ")", 0);
    ret.type = parse_type(typeTokens.slice(0, -1));
  }

  // Parse default value: = value
  if (peekIs(state, "assign", "=")) {
    next(state);
    // TODO: properly parse NodeVar value
    // For now, skip until semicolon
    while (!peekIs(state, "symbol", ";") && peek(state)) {
      next(state);
    }
  }

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state, true);
  return ret;
}
