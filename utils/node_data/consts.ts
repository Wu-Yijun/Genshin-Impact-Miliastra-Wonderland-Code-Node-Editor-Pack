export const DATA_SCHEMA_VERSION = "2.1.0";
export const AUTHOR = "Aluria";

export const GAME_VERSION = "6.2.0";

// ====== Begin of Document Schema ====== //
interface Document {
  Version: string;              // Data & Schema version
  GameVersion: string;          // Game version
  Author: string;               // Author
  Date: string;                 // Date of generation
  Description: string;          // Description
  Schema: string;               // TypeScript type definition source code
  TypesList: TypeEntry[];       // Type list
  NodesList: NodeEntry[];       // Node list
  EnumList: EnumEntry[];        // Server enum list
  ClientEnumList: EnumEntry[];  // Client enum list
  GraphConstList: GraphConst[]; // Different node graph fixed field adoption value information
}
interface Entry {
  Name: string;               // Safe name used as object keys or query keys
  Translations: Translations; // Raw texts displayed in game
  ID: number;                 // An in-game unique id of the entry
}
interface TypeEntry extends Entry {
  ClientID: number | null;    // An in-game unique id of the any type in client 
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
  Inputs: string[];                   // List of Input parameter types of the node
  Outputs: string[];                  // List of Output parameter types of the node
  ConcreteID?: number;                // Concrete id for non-reflective nodes (different from ID in Client Graph)
  TypeMappings?: TypeMapping[];       // Type mappings is required when the node Type is Generic.
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
