# Node Graph Equivalent Code Language (DSL) User Manual
<!-- @Version: 1.0.0 -->
<!-- @Author: Aluria -->

> **Foreword**: Node graphs often don't display well via screenshots – images are large, aesthetically poor, and details are hard to discern. To address this, I designed a "**Node Graph Equivalent Code Language (DSL, Domain-Specific Language)**". Its purpose is to accurately describe node graph logic using a clear code structure.

## 1. Quick Start

This DSL aims to **describe node graphs in plain text**. It leverages TypeScript's syntax highlighting and syntax checking, making complex logic diagrams easy to read, write, version control, and review.

**Core Philosophy** Although the code you write closely resembles TypeScript, its essence is to describe the structure of a node graph:
-   **Execution Flow**: The skeleton of the graph. Describes the execution order of nodes through chained calls in the form of `.FunA().FunB()`.
-   **Data Flow**: The flesh and blood of the graph. Describes the calculation process of values using the `$(...)` syntax.
    

**Getting Started Example**

The following code demonstrates some basic functionalities and logic:
```ts
// @ts-nocheck
// ^ It is recommended to always add this line at the top of the file to disable TS compiler type checking
// Alternatively, you can uncomment it, which will result in a few undefined variable errors...

declare global {
  namespace Self {
    const my_var: int = 0n; // Define global variables (on the entity)
  }
}

[OnCreate()]
  // `$` is an operation node that only evaluates when called; it doesn't evaluate here, but only when `val` needs to be accessed.
  .$(() => 1.0)[val] // (1) 
  .Log("Hello, World!")
  // return `object` indicates multiple return values, which can be mapped using variable names: the value of `a` is assigned to `x`.
  .$((val) => { return { a: val + 1, y: val + Self.my_var }; })[x = a, y] // (2) 
  .SetVal(Self.my_var, x)  // Modify variable
  .Log("New Val is Set")
  // `m.vec` is a function in the Math namespace that constructs a Vec
  .$((x, y) => { return m.vec(x, y, 2.5); })[my_vec] // (3) 
  .Teleport(pos = my_vec); // Default target is Self (the entity itself)
```

This code describes the following node graph flow: `[OnCreate Trigger]` → `[Log Node]` → `[SetVal](Trigger operations 1,2)` → `[Log Node]` → `[Teleport Node](Retrigger operations 1,2,3)`

## 2. Core Concepts Quick Reference

-   **Trigger**: Such as `[OnCreate()]`, `[Signal(Signal.name)]`
    -   **Definition**: The **starting point** for node graph execution.
-   **Execution Node**: Such as `.Log()`, `.Wait()`, `.MyFunction()`
    -   **Definition**: A specific **operation step** in the graph.
-   **Operation Node (Data Node) and Query Function (Query)**: Such as `$((cap) => { ... })`
    -   **Definition**: Used for **calculating** values (e.g., `1 + 1`).
    -   **Query Function**: Refers to helper functions defined in the node graph, exclusively callable within operation nodes.
-   **Constants and Variables**: Such as `this.my_var` and `.Fun()[my_val]`
    -   **Definition**: Used to store and pass **data**.
-   **Component**: Such as `function MyComponent() { ... }`
    -   **Definition**: Reusable **subgraph** modules.
        

## 3. Project Configuration (File Header Declarations)

Before writing logic, it is usually necessary to declare the variables, data structures, and events required by the graph in the file header.

