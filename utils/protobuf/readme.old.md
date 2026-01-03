# Protobuf 工具 (`protobuf`)

本目录包含处理 `.gia` 文件（基于 Protobuf）的相关工具和定义文件。

---

## 文件说明

| 文件 | 说明 | 状态 |
| :--- | :--- | :--- |
| [`gia.proto`](./gia.proto) | GIA 文件 Protobuf 结构定义 | 核心 |
| [`gia.proto.ts`](./gia.proto.ts) | 自动生成的 TypeScript 类型 | 生成 |
| [`decode.ts`](./decode.ts) | TypeScript 编解码工具（**推荐**） | 活跃 |
| [`proto2ts.ts`](./proto2ts.ts) | Proto → TypeScript 转换器 | 工具 |
| [`decode.py`](./decode.py) | Python 编解码工具 | 辅助 |
| [`decode_raw.py`](./decode_raw.py) | 原始 Protobuf 解码（调试用） | 辅助 |

---

## 核心接口

### TypeScript 编解码 (`decode.ts`)

```typescript
import { decode_gia_file, encode_gia_file } from "./decode";

// 读取 GIA 文件
const data = decode_gia_file("./path/to/file.gia");

// 写入 GIA 文件
encode_gia_file("./output.gia", data);
```

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| `decode_gia_file` | `(path: string) => AssetBundle` | 读取并解码 GIA 文件 |
| `encode_gia_file` | `(path: string, data: AssetBundle) => void` | 编码并写入 GIA 文件 |
| `unwrap_gia` | `(path: string, check?: boolean) => Uint8Array` | 提取 Protobuf 数据 |
| `wrap_gia` | `(message: Type, data: AssetBundle) => ArrayBuffer` | 包装为 GIA 格式 |

### Proto 类型转换 (`proto2ts.ts`)

将 `gia.proto` 转换为 TypeScript 类型定义文件。

```bash
node utils/protobuf/proto2ts.ts [output_path] [input_path]
```

---

## GIA 文件格式

![GIA 结构](../../static/image.png)

| 字段 | 偏移 | 值 | 说明 |
| :--- | :--- | :--- | :--- |
| 文件大小 | 0x00 | `size - 4` | 文件大小减 4 字节 |
| 版本号 | 0x04 | `0x01` | 固定值 |
| 头部标记 | 0x08 | `0x0326` | **严格校验** |
| 文件类型 | 0x0C | `0x03` | GIA = 3 |
| 内容长度 | 0x10 | `size - 24` | Protobuf 数据长度 |
| Protobuf | 0x14 | ... | 节点图数据 |
| 尾部标记 | 末尾 | `0x0679` | **严格校验** |

---

## 使用示例

### 读取并修改 GIA 文件

```typescript
import { decode_gia_file, encode_gia_file } from "./decode";

// 读取
const data = decode_gia_file("./input.gia");
console.log(data.primary_resource.graph_data?.inner.graph.nodes);

// 修改节点位置
data.primary_resource.graph_data!.inner.graph.nodes[0].x = 100;

// 保存
encode_gia_file("./output.gia", data);
```

### 重新生成类型定义

修改 `gia.proto` 后需运行：

```bash
node utils/protobuf/proto2ts.ts
```

### Python 工具

**解码为文本：**
```bash
python decode.py ./test.gia -o ./test.txt
```

**编码回 GIA：**
```bash
python decode.py ./test.txt --encode -o ./test_new.gia
```

**原始解码（调试）：**
```bash
python decode_raw.py ./test.gia --tags
```

---

## 手动创建 GIA 文件

> 🟩 **推荐使用** [gia_gen](../gia_gen/readme.md) 中的 `Graph` 类快速创建。

如需手动构建，步骤如下：

// 注意, 类型和名称命名都变了(结构相同), 调整

### 1. 构建节点

```typescript
import { type GraphNode, NodeGraph_Id_Class } from "./gia.proto";

const node: GraphNode = {
  nodeIndex: 1,
  genericId: {
    class: NodeGraph_Id_Class.UserDefined,
    nodeId: 475,
    // ...
  },
  concreteId: { /* ... */ },
  pins: [ /* ... */ ],
  x: 0,
  y: 0,
};
```

### 2. 构建图结构

```typescript
import { type Root } from "./gia.proto";

const root: Root = {
  graph: {
    id: { /* ... */ },
    name: "MyGraph",
    graph: {
      inner: {
        graph: {
          nodes: [node],
          // ...
        }
      }
    }
  },
  filePath: "201-1234567890-102-MyGraph",
};
```

### 3. 保存文件

```typescript
encode_gia_file("./output.gia", root);
```

---

## 相关模块

- [GIA 生成器](../gia_gen/readme.md) — 高层节点图构建 API
- [节点数据](../node_data/readme.md) — 节点 ID 和类型定义
- [主 README](../readme.md) — 工具库概述


# Protobuf Utils

一套用于逆向工程和验证 Protobuf 数据的轻量级工具集。支持从二进制文件恢复结构、解析 `.proto` 定义，以及验证解码后的数据是否符合预期结构。

## 核心组件

