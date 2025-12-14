
import { assert } from "../../utils/utils.ts";
import { helper, Graph, Node, Connect, gia_node } from "../../utils/index.ts";
import type { ComponentDecl, IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_ExecutionBlock, IR_FunctionArg, IR_GraphModule, IR_InOutNode, IR_JumpNode, IR_Node, IR_NodeChain, IR_Trigger, SharedFuncDecl } from "../types/IR.ts";
import { IR_Id_Counter } from "../types/consts.ts";
import { analyzeGraph, ChainResult } from "./graph_chain_split.ts";
import type { BranchId, Token } from "../types/types.ts";

const _srcRange = { start: 0, end: 0 } as const;

class RawIRModuleBuilder {
  graph: Graph;
  /** Node to IR node id */
  node2id: Map<Node<any>, IR_Node> = new Map();
  /** IR node id to Node */
  id2node: Map<number, Node<any>> = new Map();
  /** [from ir id , to ir id] */
  flows: [number, number][] = []
  /** Map of node pin id, to [node id, branch index] */
  pin2flow: Map<number, [number, number]> = new Map();
  /** {node id}-{in/out}-{pin index} to pin id */
  str2pin_id: Map<string, number> = new Map();


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
    // Add anchors, branches, shared decls, selectors, and modify cases
    this.addAnchor();
    this.addBranch();
    this.addSharedDecl();
    this.addSelectorDecl();
    this.addNodeAnchor();
    this.modifyCases();
    // link as chain
    this.createAllChain();
    this.linkChainToBranches();
    this.linkChainToCases();

    // Link starter/Anchor with chain.


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

  id2anchor: Map<number, IR_AnchorNode> = new Map();
  id2branch: Map<number, IR_BranchNode> = new Map();
  id2shared_decl: Map<number, SharedFuncDecl> = new Map();
  id2selector: Map<number, IR_CallNode> = new Map();
  /** 循环遍历每一个节点, 如果发现这些特征, 则创建这些节点:
   *  - in pin with multi in_deg: Anchor before it. saved to id2anchor
   *  - out pin with multi out_deg: Branch after it. saved to id2branch
   *  - node with multi in_deg: Shared Func for it. saved to id2shared_decl
   *  - node with single in_deg but not the first: Selector Func for it. saved to id2selector
   *  - node with single out_deg but not the first: modified to Cases on itself to jump out
   *  - node with multi out_deg and are not shared: create anchor before it saving to id2anchor
   *  - node with multi out_deg: modified to Cases on itself; <--- not considered before chain makes
   * 
   * nodes could be (shared, anchored, )
   * */
  addAnchor() {
    for (const id of this.pin2flow.keys()) {
      const in_deg = this.structure!.in_deg.get(id)!;
      // const out_deg = this.structure!.out_deg.get(node_id)!;
      if (in_deg > 1) { // must be in pin
        // anchor
        this.id2anchor.set(id, {
          kind: "anchor",
          _id: IR_Id_Counter.value,
          _srcRange,
          id: anchor_name(id),
        });
      }
    }
  }
  addBranch() {
    for (const id of this.pin2flow.keys()) {
      const out_deg = this.structure!.out_deg.get(id)!;
      if (out_deg > 1) { // must be out pin
        // branch
        this.id2branch.set(id, {
          kind: "branch",
          _id: IR_Id_Counter.value,
          _srcRange,
          branches: []
        });
      }
    }
  }
  addSharedDecl() {
    for (const id of this.node2id.values()) {
      const in_deg = this.structure!.in_deg.get(id._id)!;
      assert(id.kind === "call");
      // const out_deg = this.structure!.out_deg.get(node_id)!;
      if (in_deg > 1) {
        // shared decl
        this.id2shared_decl.set(id._id, {
          kind: "shared",
          _id: IR_Id_Counter.value,
          _srcRange,
          name: id.name + "_" + id._id,
          component_name: id.name,
          port: null
        });
      }
    }
  }
  addSelectorDecl() {
    for (const [node, id] of this.node2id) {
      assert(id.kind === "call");
      const in_deg = this.structure!.in_deg.get(id._id)!;
      if (in_deg !== 1) continue;
      const index = remove_duplicates(this.graph.get_flows_to(node).map(f => f.to_index));
      assert(index.length === 1);
      if (index[0] === 0) continue;
      // selector
      this.id2selector.set(id._id, {
        kind: "call",
        _id: IR_Id_Counter.value,
        _srcRange,
        class: "Sys",
        name: "Selector",
        specific: "Selector",
        inputs: [{
          expr: [{
            type: "identifier",
            value: id.name,
            pos: 0
          }, {
            type: "int",
            value: index[0].apply.toString(),
            pos: 0
          }],
          name: null,
          type: null
        }],
        outputs: [],
        branches: []
      });
    }
  }
  addNodeAnchor() {
    for (const id of this.node2id.values()) {
      assert(id.kind === "call");
      const out_deg = this.structure!.out_deg.get(id._id)!;
      if (out_deg <= 1) continue;
      if (this.id2shared_decl.has(id._id)) continue;
      // anchor before
      this.id2anchor.set(id._id, {
        kind: "anchor",
        _id: IR_Id_Counter.value,
        _srcRange,
        id: anchor_name(id._id),
      });
    }
  }
  modifyCases() {
    for (const [node, id] of this.node2id) {
      assert(id.kind === "call");
      const out_deg = this.structure!.out_deg.get(id._id)!;
      if (out_deg === 0) continue;
      const index = remove_duplicates(this.graph.get_flows_from(node).map(f => f.from_index));
      if (index.length === 1) {
        id.branches.push(ir_branch_jump_to(branch_name(index[0]), 0));
        continue;
      } else {
        for (const i of index.sort()) {
          id.branches.push(ir_branch_jump_to(branch_name(i), undefined));
        }
      }
    }
  }


