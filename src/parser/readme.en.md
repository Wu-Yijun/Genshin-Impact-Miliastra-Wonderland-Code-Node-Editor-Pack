# Parser Module (`parser`)

This module implements the parsing (lexical analysis + syntactic analysis) of DSL text and the decompilation of IR to code.

## Parsing Process

```
源代码 ──► Tokenizer ──► Token[] ──► Parser ──► IR_GraphModule
                                         ▲
                                         │
IR_GraphModule ◄── Decompiler ◄──────────┘
```

1.  **Lexical Analysis (Tokenization)**: Splits source code into a Token stream
2.  **Post-processing Disambiguation**: Refines Token types
3.  **Syntactic Analysis (Parsing)**: Recursive descent parsing, builds IR structure
4.  **Decompiling**: Converts IR back to code string

---

## Core Interfaces

### Lexical Analysis

```typescript
import { createParserState, tokenize, getSource } from "./tokenizer";
```

| Function          | Signature                       | Description                                         |
| :---------------- | :------------------------------ | :-------------------------------------------------- |
| `createParserState` | `(source: string) => ParserState` | Creates parser state, automatically performs lexical analysis |
| `tokenize`        | `(input: string) => Token[]`    | Splits source code into a Token array               |
| `getSource`       | `(state, start, end) => string` | Gets the source code between two Tokens             |

### Syntactic Analysis

```typescript
import { parse } from "./parser";
import { parseImport } from "./parser"; // 也可单独使用

const state = createParserState(source);
const module: IR_GraphModule = parse(state);
```

| Function    | Signature                             | Description                 |
| :---------- | :------------------------------------ | :-------------------------- |
| `parse`     | `(state: ParserState) => IR_GraphModule` | Parses a complete module    |
| `parseImport` | `(state: ParserState) => ImportDecl` | Parses an import declaration |

### Decompilation

```typescript
import { decompile, decompile_module } from "./decompiler";

const code = decompile(ir);           // 任意 IR 节点
const moduleCode = decompile_module(irModule); // 完整模块
```

| Function           | Signature                       | Description                          |
| :----------------- | :------------------------------ | :----------------------------------- |
| `decompile`        | `(ir: IRExtend, tab?: number) => string` | Decompiles any IR node               |
| `decompile_module` | `(ir: IR_GraphModule) => string` | Decompiles a complete module         |
| `ir_to_string`     | `(ir, src, depth) => string`    | IR stringification for debugging     |

---

## File Descriptions

### Core Components

| File                          | Description                                         |
| :---------------------------- | :-------------------------------------------------- |
| [`tokenizer.ts`](./tokenizer.ts) | Lexical analyzer, generates Tokens by regex scanning |
| [`parser.ts`](./parser.ts)       | Main entry point for syntactic analysis, parses complete module |
| [`decompiler.ts`](./decompiler.ts) | IR → code decompiler                                |
| [`disambiguation.ts`](./disambiguation.ts) | Token post-processing disambiguation                |

### Sub-Parsers

| File                            | Responsible for parsing       |
| :------------------------------ | :---------------------------- |
| [`parse_block.ts`](./parse_block.ts) | Execution blocks `[Trigger].Chain...` |
| [`parse_node.ts`](./parse_node.ts) | Node calls `NodeName(args)[outs]` |
| [`parse_decl.ts`](./parse_decl.ts) | Declarations `declare global { ... }` |
| [`parse_const.ts`](./parse_const.ts) | Constants/variables `const x = ...` |
| [`parse_component.ts`](./parse_component.ts) | Component functions `function Comp() { ... }` |

### Utility Functions

| File                                | Description                                       |
| :---------------------------------- | :------------------------------------------------ |
| [`parse_utils.ts`](./parse_utils.ts) | Type parsing, value parsing, argument parsing     |
| [`utils.ts`](./utils.ts)            | Token stream navigation: `peek`, `next`, `expect` |
| [`balanced_extract.ts`](./balanced_extract.ts) | Balanced bracket extraction                       |

---

## Utility Functions Details

### Token Stream Navigation (`utils.ts`)

```typescript
import { peek, next, expect, peekIs, src_pos } from "./utils";

peek(state)          // Peeks at the current Token, does not consume
peek(state, 1)       // Peeks at the next Token
next(state)          // Consumes and returns the current Token
expect(state, type)  // Expects a specific type, throws error otherwise
expect(state, type, value) // Expects a specific type and value
peekIs(state, type, value) // Checks if it matches
src_pos(state)       // Gets current source position
```

### Parsing Utilities (`parse_utils.ts`)

```typescript
import { parse_type, parse_value, parse_args, name_style } from "./parse_utils";

parse_type(tokens)     // Parses type expression → NodeType
parse_value(state)     // Parses literal value → IR_NodeVarValue
parse_args(state, "in") // Parses argument list
name_style(name)       // Determines naming style: UpperCamelCase | snake_case | ...
```

---

## Usage Examples

### Complete Parsing Process

```typescript
import { createParserState } from "./tokenizer";
import { parse } from "./parser";
import { decompile } => "./decompiler";

const source = `
[OnCreate()]
  .Log("Hello World");
`;

// Parse
const state = createParserState(source);
const ir = parse(state);

// Decompile and verify
const reconstructed = decompile(ir);
console.log(reconstructed);
```

### Using Lexical Analysis Separately

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

## Related Documentation

- [Type Definitions](../types/readme.md) — IR structures and Token types
- [Converters](../convertor/readme.md) — GIA ⇔ IR conversion
- [DSL User Manual](../../docs/UserGuide.md) — Syntax description