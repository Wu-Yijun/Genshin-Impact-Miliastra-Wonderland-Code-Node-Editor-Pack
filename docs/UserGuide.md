# 节点图等效代码语言(DSL)使用手册

> 截图展示节点图实在太折磨人了——又小又丑, 还老是看不清. 于是我干脆自己捣鼓了一套“**节点图等效代码语言(DSL, Domain-Specific Language)**”, 用代码把节点图的结构清清楚楚地表达出来. 

## 1\. 快速上手

本 DSL 是一种用于**以纯文本描述节点图**的语言. 它利用 TypeScript 的语法高亮, 使复杂的逻辑图易于读写、版本控制和审查. 

**核心理念：** 你编写的代码看起像 TypeScript, 但它描述的是一张节点图. 
* **控制流** (Execution) 是图的骨架, 使用 `.FunA().FunB()` 这样的链式调用来表示. 
* **数据流** (Data) 是图的内容, 使用 `$(...)` 语法来计算值. 

**入门示例：**

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
它描述了这样一张图：
`[OnCreate 触发器]` → `[Log 节点]` → `[SetVal](触发运算1,2)` → `[Log 节点]` → `[Teleport 节点](重新触发运算1,2,3)`

## 2\. 核心概念速查

  * **触发器 (Trigger)**：`[OnCreate()]`, `[Signal(Signal.name)]`
      * **作用**：图执行的*起点*. 
  * **执行节点 (Exec Node)**：`.Log()`, `.Wait()`, `.MyFunction()`
      * **作用**：图中的一个*操作步骤*. 
  * **运算节点 (Data Node)和 查询函数(query)**：`$((cap) => { ... })`
      * **作用**：用于*计算*一个值 (e.g., `1 + 1`). 
      * **查询函数**: 查询函数是节点图定义的函数, 只能在运算节点内使用.
  * **常量和变量 (Variable)**：`this.my_var` 和 `.Fun()[my_val]`
      * **作用**：存储和传递*数据*. 
  * **组件 (Component)**：`function MyComponent() { ... }`
      * **作用**：可复用的*子图*. 

## 3\. 设置你的图文件 (文件头部声明) 

在开始编写逻辑之前, 你通常需要在文件顶部声明图所需的变量、结构和事件. 
```ts
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

> 控制流决定了节点会在*何时*触发. 

### 4.1. 触发器 (Triggers)

所有逻辑都必须由一个触发器开始. 触发器必须顶格 (无缩进) 书写, 触发器均以 `On` 开头如 `OnDestroy`. *除了 `Timer` 和 `Signal` 不是以 `On` 开头, 这两个触发器的参数是需要在全局声明的.*
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

常用的触发器还有: `OnVarChange(name)`, `OnCollision`, `OnHit`, `OnUI`, `OnTab` 等

### 4.2. 顺序流 (Sequential Flow)

使用 `.` 链式调用来表示 A → B → C 的顺序执行. 
```ts
[OnCreate()]
  .Log("Step 1")
  .DoSomething()
  .Log("Step 2")
  .Teleport(Self.self, m.vec(10, 0, 0));

```

### 4.3. 并行分支 (Parallel Branching)

使用 `>> { 0: ... , 1: ... , ... }` 来创建多个 “同时” 执行的分支. 

**规则**：分支键必须是**整数字面量**. 执行将按照**键的升序**, 以**深度优先**的方式进行. 
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

你可以使用锚点 (Branch Anchor) 来管理复杂的流程, 例如合并或跳转. 

* **定义锚点**：
  1.  `Branch["my-anchor"].FunA()` (在新行顶格无缩进的书写. )
  2.  `... FunB().Branch["my-anchor"].FunC()` (在链中标记)
* **跳转到锚点**：`>> "my-anchor"()` 

**注意**：在同一作用域 (文件或 Component) 内, 锚点 ID 必须**唯一**. 
**注意**：分支跳转后, 当跳转的目标分支执行完毕后, 会回到跳转位置**继续向后执行**. 

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

> **请注意, 复杂的合流会产生额外的思维成本, 有形成潜在 Bug 的风险, 包括: 一颗执行树中的某个分支被意外执行多次, 引用了未被执行的节点的输出值, 等**

### 4.5. `>> 0()` (块内合流)

在分支块 `>> {}`、选择块 `If()` 或 `Switch()` 的内部, `>> 0()` 是一个特殊的跳转, 意思是“**合并回主干流**” (即 `}` 或 `)` 之后连接的第一个节点) . 

对于不执行操作直接转跳的行为,
  - 通过 `0: 0()`*(分支块)* 或 `true = 0()`*(选择块)* 表示直接合流.
  - 通过 `1: "branch-id"()`*(分支块)* 或 `false = "branch-id"()`*(选择块)* 表示直接进入某分支.

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


此外, 还可以使用  `>> -1()` (或不在尾部标记) , 表示内部逻辑执行完不转跳, **继续执行下一分支**. 
同样的, `>> "branch-id"()`, 意思是执行完进入特定锚点.


**行为比较 (Behavior Comparison)：**
* **`A() >> B() >> C()`** (顺序执行)：
    * 等价于 `A().B().C()`。
    * 含义：**A** 执行完 -> **B** 执行完 -> **C** 执行完。
* **`A() << B() >> C()...`** (延迟执行)：
    * 等价于 `A().C()....B()`。
    * 含义：先执行 **A**，然后执行 **C** 以及 **C 后面** 的全部内容。当 C 的链路**完全结束**后，才运行 **B**，B 运行完成后结束。
* **多重延迟**：
    * 当一条链上有多个 `<<` 时 (e.g. `A() << B() << C() >> D()....`)，按定义先执行主要链 (A() -> D()...)，再**从后向前**依次执行被"挂起"的节点 (C -> B)。


### 4.7. 条件逻辑 (If)

使用 `If(condition)( ... )` 来创建选择分支. 
对于不执行操作直接转跳的行为, 通过 `true = 0`(直接合流) 或 `false = "branch-id"`(直接进入某分支) 表示.
```ts
[Signal(Signal.CompareVal)[val]]
  .If(val > 10)(
    true = Log("Value is large") >> 0(), // 如果 true, 执行并合流
    false = Log("Value is small") >> 0() // 如果 false, 执行并合流
  )
  .Log("Check complete"); // <-- ">> 0()" 的合流点