```ts
// @ts-nocheck
import "./def.d.ts"; // Import system type and method definitions

// 1. Import
// Import reusable components or pure functions from other files
import { MyReusableComponent, my_calc_func } from "./shared_components.ts";

// Global declarations and definitions (available in all files)
declare global {

  // 2. Define custom data structures
  interface PlayerData {
    id: int;
    name: string;
  }

  // 3. Declare global sendable and receivable signals
  namespace Signal {
    function PlayerHit(damage: int): Signal; // Signal functions must have `Signal` as a return value
    function RenderFrame(): Signal;
  }

  // 4. Declare global timers
  namespace Timer {
    const five_second: CountDown<5>; // Countdown 5 seconds
    const time: Count<10>; // Count up from 10 
  }

  // 5. Declare global variables for entities (one instance per entity, accessible by all node graphs)
  namespace Self {
    const player_name: str = "Default";
    const is_alive: bool = true;
  }
}

// 6. Declare node graph variables (one instance per node graph per entity)
declare namespace node {
  const config_id: ConfigId = 12345678;
  export const exposed_x: float = -12.34; // Variables exposed externally marked with `export`
}

// 7. Declare temporary variables (each trigger tree recreates an instance upon each trigger)
const _local_counter: int = 0; // Variable names must start with _

// -------- Logic Starts --------
[OnCreate()].Log(Self.player_name).Log(m.str(node.exposed_x))
```

## 4. Building Logic: Control Flow

> Control flow determines **when** nodes are triggered.

### 4.1. Triggers

All logic chains must be initiated by a trigger. When writing, triggers must be **at the beginning of the line** (no indentation). Most triggers start with `On` (e.g., `OnDestroy`), with `Timer` and `Signal` as exceptions, whose parameters need to be declared globally.

```ts
// Triggered when game object is created
[OnCreate()]
  .Log("I'm alive!");

// Triggered when global timer "five_second" fires
[Timer(Timer.five_second)]
  .Log("Five seconds have passed.");

// Triggered when "PlayerHit" signal is received, and the "damage" parameter of the signal
// is assigned to a new variable named "dmg_val"
[Signal(Signal.PlayerHit)[dmg_val]]
  .Log("Ouch! Took " + m.str(dmg_val));

// Triggered when game object is created
[OnDeath()[cause]]
  .Log("I'm dead! Because of " + m.str(cause));

```

Other common triggers include: `OnVarChange(name)`, `OnCollision`, `OnHit`, `OnUI`, `OnTab`, etc.

### 4.2. Sequential Flow

Use `.` for chained calls, representing sequential execution logic A → B → C.

```scss
[OnCreate()]
  .Log("Step 1")
  .DoSomething()
  .Log("Step 2")
  .Teleport(Self.self, m.vec(10, 0, 0));

```

### 4.3. Parallel Branching

Use the `>> { 0: ... , 1: ... , ... }` syntax to create multiple "simultaneously" executing branches.

**Rule**: Branch keys must be **integer literals**. Execution will proceed in **ascending order of key values**, in a **depth-first** manner.

```ts
[OnCreate()]
  .Log("Starting...") >> {
    // These three branches will execute in the order 0, 1, 2
    0: Log("Branch 0: Runs first"),
    2: Log("Branch 2: Runs last"),
    1: DoSomething().Log("Branch 1"),
  }.Log("Note: This will not be executed"); // (Execution method detailed below)

// Actual execution order:
// 1. Log("Starting...")
// 2. Log("Branch 0: Runs first")
// 3. DoSomething()
// 4. Log("Branch 1")
// 5. Log("Branch 2: Runs last")

```

### 4.4. Merging and Jumping (Branch Anchors)

You can manage complex flow control, such as branch merging or jumping, using **Branch Anchors**.

-   **Define Anchor**:
    1.  `Branch["my-anchor"].FunA()` (written at the beginning of a new line, no indentation)
    2.  `... FunB().Branch["my-anchor"].FunC()` (marked directly within the call chain)
-   **Jump to Anchor**: `>> "my-anchor"()`

**Note**:

1.  Within the same scope (file or component), anchor IDs must be **unique**.
2.  When the target branch of a jump finishes execution, control flow returns to the jump point and **continues execution sequentially**.
    

**Example: Using Anchors to Merge Flows**

