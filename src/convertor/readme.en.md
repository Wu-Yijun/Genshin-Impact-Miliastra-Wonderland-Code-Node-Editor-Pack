# Convertor Module (`convertor`)

This module is responsible for the mutual conversion between GIA node graphs and Intermediate Representation (IR), as well as graph structure analysis.

## File Description

| File | Description |
| :--- | :--- |
| [`gia_ir.ts`](./gia_ir.ts) | GIA → IR Conversion Entrypoint |
| [`gia_ir_raw.ts`](./gia_ir_raw.ts) | Raw IR Builder Implementation |
| [`graph_chain_split.ts`](./graph_chain_split.ts) | Graph Structure Analysis Algorithm (Chains, Cycles, Isolated Nodes) |

---

## Core Interfaces

### `giaIrConvertor(gia, raw)` — GIA to IR

Converts a GIA graph into an IR module.

```typescript
import { giaIrConvertor } from "./gia_ir";

const irModule = giaIrConvertor(giaGraph, true); // raw mode
```

**Parameters:**
- `gia: Graph` — Input GIA graph object
- `raw: true` — Raw conversion mode (currently only this mode is supported)

**Returns:** `IR_GraphModule` — Complete IR module

---

### `analyzeGraph(nodes, edges)` — Graph Structure Analysis

Analyzes directed graph structure, identifying chains, cycles, and isolated nodes. Uses Tarjan's algorithm to detect strongly connected components with a complexity of O(N+E).

```typescript
import { analyzeGraph, type ChainResult } from "./graph_chain_split";

const nodes = [1, 2, 3, 4, 5];
const edges: [number, number][] = [[1, 2], [2, 3], [3, 4], [2, 4]];
const result: ChainResult = analyzeGraph(nodes, edges);
```

**Parameters:**
- `nodes: number[]` — Array of node IDs
- `edges: [number, number][]` — Array of edges, format `[from, to]`

**Returns:** `ChainResult`

```typescript
interface ChainResult {
  single: number[];  // Isolated nodes (in-degree=0 and out-degree=0)
  chain: {
    starter: number;           // Starting point of the chain
    chains: number[][];        // Chains starting from the origin
    targets: (number | null)[]; // Merge point for each chain (or null for endpoint)
  }[];
  in_deg: Map<number, number>;  // In-degree map
  out_deg: Map<number, number>; // Out-degree map
}
```

**Core Concepts:**

| Concept | Definition |
| :--- | :--- |
| **Isolated Node** | Nodes with in-degree=0 and out-degree=0 |
| **Internal Node** | Nodes with in-degree=1 and out-degree=1 |
| **Starting Point (starter)** | Nodes with out-degree>0 and are not internal nodes |
| **Pure Cycle** | Isolated strongly connected components where all nodes have in-degree=1 and out-degree=1 |

---

### `RawIRModuleBuilder` — Raw IR Builder

The core class for converting GIA graphs to IR.

```typescript
class RawIRModuleBuilder {
  constructor(gia: Graph);
  
  build(): IR_GraphModule;  // Executes the complete build process
  
  // Internal methods
  initNodes();        // Initialize node map
  initFlows();        // Initialize execution flows
  addAnchor();        // Add branch merge anchor
  addBranch();        // Add branch node
  addSharedDecl();    // Add shared function declarations
  createAllChain();   // Create all execution chains
}
```

**Build Process:**

1. `initNodes()` — Traverses GIA nodes, creates IR node mapping
2. `initFlows()` — Analyzes execution flow edges, establishes flow relationships
3. `addAnchor()` — Creates anchors for multi-in-degree nodes
4. `addBranch()` — Creates branches for multi-out-degree nodes
5. `addSharedDecl()` — Identifies and extracts shared functions
6. `createAllChain()` — Organizes nodes into execution chains

---

## Helper Functions

| Function | Description |
| :--- | :--- |
| `ir_node(n: Node)` | Converts GIA Node to IR_Node |
| `ir_jump_to(target)` | Creates a jump node |
| `ir_call_shared(decl, port)` | Creates a shared function call |
| `nodes_to_execution_block(chains)` | Wraps node chains into execution blocks |
| `anchor_name(id)` | Generates anchor name |
| `branch_name(index)` | Generates branch name |

---

## Related Modules

- [Type Definitions](../types/readme.md) — IR structure definitions
- [Parser](../parser/readme.md) — DSL text parsing
- [GIA Generator](../../utils/gia_gen/readme.md) — GIA graph building tool