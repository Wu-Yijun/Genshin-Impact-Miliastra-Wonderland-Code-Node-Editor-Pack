import { assert, empty } from "../utils.ts";
import * as Gia from "../protobuf/gia.proto.ts";
import {
  graph_body,
  node_body,
  pin_body,
  make_typed_value,
  make_connection,
  make_annotation,
  make_variant_value
} from "./core.ts";
import { Doc, Node as NodeLib } from "../node_data/instances.ts";
import type { InjectedDef, NodeDef, PinDef, ResourceClass, ServerClient, TypedValue } from "../node_data/types.ts";
import { type NodeType, stringify, parse, is_reflect, ConstraintType, StructType } from "../node_data/node_type.ts";
import { Counter, get_system, randomInt, randomName } from "./utils.ts";
import { TypedNodeDef } from "../node_data/core.ts";


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

  public readonly nodes: Set<Node>;
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

    this.nodes = new Set();
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
      if (this.nodes.has(node)) {
        console.error("Node already already in graph!");
        return node;
      }
      this.nodes.add(node);
      this.counter_idx.lower_bound = node.node_index;
      return node;
    }

    let def: NodeDef | undefined;
    if (typeof node === "string") {
      // TODO: support <Domain>.<Category>.<Action>.<Constraints> format
      def = NodeLib.getByIdentifier(node);
    } else if (typeof node === "number") {
      def = NodeLib.getByID(node);
    } else {
      console.error(`Invalid argument for add_node: ${node}`);
      return null;
    }
    if (def === undefined) {
      // Try precise lookup failed, check if it's a "Generic ID + Concrete ID" string from old code? 
      // User said "Identifier (string) (New Feature)", so we assume standard Node Identifier.
      console.error(`Node not found by Identifier: ${node}`);
      return null;
    }
    // Check system compatibility
    if (def.System !== get_system(this.system)) {
      // Warning but maybe allow if user knows what they are doing (e.g. specialized Universal nodes)
      console.warn(`Node ${def.Identifier} system (${def.System}) does not match Graph system (${this.system})`);
    }

    const newNode = new Node(this.system, def, this.counter_idx.value);
    this.nodes.add(newNode);
    return newNode;
  }

  /**
   * Connect two nodes.
   * @param from Source Node
   * @param to Target Node
   * @param fromArg Source Pin: Index (number) or Identifier (string)
   * @param toArg Target Pin: Index (number) or Identifier (string)
   */
  connect(from: Node, to: Node, fromArg: number | string, toArg: number | string): Connection | null {
    const fromPin = typeof fromArg === "number" ? from.getVisibleDataPin(fromArg) : from.findPin(fromArg).pin;
    const toPin = typeof toArg === "number" ? to.getVisibleDataPin(toArg) : to.findPin(toArg).pin;
    if (!fromPin) {
      console.error(`Source pin not found on node ${from.def.Identifier}: ${fromArg}`);
      return null;
    }
    if (!toPin) {
      console.error(`Target pin not found on node ${to.def.Identifier}: ${toArg}`);
      return null;
    }
    if (fromPin.Direction === "In" || toPin.Direction === "Out") {
      console.error(`Invalid connection direction: from ${fromPin.Direction} to ${toPin.Direction}`);
      return null;
    }
    return from.connectWith(fromPin.Identifier, to, toPin.Identifier);
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
    return Array.from(this.nodes).map(n => Array.from(n.data_from.values())).flat();
  }
  get flows(): Connection[] {
    return Array.from(this.nodes).map(n => Array.from(n.flow_to.values())).flat(2);
  }

  encode(opt?: any): Gia.AssetBundle {
    const nodes = Array.from(this.nodes).map(n => n.encode());
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
}

export class Node {
  public readonly system: ResourceClass;
  public readonly node_index: number;
  public readonly def: NodeDef;
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
    this.def = def;
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
    pin?: PinDef;
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

