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
  read_connections
} from "./core.ts";
import { ClientType, Doc, Node as NodeLib, ServerType } from "../node_data/instances.ts";
import type { NodeDef, ResourceClass, ServerClient, TypedValue } from "../node_data/types.ts";
import { type NodeType, stringify, parse, is_reflect, type ConstraintType, type StructType, type_equal } from "../node_data/node_type.ts";
import { Counter, fuseSuggest, get_system, is_empty, randomInt, randomName } from "./utils.ts";
import { type TypedPinDef, type TypedNodeDef } from "../node_data/core.ts";


// Helper to determine system from common inputs if needed,
// but usually we strictly use the system provided in constructor.


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

  constructor(system_class: ResourceClass = "ENTITY_NODE_GRAPH", uid?: number, name?: string, graph_id?: number) {
    this.system = system_class;
    this.uid = uid ?? randomInt(9, "201");
    const ID_RANGE = Doc.systemConstants.GRAPH_ID_RANGE[get_system(system_class)];
    this.graph_id = graph_id ?? randomInt(3) + ID_RANGE;

    this.graph_name = name ?? randomName(3);
    this.counter_idx = new Counter();
    this.counter_dyn_id = new Counter(Number(this.graph_id));
    this.file_id = this.counter_dyn_id.value;

    this.nodes = new Map<number, Node>();
    this.comments = new Set();
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
      return node;
    }

    let def: NodeDef | undefined;
    if (typeof node === "string") {
      // TODO: support <Domain>.<Category>.<Action>.<Constraints> format
      def = NodeLib.getByIdentifier(node);
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
    return newNode;
  }

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
    const fromPin = typeof fromArg === "number" ? from.getVisibleDataPin(fromArg) : from.findPin(fromArg).pin;
    const toPin = typeof toArg === "number" ? to.getVisibleDataPin(toArg) : to.findPin(toArg).pin;
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

  get connects(): Connection[] {
    return Array.from(this.nodes.values()).map(n => Array.from(n.data_from.values())).flat();
  }
  get flows(): Connection[] {
    return Array.from(this.nodes.values()).map(n => Array.from(n.flow_to.values())).flat(2);
  }

  encode(opt?: any): Gia.AssetBundle {
    const nodes = Array.from(this.nodes.values()).map(n => n.encode());
    const comments = Array.from(this.comments).map(c => make_annotation(c.content, c.x, c.y));

    return graph_body({
      system: this.system,
      uid: this.uid,
      graph_id: this.graph_id,
      file_id: this.file_id,
      graph_name: this.graph_name,
      nodes: nodes,
      comments: comments,
      graphValues: [] // TODO: Implement variables if needed
    });
  }

  static from(data: Gia.AssetBundle): Graph {
    return this.decode(data);
  }
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

    // // TODO
    // const graph_vars = get_graph_vars(root.graph.graph?.inner.graph!);
    // graph_vars.forEach((v) => graph.graph_var.set(v.name, v));

    proto.primary_resource.graph_data?.inner.graph.nodes.forEach(node => {
      // node itself
      const n = Node.decode(system, node);
      if (n === null) {
        console.error(`[Error] Failed to decode node at index ${node.index}`);
        return;
      }
      graph.add_node(n);
      // comments
      // if (!empty(node.comments)) {
      //   graph.add_comment(Comment.decode(node.comments, n));
      // }
    });

    proto.primary_resource.graph_data?.inner.graph.nodes.forEach(node => {
      // decode connects
      Node.decode_connections(node, graph);
    });
    return graph;
  }

  debugPrint({ indent = 0, log = console.log }): void {
    log(`${" ".repeat(indent)}Graph: ${this.graph_name} (ID: ${this.graph_id}, System: ${this.system})`);
    log(`${" ".repeat(indent)}UID: ${this.uid}, File ID: ${this.file_id}`);
    log(`${" ".repeat(indent)}Nodes:`);
    this.nodes.forEach(node => {
      node.debugPrint({ indent: indent + 2, log });
    });
  }
}

export class Node {
  public readonly system: ResourceClass;
  public readonly node_index: number;
  public readonly def: TypedNodeDef;
  public variant_def: TypedNodeDef | null = null;

  // for variant nodes
  public constraint: ConstraintType | undefined;

  // only for param-In pins
  public readonly pin_values: Map<string, TypedValue>;
  // connections: PinIdentifier -> Connections
  public readonly data_from: Map<string, Connection>;
  public readonly data_to: Map<string, Set<Connection>>;
  public readonly flow_from: Map<string, Set<Connection>>;
  public readonly flow_to: Map<string, Connection[]>; // with order

  public x: number = 0;
  public y: number = 0;
  public comment: Comment | null = null;

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

  getVisibleDataPin(index: number): TypedPinDef | null {
    for (let i = 0, count = 0; i < this.def.DataPins.length; i++, count++) {
      const pin = this.def.DataPins[i];
      if (pin.Visibility === "Hidden") continue;
      if (count === index) {
        return pin;
      }
    }
    return null;
  }

  findDataPin(identifier: string): TypedPinDef | null {
    const pin = (this.variant_def ?? this.def).DataPins.find(p => p.Identifier === identifier);
    return pin ?? null;
  }

  findFlowPin(identifier: string): TypedPinDef | null {
    const pin = this.def.FlowPins.find(p => p.Identifier === identifier);
    return pin ?? null;
  }

  getAllConnections(): Connection[] {
    return [
      ...this.data_from.values(),
      [...this.data_to.values()].map(set => Array.from(set)),
      [...this.flow_from.values()].map(set => Array.from(set)),
      ...this.flow_to.values(),
    ].flat(2);
  }

