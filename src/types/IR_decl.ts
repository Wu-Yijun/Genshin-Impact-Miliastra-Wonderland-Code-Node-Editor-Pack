import type { NodeType } from "../../utils/gia_gen/nodes.ts";
import { NodeVar } from "./class.ts";
import { IRBase } from "./types.ts";

/** 声明从其他文件导入可复用的组件或纯函数
 * ```ts
 *  import { ComponentName, lambda_name } from "file_name";
 * ```
 * */
export interface ImportDecl extends IRBase {
  kind: "import";
  file_name: string;
  components: string[];
  lambdas: string[];
  defines: string[];
}

/** 全局声明和定义 (全部文件可用)
 * ```ts
 *  declare global {
 *    // StructDecls
 *    // GlobalVarDecls
 *    // TimerDecls
 *    // SignalDecls
 *  }
 * ```
 * */
export interface GlobalDecl extends IRBase {
  kind: "global";
  structs: StructDecl[];
  globals: GlobalVarDecl[];
  timers: TimerDecl[];
  signals: SignalDecl[];
}

/** 声明自定义数据结构
 * ```ts
 *  interface StructName {
 *    name: type = defaultValue;
 *  }
 * ```
 * */
export interface StructDecl extends IRBase {
  kind: "struct";
  name: string;
  fields: {
    name: string;
    type: NodeType;
    default: NodeVar | null;
  }[];
}

/** 声明实体的全局变量 (每个实体一个实例, 所有节点图可访问)
 * ```ts
 *  namespace Self { 
 *    const varName: type = defaultValue;
 *  }
 * ```
 * */
export interface GlobalVarDecl extends IRBase {
  kind: "globalVar";
  name: string;
  type: NodeType;
  default: NodeVar | null;
}


/** 声明全局计时器
 * ```ts
 *  namespace Timer { 
 *    const five_second: CountDown<5>;
 *    const time: Count<10>;
 *  }
 * ```
 * */
export interface TimerDecl extends IRBase {
  kind: "timer";
  name: string;
  time: number;
  countdown: boolean;
}

/** 声明全局可发送和接收的信号
 * ```ts
 *  namespace Signal { 
 *    function signal_name(args: types): Signal;
 *  }
 * ```
 * */
export interface SignalDecl extends IRBase {
  kind: "signal";
  name: string;
  params: { name: string; type: NodeType }[];
}


/** 声明节点图变量 (每个实体的每个节点图一个实例)
 * ```ts
 *  declare namespace node { 
 *    export const varName: type = defaultValue;
 *  }
 * ```
 * */
export interface NodeVarDecl extends IRBase {
  kind: "nodeVar";
  name: string;
  type: NodeType;
  default: NodeVar;
  export: boolean;
}

/** 声明临时变量 (每个触发树每次触发重新创建实例)
 * ```ts
 *  const _var_name: type = defaultValue;
 * ```
 * */
export interface LocalVarDecl extends IRBase {
  kind: "localVar";
  name: string;
  type: NodeType;
  default: NodeVar;
}

/** 会在编译时自动替换, 类似 C 的 #define 宏
 * ```ts
 *  const VAR_NAME: type = defaultValue;
 * ```
 * */
export interface DefineDecl extends IRBase {
  kind: "define";
  name: string;
  type: NodeType;
  default: NodeVar;
}