// ------------------------------------------------------------------
// Core Container
// ------------------------------------------------------------------
export interface Document {
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
  EnumTypes: EnumTypeDef[];     // 枚举类型定义(枚举集合)
  // Protocol/System Consts Tables
  SystemConstants: SystemConstDef;   // 用于存放那些 Magic Numbers (如 Class=10001, RPC_Kernel=2000)
}
export const ResourceClass = [
  // server side
  "ENTITY_NODE_GRAPH",
  "STATUS_NODE_GRAPH",
  "CLASS_NODE_GRAPH",
  "ITEM_NODE_GRAPH",
  // client side
  "BOOLEAN_FILTER_GRAPH",
  "INTEGER_FILTER_GRAPH",
  "SKILL_NODE_GRAPH",
  // composite declaration
  "COMPOSITE_NODE_DECL",
] as const;
export type ServerClient = "Server" | "Client"
export type ResourceClass = typeof ResourceClass[number];
export const Languages = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as const;
export type Translations = Partial<{ [key in typeof Languages[number]]: string }>; // Display names of the entry in different languages
export type TypedValue = string | number | null | TypedValue[]; // number could be enum or int or boolean
// ------------------------------------------------------------------
// Type System (Enhanced)
// ------------------------------------------------------------------
export interface TypeDef {
  Identifier: string;         // <Category>.<Type>
  ID: number;                 // Server ID
  ClientID: number | null;    // Client ID (if exists)
  BaseType: string;           // Base type of the entry in game runtime
  BaseTypeID: number;         // Id of the base type
  DSLName: string;            // Name of var class(type) in DSL
  InGameName: Translations;   // In-game name
}
export interface EnumTypeDef {
  Identifier: string;                     // FourCC: /[ABD-Z][A-Z]{3}/ for Server, /C[A-Z]{3}/ for Client
  ID: number;                             // 游戏内部类型系统中使用的 ID (Server: 0~100, Client: 200000~200100)
  TypeID: number;                         // 游戏内部类型系统中使用的类型 ID (ID + 10000)
  System: "Server" | "Client";            // The applicable range of the node, 尽管在Server中可以使用Client的类型, 反之亦然
  Category: string;                       // 由功能与值区分的类别<Category>, 无太多实际作用
  InGameName: Translations;               // In-game display name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
  Collection: string[];                   // List of Enum items of current enum type
}
export interface EnumDef {
  Identifier: string;                     // <Category>.<Type>
  ID: number;                             // 游戏内部类型系统中使用的 ID
  Category: string;                       // 由功能与值区分的类别<Category>, 无太多实际作用
  InGameName: Translations;               // In-game display name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
}
// ------------------------------------------------------------------
// Node Definition (The Shell)
// ------------------------------------------------------------------
export interface NodeDef {
  Identifier: string;                     // <Domain>.<Category>.<Action>
  ID: number;                             // Node ID
  KernelID?: number;                      // Kernel ID (if exists)
  System: "Server" | "Client";            // The applicable range of the node
  Domain: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Others" | "Hidden";
  Type: "Fixed" | "Variant";              // Whether a node is fixed-defined or generic-defined 
  InGameName: Translations;               // In-game name
  Alias?: string[];                       // 保证游戏中的名称发生变化后仍有历史记录, 增强抗干扰能力
  FlowPins: PinDef[];                     // List of control flow pins of the node
  DataPins: PinDef[];                     // List of data io pins of the node
  Variants?: VariantDef[]                 // Only for Variant Nodes
  Implementation?: ImplementationDef;     // Type mappings is required when the node Type is Generic.
}
// ------------------------------------------------------------------
// Pin Definition (Logical/UI)
// ------------------------------------------------------------------
export interface PinDef {
  Identifier: string;                                 // 每个节点内部唯一标识 (e.g., "Arg1", "FlowIn")
  Direction: "In" | "Out";                            // Direction of the pin
  ShellIndex: number;                                 // Outer index of the pin
  KernelIndex: number;                                // Inner index of the pin
  Type?: string;                                      // Type of the pin, could be generic type for reflective nodes
  DefaultValue?: TypedValue;                          // Fixed value of the pin (For part of the hidden pin)
  Visibility?: "Display" | "Hidden" | "Conditional";  // Whether the pin is displayed, hidden or conditional
  Connectability?: boolean;                           // Whether the pin can be connected by another one
  Editability?: boolean;                              // Whether the pin can be edited by user manually
  Remarks?: string;                                   // Some additional information about the pin with special behavior
  Label: Translations;                                // UI 显示文本
  Placeholder?: Translations;                         // Placeholder of the pin
}
// ------------------------------------------------------------------
// Implementation & Mapping (The Kernel)
// ------------------------------------------------------------------
export interface VariantDef {
  // 匹配条件: 泛型参数 -> 具体类型的映射
  Constraints: string;
  // 对应的内核 ID
  KernelID: number;
  // 变体的常量注入
  InjectedContents: InjectedDef[]; // Key 是 Pin Identifier
}
export interface InjectedDef {
  Identifier: string; // 引用 Inputs/Outputs 中的 Name
  TypeSelectorIndex?: number; // 可变引脚的 Selector Index (用于 UI 下拉菜单分组)
  ShellIndex?: number;   // Inner index of the pin
  KernelIndex?: number;  // Inner index of the pin
  DefaultValue?: TypedValue;
  Visibility?: "Display" | "Hidden" | "Conditional";
  Connectability?: boolean;
}
export type ImplementationDef = {
  Kind: "RPC";
  Messages: Partial<PinDef>[];  // Signal Pins(With data)
};
// ------------------------------------------------------------------
// System Constants (Registry)
// ------------------------------------------------------------------
export interface SystemConstDef {
  GRAPH_CATEGORY_CONSTS: GraphCategoryConstsDef;
  GRAPH_ID_RANGE: Record<string, number>;
}
export type GraphCategoryConstsDef = Record<ResourceClass, {
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
