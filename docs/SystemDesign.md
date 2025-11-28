
# **前言**

## **0.1 背景与动机**

在复杂的交互系统、游戏逻辑、事件驱动框架以及行为树/节点图编辑器中，开发者通常以“可视化节点图”的方式构建逻辑。虽然图形化对初学者友好，但在实际工程中暴露出诸多问题：

* **难以审阅与讨论**：图结构无法以文本形式直接 diff，也不适合代码审查（Code Review）。
* **难以进行版本管理**：节点图的序列化格式通常冗长难读，变更难以追踪，冲突难以解决。
* **难以进行批量修改与自动化检查**：文本化缺乏结构，工具难以分析和优化。
* **难以表达复杂逻辑**：可视化图缺乏层次抽象，复用能力有限。

因此，本 DSL 旨在为节点图提供一种**可阅读、可审查、可比对、可重建**的文本描述方式，使其具备与代码工程一致的可维护性与可协作性。

## **0.2 语言定位**

本语言并非 TypeScript 的子集或扩展，也不是一种“可执行脚本语言”。
尽管在表面语法上借用 TypeScript 的常用结构（如函数声明、箭头函数、链式调用），但：

> **所有语言结构都以“节点图行为模型”为真实语义基础，
> 而非基于 TypeScript 的执行模型。**

也就是说：

* `.A().B().C()` 并不意味着“调用 JS 对象的方法”，而是构建一种**深度优先的控制流链**；
* `$((a,b)=>a+b)` 不是在 JS 中执行表达式，而是定义一个**数据节点**；
* `function X() { In(0)...Out("done") }` 并不是可执行函数，而是一个**可复用图结构（组件）**。

本 DSL 是一种**结构化的行为图描述语言**，其设计目的不是“让开发者写程序”，而是**让图结构以稳定、无歧义、可还原的文本形式被表达出来**。

## **0.3 设计目标**

本语言的核心目标包括：

1. **可逆性（Round-trip）**
   文本必须能够无损重建可视化节点图，图也必须能无损转换回文本。

2. **可审查性**
   代码审查流程必须能直接理解、讨论和对比 DSL 文本。

3. **可维护性与可演化性**
   语法必须稳定、结构明确，适合工具链（LSP、格式化、重构）进行自动化处理。

4. **可读性**
   读者无需了解具体引擎实现，也能理解逻辑结构、执行顺序及数据传递模式。

5. **可控性（最小表达原则）**
   语言禁止不必要的自由度，避免出现隐式副作用或推断不明确的语义。

## **0.4 设计约束与基本理念**

为了达成上述目标，本 DSL 采用了多项严格的设计约束与理念，这些约束并非为了限制使用者，而是为了限制“歧义与潜在 bug 的来源”，如你强调的：

> **显式永远比隐式更安全。
> 少一点推断，就少一类 bug。
> 少一点歧义，就多一份可维护性。**

这种理念体现在语言的所有核心规则中：

### **① 显式优先原则（Explicit Over Implicit）**

所有语义都必须完全显式写出：

* 捕获列表必须显式写出，例如 `$((a,b)=>...)`，禁止隐式闭包捕获
* 控制流必须明确书写 `.A().B()` 或 `>> {}`，不能由缩进或块结构隐含
* 所有出口都必须显式 `Out()`
* 所有跳转点必须显式写出锚点 `Branch["id"]`

动机不是为了实现难度，而是：

> **避免隐藏语义、避免推断错误、减少误解与视觉负担，从源头减少 bug。**

### **② 结构优先原则（Structure Over Expression）**

语言所有构造都优先服务于图结构表达，而不是为了书写方便或表达式能力：

* `.A().B()` 表达执行链，而非对象方法追踪
* `>> {}` 表达并行分支结构，而非字面量对象
* `$()` 表达数据节点，而不是作为脚本语言求值
* Component 用于复用子图，不是子程序调用

DSL 的核心本质是“结构化图描述”，不是通用脚本语言。

### **③ 控制流与数据流严格分离（Separation of Flow & Data）**

控制流只由链式调用、分支、锚点、组件入口与出口决定。
所有计算都只能发生在 `$()` 中。

这种明确分离有助于：

* 清晰地分析执行顺序
* 统一管理数据依赖图
* 避免在控制节点中混入逻辑表达式导致的混淆
* 从根本上消除因表达式顺序与执行顺序不匹配引发的 bug

