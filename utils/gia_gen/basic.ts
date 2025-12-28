import type {
  GraphNode,
  NodeConnection,
  NodePin,
  ComplexValueStruct,
  Root,
  VarBase,
  VarBase_ItemType,
  Comments,
  GraphVariable,
} from "../protobuf/gia.proto.ts";
import {
  NodeGraph_Id_Class,
  NodeGraph_Id_Kind,
  NodeGraph_Id_Type,
  NodePin_Index_Kind,
  NodeProperty_Type,
  GraphUnit_Id_Class,
  GraphUnit_Which,
  VarBase_Class,
  VarType,
  GraphUnit_Id_Type,
  VarBase_ItemType_ServerType_Kind,
  VarBase_ItemType_ClassBase,
} from "../protobuf/gia.proto.ts";
import { get_id, get_type, type NodePins, type NodeType } from "./nodes.ts";
import { counter_dynamic_id, counter_index, randomInt } from "./utils.ts";
import { ENUM_ID } from "../node_data/enum_id.ts";
import type { AnyType, GraphVar } from "./graph.ts";
import { assert, todo } from "../utils.ts";
import { GAME_VERSION } from "../node_data/consts.ts";

/**
 * GraphBody_ 接口定义了构建图的基本参数
 */
export interface GraphBody_ {
  /** 唯一标识符 */
  uid: number;
  /** 图的 ID */
  graph_id: number;
  /** 图文件的ID，可选, 通常是 graph_id + i */
  file_id?: number;
  /** 图的名称，可选 */
  graph_name?: string;
  /** 图中包含的节点列表，可选 */
  nodes?: GraphNode[];
  comments?: Comments[];
  graphValues?: GraphVariable[];
}
/**
 * 根据提供的参数构建一个图对象 (Root)
 *
 * 参数列表：
 * - body: {
 *     uid: number;
 *     graph_id: number;
 *     graph_name?: string;
 *     nodes?: GraphNode[];
 *   }
 *
 * @param body 构建图所需的参数
 * @returns Root 图对象
 */
export function graph_body(body: GraphBody_): Root {
  const graph_name = body.graph_name ??
    "Graph " + randomInt(8).toString() + ".gia";
  const file_name = graph_name.replaceAll(/[^a-zA-Z0-9_.]+/gs, "_").replaceAll(
    /[A-Z]/g,
    (m) => m.toLowerCase(),
  );
  const timestamp = Math.floor(Date.now() / 1000);
  const file_id = body.file_id ?? body.graph_id + counter_dynamic_id.value;
  const filePath = `${body.uid}-${timestamp}-${file_id}-\\${file_name}`;
  const gia: Root = {
    graph: {
      id: {
        class: GraphUnit_Id_Class.Basic,
        type: GraphUnit_Id_Type.ServerGraph,
        id: body.graph_id,
      },
      relatedIds: [],
      name: graph_name,
      which: GraphUnit_Which.EntityNode,
      graph: {
        inner: {
          graph: {
            id: {
              class: NodeGraph_Id_Class.UserDefined,
              type: NodeGraph_Id_Type.BasicNode,
              kind: NodeGraph_Id_Kind.NodeGraph,
              id: body.graph_id,
            },
            name: graph_name,
            nodes: body.nodes ?? [],
            compositePins: [],
            affiliations: [],
            comments: body.comments ?? [],
            graphValues: body.graphValues ?? [],
          },
        },
      },
    },
    accessories: [],
    filePath,
    gameVersion: GAME_VERSION,
  };
  return gia;
}

/**
 * NodeBody_ 接口定义了构建节点的基本参数
 */
export interface NodeBody_ {
  /** 通用 ID */
  generic_id: number;
  /** 具体 ID */
  concrete_id: number;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 是否抖动位置 */
  pos_jitter?: boolean;
  /** 节点的引脚列表 */
  pins: NodePin[];
  /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
  unique_index?: number;
  comment?: Comments;
}

