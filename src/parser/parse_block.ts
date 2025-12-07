import type { IR_ExecutionBlock, IR_NodeChain, IR_Trigger } from "../types/IR_node.ts";
import type { ParserState } from "../types/types.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { parseAnchorNode, parseCallNode, parseInOutNode, parseNode } from "./parse_node.ts";
import { expect, next, peek, peekIs, src_pos } from "./utils.ts";
import { assertEq, assertEqs } from "../../utils/utils.ts";

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

  ret._srcRange.end = src_pos(s);
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
  assertEqs(node.specific, "Trigger", "Signal", "Timer");
  assertEq(node.class, "Sys");
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
    } else if (t.type === "left") {
      next(s);
      suspend = true;
    } else if (t.type === "right") {
      next(s);
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
    if ([",", ";", "<<", ">>", "}", ")"].includes(t.value)) {
      ret._srcRange.end = src_pos(s);
      return ret;
    }
  }
  throw new Error("Unexpected end of file");
}

