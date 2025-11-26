import assert from "node:assert";
import {
  EnumNode_EnumEqualList,
  EnumNode_Value,
  type GraphNode,
  NodeGraph_Id_Class,
  NodeGraph_Id_Kind,
  NodeGraph_Id_Type,
  type NodeId,
  type NodePin,
  NodePin_Index_Kind,
  NodeProperty_Type,
  NodeUnit_Id_Type,
  NodeUnit_Type,
  type NodeValueBaseValue_Wrapper,
  type Root,
  type VarBase,
  VarBase_Class,
  type VarBase_ItemType,
  VarBase_ItemType_Inner_Kind,
  VarType,
} from "../protobuf/gia.proto.ts";
import { get_id, type NodeType } from "./nodes.ts";

import { counter_dynamic_id, counter_index, randomInt, todo } from "./utils.ts";

export interface GraphBody {
  uid: number;
  graph_id: number;
  graph_name?: string;
  nodes?: GraphNode[];
}
export function graph_body(body: GraphBody): Root {
  const graph_name = body.graph_name ??
    "Graph " + randomInt(8).toString() + ".gia";
  const file_name = graph_name.replaceAll(/[^a-zA-Z0-9_.]+/gs, "_").replaceAll(
    /[A-Z]/g,
    (m) => m.toLowerCase(),
  );
  const timestamp = Math.floor(Date.now() / 1000);
  const file_id = body.graph_id + counter_dynamic_id.value;
  const filePath = `${body.uid}-${timestamp}-${file_id}-\\${file_name}`;
  const gia: Root = {
    graph: {
      id: {
        type: NodeUnit_Id_Type.Basic,
        id: body.graph_id,
      },
      relatedIds: [],
      name: graph_name,
      type: NodeUnit_Type.EntityNode,
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
            graphValues: [],
            affiliations: [],
          },
        },
      },
    },
    utils: [],
    filePath,
  };
  return gia;
}

export interface NodeBody {
  generic_id: NodeId;
  concrete_id: NodeId;
  x: number;
  y: number;
  pins: NodePin[];
  /** ⚠️ Warning: This may cause ID collision. */
  index?: number;
}
export function node_body(body: NodeBody): GraphNode {
  const nodeIndex = body.index ?? counter_index.value;
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
    x: body.x * 300 + Math.random() * 10,
    y: body.y * 200 + Math.random() * 10,
    usingStruct: [],
  };
  return node;
}

export interface PinBody {
  kind: NodePin_Index_Kind;
  index: number;
  value?: VarBase;
  type: VarType;
}
export function pin_body(body: PinBody): NodePin {
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
    connects: [],
  };
  return pin;
}

export interface PinValue {
  indexOfConcrete?: number;
  value?: VarBase;
  wrapper?: NodeValueBaseValue_Wrapper;
}
export function pin_value(body: PinValue): VarBase {
  const value: VarBase = {
    class: VarBase_Class.NodeValueBase,
    alreadySetVal: true,
    bNodeValue: {
      indexOfConcrete: body.indexOfConcrete ?? 0,
      value: body.value ?? {} as any,
      wrapper: body.wrapper,
    },
  };
  return value;
}

/** Normal item type */
export function item_type(type: VarType): VarBase_ItemType {
  return {
    classBase: 1,
    itemType: {
      type: type,
      kind: 0,
    },
  };
}

export interface EnumValue {
  value: EnumNode_Value;
}
/** En */
export function enum_value(body: EnumValue) {
  const value: VarBase = {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: item_type(VarType.EnumItem),
    bEnum: { val: body.value },
  };
  return value;
}

export interface MapPinBody {
  kind: NodePin_Index_Kind;
  index: number;
  key_type: VarType;
  value_type: VarType;
  indexOfConcrete?: number;
}
export function map_pin_body(body: MapPinBody) {
  const map_pair = {
    key: body.key_type,
    value: body.value_type,
    structId: 0,
  };
  const value: VarBase = {
    class: VarBase_Class.MapBase,
    alreadySetVal: false,
    itemType: {
      classBase: 1,
      itemType: {
        type: VarType.Dictionary,
        kind: VarBase_ItemType_Inner_Kind.Pair,
        items: structuredClone(map_pair),
      },
    },
    bMap: { mapPairs: [] },
  };
  const wrapper: NodeValueBaseValue_Wrapper = {
    classBase: 1,
    inner: {
      wrapper: {
        class: VarBase_Class.MapBase,
        mapPair: {
          key: body.key_type,
          value: body.value_type,
          structId: 0,
        }
      }
    },
  };
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: VarType.Dictionary,
    value: pin_value({ value, wrapper, indexOfConcrete: body.indexOfConcrete }),
  });
}

