import { assert, assertEq, empty, todo } from "../utils.ts";
import type { Comments, GraphNode, NodeConnection, NodePin, NodePin_Index_Kind, Root } from "../protobuf/gia.proto.ts";
import { encode_node_graph_var, graph_body, node_body, node_connect_from, node_connect_to, node_type_pin_body, pin_flow_body } from "./basic.ts";
import { type NodeType, reflects_records, get_id, type_equal, is_reflect, to_node_pin } from "./nodes.ts";
import { Counter, randomInt, randomName } from "./utils.ts";
import { get_index_of_concrete, is_concrete_pin, get_generic_id, get_node_record, get_node_record_generic } from "../node_data/helpers.ts";
import { extract_value, get_graph_vars, get_node_info } from "./extract.ts";
import type { NodePinsRecords, SingleNodeData } from "../node_data/node_pin_records.ts";
import { auto_layout } from "./auto_layout.ts";

import { NODE_ID, CLIENT_NODE_ID } from "../node_data/node_id.ts";

type ServerModes = "server" | "status" | "class" | "item" | "composite";
type ClientModes = "bool" | "int" | "skill";
type AllModes = ServerModes | ClientModes;
type ServerOrClient<M extends AllModes> = M extends ServerModes ? "server" : "client";
type NodeIdFor<M extends AllModes> = M extends ServerModes ? NODE_ID : CLIENT_NODE_ID;
function isServer(mode: AllModes): mode is ServerModes {
  return mode === "server" || mode === "status" || mode === "class" || mode === "item" || mode === "composite";
}



export type AnyType =
  | number
  | string
  | boolean
  | AnyType[];


export class Graph<M extends AllModes = "server"> {
  public readonly mode: M;
  graph_name: string;
  uid: number;
  private graph_id: number;
  private file_id: number;
  private counter_idx: Counter;
  private counter_dyn_id: Counter;
  private nodes: Set<Node<M>>;
  private connects: Set<Connect>;
  private flows: Map<Node<M>, Connect[][]>;
  private comments: Set<Comment>;
  private graph_var: Map<string, GraphVar>;

  constructor(mode: M = "server" as M, uid?: number, name?: string, graph_id?: number) {
    this.mode = mode;
    this.uid = uid ?? randomInt(9, "201");
    this.graph_id = graph_id ?? randomInt(10, "102");
    this.graph_name = name ?? randomName(3);
    this.counter_idx = new Counter();
    this.counter_dyn_id = new Counter(Number(this.graph_id));

    this.file_id = this.counter_dyn_id.value;
    this.nodes = new Set();
    this.connects = new Set();
    this.flows = new Map();
    this.comments = new Set();
    this.graph_var = new Map();
  }

  private assert_is_server(): asserts this is Graph<ServerModes> {
    assert(isServer(this.mode));
  }
  private assert_is_client(): asserts this is Graph<ServerModes> {
    assert(!isServer(this.mode));
  }

