import type {
  GraphNode,
  NodeConnection,
  NodePin,
  ComplexValueStruct,
  Root,
  VarBase,
  VarType,
  ClientVarType,
  VarBase_ItemType,
  Comments,
  GraphVariable,
} from "../protobuf/gia.proto.ts";
import {
  NodePin_Index_Kind,
  VarBase_Class,
  VarBase_ItemType_ServerType_Kind,
  VarBase_ItemType_ClassBase,
  NodeGraph_Id_Kind,
} from "../protobuf/gia.proto.ts";
import { get_id, get_id_client, parse, stringify, type NodeType } from "./nodes.ts";
import { counter_dynamic_id, counter_index, randomInt } from "./utils.ts";
import type { AnyType, GraphVar } from "./graph.ts";
import { assert, todo } from "../utils.ts";
import { GAME_VERSION } from "../node_data/consts.ts";
import type { GraphConst } from "../node_data/consts.ts";
import { get_graph_const } from "../node_data/helpers.ts";

function tid(type: string | NodeType, is_server: true): VarType;
function tid(type: string | NodeType, is_server: false): ClientVarType;
function tid(type: string | NodeType, is_server: boolean, return_type: "number"): number;
function tid(type: string | NodeType, is_server: boolean, _?: "number"): VarType | ClientVarType {
  if (typeof type === "string") {
    type = parse(type);
  }
  if (is_server) {
    return get_id(type) as VarType;
  } else {
    return get_id_client(type) as ClientVarType;
  }
}

/**
 * GraphBody_ 接口定义了构建图的基本参数
 */