### **④ 单线程深度优先执行模型**

DSL 不模拟脚本的自由跳转或多线程，而是模拟可视化节点图的执行模型：

* 主链为深度优先
* 分支按编号顺序执行
* `<<` 将节点挂入延迟栈
* Component 的入口与出口等价于压栈/出栈结构

这种模型保证：

* 控制流语义清晰、可预测
* 容易静态分析
* 在文本和图之间保持完全一致

### **⑤ 避免推断（No Hidden Inference）**

尽可能避免自动推断语义：

* 捕获列表必须显式
* 变量生命周期严格遵循节点图模型
* 分支键必须字面量
* Switch 键必须字面量
* 所有 In / Out 必须明确写出
* Component 的 return 必须明确列出可视化端口

推断越少，语义越稳定；语义越稳定，工具链越可靠。

### **⑥ 一致性原则（Consistency with Runtime Graph Model）**

语言语义必须与引擎实际节点图运行模型完全一致，而非采用传统程序语言模型。

这确保：

* 开发者在文本与可视化图之间转换时不会遇到语义错位
* 执行时行为与图编辑器中的预期完全一致
* 工具链可以共同使用统一的图式结构（GraphModel）

## **0.5 使用范围与非目标**

本语言的作用范围明确：

* **用于描述节点图的行为结构**
* **用于编写可视化逻辑组件**
* **用于静态分析、验证、重构、可视化生成**
* **用于多人协作与版本管理**

本语言**不是**：

* 通用脚本语言
* TypeScript 子集
* 执行环境
* 具有动态类型推断的语言
* 用来书写复杂数值算法、计算密集逻辑或框架代码的工具

DSL 更像是一种“可结构化的蓝图源代码格式”，而不是传统意义上的编程语言。

## **0.6 总结：DSL 的价值主张**

本语言的根本价值在于：

> **以最小的语法、最严格的规则、最明确的结构，为复杂的节点图提供纯文本化、无歧义、易维护、可逆、可协作的表达方式。**

它不是为了“让开发者写代码更方便”，
而是为了“让节点图的逻辑更可靠、更易读、更可工具化、更少 bug”。

这便是本 DSL 的核心设计哲学。

# **1. 概览（Overview）**

本章节对本 DSL 的核心概念与基础语义进行系统性总结，为后续章节的详细语法规则与执行模型奠定基础。内容包括节点图的基本结构、语法构成方式、控制流与数据流模式、组件系统以及执行模型的原则。

## **1.1 节点图（Graph Model）基础结构**

本 DSL 描述的逻辑本质是一种 **有向、无环（DAG）的“行为执行图”（Behavior Graph）**。该图由四类结构节点构成：

### **1.1.1 Trigger（触发器节点）**

Trigger 是节点图的入口点，用于响应事件或周期性回调，例如：

```ts
[OnCreate(arg)[out]]
```

特性：

* 每个 Trigger 代表一个图的独立入口。
* 触发器可以具有输入参数与输出值。
* 一个文件可定义多个触发器，它们共享同一节点图的声明空间但执行互不关联。
* 触发器始终作为控制流的根节点，其后的链式语法会构建整条执行路径。

Trigger 对应图中的 **入口节点（Start Node）**。

### **1.1.2 Execution Node（执行节点）**

执行节点是图中最基本的功能单元，由链式调用 `.Func()` 生成，例如：

```ts
.Log("hello").Move(x, y).Check()
```

特点：

* 执行节点具有明确的**执行副作用**或**逻辑操作**。
* 执行节点可接收参数，并可返回一个或多个输出值。
* 执行节点按照控制流顺序依次被激活执行。

执行节点对应图中的 **动作节点（Action Node）**。

### **1.1.3 Data Node（数据节点）**

所有计算均通过 `$()` 语法创建的数据节点完成：

```ts
.$((a, b) => a + b)[sum]
```

数据节点的特征：

* 计算为纯函数，不包含副作用。
* 不参与控制流，仅作为数据依赖的来源。
* 需要显式声明捕获列表，避免隐式闭包或推断行为。
* 求值时机基于数据流的回溯规则，而非书写顺序。

数据节点对应图中的 **数据处理节点（Compute Node）**。

