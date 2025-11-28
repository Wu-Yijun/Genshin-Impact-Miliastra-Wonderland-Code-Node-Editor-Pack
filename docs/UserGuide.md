# 节点图等效代码语言 (DSL) 使用手册
<!-- @Version: 1.0.0 -->
<!-- @Author: Aluria -->

> **前言**：通过截图来展示节点图往往效果不佳——图片不仅体积大、美观度差，而且细节难以辨认。为了解决这个问题，我设计了一套“**节点图等效代码语言 (DSL, Domain-Specific Language)**”。旨在用清晰的代码结构来精准描述节点图逻辑。

## 1\. 快速上手

本 DSL 旨在**以纯文本形式描述节点图**。它利用 TypeScript 的语法高亮和语法检查，使得复杂的逻辑图变得易于阅读、编写、版本控制和审查。

**核心理念** 你编写的代码虽然外表酷似 TypeScript，但其本质是在描述一张节点图的结构：
-   **执行流 (Execution Flow)**：图的骨架。通过 `.FunA().FunB()` 形式的链式调用，描述节点的执行顺序。
-   **数据流 (Data Flow)**：图的血肉。通过 `$(...)` 语法，描述数值的计算过程。
    

**入门示例**

下面这段代码展示了一些基本的功能和逻辑:
```ts
// @ts-nocheck
// ^ 建议始终在文件顶部添加此行, 以关闭 TS 编译器的类型检查
// 也可以不注释, 会有少量变量未定义错误...

declare global {
  namespace Self {
    const my_var: int = 0n; // 定义全局变量(实体身上)
  }
}

[OnCreate()]
  // `$` 为运算节点只在被调用时求值, 执行到此处不求值, 当需要访问 `val` 时才计算.
  .$(() => 1.0)[val] // (1) 
  .Log("Hello, World!")
  // return `object` 表示多个返回值, 可以用变量名映射: `a` 的值赋给 `x` .
  .$((val) => { return { a: val + 1, y: val + Self.my_var }; })[x = a, y] // (2) 
  .SetVal(Self.my_var, x)  // 修改变量
  .Log("New Val is Set")
  // `m.vec` 是 Math 空间中的构造 Vec 的函数
  .$((x, y) => { return m.vec(x, y, 2.5); })[my_vec] // (3) 
  .Teleport(pos = my_vec); // 默认目标为 Self (自身实体)
```

这段代码描述了如下的节点图流程： `[OnCreate 触发器]` → `[Log 节点]` → `[SetVal](触发运算1,2)` → `[Log 节点]` → `[Teleport 节点](重新触发运算1,2,3)`

## 2\. 核心概念速查

-   **触发器 (Trigger)**：如 `[OnCreate()]`, `[Signal(Signal.name)]`
    -   **定义**：节点图执行的**起点**。
-   **执行节点 (Exec Node)**：如 `.Log()`, `.Wait()`, `.MyFunction()`
    -   **定义**：图中的具体**操作步骤**。
-   **运算节点 (Data Node) 和 查询函数 (Query)**：如 `$((cap) => { ... })`
    -   **定义**：用于**计算**数值 (例如 `1 + 1`)。
    -   **查询函数**：指节点图中定义的辅助函数，仅限在运算节点内部调用。
-   **常量和变量 (Variable)**：如 `this.my_var` 和 `.Fun()[my_val]`
    -   **定义**：用于存储和传递**数据**。
-   **组件 (Component)**：如 `function MyComponent() { ... }`
    -   **定义**：可复用的**子图**模块。
        

## 3\. 项目配置 (文件头部声明)

在正式编写逻辑前，通常需要在文件头部声明图所需的变量、数据结构及事件。

