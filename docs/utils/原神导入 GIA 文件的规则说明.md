# 原神导入 GIA 文件的规则说明
> 文件: [utils/gia_gen/id_collide.test.ts](/utils/gia_gen/id_collide.test.ts)

## 概述

本文档描述了原神游戏导入 GIA (Genshin Impact Archive) 文件时的节点验证规则，以及如何通过碰撞检测方法逆向获取完整的节点类型列表。

## 导入节点规则

节点需要提供**基类 ID (Generic ID)** 和**派生类 ID (Concrete ID)** 两个标识符：

- **基类 ID 错误**：节点会被游戏自动删除
- **派生类 ID 错误**：派生类 ID 会被设置为空（`undefined`）

基于这些规则，我们可以通过碰撞检测方法来探测游戏支持的所有节点类型。

此外, 还有一条重要规则: 合法派生类必须提供正确的引脚


## 节点类型提取步骤

完整的提取流程实现在 `id_collide.test.ts` 中，分为三个步骤：

### Step 1: 提取基础类型

**目标**：识别所有有效的基类 ID，并区分单一类型节点和泛型基类节点。

**方法**：
1. 生成测试节点：`[基类B, 派生类D] = [i, i] for i in range(0, 3000)`
2. 将生成的 GIA 文件导入游戏，然后重新导出
3. 游戏会自动过滤掉无效节点，只保留合法节点

**结果分析**：
- 读取导出的 `[B, D]` 列表
- **当 D 存在时**：说明 B 本身没有派生类，是**单一类型节点** (Basic)
- **当 D 不存在时**：说明 B 有派生类，是**泛型基类节点** (Generic)

**输出**：
- 文件：`./utils/node_data/ref/generic.txt`
- 格式：每行为 `<ID>:Basic` 或 `<ID>:Generic`
- 统计：共 **427 个节点**
  - **57 个** Generic（泛型基类，有派生类）
  - **370 个** Basic（单一类型节点，无派生类）

---

### Step 2: 提取派生类型

**目标**：为每个泛型基类找出所有有效的派生类 ID。

**方法**：
1. 读取 Step 1 中识别的 57 个泛型基类 ID
2. 对每个泛型基类 B，生成测试节点：
   ```
   [基类B, 派生类D] = [B, i] for i in range(B + 1, B + 100)
   ```
3. 导入游戏后导出，检查哪些派生类 ID 被保留

**实现细节**：
- 使用 `generate_all_nodes(i, i, len)` 为每个基类生成多个派生类候选
- 通过碰撞检测确定每个基类支持的具体派生类范围
- 派生类 ID 通常在基类 ID 附近的连续区间内

问题: 在不知道标签位置时, 难以实现. 手动设置.

**输出**：
- 每个泛型基类对应的所有有效派生类 ID
- 可用于构建完整的节点类型层次结构


解析字典?


### Step 3: 猜测剩余空间

**目标**：发现可能存在的隐藏节点类型或未来预留的 ID 空间。

**观察**：
- 节点 ID 总体上是**连续分布**的
- 如果出现某个空白 ID 区间，可能是：
  - 未被 Step 1 和 Step 2 检测到的特殊节点
  - 游戏预留的未来扩展空间
  - 已废弃但仍保留 ID 的节点

**方法**：
1. 分析 `generic.txt` 中的 ID 分布
2. 识别 ID 序列中的**间隙**（gap）
3. 对间隙区间进行针对性碰撞测试
4. 验证这些 ID 是否为有效但未被常规方法检测到的节点

**注意事项**：
- 空白 ID 不会是已知的基础类型或派生基类
- 需要排除 Step 2 中已经测试过的 ID 范围
- 某些间隙可能是游戏内部保留，无法通过导入验证

---

## 技术实现

### 核心函数

```typescript
// 生成测试节点
function generate_all_nodes(from: number, size: number, line_width: number, offsets: number): GraphNode[]

// Step 1: 创建全量测试图
function create_graph(w: number, h: number, len: number)

// Step 1: 读取游戏过滤后的结果
function read_trimmed_graph()

// Step 2: 为泛型基类创建派生类测试
function create_derived(from: number, to: number, len: number)
```

### 使用流程

1. **运行 Step 1**：
   ```typescript
   create_graph(100, 30, 1);  // 生成 3000 个测试节点
   // 手动导入游戏并导出为 all_server_nodes_trim.gia
   read_trimmed_graph();      // 解析结果生成 generic.txt
   ```

2. **运行 Step 2**：
   ```typescript
   create_derived();  // 为所有泛型基类生成派生类测试
   // 手动导入游戏并分析结果
   ```

3. **分析 Step 3**：
   - 检查 `generic.txt` 中的 ID 间隙
   - 对可疑区间进行补充测试

---

## 数据文件

| 文件路径 | 说明 |
|---------|------|
| `./utils/node_data/ref/generic.txt` | 所有基类 ID 及其类型标记 |
| `./utils/ref/all_server_nodes.gia` | 生成的测试 GIA 文件 |
| `./utils/ref/all_server_nodes_trim.gia` | 游戏过滤后的 GIA 文件 |

---

## 总结

通过三步碰撞检测法，我们可以完整地逆向获取原神节点图系统的类型结构：

1. **Step 1** 识别所有基类及其是否为泛型
2. **Step 2** 枚举每个泛型基类的所有派生类
3. **Step 3** 发现隐藏或预留的节点 ID

这种方法利用了游戏的导入验证机制，无需反编译即可获得完整的节点类型信息。