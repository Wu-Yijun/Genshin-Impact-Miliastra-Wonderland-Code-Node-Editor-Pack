// ------------------------------------------------------------------
// Core Container
// ------------------------------------------------------------------

/**
 * Document interface - 节点数据文档的根容器
 * 
 * 包含所有节点、类型、枚举的完整定义数据。这是整个节点数据系统的核心数据结构，
 * 通常从 `data.json` 或 `instances.ts` 加载。
 * 
 * @example
 * ```typescript
 * import doc from "./data.json" with { type: "json" };
 * 
 * // 访问文档数据
 * console.log(doc.Version);        // 数据版本
 * console.log(doc.GameVersion);    // 游戏版本
 * console.log(doc.Nodes.length);   // 节点总数
 * console.log(doc.Types.length);   // 类型总数
 * ```
 * @example
 * ```typescript
 * import { Doc } from "./instances.ts";
 * 
 * // 访问文档数据
 * console.log(Doc.doc.Version);        // 数据版本
 * console.log(Doc.doc.GameVersion);    // 游戏版本
 * console.log(Doc.doc.Nodes.length);   // 节点总数
 * console.log(Doc.doc.Types.length);   // 类型总数
 * ```
 */
export interface Document {
  // ===== 头部字段 =====

  /** 数据与架构版本号 */
  Version: string;

  /** 游戏版本号（如 "5.3.0"） */
  GameVersion: string;

  /** 数据作者 */
  Author: string;

  /** 数据生成日期 */
  Date: string;

  /** 文档描述 */
  Description: string;

  /** TypeScript 类型定义源代码（本文件的内容） */
  Schema: string;

  // ===== 核心数据 =====

  /** 类型定义列表（基础类型、列表、字典等） */
  Types: TypeDef[];

  /** 节点定义列表（所有可用节点） */
  Nodes: NodeDef[];

  /** 枚举值定义列表（枚举项） */
  Enums: EnumDef[];

  /** 枚举类型定义列表（枚举集合） */
  EnumTypes: EnumTypeDef[];

  // ===== 系统常量表 =====

  /** 系统常量定义（Magic Numbers，如资源类别、ID 范围等） */
  SystemConstants: SystemConstDef;
}

/**
 * ResourceClass - 资源类别常量
 * 
 * 定义所有可用的节点图系统类型。
 */
export const ResourceClass = [
  // 服务端节点图
  "ENTITY_NODE_GRAPH",      // 实体节点图
  "STATUS_NODE_GRAPH",      // 状态节点图
  "CLASS_NODE_GRAPH",       // 类节点图
  "ITEM_NODE_GRAPH",        // 物品节点图

  // 客户端节点图
  "BOOLEAN_FILTER_GRAPH",   // 布尔过滤器图
  "INTEGER_FILTER_GRAPH",   // 整数过滤器图
  "SKILL_NODE_GRAPH",       // 技能节点图

  // 复合声明
  "COMPOSITE_NODE_DECL",    // 复合节点声明
] as const;

/**
 * ServerClient type - 服务端/客户端标识
 * 
 * 用于区分节点或类型属于服务端还是客户端。
 */
export type ServerClient = "Server" | "Client"

/**
 * ResourceClass type - 资源类别类型
 * 
 * 从 ResourceClass 常量数组派生的联合类型。
 */
export type ResourceClass = typeof ResourceClass[number];

/**
 * Languages - 支持的语言列表
 * 
 * 定义所有支持的本地化语言代码。
 */
export const Languages = [
  "cs",      // 捷克语
  "de",      // 德语
  "es",      // 西班牙语
  "en",      // 英语
  "fr",      // 法语
  "it",      // 意大利语
  "ja",      // 日语
  "ko",      // 韩语
  "pl",      // 波兰语
  "pt-BR",   // 巴西葡萄牙语
  "ru",      // 俄语
  "tr",      // 土耳其语
  "zh-Hans", // 简体中文
  "zh-Hant"  // 繁体中文
] as const;

/**
 * Translations type - 多语言翻译映射
 * 
 * 用于存储条目在不同语言中的显示名称。
 * 
 * @example
 * ```typescript
 * const translations: Translations = {
 *   en: "Integer",
 *   "zh-Hans": "整数",
 *   ja: "整数"
 * };
 * ```
 */
export type Translations = Partial<{ [key in typeof Languages[number]]: string }>;

