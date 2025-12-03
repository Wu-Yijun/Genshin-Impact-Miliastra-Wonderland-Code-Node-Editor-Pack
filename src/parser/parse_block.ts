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
    ret.starter = parseTrigger(s);
    expect(s, "brackets", "]");
  } else if (peekIs(s, "identifier", "Branch")) {
    ret.starter = parseAnchorNode(s);
  } else if (peekIs(s, "identifier", "In")) {
    ret.starter = parseInOutNode(s);
  } else {
    throw new Error("Invalid starter of execution block");
  }
  // Chain
  ret.chain = parseNodeChainList(s);

  ret._srcRange.end = src_pos(s, true);
  return ret;
}

export function parseTrigger(s: ParserState): IR_Trigger {
  const ret: IR_Trigger = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "trigger",
    node: null as any
  };
  const node = parseCallNode(s);
  assertEq(node.specific, "Trigger", "Signal", "Timer");
  assertEq(node.class, "Sys");
  // 令人无语, 你的类型推断呢?
  ret.node = {
    ...node,
    class: node.class,
    specific: node.specific,
  }
  return ret;
}

export function parseNodeChainList(s: ParserState): IR_NodeChain[] {
  const ret: IR_NodeChain[] = [];
  let t;
  while (t = peek(s)) {
    if ([",", ";", "}", ")"].includes(t.value)) {
      return ret;
    }
    let suspend = false;
    if (t.value === ".") {
      next(s);
      suspend = false;
    } else if (t.value === "<") {
      next(s);
      expect(s, "symbol", "<");
      suspend = true;
    } else if (t.value === ">") {
      next(s);
      expect(s, "symbol", ">");
      suspend = false;
    }
    ret.push(parseNodeChain(s, suspend));
  }
  throw new Error("Unexpected end of file");
}
export function parseNodeChain(s: ParserState, suspend: boolean): IR_NodeChain {
  const ret: IR_NodeChain = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "chain",
    suspend,
    chain: [],
  };
  while (true) {
    ret.chain.push(parseNode(s));
    if (peekIs(s, "dot")) {
      next(s);
    }
    const t = peek(s);
    if (t === null) {
      break;
    }
    if ([",", ";", "<", ">", "}", ")"].includes(t.value)) {
      ret._srcRange.end = src_pos(s, true);
      return ret;
    }
  }
  throw new Error("Unexpected end of file");
}

