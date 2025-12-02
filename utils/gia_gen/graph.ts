import assert from "assert";
import type { Comments, GraphNode, NodeConnection, NodePin, NodePin_Index_Kind, Root } from "../protobuf/gia.proto.ts";
import { graph_body, node_body, node_connect_from, node_connect_to, node_type_pin_body, pin_flow_body } from "./basic.ts";
import { type NodeType, reflects_records, get_id, type_equal, to_records_full, is_reflect } from "./nodes.ts";
import { Counter, panic, randomInt, randomName } from "./utils.ts";
import { get_concrete_index, is_concrete_pin, get_generic_id, get_node_record, get_node_record_generic } from "../node_data/helpers.ts";
import { extract_value, get_node_info } from "./extract.ts";
import { type SingleNodeData } from "../node_data/node_pin_records.ts";
import { auto_layout } from "./auto_layout.ts";


const GraphType = ["server", "client", "composite"] as const;
type GraphType = typeof GraphType[number];

function empty(v: any): v is null | undefined {
  return v === undefined || v === null;
}

export type AnyType =
  | number
  | string
  | boolean
  | AnyType[];

export class EncodeOptions {
  private non_zero: boolean;
  is_non_zero(): boolean {
    return this.non_zero;
  }
  constructor(non_zero = false) {
    this.non_zero = non_zero;
  }
}

export class Graph {
  private type_: GraphType;
  graph_name: string;
  uid: number;
  private graph_id: number;
  private file_id: number;
  private counter_idx: Counter;
  private counter_dyn_id: Counter;
  private nodes: Set<Node>;
  private connects: Set<Connect>;
  private flows: Map<Node, Connect[][]>;
  private comments: Set<Comment>;

