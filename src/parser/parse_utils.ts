import type { NodeType } from "../../utils/index.ts";
import type { IR_FunctionArg } from "../types/IR_node.ts";
import type { ParserState, Token } from "../types/parser.ts";
import type { BranchId } from "../types/types.ts";
import { TOKEN_GROUPS, TOKENS, UNK_TYPE } from "../types/consts.ts";
import { extractBalancedTokens, splitBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { assert, assertEq, expect, next, peek } from "./utils.ts";

export function parse_type(tokens: Token[]): NodeType {
  return { t: "b", b: tokens.map(t => t.value).join("") as any };
  // TODO
  return UNK_TYPE;
}

export function name_style(name: string): "UpperCamelCase" | "Upper_Camel_Case" | "lowerCamelCase" | "snake_case" | "_snake_case" | "UPPER_SNAKE_CASE" | "BAD" {
  const first = name[0];
  if (first === "_" || first.toLowerCase() === first && name.includes("_")) {
    if (name.toLowerCase() !== name) {
      return "BAD";
    }
    // snake case
    return first === "_" ? "_snake_case" : "snake_case";
  }
  if (first.toLocaleLowerCase() === first) {
    if (name.includes("_")) {
      return "BAD";
    }
    if (name.toLowerCase() === name) {
      return "snake_case"; // snake case without "_"
    }
    // lowerCamelCase
    return "lowerCamelCase";
  }
  if (name.toUpperCase() === name) {
    // UPPER_SNAKE_CASE
    return "UPPER_SNAKE_CASE";
  }
  if (name.includes("_")) {
    if (name.split("_").every(s => s[0].toUpperCase() === s[0])) {
      return "Upper_Camel_Case";
    }
    return "BAD";
  }
  // UpperCamelCase
  return "UpperCamelCase";
}


export function parse_branch_id(s: ParserState): BranchId {
  const tok = next(s); // string | int | boolean (boolean not allowed), though grammar only expects int/string
  assertEq(tok.type, "string", "int", "boolean", "math");
  switch (tok.type) {
    case "string":
      return tok.value.slice(1, -1);
    case "boolean":
      return tok.value === "true";
    case "int":
      return parseInt(tok.value.replaceAll("_", ""));
    case "math":
      const int = parse_int(s);
      if (int !== null) return int;
    default:
      throw new Error("Invalid Branch ID type");
  }
}

export function parse_int(s: ParserState): number | null {
  const tok = peek(s);
  if (tok?.type === "int") return parseInt(expect(s, "int").value.replaceAll("_", "").replaceAll("_", ""));
  if (!(tok?.type === "math" && (tok.value === "-" || tok.value === "+"))) return null;
  if (peek(s, 1)?.type !== "int") return null;
  const neg = expect(s, "math").value === "+" ? 1 : -1;
  return neg * parseInt(expect(s, "int").value.replaceAll("_", ""));
}

export function parse_float(s: ParserState): number | null {
  const tok = peek(s);
  if (tok?.type === "float") return parseFloat(expect(s, "float").value.replaceAll("_", "").replaceAll("_", ""));
  if (!(tok?.type === "math" && (tok.value === "-" || tok.value === "+"))) return null;
  if (peek(s, 1)?.type !== "float") return null;
  const neg = expect(s, "math").value === "+" ? 1 : -1;
  return neg * parseFloat(expect(s, "float").value.replaceAll("_", ""));
}

/** Extract args between a pair of "()" or "[]", consuming the parentheses */
export function parse_args(s: ParserState, type: "in" | "out"): IR_FunctionArg[] {
  const BRACKETS = {
    "in": "()",
    "out": "[]",
  };
  const ret = [];

  const tokens = extractBalancedTokens(s, BRACKETS[type][0], BRACKETS[type][1]);
  assertEq(tokens[0].value, BRACKETS[type][0]);
  assertEq(tokens[tokens.length - 1].value, BRACKETS[type][1]);
  const args = splitBalancedTokens(tokens.slice(1, -1), TOKEN_GROUPS.opening, TOKEN_GROUPS.closing, [TOKENS.comma]);
  for (const arg of args) {
    const len = arg.length;
    if (len === 0) {
      continue;
    } else if (len === 1) {
      ret.push({
        expr: arg,
        name: null,
        type: null,
      });
      continue;
    }
    // (name =)? expr
    const alias = arg[0].type === "identifier" && arg[1].type === "assign";
    // expr (as type)?
    const { success, tokens: typename } = try_capture_type(arg, arg.length - 1, true);
    const typed = success && arg[len - typename.length - 1]?.value === "as";
    ret.push({
      expr: arg.slice(alias ? 2 : 0, arg.length - (typed ? typename.length + 1 : 0)),
      name: alias ? arg[0].value : null,
      type: typed ? parse_type(typename.reverse()) : null,
    });
  }
  ret.forEach((arg) => {
    let name = arg.name;
    if (name === null && type === "out") {
      assert(arg.expr.length === 1, "Out args should not be expression without a name!");
      assert(arg.expr[0].type === "identifier", "Out args should be identifier than expression!");
      name = arg.expr[0].value;
    }
    if (name) {
      const style = name_style(name);
      if (style !== "snake_case") {
        console.warn(`Non snake_case name ${name} is used in ${type} args!`);
      }
    }
  })
  return ret;
}
