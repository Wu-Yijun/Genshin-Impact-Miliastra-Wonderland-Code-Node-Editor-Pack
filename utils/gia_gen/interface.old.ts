import { assert, empty } from "../utils.ts";
import * as Gia from "../protobuf/gia.proto.ts";
import {
  graph_body,
  node_body,
  pin_body,
  make_typed_value,
  make_connection
} from "./core.ts";
import { Doc, Node as NodeLib } from "../node_data/instances.ts";
import type { NodeDef, PinDef, ResourceClass, ServerClient, TypedValue } from "../node_data/types.ts";
import { type NodeType, stringify, parse } from "../node_data/node_type.ts";
import { Counter, randomInt, randomName } from "./utils.ts";


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
  // Node -> Pin -> Connection[] (with order)
  public readonly flows: Map<Node, Map<string, Connection[]>>;
  public readonly connects: Set<Connection>;
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
    this.connects = new Set();
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

    const newNode = new Node(def, this.counter_idx.value, this.system);
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
    const fromPin = from.getPin(fromArg, "Out");
    const toPin = to.getPin(toArg, "In");

    if (!fromPin) {
      console.error(`Source pin not found on node ${from.def.Identifier}: ${fromArg}`);
      return null;
    }
    if (!toPin) {
      console.error(`Target pin not found on node ${to.def.Identifier}: ${toArg}`);
      return null;
    }

    // Check pre-existing connection to avoid duplicates
    // Also logic to disconnect old connections if single-link constraint (usually inputs)

    // For "In" pins (Data or Flow), usually only one connection allowed? 
    // Flow In: Can have multiple sources calling it? Yes.
    // Data In: Can only have ONE source.
    if (toPin.kind === Gia.PinSignature_Kind.IN_PARAM) {
      const existing = this.get_connection_to(to, toPin.index);
      if (existing) {
        console.warn(`Disconnecting existing input on ${to.def.Identifier} pin ${toPin.toString()}`);
        this.disconnect(existing);
      }
    }

    const conn = new Connection(from, fromPin, to, toPin);
    this.connects.add(conn);

    // Also add to pin's internal list if we want to track it there
    fromPin.addConnection(conn);
    toPin.addConnection(conn);

    return conn;
  }

  disconnect(conn: Connection) {
    if (this.connects.delete(conn)) {
      conn.fromPin.removeConnection(conn);
      conn.toPin.removeConnection(conn);
    }
  }

  get_connection_to(node: Node, pinIndex: number): Connection | undefined {
    // This could be slow O(N), better to ask the Node/Pin itself
    const pin = node.pins.find(p => p.index === pinIndex && (p.kind === Gia.PinSignature_Kind.IN_PARAM || p.kind === Gia.PinSignature_Kind.IN_FLOW));
    if (pin && pin.connections.length > 0) return pin.connections[0];
    return undefined;
  }

  encode(opt?: any): Gia.AssetBundle {
    const nodesEncoded = Array.from(this.nodes).map(n => n.encode());
    const commentsEncoded = Array.from(this.comments).map(c => c.encode());

    // Helper to get graph const logic
    // We can use a simpler approach or reuse existing map 
    // For now we pass "Server" or "Client" as string key to graph_body which handles lookup

    return graph_body({
      system: this.system,
      uid: this.uid,
      graph_id: this.graph_id,
      file_id: this.file_id,
      graph_name: this.graph_name,
      nodes: nodesEncoded,
      comments: commentsEncoded,
      graphValues: [] // TODO: Implement variables if needed
    });
  }
}

export class Node {
  public def: NodeDef;
  public readonly node_index: number;
  public readonly system: string;
  public pins: Pin[];
  public constraint: NodeType | undefined;

  public x: number = 0;
  public y: number = 0;
  public comment: Comment | null = null;

  // For Variant Nodes
  public concreteId: number | undefined;

  constructor(def: NodeDef, index: number, system: string) {
    this.def = def;
    this.node_index = index;
    this.system = system;
    this.pins = [];
    this.initPins();
  }

  private initPins() {
    this.pins = [];
    // Data Pins
    if (this.def.DataPins) {
      for (const p of this.def.DataPins) {
        const kind = p.Direction === "In" ? Gia.PinSignature_Kind.IN_PARAM : Gia.PinSignature_Kind.OUT_PARAM;
        this.pins.push(new Pin(this, p, kind, this.calculatePinIndex(p.Direction, "Data", p.Index), this.system));
      }
    }
    // Flow Pins
    if (this.def.FlowPins) {
      for (const p of this.def.FlowPins) {
        const kind = p.Direction === "In" ? Gia.PinSignature_Kind.IN_FLOW : Gia.PinSignature_Kind.OUT_FLOW;
        this.pins.push(new Pin(this, p, kind, this.calculatePinIndex(p.Direction, "Flow", p.Index), this.system));
      }
    }
  }

  // Calculate generic index for that kind
  // Actually PinDef.Index might be absolute or relative? 
  // Usually in NodeDef, DataPins are listed 0..N, FlowPins 0..M separately.
  // The Gia protocol expects index per Kind.
  private calculatePinIndex(dir: "In" | "Out", type: "Data" | "Flow", defIndex: number): number {
    // If defIndex is reliable we use it. 
    // But NodeDef might be sparse? The core.ts pin_body uses index passed to it.
    // Let's assume defIndex is correct for that specific array in NodeDef.
    // However, we need to ensure it matches the order in the array if we rely on array order.
    // PinDef has an Index field, let's use it.
    return defIndex;
  }

