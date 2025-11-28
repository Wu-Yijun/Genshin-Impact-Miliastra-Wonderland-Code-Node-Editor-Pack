import assert from "assert";
import { get_generic_id, get_node_record } from "../node_data/node_pin_records.ts";
import type { GraphNode, NodeId, NodePin, NodePin_Index_Kind, Root } from "../protobuf/gia.proto.ts";
import { graph_body, node_body, node_type_pin_body } from "./basic.ts";
import { type NodeType, reflects_records, get_id, type_equal } from "./nodes.ts";
import { Counter, panic, randomInt, randomName } from "./utils.ts";
import { get_concrete_index, is_concrete_pin } from "../node_data/concrete_map.ts";
import { get_node_info } from "./extract.ts";


const GraphType = ["server", "client", "composite"] as const;
type GraphType = typeof GraphType[number];

export class Graph {
  private type_: GraphType;
  graph_name: string;
  private graph_id: number;
  private file_id: number;
  uid: number;
  counter_idx: Counter;
  counter_dyn_id: Counter;
  nodes: Node[];

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
    this.nodes = [];
  }
  /** 
   * @param node Node Id or Instance */
  add_node(node: number | Node): Node {
    if (typeof node === "number") {
      const n = new Node(node, this.counter_idx.value);
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
  encode(): Root {
    const nodes = this.nodes.map((n) => n.encode());
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
  static decode(root: Root): Graph {
    const [uid, time, graph_id_str, file_name] = root.filePath.split("-");
    const name = file_name.endsWith(".gia") ? file_name.slice(1, -4) : file_name.slice(1);
    const graph = new Graph("server", parseInt(uid), name, parseInt(graph_id_str));
    root.graph.graph?.inner.graph.nodes.forEach(node=>graph.add_node(Node.decode(node)));
    return graph;
  }
}

export class Node {
  private unique_id: number;
  private node_id: number;
  private generic_id: number;
  private pin_len: [number, number];
  pins: Pin[];
  x: number = 0;
  y: number = 0;
  constructor(node_id: number, unique_id: number) {
    this.unique_id = unique_id;
    this.node_id = node_id;
    this.generic_id = get_generic_id(node_id) ?? node_id;
    this.pins = [];
    this.pin_len = [0, 0];
    // Initialize pins based on node record
    this.setConcrete(node_id);
  }
  setConcrete(id: number) {
    const pins = get_node_record(id);
    if (!pins) {
      assert.equal(this.generic_id, id);
      // A basic node without reflects
      this.pins.forEach((p) => p.clear());
      this.node_id = id;
      return;
    }
    assert.equal(pins.id, this.generic_id); // Cannot set concrete id of different generic type
    this.node_id = id;
    this.pin_len = [pins.inputs.length, pins.outputs.length];
    const rec = reflects_records(pins, id);
    for (let i = 0; i < rec.inputs.length; i++) {
      if (this.pins[i] === undefined) {
        this.pins[i] = new Pin(this.node_id, 3, i);
      }
      if (rec.inputs[i] === undefined) {
        this.pins[i].clear();
      } else {
        this.pins[i].setType(rec.inputs[i]);
      }
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
    }
  }
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  encode(): GraphNode {
    const pins = this.pins.map((p) => p.encode()).filter((p) => p !== null);
    return node_body({
      /** 通用 ID */
      generic_id: this.generic_id as NodeId,
      /** 具体 ID */
      concrete_id: this.node_id as NodeId,
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
    n.setPos(node.x/300, node.y/200);
    info.pins.forEach((p) => {
      if(p.kind===3){
        // Input
        n.pins[p.index].setType(p.node_type);
      }else if(p.kind===4){
        // Output
        n.pins[n.pin_len[0] + p.index].setType(p.node_type);
      }
    });
    return n;
  }
}

export class Pin {
  private node_id: number;
  private kind: number;
  private index: number;
  concrete_index: number;
  /** null type means normal pin without any determined info */
  type: NodeType | null;
  constructor(node_id: number, kind: number, index: number) {
    this.node_id = get_generic_id(node_id) ?? node_id;
    this.kind = kind;
    this.index = index;
    this.type = null;
    this.concrete_index = 0;
  }
  clear() {
    this.type = null;
    this.concrete_index = 0;
  }
  setType(type: NodeType) {
    if (this.type !== null && type_equal(this.type, type)) {
      return;
    }
    this.type = type;
    this.updateConcreteIndex();
  }
  updateConcreteIndex() {
    if(x) debugger;
    if (this.type !== null && is_concrete_pin(this.node_id, this.kind, this.index)) {
      this.concrete_index = get_concrete_index(this.node_id, this.kind, this.index, get_id(this.type));
    } else {
      assert.equal(this.concrete_index, 0);
    }
  }
  encode(): NodePin | null {
    if (this.type === null) {
      // Normal pin without determined type
      return null;
    }
    return node_type_pin_body({
      /** 引脚类型 (输入/输出) */
      kind: this.kind as NodePin_Index_Kind,
      /** 引脚索引 */
      index: this.index,
      /** 节点类型系统中的类型描述对象 NodeType */
      type: this.type,
      /** 具体类型的索引，用于支持类型实例化 */
      indexOfConcrete: this.concrete_index,
      /** 引脚的初始值，可选 */
      value: undefined,
    });
  }
}
let x=false;
if (import.meta.main) {
  // Test Graph Encoding
  console.time("graph_encode");
  const graph = new Graph("server");
  const node1 = graph.add_node(1001);
  const node2 = graph.add_node(250);
  graph.add_node(1002);
  node1.setPos(1, 2);
  node2.setPos(3, 4);
  x=true;
  node1.setConcrete(1002);
  const g = graph.encode();
  console.timeEnd("graph_encode");
  console.log(JSON.stringify(graph, null, 2));
  // console.log(JSON.stringify(g, null, 2));

  console.time("graph_decode");
  const decoded_graph = Graph.decode(g);
  console.timeEnd("graph_decode");
  // console.log(JSON.stringify(decoded_graph, null, 2));
}