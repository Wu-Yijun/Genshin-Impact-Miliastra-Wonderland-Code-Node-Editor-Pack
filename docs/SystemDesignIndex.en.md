# Stellar Realm Editor Node Behavior Graph DSL (Domain-Specific Language) Design Specification Outline
<!-- @Version: 1.0.0 -->
<!-- @Author: Aluria -->

## 0. 前言 (Introduction)

### 0.1 为什么需要这套 DSL？

In domains such as games, interactive narratives, AI agent logic, and simulation systems, behavior logic is often constructed in the form of visual Node Graphs.

Node Graphs offer the following advantages:
*   **Intuitive Structure**: User-friendly for non-programmers, allowing them to see the flow of behavior.
*   **Easy Collaboration**: More suitable for level designers, planners, and numerical staff to co-edit.
*   **Strong Modularity**: Composite nodes (component) can be stacked like building blocks.
*   **Clear Constraints**: Graph structures are inherently non-concurrent, order-controlled, and strongly structured.

However, graph editors also have inherent drawbacks:
*   **Difficult to Version Control** (text diff is messy, binary formats are unreadable)
*   **Difficult for Team Synchronization** (multiple people modifying graph files simultaneously easily leads to conflicts)
*   **Difficult for Code Review** (PRs cannot effectively read and discuss graph structures)
*   **Visualization and Runtime Implementation are Often Coupled** (high migration cost, difficult to replace)

Therefore, we need a way to describe graph structures using pure text, while still maintaining the graph's readability and structural integrity.

This is precisely the goal of this DSL.

It aims for:
*   Pure text maintainability (diff, merge, review)
*   Highlighting, structured, intuitive
*   Reversible (Graph ↔ Text)
*   Stable, unambiguous parsability
*   Ability to carry all semantics of complex behavior graphs (branches, merges, Switch, choices, multi-outputs, composite nodes, etc.)
*   Provision for local runtime testing

More importantly, it should be understandable to users familiar with programming languages, reducing their cognitive load.

---

### 0.2 这套 DSL 是什么？

This DSL is a **"behavior graph description language" based on TypeScript syntax style**.

It has the following characteristics:
*   ✅ **TS can be used to render highlighted code to express graph structure** (Execution Graph)
    For example, chained syntax `.Fun1().Fun2()` represents sequential execution,
    `>> {0: ..., 1: ...}` represents branching,
    `If(cond)(true = ..., false = ...)` represents a selection node.
*   ✅ **Strictly defines execution flow (control flow) and computation flow (data flow)**
    *   **Control flow** determines the execution order of behavior logic.
    *   **Computation flow** (`$(()=>{})`) describes the calculation logic of nodes.
    *   The two interact through variable references.
*   ✅ **Supports Component as a reusable behavior unit**
    *   Uppercase first letter `function Component` = composite node with control flow
    *   Lowercase first letter `const lambda` = pure computation node
    *   Component can have its own triggers (scope is single file)
*   ✅ **Designed for "static description" rather than "runtime execution"**
    The goal of DSL is not to run code, but to:
    *   Be used to build visual graphs
    *   Be used for sharing, reviewing, version control
    *   Be used for transpiling into runtime formats (JSON/binary/engine internal structures)

Therefore, TypeScript syntax is allowed during evaluation, but TS runtime behaviors must not be mixed in.

---

### 0.3 目标与适用范围

The main goals of this DSL are:
1.  Provide complete static description capabilities for behavior graphs
    —— Including sequence, parallel, merge, conditional, Switch, multi-output, component, temporary variables, global variables, etc.
2.  Ensure clear and unambiguous semantics
    —— All variables, scopes, branch numbers, Branch id, and trigger behaviors have strict specifications.
3.  Possess strong readability and highlighting capabilities
    —— Similar to TypeScript in form, but actually a DSL.
4.  Ensure reversibility
    —— Can generate functionally equivalent node graphs from DSL.
    —— Generated graphs can be converted back to DSL, with consistent structure.
5.  Possess stable and testable parsing difficulty
    —— No "implicit semantics", no "magic syntax", all behaviors are explicit.

