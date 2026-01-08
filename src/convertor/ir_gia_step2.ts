/**
 * Step 2: AST Expander
 * * 核心功能:
 * 1. 递归解析 ASTExpr (Call/Identifier/Literal)
 * 2. 自动生成中间运算节点 (如 MathAdd, MathMul)
 * 3. 处理类型推导与重载求解 (通过 ctx.solveFunction)
 * 4. 将结果“连接”到指定的目标端口 (graph.connect 或 graph.set_default)
 */

import { UNK_TYPE, type NodeType } from "../../utils/node_data/node_type.ts";
import { ASTExpr, CallExpression } from "../types/AST_expr.ts";
import { Graph } from "./graph_wrapper.ts";
import { CompilerContext, SourceInfo } from "./ir_gia_step1.ts";

// 假设外部提供的类型比较函数
declare function type_equal(a: NodeType, b: NodeType): boolean;

/** * AST 解析结果 
 * - Source: 来源于某个节点的输出 (变量或函数调用结果)
 * - Value: 静态值 (字面量或 Define 常量)
 */
type ASTResult =
  | { kind: "source"; info: SourceInfo }
  | { kind: "value"; val: any; type: NodeType };

/** 中间运算节点的默认输出端口名 */
const DEFAULT_OP_OUTPUT_PORT = "result";

export class ASTExpander {
  private ctx: CompilerContext;
  private graph: Graph; // 引用 ctx.graph

  constructor(ctx: CompilerContext, graph: any) {
    this.ctx = ctx;
    this.graph = graph;
  }

  /**
   * 主要入口: 将 AST 表达式的结果连接到目标节点的指定端口
   * @param expr 待处理的表达式
   * @param dstNodeId 目标节点 ID
   * @param dstPortName 目标端口名
   * @param expectedType 目标端口期望的类型 (用于校验)
   */
  public connectExprToPort(
    expr: ASTExpr,
    dstNodeId: string,
    dstPortName: string,
    expectedType: NodeType | null
  ) {
    // 1. 递归解析表达式，获取结果 (源或值)
    const result = this.resolveASTExpr(expr);

    // 2. 根据结果类型进行连接或赋值
    if (result.kind === "value") {
      // 静态值: 直接设置引脚默认值
      // 校验类型
      if (expectedType && !type_equal(expectedType, result.type)) {
        console.warn(`[TypeWarning] Literal type mismatch. Expected: ${expectedType}, Got: ${result.type}. Target: ${dstNodeId}.${dstPortName}`);
      }
      this.graph.set_default(dstNodeId, dstPortName, result.val);
    }
    else {
      // 数据源: 建立连线
      const src = result.info;

      // 校验类型
      if (expectedType && !type_equal(expectedType, src.type)) {
        console.warn(`[TypeWarning] Connection type mismatch. Expected: ${expectedType}, Got: ${src.type}. Src: ${src.nodeId}.${src.port} -> Dst: ${dstNodeId}.${dstPortName}`);
      }

      this.graph.connect(src.nodeId, dstNodeId, src.port, dstPortName);
    }
  }

  /**
   * 递归核心: 解析表达式并返回 Source 或 Value
   */
  private resolveASTExpr(expr: ASTExpr): ASTResult {

    // === Case 1: 字面量 (Literal) ===
    if (expr.type === 'Literal') {
      return {
        kind: "value",
        val: expr.value,
        type: expr.var_type // 使用 AST 中已知的类型
      };
    }

    // === Case 2: 标识符 (Identifier) ===
    if (expr.type === 'Identifier') {
      const name = expr.name;

      // 2.1 检查是否是 Macro Define (常量)
      const definedVal = this.ctx.resolveDefine(name);
      if (definedVal !== undefined) {
        // TODO: Define 通常应该在声明时有类型，这里假设需要推导或从 defineDecl 获取
        // 为了简化，这里假设 defineVal 已经是 { value, type } 或者我们需要一个 helper
        // 暂时假设为 UNK_TYPE 或根据 value typeof 推导
        return { kind: "value", val: definedVal, type: UNK_TYPE };
      }

      // 2.2 检查是否是变量 (Variable / Previous Output)
      const varInfo = this.ctx.resolveVar(name);
      if (varInfo) {
        return { kind: "source", info: varInfo };
      }

      console.warn(`[ASTExpander] Undefined identifier: '${name}'. Using UNK type.`);
      return {
        kind: "source",
        info: { nodeId: "UNKNOWN_NODE", port: "unknown", type: UNK_TYPE }
      };
    }

    // === Case 3: 函数调用 (CallExpression) ===
    // 这是 AST 展开最关键的部分: m.add(a, b) -> 生成 Node_Add -> 返回其输出作为 Source
    if (expr.type === 'CallExpression') {
      return this.expandCallExpression(expr);
    }

    throw new Error(`[ASTExpander] Unknown ASTExpr type: ${(expr as any).type}`);
  }

  /**
   * 展开 CallExpression: 生成中间节点
   */
  private expandCallExpression(expr: CallExpression): ASTResult {
    // 1. 递归处理所有参数
    const argResults = expr.arguments.map(arg => this.resolveASTExpr(arg));

    // 2. 提取参数类型列表 (用于重载求解)
    const argTypes: NodeType[] = argResults.map(res => {
      return res.kind === "source" ? res.info.type : res.type;
    });

    // 3. 调用类型求解器 (Type Solver)
    // 根据函数名 (callee) 和参数类型，推导具体的运算节点标识符和端口布局
    const solverResult = this.ctx.solveFunction(expr.callee, argTypes, `Call ${expr.callee}`);

    const { identifier, argPortNames, returnType } = solverResult;

    // 4. 创建中间运算节点
    // 注意: 这些节点是隐式的，由表达式生成的，通常不需要特定的 _id，让 Graph 自动生成
    const nodeId = this.graph.add_node({
      kind: "call",
      identifier: identifier,
      // 可以在这里传递 debug info (source map)
    });

    // 5. 连接参数到新节点
    argResults.forEach((res, index) => {
      const portName = argPortNames[index] || `arg${index}`; // fallback port name

      if (res.kind === "value") {
        this.graph.set_default(nodeId, portName, res.val);
      } else {
        this.graph.connect(res.info.nodeId, nodeId, res.info.port, portName);
      }
    });

    // 6. 返回新节点的输出作为 Source
    return {
      kind: "source",
      info: {
        nodeId: nodeId,
        port: DEFAULT_OP_OUTPUT_PORT, // 假设运算节点统一输出名为 "result"
        type: returnType
      }
    };
  }

  /**
   * 公开接口: 解析表达式并返回结果 (SourceInfo 或 Value)
   * 用于 EvalNode 内部处理变量声明和 Return
   */
  public resolveExprInfo(expr: ASTExpr): ASTResult {
    return this.resolveASTExpr(expr);
  }
}