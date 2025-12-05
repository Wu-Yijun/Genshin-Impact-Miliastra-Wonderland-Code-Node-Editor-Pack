
import assert from "assert";
import { helper, Graph, Node, Connect, todo, gia_node } from "../../utils/index.ts";
import type { ComponentDecl, IR_AnchorNode, IR_CallNode, IR_ExecutionBlock, IR_FunctionArg, IR_GraphModule, IR_InOutNode, IR_Node, IR_NodeChain, IR_Trigger } from "../types/IR.ts";
import { IR_Id_Counter } from "../types/consts.ts";
import { analyzeGraph } from "./graph_chain_split.ts";

const _srcRange = { start: 0, end: 0 } as const;

class RawIRModuleBuilder {
  graph: Graph;
  /** Node to IR node id */
  node2id: Map<Node, IR_Node> = new Map();
  /** IR node id to Node */
  id2node: Map<number, Node> = new Map();
  /** [from ir id , to ir id] */
  flows: [number, number][] = []
  /** Map of node out branch **virtual id**, to [node id, branch index] */
  id2flow: Map<number, [number, number]> = new Map();
  /** {branch id}-{in/out}-{pin index} to virtual node id */
  str2flow_id: Map<string, number> = new Map();
  /** virtual node: anchor */
  id2anchor: Map<number, IR_AnchorNode> = new Map();
  chains: IR_Node[][] = [];

  structure: null | ;

  constructor(gia: Graph) {
    this.graph = gia;
  }
  build(): IR_GraphModule {
    this.initNodes();
    this.initFlows();
    // Analyze graph structure
    this.structure = analyzeGraph(
      [...this.id2node.keys(), ...this.id2flow.keys()],
      this.flows,
    );

  }
  initNodes() {
    // Create IR nodes
    for (const n of this.graph.get_nodes()) {
      const ir_node = node_to_raw_ir(n);
      this.node2id.set(n, ir_node);
      this.id2node.set(ir_node._id, n);
    }
  }
  initFlows() {
    // Create flows
    for (const n of this.graph.get_nodes()) {
      for (const f of this.graph.get_flows_from(n)) {
        const from_id = this.node2id.get(f.from)!._id;
        const to_id = this.node2id.get(f.to)!._id;
        const from_str = `${from_id}-out-${f.from_index}`;
        const to_str = `${to_id}-in-${f.to_index}`;
        let in_vid = this.str2flow_id.get(to_str);
        let out_vid = this.str2flow_id.get(from_str);
        if (in_vid === undefined) {
          in_vid = IR_Id_Counter.value;
          this.id2flow.set(in_vid, [from_id, f.from_index]);
          this.str2flow_id.set(from_str, in_vid);
        }
        if (out_vid === undefined) {
          out_vid = IR_Id_Counter.value;
          this.id2flow.set(out_vid, [to_id, f.to_index]);
          this.str2flow_id.set(to_str, out_vid);
        }
        this.flows.push(
          [from_id, out_vid],
          [out_vid, in_vid],
          [in_vid, to_id]
        );
      }
    }
  }
  initAnchors() {
    for (const { targets } of this.structure.chain) {
      for (const t of targets) {
        if (t === null) continue;
        if (this.id2anchor.has(t)) continue;
        this.id2anchor.set(t, {
          kind: "anchor",
          id: "ANCHOR_" + t,
          _id: IR_Id_Counter.value,
          _srcRange
        });
      }
    }
  }
  initBranches(){
    for(const chain of this.structure.chain){
      if(chain.chains.length <= 1) continue;
      // create a  branch node
    }
  }
}

export function giaToRawIRModule(g: Graph): IR_GraphModule {




  for (const chain of structure.chain) {
    const chain_nodes: IR_Node[] = [];
    chains.push(chain_nodes);
    if (anchors.has(chain.starter)) {
      chain_nodes.push(anchors.get(chain.starter)!);
    }
    chain_nodes.push(get_node(chain.starter));
    if (chain.chains.length > 1) {
      // add branch nodes?
    }
  }


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
    graph: chains.map(nodes_to_execution_block),
    _id: IR_Id_Counter.value,
    _srcRange
  }
}

function node_to_raw_ir(n: Node): IR_Node {
  const gid = n.GenericId;
  const cid: number | undefined = n.ConcreteId;
  if (cid === undefined) {
    const node_name = helper.get_node_name_from_id(gid, true);
    const name = "_" + node_name?.replaceAll("_", "");
    return {
      kind: "call",
      class: "Sys",
      name: name,
      inputs: [],
      outputs: [],
      branches: [],
      _id: IR_Id_Counter.value,
      _srcRange,
    };
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

function nodes_to_execution_block(chains: IR_Node[]): IR_ExecutionBlock {
  const starter = chains[0] as IR_Trigger | IR_AnchorNode | IR_InOutNode;
  const chain: IR_NodeChain = {
    kind: "chain",
    chain: chains.slice(1),
    suspend: false,
    _id: IR_Id_Counter.value,
    _srcRange,
  };
  return {
    kind: "block",
    starter: starter,
    chain: [chain],
    _id: IR_Id_Counter.value,
    _srcRange,
  };
}
