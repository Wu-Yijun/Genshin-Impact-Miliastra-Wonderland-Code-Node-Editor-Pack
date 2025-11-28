# Node ID & Enum Definitions

本目录包含用于定义和管理节点 ID 及枚举类型的文件与脚本。

## 数据文件

- **[server_node_id.yaml](server_node_id.yaml)**
  - 定义了服务器节点的名称与对应的 ID。
  - 包含执行节点 (Execution Node)、触发节点 (Trigger Node)、查询节点 (Query Node) 等。

- **[enum_id_raw.yaml](enum_id_raw.yaml)**
  - 枚举定义的原始数据源 (手动编辑)。
  - 包含枚举的 ID、名称以及枚举项列表。

- **[enum_id.yaml](enum_id.yaml)**
  - 由 `gen_enum.ts` 生成的标准化枚举定义文件。
  - 包含枚举类 ID (`varClassBase`)、枚举 ID 以及具体的枚举值映射。
  - **推荐读取此文件作为枚举定义**。

## 脚本工具

- **[gen_enum.ts](gen_enum.ts)**
  - **用途**: 构建工具。
  - **功能**: 读取 `enum_id_raw.yaml` 并生成标准化的 `enum_id.yaml` 文件。

- **[check_enum.ts](check_enum.ts)**
  - **用途**: 测试与验证工具。
  - **功能1**: 读取 `enum_id.yaml` 并生成一个包含所有枚举节点的 `.gia` 文件 (`generated_enums_v4.gia`)。
  - **目的1**: 通过在游戏中加载生成的 `.gia` 文件，验证所有枚举定义是否正确且能被解析。
  - **功能2**: 读取 `enum_id.yaml` 并生成一个 gia.proto 的枚举节点和变量的部分定义


## 生成产物 & 其他

- **[enum_id.yaml.d.ts](enum_id.yaml.d.ts)**
  - `enum_id.yaml` 的 TypeScript 类型定义文件，用于代码智能提示。

- **[generated_enums_v4.gia](generated_enums_v4.gia)**
  - 由 `check_enum.ts` 生成的测试用 `.gia` 文件。
  - 可导入游戏以验证枚举节点。

- **验证效果图**:
  ![Generated Enum Nodes](<Generated Enum Nodes.jpg>)