/**
 * 根据提供的参数构建一个节点对象 (GraphNode)
 *
 * 参数列表：
 * - body: {
 *     generic_id: number;
 *     concrete_id: number;
 *     x: number;
 *     y: number;
 *     pins: NodePin[];
 *     unique_index?: number;
 *   }
 *
 * @param body 构建节点所需的参数
 * @returns GraphNode 节点对象
 */
export function node_body(body: NodeBody_): GraphNode {
  const nodeIndex = body.unique_index ?? counter_index.value;
  const node: GraphNode = {
    nodeIndex: nodeIndex,
    genericId: {
      class: NodeGraph_Id_Class.SystemDefined,
      type: NodeProperty_Type.Server,
      kind: NodeGraph_Id_Kind.SysCall,
      nodeId: body.generic_id,
    },
    concreteId: {
      class: NodeGraph_Id_Class.SystemDefined,
      type: NodeProperty_Type.Server,
      kind: NodeGraph_Id_Kind.SysCall,
      nodeId: body.concrete_id,
    },
    pins: body.pins,
    comments: body.comment,
    x: body.x * 300 + (body.pos_jitter ?? true ? Math.random() * 20 : 0), // shakings
    y: body.y * 200 + (body.pos_jitter ?? true ? Math.random() * 20 : 0), // shakings
    usingStruct: [],
  };
  return node;
}

/**
 * PinBody_ 接口定义了构建引脚的基本参数
 */
export interface PinBody_ {
  /** 引脚类型 (输入/输出) */
  kind: NodePin_Index_Kind;
  /** 引脚索引 */
  index: number;
  /** 引脚的值，可选 */
  value?: VarBase;
  /** 引脚的数据类型 */
  type: VarType;
  /** 引脚的连接 */
  connects?: NodeConnection[];
}
/**
 * 根据提供的参数构建一个引脚对象 (NodePin)
 *
 * 参数列表：
 * - body: {
 *     kind: NodePin_Index_Kind;
 *     index: number;
 *     value?: VarBase;
 *     type: VarType;
 *   }
 *
 * @param body 引脚参数
 * @returns NodePin 引脚对象
 */
export function pin_body(body: PinBody_): NodePin {
  const pin: NodePin = {
    i1: {
      kind: body.kind,
      index: body.index,
    },
    i2: {
      kind: body.kind,
      index: body.index,
    },
    value: body.value ?? {} as any, // may cause unpredictable behavior
    type: body.type,
    connects: body.connects ?? [],
  };
  return pin;
}

export interface PinFlowBody_ {
  /** 引脚索引 */
  index: number;
  /** 引脚的连接 */
  connects: NodeConnection[];
}
export function pin_flow_body(body: PinFlowBody_): NodePin {
  const pin: NodePin = {
    i1: {
      kind: NodePin_Index_Kind.OutFlow,
      index: body.index,
    },
    i2: {
      kind: NodePin_Index_Kind.OutFlow,
      index: body.index,
    },
    value: undefined as any,
    type: undefined as any,
    connects: body.connects,
  };
  return pin;
}

/**
 * PinValue_ 接口定义了构建引脚值的参数
 */
export interface PinValue_ {
  /** 具体类型的索引，可选 */
  indexOfConcrete?: number;
  /** 基础值，可选 */
  value?: VarBase;
  /** 值包装器，可选 */
  wrapper?: ComplexValueStruct;
}
/**
 * 构建一个值对象 VarBase（用于引脚 value）
 *
 * 参数列表：
 * - body: {
 *     indexOfConcrete?: number;
 *     value?: VarBase;
 *     wrapper?: ConcreteBaseValueValue_Wrapper;
 *   }
 *
 * @param body 值参数
 * @returns VarBase 引脚值对象
 */
export function wrapped_pin_value(body: PinValue_): VarBase {
  const value: VarBase = {
    class: VarBase_Class.ConcreteBase,
    alreadySetVal: true,
    bConcreteValue: {
      indexOfConcrete: body.indexOfConcrete ?? 0,
      value: body.value ?? {} as any,
      structs: body.wrapper,
    },
  };
  return value;
}

