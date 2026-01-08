/**
 * 共四步:
 * 
 * 
 * #### 步骤 1: 基础设施与上下文 (Infrastructure & Context)
 * 
 * * **目标**：建立构建过程中的“状态机”。
 * * **任务**：
 * * 实现 `CompilerContext` 类。
 * * **Symbol Table**：管理变量名到 `{NodeID, PortName, Type}` 的映射。
 * * **Define Map**：加载 `IR_GraphModule` 中的 `defines`。
 * * **Shared Node Map**：管理共享函数实例。
 * * **Type Helper**：封装 `solve_identifier`，处理类型检查、警告打印、`UNK_TYPE` 回退逻辑。
 * 
 * 
 * 
 * #### 步骤 2: AST 表达式展开器 (AST Expander)
 * 
 * * **目标**：实现 `process_expr` 函数，处理数据流连接。
 * * **任务**：
 * * 输入：`ASTExpr`，目标节点 ID，目标端口名。
 * * 递归处理 `CallExpression`：
 * 1. 递归解析参数，获取参数的类型列表。
 * 2. 调用 `solve_identifier` 获取具体系统函数名和返回类型。
 * 3. `graph.add_node` 创建中间运算节点。
 * 4. 连接参数到该中间节点。
 * 
 * 
 * * 处理 `Identifier`：查符号表，建立 `graph.connect`。
 * * 处理 `Literal` / `Define`：直接设置目标端口的初值。
 * 
 * 
 * 
 * #### 步骤 3: 节点与控制流构建 (Node & Flow Builder)
 * 
 * * **目标**：遍历 IR 链，生成主骨架。
 * * **任务**：
 * * 处理 `IR_CallNode`：
 * * 区分 `Sys` / `Usr` / `Shared`。
 * * 调用 **步骤 2** 的展开器处理 `inputs`。
 * * 注册 `outputs` 到符号表（带有推导出的类型）。
 * 
 * 
 * * 处理线性控制流：`chain[i]` -> `chain[i+1]`。
 * * 处理 `IR_EvalNode`（如果包含 Block）：处理 `VariableDeclaration` 和内部逻辑。
 * 
 * 
 * 
 * #### 步骤 4: 分支与跳转处理 (Branching & Jump)
 * 
 * * **目标**：处理复杂的嵌套控制流。
 * * **任务**：
 * * 维护 `JumpTargetStack`。
 * * 当处理 `CallNode` 的 `branches` 时：
 * * 获取 `CallNode` 在主链上的 **Next Node ID**。
 * * 将该 ID 压入堆栈，作为当前层级的 `Target(0)`。
 * * 递归调用构建器处理 Branch 的子链。
 * 
 * 
 * * 当遇到 `IR_JumpNode`：
 * * 如果 ID 为 0，取出栈顶 ID 并连接。
 * * 如果 ID 为其他，查找对应的 Anchor（沿用之前的 Anchor 逻辑）。
 */