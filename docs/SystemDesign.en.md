# **Preface**

## **0.1 Background and Motivation**

In complex interactive systems, game logic, event-driven frameworks, and behavior tree/node graph editors, developers typically construct logic using "visual node graphs." While graphical interfaces are beginner-friendly, they expose numerous problems in practical engineering:

*   **Difficult to review and discuss**: Graph structures cannot be directly `diff`ed in text form, nor are they suitable for Code Review.
*   **Difficult to manage versions**: Node graph serialization formats are often verbose and hard to read, making changes difficult to track and conflicts hard to resolve.
*   **Difficult to perform batch modifications and automated checks**: Textual representation lacks structure, making it challenging for tools to analyze and optimize.
*   **Difficult to express complex logic**: Visual graphs lack hierarchical abstraction and have limited reusability.

Therefore, this `DSL` aims to provide a **readable, reviewable, comparable, and reconstructible** textual description for node graphs, giving them the same maintainability and collaborative capabilities as code engineering.

## **0.2 Language Positioning**

This language is neither a subset nor an extension of `TypeScript`, nor is it an "executable script language."
Although it borrows common `TypeScript` structures in its surface syntax (e.g., function declarations, arrow functions, chained calls), it's important to note that:

> **All language constructs are based on the "node graph behavior model" as their true semantic foundation,
> rather than on `TypeScript`'s execution model.**

In other words:

*   `.A().B().C()` does not mean "calling a method of a JS object," but rather constructing a **depth-first control flow chain**;
*   `$((a,b)=>a+b)` is not executing an expression in JS, but defining a **Data Node**;
*   `function X() { In(0)...Out("done") }` is not an executable function, but a **reusable graph structure (`Component`)**.

This `DSL` is a **structured behavior graph description language**, designed not "to let developers write programs," but rather **to express graph structures in a stable, unambiguous, and reproducible textual form.**

## **0.3 Design Goals**

The core goals of this language include:

1.  **Round-trip Reversibility**
    Text must be able to reconstruct a visual node graph without loss, and a graph must be able to convert back to text without loss.

2.  **Reviewability**
    Code review processes must be able to directly understand, discuss, and compare `DSL` text.

3.  **Maintainability and Evolvable Nature**
    The syntax must be stable, clearly structured, and suitable for automated processing by toolchains (`LSP`, formatting, refactoring).

4.  **Readability**
    Readers should be able to understand the logical structure, execution order, and data transfer patterns without needing to know the specific engine implementation.

5.  **Controllability (Principle of Minimal Expression)**
    The language prohibits unnecessary degrees of freedom, avoiding implicit side effects or ambiguous semantics.

## **0.4 Design Constraints and Core Philosophy**

To achieve the above goals, this `DSL` adopts several strict design constraints and philosophies. These constraints are not meant to restrict users, but rather to limit "sources of ambiguity and potential bugs," as emphasized:

> **Explicit is always safer than implicit.
> Less inference means fewer types of bugs.
> Less ambiguity means more maintainability.**

This philosophy is reflected in all core rules of the language:

### **① Explicit Over Implicit Principle**

All semantics must be fully written out explicitly:

*   `Capture List`s must be explicitly written, e.g., `$((a,b)=>...)`, implicit closure capture is prohibited.
*   Control flow must be clearly written as `.A().B()` or `>> {}`, not implied by indentation or block structure.
*   All exits must be explicitly `Out()`.
*   All jump points must explicitly write anchors `Branch["id"]`.

The motivation is not for ease of implementation, but:

> **To avoid hidden semantics, prevent inference errors, reduce misunderstandings and visual burden, and reduce bugs at the source.**

### **② Structure Over Expression Principle**

All language constructs primarily serve to express graph structure, rather than for writing convenience or expressive power:

*   `.A().B()` expresses an execution chain, not object method tracing.
*   `>> {}` expresses a parallel branch structure, not a literal object.
*   `$()` expresses a `Data Node`, not an evaluation in a script language.
*   `Component` is used for reusing subgraphs, not for subprogram calls.

The core essence of `DSL` is "structured graph description," not a general-purpose script language.

