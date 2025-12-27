# Rules for Importing GIA Files in Genshin Impact
> File: [utils/gia_gen/id_collide.test.ts](/utils/gia_gen/id_collide.test.ts)

## Overview

This document describes the node validation rules when importing GIA (Genshin Impact Archive) files into the Genshin Impact game, and how to reverse engineer a complete list of node types using a collision detection method.

## Node Import Rules

Nodes require two identifiers: **Generic ID** and **Concrete ID**:

- **Incorrect Generic ID**: The node will be automatically deleted by the game
- **Incorrect Concrete ID**: The Concrete ID will be set to empty (`undefined`)

Based on these rules, we can explore all node types supported by the game through a collision detection method.

Additionally, there is an important rule: valid concrete classes must provide correct pins.

## Node Type Extraction Steps

The complete extraction process is implemented in `id_collide.test.ts` and consists of three steps:

### Step 1: Extracting Basic Types

**Goal**: Identify all valid Generic IDs and distinguish between single-type nodes and generic base nodes.

**Method**:
1. Generate test nodes: `[GenericB, ConcreteD] = [i, i] for i in range(0, 3000)`
2. Import the generated GIA file into the game, then re-export it
3. The game will automatically filter out invalid nodes, only retaining valid ones

**Result Analysis**:
- Read the exported `[B, D]` list
- **When D exists**: It indicates that B itself has no concrete classes, making it a **single-type node** (Basic)
- **When D does not exist**: It indicates that B has concrete classes, making it a **generic base node** (Generic)

**Output**:
- File: `./utils/node_data/ref/generic.txt`
- Format: Each line is `<ID>:Basic` or `<ID>:Generic`
- Statistics: A total of **427 nodes**
  - **57** Generic (generic base, has concrete classes)
  - **370** Basic (single-type node, no concrete classes)

---

### Step 2: Extracting Concrete Types

**Goal**: Find all valid Concrete IDs for each generic base class.

**Method**:
1. Read the 57 generic base IDs identified in Step 1
2. For each generic base B, generate test nodes:
   ```
   [GenericB, ConcreteD] = [B, i] for i in range(B + 1, B + 100)
   ```
3. After importing into the game and exporting, check which Concrete IDs are retained

**Implementation Details**:
- Use `generate_all_nodes(i, i, len)` to generate multiple concrete class candidates for each base class
- Determine the specific range of concrete classes supported by each base class through collision detection
- Concrete IDs are usually in a continuous range near the Generic ID

Problem: Difficult to implement without knowing tag positions. Manual setup required.

Parse dictionary?

**Output**:
- All valid Concrete IDs corresponding to each generic base class
- Can be used to build a complete node type hierarchy

### Step 3: Guessing Remaining Space

**Goal**: Discover potentially hidden node types or ID space reserved for future use.

**Observation**:
- Node IDs are generally **continuously distributed**
- If a blank ID range appears, it could be:
  - Special nodes not detected by Step 1 and Step 2
  - Game-reserved space for future expansion
  - Deprecated nodes that still retain their IDs

**Method**:
1. Analyze the ID distribution in `generic.txt`
2. Identify **gaps** in the ID sequence
3. Perform targeted collision tests on these gap intervals
4. Verify if these IDs are valid nodes not detected by conventional methods

**Notes**:
- Blank IDs will not be known basic types or derived base classes
- Exclude ID ranges already tested in Step 2
- Some gaps might be reserved internally by the game and cannot be validated through import

---

## Technical Implementation

### Core Functions

```typescript
// Generate test nodes
function generate_all_nodes(from: number, size: number, line_width: number, offsets: number): GraphNode[]

// Step 1: Create a full test graph
function create_graph(w: number, h: number, len: number)

// Step 1: Read the game-filtered results
function read_trimmed_graph()

// Step 2: Create concrete class tests for generic base classes
function create_derived(from: number, to: number, len: number)
```

### Usage Flow

1. **Run Step 1**:
   ```typescript
   create_graph(100, 30, 1);  // Generate 3000 test nodes
   // Manually import into the game and export as all_server_nodes_trim.gia
   read_trimmed_graph();      // Parse results to generate generic.txt
   ```

2. **Run Step 2**:
   ```typescript
   create_derived();  // Generate concrete class tests for all generic base classes
   // Manually import into the game and analyze results
   ```

3. **Analyze Step 3**:
   - Check for ID gaps in `generic.txt`
   - Perform supplementary tests on suspicious intervals

---

## Data Files

| File Path | Description |
|---------|-------------|
| `./utils/node_data/ref/generic.txt` | All Generic IDs and their type labels |
| `./utils/ref/all_server_nodes.gia` | Generated test GIA file |
| `./utils/ref/all_server_nodes_trim.gia` | Game-filtered GIA file |

---

## Summary

Through the three-step collision detection method, we can completely reverse engineer the type structure of the Genshin Impact node graph system:

1. **Step 1** identifies all base classes and whether they are generic
2. **Step 2** enumerates all concrete classes for each generic base class
3. **Step 3** discovers hidden or reserved node IDs

This method leverages the game's import validation mechanism to obtain complete node type information without decompilation.