/**
 * 根据变量类型构建 ItemType 对象
 *
 * 参数列表：
 * - type: VarType
 *
 * @param type 变量类型
 * @returns VarBase_ItemType
 */
export function item_type(type: VarType): VarBase_ItemType {
  return {
    classBase: 1,
    type_server: {
      type: type,
      kind: 0,
    },
  };
}

/**
 * EnumValue_ 接口定义了枚举值的参数
 */
export interface EnumValue_ {
  /** 枚举值 */
  value: number;
}
/**
 * 构建枚举类型值 VarBase
 *
 * 参数列表：
 * - body: { value: number }
 *
 * @param body 枚举值
 * @returns VarBase
 */
export function enum_value(body: EnumValue_) {
  const value: VarBase = {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: item_type(VarType.EnumItem),
    bEnum: { val: body.value },
  };
  return value;
}

/**
 * MapPinBody_ 接口定义了构建 Map 类型引脚的参数
 */
export interface MapPinBody_ {
  /** 引脚类型 (输入/输出) */
  kind: NodePin_Index_Kind;
  /** 引脚索引 */
  index: number;
  /** 键的类型 */
  key_type: VarType;
  /** 值的类型 */
  value_type: VarType;
  /** 具体类型的索引，可选 */
  indexOfConcrete?: number;
  /** 引脚的连接 */
  connects?: NodeConnection[];
  value?: AnyType;
}
/**
 * 构建 Map 类型引脚
 *
 * 参数列表：
 * - body: {
 *     kind: NodePin_Index_Kind;
 *     index: number;
 *     key_type: VarType;
 *     value_type: VarType;
 *     indexOfConcrete?: number;
 *   }
 *
 * @param body Map 引脚参数
 * @returns NodePin
 */
export function map_pin_body(body: MapPinBody_): NodePin {
  const map_pair = {
    key: body.key_type,
    value: body.value_type,
    structId: 0,
  };
  const value: VarBase = {
    class: VarBase_Class.MapBase,
    alreadySetVal: false,
    itemType: {
      classBase: VarBase_ItemType_ClassBase.Server,
      type_server: {
        type: VarType.Dictionary,
        kind: VarBase_ItemType_ServerType_Kind.Pair,
        items: structuredClone(map_pair),
      },
    },
    bMap: { mapPairs: [] },
  };
  if (body.value !== undefined) {
    assert(Array.isArray(body.value), "Map pin body value must be an array of [key, value] pairs!");
    assert(body.value.every(v => Array.isArray(v) && v.length === 2), "Map pin body value must be an array of [key, value] pairs!");
    todo("Implement default map pin body value extraction");
  }
  const wrapper: ComplexValueStruct = {
    class: 1,
    inner: {
      wrapper: {
        class: VarBase_Class.MapBase,
        mapPair: {
          key: body.key_type,
          value: body.value_type,
          structId: 0,
        },
      },
    },
  };
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: VarType.Dictionary,
    value: wrapped_pin_value({ value, wrapper, indexOfConcrete: body.indexOfConcrete }),
    connects: body.connects,
  });
}

/**
 * ListPinBody_ 接口定义了构建 List 类型引脚的参数
 */
export interface ListPinBody_ {
  /** 具体类型的索引，可选 */
  indexOfConcrete?: number;
  /** 引脚类型 (输入/输出) */
  kind: NodePin_Index_Kind;
  /** 引脚索引 */
  index: number;
  /** 列表中元素的类型 */
  value_type: VarType;
  /** 引脚的连接 */
  connects?: NodeConnection[];
  value?: AnyType;
}
/**
 * 构建 List 类型引脚
 *
 * 参数列表：
 * - body: {
 *     indexOfConcrete?: number;
 *     kind: NodePin_Index_Kind;
 *     index: number;
 *     value_type: VarType;
 *   }
 *
 * @param body List 引脚参数
 * @returns NodePin
 */
