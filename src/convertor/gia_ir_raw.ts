
import assert from "assert";
import { helper, Graph, Node, Connect, todo, gia_node } from "../../utils/index.ts";
import type { IR_CallNode, IR_FunctionArg, IR_GraphModule, IR_Node } from "../types/IR.ts";
import { IR_Id_Counter } from "../types/consts.ts";
import { analyzeGraph } from "./graph_chain_split.ts";

export function giaToRawIRModule(g: Graph): IR_GraphModule {
  const node_map = new Map<Node, IR_Node>();
  const id_node_map = new Map<number, Node>();
  const flow_map = new Map<Connect, [number, number]>();
  for (const n of g.get_nodes()) {
    const ir_node = node_to_raw_ir(n);
    node_map.set(n, ir_node);
    id_node_map.set(ir_node._id, n);
  }
  for (const f of g.get_flows()) {
    flow_map.set(f, [
      node_map.get(f.from)!._id,
      node_map.get(f.to)!._id,
    ]);
  }
  const structure = analyzeGraph(
    Array.from(id_node_map.keys()),
    Array.from(flow_map.values()),
  );


  return {
    kind: "module",
    imports: [],
    globals: [],
    node_vars: [],
    local_vars: [],
    defines: [],
    components: [],
    lambdas: [],
    shared_funcs: [],
    graph: [],
    _id: IR_Id_Counter.value,
    _srcRange: {
      start: 0,
      end: 0
    }
  }
}

function node_to_raw_ir(n: Node): IR_CallNode {
  const gid = n.GenericId;
  const cid: number | undefined = n.ConcreteId;
  if (cid === undefined) {
    return todo("Handle nodes without ConcreteId in giaToRawIRModule");
  }
  const node_name = helper.get_node_name_from_id(cid);
  const name = "_" + node_name?.replaceAll("_", "");
  return {
    kind: "call",
    class: "Sys",
    name: name,
    inputs: [],
    outputs: [],
    branches: [],
    _id: IR_Id_Counter.value,
    _srcRange: {
      start: 0,
      end: 0
    }
  };
}

// function to_ir_function_arg(type: ): IR_FunctionArg {
//   return {
//     expr: [],
//     name: null,
//     type: null
//   };
// }