```ts
// Define "finish-logic" anchor
// Regardless of whether EventA or EventA occurs, this will be executed
Branch["Merge Branch"]
  .Log("Finished!");

[Signal(Signal.EventA)]
  .Log("A happened")
  .Wait(1.0)
  >> "Merge Branch"(); // Jump to "Merge Branch"

[Signal(Signal.EventB)]
  .Log("B happened")
  >> "Merge Branch"(); // Jump to "Merge Branch"

```

> **Warning**: Complex merging logic significantly increases comprehension cost and can lead to potential bugs (e.g., a branch of the execution tree being executed multiple times unexpectedly, referencing output values of unexecuted nodes, etc.).

### 4.5. `>> 0()` (In-Block Merging)

Inside a branch block `>> {}`, `If()` block, or `Switch()` block, `>> 0()` is a special jump instruction, meaning "**merge back to the main flow**" (i.e., jump to the first node connected after the `}` or `)` of the current block).

For actions that jump directly without performing operations:
-   In a branch block: `0: 0()` indicates direct merging.
-   To jump directly to a specific branch: use `1: "branch-id"()`.

```ts
[OnCreate()]
  .Log("Start")
  >> {
    0: DoSomething() >> 0(), // First execute DoSomething(), then jump outside `}` 
    1: Log("Branch 1") >> 0(), // Log, then jump to "Log("Both done")"
  }.Log("Both done?"); // <-- Target of ">> 0"

// Expected execution order:
// 1. Log("Start")
// 2. DoSomething()
// 3. Log("Both done?")
// 4. Log("Branch 1")
// 5. Log("Both done?")

```

Additionally, you can use `>> -1()` (or not add any marker at the end) to indicate that after the internal logic completes, it does not jump, but **continues to the next branch**. Similarly, `>> "branch-id"()` means that after the current logic completes, it jumps to a specific anchor.

### 4.6. `A() << B() >> C()` (Deferred Execution)

**Behavior Comparison:**

-   **`A() >> B() >> C()`** (Sequential Execution):
    -   Equivalent to `A().B().C()`.
    -   **Meaning**: A completes → B completes → C completes.
-   **`A() << B() >> C()...`** (Deferred Execution):
    -   Equivalent to `A().C()....B()`.  
    -   **Meaning**: First execute A, then execute C and **all subsequent content**. Only when the entire chain of C is **fully completed** will it return to run B.
-   **Multiple Deferred Executions**:
    -   When there are multiple `<<` on a chain (e.g., `A() << B() << C() >> D()....`), the system will first execute the main chain (A() -> D()...), and then execute the "suspended" nodes **from back to front** (C first, then B).

### 4.7. Conditional Logic (If)

Use `If(condition)( ... )` to create conditional branches. For no-op jumps, `true = 0()` means direct merging, and `false = "branch-id"()` means direct jumping.

```sql
[Signal(Signal.CompareVal)[val]]
  .If(val > 10)(
    true = Log("Value is large") >> 0(), // If true, execute and merge
    false = Log("Value is small") >> 0() // If false, execute and merge
  )
  .Log("Check complete"); // <-- Merge point of ">> 0()"

```

**Shorthand (Syntactic Sugar):**

If you only need to handle the `true` branch and continue the main flow, you can omit `( cases )`.
-   **Code**: `.If(this.is_alive).Log("Still alive!")`
-   **Equivalent to**: `.If(this.is_alive)(true = 0(), false = -1()).Log("Still alive!")`
-   **Meaning**: If `is_alive` is true, execute `Log()`; if false, skip `Log`.
    

### 4.8. Multiple Choice Logic (Switch)

Use `Switch(variable)( ... )` to handle multiple fixed options. 

**Rules**:

1.  Branch keys must be **literals** (e.g., `"sword"`, `10`, `true`), variables are not supported.
2.  Use `null` to represent the `default` branch.

```ts
[Signal(Signal.Equip)[item_name]]
  .Switch(item_name)(
    "sword" = Log("Equipped sword.") >> 0(),
    "shield" = Log("Equipped shield.") >> 0(),
    "potion" = DrinkPotion() >> 0(),
    null = Log("Unknown item!") >> 0() // Default branch
  )
  .UpdatePlayerModel(); // Merge point for all branches

```

