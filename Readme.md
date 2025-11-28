# 千星奇域节点图本地编辑器, 网页节点编辑器, 转换器
# A Local Code Editor, Web Node Editor, Convertor for Genshin Impact Miliastra Wonderland

本项目是我的多个千星奇域工具项目的汇总与整合，旨在补全开源开发生态，提供从底层文件解析到上层代码编写的全套解决方案。

## 核心功能 (Core Features)

本项目功能复杂多样，主要包含以下核心模块：

### 1. 强大的 DSL 代码编写体验
提供了一套基于 TypeScript 的领域特定语言 (DSL)，让你能以写代码的方式构建节点图。
*   [**自动类型生成 (`utils/gen_def.ts`)**](./utils/gen_def.ts): 这是 DSL 的核心引擎。它读取结构化的函数定义，自动生成包含完整类型声明的 `def.d.ts` 文件。这意味着你在编写节点图代码时，可以享受到 **IDE 的智能补全、类型检查和文档提示**。
*   [**结构化函数定义 (`utils/functions`)**](./utils/functions/readme.md): 所有的算术节点和查询节点都通过统一的格式进行定义，支持重载、泛型和参数校验。

### 2.0. GIA 文件快速读写 (进行中, 目前仅支持节点)
在 `./utils/gia_gen/graph.ts` 中(或通过 `./utils/gia_gen/index.ts` 导入), 快速创建Graph类, 可导出为 gia 文件结构. 更多信息参见 [utils/gia_gen/readme.md](./utils/gia_gen/readme.md#graph)

### 2. GIA 文件深度解析与工程化
完全掌握 `.gia` (Genshin Impact Assets) 文件的读写与转换。
*   [**Protobuf 定义 (`utils/protobuf/gia.proto`)**](./utils/protobuf/gia.proto): 包含较完整的 `gia.proto` 定义文件。
*   [**编解码工具 (`utils/protobuf/decode.ts`)**](./utils/protobuf/decode.ts): 提供 TypeScript 工具 (`decode.ts`) 将 GIA 文件解码为易于操作的 JSON/对象结构，或将对象重新编码为游戏可读取的 GIA 文件。
*   [**图生成工具 (`utils/gia_gen`)**](./utils/gia_gen/readme.md): 提供便捷的 API (`gia_gen`) 快速构建和修改节点图结构，简化了复杂的 Protobuf 对象创建过程。

### 3. 完备的节点与枚举数据
整理并校验了游戏中的各类 ID 映射，确保转换的准确性。
*   [**Node ID 映射 (`utils/node_data/server_node_id.yaml`)**](./utils/node_data/server_node_id.yaml): 可读的服务器节点基类 ID (Server Node ID) 的完整对照表。 在 [utils/node_data/server.yaml](./utils/node_data/server.yaml) 保存了完整的扩展类-基类-反射类型-名称的清单.
*   [**枚举标准化 (`utils/node_data/enum_id.yaml`)**](./utils/node_data/enum_id.yaml): 自动生成标准化的枚举定义 (`enum_id.yaml`)，并提供工具生成测试用例以在游戏中验证枚举的有效性。

### 4. 在线节点编辑器功能
*   *(外部库)* [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor): 图形化操作界面, 模拟游戏内节点编辑器行为, 将来会补充完整的导入导出和转化功能.

---

## 模块详情 (Module Documentation)

更多细节功能请查阅各子模块的 README 文档：

*   **[DSL 函数定义与生成工具](./utils/functions/readme.md)**: 了解 DSL 类型系统是如何构建的，以及如何添加新的节点定义。
*   **[GIA 文件格式与 Protobuf 工具](./utils/protobuf/readme.md)**: 深入了解文件结构，学习如何使用脚本读写 GIA 文件。
*   **[节点 ID 与枚举定义](./utils/node_data/readme.md)**: 查看节点 ID 列表和枚举值的详细映射关系。
*   **[GIA 图生成器](./utils/gia_gen/readme.md)**: 了解如何使用 Helper 函数快速生成和操作 GIA 节点图。


> 如果您有任何建议或想法, 或发现什么有意思的, 或任何可能有帮助的库, 请随意提交 Issue 或发 [Email](mailto:wuyijun21@mails.ucas.ac.cn) 告诉我


## 开发进度 (Project Status)

半个月前是进展缓慢的, 因为我需要要多线并行: 
- [x] **(完成主要部分)** GIA 文件逆向 
- [x] **(未动工)** 节点编辑器图形界面, 有现成的
- [x] **(基本完成)** 节点图的等效代码表示(DSL)
- [x] **(完成一小半)** DSL ⇒ IR编译器
- [x] **(刚开始)** IR本地运行器
- [ ] **(进行中)** IR ⇒ GIA转换器
- [ ] **(进行中)** GIA ⇒ IR转换器
- [x] **(完成一大半)** 写一个~~没营养~~的 DSL 示例, 并在千星奇域中手动实现.

但11月20号搜索 Github, 无意中发现 [Columbina-Dev](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) 已经做好了**节点编辑器**的[网页版](https://miliastra.columbina.dev/). 这一下子就*给我动力*了, 我准备把简单的DSL ⇒ JSON转换器先给它实现了. 稍微增强下开源生态......

## Getting Started

**详细的代码说明见下:** [## DSL Usages](#dsl-usages)

目前只有简单的 block parser, 使用如下:
```shell
node ./src/test/parser.ts
```

## 节点图等效代码表示.

随之这两周不断修修补补, 我对节点图的了解更加深入, 并在实际例子中尝试了多种方法让代码编写更加顺畅, 最终得到了如下的规范:

- [使用手册](./docs/UserGuide.md): 丰富的示例教你你如何使用这个基于 Typescript 的语言扩展, 让你顺利写出可以被编译运行的代码.
- [语言设计手册](./docs/SystemDesign.md): 更详细的语言和设计理念的介绍.

编写出的代码会长成这个样子:
```ts
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
```

## GIA 文件结构
文件头部分 [script-1024/genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format/blob/main/docs/zh/%E6%A6%82%E8%BF%B0.md) 写的比我之前的详细, 于是我就参考它的改写了:

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

| 字段名称 | 偏移地址 | 值 | 描述与说明 | ~~译者~~(我的)注 |
|---------|----------|------|------|------------|
| 文件大小 | `0x00` | $size - 4$ | 文件大小减 4 字节 (不包含尾部标记) |
| 版本编号 | `0x04` | `00 00 00 01` | 可修改, 但建议保持官方值 | *我本以为是主版本号, 看来猜错了?* |
| 头部标记 | `0x08` | `00 00 03 26` | **严格校验，不可修改** | *我本以为是次版本号, 但它不是向下兼容的?* |
| 文件类型 | `0x0C` | •GIP:`00 00 00 01`<br>•GIL:`00 00 00 02`<br>•GIA:`00 00 00 03`<br>•GIR:`00 00 00 04` | 枚举值 |
| 内容长度 | `0x10` | `Size_of_Protobuf` | 文件大小减 24 字节 (不含头部 20 字节和尾部 4 字节) |  |
| 内容负载 | `0x14` | Protobuf二进制编码 | ProtoBuf 编码数据 | 具体编码规则见 [gia.proto](./utils/protobuf/gia.proto) |
| 尾部标记 | 文件大小字段值 | `00 00 06 79` | **严格校验，不可修改** | 头部标记 + 尾部标记 = `0x099F` 可能有什么特殊含义? |

**内部的 Protobuf 编码参见** 我写的 [utils/protobuf/gia.proto](./utils/protobuf/gia.proto), 这其中包含了主要的结构定义. 同时在 [utils/protobuf/](./utils/protobuf/) 和 [utils/gia_gen/](./utils/gia_gen/) 目录下也有一些编码解码组件.

## DSL-Usages

目前只有简单的 block parser, 样例如下:
```shell
node ./src/test/parser.ts
```