### **1.1.4 Branch Anchor（锚点节点）**

锚点用于命名图中的某个位置，以便进行跳转与合流，例如：

```ts
Branch["Continue"]
```

特性：

* 锚点在其所在作用域内必须唯一。
* 锚点本身不是执行节点，但标记了一个控制流进入点。
* 锚点名称必须为字符串字面量。

锚点对应图中的 **结构控制节点（Anchor/Label Node）**。

## **1.2 控制流（Control Flow）模型**

控制流指示执行节点之间的激活顺序，是本 DSL 的核心语义之一。控制流以显式方式表达，包括顺序链、分支结构、跳转结构与组件调用。

### **1.2.1 顺序链（Sequential Chain）**

顺序链通过链式调用构建：

```ts
.A().B().C()
```

它表示深度优先执行顺序：

1. 执行 A
2. 执行 B
3. 执行 C

特点：

* 顺序链是所有控制流的基础。
* 以“`.`”连接，每一次调用都会创建一个新的执行节点。
* 不会隐式跳转或分支，所有控制转移必须显式声明。

### **1.2.2 分支（Branching）结构**

使用 `>> {}` 创建并行分支：

```ts
>> {
  0: .DoA()
  1: .DoB()
}
```

规则：

* 每个子分支以整数字面量作为键（0、1、2 …）。
* 分支按编号升序进行深度优先执行。
* 分支结束后必须显式指定合流位置，否则后续主链不会自动执行。

### **1.2.3 合流（Merge）与跳转（Goto）**

DSL 支持三种显式控制转移：

1. **结构合流**（返回编号 0）

   ```ts
   >> 0()
   ```

2. **锚点合流 / 跳转**

   ```ts
   >> "id"()
   ```

3. **前置锚点声明**

   ```ts
   Branch["id"].Next()
   ```

核心原则：

* 所有跳转都必须显式书写。
* 不提供隐式 fall-through 行为。
* 合流不会等待其他分支，除非使用专门结构（如 Loop/Join）。

### **1.2.4 组件调用控制流**

组件在控制流中表现为一个子图：

```ts
.ComponentX(a, b)[out].Continue()
```

其行为与执行节点相同，但具有：

* 单独的控制子图
* 独立的输入/输出
* 自身定义的入口 `In()` 和出口 `Out()`

组件的执行遵循标准深度优先模型，通过 `<<` 暂存后续节点。

## **1.3 运算流（Data Flow）模型**

本 DSL 明确区分 **控制流（执行顺序）** 与 **运算流（数据依赖）**。

所有计算必须使用 `$()`：

```ts
.$((x, y) => x * y)[product]
```

运算流特点：

* 运算节点不影响控制流。
* 执行节点之间传递数据必须通过捕获列表。
* 捕获列表的顺序、名称、来源必须由用户显式声明。
* 运算节点的求值基于依赖回溯，而非代码书写顺序。

### **1.3.1 捕获列表（Capture List）**

捕获列表是所有数据节点的“依赖声明”：

```ts
$( (a, b, c) => a + b + c )
```

捕获列表必须显式声明，原因包括：

* 避免隐式闭包捕获导致的歧义
* 消除推断行为，从源头减少潜在 bug
* 使数据依赖结构清晰可分析
* 保证工具链可检查与优化

捕获变量允许来自：

* 函数输出
* 临时变量 `_x`
* 节点变量 `node.x`
* 全局变量 `Self.x`

### **1.3.2 求值时机（Evaluation Timing）**

数据节点的实际求值遵循：

* **基于依赖回溯**：所有被捕获的变量必须先产生或拥有默认值。
* **严格模式**：未执行分支中的捕获值为默认值，并产生警告。
* **无副作用**：运算节点不会改变任何状态。

运算流与控制流始终分离。

## **1.4 Component（组件）模型**

组件是可复用的子图，通过函数语法声明：

```ts
function CheckValue(input: int) {
  In(0)
    .Compare()
    .Out("ok")
}
```

组件的本质是一套封装的控制流与数据流结构。

### **1.4.1 组件结构**

组件内部包含：

* 一个或多个入口 `In()`
* 一个或多个出口 `Out()`
* 内部控制流与数据流
* 局部变量空间
* 显式可视化端口声明 `return ExecFunc({ ...outputs })`

### **1.4.2 组件实例化语义**

