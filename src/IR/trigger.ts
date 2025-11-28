import type { TypeName } from "./IR_defs.ts";
import type { IRNode } from "./IR_node.ts";

export interface TriggerDecl {
  id: string; // unique id (e.g. "OnCreate", "Signal:PlayerHit", "Timer:five_second")
  kind: "Event" | "Signal" | "Timer";
  params: { name: string; type?: TypeName }[]; // trigger parameters (e.g. [val] for OnVarChange)
  root: IRNode; // entry node (entry is a pseudo-node representing the trigger)
}