---

### 0.4 本 DSL 不是：

*   ❌ Not actual TypeScript, nor a scripting language
*   ❌ Not a runtime behavior script
*   ❌ Not an event-driven engine itself
*   ❌ Does not undertake real computation tasks (expressions are handled by `$(...)`)
*   ❌ Does not allow arbitrary TS standard library or functions (e.g., `Math.random`) to be mixed in

It is a text format for expressing graph structures.

You can think of it as:
*   ✅ **「A plain text version of Behavior Trees / Blueprints / Node Graphs」**
*   ✅ **「A structured, readable, and diffable graph description file」**
*   ✅ **「The source language input to graph editors / visualizers / transpilers」**

---

### 0.5 设计哲学（核心理念）

To enable text to perfectly describe visual behavior graphs, we follow three core principles:

**(1) Concise syntax, but behavior must be fully visible**
All control flow must be written explicitly:
*   Branches must be written as `>> {...}`
*   Merges must be written as `{... >> 0()}`
*   Selections must be written as `If()` or `Switch()`
Hidden behaviors are not allowed.

---

**(2) Variable naming and scope must be unambiguous**
*   Variable names within the same trigger execution tree must never be duplicated.
*   Variables referenced by `$(...)` must have clear semantics.
*   All variables must be traceable to a single source.
*   `Branch id` and scopes inside and outside Components are strictly isolated.
This ensures clear and controllable graph structures.

---

**(3) Behavior graph semantics take precedence over TypeScript semantics**
*   `.Fun1().Fun2()` is not a function call chain, but **node connection**.
*   Multiple lines within `{ }` are not a block, but **sequentially connected nodes automatically**.
*   `$(()=>{})` is not a lambda, but a **computation node**.
*   Literal types are encapsulated by the DSL, not TS's `number/string/bool`.
Code is merely the carrier; the true meaning is determined by behavior graph semantics.

**(4) The logic conveyed by the literal code is consistent with the runtime logic**
*   Under the most concise syntax possible, the code reading order and symbol styles are intuitive.
*   Even without familiarity with the complete syntax, one can infer the runtime logic by reading the literal meaning of the code.

---

### 0.6 文档结构简介

Subsequent chapters of this document will sequentially introduce:
1.  File Structure and Module Organization
2.  Syntax Rules and Writable Structures
3.  Control Flow and Computation Flow Behavioral Semantics
4.  Variable System and Namespaces
5.  Component and Cross-File Mechanisms
6.  Error Handling and Semantic Constraints
7.  Example Graphs and Example Code
8.  Intermediate Representation (IR) and Visualization Mapping
9.  Appendix (Keywords, Regular Expressions, Glossary, etc.)

---

## 1. 概览（概念与术语）

### 1.1 节点图核心概念

*   **触发器 (Trigger)**: The starting point of an execution flow. For example, `[OnCreate()]`, `[Timer("...")`].
*   **执行节点 (Execution Node)**: A node that performs specific operations in the control flow, e.g., `.Fun()`.
*   **运算节点 (Data Node)**: A node that performs pure computations in the computation flow, defined using `$(...)` syntax.
*   **复合节点 (Component)**: A subgraph encapsulating a set of execution nodes and/or computation nodes, which can be reused.
*   **分支锚点 (Branch Anchor)**: Used to mark specific locations in the control flow for other branches to jump or merge to, defined using `Branch["id"]`.

### 1.2 控制流 vs 运算流

*   **控制流 (Control Flow)**:
    *   **定义**: Describes the sequence, branching, selection, and merging of behavior execution.
    *   **表示**: Starts with `[Trigger]`, and connects execution nodes in a chain via `.` , `>>`, `If()`, `Switch()`, `>> {}` and other syntax.
    *   **特性**: Control flow is the main trunk of the graph, determining which nodes will be activated and in what order.
*   **运算流 (Data Flow)**:
    *   **定义**: Describes the computation process for data required by nodes.
    *   **表示**: Defined using `$(...)` syntax, attached to an execution node, or as a function parameter.
    *   **特性**: Computation flow is lazily evaluated. Only when the control flow activates an execution node, will the computation flow required by that node be computed (in real-time).

