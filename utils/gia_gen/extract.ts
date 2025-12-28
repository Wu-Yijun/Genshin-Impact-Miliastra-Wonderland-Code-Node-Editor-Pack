import { assert, assertEq } from "../../utils/utils.ts";
import type {
  ClientVarType,
  GraphNode,
  NodeGraph,
  NodePin,
  Root,
  VarBase,
} from "../protobuf/gia.proto.ts";
import {
  NodePin_Index_Kind,
  VarBase_Class,
  VarBase_ItemType_ServerType_Kind,
  VarType,
} from "../protobuf/gia.proto.ts";
import { get_type, get_type_client, type NodeType } from "./nodes.ts";
import type { AnyType, GraphVar } from "./graph.ts";
import { get_node_record_generic_client } from "../node_data/helpers.ts";

export function get_nodes(graph: Root): GraphNode[] | null {
  return graph?.graph?.graph?.inner?.graph?.nodes ?? null;
}

interface PinInfo_ {
  kind: NodePin_Index_Kind;
  index: number;
  type: VarType | ClientVarType;
  indexOfConcrete: number;
  node_type: NodeType;
  is_node: boolean;
}
export function get_pin_info(pin: NodePin, is_server: boolean): PinInfo_ {
  const ret: PinInfo_ = {
    kind: pin.i1.kind,
    index: pin.i1.index ?? 0,
    type: pin.type as VarType | ClientVarType,
    indexOfConcrete: pin.value?.bConcreteValue?.indexOfConcrete ?? 0,
    node_type: is_server ? get_type(pin.type ?? 0) : get_type_client(pin.type ?? 0),
    is_node: pin.value?.class === VarBase_Class.ConcreteBase,
  };
  if (ret.node_type?.t === "d") {
    assertEq(
      pin.value!.bConcreteValue!.value!.class,
      VarBase_Class.MapBase,
    );
    const t = pin.value!.bConcreteValue!.value.itemType!.type_server!;
    assertEq(t.type, VarType.Dictionary);
    assertEq(t.kind, VarBase_ItemType_ServerType_Kind.Pair);
    ret.node_type.k = is_server ? get_type(t.items!.key) : get_type_client(t.items!.key);
    ret.node_type.v = is_server ? get_type(t.items!.value) : get_type_client(t.items!.value);
  }
  return ret;
}

interface NodeInfo_ {
  generic_id: number;
  concrete_id: number | null;
  pins: PinInfo_[];
}
export function get_node_info(node: GraphNode, is_server: boolean): NodeInfo_ {
  const ret: NodeInfo_ = {
    generic_id: node.genericId.nodeId,
    concrete_id: node.concreteId?.nodeId ?? null,
    pins: node.pins.map((v) => get_pin_info(v, is_server)),
  };
  return ret;
}

/**
 * Returns "gid" or "gid cid" for non-reflective nodes
 * Returns "gid" for reflective nodes with generic type
 * Returns "gid cid type" for normal reflective nodes
 */
export function get_client_node_cid_from_info(info: NodeInfo_): string {
  const record = get_node_record_generic_client(info.generic_id);
  assert(record !== null);
  assert(record.id === info.generic_id);
  if (record.reflectMap === undefined) {
    if (info.concrete_id === null) {
      return record.id.toString();
    }
    if (info.concrete_id !== record.cid) {
      console.warn("Concrete id does not match record cid:", info.generic_id, info.concrete_id, record.cid);
    }
    return `${record.id} ${info.concrete_id}`;
  }
  // reflective node
  console.warn("Type matches does not implement. Use generic id as fallback.", info.generic_id, info.concrete_id);
  return `${record.id}`;
}

export function extract_value(value: VarBase): AnyType | undefined {
  if (value === undefined || value.class === VarBase_Class.Unknown) {
    return undefined;
  }
  switch (value.class) {
    case undefined:
    case null:
      return undefined;
    case VarBase_Class.ConcreteBase: {
      const v = value.bConcreteValue?.value;
      if (v === undefined) {
        return undefined;
      }
      return extract_value(v);
    }
    case VarBase_Class.EnumBase:
      return value.bEnum?.val ?? undefined;
    case VarBase_Class.FloatBase:
      return value.bFloat?.val ?? undefined;
    case VarBase_Class.IntBase:
      return value.bInt?.val ?? undefined;
    case VarBase_Class.IdBase:
      return value.bId?.val ?? undefined;
    case VarBase_Class.StringBase:
      return value.bString?.val ?? undefined;
    case VarBase_Class.VectorBase: {
      const vec = value.bVector?.val;
      if (vec === undefined) {
        return undefined;
      }
      return [vec.x, vec.y, vec.z];
    }
    case VarBase_Class.ArrayBase: {
      const list = value.bArray?.entries;
      if (list === undefined) {
        return undefined;
      }
      return list.map(extract_value) as AnyType;
    }
    case VarBase_Class.MapBase: {
      const map = value.bMap?.mapPairs;
      if (map === undefined) {
        return undefined;
      }
      return map.map((pair) => extract_value(pair)) as AnyType;
    }
    case VarBase_Class.MapPair: {
      const pair = value.bMapPair;
      if (pair === undefined) {
        return undefined;
      }
      return [extract_value(pair.key), extract_value(pair.value)] as AnyType;
    }
    case VarBase_Class.StructBase: {
      const items = value.bStruct?.items;
      if (items === undefined) {
        return undefined;
      }
      return items.map((item) => extract_value(item)) as AnyType;
    }
    default:
      throw new Error("Cannot extract value of Unknown class: " + JSON.stringify(value));
  }
}

export function get_graph_vars(graph: NodeGraph): GraphVar[] {
  return graph.graphValues.map(v => {
    let type = get_type(v.type);
    if (type.t === "d") {
      type.k = get_type(v.keyType);
      type.v = get_type(v.valueType);
    }
    return {
      name: v.name,
      val: extract_value(v.values)!,
      exposed: v.exposed,
      type: type,
    };
  });
}