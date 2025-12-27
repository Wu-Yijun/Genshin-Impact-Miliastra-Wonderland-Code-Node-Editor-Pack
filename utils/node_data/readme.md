# 节点数据与定义 (`node_data`)

本目录包含转换器所需的全部**静态定义**和资源数据。这些数据主要用于节点图的解析、类型推断和反射机制。

**✅ 已完成服务端与客户端节点图数据的完整解析与整合**

资源通过 `index.ts` 统一导出,部分原始定义文件在发布时可能会被剔除。

---

## 文件说明

| 文件 | 说明 | 大小 |
| :--- | :--- | :--- |
| [`index.yaml`](./index.yaml) / [`index.json`](./index.json) | 完整数据汇总 | ~1MB |
| [`data.ts`](./data.ts) | 完整数据汇总(有类型定义版本) | ~1MB |
| [`node_id.ts`](./node_id.ts) | 节点 ID 映射表 | ~220KB |
| [`node_pin_records.ts`](./node_pin_records.ts) | 节点引脚定义记录 | ~190KB |
| [`enum_id.ts`](./enum_id.ts) | 枚举 ID 与值定义 | ~15KB |
| [`types_list.ts`](./types_list.ts) | 变量类型定义列表 | ~8KB |
| [`concrete_map.ts`](./concrete_map.ts) | 泛型节点类型映射表 | ~11KB |
| [`helpers.ts`](./helpers.ts) | 辅助函数库 | ~6KB |
| [`index.ts`](./index.ts) | 统一导出 | ~1KB |

---

## 核心资源

### [index.yaml](./index.yaml) / [index.json](./index.json) / [data.ts](./data.ts)

**完整数据汇总**

这三个文件包含完全相同的数据内容,以不同格式提供:
- `index.yaml` - YAML 格式,适合人类阅读和外部工具处理
- `index.json` - JSON 格式,适合程序直接解析
- `data.ts` - TypeScript 格式,带有完整类型定义,适合项目内部使用

#### 文档结构

```typescript
interface Document {
  Version: string;              // 数据版本号
  Author: string;               // 作者
  Date: string;                 // 生成日期
  Description: string;          // 文档描述
  Schema: string;               // TypeScript 类型定义源码
  TypesList: TypeEntry[];       // 类型列表
  NodesList: NodeEntry[];       // 节点列表
  EnumList: EnumEntry[];        // 服务端枚举列表
  ClientEnumList: EnumEntry[];  // 客户端枚举列表
}
```

#### 1. TypesList - 类型列表

包含所有变量类型的完整定义 (28 种类型):

```typescript
interface TypeEntry {
  Name: string;               // 安全名称 (如 "Print_String", "_3D_Vector_Addition")
  Translations: {             // 多语言显示名称
    en: string;               // 英文名称
    // ... 其他语言
  };
  ID: number;                 // 服务端类型 ID (VarType 枚举值)
  ClientID: number | null;    // 客户端类型 ID (null 表示仅服务端, 客户端无此类型)
  Expression: string;         // 类型表达式 (如 "Int", "L<Ety>", "D<Key,Value>")
  DSLName: string;            // DSL 中的类型名称
  BaseType: string;           // 运行时基础类型
  BaseTypeID: number;         // 基础类型 ID
}
```

**示例**:
```yaml
- Name: Integer
  Translations:
    en: Integer
  ID: 3
  ClientID: 3
  Expression: Int
  DSLName: Int
  BaseType: IntBase
  BaseTypeID: 2
```

#### 2. NodesList - 节点列表

包含所有节点的完整定义 (服务端 434(3077) 个 + 客户端 124(175) 个):

```typescript
interface NodeEntry {
  Name: string;                       // 安全名称 (如 "Print_String")
  Translations: { en: string };       // 多语言显示名称
  ID: number;                         // 泛型节点 ID
  Type: "Simple" | "Generic";         // 节点类型
  Range: "Server" | "Client";         // 适用范围
  Class: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Others" | "Hidden";
  Family: string;                     // 节点族 (子分类)
  Inputs: string[];                   // 输入引脚类型列表
  Outputs: string[];                  // 输出引脚类型列表
  ConcreteID?: number;                // 客户端非反射节点的具体 ID
  TypeMappings?: TypeMapping[];       // 泛型节点的类型映射
}

interface TypeMapping {
  ConcreteId: number;                       // 具体类型 ID
  Type: string;                             // 类型映射规则 (如 "S<T:Int>")
  InputsIndexOfConcrete: (number | null)[]; // 输入引脚的类型索引, 非反射引脚为 null
  OutputsIndexOfConcrete: (number | null)[]; // 输出引脚的类型索引, 非反射引脚为 null
}
```

