
import type { IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_EvalNode, IR_FunctionArg, IR_InOutNode, IR_JumpNode, IR_Node } from "../types/IR_node.ts";
import type { ParserState } from "../types/parser.ts";

import { BUILD_IN_SYS_NODE_Set, IR_Id_Counter, TOKEN_GROUPS, TOKENS } from "../types/consts.ts";
import { extractBalancedTokens, splitBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { parse_type } from "./parse_type.ts";
import { assert, assertEq, expect, peek, peekIs, next, src_pos } from "./utils.ts";
import type { BranchId } from "../types/types.ts";
import { ALL_SYS_NODE_Set, SYS_TRIGGER_NODE_SET } from "../types/consts.derived.ts";
import { parseNodeChainList } from "./parse_block.ts";

// TODO: Remove this Test export
export const test = { parse_args, parse_eval };


export function parseNode(
  s: ParserState,
): IR_Node {
  if (peekIs(s, "identifier")) {
    if (peekIs(s, "identifier", "$")) {
      return parse_eval(s);
    }
    if (peekIs(s, "identifier", "Branch")) {
      return parseAnchorNode(s);
    }
    if (peekIs(s, "identifier", "In") || peekIs(s, "identifier", "Out")) {
      return parseInOutNode(s);
    }
    return parseCallNode(s);
  }
  if (peekIs(s, "brackets", "{")) {
    return parse_branch(s);
  }
  if (peekIs(s, "int") || peekIs(s, "string") || peekIs(s, "boolean")) {
    return parse_jump(s);
  }
  throw new Error("Unexpected token");
}

function parse_eval(s: ParserState): IR_EvalNode {
  const ret: IR_EvalNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "eval",
    captures: [],
    lambda: [],
    outputs: []
  };
  expect(s, "identifier", "$");
  expect(s, "brackets", "(");
  assert(peekIs(s, "brackets", "("), "Expected lambda expression inside '$()'");
  ret.captures = parse_args(s, "in");
  assert(ret.captures.every(a => a.name === null && a.expr.length === 1), "Lambda arguments cannot have complex expressions or aliases");
  expect(s, "arrow", "=>");
  ret.lambda = extractBalancedTokens(s, "(", ")", 1).slice(0, -1);
  if (peekIs(s, "brackets", "[")) {
    ret.outputs = parse_args(s, "out");
  }
  ret._srcRange.end = src_pos(s, true);
  return ret;
}
export function parseAnchorNode(s: ParserState): IR_AnchorNode {
  const ret: IR_AnchorNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "anchor",
    id: "",
  };

  // Branch["id"]
  expect(s, "identifier", "Branch");
  expect(s, "brackets", "[");
  ret.id = parse_branch_id(s);
  expect(s, "brackets", "]");
  ret._srcRange.end = src_pos(s, true);
  return ret;
}
export function parseInOutNode(s: ParserState): IR_InOutNode {
  const ret: IR_InOutNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "inout",
    specific: "In",
    id: 0,
  };

  // In("id") / Out("id")
  const which = expect(s, "identifier").value;
  assertEq(which, "In", "Out");
  ret.specific = which;

  expect(s, "brackets", "(");
  if (!peekIs(s, "brackets", ")")) {
    ret.id = parse_branch_id(s);
  }
  expect(s, "brackets", ")");
  ret._srcRange.end = src_pos(s, true);
  return ret;
}
export function parseCallNode(s: ParserState): IR_CallNode {
  const ret: IR_CallNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },

    kind: "call",
    class: "Usr",
    specific: undefined,
    name: "",
    inputs: [],
    outputs: [],
    branches: []
  };

  // 解析函数名
  const nameTok = expect(s, "identifier");
  ret.name = nameTok.value;

  // 系统内置函数表 
  if (ALL_SYS_NODE_Set.has(ret.name as any)) {
    ret.class = "Sys";
    if (BUILD_IN_SYS_NODE_Set.has(ret.name as any)) {
      ret.specific = ret.name as any;
    } else if (SYS_TRIGGER_NODE_SET.has(ret.name as any)) {
      ret.specific = "Trigger";
    }
  } else {
    ret.class = "Usr";
  }

  // 解析 inputs: (args)
  ret.inputs = parse_args(s, "in");

  // 解析 outputs: [outs]
  if (peekIs(s, "brackets", "[")) {
    ret.outputs = parse_args(s, "out");
  }

  // 解析分支表: ("id" = NodeChain, ...)
  if (peekIs(s, "brackets", "(")) {
    next(s);

    // 可能为空: () 
    while (!peekIs(s, "brackets", ")")) {
      // branchId
      const branchId = parse_branch_id(s);
      expect(s, "assign", "=");
      const nodes = parseNodeChainList(s);
      ret.branches.push({ branchId, nodes });
      if (peekIs(s, "symbol", ",")) {
        next(s); // 吃掉逗号
      }
    }
    expect(s, "brackets", ")");
  }

  ret._srcRange.end = src_pos(s, true);
  return ret;
}
function parse_branch(s: ParserState): IR_BranchNode {
  const ret: IR_BranchNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "branch",
    branches: [],
  };

  expect(s, "brackets", "{");

  while (!peekIs(s, "brackets", "}")) {
    const id = parse_int(s);
    assert(id !== null);
    expect(s, "symbol", ":");
    const nodes = parseNodeChainList(s);

    ret.branches.push({ id, nodes });

    if (peekIs(s, "symbol", ",")) {
      next(s);
    }
  }
  assert(ret.branches.length > 0, "Branch must have at least one branches!");
  expect(s, "brackets", "}");

  ret._srcRange.end = src_pos(s, true);
  return ret;
}
function parse_jump(s: ParserState): IR_JumpNode {
  const ret: IR_JumpNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "jump",
    id: "",
  };

  ret.id = parse_branch_id(s);
  expect(s, "brackets", "(");
  expect(s, "brackets", ")");

  ret._srcRange.end = src_pos(s, true);
  return ret;
}

/** Extract args between a pair of "()" or "[]", consuming the parentheses */
function parse_args(s: ParserState, type: "in" | "out"): IR_FunctionArg[] {
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
  return ret;
}

function parse_branch_id(s: ParserState): BranchId {
  const tok = next(s); // string | int | boolean (boolean not allowed), though grammar only expects int/string
  assertEq(tok.type, "string", "int", "boolean", "math");
  switch (tok.type) {
    case "string":
      return tok.value.slice(1, -1);
    case "boolean":
      return tok.value === "true";
    case "int":
      return parseInt(tok.value);
    case "math":
      const int = parse_int(s);
      if (int !== null) return int;
    default:
      throw new Error("Invalid Branch ID type");
  }
}

function parse_int(s: ParserState): number | null {
  const tok = peek(s);
  if (tok?.type === "int") return parseInt(expect(s, "int").value);
  if (!(tok?.type === "math" && (tok.value === "-" || tok.value === "+"))) return null;
  if (peek(s, 1)?.type !== "int") return null;
  const neg = expect(s, "math").value === "+" ? 1 : -1;
  return neg * parseInt(expect(s, "int").value);
}