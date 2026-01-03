<div align="center">

# 遗留节点图系统架构参考文档
**Legacy Node Graph System Architecture Reference**

| 文档版本 | 日期 | 状态 | 适用范围 |
| :---: | :---: | :---: | :---: |
| 1.0.0 | 2026-01-02 | 正式版 | .gia 文件解析 / 系统重构 / 数据迁移 |

</div>

这份文档旨在为工具开发者、系统架构师提供关于该遗留系统的“真理之源”。它剥离了混乱的原始命名，使用经过我们语义化重构后的术语，同时也保留了对原始数据特征的解释。

数据文件参见 [utils/protobuf/gia.proto](../../utils/protobuf/gia.proto)

## 目录

- [1. 绪论 (Introduction)](#1-绪论-introduction)
  - [1.1 系统综述](#11-系统综述)
  - [1.2 核心设计哲学](#12-核心设计哲学)
  - [1.3 关键术语表 (Terminology)](#13-关键术语表-terminology)
- [2. 资源与资产系统 (Resource & Asset System)](#2-资源与资产系统-resource--asset-system)
  - [2.1 资产包结构 (AssetBundle Structure)](#21-资产包结构-assetbundle-structure)
  - [2.2 全局标识符系统 (ResourceLocator)](#22-全局标识符系统-resourcelocator)
- [3. 节点模型架构 (Node Architecture)](#3-节点模型架构-node-architecture)
  - [3.1 外壳-内核分离模式 (The Shell-Kernel Model)](#31-外壳-内核分离模式-the-shell-kernel-model)
  - [3.2 复合与接口节点 (NodeInterface)](#32-复合与接口节点-nodeinterface)
  - [3.3 客户端代理机制 (Client Proxy Mechanism)](#33-客户端代理机制-client-proxy-mechanism)
- [4. 图逻辑与执行流 (Graph Execution Logic)](#4-图逻辑与执行流-graph-execution-logic)
  - [4.1 图容器结构 (The Graph Container)](#41-图容器结构-the-graph-container)
  - [4.2 执行入口与触发槽 (Entry Points & Slots)](#42-执行入口与触发槽-entry-points--slots)
  - [4.3 信号与事件系统 (Signal & Event System)](#43-信号与事件系统-signal--event-system)
- [5. 类型与数值系统 (Type & Value System)](#5-类型与数值系统-type--value-system)
  - [5.1 双重类型映射 (Dual Type System)](#51-双重类型映射-dual-type-system)
  - [5.2 递归数值容器 (TypedValue / VarBase)](#52-递归数值容器-typedvalue)
  - [5.3 泛型实例化元数据 (DynamicTypeMetadata)](#53-泛型实例化元数据-dynamictypemetadata)
- [6. 结语](#6-结语)

## 1. 绪论 (Introduction)

### 1.1 系统综述

本系统是一套基于 **Client-Server (C/S) 分离架构** 的可视化逻辑脚本系统。与传统的单机节点图不同，该系统虽然在统一的编辑器中进行创作，但在运行时被严格划分为两个独立的执行环境：

1. **后端逻辑环境 (Server Runtime)**：负责权威游戏逻辑、状态管理、数据库读写。
2. **前端表现环境 (Client Runtime)**：负责 UI 渲染、本地预测运算、以及通过 RPC 代理与服务器通信。

该系统的数据载体为 `.gia` (Genshin Impact Assets) 文件。这不仅仅是一个单一的图文件，而是一个**自包含的资产包 (Asset Bundle)**，包含了主逻辑及其运行所需的所有依赖定义（如动态生成的信号存根、结构体定义等）。

### 1.2 核心设计哲学

在对导出数据的逆向分析中，我们识别出该系统遵循以下三个核心设计原则：

* **外壳与内核分离 (Shell-Kernel Separation)**：
  * **Shell (外壳)**：定义节点的 UI 外观（引脚布局、名称）。位于客户端资源中。
  * **Kernel (内核)**：定义节点的底层实现（C++ 函数指针）。位于双端引擎中。
  * **多态映射**：一个 Shell 可以通过**约束求解**映射到不同的 Kernel（例如 `Add` 节点根据类型选择映射到 `Add_Int` 或 `Add_Float`）。


* **强类型契约与泛型容器 (Strong Contract via Generics)**：
  * 系统基于 Protobuf 进行严格序列化。
  * 为了在静态类型系统中支持动态逻辑，系统设计了一套递归的 **数值系统 (`TypedValue`)**，支持 List、Map、Struct 的任意嵌套，并通过元数据（Metadata）在空值状态下维持类型信息。


* **接口代理模式 (Interface Proxy)**：
  * 对于子图调用、信号发送、结构体操作，系统不直接暴露内部逻辑，而是通过 **复合节点定义 (`NodeInterface`)** 生成一个标准的节点外壳。这使得所有复杂操作在编辑器中看起来都像是一个普通节点。



### 1.3 关键术语表 (Terminology)

| 术语 | 定义 |
| --- | --- |
| **AssetBundle** | 单个 `.gia` 文件，包含主资源和所有依赖项。 |
| **ResourceLocator** | 系统的核心索引键，通过 Origin/Category/Kind 三维坐标唯一确定一个资源。 |
| **Shell** | 节点的 UI 定义 ID。 |
| **Kernel** | 节点的执行逻辑 ID。 |
| **Stub** | 系统自动生成的“假”节点，用于充当 RPC 发送端或结构体访问器。 |
| **Blackboard** | 图内部的局部变量池，部分变量可暴露给外部作为参数。 |
| **TypedValue** | 带有类型元数据的通用数值容器。 |

---

## 2. 资源与资产系统 (Resource & Asset System)

本章详细阐述数据的物理存储格式 (`.gia`) 以及全系统通用的资源寻址机制。

### 2.1 资产包结构 (AssetBundle Structure)

`.gia` 文件本质上是一个**依赖闭包**。它确保了当加载一个逻辑图时，它所引用的所有动态定义（这些定义可能不存在于静态代码中）都能被正确解析。

#### 2.1.1 物理结构

一个标准的 `AssetBundle` 包含以下部分：

1. **Primary Resource (主资源)**：
    * 该文件的核心内容。通常是一个 `NodeGraph`（如角色技能逻辑）或 `StructureDefinition`（结构体定义）。
    * 编辑器打开文件时，加载并显示的就是这个对象。
2. **Dependencies (依赖池)**：
    * **定义**：一个 `ResourceEntry` 列表。
    * **内容**：包含了主资源引用的所有 **非静态资源**。
    * **典型案例**：
        * 当主图中使用了一个“发送信号 `PlayerDead`”的节点时，系统中会自动生成一个对应的 **RPC 存根 (Stub)** 定义，并将其序列化保存在这个依赖池中。
        * 当主图中使用了用户自定义的结构体时，结构体的定义也会被打包在此。
3. **Metadata (元数据)**：
    * 包含容性检查。



#### 2.1.2 包装器与版本兼容 (Legacy Wrappers)

在原始数据中，存在 `NodeGraphWrapper` 等多层嵌套结构。

* **目的**：这是为了在 Protobuf 的 `oneof` 特性下实现类型擦除，并提供未来添加通用头信息（如加密位）的缓冲层。
* **新系统处理**：在逻辑层面，我们将直接访问 `ResourceEntry.payload`，忽略中间的 Wrapper 层级。

### 2.2 全局标识符系统 (ResourceLocator)

这是整个系统的神经中枢。所有资源（无论是图、节点定义、还是具体的实体）都通过一个 **三维坐标系** 进行定位。

#### 2.2.1 寻址三维坐标

一个合法的资源 ID 由以下三个枚举共同决定：

1. **Origin (来源域)**：定义资源的**所有权**。
  * `USER_DEFINED (10000)`: 策划/开发者创建的动态资产（存在于数据库/文件）。
  * `SYSTEM_DEFINED (10001)`: 程序硬编码的静态资产（存在于代码/只读数据段）。
2. **Category (服务域)**：定义负责处理该资源的**引擎子系统**。
  * 这是加载时的分发器。例如：
    * `SERVER_BASIC (20000)`  发送给后端逻辑引擎。
    * `CLIENT_SKILL (20002)`  发送给前端技能系统。
    * `CLIENT_FILTER (20001)`  发送给前端判定系统。
3. **AssetKind (原型域)**：定义数据的**物理存储结构**。
  * 它告诉反序列化器应该用哪个 `message` 结构来解析 `payload`。
    * `CUSTOM_GRAPH (21001)`  解析为 `NodeGraph`。
    * `SYS_CALL_STUB (22000)`  解析为 `NodeInterface` (RPC 存根)。


#### 2.2.2 双重 ID 语义：GUID vs LogicID

在 `ResourceLocator` 中，存在两个 ID 字段，它们的含义截然不同，混用会导致严重错误：

| 字段名 (Refined) | 原始字段 | 语义 | 适用对象 | 示例 |
| --- | --- | --- | --- | --- |
| **Internal Logic ID** | `id` (5) | **逻辑定义 ID** | **纯数据/定义**。这些对象只存在于编辑器或逻辑引擎的内存中，不对应游戏世界里的实体。 | 节点图 ID、结构体定义 ID、信号 ID。 |
| **World Entity GUID** | `guid` (4) | **世界实体 GUID** | **游戏对象**。这些对象可以在游戏世界中被实例化 (Spawn)。GUID 用于在世界数据库中查找其属性。 | 角色 (Character)、道具 (Item)、预制体 (Prefab)。 |

**判别法则**：
  * 如果一个资源是“一段代码”或“一个配置”，使用 **Logic ID**。
  * 如果一个资源是“一个物体”，使用 **Entity GUID**。

这是《遗留节点图系统架构参考文档》的第三章。本章深入剖析了节点图中最复杂的**节点模型**，解释了编辑器如何通过“外壳-内核”分离模式来兼顾灵活性与性能，以及客户端如何通过通用代理机制实现与服务器的通信。

---

## 3. 节点模型架构 (Node Architecture)

本系统的节点并非单一的实体，而是一个**运行时组合体**。理解这一架构的关键在于区分“用户看到的（Shell）”和“系统执行的（Kernel）”。

### 3.1 外壳-内核分离模式 (The Shell-Kernel Model)

为了支持多态（Polymorphism）和跨端逻辑，系统将节点的定义拆分为两个独立的标识符。

#### 3.1.1 双重标识符机制

每个节点实例 (`NodeInstance`) 都包含两个关键引用：

1. **Shell Ref (外壳引用)**:
  * **定义**：节点的 UI 描述符。
  * **作用**：决定节点的名字、引脚的数量、引脚的名称以及排列顺序。
  * **位置**：通常指向客户端资源包中的定义。
  * **不变性**：无论节点处理的是 `Int` 还是 `Float`，其 `Shell Ref` 通常保持不变（例如都叫 "Add"）。
2. **Kernel Ref (内核引用)**:
  * **定义**：节点的底层实现句柄。
  * **作用**：指向引擎中实际执行运算的 C++ 函数或系统指令。
  * **位置**：指向双端引擎的函数注册表或特定的 RPC 存根。
  * **可变性**：这是多态实现的关键。

#### 3.1.2 节点的生命周期状态

基于 `Kernel Ref` 的状态，节点分为两种模式：
* **未决议态 (Unresolved / Dirty)**:
  * **特征**：`kernel_ref` 为空 (`null`)。
  * **场景**：用户刚从菜单拖入一个泛型节点（如 `Math.Add`），但尚未在下拉菜单中选择具体类型。
  * **行为**：此时节点在逻辑上是无效的，编辑器会运行检查前报错，且禁止连线(连线会自动分配值)，直到用户指定类型。

* **决议态 (Resolved / Ready)**:
  * **特征**：`kernel_ref` 拥有有效的 ID。
  * **机制**：用户选择类型（如 `Int`）后，编辑器查询**约束求解器**，找到 `Shell(Add) + Type(Int)` 对应的实现 `Kernel(Add_Int32)`，并将其写入数据。


### 3.2 复合与接口节点 (`NodeInterface`)

在系统中，凡是无法直接映射到单一 C++ 函数的节点，都通过 **`NodeInterface` (原 CompositeDef)** 来描述。它不仅用于用户自定义的子图，也用于系统自动生成的结构体操作和信号存根。

#### 3.2.1 接口契约

`NodeInterface` 充当了该节点的“函数签名”。它定义了：

* **对外引脚**：即 `inflows`, `inputs` 等列表。
* **穿透锚点**：每个引脚包含一个 `persistent_pin_uid`。即使内部逻辑发生变更（如子图里删除了某些节点），只要对外接口的 UID 不变，外部图的连线就不会断裂。

#### 3.2.2 逻辑模板矩阵 (The Template Matrix)

系统通过 `template_root` (原 `which`) 和 `template_sub` (原 `subWhich`) 的组合来决定该节点背后的真实行为模式。

| 节点类型 | Template Root | Template Sub | 行为描述 |
| --- | --- | --- | --- |
| **用户子图** | `USER_COMPOSITE (6)` | `NONE` | **引用模式**。节点逻辑指向另一个 `NodeGraph` 资源。运行时会展开该子图。 |
| **发送信号** | `SUB_TEMPLATE (1)` | `SIGNAL_SUB (8)` | **RPC 模式**。节点是根据信号定义自动生成的发送器。 |
| **监听信号** | `LISTEN_SIGNAL (2)` | `SIGNAL_SUB (8)` | **事件模式**。节点是信号的接收入口。 |
| **拆分结构体** | `STRUCT (5)` | `STRUCT_SUB (4)` | **存取模式**。节点根据结构体定义，自动生成对应字段的输出引脚。 |
| **修改结构体** | `SUB_TEMPLATE (1)` | `MODIFY_STRUCT (3)` | **存取模式**。节点生成对应字段的输入引脚，用于修改结构体值。 |

### 3.3 客户端代理机制 (Client Proxy Mechanism)

在前端表现环境（Client Runtime）中，大量的节点（特别是技能逻辑 `CLIENT_SKILL`）并不在本地执行，而是需要驱动服务器逻辑。为了避免为每个服务器指令编写对应的客户端 C++ 代码，系统设计了一套通用的 **RPC 代理机制**。

#### 3.3.1 Kernel 2000: 通用网关

绝大多数客户端执行节点的 `kernel_ref` 都指向 ID **2000**（或其变体）。
这是一个**通用序列化网关 (Generic RPC Gateway)**。它的逻辑非常简单：

1. 读取元数据引脚（OpCode）。
2. 将所有输入数据引脚的值序列化打包。
3. 通过网络发送给服务器。

#### 3.3.2 Type 5 引脚: 元数据通道

为了让通用的 Kernel 2000 知道“我要调用哪个函数”，系统引入了特殊的引脚类型：**PinSignature.Kind = META_RPC_OPCODE (5)**。

* **OpCode 载体**：
  * 每个代理节点都有一个隐藏的 Type 5 引脚（通常是 Index 0）。
  * 该引脚的 `binding_meta` 或 `source_ref` 字段存储了**目标服务器逻辑节点的 Shell ID**。
  * **示例**：客户端的“造成伤害”节点，Kernel 是 2000，但其 Pin 0 绑定了服务器端“ApplyDamage”的 ID。

* **动态路由 (Dynamic Routing)**：
  * 对于 `SendSignal` 节点，除了 OpCode，还存在第二个 Type 5 引脚（`META_TOPIC_NAME`）。
  * 它携带了信号名称（如 "PlayerDead"）或其 Hash。
  * 网关会将此作为**路由键 (Routing Key)** 放入包头，服务器据此分发事件。

这是《遗留节点图系统架构参考文档》的第四章。本章将视野从单个节点扩展到整个**图（Graph）**的运行机制，重点解释复合节点的“穿墙”映射逻辑、图内部的变量作用域，以及事件驱动系统的上下文注入机制。

---

## 4. 图逻辑与执行流 (Graph Execution Logic)

`NodeGraph` 不仅是节点的容器，它还定义了逻辑的**边界（Boundary）**、**数据作用域（Scope）**以及**外部接口（Interface）**。

### 4.1 图容器结构 (The Graph Container)

一个完整的节点图在运行时由以下三个核心层面构成：

#### 4.1.1 执行层 (Execution Layer)

* **主体**：`nodes` 列表（`NodeInstance`）。
* **机制**：这是图的实际逻辑体。引擎遍历此列表，根据控制流（Control Flow）引脚的连接关系依次执行节点。
* **索引**：每个节点都有一个唯一的 `index`（int32），这是图内部寻址的唯一句柄。连线数据通过 `target_node_index` 直接引用此句柄。

#### 4.1.2 接口层 (Interface Layer)

当一个图被作为“复合节点（Composite Node）”嵌套在另一个图中时，它必须通过 **接口映射 (`InterfaceMapping`)** 与外部通信。

* **穿透映射 (Penetration Mapping)**：
`InterfaceMapping` 定义了外部引脚如何“穿墙”连接到内部节点。
  * **输入映射**：外部 `Composite` 节点的输入引脚  映射到内部某个节点的输入引脚。
  * **输出映射**：内部某个节点的输出引脚  映射到外部 `Composite` 节点的输出引脚。

* **扁平化优化**：虽然数据结构上是分层的，但推测服务器在加载阶段会进行**图展平 (Graph Flattening)**，将外部连线直接重定向到内部节点的内存地址，从而消除运行时的递归调用开销。

#### 4.1.3 数据层 (The Blackboard)

图拥有独立的局部变量池，称为 **黑板 (`Blackboard` / `GraphVariable`)**。

* **作用域**：默认情况下，变量仅在当前图内部可见（Private）。
* **暴露机制 (`is_public`)**：
  * 如果变量标记为 `is_public = true`，它将成为该图的一个**配置参数**。
  * 在编辑器中，选中该图资源时，属性面板会显示这些变量，允许策划在不打开图的情况下调整数值（如“技能冷却时间”、“伤害倍率”）。
* **类型系统**：变量使用 `ServerTypeId` 定义类型，并使用 `TypedValue` 存储值。这是图内部数据持久化和状态共享的核心。

### 4.2 执行入口与触发槽 (Entry Points & Slots)

并非所有的图都从单一的“Start”节点开始。根据子系统不同，图的激活方式有所区别。

#### 4.2.1 触发槽位 (`entry_slot_index`)

* **定义**：在技能 (`SKILL`) 或过滤器 (`FILTER`) 系统中，外部系统可能通过特定的“槽位”来调用图。
* **机制**：`entry_slot_index` 告诉引擎，当外部信号触发该槽位时，应该激活图内部哪一部分逻辑（通常对应一个 `NodeGraphStarts` 节点，其 Index 与此字段对齐）。
* **默认值**: 通常为 1，对应默认的第一个节点 `NodeGraphStarts` 。

#### 4.2.2 轮询间隔 (`evaluation_interval`)

* **适用对象**：仅限过滤器图 (`FILTER_NODE_GRAPH`)。
* **机制**：定义了该逻辑图被重新求值（Re-evaluate）的频率。例如 `0.3` 表示每 0.3 秒执行一次判定逻辑。这是一种由系统自动调度的**心跳机制**。
* **问题**: 轮询周期由外面调用组件决定, 节点图自身值无效.

### 4.3 信号与事件系统 (Signal & Event System)

本系统采用**发布/订阅 (Pub/Sub)** 模式处理异步逻辑。

#### 4.3.1 信号发布 (Send Signal)

* **客户端**：通过代理节点（Kernel 2000）发送。包含 `OpCode` (RPC头) 和 `Topic` (信号名)。
* **服务端**：通过 `SendSignal` 节点（生成存根）发送。
* **路由**：信号不直接指向某个图，而是广播到**实体（Entity）**的消息总线上。

#### 4.3.2 信号订阅 (Listen Signal)（Kernel 2001）

* **节点**：`ListenSignal`（生成存根）。
* **机制**：服务器加载图时，会注册监听器。当匹配的信号（Topic 一致）到达实体时，该节点被激活。

#### 4.3.3 上下文注入 (Context Injection)

当一个图是由信号触发时，它需要知道信号携带的数据（Payload）。

* **上下文声明 (`context_declaration`)**：
* 位于入口节点（通常 Kernel Ref 为 2001）上。
* 它声明了：“本图是由 `Signal_X` 触发的”。


* **数据获取**：
* 图内部会生成特殊的“Get Signal Data”节点（或在入口节点上有额外的输出引脚）。
* 这些引脚的数据来源并非连线，而是**执行上下文 (Execution Context)**。引擎在执行图之前，会将信号的 Payload 注入到这些上下文槽位中。


## 5. 类型与数值系统 (Type & Value System)

本系统的类型层非常复杂，因为它必须在静态的 Protobuf 结构中模拟动态语言的灵活性，同时还要桥接 C++ 服务器与 C# 客户端的异构环境。

### 5.1 双重类型映射 (Dual Type System)

由于历史迭代和架构隔离，系统存在两套互不兼容的类型 ID 编号。理解这一映射是正确解析数据的先决条件。

#### 5.1.1 映射表 (Mapping Table)

| 类型 (Type) | Server ID (后端) | Client ID (前端) | 备注 |
| --- | --- | --- | --- |
| **Unknown** | `0` | `0` |  |
| **Entity** | `1` | `1` | 运行时对象引用 |
| **Int32** | `3` | `3` |  |
| **Boolean** | `4` | `5` | **注意 ID 错位** |
| **Float** | `5` | `7` | **注意 ID 错位** |
| **String** | `6` | `9` |  |
| **Vector3** | `12` | `11` |  |
| **List<Int>** | `8` | `4` | Server ID 分散，Client ID 连续 |
| **List<Entity>** | `13` | `2` |  |
| **Struct** | `25` | N/A | 客户端通常无法直接操作通用结构体 |
| **Map (Dict)** | `27` | N/A | 客户端通过 List<Pair> 模拟 |

#### 5.1.2 异构处理策略

* **数据文件作为字典**：`.gia` 文件在存储节点定义时，往往同时包含 `var_type_shell` (Client ID) 和 `var_type_kernel` (Server ID)。解析器应根据当前运行环境选择读取相应的字段。
* **客户端限制**：客户端环境不支持 `Map` 和 `Struct` 的深层操作。如果遇到 Server ID 为 25 或 27 的数据，客户端通常将其视为“黑盒句柄”或只读数据。

### 5.2 递归数值容器 (`TypedValue`)

`TypedValue` (原 `VarBase`) 是全系统通用的数据载体。它采用 **递归组合 (Recursive Composition)** 模式来构建复杂数据结构。

#### 5.2.1 存储结构 (Polymorphic Storage)

利用 Protobuf 的 `oneof` 特性，`TypedValue` 可以存储任意一种基础类型或复合类型。

* **原子类型**：直接存储于 `val_int`, `val_float` 等字段。
* **容器类型**：
* `val_list`: 包含一个 `ListStorage`，内部是 `repeated TypedValue`。
* `val_struct`: 包含一个 `StructStorage`，内部是 `repeated TypedValue`（对应结构体字段顺序）。
* **递归性**：因为 `ListStorage` 里的元素也是 `TypedValue`，所以系统天然支持 `List<List<Int>>` 或 `List<Struct>` 等无限嵌套结构。



#### 5.2.2 UI 渲染提示 (Widget Hints)

为了解决“数据类型相同但用途不同”的问题（例如 `Int` 既可以是数量，也可以是枚举 ID），`TypedValue` 包含 `widget` 字段：

* `W_ENUM_PICKER (6)`: 提示编辑器渲染为下拉枚举，而非数字输入框。
* `W_ID_INPUT (1)`: 提示编辑器渲染为资源选择器（如选择 Prefab），而非输入 64 位整数。

#### 5.2.3 变更追踪 (`is_explicitly_set`)

该字段是一个位掩码（或布尔标记）。

* **背景**：Protobuf 的默认值机制无法区分“用户填了0”和“用户没填（默认0）”。
* **逻辑**：如果 `is_explicitly_set == 0`，运行时应忽略 `storage` 中的值，转而使用节点定义的**默认值**或**连线输入**。

### 5.3 泛型实例化元数据 (`DynamicTypeMetadata`)

这是系统中最晦涩但至关重要的设计，用于解决 **泛型容器空值歧义**。

* **问题**：当一个 `List<StructA>` 为空时，其 `val_list` 字段没有任何元素。此时编辑器无法得知该列表的“泛型参数 T”是什么。
* **机制**：`extra_meta` (原 `ComplexValueStruct`) 提供了一份**静态类型模版**。
* 它通过扁平化的字段（如 `target_struct_id` 或 `map_config`）直接告知系统：“这个容器虽然现在是空的，但它将来装的是 `StructA`。”


* **作用**：这主要用于编辑器实例化新元素（Factory Pattern）和 UI 布局初始化。



## 6. 结语

本文档完整解构了遗留节点图系统的内部机理。尽管该系统存在大量的历史包袱（如双重类型ID、硬编码的魔法数字），但其核心架构——**Shell/Kernel 分离**、**AssetBundle 依赖管理**以及**递归数值系统**——展现了高度的灵活性和前瞻性。

新系统的设计应继承这些核心思想，同时通过更语义化的接口（如我们重构后的 Protobuf 定义）来屏蔽底层的复杂度，从而构建一个既兼容历史数据又易于维护的现代化逻辑引擎。