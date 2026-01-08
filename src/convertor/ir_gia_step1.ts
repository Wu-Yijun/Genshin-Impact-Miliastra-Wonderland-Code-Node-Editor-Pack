/**
 * Step 1: Infrastructure & Context
 * * 包含:
 * 1. 类型定义与外部接口 Mock
 * 2. CompilerContext 类 (核心状态机)
 * - 符号表管理 (Variables)
 * - 共享节点管理 (Shared Nodes)
 * - 跳转目标堆栈 (Jump Context)
 * - 类型推导与检查 (Type Solver Wrapper)
 */

import { type_equal, UNK_TYPE, type NodeType } from "../../utils/node_data/node_type.ts";
import { IR_GraphModule } from "../types/IR.ts";
import { BranchId } from "../types/types.ts";
import { Graph } from "./graph_wrapper.ts";

// --- 0. 外部依赖接口假设 (Mocks/Interfaces) ---


// 外部提供的类型推导函数
declare function solve_identifier(
  callee_name: string,
  arg_types: NodeType[]
): { identifier: string, args: string[], return_type: NodeType };

// --- 1. 核心数据结构定义 ---

/** 变量/信号源信息 */
export interface SourceInfo {
  nodeId: string;
  port: string;
  type: NodeType;
}

/** 共享函数声明映射 */
export interface SharedNodeInfo {
  nodeId: string;
  // 共享节点可能有固定的入口/出口定义，这里暂存 ID
}

// --- 2. 编译器上下文 (Compiler Context) ---

export class CompilerContext {
  private graph: Graph;

  // 1. 符号表: 变量名 -> 数据源 (包括 IR_Call 的 outputs, 局部变量等)
  private varMap = new Map<string, SourceInfo>();

  // 2. 宏定义表: 宏名 -> 字面值 (处理 DefineDecl)
  private defineMap = new Map<string, any>();

  // 3. 共享节点表: SharedFuncDecl.name -> NodeID
  private sharedNodeMap = new Map<string, string>();

  // 4. Anchor 表: BranchId -> 目标 NodeID (用于非 0 跳转)
  // 这是全局的或者 Block 级的，取决于 Anchor 的作用域，通常 IR 中 Anchor ID 是唯一的
  private anchorMap = new Map<BranchId, string>();

  // 5. 跳转堆栈: 用于处理 Jump(0)
  // 当进入一个 CallNode 的 branch 时，将该 CallNode 的后继节点 ID 压栈
  private jumpTargetStack: string[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  // === 临时变量 ===

  _activeAnchorId?: BranchId;
  _pendingNextNodeAnchor?: string;

  // === 初始化与预加载 ===

  /** 加载模块中的 DefineDecl, 视为全局常量 */
  public loadModuleDefines(module: IR_GraphModule) {
    module.defines.forEach(def => {
      // 假设 default.value 存储了具体值
      this.defineMap.set(def.name, def.default);
    });
  }

  // === 符号表管理 (Variables) ===

  /** 注册一个产生数据的变量源 */
  public registerVar(name: string, nodeId: string, port: string, type: NodeType) {
    // 允许覆盖 (Shadowing)，或者根据需求抛错
    this.varMap.set(name, { nodeId, port, type });
  }

  /** 查找变量源 */
  public resolveVar(name: string): SourceInfo | undefined {
    return this.varMap.get(name);
  }

  /** 查找 Define 常量 */
  public resolveDefine(name: string): any | undefined {
    return this.defineMap.get(name);
  }

  // === 共享节点管理 (Shared Nodes) ===

  public registerSharedNode(name: string, nodeId: string) {
    this.sharedNodeMap.set(name, nodeId);
  }

  public getSharedNode(name: string): string | undefined {
    return this.sharedNodeMap.get(name);
  }

  // === 控制流/跳转管理 (Flow & Jumps) ===

  /** 注册 Anchor 的实际位置 */
  public registerAnchor(id: BranchId, nodeId: string) {
    this.anchorMap.set(id, nodeId);
  }

  public resolveAnchor(id: BranchId): string | undefined {
    return this.anchorMap.get(id);
  }

  /** 进入分支：压入最近父级的后继节点 ID */
  public pushJumpTarget(nodeId: string) {
    this.jumpTargetStack.push(nodeId);
  }

  /** 离开分支 */
  public popJumpTarget() {
    this.jumpTargetStack.pop();
  }

  /** 获取 Jump(0) 的目标 */
  public getCurrentJumpTarget(): string | undefined {
    if (this.jumpTargetStack.length === 0) return undefined;
    return this.jumpTargetStack[this.jumpTargetStack.length - 1];
  }

  // === 类型系统辅助 (Type Helper) ===

  /**
   * 核心类型推导包装器
   * 1. 调用 solve_identifier 推导函数签名和返回类型
   * 2. 处理可能的类型不匹配警告
   * @returns 包含解析后的函数标识符、参数名列表、返回类型
   */
  public solveFunction(
    calleeName: string,
    argTypes: NodeType[],
    contextInfo: string = ""
  ): { identifier: string, argPortNames: string[], returnType: NodeType } {

    // 1. 替换 UNK 类型，避免推导器崩溃 (可选)
    // const safeArgTypes = argTypes.map(t => t === UNK_TYPE ? "ANY" : t);

    // 2. 调用外部推导
    let result;
    try {
      result = solve_identifier(calleeName, argTypes);
    } catch (e) {
      console.warn(`[TypeSolver] Failed to solve '${calleeName}' at ${contextInfo}:`, e);
      // Fallback
      return {
        identifier: calleeName,
        argPortNames: argTypes.map((_, i) => `arg${i}`),
        returnType: UNK_TYPE
      };
    }

    return {
      identifier: result.identifier,
      argPortNames: result.args,
      returnType: result.return_type
    };
  }

  /**
   * 检查类型一致性，不一致则打印警告
   * @param declared 声明/期望的类型
   * @param actual 实际推导出的类型
   * @param varName 变量名用于日志
   */
  public checkTypeMatch(declared: NodeType | undefined | null, actual: NodeType, varName: string) {
    if (!declared) return; // 无声明则跳过
    if (type_equal(actual, UNK_TYPE)) return; // 实际类型未知，无法检查

    if (!type_equal(declared, actual)) {
      console.warn(
        `[TypeWarning] Type mismatch for '${varName}'. Declared: ${declared}, Actual: ${actual}. Trusting declaration.`
      );
    }
  }

  /**
   * 安全获取类型：如果 strictType 存在则使用它（覆盖 actual），否则使用 actual
   */
  public resolveFinalType(declared: NodeType | undefined | null, actual: NodeType): NodeType {
    if (declared) return declared;
    return actual;
  }
}