```

**省略写法 (语法糖)：**

如果你只想处理 `true` 分支并继续主干流, 可以省略 `()`. 
* **代码**：`.If(this.is_alive).Log("Still alive!")`
* **等价于**：`.If(this.is_alive)(true = 0(), false = -1()).Log("Still alive!")`
* **含义**：如果 `is_alive` 为 true, 执行 `Log()`；如果为 false, 则不执行后续的 `Log`.

### 4.7. 多选逻辑 (Switch)

使用 `Switch(variable)( ... )` 来处理多个固定选项. 

**规则**：
1.  分支键必须是**字面量** (例如 `"sword"`, `10`, `true`) , 不能是变量. 
2.  使用 `null` 作为 `default` (默认) 分支. 

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

使用 `.Loop(start, end, "ID")[i]( ... )` 来执行有限循环. `end` 是**包含**在内的. 
* `"ID"` 是循环的唯一标识符, 用于 `StopLoop()`. 可以省略.
* `[i]` 是循环变量. 
* `true` 分支：为每个 `i` (0, 1, 2...) 执行. 
* `false` 分支：当循环*正常*结束后 (`i > end`) 执行一次. 
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

**`StopLoop` 注意**：
`StopLoop("ID")` *不会*立即跳出. 它只是标记循环在*当前迭代*结束后再进入结束分支. `StopLoop` 之后的节点 (在 `true` 块内) 仍会继续执行. 

### 4.9. 迭代 (ForEach)

与 Loop 循环类似, 但是循环变量 i 改为列表元素 item.
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

数据流决定了“要用什么*数据*”. 

### 5.1. `$(...)` 语法

`$(...)` 是创建**运算节点**的唯一方式. 它用于执行纯计算.
* **内部格式**: $() 内部必须唯一一个 lambda 表达式 `() => ...`
* **求值时机**：当控制流激活了它所依附的执行节点时, `$(...)` 才会被立即求值. 

```ts
[OnCreate()]
  // 执行到这里不会直接调用
  .$(() => "Hello" + " " + "World!")[msg]
  // .Log() 被激活时, $(...) 才会被求值
  .Log(msg);

```

### 5.2. `function output` (获取变量)

节点可以输出变量, 供后续节点使用. 使用 `[my_var_name]` 语法来捕获输出. 
```ts
[OnCreate()]
  .GetPlayer()[player_entity] // 1. GetPlayer() 输出 "player_entity"
  .GetName(player_entity)[player_name] // 2. GetName() 使用 "player_entity"
  .Log("Player name is: " + player_name);