### **③ Strict Separation of Control Flow and Data Flow**

Control flow is determined only by chained calls, branches, anchors, and `Component` entry and exit points.
All computations can only occur within `$()`.

This clear separation helps to:

*   Clearly analyze the execution order.
*   Uniformly manage the data dependency graph.
*   Avoid confusion caused by mixing logical expressions in control nodes.
*   Fundamentally eliminate bugs arising from mismatched expression order and execution order.

### **④ Single-Threaded Depth-First Execution Model**

`DSL` does not simulate free jumps or multi-threading of scripts, but rather simulates the execution model of a visual node graph:

*   The main chain is depth-first.
*   Branches execute in numerical order.
*   `<<` places nodes into a deferred stack.
*   `Component` entry and exit are equivalent to push/pop stack structures.

This model ensures:

*   Clear and predictable Control Flow semantics.
*   Easy static analysis.
*   Complete consistency between text and graph.

### **⑤ Avoid Inference (No Hidden Inference)**

Avoid automatic inference of semantics as much as possible:

*   `Capture List`s must be explicit.
*   Variable lifetimes strictly follow the node graph model.
*   Branch keys must be literals.
*   `Switch` keys must be literals.
*   All `In` / `Out` must be explicitly written.
*   `Component`'s `return` must explicitly list visual ports.

Less inference means more stable semantics; more stable semantics means more reliable toolchains.

### **⑥ Consistency with Runtime Graph Model Principle**

Language semantics must be completely consistent with the engine's actual node graph runtime model, rather than adopting a traditional programming language model.

This ensures:

*   Developers will not encounter semantic mismatches when converting between text and visual graphs.
*   Runtime behavior is completely consistent with expectations in the graph editor.
*   Toolchains can jointly use a unified graph structure (`GraphModel`).

## **0.5 Scope of Use and Non-Goals**

The scope of this language is clear:

*   **Used to describe the behavior structure of node graphs.**
*   **Used to write visual logic `Component`s.**
*   **Used for static analysis, verification, refactoring, and visualization generation.**
*   **Used for multi-person collaboration and version management.**

This language is **not**:

*   A general-purpose script language.
*   A `TypeScript` subset.
*   An execution environment.
*   A language with dynamic type inference.
*   A tool for writing complex numerical algorithms, computationally intensive logic, or framework code.

`DSL` is more like a "structurable blueprint source code format" than a traditional programming language.

## **0.6 Summary: `DSL`'s Value Proposition**

The fundamental value of this language lies in:

> **Providing a purely textual, unambiguous, maintainable, reversible, and collaborative way to express complex node graphs, with minimal syntax, strictest rules, and clearest structure.**

It is not designed "to make it easier for developers to write code,"
but rather "to make node graph logic more reliable, more readable, more toolable, and less prone to bugs."

This is the core design philosophy of this `DSL`.

# **1. Overview**

This chapter systematically summarizes the core concepts and basic semantics of this `DSL`, laying the foundation for the detailed syntax rules and execution model discussed in subsequent chapters. It covers the basic structure of node graphs, syntax composition, Control Flow and Data Flow patterns, the `Component` system, and the principles of the Execution Model.

## **1.1 Node Graph (`GraphModel`) Basic Structure**

The logic described by this `DSL` is essentially a **directed acyclic graph (`DAG`) of "Behavior Execution Graphs."** This graph is composed of four types of structural nodes:

### **1.1.1 Trigger Node (`Trigger`)**

A `Trigger` is an entry point for a node graph, used to respond to events or periodic callbacks, for example:

```ts
[OnCreate(arg)[out]]
```

Features:

*   Each `Trigger` represents an independent entry point for a graph.
*   `Trigger`s can have input parameters and output values.
*   A single file can define multiple `Trigger`s; they share the same node graph declaration space but execute independently.
*   A `Trigger` always acts as the root node of Control Flow, and the subsequent chained syntax builds the entire execution path.

`Trigger` corresponds to the **Start Node** in the graph.

### **1.1.2 Execution Node**

An Execution Node is the most basic functional unit in the graph, generated by chained calls like `.Func()`, for example:

```ts
.Log("hello").Move(x, y).Check()
```