```
// @ts-nocheck
import "./def.d.ts"; // 导入系统类型和方法定义

// 1. 导入
// 从其他文件导入可复用的组件或纯函数
import { MyReusableComponent, my_calc_func } from "./shared_components.ts";

// 全局声明和定义 (全部文件可用)
declare global {

  // 2. 定义自定义数据结构
  interface PlayerData {
    id: int;
    name: string;
  }

  // 3. 声明全局可发送和接收的信号
  namespace Signal {
    function PlayerHit(damage: int): Signal; // 信号函数需以 `Signal` 为返回值
    function RenderFrame(): Signal;
  }

  // 4. 声明全局计时器
  namespace Timer {
    const five_second: CountDown<5>; // 倒计时5秒
    const time: Count<10>; // 从 10 开始正计时 
  }

  // 5. 声明实体的全局变量 (每个实体一个实例, 所有节点图可访问)
  namespace Self {
    const player_name: str = "Default";
    const is_alive: bool = true;
  }
}

// 6. 声明节点图变量 (每个实体的每个节点图一个实例)
declare namespace node {
  const config_id: ConfigId = 12345678;
  export const exposed_x: float = -12.34; // 通过 `export` 标记对外暴露的变量
}

// 7. 声明临时变量 (每个触发树每次触发重新创建实例)
const _local_counter: int = 0; //  变量名须以 _ 开头

// -------- 逻辑开始 --------
[OnCreate()].Log(Self.player_name).Log(m.str(node.exposed_x))
```

## 4\. 构建逻辑：控制流 (Control Flow)

> 控制流决定了节点在**何时**被触发。

### 4.1. 触发器 (Triggers)

所有的逻辑链都必须由一个触发器开启。书写时，触发器必须**顶格**（无缩进）。绝大多数触发器以 `On` 开头（如 `OnDestroy`），仅有 `Timer` 和 `Signal` 例外，它们的参数需要在全局声明。

```ts
// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!");

// 全局计时器 "five_second" 触发时
[Timer(Timer.five_second)]
  .Log("Five seconds have passed.");

// 收到 "PlayerHit" 信号时触发, 并将信号的 "damage" 参数
// 赋值给一个名为 "dmg_val" 的新变量
[Signal(Signal.PlayerHit)[dmg_val]]
  .Log("Ouch! Took " + m.str(dmg_val));

// 游戏对象创建时触发
[OnDeath()[cause]]
  .Log("I'm dead! Because of " + m.str(cause));

```

其他常用触发器包括：`OnVarChange(name)`, `OnCollision`, `OnHit`, `OnUI`, `OnTab` 等。

### 4.2. 顺序流 (Sequential Flow)

使用 `.` 进行链式调用，表示 A → B → C 的顺序执行逻辑。

```scss
[OnCreate()]
  .Log("Step 1")
  .DoSomething()
  .Log("Step 2")
  .Teleport(Self.self, m.vec(10, 0, 0));

```

### 4.3. 并行分支 (Parallel Branching)

使用 `>> { 0: ... , 1: ... , ... }` 语法创建多个“同时”执行的分支。

**规则**：分支的键必须是**整数字面量**。执行时将按照**键值升序**，以**深度优先**的方式依次执行。

```ts
[OnCreate()]
  .Log("Starting...") >> {
    // 这三个分支将按 0, 1, 2 的顺序依次执行完毕
    0: Log("Branch 0: Runs first"),
    2: Log("Branch 2: Runs last"),
    1: DoSomething().Log("Branch 1"),
  }.Log("注意: 这里不会被执行"); // (执行方式见后文)

// 实际执行顺序:
// 1. Log("Starting...")
// 2. Log("Branch 0: Runs first")
// 3. DoSomething()
// 4. Log("Branch 1")
// 5. Log("Branch 2: Runs last")

```

### 4.4. 合并与跳转 (Branch Anchors)

你可以通过**锚点 (Branch Anchor)** 来管理复杂的流程控制，如分支合并或跳转。

-   **定义锚点**：
    1.  `Branch["my-anchor"].FunA()` （在新行顶格书写，无缩进）
    2.  `... FunB().Branch["my-anchor"].FunC()` （在调用链中直接标记）
-   **跳转到锚点**：`>> "my-anchor"()`

**注意**：

1.  在同一作用域（文件或组件）内，锚点 ID 必须**唯一**。
2.  当跳转的目标分支执行完毕后，控制流会回到跳转点，**继续向后执行**。
    

**示例：使用锚点合流**

