# Genshin Impact Miliastra Wonderland Node Graph Toolset

<div align="center">

[Chinese Documentation](Readme.en.md) | [English Documentation](Readme.en.en.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**A comprehensive toolset for Genshin Impact Miliastra Wonderland node graph development**

*A complete solution from low-level file parsing to high-level code generation*

[Quick Start](#quick-start) · [Core Features](#core-features) · [Documentation](#module-documentation) · [Development Progress](#development-progress)

</div>

---

## ✨ Feature Highlights

- 🔧 **GIA File Read/Write** — Programmatically read and write `.gia` node graph files using TypeScript
- 📝 **DSL Code Language** — Describe node graphs as code, enjoying IDE intelligent auto-completion and syntax highlighting
- 🔄 **Bidirectional Converter** — Complete compile/decompile toolchain for DSL ⇔ IR ⇔ GIA
- 📊 **Comprehensive Node Data** — Programmatically organized node IDs, enum values, and pin definitions
- 🧩 **High-level API** — `Graph` class encapsulation, easily build and modify node graphs
- 🎯 **Type Safety** — Comprehensive TypeScript type definitions and compile-time checking

---

## Core Features

### 1. GIA File Read/Write

Programmatically read and write `.gia` files using TypeScript, supporting full encoding/decoding and graph operations.

```typescript
import { decode_gia_file, encode_gia_file, Graph, NODE_ID } from "./utils";

// Read an existing file
const data = decode_gia_file("./input.gia");
const graph = Graph.decode(data);

// Or create a new graph
const newGraph = new Graph("server");
const trigger = newGraph.add_node(NODE_ID.When_Entity_Is_Created);
const log = newGraph.add_node(NODE_ID.Log_Message);

// Connect nodes
newGraph.flow(trigger, log);
log.setVal(0, "Hello World!");

// Auto-layout and save
newGraph.autoLayout();
encode_gia_file("./output.gia", newGraph.encode());
```

📖 Details: [GIA Generator](./utils/gia_gen/readme.en.md) | [Protobuf Tools](./utils/protobuf/readme.en.md)

### 2. DSL Code Writing

Use a TypeScript-based Domain-Specific Language (DSL) to describe node graph logic as code, enjoying IDE intelligent auto-completion, syntax highlighting, and version control advantages.

```typescript
// Triggered when game object is created
[OnCreate()]
  .Log("I'm alive!")
  .SetVal(Self.hp, 10000);

// Triggered when a signal is received
[Signal(Signal.PlayerHit)[dmg]]
  .$((dmg) => dmg * node.critical)[real_dmg]
  .SetVal(Self.hp, Self.hp - real_dmg)
  .If(Self.hp <= 0)(
    true = Log("You died"),
    false = Log("Ouch!")
  );

// Loops and branches
[Timer(Timer.countdown)]
  .Loop(0n, 9n, "spawn")[i](
    true = SpawnEnemy(i),
    false = Log("All spawned") >> 0()
  ).Log("Loop complete");
```

📖 Details: [DSL User Guide](./docs/UserGuide.en.md) | [Language Design](./docs/SystemDesign.en.md) | [Function Definitions](./utils/functions/readme.en.md)

### 3. Parser and Converter

A complete compile/decompile toolchain, supporting mutual conversion between DSL text, Intermediate Representation (IR), and GIA node graphs.

```typescript
import { createParserState, parse, decompile } from "./src/parser";
import { giaIrConvertor } from "./src/convertor";

// DSL → IR
const state = createParserState(sourceCode);
const ir = parse(state);

// IR → DSL
const code = decompile(ir);

// GIA → IR
const irModule = giaIrConvertor(giaGraph, true);
```

```
┌─────────┐      parse       ┌──────┐     giaIrConvertor    ┌─────────┐
│   DSL   │ ───────────────► │  IR  │ ◄──────────────────── │   GIA   │
│  Code   │ ◄─────────────── │  AST │ ────────────────────► │  Graph  │
└─────────┘     decompile    └──────┘     (in progress)     └─────────┘
```

📖 Details: [Parser](./src/parser/readme.en.md) | [Converter](./src/convertor/readme.en.md) | [IR Types](./src/types/readme.en.md)

### 4. Comprehensive Node Data

Programmatically organized server and client node data, including complete ID mappings, enum definitions, and pin information.

```typescript
import { NODE_ID, ENUM_ID, ENUM_VALUE, get_node_record } from "./utils/node_data";

// Query node information
const id = NODE_ID.Add_Float;
const record = get_node_record(id);
console.log(record?.name, record?.inputs, record?.outputs);

// Use enums
const compOp = ENUM_VALUE.ComparisonOperators_EqualTo;
```

| Data Type | Description | Format |
| :--- | :--- | :--- |
| Node ID | IDs and type extensions for 558(3730) nodes | TypeScript |
| Enum Definitions | 85(264) enum types and enum values | TypeScript |
| Pin Records | Input/output pin definitions for all nodes | TypeScript |
| Type Mapping | Type index table for generic nodes | TypeScript |
| Comprehensive Data | Structured summary of the above data | YAML / JSON / TypeScript |

📖 Details: [Node Data](./utils/node_data/readme.en.md)

---

## Project Structure

```
.
├── src/                          # Core source code
│   ├── convertor/                # GIA ⇔ IR Converter
│   │   ├── gia_ir.ts             #     Conversion entry point
│   │   ├── gia_ir_raw.ts         #     Raw IR builder
│   │   └── graph_chain_split.ts  #  Graph structure analysis algorithms
│   ├── parser/                 # DSL Parser
│   │   ├── tokenizer.ts        #     Lexical analysis
│   │   ├── parser.ts           #     Syntax analysis
│   │   ├── decompiler.ts       #     IR → DSL Decompilation
│   │   └── parse_*.ts          #     Sub-parsers
│   └── types/                  # IR Type Definitions
│       ├── IR*.ts              #     IR Node Types
│       ├── types.ts            #     Base types
│       └── consts.ts           #     Constant definitions
│ 
├── utils/                      # Utility Library
│   ├── gia_gen/                # GIA Graph Generator
│   │   ├── graph.ts            #     Graph class (Recommended)
│   │   ├── basic.ts            #     Basic component generation
│   │   ├── nodes.ts            #     Node generator
│   │   ├── auto_layout.ts      #     Automatic layout algorithm
│   │   └── ......              #     Other components
│   ├── node_data/              # Node Static Data
│   │   ├── node_id.ts          #     Node ID mapping
│   │   ├── enum_id.ts          #     Enum definitions
│   │   ├── data.ts             #     All data information
│   │   ├── helpers.ts          #     Query helper functions
│   │   └── ......              #     Other static definitions
│   ├── protobuf/               # Protobuf Tools
│   │   ├── gia.proto           #     Protobuf structure definition
│   │   ├── decode.ts           #     TypeScript Encoding/Decoding (Standard structure)
│   │   ├── decode.py           #     Python Encoding/Decoding (Displays unknown fields)
│   │   └── gia.proto.ts        #     Automatically generated types
│   ├── functions/              # DSL Function Definitions
│   │   ├── math.ts             #     Function definition list
│   │   └── function_defs.ts    #     Type system and parser
│   └── gen_def.ts              # DSL Type Definition Generator
│
├── docs/                       # User Documentation
│   ├── UserGuide.md            # DSL User Guide
│   ├── SystemDesign.md         # Language Design Document
│   └── dsl.enbf                # DSL Syntax Specification
│
├── test.CI/                    # CI Test Cases (run by GitHub Actions)
└── static/                     # Image Resources (displayed in Readme.md)
```

---

## Quick Start

### Environment Requirements

- **Node.js** 23.6+
- **npm** or **pnpm**

### Install Dependencies

```bash
npm install
```

### Run Examples

```bash
// In progress, no full example yet
```

### Quick Usage

**1. Read and Modify Existing GIA Files**

```typescript
import { decode_gia_file, encode_gia_file, Graph } from "./utils";

const data = decode_gia_file("./myGraph.gia");
const graph = Graph.decode(data);

// Modify node position
graph.get_nodes()[0].setPos(100, 200);

// Add comment
graph.add_comment("这是一个测试节点", 100, 150);

// Save
encode_gia_file("./myGraph_modified.gia", graph.encode());
```

**2. Create Node Graph from Scratch**

```typescript
import { Graph, NODE_ID, encode_gia_file } from "./utils";

const graph = new Graph("server");

// Add trigger and functional nodes
const onCreate = graph.add_node(NODE_ID.When_Entity_Is_Created);
const getPlayer = graph.add_node(NODE_ID.Get_Player_Entity);
const teleport = graph.add_node(NODE_ID.Teleport_Player);

// Connect execution flow
graph.flow(onCreate, getPlayer);
graph.flow(getPlayer, teleport);

// Connect data flow
graph.connect(getPlayer, teleport, 0, 0); // Entity output → Teleport target

// Set parameters
teleport.setVal(1, [100, 0, 50]); // Target coordinates

// Layout and save
graph.autoLayout();
encode_gia_file("./newGraph.gia", graph.encode());
```

---

## Module Documentation

### Core Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **Source Code** | Parser, Converter, Type Definitions | [src/readme.en.md](./src/readme.en.md) |
| **Utility Library** | GIA Generation, Node Data, Protobuf | [utils/readme.en.md](./utils/readme.en.md) |

### Utility Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **DSL Functions** | Math/Query Node Definitions and Type Generation | [functions/readme.en.md](./utils/functions/readme.en.md) |
| **GIA Generator** | Programmatic Building and Manipulation of Node Graphs | [gia_gen/readme.en.md](./utils/gia_gen/readme.en.md) |
| **Node Data** | ID, Enum, Pin Reflection Data | [node_data/readme.en.md](./utils/node_data/readme.en.md) |
| **Protobuf** | GIA File Encoding/Decoding | [protobuf/readme.en.md](./utils/protobuf/readme.en.md) |

### User Documentation

| Document | Description |
| :--- | :--- |
| [DSL User Guide](./docs/UserGuide.en.md) | Complete Guide to DSL Syntax |
| [Language Design](./docs/SystemDesign.en.md) | Language Design Philosophy and Implementation Details |
| [TODO.md](./TODO.en.md) | Development Plan and Progress Tracking |

---

## GIA File Format

The `.gia` file is the binary storage format for Genshin Impact Miliastra Wonderland node graphs, serialized using Protobuf.

![GIA File Structure](./static/image.png)

| Field | Offset | Value | Description |
| :--- | :--- | :--- | :--- |
| File Size | 0x00 | `size - 4` | Total file size minus 4 bytes |
| Version Number | 0x04 | `0x01` | Fixed value |
| Header Marker | 0x08 | `0x0326` | **Strict Check** |
| File Type | 0x0C | `0x03` | GIA = 3 |
| Content Length | 0x10 | `size - 24` | Protobuf data length |
| Protobuf | 0x14 | ... | Serialized node graph data |
| Footer Marker | End | `0x0679` | **Strict Check** |

📖 Protobuf detailed structure: [gia.proto](./utils/protobuf/gia.proto)

---

## Development Progress

### Completed ✅

| Feature | Status | Description |
| :--- | :--- | :--- |
| GIA File Reverse Engineering | ✅ Completed | Complete file format parsing |
| GIA File Read/Write Interface | ✅ Completed | TypeScript + Python tools |
| Graph High-level API | ✅ Completed | Node, connection, comment, variable management |
| DSL Syntax Design | ✅ Completed | Complete syntax specification |
| DSL → IR Parser | ✅ Completed | Lexical analysis + Syntax analysis |
| IR → DSL Decompiler | ✅ Completed | Complete decompilation support |
| Automatic Layout Algorithm | ✅ Completed | Dagre-based automatic layout |
| Node Data Organization | ✅ Completed | 770+ nodes, 40+ enums |
| CI Automated Testing | ✅ Completed | Parser consistency testing |

### In Progress ⏳

| Feature | Status | Description |
| :--- | :--- | :--- |
| GIA → IR Converter | ⏳ In Progress | Raw mode supported, optimization in progress |
| IR → GIA Converter | ⏳ In Progress | Construct Graph from IR |
| Client Node Support | ⏳ In Progress | ID and enum difference handling |

### Planned 📋

| Feature | Description |
| :--- | :--- |
| VSCode Language Extension | Syntax highlighting and intelligent auto-completion for `.dsl.ts` files |
| Compiler Type Inference | Automatically infer DSL expression types |
| Execution Simulation | Locally simulate node graph logic execution |

For more plans, see [TODO.md](./TODO.en.md)

---

## File Visibility

According to [sync-list.json](./sync-list.json), the following content is only visible in the development branch (`dev`):

| Path | Reason |
| :--- | :--- |
| `utils/extracting_nodes/` | Internal node extraction tool |
| `utils/**/ref/**` | Reference files |
| `utils/node_data/yaml/**` | Intermediate data |
| `**/test/**`, `**/temp/**` | Test and temporary files |
| `utils/functions/tools.ts` | Internal tool |

---

## Related Projects

| Project | Description |
| :--- | :--- |
| [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) | Web-based Node Editor |
| [genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format) | Introduction to `gil` and other file formats |

---

## Contribution

Contributions, bug reports, and suggestions are welcome!

- 🐛 **Bug Reports**：[Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 💡 **Feature Suggestions**：[Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 📧 **Contact Author**：[wuyijun21@mails.ucas.ac.cn](mailto:wuyijun21@mails.ucas.ac.cn)

## License

[MIT License](./LICENSE) © 2025 Wu-Yijun