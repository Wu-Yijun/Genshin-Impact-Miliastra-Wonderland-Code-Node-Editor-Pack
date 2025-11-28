# NodePinsRecords 与类型系统说明文档
> 文件: [utils/gia_gen/nodes.ts](/utils/gia_gen/nodes.ts)

## 1. 概述

**NodePinsRecords** 是一套用于定义“带可扩展引脚类型（pin types）的节点模板”的最简数据结构。
它主要服务于：**在图编辑器或可视化脚本系统中，支持泛型节点（Generic Nodes）**。

其核心思想：

* **每个节点模板只保存最小必要信息：**

  * `inputs`: 输入引脚的类型表达式 `NodeType[]`
  * `outputs`: 输出引脚的类型表达式 `NodeType[]`
  * `id`: 该节点“基础版本”的 ID
* 如果节点可泛化（例如 `Map<Key, Value>`、`Filter<T>` 等），则提供：

  * `reflectMap`: **定义特化实例（Specialization）的映射表**
    它描述：当泛型参数替换为某种结构后 → 对应游戏中实际使用的“派生节点 ID”。

例如，一个“字典查找（`DictGet<Key, Value>`）”节点可以通过替换 `Key` 和 `Value` 两个反射参数，生成多个不同的实际节点 ID。



## 2. NodeType：类型表达式语言

代码实现了一个简洁但可表达足够信息的类型系统，其语法形式：

| 形式          | 含义                           |  表达式      |
| -----------   | ---------------------------- |--------     | 
| `b`         | 基础类型                         |`Type`      |
| `e<id>`     | 枚举类型（EnumId）                 |`E<Num>`     | 
| `l<i>`      | 列表（List）                     |`L<T1>`      | 
| `d<k,v>`    | 字典（Dict）                     |`D<T1,T2>`   | 
| `s<fields>`  | 结构体（Struct）                  |`S<nm1:T1,nm2:T2,...>`| 
| `r<name>`      |  *反射占位符（Reflect Placeholder）* |`R<name>`    | 

### 2.1 Basic Types

使用紧凑的三字母缩写：

```
Int, Flt, Bol, Str, Vec, 
Gid, Ety, Pfb, Fct, Cfg
```

这部分固定映射到游戏内部类型，例如：

* `Int` → Integer
* `Gid` → GUID
* `Vec` → Vector3d

### 2.2 Reflect 类型：泛型参数

```
R<T>
```

这里的 `T` 为一个可替换的参数名。例如：

* `R<Key>`
* `R<Value>`
* `R<Item>`

它代表一个“未绑定的类型变量”，在泛型节点实例化时会被实际类型替换。



## 3. stringify / parse：可序列化类型表达式

类型表达式可用类似模板语法表示，例如：

```
L<Int>
D<Str,Flt>
S<x:Int,y:Flt>
L<S<a:Gid,b:R<Key>>>
```

* `stringify(type)`：将 AST → 字符串表达式
* `parse(str)`：将字符串表达式 → AST

两者可互相检验，保证类型定义可读、可检索、可存档、可调试。

泛类节点定义也可用类似模板语法表示，例如：
```ts
NodePinsRecords = {
  id: 1,
  inputs: ["D<R<Key>,R<Value>>"],
  outputs: ["L<R<Key>>"],
  reflectMap: [ [1, "S<R:Int,Value:Flt>", 103] ]
}

1|D<R<Key>,R<Value>>|L<R<Key>>|1&S<R:Int,Value:Flt>&103
```
* `to_string(records)`：将 NodePinsRecords → 字符串表达式
* `to_records(str)`：将字符串表达式 → NodePinsRecords

两者可互相转化，保证类型定义可通过单一变量形式表示。

## 4. 泛型展开：reflect() 与 reflects()

### 4.1 reflect()

```
reflect(node: NodeType, ref: [name, NodeType]) → NodeType
```

用于将某一个泛型参数替换为实际类型，例如：

```ts
reflect(R<Key>, ["Key", "Int"])
→ Int
```

结构会深度递归展开：

```ts
reflect(
  S<a:R<Key>, b:L<R<Value>>>,
  ["Value", "Str"]
)
→ S<a:R<Key>, b:L<Str>>
```

### 4.2 reflects()

支持多个参数逐一替换：

```ts
reflects(node, [
  ["Key", Int],
  ["Value", Flt]
])
```

## 5. NodePinsRecords：泛型节点的定义格式

结构如下：

```ts
interface NodePinsRecords {
  inputs:  NodeType[];
  outputs: NodeType[];
  id: NodeId;

  reflectMap?: NodeReflectRecords[];
}
```

### 5.1 非泛型节点

当 `reflectMap` 缺失时，该节点为“固定类型”的节点，不得展开。例如：

```
inputs:  [Int, Str]
outputs: [Bol]
id: 17
```

### 5.2 泛型节点（Generic Node）

例如：

```
inputs:  [ D<R<Key>, R<Value>> ]
outputs: [ L<R<Key>> ]
```

此节点允许用户为 `Key` 和 `Value` 选择任意类型组合。

为了将其映射到游戏内部的真实节点，需要 `reflectMap`：

```
reflectMap: [
  [ index, "S<Key:Int,Value:Flt>",    nodeId1 ],
  [ index, "S<Key:Str,Value:Cfg>",    nodeId2 ],
  ...
]
```

其中：

* `"S<Key:Int,Value:Flt>"` 是一种特化
* `nodeIdX` 是游戏中对应的“具体版本”节点 ID



## 6. reflects_records(): 将泛型节点实例化为具体节点

```
reflects_records(rec, refs)
```

行为：

1. 根据 `refs`（结构表达式）在 `reflectMap` 中查找对应 nodeId
2. 将模板 inputs / outputs 中所有反射变量展开
3. 输出最终 NodePins 结构：

```ts
{
  inputs: [...expanded],
  outputs: [...expanded],
  id: mappedNodeId
}
```

示例（伪）：

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

产出：

```
inputs:  [ D<Int, Flt> ]
outputs: [ L<Int> ]
id: 10
```



## 7. unwrap_records(): 展开所有特化版本

当需要“列出所有已支持的具体节点”时：

```
unwrap_records(rec)
```

返回：

```
[
  {inputs:..., outputs:..., id:id1},
  {inputs:..., outputs:..., id:id2},
  ...
]
```

即从：

`reflectMap[]` → 批量生成所有具体节点。



## 8. get_id / get_type：类型与内部 ID 的映射

这两函数处理系统内部固定类型和运行时类型 ID 的来回转换：

* `get_type(id)`：将游戏内部类型 ID → 类型表达式
* `get_id(type)`：反向映射，常用于序列化或兼容旧系统

这些值多数为系统固化，不建议修改。



# 总结

**NodePinsRecords 提供了一个用于定义“泛型节点模板”的轻量结构，通过：**

1. **类型表达式系统（NodeType）**
   可表达列表、字典、结构体与反射参数等丰富类型。

2. **stringify / parse**
   提供人类可读 / 可存档的类型表达式形式。

3. **to_string / to_records**
   将完整泛类节点类型声明转为单一字符串以便储存 / 从字符串还原为完整泛类节点类型声明。

4. **reflect / reflects**
   支持深度的泛型展开。

5. **reflectMap**
   链接“泛型节点特化”与“游戏内部真实节点 ID”。

6. **reflects_records 与 unwrap_records**
   支持按需生成某一特化节点，或批量展开所有特化实例。

这套系统使得游戏节点图（Node Graph）可以只定义一次泛型逻辑，并根据不同类型组合自动生成多个具体节点版本，减少重复代码与节点表膨胀。