  createChain(chain: number[]): IR_Node[] {
    const nodes: IR_Node[] = [];
    for (let j = 1; j < chain.length; j++) {
      const id = chain[j];
      const ir_node = this.node2id.get(this.id2node.get(id)!)!;
      assert(ir_node.kind === "call");
      // skip pins
      if (!this.id2node.has(id)) {
        continue;
      }
      const selector = this.id2selector.get(id);
      if (selector !== undefined) {
        // use selector
        move_data(selector, ir_node);
        nodes.push(selector);
      } else {
        // use node
        nodes.push(ir_node);
      }
    }
    return nodes;
  }
  /** starter node id --> list of chains */
  starter_chains: Map<number, IR_NodeChain[]> = new Map();
  /** Notice! only save the FIRST created Shared Instance for some id */
  id2shared: Map<number, IR_CallNode> = new Map();
  /** chain -> Jump to merge branch. exclude starter node/branches */
  createAllChain() {
    for (const chains of this.structure!.chain) {
      const res: IR_NodeChain[] = [];
      for (let i = 0; i < chains.chains.length; i++) {
        const chain = this.createChain(chains.chains[i]);

        const target = chains.targets[i];
        if (target !== null) {
          if (this.id2anchor.has(target)) {
            // jump to some anchor (before pins, or before single in multi out node)
            chain.push(ir_jump_to(anchor_name(target)));
          } else {
            // call for shared decl
            const ir_node = this.node2id.get(this.id2node.get(target)!)!;
            assert(ir_node.kind === "call");
            const shared = this.id2shared_decl.get(target);
            assert(shared !== undefined);
            const from_pin = chain[chain.length - 1];
            const index = this.pin2flow.get(from_pin._id)![1];
            assert(index !== undefined);
            const node = ir_call_shared(shared, index);
            move_data(node, ir_node);
            if (this.id2shared.get(target) === undefined) this.id2shared.set(target, node);
            chain.push(node);
          }
        }

        res.push({
          kind: "chain",
          chain: chain,
          suspend: false,
          _id: IR_Id_Counter.value,
          _srcRange,
        });
      }
      this.starter_chains.set(chains.starter, res);
    }
  }

  linkChainToBranches() {
    for (const chain of this.structure!.chain) {
      const branch = this.id2branch.get(chain.starter);
      if (branch === undefined) continue;
      const branches = this.starter_chains.get(chain.starter)!
        .map((nodes, id) => ({ id, nodes: [nodes] }));
      branch.branches.push(...branches);
    }
  }
  linkChainToCases() {
    for (const chain of this.structure!.chain) {
      const selector = this.id2selector.get(chain.starter);
      if (selector === undefined) continue;
      const branches = this.starter_chains.get(chain.starter)!
        .map((nodes, id) => ({ branchId: branch_name(id), nodes: [nodes] }));
      selector.branches.push(...branches);
    }
  }

  /**
   * Starters should be either:
   * - Node whose in_deg = 0
   * - Node with branch before
   * - 
   */
}

function move_data(dest: IR_CallNode, src: IR_CallNode) {
  dest.branches.push(...src.branches.splice(0));
  dest.inputs.push(...src.inputs.splice(0));
  dest.outputs.push(...src.outputs.splice(0));
}

function remove_duplicates<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  return [...new Set(arr)];
}

/** branch_id is the branch id of the node, jump_to is the branch id of the next node
 * By not setting jump_to, the chain will set to empty
 */
function ir_branch_jump_to(branch_id?: BranchId | null, jump_to?: BranchId): IR_CallNode["branches"][number] {
  const chain: IR_NodeChain = {
    kind: "chain",
    chain: jump_to === undefined ? [] : [ir_jump_to(jump_to)],
    suspend: false,
    _id: IR_Id_Counter.value,
    _srcRange,
  };
  return {
    branchId: branch_id ?? null,
    nodes: [chain],
  }
}

function ir_jump_to(target: BranchId): IR_JumpNode {
  return {
    kind: "jump",
    id: target,
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

function ir_call_shared(node: SharedFuncDecl, port: BranchId): IR_CallNode {
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


function ir_node(n: Node<any>): IR_Node {
  const gid = n.GenericId;
  const cid: number | string | null = n.ConcreteId;
  if (cid === null) {
    const node_name = helper.get_node_name_from_gid(gid);
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
  const node_name = helper.get_node_name_from_cid(cid);
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


if(import.meta.main) {
  // For test
}