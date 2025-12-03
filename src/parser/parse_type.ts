import type { NodeType } from "../../utils/index.ts";
import { UNK_TYPE } from "../types/consts.ts";
import type { Token } from "../types/parser.ts";

export function parse_type(tokens: Token[]): NodeType {
  return {t:"b", b:tokens.map(t=>t.value).join("") as any};
  // TODO
  return UNK_TYPE;
}