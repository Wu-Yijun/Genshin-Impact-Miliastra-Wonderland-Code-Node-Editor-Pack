# 节点图等效代码语言(DSL)使用手册

截图展示节点图实在太折磨人了——又小又丑，还老是看不清。于是我干脆自己捣鼓了一套“**节点图等效代码语言(DSL, Domain-Specific Language)**”，用代码把节点图的结构清清楚楚地表达出来。

## 1\. 快速上手

本 DSL 是一种用于**以纯文本描述节点图**的语言。它利用 TypeScript 的语法高亮，使复杂的逻辑图易于读写、版本控制和审查。

**核心理念：** 你编写的代码看起像 TypeScript，但它描述的是一张节点图。
* **控制流** (Execution) 是图的骨架，使用 `.FunA().FunB()` 这样的链式调用来表示。
* **数据流** (Data) 是图的内容，使用 `$(...)` 语法来计算值。

**入门示例：**

这段 DSL：
```ts
// @ts-nocheck
// ^ 建议始终在文件顶部添加此行，以关闭 TS 编译器的类型检查

declare global {
  namespace Self {
    const my_var: any = 0;
  }
}

[OnCreate()]
  .$(() => 1.0)[val] // (1) // 运算节点只在输出值被调用时求值
  .Log("Hello, World!")
  .$((val) => { return { a: val + 1, y: val + self.my_var }; })[x = a, y] // (2) // 映射：x 得到 a 的值, y 直接用
  .SetVal(self.my_var, x)  // 设置全局变量
  .Log("New Val is Set")
  .$((x, y) => { return m.vec(x, y, 2); })[my_vec as vec] // (3) // m 是 Math 空间, as vec 声明返回类型(可省略)
  .Teleport(pos = my_vec); // 默认目标为 self (自身实体)
```
...描述了这样一张图：
`[OnCreate 触发器]` → `[Log 节点]` → `[SetVal](触发运算1,2)` → `[Log 节点]` → `[Teleport 节点](重新触发运算1,2,3)`

## 2\. 核心概念速查

  * **触发器 (Trigger)**：`[OnCreate()]`, `[Signal("...")]`
      * **作用**：图执行的*起点*。
  * **执行节点 (Exec Node)**：`.Log()`, `.Wait()`, `.MyFunction()`
      * **作用**：图中的一个*操作步骤*。
  * **运算节点 (Data Node)和 查询函数(query)**：`$(...)`
      * **作用**：用于*计算*一个值 (e.g., `1 + 1`)。
      * **查询函数**: 查询函数是节点图定义的函数, 只能在运算节点内使用.
  * **常量和变量 (Variable)**：`this.my_var` 和 `.Fun()[my_val]`
      * **作用**：存储和传递*数据*。
  * **组件 (Component)**：`function MyComponent() { ... }`
      * **作用**：可复用的*子图*。

## 3\. 设置你的图文件（文件头部声明）

在开始编写逻辑之前，你通常需要在文件顶部声明图所需的变量、结构和事件。
```ts
// @ts-nocheck
import "./def.d.ts"; // 导入系统类型和方法定义

// 1. 导入 (Import)
// 从其他文件导入可复用的组件或纯函数
import { MyReusableComponent, my_calc_func } from "./shared_components.ts";

// 2. 结构体 (Interface)
// 定义自定义数据结构
interface PlayerData {
  id: int;
  name: string;
}

// 变量声明和环境
declare global {
  // 3. 信号 (Signal)
  // 声明此图可以响应的信号
  interface Signal {
    PlayerHit(damage: int);
    GameStart();
  }

  // 4. 计时器 (Timer)
  // 声明此图可以响应的全局计时器
  namespace Timer {
    const five_second: CountDown = 5; // 倒计时5秒
    const time: Count = 10; // 从10开始正计时 
  }

  // 5.声明实体的全局变量 (每个实体一个实例)
  namespace Self{
    let player_name: string = "Default";
    let is_alive: boolean = true;
  }

  // 6. 节点图变量 (node)
  // 声明节点图变量 (每个实体的每个节点图一个实例)
  namespace Node {
    let config_id: Config = 0;
  }

  namespace Local {
    let _local_a: int = 5n;
  }
}


// 7. 临时变量 (Local Variable)
// 声明仅在单次执行树中有效的临时变量 (须以 _ 开头)
const _local_counter: int = 0;

// ----- 逻辑开始 -----
[OnCreate()]
  .Log(this.player_name);
```


## 4\. 构建逻辑：控制流 (Control Flow)

控制流决定了“什么会*何时*发生”。