  /** 
   * @param node Node Id or Instance */
  add_node(node: NodeIdFor<M> | Node<M> | null, generic_id?: number): Node<M> {
    assert(!empty(node) || !empty(generic_id));
    if (typeof node === "number") {
      // should be server node
      this.assert_is_server();
      const n = new Node(this.counter_idx.value, this.mode, node, generic_id);
      this.nodes.add(n);
      return n;
    } else if (typeof node === "string") {
      // should be client node
      this.assert_is_client();
      const n = new Node(this.counter_idx.value, this.mode, node, generic_id);
      this.nodes.add(n);
      return n;
    } else if (empty(node)) {
      const n = new Node(this.counter_idx.value, this.mode, undefined, generic_id);
      this.nodes.add(n);
      return n;
    }
    if (this.nodes.has(node)) {
      console.error("Node already set!");
      return node;
    }
    this.nodes.add(node);
    this.counter_idx.lower_bound = node.NodeIndex;
    return node;
  }
  get_nodes(): Node<M>[] {
    return [...this.nodes];
  }
  get_node(unique_id: number): Node<M> | null {
    for (const node of this.nodes) {
      if (node.NodeIndex === unique_id) {
        return node;
      }
    }
    return null;
  }
  add_connect(connect: Connect) {
    this.connects.add(connect);
  }
  add_flow(connect: Connect) {
    if (!this.flows.has(connect.from as Node<M>)) {
      this.flows.set(connect.from as Node<M>, []);
    }
    const f = this.flows.get(connect.from as Node<M>)!;
    f[connect.from_index] ??= [];
    f[connect.from_index].push(connect);
  }
  get_connects(): Connect[] {
    return [...this.connects];
  }
  get_connect_from(from: Node<M>): Connect[] {
    const ret: Connect[] = [];
    for (const connect of this.connects) {
      if (connect.from === from) {
        ret.push(connect);
      }
    }
    return ret;
  }
  get_connect_from_index(from: Node<M>, index: number): Connect | null {
    for (const connect of this.connects) {
      if (connect.from === from && connect.from_index === index) {
        return connect;
      }
    }
    return null;
  }
  get_connect_to(to: Node<M>): Connect[] {
    const ret: Connect[] = [];
    for (const connect of this.connects) {
      if (connect.to === to) {
        ret.push(connect);
      }
    }
    return ret;
  }
  get_connect_to_index(to: Node<M>, index: number): Connect | null {
    for (const connect of this.connects) {
      if (connect.to === to && connect.to_index === index) {
        return connect;
      }
    }
    return null;
  }
  get_connect(from: Node<M>, to: Node<M>, from_index: number, to_index: number): Connect | null {
    for (const connect of this.connects) {
      if (connect.from === from && connect.from_index === from_index && connect.to === to && connect.to_index === to_index) {
        return connect;
      }
    }
    return null;
  }
  get_flows(): Connect[] {
    return [...this.flows.values()].flat(2).filter(x => !empty(x));
  }
  get_flow(from: Node<M>, to: Node<M>, from_index = 0, to_index = 0): Connect | null {
    return this.flows.get(from)?.[from_index]?.find(v => v.to === to && v.to_index === to_index) ?? null;
  }
  get_flows_from(from: Node<M>): Connect[] {
    return this.flows.get(from)?.flat() ?? [];
  }
  /** returns the pointer to the flow list. if the list is not exist, returns null */
  get_flows_from_index(from: Node<M>, index: number): Connect[] | null {
    return this.flows.get(from)?.[index] ?? null;
  }
  get_flows_to(to: Node<M>): Connect[] {
    return this.get_flows().filter(v => v.to === to);
  }
  get_flows_to_index(to: Node<M>, index: number): Connect[] {
    return this.get_flows().filter(v => v.to === to && v.to_index === index);
  }
  disconnect(connect: Connect) {
    if (!this.connects.delete(connect)) {
      const flow = this.flows.get(connect.from as Node<M>)?.[connect.from_index];
      const index = flow?.findIndex(v => v === connect);
      if (empty(flow) || empty(index) || index < 0) {
        console.warn("Flow not found!", connect);
        return;
      }
      flow.splice(index, 1);
    }
  }
  /** Connect execution flow from a node to another  */
  flow(from: Node<M>, to: Node<M>, from_index = 0, to_index = 0, insert_pos?: number) {
    if (!this.flows.has(from)) {
      this.flows.set(from, []);
    }
    const f = this.flows.get(from)!;
    f[from_index] ??= [];
    f[from_index].splice(insert_pos ?? f.length, 0, new Connect(from, to, from_index, to_index));
  }
  /** Connect data flow from a  */
  connect(from: Node<M>, to: Node<M>, from_index: number, to_index: number) {
    const c = this.get_connect(from, to, from_index, to_index);
    if (c) {
      console.info("Already connected!", c.toString());
      return c;
    }
    const old_to = this.get_connect_to_index(to, to_index);
    if (old_to) {
      console.info("Already connected!", old_to.toString());
      this.disconnect(old_to);
    }
    // const old_from = this.get_connect_from_index(from, from_index);
    // if (old_from) {
    //   console.info("Already connected!", old_from.toString());
    //   this.disconnect(old_from);
    // }
    const connect = new Connect(from, to, from_index, to_index);
    this.connects.add(connect);
    return connect;
  }