### 1. [decode_raw.ts](./decode_raw.ts) - 原始解码器
一个高效、不依赖外部库的 Protobuf 原始解码器。
- **功能**: 递归解析二进制 Protobuf 消息。
- **特点**: 
    - 自动识别 `WireType` (Varint, Fixed, Length-delimited)。
    - 启发式地识别嵌套消息（Sub-message）、字符串（String）或原始字节（Bytes）。
    - 支持严谨模式和宽容模式。
- **数据结构**: `ParsedResult` 是一个以字段编号（Field Index）为键的字典，值为数组（支持 `repeated` 字段）。

### 2. [proto2ts.ts](./proto2ts.ts) - Proto 说明符
将 `.proto` 文件解析为层级化的 TypeScript 结构定义。
- **功能**:
    - 自行实现 Tokenizer 和 Parser，无需安装 `protobufjs` 等重型依赖。
    - 生成 `TypeLayers` 表示 protobuf 的命名空间和消息嵌套关系。
    - 将 `.proto` 定义导出为 TypeScript 接口文件，方便开发。
- **关键类**: `TypeLayers` 负责解析、搜索类型路径以及生成 TS 代码。

### 3. [verify_proto.ts](./verify_proto.ts) - 结构验证与对齐器
将原始解码结果与 `.proto` 定义进行比对，验证数据完整性并**还原结构化数据**。
- **功能**:
    - **遗漏校验**: 检查非 optional 的字段是否在二进制中存在。
    - **冗余校验**: 识别 `.proto` 中未定义的字段（以 `field_N` 形式保留）。
    - **类型校验**: 深度比对每个字段的类型。
    - **重复性校验**: 检查非 `repeated` 字段是否出现了多次。
    - **枚举校验**: 验证枚举值是否在定义范围内。
    - **结构还原**: 将结果转换为带字段名的结构化对象。**对于校验错误的字段，将保留其原始格式。**
- **报错形式**: 返回 `{ errors: ValidationError[], result: any }`。

### 4. [decode-cli.ts](./decode-cli.ts) - 命令行解析工具
一个开箱即用的命令行工具，集成了上述组件的功能，用于快速解析和验证二进制文件。
- **功能**:
    - 直接从命令行解码 `.gia` 或 Protobuf 二进制文件。
    - 支持指定自定义 `.proto` 文件和根消息（Root Message）。
    - 丰富的错误过滤选项（按类型过滤、按路径跳过）。
    - 支持输出为 JSON 或调试文本。

---


## 典型工作流

当你需要逆向一个未知的 Protobuf 文件并将其实例化为 TS 类型时，通常遵循以下流程：

### 第一步：解析 Proto 定义
```typescript
import { readFileSync } from "fs";
import { parse } from "./proto2ts.ts";

const protoContent = readFileSync("gia.proto", "utf-8");
const layers = parse(protoContent);
```

### 第二步：解码原始二进制数据
```typescript
import { ProtobufParser } from "./decode_raw.ts";

const data = new Uint8Array(readFileSync("data.bin"));
const parser = new ProtobufParser();
// 20, -4 通常是为了跳过特定的文件头（如 Gia 数据头）
const { result } = parser.parseMessage(data.slice(20, -4));
```

### 第三步：验证并对齐结构
```typescript
import { verifyProto } from "./verify_proto.ts";

// 获取 proto 中的特定 Message 定义
const rootType = layers.message.get("Root");
const { errors, result: reconstructed } = verifyProto(result, rootType!);

if (errors.length > 0) {
  console.warn("验证存在问题:", errors);
}

// reconstructed 是一个带有字段名的对象
console.log("还原的数据:", reconstructed);
```

## 命令行使用 (CLI)

可以使用 `decode-cli.ts` 快速查看二进制文件的内容：

```bash
# 基本用法 (默认载入 gia.proto 并解码 Root 消息)
npx tsx decode-cli.ts <input_file>

# 指定输出文件和消息类型
npx tsx decode-cli.ts <input_file> -o output.json -m MyMessage

# 仅显示 Missing Field 错误并跳过特定路径
npx tsx decode-cli.ts <input_file> --print-error-mf --skip-paths field_10.field_20
```

### 可用参数

- `-o <out_path>`: 指定输出路径（`.json` 会保存为 JSON，否则保存为调试文本）。
- `-p <proto_path>`: 指定 `.proto` 文件路径（默认为 `gia.proto`）。
- `-m <message_name>`: 指定根消息名称（默认为 `Root`）。
- `--no-slice`: 禁用默认的 `20:-4` 切片（某些文件可能不需要跳过头尾）。
- `--print-errors`: 显示所有验证错误。
- `--print-error-mf/ef/tm/rm/ie`: 分别显示 缺失/多余/类型错误/重复项错误/无效枚举。
- `--skip-paths <paths>`: 跳过指定路径下的错误汇报（通过空格分隔多个路径）。

---

## 参考示例

- [struct.test.ts](./struct.test.ts): 展示了如何加载 `gia.proto` 并还原二进制数据文件，同时跳过已知的业务相关字段错误。
- [test_verify.ts](./test_verify.ts): 包含了各种边界情况的单元测试，如类型不匹配、无效枚举和缺失字段。