### 4.1. 触发器 (Triggers)

所有逻辑都必须由一个触发器开始。触发器必须顶格（无缩进）书写。除了 `Timer` 和 `Signal` 外, 其余触发器均以 `On` 开头如 `OnDestroy`.
```ts
// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!");

// 收到 "PlayerHit" 信号时触发，并将信号的 "damage" 参数
// 赋值给一个名为 "dmg_val" 的新变量
[Signal("PlayerHit")[dmg_val]]
  .Log("Ouch! Took " + dmg_val.to<string>());

// 全局计时器 "five_second" 触发时
[Timer("five_second")]
  .Log("Five seconds have passed.");

```


常用的触发器还有: `OnVarChange(name), OnCollision, OnHit, OnUI, OnTab` 等

### 4.2. 顺序流 (Sequential Flow)

使用 `.` 链式调用来表示 A → B → C 的顺序。(可不换行, 也可用 `>>` 表示)
```ts
[OnCreate()]
  .Log("Step 1")
  .Wait(1.0)
  .Log("Step 2")
  .MoveTo(10, 0, 0);

```
<!-- ![3](./static/03/image-3.png) -->


### 4.3. 并行分支 (Parallel Branching)

使用 `>> { ... }` 来创建多个“同时”执行的分支。

**规则**：分支键必须是**整数字面量** (0, 1, 2...)。执行将按照**键的升序**，以**深度优先**的方式进行。
```ts
[OnCreate()]
  .Log("Starting...")
  >> {
    // 这三个分支将按 0, 1, 2 的顺序依次执行完毕
    0: Log("Branch 0: Runs first"),

    1: Wait(1.0)
      .Log("Branch 1: Runs second (after 1s)"),

    2: Log("Branch 2: Runs third"),
  }.Log("Will Not Reach");

// 实际执行顺序:
// 1. Log("Starting...")
// 2. Log("Branch 0: Runs first")
// 3. Wait(1.0)
// 4. Log("Branch 1: Runs second (after 1s)")
// 5. Log("Branch 2: Runs third")

```
<!-- ![4](./static/03/image-4.png) -->


### 4.4. 合并与跳转 (Branch Anchors)

你可以使用锚点（Branch Anchor）来管理复杂的流程，例如合并或跳转。

  * **定义锚点**：
    1.  `Branch["my-anchor"].FunA()` (在新行顶格无缩进的书写。)
    2.  `  .FunB().Branch["my-anchor"].FunC()` (在链中标记)
  * **跳转到锚点**：`... >> "my-anchor"` (只能在语句结束后转跳)

**注意**：在同一作用域（文件或 Component）内，锚点 ID 必须**唯一**。

**示例：使用锚点合流**
```ts
[Signal("EventA")]
  .Log("A happened")
  .Wait(1.0)
  >> "finish-logic"; // 跳转到 "finish-logic"

[Signal("EventB")]
  .Log("B happened")
  >> "finish-logic"; // 跳转到 "finish-logic"

// 定义 "finish-logic" 锚点
// 无论 A 或 B 发生，这里都会被执行
Branch["finish-logic"]
  .Log("Finished!");

```
<!-- ![5](./static/03/image-5.png) -->


**请注意, 合流可能引发额外的思维成本, 造成潜在的Bug. 如一颗执行树中的某个分支被意外执行多次**

### 4.5. `>> 0` (块内合流)

在 `>> {}`、`If()` 或 `Switch()` 块内部，`>> 0` 是一个特殊的跳转，意思是“**合并回主干流**”（即 `}` 或 `)` 之后连接的第一个节点）。
对于不执行操作直接转跳的行为, 通过 `0: 0`(直接合流) 或 `1: "branch-id"`(直接进入某分支) 表示.
```ts
[OnCreate()]
  .Log("Start")
  >> {
    0: Wait(1.0) >> 0, // 等待，然后跳转到 "Log("Both done")"
    1: Log("Branch 1") >> 0, // Log，然后跳转到 "Log("Both done")"
  }
    .Log("Both done?"); // <-- ">> 0" 的目标

// 预期执行顺序:
// 1. Log("Start")
// 2. Wait(1.0)
// 3. Log("Both done?")
// 4. Log("Branch 1")
// 5. Log("Both done?")
```
<!-- ![6](./static/03/image-6.png) -->


此外, 还可以使用  `>> null` (或不标记) , 意思是"执行完不转跳, **继续执行下一分支**". 
同样的, `>> "branch-id"`, 意思是执行完进入特定锚点.