调用组件时：

* 会创建一个独立的执行子图实例
* 该实例的变量空间、锚点空间、执行链均独立
* Out() 返回后控制流继续执行调用点后的链条

组件是图的结构化复用单元，而非函数调用。

## **1.5 执行模型（Execution Model）**

本 DSL 的执行语义完全来源于行为节点图的运行模型，而非 TypeScript、JavaScript 或一般脚本语言的模型。

核心执行原则如下：

### **1.5.1 深度优先执行（Depth-First Execution）**

对于：

```ts
.A().B().C()
```

执行顺序为：

1）A
2）B
3）C

分支执行也总是深度优先。

### **1.5.2 显式跳转（Explicit Transfer）**

语言不提供隐式控制转移：

* 所有分支进入、合流、跳转必须显式书写
* 所有组件进入/退出必须显式建模

### **1.5.3 挂起（Suspension）机制**

使用 `<<` 或组件 `Out()` 激活挂起点：

* 当前控制流停止
* 对应后续逻辑存入延迟栈
* 未来根据 Out() 的触发点恢复执行

### **1.5.4 无环（Acyclic）限制**

除特殊结构（Loop / ForEach）外，控制流图必须无环：

* 保证可静态分析
* 保证执行可预测
* 保证转换一致性与可逆性

## **1.6 小结**

本章节确立了 DSL 的核心概念体系：

* Trigger、Execution Node、Data Node、Branch Anchor 构成图的基本组成
* 控制流与数据流严格分离
* 组件作为结构化复用单元
* 深度优先、显式跳转、无隐式行为的执行模型
* 明确的求值方式与变量作用域规则

这些原则共同确保了：

* 文本与可视化图之间的完全一致性
* 可审查、可 diff、可逆、无歧义的逻辑表达
* 可维护、可测试、可工具化的行为图体系


# **第二章 文件与模块组织（File & Module Organization）**

本章讨论 DSL 工程的组织方式，包括文件类型、模块边界、命名空间、类型声明文件的角色以及它们与 TypeScript 语言服务的协作机制。本章不涉及 DSL 的语法或执行语义，仅讨论工程结构层面的稳定性、可维护性与类型系统集成方式。

# **2.1 文件类型（File Types）**

本 DSL 工程包含三类主要文件：

## **2.1.1 DSL 源文件（`*.dsl.ts`）**

这是**用户直接编辑的文件**，用于编写：

* Trigger（触发器）
* Component（组件）
* 数据节点（`$()`）
* 控制流结构（链式语法、分支、跳转）
* Metadata
* 少量常量声明（可选）

特点：

* 具有 TypeScript 语法外观，但其内容被 DSL 解析器解释为“行为图描述语言”。
* 不允许用户编写任意 TS 语句（如 if/while/表达式逻辑等）。
* 文件中的“上下文信息”会被 TS 补全系统识别并启用提示。
* 一个工程中 `.dsl.ts` 通常占比最高。

## **2.1.2 静态类型库（`def.d.ts`）**

`def.d.ts` **由系统提供，不由用户修改**，包含：

* 所有节点函数（Execution Node）的类型签名
* 系统内置节点的链式调用接口
* Component 定义基础类型（如 ExecFunc）
* Trigger/Component 约定的语法结构类型
* Metadata 的类型

其功能是：

> **为 TypeScript 语言服务提供“长期稳定的类型基础设施”。**

例如：

* `.Log()` 提供哪些出参
* `.Move()` 的参数类型
* `$()` 的结构是什么
* `.In()` `.Out()` 的类型限制

`def.d.ts` 是整个工程的“基础类型库”，保证所有 DSL 文件具有一致的静态语义解释能力。

## **2.1.3 动态生成类型声明（`dyn.d.ts`）**

`dyn.d.ts` **由系统自动生成并在编辑时持续更新**，其内容会随着用户的 `.dsl.ts` 文件变化：

* 记录每个 Trigger 和 Component 的实际输出端口（例如用户定义的 `[result, ok]`）
* 记录当前作用域下可以引用的变量
* 为编辑器提供对 node.x、自定义临时变量的类型提示
* 覆盖（override）部分 def.d.ts 的默认声明，使编写时错误即时暴露

它的本质功能是：

> **实时为用户代码补全提供最新的结构信息，并保证所有输出变量具有正确的类型。**

