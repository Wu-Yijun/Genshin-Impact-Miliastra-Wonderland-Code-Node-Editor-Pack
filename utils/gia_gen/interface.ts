import { assert, assertDeepEq, empty } from "../utils.ts";
import * as Gia from "../protobuf/gia.proto.ts";
import {
  graph_body,
  node_body,
  pin_body,
  make_typed_value,
  make_connection,
  make_annotation,
  make_variant_value,
  get_resource_class,
  read_typed_value,
  read_connections,
  make_graph_variable,
  read_graph_variable
} from "./core.ts";
import { ClientTypeHelper, DocHelper, EnumHelper, NodeHelper as NodeLib, ServerTypeHelper } from "../node_data/instances.ts";
import type { NodeDef, ResourceClass, ServerClient, TypedValue } from "../node_data/types.ts";
import { type NodeType, stringify, parse, is_reflect, type ConstraintType, type StructType, type_equal, reflects } from "../node_data/node_type.ts";
import { Counter, fuseSuggest, get_system, is_empty, randomInt, randomName } from "./utils.ts";
import { type TypedPinDef, type TypedNodeDef } from "../node_data/core.ts";
import { auto_layout, type LayoutOption } from "./auto_layout.ts";


/**
 * Graph class - 节点图编辑器的核心类
 * 
 * 用于创建、编辑和管理节点图(Node Graph)。支持实体节点图(ENTITY_NODE_GRAPH)、
 * 技能节点图(SKILL_NODE_GRAPH)等不同系统类型。
 * 
 * @example
 * ```typescript
 * // 创建实体节点图
 * const graph = new Graph("ENTITY_NODE_GRAPH");
 * 
 * // 添加节点
 * const trigger = graph.add_node("Trigger.Tab.OnTabSelect");
 * const branch = graph.add_node(NODES.Control_General_Branch);
 * 
 * // 连接节点
 * graph.flow(trigger, branch); // 控制流连接
 * graph.connect(trigger, branch, "Output0", "cond"); // 数据流连接
 * 
 * // 编码为 protobuf 格式
 * const encoded = graph.encode();
 * ```
 */
export class Graph {
  public readonly system: ResourceClass;

  public graph_name: string;
  public uid: number;
  public readonly graph_id: number;
  public readonly file_id: number;

  private counter_idx: Counter;
  private counter_dyn_id: Counter;

  /** node_index --> Node */
  public readonly nodes: Map<number, Node>;
  public readonly comments: Set<Comment>;
  public readonly graph_var: Map<string, GraphVar>;

  /**
   * 创建一个新的节点图
   * 
   * @param system_class - 节点图系统类型,可选值:
   *   - "ENTITY_NODE_GRAPH": 实体节点图(默认)
   *   - "SKILL_NODE_GRAPH": 技能节点图
   *   - "LEVEL_NODE_GRAPH": 关卡节点图
   *   - 其他 ResourceClass 类型
   * @param uid - 用户ID,未指定时随机生成
   * @param name - 节点图名称,未指定时随机生成
   * @param graph_id - 节点图ID,未指定时根据系统类型自动分配
   */
  constructor(system_class: ResourceClass = "ENTITY_NODE_GRAPH", uid?: number, name?: string, graph_id?: number) {
    this.system = system_class;
    this.uid = uid ?? randomInt(9, "201");
    const ID_RANGE = DocHelper.systemConstants.GRAPH_ID_RANGE[get_system(system_class)];
    this.graph_id = graph_id ?? randomInt(3) + ID_RANGE;

    this.graph_name = name ?? randomName(3);
    this.counter_idx = new Counter();
    this.counter_dyn_id = new Counter(Number(this.graph_id));
    this.file_id = this.counter_dyn_id.value;

    this.nodes = new Map<number, Node>();
    this.comments = new Set();
    this.graph_var = new Map<string, GraphVar>();
  }

  /**
   * Add a node to the graph.
   * @param node Identifier (string) or ID (number) or existing Node object
   * @param constraint Optional ID override if creating from raw ID
   */
  add_node(node: string | number | Node, constraints?: NodeType | string): Node | null {
    if (constraints !== undefined) {
      constraints = parse(constraints);
    }
    if (node instanceof Node) {
      if (this.nodes.has(node.node_index)) {
        console.error(`[Error] Node index ${node.node_index} already already in graph!`);
        return node;
      }
      this.nodes.set(node.node_index, node);
      this.counter_idx.lower_bound = node.node_index;
      if (constraints !== undefined) {
        node.setConstraints(constraints);
      }
      return node;
    }

    let def: NodeDef | undefined;
    if (typeof node === "string") {
      // TODO: support <Domain>.<Category>.<Action>.<Constraints> format
      def = NodeLib.getByIdentifier(node);
      if (def === undefined) {
        const [d, c, a, cstr] = node.split(".");
        def = NodeLib.getByIdentifier([d, c, a].join("."));
        if (def !== undefined && cstr?.length > 0) {
          constraints = parse(cstr);
        }
      }
      if (def === undefined) {
        // Print suggestions
        console.error(`[Error] Node not found by Identifier: ${node}`);
        const similars = NodeLib.findSimilar(node);
        if (similars.length > 0) {
          console.info(`  -> Did you mean: '${similars.slice(0, 5).map(n => n.Identifier).join("' or '")}' ?`);
        }
        return null;
      }
    } else if (typeof node === "number") {
      def = NodeLib.getByID(node);
    } else {
      console.error(`[Error] Invalid argument for add_node: ${node}`);
      return null;
    }
    if (def === undefined) {
      console.error(`[Error] Node not found by Identifier: ${node}`);
      return null;
    }
    // Check system compatibility
    if (def.System !== get_system(this.system)) {
      // Warning but maybe allow if user knows what they are doing (e.g. specialized Universal nodes)
      console.warn(`[Warning] Node ${def.Identifier} system (${def.System}) does not match Graph system (${this.system})`);
    }

    let index = this.counter_idx.value;
    while (this.nodes.has(index)) {
      this.counter_idx.lower_bound = index;
    }
    const newNode = new Node(this.system, def, index);
    this.nodes.set(newNode.node_index, newNode);

    if (constraints !== undefined) {
      newNode.setConstraints(constraints);
    }
    return newNode;
  }

  /**
   * 添加注释到节点图
   * 
   * @param content - 注释内容
   * @param target_node - 目标节点,注释将附加到该节点
   * @returns 创建的注释对象,失败时返回 null
   * 
   * @example
   * ```typescript
   * graph.add_comment("这是一个重要的分支节点", branchNode);
   * ```
   */
  add_comment(content: string, target_node: Node): Comment | null;
  /**
   * 添加独立注释到节点图
   * 
   * @param content - 注释内容
   * @param x - 注释的 X 坐标
   * @param y - 注释的 Y 坐标
   * @returns 创建的注释对象
   * 
   * @example
   * ```typescript
   * graph.add_comment("这是一个独立注释", 600, 100);
   * ```
   */
  add_comment(content: string, x: number, y: number): Comment;
  add_comment(content: string, x?: number | Node, y?: number): Comment | null {
    if (typeof x === "number") {
      const cmt = { content, x, y };
      this.comments.add(cmt);
      return cmt;
    } else if (x instanceof Node) {
      const n = this.nodes.get(x.node_index);
      if (n === undefined || n !== x) {
        console.error("[Error] Node not found in graph.");
        return null;
      }
      return n.add_comment(content);
    }
    return null;
  }