  /**
   * Connect this node's pin to another node's pin.
   * Automatically handles direction and type checks.
   * 
   * @param pin identifier of pin in this node
   * @param with_node pin in another side of connection
   * @param with_pin identifier of pin in that node
   * @param insert_pos (optional) position to insert the connection
   * @returns Connection object if successful, null otherwise
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
    make_connection_unsafe(con, thisPin.kind!, insert_pos);
    return con;
  }

  disconnectDataInAt(pinIdentifier: string): boolean {
    const con = this.data_from.get(pinIdentifier);
    if (con === undefined) {
      console.warn(`[Warning] No data connection found at pin ${pinIdentifier}.`);
      return false;
    }
    this.data_from.delete(pinIdentifier);
    con.from.data_to.get(con.to.def.Identifier)?.delete(con);
    return true;
  }

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
    con.from.flow_from.get(con.to.def.Identifier)?.delete(con);
    return true;
  }

  /**
   * Set constraints for Variant nodes.
   * @param type The type constraint (e.g. C<T:Bool>, C<K:L<Int>>), set to null to reset
   */
  setConstraints(constraint: NodeType | string | null) {
    if (this.def.Type !== "Variant") {
      console.error(`[Error] Node ${this.def.Identifier} is not a Variant node.`);
      return;
    }
    if (constraint === null) {
      // Reset to base definition
      this.variant_def = null;
      this.constraint = undefined;
      return;
    }
    if (typeof constraint === "string") {
      constraint = parse(constraint);
    }
    if (constraint?.t !== "c") {
      console.error(`[Error] Node ${this.def.Identifier}: current constraint is not of ConstraintType.`);
      fuseSuggest(this.def.Variants!.map(x => x.Constraints), stringify(constraint));
      return;
    }
    const newDef = NodeLib.getVariant(this.def.Identifier, constraint);
    if (!newDef) {
      console.error(`[Error] Constraint '${stringify(constraint)}' not found for node ${this.def.Identifier}`);
      fuseSuggest(this.def.Variants!.map(x => x.Constraints), stringify(constraint));
      return;
    }
    // Update definition and re-init pins
    this.variant_def = newDef;
    this.constraint = constraint;
  }

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

  setPosition(x: number, y: number, scale_x = 300, scale_y = 200) {
    this.x = x * scale_x;
    this.y = y * scale_y;
  }

  setVal(pin: number | string, value: TypedValue) {
    let pinDef: TypedPinDef | null;
    if (typeof pin === "number") {
      pinDef = this.getVisibleDataPin(pin);
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
    this.pin_values.set(pinDef.Identifier, value);
  }

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

  static decode(system: ResourceClass, proto: Gia.NodeInstance): Node | null {
    const def = NodeLib.getByID(proto.shell_ref.runtime_id);
    if (def === undefined) {
      console.error(`[Error] Node definition not found for ID: ${proto.shell_ref.runtime_id}`);
      return null;
    }
    const is_server = get_system(system) === "Server";
    const node = new Node(system, def, proto.index);
    const constraints: [string, NodeType][] = [];
    for (const pin of proto.pins) {
      const pin_info = Node.decode_pin(pin, is_server);
      if (!pin_info.success) {
        console.warn(`[Warning] Failed to decode pin at index ${pin.shell_sig.index} for node ${def.Identifier}`);
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
        if (pin_info.poly_value) {
          if (!is_reflect(def.Type)) {
            console.warn(`[Warning] Pin ${def.Identifier} in node ${node.def.Identifier} is marked as polymorphic value but its type is not reflective.`);
          } else if (pin_info.type) {
            constraints.push([def.Identifier, pin_info.type]);
          }
        }
      }
    }
    if (node.def.Type === "Variant") {
      node.solveConstraints(constraints);
    }
    return node;
  }

  static decode_pin(proto: Gia.PinInstance, is_server: boolean): {
    success: boolean;
    kind?: "Flow" | "Data" | "Meta";
    direction?: "In" | "Out";
    index?: number;
    op_code?: number;
    type?: NodeType;
    value?: TypedValue;
    poly_value?: boolean;
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
    const type = is_server ? ServerType.toNodeType(proto.type) : ClientType.toNodeType(proto.type);
    const value = read_typed_value(proto.value);
    return {
      success: true,
      kind: "Data",
      index: proto.shell_sig.index,
      direction,
      type,
      value,
      poly_value: proto.value?.val_poly !== undefined
    };
  }

  static decode_connections(proto: Gia.NodeInstance, graph: Graph) {
    const this_node = graph.nodes.get(proto.index);
    if (!this_node) {
      console.warn(`[Warning] Node at index ${proto.index} not found in graph for decoding connections.`);
      return { flows: [], connects: [] };
    }
    for (const pin of proto.pins) {
      if (is_empty(pin.connections)) continue;
      let this_pin: TypedPinDef;
      switch (pin.shell_sig.kind) {
        case Gia.PinSignature_Kind.IN_FLOW:
        case Gia.PinSignature_Kind.OUT_FLOW:
          this_pin = this_node.def.FlowPins.find(p => p.ShellIndex === pin.shell_sig.index)!;
          break;
        case Gia.PinSignature_Kind.IN_PARAM:
        case Gia.PinSignature_Kind.OUT_PARAM:
          this_pin = this_node.def.DataPins.find(p => p.ShellIndex === pin.shell_sig.index)!;
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

export interface Connection {
  from: Node;
  to: Node;
  from_pin: TypedPinDef;
  to_pin: TypedPinDef;
}

/** **Warning**: No verify for consistency of kind and connection */
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

/** **Warning**: No verify for consistency of kind and connection */
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


export interface Comment {
  content: string;
  x?: number;
  y?: number;
  attached_node?: Node;
}
