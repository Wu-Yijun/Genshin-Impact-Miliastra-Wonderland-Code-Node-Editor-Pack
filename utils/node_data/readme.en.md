# Node Data and Definitions (`node_data`)

This directory contains all the **static definitions** and resource data required by the converter. This data is mainly used for node graph parsing, type inference, and reflection mechanisms.

**✅ Completed complete parsing and integration of server-side and client-side node graph data**

Resources are uniformly exported through `index.ts`, and some original definition files might be excluded during publishing.

---

## File Description

| File | Description | Size |
| :--- | :--- | :--- |
| [`index.yaml`](./index.yaml) / [`index.json`](./index.json) | Complete Data Summary | ~1MB |
| [`data.ts`](./data.ts) | Complete Data Summary (with type definitions) | ~1MB |
| [`node_id.ts`](./node_id.ts) | Node ID Mapping Table | ~220KB |
| [`node_pin_records.ts`](./node_pin_records.ts) | Node Pin Definition Records | ~190KB |
| [`enum_id.ts`](./enum_id.ts) | Enum ID and Value Definitions | ~15KB |
| [`types_list.ts`](./types_list.ts) | Variable Type Definition List | ~8KB |
| [`concrete_map.ts`](./concrete_map.ts) | Generic Node Type Mapping Table | ~11KB |
| [`helpers.ts`](./helpers.ts) | Helper Function Library | ~6KB |
| [`index.ts`](./index.ts) | Unified Export | ~1KB |

---

## Core Resources

### [index.yaml](./index.yaml) / [index.json](./index.json) / [data.ts](./data.ts)

**Complete Data Summary**

These three files contain identical data content, provided in different formats:
- `index.yaml` - YAML format, suitable for human readability and external tool processing
- `index.json` - JSON format, suitable for direct program parsing
- `data.ts` - TypeScript format, with complete type definitions, suitable for internal project use

#### Document Structure

```typescript
interface Document {
  Version: string;              // Data version number
  GameVersion: string;          // Game version number
  Author: string;               // Author
  Date: string;                 // Generation date
  Description: string;          // Document description
  Schema: string;               // TypeScript type definition source code
  TypesList: TypeEntry[];       // Type list
  NodesList: NodeEntry[];       // Node list
  EnumList: EnumEntry[];        // Server-side enum list
  ClientEnumList: EnumEntry[];  // Client-side enum list
  GraphConstList: GraphConst[]; // Fixed field value information for different node graphs
}
```

#### 1. TypesList - Type List

Contains complete definitions for all variable types (28 types):

```typescript
interface TypeEntry {
  Name: string;               // Safe name (e.g., "Print_String", "_3D_Vector_Addition")
  Translations: {             // Multi-language display name
    en: string;               // English name
    // ... Other languages
  };
  ID: number;                 // Server-side type ID (VarType enum value)
  ClientID: number | null;    // Client-side type ID (null means server-only, client has no such type)
  Expression: string;         // Type expression (e.g., "Int", "L<Ety>", "D<Key,Value>")
  DSLName: string;            // Type name in DSL
  BaseType: string;           // Runtime base type
  BaseTypeID: number;         // Base type ID
}
```

**Example**:
```yaml
- Name: Integer
  Translations:
    en: Integer
  ID: 3
  ClientID: 3
  Expression: Int
  DSLName: Int
  BaseType: IntBase
  BaseTypeID: 2
```

#### 2. NodesList - Node List

Contains complete definitions for all nodes (server-side 434(3077) + client-side 124(175)):

```typescript
interface NodeEntry {
  Name: string;                       // Safe name (e.g., "Print_String")
  Translations: { en: string };       // Multi-language display name
  ID: number;                         // Generic node ID
  Type: "Simple" | "Generic";         // Node type
  Range: "Server" | "Client";         // Applicable scope
  Class: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Others" | "Hidden";
  Family: string;                     // Node family (sub-category)
  Inputs: string[];                   // Input pin type list
  Outputs: string[];                  // Output pin type list
  ConcreteID?: number;                // Concrete ID for client non-reflective nodes
  TypeMappings?: TypeMapping[];       // Type mappings for generic nodes
}

interface TypeMapping {
  ConcreteId: number;                       // Concrete type ID
  Type: string;                             // Type mapping rule (e.g., "S<T:Int>")
  InputsIndexOfConcrete: (number | null)[]; // Type index of input pins, null for non-reflective pins
  OutputsIndexOfConcrete: (number | null)[]; // Type index of output pins, null for non-reflective pins
}
```