export interface GraphBody_ {
  graph_const: GraphConst | string;
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
  const gc = get_graph_const(body.graph_const);
  const timestamp = Math.floor(Date.now() / 1000);
  const file_id = body.file_id ?? body.graph_id + counter_dynamic_id.value;
  const filePath = `${body.uid}-${timestamp}-${file_id}-\\${file_name}`;
  const gia: Root = {
    graph: {
      id: {
        class: gc.Class,
        type: gc.Type,
        id: body.graph_id,
      },
      relatedIds: [],
      name: graph_name,
      which: gc.Which,
      graph: {
        inner: {
          graph: {
            id: {
              class: gc.GraphClass,
              type: gc.GraphType,
              kind: gc.GraphKind,
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
  graph_const: GraphConst | string;
  /** 通用 ID */
  generic_id: number;
  /** 具体 ID, 可选 */
  concrete_id?: number;
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
  const gc = get_graph_const(body.graph_const);
  const nodeIndex = body.unique_index ?? counter_index.value;
  const node: GraphNode = {
    nodeIndex: nodeIndex,
    genericId: {
      class: gc.NodeClass,
      type: gc.NodeType,
      kind: gc.NodeKind,
      nodeId: body.generic_id,
    },
    concreteId: body.concrete_id ? {
      class: gc.NodeClass,
      type: gc.NodeType,
      kind: NodeGraph_Id_Kind.SysCall,
      nodeId: body.concrete_id,
    } : undefined,
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
  type: string;
  is_server: boolean;
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
    value: body.value ?? {} as any,
    type: tid(body.type, body.is_server, "number"),
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
export function item_type(type: string | NodeType, is_server: boolean): VarBase_ItemType {
  if (is_server) {
    const t = typeof type === "string" ? parse(type) : type;
    if (t.t === "d") {
      return {
        classBase: VarBase_ItemType_ClassBase.Server,
        type_server: {
          type: tid(type, is_server),
          kind: VarBase_ItemType_ServerType_Kind.Pair,
          items: {
            key: tid(t.k, is_server),
            value: tid(t.v, is_server),
            structId: 0,
          }
        },
      };
    }
    return {
      classBase: VarBase_ItemType_ClassBase.Server,
      type_server: {
        type: tid(type, is_server),
        kind: 0,
      },
    };
  } else {
    return {
      classBase: VarBase_ItemType_ClassBase.Client,
      type_client: {
        type: tid(type, is_server),
      },
    };
  }
}

/**
 * EnumValue_ 接口定义了枚举值的参数
 */
export interface EnumValue_ {
  /** 枚举值 */
  value?: number;
  type: string;
  is_server: boolean;
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
    itemType: item_type(body.type, body.is_server),
    bEnum: body.value === undefined ? undefined : { val: body.value },
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
  key_type: NodeType;
  /** 值的类型 */
  value_type: NodeType;
  /** 具体类型的索引，可选 */
  indexOfConcrete?: number;
  /** 引脚的连接 */
  connects?: NodeConnection[];
  value?: AnyType;
}
/**
 * 构建 Map 类型引脚(仅限 Server)
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
export function map_pin_body_server(body: MapPinBody_): NodePin {
  const value: VarBase = {
    class: VarBase_Class.MapBase,
    alreadySetVal: false,
    itemType: item_type({ t: "d", k: body.key_type, v: body.value_type }, true),
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
          key: tid(body.key_type, true),
          value: tid(body.value_type, true),
          structId: 0,
        },
      },
    },
  };
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: stringify({ t: "d", k: body.key_type, v: body.value_type }),
    value: wrapped_pin_value({ value, wrapper, indexOfConcrete: body.indexOfConcrete }),
    connects: body.connects,
    is_server: true,
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
  value_type: string;
  /** 引脚的连接 */
  connects?: NodeConnection[];
  value?: AnyType;
  is_server: boolean;
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
    itemType: item_type(body.value_type, body.is_server),
    bArray: { entries: [] },
  };
  if (body.value !== undefined) {
    assert(Array.isArray(body.value), "List pin body value must be an array!");
    const v_t = parse(body.value_type);
    assert(v_t.t === "l");
    const item_type = stringify(v_t.i);
    for (let i = 0; i < body.value.length; i++) {
      value.bArray!.entries.push(simple_value_var(body.is_server, item_type, body.value[i]));
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
    is_server: body.is_server,
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
export function int_pin_body(val: number | undefined, is_server: boolean): VarBase {
  return {
    class: VarBase_Class.IntBase,
    alreadySetVal: true,
    itemType: item_type("Int", is_server),
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
export function bool_pin_body(val: boolean | number | undefined, is_server: boolean): VarBase {
  return {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: item_type("Bol", is_server),
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
  val: number | undefined,
  type: string,
  is_server: boolean,
): VarBase {
  return {
    class: VarBase_Class.IdBase,
    alreadySetVal: true,
    itemType: item_type(type, is_server),
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
export function float_pin_body(val: number | undefined, is_server: boolean): VarBase {
  return {
    class: VarBase_Class.FloatBase,
    alreadySetVal: true,
    itemType: item_type("Flt", is_server),
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
export function string_pin_body(val: string | undefined, is_server: boolean): VarBase {
  return {
    class: VarBase_Class.StringBase,
    alreadySetVal: true,
    itemType: item_type("Str", is_server),
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
export function vector_pin_body(vec: number[] | undefined, is_server: boolean): VarBase {
  return {
    class: VarBase_Class.VectorBase,
    alreadySetVal: true,
    itemType: item_type("Vec", is_server),
    bVector: vec === undefined ? {} as any : {
      val: {
        x: vec[0],
        y: vec[1],
        z: vec[2],
      },
    },
  };
}

export function simple_value_var(is_server: boolean, var_type: string, value?: AnyType, fill_undefined?: number): VarBase {
  if (var_type.startsWith("E<")) {
    // Notice that LocalVariable and VariableSnapshot is also included
    assert(value === undefined || typeof value === "number");
    return enum_value({ value: value ?? fill_undefined, type: var_type, is_server });
  }
  switch (var_type) {
    case "Int":
      assert(value === undefined || typeof value === "number");
      return int_pin_body(value ?? fill_undefined, is_server);
    case "Gid":
    case "Cfg":
    case "Ety":
    case "Fct":
    case "Pfb":
      assert(value === undefined || typeof value === "number");
      return id_pin_body(value ?? fill_undefined, var_type, is_server);
    case "Bol":
      assert(value === undefined || typeof value === "boolean" || typeof value === "number");
      return bool_pin_body(value ?? fill_undefined, is_server);
    case "Flt":
      assert(value === undefined || typeof value === "number");
      return float_pin_body(value ?? fill_undefined, is_server);
    case "Str":
      assert(value === undefined || typeof value === "string");
      return string_pin_body(value ?? fill_undefined?.toString(), is_server);
    case "Vec":
      assert(
        value === undefined ||
        (Array.isArray(value) && value.length == 3 && value.every((v) => typeof v === "number"))
      );
      return vector_pin_body(value ?? (fill_undefined === undefined ? undefined : [fill_undefined, fill_undefined, fill_undefined]), is_server);
  }
  return todo("Not implemented AnyPinBody for type " + var_type);
}

export function all_value_var(var_type: NodeType, is_server: boolean, value?: AnyType, fill_undefined?: number): VarBase {

  if (var_type.t === "e" || var_type.t === "b") {
    return simple_value_var(is_server, stringify(var_type), value, fill_undefined);
  }
  if (var_type.t === "l") {
    const ret: VarBase = {
      class: VarBase_Class.ArrayBase,
      alreadySetVal: true,
      itemType: item_type(var_type.i, is_server),
      bArray: { entries: [] },
    }
    if (value !== undefined && typeof value === "object" && value instanceof Array) {
      for (const v of value) {
        ret.bArray!.entries.push(all_value_var(var_type.i, is_server, v));
      }
    }
    return ret;
  }
  if (var_type.t === "d") {
    assert(is_server);
    const ret: VarBase = {
      class: VarBase_Class.MapBase,
      alreadySetVal: true,
      itemType: item_type(var_type, is_server),
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
            itemType: item_type(var_type, is_server),
            bMapPair: {
              key: all_value_var(var_type.k, is_server, key),
              value: all_value_var(var_type.v, is_server, val),
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
  is_server: boolean;
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
  if (body.type.t === "d") {
    assert(body.is_server);
    return map_pin_body_server({
      kind: body.kind,
      index: body.index,
      key_type: body.type.k,
      value_type: body.type.v,
      indexOfConcrete: body.indexOfConcrete,
      connects: body.connects,
      value: body.value,
    });
  } else if (body.type.t === "l") {
    return list_pin_body({
      indexOfConcrete: body.indexOfConcrete,
      kind: body.kind,
      index: body.index,
      value_type: stringify(body.type),
      connects: body.connects,
      value: body.value,
      is_server: body.is_server,
    });
  }

  const value = body.kind === 3 ? all_value_var(body.type, body.is_server, body.value, body.fill_undefined) : undefined;
  if (body.reflective === true) {
    return pin_body({
      kind: body.kind,
      index: body.index,
      type: stringify(body.type),
      is_server: body.is_server,
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
      type: stringify(body.type),
      value: value,
      connects: body.connects,
      is_server: body.is_server,
    });
  }
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


export function encode_node_graph_var_server(v: GraphVar): GraphVariable {
  return {
    name: v.name,
    type: tid(v.type, true),
    values: all_value_var(v.type, true, v.val),
    exposed: v.exposed,
    structId: 0,
    keyType: v.type.t === "d" ? tid(v.type.k, true) : 6,
    valueType: v.type.t === "d" ? tid(v.type.v, true) : 6
  };
}