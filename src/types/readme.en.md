# Type Definition Module (`types`)

This module defines the project's core type system, including Intermediate Representation (IR), Token types, constants, and more.

## File Description

| File | Description |
| :--- | :--- |
| [`IR.ts`](./IR.ts) | IR type unified export and module definition |
| [`IR_node.ts`](./IR_node.ts) | Node IR types: call, branch, anchor, etc. |
| [`IR_decl.ts`](./IR_decl.ts) | Declaration IR types: import, variable, struct, etc. |
| [`IR_func.ts`](./IR_func.ts) | Function IR types: component, Lambda, shared functions |
| [`types.ts`](./types.ts) | Base types: Token, ParserState, IRBase |
| [`consts.ts`](./consts.ts) | Constants: Token patterns, lexical rules, built-in nodes |
| [`class.ts`](./class.ts) | Helper class: NodeVar value wrapper |

---

## IR Type System

### `IR_GraphModule` — Complete Module

Represents a complete node graph file, containing all declarations and execution blocks.

```typescript
interface IR_GraphModule extends IRBase {
  kind: "module";
  // Declarations
  imports: ImportDecl[];      // Import declarations
  globals: GlobalDecl[];      // Global declaration blocks
  node_vars: NodeVarDecl[];   // Node graph variables
  local_vars: LocalVarDecl[]; // Temporary variables
  defines: DefineDecl[];      // Compile-time constants
  components: ComponentDecl[]; // Component functions
  lambdas: LambdaDecl[];      // Lambda functions
  shared_funcs: SharedFuncDecl[]; // Shared functions
  // Graph
  graph: IR_ExecutionBlock[]; // List of execution blocks
}
```

### `IR_Node` — Node Union Type

```typescript
type IR_Node =
  | IR_CallNode    // Function call
  | IR_EvalNode    // Lambda evaluation
  | IR_BranchNode  // Branch node
  | IR_AnchorNode  // Anchor (branch merge point)
  | IR_JumpNode    // Jump
  | IR_InOutNode;  // Component input/output
```

---

## Node IR Details

### `IR_ExecutionBlock` — Execution Block

An execution block starts with a trigger/anchor, followed by a node chain.

```typescript
interface IR_ExecutionBlock extends IRBase {
  kind: "block";
  starter: IR_Trigger | IR_AnchorNode | IR_InOutNode;
  chain: IR_NodeChain[];
}
```

**DSL Example:**
```typescript
[OnCreate()]        // starter: IR_Trigger
  .Log("Hello")     // chain[0]
  .SetVal(x, 1);    // chain[0] continues
```

### `IR_CallNode` — Function Call

```typescript
interface IR_CallNode extends IRBase {
  kind: "call";
  class: "Sys" | "Usr";  // System function or user-defined
  specific?: "If" | "Switch" | "Loop" | ...;  // Special built-in node
  name: string;
  inputs: IR_FunctionArg[];
  outputs: IR_FunctionArg[];
  branches: { branchId: BranchId | null; nodes: IR_NodeChain[] }[];
}
```

**DSL Example:**
```typescript
.If(condition)(       // name: "If", specific: "If"
  true = Log("yes"),  // branches[0]
  false = Log("no")   // branches[1]
)
```

### `IR_EvalNode` — Lambda Evaluation

```typescript
interface IR_EvalNode extends IRBase {
  kind: "eval";
  captures: IR_FunctionArg[];  // Captured variables
  lambda: Token[];             // Lambda code body
  outputs: IR_FunctionArg[];   // Output mapping
}
```

**DSL Example:**
```typescript
.$((x, y) => x + y)[result]  // captures, lambda, outputs
```

### `IR_BranchNode` — Branch Node

```typescript
interface IR_BranchNode extends IRBase {
  kind: "branch";
  branches: { id: number; nodes: IR_NodeChain[] }[];
}
```

### `IR_AnchorNode` — Anchor

```typescript
interface IR_AnchorNode extends IRBase {
  kind: "anchor";
  id: BranchId;  // String or number identifier
}
```

**DSL Example:**
```typescript
Branch["merge_point"]  // Define anchor point
  .Log("merged");

// Jump from elsewhere
.If(cond)(
  true = "merge_point"()  // IR_JumpNode
)
```

---

## Declaration IR Details

### `ImportDecl` — Import Declaration

```typescript
interface ImportDecl extends IRBase {
  kind: "import";
  file_name: string;
  components: string[];  // UpperCamelCase
  lambdas: string[];     // snake_case
  defines: string[];     // UPPER_SNAKE_CASE
}
```

**DSL Example:**
```typescript
import { MyComponent, my_lambda, MY_CONST } from "other_file";
```

### `GlobalDecl` — Global Declaration Block

```typescript
interface GlobalDecl extends IRBase {
  kind: "global";
  structs: StructDecl[];
  globals: GlobalVarDecl[];
  timers: TimerDecl[];
  signals: SignalDecl[];
}
```

**DSL Example:**
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

### `NodeVarDecl` — Node Graph Variable

One instance per node graph for each entity.

```typescript
interface NodeVarDecl extends IRBase {
  kind: "nodeVar";
  name: string;
  type: NodeType;
  default: NodeVar;
  export: boolean;  // Whether to expose
}
```

**DSL Example:**
```typescript
declare namespace node {
  export const score: int = 0;
}
```

---

## Base Types

### `Token`

```typescript
interface Token {
  type: PatternTypes;  // "identifier" | "int" | "string" | ...
  value: string;
  pos: number;  // Position in source code
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

Base interface for all IR nodes.

```typescript
interface IRBase {
  _id: number;        // Unique ID
  kind: string;       // Type identifier
  _srcRange: { start: number; end: number };  // Source code range
}
```

### `BranchId`

Branch identifier, can be a string, number, or boolean.

```typescript
type BranchId = string | number | boolean;
```

---

## Constants (`consts.ts`)

### Lexical Rules

```typescript
const TOKENIZER_PATTERNS = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "identifier", regex: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
  { type: "int", regex: /^[1-9]([0-9_]*)|^0/ },
  { type: "string", regex: /^"(?:[^"\\]|\\.)*"/ },
  // ...
];
```

### Built-in System Nodes

```typescript
const BUILD_IN_SYS_NODE = [
  "If", "Switch", "Loop", "ForEach", "Selector",
  "SetVal", "In", "Out", "Trigger", "Timer", "Signal"
] as const;
```

---

## Related Modules

- [Parser](../parser/readme.md) — Parser for generating IR
- [Converter](../convertor/readme.md) — IR ⇔ GIA conversion
- [Node Data](../../utils/node_data/readme.md) — Node ID and type definitions