**Simple Node Example**:
```yaml
- Name: Print_String
  ID: 1
  Type: Simple
  Range: Server
  Class: Execution
  Family: I. Common Nodes
  Inputs: ["Str"]
  Outputs: []
```

**Generic Node Example**:
```yaml
- Name: Equal
  ID: 14
  Type: Generic
  Range: Server
  Class: Arithmetic
  Family: General
  Inputs: ["R<T>", "R<T>"]  # R<T> indicates reflective type
  Outputs: ["Bol"]
  TypeMappings:
    - ConcreteId: 14
      Type: S<T:Str>
      InputsIndexOfConcrete: [0, 0]  # Both inputs use type at index 0
      OutputsIndexOfConcrete: [null] # Output is not a reflective type
    - ConcreteId: 370
      Type: S<T:Int>
      InputsIndexOfConcrete: [5, 5]
      OutputsIndexOfConcrete: [null]
```

#### 3. EnumList - Server-side Enum List

Contains all server-side enum types and their values:

```typescript
interface EnumEntry {
  Name: string;                 // Enum name
  Translations: { en: string }; // Multi-language display name
  ID: number;                   // Enum ID
  Items: EnumItem[];            // Enum item list
}

interface EnumItem {
  Name: string;                 // Enum item name
  Translations: { en: string }; // Multi-language display name
  ID: number;                   // Enum item value
}
```

**Example**:
```yaml
- Name: Comparison_Operators
  ID: 1
  Items:
    - Name: Equal_To
      Translations:
        en: Equal To
      ID: 100
    - Name: Less_Than
      Translations:
        en: Less Than
      ID: 101
```

#### 4. ClientEnumList - Client-side Enum List

The structure is the same as `EnumList`, but it contains client-specific enum definitions. The `ID` field of client-side enums represents `indexOfConcrete`, used for type mapping.

#### Pin Type Expression Description

Type expressions used in `Inputs` and `Outputs`:

| Expression | Meaning | Example |
| :--- | :--- | :--- |
| `Int`, `Str`, `Bol` etc. | Concrete type | `Int` = Integer |
| `L<T>` | List type | `L<Int>` = List of Integers |
| `D<K,V>` | Dictionary type | `D<Int,Str>` = Dictionary of Integer to String |
| `E<N>` | Enum type | `E<1>` = Enum with ID 1 |
| `S<T:Type>` | Struct type | `S<T:Int>` = Struct containing an Integer |
| `R<T>` | Reflective type | Indicates that the pin type is determined by generic parameters |

#### Data Usage

- **External Tools**: Use `index.yaml` or `index.json` for node graph analysis, documentation generation, etc.
- **Internal Projects**: Use `data.ts` for type-safe data access
- **Completeness**: Contains complete information for all nodes, types, and enums, eliminating the need to query multiple files

### [node_pin_records.ts](./node_pin_records.ts)

**Node Pin Definition Records**

Contains detailed definitions for all **Reflective Nodes** and normal nodes.

```typescript
interface SingleNodeData {
  id: number;           // Generic node ID
  name: string;         // Node name
  inputs: NodePin[];    // Input pin list
  outputs: NodePin[];   // Output pin list
  reflectMap?: [number, number[]][]; // Mapping from concrete ID to type
}
```

### [node_id.ts](./node_id.ts)

**Node ID Mapping Table (Server-side + Client-side)**

Provides a complete mapping from node names to node IDs, including two complete sets of data for **server-side nodes** and **client-side nodes**.

#### Server-side Node ID (`NODE_ID`)

Server-side nodes use **numeric IDs**, ranging from `1` to `3877`.

```typescript
export const NODE_ID = {
  When_Entity_Is_Created: 1,
  Log_Message: 2,
  Add_Int: 100,
  Add_Float: 101,
  Add__Generic: 99, // Generic node
  // ... Total 3877 nodes
} as const satisfies { [key: string]: number };
```

#### Client-side Node ID (`CLIENT_NODE_ID`)

Client-side nodes use **string IDs**, starting from `200000`. Client-side node IDs have **three structures**:

