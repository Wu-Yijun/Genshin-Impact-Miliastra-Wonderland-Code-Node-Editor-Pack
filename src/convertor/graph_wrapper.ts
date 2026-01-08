import { Graph as GraphImpl } from "../../utils/index.ts";
import { BranchId } from "../types/types.ts";

interface AddInOutNode {
  kind: "inout";
  identifier: "In" | "Out";
  id: BranchId;
}

interface CallNode {
  kind: "call";
  identifier: string;
  target?: BranchId; // for jump node only
}
interface JumpNode {
  kind: "jump";
  identifier: string;
  target?: BranchId; // for jump node only
}
interface TriggerNode {
  kind: "Trigger";
  identifier: string;
}

export class Graph {
  g: GraphImpl;

  constructor() {
    this.g = new GraphImpl();
  }

  add_node(node: AddInOutNode | CallNode | TriggerNode | JumpNode): string {
    switch (node.kind) {
      case "inout":
        throw new Error("Not implemented");
      case "jump":
        console.error("Bad Code!");
      case "call":
      case "Trigger":
        return this.g.add_node(node.identifier)!.node_index.toString() + "__node_id";
    }
    // return this.g.add_node(data);
  }

  /** 数据流连接 */
  connect(srcNode: string, dstNode: string, srcPort: string, dstPort: string): void {
    this.g.connect(this.g.nodes.get(parseInt(srcNode))!, this.g.nodes.get(parseInt(dstNode))!, srcPort, dstPort);

  }
  /** 控制流连接 */
  flow(srcNode: string, dstNode: string, srcPort: string, dstPort: string, order?: number) {
    this.g.flow(this.g.nodes.get(parseInt(srcNode))!, this.g.nodes.get(parseInt(dstNode))!, srcPort, dstPort, order);
  }
  /** 设置端口默认值 (用于 Literal / Define) */
  set_default(nodeId: string, port: string, value: any): void {
    this.g.nodes.get(parseInt(nodeId))!.setVal(port, value);
  }
}