**省略写法 (语法糖)：**
如果你想在任意位置分支出一个合流分支使用 `< Branch >` 连接:
* **代码**：`.FunA() < "Branch 1" > FunB()`
* **等价于**：`.FunA() >> { 0:0, 1: "Branch 1" }.FunB()`
* **含义**：在FunA执行后, **先执行 FunB** 上的分支, 完毕后, 再跳转到 Branch1 分支执行.


### 4.6. 条件逻辑 (If)

使用 `If(condition)( ... )` 来创建选择分支。
对于不执行操作直接转跳的行为, 通过 `true = 0`(直接合流) 或 `false = "branch-id"`(直接进入某分支) 表示.
```ts
[Signal("CheckValue")[val]]
  .If(val > 10)(
    true = Log("Value is large") >> 0, // 如果 true，执行并合流
    false = Log("Value is small") >> 0 // 如果 false，执行并合流
  )
  .Log("Check complete"); // <-- ">> 0" 的合流点

```
<!-- ![7](./static/03/image-7.png) -->


**省略写法 (语法糖)：**

如果你只想处理 `true` 分支并继续主干流，可以省略 `()`。
* **代码**：`.If(this.is_alive).Log("Still alive!")`
* **等价于**：`.If(this.is_alive)(true = 0, false = null).Log("Still alive!")`
* **含义**：如果 `is_alive` 为 true，执行 `Log()`；如果为 false，则停止该分支。

### 4.7. 多选逻辑 (Switch)

使用 `Switch(variable)( ... )` 来处理多个固定选项。

**规则**：
1.  分支键必须是**字面量**（例如 `"sword"`, `10`, `true`），不能是变量。
2.  使用 `null` 作为 `default`（默认）分支。

```ts
[Signal("Equip")[item_name]]
  .Switch(item_name)(
    "sword" = Log("Equipped sword.") >> 0,
    "shield" = Log("Equipped shield.") >> 0,
    "potion" = DrinkPotion() >> 0,
    null = Log("Unknown item!") >> 0 // 默认分支
  )
  .UpdatePlayerModel(); // 所有分支的合流点

```
<!-- ![8](./static/03/image-8.png) -->


### 4.8. 循环 (Loop)

使用 `.Loop(start, end, "ID")[i]( ... )` 来执行有限循环。`end` 是**包含**在内的。
* `"ID"` 是循环的唯一标识符，用于 `StopLoop()`。可以省略.
* `[i]` 是循环变量。
* `true` 分支：为每个 `i` (0, 1, 2...) 执行。
* `false` 分支：当循环*正常*结束后（`i > end`）执行一次。
```ts
[OnCreate()]
  .Loop(0, 2, "MyLoop")[i]( // 将运行 3 次 (i=0, i=1, i=2)

    // 循环体
    true = Log("Loop iteration: " + i.to<string>())
      .If(i == 1) // 假设我们想在 i=1 时停止
      .StopLoop("MyLoop"), // 注意：这不会立即跳出

    // 循环结束时
    false = Log("Loop finished") >> 0

  ).Log("Done with loop.");

```
<!-- ![9](./static/03/image-9.png) -->




**`StopLoop` 详解**：
`StopLoop("ID")` *不会*立即跳出。它只是标记循环在*当前迭代*结束后停止。`StopLoop` 之后的节点（在 `true` 块内）仍会继续执行。

### 4.9. 迭代 (ForEach)

与 Loop 循环类似, 但是循环变量 i 改为列表元素 item.
```ts
[OnSignal("Hit")[list]]
  .ForEach(list)[item]( // 将依次遍历实体列表
    // 循环体
    true = Log("Hit item: " + item.name)
      .Hit(item),
    // 循环结束时
    false = Log("Foreach finished") >> 0
  ).Log("Done with Hit.");

```
<!-- ![10](./static/03/image-10.png) -->


## 5\. 计算值：数据流 (Data Flow)

数据流决定了“要用什么*数据*”。

### 5.1. `$(...)` 语法

`$(...)` 是创建**运算节点**的唯一方式。它用于执行纯计算。
* **求值时机**：当控制流激活了它所依附的执行节点时，`$(...)` 才会被立即求值。

```ts
[OnCreate()]
  // 执行到这里不会直接调用
  .$(() => "Hello" + " " + "World!")[msg]
  // .Log() 被激活时，$(...) 才会被求值
  .Log(msg);

```
<!-- ![11](./static/03/image-11.png) -->




### 5.2. `function output` (获取变量)

