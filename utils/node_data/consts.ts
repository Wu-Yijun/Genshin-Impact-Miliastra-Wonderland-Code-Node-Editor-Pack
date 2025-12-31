export const DATA_SCHEMA_VERSION = "2.1.0";
export const AUTHOR = "Aluria";

export const GAME_VERSION = "6.2.0";

// ====== Begin of Document Schema ====== //
// ------------------------------------------------------------------
// Core Container
// ------------------------------------------------------------------
interface Document {
  // Header fields
  Version: string;              // Data & Schema version
  GameVersion: string;          // Game version
  Author: string;               // Author
  Date: string;                 // Date of generation
  Description: string;          // Description
  Schema: string;               // TypeScript type definition source code
  // Core Data
  Types: Record<string, TypeDef>;       // 类型定义 (Key: SafeName)
  Nodes: NodeDef[];                     // 节点定义列表
  Enums: Record<string, EnumDef>;       // 枚举定义
  // Protocol/System Consts Tables
  SystemConstants: SystemConstDef;   // 用于存放那些 Magic Numbers (如 Class=10001, RPC_Kernel=2000)
}

// ------------------------------------------------------------------
// Type System (Enhanced)
// ------------------------------------------------------------------
interface TypeDef {
  Name: string;
  ID: number;                 // Server ID
  ClientID: number|null;      // Client ID (if exists)
  Expression: string;         // Static representation expression for convertor
  DSLName: string;            // Name of var class(type) in DSL
  BaseType: string;           // Base type of the entry in game runtime
  BaseTypeID: number;         // Id of the base type
}
interface NodeEntry extends Entry {
  Type: "Simple" | "Generic";         // Whether a node is fixed-defined or generic-defined 
  Range: "Server" | "Client";         // The applicable range of the node
  Class: typeof NodeClasses[number];  // The class of the node
  Family: string;                     // Family(sub-class) of the node
  Flows: FlowEntry[];                 // List of control flow pins of the node
  Pins: PinEntry[];                   // List of data io pins of the node
  ConcreteID?: number;                // Concrete id for non-reflective nodes (different from ID in Client Graph)
  TypeMappings?: TypeMapping[];       // Type mappings is required when the node Type is Generic.
}
interface PinBase {
  Kind: string;                                     // The kind of the pin
  Index: number;                                    // Index of the pin on each side
  ConcreteIndex: number;                            // Inner index of the pin
  Label: Translations;                              // Display name of the pin (Always be "" for most flows)
  Visibility: "Display" | "Hidden" | "Conditional"; // Whether the pin is displayed, hidden or conditional
  Remarks?: string                                  // Some additional information about the pin with special behavior
}
interface FlowEntry extends PinBase {
  Kind: "FlowIn" | "FlowOut";                       // At Input or Output side
}
interface PinEntry extends PinBase {
  Kind: "Input" | "Output" | "ClientSpecialInput";  // I'm unsure what ClientSpecialInput is
  Placeholder: Translations;                        // Placeholder of the pin
  Type: string;                                     // Type of the pin, could be generic type for reflective nodes
  FixedVal?: PinValue;                              // Fixed value of the pin (For part of the hidden pin)
  Connectable: boolean;                             // Whether the pin can be connected to another
  IndexOfConcrete?: number;                         // For reflective nodes, the index of the pin for concrete type
}
interface EnumEntry extends Entry {
  Items: EnumItem[];  // List of Enum items of current enum
}
interface TypeMapping {
  ConcreteId: number;                         // Id of this concrete type
  Type: string;                               // Type mapping rules of this concrete type
  InputsIndexOfConcrete: (number | null)[];   // List of Input parameters' index of concrete
  OutputsIndexOfConcrete: (number | null)[];  // List of Output parameters' index of concrete
}
interface EnumItem extends Entry {
}
interface GraphConst {
  Name: string;        // Name of each graph type (used to identify inside gia_gen interface)
  Class: number;       // Root.graph.id.class
  Type: number;        // Root.graph.id.type
  Which: number;       // Root.graph.which --> Also used to identify the graph type
  GraphClass: number;  // Graph.id.class
  GraphType: number;   // Graph.id.type
  GraphKind: number;   // Graph.id.kind
  NodeClass: number;   // Node.(genericId|concreteId).class
  NodeType: number;    // Node.(genericId|concreteId).type
  NodeKind: number;    // Node.genericId.kind (The Node.concreteId.kind is always SysCall(22000))
}
type PinValue = string | number | boolean | null; // number could be enum or int
const NodeClasses = ["Execution", "Trigger", "Control", "Query", "Arithmetic", "Others", "Hidden"] as const;
const Language = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as const;
type Translations = Partial<{ [key in typeof Language[number]]: string }>; // Display names of the entry in different languages
// ====== End of Document Schema ====== //
export { NodeClasses, Language };
export type { Document, Entry, TypeEntry, NodeEntry, EnumEntry, TypeMapping, EnumItem, Translations };

interface GraphConstStrict extends GraphConst {
  Name: typeof GRAPH_CONSTS[number]["Name"];
  Class: typeof GRAPH_CONSTS[number]["Class"];
  Type: typeof GRAPH_CONSTS[number]["Type"];
  Which: typeof GRAPH_CONSTS[number]["Which"];
  GraphClass: typeof GRAPH_CONSTS[number]["GraphClass"];
  GraphType: typeof GRAPH_CONSTS[number]["GraphType"];
  GraphKind: typeof GRAPH_CONSTS[number]["GraphKind"];
  NodeClass: typeof GRAPH_CONSTS[number]["NodeClass"];
  NodeType: typeof GRAPH_CONSTS[number]["NodeType"];
  NodeKind: typeof GRAPH_CONSTS[number]["NodeKind"];
};
export type { GraphConstStrict as GraphConst };

export const GRAPH_CONSTS = [
  {
    "Name": "server",
    "Class": 5,
    "Type": 0,
    "Which": 9,
    "GraphClass": 10000,
    "GraphType": 20000,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "status",
    "Class": 5,
    "Type": 0,
    "Which": 22,
    "GraphClass": 10000,
    "GraphType": 20003,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "class",
    "Class": 5,
    "Type": 0,
    "Which": 23,
    "GraphClass": 10000,
    "GraphType": 20004,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "item",
    "Class": 5,
    "Type": 0,
    "Which": 46,
    "GraphClass": 10000,
    "GraphType": 20005,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "bool",
    "Class": 1,
    "Type": 3,
    "Which": 10,
    "GraphClass": 10000,
    "GraphType": 20001,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20001,
    "NodeKind": 22000
  },
  {
    "Name": "int",
    "Class": 1,
    "Type": 3,
    "Which": 47,
    "GraphClass": 10000,
    "GraphType": 20006,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20001,
    "NodeKind": 22000
  },
  {
    "Name": "skill",
    "Class": 1,
    "Type": 3,
    "Which": 11,
    "GraphClass": 10000,
    "GraphType": 20002,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20002,
    "NodeKind": 22000
  },
  {
    "Name": "composite",
    "Class": 23,
    "Type": 0,
    "Which": 12,
    "GraphClass": 10000,
    "GraphType": 20000,
    "GraphKind": 21002,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  }
] as const satisfies GraphConst[];

export const GRAPH_ID_RANGE = {
  "server": 0x4000_0000,
  "client": 0x4080_0000,
  "composite": 0x6000_0000,
} as const;
