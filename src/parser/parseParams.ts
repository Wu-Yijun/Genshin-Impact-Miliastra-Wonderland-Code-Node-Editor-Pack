import type { TypeName } from "../IR/IR_defs.ts";
import { allocNodeId } from "../IR/IR_node.ts"; //js
import type { IR_FunctionInputArgType, IR_JumpNode } from "../IR/IR_node.ts";
import {
  extractBalancedTokens,
  splitBalancedTokens,
} from "./balancedExtract.ts";
import {
  type ParserState,
  type Token,
  TOKEN_GROUPS,
  TOKENS,
} from "./tokenizer.ts";
import {
  assert,
  expect,
  next,
  peek,
  peekIs,
  peekIsIdentifier,
} from "./utils.ts"; //js

/** Same as peekIsIdLiteral */
export function parseIdLiteral(
  state: ParserState,
): string | number | boolean | null {
  if (peekIs(state, "int")) {
    return parseInteger(next(state).value);
  }
  if (peekIs(state, "boolean")) {
    return parseBoolean(next(state).value);
  }
  if (peekIs(state, "string")) {
    return parseString(next(state).value);
  }
  if (peekIsIdentifier(state, "null")) {
    next(state);
    return null;
  }
  throw new Error(`Unexpected literal '${peek(state)?.value}'`);
}

export function parseBranchIndex(state: ParserState): number {
  if (peekIs(state, "int")) {
    return parseInteger(next(state).value);
  }
  throw new Error("Unexpected literal");
}

export function parseLiteral(state: ParserState): string | number | boolean {
  if (peekIs(state, "int")) {
    return parseInteger(next(state).value);
  }
  if (peekIs(state, "float")) {
    return parseFloat(next(state).value);
  }
  if (peekIs(state, "boolean")) {
    return parseBoolean(next(state).value);
  }
  if (peekIs(state, "string")) {
    return parseString(next(state).value);
  }
  throw new Error("Unexpected literal");
}

// export function parseCaseKey(state: ParserState): string | number | boolean | null {
//   if (peekIs(state, "identifier")) {
//     expect(state, "identifier", "null");
//     return null;
//   }
//   return parseIdLiteral(state);
// }

export function getJumpZeroNode(): IR_JumpNode {
  return {
    kind: "jump",
    target: 0,
    next: undefined,
    id: allocNodeId(),
  };
}

type ArgDeclType = [string, TypeName?];
/**
 * Sort arg orders to match function inputs
 * @param args input args to re-order
 * @param decl the declaration of Function args
 */
export function matchArgs(
  args: IR_FunctionInputArgType[],
  decl: ArgDeclType[],
  minLen = 0,
): (IR_FunctionInputArgType | null)[] {
  if (args.length < minLen) {
    console.warn("The length of args is small than the least var num!");
  }
  if (args.length > decl.length) {
    console.warn("The length of args is greater than Function declarations!");
  }
  const index = Array.from({ length: args.length }, () => true);
  const res: (IR_FunctionInputArgType | null)[] = Array(decl.length).fill(null);
  const searcher = new Map<string, number>(decl.map((d, i) => [d[0], i]));

  // 1. Match (name = expr)
  for (let i = 0; i < index.length; i++) {
    if (index[i] && args[i].name) {
      const p = searcher.get(args[i].name!);
      if (p !== undefined) {
        res[p] = args[i];
        index[i] = false;
      }
    }
  }
  // 2. Match (expr)
  for (let i = 0; i < index.length; i++) {
    if (index[i]) {
      const p = searcher.get(args[i].expr);
      if (p !== undefined) {
        res[p] = args[i];
        index[i] = false;
      }
    }
  }
  // 3. Fill by order
  for (let i = 0, j = 0; i < index.length; i++) {
    if (index[i]) {
      while (res[j] !== null) {
        j++;
      }
      if (j >= decl.length) {
        break;
      }
      res[j] = args[i];
    }
  }
  // 4. Check Types
  for (let i = 0, j = 0; i < res.length; i++) {
    if (res[i]) {
      if (res[i]!.type !== undefined && decl[i][1] !== undefined) {
        assert(res[i]!.type, decl[i][1]);
      }
    }
  }
  return res;
}

export function parseIdentifier(state: ParserState): string {
  return expect(state, "identifier").value;
}
export function parseTypeParameter(state: ParserState): string {
  return expect(state, "identifier").value;
}

function extractArg(
  arg: Token[],
): IR_FunctionInputArgType {
  const str = arg.map((t) => t.value).join(" ");
  const reg = /^(([a-zA-Z_]\w*) = )?(.+?)( as (\w+( < \w+( , \w+)? >)?))?$/;
  const match = str.match(reg);
  if (match) {
    return {
      name: match[2],
      expr: match[3],
      type: match[5],
    };
  }
  throw new Error("Failed to extract Arg!");
}

export function parseInputArgs(state: ParserState) {
  const argTokens = extractBalancedTokens(state, "(", ")").slice(1, -1);
  const argsTokens = splitBalancedTokens(
    argTokens,
    TOKEN_GROUPS.opening,
    TOKEN_GROUPS.closing,
    [TOKENS.comma],
  );
  return argsTokens.map(extractArg);
}
export function parseOutList(state: ParserState) {
  const outTokens = extractBalancedTokens(state, "[", "]").slice(1, -1);
  const outsTokens = splitBalancedTokens(
    outTokens,
    TOKEN_GROUPS.opening,
    TOKEN_GROUPS.closing,
    [TOKENS.comma],
  );
  return outsTokens.map(extractArg).map(({ name, expr, type }) => ({
    // if there is name, use name as alias and expr as name [name=expr] => {alias: name, name: expr}
    // otherwise use expr as alias [expr] => {alias: expr}
    name: name ? expr : undefined,
    alias: name ?? expr,
    type,
  }));
}

export function parseInteger(str: string): number {
  return Number.parseInt(str.replace("_", ""));
}

function parseFloat(str: string): number {
  return Number.parseFloat(str.replace("_", ""));
}

function parseBoolean(bool: string): boolean {
  if (bool === "true") {
    return true;
  }
  if (bool === "false") {
    return false;
  }
  throw new Error("Unexpected Boolean");
}

function parseString(str: string): string {
  return str;
}