  get type() {
    return this.type_;
  }
  constructor(type: GraphType = "server", uid?: number, name?: string, graph_id?: number) {
    this.type_ = type;
    if (type !== "server") {
      panic("Only 'server' type graph is supported currently.");
    }
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
  }
  /** 
   * @param node Node Id or Instance */
  add_node(node: number | Node | null, generic_id?: number): Node {
    assert(!empty(node) || !empty(generic_id));
    if (typeof node === "number") {
      const n = new Node(this.counter_idx.value, node, generic_id);
      this.nodes.add(n);
      return n;
    } else if (empty(node)) {
      const n = new Node(this.counter_idx.value, undefined, generic_id);
      this.nodes.add(n);
      return n;
    }
    if (this.nodes.has(node)) {
      console.error("Node already set!");
      return node;
    }
    this.nodes.add(node);
    return node;
  }
  get_nodes(): Node[] {
    return [...this.nodes];
  }
  get_node(unique_id: number): Node | null {
    for (const node of this.nodes) {
      if (node.UniqueId === unique_id) {
        return node;
      }
    }
    return null;
  }
  add_connect(connect: Connect) {
    this.connects.add(connect);
  }
  add_flow(connect: Connect) {
    if (!this.flows.has(connect.from)) {
      this.flows.set(connect.from, []);
    }
    const f = this.flows.get(connect.from)!;
    f[connect.from_index] ??= [];
    f[connect.from_index].push(connect);
  }
  get_connects(): Connect[] {
    return [...this.connects];
  }
  get_connect_from(from: Node): Connect[] {
    const ret: Connect[] = [];
    for (const connect of this.connects) {
      if (connect.from === from) {
        ret.push(connect);
      }
    }
    return ret;
  }
  get_connect_from_index(from: Node, index: number): Connect | null {
    for (const connect of this.connects) {
      if (connect.from === from && connect.from_index === index) {
        return connect;
      }
    }
    return null;
  }
  get_connect_to(to: Node): Connect[] {
    const ret: Connect[] = [];
    for (const connect of this.connects) {
      if (connect.to === to) {
        ret.push(connect);
      }
    }
    return ret;
  }
  get_connect_to_index(to: Node, index: number): Connect | null {
    for (const connect of this.connects) {
      if (connect.to === to && connect.to_index === index) {
        return connect;
      }
    }
    return null;
  }
  get_connect(from: Node, to: Node, from_index: number, to_index: number): Connect | null {
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
  get_flow(from: Node, to: Node, from_index = 0, to_index = 0): Connect | null {
    return this.flows.get(from)?.[from_index]?.find(v => v.to === to && v.to_index === to_index) ?? null;
  }
  get_flows_from(from: Node): Connect[] {
    return this.flows.get(from)?.flat() ?? [];
  }
  /** returns the pointer to the flow list. if the list is not exist, returns null */
  get_flows_from_index(from: Node, index: number): Connect[] | null {
    return this.flows.get(from)?.[index] ?? null;
  }
  get_flows_to(to: Node): Connect[] {
    return this.get_flows().filter(v => v.to === to);
  }
  get_flows_to_index(to: Node, index: number): Connect[] {
    return this.get_flows().filter(v => v.to === to && v.to_index === index);
  }
  disconnect(connect: Connect) {
    if (!this.connects.delete(connect)) {
      const flow = this.flows.get(connect.from)?.[connect.from_index];
      const index = flow?.findIndex(v => v === connect);
      if (empty(flow) || empty(index) || index < 0) {
        console.warn("Flow not found!", connect);
        return;
      }
      flow.splice(index, 1);
    }
  }
  /** Connect execution flow from a node to another  */
  flow(from: Node, to: Node, from_index = 0, to_index = 0, insert_pos?: number) {
    if (!this.flows.has(from)) {
      this.flows.set(from, []);
    }
    const f = this.flows.get(from)!;
    f[from_index] ??= [];
    f[from_index].splice(insert_pos ?? f.length, 0, new Connect(from, to, from_index, to_index));
  }
  /** Connect data flow from a  */
  connect(from: Node, to: Node, from_index: number, to_index: number) {
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

  add_comment(content: string | Comment, x?: number, y?: number, attached_node: Node | null = null): Comment {
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
  get_node_comment(node: Node): Comment | null {
    return [...this.comments].find(c => c.attached_node === node) ?? null;
  }

  encode(opt?: EncodeOptions): Root {
    opt ??= new EncodeOptions();
    const nodes = [...this.nodes].map((n) => n.encode(opt, this.get_connect_to(n), this.flows.get(n), this.get_node_comment(n)));
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
    });
  }
  static decode(root: Root): Graph {
    const [uid, time, graph_id_str, file_name] = root.filePath.split("-");
    const name = file_name.endsWith(".gia") ? file_name.slice(1, -4) : file_name.slice(1);
    const graph = new Graph("server", parseInt(uid), name, parseInt(graph_id_str));
    root.graph.graph?.inner.graph.nodes.forEach(node => {
      // node itself
      const n = graph.add_node(Node.decode(node));
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

export class Node {
  private unique_id: number;
  private node_id: number;
  private record: SingleNodeData;
  private pin_len: [number, number];
  pins: Pin[];
  x: number = 0;
  y: number = 0;
  constructor(unique_id: number, concrete_id?: number, generic_id?: number) {
    assert(!empty(concrete_id) || !empty(generic_id));
    // use generic_id if exist, or assume node_id is concrete, otherwise use node_id;
    const gid = generic_id ?? get_generic_id(concrete_id!) ?? concrete_id!;
    const cid = concrete_id;

    this.unique_id = unique_id;
    this.node_id = cid as number;
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
  setConcrete(id: number) {
    assert(this.record.id === id || this.record.reflectMap?.find(x => x[0] === id) !== undefined);
    this.node_id = id;

    const rec = empty(this.record.reflectMap) ? to_records_full(this.record) : reflects_records(this.record, id, true);
    for (let i = 0; i < rec.inputs.length; i++) {
      if (empty(this.pins[i])) {
        this.pins[i] = new Pin(this.node_id, 3, i);
      }
      if (empty(rec.inputs[i])) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.inputs[i]);
      }
      this.pins[i].reflective = is_reflect(this.record.inputs[i]);
    }
    for (let j = 0; j < rec.outputs.length; j++) {
      const i = j + rec.inputs.length;
      if (empty(this.pins[i])) {
        this.pins[i] = new Pin(this.node_id, 4, j);
      }
      if (empty(rec.outputs[j])) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.outputs[j]);
      }
      this.pins[i].reflective = is_reflect(this.record.outputs[j]);
    }
  }
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  encode(opt: EncodeOptions, connects?: Connect[], flows?: Connect[][], comment?: Comment | null): GraphNode {
    const pins = this.pins.map((p, i) => p.encode(opt, connects)).filter((p) => !empty(p));
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
      /** 节点的引脚列表 */
      pins,
      /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
      unique_index: this.unique_id,
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

  static decode(node: GraphNode): Node {
    const info = get_node_info(node);
    const g_id = info.generic_id;
    const c_id = info.concrete_id;
    const n = new Node(node.nodeIndex, c_id, g_id);
    n.setPos(node.x / 300, node.y / 200);
    const values = node.pins.filter((p) => p.i1.kind === 3).map((p) => Pin.decode(p));
    info.pins.forEach((p) => {
      if (p.kind === 3) {
        // Input
        n.pins[p.index].setType(p.node_type);
        const val_pin = values.find((vp) => vp.index === p.index);
        if (!empty(val_pin) && !empty(val_pin.value)) {
          n.pins[p.index].setVal(val_pin.value);
        }
      } else if (p.kind === 4) {
        // Output
        n.pins[n.pin_len[0] + p.index].setType(p.node_type);
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

  get UniqueId() {
    return this.unique_id;
  }
  get GenericId() {
    return this.record.id;
  }
  get ConcreteId() {
    return this.node_id;
  }
}

export class Pin {
  /** generic id */
  private node_id: number;
  private kind: number;
  private index: number;
  value: AnyType | undefined;
  reflective: boolean;
  /** concrete id */
  concrete_id: number;
  /** null type means normal pin without any determined info */
  type: NodeType | null;
  constructor(node_id: number, kind: number, index: number, reflective = false) {
    this.node_id = get_generic_id(node_id) ?? node_id;
    this.kind = kind;
    this.index = index;
    this.type = null;
    this.concrete_id = 0;
    this.reflective = reflective;
  }
  setVal(val: AnyType) {
    assert(this.kind === 3); // in params
    this.value = val;
  }
  clear() {
    this.type = null;
    this.concrete_id = 0;
    this.value = undefined;
  }
  setType(type: NodeType) {
    if (!empty(this.type) && type_equal(this.type, type)) {
      return;
    }
    this.type = type;
    this.updateConcreteIndex();
  }
  updateConcreteIndex() {
    if (!empty(this.type) && is_concrete_pin(this.node_id, this.kind, this.index)) {
      this.concrete_id = get_concrete_index(this.node_id, this.kind, this.index, get_id(this.type));
    } else {
      assert.equal(this.concrete_id, 0);
    }
  }
  encode(opt: EncodeOptions, connects?: Connect[]): NodePin | null {
    if (empty(this.type)) {
      // Normal pin without determined type
      return null;
    }
    // if (this.kind === 4 || this.kind === 1) return null;
    // if (connects?.length !== 0) debugger;
    const connect = connects?.find((c) => this.kind === 3 && c.to_index === this.index)?.encode(); // input can be connected
    const pin = node_type_pin_body({
      reflective: this.reflective,
      /** 引脚类型 (输入/输出) */
      kind: this.kind as NodePin_Index_Kind,
      /** 引脚索引 */
      index: this.index,
      /** 节点类型系统中的类型描述对象 NodeType */
      type: this.type,
      /** 具体类型的索引，用于支持类型实例化 */
      indexOfConcrete: this.concrete_id,
      /** 引脚的初始值，可选 */
      value: this.value,
      non_zero: opt.is_non_zero(),
      connects: empty(connect) ? undefined : [connect],
    });
    if (this.type.t === "e" && this.node_id === 475) {
      // Enum Equal, 需要手动设置 index of concrete
      pin.value.bConcreteValue!.indexOfConcrete = this.type.e;
    }
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
  from: Node;
  from_index: number;
  to: Node;
  to_index: number;
  constructor(from: Node, to: Node, from_index: number, to_index: number) {
    this.from = from;
    this.from_index = from_index;
    this.to = to;
    this.to_index = to_index;
  }
  encode() {
    return node_connect_from(this.from.UniqueId, this.from_index);
  }
  encode_flow() {
    return node_connect_to(this.to.UniqueId, this.to_index);
  }
  static decode_connects(connects: NodeConnection[], self_node: Node, self_index: number, graph: Graph): Connect[] {
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
  static decode_flows(connects: NodeConnection[], self_node: Node, self_index: number, graph: Graph): Connect[] {
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
    return `${this.from.UniqueId}-${this.from_index} -> ${this.to.UniqueId}-${this.to_index}`;
  }
}

export class Comment {
  content: string;
  x: number;
  y: number;
  attached_node: Node | null;
  constructor(content: string, x: number, y: number, attached_node: Node | null = null) {
    this.content = content;
    this.x = x;
    this.y = y;
    this.attached_node = attached_node;
  }
  attachTo(node: Node | null) {
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
  static decode(c: Comments, parent?: Node): Comment {
    return new Comment(
      c.content,
      c.x ?? 0,
      c.y ?? 0,
      parent,
    );
  }
}

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