节点可以输出变量，供后续节点使用。使用 `[my_var_name]` 语法来捕获输出。
```ts
[OnCreate()]
  .GetPlayer()[player_entity] // 1. GetPlayer() 输出 "player_entity"
  .GetName(player_entity)[player_name] // 2. GetName() 使用 "player_entity"
  .Log("Player name is: " + player_name);

```
<!-- ![12](./static/03/image-12.png) -->


### 5.3. `$(...)` 捕获列表 (重要！)

这是 `$(...)` 语法最关键的规则。

**规则**：你必须在 `$(...)` 的**第一个**括号（捕获列表）中，**明确列出**你将要使用的所有 `function output` 变量。

**例外**：`this.var`, `node.var` 和 `_temp_var` 变量**不**需要（也不允许）在捕获列表中声明，你可以直接在内部使用它们。
```ts
[OnCreate()]
  .FunA()[val_a]
  .FunB()[val_b]
  // --- 示例 ---
  // ✅ 正确: val_a 和 val_b 都在捕获列表中
  .$((val_a, val_b) => val_a + val_b + this.global_val)[sum]
  // ❌ 错误: val_b 在内部使用，但未在捕获列表 (val_a) 中声明
  .$((val_a) => val_a + val_b)[sum1] // 编译时会报错
  // ❌ 错误: this.global_val 是全局变量，不应放入捕获列表
  .$((val_a, this.global_val) => val_a + this.global_val)[sum2] // 编译时会报错

```
<!-- ![13](./static/03/image-13.png) -->


### 5.4. `$(...)` 多输出

如果你的计算需要返回多个值，`$(...)` 内部应返回一个对象，并在外部使用 `[a = key1, b = key2]` 的语法进行映射。
```ts
[OnCreate()]
  .GetPlayer()[player]
  .$((player) => {
    // 假设 player 是一个有 x 和 y 的向量
    return { my_x: player.x, my_y: player.y };
  })[x_pos = my_x, y_pos = my_y] // 映射：x_pos 得到 my_x 的值

  .Log("X: " + x_pos + ", Y: " + y_pos);

```
<!-- ![14](./static/03/image-14.png) -->


### 5.5. 依赖未执行分支的变量

如果你捕获了一个来自 `If` 分支的变量，但该分支*没有*被执行，会发生什么？

**规则**：**不会报错**。你将获取该变量类型的**默认值**（`0`, `false`, `""` 等）。
```ts
[OnCreate()]
  .If(false)( // 这个分支永远不会执行
    true = FunA()[my_var],
    false = null
  )
  // my_var 仍然在捕获列表中声明
  // 此时，my_var 的值是 0 (假设它是 int 类型)
  .$((my_var) => my_var + 10)[result]
  .Log(result); // 将打印 "10"

```
<!-- ![15](./static/03/image-15.png) -->


### 5.6. 计算路径

每一个计算节点都可以有捕获和输出, 如果一个计算节点包含捕获, 那么当它被调用时, 会先就算捕获值的来源.
* **节点系统函数**: 如果捕获值的来源是系统函数, 那么会获取它**最新一次**输出值作为传入参数(未被计算的取默认值).
* **节点系统函数**: 如果捕获值的来源是复合节点(Component 函数), 那么会进入复合函数, 寻找这个输出参量的来源.
  * 如果来源是执行节点或复合节点或运算节点, 则重复上述操作
  * 如果来源追溯到复合节点的**输入参量**, 则会离开复合节点, 从调用点的传入参数继续向上追溯. 并重复上述操作直到达到**系统函数**或无捕获参数.

## 6\. 管理状态：变量命名空间

你有四种不同生命周期的变量可以使用：
<!-- ![t0](./static/03/table-0.png) -->
| 类型 | 声明方式 | 生命期 | 如何修改 | 捕获列表？ |
| :--- | :--- | :--- | :--- | :--- |
| **函数输出** | `.Fun()[a]` | 单次执行树 | **只读** | **必须捕获** |
| **临时变量** | `const _x` | 单次执行树 | `.SetVal(_x, ...)` | **不可捕获** (直接用) |
| **节点图变量**| `declare class node` | 持久 (实体的节点图) | `.SetVal(node.x, ...)` | **不可捕获** (直接用) |
| **全局变量** | `declare class This` | 持久 (实体) | `.SetVal(this.x, ...)` | **不可捕获** (直接用) |

**示例：使用 `SetVal` 和临时变量**
```ts
// 声明一个临时计数器
const _hit_damage: int = 100;
// 每次触发时 _hit_damage 又会被初始化为 100
[Signal("PlayerHit")[reaction_rate]]
  // 1. 读取 reaction_rate 并执行计算
  .$((reaction_rate) => _hit_damage * calc_intensity(reaction_rate))[damage]
  // 2. 将新值写入 _hit_damage
  .SetVal(_hit_damage, damage)
  // 3. 将新值写入持久化的 this.total_hits
  // 这里的调用不会触发计算
  .SetVal(this.total_hits, this.total_hits + _hit_damage)
  .Log("Hit: " + _hit_damage.to<string>());

```
<!-- ![16](./static/03/image-16.png) -->


