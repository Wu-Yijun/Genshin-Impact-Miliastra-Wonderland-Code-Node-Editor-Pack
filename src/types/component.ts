import type { BranchId, TypeName } from "./IR_defs.ts";
import type { IRNode } from "./IR_node.ts";

export interface ComponentDecl {
  name: string; // capitalized: behavior component
  inputs: { name: string; type?: TypeName }[]; // input parameter names (positional)
  outputs: { name: string; type?: TypeName }[]; // output names
  entry: IRNode; // IR node that is the default entry (the [] block)
  exits: BranchId[]; // declared exit branch ids (for Out(...))
  // TODO: components may also have local anchors; these are scoped to the component
}

export interface SystemFnDecl {
  name: string; // capitalized: behavior component
  inputs: { name: string; type?: TypeName }[]; // input parameter names (positional)
  outputs: { name: string; type?: TypeName }[]; // output names
  entry: IRNode; // IR node that is the default entry (the [] block)
  exits: BranchId[]; // declared exit branch ids (for Out(...))
}

export interface PureFuncDecl {
  name: string; // lowercase: pure computation
  params: { name: string; type?: TypeName }[];
  returns?: { name?: string; type?: TypeName } | TypeName;
  // for pure functions, we may store source text for runtime eval if desired
  src?: string;
}