### 1.3 图的基本约束

*   **无环 (Acyclic)**: No cycles are allowed in the control flow or data flow within the graph. Any occurrence of a cycle should be treated as a compile-time error.
*   **单线程 (Single-Threaded)**: All executions are treated as occurring strictly in sequence on a single thread, with no concurrency or race conditions.
*   **深度优先 (Depth-First)**: The execution of parallel branches (`>> {}`) and component exits (`Out()`) follows a strict depth-first order.

## 2. 文件与模块组织

### 2.1 单文件图 (Graph Module)

*   **文件级语义**: A `.ts` file (a specific suffix like `.graph.ts` is recommended) corresponds to a complete, independent node graph (Graph Module).
*   **执行流隔离**: Control flow is strictly confined within a single file, and cross-file jumps, branches, or merges are not allowed.

### 2.2 文件头部声明

Typically, the functions, structs, global states, and temporary variables required by the graph are defined at the top of the file:

*   **导入全局环境 (Env)**: `import "./global_env.d.ts"`.
*   **导入函数 (Imports)**: `import { my_add, MyComponent } from "./other_graph.ts"`.
*   **全局结构体 (Structs)**: `declare global{ interface MyStruct { a: int, b: string }}`.
*   **全局计时器 (Timers)**: `declare global{ namespace Timer { const MyTimer: CountDown<5>; }}`.
*   **全局信号 (Signals)**: `declare global{ namespace Signal { function MySignal(a: int): Signal; }}`.
*   **全局实体变量 (Self)**: `declare global{ namespace Self { const val: float = 1; }}`.
*   **节点图变量 (Node)**: `declare namespace node { const config_list: List; }`.
*   **临时变量 (Temporary)**: `const _temp_val: int = 0n`.
*   **组件 (Component)**: `function MyComponent(arg1: int) { ... return ExecFunc<{ ret_args }>(); }`.
*   **求值函数 (Lambda)**: `const my_calc_fun = (arg1: int) = > { ... };`.

The core design philosophy is that definitions of different functionalities are represented in different forms; uppercase indicates global and execution nodes, while lowercase and underscores correspond to local and pure computations.
At the same time, it ensures that definitions in different scopes can be applied to those scopes under TS syntax. Projects we define within `declare global` are also cross-file in TS syntax.

### 2.3 跨文件规则

*   **导入**: Can import `Component` (composite nodes) and `const` (pure computation functions) defined in other files.
*   **隔离执行**: Importing a `Component` only imports its *template definition*. When calling that `Component`, it will be instantiated and executed in the context of the *current* file's graph.

## 3. 语法概要（用户可写的约定语法）

### 3.1 触发器语法

The starting point of the execution flow, must be written at the beginning of a line and enclosed in square brackets.

*   `[OnCreate()]`
*   `[OnDestroy()[target]]` (with output variables)
*   `[Timer(Timer.MyTimer)]`
*   `[Signal(Signal.MySignal)[a, b]]` (with output parameters)

### 3.2 顺序链与方法调用链

*   `.X().Y().Z()...`: Indicates that after `X` finishes execution, it automatically connects to `Y`, and so on.
*   `X() >> Y() >> Z()`: Equivalent to the `.` chain in sequential execution.
*   `X() << Y() >> Z()`: Indicates that `Z()` is suspended, and `Z()` and subsequent methods are executed first.

Design Philosophy: The core is the call chain represented by `.`; to ensure type legality of `{}` in the call chain, the `>>` operator was introduced;
The suspension operation is somewhat counter-intuitive and generally has no use cases, but the control flow exit of components follows the last-executed logic. To ensure consistency, the `<<` operation, which executes last, was introduced.

### 3.3 分支（并行）语法

Uses the `>>` symbol followed by a `{}` block to represent parallel branches; single-threaded runtime determines that they are executed sequentially in order.