  add_comment(content: string | Comment, x?: number, y?: number, attached_node: Node<M> | null = null): Comment {
    if (typeof content !== "string") {
      this.comments.add(content);
      return content;
    }
    const comment = new Comment(content, x ?? 0, y ?? 0, attached_node);
    this.comments.add(comment);
    return comment;
  }
  get_graph_comments(): Comment[] {
    return [...this.comments].filter(c => empty(c.attached_node));
  }
  get_node_comment(node: Node<M>): Comment | null {
    return [...this.comments].find(c => c.attached_node === node) ?? null;
  }

  add_graph_var(name: string, type: NodeType, exposed?: boolean, val?: AnyType): GraphVar | null {
    if (this.graph_var.has(name)) {
      console.warn("Already has a graph var of the same name!");
      return null;
    }
    exposed ??= false;
    val ??= {} as AnyType;
    const v: GraphVar = { name, type, exposed, val };
    this.graph_var.set(name, v);
    return v;
  }
  get_graph_var(name: string) {
    return this.graph_var.get(name);
  }
  get_graph_vars() {
    return [...this.graph_var.values()];
  }
  remove_graph_var(name: string) {
    return this.graph_var.delete(name);
  }
  set_graph_var(name: string, new_val: AnyType) {
    const v = this.graph_var.get(name);
    if (empty(v)) {
      console.warn("Graph Var " + name + " does not exist.");
      return;
    }
    v.val = new_val;
  }

  encode(opt?: EncodeOptions): Root {
    const option = new EncodeOptionsBuilder(opt ?? {});
    const nodes = [...this.nodes].map((n) => n.encode(option, this.get_connect_to(n), this.flows.get(n), this.get_node_comment(n)));
    const graphValues = [...this.graph_var.values()].map(v => encode_node_graph_var(v));
    return graph_body({/** 唯一标识符 */
      uid: this.uid,
      /** 图的 ID */
      graph_id: this.graph_id,
      /** 图文件的ID，可选, 通常是 graph_id + i */
      file_id: this.file_id,
      /** 图的名称，可选 */
      graph_name: this.graph_name,
      /** 图中包含的节点列表，可选 */
      nodes,
      comments: this.get_graph_comments().map(c => c.encode()),
      graphValues: graphValues,
    });
  }
  static decode(root: Root): Graph {
    const [uid, time, file_id, file_name] = root.filePath.split("-");
    const name = root.graph.name;
    const graph_id = root.graph.id.id;

    // TODO: discriminate mode!
    const graph = new Graph("server", parseInt(uid), name, graph_id);
    const graph_vars = get_graph_vars(root.graph.graph?.inner.graph!);
    graph_vars.forEach((v) => graph.graph_var.set(v.name, v));
    root.graph.graph?.inner.graph.nodes.forEach(node => {
      // node itself
      const n = graph.add_node(Node.decode(node, graph.mode));
      // comments
      if (!empty(node.comments)) {
        graph.add_comment(Comment.decode(node.comments, n));
      }

    });
    root.graph.graph?.inner.graph.nodes.forEach(node => {
      // decode connects
      const { flows, connects } = Node.decode_connects(node, graph);
      connects.forEach(c => graph.add_connect(c));
      flows.forEach(f => graph.add_flow(f));
    });
    return graph;
  }

  autoLayout(distance = 1.0, separation = 1.0) {
    auto_layout(this, distance, separation);
  }
}