export interface ListPinBody {
  indexOfConcrete?: number;
  kind: NodePin_Index_Kind;
  index: number;
  value_type: VarType;
}
export function list_pin_body(body: ListPinBody) {
  const value: VarBase = {
    class: VarBase_Class.ArrayBase,
    alreadySetVal: false,
    itemType: item_type(body.value_type),
    bArray: { entries: [] },
  };
  const val = pin_value({
    indexOfConcrete: body.indexOfConcrete,
    value: value,
  });
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: body.value_type,
    value: val,
  });
}

export function int_pin_body(val: number): VarBase {
  return {
    class: VarBase_Class.IntBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Integer),
    bInt: { val },
  };
}
export function bool_pin_body(val: number | boolean): VarBase {
  return {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Boolean),
    bEnum: { val: val ? EnumNode_Value.True : EnumNode_Value.Default },
  };
}
export function id_pin_body(val: number, type: VarType = VarType.GUID): VarBase {
  return {
    class: VarBase_Class.IdBase,
    alreadySetVal: true,
    itemType: item_type(type),
    bId: { val },
  };
}
export function float_pin_body(val: number): VarBase {
  return {
    class: VarBase_Class.FloatBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Float),
    bFloat: { val },
  };
}
export function string_pin_body(val: string): VarBase {
  return {
    class: VarBase_Class.StringBase,
    alreadySetVal: true,
    itemType: item_type(VarType.String),
    bString: { val },
  };
}
export function vector_pin_body(vec: number[]): VarBase {
  return {
    class: VarBase_Class.VectorBase,
    alreadySetVal: true,
    itemType: item_type(VarType.Vector),
    bVector: {
      val: {
        x: vec?.[0],
        y: vec?.[1],
        z: vec?.[2],
      }
    },
  };
}

export interface AnyPinBody {
  kind: NodePin_Index_Kind;
  index: number;
  type: VarType;
  /** Only exist when it is dict */
  key_val_type?: [VarType, VarType];
  indexOfConcrete?: number;
  value?: any;
}
export function any_pin_body(body: AnyPinBody): NodePin {
  let value: VarBase;
  switch (body.type) {
    case VarType.Dictionary:
      assert(body.key_val_type !== null, "Dict Type should pass parameter `key_val_type`!");
      return map_pin_body({
        kind: body.kind,
        index: body.index,
        key_type: body.key_val_type![0],
        value_type: body.key_val_type![1],
        indexOfConcrete: body.indexOfConcrete,
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
        value_type: body.type,
      });
    case VarType.EnumItem:
      value = enum_value({ value: body.value });
      break;
    case VarType.Integer:
      value = int_pin_body(body.value);
      break;
    case VarType.GUID:
    case VarType.Configuration:
    case VarType.Entity:
    case VarType.Faction:
    case VarType.Prefab:
      value = id_pin_body(body.value, body.type);
      break;
    case VarType.Boolean:
      value = bool_pin_body(body.value);
      break;
    case VarType.Float:
      value = float_pin_body(body.value);
      break;
    case VarType.String:
      value = string_pin_body(body.value);
      break;
    case VarType.Vector:
      value = vector_pin_body(body.value);
      break;
    default:
      // console.log(body);
      return todo("Not implemented AnyPinBody for type " + body.type);
  }
  return pin_body({
    kind: body.kind,
    index: body.index,
    type: body.type,
    value: pin_value({
      indexOfConcrete: body.indexOfConcrete,
      value: value,
    }),
  });
}

export interface NodeTypePinBody {
  kind: NodePin_Index_Kind;
  index: number;
  type: NodeType;
  indexOfConcrete?: number;
  value?: any;
}
export function node_type_pin_body(body: NodeTypePinBody): NodePin {
  let key_val_type: [VarType, VarType] | undefined;
  if (body.type.t === "d") {
    key_val_type = [get_id(body.type.k), get_id(body.type.v)] as any;
  }
  return any_pin_body({
    kind: body.kind,
    index: body.index,
    type: get_id(body.type) as any,
    key_val_type,
    value: body.value,
    indexOfConcrete: body.indexOfConcrete,
  });
}

// export interface NodeTypeNodeBody {
//   node: NodeType;
//   generic_id: number;
// }
// export function node_type_node_body(body: NodeTypeNodeBody): NodeBody {
//   const
// }