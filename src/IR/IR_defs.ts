// 基本别名
type BranchId = string | number | boolean; // literal strings are required in source for non-numeric ids
type NodeId = string; // unique identifier within a GraphModule for debug/anchor
type VarName = string; // variable name (function outputs, tmp, node.this, this.x, etc.)
// type TypeName = string; // optional: "int" | "float" | "boolean" | "string" | "vec" | ...
type TypeName =
  | "int"
  | "float"
  | "boolean"
  | "string"
  | "vec"
  | "Entity"
  | "GUID"
  | "Prefab"
  | "Faction"
  | ComposedType;
type ComposedType = string; // "List-int"... "Dict-string-float"... "UserStruct"

export interface VarDecl {
  name: VarName;
  type?: TypeName;
  originNodeId?: NodeId; // if applicable
}

export type { BranchId, NodeId, TypeName, VarName };