export class Node<M extends AllModes = "server"> {
  public readonly mode: M;
  private node_index: number;
  private node_id: NodeIdFor<M> | null;
  private record: NodePinsRecords;
  private pin_len: [number, number];
  pins: Pin[];
  x: number = 0;
  y: number = 0;
  constructor(node_index: number, mode: M = "server" as M, concrete_id?: NodeIdFor<M>, generic_id?: number) {
    this.mode = mode;
    assert(!empty(concrete_id) || !empty(generic_id));
    // use generic_id if exist, or assume node_id is concrete, otherwise use node_id;
    const gid: number = generic_id ?? get_generic_id(concrete_id!)! ?? (typeof concrete_id === "number" ? concrete_id : parseInt(concrete_id!));
    const cid = concrete_id;

    assert(!empty(gid));

    this.node_index = node_index;
    this.node_id = cid ?? null;
    this.record = get_node_record_generic(gid) ?? {
      id: gid,
      inputs: [],
      outputs: [],
      reflectMap: undefined,
    };
    this.pins = [];
    this.pin_len = [this.record.inputs.length, this.record.outputs.length];
    // Initialize pins based on node record
    if (!empty(cid)) {
      this.setConcrete(cid);
    }
  }

  private assert_is_server(): asserts this is Graph<ServerModes> {
    assert(isServer(this.mode));
  }
  private assert_is_client(): asserts this is Graph<ServerModes> {
    assert(!isServer(this.mode));
  }

  setConcrete(id: NodeIdFor<M>) {
    assert(this.record.id === id || this.record.reflectMap?.find(x => x[0] === id) !== undefined);
    this.node_id = id;

    const rec = empty(this.record.reflectMap) ? to_node_pin(this.record) : reflects_records(this.record, id, true);
    for (let i = 0; i < rec.inputs.length; i++) {
      if (empty(this.pins[i])) {
        this.pins[i] = new Pin(this.GenericId, 3, i);
      }
      if (empty(rec.inputs[i])) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.inputs[i], isServer(this.mode));
      }
    }
    for (let j = 0; j < rec.outputs.length; j++) {
      const i = j + rec.inputs.length;
      if (empty(this.pins[i])) {
        this.pins[i] = new Pin(this.GenericId, 4, j);
      }
      if (empty(rec.outputs[j])) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.outputs[j], isServer(this.mode));
      }
    }
  }
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  encode(opt?: EncodeOptions, connects?: Connect[], flows?: Connect[][], comment?: Comment | null): GraphNode {
    const option = new EncodeOptionsBuilder(opt ?? {});
    const pins = this.pins.map((p, i) => p.encode(option, connects)).filter((p) => !empty(p));
    if (!empty(flows)) {
      for (let i = 0; i < flows.length; i++) {
        if (!empty(flows[i]) && flows[i].length !== 0) {
          pins.push(Pin.encode_flows(flows[i], i));
        }
      }
    }
    return node_body({
      /** 通用 ID */
      generic_id: this.record.id as number,
      /** 具体 ID */
      concrete_id: this.node_id as number,
      /** X 坐标 */
      x: this.x,
      /** Y 坐标 */
      y: this.y,
      pos_jitter: option.pos_jitter,
      /** 节点的引脚列表 */
      pins,
      /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
      unique_index: this.node_index,
      comment: comment?.encode(),
    });
  }

  setVal(pin: number | Pin, val: AnyType) {
    if (typeof pin === "number") {
      this.pins[pin].setVal(val);
    } else {
      pin.setVal(val);
    }
  }

  static decode<M extends AllModes>(node: GraphNode, mode: M): Node<M> {
    const info = get_node_info(node);
    const g_id = info.generic_id;
    const c_id = info.concrete_id;
    const n = new Node(node.nodeIndex, mode, isServer(mode) ? c_id as NodeIdFor<M> : undefined, g_id);
    if (!isServer(mode) && c_id !== undefined) {
      todo("extract cid using index of concrete in client nodes");
    }
    n.setPos(node.x / 300, node.y / 200);
    const values = node.pins.filter((p) => p.i1.kind === 3).map((p) => Pin.decode(p));
    info.pins.forEach((p) => {
      if (p.kind === 3) {
        // Input
        n.pins[p.index].setType(p.node_type, isServer(mode));
        const val_pin = values.find((vp) => vp.index === p.index);
        if (!empty(val_pin) && !empty(val_pin.value)) {
          n.pins[p.index].setVal(val_pin.value);
        }
      } else if (p.kind === 4) {
        // Output
        n.pins[n.pin_len[0] + p.index].setType(p.node_type, isServer(mode));
      }
    });
    return n;
  }
  static decode_connects(node: GraphNode, graph: Graph): { flows: Connect[], connects: Connect[] } {
    const flows: Connect[] = [];
    const connects: Connect[] = [];
    if (!empty(node.pins)) {
      const self_node = graph.get_node(node.nodeIndex);
      if (empty(self_node)) {
        throw new Error("Node not found for decode connects: " + node.nodeIndex);
      }
      for (const pin of node.pins) {
        if (!empty(pin.connects)) {
          if (pin.i1.kind === 2) {
            flows.push(...Connect.decode_flows(pin.connects, self_node, pin.i1.index, graph));
            continue;
          } else if (pin.i1.kind === 3) {
            connects.push(...Connect.decode_connects(pin.connects, self_node, pin.i1.index, graph));
            continue;
          } else if (pin.i1.kind === 4) {
            // not sure why some will remain
            continue;
          }
          throw new Error("Unreachable");
        }
      }
    }
    return { flows, connects };
  }

  get NodeIndex() {
    return this.node_index;
  }
  get GenericId() {
    return this.record.id;
  }
  /** May return `undefined` when the node is constructed with **only** generic id for **generic node** */
  get ConcreteId() {
    return this.node_id;
  }
}


