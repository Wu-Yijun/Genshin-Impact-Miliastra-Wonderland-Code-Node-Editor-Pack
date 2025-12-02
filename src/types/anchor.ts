import type { NodeId } from "./IR_defs.ts";

export interface AnchorRef {
  id: string | number | boolean;
  nodeId: NodeId; // target IRNode id that defines the anchor
}
