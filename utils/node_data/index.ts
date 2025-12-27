

import { CONCRETE_MAP } from "./concrete_map.ts";
import { ENUM_ID, ENUM_VALUE, ENUM_ID_CLIENT } from "./enum_id.ts";
import { TYPES_LIST } from "./types_list.ts";
import { NODE_ID } from "./node_id.ts";

import * as helper from "./helpers.ts";
export { helper };

export {
  /** 不同节点 id 不同端口对应的 concreteId - type 查找表.
   * 
   * 可用的函数有: 
   * - get_concrete_index: 根据节点 id 和端口 kind, type_id 获取 indexOfConcrete 索引
   * - is_concrete_pin: 判断某个节点的端口是否是 concreteId 相关端口(不是则应使用 indexOfConcrete = 0)
   * - get_concrete_map: 获取某节点端口的全部类型的 concreteId 查找表
   * - get_concrete_type: 根据节点 id, 端口 kind 和 indexOfConcrete 获取 type id
   * - stringify_concrete_map: 将整个查找表序列化为字符串保存
   * - parse_concrete_map: 从字符串解析出查找表
   */
  CONCRETE_MAP,
  ENUM_ID,
  ENUM_VALUE,
  ENUM_ID_CLIENT,
  TYPES_LIST,
  NODE_ID,
};

export { DATA } from "./data.ts";