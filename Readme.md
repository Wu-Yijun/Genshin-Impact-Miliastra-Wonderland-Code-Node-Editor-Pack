# 千星奇域节点图工具集

本项目是**原神千星奇域**节点图开发的综合工具集，提供从底层文件解析到上层代码编写的全套解决方案。

> 如果您有任何建议或发现有趣的线索，欢迎提交 Issue 或发 [Email](mailto:wuyijun21@mails.ucas.ac.cn)

---

## 核心功能

### 1. GIA 文件读写

使用 TypeScript 编程式读写 `.gia` 文件。

```typescript
import { decode_gia_file, encode_gia_file, Graph, NODE_ID } from "./utils";

// 读取现有文件
const data = decode_gia_file("./input.gia");

// 创建新图
const graph = new Graph();
const trigger = graph.add_node(NODE_ID.When_Entity_Is_Created);
const log = graph.add_node(NODE_ID.Log_Message);
graph.flow(trigger, log);
log.setVal(0, "Hello!");
graph.autoLayout();

// 保存
encode_gia_file("./output.gia", graph.encode());
```

📖 详情：[GIA 生成器](./utils/gia_gen/readme.md) | [Protobuf 工具](./utils/protobuf/readme.md)

### 2. DSL 代码编写

使用基于 TypeScript 的领域特定语言 (DSL) 以代码方式构建节点图，享受 IDE 智能补全。

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
```

📖 详情：[DSL 使用手册](./docs/UserGuide.md) | [语言设计](./docs/SystemDesign.md) | [函数定义](./utils/functions/readme.md)

### 3. 解析器与转换器

完整的编译/反编译工具链。

```typescript
import { createParserState, parse, decompile } from "./src/parser";
import { giaIrConvertor } from "./src/convertor";

// DSL → IR
const ir = parse(createParserState(sourceCode));

// IR → DSL
const code = decompile(ir);

// GIA → IR
const irModule = giaIrConvertor(giaGraph, true);
```

📖 详情：[解析器](./src/parser/readme.md) | [转换器](./src/convertor/readme.md) | [IR 类型](./src/types/readme.md)

### 4. 完备的节点数据

程序化整理的节点 ID、枚举值、引脚定义。

```typescript
import { NODE_ID, ENUM_ID, get_node_record } from "./utils/node_data";

const id = NODE_ID.Add_Float;
const record = get_node_record(id);
```

📖 详情：[节点数据](./utils/node_data/readme.md)

---

## 项目结构

```
├── src/                 # 核心源代码
│   ├── convertor/       # GIA ⇔ IR 转换器
│   ├── parser/          # DSL 解析器
│   └── types/           # IR 类型定义
├── utils/               # 工具库
│   ├── functions/       # DSL 函数定义
│   ├── gia_gen/         # GIA 图生成器
│   ├── node_data/       # 节点静态数据
│   └── protobuf/        # Protobuf 工具
└── docs/                # 用户文档
```

---

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行示例

```bash
# 运行解析器测试
npx tsx src/test/parser.ts

# 生成 DSL 类型定义
npx tsx utils/gen_def.ts
```

---

## 模块文档

| 模块 | 说明 | 文档 |
| :--- | :--- | :--- |
| **源代码** | 解析器、转换器、类型定义 | [src/readme.md](./src/readme.md) |
| **工具库** | GIA 生成、节点数据、Protobuf | [utils/readme.md](./utils/readme.md) |
| **DSL 函数** | Math/Query 节点定义与类型生成 | [functions/readme.md](./utils/functions/readme.md) |
| **GIA 生成器** | 编程式构建节点图 | [gia_gen/readme.md](./utils/gia_gen/readme.md) |
| **节点数据** | ID、枚举、引脚反射数据 | [node_data/readme.md](./utils/node_data/readme.md) |
| **Protobuf** | GIA 文件编解码 | [protobuf/readme.md](./utils/protobuf/readme.md) |

---

## GIA 文件格式

`.gia` 文件使用以下结构：

| 字段 | 偏移 | 说明 |
| :--- | :--- | :--- |
| 文件大小 | 0x00 | 文件大小 - 4 |
| 版本号 | 0x04 | 固定 0x01 |
| 头部标记 | 0x08 | 固定 0x0326 |
| 文件类型 | 0x0C | GIA = 0x03 |
| 内容长度 | 0x10 | Protobuf 数据长度 |
| Protobuf | 0x14 | 节点图数据 |
| 尾部标记 | 末尾 | 固定 0x0679 |

📖 详情：[gia.proto](./utils/protobuf/gia.proto)

---

## 开发进度

| 功能 | 状态 |
| :--- | :--- |
| GIA 文件逆向 | ✅ 完成 |
| GIA 文件读写接口 | ✅ 完成 |
| DSL 语法设计 | ✅ 完成 |
| DSL → IR 解析器 | ✅ 完成 |
| IR → DSL 反编译器 | ✅ 完成 |
| GIA → IR 转换器 | ⏳ 进行中 |
| IR → GIA 转换器 | ⏳ 进行中 |
| 节点编辑器 UI | 🔗 [外部项目](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) |

更多规划见 [TODO.md](./TODO.md)

---

## 文件可见性

根据 `sync-list.json`，以下内容仅在开发分支可见：

- `utils/extracting_nodes/` — 节点提取工具
- `**/test/**`、`**/temp/**` — 测试和临时文件
- 部分参考文件和内部工具

---

## 相关项目

- [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) — 网页版节点编辑器
- [genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format) — 文件格式文档

---

## License

MIT License
