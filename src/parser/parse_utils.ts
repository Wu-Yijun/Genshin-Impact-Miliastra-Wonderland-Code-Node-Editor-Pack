import type { NodeType } from "../../utils/index.ts";
import type { IR_FunctionArg } from "../types/IR_node.ts";
import type { ParserState, Token } from "../types/types.ts";
import type { BranchId, IR_NodeVarValue } from "../types/types.ts";
import { TOKEN_GROUPS, TOKENS, UNK_TYPE } from "../types/consts.ts";
import { extractBalancedTokens, splitBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { expect, next, peek, peekIs } from "./utils.ts";
import { NodeVar } from "../types/class.ts";
import { parse as parse_node_type, type_equal } from "../../utils/gia_gen/nodes.ts";
import { tokenEqual } from "./tokenizer.ts";
import { assert, assertEq, assertEqs } from "../../utils/utils.ts";

export function parse_type(tokens: Token[]): NodeType {
  const t = tokens.map(t => {
    switch (t.value.toLowerCase()) {
      case "list":
        return "L";
      case "dict":
        return "D";
      case "struct":
        return "S";
      case "int":
      case "integer":
        return "Int";
      case "float":
        return "Flt";
      case "bool":
      case "boolean":
        return "Bol";
      case "str":
      case "string":
        return "Str";
      case "config":
      case "configid":
        return "Cfg";
      case "prefab":
        return "Pfb";
      case "vector":
      case "vec":
        return "Vec";
      case "faction":
        return "Fct";
      case "guid":
        return "Gid";
      case "entity":
        return "Ety";
      default:
        return t.value;
    }
  }).join("");
  try {
    return parse_node_type(t);
  } catch (e) {
    console.error(e);
    console.info("Invalid type sources: ", t);
    return { t: "b", b: t as any };
  }
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
  const tok = peek(s); // string | int | boolean (boolean not allowed), though grammar only expects int/string
  assertEqs(tok?.type, "string", "int", "boolean");
  switch (tok.type) {
    case "string":
      return next(s).value.slice(1, -1);
    case "boolean":
      return next(s).value === "true";
    case "int":
      const i = parse_int(s);
      assert(i !== null);
      return i;
    default:
      throw new Error("Invalid Branch ID type");
  }
}

export function parse_int(s: ParserState): number | null {
  let offset = 0;
  let neg = 1;
  let tok = peek(s)!;
  if (tokenEqual(tok, TOKENS.plus)) {
    offset = 1;
  } else if (tokenEqual(tok, TOKENS.minus)) {
    neg == -1;
    offset = 1;
  }
  tok = peek(s, offset)!;
  if (tok?.type === "int") {
    s.index += offset + 1;
    const val = tok.value.replaceAll("_", "");
    if (val === "0") return 0;
    if (val.startsWith("0")) {
      switch (val[1].toLowerCase()) {
        case "d":
          return parseInt(val.slice(2), 10);
        case "x":
          return parseInt(val.slice(2), 16);
        case "o":
          return parseInt(val.slice(2), 8);
        case "b":
          return parseInt(val.slice(2), 2);
        default:
          return null;
      }
    }
    return neg * parseInt(val);
  }
  return null;
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


// val := string | int | float | boolean | "[" val ( "," val )* "]" | "{" ( val ":" val ","? )* "}"
export function parse_value(s: ParserState): IR_NodeVarValue {
  switch (peek(s)?.type) {
    case "string":
      return next(s).value.slice(1, -1);
    case "int":
      const i = parse_int(s);
      assert(i !== null);
      return BigInt(i);
    case "float":
      const f = parse_float(s);
      assert(f !== null);
      return f;
    case "boolean":
      return next(s).value === "true";
    case "brackets": {
      if (peekIs(s, "brackets", "[")) {
        next(s);
        const ret = [];
        while (!peekIs(s, "brackets", "]")) {
          ret.push(parse_value(s));
          if (peekIs(s, "symbol", ",")) {
            next(s);
          }
        }
        expect(s, "brackets", "]");
        return ret;
      } else if (peekIs(s, "brackets", "{")) {
        next(s);
        const ret: { key: IR_NodeVarValue, value: IR_NodeVarValue }[] = [];
        while (!peekIs(s, "brackets", "}")) {
          const key = parse_value(s);
          expect(s, "symbol", ":");
          ret.push({ key: key, value: parse_value(s) });
          if (peekIs(s, "symbol", ",")) {
            next(s);
          }
        }
        expect(s, "brackets", "}");
        return ret;
      }
    }
  }
  throw new Error("Invalid value forms!");
}


/** `Name (: Type)? (= (Value|Type\(Value\)))?` */
export function parse_var_decl(state: ParserState) {
  let type: NodeType | undefined;
  const name = expect(state, "identifier").value;

  if (peekIs(state, "symbol", ":")) {
    next(state);
    const typed = try_capture_type(state.tokens, state.index);
    assert(typed.success, "Failed to parse type");
    state.index += typed.tokens.length;
    type = parse_type(typed.tokens);
  }

  let val: IR_NodeVarValue | undefined;
  if (peekIs(state, "assign", "=")) {
    next(state);
    const typed = try_capture_type(state.tokens, state.index);
    if (typed.success) {
      state.index += typed.tokens.length;
      if (type === undefined) {
        type = parse_type(typed.tokens);
      } else {
        assert(type_equal(type, parse_type(typed.tokens)), "Type mismatch");
      }
      expect(state, "brackets", "(");
      val = parse_value(state);
      expect(state, "brackets", ")");
    } else {
      val = parse_value(state);
    }
  }
  return {
    name: name,
    value: NodeVar.from(type, val)
  };
}