Characteristics:

*   Execution Nodes have clear **execution side effects** or **logical operations**.
*   Execution Nodes can receive parameters and return one or more output values.
*   Execution Nodes are activated and executed sequentially according to the Control Flow order.

Execution Node corresponds to the **Action Node** in the graph.

### **1.1.3 Data Node**

All computations are performed through Data Nodes created with the `$()` syntax:

```ts
.$((a, b) => a + b)[sum]
```

Characteristics of Data Nodes:

*   Computations are pure functions, containing no side effects.
*   They do not participate in Control Flow, acting only as sources of data dependencies.
*   Explicit declaration of Capture Lists is required to avoid implicit closures or inferred behavior.
*   Evaluation timing is based on Data Flow backtracking rules, not writing order.

Data Node corresponds to the **Compute Node** in the graph.

### **1.1.4 Branch Anchor (Anchor Node)**

An anchor is used to name a location in the graph for jumping and merging, for example:

```ts
Branch["Continue"]
```

Features:

*   An anchor must be unique within its scope.
*   An anchor itself is not an Execution Node, but it marks a Control Flow entry point.
*   Anchor names must be string literals.

An anchor corresponds to the **Anchor/Label Node** in the graph.

## **1.2 Control Flow Model**

Control Flow indicates the activation order among Execution Nodes and is one of the core semantics of this `DSL`. Control Flow is expressed explicitly, including sequential chains, branching structures, jump structures, and `Component` calls.

### **1.2.1 Sequential Chain**

Sequential chains are built through chained calls:

```ts
.A().B().C()
```

This represents a depth-first execution order:

1.  Execute A
2.  Execute B
3.  Execute C

Characteristics:

*   Sequential chains are the basis of all Control Flow.
*   Connected by "`.`", each call creates a new Execution Node.
*   No implicit jumps or branches; all control transfers must be explicitly declared.

### **1.2.2 Branching Structure**

Use `>> {}` to create parallel branches:

```ts
>> {
  0: .DoA()
  1: .DoB()
}
```

Rules:

*   Each sub-branch uses an integer literal as its key (0, 1, 2 …).
*   Branches execute in ascending numerical order, depth-first.
*   After a branch finishes, the merge point must be explicitly specified; otherwise, the subsequent main chain will not execute automatically.

### **1.2.3 Merge and Goto**

`DSL` supports three explicit control transfers:

1.  **Structural Merge** (returns to number 0)

    ```ts
    >> 0()
    ```

2.  **Anchor Merge / Jump**

    ```ts
    >> "id"()
    ```

3.  **Pre-declared Anchor**

    ```ts
    Branch["id"].Next()
    ```

Core principles:

*   All jumps must be explicitly written.
*   No implicit fall-through behavior is provided.
*   Merging does not wait for other branches, unless a specific structure (e.g., `Loop`/`Join`) is used.

### **1.2.4 Component Call Control Flow**

A `Component` behaves as a subgraph in Control Flow:

```ts
.ComponentX(a, b)[out].Continue()
```

Its behavior is similar to an Execution Node, but it has:

*   A separate control subgraph.
*   Independent inputs/outputs.
*   Its own defined entry `In()` and exit `Out()`.

`Component` execution follows the standard depth-first model, temporarily storing subsequent nodes via `<<`.

## **1.3 Data Flow Model**

This `DSL` clearly distinguishes between **Control Flow (execution order)** and **Data Flow (data dependencies)**.

All computations must use `$()`:

```ts
.$((x, y) => x * y)[product]
```

Data Flow characteristics:

*   Computation nodes do not affect Control Flow.
*   Data transfer between Execution Nodes must be done through Capture Lists.
*   The order, names, and sources of Capture Lists must be explicitly declared by the user.
*   Data Node evaluation is based on dependency backtracking, not code writing order.

### **1.3.1 Capture List**

A Capture List is the "dependency declaration" for all Data Nodes:

```ts
$( (a, b, c) => a + b + c )
```

Capture Lists must be explicitly declared for reasons including:

*   Avoiding ambiguity caused by implicit closure captures.
*   Eliminating inferred behavior, reducing potential bugs at the source.
*   Making the data dependency structure clear and analyzable.
*   Ensuring toolchains can check and optimize.

