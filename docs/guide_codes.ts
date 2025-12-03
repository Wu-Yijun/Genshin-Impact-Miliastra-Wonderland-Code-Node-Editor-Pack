import "../src/test/def.d.ts"

declare global {
  namespace Self {
    const a: int;
    const b: float;
  }
  namespace Timer {
    const c: CountDown<10>;
    const d: Count<1234>;
  }
  namespace Signal {
    function e(val: str): Signal;
  }
}
declare namespace node {
  export const x = 1;
  const y = 1;
}
const _local_x = 1;



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



// @ts-nocheck
import "./def.d.ts"; // 导入系统类型和方法定义

// 1. 导入
// 从其他文件导入可复用的组件或纯函数
import { MyReusableComponent, my_calc_func } from "./shared_components.ts";
import "../src/test/test_def.ts"

// 全局声明和定义 (全部文件可用)
declare global {

  // 2. 定义自定义数据结构
  interface PlayerData {
    id: int;
    name: string;
  }

  // 3. 声明全局可发送和接收的信号
  namespace Signal {
    // function PlayerHit(damage: int): Signal; // 信号函数需以 `Signal` 为返回值
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

// ----- 逻辑开始 -----
[OnCreate()].Log(Self.player_name).Log(m.str(node.exposed_x));

// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!");

// 全局计时器 "five_second" 触发时
[Timer(Timer.five_second)]
  .Log("Five seconds have passed.");

// 收到 "PlayerHit" 信号时触发，并将信号的 "damage" 参数
// 赋值给一个名为 "dmg_val" 的新变量
[Signal(Signal.PlayerHit)[dmg_val]]
  .Log("Ouch! Took " + m.str(dmg_val));

// 游戏对象创建时触发
[OnDeath()[cause]]
  .Log("I'm dead! Because of " + m.str(cause));


[OnCreate()]
  .Log("Step 1")
  .DoSomething()
  .Log("Step 2")
  .Teleport(Self.self, m.vec(10, 0, 0));


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


// 定义 "finish-logic" 锚点
// 无论 EventA 或 EventA 发生, 这里都会被执行
Branch["Merge Branch"]
  .Log("Finished!");

[Signal(Signal.EventA)]
  .Log("A happened")
  .DoSomething()
  >> "Merge Branch"(); // 跳转到 "Merge Branch"

[Signal(Signal.EventB)]
  .Log("B happened")
  >> "Merge Branch"(); // 跳转到 "Merge Branch"



declare function DoSomething(): ExecFun<{}>;

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


[Signal(Signal.CompareVal)[val]]
  .If(val > 10)(
    true = Log("Value is large") >> 0(), // 如果 true, 执行并合流
    false = Log("Value is small") >> 0() // 如果 false, 执行并合流
  )
  .Log("Check complete"); // <-- ">> 0()" 的合流点


[Signal(Signal.Equip)[item_name]]
  .Switch(item_name)(
    "sword" = Log("Equipped sword.") >> 0(),
    "shield" = Log("Equipped shield.") >> 0(),
    "potion" = DrinkPotion() >> 0(),
    null = Log("Unknown item!") >> 0() // 默认分支
  )
  .UpdatePlayerModel(); // 所有分支的合流点

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


[Signal(Signal.Hit)[list]]
  .ForEach(list)[item]( // 将依次遍历实体列表
    // 循环体
    true = Log("Hit item: " + item.name).Hit(item),
    // 循环结束时
    false = Log("Foreach finished") >> 0()
  ).Log("Done with Hit.");

[OnCreate()]
  // 执行到这里不会直接调用
  .$(() => "Hello" + " " + "World!")[msg]
  // .Log() 被激活时, $(...) 才会被求值
  .Log(msg);


[OnCreate()]
  .GetPlayer()[player_entity] // 1. GetPlayer() 输出 "player_entity"
  .GetName(player_entity)[player_name] // 2. GetName() 使用 "player_entity"
  .Log("Player name is: " + player_name);



[OnCreate()]
  .DoSomething()[val_a]
  .FunB()[val_b]
  // --- 示例 ---
  // ✅ 正确: val_a 和 val_b 都在捕获列表中
  .$((val_a, val_b) => val_a + val_b + Self.global_val)[sum]
  // ❌ 错误: val_b 在内部使用, 但未在捕获列表 (val_a) 中声明
  .$((val_a) => val_a + val_b)[sum1] // 编译时会报错
  // ❌ 错误: this.global_val 是全局变量, 不应放入捕获列表
  .$((val_a, Self.global_val) => val_a + Self.global_val)[sum2] // 编译时会报错


[OnCreate()]
  .If(false)(
    true = DoSomething()[my_var], // 这个分支永远不会执行
    false = 0(),
  )
  // my_var 仍然在捕获列表中声明
  // 此时, my_var 的值是 0 (假设它是 int 类型)
  .$((my_var) => my_var + 10)[result]
  .Log(result); // 将打印 "10"


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
  return ExecFun<{}>("", "");
}


[Signal(Signal.TestValue)[my_val]]
  // 调用组件, 并获取输出值
  .GetValue(my_val)[new_val = sum]
  // 调用多分支组件, 并为它的出口连接后续逻辑
  .CheckValue(new_val)(
    "large" = Log("Value was large!"),
    "small" = Log("Value was small.")
  );

// 示例中的执行结果为
// 1. GetValue(5)
// 2. Log("Runs Before Out()!")
// 3. Out(0)[sum = 15]
// 4. CheckValue(15)
// 5. Log("15")
// 6. Out("large")
// 7. Log("Value was large!")






// function In(x: 0): ExecFun<{}>;
// function In(x: string): ExecFun<{}>;
// function Out(x: 0): ExecFun<{}>;
// function Out(x: string): ExecFun<{}>;
// /** A Shared Function Instance, call it with branch tag and function args */
// type SharedFun<Args extends SysAllTypes[], T extends { [key: string]: SysAllTypes }> = (in_port: string | 0, ...args: Args) => ExecFun<T>;
// type SharedFunPort<Args extends SysAllTypes[], T extends { [key: string]: SysAllTypes }> = (...args: Args) => ExecFun<T>;
// /** Create a shared function instance, can be called from multiple places */
// function Shared<Args extends SysAllTypes[], T extends { [key: string]: SysAllTypes }>(exec_func: (...args: Args) => ExecFun<T>): SharedFun<Args, T>;
// function Shared<Args extends SysAllTypes[], T extends { [key: string]: SysAllTypes }>(exec_func: (...args: Args) => ExecFun<T>, port_id: string | 0): SharedFunPort<Args, T>;
// /** Select InBranch of a given ExecFunc */
// function Selector<Args extends SysAllTypes[], T extends { [key: string]: SysAllTypes }>(exec_func: (...args: Args) => ExecFun<T>, in_branch_id: string | 0, ...args: Args): ExecFun<T>;

// declare function Test(val: int): ExecFun<{}>;
// declare function Test(val: int, x: float): ExecFun<{}>;
// declare function Test(val: bigint, x: float, z: bool): ExecFun<{}>;
// declare function Test(val: float, x: string): ExecFun<{}>;



// @ts-nocheck
import "./src/test/def.d.ts" // 导入配置

declare global {
  // 声明实体自身变量
  namespace Self {
    const hp: float = 100;
  }
  // 声明信号
  namespace Signal {
    function PlayerHit(damage: int): Signal; // 通过返回 Signal 标记为信号
  }
}
// 声明节点图变量
declare namespace node {
  // export 表示暴露此变量
  export const critical: float = 1.5;
}

// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!")
  .SetVal(Self.hp, 10000);

// 收到 "PlayerHit" 信号时触发，并将信号的参数赋值给一个名为 "dmg" 的变量
[Signal(Signal.PlayerHit)[dmg]]
  .$((dmg) => dmg * node.critical)[real_dmg]
  .SetVal(Self.hp, Self.hp - real_dmg)
  .If(Self.hp <= 0)(
    true = Log("You died"),
    false = Log("Ouch! Took " + m.str(real_dmg)),
  );

