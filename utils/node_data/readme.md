# Node Data & Definitions

本目录包含转换器所需的全部**静态定义**和资源数据。这些数据主要用于节点图的解析、类型推断和反射机制。
资源通过 `index.ts` 统一导出，部分原始定义文件在发布时可能会被剔除，仅保留核心数据。

## 核心资源列表

### [node_pin_records.ts](./node_pin_records.ts)
**节点引脚定义记录**
包含了所有**反射型节点**（Reflective Nodes）的详细定义, 也包含了普通节点。
- 记录了节点的输入（Inputs）、输出（Outputs）引脚定义。
- 包含了 `reflectMap`，定义了泛型 ID 到具体 ID 的映射关系。
- 是节点图解析器理解节点结构的核心依据。

### [concrete_map.ts](./concrete_map.ts)
**泛型节点类型映射表**
定义了泛型节点（Generic Node）的引脚在不同类型选择下的索引顺序。
- 用于将泛型节点的抽象类型（如 `R<T>`）映射到具体的类型 ID。
- 配合 `helpers.ts` 中的函数使用，以解析泛型节点的具体形态。

### [types_list.ts](./types_list.ts)
**变量类型定义列表**
定义了系统中所有可用的变量类型及其属性。
- 包含类型的名称（Name）、显示名称（Translations）、类型 ID（ID）。
- 定义了类型的表达式（Expression，如 `L<Int>`）和 DSL 名称。
- 对应 `VarType` 枚举。

### [node_id.ts](./node_id.ts)
**节点 ID 映射表**
提供了节点名称到节点 ID 的完整映射。
- 包含泛型节点 ID（如 `Add_Generic`）和具体节点 ID（如 `Add_Int`）。
- 是通过名称查找节点 ID 的主要索引。

### [enum_id.ts](./enum_id.ts)
**枚举 ID 与值定义**
定义了系统中使用的所有枚举类型及其具体值。
- `ENUM_ID`: 枚举类别的 ID 定义（如 `Comparison_Operators`）。
- `ENUM_VALUE`: 具体枚举值的 ID 定义（如 `ComparisonOperators_EqualTo`）。

### [helpers.ts](./helpers.ts)
**辅助函数库**
提供了一系列用于读取和解析上述静态数据的辅助函数。
- `get_concrete_index`: 获取泛型引脚的具体类型索引。
- `get_node_record`: 根据 ID 获取节点的详细定义记录。
- `is_concrete_pin`: 判断引脚是否为具体化引脚。

### [index.yaml](./index.yaml) / [index.json](./index.json)
**完整数据汇总**
以 YAML/JSON 格式提供的单文件完整数据汇总。
- 包含上述所有分散定义的高度结构化版本。
- 适合外部程序直接读取和处理。

---
*注：本目录下的其他文件为生成过程中的中间产物或源文件，发布版本中可能不包含。*