*   `...X() >> { 0: Y(), 1: Z() }`
*   **Rule**: Branch keys must be **numeric literals**, and determine the depth-first execution order in ascending order (0, 1, 2...).

### 3.4 合流（跳转）语法

*   **Anchor Definition (Trigger Style)**: `Branch["id"].X()` (defines the start of a new chain)
*   **Anchor Definition (Chain Internal Style)**: `.Y().Branch["id"].Z()` (marks an anchor after `Y`)
*   **Jump**: `.Z() >> "id"()` (after `Z` finishes, jump to the "id" anchor)
*   **Block Merge**: `>> { 0: X() >> 0(), 1: Y() >> -1(), 2: Z() >> 1(), 3: W() >> "id"() }`
    *   `>> 0()` is special syntax, meaning "merge back to the main flow *after* the `>> {}` block".
    *   `>> -1()` is special syntax, meaning "Do nothing", designed for consistency.
    *   `>> 1()` and `>> "id"()` have no special properties, meaning execute user-defined anchors.

Design Philosophy: Forming a function-like style by adding parentheses after literals intuitively behaves as a function call: internal logic executes first, then returns to execute subsequent nodes.

### 3.5 选择语法 (If / Switch)

*   `If(cond)(true = ..., false = ...)`
*   `Switch(val)(lit1 = ..., lit2 = ..., null = ...)` (`null` for the
    default branch)
*   **Rule**: `Switch` branch keys must be literals (integers, strings, booleans).
*   **Shorthand Syntax (Syntactic Sugar)**:
    *   `If(cond).X()` is strictly equivalent to `If(cond)(true = 0(), false = -1()).X()`.
    *   `Switch(val).X()` is strictly equivalent to `Switch(val)(null = 0()).X()`. (The parser should issue a warning here, indicating the lack of explicit branches).

Design Philosophy: Curly bracket dictionaries have good orderliness and cannot be directly connected after functions, so they are assigned to branch syntax; square brackets are occupied by output variables, and reuse is prone to ambiguity;
Parentheses are closely related to function execution and are more suitable as selection syntax, also having good differentiation from curly bracket dictionaries.
Most selection syntaxes only use a single branch; the shorthand syntax sets the default If branch to true, maintaining reading consistency.
If Switch branches have default behavior, it can lead to ambiguity when reading the code, so it is set as undefined behavior.

### 3.6 复合节点（Component）定义

*   **With Control Flow**: `function ComponentName(a: int) { ... return ExecFunc<{ ret_args }>() }` (uppercase first letter)
*   **Pure Computation**: `const func_name = (a: int): int => { ... }` (lowercase first letter, underscore separated)

Through functions and closures, control flow and computation are clearly distinguished at the point of definition. The significant difference in naming conventions helps distinguish auto-completed functions in the editor.

### 3.7 运算 ($) 语法

*   **Single Output**: `.$((a) => a + 1)[out_val]`
*   **Multiple Outputs**: `.$((a,b) => { return [a+b, a-b]; })[s, t]`
*   **Multiple Output Mapping**: `.$((a,b) => { return {x: a*b, y: a/b} })[val_x = x, val_y = y]`
*   **Capture List**: `(a,b)` in `$( (a,b) => ... )` is a *mandatory* and complete **function output variable dependency list**.

Design Philosophy: Throughout this DSL, the declaration and naming of function outputs are the most arbitrary and difficult to observe. Therefore, users are forced to list function output dependencies;
This helps check for omissions and duplicate definitions, and also enhances code context readability.

### 3.8 临时变量与 SetVal

*   **Declaration**: `const _x: int = 0n;` (must be at the file top-level or Component top-level)
*   **Modification**: `.SetVal(_x, new_val)`. `SetVal` can also be used to modify `Self.val` or `node.val`.

Design Philosophy: The function names of many system functions are set to be consistent, distinguished only by function signature overloading, with runtime dynamic type determination.
Functions with similar functionalities can also be set as the same function, introducing additional parameters to control behavior.
Users should not have to remember a large number of function names, or search through extensive auto-completion lists, but rather write out the function first and then decide what to input based on the function signature.