```ts
// 定义 "finish-logic" 锚点
// 无论 EventA 或 EventA 发生, 这里都会被执行
Branch["Merge Branch"]
  .Log("Finished!");

[Signal(Signal.EventA)]
  .Log("A happened")
  .Wait(1.0)
  >> "Merge Branch"(); // 跳转到 "Merge Branch"

[Signal(Signal.EventB)]
  .Log("B happened")
  >> "Merge Branch"(); // 跳转到 "Merge Branch"

```

> **警告**：复杂的合流逻辑会显著增加理解成本，并可能引发潜在 Bug（例如：执行树某分支被意外多次执行、引用了未执行节点的输出值等）。

### 4.5. `>> 0()` (块内合流)

在分支块 `>> {}`、选择块 `If()` 或 `Switch()` 内部，`>> 0()` 是一个特殊的跳转指令，意为“**合并回主干流**”（即跳转到当前块的 `}` 或 `)` 之后连接的第一个节点）。

对于不执行操作直接跳转的行为：
-   在分支块中：`0: 0()` 表示直接合流。
-   若要直接跳转到特定分支：使用 `1: "branch-id"()`。

```ts
[OnCreate()]
  .Log("Start")
  >> {
    0: DoSomething() >> 0(), // 先执行 DoSomething(), 然后跳转到 `}` 外
    1: Log("Branch 1") >> 0(), // Log, 然后跳转到 "Log("Both done")"
  }.Log("Both done?"); // <-- ">> 0" 的目标

// 预期执行顺序:
// 1. Log("Start")
// 2. DoSomething()
// 3. Log("Both done?")
// 4. Log("Branch 1")
// 5. Log("Both done?")

```

此外，还可以使用 `>> -1()`（或不在尾部添加任何标记），表示内部逻辑执行完后不跳转，**继续执行下一分支**。 同理，`>> "branch-id"()` 表示执行完当前逻辑后进入特定锚点。

**行为比较 (Behavior Comparison)：**

-   **`A() >> B() >> C()`** (顺序执行)：
    -   等价于 `A().B().C()`。
    -   **含义**：A 执行完 → B 执行完 → C 执行完。
-   **`A() << B() >> C()...`** (延迟执行)：
    -   等价于 `A().C()....B()`。  
    -   **含义**：先执行 A，接着执行 C 及其**后续所有内容**。只有当 C 的整条链路**完全结束**后，才回过头来运行 B。
-   **多重延迟**：
    -   当一条链上存在多个 `<<` 时 (例如 `A() << B() << C() >> D()....`)，系统会先执行主链 (A() -> D()...)，再**从后向前**依次执行被“挂起”的节点 (先 C 后 B)。

### 4.7. 条件逻辑 (If)

使用 `If(condition)( ... )` 创建条件分支。 对于空操作跳转，使用 `true = 0()` 表示直接合流，`false = "branch-id"()` 表示直接跳转。

```sql
[Signal(Signal.CompareVal)[val]]
  .If(val > 10)(
    true = Log("Value is large") >> 0(), // 如果 true, 执行并合流
    false = Log("Value is small") >> 0() // 如果 false, 执行并合流
  )
  .Log("Check complete"); // <-- ">> 0()" 的合流点

```

**省略写法 (语法糖)：**

如果只需处理 `true` 分支并继续主干流，可以省略 `( cases )`。
-   **代码**：`.If(this.is_alive).Log("Still alive!")`
-   **等价于**：`.If(this.is_alive)(true = 0(), false = -1()).Log("Still alive!")`
-   **含义**：若 `is_alive` 为 true，执行 `Log()`；若为 false，则跳过 `Log`。
    

### 4.7. 多选逻辑 (Switch)

使用 `Switch(variable)( ... )` 处理多个固定选项. 

**规则**：

1.  分支键必须是**字面量**（如 `"sword"`, `10`, `true`），不支持变量。
2.  使用 `null` 表示 `default`（默认）分支。

```ts
[Signal(Signal.Equip)[item_name]]
  .Switch(item_name)(
    "sword" = Log("Equipped sword.") >> 0(),
    "shield" = Log("Equipped shield.") >> 0(),
    "potion" = DrinkPotion() >> 0(),
    null = Log("Unknown item!") >> 0() // 默认分支
  )
  .UpdatePlayerModel(); // 所有分支的合流点

```

