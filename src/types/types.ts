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
  | "comment"   // `//` `/**/`
  | "right"     // >>
  | "left"      // <<
  | "arrow"     // =>
  | "equal"     // === ==
  | "notequal"  // !== !=
  | "assign"    // =
  | "ellipsis"  // `...`
  | "boolean"   // true false
  | "identifier"// azAZ$_09
  | "int"       // +- 9_0
  | "float"     // +- 9_0.0_9 .0_9
  | "string"    // "abc" 'abc'
  | "brackets"  // {} [] <> ()
  | "decorator" // @
  | "dot"       // .
  | "symbol"    // , ; :
  | "math"      // +\-*\/^&|~!%
  | "Unknown";

export type NodeVarValue =
  | number
  | bigint
  | string
  | boolean
  | NodeVarValue[];

export type IR_NodeVarValue =
  | number
  | bigint
  | string
  | boolean
  | IR_NodeVarValue[]
  | { key: IR_NodeVarValue; value: IR_NodeVarValue };

export type BranchId = string | number | boolean; // literal strings are required in source for non-numeric ids

export interface IRBase {
  _id: number;
  kind: string;
  // debug info
  _srcRange: { start: number; end: number };
}
