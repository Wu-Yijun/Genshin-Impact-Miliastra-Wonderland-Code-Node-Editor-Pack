# 千星奇域节点图工具集

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**原神千星奇域节点图开发的综合工具集**

*从底层文件解析到上层代码编写的全套解决方案*

[快速开始](#快速开始) · [核心功能](#核心功能) · [文档](#模块文档) · [开发进度](#开发进度)

</div>

---

## ✨ 特性亮点

- 🔧 **GIA 文件读写** — 使用 TypeScript 编程式读写 `.gia` 节点图文件
- 📝 **DSL 代码语言** — 以代码形式描述节点图，享受 IDE 智能补全和语法高亮
- 🔄 **双向转换器** — DSL ⇔ IR ⇔ GIA 完整编译/反编译工具链
- 📊 **完备节点数据** — 程序化整理的节点 ID、枚举值、引脚定义
- 🧩 **高层 API** — `Graph` 类封装，轻松构建和修改节点图
- 🎯 **类型安全** — 全面的 TypeScript 类型定义和编译时检查

---

## 核心功能

### 1. GIA 文件读写

使用 TypeScript 编程式读写 `.gia` 文件，支持完整的编解码和图操作。

```typescript
import { decode_gia_file, encode_gia_file, Graph, NODE_ID } from "./utils";

// 读取现有文件
const data = decode_gia_file("./input.gia");
const graph = Graph.decode(data);

// 或创建新图
const newGraph = new Graph("server");
const trigger = newGraph.add_node(NODE_ID.When_Entity_Is_Created);
const log = newGraph.add_node(NODE_ID.Log_Message);

// 连接节点
newGraph.flow(trigger, log);
log.setVal(0, "Hello World!");

// 自动布局并保存
newGraph.autoLayout();
encode_gia_file("./output.gia", newGraph.encode());
```

📖 详情：[GIA 生成器](./utils/gia_gen/readme.md) | [Protobuf 工具](./utils/protobuf/readme.md)

### 2. DSL 代码编写

使用基于 TypeScript 的领域特定语言 (DSL) 以代码方式描述节点图逻辑，享受 IDE 智能补全、语法高亮和版本控制优势。

```typescript
// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!")
  .SetVal(Self.hp, 10000);

// 收到信号时触发
[Signal(Signal.PlayerHit)[dmg]]
  .$((dmg) => dmg * node.critical)[real_dmg]
  .SetVal(Self.hp, Self.hp - real_dmg)
  .If(Self.hp <= 0)(
    true = Log("You died"),
    false = Log("Ouch!")
  );

// 循环与分支
[Timer(Timer.countdown)]
  .Loop(0n, 9n, "spawn")[i](
    true = SpawnEnemy(i),
    false = Log("All spawned") >> 0()
  ).Log("Loop complete");
```

📖 详情：[DSL 使用手册](./docs/UserGuide.md) | [语言设计](./docs/SystemDesign.md) | [函数定义](./utils/functions/readme.md)

### 3. 解析器与转换器

完整的编译/反编译工具链，支持 DSL 文本、中间表示 (IR) 和 GIA 节点图之间的相互转换。

```typescript
import { createParserState, parse, decompile } from "./src/parser";
import { giaIrConvertor } from "./src/convertor";

// DSL → IR
const state = createParserState(sourceCode);
const ir = parse(state);

// IR → DSL
const code = decompile(ir);

// GIA → IR
const irModule = giaIrConvertor(giaGraph, true);
```

```
┌─────────┐      parse       ┌──────┐     giaIrConvertor    ┌─────────┐
│   DSL   │ ───────────────► │  IR  │ ◄──────────────────── │   GIA   │
│  Code   │ ◄─────────────── │  AST │ ────────────────────► │  Graph  │
└─────────┘     decompile    └──────┘     (工作中)          └─────────┘
```

📖 详情：[解析器](./src/parser/readme.md) | [转换器](./src/convertor/readme.md) | [IR 类型](./src/types/readme.md)

### 4. 完备的节点数据

程序化整理的服务器和客户端节点数据，包含完整的 ID 映射、枚举定义和引脚信息。

```typescript
import { NODE_ID, ENUM_ID, ENUM_VALUE, get_node_record } from "./utils/node_data";

// 查询节点信息
const id = NODE_ID.Add_Float;
const record = get_node_record(id);
console.log(record?.name, record?.inputs, record?.outputs);

// 使用枚举
const compOp = ENUM_VALUE.ComparisonOperators_EqualTo;
```

| 数据类型 | 说明 | 格式 |
| :--- | :--- | :--- |
| 节点 ID | 770+ 个节点的名称和 ID | TypeScript |
| 枚举定义 | 60+ 个枚举类型和值 | TypeScript |
| 引脚记录 | 所有节点的输入/输出引脚定义 | TypeScript |
| 类型映射 | 泛型节点的类型索引表 | TypeScript |
| 综合数据 | 上述数据的结构化汇总 | YAML / JSON |

📖 详情：[节点数据](./utils/node_data/readme.md)

---

## 项目结构

```
.
├── src/                          # 核心源代码
│   ├── convertor/                # GIA ⇔ IR 转换器
│   │   ├── gia_ir.ts             #     转换入口
│   │   ├── gia_ir_raw.ts         #     原始 IR 构建器
│   │   └── graph_chain_split.ts  #  图结构分析算法
│   ├── parser/                 # DSL 解析器
│   │   ├── tokenizer.ts        #     词法分析
│   │   ├── parser.ts           #     语法分析
│   │   ├── decompiler.ts       #     IR → DSL 反编译
│   │   └── parse_*.ts          #     子解析器
│   └── types/                  # IR 类型定义
│       ├── IR*.ts              #     IR 节点类型
│       ├── types.ts            #     基础类型
│       └── consts.ts           #     常量定义
│ 
├── utils/                      # 工具库
│   ├── gia_gen/                # GIA 图生成器
│   │   ├── graph.ts            #     Graph 类 (推荐)
│   │   ├── basic.ts            #     基础组件生成
│   │   ├── nodes.ts            #     节点生成器
│   │   ├── auto_layout.ts      #     自动布局算法
│   │   └── ......              #     其他组件
│   ├── node_data/              # 节点静态数据
│   │   ├── node_id.ts          #     节点 ID 映射
│   │   ├── enum_id.ts          #     枚举定义
│   │   ├── data.ts             #     全部数据信息
│   │   ├── helpers.ts          #     查询辅助函数
│   │   └── ......              #     其他静态定义
│   ├── protobuf/               # Protobuf 工具
│   │   ├── gia.proto           #     Protobuf 结构定义
│   │   ├── decode.ts           #     TypeScript 编解码 (规范结构)
│   │   ├── decode.py           #     Python 编解码 (可显示未知字段)
│   │   └── gia.proto.ts        #     自动生成的类型
│   ├── functions/              # DSL 函数定义
│   │   ├── math.ts             #     函数定义列表
│   │   └── function_defs.ts    #     类型系统和解析器
│   └── gen_def.ts              # DSL 类型定义生成器
│
├── docs/                       # 用户文档
│   ├── UserGuide.md            # DSL 使用手册
│   ├── SystemDesign.md         # 语言设计文档
│   └── dsl.enbf                # DSL 语法规范
│
├── test.CI/                    # CI 测试用例 (github actions运行)
└── static/                     # 图片资源 (Readme.md显示)
```

---

## 快速开始

### 环境要求

- **Node.js** 23.6+
- **npm** 或 **pnpm**

### 安装依赖

```bash
npm install
```

### 运行示例

```bash
// 进行中, 暂无完整示例
```

### 快速使用

**1. 读取并修改现有 GIA 文件**

```typescript
import { decode_gia_file, encode_gia_file, Graph } from "./utils";

const data = decode_gia_file("./myGraph.gia");
const graph = Graph.decode(data);

// 修改节点位置
graph.get_nodes()[0].setPos(100, 200);

// 添加注释
graph.add_comment("这是一个测试节点", 100, 150);

// 保存
encode_gia_file("./myGraph_modified.gia", graph.encode());
```

**2. 从零创建节点图**

```typescript
import { Graph, NODE_ID, encode_gia_file } from "./utils";

const graph = new Graph("server");

// 添加触发器和功能节点
const onCreate = graph.add_node(NODE_ID.When_Entity_Is_Created);
const getPlayer = graph.add_node(NODE_ID.Get_Player_Entity);
const teleport = graph.add_node(NODE_ID.Teleport_Player);

// 连接执行流
graph.flow(onCreate, getPlayer);
graph.flow(getPlayer, teleport);

// 连接数据流
graph.connect(getPlayer, teleport, 0, 0); // 实体输出 → 传送目标

// 设置参数
teleport.setVal(1, [100, 0, 50]); // 目标坐标

// 布局并保存
graph.autoLayout();
encode_gia_file("./newGraph.gia", graph.encode());
```

---

## 模块文档

### 核心模块

| 模块 | 说明 | 文档 |
| :--- | :--- | :--- |
| **源代码** | 解析器、转换器、类型定义 | [src/readme.md](./src/readme.md) |
| **工具库** | GIA 生成、节点数据、Protobuf | [utils/readme.md](./utils/readme.md) |

### 工具模块

| 模块 | 说明 | 文档 |
| :--- | :--- | :--- |
| **DSL 函数** | Math/Query 节点定义与类型生成 | [functions/readme.md](./utils/functions/readme.md) |
| **GIA 生成器** | 编程式构建和操作节点图 | [gia_gen/readme.md](./utils/gia_gen/readme.md) |
| **节点数据** | ID、枚举、引脚反射数据 | [node_data/readme.md](./utils/node_data/readme.md) |
| **Protobuf** | GIA 文件编解码 | [protobuf/readme.md](./utils/protobuf/readme.md) |

### 用户文档

| 文档 | 说明 |
| :--- | :--- |
| [DSL 使用手册](./docs/UserGuide.md) | DSL 语法完整指南 |
| [语言设计](./docs/SystemDesign.md) | 语言设计理念和实现细节 |
| [TODO.md](./TODO.md) | 开发计划和进度跟踪 |

---

## GIA 文件格式

`.gia` 文件是原神千星奇域节点图的二进制存储格式，使用 Protobuf 序列化。

![GIA 文件结构](./static/image.png)

| 字段 | 偏移 | 值 | 说明 |
| :--- | :--- | :--- | :--- |
| 文件大小 | 0x00 | `size - 4` | 文件总大小减 4 字节 |
| 版本号 | 0x04 | `0x01` | 固定值 |
| 头部标记 | 0x08 | `0x0326` | **严格校验** |
| 文件类型 | 0x0C | `0x03` | GIA = 3 |
| 内容长度 | 0x10 | `size - 24` | Protobuf 数据长度 |
| Protobuf | 0x14 | ... | 序列化的节点图数据 |
| 尾部标记 | 末尾 | `0x0679` | **严格校验** |

📖 Protobuf 详细结构：[gia.proto](./utils/protobuf/gia.proto)

---

## 开发进度

### 已完成 ✅

| 功能 | 状态 | 说明 |
| :--- | :--- | :--- |
| GIA 文件逆向 | ✅ 完成 | 完整的文件格式解析 |
| GIA 文件读写接口 | ✅ 完成 | TypeScript + Python 工具 |
| Graph 高层 API | ✅ 完成 | 节点、连接、注释、变量管理 |
| DSL 语法设计 | ✅ 完成 | 完整语法规范 |
| DSL → IR 解析器 | ✅ 完成 | 词法分析 + 语法分析 |
| IR → DSL 反编译器 | ✅ 完成 | 完整反编译支持 |
| 自动布局算法 | ✅ 完成 | 基于 Dagre 的自动布局 |
| 节点数据整理 | ✅ 完成 | 770+ 节点、40+ 枚举 |
| CI 自动化测试 | ✅ 完成 | 解析器一致性测试 |

### 进行中 ⏳

| 功能 | 状态 | 说明 |
| :--- | :--- | :--- |
| GIA → IR 转换器 | ⏳ 进行中 | 原始模式已支持，优化中 |
| IR → GIA 转换器 | ⏳ 进行中 | 从 IR 构造 Graph |
| 客户端节点支持 | ⏳ 进行中 | ID 和枚举差异处理 |

### 计划中 📋

| 功能 | 说明 |
| :--- | :--- |
| VSCode 语言扩展 | `.dsl.ts` 文件的语法高亮和智能补全 |
| 编译器类型推断 | 自动推断 DSL 表达式类型 |
| 运行模拟 | 本地模拟执行节点图逻辑 |

更多规划详见 [TODO.md](./TODO.md)

---

## 文件可见性

根据 [sync-list.json](./sync-list.json)，以下内容仅在开发分支 (`dev`) 可见：

| 路径 | 原因 |
| :--- | :--- |
| `utils/extracting_nodes/` | 内部节点提取工具 |
| `utils/**/ref/**` | 参考文件 |
| `utils/node_data/yaml/**` | 中间数据 |
| `**/test/**`, `**/temp/**` | 测试和临时文件 |
| `utils/functions/tools.ts` | 内部工具 |

---

## 相关项目

| 项目 | 说明 |
| :--- | :--- |
| [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) | 网页版节点编辑器 |
| [genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format) | `gil` 等其它文件格式介绍 |

---

## 贡献

欢迎贡献代码、报告问题或提出建议！

- 🐛 **Bug 报告**：[提交 Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 💡 **功能建议**：[提交 Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 📧 **联系作者**：[wuyijun21@mails.ucas.ac.cn](mailto:wuyijun21@mails.ucas.ac.cn)

## License

[MIT License](./LICENSE) © 2025 Wu-Yijun