export function list_pin_body(body: ListPinBody_): NodePin {
  const value: VarBase = {
    class: VarBase_Class.ArrayBase,
    alreadySetVal: true,
    itemType: item_type(body.value_type),
    bArray: { entries: [] },
  };
  if (body.value !== undefined) {
    assert(Array.isArray(body.value), "List pin body value must be an array!");
    const v_t = get_type(body.value_type);
    assert(v_t.t === "l");
    const item_type = get_id(v_t.i) as VarType;
    for (let i = 0; i < body.value.length; i++) {
      value.bArray!.entries.push(simple_value_var(item_type, body.value[i]));
    }
  }
  const val = wrapped_pin_value({
    indexOfConcrete: body.indexOfConcrete,
    value: value,
  });
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: body.value_type,
    value: val,
    connects: body.connects,
  });
}

/**
 * 构建整数值 VarBase
 *
 * 参数列表：
 * - val: number
 *
 * @param val 整数值
 * @returns VarBase
 */
export function int_pin_body(val?: number): VarBase {
  return {
    class: VarBase_Class.IntBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Integer),
    bInt: val === undefined ? undefined : { val },
  };
}
/**
 * 构建布尔值 VarBase
 *
 * 参数列表：
 * - val: boolean | number
 *
 * @param val 布尔或 0/1
 * @returns VarBase
 */
export function bool_pin_body(val?: boolean | number): VarBase {
  return {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Boolean),
    bEnum: val === undefined ? undefined : { val: val ? 1 : 0 },
  };
}
/**
 * 构建 ID 值 VarBase
 *
 * 参数列表：
 * - val: number;
 * - type?: VarType (默认 GUID)
 *
 * @param val ID 数值
 * @param type ID 类型
 * @returns VarBase
 */
export function id_pin_body(
  val?: number,
  type: VarType = VarType.GUID,
): VarBase {
  return {
    class: VarBase_Class.IdBase,
    alreadySetVal: true,
    itemType: item_type(type),
    bId: val === undefined ? undefined : { val },
  };
}
/**
 * 构建浮点数值 VarBase
 *
 * 参数列表：
 * - val: number
 *
 * @param val 浮点数
 * @returns VarBase
 */
export function float_pin_body(val?: number): VarBase {
  return {
    class: VarBase_Class.FloatBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Float),
    bFloat: val === undefined ? undefined : { val },
  };
}
/**
 * 构建字符串值 VarBase
 *
 * 参数列表：
 * - val: string
 *
 * @param val 字符串
 * @returns VarBase
 */
export function string_pin_body(val?: string): VarBase {
  return {
    class: VarBase_Class.StringBase,
    alreadySetVal: true,
    itemType: item_type(VarType.String),
    bString: val === undefined ? undefined : { val },
  };
}
/**
 * 构建向量值 VarBase
 *
 * 参数列表：
 * - vec: number[]  (长度至少 3)
 *
 * @param vec 向量 [x,y,z]
 * @returns VarBase
 */
export function vector_pin_body(vec?: number[]): VarBase {
  return {
    class: VarBase_Class.VectorBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Vector),
    bVector: vec === undefined ? {} as any : {
      val: {
        x: vec[0],
        y: vec[1],
        z: vec[2],
      },
    },
  };
}

export function simple_value_var(var_type: VarType, value?: AnyType, fill_undefined?: number): VarBase {
  switch (var_type) {
    case VarType.EnumItem:
      assert(value === undefined || typeof value === "number");
      return enum_value({ value: value ?? (fill_undefined as any) });
    case VarType.Integer:
      assert(value === undefined || typeof value === "number");
      return int_pin_body(value ?? fill_undefined);
    case VarType.GUID:
    case VarType.Configuration:
    case VarType.Entity:
    case VarType.Faction:
    case VarType.Prefab:
      assert(value === undefined || typeof value === "number");
      return id_pin_body(value ?? fill_undefined);
    case VarType.Boolean:
      assert(value === undefined || typeof value === "boolean" || typeof value === "number");
      return bool_pin_body(value ?? fill_undefined);
    case VarType.Float:
      assert(value === undefined || typeof value === "number");
      return float_pin_body(value ?? fill_undefined);
    case VarType.String:
      assert(value === undefined || typeof value === "string");
      return string_pin_body(value ?? fill_undefined?.toString());
    case VarType.Vector:
      assert(
        value === undefined ||
        (Array.isArray(value) && value.length == 3 && value.every((v) => typeof v === "number"))
      );
      return vector_pin_body(value ?? (fill_undefined === undefined ? undefined : [fill_undefined, fill_undefined, fill_undefined]));
  }
  return todo("Not implemented AnyPinBody for type " + var_type);
}