export class Pin {
  public readonly generic_id: number;
  public readonly kind: number; // 1,2,3,4
  public readonly index: number;
  /** concrete id, null for none ref node */
  indexOfConcrete: number | null;
  /** null type means normal pin without any determined info */
  type: NodeType | null;
  value: AnyType | null;
  constructor(generic_id: number, kind: number, index: number) {
    this.generic_id = generic_id;
    this.kind = kind;
    this.index = index;
    this.type = null;
    this.indexOfConcrete = null;
    this.value = null;
  }
  setVal(val: AnyType) {
    assert(this.kind === 3); // in params
    this.value = val;
  }
  clear() {
    this.type = null;
    this.indexOfConcrete = null;
    this.value = null;
  }
  // auto change index of concrete
  setType(type: NodeType, is_server: boolean) {
    if (!empty(this.type) && type_equal(this.type, type)) {
      return;
    }
    this.type = type;
    this.indexOfConcrete = get_index_of_concrete(this.generic_id, this.kind === 3, this.index, this.type, is_server);
  }
  encode(opt?: EncodeOptions, connects?: Connect[]): NodePin | null {
    const option = new EncodeOptionsBuilder(opt ?? {});
    if (empty(this.type)) {
      // Normal pin without determined type
      return null;
    }
    // if (this.kind === 4 || this.kind === 1) return null;
    // if (connects?.length !== 0) debugger;
    const connect = connects?.find((c) => this.kind === 3 && c.to_index === this.index)?.encode(); // input can be connected
    const pin = node_type_pin_body({
      reflective: this.indexOfConcrete !== null,
      /** 引脚类型 (输入/输出) */
      kind: this.kind as NodePin_Index_Kind,
      /** 引脚索引 */
      index: this.index,
      /** 节点类型系统中的类型描述对象 NodeType */
      type: this.type,
      /** 具体类型的索引，用于支持类型实例化 */
      indexOfConcrete: this.indexOfConcrete ?? undefined,
      /** 引脚的初始值，可选 */
      value: this.value ?? undefined,
      fill_undefined: option.fill_undefined === false ? undefined : option.fill_undefined === true ? 0 : option.fill_undefined,
      connects: connect === undefined ? undefined : [connect],
    });
    return pin;
  }
  static decode(pin: NodePin): { index: number, value: AnyType | undefined } {
    return { index: pin.i1.index, value: extract_value(pin.value) };
  }
  static encode_flows(flows: Connect[], index: number = 0): NodePin {
    return pin_flow_body({
      index,
      connects: flows.map((f) => f.encode_flow()),
    })
  }
}

