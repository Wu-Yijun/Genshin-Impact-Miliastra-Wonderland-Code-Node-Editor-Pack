// @ts-nocheck
GetPlayer()[player, num = index as int, time as float]
  >> {
    0: Log("Branch 0: Runs first"),
    1: Wait(1.0)
      .Log("Branch 1: Runs second (after 1s)"),
    2: Log("Branch 2: Runs third"),
  }.Log("Will Not Reach")
  .If(xpos == -10)(
    true = Log("big") >> 0,
    false = Log("small") >> 0
  )
  .Log("done")
  .Log("Ouch! Took " + m.str(dmg_val))
  .MoveTo(X = 10 + calc(y, z ** 2) as int, 0 as int, z = 0)
  .Log("A happened")
  .Wait(1.0)
  >> "finish-logic" >> false
  >> FunX() < 1 >> FunW()
  > FunX() < 1 >> {
    0: FunY().$((a:int)=>a+b)[c = res as int].FunZ() >> null,
    1: 2,
    2: $(()=>1)
  }.FunW()
  .Branch[14].Fun() < 14 >> null
  .Loop(0, 2, "MyLoop")[i]( // 将运行 3 次 (i=0, i=1, i=2)
    // 循环体
    true = Log("Loop iteration: " + m.str(i))
      .If(i == 1) // 假设我们想在 i=1 时停止
      .StopLoop("MyLoop"), // 注意：这不会立即跳出
    // 循环结束时
    false = Log("Loop finished") >> 0
  ).Log("Done with loop.")
  .ForEach(list)[item]( // 将依次遍历实体列表
    // 循环体
    true = Log("Hit item: " + item.name)
      .Hit(item),
    // 循环结束时
    false = Log("Foreach finished") >> 0
  ).Log("Done with Hit.");
