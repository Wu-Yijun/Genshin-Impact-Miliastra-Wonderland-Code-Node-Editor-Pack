
import type { IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_EvalNode, IR_InOutNode, IR_JumpNode, IR_Node } from "../types/IR_node.ts";
import type { BranchId, ParserState } from "../types/types.ts";

import { BUILD_IN_SYS_NODE_Set, IR_Id_Counter } from "../types/consts.ts";
import { extractBalancedTokens } from "./balanced_extract.ts";
import { name_style, parse_args, parse_branch_id, parse_int } from "./parse_utils.ts";
import { expect, peekIs, next, src_pos } from "./utils.ts";
import { ALL_SYS_NODE_Set, SYS_TRIGGER_NODE_SET } from "../types/consts.gen.ts";
import { parseNodeChainList } from "./parse_block.ts";
import { assert, assertEqs } from "../../utils/utils.ts";



export function parseNode(
  s: ParserState,
): IR_Node {
  if (peekIs(s, "identifier")) {
    if (peekIs(s, "identifier", "$")) {
      return parseEval(s);
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
    return parseBranch(s);
  }
  if (peekIs(s, "int") || peekIs(s, "string") || peekIs(s, "boolean")) {
    return parseJump(s);
  }
  throw new Error("Unexpected token");
}

export function parseEval(s: ParserState): IR_EvalNode {
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
  ret._srcRange.end = src_pos(s);
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
  ret._srcRange.end = src_pos(s);
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
  assertEqs(which, "In", "Out");
  ret.specific = which;

  expect(s, "brackets", "(");
  if (!peekIs(s, "brackets", ")")) {
    ret.id = parse_branch_id(s);
  }
  expect(s, "brackets", ")");
  ret._srcRange.end = src_pos(s);
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
  if (name_style(nameTok.value) !== "UpperCamelCase" && name_style(nameTok.value) !== "Upper_Camel_Case") {
    console.warn("Bad function name style: " + nameTok.value);
  }

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
      let branchId: BranchId | null = null;
      if (peekIs(s, "identifier", "null")) {
        next(s);
        branchId = null;
      } else {
        branchId = parse_branch_id(s);
      }
      expect(s, "assign", "=");
      const nodes = parseNodeChainList(s);
      ret.branches.push({ branchId, nodes });
      if (peekIs(s, "symbol", ",")) {
        next(s); // 吃掉逗号
      }
    }
    expect(s, "brackets", ")");
  }

  ret._srcRange.end = src_pos(s);
  return ret;
}
export function parseBranch(s: ParserState): IR_BranchNode {
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

  ret._srcRange.end = src_pos(s);
  return ret;
}
export function parseJump(s: ParserState): IR_JumpNode {
  const ret: IR_JumpNode = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "jump",
    id: "",
  };

  ret.id = parse_branch_id(s);
  expect(s, "brackets", "(");
  expect(s, "brackets", ")");

  ret._srcRange.end = src_pos(s);
  return ret;
}

