import type { TypeName } from "./IR_defs.ts";

export interface StructDecl {
  name: string;
  fields: {
    name: string;
    type: TypeName;
    default?: any;
  }[];
}

// This
export interface GlobalDecl {
  name: string;
  type: TypeName;
  default?: any;
}

// node.
export interface NodeVarDecl {
  name: string;
  type: TypeName;
  default?: any;
}

export interface TimerDecl {
  name: string; /* optional metadata */
  countdown: boolean;
}

export interface SignalDecl {
  name: string;
  params: { name: string; type: TypeName }[];
}