/**
 * TypedValue type - 类型化值
 * 
 * 表示节点引脚可以接受的值类型。支持基础类型、嵌套数组等。
 * 
 * @example
 * ```typescript
 * const intValue: TypedValue = 42;
 * const stringValue: TypedValue = "Hello";
 * const listValue: TypedValue = [1, 2, 3];
 * const nestedValue: TypedValue = [[1, 2], [3, 4]];
 * const nullValue: TypedValue = null;
 * ```
 */
export type TypedValue = string | number | null | TypedValue[];

// ------------------------------------------------------------------
// Type System (Enhanced)
// ------------------------------------------------------------------

/**
 * TypeDef interface - 类型定义
 * 
 * 定义节点图中可用的数据类型（如 Int, Float, String, List<Int> 等）。
 * 
 * @example
 * ```typescript
 * const intType: TypeDef = {
 *   Identifier: "Primitive.Integer",
 *   ID: 3,
 *   ClientID: 3,
 *   BaseType: "IntBase",
 *   BaseTypeID: 2,
 *   DSLName: "Int",
 *   InGameName: { en: "Integer", "zh-Hans": "整数" }
 * };
 * ```
 */
export interface TypeDef {
  /** 类型标识符，格式：<Category>.<Type> */
  Identifier: string;

  /** 服务端类型 ID */
  ID: number;

  /** 客户端类型 ID（如果存在），null 表示仅服务端可用 */
  ClientID: number | null;

  /** 游戏运行时的基础类型名称 */
  BaseType: string;

  /** 基础类型的 ID */
  BaseTypeID: number;

  /** DSL 中的类型名称（如 "Int", "Str", "L<Int>"） */
  DSLName: string;

  /** 游戏内显示名称（多语言） */
  InGameName: Translations;
}

/**
 * EnumTypeDef interface - 枚举类型定义
 * 
 * 定义一个枚举类型（枚举集合），包含多个枚举值。
 * 
 * @example
 * ```typescript
 * const comparisonOp: EnumTypeDef = {
 *   Identifier: "ABCD",
 *   ID: 0,
 *   TypeID: 10000,
 *   System: "Server",
 *   Category: "Comparison",
 *   InGameName: { en: "Comparison Operators" },
 *   Collection: ["Comparison.EqualTo", "Comparison.NotEqualTo"]
 * };
 * ```
 */
export interface EnumTypeDef {
  /** 
   * 四字符标识符（FourCC）
   * - 服务端：/[ABD-Z][A-Z]{3}/
   * - 客户端：/C[A-Z]{3}/
   */
  Identifier: string;

  /** 游戏内部类型系统中使用的 ID（Server: 0~100, Client: 200000~200100） */
  ID: number;

  /** 游戏内部类型系统中使用的类型 ID（ID + 10000） */
  TypeID: number;

  /** 适用范围（尽管在 Server 中可以使用 Client 的类型，反之亦然） */
  System: "Server" | "Client";

  /** 由功能与值区分的类别，无太多实际作用 */
  Category: string;

  /** 游戏内显示名称（多语言） */
  InGameName: Translations;

  /** 别名列表，保证游戏中的名称发生变化后仍有历史记录，增强抗干扰能力 */
  Alias?: string[];

  /** 当前枚举类型包含的枚举项列表（Identifier 列表） */
  Collection: string[];
}

/**
 * EnumDef interface - 枚举值定义
 * 
 * 定义单个枚举值（枚举项）。
 * 
 * @example
 * ```typescript
 * const equalTo: EnumDef = {
 *   Identifier: "Comparison.EqualTo",
 *   ID: 100,
 *   Category: "Comparison",
 *   InGameName: { en: "Equal To", "zh-Hans": "等于" }
 * };
 * ```
 */
export interface EnumDef {
  /** 枚举值标识符，格式：`<Category>.<Type>` */
  Identifier: string;

  /** 游戏内部类型系统中使用的 ID */
  ID: number;

  /** 由功能与值区分的类别，无太多实际作用 */
  Category: string;

  /** 游戏内显示名称（多语言） */
  InGameName: Translations;

  /** 别名列表，保证游戏中的名称发生变化后仍有历史记录，增强抗干扰能力 */
  Alias?: string[];
}

// ------------------------------------------------------------------
// Node Definition (The Shell)
// ------------------------------------------------------------------