  /**
   * 添加图变量(Graph Variable)
   * 
   * 图变量是节点图级别的全局变量,可以在多个节点间共享数据。
   * 
   * @param name - 变量名称
   * @param type - 变量类型,可以是 NodeType 对象或类型字符串(如 "Int", "L<Int>", "Bool" 等)
   * @param val - 变量的初始值(可选)
   * @param exposed - 是否暴露给外部访问(默认 false)
   * @returns 创建的图变量对象,如果已存在同名变量则返回 null
   * 
   * @example
   * ```typescript
   * graph.add_graph_var("playerLevel", "Int", 10, true);
   * graph.add_graph_var("itemList", "L<Int>", [1, 2, 3], false);
   * ```
   */
  add_graph_var(name: string, type: NodeType | string, val?: TypedValue, exposed?: boolean): GraphVar | null {
    if (this.graph_var.has(name)) {
      console.warn("[Warning] Already has a graph var of the same name!");
      return null;
    }
    const v: GraphVar = { name, type: parse(type), exposed: exposed ?? false, val: val ?? null };
    this.graph_var.set(name, v);
    return v;
  }

  /**
   * 创建控制流连接(Flow Connection)
   * 
   * 控制流连接决定节点的执行顺序,从一个节点的输出流引脚连接到另一个节点的输入流引脚。
   * 
   * @param from - 源节点
   * @param to - 目标节点
   * @param fromArg - 源节点的流引脚标识符(可选,默认使用第一个可见的输出流引脚)
   * @param toArg - 目标节点的流引脚标识符(可选,默认使用第一个可见的输入流引脚)
   * @param insert_pos - 插入位置(可选,用于控制多个连接的顺序)
   * @returns 创建的连接对象,失败时返回 null
   * 
   * @example
   * ```typescript
   * // 使用默认引脚连接
   * graph.flow(triggerNode, branchNode);
   * 
   * // 指定引脚连接
   * graph.flow(branchNode, actionNode, "Case1", "FlowIn");
   * 
   * // 指定插入位置
   * graph.flow(triggerNode, branchNode, "FlowOut", "FlowIn", 0);
   * ```
   */
  flow(from: Node, to: Node, fromArg?: string, toArg?: string, insert_pos?: number): Connection | null {
    if (is_empty(from) || is_empty(to)) {
      console.error("[Error] Source or Target node is empty.");
      return null;
    }
    let from_pin: TypedPinDef | undefined;
    let to_pin: TypedPinDef | undefined;
    if (fromArg !== undefined) {
      const f = from.findPin(fromArg);
      if (!f.success || f.kind !== "Flow") {
        console.error(`[Error] Source flow pin not found on node ${from.def.Identifier}: ${fromArg}`);
        return null;
      }
      from_pin = f.pin;
    } else {
      from_pin = from.def.FlowPins.find(p => p.Direction === "Out" && p.Visibility !== "Hidden");
    }
    if (toArg !== undefined) {
      const t = to.findPin(toArg);
      if (!t.success || t.kind !== "Flow") {
        console.error(`[Error] Target flow pin not found on node ${to.def.Identifier}: ${toArg}`);
        return null;
      }
      to_pin = t.pin;
    } else {
      to_pin = to.def.FlowPins.find(p => p.Direction === "In" && p.Visibility !== "Hidden");
    }
    if (!from_pin) {
      console.error(`[Error] Source flow pin not found on node ${from.def.Identifier}: ${fromArg ?? "(default)"}`);
      return null;
    }
    if (!to_pin) {
      console.error(`[Error] Target flow pin not found on node ${to.def.Identifier}: ${toArg ?? "(default)"}`);
      return null;
    }
    if (from_pin.Direction === "In" || to_pin.Direction === "Out") {
      console.error(`[Error] Invalid flow connection direction: from ${from_pin.Direction} to ${to_pin.Direction}`);
      return null;
    }
    return from.connectPinWith(from_pin.Identifier, to, to_pin.Identifier, insert_pos);
  }

  /**
   * Connect data flow between nodes.
   * @param from Source Node
   * @param to Target Node
   * @param fromArg Source Pin: Index (number) or Identifier (string)
   * @param toArg Target Pin: Index (number) or Identifier (string)
   */
  connect(from: Node, to: Node, fromArg: number | string, toArg: number | string): Connection | null {
    if (is_empty(from) || is_empty(to) || is_empty(fromArg) || is_empty(toArg)) {
      console.error("[Error] Source or Target node/pin is empty.");
      return null;
    }
    const fromPin = typeof fromArg === "number" ? from.getVisibleDataOutPin(fromArg) : from.findPin(fromArg).pin;
    const toPin = typeof toArg === "number" ? to.getVisibleDataInPin(toArg) : to.findPin(toArg).pin;
    if (!fromPin) {
      console.error(`[Error] Source pin not found on node ${from.def.Identifier}: ${fromArg}`);
      fuseSuggest(from.def.DataPins.filter(x => x.Direction === 'Out').map(x => x.Identifier), String(fromArg));
      return null;
    }
    if (!toPin) {
      console.error(`[Error] Target pin not found on node ${to.def.Identifier}: ${toArg}`);
      fuseSuggest(to.def.DataPins.filter(x => x.Direction === 'In').map(x => x.Identifier), String(toArg));
      return null;
    }
    if (fromPin.Direction === "In" || toPin.Direction === "Out") {
      console.error(`[Error] Invalid connection direction: from ${fromPin.Direction} to ${toPin.Direction}`);
      return null;
    }
    return from.connectPinWith(fromPin.Identifier, to, toPin.Identifier);
  }

  /**
   * 断开一个连接
   * 
   * @param conn - 要断开的连接对象
   * 
   * @example
   * ```typescript
   * const conn = graph.connect(nodeA, nodeB, 0, 0);
   * graph.disconnect(conn);
   * ```
   */
  disconnect(conn: Connection) {
    if (conn.from.findPin(conn.from_pin.Identifier).kind === "Data") {
      conn.from.disconnectDataInAt(conn.from_pin.Identifier);
    } else {
      const conns = conn.from.flow_to.get(conn.from_pin.Identifier);
      if (conns) {
        const index = conns.indexOf(conn);
        if (index >= 0) {
          conn.from.disconnectFlowOutAt(conn.from_pin.Identifier, index);
        }
      }
    }
  }

  /**
   * 获取所有数据流连接
   * @returns 节点图中所有数据流连接的数组
   */
  get connects(): Connection[] {
    return Array.from(this.nodes.values()).map(n => Array.from(n.data_from.values())).flat();
  }
  /**
   * 获取所有控制流连接
   * @returns 节点图中所有控制流连接的数组
   */
  get flows(): Connection[] {
    return Array.from(this.nodes.values()).map(n => Array.from(n.flow_to.values())).flat(2);
  }

