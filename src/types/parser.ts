export interface Token {
  type: PatternTypes;
  value: string;
  pos: number;
}

export interface ParserState {
  tokens: Token[];
  index: number;
  source: string;
}

export type PatternTypes =
  | "whitespace"
  | "comment"
  | "right"
  | "left"
  | "equal"
  | "assign"
  | "ellipsis"
  | "boolean"
  | "identifier"
  | "int"
  | "float"
  | "string"
  | "brackets"
  | "decorator"
  | "dot"
  | "symbol"
  | "math"
  | "Unknown";