Captured variables can come from:

*   Function outputs.
*   Temporary variables `_x`.
*   Node variables `node.x`.
*   Global variables `Self.x`.

### **1.3.2 Evaluation Timing**

The actual evaluation of Data Nodes follows:

*   **Dependency-based backtracking**: All captured variables must either be produced first or have default values.
*   **Strict mode**: Captured values in unexecuted branches default to their initial values and generate a warning.
*   **No side effects**: Computation nodes do not change any state.

Data Flow and Control Flow are always separated.

## **1.4 Component Model**

A `Component` is a reusable subgraph, declared using function syntax:

```ts
function CheckValue(input: int) {
  In(0)
    .Compare()
    .Out("ok")
}
```

The essence of a `Component` is a encapsulated Control Flow and Data Flow structure.

### **1.4.1 Component Structure**

A `Component` contains:

*   One or more entry points `In()`.
*   One or more exit points `Out()`.
*   Internal Control Flow and Data Flow.
*   Local variable space.
*   Explicit visual port declarations `return ExecFunc({ ...outputs })`.

### **1.4.2 Component Instantiation Semantics**

When calling a `Component`:

*   An independent execution subgraph instance is created.
*   This instance's variable space, anchor space, and execution chain are independent.
*   After `Out()` returns, Control Flow continues to execute the chain after the call point.

`Component`s are structural reuse units for graphs, not function calls.

## **1.5 Execution Model**

The execution semantics of this `DSL` are derived entirely from the runtime model of behavior node graphs, not from `TypeScript`, `JavaScript`, or general scripting language models.

The core execution principles are as follows:

### **1.5.1 Depth-First Execution**

For:

```ts
.A().B().C()
```

The execution order is:

1) A
2) B
3) C

Branch execution is also always depth-first.

### **1.5.2 Explicit Transfer**

The language provides no implicit control transfer:

*   All branch entries, merges, and jumps must be explicitly written.
*   All `Component` entries/exits must be explicitly modeled.

### **1.5.3 Suspension Mechanism**

Use `<<` or `Component` `Out()` to activate a suspension point:

*   The current Control Flow stops.
*   The corresponding subsequent logic is saved to a deferred stack.
*   Execution resumes in the future based on the `Out()` trigger point.

### **1.5.4 Acyclic Restriction**

Except for special structures (`Loop` / `ForEach`), the Control Flow graph must be acyclic:

*   Ensures static analysis is possible.
*   Ensures predictable execution.
*   Ensures conversion consistency and reversibility.

## **1.6 Summary**

This chapter established the core conceptual system of `DSL`:

*   `Trigger`, Execution Node, Data Node, Branch Anchor constitute the basic components of the graph.
*   Control Flow and Data Flow are strictly separated.
*   `Component`s act as structural reuse units.
*   A depth-first, explicit jump, no implicit behavior Execution Model.
*   Clear evaluation methods and variable scope rules.

These principles collectively ensure:

*   Complete consistency between text and visual graphs.
*   Reviewable, `diff`able, reversible, unambiguous logic expression.
*   A maintainable, testable, and toolable behavior graph system.

# **Chapter 2 File and Module Organization**

This chapter discusses the organization of `DSL` projects, including file types, module boundaries, namespaces, the role of type declaration files, and their collaboration mechanisms with `TypeScript` language services. This chapter does not cover `DSL` syntax or execution semantics, focusing solely on project structure stability, maintainability, and type system integration.

# **2.1 File Types**

A `DSL` project contains three main file types:

## **2.1.1 `DSL` Source Files (`*.dsl.ts`)**

These are **files directly edited by users**, used for writing:

*   `Trigger`s
*   `Component`s
*   Data Nodes (`$()`)
*   Control Flow structures (chained syntax, branches, jumps)
*   `Metadata`
*   A small number of constant declarations (optional)

Characteristics:

