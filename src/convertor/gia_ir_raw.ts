
import assert from "assert";
import { helper, Graph, Node, Connect, todo, gia_node } from "../../utils/index.ts";
import type { ComponentDecl, IR_AnchorNode, IR_CallNode, IR_ExecutionBlock, IR_FunctionArg, IR_GraphModule, IR_InOutNode, IR_JumpNode, IR_Node, IR_NodeChain, IR_Trigger, SharedFuncDecl } from "../types/IR.ts";
import { IR_Id_Counter } from "../types/consts.ts";
import { analyzeGraph, ChainResult } from "./graph_chain_split.ts";
import type { BranchId, Token } from "../types/types.ts";

const _srcRange = { start: 0, end: 0 } as const;

class RawIRModuleBuilder {
  graph: Graph;
  /** Node to IR node id */
  node2id: Map<Node, IR_Node> = new Map();
  /** IR node id to Node */
  id2node: Map<number, Node> = new Map();
  /** [from ir id , to ir id] */
  flows: [number, number][] = []
  /** Map of node pin id, to [node id, branch index] */
  pin2flow: Map<number, [number, number]> = new Map();
  /** {node id}-{in/out}-{pin index} to pin id */
  str2pin_id: Map<string, number> = new Map();
  /** virtual node: anchor */
  id2anchor: Map<number, IR_AnchorNode> = new Map();
  /** id to some first shared node's call */
  id2shared: Map<number, IR_CallNode> = new Map();
  chains: IR_Node[][] = [];

  structure: null | ChainResult = null;

  constructor(gia: Graph) {
    this.graph = gia;
  }
  build(): IR_GraphModule {
    this.initNodes();
    this.initFlows();
    // Analyze graph structure
    this.structure = analyzeGraph(
      [...this.id2node.keys(), ...this.pin2flow.keys()],
      this.flows,
    );
    this.initAnchors();
    this.createChain();
    this.addBranches();
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
      _srcRange
    };
  }
  initNodes() {
    // Create IR nodes
    for (const n of this.graph.get_nodes()) {
      const node = ir_node(n);
      assert(!this.node2id.has(n));
      assert(!this.id2node.has(node._id));
      this.node2id.set(n, node);
      this.id2node.set(node._id, n);
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
        let in_pin = this.str2pin_id.get(to_str);
        let out_pin = this.str2pin_id.get(from_str);
        if (in_pin === undefined) {
          in_pin = IR_Id_Counter.value;
          assert(!this.pin2flow.has(in_pin));
          assert(!this.str2pin_id.has(to_str));
          this.pin2flow.set(in_pin, [from_id, f.from_index]);
          this.str2pin_id.set(from_str, in_pin);
        }
        if (out_pin === undefined) {
          out_pin = IR_Id_Counter.value;
          assert(!this.pin2flow.has(out_pin));
          assert(!this.str2pin_id.has(from_str));
          this.pin2flow.set(out_pin, [to_id, f.to_index]);
          this.str2pin_id.set(to_str, out_pin);
        }
        this.flows.push(
          [from_id, out_pin],
          [out_pin, in_pin],
          [in_pin, to_id]
        );
      }
    }
  }
  initAnchors() {
    for (const { targets } of this.structure!.chain) {
      for (const t of targets) {
        if (t === null) continue;
        if (this.id2anchor.has(t)) continue;
        // test if it is a node
        if (this.id2node.has(t)) {
          // add shared node decl
          this.addSharedNode(this.id2node.get(t)!);
          const chain = this.structure?.chain.find(c => c.starter === t);
          if (!chain) {
            // good. no outgoing branches
            continue;
          }
          for (let k = 0; k < chain.chains.length; k++) {
            const out_pin = chain.chains[k][1];
            assert(out_pin !== undefined);
            assert(!this.id2anchor.has(out_pin));
            this.id2anchor.set(out_pin, {
              kind: "anchor",
              id: anchor_name(t) + "_" + branch_name(k),
              _id: IR_Id_Counter.value,
              _srcRange
            });
          }
          continue;
        }
        // always it is a in pin
        assert(!this.id2anchor.has(t));
        this.id2anchor.set(t, {
          kind: "anchor",
          id: anchor_name(t),
          _id: IR_Id_Counter.value,
          _srcRange
        });
        // to check it is a in pin
        const flow_id = this.pin2flow.get(t);
        assert(flow_id !== undefined && this.str2pin_id.get(`${flow_id[0]}-in-${flow_id[1]}`) === t);
      }
    }
  }
  shared_nodes: Map<Node, SharedFuncDecl> = new Map();
  /** Add shared node to module */
  addSharedNode(n: Node) {
    if (this.shared_nodes.has(n)) return;
    const ir_node = this.node2id.get(n)!;
    assert(ir_node.kind === "call");
    const node: SharedFuncDecl = {
      kind: "shared",
      name: ir_node.name + "_" + ir_node._id,
      component_name: ir_node.name,
      port: null,
      _id: IR_Id_Counter.value,
      _srcRange,
    }
    assert(!this.shared_nodes.has(n));
    this.shared_nodes.set(n, node);
  }
  /** starter node id --> list of chains */
  starter_chains: Map<number, IR_NodeChain[]> = new Map();
  /** chain -> Jump to merge branch. exclude starter node/branches */
  createChain() {
    for (const chains of this.structure!.chain) {
      const res: IR_NodeChain[] = [];
      for (let i = 0; i < chains.chains.length; i++) {
        const chain = chains.chains[i];
        const nodes: IR_Node[] = [];
        for (let j = 1; j < chain.length; j++) {
          const id = chain[j];
          const ir_node = this.node2id.get(this.id2node.get(id)!)!;
          assert(ir_node.kind === "call");
          // skip pins
          if (!this.id2node.has(id)) {
            continue;
          }
          const in_pin = chain[j - 1];
          const in_node = this.pin2flow.get(in_pin);
          assert(in_node !== undefined && in_node[0] === id);
          if (in_node[1] !== 0) {
            nodes.push(ir_selector_node(ir_node, in_node[1]));
          } else {
            nodes.push(ir_node);
          }

          const out_pin = j === chain.length - 1 ? chains.targets[i] : chain[j + 1];
          assert(out_pin !== undefined);
          if (out_pin === null) continue;
          const out_node = this.pin2flow.get(out_pin);
          assert(out_node !== undefined && out_node[0] === id);
          if (out_node[1] !== 0) {
            ir_node.branches.push(ir_branch_jump_zero(branch_name(out_node[1])));
          }
        }
        const target = chains.targets[i];
        if (target !== null) {
          if (this.id2node.has(target)) {
            const last_node = nodes[nodes.length - 1]; // should be in pin
            // shared node
            const ir_shared = this.shared_nodes.get(this.id2node.get(target)!)!;
            const branch_index = this.pin2flow.get(last_node._id)![1];
            // add shared call
            nodes.push(ir_shared_node(ir_shared, branch_index));
            // add shared node call to next node jump
            nodes.push(ir_jump_node(anchor_name(target)));
          } else {
            // anchor node
            nodes.push(ir_jump_node(anchor_name(target)));
          }
        }
        res.push({
          kind: "chain",
          chain: nodes,
          suspend: false,
          _id: IR_Id_Counter.value,
          _srcRange,
        });
      }
      assert(!this.starter_chains.has(chains.starter));
      this.starter_chains.set(chains.starter, res);
    }
  }
  addBranches() {
    for (const chain of this.structure!.chain) {
      if (chain.chains.length <= 1) continue;
      const fragments = this.starter_chains.get(chain.starter);
      // **Node** with multiple outgoing branches
      // Node **Pin** with parallel branches
      if (this.id2node.has(chain.starter)) { // Node
        const ir_node = this.node2id.get(this.id2node.get(chain.starter)!)!;
      } else { // Pin
        // Branching node

      }
    }
  }
}