### 3.9 锚点 Branch id 格式

Branch id must be a **literal** (string, positive integer), marking anchors via `Branch[100]` or `Branch["MyBranch"]`. Using string literals is recommended to enhance readability.

Design Philosophy: One of the few `variableName+squareBrackets`; the other place is triggers enclosed in square brackets. This is also to enhance visual prominence and facilitate finding corresponding anchors.

## 4. 类型系统与命名约定

### 4.1 字面类型集

`Int`, `Float`, `Bool`, `Str`, `Vec`, `Entity`, `GUID`, `Prefab`, `ConfigId`, `Faction`, `List`, `Dict`, and user-defined `Struct`.
These types encapsulate values as classes, all derived from the `SysTypeBase` class. To reduce boilerplate code for creating literal values of primitive types, primitive types `int`, `float`, `bool`, `str` (corresponding to `bigint/number/boolean/string`) are used as equivalent representations for literal values and basic derived classes.

### 4.2 命名空间

The system defines four strictly isolated namespaces. Variables with the same name in different spaces **will not** conflict. Temporary variables must be prefixed with `_`.

1.  **`function outputs` (Function Outputs)**:
    *   Source: `[Trigger()[a]]`, `.Fun()[b]`, `$(...)[c]`
    *   Characteristic: Read-only.
2.  **`global (Self)` (Global Variables)**:
    *   Source: `namespace Self { ... }`
    *   Characteristic: Persistent, assignable via SetVal.
3.  **`node vars (node)` (Node Graph Variables)**:
    *   Source: `declare namespace node { ... }`
    *   Characteristic: Persistent (graph singleton), assignable via SetVal.
4.  **`temporary (_x)` (Temporary Variables)**:
    *   Source: `const _x: int = ...`
    *   Characteristic: Single trigger tree lifecycle, assignable via SetVal.

### 4.3 唯一性约束

*   **`function output`**: The variable name (i.e., alias, such as `x` in `[x = out]`) must be unique within the **same trigger execution tree**.
    *   `[OnCreate()].X()[a]` and `[OnCreate()].Y()[a]` are **illegal** (`a` is duplicated).
    *   `[OnCreate()].X()[a]` and `[OnDestroy()].Y()[a]` are **legal** (different trigger trees).
    *   `[OnCreate()].Z()[a = out]` and `[OnCreate()].Z()[b = out]` are **legal** (external aliases `a` and `b` are different).
*   **`Branch id`**: Must be unique within the **same scope** (file top-level or inside a Component).
    *   Defining `Branch["MyBranch"]` and `.Fun().Branch["MyBranch"]` in the same file is **illegal** (duplicate definition).

Design Philosophy: Node graphs are DAGs, but branching behavior can lead to cross-data references: `If(i)(true="A"()>>"B"(), false="B"()>>"A"()); Branch["A"].X()[x]; Branch["B"].Y(x)[y];`.
In this flow, the sequential relationship between X and Y calls is uncertain; execution might reference data forward or backward. The graph's topological structure ensures the uniqueness of data references, but data validity cannot be guaranteed.
Therefore, when the compiler analyzes naming conflicts, it will search for name tags in all upstream and downstream reachable nodes for each reference, verifying the uniqueness of the source and clarifying reference relationships.

## 5. 控制流语义（详细）

### 5.1 触发器

A trigger is the sole entry point of an execution flow. Triggers located inside a `Component` are registered on the file-level graph instance. Multiple connections to the same trigger are considered part of the same execution tree, allowing for mutual connections between variables.

### 5.2 顺序链

Within the same `>> {}` block, `If/Switch` branch, or top-level chain, nodes written as `.Fun()` or `>> Fun()` are automatically connected in sequence.

### 5.3 并行分支 ( `>> {...}` )

*   All branches within a `>> {...}` block are considered to execute "in parallel" (although sequentially in a single-threaded environment).
*   **Execution Order**: Strictly follows the **integer literal ascending order** of the branch keys, executing **depth-first**.
    *   In `>> { 1: X(), 0: Y() }`, the chain containing `Y()` (key=0) will execute before the chain containing `X()` (key=1).