export function all_value_var(var_type: NodeType, value?: AnyType, fill_undefined?: number): VarBase {
  const id = get_id(var_type) as VarType;
  switch (id) {
    case VarType.EnumItem:
    case VarType.Integer:
    case VarType.GUID:
    case VarType.Configuration:
    case VarType.Entity:
    case VarType.Faction:
    case VarType.Prefab:
    case VarType.Boolean:
    case VarType.Float:
    case VarType.String:
    case VarType.Vector:
      return simple_value_var(id, value, fill_undefined);
  }
  if (var_type.t === "l") {
    const ret: VarBase = {
      class: VarBase_Class.ArrayBase,
      alreadySetVal: true,
      itemType: item_type(id),
      bArray: { entries: [] },
    }
    if (value !== undefined && typeof value === "object" && value instanceof Array) {
      for (const v of value) {
        ret.bArray!.entries.push(all_value_var(var_type.i, v));
      }
    }
    return ret;
  }
  if (var_type.t === "d") {
    const ret: VarBase = {
      class: VarBase_Class.MapBase,
      alreadySetVal: true,
      itemType: item_type(id),
      bMap: {
        mapPairs: []
      },
    }
    if (value !== undefined && typeof value === "object" && value instanceof Array) {
      for (const v of value) {
        if (typeof v === "object" && v instanceof Array) {
          const key = v[0];
          const val = v[1];
          const map_pair: VarBase = {
            class: VarBase_Class.MapPair,
            alreadySetVal: true,
            itemType: item_type(id),
            bMapPair: {
              key: all_value_var(var_type.k, key),
              value: all_value_var(var_type.v, val),
            }
          };
          ret.bMap!.mapPairs.push(map_pair);
        }
      }
    }
    return ret;
  }
  return todo("Not implemented AnyPinBody for type " + var_type);
}

/**
 * AnyPinBody_ 接口定义了构建任意类型引脚的参数
 */
export interface NodeTypePinBody_ {
  /** 是否是多重类型反射引脚/固定引脚 */
  reflective?: boolean;
  /** 引脚类型 (输入/输出) */
  kind: NodePin_Index_Kind;
  /** 引脚索引 */
  index: number;
  /** 引脚的数据类型 (VarType)，例如 Integer / Float / Dictionary 等 */
  type: NodeType;
  /** 具体类型的索引，可选，用于多态类型的选择 */
  indexOfConcrete?: number;
  /** 引脚的初始值，可选，不同类型对应不同值结构 */
  value?: AnyType;
  /** 对空的基本类型填入非空的填入 number */
  fill_undefined?: number;
  /** 上游连接引脚 */
  connects?: NodeConnection[];
  /** 下游连接节点 */
  flows?: NodeConnection[];
}
/**
 * 构建任意类型引脚（自动根据 VarType 分发）
 *
 * 参数列表：
 * - body: {
 *     kind: NodePin_Index_Kind;
 *     index: number;
 *     type: VarType;
 *     key_val_type?: [VarType, VarType];
 *     indexOfConcrete?: number;
 *     value?: any;
 *   }
 *
 * @param body 任意引脚参数
 * @returns NodePin
 */
