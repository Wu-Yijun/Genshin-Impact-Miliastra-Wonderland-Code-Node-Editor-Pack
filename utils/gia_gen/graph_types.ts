import { CLIENT_NODE_ID, NODE_ID } from "../node_data/node_id.ts";

type ServerModes = "server" | "status" | "class" | "item" | "composite";
type ClientModes = "bool" | "int" | "skill";
type AllModes = ServerModes | ClientModes;
type ServerOrClient<M extends AllModes> = M extends ServerModes ? "server" : "client";
type NodeIdFor<C extends AllModes> = C extends ServerModes ? NODE_ID : CLIENT_NODE_ID;


// ===== Graph 类 =====
class Graph<M extends AllModes = "server"> {
  public readonly mode: M;
  constructor(mode: M = "server" as M) {
    this.mode = mode;
  }
  add_node(key: NodeIdFor<M>): void {
    console.log(`Mode: ${this.mode}, Key: ${key}`);
  }
}

const a = new Graph();
console.dir(a);