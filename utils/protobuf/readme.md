# Protobuf 工具集 (`utils/protobuf`)

本目录包含了一套用于处理、逆向工程和验证 Protobuf 数据（特别是 `.gia` 文件）的完整工具链。该工具集在设计上兼顾了**生产环境的高效性**与**测试环境的透明度**。

---

## 核心组件概述

### 1. 结构定义与类型生成
*   **[`gia.proto`](./gia.proto)**: **核心定义文件**。包含了 GIA 文件的完整 Protobuf 结构定义。它作为整个系统的“单一真理来源”（Source of Truth）。
*   **[`gia.proto.ts`](./gia.proto.ts)**: **自动生成的类型定义**。通过 `proto2ts.ts` 将 `.proto` 转换为 TypeScript 接口，供全局使用。

### 2. 双路径编解码系统
针对不同的使用场景，提供两套互补的解码方案：

| 特性 | **[`decode.ts`](./decode.ts)** (生产/正向) | **[`decode-cli.ts`](./decode-cli.ts)** (调试/逆向) |
| :--- | :--- | :--- |
| **底层库** | 使用标准的 `protobufjs` 库 | **纯手工解析** (基于 `decode_raw.ts`) |
| **主要目标** | 性能、一致性、标准兼容 | **可见性、报错反馈、结构分析** |
| **核心逻辑** | 直接根据定义进行快速二进制转换 | 启发式搜索子消息、字符串和字节流 |
| **错误处理** | 若数据不匹配通常直接报错或产生默认值 | 生成详细的 `ValidationError` 报告，保留原始数据 |
| **适用场景** | 自动化转换脚本、应用运行时 | 逆向新协议、验证 proto 修改是否正确、数据对齐 |

---

## 重点工具深度分析

### 🔍 `decode-cli.ts` & `decode_raw.ts` (测试驱动)
这是本工具集最核心的逆向工程组件。其工作流程不依赖于 `protobufjs` 的默认解码逻辑，而是采用“先解析二进制结构，后比对定义”的策略。

*   **`decode_raw.ts` (手工解析核心)**:
    - 能够递归解析任意 Protobuf 消息，无需任何 `.proto` 文件。
    - 自动识别 `WireType` (Varint, Fixed32/64, Length-delimited)。
    - **启发式识别**: 对于 `Length-delimited` 字段，它会尝试将其递归解析为嵌套消息。如果失败，则尝试解析为字符串，最后退化为原始字节。
*   **`verify_proto.ts` (结构验证器)**:
    - 将 `decode_raw.ts` 的结果与 `proto2ts.ts` 生成的层级结构进行全量比对。
    - **报错反馈**: 提供 `MISSING_FIELD` (缺失必填字段), `EXTRA_FIELD` (定义外字段), `TYPE_MISMATCH` (类型不匹配) 等精确到路径的错误提示。
    - **对齐还原**: 将解析出的匿名数据根据字段名重新组装成结构化对象。

### ⚡ `decode.ts` (生产工具)
封装了基于 `protobufjs` 的标准加解密流程。

*   **`unwrap_gia` / `wrap_gia`**: 处理 GIA 特有的文件封装格式。
    - **GIA 头部 (20 bytes)**: 包含文件大小、版本号 (`0x01`)、Magic Tag (`0x0326`)、文件类型 (`0x03`)。
    - **GIA 尾部 (4 bytes)**: 包含校验码 (`0x0679`)。
*   **`decode_gia_file`**: 一键完成“读取文件 -> 解除 GIA 封装 -> Protobuf 反序列化 -> 转换为普通对象”的流程。

### 🛠️ 其他辅助工具
*   **`proto2ts.ts`**: 一个轻量级的 Proto 解析器。它不依赖外部库即可读取 `.proto` 文件，并生成具有命名空间支持的 TypeScript 接口，以及供 `verify_proto.ts` 使用的消息字典。

---

## 典型工作流

### 1. 验证修改后的 Proto 是否与二进制文件兼容
当你修改了 `gia.proto` 后，可以使用 CLI 工具在测试模式下验证：
```bash
# 运行 CLI，载入 proto 并解码，同时输出所有的验证错误
node utils/protobuf/decode-cli.ts <path_to_gia> --print-errors
```
如果发现 `EXTRA_FIELD`，说明数据中存在你尚未定义的字段；如果是 `TYPE_MISMATCH`，则可能是某个字段的类型定义有误。

