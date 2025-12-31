export const DATA_SCHEMA_VERSION = "3.0.0";
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
  Types: TypeDef[];             // 类型定义 (Key: SafeName)
  Nodes: NodeDef[];             // 节点定义列表
  Enums: EnumDef[];             // 枚举定义
  // Protocol/System Consts Tables
  SystemConstants: SystemConstDef;   // 用于存放那些 Magic Numbers (如 Class=10001, RPC_Kernel=2000)
}
const Languages = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as const;
type Translations = Partial<{ [key in typeof Languages[number]]: string }>; // Display names of the entry in different languages
type PinValue = string | number | boolean | null; // number could be enum or int
// ------------------------------------------------------------------
// Type System (Enhanced)
// ------------------------------------------------------------------
interface TypeDef {
  Identifier: string;         // see node_types.ts
  ID: number;                 // Server ID
  ClientID: number | null;    // Client ID (if exists)
  InGameName: Translations;   // In-game name
  DSLName: string;            // Name of var class(type) in DSL
  BaseType: string;           // Base type of the entry in game runtime
  BaseTypeID: number;         // Id of the base type
}
interface EnumDef {
  Identifier: string;                     // FourCC
  System: "Server" | "Client";            // The applicable range of the node
  ID: number;                             // 游戏内部类型系统中使用的 ID
  InGameName: Translations;               // In-game display name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
  Items: EnumEntryDef[];                  // List of Enum items of current enum
}
interface EnumEntryDef {
  Identifier: string;                     // <FourCC>.<SafeName>
  ID: number;                             // 游戏内部类型系统中使用的 ID
  InGameName: Translations;               // In-game display name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
}
// ------------------------------------------------------------------
// Node Definition (The Shell)
// ------------------------------------------------------------------
interface NodeDef {
  Identifier: string;                     // <Domain>.<Category>.<Action>
  ID: number;                             // Node ID
  KernelID?: number;                      // Kernel ID (if exists)
  InGameName: Translations;               // In-game name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
  Type: "Fixed" | "Variant";              // Whether a node is fixed-defined or generic-defined 
  System: "Server" | "Client";            // The applicable range of the node
  Domain: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Others" | "Hidden";
  FlowPins: PinDef[];                     // List of control flow pins of the node
  DataPins: PinDef[];                     // List of data io pins of the node
  Variants?: VariantDef[]                 // Only for Variant Nodes
  Implementation?: ImplementationDef;     // Type mappings is required when the node Type is Generic.
}
// ------------------------------------------------------------------
// Pin Definition (Logical/UI)
// ------------------------------------------------------------------
interface PinDef {
  Identifier: string;                               // 每个节点内部唯一标识 (e.g., "Arg1", "FlowIn")
  Label: Translations;                              // UI 显示文本
  Placeholder: Translations;                        // Placeholder of the pin
  Direction: "In" | "Out";                          // Direction of the pin
  ShellIndex: number;                               // Outer index of the pin
  KernelIndex: number;                              // Inner index of the pin
  Type: string | null;                              // Type of the pin, could be generic type for reflective nodes
  DefaultValue?: PinValue;                          // Fixed value of the pin (For part of the hidden pin)
  Visibility: "Display" | "Hidden" | "Conditional"; // Whether the pin is displayed, hidden or conditional
  Connectability: boolean;                          // Whether the pin can be connected by another one
  Remarks?: string;                                 // Some additional information about the pin with special behavior
}
// ------------------------------------------------------------------
// Implementation & Mapping (The Kernel)
// ------------------------------------------------------------------
interface VariantDef {
  // 匹配条件: 泛型参数 -> 具体类型的映射
  Constraints: string;
  // 对应的内核 ID
  KernelID: number;
  // 变体的常量注入
  InjectedContents: InjectedDef[]; // Key 是 Pin Identifier
}
interface InjectedDef {
  PinIdentifier: string; // 引用 Inputs/Outputs 中的 Name
  TypeSelectorIndex?: number; // 可变引脚的 Selector Index (用于 UI 下拉菜单分组)
  ShellIndex?: number;   // Inner index of the pin
  KernelIndex?: number;  // Inner index of the pin
  Visibility?: "Display" | "Hidden" | "Conditional";
  Connectability?: boolean;
  DefaultValue?: PinValue;
}
type ImplementationDef = {
  Kind: "RPC";
  Messages: Partial<PinDef>[];
};
// ------------------------------------------------------------------
// System Constants (Registry)
// ------------------------------------------------------------------
interface SystemConstDef {
  GRAPH_CATEGORY_CONSTS: GraphCategoryConstsDef;
  GRAPH_ID_RANGE: Record<string, number>;
}
type GraphCategoryConstsDef = Record<string, {
  AssetsOrigin: number;
  AssetsCategory: number;
  AssetsKind: number;
  AssetsWhich: number;

  GraphOrigin: number;
  GraphCategory: number;
  GraphKind: number;

  NodeOrigin: number;
  NodeCategory: number;
  NodeKind: number;
}>;
// ====== End of Document Schema ====== //
export type { Document, Translations, NodeDef, EnumDef, EnumEntryDef, SystemConstDef };