export function node_type_pin_body(body: NodeTypePinBody_): NodePin {

  /**
   * 当引脚类型为字典(Dictionary)时需要提供的键值类型对
   * [key_type, value_type]
   * 仅在 type === VarType.Dictionary 时有效
   */
  let key_val_type: [VarType, VarType] | undefined;
  if (body.type.t === "d") {
    key_val_type = [get_id(body.type.k), get_id(body.type.v)] as any;
  }
  let var_type: VarType = get_id(body.type) as VarType;
  if (body.type.t === "e") {
    switch (body.type.e) {
      case ENUM_ID.VariableSnapshot:
        var_type = VarType.VariableSnapshot;
        break;
      case ENUM_ID.LocalVariable:
        var_type = VarType.LocalVariable;
        break;
    }
  }

  switch (var_type) {
    case VarType.Dictionary:
      assert(
        key_val_type !== undefined,
        "Dict Type should pass parameter `key_val_type`!",
      );
      return map_pin_body({
        kind: body.kind,
        index: body.index,
        key_type: key_val_type![0],
        value_type: key_val_type![1],
        indexOfConcrete: body.indexOfConcrete,
        connects: body.connects,
        value: body.value,
      });
    case VarType.BooleanList:
    case VarType.ConfigurationList:
    case VarType.EntityList:
    case VarType.FactionList:
    case VarType.FloatList:
    case VarType.GUIDList:
    case VarType.IntegerList:
    case VarType.PrefabList:
    case VarType.StringList:
    case VarType.StructList:
    case VarType.VectorList:
      return list_pin_body({
        indexOfConcrete: body.indexOfConcrete,
        kind: body.kind,
        index: body.index,
        value_type: var_type,
        connects: body.connects,
        value: body.value,
      });
    case VarType.LocalVariable:
    case VarType.VariableSnapshot:
      return pin_body({
        kind: body.kind,
        index: body.index,
        type: var_type,
        connects: body.connects,
      });
  }
  const value = body.kind === 3 ? all_value_var(body.type, body.value, body.fill_undefined) : undefined;
  if (body.reflective === true) {
    return pin_body({
      kind: body.kind,
      index: body.index,
      type: var_type,
      value: wrapped_pin_value({
        indexOfConcrete: body.indexOfConcrete,
        value: value,
      }),
      connects: body.connects,
    });
  } else {
    return pin_body({
      kind: body.kind,
      index: body.index,
      type: var_type,
      value: value,
      connects: body.connects,
    });
  }
}

// /**
//  * NodeTypeNodeBody_ 接口定义了构建基于 NodeType 的节点的参数
//  */
// export interface NodeTypeNodeBody_ {
//   /** 节点类型定义，包括输入/输出引脚类型列表 */
//   pins: NodePins;
//   /** 类型到具体实例映射表，用于确定具体类型索引，可选，默认使用 node.id 检索 */
//   map?: ConcreteMap;
//   /** 节点的泛类 ID，可选，默认使用 node.id */
//   generic_id?: number;
//   /** 节点的具体 ID，可选，默认使用 node.id */
//   concrete_id?: number;
//   /** 节点的 X 坐标 */
//   x?: number;
//   /** 节点的 Y 坐标 */
//   y?: number;
//   /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
//   unique_index?: number;
// }
// /**
//  * 根据 NodeType 构建完整 GraphNode（自动构建 pins&类型映射）
//  *
//  * 参数列表：
//  * - body: {
//  *     pins: NodePins;
//  *     map?: TypeConcreteMap;
//  *     generic_id?: number;
//  *     concrete_id?: number;
//  *     x?: number;
//  *     y?: number;
//  *   }
//  *
//  * @param body NodeType 节点参数
//  * @returns GraphNode
//  */
// export function node_type_node_body(body: NodeTypeNodeBody_): GraphNode {
//   const generic_id = body.generic_id ?? any_id_to_gid(body.pins.id);
//   const concrete_id = body.concrete_id ?? any_id_to_cid(body.pins.id);
//   const is_server = typeof body.pins.id === "number";