*   Has a `TypeScript` syntax appearance, but its content is interpreted by the `DSL` parser as a "behavior graph description language."
*   Users are not allowed to write arbitrary `TS` statements (e.g., `if`/`while`/expression logic).
*   "Context information" in the file will be recognized by the `TS` completion system to enable hints.
*   In a project, `.dsl.ts` files usually account for the highest proportion.

## **2.1.1 Static Type Library (`def.d.ts`)**

`def.d.ts` is **provided by the system and not modified by users**, containing:

*   Type signatures for all node functions (Execution Node).
*   Chained call interfaces for system built-in nodes.
*   `Component` definition base types (e.g., `ExecFunc`).
*   Agreed-upon `Trigger`/`Component` syntax structure types.
*   Types for `Metadata`.

Its function is:

> **To provide "long-term stable type infrastructure" for the `TypeScript` language service.**

For example:

*   What output parameters `.Log()` provides.
*   The parameter types of `.Move()`.
*   What the structure of `$()` is.
*   Type restrictions for `.In()` `.Out()`.

`def.d.ts` is the "basic type library" for the entire project, ensuring all `DSL` files have consistent static semantic interpretation capabilities.

## **2.1.3 Dynamically Generated Type Declarations (`dyn.d.ts`)**

`dyn.d.ts` is **automatically generated by the system and continuously updated during editing**. Its content changes with user `.dsl.ts` files:

*   Records the actual output ports of each `Trigger` and `Component` (e.g., user-defined `[result, ok]`).
*   Records variables that can be referenced in the current scope.
*   Provides type hints for `node.x` and custom temporary variables to the editor.
*   Overrides some default declarations in `def.d.ts` to expose errors immediately during writing.

Its essential function is:

> **To provide the latest structural information for user code completion in real-time and ensure all output variables have correct types.**

This file reflects the "current state" of the user project, ensuring the type system can respond to user edits.

## **2.1.4 System Runtime Type Files (`runtime typings`)**

These files provide type support for runtime structures, for example:

*   Graph structure serialization model types (`GraphModel`).
*   Helper types used internally by the builder.

Users typically do not need to view or modify these directly.

## **2.1.5 Build Artifacts**

Includes:

*   Graph structure `JSON`.
*   Intermediate formats consumed by the visual editor.
*   `Component` call graph index.
*   Cache.

These are not the focus of this chapter.

# **2.2 Project Layout**

To ensure maintainability and visual toolchain stability, the following project structure is recommended:

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
  dyn.d.ts  (automatically generated)
  tsconfig.json
```

The principles are as follows:

## **2.2.1 Centralized `DSL` Files**

*   `.dsl.ts` files should be grouped by function (`components`, `triggers`).
*   Avoid mixing regular `TS` files with `DSL` files, as this affects type inference and toolchain behavior.

## **2.2.2 Recommend One `Component` Declaration Per File**

Although `DSL` allows multiple `Component`s in one file, in practice:

*   Independent files for each `Component` facilitate `diff`ing.
*   Convenient for multi-person collaboration.
*   Aids project readability and refactoring.

## **2.2.3 `Trigger`s Managed by Event Type**

For example, all game lifecycle events (`OnCreate`, `OnTick`, `OnDestroy`) can be centralized in the `/triggers` directory.

## **2.2.4 Constants and Data Structures Can Be Placed in Regular `TS` Files**

`DSL` allows referencing literals and constants:

```
const DEFAULT_SPEED = 5;