### 4.8. 循环 (Loop)

使用 `.Loop(start, end, "ID")[i]( ... )` 执行有限循环。注意 `end` 值是**包含**在循环内的（闭区间）。
-   `"ID"`：循环的唯一标识符，配合 `StopLoop()` 使用（可选）。
-   `[i]`：循环变量。
-   `true` 分支：每次迭代 (i=0, 1, 2...) 执行的内容。
-   `false` 分支：循环**正常**结束 (`i > end`) 后执行一次的内容。(因性能因素被终止的循环不会输出 false 分支)

```ts
[OnCreate()]
  .Loop(0n, 2n, "MyLoop")[i]( // 将运行 3 次 (i=0, i=1, i=2)
    // 循环体
    true = Log("Loop iteration: " + m.str(i))
      .If(i === 1n) // 假设我们想在 i=1 时停止
      .StopLoop("MyLoop"),
    // 循环结束时
    false = Log("Loop finished") >> 0()
  ).Log("Done with loop.");

// 预期执行顺序:
// 1. Log("Loop iteration: 0")
// 2. If(0n === 1n)
// 3. Log("Loop iteration: 1")
// 4. If(1n === 1n).StopLoop()
// 5. Log("Loop finished")
// 6. Log("Done with loop.")

```

**关于 `StopLoop` 的注意事项**： `StopLoop("ID")` **不会**立即中断执行。它仅标记循环在**当前迭代**结束后不再继续，转而进入 `false` 分支。在 `StopLoop` 调用之后的节点（`true` 块内）依然会执行完毕。

### 4.9. 迭代 (ForEach)

与 Loop 类似，但循环变量 `i` 替换为列表元素 `item`。

```ts
[OnSignal(Signal.Hit)[list]]
  .ForEach(list)[item]( // 将依次遍历实体列表
    // 循环体
    true = Log("Hit item: " + item.name).Hit(item),
    // 循环结束时
    false = Log("Foreach finished") >> 0()
  ).Log("Done with Hit.");

```


## 5\. 计算值：数据流 (Data Flow)

数据流负责定义“使用什么**数据**”。

### 5.1. `$(...)` 语法

`$(...)` 是创建**运算节点**的唯一途径，用于纯计算逻辑。
-   **内部格式**：`$()` 内部必须包含且仅包含一个 lambda 表达式 `() => ...`。
-   **求值时机**：仅当控制流**激活**了依附的执行节点时，`$(...)` 才会被立即求值。
    

```ts
[OnCreate()]
  // 执行到这里不会直接调用
  .$(() => "Hello" + " " + "World!")[msg]
  // .Log() 被激活时, $(...) 才会被求值
  .Log(msg);

```

### 5.2. `function output` (获取变量)

节点可以输出变量供后续节点使用。使用 `[my_var_name]` 语法声明这些输出。

```scss
[OnCreate()]
  .GetPlayer()[player_entity] // 1. GetPlayer() 输出 "player_entity"
  .GetName(player_entity)[player_name] // 2. GetName() 使用 "player_entity"
  .Log("Player name is: " + player_name);

```

### 5.3. `$(...)` 捕获列表

这是 `$(...)` 语法最关键的规则. 

**规则**：必须在 `$((args) => ... )` 的**第一个**括号（捕获列表`args`）中，**明确列出**所有需要使用的 `function output` 变量。 **例外**：`this.var`, `node.var` 等全局或持久变量**不**需要声明，可直接在内部使用。

```ts
[OnCreate()]
  .FunA()[val_a]
  .FunB()[val_b]
  // --- 示例 ---
  // ✅ 正确: val_a 和 val_b 都在捕获列表中
  .$((val_a, val_b) => val_a + val_b + Self.global_val)[sum]
  // ❌ 错误: val_b 在内部使用, 但未在捕获列表 (val_a) 中声明
  .$((val_a) => val_a + val_b)[sum1] // 编译时会报错
  // ❌ 错误: this.global_val 是全局变量, 不应放入捕获列表
  .$((val_a, Self.global_val) => val_a + Self.global_val)[sum2] // 编译时会报错

```


### 5.4. `$(...)` 多输出