### 4.9. Loop

Use `.Loop(start, end, "ID")[i]( ... )` to execute a finite loop. Note that the `end` value is **inclusive** (closed interval).
-   `"ID"`: Unique identifier for the loop, used with `StopLoop()` (optional).
-   `[i]`: Loop variable.
-   `true` branch: Content executed during each iteration (i=0, 1, 2...).
-   `false` branch: Content executed once after the loop **naturally** ends (`i > end`). (Loops terminated due to performance factors will not execute the false branch.)

```ts
[OnCreate()]
  .Loop(0n, 2n, "MyLoop")[i]( // Will run 3 times (i=0, i=1, i=2)
    // Loop body
    true = Log("Loop iteration: " + m.str(i))
      .If(i === 1n) // Assuming we want to stop at i=1
      .StopLoop("MyLoop"),
    // When the loop ends
    false = Log("Loop finished") >> 0()
  ).Log("Done with loop.");

// Expected execution order:
// 1. Log("Loop iteration: 0")
// 2. If(0n === 1n)
// 3. Log("Loop iteration: 1")
// 4. If(1n === 1n).StopLoop()
// 5. Log("Loop finished")
// 6. Log("Done with loop.")

```

**Notes on `StopLoop`**: `StopLoop("ID")` **does not** immediately interrupt execution. It only marks that the loop will not continue after the **current iteration** ends, and instead proceeds to the `false` branch. Nodes after the `StopLoop` call (within the `true` block) will still complete execution.

### 4.10. Iteration (ForEach)

Similar to Loop, but the loop variable `i` is replaced by the list element `item`.

```ts
[OnSignal(Signal.Hit)[list]]
  .ForEach(list)[item]( // Will iterate through the entity list sequentially
    // Loop body
    true = Log("Hit item: " + item.name).Hit(item),
    // When the loop ends
    false = Log("Foreach finished") >> 0()
  ).Log("Done with Hit.");

```


## 5. Calculating Values: Data Flow

Data flow is responsible for defining "what **data** to use".

### 5.1. `$(...)` Syntax

`$(...)` is the only way to create **operation nodes**, used for pure computational logic.
-   **Internal Format**: The `$()` must contain exactly one lambda expression `() => ...`.
-   **Evaluation Timing**: `$(...)` is evaluated immediately only when the control flow **activates** the attached execution node.
    

```ts
[OnCreate()]
  // Will not be called directly when execution reaches here
  .$(() => "Hello" + " " + "World!")[msg]
  // When .Log() is activated, $(...) will be evaluated
  .Log(msg);

```

### 5.2. `function output` (Getting Variables)

Nodes can output variables for subsequent nodes to use. Use the `[my_var_name]` syntax to declare these outputs.

```scss
[OnCreate()]
  .GetPlayer()[player_entity] // 1. GetPlayer() outputs "player_entity"
  .GetName(player_entity)[player_name] // 2. GetName() uses "player_entity"
  .Log("Player name is: " + player_name);

```

### 5.3. `$(...)` Capture List

This is the most crucial rule of the `$(...)` syntax. 

**Rule**: All `function output` variables that need to be used must be **explicitly listed** in the **first** parenthesis (capture list `args`) of `$((args) => ... )`. **Exception**: Global or persistent variables like `this.var`, `node.var` **do not** need to be declared and can be used directly inside.

```ts
[OnCreate()]
  .FunA()[val_a]
  .FunB()[val_b]
  // --- Example ---
  // ✅ Correct: val_a and val_b are both in the capture list
  .$((val_a, val_b) => val_a + val_b + Self.global_val)[sum]
  // ❌ Error: val_b is used internally but not declared in the capture list (val_a)
  .$((val_a) => val_a + val_b)[sum1] // Will throw a compile-time error
  // ❌ Error: this.global_val is a global variable and should not be put into the capture list
  .$((val_a, Self.global_val) => val_a + Self.global_val)[sum2] // Will throw a compile-time error

```