此文件反映用户工程的“当前状态”，保证类型系统可响应用户编辑。

## **2.1.4 系统运行时类型文件（runtime typings）**

此类文件为运行时结构提供类型支持，例如：

* 图结构序列化模型类型（GraphModel）
* 构建器内部使用的辅助类型

用户通常不需要直接查看或修改。

## **2.1.5 构建产物**

包括：

* 图结构 JSON
* 可视化编辑器消费的中间格式
* 组件调用图索引
* 缓存

这些不是本章讨论重点。

# **2.2 项目结构（Project Layout）**

为了保证可维护性与可视化工具链稳定性，推荐以下工程结构：

```
/project
  /src
    /components
      Move.dsl.ts
      CheckValue.dsl.ts
    /triggers
      OnCreate.dsl.ts
      OnTick.dsl.ts
    /common
      constants.ts
      shared.dsl.ts
  def.d.ts
  dyn.d.ts  (自动生成)
  tsconfig.json
```

原则如下：

## **2.2.1 DSL 文件集中存放**

* `.dsl.ts` 文件应按功能分组（components、triggers）。
* 避免将普通 TS 文件与 DSL 文件混放，否则影响类型推断和工具链行为。

## **2.2.2 Component 建议一个文件一个声明**

虽然 DSL 允许一个文件包含多个 Component，但实践上：

* 每个 Component 独立文件有利于 diff
* 便于多人协作
* 有助于工程阅读和重构

## **2.2.3 Trigger 按事件类型分类管理**

例如所有游戏生命周期事件（OnCreate、OnTick、OnDestroy）可集中在 `/triggers` 目录。

## **2.2.4 常量与数据结构可放在普通 TS 文件中**

DSL 中允许引用字面量和常量：

```
const DEFAULT_SPEED = 5;

[OnCreate()[ ]].Move(DEFAULT_SPEED)
```

但普通 TS 函数逻辑不可放入 DSL 中，也不可在 DSL 中调用。

## **2.2.5 Node Library（内置节点）保持分离**

所有内置节点（如 Log、Move、Check）统一由系统提供，不属于用户项目。

# **2.3 模块边界与命名空间（Module Boundaries & Namespaces）**

本 DSL 采用 **File-as-Module 模型**：

> **每个文件是独立模块，文件之间的 Component 调用通过 TS import/export 连接，但所有 DSL 语义由编译器解释。**

## **2.3.1 组件跨文件引用**

组件要跨文件使用时，必须 TS 形式 import：

```ts
import { CheckValue } from "../components/CheckValue.dsl";
```

这不仅让 TS 可以补全，也使 DSL 编译器在图结构中找到组件定义。

## **2.3.2 禁止跨文件共享变量**

组件间数据必须通过：

* 参数输入
* Component 出参
* Temporary Variables

禁止在两个 DSL 文件间直接共享同一个变量（保持图结构可复现）。

## **2.3.3 命名空间不用于 DSL 语义**

TS 命名空间功能仅作为语法容器，不用于 DSL 自身逻辑。

## **2.3.4 模块边界清晰，避免循环依赖**

Component A 调 B 时不应再反向依赖 A，以确保图结构可分析。

# **2.4 DSL 文件的基础结构**

DSL 文件中的顶层允许以下元素：

* Metadata（可选）
* import 语句（有限制）
* Trigger 声明
* Component 声明
* 常量（只读）

示例结构：

```ts
import { CheckValue } from "./components/CheckValue.dsl";

[OnCreate()[ ]]
  .Move(5)
  .CheckValue()[result]
  .Log(result)

function CheckSomething(data: int) {
  In(0)
    .$((x)=>x+1)[out]
    .Out("ok")
  
  return ExecFunc({
    ok: node.ok
  });
}
```

## **2.4.1 import 的限制**

* 禁止 import 普通 TS 函数到 DSL 执行链中使用
* 允许 import 常量、枚举、数据结构（无执行逻辑）
* 允许 import Component（用于调用）

## **2.4.2 文件作用域不允许 TS 控制结构**

不可写：

```ts
if (...) {}
function calc() {}
while (...) {}
```

这些不属于 DSL 范围。

## **2.4.3 Component 的可见性**

* Component 必须以函数形式 export 才可被其他文件调用。
* 未 export 的组件视为本地私有。

