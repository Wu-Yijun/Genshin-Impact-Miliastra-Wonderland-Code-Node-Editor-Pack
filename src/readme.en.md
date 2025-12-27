# Source Code Directory (`src`)

This directory contains the core source code of the project, responsible for DSL parsing, Intermediate Representation (IR) definition, and format conversion.

## Directory Structure

| Directory | Description | Status |
| :--- | :--- | :--- |
| **[`convertor`](./convertor/readme.en.md)** | GIA ⇔ IR format converter, including graph analysis algorithms | Active |
| **[`parser`](./parser/readme.en.md)** | DSL text parser (lexical analysis + syntax analysis + decompilation) | Active |
| **[`types`](./types/readme.en.md)** | IR type definitions, constants, Token definitions | Active |
| `test` | Unit tests and test cases | Internal |

## Core Interface Quick Reference

### Parser (`parser`)

```typescript
import { createParserState } from "./parser/tokenizer";
import { parse } from "./parser/parser";
import { decompile } from "./parser/decompiler";

// Parse DSL code into IR
const state = createParserState(source);
const ir = parse(state);

// Decompile IR back to DSL code
const code = decompile(ir);
```

| Function | Description |
| :--- | :--- |
| `createParserState(source)` | Creates parser state, including lexical analysis results |
| `parse(state)` | Parses a complete module, returns `IR_GraphModule` |
| `decompile(ir)` | Decompiles any IR node into a code string |

### Convertor (`convertor`)

```typescript
import { giaIrConvertor } from "./convertor/gia_ir";
import { analyzeGraph } from "./convertor/graph_chain_split";

// Convert GIA graph to raw IR
const irModule = giaIrConvertor(giaGraph, true);

// Analyze graph structure (chains, cycles, isolated nodes)
const result = analyzeGraph(nodes, edges);
```

| Function | Description |
| :--- | :--- |
| `giaIrConvertor(gia, raw)` | Converts GIA graph to IR module |
| `analyzeGraph(nodes, edges)` | Graph structure analysis, returns information about chains and cycles |

### Type Definitions (`types`)

| Type | Description |
| :--- | :--- |
| `IR_GraphModule` | Complete node graph module, containing declarations and execution blocks |
| `IR_Node` | Node union type: `Call | Eval | Branch | Anchor | Jump | InOut` |
| `IR_ExecutionBlock` | Execution block: trigger + node chain |
| `Token` | Lexical Token, containing type, value, position |
| `ParserState` | Parser state, containing Token stream and current position |

## Module Dependencies

```
parser ──────┐
             ├──► types (IR definition)
convertor ───┘
             │
             ▼
         utils (node_data, gia_gen)
```

## Related Documentation

- [DSL User Guide](../docs/UserGuide.md)
- [Language Design Manual](../docs/SystemDesign.md)
- [Utility Library](../utils/readme.md)