## 7\. 复用逻辑：组件 (Components)

组件是可复用的子图。有两种类型：

### 7.1. 控制流组件 (首字母大写)

这些是包含执行节点的完整子图，可以有自己的入口和出口。

**定义 (Define):**
```ts
// 定义一个组件，它只有默认出口
function GetValue(val: int) {
  [] // 默认入口
    .$((val) => val + 10)[sum]
    .Out() // 默认出口
    .Log("Runs Before Out()!")

  // 声明该组件的返回值
  return [sum as int];
}

// 定义一个组件，它有两个出口："large" 和 "small"
function CheckValue(val: int) {
  [] // 默认入口
    .If(val > 10)(
      true = Log(val.to<string>()).Out("large"), // 触发 "large" 出口
      false = Out("small") // 触发 "small" 出口
    );

  // 声明该组件的出口
  return []("large", "small");
}
```
![17](./static/03/image-17.png)
如果有多个入口, 通过在函数中使用多个 `[]` 并添加分支名表示入口 `[InBranchId]`, 调用时通过 `MyFun<InBranchId, "NodeTag">(args)[outs]` 调用, 其中的 NodeTag 相同则对应同一个节点. (默认入口 `[]` 对应 `0` 分支).


***`出口` 执行顺序 (深度优先)***：
当 `Out(id)` 被触发时，控制流会先运行**后面**的代码, 出口的优先级是**最低**的，执行完毕后面的代码后，再触发触发`Out()` 外部的节点(类似 `FunX() < Out() > FunY()` 的顺序)。
就算是并列分支, 在节点编辑器中, Out 也是最后执行的, 就算你用 `FunX().{0: Out(), 1: 0}.FunY()` 试图让 Out() 先于 FunY() 执行, 运行时也是 Out() 在 FunY() 执行后触发. 
同样的, **Out() 是在 FunX() 分支内**的, 如果与 FunX() 有一个并列的 FunZ() 且执行顺序在 FunX() 之后, 那么 Out() 也会先于 FunZ() 触发.

**使用 (Use):**
```ts
[Signal("TestValue")[my_val]]
  // 调用组件，并获取输出值
  .GetValue(my_val)(5)[new_val = sum]
  // 调用多分支组件，并为它的出口连接后续逻辑
  .CheckValue(new_val)(
    "large" = Log("Value was large!"),
    "small" = Log("Value was small.")
  );

// 因此, 示例中的执行结果为
// 1. GetValue(5)
// 2. Log("Runs Before Out()!")
// 3. Out(0)[sum = 15]
// 4. CheckValue(15)
// 5. Log("15")
// 6. Out("large")
// 7. Log("Value was large!")

```
![18](./static/03/image-18.png)




### 7.2. 纯运算函数 (首字母小写)

这些是纯粹的数据计算函数，只能在 `$(...)` 内部或节点参数中调用。

**定义 (Define):**
```ts
const add = (a: int, b: int): int => {
  return a + b;
};

const get_stats = (a: int): { x: int, y: int } => {
  return { x: a * 2, y: a + 1 };
}

```
<!-- ![19](./static/03/image-19.png) -->


**使用 (Use):**
```ts
[OnCreate()]
  .FunA()[val_a, val_b]

  // 只能在 $(...) 内部调用
  .$((val_a, val_b) => {
    const sum = add(val_a, val_b);
    const { x, y } = get_stats(sum);
    return x + y;
  })[result]
  .Log(result)

  // 或作为函数参数
  .FunB(add(1, 2), get_stats(3).x);
```
<!-- ![20](./static/03/image-20.png) -->


## 8\. 类型声明

最后提供全部可能遇到的类型, 并给出一致的名称使用定义
<!-- ![t1](./static/03/table-1.png) -->
| 类型 | 声明方式 |
| :--- | :--- |
|整数|int|
|浮点数|float|
|布尔|boolean|
|字符串|string|
|三维向量|vec|
|列表|List\<K>|
|字典|Dict<K, V>|
|GUID|GUID|
|实体|Entity|
|元件 ID|Prefab|
|配置 ID|Config|
|阵营|Faction|

---


对于更多详细内容, 可以等我把**节点图DSL设计规范文件**整理好发出来以深入了解.