export const GRAPH_CATEGORY_CONSTS = {
  server: {
    AssetsOrigin: 0,
    AssetsCategory: 5,
    AssetsKind: 0,
    AssetsWhich: 9,
    GraphOrigin: 10000,
    GraphCategory: 20000,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20000,
    NodeKind: 22000
  },
  status: {
    AssetsOrigin: 0,
    AssetsCategory: 5,
    AssetsKind: 0,
    AssetsWhich: 22,
    GraphOrigin: 10000,
    GraphCategory: 20003,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20000,
    NodeKind: 22000
  },
  class: {
    AssetsOrigin: 0,
    AssetsCategory: 5,
    AssetsKind: 0,
    AssetsWhich: 23,
    GraphOrigin: 10000,
    GraphCategory: 20004,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20000,
    NodeKind: 22000
  },
  item: {
    AssetsOrigin: 0,
    AssetsCategory: 5,
    AssetsKind: 0,
    AssetsWhich: 46,
    GraphOrigin: 10000,
    GraphCategory: 20005,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20000,
    NodeKind: 22000
  },
  bool: {
    AssetsOrigin: 0,
    AssetsCategory: 1,
    AssetsKind: 3,
    AssetsWhich: 10,
    GraphOrigin: 10000,
    GraphCategory: 20001,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20001,
    NodeKind: 22000
  },
  int: {
    AssetsOrigin: 0,
    AssetsCategory: 1,
    AssetsKind: 3,
    AssetsWhich: 47,
    GraphOrigin: 10000,
    GraphCategory: 20006,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20001,
    NodeKind: 22000
  },
  skill: {
    AssetsOrigin: 0,
    AssetsCategory: 1,
    AssetsKind: 3,
    AssetsWhich: 11,
    GraphOrigin: 10000,
    GraphCategory: 20002,
    GraphKind: 21001,
    NodeOrigin: 10001,
    NodeCategory: 20002,
    NodeKind: 22000
  },
  composite: {
    AssetsOrigin: 0,
    AssetsCategory: 23,
    AssetsKind: 0,
    AssetsWhich: 12,
    GraphOrigin: 10000,
    GraphCategory: 20000,
    GraphKind: 21002,
    NodeOrigin: 10001,
    NodeCategory: 20000,
    NodeKind: 22000
  }
} as const satisfies GraphCategoryConstsDef;

export const GRAPH_ID_RANGE = {
  "server": 0x4000_0000,
  "client": 0x4080_0000,
  "composite": 0x6000_0000,
} as const satisfies SystemConstDef["GRAPH_ID_RANGE"];
