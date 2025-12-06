# 工具库 (`utils`)

本目录包含一系列辅助工具、生成器和参考数据，用于支持 GIA 文件处理、DSL 类型生成和节点图操作。

## 目录索引

| 目录 | 说明 | 状态 |
| :--- | :--- | :--- |
| **[`functions`](./functions/readme.md)** | DSL 函数定义与类型生成工具 | 活跃 |
| **[`gia_gen`](./gia_gen/readme.md)** | GIA 节点图编程式构建工具 | 活跃 |
| **[`node_data`](./node_data/readme.md)** | 节点静态数据：ID、枚举、引脚定义 | 活跃 |
| **[`protobuf`](./protobuf/readme.md)** | GIA Protobuf 定义与编解码工具 | 活跃 |
| `extracting_nodes` | 节点定义提取脚本 | **内部/不同步** |
| `ref` | 参考文件（示例 GIA、反编译代码） | 参考 |

---

## 快速入手

### 读写 GIA 文件

```typescript
import { decode_gia_file, encode_gia_file } from "./protobuf/decode";

// 读取
const data = decode_gia_file("./path/to/file.gia");
console.log(data.graph);

// 写入
encode_gia_file("./output.gia", data);
```

### 编程式创建节点图

```typescript
import { Graph, NODE_ID } from "./index";
import { encode_gia_file } from "./protobuf/decode";

const graph = new Graph();
const trigger = graph.add_node(NODE_ID.When_Entity_Is_Created);
const log = graph.add_node(NODE_ID.Log_Message);

graph.flow(trigger, log);
log.setVal(0, "Hello World!");

graph.autoLayout();
encode_gia_file("./hello.gia", graph.encode());
```

### 查询节点数据

```typescript
import { NODE_ID, ENUM_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);
console.log(record?.inputs, record?.outputs);
```

---

## 主要导出 (`index.ts`)

本文件统一导出常用模块：

| 模块 | 说明 |
| :--- | :--- |
| `gia_gen/*` | Graph, Node, Pin, Connect 等类 |
| `node_data/*` | NODE_ID, ENUM_ID, helpers |
| `protobuf/decode` | decode_gia_file, encode_gia_file |

**使用示例：**
```typescript
import { Graph, Node, helper, decode_gia_file } from "./utils";
```

---

## 核心文件

### `gen_def.ts` — DSL 类型定义生成器

读取 `functions/math.ts` 中的函数定义，自动生成 `def.d.ts` 文件，为 DSL 编写提供 IDE 智能补全。

```bash
npx tsx utils/gen_def.ts
```

**功能：**
- 解析函数定义（重载、泛型、参数）
- 生成 TypeScript 声明文件
- 支持系统枚举和自定义类型

### `utils.ts` — 通用工具

```typescript
import { DEBUG, STRICT, panic } from "./utils";

DEBUG;   // 是否显示警告
STRICT;  // 是否在错误时中断

panic("message"); // 抛出错误并打印
```

---

## 模块详情

### [函数定义工具 (`functions`)](./functions/readme.md)

定义 DSL 中的 Math 和 Query 节点，支持重载和泛型。

**核心文件：**
- `math.ts` — 函数定义列表
- `function_defs.ts` — 解析器和类型系统
- `utils.ts` — 辅助函数

### [GIA 生成器 (`gia_gen`)](./gia_gen/readme.md)

编程式构建 GIA 节点图的高层 API。

**核心类：**
- `Graph` — 图管理器
- `Node` — 节点实例
- `Pin` — 引脚实例
- `Connect` — 连接实例

**核心函数：**
- `graph_body()` — 创建图结构
- `node_body()` — 创建节点
- `get_nodes()` — 提取节点列表

### [节点数据 (`node_data`)](./node_data/readme.md)

静态节点定义和 ID 映射。

**核心文件：**
- `node_id.ts` — 节点名称 → ID
- `enum_id.ts` — 枚举定义
- `node_pin_records.ts` — 引脚定义
- `helpers.ts` — 查询辅助函数

### [Protobuf 工具 (`protobuf`)](./protobuf/readme.md)

GIA 文件的 Protobuf 定义和编解码。

**核心文件：**
- `gia.proto` — Protobuf 结构定义
- `decode.ts` — TypeScript 编解码
- `gia.proto.ts` — 自动生成的 TS 类型

---

## 文件可见性

根据 `sync-list.json`，以下内容**不会同步**到公开分支：

| 路径 | 原因 |
| :--- | :--- |
| `utils/extracting_nodes/**` | 内部节点提取工具 |
| `utils/**/ref/**` | 参考文件 |
| `utils/node_data/yaml/**` | 中间数据 |
| `utils/functions/tools.ts` | 内部工具 |
| `utils/functions/check.ts` | 验证脚本 |
| `**/test/**`, `**/temp/**` | 测试和临时文件 |

---

## 相关文档

- [源代码](../src/readme.md) — 解析器和转换器
- [主 README](../Readme.md) — 项目概述
- [DSL 使用手册](../docs/UserGuide.md)