若需返回多个值，`$(...)` 内部应返回一个对象或列表，并在外部使用 `[a, b]` 语法提取。支持使用 `[a=key1, b=key2]` 进行键值映射。

```ts
[OnCreate()]
  .GetPlayer()[player]
  .$((player) => {
    // 假设 player 是一个有 x 和 y 的向量
    return { my_x: player.x, my_y: player.y };
  })[x_pos = my_x, y_pos = my_y] // 映射：x_pos 得到 my_x 的值

  .Log("X: " + x_pos + ", Y: " + y_pos);

```


### 5.5. 依赖未执行分支的变量

如果你捕获了一个来自 `If` 分支产生的变量，但运行时该分支**并未执行**，会发生什么？

**规则**：**系统不会报错**。你将获得该变量类型的**默认值**（如 `0`, `false`, `""` 等），同时控制台会打印一条警告信息。

```ts
[OnCreate()]
  .If(false)(
    true = DoSomething()[my_var], // 这个分支永远不会执行
    false = 0(),
  )
  // my_var 仍然在捕获列表中声明
  // 此时, my_var 的值是 0 (假设它是 int 类型)
  .$((my_var) => my_var + 10)[result]
  .Log(result); // 将打印 "10"

```

### 5.6. 计算路径回溯

每个运算节点在被调用时，都会根据捕获列表回溯数值来源：

-   **来源是系统函数**：获取该函数**最新一次**的输出值（若未计算则取默认值）。
-   **来源是复合节点 (Component)**：进入复合组件内部，追踪该输出参数的源头。
    -   若源头仍是执行节点、复合节点或运算节点，则递归上述操作。
    -   若源头追溯到复合节点的**输入参数**，则跳出组件，从调用点的传入参数继续向上追溯。此过程持续进行，直到找到**系统函数**或无捕获参数为止。


## 6\. 管理状态：变量命名空间

系统提供四种不同生命周期的变量供使用：

|  类型   |        声明方式        |     生命周期      |         修改方式         |   捕获列表要求    |
|-------|--------------------|---------------|----------------------|-------------|
| **函数输出**  |     `.Fun()[a]`      |     单次执行树     |          **只读**          |   **必须显式捕获**    |
| **临时变量**  |      `const _x`      |     单次执行树     |   `.SetVal(_x, ...)`   | (直接使用，无需捕获) |
| **节点图变量** | `declare class node` | 持久 (跟随实体的节点图) | `.SetVal(node.x, ...)` | **不可捕获** (直接使用) |
| **全局变量**  | `declare class This` |   持久 (跟随实体)   | `.SetVal(this.x, ...)` | **不可捕获** (直接使用) |

**示例：使用 `SetVal` 和临时变量**
```ts
// 声明一个临时计数器
const _hit_damage: int = 100n;
// 每次触发时 _hit_damage 又会被初始化为 100
[Signal(Signal.PlayerHit)[reaction_rate]]
  // 1. 读取 reaction_rate 并执行计算
  .$((reaction_rate) => _hit_damage * calc_intensity(reaction_rate))[damage]
  // 2. 将新值写入 _hit_damage
  .SetVal(_hit_damage, damage)
  // 3. 将新值写入持久化的 Self.total_hits
  // 这里的调用不会触发计算
  .SetVal(Self.total_hits, Self.total_hits + _hit_damage)
  .Log("Hit: " + m.str(_hit_damage));

```


## 7\. 复用逻辑：组件 (Components)

组件即“可复用的子图”，主要分为两种类型：

### 7.1. 控制流组件 (首字母大写)

包含完整执行节点的子图，拥有自定义的入口和出口。

**定义 (Define):**
```ts
// 定义一个组件, 它只有默认出口
function GetValue(val: int) {
  In() // 默认入口
    .$((val) => val + 10)[sum]
    .Out() // 默认出口
    .Log("Runs Before Out()!")

  // 声明该组件的返回值
  return ExecFun<{ sum: int }>();
}

// 定义一个组件, 它有两个出口："large" 和 "small"
function CheckValue(val: int) {
  In() // 默认入口
    .If(val > 10)(
      true = Log(m.str(val)).Out("large"), // 触发 "large" 出口
      false = Out("small"), // 触发 "small" 出口
    );

  // 声明该组件的出口
  return ExecFun<{}>("large", "small");
}

```