### 5.4 多入节点语义

*   **Rule**: When multiple control flow edges (from parallel branches or `>> "id"` jumps) converge into the same node, that node will be **activated multiple times**, triggered once for each incoming edge.
*   **No Automatic Merging**: Nodes themselves do not have "wait for all inputs" logic; they are triggered immediately.

### 5.5 合流语义

*   **`>> 0()` (Block Merge)**:
    *   Used inside `>> {}` or `If/Switch` blocks.
    *   Semantics: The execution flow jumps to the first main trunk node *after* that block.
    *   Edge Case: If there is no main trunk node after the block (i.e., the statement ends), `>> 0()` is a valid "no-op" (equivalent to `>> -1()`), but the compiler will issue a warning.
*   **`Branch["id"]` (Anchor Merge)**:
    *   `Branch["id"].FunX()` or `.FunY().Branch["id"]` is used to **define** an anchor.
    *   `.FunZ() >> "id"()` is used to **jump** to that anchor.
    *   **Error**: Duplicate definition of Branch id or `>> "id"()` to a non-existent id are compile-time errors.

Design Philosophy: Block merging and anchor merging are formally consistent, except that block merging reserves the names 0 and -1. This consistency of behavior using a consistent definition method is common in this DSL design.

### 5.6 If / Switch 选择语义

*   **Single Branch**: `If` and `Switch` guarantee that only one control flow path will be executed.
*   **Branch Keys**: `Switch` keys must be literals, not variables.

### 5.7 链式与延迟执行操作符 (>> vs <<)

*   **`>>` (Sequential Chain)**:
    *   Semantics: `A >> B >> C` is equivalent to `A.B.C`.
    *   Execution Order: A completes -> B completes -> C completes.
    *   Equivalent Expansion: `A >> {0: B, 1: 0()}.C`.
*   **`<<` (Deferred/Suspended Execution)**:
    *   Semantics: `A << B >> C...` means that after A executes, C and all its subsequent content execute first. After the entire chain of C is completely finished, B is then executed.
    *   Equivalent Expansion: `A >> {0: 0(), 1: B}.C...` (Note: Here B is in branch 1, and C follows the merge of branch 0, but by definition, `<<` implies that B executes *after* C in reverse logic, or more accurately, "suspend B, proceed with main trunk C").
    *   **Multiple Suspensions**: When there are multiple `<<` in a chain (e.g., `A << B << C >> D`), the execution order is: main trunk `D` executes first, then `C` after `D` completes, then `B` after `C` completes. This means "the later suspended executes first" (stack-like behavior) or "suspended nodes execute sequentially from back to front".

## 6. 运算流语义 (详细)

### 6.1 `$(...)` 定义与求值

*   `$(...)` is the only way to create computation flow nodes.
*   **Evaluation Timing**: A computation node is only evaluated in real-time when its generated output is **referenced by an execution node**.
*   **Position in the Execution Chain**:
    *   In strict mode, a computation node must be located before the referenced position; only computation nodes traversed by the call chain under the current trigger tree can be referenced.
    *   In relaxed mode, a computation node can be located after the referenced position, but it must be ensured that this position is on an reachable path from the reference position.

### 6.2 `$(...)` 依赖与捕获

*   **Capture List**: `(a,b)` in `$( (a,b) => ... )` is a **mandatory** dependency capture list.
*   **Rule 1 (Exhaustive Listing)**: All `function output` variables used inside `$(...)` **must** be declared in the capture list.
*   **Rule 2 (Exception)**: `Self.*`, `node.*` variables do not need (and should not) be declared in the capture list; they can be accessed directly.
*   **Rule 3 (Optional)**: `_x*` temporary variables can be declared in the capture list, which enhances logic but also increases memory burden during reading.
*   **Error (Blocking)**:
    *   `.$((a) => a + b)` —— `b` is not in the capture list `(a)`, compile-time error.
    *   `.$((a, node) => a + node.b)` —— `node` should not appear in the capture list `(a, node)`, compile-time error.