# **2.5 DSL 文件与 TypeScript 类型系统的协作**

本 DSL 与 TS 类型系统紧密结合，其合作机制基于以下原则：

## **2.5.1 def.d.ts：长期静态声明**

用于：

* 节点类型（Log、Move）
* 链式调用类型
* 控制流结构（>>、<<、Branch[]）
* `$()` 的结构
* Trigger、Component 的基本形态

它定义了 **语法外观与函数签名**。

## **2.5.2 dyn.d.ts：动态环境联动**

由系统在后台生成：

* 记录每个 Trigger/Component 的出参
* 补充变量作用域
* 标记 node.x 的类型
* 标记在构建图中被删除/隐藏的元素
* 给编辑器提供即时诊断功能（报错/警告）

例如用户写：

```ts
.$((a,b)=>a+b)[sum]
```

系统会在 dyn.d.ts 中生成：

```ts
declare interface Trigger_OnCreate {
  sum: number;
}
```

因此 `.Log(sum)` 可以获得正确类型提示。

## **2.5.3 语言服务的三重来源**

TS 补全基于：

1. **def.d.ts：基础语义**
2. **dyn.d.ts：用户实时状态**
3. **用户 DSL 文件本身的上下文**

三者共同保证编辑器能：

* 补全节点名称
* 提示参数类型
* 显示组件输出
* 判断节点链的有效性
* 检查未定义变量

## **2.5.4 错误曝光与覆盖逻辑**

dyn.d.ts 允许覆盖 def.d.ts 的部分声明，用于：

* 禁用某些不合法链式调用
* 限制组件的出口类型
* 对不合法参数生成即时诊断信息

这确保用户在编辑过程中会 **即时看到 DSL 中的错误**。

# **2.6 系统生成文件的生命周期**

## **2.6.1 dyn.d.ts 的更新逻辑**

用户每次修改 `.dsl.ts` 后：

* 解析器提取新的 Trigger/Component 信息
* 更新变量、输出端口、节点链类型
* 自动重写 dyn.d.ts
* 通知 TS 语言服务重新计算补全

## **2.6.2 用户不可修改动态文件**

如用户编辑 dyn.d.ts：

* 修改会被覆盖
* 且可能导致补全和诊断失效

因此必须视为系统内部构建产物。

## **2.6.3 构建系统与 TS 的增量检查**

为了保证零延迟反馈：

* dyn.d.ts 更新后通过 TS Server 的增量模式刷新
* 仅重建受影响的部分
* 保证编辑体验流畅

# **2.7 工程一致性原则**

总结文件组织的核心理念：

## **2.7.1 TS 文件结构不影响 DSL 的语义**

DSL 的语义只由 DSL 编译器决定，TS 文件组织仅增强开发者体验。

## **2.7.2 一致性保证可复现性**

统一的文件组织让：

* DSL → 图结构
* 图结构 → DSL
  都有稳定的一致性。

## **2.7.3 多人协作时的冲突可控**

* Component 独立文件
* dyn.d.ts 不参与 git
* def.d.ts 保持稳定
* DSL 文件 diff 清晰

确保大型团队也可使用。

## **2.7.4 工程组织不应影响最终执行模型**

无论 DSL 文件如何拆分：

* 控制流
* 数据流
* 图结构

都由 DSL 编译器构建。

文件组织只影响可编辑性，不影响语义。


# **第三章 语法概要**

本章概述本 DSL 的所有合法语法形式，重点在“外观结构（Surface Syntax）”，而**不解释语义执行模型与节点图构造规则**（这些将在后续章节讨论）。

DSL 的核心特征是：
**所有操作（系统节点、组件入口、组件实例、选择结构、数据节点等）均统一为：**

```
NodeName(args?)[outputs?](cases?)
```

并通过三种链连接符组合为执行链：

```
.    <<    >>
```

其中 **<< 与 >> 的优先级低于 .**
因此：

```
A << B . C >> D
```

解析为：

```
A  <<  (B . C)  >>  D
```

---

# **3.1 文件级语法（File-Level Syntax）**

DSL 文件以类似 TypeScript 的源文件形式书写，但语义由 DSL 编译器解释。
文件中允许的顶层元素如下：

* import 语句（有限制）
* metadata 声明
* Trigger 声明
* Component 声明
* 常量声明（仅字面量与简单结构）
* 注释