**简单节点示例**:
```yaml
- Name: Print_String
  ID: 1
  Type: Simple
  Range: Server
  Class: Execution
  Family: I. Common Nodes
  Inputs: ["Str"]
  Outputs: []
```

**泛型节点示例**:
```yaml
- Name: Equal
  ID: 14
  Type: Generic
  Range: Server
  Class: Arithmetic
  Family: General
  Inputs: ["R<T>", "R<T>"]  # R<T> 表示反射类型
  Outputs: ["Bol"]
  TypeMappings:
    - ConcreteId: 14
      Type: S<T:Str>
      InputsIndexOfConcrete: [0, 0]  # 两个输入都使用索引 0 的类型
      OutputsIndexOfConcrete: [null] # 输出不是反射类型
    - ConcreteId: 370
      Type: S<T:Int>
      InputsIndexOfConcrete: [5, 5]
      OutputsIndexOfConcrete: [null]
```

#### 3. EnumList - 服务端枚举列表

包含所有服务端枚举类型及其值:

```typescript
interface EnumEntry {
  Name: string;                 // 枚举名称
  Translations: { en: string }; // 多语言显示名称
  ID: number;                   // 枚举 ID
  Items: EnumItem[];            // 枚举项列表
}

interface EnumItem {
  Name: string;                 // 枚举项名称
  Translations: { en: string }; // 多语言显示名称
  ID: number;                   // 枚举项值
}
```

**示例**:
```yaml
- Name: Comparison_Operators
  ID: 1
  Items:
    - Name: Equal_To
      Translations:
        en: Equal To
      ID: 100
    - Name: Less_Than
      Translations:
        en: Less Than
      ID: 101
```

#### 4. ClientEnumList - 客户端枚举列表

结构与 `EnumList` 相同,但包含客户端特有的枚举定义。客户端枚举的 `ID` 字段表示 `indexOfConcrete`,用于类型映射。

#### 引脚类型表达式说明

在 `Inputs` 和 `Outputs` 中使用的类型表达式:

| 表达式 | 含义 | 示例 |
| :--- | :--- | :--- |
| `Int`, `Str`, `Bol` 等 | 具体类型 | `Int` = 整数 |
| `L<T>` | 列表类型 | `L<Int>` = 整数列表 |
| `D<K,V>` | 字典类型 | `D<Int,Str>` = 整数到字符串的字典 |
| `E<N>` | 枚举类型 | `E<1>` = ID 为 1 的枚举 |
| `S<T:Type>` | 结构体类型 | `S<T:Int>` = 包含整数的结构体 |
| `R<T>` | 反射类型 | 表示该引脚类型由泛型参数决定 |

#### 数据用途

- **外部工具**: 使用 `index.yaml` 或 `index.json` 进行节点图分析、文档生成等
- **项目内部**: 使用 `data.ts` 获得类型安全的数据访问
- **完整性**: 包含所有节点、类型、枚举的完整信息,无需查询多个文件

### [node_pin_records.ts](./node_pin_records.ts)

**节点引脚定义记录**

包含所有**反射型节点**（Reflective Nodes）及普通节点的详细定义。

```typescript
interface SingleNodeData {
  id: number;           // 泛型节点 ID
  name: string;         // 节点名称
  inputs: NodePin[];    // 输入引脚列表
  outputs: NodePin[];   // 输出引脚列表
  reflectMap?: [number, number[]][]; // 具体 ID 到类型的映射
}
```

### [node_id.ts](./node_id.ts)

**节点 ID 映射表（服务端 + 客户端）**

提供节点名称到节点 ID 的完整映射,包含**服务端节点**和**客户端节点**两套完整数据。

#### 服务端节点 ID (`NODE_ID`)

服务端节点使用**数字 ID**,范围从 `1` 到 `3877`。

```typescript
export const NODE_ID = {
  When_Entity_Is_Created: 1,
  Log_Message: 2,
  Add_Int: 100,
  Add_Float: 101,
  Add__Generic: 99, // 泛型节点
  // ... 共 3877 个节点
} as const satisfies { [key: string]: number };
```

#### 客户端节点 ID (`CLIENT_NODE_ID`)

客户端节点使用**字符串 ID**,范围从 `200000` 开始。客户端节点 ID 有**三种结构**:

