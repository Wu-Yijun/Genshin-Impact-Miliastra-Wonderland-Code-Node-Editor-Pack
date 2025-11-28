// @ts-nocheck
import "../utils/def.d.ts";

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
}

Timer.five_second;