[OnCreate()[ ]].Move(DEFAULT_SPEED)
```

However, ordinary `TS` function logic cannot be placed in `DSL` files, nor can it be called within `DSL`.

## **2.2.5 Node Library (Built-in Nodes) Remains Separate**

All built-in nodes (e.g., `Log`, `Move`, `Check`) are uniformly provided by the system and do not belong to the user project.

# **2.3 Module Boundaries & Namespaces**

This `DSL` adopts the **File-as-Module model**:

> **Each file is an independent module. `Component` calls between files are connected via `TS import/export`, but all `DSL` semantics are interpreted by the compiler.**

## **2.3.1 Cross-File `Component` Referencing**

When a `Component` needs to be used across files, it must be `import`ed in `TS` form:

```ts
import { CheckValue } from "../components/CheckValue.dsl";
```

This not only allows `TS` to complete, but also enables the `DSL` compiler to find the `Component` definition in the graph structure.

## **2.3.2 Prohibition of Cross-File Variable Sharing**

Data between `Component`s must be passed through:

*   Parameter inputs.
*   `Component` output parameters.
*   Temporary Variables.

Direct sharing of the same variable between two `DSL` files is prohibited (to maintain reproducibility of the graph structure).

## **2.3.3 Namespaces Not Used for `DSL` Semantics**

`TS` namespace functionality serves only as a syntax container and is not used for `DSL`'s own logic.

## **2.3.4 Clear Module Boundaries, Avoid Circular Dependencies**

When `Component` A calls B, it should not cyclically depend on A again, to ensure the graph structure is analyzable.

# **2.4 Basic Structure of `DSL` Files**

The top level of a `DSL` file allows the following elements:

*   `Metadata` (optional)
*   `import` statements (with restrictions)
*   `Trigger` declarations
*   `Component` declarations
*   Constants (read-only)

Example structure:

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

## **2.4.1 `import` Restrictions**

*   Prohibits `import`ing ordinary `TS` functions for use in `DSL` execution chains.
*   Allows `import`ing constants, enums, data structures (without execution logic).
*   Allows `import`ing `Component`s (for calling).

## **2.4.2 File Scope Does Not Allow `TS` Control Structures**

Cannot write:

```ts
if (...) {}
function calc() {}
while (...) {}
```

These are outside the scope of `DSL`.

## **2.4.3 `Component` Visibility**

*   `Component`s must be `export`ed as functions to be callable by other files.
*   Unexported `Component`s are considered local and private.

# **2.5 Collaboration Between `DSL` Files and `TypeScript` Type System**

This `DSL` is tightly integrated with the `TS` type system, and their collaboration mechanism is based on the following principles:

## **2.5.1 `def.d.ts`: Long-Term Static Declarations**

Used for:

*   Node types (`Log`, `Move`).
*   Chained call types.
*   Control Flow structures (`>>`, `<<`, `Branch[]`).
*   Structure of `$()`.
*   Basic forms of `Trigger`, `Component`.

It defines the **syntax appearance and function signatures**.

## **2.5.2 `dyn.d.ts`: Dynamic Environment Linkage**

Generated by the system in the background:

*   Records output parameters for each `Trigger`/`Component`.
*   Supplements variable scopes.
*   Marks the type of `node.x`.
*   Marks elements deleted/hidden in the build graph.
*   Provides instant diagnostic functions (errors/warnings) to the editor.

For example, if a user writes:

```ts
.$((a,b)=>a+b)[sum]
```

The system will generate in `dyn.d.ts`:

```ts
declare interface Trigger_OnCreate {
  sum: number;
}
```

Therefore, `.Log(sum)` can receive correct type hints.

## **2.5.3 Three Sources of Language Service**

`TS` completion is based on:

1.  **`def.d.ts`: Basic semantics.**
2.  **`dyn.d.ts`: User real-time state.**
3.  **The context of the user's `DSL` file itself.**

These three jointly ensure that the editor can:

*   Complete node names.
*   Suggest parameter types.
*   Display `Component` outputs.
*   Determine the validity of node chains.
*   Check for undefined variables.

## **2.5.4 Error Exposure and Overriding Logic**

`dyn.d.ts` allows overriding parts of `def.d.ts` declarations, used for:

*   Disabling certain illegal chained calls.
*   Restricting `Component` exit types.
*   Generating instant diagnostic messages for illegal parameters.

This ensures that users **see `DSL` errors immediately** during the editing process.

# **2.6 Lifecycle of System-Generated Files**

## **2.6.1 `dyn.d.ts` Update Logic**

After each user modification to `.dsl.ts`:

*   The parser extracts new `Trigger`/`Component` information.
*   Updates variable, output port, and node chain types.
*   Automatically rewrites `dyn.d.ts`.
*   Notifies the `TS` language service to recompute completion.

## **2.6.2 Users Cannot Modify Dynamic Files**

If users edit `dyn.d.ts`:

*   Modifications will be overwritten.
*   And may cause completion and diagnostics to fail.

Therefore, it must be treated as an internal build artifact of the system.

## **2.6.3 Build System and `TS` Incremental Checking**

To ensure zero-latency feedback:

*   After `dyn.d.ts` updates, it is refreshed via the `TS` Server's incremental mode.
*   Only affected parts are rebuilt.
*   Ensuring a smooth editing experience.

# **2.7 Project Consistency Principles**

Summarizing the core philosophy of file organization:

## **2.7.1 `TS` File Structure Does Not Affect `DSL` Semantics**

The semantics of `DSL` are determined solely by the `DSL` compiler; `TS` file organization only enhances the developer experience.

## **2.7.2 Consistency Ensures Reproducibility**

Unified file organization allows:

*   `DSL` → Graph structure
*   Graph structure → `DSL`
    to have stable consistency.

## **2.7.3 Controllable Conflicts in Multi-Person Collaboration**

*   `Component`s in independent files.
*   `dyn.d.ts` is not part of `git`.
*   `def.d.ts` remains stable.
*   Clear `DSL` file `diff`s.

Ensures usability for large teams.

## **2.7.4 Project Organization Should Not Affect the Final Execution Model**

Regardless of how `DSL` files are split:

*   Control Flow
*   Data Flow
*   Graph structure

are built by the `DSL` compiler.

File organization only affects editability, not semantics.

# **Chapter 3 Syntax Overview**

This chapter outlines all legal syntax forms of this `DSL`, focusing on "Surface Syntax" and **not explaining the semantic execution model and node graph construction rules** (these will be discussed in subsequent chapters).

The core feature of `DSL` is:
**All operations (system nodes, `Component` entries, `Component` instances, selection structures, Data Nodes, etc.) are unified as:**

```
NodeName(args?)[outputs?](cases?)
```

And combined into an execution chain via three chain connectors:

```
.    <<    >>
```

Where `<<` and `>>` have lower precedence than `.`
Therefore:

```
A << B . C >> D
```

Is parsed as:

```
A  <<  (B . C)  >>  D
```

---

# **3.1 File-Level Syntax**

`DSL` files are written in a `TypeScript`-like source file format, but their semantics are interpreted by the `DSL` compiler.
The following top-level elements are allowed in a file:

*   `import` statements (with restrictions)
*   `metadata` declarations
*   `Trigger` declarations
*   `Component` declarations
*   Constant declarations (literals and simple structures only)
*   Comments

`DSL` files do not allow:

*   Top-level `if`/`while`/`for`
*   Top-level `JS` functions (other than `Component` declarations)
*   Top-level expression logic

---

## **3.1.1 Trigger Declaration**

Basic form:

```ts
[OnCreate(arg1, arg2)[out1, out2]]
  .A()
  .B()[value]
  .C();