##### 1. 普通节点 (Non-Generic)

格式: `"{GenericId}"`

```typescript
Logical_AND_Operation: '200001',
Logical_OR_Operation: '200002',
Node_Graph_Begins: '200042',
```

##### 2. 泛型节点 (Generic)

- **非反射型节点**: `"{GenericId} {ConcreteId}"`
- **反射型节点**: `"{GenericId}"`

```typescript
// 非反射型泛型节点
Logical_AND_Operation__Generic: '200001 1',
Equal__Generic: '200006',

// 反射型泛型节点
Node_Graph_End_Boolean__Generic: '200000 0',
Query_Entity_by_GUID__Generic: '200023 1001',
```

##### 3. 具体类型节点 (Concrete with Type)

格式: `"{GenericId} {ConcreteId} {TypeName}"`

类型名称使用简化表达式,例如:
- `S<T:Int>` - 单一类型 Int
- `S<T:Flt>` - 单一类型 Float
- `S<T:L<Int>>` - 列表类型 List<Int>
- `S<K:Int,V:Flt>` - 键值对类型
- `S<T:E<0>>` - 枚举类型,索引为 0

```typescript
Equal__Bool: '200006 11 S<T:Bol>',
Equal__Int: '200006 12 S<T:Int>',
Equal__Float: '200006 13 S<T:Flt>',
Get_Custom_Variable__List_Int: '200016 47 S<T:L<Int>>',
Data_Type_Conversion__Int_Bool: '200022 130 S<K:Int,V:Bol>',
Enumeration_Match__Comparison_Operators: '200005 10 S<T:E<0>>',
```

#### 服务端与客户端 ID 的关键区别

| 特性 | 服务端 (`NODE_ID`) | 客户端 (`CLIENT_NODE_ID`) |
| :--- | :--- | :--- |
| **ID 类型** | `number` | `string` |
| **ID 范围** | `1` ~ `3877` | `200000` ~ `200124+` |
| **节点总数** | 3877 个 | 407 个 |
| **ID 结构** | 单一数字 | 1-3 部分字符串 |
| **类型信息** | 不包含 | 包含类型表达式 |
| **用途** | 服务端节点图 | 客户端节点图 |

### [enum_id.ts](./enum_id.ts)

**枚举 ID 与值定义**

```typescript
export const ENUM_ID = {
  Comparison_Operators: 1,
  Rounding_Mode: 2,
  // ...
} as const;

export const ENUM_VALUE = {
  ComparisonOperators_EqualTo: 0,
  ComparisonOperators_NotEqualTo: 1,
  // ...
} as const;
```

### [types_list.ts](./types_list.ts)

**变量类型定义列表**

定义系统中所有可用的变量类型及其属性。

```typescript
interface TypeDef {
  id: number;      // VarType 枚举值
  name: string;    // 内部名称
  display: string; // 显示名称
  expr: string;    // 表达式 (如 "L<Int>")
  dsl: string;     // DSL 名称
}
```

### [concrete_map.ts](./concrete_map.ts)

**泛型节点类型映射表**

定义泛型节点引脚在不同类型选择下的索引顺序。

```typescript
interface ConcreteMap {
  maps: number[][];  // 类型 ID 列表
  pins: Map<string, number>; // "nodeId:pinType:pinIndex" → mapIndex
}
```

---

## 辅助函数 (`helpers.ts`)

### 类型映射函数

| 函数 | 说明 |
| :--- | :--- |
| `get_index_of_concrete(generic_id, is_input, pin_index, type)` | 获取泛型引脚的具体类型索引 |
| `get_concrete_type(generic_id, is_input, pin_index, index)` | 根据索引获取具体类型 |
| `get_concrete_map(generic_id, is_input, pin_index)` | 获取引脚的类型映射表 |
| `is_concrete_pin(generic_id, is_input, pin_index)` | 判断是否为反射引脚 |

### 节点记录函数

| 函数 | 说明 |
| :--- | :--- |
| `get_node_record(concrete_id)` | 根据具体 ID 获取节点记录 |
| `get_node_record_generic(generic_id)` | 根据泛型 ID 获取节点记录 |
| `get_generic_id(concrete_id)` | 将具体 ID 转换为泛型 ID |
| `is_generic_id(id)` | 判断是否为有效泛型 ID |

### 节点名称查询函数

#### 服务端节点

| 函数 | 说明 |
| :--- | :--- |
| `get_server_node_name_from_cid(cid: number)` | 根据服务端具体 ID 获取节点名称 |
| `get_server_node_name_from_gid(gid: number)` | 根据服务端泛型 ID 获取节点名称 |

