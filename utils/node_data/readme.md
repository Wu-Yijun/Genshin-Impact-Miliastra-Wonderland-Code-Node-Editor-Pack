# 节点数据与定义 (`node_data`)

本目录包含转换器所需的全部**静态定义**和资源数据。这些数据主要用于节点图的解析、类型推断和反射机制。

资源通过 `index.ts` 统一导出，部分原始定义文件在发布时可能会被剔除。

---

## 文件说明

| 文件 | 说明 | 大小 |
| :--- | :--- | :--- |
| [`index.yaml`](./index.yaml) / [`index.json`](./index.json) | 完整数据汇总 | ~1MB |
| [`node_id.ts`](./node_id.ts) | 节点 ID 映射表 | ~200KB |
| [`node_pin_records.ts`](./node_pin_records.ts) | 节点引脚定义记录 | ~157KB |
| [`enum_id.ts`](./enum_id.ts) | 枚举 ID 与值定义 | ~15KB |
| [`types_list.ts`](./types_list.ts) | 变量类型定义列表 | ~8KB |
| [`concrete_map.ts`](./concrete_map.ts) | 泛型节点类型映射表 | ~8KB |
| [`helpers.ts`](./helpers.ts) | 辅助函数库 | ~5KB |
| [`index.ts`](./index.ts) | 统一导出 | ~1KB |

---

## 核心资源

### [index.yaml](./index.yaml) / [index.json](./index.json)

**完整数据汇总**

以 YAML/JSON 格式提供的单文件完整数据汇总。
- 包含以下所有分散定义的高度结构化版本
- 适合外部程序直接读取和处理

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

**节点 ID 映射表**

提供节点名称到节点 ID 的完整映射。

```typescript
export const NODE_ID = {
  When_Entity_Is_Created: 1,
  Log_Message: 2,
  Add_Int: 100,
  Add_Float: 101,
  Add__Generic: 99, // 泛型节点
  // ...
} as const;
```

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
| `get_concrete_index(generic_id, pin_type, pin_index, type)` | 获取泛型引脚的具体类型索引 |
| `get_concrete_type(generic_id, pin_type, pin_index, index)` | 根据索引获取具体类型 |
| `get_concrete_map(generic_id, pin_type, pin_index)` | 获取引脚的类型映射表 |
| `is_concrete_pin(generic_id, pin_type, pin_index)` | 判断是否为反射引脚 |

### 节点记录函数

| 函数 | 说明 |
| :--- | :--- |
| `get_node_record(concrete_id)` | 根据具体 ID 获取节点记录 |
| `get_node_record_generic(generic_id)` | 根据泛型 ID 获取节点记录 |
| `get_generic_id(concrete_id)` | 将具体 ID 转换为泛型 ID |
| `is_generic_id(id)` | 判断是否为有效泛型 ID |
| `get_node_name_from_id(id)` | 根据 ID 获取节点名称 |

---

## 使用示例

### 查询节点信息

```typescript
import { NODE_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);

console.log(record?.name);    // "Log_Message"
console.log(record?.inputs);  // 输入引脚列表
console.log(record?.outputs); // 输出引脚列表
```

### 查询枚举值

```typescript
import { ENUM_ID, ENUM_VALUE } from "./node_data";

const enumType = ENUM_ID.Comparison_Operators;
const equalTo = ENUM_VALUE.ComparisonOperators_EqualTo;
```

### 处理泛型节点

```typescript
import { get_concrete_index, get_generic_id } from "./node_data/helpers";

// 获取 Add_Int 的泛型 ID
const genericId = get_generic_id(NODE_ID.Add_Int);

// 获取类型索引
const typeIndex = get_concrete_index(genericId, 0, 0, VarType.Int);
```

---

## 数据来源

这些数据通过 `extracting_nodes` 目录中的脚本从游戏程序集中提取，然后经过 手动处理, 并使用 gen_index.ts 集中生成。

> **注**：本目录下的其他文件(dev版本中)为生成过程中的中间产物或源文件，发布版本中不包含。

---

## 相关模块

- [GIA 生成器](../gia_gen/readme.md) — 使用节点数据构建图
- [Protobuf 工具](../protobuf/readme.md) — GIA 文件编解码
- [主 README](../readme.md) — 工具库概述