/**
 * NodeDef interface - 节点定义（外壳）
 * 
 * 定义一个节点的完整信息，包括引脚、类型、变体等。
 * 
 * @example
 * ```typescript
 * const branchNode: NodeDef = {
 *   Identifier: "Control.General.Branch",
 *   ID: 2,
 *   System: "Server",
 *   Domain: "Control",
 *   Type: "Fixed",
 *   InGameName: { en: "Branch" },
 *   Description: { en: "Conditional branch" },
 *   FlowPins: [...],
 *   DataPins: [...]
 * };
 * ```
 */
export interface NodeDef {
  /** 节点标识符，格式：<Domain>.<Category>.<Action> */
  Identifier: string;

  /** 节点 ID（Shell ID） */
  ID: number;

  /** 内核 ID（如果存在） */
  KernelID?: number;

  /** 节点的适用范围 */
  System: "Server" | "Client";

  /** 节点的功能域 */
  Domain: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Others" | "Hidden";

  /** 
   * 节点类型
   * - Fixed: 固定类型节点（所有引脚类型固定）
   * - Variant: 可变类型节点（部分引脚类型可变）
   */
  Type: "Fixed" | "Variant";

  /** 游戏内显示名称（多语言） */
  InGameName: Translations;

  /** 别名列表，保证游戏中的名称发生变化后仍有历史记录 */
  Alias?: string[];

  /** 节点描述（多语言） */
  Description: Translations;

  /** 控制流引脚列表 */
  FlowPins: PinDef[];

  /** 数据引脚列表 */
  DataPins: PinDef[];

  /** 变体定义列表（仅用于 Variant 节点） */
  Variants?: VariantDef[]

  /** 实现定义（用于特殊节点，如 RPC 节点） */
  Implementation?: ImplementationDef;
}

// ------------------------------------------------------------------
// Pin Definition (Logical/UI)
// ------------------------------------------------------------------

/**
 * PinDef interface - 引脚定义（逻辑/UI）
 * 
 * 定义节点的单个引脚，包括类型、方向、可见性等属性。
 * 
 * @example
 * ```typescript
 * const inputPin: PinDef = {
 *   Identifier: "value",
 *   Direction: "In",
 *   ShellIndex: 0,
 *   KernelIndex: 0,
 *   Type: "Int",
 *   DefaultValue: 0,
 *   Visibility: "Display",
 *   Connectability: true,
 *   Editability: true,
 *   Label: { en: "Value" },
 *   Description: { en: "Input value" }
 * };
 * ```
 */
export interface PinDef {
  /** 引脚标识符，每个节点内部唯一（如 "Arg1", "FlowIn"） */
  Identifier: string;

  /** 引脚方向 */
  Direction: "In" | "Out";

  /** 外部索引（Shell Index） */
  ShellIndex: number;

  /** 内部索引（Kernel Index） */
  KernelIndex: number;

  /** 引脚类型，对于反射型节点可以是泛型类型（如 "R<T>"） */
  Type?: string;

  /** 默认值（用于部分隐藏引脚的固定值） */
  DefaultValue?: TypedValue;

  /** 
   * 可见性
   * - Display: 显示
   * - Hidden: 隐藏
   * - Conditional: 条件显示
   */
  Visibility?: "Display" | "Hidden" | "Conditional";

  /** 是否可以被其他引脚连接 */
  Connectability?: boolean;

  /** 是否可以被用户手动编辑 */
  Editability?: boolean;

  /** 关于具有特殊行为的引脚的附加信息 */
  Remarks?: string;

  /** UI 显示文本（多语言） */
  Label: Translations;

  /** 文档描述（多语言） */
  Description: Translations;

  /** 占位符文本（多语言） */
  Placeholder?: Translations;
}

// ------------------------------------------------------------------
// Implementation & Mapping (The Kernel)
// ------------------------------------------------------------------

/**
 * VariantDef interface - 变体定义
 * 
 * 定义可变类型节点的一个具体变体，包括类型约束和注入内容。
 * 
 * @example
 * ```typescript
 * const intVariant: VariantDef = {
 *   Constraints: "C<T:Int>",
 *   KernelID: 370,
 *   InjectedContents: [
 *     {
 *       Identifier: "input1",
 *       TypeSelectorIndex: 5,
 *       ShellIndex: 0,
 *       KernelIndex: 0
 *     }
 *   ]
 * };
 * ```
 */