DSL 文件不允许：

* 顶层 if/while/for
* 顶层 JS 函数（除了 Component 声明）
* 顶层表达式逻辑

---

## **3.1.1 Trigger 声明**

基本形式：

```ts
[OnCreate(arg1, arg2)[out1, out2]]
  .A()
  .B()[value]
  .C();
```

结构：

```
[ TriggerName( parameters ) [ outputs? ] ]
    .<control-flow-chain>
```

特征：

* Trigger 是 DSL 的入口节点
* 一个文件可有多个 Trigger
* 输出列表可省略

---

## **3.1.2 Component 声明**

以函数声明格式定义：

```ts
function MyComponent(a: int, b: float) {

  In(0)
    A()[ok].B()[x]
    C(x)[done]
    Out("ok");

  In("error")
    HandleError()
    Out("done");

  return ExecFunc<{
    ok: int,
    done: void
  }>("ok", "done");
}
```

特点：

* Component 的每个入口用 `In(id)` 开头
* In() 是 **节点** 不是“语句块”，可嵌入链中，但入口链必须以 In() 开头
* Out() 也是普通节点，可在链的任意位置出现
* 出口与类型在 `ExecFunc<{ outputs }>("out_tags")` 中统一声明
* 最小结构为 `return ExecFunc<{}>()`

---

## **3.1.3 Metadata**
用于声明组件或触发器元数据：
**TODO: 我也不知道Meta能干啥**
```ts
@Meta({
  category: "AI/Control",
  icon: "Logic"
})
```

Metadata 出现在 Component 声明前。

---

## **3.1.4 常量声明**

```ts
const SPEED = 5;
const KEY = "Jump";
```

允许：

* 字面量
* 枚举引用
* 基本系统类型对象

---

# **3.2 调用语法（Unified Call Structure）**

所有调用均采用统一结构：

```
NodeName(args?)[outputs?](cases?)
```

例如：

```
A()
Move(5)[dist]
$((x)=>x+1)[y]
If(cond)( true = X(), false = Y() )
Selector(MyComp, "Port", x)
CompInstance("Port", x)
```

没有 if{} / switch{} / loop{} / case{} 特殊结构，所有分支均为：

```
(cases)
```

---

# **3.3 链连接符与优先级**

DSL 执行链通过三种连接符表达：

```
.
<<
>>
```

其优先级为：

```
最高：   .
最低：   <<   >>
```

因此语句：

```
A << B . C >> D . E >> F
```

解析顺序为：

```
(( A << (B . C)) >> (D . E)) >> F
```

不推荐的写法示例：

```
A << B.C.D   // C 会被意外挂入延迟结构直到遇到 << 或 >>
```
推荐使用改为
```
A << B >> C.D
```

因此 `.`, `<<`, `>>` 之间必须明确分隔链条结构。

---

# **3.4 控制流结构（Control Flow Syntax）**

控制流不是通过特殊语句，而是通过：

### **3.4.1 链连接符（.、<<、>>）**

最基础结构：

```
A() . B() . C()
A() << B()
A() >> B()
```

三者均为合法链连接。

---

### **3.4.2 Case 选择结构**

所有分支结构都是：

```
Node(args)[out](
  key = ChainExpr,
  key = ChainExpr,
  ...
)
```

例如标准 If：

```
If(cond)(
  true = A().B(),
  false = C().D()
)
```

Switch：

```
Switch(x)(
  0 = A(),
  1 = B(),
  default = C()
)
```

多分支逻辑全部用相同语法。

---

### **3.4.3 无 “jump/merge” 专用语法**

`0()`、`"tag"()` 作为普通节点调用，可被外链接收。
合流与跳转属于执行模型，不是语法结构，因此语法形式为：

```
0()
"next"()
```

都是普通的：

```
Identifier(args)
```

其跳转分支执行完毕后会回来继续执行后续节点.

---

# **3.5 数据节点（Data Node）**

使用 `$()` 统一表示：

```
$((a, b) => a + b)[sum]
$((a, b) => {
  const x = m.floor(a / b);
  return {x, y: a % b};
})[x, y]
```

结构：

```
$(
  (capture-list) => expression
)[ output-vars ]
```

规则：