  getPin(arg: number | string, dir?: "In" | "Out"): Pin | undefined {
    let pin: Pin | undefined;
    if (typeof arg === "number") {
      // Ambiguous if we don't know Kind. 
      // User request said "allow use index ... specify pin"
      // If just index, we might default to Data pins? Or we search through all?
      // Old graph.ts assumed absolute index across all pins? 
      // Or 0-based index for Inputs and 0-based for Outputs? 

      // Let's assume arg is the 'Index' property of the Pin (generic index within its category/kind)
      // If direction is provided, we filter.
      if (dir) {
        pin = this.pins.find(p => p.def.Index === arg && p.def.Direction === dir);
      } else {
        // Try to find unique match
        const matches = this.pins.filter(p => p.def.Index === arg);
        if (matches.length === 1) pin = matches[0];
        else if (matches.length > 1) console.warn(`Ambiguous pin index ${arg} on node ${this.def.Identifier}`);
      }
    } else {
      // Identifier
      pin = this.pins.find(p => p.def.Identifier === arg);
    }
    return pin;
  }

  /**
   * Set constraints for Variant nodes.
   * @param type The type constraint (e.g. Bool, Int)
   */
  setConstraints(type: NodeType) {
    if (this.def.Type !== "Variant") {
      console.error(`Node ${this.def.Identifier} is not a Variant node.`);
      return;
    }
    const constraintStr = stringify(type);
    const newDef = NodeLib.getVariant(this.def.Identifier, constraintStr);

    if (!newDef) {
      // Try fallback: Sometimes constraint is just "T" or "T=..."
      // But NodeLib.getVariant expects exact constraint string match from Variants list.
      console.error(`Constraint ${constraintStr} not found for node ${this.def.Identifier}`);
      return;
    }

    // Update definition and re-init pins
    this.def = newDef;
    // Determine concreteId (KernelID) from the variant def
    this.concreteId = newDef.KernelID;

    // Re-initialize pins to match new definition structure (types might change)
    // We should try to preserve connections/values if possible?
    const oldPins = this.pins;
    this.initPins();

    // Restore values/connections if compatible
    for (const oldPin of oldPins) {
      const newPin = this.pins.find(p => p.def.Identifier === oldPin.def.Identifier);
      if (newPin) {
        newPin.value = oldPin.value;
        // Connections need to be updated to point to new Pin instance
        for (const conn of oldPin.connections) {
          if (conn.from === this && conn.fromPin === oldPin) conn.fromPin = newPin;
          if (conn.to === this && conn.toPin === oldPin) conn.toPin = newPin;
          newPin.connections.push(conn);
        }
      }
    }
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  encode(): Gia.NodeInstance {
    const pinsEncoded = this.pins.map(p => p.encode()).filter((p): p is Gia.PinInstance => !!p);

    return node_body({
      def: this.def,
      concrete_id: this.concreteId,
      x: this.x,
      y: this.y,
      pins: pinsEncoded,
      unique_index: this.node_index,
      comment: this.comment ? this.comment.encode() : undefined
    });
  }
}

export class Pin {
  public readonly system: ResourceClass;

  public def: PinDef;
  public value: TypedValue;
  public connections: Connection[] = [];

  constructor(system: ResourceClass, def: PinDef) {
    this.def = def;
    this.system = system;
    this.value = this.def.DefaultValue ?? null;
  }

  addConnection(conn: Connection) {
    if (!this.connections.includes(conn)) this.connections.push(conn);
  }

  removeConnection(conn: Connection) {
    const idx = this.connections.indexOf(conn);
    if (idx !== -1) this.connections.splice(idx, 1);
  }

  setVal(val: TypedValue | null) {
    if (this.def.Direction === "In") {
      this.value = val;
    } else {
      console.error("Cannot set value on output/flow pin");
    }
  }

  encode(): Gia.PinInstance | null {
    // If not connected and no value, maybe skip? 
    // But Gia usually expects all pins defined in shell.

    // Prepare connections list for this pin
    // If we are Output, we list who we connect TO (target node, target pin)
    // If we are Input, usually we don't list connections in efficient mode, OR we list source?
    // Gia: `connections` field in PinInstance.
    // Usually contains list of (target_node_index, target_pin_sig).
    // So valid for OUT pins.

    let encodedConnections: Gia.NodeConnection[] = [];
    if (this.kind === Gia.PinSignature_Kind.OUT_PARAM || this.kind === Gia.PinSignature_Kind.OUT_FLOW) {
      encodedConnections = this.connections.map(c => make_connection(
        c.to.node_index,
        c.toPin.kind,
        c.toPin.index
      ));
    }

    // Type resolution
    let type: NodeType = this.def.Type ? parse(this.def.Type) : { t: "b", b: "Int" }; // Default/Fallback?

    // Value encoding
    let typedValue: Gia.TypedValue | undefined = undefined;
    if (this.value !== undefined) {
      typedValue = make_typed_value(type, this.value, this.system === "Server");
    }

    return pin_body({
      def: this.def,
      index: this.index,
      kind: this.kind,
      value: typedValue,
      type: type,
      is_server: this.system === "Server",
      connections: encodedConnections
    });
  }

  toString() {
    return `${this.def.Identifier}(${this.index})`;
  }
}

export class Connection {
  from: Node;
  fromPin: Pin;
  to: Node;
  toPin: Pin;

  constructor(from: Node, fromPin: Pin, to: Node, toPin: Pin) {
    this.from = from;
    this.fromPin = fromPin;
    this.to = to;
    this.toPin = toPin;
  }
}

export class Comment {
  content: string;
  x: number;
  y: number;
  constructor(content: string, x: number, y: number) {
    this.content = content;
    this.x = x;
    this.y = y;
  }
  encode(): Gia.Annotation {
    return {
      content: this.content,
      x: this.x,
      y: this.y
    };
  }
}