### 2. 生产环境中读写数据
```typescript
import { decode_gia_file, encode_gia_file } from "./utils/protobuf/decode.ts";

// 解码
const bundle = decode_gia_file("input.gia");

// 修改
bundle.primary_resource.internal_name = "modified_name";

// 编码存回
encode_gia_file("output.gia", bundle);
```

### 3. 生成新的 TS 类型定义
```bash
node utils/protobuf/proto2ts.ts ./utils/protobuf/gia.proto.ts ./utils/protobuf/gia.proto
```

---

## 详细文件列表

| 文件 | 说明 | 关键方法/功能 |
| :--- | :--- | :--- |
| [`gia.proto`](./gia.proto) | 核心 Protobuf 定义 | GIA 文件结构、资源定位与类型系统定义 |
| [`gia.proto.ts`](./gia.proto.ts) | 静态类型定义 | 自动生成的 TypeScript 接口，用于业务代码类型约束 |
| [`decode.ts`](./decode.ts) | 生产环境编解码 | `decode_gia_file` / `encode_gia_file`: 标准 GIA 文件读写 |
| [`decode-cli.ts`](./decode-cli.ts) | 逆向分析工具 | 命令行界面，提供深度的结构验证与错误汇总 |
| [`decode_raw.ts`](./decode_raw.ts) | 原始 Protobuf 解析 | `ProtobufParser`: 递归解析二进制流，推断数据结构 |
| [`proto2ts.ts`](./proto2ts.ts) | 协议转换器 | 将 `.proto` 定义解析为 TS 代码及内部校验用的 `TypeLayers` |
| [`verify_proto.ts`](./verify_proto.ts) | 结构校验与还原 | `verifyProto`: 对比原始数据与定义，报告不一致性并还原命名结构 |

## 详细用法

### 1. 原始解析与验证工具链 (`decode_raw.ts` & `verify_proto.ts`)
当你需要分析未知数据结构或验证协议修改的兼容性时。

```typescript
import { ProtobufParser } from "./decode_raw.ts";
import { verifyProto } from "./verify_proto.ts";
import { parse } from "./proto2ts.ts";

// 1. 原始解析 (无需定义即可提取字段 ID 与数据)
const parser = new ProtobufParser();
const { result: rawData } = parser.parseMessage(binaryPayload);

// 2. 加载协议定义
const layers = parse(protoContent);
const assetType = layers.message.get("AssetBundle");

// 3. 执行验证与还原 (将字段 ID 映射为名称，并校验类型)
const { errors, result: formattedData } = verifyProto(rawData, assetType!);

if (errors.length > 0) {
  console.warn("发现结构差异:", errors);
}
```

### 2. 命令行验证工具 (`decode-cli.ts`)
最便捷的调试方式，直接在终端查看对比差异或导出转化结果。

```bash
# 基础用法：验证文件结构并打印错误
node utils/protobuf/decode-cli.ts input.gia --print-errors

# 过滤特定路径错误并导出为 JSON/JS 文件
node utils/protobuf/decode-cli.ts input.gia --skip-paths root.secondary --out debug_res.json

# 查询用法
node utils/protobuf/decode-cli.ts -h
```

```log
用法：node decode-cli.ts <input_path> [options]

必需参数：
  input_path                .gia 或 protobuf 二进制文件的路径。

选项：
  -h, --help                显示此帮助信息。 
  -o, --out <path>          解码后的 JSON 输出文件路径（默认不保存到文件）。 
  -p, --protobuf <path>     Protobuf 文件路径（默认加载 gia.proto）。 
  -m, --message <name>      要解码的 Protobuf 消息名称（默认值：Root）。 
  -q, --quiet               禁用所有控制台输出。 
  -s, --strict <boolean>    启用严格解析（默认值：true）。 
  -n, --no-slice            禁用对输入文件的默认切片操作 (20:-4)。 
  -e, --print-errors        在错误输出中显示所有错误。 
  --missing-error           在错误输出中显示缺少字段错误。 
  --extra-error             在错误输出中显示多余字段错误。 
  --type-error              在错误输出中显示类型不匹配错误。 
  --repeated-error          在错误输出中显示重复字段不匹配错误。 
  --enum-error              在错误输出中显示无效枚举错误。 
  --skip-paths <paths>      要跳过的错误路径列表（区分大小写，前缀匹配）。 
                            多个路径可以用空格分隔。
```