* 捕获列表必须显式，不能隐式捕获
* `[sum]` 声明节点输出名称
* 数据节点无副作用，仅参与数据流

---

# **3.6 Component 调用语法**

Component 调用总是“节点调用”的形式，不存在特殊语法。

### **3.6.1 默认入口（第一个入口）**

```
MyComponent(a, b)[out]
```

等价于“调用第一个 In()”。

---

### **3.6.2 指定入口（不使用 Selector）**

```
Selector(MyComponent, "PortId", args...)
```

---

### **3.6.3 组件实例**

```
const Comp = Shared(MyComponent);
Comp("PortA", x)
Comp("PortB", y)[z]
```

### **3.6.4 组件端口实例**

```
const Port = Shared(MyComponent, "HandleEvent");
Port(eventData)
```

这些都是普通的“NodeName(args)”调用，非特殊语法。

---

# **3.7 完整调用形式：全局统一表达式**

统一调用结构：

```
NodeName(args?)[output?](cases?)
```

合法示例：

```
Move(5)
Move(5)[dist]
Move(5)[dist]( ok = Log(dist), fail = Error() )

$((x)=>x+1)[next]

Selector(MyComp, "Init", hp)[v]

Shared(MyComp)("Tick", delta)

A() . B()[x] . C(x)
A() << B()[x] >> C(x)
```

**只要符合此统一形式，即为合法 DSL 调用。**

---

# **3.8 EBNF（修正版，与真实语义一致）**

**这是终版、语义完全正确的 EBNF：**

```
File            ::= (Import | Metadata | ConstDecl | Trigger | Component)*


###############
# Trigger
###############

Trigger         ::= "[" Identifier "(" ArgList? ")" OutputList? "]"
                    ChainExpr


###############
# Component
###############

Component       ::= "function" Identifier "(" ParamList? ")" "{"
                      InChain+
                      ReturnStmt
                    "}"

InChain         ::= InCall ConnSeq?

InCall          ::= "In" "(" InPort? ")"
InPort          ::= StringLiteral | IntegerLiteral

ReturnStmt      ::= "return" "ExecFunc" GenericTypeArgs? "(" PortList? ")" ";"


###############
# Chain Expression
###############

ChainExpr       ::= CallExpr (ConnOp CallExpr)*

ConnOp          ::= "<<" | ">>" | "."   // precedence: << >> > .

CallExpr        ::= PrimaryCall OutputList? CaseClause?

PrimaryCall     ::= Identifier "(" ArgList? ")"


###############
# Case Structure
###############

CaseClause      ::= "(" CaseList? ")"

CaseList        ::= CaseEntry ("," CaseEntry)*

CaseEntry       ::= CaseKey "=" ChainExpr

CaseKey         ::= Identifier | IntegerLiteral | StringLiteral


###############
# Arguments / Parameters
###############

ArgList         ::= Expr ("," Expr)*

ParamList       ::= Param ("," Param)*
Param            ::= Identifier ":" Type

OutputList      ::= "[" Identifier ("," Identifier)* "]"

PortList        ::= (StringLiteral ("," StringLiteral)*)?


###############
# Metadata / Const / Import
###############

Metadata        ::= "@" Identifier "(" MetadataObj ")"

MetadataObj     ::= "{" MetadataEntry ("," MetadataEntry)* "}"

MetadataEntry   ::= Identifier ":" Expr

ConstDecl       ::= "const" Identifier "=" Expr ";"

Import          ::= "import" ImportItems "from" StringLiteral ";"

ImportItems     ::= Identifier
                  | "{" Identifier ("," Identifier)* "}"


###############
# Expressions
###############

Expr            ::= Literal
                  | Identifier
                  | MemberExpr
                  | "(" Expr ")"

MemberExpr      ::= Identifier "." Identifier

Literal         ::= StringLiteral
                  | IntegerLiteral
                  | BooleanLiteral
                  | NullLiteral
```

---

# **3.9 本章总结**

本章提供以下内容：

* **所有 DSL 元素的语法外观**
* **统一调用结构：Node(args)[outs](cases)**
* **三种链操作符与优先级（<<、>> > .）**
* **Component 定义与调用的完整语法**
* **Case 分支语法（涵盖 If、Switch、Loop 等全部结构）**
* **数据节点 `$()` 的完整形式**
* **Selector / Shared 的合法写法**