  /**
   * 将节点图编码为 Protobuf 格式
   * 
   * @param opt - 编码选项(可选,当前未使用)
   * @returns 编码后的 AssetBundle 对象
   * 
   * @example
   * ```typescript
   * const encoded = graph.encode();
   * encode_gia_file("output.gia", encoded);
   * ```
   */
  encode(opt?: any): Gia.AssetBundle {
    const nodes = Array.from(this.nodes.values()).map(n => n.encode());
    const comments = Array.from(this.comments).map(c => make_annotation(c.content, c.x, c.y));
    const graphValues = Array.from(this.graph_var.values()).map(v => make_graph_variable(v.type, v.name, v.val, v.exposed));

    return graph_body({
      system: this.system,
      uid: this.uid,
      graph_id: this.graph_id,
      file_id: this.file_id,
      graph_name: this.graph_name,
      nodes: nodes,
      comments: comments,
      graphValues: graphValues,
    });
  }

  /**
   * 从 Protobuf 数据创建节点图(decode 的别名)
   * 
   * @param data - AssetBundle 格式的 Protobuf 数据
   * @returns 解码后的节点图对象
   */
  static from(data: Gia.AssetBundle): Graph {
    return this.decode(data);
  }
  /**
   * 从 Protobuf 数据解码节点图
   * 
   * @param proto - AssetBundle 格式的 Protobuf 数据
   * @returns 解码后的节点图对象
   * 
   * @example
   * ```typescript
   * const proto = decode_gia_file("input.gia");
   * const graph = Graph.decode(proto);
   * ```
   */
  static decode(proto: Gia.AssetBundle): Graph {
    const system = get_resource_class(proto.primary_resource.resource_class);
    if (system === null) {
      console.error(`[Fatal Error] Unknown resource class: ${proto.primary_resource.resource_class}`);
      throw new Error("Decoding failed due to unknown resource class.");
    }
    const [uid, time, file_id, file_name] = proto.export_tag.split("-");
    const name = proto.primary_resource.internal_name;
    const graph_id = proto.primary_resource.identity.asset_guid;
    const graph = new Graph(system, parseInt(uid), name, graph_id);
    graph.counter_dyn_id.lower_bound = graph.file_id;
    graph.counter_dyn_id.lower_bound = graph_id;

    // nodes & values
    proto.primary_resource.graph_data?.inner.graph.nodes.forEach(node => {
      // node itself
      const n = Node.decode(system, node);
      if (n === null) {
        console.error(`[Error] Failed to decode node at index ${node.index}`);
        return;
      }
      graph.add_node(n);
    });
    // connects & flows
    proto.primary_resource.graph_data?.inner.graph.nodes.forEach(node => {
      // decode connects
      Node.decode_connections(node, graph);
    });
    // comments
    proto.primary_resource.graph_data?.inner.graph.comments?.forEach(c => {
      graph.add_comment(c.text, c.x_pos ?? 0, c.y_pos ?? 0);
    });
    // graph variables
    proto.primary_resource.graph_data?.inner.graph.blackboard?.forEach(v => {
      const val = read_graph_variable(v);
      graph.add_graph_var(val.name, val.type, val.val, val.exposed);
    });
    return graph;
  }

  /**
   * 打印节点图的调试信息
   * 
   * @param options - 调试选项
   * @param options.indent - 缩进级别(默认 0)
   * @param options.log - 日志输出函数(默认 console.log)
   * 
   * @example
   * ```typescript
   * // 输出到控制台
   * graph.debugPrint({});
   * 
   * // 输出到自定义日志函数
   * const logs: string[] = [];
   * graph.debugPrint({ log: (msg) => logs.push(msg) });
   * ```
   */
  debugPrint({ indent = 0, log = console.log }: { indent?: number, log?: (...args: string[]) => void } = {}): void {
    log(`${" ".repeat(indent)}Graph: ${this.graph_name} (ID: ${this.graph_id}, System: ${this.system})`);
    log(`${" ".repeat(indent)}UID: ${this.uid}, File ID: ${this.file_id}`);
    log(`${" ".repeat(indent)}Graph Variables:`);
    this.graph_var.forEach(v => {
      log(`${" ".repeat(indent + 2)}${v.name}: ${stringify(v.type)} (Exposed: ${v.exposed})`);
      if (v.val !== null) {
        log(`${" ".repeat(indent + 4)}Value: ${JSON.stringify(v.val)}`);
      }
    });
    log(`${" ".repeat(indent)}Nodes:`);
    this.nodes.forEach(node => {
      node.debugPrint({ indent: indent + 2, log });
    });
  }

  /**
   * 自动布局节点图
   * 
   * 根据节点间的连接关系自动计算并设置节点的位置,使节点图更易于阅读。
   * 
   * @param options - 布局选项(可选),详见 LayoutOption 类型定义
   * 
   * @example
   * ```typescript
   * graph.autoLayout();
   * ```
   */
  autoLayout(options?: Partial<LayoutOption>) {
    auto_layout(this, options ?? {});
  }

  debugClearEmptyVars() {
    this.nodes.forEach(n => {
      const to_del: string[] = [];
      n.pin_values.forEach((v, k) => {
        if (v === null || v instanceof Array && v.length === 0)
          to_del.push(k);
      });
      to_del.forEach(k => n.pin_values.delete(k));
    });
  }
}

/**
 * Node class - 节点图中的单个节点
 * 
 * 表示节点图中的一个节点实例，包含节点定义、引脚值、连接关系等信息。
 * 支持普通节点和可变类型(Variant)节点。
 * 
 * @example
 * ```typescript
 * // 创建节点（通过 Graph.add_node）
 * const branch = graph.add_node(NODES.Control_General_Branch);
 * 
 * // 设置引脚值
 * branch.setVal("cond", true);
 * branch.setVal(0, [1, 2, 3]); // 使用索引
 * 
 * // 可变类型节点设置约束
 * const equal = graph.add_node(NODES.Arithmetic_General_Equal);
 * equal.setConstraints("C<T:Int>");
 * 
 * // 连接节点
 * branch.connectPinWith("FlowOut", actionNode, "FlowIn");
 * 
 * // 添加注释
 * branch.add_comment("这是一个分支节点");
 * 
 * // 设置位置
 * branch.setPosition(2, 3);
 * ```
 */
export class Node {

  /** 节点所属的系统类型（如 ENTITY_NODE_GRAPH） */
  public readonly system: ResourceClass;

  /** 节点在图中的唯一索引 */
  public readonly node_index: number;

  /** 节点的类型定义（包含引脚、参数等信息） */
  public readonly def: TypedNodeDef;

  /** 可变类型节点的具体类型定义（仅用于 Variant 节点） */
  public variant_def: TypedNodeDef | null = null;

  /** 可变类型节点的约束条件（仅用于 Variant 节点） */
  public constraint: ConstraintType | undefined;

  /** 输入引脚的值存储（PinIdentifier -> TypedValue） */
  public readonly pin_values: Map<string, TypedValue>;

  /** 数据流输入连接（PinIdentifier -> Connection） */
  public readonly data_from: Map<string, Connection>;

  /** 数据流输出连接（PinIdentifier -> Set<Connection>） */
  public readonly data_to: Map<string, Set<Connection>>;

  /** 控制流输入连接（PinIdentifier -> Set<Connection>） */
  public readonly flow_from: Map<string, Set<Connection>>;

  /** 控制流输出连接（PinIdentifier -> Connection[]），保持顺序 */
  public readonly flow_to: Map<string, Connection[]>;