//   const pins: NodePin[] = [];
//   body.pins.inputs.forEach((p, i) => {
//     if (p === undefined) return;
//     pins.push(node_type_pin_body({
//       kind: NodePin_Index_Kind.InParam,
//       index: i,
//       type: p,
//       indexOfConcrete: get_index_of_concrete(generic_id, true, i,),
//       reflective: false
//     }));
//   });
//   body.pins.outputs.forEach((p, i) => {
//     if (p === undefined) return;
//     pins.push(node_type_pin_body({
//       kind: NodePin_Index_Kind.OutParam,
//       index: i,
//       type: p,
//       indexOfConcrete: get_index_of_concrete(generic_id, 4, i, get_id(p), body.map),
//       reflective: false
//     }));
//   });
//   return node_body({
//     pins,
//     generic_id: generic_id as any,
//     concrete_id: concrete_id as any,
//     x: body.x ?? 0,
//     y: body.y ?? 0,
//     unique_index: body.unique_index,
//   });
// }

/** ⚠️ Warning: Do not use in productive environment.
 * @deprecated Create an empty frame for genshin to auto derive pin contents. */
export interface NodeTypePinBodyEmpty_ {
  /** 引脚类型 (输入/输出) */
  kind: number;
  /** 引脚索引 */
  index: number;
  /** 具体类型的索引，用于支持类型实例化 */
  indexOfConcrete: number;
  /** careful. this is type rather than indexOfConcrete */
  map_type?: [number, number];
}
export function node_type_pin_body_frame(pin: NodeTypePinBodyEmpty_): NodePin {
  if (pin.map_type === undefined) {
    return {
      i1: { kind: pin.kind as any, index: pin.index },
      i2: { kind: pin.kind as any, index: pin.index },
      value: {
        class: VarBase_Class.ConcreteBase,
        alreadySetVal: true,
        bConcreteValue: {
          indexOfConcrete: pin.indexOfConcrete,
          value: {} as any,
        },
      },
      type: 0,
      connects: [],
    };
  }
  return {
    i1: { kind: pin.kind as any, index: pin.index },
    i2: { kind: pin.kind as any, index: pin.index },
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      bConcreteValue: {
        indexOfConcrete: pin.indexOfConcrete,
        value: {} as any,
        structs: {
          class: 1,
          inner: {
            wrapper: {
              class: VarBase_Class.MapBase,
              mapPair: { key: pin.map_type[0], value: pin.map_type[1] } as any,
            },
          },
        },
      },
    },
    type: 0,
    connects: [],
  };
}
/** ⚠️ Warning: Do not use in productive environment.
 * @deprecated Create an empty frame for genshin to auto derive pin contents
 * therefore we can get a full id-reflect list
 * @param id 泛类 id
 * @param pins 引脚类型列表, number: 普通引脚, [number, number]: 字典引脚
 * @returns
 */
export function node_type_node_body_empty(
  id: number,
  pins: NodeTypePinBodyEmpty_[],
  x: number = 0,
  y: number = 0,
) {
  return node_body({
    pins: pins.map(node_type_pin_body_frame),
    generic_id: id,
    concrete_id: id,
    x: x,
    y: y,
  } as any);
}





export function node_connect_from(from: number, from_index: number): NodeConnection {
  return {
    id: from,
    connect: {
      kind: NodePin_Index_Kind.OutParam,
      index: from_index,
    },
    connect2: {
      kind: NodePin_Index_Kind.OutParam,
      index: from_index,
    },
  };
}

/** flow connects to downstream nodes */
export function node_connect_to(to: number, to_index: number): NodeConnection {
  return {
    id: to,
    connect: {
      kind: NodePin_Index_Kind.InFlow,
      index: to_index,
    },
    connect2: {
      kind: NodePin_Index_Kind.InFlow,
      index: to_index,
    },
  };
}


export function encode_node_graph_var(v: GraphVar): GraphVariable {
  return {
    name: v.name,
    type: get_id(v.type) as VarType,
    values: all_value_var(v.type, v.val),
    exposed: v.exposed,
    structId: 0,
    keyType: v.type.t === "d" ? get_id(v.type.k) as VarType : 6,
    valueType: v.type.t === "d" ? get_id(v.type.v) as VarType : 6
  };
}