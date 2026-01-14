import { Graph as GraphImpl, type NodeType, parse, UNK_TYPE } from "../../utils/index.ts";
import { NodeHelper } from "../../utils/node_data/instances.ts";
import type { NodeDef } from "../../utils/node_data/types.ts";
import { MathFunctionMaps, QueryFunctionMaps } from "../types/const.fun_names.ts";
import type { BranchId } from "../types/types.ts";

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
    const nodeDef = solve_function(node.identifier);
    switch (node.kind) {
      case "inout":
        throw new Error("Not implemented");
      case "jump":
        console.error("Bad Code!");
      case "call":
      case "Trigger":
        return this.g.add_node(nodeDef.Identifier)!.node_index.toString() + "__node_id";
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

export function solve_function(function_name: string): NodeDef {
  const find = NodeHelper.getByIdentifier(function_name);
  if (find) return find;
  const node = NodeHelper.findSimilar(function_name);
  if (node.length === 0) {
    throw new Error(`Node ${function_name} not found`);
  }
  console.log("Similar nodes for", function_name, "are", node.map(x => x.Identifier));
  return node[0];
}

// 外部提供的类型推导函数
export function solve_pure_data_node(
  callee_name: string,
  arg_types: NodeType[]
): { identifier: string, args: string[], return_identifier: string, return_type: NodeType } {
  let [range, name] = callee_name.split(".");
  if (range === "m") {
    name = MathFunctionMaps[name] ?? ("Arithmetic." + name);
  } else if (range === "q") {
    name = QueryFunctionMaps[name] ?? ("Query." + name);
  } else {
    console.error("[Error] Unknown range", range);
    name = callee_name;
  }
  let node = NodeHelper.getByIdentifier(name);
  if (node === undefined) {
    const nodes = NodeHelper.findSimilar(name);
    if (nodes.length === 0) {
      throw new Error(`Node ${name} not found`);
    }
    console.log(arg_types);
    console.log("Similar nodes for", name, "are", nodes.map(x => x.Identifier));
    node = nodes[0];
  }

  const out = node.DataPins.find(x => x.Direction === "Out")!;
  return {
    identifier: node.Identifier,
    args: node.DataPins.filter(x => x.Direction === "In").map(x => x.Identifier),
    return_identifier: out.Identifier,
    return_type: parse(out.Type!),
  };
}
