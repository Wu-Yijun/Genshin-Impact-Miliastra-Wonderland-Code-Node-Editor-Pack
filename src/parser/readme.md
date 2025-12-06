# 解析器模块 (`parser`)

本模块实现 DSL 文本的解析（词法分析 + 语法分析）以及 IR 到代码的反编译。

## 解析流程

```
源代码 ──► Tokenizer ──► Token[] ──► Parser ──► IR_GraphModule
                                         ▲
                                         │
IR_GraphModule ◄── Decompiler ◄──────────┘
```

1. **词法分析 (Tokenization)**: 将源代码拆分为 Token 流
2. **后处理消歧 (Disambiguation)**: 细化 Token 类型
3. **语法分析 (Parsing)**: 递归下降解析，构建 IR 结构
4. **反编译 (Decompiling)**: 将 IR 转回代码字符串

---

## 核心接口

### 词法分析

```typescript
import { createParserState, tokenize, getSource } from "./tokenizer";
```

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| `createParserState` | `(source: string) => ParserState` | 创建解析器状态，自动完成词法分析 |
| `tokenize` | `(input: string) => Token[]` | 将源码拆分为 Token 数组 |
| `getSource` | `(state, start, end) => string` | 获取两个 Token 之间的源码 |

### 语法分析

```typescript
import { parse } from "./parser";
import { parseImport } from "./parser"; // 也可单独使用

const state = createParserState(source);
const module: IR_GraphModule = parse(state);
```

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| `parse` | `(state: ParserState) => IR_GraphModule` | 解析完整模块 |
| `parseImport` | `(state: ParserState) => ImportDecl` | 解析导入声明 |

### 反编译

```typescript
import { decompile, decompile_module } from "./decompiler";

const code = decompile(ir);           // 任意 IR 节点
const moduleCode = decompile_module(irModule); // 完整模块
```

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| `decompile` | `(ir: IRExtend, tab?: number) => string` | 反编译任意 IR 节点 |
| `decompile_module` | `(ir: IR_GraphModule) => string` | 反编译完整模块 |
| `ir_to_string` | `(ir, src, depth) => string` | 调试用的 IR 字符串化 |

---

## 文件说明

### 核心组件

| 文件 | 说明 |
| :--- | :--- |
| [`tokenizer.ts`](./tokenizer.ts) | 词法分析器，正则扫描生成 Token |
| [`parser.ts`](./parser.ts) | 语法分析主入口，解析完整模块 |
| [`decompiler.ts`](./decompiler.ts) | IR → 代码的反编译器 |
| [`disambiguation.ts`](./disambiguation.ts) | Token 后处理消歧 |

### 子解析器

| 文件 | 负责解析 |
| :--- | :--- |
| [`parse_block.ts`](./parse_block.ts) | 执行块 `[Trigger].Chain...` |
| [`parse_node.ts`](./parse_node.ts) | 节点调用 `NodeName(args)[outs]` |
| [`parse_decl.ts`](./parse_decl.ts) | 声明 `declare global { ... }` |
| [`parse_const.ts`](./parse_const.ts) | 常量/变量 `const x = ...` |
| [`parse_component.ts`](./parse_component.ts) | 组件函数 `function Comp() { ... }` |

### 工具函数

| 文件 | 说明 |
| :--- | :--- |
| [`parse_utils.ts`](./parse_utils.ts) | 类型解析、值解析、参数解析 |
| [`utils.ts`](./utils.ts) | Token 流导航：`peek`, `next`, `expect` |
| [`balanced_extract.ts`](./balanced_extract.ts) | 匹配括号提取 |

---

## 工具函数详解

### Token 流导航 (`utils.ts`)

```typescript
import { peek, next, expect, peekIs, src_pos } from "./utils";

peek(state)          // 查看当前 Token，不消费
peek(state, 1)       // 查看下一个 Token
next(state)          // 消费并返回当前 Token
expect(state, type)  // 期望特定类型，否则报错
expect(state, type, value) // 期望特定类型和值
peekIs(state, type, value) // 检查是否匹配
src_pos(state)       // 获取当前源码位置
```

### 解析工具 (`parse_utils.ts`)

```typescript
import { parse_type, parse_value, parse_args, name_style } from "./parse_utils";

parse_type(tokens)     // 解析类型表达式 → NodeType
parse_value(state)     // 解析字面量值 → IR_NodeVarValue
parse_args(state, "in") // 解析参数列表
name_style(name)       // 判断命名风格：UpperCamelCase | snake_case | ...
```

---

## 使用示例

### 完整解析流程

```typescript
import { createParserState } from "./tokenizer";
import { parse } from "./parser";
import { decompile } from "./decompiler";

const source = `
[OnCreate()]
  .Log("Hello World");
`;

// 解析
const state = createParserState(source);
const ir = parse(state);

// 反编译验证
const reconstructed = decompile(ir);
console.log(reconstructed);
```

### 单独使用词法分析

```typescript
import { tokenize } from "./tokenizer";

const tokens = tokenize("Log('test')");
// [
//   { type: "identifier", value: "Log", pos: 0 },
//   { type: "brackets", value: "(", pos: 3 },
//   { type: "string", value: "'test'", pos: 4 },
//   { type: "brackets", value: ")", pos: 10 }
// ]
```

---

## 相关文档

- [类型定义](../types/readme.md) — IR 结构和 Token 类型
- [转换器](../convertor/readme.md) — GIA ⇔ IR 转换
- [DSL 使用手册](../../docs/UserGuide.md) — 语法说明