export class Connect {
  from: Node<AllModes>;
  from_index: number;
  to: Node<AllModes>;
  to_index: number;
  constructor(from: Node<AllModes>, to: Node<AllModes>, from_index: number, to_index: number) {
    this.from = from;
    this.from_index = from_index;
    this.to = to;
    this.to_index = to_index;
  }
  encode() {
    return node_connect_from(this.from.NodeIndex, this.from_index);
  }
  encode_flow() {
    return node_connect_to(this.to.NodeIndex, this.to_index);
  }
  static decode_connects(connects: NodeConnection[], self_node: Node<AllModes>, self_index: number, graph: Graph): Connect[] {
    const ret: Connect[] = [];
    for (const c of connects) {
      const from_node = graph.get_node(c.id);
      if (empty(from_node)) {
        console.warn("Node not found for connect:", c.id);
        continue;
      }
      ret.push(new Connect(from_node, self_node, c.connect.index, self_index));
    }
    return ret;
  }
  static decode_flows(connects: NodeConnection[], self_node: Node<AllModes>, self_index: number, graph: Graph): Connect[] {
    const ret: Connect[] = [];
    for (const c of connects) {
      const to_node = graph.get_node(c.id);
      if (empty(to_node)) {
        console.warn("Node not found for flow:", c.id);
        continue;
      }
      ret.push(new Connect(self_node, to_node, self_index, c.connect.index));
    }
    return ret;
  }
  toString() {
    return `${this.from.NodeIndex}-${this.from_index} -> ${this.to.NodeIndex}-${this.to_index}`;
  }
}

export class Comment {
  content: string;
  x: number;
  y: number;
  attached_node: Node<AllModes> | null;
  constructor(content: string, x: number, y: number, attached_node: Node<AllModes> | null = null) {
    this.content = content;
    this.x = x;
    this.y = y;
    this.attached_node = attached_node;
  }
  attachTo(node: Node<AllModes> | null) {
    this.attached_node = node;
  }
  encode(): Comments {
    if (empty(this.attached_node)) {
      return {
        content: this.content,
        x: this.x,
        y: this.y,
      };
    } else {
      return {
        content: this.content,
      };
    }
  }
  static decode(c: Comments, parent?: Node<AllModes>): Comment {
    return new Comment(
      c.content,
      c.x ?? 0,
      c.y ?? 0,
      parent,
    );
  }
}

export interface EncodeOptions {
  pos_jitter?: boolean;
  fill_undefined?: boolean | number;
}
export class EncodeOptionsBuilder implements Required<EncodeOptions> {
  pos_jitter: boolean;
  fill_undefined: boolean | number;
  constructor({ pos_jitter = true, fill_undefined = false }: EncodeOptions) {
    this.pos_jitter = pos_jitter;
    this.fill_undefined = fill_undefined;
  }
}

export type GraphVar = {
  name: string;
  exposed: boolean;
  type: NodeType;
  val: AnyType;
};



if (import.meta.main) {
  // Test Graph Encoding
  console.time("graph_encode");

  const graph = new Graph("server");
  const node1 = graph.add_node(200); // add int
  const node2 = graph.add_node(201); // add float
  const node3 = graph.add_node(202); // sub int
  node1.setPos(1, 2);
  node2.setPos(3, 4);
  graph.connect(node1, node2, 0, 0);
  graph.connect(node3, node1, 0, 1);
  graph.connect(node3, node1, 0, 0);
  graph.connect(node3, node2, 0, 0);
  graph.autoLayout();
  const g = graph.encode();

  console.timeEnd("graph_encode");

  console.dir(g, { depth: Infinity });

}
