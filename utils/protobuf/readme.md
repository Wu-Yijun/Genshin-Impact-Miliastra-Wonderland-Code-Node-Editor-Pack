# Protobuf Utils

这里包含了处理 `.gia` 文件 (基于 Protobuf) 的相关工具和定义文件。

## 文件说明

### 核心定义
- **[gia.proto](./gia.proto)**
  GIA 文件的 Protobuf 数据结构定义。包含了图 (Graph)、节点 (Node)、变量 (Variable) 等核心结构的定义。

![GIA.PROTO](../../static/image.png)

### TypeScript 工具
- **[proto2ts.ts](./proto2ts.ts)**
  用于将 `gia.proto` 转换为 TypeScript 类型定义文件 (`gia.proto.ts`)。
  - **作用**: 生成带有类型注释和枚举常量的 TS 接口, 方便代码中获得智能提示。
  - **用法**: `npx tsx utils/protobuf/proto2ts.ts [output_path] [input_path]`

- **[decode.ts](./decode.ts)**
  **推荐使用**。用于在 TypeScript 中读写 GIA 文件。
  - `decode_gia_file`: *导出函数*: 读取 `.gia` 文件, 解析头尾信息, 并解码为 TS 对象。
  - `encode_gia_file`: *导出函数*: 将 TS 对象编码为 `.gia` 文件, 自动处理头尾信息。

### Python 工具 (辅助/旧版)
- **[decode.py](./decode.py)**
  将 GIA 文件解码为可读文本, 或将文本编码回 GIA。
  - **用法**: `python utils/protobuf/decode.py [FILE_PATH] [-o OUTPUT] [--encode]`
  - **示例**:
    - 解码: `python utils/protobuf/decode.py ./test.gia -o ./test.txt`
    - 编码: `python utils/protobuf/decode.py ./test.txt --encode -o ./test_new.gia`

- **[decode_raw.py](./decode_raw.py)**
  不依赖 `gia.proto` 的完整定义, 将 GIA 文件解码为原始 Protobuf 消息结构, 用于调试或分析未知字段。
  - **用法**: `python utils/protobuf/decode_raw.py [FILE_PATH] [--tags] [--with_header]`
  - **参数**:
    - `--tags`: 输出包含字段 Tag 信息。
    - `--with_header`: **不去除头尾**。默认会去除 GIA 文件的头尾 (20B/4B)。若是原始 Protobuf 数据请使用此标记。
  - **输出**: 生成 `[FILE_PATH].js` (内容为 `export const ROOT = ...`)。

## 使用示例

### 重新生成类型定义
如果你修改了 `gia.proto`, 需要运行以下命令更新 TypeScript 类型：
```bash
node ./utils/protobuf/proto2ts.ts
```

### 在代码中读写 GIA 文件
```typescript
import { decode_gia_file, encode_gia_file } from "./utils/protobuf/decode";

// 读取
const data = decode_gia_file({ gia_path: "./path/to/file.gia" });
console.log(data.graph);

// 写入
encode_gia_file({
  out_path: "./path/to/new_file.gia",
  gia_struct: data
});
```

### 创建 GIA 文件, 参考案例: [../node_data/check_enum.ts](../node_data/check_enum.ts)

构建并保存一个新的 `.gia` 文件至少包含以下三个步骤：

1.  **构建节点列表 (`GraphNode[]`)**:
    首先需要创建图中的每一个节点。你需要手动构建 `GraphNode` 对象，设置其 `nodeIndex` (索引)、`concreteId` (节点ID)、`pins` (引脚参数) 以及 `x`, `y` 坐标等信息。

    ```typescript
    import { type GraphNode, NodeGraph$Id$Class, NodeGraph$Id$Kind, NodeProperty$Type } from "../protobuf/gia.proto.ts";

    const node: GraphNode = {
      nodeIndex: 1, // 唯一索引, 重复的节点无法被导入
      genericId: { 
        class: NodeGraph$Id$Class.SystemDefined,
        type: NodeProperty$Type.Server,
        kind: NodeGraph$Id$Kind.SysCall,
        nodeId: 475, // 具体的节点 ID (例如 Generic Enum Node)
      }, // 具体 ID 可以通过参考导出的文件的定义得知
      concreteId { ... }
      pins: [ ... ], // 设置输入输出引脚的值
      x: 0, // x 坐标, 右为正, 300 为一个节点的宽度
      y: 0, // y 坐标, 下为正, 200 为一个节点的高度
    };
    ```

2.  **构建图结构 (`Root`)**:
    将节点列表包装成完整的图结构对象。这个结构层级较深，大致结构为 `Root` -> `NodeUnit` (图单元) -> `NodeGraph` (图本身) -> `nodes` (节点列表)。你需要生成唯一的 `graph_id` 和 `file_id`，并设置图的名称。

    ```typescript
    import { type Root, NodeUnit$Id$Type, NodeUnit$Type, NodeGraph$Id$Type } from "../protobuf/gia.proto.ts";

    function wrap_nodes_into_root(graph_name: string, nodes: GraphNode[]): Root {
      const graph_id = 123456; // 生成随机 ID
      return {
        graph: {
          id: { type: NodeUnit$Id$Type.Basic, id: graph_id },
          relatedIds: [],
          name: graph_name,
          type: NodeUnit$Type.EntityNode,
          graph: {
            inner: {
              graph: {
                id: {
                  class: NodeGraph$Id$Class.UserDefined,
                  type: NodeGraph$Id$Type.BasicNode,
                  kind: NodeGraph$Id$Kind.NodeGraph,
                  id: graph_id,
                },
                name: graph_name,
                nodes: nodes, // <--- 放入节点列表
              }
            }
          }
        },
        utils: [],
        filePath: `${uid}-${Math.floor(Date.now() / 1000)}-${file_id}-\\${file_name}`, // 虚拟路径
      };
    }
    ```

3.  **编码并保存文件**:
    使用 `encode_gia_file` 函数将 `Root` 对象序列化并写入磁盘。该函数会自动处理文件头 (Header) 和文件尾 (Footer)。

    ```typescript
    import { encode_gia_file } from "../protobuf/decode.ts";

    const nodes = [node]; // 步骤 1 创建的节点
    const root = wrap_nodes_into_root("MyGraph", nodes); // 步骤 2 创建的图结构

    encode_gia_file({
      out_path: "./output.gia",
      gia_struct: root
    });
    ```