##### 1. Ordinary Nodes (Non-Generic)

Format: `"{GenericId}"`

```typescript
Logical_AND_Operation: '200001',
Logical_OR_Operation: '200002',
Node_Graph_Begins: '200042',
```

##### 2. Generic Nodes (Generic)

- **Non-reflective nodes**: `"{GenericId} {ConcreteId}"`
- **Reflective nodes**: `"{GenericId}"`

```typescript
// Non-reflective generic nodes
Logical_AND_Operation__Generic: '200001 1',
Equal__Generic: '200006',

// Reflective generic nodes
Node_Graph_End_Boolean__Generic: '200000 0',
Query_Entity_by_GUID__Generic: '200023 1001',
```

##### 3. Concrete Type Nodes (Concrete with Type)

Format: `"{GenericId} {ConcreteId} {TypeName}"`

Type names use simplified expressions, for example:
- `S<T:Int>` - Single type Int
- `S<T:Flt>` - Single type Float
- `S<T:L<Int>>` - List type List<Int>
- `S<K:Int,V:Flt>` - Key-value pair type
- `S<T:E<0>>` - Enum type, index is 0

```typescript
Equal__Bool: '200006 11 S<T:Bol>',
Equal__Int: '200006 12 S<T:Int>',
Equal__Float: '200006 13 S<T:Flt>',
Get_Custom_Variable__List_Int: '200016 47 S<T:L<Int>>',
Data_Type_Conversion__Int_Bool: '200022 130 S<K:Int,V:Bol>',
Enumeration_Match__Comparison_Operators: '200005 10 S<T:E<0>>',
```

#### Key Differences Between Server-side and Client-side IDs

| Feature | Server-side (`NODE_ID`) | Client-side (`CLIENT_NODE_ID`) |
| :--- | :--- | :--- |
| **ID Type** | `number` | `string` |
| **ID Range** | `1` ~ `3877` | `200000` ~ `200124+` |
| **Total Nodes** | 3877 | 407 |
| **ID Structure** | Single number | 1-3 part string |
| **Type Information** | Not included | Includes type expression |
| **Purpose** | Server-side node graph | Client-side node graph |

### [enum_id.ts](./enum_id.ts)

**Enum ID and Value Definitions**

```typescript
export const ENUM_ID = {
  Comparison_Operators: 1,
  Rounding_Mode: 2,
  // ...
} as const;

export const ENUM_VALUE = {
  ComparisonOperators_EqualTo: 0,
  ComparisonOperators_NotEqualTo: 1,
  // ...
} as const;
```

### [types_list.ts](./types_list.ts)

**Variable Type Definition List**

Defines all available variable types and their properties in the system.

```typescript
interface TypeDef {
  id: number;      // VarType enum value
  name: string;    // Internal name
  display: string; // Display name
  expr: string;    // Expression (e.g., "L<Int>")
  dsl: string;     // DSL name
}
```

### [concrete_map.ts](./concrete_map.ts)

**Generic Node Type Mapping Table**

Defines the index order of generic node pins under different type selections.

```typescript
interface ConcreteMap {
  maps: number[][];  // Type ID list
  pins: Map<string, number>; // "nodeId:pinType:pinIndex" → mapIndex
}
```

---

## Helper Functions (`helpers.ts`)

### Type Mapping Functions

| Function | Description |
| :--- | :--- |
| `get_index_of_concrete(generic_id, is_input, pin_index, type)` | Get the concrete type index of a generic pin |
| `get_concrete_type(generic_id, is_input, pin_index, index)` | Get the concrete type by index |
| `get_concrete_map(generic_id, is_input, pin_index)` | Get the type mapping table for a pin |
| `is_concrete_pin(generic_id, is_input, pin_index)` | Determine if it is a reflective pin |

### Node Record Functions

| Function | Description |
| :--- | :--- |
| `get_node_record(concrete_id)` | Get node record by concrete ID |
| `get_node_record_generic(generic_id)` | Get node record by generic ID |
| `get_generic_id(concrete_id)` | Convert concrete ID to generic ID |
| `is_generic_id(id)` | Check if it is a valid generic ID |

### Node Name Query Functions

#### Server-side Nodes

| Function | Description |
| :--- | :--- |
| `get_server_node_name_from_cid(cid: number)` | Get node name from server-side concrete ID |
| `get_server_node_name_from_gid(gid: number)` | Get node name from server-side generic ID |

