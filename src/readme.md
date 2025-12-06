# 源代码目录 (`src`)

本目录包含项目的核心源代码，负责 DSL 解析、中间表示 (IR) 定义、以及格式转换。

## 目录结构

| 目录 | 说明 | 状态 |
| :--- | :--- | :--- |
| **[`convertor`](./convertor/readme.md)** | GIA ⇔ IR 格式转换器，包含图分析算法 | 活跃 |
| **[`parser`](./parser/readme.md)** | DSL 文本解析器（词法分析 + 语法分析 + 反编译） | 活跃 |
| **[`types`](./types/readme.md)** | IR 类型定义、常量、Token 定义 | 活跃 |
| `test` | 单元测试和测试用例 | 内部 |

## 核心接口速查

### 解析器 (`parser`)

```typescript
import { createParserState } from "./parser/tokenizer";
import { parse } from "./parser/parser";
import { decompile } from "./parser/decompiler";

// 解析 DSL 代码为 IR
const state = createParserState(source);
const ir = parse(state);

// IR 反编译回 DSL 代码
const code = decompile(ir);
```

| 函数 | 说明 |
| :--- | :--- |
| `createParserState(source)` | 创建解析器状态，包含词法分析结果 |
| `parse(state)` | 解析完整模块，返回 `IR_GraphModule` |
| `decompile(ir)` | 将任意 IR 节点反编译为代码字符串 |

### 转换器 (`convertor`)

```typescript
import { giaIrConvertor } from "./convertor/gia_ir";
import { analyzeGraph } from "./convertor/graph_chain_split";

// GIA 图转换为原始 IR
const irModule = giaIrConvertor(giaGraph, true);

// 分析图结构（链、环、孤立点）
const result = analyzeGraph(nodes, edges);
```

| 函数 | 说明 |
| :--- | :--- |
| `giaIrConvertor(gia, raw)` | GIA 图转换为 IR 模块 |
| `analyzeGraph(nodes, edges)` | 图结构分析，返回链和环的信息 |

### 类型定义 (`types`)

| 类型 | 说明 |
| :--- | :--- |
| `IR_GraphModule` | 完整节点图模块，包含声明和执行块 |
| `IR_Node` | 节点联合类型：`Call | Eval | Branch | Anchor | Jump | InOut` |
| `IR_ExecutionBlock` | 执行块：触发器 + 节点链 |
| `Token` | 词法 Token，包含类型、值、位置 |
| `ParserState` | 解析器状态，包含 Token 流和当前位置 |

## 模块依赖关系

```
parser ──────┐
             ├──► types (IR 定义)
convertor ───┘
             │
             ▼
         utils (node_data, gia_gen)
```

## 相关文档

- [DSL 使用手册](../docs/UserGuide.md)
- [语言设计手册](../docs/SystemDesign.md)
- [工具库](../utils/readme.md)