  getVisibleDataPin(index: number): PinDef | null {
    for (let i = 0, count = 0; i < this.def.DataPins.length; i++, count++) {
      const pin = this.def.DataPins[i];
      if (pin.Visibility === "Hidden") continue;
      if (count === index) {
        return pin;
      }
    }
    return null;
  }

  printPins(): void {
    const flowIn = this.def.FlowPins.filter(x => x.Direction === "In" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const flowOut = this.def.FlowPins.filter(x => x.Direction === "Out" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const dataIn = this.def.DataPins.filter(x => x.Direction === "In" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);
    const dataOut = this.def.DataPins.filter(x => x.Direction === "Out" && x.Visibility !== "Hidden").sort((a, b) => a.ShellIndex - b.ShellIndex);

    console.log(`Pins for Node ${this.def.Identifier} (Index: ${this.node_index}):`);
    for (let i = 0; i < flowIn.length; i++) {
      console.log(`  [Flow-In-${flowIn[i].ShellIndex}] ${flowIn[i].Identifier} (Index: ${i})`);
    }
    for (let i = 0; i < flowOut.length; i++) {
      console.log(`  [Flow-Out-${flowOut[i].ShellIndex}] ${flowOut[i].Identifier} (Index: ${i})`);
    }
    for (let i = 0; i < dataIn.length; i++) {
      console.log(`  [Data-In-${dataIn[i].ShellIndex}] ${dataIn[i].Identifier} (Index: ${i})`);
    }
    for (let i = 0; i < dataOut.length; i++) {
      console.log(`  [Data-Out-${dataOut[i].ShellIndex}] ${dataOut[i].Identifier} (Index: ${i})`);
    }
  }

  findDataPin(identifier: string): PinDef | null {
    const pin = this.def.DataPins.find(p => p.Identifier === identifier);
    return pin ?? null;
  }

  findFlowPin(identifier: string): PinDef | null {
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
  connectWith(pin: string, with_node: Node, with_pin: string, insert_pos?: number): Connection | null {
    const thisPin = this.findPin(pin);
    const thatPin = with_node.findPin(with_pin);
    if (!thisPin.success) {
      console.warn(`Pin ${pin} not found on node ${this.def.Identifier}`);
      return null;
    }
    if (!thatPin.success) {
      console.warn(`With Pin ${with_pin} not found on node ${with_node.def.Identifier}`);
      return null;
    }
    if (thisPin.kind !== thatPin.kind || thisPin.kind === "Meta") {
      console.warn(`Pin kinds do not match: ${thisPin.kind} vs ${thatPin.kind}`);
      return null;
    }
    if (thatPin.pin!.Connectability === false || thisPin.pin!.Connectability === false) {
      console.warn(`One of the pins is not connectable: ${thisPin.pin!.Identifier} or ${thatPin.pin!.Identifier}`);
      return null;
    }
    if (thisPin.pin!.Direction === thatPin.pin!.Direction) {
      console.warn(`Cannot connect pins with same direction: ${thisPin.pin!.Direction}`);
      return null;
    }
    if (thatPin.kind === "Data" && thisPin.pin!.Type !== thatPin.pin!.Type) {
      console.info(`Data pin types do not match (Force Connect): ${thisPin.pin!.Type} vs ${thatPin.pin!.Type}`);
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
      console.warn(`No data connection found at pin ${pinIdentifier}.`);
      return false;
    }
    this.data_from.delete(pinIdentifier);
    con.from.data_to.get(con.to.def.Identifier)?.delete(con);
    return true;
  }

  disconnectFlowOutAt(pinIdentifier: string, index: number): boolean {
    const conns = this.flow_to.get(pinIdentifier);
    if (conns === undefined || index < 0 || index >= conns.length) {
      console.warn(`No flow connections found at pin ${pinIdentifier}.`);
      return false;
    }
    const con = conns[index];
    if (con === undefined) {
      console.warn(`No flow connection found at index ${index} for pin ${pinIdentifier}.`);
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
  setConstraints(constraint: ConstraintType | null) {
    if (this.def.Type !== "Variant") {
      console.error(`Node ${this.def.Identifier} is not a Variant node.`);
      return;
    }
    if (constraint === null) {
      // Reset to base definition
      this.variant_def = null;
      this.constraint = undefined;
      return;
    }
    if (constraint?.t !== "c") {
      console.error(`Node ${this.def.Identifier}: current constraint is not of ConstraintType.`);
      return;
    }
    const newDef = NodeLib.getVariant(this.def.Identifier, constraint);
    if (!newDef) {
      // Try fallback: Sometimes constraint is just "T" or "T=..."
      // But NodeLib.getVariant expects exact constraint string match from Variants list.
      console.error(`Constraint ${stringify(constraint)} not found for node ${this.def.Identifier}`);
      return;
    }

    // Update definition and re-init pins
    this.variant_def = newDef;
    this.constraint = constraint;
  }

  setPosition(x: number, y: number, scale_x = 300, scale_y = 200) {
    this.x = x * scale_x;
    this.y = y * scale_y;
  }

  encode_pins(): Gia.PinInstance[] {
    const ret: Gia.PinInstance[] = [];
    const def = this.variant_def ?? this.def;
    const is_server = get_system(this.system) === "Server";

    for (let i = 0; i < def.DataPins.length; i++) {
      const pin = def.DataPins[i];
      const pin0 = this.def.DataPins[i];
      assert(pin.Identifier === pin0.Identifier, "Data pin mismatch in variant encoding");
      const is_ref = def.Type === "Variant" && pin0.Type !== undefined && is_reflect(pin0.Type);
      const v = this.pin_values.get(pin.Identifier);
      let value: Gia.TypedValue | undefined;
      if (v !== undefined) {
        if (is_ref) {
          value = make_variant_value(parse(pin.Type ?? "Unk"), is_server, this.variant_def?.DataPins[i].TypeSelectorIndex ?? 0, v);
        } else {
          value = make_typed_value(parse(pin.Type ?? "Unk"), is_server, v);
        }
      }

      const con = this.data_from.get(pin.Identifier);
      const connections = con === undefined ? undefined : [make_connection(con.to.node_index, con.to_pin, false)];

      ret.push(pin_body({
        system: this.system,
        def: pin,
        is_flow: false,
        value: value,
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
}

export interface Connection {
  from: Node;
  to: Node;
  from_pin: PinDef;
  to_pin: PinDef;
}

/** **Warning**: No verify for consistency of kind and connection */
function make_connection_unsafe(con: Connection, kind: "Data" | "Flow", insert_pos?: number): void {
  if (insert_pos !== undefined && kind !== "Data") {
    console.warn("Insert position is only applicable for Flow pins. Connect will ignore it.");
  }
  if (kind === "Data") {
    con.to.data_from.set(con.to_pin.Identifier, con);
    if (!con.from.data_to.has(con.to_pin.Identifier)) {
      con.from.data_to.set(con.to_pin.Identifier, new Set());
    }
    con.from.data_to.get(con.to_pin.Identifier)!.add(con);
  } else {
    if (!con.to.flow_from.has(con.to_pin.Identifier)) {
      con.to.flow_from.set(con.to_pin.Identifier, new Set());
    }
    con.to.flow_from.get(con.to_pin.Identifier)!.add(con);
    if (!con.from.flow_to.has(con.to_pin.Identifier)) {
      con.from.flow_to.set(con.to_pin.Identifier, []);
    }
    if (insert_pos !== undefined) {
      if (insert_pos < 0 || insert_pos > con.from.flow_to.get(con.to_pin.Identifier)!.length) {
        console.warn(`Insert position ${insert_pos} is out of bounds for flow connections at pin ${con.to_pin.Identifier}. Appending instead.`);
        con.from.flow_to.get(con.to_pin.Identifier)!.push(con);
      } else {
        con.from.flow_to.get(con.to_pin.Identifier)!.splice(insert_pos, 0, con);
      }
    } else {
      con.from.flow_to.get(con.to_pin.Identifier)!.push(con);
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