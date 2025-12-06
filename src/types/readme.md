# 类型定义模块 (`types`)

本模块定义项目的核心类型系统，包括中间表示 (IR)、Token 类型、常量等。

## 文件说明

| 文件 | 说明 |
| :--- | :--- |
| [`IR.ts`](./IR.ts) | IR 类型统一导出和模块定义 |
| [`IR_node.ts`](./IR_node.ts) | 节点 IR 类型：调用、分支、锚点等 |
| [`IR_decl.ts`](./IR_decl.ts) | 声明 IR 类型：导入、变量、结构体等 |
| [`IR_func.ts`](./IR_func.ts) | 函数 IR 类型：组件、Lambda、共享函数 |
| [`types.ts`](./types.ts) | 基础类型：Token、ParserState、IRBase |
| [`consts.ts`](./consts.ts) | 常量：Token 模板、词法规则、内置节点 |
| [`class.ts`](./class.ts) | 辅助类：NodeVar 值包装 |

---

## IR 类型体系

### `IR_GraphModule` — 完整模块

表示一个完整的节点图文件，包含所有声明和执行块。

```typescript
interface IR_GraphModule extends IRBase {
  kind: "module";
  // 声明
  imports: ImportDecl[];      // 导入声明
  globals: GlobalDecl[];      // 全局声明块
  node_vars: NodeVarDecl[];   // 节点图变量
  local_vars: LocalVarDecl[]; // 临时变量
  defines: DefineDecl[];      // 编译时常量
  components: ComponentDecl[]; // 组件函数
  lambdas: LambdaDecl[];      // Lambda 函数
  shared_funcs: SharedFuncDecl[]; // 共享函数
  // 图
  graph: IR_ExecutionBlock[]; // 执行块列表
}
```

### `IR_Node` — 节点联合类型

```typescript
type IR_Node =
  | IR_CallNode    // 函数调用
  | IR_EvalNode    // Lambda 求值
  | IR_BranchNode  // 分支节点
  | IR_AnchorNode  // 锚点（分支汇入）
  | IR_JumpNode    // 跳转
  | IR_InOutNode;  // 组件输入/输出
```

---

## 节点 IR 详解

### `IR_ExecutionBlock` — 执行块

一个执行块由触发器/锚点开始，后接节点链。

```typescript
interface IR_ExecutionBlock extends IRBase {
  kind: "block";
  starter: IR_Trigger | IR_AnchorNode | IR_InOutNode;
  chain: IR_NodeChain[];
}
```

**DSL 示例：**
```typescript
[OnCreate()]        // starter: IR_Trigger
  .Log("Hello")     // chain[0]
  .SetVal(x, 1);    // chain[0] 继续
```

### `IR_CallNode` — 函数调用

```typescript
interface IR_CallNode extends IRBase {
  kind: "call";
  class: "Sys" | "Usr";  // 系统函数 or 用户定义
  specific?: "If" | "Switch" | "Loop" | ...;  // 特殊内置节点
  name: string;
  inputs: IR_FunctionArg[];
  outputs: IR_FunctionArg[];
  branches: { branchId: BranchId | null; nodes: IR_NodeChain[] }[];
}
```

**DSL 示例：**
```typescript
.If(condition)(       // name: "If", specific: "If"
  true = Log("yes"),  // branches[0]
  false = Log("no")   // branches[1]
)
```

### `IR_EvalNode` — Lambda 求值

```typescript
interface IR_EvalNode extends IRBase {
  kind: "eval";
  captures: IR_FunctionArg[];  // 捕获的变量
  lambda: Token[];             // Lambda 代码体
  outputs: IR_FunctionArg[];   // 输出映射
}
```

**DSL 示例：**
```typescript
.$((x, y) => x + y)[result]  // captures, lambda, outputs
```

### `IR_BranchNode` — 分支节点

```typescript
interface IR_BranchNode extends IRBase {
  kind: "branch";
  branches: { id: number; nodes: IR_NodeChain[] }[];
}
```

### `IR_AnchorNode` — 锚点

```typescript
interface IR_AnchorNode extends IRBase {
  kind: "anchor";
  id: BranchId;  // 字符串或数字标识
}
```

**DSL 示例：**
```typescript
Branch["merge_point"]  // 定义锚点
  .Log("merged");

// 从其他地方跳转
.If(cond)(
  true = "merge_point"()  // IR_JumpNode
)
```

---

## 声明 IR 详解

### `ImportDecl` — 导入声明

```typescript
interface ImportDecl extends IRBase {
  kind: "import";
  file_name: string;
  components: string[];  // UpperCamelCase
  lambdas: string[];     // snake_case
  defines: string[];     // UPPER_SNAKE_CASE
}
```

**DSL 示例：**
```typescript
import { MyComponent, my_lambda, MY_CONST } from "other_file";
```

### `GlobalDecl` — 全局声明块

```typescript
interface GlobalDecl extends IRBase {
  kind: "global";
  structs: StructDecl[];
  globals: GlobalVarDecl[];
  timers: TimerDecl[];
  signals: SignalDecl[];
}
```

**DSL 示例：**
```typescript
declare global {
  namespace Self {
    const hp: float = 100;
  }
  namespace Timer {
    const countdown: CountDown<5>;
  }
}
```

### `NodeVarDecl` — 节点图变量

每个实体的每个节点图一个实例。

```typescript
interface NodeVarDecl extends IRBase {
  kind: "nodeVar";
  name: string;
  type: NodeType;
  default: NodeVar;
  export: boolean;  // 是否暴露
}
```

**DSL 示例：**
```typescript
declare namespace node {
  export const score: int = 0;
}
```

---

## 基础类型

### `Token`

```typescript
interface Token {
  type: PatternTypes;  // "identifier" | "int" | "string" | ...
  value: string;
  pos: number;  // 在源码中的位置
}
```

### `ParserState`

```typescript
interface ParserState {
  tokens: Token[];
  index: number;
  source: string;
}
```

### `IRBase`

所有 IR 节点的基础接口。

```typescript
interface IRBase {
  _id: number;        // 唯一 ID
  kind: string;       // 类型标识
  _srcRange: { start: number; end: number };  // 源码位置
}
```

### `BranchId`

分支标识，可以是字符串、数字或布尔值。

```typescript
type BranchId = string | number | boolean;
```

---

## 常量 (`consts.ts`)

### 词法规则

```typescript
const TOKENIZER_PATTERNS = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "identifier", regex: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
  { type: "int", regex: /^[1-9]([0-9_]*)|^0/ },
  { type: "string", regex: /^"(?:[^"\\]|\\.)*"/ },
  // ...
];
```

### 内置系统节点

```typescript
const BUILD_IN_SYS_NODE = [
  "If", "Switch", "Loop", "ForEach", "Selector",
  "SetVal", "In", "Out", "Trigger", "Timer", "Signal"
] as const;
```

---

## 相关模块

- [解析器](../parser/readme.md) — 生成 IR 的解析器
- [转换器](../convertor/readme.md) — IR ⇔ GIA 转换
- [节点数据](../../utils/node_data/readme.md) — 节点 ID 和类型定义
