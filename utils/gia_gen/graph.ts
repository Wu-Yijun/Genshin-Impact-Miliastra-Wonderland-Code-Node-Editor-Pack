import type { GraphNode } from "../protobuf/gia.proto.ts";
import { node_type_node_body, NodeTypeNodeBody_ } from "./basic";
import { Counter, randomInt, randomName } from "./utils.ts";


const GraphType = ["server", "client", "composite"] as const;
type GraphType = typeof GraphType[number];
class Graph {
  private type_: GraphType;
  graph_name: string;
  graph_id: number;
  uid: number;
  counter_idx: Counter;
  counter_dyn_id: Counter;
  nodes: Node[];

  get type() {
    return this.type_;
  }
  constructor(type: GraphType = "server", uid?: number, name?: string, g_id?: number) {
    this.type_ = type;
    this.uid = uid ?? randomInt(9, "201");
    this.graph_id = g_id ?? randomInt(10, "102");
    this.graph_name = name ?? randomName(3);
    this.counter_idx = new Counter();
    this.counter_dyn_id = new Counter(Number(this.graph_id));

    this.nodes = [];
  }
  add_node(node: number | Node): Node {
    if (typeof node === "number") {
      const n = new Node(node);
      this.nodes.push(n);
      return n;
    }
    if (this.nodes.includes(node)) {
      console.error("Node already set!");
      return node;
    }
    this.nodes.push(node);
    return node;
  }

}

class Node {
  private id: number;
  private node_type: number;
  x: number = 0;
  y: number = 0;
  constructor(node_type: number, id: number) {
    this.id = id;
    this.node_type = node_type;
  }
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  toNode(): GraphNode {
    const body: NodeTypeNodeBody_ = {
      x: this.x,
      y: this.y,
      unique_index: this.id,
    };
    return node_type_node_body(body);
  }

}