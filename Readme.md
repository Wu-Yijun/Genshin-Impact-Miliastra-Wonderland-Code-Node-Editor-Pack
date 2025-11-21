# 千星奇域节点图本地编辑器, 网页节点编辑器, 转换器
# A Local Code Editor, Web Node Editor, Convertor for Genshin Impact Miliastra Wonderland

本来是进度缓慢的, 因为我需要要多线并行: 
- [x] **(完成主要部分)** GIA 文件逆向 
- [ ] **(未动工)** 节点编辑器图形界面
- [x] **(基本完成)** 节点图的等效代码表示(DSL)
- [x] **(完成一小半)** DSL$\rArr$IR编译器
- [x] **(刚开始)** IR本地运行器
- [ ] **(未动工)** DSL$\rArr$GIA转换器
- [ ] **(未动工)** GIA$\rArr$DSL转换器
- [x] **(完成一大半)** 写一个~~没营养~~的 DSL 示例, 并在千星奇域中手动实现.

但今天搜索 Github, 无意中发现 [Columbina-Dev](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) 已经做好了 **节点编辑器**, 可以简单体验的[网页版](https://miliastra.columbina.dev/). 这一下子就*给我动力*了, 我准备把简单的DSL$\rArr$JSON转换器先给它实现了. 稍微增强下开源生态......

## 本项目提供的工具.
这个项目是我整理的我上述项目中的已经成型的文件, 用于补全开源开发生态.
- GIA 文件(节点图导出文件)解析:
  - [utils/gia.proto](./utils/gia.proto): Protobuf 定义文件(我推测的, 包含大部分结构, 除了结构体的扩展)
  - [utils/bindec.py](./utils/bindec.py): 解码 GIA 文件到原始的 protobuf message 结构
  - [utils/gia.py](./utils/gia.py): 解码 GIA 文件到可读文本格式, 编码文本到 GIA 文件.
- 服务器节点图节点ID检索: [utils/server_node_id.yaml](./utils/server_node_id.yaml): 我手动导出并对应的, 算术节点基本保证覆盖全了, 但是操作节点没有考虑全部的泛类的情况.
  - 客户端节点我发现 id 不一样, 没心情弄了.
  - [utils/enum_id.yaml](./utils/enum_id.yaml)
  未完成, 枚举对应的字段.
- [docs/UserGuide.md](./docs/UserGuide.md) 代码使用手册
- [utils/def.d.ts](./utils/def.d.ts) 代码结构定义文件
- [src/index.ts](./src/index.ts) 编译器和转换器(完成一半)
- [src/sysTypes.ts](./src/sysTypes.ts) **运行时**系统类型定义
- [src/test/def.d.ts](./src/test/def.d.ts) 本地编写代码时的**类型定义和函数补全**


## Getting Started

**详细的代码说明见下:** [## Usages](#usages)

目前只有简单的 block parser, 使用如下:
```shell
node ./src/test/parser.ts
```

## 节点图等效代码表示.

随之这两周不断修修补补, 我对节点图的了解更加深入, 并在实际例子中尝试了多种方法让代码编写更加顺畅, 最终得到了如下的规范:

- [使用手册](./docs/UserGuide.md): 简单的示例告诉你如何使用这个基于 Typescript 的语言, 让你顺利写出可以被编译运行的代码.
- [语言设计手册](./docs/SystemDesign.md): 更详细的语言和设计理念的介绍.

编写出的代码会长成这个样子:
```ts
// @ts-nocheck
import "./docs/def.d.ts" // 导入配置

declare global{
  // 声明实体自身变量
  namespace self{
    let hp: float = 100;
  }
  // 声明节点图变量
  namespace node{
    // var 表示暴露此变量
    var critical: float = 1.5;
  }
}

// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!")
  .SetVal(self.hp, 10000);

// 收到 "PlayerHit" 信号时触发，并将信号的参数赋值给一个名为 "dmg" 的变量
[Signal("PlayerHit")[dmg]]
  .$((dmg) => dmg_val * node.critical)[real_dmg]
  .SetVal(self.hp, (real_dmg) => self.hp - real_dmg)
  .If(self.hp <= 0)(
    true = Log("You died"),
    false = Log((real_dmg) => "Ouch! Took " + m.str(real_dmg)),
  );
```

## GIA 文件结构
[script-1024/genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format/blob/main/docs/zh/%E6%A6%82%E8%BF%B0.md) 说的更好, 于是我就直接改写来了:

无论是 `.gip`(Project), `.gil`(Level), `.gia`(Assets), 还是 `.gir`(Runtime) 文件，它们都拥有类似的结构：
```cs
// (开始)
[文件大小: 4 字节]
[版本编号: 4 字节]
[头部标记: 4 字节]
[文件类型: 4 字节]
[内容长度: 4 字节]

(内容负载：ProtoBuf)

[尾部标记: 4 字节]
// (结束)
```

这些字段以大端序保存, 它们的含义和用途:

| 字段名称 | 偏移地址 | 长度 | 值 | 描述与说明 | ~~译者~~(我的)注 |
|---------|----------|------|------|------------| - |
| 文件大小 | `0x00` | 4 字节 | $size - 4$ | 文件真实大小减去 4 字节（不包含尾部标记） |
| 版本编号 | `0x04` | 4 字节 | `00 00 00 01` | 可修改但建议保持官方值 | *我本以为是主版本号, 看来猜错了?* |
| 头部标记 | `0x08` | 4 字节 | `00 00 03 26` | **严格校验，不可修改** | *我本以为是次版本号, 但它不是向下兼容的?* |
| 文件类型 | `0x0C` | 4 字节 | • GIP = `00 00 00 01`<br>• GIL = `00 00 00 02`<br>• GIA = `00 00 00 03`<br>• GIR = `00 00 00 04` | 枚举值 |
| 内容长度 | `0x10` | 4 字节 | $protobufSize$ | 文件真实大小减去 24 字节（不含头部 20 字节和尾部 4 字节） |  |
| 内容负载 | `0x14` | 可变 | PROTOBUF 编码 | ProtoBuf 编码数据 | 具体编码规则见 [utils/gia.proto](./utils/gia.proto) |
| 尾部标记 | 文件大小字段值 | 4 字节 | `00 00 06 79` | **严格校验，不可修改** | 头部标记 + 尾部标记 = `0x099F` 可能有什么特殊含义? |

## Usages

目前只有简单的 block parser, 样例如下:
```shell
node ./src/test/parser.ts
```