#### 客户端节点

| 函数 | 说明 |
| :--- | :--- |
| `get_client_node_name_from_cid(cid: string)` | 根据客户端具体 ID 获取节点名称 |
| `get_client_node_name_from_gid(gid: number)` | 根据客户端泛型 ID 获取节点名称 |

#### 通用函数

| 函数 | 说明 |
| :--- | :--- |
| `get_node_name_from_cid(id: number \| string)` | 自动识别服务端/客户端,根据具体 ID 获取节点名称 |
| `get_node_name_from_gid(id: number)` | 自动识别服务端/客户端,根据泛型 ID 获取节点名称 |

---

## 使用示例

### 查询服务端节点信息

```typescript
import { NODE_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);

console.log(record?.name);    // "Log_Message"
console.log(record?.inputs);  // 输入引脚列表
console.log(record?.outputs); // 输出引脚列表
```

### 查询客户端节点信息

```typescript
import { CLIENT_NODE_ID, get_node_record } from "./node_data";

// 普通节点
const id1 = CLIENT_NODE_ID.Logical_AND_Operation; // '200001'
const record1 = get_node_record(id1);

// 泛型节点
const id2 = CLIENT_NODE_ID.Equal__Generic; // '200006'
const record2 = get_node_record(id2);

// 具体类型节点
const id3 = CLIENT_NODE_ID.Equal__Int; // '200006 12 S<T:Int>'
const record3 = get_node_record(id3);
```

### 查询节点名称

```typescript
import { 
  get_node_name_from_cid, 
  get_node_name_from_gid,
  get_server_node_name_from_cid,
  get_client_node_name_from_cid
} from "./node_data/helpers";

// 自动识别服务端/客户端
const name1 = get_node_name_from_cid(100);        // "Add_Int" (服务端)
const name2 = get_node_name_from_cid('200001 1'); // "Logical_AND_Operation__Generic" (客户端)

// 根据泛型 ID 查询
const name3 = get_node_name_from_gid(99);  // "Add__Generic" (服务端)
const name4 = get_node_name_from_gid(200001); // "Logical_AND_Operation" (客户端)

// 明确指定服务端/客户端
const serverName = get_server_node_name_from_cid(100);
const clientName = get_client_node_name_from_cid('200001');
```

### 查询枚举值

```typescript
import { ENUM_ID, ENUM_VALUE } from "./node_data";

const enumType = ENUM_ID.Comparison_Operators;
const equalTo = ENUM_VALUE.ComparisonOperators_EqualTo;
```

### 处理泛型节点

```typescript
import { get_index_of_concrete, get_generic_id } from "./node_data/helpers";
import { VarType } from "./types_list";

// 获取 Add_Int 的泛型 ID
const genericId = get_generic_id(NODE_ID.Add_Int);

// 获取类型索引
const typeIndex = get_index_of_concrete(genericId, true, 0, VarType.Int, true);
```

---

## 数据来源与生成流程

### 数据提取

所有节点数据通过 `extracting_nodes` 目录中的脚本从游戏程序集中提取:

- **服务端节点数据**: 从服务端程序集提取,包含 3877 个节点
- **客户端节点数据**: 从客户端程序集提取,包含 407 个节点

### 数据处理

提取的原始数据经过以下处理步骤:

1. **手动清理与校验**: 修正提取过程中的错误和不一致
2. **结构化整合**: 统一数据格式,建立节点间的关联关系
3. **类型映射生成**: 为泛型节点生成完整的类型映射表
4. **索引构建**: 生成高效的查询索引和辅助数据结构

### 集成生成

使用 `gen_index.ts` 脚本将所有处理后的数据集中生成为最终的导出文件:

- `node_id.ts` - 服务端与客户端节点 ID 映射
- `node_pin_records.ts` - 节点引脚定义
- `concrete_map.ts` - 泛型类型映射
- `enum_id.ts` - 枚举定义
- `types_list.ts` - 类型列表
- `index.yaml` / `index.json` - 完整数据汇总

> **注**: 本目录下的其他文件(dev 版本中)为生成过程中的中间产物或源文件,发布版本中不包含。

---

## 相关模块

- [GIA 生成器](../gia_gen/readme.md) — 使用节点数据构建图
- [Protobuf 工具](../protobuf/readme.md) — GIA 文件编解码
- [主 README](../readme.md) — 工具库概述