  /** 节点的 X 坐标 */
  public x: number = 0;

  /** 节点的 Y 坐标 */
  public y: number = 0;

  /** 附加到节点的注释 */
  public comment: Comment | null = null;

  /**
 * 构造函数（通常不直接调用，而是通过 Graph.add_node 创建）
 * 
 * @param system - 节点所属系统类型
 * @param def - 节点定义
 * @param index - 节点索引
 */
  constructor(system: ResourceClass, def: NodeDef, index: number) {
    this.def = NodeLib.toTypedNodeDef(def);
    this.node_index = index;
    this.system = system;
    this.pin_values = new Map();
    this.data_from = new Map();
    this.data_to = new Map();
    this.flow_from = new Map();
    this.flow_to = new Map();
  }

  /**
 * 为节点添加注释
 * 
 * @param content - 注释内容
 * @returns 创建的注释对象
 * 
 * @example
 * ```typescript
 * node.add_comment("这是一个重要的分支节点");
 * ```
 */
  add_comment(content: string): Comment {
    const cmt = { content };
    this.comment = cmt;
    return cmt;
  }

  /**
 * 查找节点的引脚
 * 
 * @param identifier - 引脚标识符
 * @returns 包含查找结果的对象，包括是否成功、引脚类型和引脚定义
 * 
 * @example
 * ```typescript
 * const result = node.findPin("FlowIn");
 * if (result.success && result.kind === "Flow") {
 *   console.log("找到控制流引脚:", result.pin.Identifier);
 * }
 * ```
 */
  findPin(identifier: string): {
    success: boolean;
    kind?: "Flow" | "Data" | "Meta"
    pin?: TypedPinDef;
  } {
    const pin = this.findDataPin(identifier);
    if (pin) {
      return {
        success: true,
        kind: "Data",
        pin: pin
      };
    }
    const flow = this.findFlowPin(identifier);
    if (flow) {
      return {
        success: true,
        kind: "Flow",
        pin: flow
      };
    }
    return {
      success: false
    };
  }
  /**
   * 根据可见索引获取输入数据引脚
   * 
   * 仅计算可见的输入数据引脚（Visibility !== "Hidden"）
   * 
   * @param index - 可见引脚的索引（从 0 开始）
   * @returns 引脚定义，未找到时返回 null
   * 
   * @example
   * ```typescript
   * const firstInPin = node.getVisibleDataInPin(0);
   * ```
   */
  getVisibleDataInPin(index: number): TypedPinDef | null {
    for (let i = 0, count = 0; i < this.def.DataPins.length; i++) {
      const pin = this.def.DataPins[i];
      if (pin.Direction !== "In") continue;
      if (pin.Visibility === "Hidden") continue;
      if (count === index) {
        return pin;
      }
      count++;
    }
    return null;
  }
  /**
 * 根据可见索引获取输出数据引脚
 * 
 * 仅计算可见的输出数据引脚（Visibility !== "Hidden"）
 * 
 * @param index - 可见引脚的索引（从 0 开始）
 * @returns 引脚定义，未找到时返回 null
 * 
 * @example
 * ```typescript
 * const firstOutPin = node.getVisibleDataOutPin(0);
 * ```
 */
  getVisibleDataOutPin(index: number): TypedPinDef | null {
    for (let i = 0, count = 0; i < this.def.DataPins.length; i++) {
      const pin = this.def.DataPins[i];
      if (pin.Direction !== "Out") continue;
      if (pin.Visibility === "Hidden") continue;
      if (count === index) {
        return pin;
      }
      count++;
    }
    return null;
  }

  /**
 * 根据标识符查找数据引脚
 * 
 * 如果是可变类型节点，会优先从 variant_def 中查找
 * 
 * @param identifier - 引脚标识符
 * @returns 引脚定义，未找到时返回 null
 */
  findDataPin(identifier: string): TypedPinDef | null {
    const pin = (this.variant_def ?? this.def).DataPins.find(p => p.Identifier === identifier);
    return pin ?? null;
  }

  /**
 * 根据标识符查找控制流引脚
 * 
 * @param identifier - 引脚标识符
 * @returns 引脚定义，未找到时返回 null
 */
  findFlowPin(identifier: string): TypedPinDef | null {
    const pin = this.def.FlowPins.find(p => p.Identifier === identifier);
    return pin ?? null;
  }

  /**
 * 获取节点的所有连接
 * 
 * @returns 包含所有数据流和控制流连接的数组
 */
  getAllConnections(): Connection[] {
    return [
      ...this.data_from.values(),
      [...this.data_to.values()].map(set => Array.from(set)),
      [...this.flow_from.values()].map(set => Array.from(set)),
      ...this.flow_to.values(),
    ].flat(2);
  }

  /**
   * 将当前节点的引脚连接到另一个节点的引脚
   * 
   * 自动处理方向检查、类型检查和旧连接的断开。支持数据流和控制流连接。
   * 
   * @param pin - 当前节点的引脚标识符
   * @param with_node - 要连接的目标节点
   * @param with_pin - 目标节点的引脚标识符
   * @param insert_pos - 插入位置（可选，仅用于控制流连接）
   * @returns 创建的连接对象，失败时返回 null
   * 
   * @example
   * ```typescript
   * // 数据流连接
   * nodeA.connectPinWith("result", nodeB, "input");
   * 
   * // 控制流连接，指定插入位置
   * nodeA.connectPinWith("FlowOut", nodeB, "FlowIn", 0);
   * ```
   */
  connectPinWith(pin: string, with_node: Node, with_pin: string, insert_pos?: number): Connection | null {
    const thisPin = this.findPin(pin);
    const thatPin = with_node.findPin(with_pin);
    if (!thisPin.success) {
      console.warn(`[Warning] Pin ${pin} not found on node ${this.def.Identifier}`);
      return null;
    }
    if (!thatPin.success) {
      console.warn(`[Warning] With Pin ${with_pin} not found on node ${with_node.def.Identifier}`);
      return null;
    }
    if (thisPin.kind !== thatPin.kind || thisPin.kind === "Meta") {
      console.warn(`[Warning] Pin kinds do not match: ${thisPin.kind} vs ${thatPin.kind}`);
      return null;
    }
    if (thatPin.pin!.Connectability === false || thisPin.pin!.Connectability === false) {
      console.warn(`[Warning] One of the pins is not connectable: ${thisPin.pin!.Identifier} or ${thatPin.pin!.Identifier}`);
      return null;
    }
    if (thisPin.pin!.Direction === thatPin.pin!.Direction) {
      console.warn(`[Warning] Cannot connect pins with same direction: ${thisPin.pin!.Direction}`);
      return null;
    }
    if (thatPin.kind === "Data" && !type_equal(thisPin.pin!.Type!, thatPin.pin!.Type!)) {
      console.warn(`[Warning] Data pin types do not match (Force Connect): ${stringify(thisPin.pin!.Type!)} vs ${stringify(thatPin.pin!.Type!)}`);
    }
    if (thatPin.pin!.Direction === "In" && thatPin.kind === "Data" && with_node.data_from.has(with_pin)) {
      // disconnect old connection if any
      with_node.disconnectDataInAt(with_pin);
    }
    if (thisPin.pin!.Direction === "In" && thisPin.kind === "Data" && this.data_from.has(pin)) {
      // disconnect old connection if any
      this.disconnectDataInAt(pin);
    }

    let con: Connection;
    if (thisPin.pin!.Direction === "In") {
      // that to this
      con = {
        from: with_node,
        to: this,
        from_pin: thatPin.pin!,
        to_pin: thisPin.pin!
      };
    } else {
      // this to that
      con = {
        from: this,
        to: with_node,
        from_pin: thisPin.pin!,
        to_pin: thatPin.pin!
      };
    }

    // if (thatPin.kind === "Data") {
    //   let old_con = con.to.data_from.get(con.to_pin.Identifier);
    //   if (old_con !== undefined) {
    //     if (old_con.from === con.from) {
    //       console.warn(`[Warning] Data pin ${con.to_pin.Identifier} is already connected to ${con.from.def.Identifier}.`);
    //       return null;
    //     } else {
    //       console.info(`[Info] Disconnecting old connection ${old_con.from.def.Identifier} from ${con.to.def.Identifier} before connecting ${con.from.def.Identifier}.`);
    //       make_disconnection_unsafe(old_con, "Data");
    //     }
    //   }
    // } else {
    //   let old_con = con.from.flow_to.get(con.from_pin.Identifier);
    //   if (old_con !== undefined) {
    //     const idx = old_con.findIndex(c => c.to === con.to);
    //     if (idx >= 0) {
    //       if (idx === insert_pos) {
    //         console.info(`[Info] Flow pin ${con.from_pin.Identifier} is already connected to ${con.to.def.Identifier}.`);
    //       } else {
    //         console.warn(`[Warning] Flow pin ${con.from_pin.Identifier} is already connected to ${con.to.def.Identifier} at different index ${idx}. Will not override it.`);
    //       }
    //       return null;
    //     }
    //   }
    // }

    make_connection_unsafe(con, thisPin.kind!, insert_pos);
    return con;
  }

