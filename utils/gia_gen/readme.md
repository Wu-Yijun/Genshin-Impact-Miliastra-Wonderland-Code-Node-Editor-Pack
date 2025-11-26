# GIA Generator (gia_gen)

`gia_gen` 是一个用于快速生成和操作 GIA 节点图文件的工具库。它旨在通过简单的接口简化复杂的节点图结构的创建过程。

## 已实现功能 (Implemented Features)

目前主要提供了一系列生成函数，用于通过少量参数快速创建节点图的各个组件。

### 基础组件生成 (Basic Helpers)

**所有生成函数均通过 `gia` 空间导出。函数接口通过 `Gia` 空间导出**

本模块提供了一组用于 **快速构造图(Graph)**、**节点(Node)**、**引脚(Pin)** 与 **各种 Value** 的辅助函数。
整体设计遵循：
**从高层到低层、从类型驱动到原始构造** 的“多层封装”结构。

#### 0. 图级构造器

用于最终生成一个完整 Graph（含多个节点）。

***API***

* `graph_body(body: { uid: number; graph_id: number; graph_name?: string; nodes?: GraphNode[]; } ): Root`

适用于将构建好的节点列表封装为一个GIA图对象。


#### 1. 高层：基于 NodeType 的自动构造（推荐方式）

这些函数基于 `NodeType` / `NodePins` 元数据自动生成节点及引脚，是高层的封装方式。

**API**

* `node_type_node_body(body: { node: NodePins, ... }): GraphNode`
  根据 `NodePins` 与 `TypeConcreteMap` 自动推导节点，并生成所有引脚。

* `node_type_pin_body(body: { type: NodeType, ... }): NodePin`
  基于 `NodeType` 信息构建单个引脚。

**适用场景**

适用于已有完整节点类型定义时的**常规节点创建**，自动化程度最高。

#### 2. 中层：手动构造节点与引脚（不依赖 NodeType）

用于需要完全控制节点结构，或类型数据不完整的场景。

**API**

* `node_body(body: NodeBody_): GraphNode`
* `pin_body(body: PinBody_): NodePin`
* `any_pin_body(body: AnyPinBody_): NodePin`
* `map_pin_body(body: MapPinBody_): NodePin`
* `list_pin_body(body: ListPinBody_): NodePin`

**特点**

* 需要手动指定 `VarType`
* 可灵活构建 Map / List / 普通 Pin


#### 3. 低层：构建 Value（VarBase）

提供各种 VarBase 值构造器，供引脚使用。

**API**

* `int_pin_body(val: number): VarBase`
* `float_pin_body(val: number): VarBase`
* `bool_pin_body(val: number | boolean): VarBase`
* `string_pin_body(val: string): VarBase`
* `vector_pin_body(vec: number[]): VarBase`
* `id_pin_body(val: number, type?: VarType): VarBase`
* `pin_value(body: PinValue_): VarBase`
* `enum_value(body: EnumValue_)`

**特点**

* 最底层构造器
* 被各级引脚函数调用


## 典型示例（仅示意）

```ts
import {
  node_type_node_body,
  graph_body,
  int_pin_body,
} from "./builder";

const node = node_type_node_body({
  node: MyNodeTypeDef,
  map: MyTypeMap,
  x: 100,
  y: 200,
});

node.pins[0].value = int_pin_body(42);

const graph = graph_body({
  uid: 1,
  graph_id: 99,
  nodes: [node],
});
```

---

## 设计理念

* **多层封装**：从自动化到手动，适应不同精度需求
* **强类型**：所有构造均依赖明确的 interface 和 VarType 枚举
* **可扩展**：节点、引脚、值类型均可自由拓展

### 工具函数 (Utils)

*   `gia.random_int(len, starting)`: 生成指定长度的随机整数(支持1-16位数字)，支持指定起始字符串。(用于生成合法 ID)

## 使用示例 (Usage)

```typescript
import { gia } from "./index.ts";

// 创建节点列表
const nodes = [];
nodes.push(gia.basic_node_body({
  generic_id: 123,
  concrete_id: 123,
  x: 0,
  y: 0,
}));

// 创建图
const graph = gia.basic_graph_body({
  uid: 201123456,
  graph_id: 1021234567,
  nodes: nodes,
});

console.log(graph);
```

更多示例请参考 `test.ts`。

## 待实现功能 (Planned Features)

以下功能正在开发计划中：

- [ ] **类管理节点图 (Class-based Graph Management)**
    - [ ] 包装上述 Helper，提供面向对象的 `GraphManager` 类。
    - [ ] 提供更高级的接口来管理图的生命周期。

- [ ] **修改现有节点图 (Modify Existing Graphs)**
    - [ ] 加载现有 GIA 文件并进行修改。
    - [ ] 支持增删改查节点和连接。

- [ ] **高级操作方法 (Advanced Methods)**
    - [ ] **连接节点**: 提供 `connect(nodeA, pinA, nodeB, pinB)` 方法，自动处理引脚连接逻辑。
    - [ ] **设置参数**: 提供便捷方法修改节点或引脚的特定参数，无需手动遍历深层结构。

- [ ] **结构体管理 (Structure Management)**
    - [ ] 创建、管理和使用自定义结构体 (Structs)。
    - [ ] 提供结构体定义的 Helper。