### 5.4. `$(...)` Multiple Outputs

If multiple values need to be returned, `$(...)` should return an object or a list internally, and `[a, b]` syntax should be used externally for extraction. Key-value mapping using `[a=key1, b=key2]` is supported.

```ts
[OnCreate()]
  .GetPlayer()[player]
  .$((player) => {
    // Assuming player is a vector with x and y
    return { my_x: player.x, my_y: player.y };
  })[x_pos = my_x, y_pos = my_y] // Mapping: x_pos gets the value of my_x

  .Log("X: " + x_pos + ", Y: " + y_pos);

```


### 5.5. Variables Dependent on Unexecuted Branches

What happens if you capture a variable produced by an `If` branch, but that branch **does not execute** at runtime?

**Rule**: The **system will not report an error**. You will get the **default value** for that variable's type (e.g., `0`, `false`, `""`, etc.), and a warning message will be printed to the console.

```ts
[OnCreate()]
  .If(false)(
    true = DoSomething()[my_var], // This branch will never execute
    false = 0(),
  )
  // my_var is still declared in the capture list
  // At this point, the value of my_var is 0 (assuming it's an int type)
  .$((my_var) => my_var + 10)[result]
  .Log(result); // Will print "10"

```

### 5.6. Calculation Path Backtracking

Each operation node, when called, traces back the source of values based on its capture list:

-   **Source is a system function**: Gets the **latest** output value of that function (or the default value if not yet calculated).
-   **Source is a composite node (Component)**: Enters the composite component, tracing the origin of that output parameter.
    -   If the origin is still an execution node, composite node, or operation node, recursively perform the above operations.
    -   If the origin traces back to the composite node's **input parameter**, then it exits the component and continues tracing upwards from the input parameter at the call site. This process continues until a **system function** is found or there are no capture parameters.


## 6. Managing State: Variable Namespaces

The system provides four types of variables with different lifecycles for use:

| No. | Type | Type Name | Notes |
| :---: | :--- | :--- | :--- |
| 1 | Function Output | `.Fun()[a]` | Single Execution Tree | **Read-only** | **Must be explicitly captured** |
| 2 | Temporary Variable | `const _x` | Single Execution Tree | `.SetVal(_x, ...)` | (Use directly, no capture needed) |
| 3 | Node Graph Variable | `declare namespace node` | Persistent (follows entity's node graph) | `.SetVal(node.x, ...)` | **Cannot be captured** (use directly) |
| 4 | Global Variable | `declare namespace Self` | Persistent (follows entity) | `.SetVal(Self.x, ...)` | **Cannot be captured** (use directly) |

**Example: Using `SetVal` and temporary variables**
```ts
// Declare a temporary counter
const _hit_damage: int = 100n;
// _hit_damage will be reinitialized to 100 each time it's triggered
[Signal(Signal.PlayerHit)[reaction_rate]]
  // 1. Read reaction_rate and perform calculation
  .$((reaction_rate) => _hit_damage * calc_intensity(reaction_rate))[damage]
  // 2. Write new value to _hit_damage
  .SetVal(_hit_damage, damage)
  // 3. Write new value to persistent Self.total_hits
  // This call will not trigger calculation
  .SetVal(Self.total_hits, Self.total_hits + _hit_damage)
  .Log("Hit: " + m.str(_hit_damage));

```


## 7. Reusing Logic: Components

Components are "reusable subgraphs", mainly divided into two types:

### 7.1. Control Flow Components (Capitalized First Letter)

Subgraphs containing complete execution nodes, with custom entry and exit points.

**Define:**
```ts
// Define a component with only a default exit
function GetValue(val: int) {
  In() // Default entry
    .$((val) => val + 10)[sum]
    .Out() // Default exit
    .Log("Runs Before Out()!")

  // Declare the return value of this component
  return ExecFun<{ sum: int }>();
}

// Define a component with two exits: "large" and "small"
function CheckValue(val: int) {
  In() // Default entry
    .If(val > 10)(
      true = Log(m.str(val)).Out("large"), // Trigger "large" exit
      false = Out("small"), // Trigger "small" exit
    );

  // Declare the exits of this component
  return ExecFun<{}>("large", "small");
}

```

-   **Multiple Entries**: Defined via `In("InBranchId")`. If an entry point needs to be specified during a call, use `Selector(MyFun, "InBranchId", args)[outs]`; a default call to `MyFun(args)[outs]` enters `In()`.
    
-   **`Out()` Exit Execution Order (Depth-First)**: This is a crucial concept. When `Out(id)` is triggered, control flow will **prioritize running the code after `Out`**. The priority of `Out` itself is the **lowest** in the current chain. Only after all subsequent logic following `Out` has completed will the system truly trigger the nodes connected to `Out` outside the component. This is equivalent to the logic of `FunX() << Out() >> FunY()`. Even if you try to change the order with `FunX().{0: Out(), 1: 0()}.FunY()` in a branch, `Out` will still be triggered only after `FunY` executes at runtime. Therefore, you must understand `Out` as "suspending the current exit, finishing the rest, then exiting".
    

**Use:**

```ts
[Signal("TestValue")[my_val]]
  // Call component and get output value
  .GetValue(my_val)(5)[new_val = sum]
  // Call multi-branch component and connect subsequent logic to its exits
  .CheckValue(new_val)(
    "large" = Log("Value was large!"),
    "small" = Log("Value was small.")
  );

// The execution result in the example is
// 1. GetValue(5)
// 2. Log("Runs Before Out()!") // Note. Triggered before Out
// 3. Out()[sum = 15]
// 4. CheckValue(15)
// 5. Log("15")
// 6. Out("large")
// 7. Log("Value was large!")

```

### 7.2. Pure Operation Functions (Lowercase First Letter)

Pure mathematical or logical calculation functions, usable only inside `$(...)` or as node parameters. Define them using lambda expressions.

**Define:**
```ts
const add = (a: int, b: int): int => {
  return a + b;
};

const get_stats = (a: int): { x: int, y: int } => {
  return { x: a * 2, y: a + 1 };
}

```

**Use:**
```ts
[OnCreate()]
  .FunA()[val_a, val_b]

  // Or call inside $(...)
  .$((val_a, val_b) => {
    const sum = add(val_a, val_b);
    const { x, y } = get_stats(sum);
    return x + y;
  })[result]
  .Log(result)

  // Or as function parameters
  .FunB(add(1, 2), get_stats(3).x);
```


## 8. Type Declarations

All data types supported by the system are listed in the table below:

| No. | Type | Type Name | Notes |
| :---: | :--- | :--- | :--- |
| 1 | Integer | Int | Corresponds to TS `bigint`, also provides `int` type alias for convenience |
| 2 | Floating Point | Float | Corresponds to TS `number`, also provides `float` type alias for convenience |
| 3 | Boolean | Bool | Corresponds to TS `boolean`, also provides `bool` type alias for convenience |
| 4 | String | Str | Corresponds to TS `string`, also provides `str` type alias for convenience |
| 5 | 3D Vector | Vec | Contains three float values: x, y, z |
| 6 | GUID | GUID | Internal logic is int, but type-safe, cannot be directly converted to int |
| 7 | Entity | Entity | The only object type allowed to have an initial value of null |
| 8 | Prefab ID | Prefab | Internal logic is int, type-safe |
| 9 | Faction | Faction | Internal logic is int, type-safe |
| 10 | Config ID | ConfigId | Internal logic is int, type-safe |
| 11 | List | List | Strongly-typed list, type defined by properties |
| 12 | Dictionary | Dict | Strongly-typed dictionary, key-value types defined by properties (140 combinations in total) |
| 13 | Struct | Struct | Custom type that needs to be predefined in the node editor |

-----

## For more details and design philosophy, please refer to [System Design Document](./SystemDesign.en.md)