  /**
   * 断开指定输入数据引脚的连接
   * 
   * @param pinIdentifier - 引脚标识符
   * @returns 是否成功断开连接
   * 
   * @example
   * ```typescript
   * node.disconnectDataInAt("input");
   * ```
   */
  disconnectDataInAt(pinIdentifier: string): boolean {
    const con = this.data_from.get(pinIdentifier);
    if (con === undefined) {
      console.warn(`[Warning] No data connection found at pin ${pinIdentifier}.`);
      return false;
    }
    this.data_from.delete(pinIdentifier);
    con.from.data_to.get(con.from_pin.Identifier)?.delete(con);
    return true;
  }

  /**
 * 断开指定输出控制流引脚的连接
 * 
 * @param pinIdentifier - 引脚标识符
 * @param index - 连接在数组中的索引
 * @returns 是否成功断开连接
 * 
 * @example
 * ```typescript
 * node.disconnectFlowOutAt("FlowOut", 0);
 * ```
 */
  disconnectFlowOutAt(pinIdentifier: string, index: number): boolean {
    const conns = this.flow_to.get(pinIdentifier);
    if (conns === undefined || index < 0 || index >= conns.length) {
      console.warn(`[Warning] No flow connections found at pin ${pinIdentifier}.`);
      return false;
    }
    const con = conns[index];
    if (con === undefined) {
      console.warn(`[Warning] No flow connection found at index ${index} for pin ${pinIdentifier}.`);
      return false;
    }
    conns.splice(index, 1);
    con.from.flow_from.get(con.to_pin.Identifier)?.delete(con);
    return true;
  }

  /**
   * 为可变类型节点设置类型约束
   * 
   * 仅适用于 Type 为 "Variant" 的节点。设置约束后，节点的引脚类型会根据约束更新。
   * 
   * @param constraint - 类型约束（如 "C<T:Int>", "C<K:L<Int>>"），设置为 null 可重置为基础定义
   * @returns 节点本身，支持链式调用
   * 
   * @example
   * ```typescript
   * // 设置约束
   * const equal = graph.add_node(NODES.Arithmetic_General_Equal);
   * equal.setConstraints("C<T:Int>");
   * 
   * // 链式调用
   * graph.add_node(NODES.Arithmetic_General_Equal)
   *   .setConstraints("C<T:Bool>");
   * 
   * // 重置约束
   * equal.setConstraints(null);
   * ```
   */
  setConstraints(constraint: NodeType | string | null): Node {
    if (this.def.Type !== "Variant") {
      console.error(`[Error] Node ${this.def.Identifier} is not a Variant node.`);
      return this;
    }
    if (constraint === null) {
      // Reset to base definition
      this.variant_def = null;
      this.constraint = undefined;
      return this;
    }
    if (typeof constraint === "string") {
      constraint = parse(constraint);
    }
    if (constraint?.t !== "c") {
      console.error(`[Error] Node ${this.def.Identifier}: current constraint is not of ConstraintType.`);
      fuseSuggest(this.def.Variants!.map(x => x.Constraints), stringify(constraint));
      return this;
    }
    const newDef = NodeLib.getVariant(this.def.Identifier, constraint);
    if (!newDef) {
      console.error(`[Error] Constraint '${stringify(constraint)}' not found for node ${this.def.Identifier}`);
      fuseSuggest(this.def.Variants!.map(x => x.Constraints), stringify(constraint));
      return this;
    }
    // Update definition and re-init pins
    this.variant_def = newDef;
    this.constraint = constraint;
    return this;
  }

  /**
 * 根据约束条件数组自动解析并设置节点的类型约束
 * 
 * 用于从连接的引脚类型推断可变节点的具体类型。
 * 
 * @param constraints - 约束条件数组，格式为 [引脚标识符, 类型]
 * 
 * @example
 * ```typescript
 * node.solveConstraints([
 *   ["input1", { t: "p", v: "Int" }],
 *   ["input2", { t: "p", v: "Int" }]
 * ]);
 * ```
 */
  solveConstraints(constraints: [string, NodeType][]): void {
    if (constraints.length === 0) {
      console.info(`[Info] No constraints provided to solve for node ${this.def.Identifier}, use generic variant.`);
      return;
    }
    const c = NodeLib.filterVariantConstraints(this.def, constraints);
    if (c.length === 0) {
      console.error(`[Error] No matching constraints found for node ${this.def.Identifier}`);
      return;
    }
    if (c.length > 1) {
      console.warn(`[Warning] ${c.length} Multiple matching constraints found for node ${this.def.Identifier}, using the first one.`);
      console.warn(`  -> Matches: ${c.map(x => stringify(x)).slice(0, 3).join(", ")}`);
    }
    this.setConstraints(c[0]);
  }
  /**
   * 设置节点的位置
   * 
   * @param x - X 坐标（会乘以 scale_x）
   * @param y - Y 坐标（会乘以 scale_y）
   * @param scale_x - X 轴缩放因子（默认 300）
   * @param scale_y - Y 轴缩放因子（默认 200）
   * 
   * @example
   * ```typescript
   * // 设置位置为 (600, 400)
   * node.setPosition(2, 2);
   * 
   * // 使用自定义缩放
   * node.setPosition(1, 1, 100, 100); // 实际位置为 (100, 100)
   * ```
   */
  setPosition(x: number, y: number, scale_x = 300, scale_y = 200) {
    this.x = x * scale_x;
    this.y = y * scale_y;
  }

