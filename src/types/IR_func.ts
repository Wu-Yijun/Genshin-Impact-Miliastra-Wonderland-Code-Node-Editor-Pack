import { NodeType } from "../../utils/gia_gen/nodes.ts";
import { LocalVarDecl } from "./IR_decl.ts";
import { IR_ExecutionBlock } from "./IR_node.ts";
import { Token } from "./parser.ts";
import { BranchId, IRBase } from "./types.ts";

/** 声明共享复合节点
 * ```ts
 *  const sharedFuncName = Shared(ComponentName)
 *  const sharedFuncName = Shared(ComponentName, PortId)
 * ```
 * */
export interface SharedFuncDecl extends IRBase {
  kind: "shared";
  name: string;
  component_name: string;
  port: BranchId | null;
}

/** 声明纯函数
 * ```ts
 *  const lambdaName = (arg_name: type) => {
 *    body;
 *    return ret;
 *  }
 * ```
 *  - `ret` can be:
 *    - value
 *    - value list
 *    - key-value Records
 */
export interface LambdaDecl extends IRBase {
  kind: "lambda";
  name: string;
  args: {
    name: string;
    type: NodeType;
  }[];
  body: Token[];
  returns: {
    name: string;
    type: NodeType;
  }[];
}

/** 声明包含完整执行节点的子图，拥有自定义的入口和出口。
 *  ```ts
 *  function ComponentName(arg_name: type) {
 *    // LocalVarDecl
 *    // IR_ExecutionBlocks
 *    return ExecFun<{out_name: type}>(outBranchId)
 *  }
 *  ```
 */
export interface ComponentDecl extends IRBase {
  kind: "component";
  name: string;
  args: {
    name: string;
    type: NodeType;
  }[];
  locals: LocalVarDecl[];
  blocks: IR_ExecutionBlock[];
  returns: {
    name: string;
    type: NodeType;
  }[];
  inBranchIds: BranchId[];
  outBranchIds: BranchId[];
}

