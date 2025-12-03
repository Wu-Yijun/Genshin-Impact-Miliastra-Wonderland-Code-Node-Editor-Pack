import type { IR_ExecutionBlock, IR_NodeChain, IR_Trigger } from "../types/IR_node.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { parseAnchorNode, parseCallNode, parseInOutNode, parseNode } from "./parse_node.ts";
import { assertEq, expect, next, peek, peekIs, src_pos } from "./utils.ts";

/** from starter to end of block, excluding ';' at the end */
export function parseExecutionBlock(s: ParserState): IR_ExecutionBlock {
  const ret: IR_ExecutionBlock = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "block",
    starter: null as any,
    chain: [],
  };
  // Starter
  if (peekIs(s, "brackets", "[")) {
    expect(s, "brackets", "[");
    ret.starter = parse_trigger(s);
    expect(s, "brackets", "]");
  } else if (peekIs(s, "identifier", "Branch")) {
    ret.starter = parseAnchorNode(s);
  } else if (peekIs(s, "identifier", "In")) {
    ret.starter = parseInOutNode(s);
  }
  // Chain
  let t;
  while (t = peek(s)) {
    switch (t.value) {
      case ";":
        ret._srcRange.end = src_pos(s, true);
        return ret;
      default:
        throw new Error(`Unexpected token: ${t.value}`);
    }
  }
  throw new Error("Unexpected end of file");
}

function parse_trigger(s: ParserState): IR_Trigger {
  const ret: IR_Trigger = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "trigger",
    node: null as any
  };
  const node = parseCallNode(s);
  assertEq(node.specific, "Event", "Signal", "Timer");
  assertEq(node.class, "Sys");
  ret.node = node as any;
  return ret;
}


export function parseNodeChain(s: ParserState, suspend: boolean): IR_NodeChain {
  const ret: IR_NodeChain = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "chain",
    suspend,
    chain: [],
  };
  let t;
  while (t = peek(s)) {
    if ([",", ";", "<<", ">>", "}", ")"].includes(t.value)) {
      ret._srcRange.end = src_pos(s, true);
      return ret;
    }
    ret.chain.push(parseNode(s));
    if (peekIs(s, "dot")) {
      next(s);
    }
  }
  throw new Error("Unexpected end of file");
}