  /**
   * 设置节点输入引脚的值
   * 
   * @param pin - 引脚标识符（字符串）或可见引脚索引（数字）
   * @param value - 要设置的值，类型必须与引脚类型匹配
   * 
   * @example
   * ```typescript
   * // 使用标识符设置
   * node.setVal("var_name", "Player Level");
   * node.setVal("enabled", true);
   * 
   * // 使用索引设置
   * node.setVal(0, 42);
   * node.setVal(1, [1, 2, 3]);
   * ```
   */
  setVal(pin: number | string, value: TypedValue | boolean) {
    let pinDef: TypedPinDef | null;
    if (typeof pin === "number") {
      pinDef = this.getVisibleDataInPin(pin);
      if (!pinDef) {
        console.error(`[Error] Pin index ${pin} not found on node ${this.def.Identifier}`);
        return;
      }
    } else {
      pinDef = this.findDataPin(pin);
      if (!pinDef) {
        console.error(`[Error] Pin '${pin}' not found on node ${this.def.Identifier}`);
        fuseSuggest(this.def.DataPins.filter(x => x.Direction === 'In').map(x => x.Identifier), pin);
        return;
      }
    }
    if (pinDef.Direction !== "In") {
      console.error(`[Error] Pin ${pinDef.Identifier} is not an input pin on node ${this.def.Identifier}`);
      return;
    }
    if (typeof value === "boolean") value = Number(value);
    this.pin_values.set(pinDef.Identifier, value);
  }

  /**
   * 编码节点的引脚数据为 Protobuf 格式
   * 
   * 内部方法，用于序列化节点的引脚值和连接信息。
   * 
   * @returns Protobuf 格式的引脚实例数组
   */
  encode_pins(): Gia.PinInstance[] {
    const ret: Gia.PinInstance[] = [];
    const def = this.variant_def ?? this.def;
    const is_server = get_system(this.system) === "Server";

    for (let i = 0; i < def.DataPins.length; i++) {
      const pin = def.DataPins[i];
      const pin0 = this.def.DataPins[i];
      assert(pin.Identifier === pin0.Identifier, "Data pin mismatch in variant encoding");
      const is_ref = def.Type === "Variant" && is_reflect(pin0.Type);
      const v = this.pin_values.get(pin.Identifier);
      let value: Gia.TypedValue | undefined;
      if (v !== undefined || is_ref) {
        if (is_ref) {
          value = make_variant_value(pin.Type, is_server, this.variant_def?.DataPins[i].TypeSelectorIndex ?? 0, v);
        } else {
          value = make_typed_value(pin.Type, is_server, v);
        }
      }

      const con = this.data_from.get(pin.Identifier);
      const connections = con === undefined ? undefined : [make_connection(con.from.node_index, con.from_pin, false)];

      ret.push(pin_body({
        system: this.system,
        def: pin,
        is_flow: false,
        value: value,
        connections: connections
      }));
    }

    for (const [id, conns] of this.flow_to) {
      if (conns === undefined || conns.length === 0) {
        continue;
      }
      const connections = conns.map(c => make_connection(c.to.node_index, c.to_pin, true));
      const def = this.findFlowPin(id)!;
      if (!def) {
        console.warn(`[Warning] Flow pin ${id} not found on node ${this.def.Identifier} during encoding.`);
        continue;
      }
      ret.push(pin_body({
        system: this.system,
        def: def,
        is_flow: true,
        connections: connections
      }));
    }

    return ret;
  }

  /**
 * 将节点编码为 Protobuf 格式
 * 
 * @returns Protobuf 格式的节点实例
 * 
 * @example
 * ```typescript
 * const encoded = node.encode();
 * ```
 */
  encode(): Gia.NodeInstance {
    const comment = this.comment ? make_annotation(this.comment.content) : undefined;

    const pins = this.encode_pins();

    return node_body({
      system: this.system,
      def: this.def,
      x: this.x,
      y: this.y,
      comment: comment,
      pins: pins,
      unique_index: this.node_index,
    });
  }

  /**
 * 从 Protobuf 数据解码节点
 * 
 * @param system - 节点所属系统类型
 * @param proto - Protobuf 格式的节点实例
 * @returns 解码后的节点对象，失败时返回 null
 * 
 * @example
 * ```typescript
 * const node = Node.decode(system, protoNode);
 * ```
 */
  static decode(system: ResourceClass, proto: Gia.NodeInstance): Node | null {
    const node_def = NodeLib.getByID(proto.shell_ref.runtime_id);
    if (node_def === undefined) {
      console.error(`[Error] Node definition not found for ID: ${proto.shell_ref.runtime_id}`);
      return null;
    }
    const is_server = get_system(system) === "Server";
    const node = new Node(system, node_def, proto.index);
    const constraints: [string, NodeType][] = [];
    for (const pin of proto.pins) {
      const pin_info = Node.decode_pin(pin, is_server);
      if (!pin_info.success) {
        console.warn(`[Warning] Failed to decode pin at index ${pin.shell_sig.index} for node ${node_def.Identifier}`);
        continue;
      }
      if (pin_info.kind === "Data") {
        const def = node.def.DataPins.find(p => p.ShellIndex === pin_info.index && p.Direction === pin_info.direction);
        if (!def) {
          console.warn(`[Warning] Data pin definition not found at index ${pin_info.index} for node ${node.def.Identifier}`);
          continue;
        }
        if (!type_equal(def.Type, pin_info.type!) && !is_reflect(def.Type)) {
          console.warn(`[Warning] Data pin type contradiction at pin ${def.Identifier} for node ${def.Identifier}: definition type ${stringify(def.Type)} vs encoded type ${stringify(pin_info.type!)}`);
        }
        if (!is_empty(pin_info.value)) {
          node.pin_values.set(def.Identifier, pin_info.value);
        }
        if (pin_info.poly_value !== undefined) {
          if (!is_reflect(def.Type)) {
            console.warn(`[Warning] Pin ${def.Identifier} in node ${node.def.Identifier} is marked as polymorphic value but its type is not reflective.`);
          } else if (pin_info.type) {
            if (pin_info.type.t === "e") {
              // use poly:
              const c = node.def.Variants?.find(x => x.InjectedContents.find(p => p.Identifier === def.Identifier && p.TypeSelectorIndex === pin_info.poly_value))?.Constraints;
              if (c === undefined) {
                console.error("[Enum Type] type not found!");
              } else {
                pin_info.type = reflects(node.def.DataPins.find(p => p.Identifier === def.Identifier)!.Type, c);
              }
            }
            constraints.push([def.Identifier, pin_info.type]);
          }
        }
      }
    }
    if (node.def.Type === "Variant") {
      node.solveConstraints(constraints);
    }

    // comments
    if (!is_empty(proto.attached_comment)) {
      node.add_comment(proto.attached_comment.text);
    }
    // pos
    node.x = proto.x_pos ?? 0;
    node.y = proto.y_pos ?? 0;
    return node;
  }

