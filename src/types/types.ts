export type NodeVarValue =
  | number
  | bigint
  | string
  | boolean
  | NodeVarValue[]
  ;

export type IR_NodeVarValue =
  | number
  | bigint
  | string
  | boolean
  | IR_NodeVarValue[]
  | { key: IR_NodeVarValue, value: IR_NodeVarValue }
  ;

export type BranchId = string | number | boolean; // literal strings are required in source for non-numeric ids

export interface IRBase {
  _id: number;
  kind: string;
  // debug info
  _srcRange: { start: number; end: number; };
}