*   **Rule 3 (Default Value)**:
    *   If a variable `x` *is already* in the capture list (e.g., `.$((x) => ...)`), but `x` originates from an `If/Switch` branch that has not yet executed, referencing `x` at this time **will not cause an error**.
    *   `x` will return its type's default value (`0`, `false`, `""`, etc.).

### 6.3 多次调用语义

*   If two *different* execution nodes (e.g., `A` and `B`) both depend on the same computation node (or `const` pure function), that computation node will be evaluated once when `A` is activated, and *again* when `B` is activated.
*   Within a *single* execution node, even if multiple input parameters depend on the same computation node, that computation node is evaluated only once.

## 7. 变量与生命周期

This DSL includes four strictly distinguished variable namespaces:

### 7.1 `function outputs` (Function/Node Outputs)

*   **Source**: `[OnTrigger()[a]]`, `.Fun()[b]`, `$(...)[c]`.
*   **Lifecycle**: Valid within the "same trigger execution tree".
*   **Semantics**: **Read-only**. Once created, its value is immutable within the current execution tree.
*   **Constraint**: Under the same trigger tree, its (alias) name must be unique.

### 7.2 `global (Self)` (Global Variables)

*   **Source**: `declare global { namespace Self { val: int = 0; }`.
*   **Lifecycle**: **Persistent**. Spans all triggers, bound to the mounted instance.
*   **Semantics**: **Read/Write**. Modified via `.SetVal(Self.val, ...)`.

### 7.3 `node vars (node)` (Node Graph Variables)

*   **Source**: `declare namespace node { list: List; }`.
*   **Lifecycle**: **Persistent**. Exists as an instance of the graph, with a new instance created each time it's mounted.
*   **Semantics**: **Read/Write**. Modified via `.SetVal(node.list, ...)`.

### 7.4 `temporary (_x)` (Temporary Variables)

*   **Source**: `const _x: int = 0`.
*   **Lifecycle**: **Single Trigger**. Created (reset to initial value) each time the trigger is activated, destroyed when the execution tree ends.
*   **Semantics**: **Read/Write**. Used to pass mutable state between different nodes in the same execution tree. Modified via `.SetVal(_x, ...)`.

## 8. 复合节点 (Component) 语义

### 8.1 定义与调用

*   `function ComponentName(...)` (uppercase first letter): Defines a composite node containing control flow.
*   `const func_name = (...)` (lowercase first letter, underscore separated): Defines a pure computation function, which can only be called inside `$(...)` or as an execution node parameter.

### 8.2 内部触发器

Components can define internal triggers (e.g., `[OnCreate()]`). These triggers are considered registered on the *file-level* graph, not on the Component instance, sharing a trigger internally and externally.

### 8.3 作用域隔离

*   **`Branch id` Isolation**: `Branch["id"]` defined inside a Component is not visible externally. External code also cannot `>> "id"()` jump into a Component.

### 8.4 入口与出口语义

*   **`In()` (Entry Point)**: `In()` marks the Component's valid control flow entry point, and also the position that triggers the subsequent execution chain. For multiple entry points, `In("Id")` can be used to distinguish them.
*   **`return` (Declaration)**: `return ExecNode<{out_val: type}>("exit_id_1", "exit_id_2")` is used to *declare* the Component's parameter outputs and a list of valid control flow exit IDs. An empty ID list represents a single default exit.
*   **`Out()` (Trigger Exit)**: Calling `.Out()` inside a Component triggers the default exit; `Out("exit_id_2")` distinguishes exit locations.
*   **Error (Blocking)**: Calling `.Out("invalid_id")` will result in a compile-time error if `"invalid_id"` is not in the `return` declaration list.
*   **Execution Timing (Depth-First)**:
    *   When `.Out()` is called, the control flow will **jump to suspend the external operation**, continue executing subsequent content, wait for internal operations to complete, and then trigger the return to execute external nodes.
    *   The behavior of `A().Out().B()...` is equivalent to `A() << Out() >> B()...`.
    *   The execution order of multiple branches and `Out()` in a chain is consistent with the order of the equivalent represented structure.
    *   The `Out()` operation is always attached to the previous node and always executes as the last branch of the previous node.