  /**
 * 解码引脚数据
 * 
 * 内部静态方法，用于从 Protobuf 数据中解析引脚信息。
 * 
 * @param proto - Protobuf 格式的引脚实例
 * @param is_server - 是否为服务器端数据
 * @returns 解码后的引脚信息对象
 */
  static decode_pin(proto: Gia.PinInstance, is_server: boolean): {
    success: boolean;
    kind?: "Flow" | "Data" | "Meta";
    direction?: "In" | "Out";
    index?: number;
    op_code?: number;
    type?: NodeType;
    value?: TypedValue;
    poly_value?: number;
  } {
    let direction: "In" | "Out";
    switch (proto.shell_sig.kind) {
      case Gia.PinSignature_Kind.IN_FLOW:
        return { success: true, kind: "Flow", direction: "In", index: proto.shell_sig.index };
      case Gia.PinSignature_Kind.OUT_FLOW:
        return { success: true, kind: "Flow", direction: "Out", index: proto.shell_sig.index };
      case Gia.PinSignature_Kind.IN_PARAM:
        direction = "In";
        break;
      case Gia.PinSignature_Kind.OUT_PARAM:
        direction = "Out";
        break;
      case Gia.PinSignature_Kind.META_RPC_OPCODE:
        return { success: true, kind: "Meta", index: proto.shell_sig.index, op_code: proto.binding_meta?.source_ref?.id };
      default:
        console.warn(`[Warning] Unknown pin kind: ${proto.shell_sig.kind}`);
        return { success: false };
    }
    const type = is_server ? ServerTypeHelper.toNodeType(proto.type) : ClientTypeHelper.toNodeType(proto.type);
    const { value, type: value_type, poly } = read_typed_value(proto.value);
    if (type?.t === "e" && value !== undefined && value !== null) {
      if (typeof value !== "number") {
        console.warn(`[Warning] Enum pin value is not a number: ${JSON.stringify(value)}`);
      } else {
        const cat = EnumHelper.getEnumByID(value)?.Identifier.split(".")[0];
        if (cat === undefined) {
          console.warn(`[Warning] Enum category not found for enum ID: ${value}`);
        } else {
          type.e = cat;
        }
      }
    } else if (type?.t === "d" && value_type?.t === "d") {
      // get from 
      type.k = value_type.k;
      type.v = value_type.v;
    }
    return {
      success: true,
      kind: "Data",
      index: proto.shell_sig.index,
      direction,
      type,
      value,
      poly_value: poly,
    };
  }

  /**
 * 解码节点的连接关系
 * 
 * 内部静态方法，用于从 Protobuf 数据中恢复节点间的连接。
 * 
 * @param proto - Protobuf 格式的节点实例
 * @param graph - 目标节点图对象
 */
  static decode_connections(proto: Gia.NodeInstance, graph: Graph) {
    const this_node = graph.nodes.get(proto.index);
    if (!this_node) {
      console.warn(`[Warning] Node at index ${proto.index} not found in graph for decoding connections.`);
      return { flows: [], connects: [] };
    }
    for (const pin of proto.pins) {
      if (is_empty(pin.connections) || pin.connections.length === 0) continue;
      let this_pin: TypedPinDef;
      switch (pin.shell_sig.kind) {
        case Gia.PinSignature_Kind.IN_FLOW:
          this_pin = this_node.def.FlowPins.find(p => p.Direction === "In" && p.ShellIndex === pin.shell_sig.index)!;
          break;
        case Gia.PinSignature_Kind.OUT_FLOW:
          this_pin = this_node.def.FlowPins.find(p => p.Direction === "Out" && p.ShellIndex === pin.shell_sig.index)!;
          break;
        case Gia.PinSignature_Kind.IN_PARAM:
          this_pin = this_node.def.DataPins.find(p => p.Direction === "In" && p.ShellIndex === pin.shell_sig.index)!;
          break;
        case Gia.PinSignature_Kind.OUT_PARAM:
          this_pin = this_node.def.DataPins.find(p => p.Direction === "Out" && p.ShellIndex === pin.shell_sig.index)!;
          break;
        default:
          console.warn(`[Warning] Unknown pin kind for connections: ${pin.shell_sig.kind}`);
          continue;
      }
      if (!this_pin) {
        console.warn(`[Warning] Pin definition not found at index ${pin.shell_sig.index} for node ${this_node.def.Identifier}`);
        continue;
      }
      for (const conn_proto of pin.connections!) {
        const conn = read_connections(conn_proto);
        if (conn === null) {
          console.warn(`[Warning] Failed to read connection for pin at index ${pin.shell_sig.index} in node ${this_node.def.Identifier}`);
          continue;
        }
        const that_node = graph.nodes.get(conn.node_index);
        if (!that_node) {
          console.warn(`[Warning] Connected node at index ${conn.node_index} not found in graph for pin at index ${pin.shell_sig.index} in node ${this_node.def.Identifier}`);
          continue;
        }
        const that_pin = conn.kind === "Data" ?
          that_node.def.DataPins.find(p => p.Direction === "Out" && p.ShellIndex === conn.shell_index) :
          that_node.def.FlowPins.find(p => p.Direction === "In" && p.ShellIndex === conn.shell_index);
        if (!that_pin) {
          console.warn(`[Warning] Connected ${conn.kind} pin ${conn.shell_index} not found in node ${that_node.def.Identifier} for pin at index ${pin.shell_sig.index} in node ${this_node.def.Identifier}`);
          continue;
        }
        this_node.connectPinWith(this_pin.Identifier, that_node, that_pin.Identifier);
      }
    }
  }

  /**
 * 打印节点的调试信息
 * 
 * @param options - 调试选项
 * @param options.indent - 缩进级别（默认 0）
 * @param options.log - 日志输出函数（默认 console.log）
 * 
 * @example
 * ```typescript
 * // 输出到控制台
 * node.debugPrint({});
 * 
 * // 输出到自定义日志
 * const logs: string[] = [];
 * node.debugPrint({ indent: 2, log: (msg) => logs.push(msg) });
 * ```
 */
  debugPrint({ indent = 0, log = console.log }): void {
    log(`${" ".repeat(indent)}Node: ${this.def.Identifier} (Index: ${this.node_index})`);
    if (this.variant_def) {
      log(`${" ".repeat(indent + 2)}Variant Constraints: ${stringify(this.constraint!)}`);
    }
    log(`${" ".repeat(indent + 2)}Pins:`);
    this.debugPrintPins({ indent: indent + 4, log });
    log(`${" ".repeat(indent + 2)}Connections:`);
    const conns = this.getAllConnections();
    if (conns.length === 0) {
      log(`${" ".repeat(indent + 4)}(none)`);
    } else {
      conns.forEach(c => {
        const from_name = c.from === this ? "*this" : `${c.from.def.Identifier.split(":").pop()}(${c.from.node_index})`;
        const to_name = c.to === this ? "*this" : `${c.to.def.Identifier.split(":").pop()}(${c.to.node_index})`;
        log(`${" ".repeat(indent + 4)}[${from_name}::${c.from_pin.Identifier}] --> [${to_name}::${c.to_pin.Identifier}]`);
      });
    }
  }