function ir_branch_jump_zero(branch_id?: BranchId | null): IR_CallNode["branches"][number] {
  const chain: IR_NodeChain = {
    kind: "chain",
    chain: [ir_jump_zero()],
    suspend: false,
    _id: IR_Id_Counter.value,
    _srcRange,
  };
  return {
    branchId: branch_id ?? null,
    nodes: [chain],
  }
}

function ir_jump_zero(): IR_JumpNode {
  return {
    kind: "jump",
    id: 0,
    _id: IR_Id_Counter.value,
    _srcRange,
  }
}

function ir_selector_node(node: IR_Node, index: number): IR_CallNode {
  assert(node.kind === "call");
  return {
    kind: "call",
    class: "Sys",
    specific: "Selector",
    name: "Selector",
    inputs: [{
      expr: [{ type: "identifier", value: node.name, pos: 0 }],
      name: null,
      type: null,
    }, {
      expr: [{ type: "string", value: branch_name(index), pos: 0 }],
      name: null,
      type: null,
    }],
    outputs: [],
    branches: [],
    _id: IR_Id_Counter.value,
    _srcRange,
  }
}

function anchor_name(id: number): string {
  return "ANCHOR_" + id;
}

function branch_name(index: number): string {
  return "index_" + index;
}

function ir_jump_node(target: string): IR_JumpNode {
  return {
    kind: "jump",
    id: target,
    _id: IR_Id_Counter.value,
    _srcRange,
  }
}

function token_branch_id(id: BranchId): Token {
  switch (typeof id) {
    case "string":
      return { type: "string", value: id, pos: 0 };
    case "number":
      return { type: "int", value: id.toString(), pos: 0 };
    case "boolean":
      return { type: "boolean", value: id ? "true" : "false", pos: 0 };
  }
  throw new Error("Invalid branch id type");
}

function ir_shared_node(node: SharedFuncDecl, port: BranchId): IR_CallNode {
  return {
    kind: "call",
    class: "Sys",
    name: node.name,
    inputs: [{
      expr: [token_branch_id(port)],
      name: null,
      type: null,
    }],
    outputs: [],
    branches: [],
    _id: IR_Id_Counter.value,
    _srcRange,
  };
}

function ir_node(n: Node): IR_Node {
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
    _srcRange,
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
