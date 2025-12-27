# NodePinsRecords and Type System Documentation
> File: [utils/gia_gen/nodes.ts](/utils/gia_gen/nodes.ts)

## 1. Overview

**NodePinsRecords** is a minimal data structure used to define "node templates with extensible pin types".
Its main purpose is to: **support Generic Nodes in graph editors or visual scripting systems**.

Its core concept:

* **Each node template only stores the minimum necessary information:**

  * `inputs`: Type expressions for input pins `NodeType[]`
  * `outputs`: Type expressions for output pins `NodeType[]`
  * `id`: The ID of this node's "base version"
* If the node can be generic (e.g., `Map<Key, Value>`, `Filter<T>`, etc.), then provide:

  * `reflectMap`: **A mapping table that defines Specialization instances**
    It describes: when generic parameters are replaced with a certain structure → the corresponding "derived node ID" actually used in the game.

For example, a "dictionary lookup" (`DictGet<Key, Value>`) node can generate multiple different actual node IDs by replacing the two reflection parameters `Key` and `Value`.

## 2. NodeType: Type Expression Language

The code implements a concise but sufficiently expressive type system, with the following syntax forms:

| Form          | Meaning                     | Expression           |
| -----------   | --------------------------- |----------------------|
| `b`         | Basic Type                  | `Type`               |
| `e<id>`     | Enum Type (EnumId)          | `E<Num>`             |
| `l<i>`      | List                        | `L<T1>`              |
| `d<k,v>`    | Dictionary (Dict)           | `D<T1,T2>`           |
| `s<fields>`  | Struct                      | `S<nm1:T1,nm2:T2,...>`|
| `r<name>`      | *Reflect Placeholder*       | `R<name>`            |

### 2.1 Basic Types

Using compact three-letter abbreviations:

```
Int, Flt, Bol, Str, Vec, 
Gid, Ety, Pfb, Fct, Cfg
```

This part is fixedly mapped to internal game types, for example:

* `Int` → Integer
* `Gid` → GUID
* `Vec` → Vector3d

### 2.2 Reflect Type: Generic Parameters

```
R<T>
```

Here, `T` is a replaceable parameter name. For example:

* `R<Key>`
* `R<Value>`
* `R<Item>`

It represents an "unbound type variable" that will be replaced by actual types when a generic node is instantiated.

## 3. stringify / parse: Serializable Type Expressions

Type expressions can be represented using a template-like syntax, for example:

```
L<Int>
D<Str,Flt>
S<x:Int,y:Flt>
L<S<a:Gid,b:R<Key>>>
```

* `stringify(type)`: Converts AST → string expression
* `parse(str)`: Converts string expression → AST

Both can be mutually verified, ensuring type definitions are readable, searchable, archivable, and debuggable.

Generic node definitions can also be represented using a template-like syntax, for example:
```ts
NodePinsRecords = {
  id: 1,
  inputs: ["D<R<Key>,R<Value>>"],
  outputs: ["L<R<Key>>"],
  reflectMap: [ [1, "S<R:Int,Value:Flt>", 103] ]
}

1|D<R<Key>,R<Value>>|L<R<Key>>|1&S<R:Int,Value:Flt>&103
```
* `to_string(records)`: Converts NodePinsRecords → string expression
* `to_records(str)`: Converts string expression → NodePinsRecords

Both can be mutually converted, ensuring type definitions can be represented in a single variable form.

## 4. Generic Expansion: reflect() and reflects()

### 4.1 reflect()

```
reflect(node: NodeType, ref: [name, NodeType]) → NodeType
```

Used to replace a generic parameter with an actual type, for example:

```ts
reflect(R<Key>, ["Key", "Int"])
→ Int
```

The structure will be deeply and recursively expanded:

```ts
reflect(
  S<a:R<Key>, b:L<R<Value>>>,
  ["Value", "Str"]
)
→ S<a:R<Key>, b:L<Str>>
```

### 4.2 reflects()

Supports replacing multiple parameters one by one:

```ts
reflects(node, [
  ["Key", Int],
  ["Value", Flt]
])
```

## 5. NodePinsRecords: Definition Format for Generic Nodes

The structure is as follows:

```ts
interface NodePinsRecords {
  inputs:  NodeType[];
  outputs: NodeType[];
  id: NodeId;

  reflectMap?: NodeReflectRecords[];
}
```

### 5.1 Non-Generic Nodes

When `reflectMap` is missing, this node is a "fixed-type" node and must not be expanded. For example:

```
inputs:  [Int, Str]
outputs: [Bol]
id: 17
```

### 5.2 Generic Node

For example:

```
inputs:  [ D<R<Key>, R<Value>> ]
outputs: [ L<R<Key>> ]
```

This node allows users to select any type combination for `Key` and `Value`.

To map it to actual nodes within the game, `reflectMap` is required:

```
reflectMap: [
  [ index, "S<Key:Int,Value:Flt>",    nodeId1 ],
  [ index, "S<Key:Str,Value:Cfg>",    nodeId2 ],
  ...
]
```

Where:

* `"S<Key:Int,Value:Flt>"` is a specialization
* `nodeIdX` is the corresponding "concrete version" node ID in the game

## 6. reflects_records(): Instantiating Generic Nodes into Concrete Nodes

```
reflects_records(rec, refs)
```

Behavior:

1. Find the corresponding nodeId in `reflectMap` based on `refs` (structure expression)
2. Expand all reflection variables in the template's inputs / outputs
3. Output the final NodePins structure:

```ts
{
  inputs: [...expanded],
  outputs: [...expanded],
  id: mappedNodeId
}
```

Example (pseudo):

```ts
reflects_records(
  {
    inputs: [ "D<R<Key>", "R<Value>>" ],
    outputs:[ "L<R<Key>>" ],
    id:1,
    reflectMap:[
      [3,"S<Key:Int,Value:Flt>",10]
    ]
  },
  "S<Key:Int,Value:Flt>"
)
```

Output:

```
inputs:  [ D<Int, Flt> ]
outputs: [ L<Int> ]
id: 10
```

## 7. unwrap_records(): Unwrap All Specialization Versions

When needing to "list all supported concrete nodes":

```
unwrap_records(rec)
```

Returns:

```
[
  {inputs:..., outputs:..., id:id1},
  {inputs:..., outputs:..., id:id2},
  ...
]
```

That is, from:

`reflectMap[]` → batch generate all concrete nodes.

## 8. get_id / get_type: Mapping between Types and Internal IDs

These two functions handle the two-way conversion between system internal fixed types and runtime type IDs:

* `get_type(id)`: Converts game internal type ID → type expression
* `get_id(type)`: Inverse mapping, often used for serialization or compatibility with older systems

Most of these values are system-hardcoded and are not recommended for modification.

# Summary

**NodePinsRecords provides a lightweight structure for defining "generic node templates", by means of:**

1. **Type Expression System (NodeType)**
   Capable of expressing rich types such as lists, dictionaries, structs, and reflection parameters.

2. **stringify / parse**
   Provides human-readable / archivable forms for type expressions.

3. **to_string / to_records**
   Converts complete generic node type declarations into a single string for storage / restores complete generic node type declarations from a string.

4. **reflect / reflects**
   Supports deep generic expansion.

5. **reflectMap**
   Links "generic node specializations" with "internal game actual node IDs".

6. **reflects_records and unwrap_records**
   Supports on-demand generation of a specific specialized node, or batch expansion of all specialized instances.

This system allows the game Node Graph to define generic logic only once and automatically generate multiple concrete node versions based on different type combinations, reducing duplicate code and node table bloat.