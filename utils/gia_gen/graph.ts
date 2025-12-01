import assert from "assert";
import type { GraphNode, NodePin, NodePin_Index_Kind, Root } from "../protobuf/gia.proto.ts";
import { graph_body, node_body, node_connect_from, node_connect_to, node_type_pin_body, pin_flow_body } from "./basic.ts";
import { type NodeType, reflects_records, get_id, type_equal, to_records_full, is_reflect } from "./nodes.ts";
import { Counter, panic, randomInt, randomName } from "./utils.ts";
import { get_concrete_index, is_concrete_pin, get_generic_id, get_node_record, is_generic_id, get_node_record_generic } from "../node_data/helpers.ts";
import { get_node_info } from "./extract.ts";
import { type SingleNodeData } from "../node_data/node_pin_records.ts";


const GraphType = ["server", "client", "composite"] as const;
type GraphType = typeof GraphType[number];

export class EncodeOptions {
  private non_zero: boolean;
  private auto_layouts: boolean;
  is_non_zero(): boolean {
    return this.non_zero;
  }
  is_auto_layout(): boolean {
    return this.auto_layouts;
  }
  constructor(non_zero = false) {
    this.non_zero = non_zero;
    this.auto_layouts = false;
  }
  auto_layout(enable = true): EncodeOptions {
    this.auto_layouts = enable;
    return this;
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
  }
  /** 
   * @param node Node Id or Instance */
  add_node(node: number | Node): Node {
    if (typeof node === "number") {
      const n = new Node(node, this.counter_idx.value);
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
  encode(opt?: EncodeOptions): Root {
    opt ??= new EncodeOptions();
    const nodes = [...this.nodes].map((n) => n.encode(opt, this.get_connect_to(n), this.flows.get(n)));
    return graph_body({/** 唯一标识符 */
      uid: this.uid,
      /** 图的 ID */
      graph_id: this.graph_id,
      /** 图文件的ID，可选, 通常是 graph_id + i */
      file_id: this.file_id,
      /** 图的名称，可选 */
      graph_name: this.graph_name,
      /** 图中包含的节点列表，可选 */
      nodes
    });
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
    return [...this.flows.values()].flat(2).filter(x => x !== undefined);
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
      if (flow === undefined || index === undefined || index < 0) {
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
  static decode(root: Root): Graph {
    const [uid, time, graph_id_str, file_name] = root.filePath.split("-");
    const name = file_name.endsWith(".gia") ? file_name.slice(1, -4) : file_name.slice(1);
    const graph = new Graph("server", parseInt(uid), name, parseInt(graph_id_str));
    root.graph.graph?.inner.graph.nodes.forEach(node => graph.add_node(Node.decode(node)));
    return graph;
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
  constructor(node_id: number, unique_id: number) {
    this.unique_id = unique_id;
    this.node_id = node_id;
    this.record = get_node_record(node_id) ?? get_node_record_generic(node_id) ?? {
      id: node_id,
      inputs: [],
      outputs: [],
      reflectMap: undefined,
    };
    this.pins = [];
    this.pin_len = [this.record.inputs.length, this.record.outputs.length];
    // Initialize pins based on node record
    this.setConcrete(node_id);
  }
  setConcrete(id: number) {
    assert(this.record.id === id || this.record.reflectMap?.find(x => x[0] === id) !== undefined);
    this.node_id = id;

    const rec = this.record.reflectMap === undefined ? to_records_full(this.record) : reflects_records(this.record, id, true);
    for (let i = 0; i < rec.inputs.length; i++) {
      if (this.pins[i] === undefined) {
        this.pins[i] = new Pin(this.node_id, 3, i);
      }
      if (rec.inputs[i] === undefined) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.inputs[i]);
      }
      this.pins[i].reflective = is_reflect(this.record.inputs[i]);
    }
    for (let j = 0; j < rec.outputs.length; j++) {
      const i = j + rec.inputs.length;
      if (this.pins[i] === undefined) {
        this.pins[i] = new Pin(this.node_id, 4, j);
      }
      if (rec.outputs[j] === undefined) {
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
  encode(opt: EncodeOptions, connects?: Connect[], flows?: Connect[][]): GraphNode {
    const pins = this.pins.map((p, i) => p.encode(opt, connects)).filter((p) => p !== null);
    if (flows !== undefined) {
      for (let i = 0; i < flows.length; i++) {
        if (flows[i] !== undefined && flows[i].length !== 0) {
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
    });
  }
  static decode(node: GraphNode): Node {
    const info = get_node_info(node);
    const id = info.concrete_id ?? info.generic_id;
    const n = new Node(id, node.nodeIndex);
    n.setPos(node.x / 300, node.y / 200);
    info.pins.forEach((p) => {
      if (p.kind === 3) {
        // Input
        n.pins[p.index].setType(p.node_type);
      } else if (p.kind === 4) {
        // Output
        n.pins[n.pin_len[0] + p.index].setType(p.node_type);
      }
    });
    return n;
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
  clear() {
    this.type = null;
    this.concrete_id = 0;
  }
  setType(type: NodeType) {
    if (this.type !== null && type_equal(this.type, type)) {
      return;
    }
    this.type = type;
    this.updateConcreteIndex();
  }
  updateConcreteIndex() {
    if (this.type !== null && is_concrete_pin(this.node_id, this.kind, this.index)) {
      this.concrete_id = get_concrete_index(this.node_id, this.kind, this.index, get_id(this.type));
    } else {
      assert.equal(this.concrete_id, 0);
    }
  }
  encode(opt: EncodeOptions, connects?: Connect[]): NodePin | null {
    if (this.type === null) {
      // Normal pin without determined type
      return null;
    }
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
      value: undefined,
      non_zero: opt.is_non_zero(),
      connects: connect === undefined ? undefined : [connect],
    });
    if (this.type.t === "e" && this.node_id === 475) {
      // Enum Equal, 需要手动设置 index of concrete
      pin.value.bConcreteValue!.indexOfConcrete = this.type.e;
    }
    return pin;
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
  toString() {
    return `${this.from.UniqueId}-${this.from_index} -> ${this.to.UniqueId}-${this.to_index}`;
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
  const g = graph.encode(new EncodeOptions().auto_layout());
  console.timeEnd("graph_encode");
  console.log(g);
  // console.log(JSON.stringify(graph, null, 2));
  // console.log(JSON.stringify(g, null, 2));

  // console.time("graph_decode");
  // const decoded_graph = Graph.decode(g);
  // console.timeEnd("graph_decode");
  // console.log(JSON.stringify(decoded_graph, null, 2));
}