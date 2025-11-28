import {
  parseIdentifier,
  parseLiteralArgs,
  parseOutList,
  parseTypeParameter,
} from "./parseParams.ts"; //js
import type { ParserState } from "./tokenizer.ts";
import { expect, peekIs } from "./utils.ts"; //js

interface TriggerHeader {
  name: string;
  typeParam: string | null;
  args: any[];
  outs: any[];
}
function parseTriggerHeader(state: ParserState): TriggerHeader {
  expect(state, "symbol", "[");
  const name = parseIdentifier(state);

  let typeParam = null;
  if (peekIs(state, "symbol", "<")) {
    typeParam = parseTypeParameter(state);
  }

  let args = [];
  // TODO: Expect ()
  if (peekIs(state, "symbol", "(")) args = parseLiteralArgs(state);

  let outs = [];
  if (peekIs(state, "symbol", "[")) outs = parseOutList(state);

  expect(state, "symbol", "]");
  return { name, typeParam, args, outs };
}