```

### 5.3. `$(...)` 捕获列表

这是 `$(...)` 语法最关键的规则. 

**规则**：你必须在 `$(...)` 的**第一个**括号 (捕获列表) 中, **明确列出**你将要使用的所有 `function output` 变量. 
**例外**：`this.var`, `node.var` 变量**不**需要在捕获列表中声明, 你可以直接在内部使用它们. 

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

如果你的计算需要返回多个值, `$(...)` 内部应返回一个对象或列表, 并在外部使用 `[a, b]` 的语法进行提取, 可选 `[a=key1, b=key2]`重映射位置. 
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

如果你捕获了一个来自 `If` 分支的变量, 但该分支*没有*被执行, 会发生什么？

**规则**：**不会报错**. 你将获取该变量类型的**默认值** (`0`, `false`, `""` 等), 并打印警告. 
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


### 5.6. 计算路径

每一个计算节点都可以有捕获和输出, 如果一个计算节点包含捕获, 那么当它被调用时, 会先寻找捕获值的来源.
* **节点系统函数**: 如果捕获值的来源是系统函数, 那么会获取它**最新一次**输出值作为传入参数(未被计算的取默认值).
* **节点系统函数**: 如果捕获值的来源是复合节点(Component 函数), 那么会进入复合函数, 寻找这个输出参量的来源.
  * 如果来源是执行节点或复合节点或运算节点, 则重复上述操作
  * 如果来源追溯到复合节点的**输入参量**, 则会离开复合节点, 从调用点的传入参数继续向上追溯. 并重复上述操作直到达到**系统函数**或无捕获参数.

## 6\. 管理状态：变量命名空间

你有四种不同生命周期的变量可以使用：
| 类型 | 声明方式 | 生命周期 | 如何修改 | 捕获列表？ |
| :--- | :--- | :--- | :--- | :--- |
| **函数输出** | `.Fun()[a]` | 单次执行树 | **只读** | **必须捕获** |
| **临时变量** | `const _x` | 单次执行树 | `.SetVal(_x, ...)` | (直接用) |
| **节点图变量**| `declare class node` | 持久 (实体的节点图) | `.SetVal(node.x, ...)` | **不可捕获** (直接用) |
| **全局变量** | `declare class This` | 持久 (实体) | `.SetVal(this.x, ...)` | **不可捕获** (直接用) |

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

组件是可复用的子图. 有两种类型：

### 7.1. 控制流组件 (首字母大写)

这些是包含执行节点的完整子图, 可以有自己的入口和出口. 

**定义 (Define):**
```ts
// 定义一个组件, 它只有默认出口
function GetValue(val: int) {
  In(0) // 默认入口
    .$((val) => val + 10)[sum]
    .Out(0) // 默认出口
    .Log("Runs Before Out()!")

  // 声明该组件的返回值
  return ExecFun<{ sum: int }>();
}

// 定义一个组件, 它有两个出口："large" 和 "small"
function CheckValue(val: int) {
  In(0) // 默认入口
    .If(val > 10)(
      true = Log(m.str(val)).Out("large"), // 触发 "large" 出口
      false = Out("small"), // 触发 "small" 出口
    );

  // 声明该组件的出口
  return ExecFun<{}>("large", "small");
}

```
如果有多个入口, 通过在函数中使用多个 `In()` 并添加分支名表示入口 `In("InBranchId")`, 调用时通过 `MyFun(args)[outs]` 进入默认入口. 如果需要指定为其它入口, 需通过 `Selector(MyFun, "InBranchId", args)[outs]` 调用.

***`出口` 执行顺序 (深度优先)***：
当出口 `Out(id)` 被触发时, 控制流会先运行**后面**的代码, 出口的优先级是**最低**的, 执行完毕后面的代码后, 再触发触发`Out()` 外部的节点(等价于 `FunX() << Out() >> FunY()` 的顺序). 
就算是并列分支, 在节点编辑器中, Out 也永远是最后执行的, 即使你用 `FunX().{0: Out(), 1: 0()}.FunY()` 试图让 Out() 先于 FunY() 执行, 运行时也是 Out() 在 FunY() 执行后触发. 必须将 Out 挂载其它执行节点上, 它会被挂起在对应节点上.

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
// 3. Out(0)[sum = 15]
// 4. CheckValue(15)
// 5. Log("15")
// 6. Out("large")
// 7. Log("Value was large!")

```




### 7.2. 纯运算函数 (首字母小写)

这些是纯粹的数学计算函数, 只能在 `$(...)` 内部或节点参数中调用. 定义时应采用 lambda 表达式的形式.

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

以下列出了全部系统允许类型


|序号| 类型 | 类型名 | 备注 |
|:--:| :--- | :--- | :--- |
|1|整型|Int| 同时有 int 类型, 对应 TS 的 `bigint`, 方便使用 |
|2|浮点型|Float| 同时有 float 类型, 对应 TS 的 `number`, 方便使用 |
|3|布尔型|Bool| 同时有 bool 类型, 对应 TS 的 `boolean`, 方便使用 |
|4|字符串|Str| 同时有 string 类型, 对应 TS 的 `string`, 方便使用 |
|5|三维向量|Vec| 内部逻辑为 x,y,z 均为 float 值 |
|6|GUID|GUID| 内部逻辑为 int, 但不能化为int |
|7|实体|Entity| 唯一不能设置初始值的对象(默认为 null) |
|8|元件 ID|Prefab|内部逻辑为 int, 但不能化为int |
|9|阵营|Faction|内部逻辑为 int, 但不能化为int |
|10|配置 ID|ConfigId|内部逻辑为 int, 但不能化为int |
|11|列表|List| 列表的项目也是强类型的, 由列表的属性决定 |
|12|字典|Dict| 字典的键值都是强类型的, 由字典的属性决定, 共 140 种组合 |
|13|结构体|Struct| 结构体的类型是需要在节点编辑器中定义的 |

---


## 更多详细内容与设计理念参见[系统设计文档](./SystemDesign.md)