#### Client-side Nodes

| Function | Description |
| :--- | :--- |
| `get_client_node_name_from_cid(cid: string)` | Get node name from client-side concrete ID |
| `get_client_node_name_from_gid(gid: number)` | Get node name from client-side generic ID |

#### Common Functions

| Function | Description |
| :--- | :--- |
| `get_node_name_from_cid(id: number \| string)` | Automatically identify server-side/client-side, get node name by concrete ID |
| `get_node_name_from_gid(id: number)` | Automatically identify server-side/client-side, get node name by generic ID |

---

## Usage Examples

### Query Server-side Node Information

```typescript
import { NODE_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);

console.log(record?.name);    // "Log_Message"
console.log(record?.inputs);  // Input pin list
console.log(record?.outputs); // Output pin list
```

### Query Client-side Node Information

```typescript
import { CLIENT_NODE_ID, get_node_record } from "./node_data";

// Ordinary node
const id1 = CLIENT_NODE_ID.Logical_AND_Operation; // '200001'
const record1 = get_node_record(id1);

// Generic node
const id2 = CLIENT_NODE_ID.Equal__Generic; // '200006'
const record2 = get_node_record(id2);

// Concrete type node
const id3 = CLIENT_NODE_ID.Equal__Int; // '200006 12 S<T:Int>'
const record3 = get_node_record(id3);
```

### Query Node Name

```typescript
import { 
  get_node_name_from_cid, 
  get_node_name_from_gid,
  get_server_node_name_from_cid,
  get_client_node_name_from_cid
} from "./node_data/helpers";

// Automatically identify server-side/client-side
const name1 = get_node_name_from_cid(100);        // "Add_Int" (Server-side)
const name2 = get_node_name_from_cid('200001 1'); // "Logical_AND_Operation__Generic" (Client-side)

// Query by generic ID
const name3 = get_node_name_from_gid(99);  // "Add__Generic" (Server-side)
const name4 = get_node_name_from_gid(200001); // "Logical_AND_Operation" (Client-side)

// Explicitly specify server-side/client-side
const serverName = get_server_node_name_from_cid(100);
const clientName = get_client_node_name_from_cid('200001');
```

### Query Enum Value

```typescript
import { ENUM_ID, ENUM_VALUE } from "./node_data";

const enumType = ENUM_ID.Comparison_Operators;
const equalTo = ENUM_VALUE.ComparisonOperators_EqualTo;
```

### Handling Generic Nodes

```typescript
import { get_index_of_concrete, get_generic_id } from "./node_data/helpers";
import { VarType } from "./types_list";

// Get the generic ID of Add_Int
const genericId = get_generic_id(NODE_ID.Add_Int);

// Get type index
const typeIndex = get_index_of_concrete(genericId, true, 0, VarType.Int, true);
```

---

## Data Source and Generation Process

### Data Extraction

All node data is extracted from game assemblies using scripts in the `extracting_nodes` directory:

- **Server-side node data**: Extracted from server-side assemblies, containing 3877 nodes
- **Client-side node data**: Extracted from client-side assemblies, containing 407 nodes

### Data Processing

The extracted raw data undergoes the following processing steps:

1. **Manual Cleanup and Validation**: Correct errors and inconsistencies during extraction
2. **Structured Integration**: Unify data formats and establish relationships between nodes
3. **Type Mapping Generation**: Generate complete type mapping tables for generic nodes
4. **Index Building**: Generate efficient query indexes and auxiliary data structures

### Integrated Generation

The `gen_index.ts` script is used to centralize and generate all processed data into the final export files:

- `node_id.ts` - Server-side and client-side node ID mapping
- `node_pin_records.ts` - Node pin definitions
- `concrete_map.ts` - Generic type mapping
- `enum_id.ts` - Enum definitions
- `types_list.ts` - Type list
- `index.yaml` / `index.json` - Complete data summary

> **Note**: Other files in this directory (in the dev version) are intermediate products or source files from the generation process and are not included in the published version.

---

## Related Modules

- [GIA Generator](../gia_gen/readme.en.md) — Builds graphs using node data
- [Protobuf Tools](../protobuf/readme.en.md) — GIA file encoding and decoding
- [Main README](../readme.en.md) — Overview of the tool library