export interface VariantDef {
  /** 
   * 匹配条件：泛型参数 -> 具体类型的映射
   * 格式：C<T:Type> 或 C<K:Type1,V:Type2>
   */
  Constraints: string;

  /** 对应的内核 ID */
  KernelID: number;

  /** 变体的常量注入列表 */
  InjectedContents: InjectedDef[];
}

/**
 * InjectedDef interface - 注入定义
 * 
 * 定义变体中需要注入或覆盖的引脚属性。
 * 
 * @example
 * ```typescript
 * const injection: InjectedDef = {
 *   Identifier: "input1",
 *   TypeSelectorIndex: 5,
 *   ShellIndex: 0,
 *   KernelIndex: 0,
 *   DefaultValue: 0,
 *   Visibility: "Display",
 *   Connectability: true
 * };
 * ```
 */
export interface InjectedDef {
  /** 引用 Inputs/Outputs 中的引脚标识符 */
  Identifier: string;

  /** 可变引脚的选择器索引（用于 UI 下拉菜单分组） */
  TypeSelectorIndex?: number;

  /** 外部索引（Shell Index） */
  ShellIndex?: number;

  /** 内部索引（Kernel Index） */
  KernelIndex?: number;

  /** 默认值 */
  DefaultValue?: TypedValue;

  /** 可见性 */
  Visibility?: "Display" | "Hidden" | "Conditional";

  /** 是否可连接 */
  Connectability?: boolean;
}

/**
 * ImplementationDef type - 实现定义
 * 
 * 定义特殊节点的实现方式（目前仅支持 RPC）。
 * 
 * @example
 * ```typescript
 * const rpcImpl: ImplementationDef = {
 *   Kind: "RPC",
 *   Messages: [
 *     {
 *       Identifier: "request",
 *       Direction: "Out",
 *       Type: "RequestMessage"
 *     }
 *   ]
 * };
 * ```
 */
export type ImplementationDef = {
  /** 实现类型 */
  Kind: "RPC";

  /** 信号引脚列表（带数据） */
  Messages: Partial<PinDef>[];
};

// ------------------------------------------------------------------
// System Constants (Registry)
// ------------------------------------------------------------------

/**
 * SystemConstDef interface - 系统常量定义
 * 
 * 存储系统级别的魔法数字和常量配置。
 * 
 * @example
 * ```typescript
 * const sysConst: SystemConstDef = {
 *   GRAPH_CATEGORY_CONSTS: {
 *     ENTITY_NODE_GRAPH: {
 *       AssetsOrigin: 1,
 *       AssetsCategory: 10001,
 *       // ...
 *     }
 *   },
 *   GRAPH_ID_RANGE: {
 *     Server: 1000,
 *     Client: 2000
 *   }
 * };
 * ```
 */
export interface SystemConstDef {
  /** 图类别常量定义 */
  GRAPH_CATEGORY_CONSTS: GraphCategoryConstsDef;

  /** 图 ID 范围定义 */
  GRAPH_ID_RANGE: Record<string, number>;
}

/**
 * GraphCategoryConstsDef type - 图类别常量定义
 * 
 * 为每种资源类别定义相关的常量值（Protobuf 枚举值）。
 * 
 * @example
 * ```typescript
 * const entityConsts = {
 *   AssetsOrigin: 1,
 *   AssetsCategory: 10001,
 *   AssetsKind: 1,
 *   AssetsWhich: 1,
 *   GraphOrigin: 1,
 *   GraphCategory: 10001,
 *   GraphKind: 2,
 *   NodeOrigin: 1,
 *   NodeCategory: 10001,
 *   NodeKind: 3
 * };
 * ```
 */
export type GraphCategoryConstsDef = Record<ResourceClass, {
  /** 资产来源 */
  AssetsOrigin: number;

  /** 资产类别 */
  AssetsCategory: number;

  /** 资产种类 */
  AssetsKind: number;

  /** 资产标识 */
  AssetsWhich: number;

  /** 图来源 */
  GraphOrigin: number;

  /** 图类别 */
  GraphCategory: number;

  /** 图种类 */
  GraphKind: number;

  /** 节点来源 */
  NodeOrigin: number;

  /** 节点类别 */
  NodeCategory: number;

  /** 节点种类 */
  NodeKind: number;
}>;

// ====== End of Document Schema ====== //