  /**
 * 打印节点引脚的详细信息
 * 
 * @param options - 调试选项
 * @param options.indent - 缩进级别（默认 0）
 * @param options.log - 日志输出函数（默认 console.log）
 * 
 * @example
 * ```typescript
 * node.debugPrintPins({ indent: 4 });
 * ```
 */
  debugPrintPins({ indent = 0, log = console.log }): void {
    const flowIn = (this.variant_def ?? this.def).FlowPins.filter(x => x.Direction === "In" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const flowOut = (this.variant_def ?? this.def).FlowPins.filter(x => x.Direction === "Out" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const dataIn = (this.variant_def ?? this.def).DataPins.filter(x => x.Direction === "In" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const dataOut = (this.variant_def ?? this.def).DataPins.filter(x => x.Direction === "Out" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);

    const indentStr = " ".repeat(indent);
    log(`${indentStr}Pins for Node ${this.def.Identifier} (Index: ${this.node_index}):`);
    for (let i = 0; i < flowIn.length; i++) {
      log(`${indentStr}  [Flow-In-${flowIn[i].ShellIndex}] (Index: ${i}) ${flowIn[i].Identifier}`);
    }
    for (let i = 0; i < flowOut.length; i++) {
      log(`${indentStr}  [Flow-Out-${flowOut[i].ShellIndex}] (Index: ${i}) ${flowOut[i].Identifier}`);
    }
    for (let i = 0; i < dataIn.length; i++) {
      let val = this.pin_values.get(dataIn[i].Identifier);
      if (is_empty(val)) {
        val = this.def.DataPins.find(p => p.Identifier === dataIn[i].Identifier)?.DefaultValue;
        if (is_empty(val)) {
          val = "(unset)";
        } else {
          val = `(default) ${JSON.stringify(val)}`;
        }
      } else {
        val = JSON.stringify(val);
      }
      log(`${indentStr}  [Data-In-${dataIn[i].ShellIndex}] (Index: ${i}) ${dataIn[i].Identifier}: ${val} as ${stringify(dataIn[i].Type)}`);
    }
    for (let i = 0; i < dataOut.length; i++) {
      let val = this.pin_values.get(dataOut[i].Identifier);
      if (is_empty(val)) {
        val = this.def.DataPins.find(p => p.Identifier === dataOut[i].Identifier)?.DefaultValue;
        if (is_empty(val)) {
          val = "(unset)";
        } else {
          val = `(default) ${JSON.stringify(val)}`;
        }
      } else {
        val = JSON.stringify(val);
      }
      log(`${indentStr}  [Data-Out-${dataOut[i].ShellIndex}] (Index: ${i}) ${dataOut[i].Identifier}: ${val} as ${stringify(dataOut[i].Type)}`);
    }
  }

}

/**
 * Connection interface - 节点间的连接
 * 
 * 表示两个节点之间的一条连接，可以是数据流连接或控制流连接。
 * 
 * @example
 * ```typescript
 * const conn: Connection = {
 *   from: nodeA,
 *   to: nodeB,
 *   from_pin: nodeA.findDataPin("result")!,
 *   to_pin: nodeB.findDataPin("input")!
 * };
 * ```
 */
export interface Connection {
  /** 连接的源节点 */
  from: Node;

  /** 连接的目标节点 */
  to: Node;

  /** 源节点的引脚定义 */
  from_pin: TypedPinDef;

  /** 目标节点的引脚定义 */
  to_pin: TypedPinDef;
}

/**
 * 创建连接（内部方法，不进行一致性验证）
 * 
 * **警告**: 此函数不验证连接类型和方向的一致性，仅供内部使用。
 * 
 * @param con - 连接对象
 * @param kind - 连接类型（"Data" 或 "Flow"）
 * @param insert_pos - 插入位置（可选，仅用于控制流）
 */
function make_connection_unsafe(con: Connection, kind: "Data" | "Flow", insert_pos?: number): void {
  if (insert_pos !== undefined && kind !== "Data") {
    console.warn("[Warning] Insert position is only applicable for Flow pins. Connect will ignore it.");
  }
  if (kind === "Data") {
    con.to.data_from.set(con.to_pin.Identifier, con);
    if (!con.from.data_to.has(con.from_pin.Identifier)) {
      con.from.data_to.set(con.from_pin.Identifier, new Set());
    }
    con.from.data_to.get(con.from_pin.Identifier)!.add(con);
  } else {
    if (!con.to.flow_from.has(con.to_pin.Identifier)) {
      con.to.flow_from.set(con.to_pin.Identifier, new Set());
    }
    con.to.flow_from.get(con.to_pin.Identifier)!.add(con);
    if (!con.from.flow_to.has(con.from_pin.Identifier)) {
      con.from.flow_to.set(con.from_pin.Identifier, []);
    }
    if (insert_pos !== undefined) {
      if (insert_pos < 0 || insert_pos > con.from.flow_to.get(con.from_pin.Identifier)!.length) {
        console.warn(`[Warning] Insert position ${insert_pos} is out of bounds for flow connections at pin ${con.from_pin.Identifier}. Appending instead.`);
        con.from.flow_to.get(con.from_pin.Identifier)!.push(con);
      } else {
        con.from.flow_to.get(con.from_pin.Identifier)!.splice(insert_pos, 0, con);
      }
    } else {
      con.from.flow_to.get(con.from_pin.Identifier)!.push(con);
    }
  }
}

/**
 * 断开连接（内部方法，不进行一致性验证）
 * 
 * **警告**: 此函数不验证连接类型和方向的一致性，仅供内部使用。
 * 
 * @param con - 要断开的连接对象
 * @param kind - 连接类型（"Data" 或 "Flow"）
 */
function make_disconnection_unsafe(con: Connection, kind: "Data" | "Flow"): void {
  if (kind === "Data") {
    con.to.data_from.delete(con.to_pin.Identifier);
    con.from.data_to.get(con.from.def.Identifier)?.delete(con);
  } else {
    con.to.flow_from.get(con.to_pin.Identifier)?.delete(con);
    const conns = con.from.flow_to.get(con.from.def.Identifier);
    if (conns) {
      const index = conns.indexOf(con);
      if (index >= 0) {
        conns.splice(index, 1);
      }
    }
  }
}

/**
 * Comment interface - 注释
 * 
 * 表示节点图中的注释，可以附加到节点或独立存在。
 * 
 * @example
 * ```typescript
 * // 附加到节点的注释
 * const nodeComment: Comment = {
 *   content: "这是一个重要的分支节点"
 * };
 * 
 * // 独立注释
 * const standaloneComment: Comment = {
 *   content: "这是一个独立注释",
 *   x: 600,
 *   y: 100
 * };
 * ```
 */
export interface Comment {
  /** 注释内容 */
  content: string;

  /** X 坐标（仅用于独立注释） */
  x?: number;

  /** Y 坐标（仅用于独立注释） */
  y?: number;
}

/**
 * GraphVar interface - 图变量
 * 
 * 表示节点图级别的全局变量，可以在多个节点间共享数据。
 * 
 * @example
 * ```typescript
 * const graphVar: GraphVar = {
 *   name: "playerLevel",
 *   type: { t: "p", v: "Int" },
 *   val: 10,
 *   exposed: true
 * };
 * ```
 */
export interface GraphVar {
  /** 变量名称 */
  name: string;

  /** 是否暴露给外部访问 */
  exposed: boolean;

  /** 变量类型 */
  type: NodeType;

  /** 变量值 */
  val: TypedValue;
};
