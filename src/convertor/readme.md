# 转换器模块 (`convertor`)

本模块负责 GIA 节点图与中间表示 (IR) 之间的相互转换，以及图结构分析。

## 文件说明

| 文件 | 说明 |
| :--- | :--- |
| [`gia_ir.ts`](./gia_ir.ts) | GIA → IR 转换入口 |
| [`gia_ir_raw.ts`](./gia_ir_raw.ts) | 原始 IR 构建器实现 |
| [`graph_chain_split.ts`](./graph_chain_split.ts) | 图结构分析算法（链、环、孤立点） |

---

## 核心接口

### `giaIrConvertor(gia, raw)` — GIA 转 IR

将 GIA 图转换为 IR 模块。

```typescript
import { giaIrConvertor } from "./gia_ir";

const irModule = giaIrConvertor(giaGraph, true); // raw 模式
```

**参数：**
- `gia: Graph` — 输入的 GIA 图对象
- `raw: true` — 原始转换模式（目前仅支持此模式）

**返回值：** `IR_GraphModule` — 完整的 IR 模块

---

### `analyzeGraph(nodes, edges)` — 图结构分析

分析有向图结构，识别链、环和孤立点。使用 Tarjan 算法检测强连通分量，复杂度 O(N+E)。

```typescript
import { analyzeGraph, type ChainResult } from "./graph_chain_split";

const nodes = [1, 2, 3, 4, 5];
const edges: [number, number][] = [[1, 2], [2, 3], [3, 4], [2, 4]];
const result: ChainResult = analyzeGraph(nodes, edges);
```

**参数：**
- `nodes: number[]` — 节点 ID 数组
- `edges: [number, number][]` — 边数组，格式 `[from, to]`

**返回值：** `ChainResult`

```typescript
interface ChainResult {
  single: number[];  // 孤立点（入度=0 且 出度=0）
  chain: {
    starter: number;           // 链的起点
    chains: number[][];        // 从起点出发的各条链
    targets: (number | null)[]; // 每条链的汇入点（或 null 表示终点）
  }[];
  in_deg: Map<number, number>;  // 入度映射
  out_deg: Map<number, number>; // 出度映射
}
```

**核心概念：**

| 概念 | 定义 |
| :--- | :--- |
| **孤立点** | 入度=0 且 出度=0 的节点 |
| **内部节点** | 入度=1 且 出度=1 的节点 |
| **起点 (starter)** | 出度>0 且 不是内部节点 |
| **纯环** | 所有节点入度=1、出度=1 的孤立强连通分量 |

---

### `RawIRModuleBuilder` — 原始 IR 构建器

将 GIA 图转换为 IR 的核心类。

```typescript
class RawIRModuleBuilder {
  constructor(gia: Graph);
  
  build(): IR_GraphModule;  // 执行完整构建流程
  
  // 内部方法
  initNodes();        // 初始化节点映射
  initFlows();        // 初始化执行流
  addAnchor();        // 添加分支汇入锚点
  addBranch();        // 添加分支节点
  addSharedDecl();    // 添加共享函数声明
  createAllChain();   // 创建所有执行链
}
```

**构建流程：**

1. `initNodes()` — 遍历 GIA 节点，创建 IR 节点映射
2. `initFlows()` — 分析执行流边，建立流向关系
3. `addAnchor()` — 为多入度节点创建锚点
4. `addBranch()` — 为多出度节点创建分支
5. `addSharedDecl()` — 识别并提取共享函数
6. `createAllChain()` — 将节点组织为执行链

---

## 辅助函数

| 函数 | 说明 |
| :--- | :--- |
| `ir_node(n: Node)` | 将 GIA Node 转换为 IR_Node |
| `ir_jump_to(target)` | 创建跳转节点 |
| `ir_call_shared(decl, port)` | 创建共享函数调用 |
| `nodes_to_execution_block(chains)` | 将节点链包装为执行块 |
| `anchor_name(id)` | 生成锚点名称 |
| `branch_name(index)` | 生成分支名称 |

---

## 相关模块

- [类型定义](../types/readme.md) — IR 结构定义
- [解析器](../parser/readme.md) — DSL 文本解析
- [GIA 生成器](../../utils/gia_gen/readme.md) — GIA 图构建工具