```

Structure:

```
[ TriggerName( parameters ) [ outputs? ] ]
    .<control-flow-chain>
```

Features:

*   A `Trigger` is an entry node for the `DSL`.
*   A file can have multiple `Trigger`s.
*   The output list can be omitted.

---

## **3.1.2 Component Declaration**

Defined in function declaration format:

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

Characteristics:

*   Each `Component` entry starts with `In(id)`.
*   `In()` is a **node**, not a "statement block"; it can be embedded in a chain, but the entry chain must start with `In()`.
*   `Out()` is also a regular node and can appear anywhere in the chain.
*   Exits and types are uniformly declared in `ExecFunc<{ outputs }>("out_tags")`.
*   The minimal structure is `return ExecFunc<{}>()`.

---

## **3.1.3 Metadata**
Used to declare `Component` or `Trigger Metadata`:
**TODO: I don't know what Meta can do yet**
```ts
@Meta({
  category: "AI/Control",
  icon: "Logic"
})
```

`Metadata` appears before the `Component` declaration.

---

## **3.1.4 Constant Declaration**

```ts
const SPEED = 5;
const KEY = "Jump";
```

Allows:

*   Literals
*   Enum references
*   Basic system type objects

---

# **3.2 Unified Call Structure**

All calls adopt a unified structure:

```
NodeName(args?)[outputs?](cases?)
```

For example:

```
A()
Move(5)[dist]
$((x)=>x+1)[y]
If(cond)( true = X(), false = Y() )
Selector(MyComp, "Port", x)
CompInstance("Port", x)
```

There are no `if{}` / `switch{}` / `loop{}` / `case{}` special structures; all branches are:

```
(cases)
```

---

# **3.3 Chain Connectors and Precedence**

`DSL` execution chains are expressed through three connectors:

```
.
<<
>>
```

Their precedence is:

```
Highest:   .
Lowest:   <<   >>
```

Therefore, the statement:

```
A << B . C >> D . E >> F
```

Is parsed as:

```
(( A << (B . C)) >> (D . E)) >> F
```

Example of discouraged writing:

```
A << B.C.D   // C will be unexpectedly deferred until << or >> is encountered.
```
Recommended to change to:
```
A << B >> C.D
```

Thus, `.`, `<<`, `>>` must clearly separate chain structures.

---

# **3.4 Control Flow Syntax**

Control Flow is not expressed through special statements, but through:

### **3.4.1 Chain Connectors (`.`, `<<`, `>>`)**

Most basic structure:

```
A() . B() . C()
A() << B()
A() >> B()
```

All three are legal chain connections.

---

### **3.4.2 Case Selection Structure**

All branching structures are:

```
Node(args)[out](
  key = ChainExpr,
  key = ChainExpr,
  ...
)
```

For example, standard `If`:

```
If(cond)(
  true = A().B(),
  false = C().D()
)
```

`Switch`:

```
Switch(x)(
  0 = A(),
  1 = B(),
  default = C()
)
```

Multi-branch logic uses the same syntax.

---

### **3.4.3 No Dedicated "jump/merge" Syntax**

`0()`, `"tag"()` are treated as ordinary node calls and can be received by external links.
Merging and jumping belong to the Execution Model, not syntax structures, therefore the syntactic forms are:

```
0()
"next"()
```

Both are ordinary:

```
Identifier(args)
```

After their jump branches finish executing, control returns to continue executing subsequent nodes.

---

# **3.5 Data Node**

Unified representation using `$()`:

```
$((a, b) => a + b)[sum]
$((a, b) => {
  const x = m.floor(a / b);
  return {x, y: a % b};
})[x, y]
```

Structure:

```
$(
  (capture-list) => expression
)[ output-vars ]
```

Rules:

*   The Capture List must be explicit; implicit capture is not allowed.
*   `[sum]` declares the node's output name.
*   Data Nodes have no side effects and only participate in Data Flow.

---

# **3.6 Component Call Syntax**

`Component` calls always take the form of "node calls," with no special syntax.

### **3.6.1 Default Entry (First Entry)**

```
MyComponent(a, b)[out]
```

Equivalent to "calling the first `In()`".

---

### **3.6.2 Specified Entry (Without Using `Selector`)**

```
Selector(MyComponent, "PortId", args...)
```

---

### **3.6.3 Component Instance**

```
const Comp = Shared(MyComponent);
Comp("PortA", x)
Comp("PortB", y)[z]
```

### **3.6.4 Component Port Instance**

```
const Port = Shared(MyComponent, "HandleEvent");
Port(eventData)
```

These are all ordinary "`NodeName(args)`" calls, not special syntax.

---

# **3.7 Complete Call Form: Globally Unified Expression**

Unified call structure:

```
NodeName(args?)[output?](cases?)
```

Legal examples:

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

**As long as it conforms to this unified form, it is a valid `DSL` call.**

---

# **3.8 EBNF (Revised, Consistent with True Semantics)**

**This is the final, semantically correct `EBNF`:**

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

# **3.9 Chapter Summary**

This chapter provides the following content:

*   **Syntax appearance of all `DSL` elements.**
*   **Unified call structure: `Node(args)[outs](cases)`.**
*   **Three chain operators and their precedence (`<<`, `>>` > `.` ).**
*   **Complete syntax for `Component` definition and calls.**
*   **Case branching syntax (covering all structures like `If`, `Switch`, `Loop`, etc.).**
*   **Complete form of Data Node `$()`.**
*   **Legal writing for `Selector` / `Shared`.**