-   **多入口**：通过 `In("InBranchId")` 定义。调用时若需指定入口，请使用 `Selector(MyFun, "InBranchId", args)[outs]`，默认调用 `MyFun(args)[outs]` 则进入 `In()`。
    
-   **`Out()` 出口的执行顺序 (深度优先)**： 这是一个关键概念。当 `Out(id)` 被触发时，控制流会**优先运行 `Out` 后面的代码**。`Out` 本身的优先级在当前链条中是**最低**的。只有当 `Out` 后续的所有逻辑执行完毕，系统才会真正触发组件外部连接在 `Out` 上的节点。 这等价于 `FunX() << Out() >> FunY()` 的逻辑。即使你在分支中试图用 `FunX().{0: Out(), 1: 0()}.FunY()` 改变顺序，运行时 `Out` 依然会在 `FunY` 执行后才触发。因此，务必将 `Out` 理解为“挂起当前出口，先跑完剩下的，再出去”。
    

**使用 (Use):**

```ts
[Signal("TestValue")[my_val]]
  // 调用组件, 并获取输出值
  .GetValue(my_val)(5)[new_val = sum]
  // 调用多分支组件, 并为它的出口连接后续逻辑
  .CheckValue(new_val)(
    "large" = Log("Value was large!"),
    "small" = Log("Value was small.")
  );

// 示例中的执行结果为
// 1. GetValue(5)
// 2. Log("Runs Before Out()!") // 注意. 在 Out 前触发
// 3. Out()[sum = 15]
// 4. CheckValue(15)
// 5. Log("15")
// 6. Out("large")
// 7. Log("Value was large!")

```

### 7.2. 纯运算函数 (首字母小写)

纯粹的数学或逻辑计算函数，仅能在 `$(...)` 内部或节点参数中使用。定义时请采用 lambda 表达式。

**定义 (Define):**
```ts
const add = (a: int, b: int): int => {
  return a + b;
};

const get_stats = (a: int): { x: int, y: int } => {
  return { x: a * 2, y: a + 1 };
}

```

**使用 (Use):**
```ts
[OnCreate()]
  .FunA()[val_a, val_b]

  // 或者在 $(...) 内部调用
  .$((val_a, val_b) => {
    const sum = add(val_a, val_b);
    const { x, y } = get_stats(sum);
    return x + y;
  })[result]
  .Log(result)

  // 或作为函数参数
  .FunB(add(1, 2), get_stats(3).x);
```


## 8\. 类型声明

系统支持的所有数据类型如下表所示：

| 序号 | 类型 | 类型名 | 备注 |
| :---: | :--- | :--- | :--- |
| 1 | 整型 | Int | 对应 TS 的 `bigint`，同时提供 `int` 类型别名以便使用 |
| 2 | 浮点型 | Float | 对应 TS 的 `number`，同时提供 `float` 类型别名以便使用 |
| 3 | 布尔型 | Bool | 对应 TS 的 `boolean`，同时提供 `bool` 类型别名以便使用 |
| 4 | 字符串 | Str | 对应 TS 的 `string`，同时提供 `str` 类型别名以便使用 |
| 5 | 三维向量 | Vec | 包含 x, y, z 三个 float 值 |
| 6 | GUID | GUID | 内部逻辑为 int，但类型安全，不可直接转为 int |
| 7 | 实体 | Entity | 唯一允许初始值为 null 的对象类型 |
| 8 | 元件 ID | Prefab | 内部逻辑为 int，类型安全 |
| 9 | 阵营 | Faction | 内部逻辑为 int，类型安全 |
| 10 | 配置 ID | ConfigId | 内部逻辑为 int，类型安全 |
| 11 | 列表 | List | 强类型列表，类型由属性定义 |
| 12 | 字典 | Dict | 强类型字典，键值类型由属性定义 (共 140 种组合) |
| 13 | 结构体 | Struct | 需在节点编辑器中预先定义的自定义类型 |

-----


## 更多详细内容与设计理念参见[系统设计文档](./SystemDesign.md)