## 9. 跨文件规则与模块化

*   **Execution Flow Isolation**: Control flow cannot cross file boundaries.
*   **Import Template**: `import { MyComponent }` imports the template definition.
*   **Local Instantiation**: When calling the imported `MyComponent()`, it will be instantiated and executed in the context of the *current* file. Its internally defined `Branch id` remains subject to its own isolation constraints.

## 10. 错误/警告策略 (实现建议)

### 10.1 错误 (阻断)

*   **Naming Conflicts**:
    *   `function output` alias is duplicated in the same trigger tree.
    *   `Branch id` is duplicated in the same scope.
*   **Dependency/Reference Failure**:
    *   `$(...)` references a `function output` not declared in the capture list.
    *   `>> "id"` jumps to an undefined `Branch id`.
    *   `Out("id")` triggers an exit not declared in `return`.
*   **Structural Errors**:
    *   Control flow or data flow cycles detected.
    *   `Switch` uses a non-literal as a branch key.
*   **Illegal Usage**:
    *   Calling a pure computation function (`const funcName`) outside of `$(...)`.
    *   Calling a `Component` with control flow (`function ComponentName`) inside `$(...)`.

### 10.2 警告 (允许，但提示)

*   `Switch(val).FunX()`: Uses the shorthand `Switch` syntax, resulting in only the `null` (default) branch executing the subsequent main trunk.
*   `>> 0`: Used at the end of a `>> {}` or `If/Switch` block, but no main trunk flow to merge with afterward.

---

## 11. 示例与片段

### 11.1 单路径顺序流
(示例代码留空)

### 11.2 多分支并行与合流
(示例代码留空)

### 11.3 Switch/If 示例
(示例代码留空)

### 11.4 component 内含触发器示例
(示例代码留空)

### 11.5 临时变量与 SetVal 示例
(示例代码留空)

### 11.6 $() 多输出示例
(示例代码留空)

---

## 12. 中间表示 (IR) 建议 (紧凑)

*   **GraphModule**: File-level container, includes all Triggers, Components, and Declarations.
*   **TriggerNode**: Execution flow start point.
*   **ExecNode**: Execution node (e.g., `FunA`).
*   **DataNode/EvalNode**: Computation node (e.g., `$(...)`).
*   **Edge (Control/Data)**: Explicitly connected edges.
*   **BranchAnchor**: IR representation of `Branch["id"]`, as a jump target.
*   **ComponentTemplate**: Definition of `function ComponentName`.
*   **ComponentInstance**: Call instance of `ComponentName()`.
*   **SymbolTable/VariableSymbol**: Used for managing the four namespaces and checking uniqueness and dependencies during parsing.
*   **Merge/Select Nodes**: Explicit IR nodes used to represent `>> {}` (parallel) and `If/Switch` (selection) logic.

---

## 13. 可视化 & 逆向映射 (留档)

### 13.1 从代码到图

*   `.FunA().FunB()` maps to `[Node A] -> [Node B]`.
*   `.FunA() >> { 0: FunB(), 1: FunC() }` maps to `[Node A]` forking to `[Node B]` and `[Node C]`.
*   `.FunA() >> "id"` and `Branch["id"].FunB()` map to an explicit jump edge from `[Node A]` to `[Node B]`.
*   `$(...)` nodes should be visualized as data sources attached to their execution nodes.

### 13.2 从图到代码

*   **挑战**: Maintaining the stability and readability of `Branch id` is key to "Round-trip".
*   **建议**: When saving to a binary graph format, the editor should retain (or automatically generate) `Branch id`s used for merging, to restore the structure when reverse-transpiling back to DSL.

---

## 14. 附录

### 14.1 关键字汇总
(留空，待填充)

### 14.2 字面量 & 正则约束
(留空，待填充)

### 14.3 错误码/警告码列表（草案）
(留空，待填充)

### 14.4 术语表
(留空，待填充)