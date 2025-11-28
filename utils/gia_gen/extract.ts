import assert from "assert";
import type { GraphNode, NodePin, Root } from "../protobuf/gia.proto.ts";
import { VarBase_Class, NodePin_Index_Kind, VarType, VarBase_ItemType_Inner_Kind } from "../protobuf/gia.proto.ts";
import { get_type, type NodeType } from "./nodes.ts";


export function get_nodes(graph: Root): GraphNode[] | null {
  return graph?.graph?.graph?.inner?.graph?.nodes ?? null;
}

interface PinInfo_ {
  kind: NodePin_Index_Kind;
  index: number;
  type: VarType;
  indexOfConcrete: number;
  node_type: NodeType;
  is_node: boolean;
}
export function get_pin_info(pin: NodePin): PinInfo_ {
  const ret: PinInfo_ = {
    kind: pin.i1.kind,
    index: pin.i1.index,
    type: pin.type,
    indexOfConcrete: pin.value?.bNodeValue?.indexOfConcrete ?? 0,
    node_type: get_type(pin.type),
    is_node: pin.value.class === VarBase_Class.NodeValueBase,
  };
  if (ret.node_type?.t === "d") {
    assert.equal(pin.value!.bNodeValue!.value!.class, VarBase_Class.MapBase);
    const t = pin.value!.bNodeValue!.value.itemType!.itemType!;
    assert.equal(t.type, VarType.Dictionary);
    assert.equal(t.kind, VarBase_ItemType_Inner_Kind.Pair);
    ret.node_type.k = get_type(t.items!.key);
    ret.node_type.v = get_type(t.items!.value);
  }
  return ret;
}

interface NodeInfo_ {
  generic_id: number;
  concrete_id: number;
  pins: PinInfo_[];
}
export function get_node_info(node: GraphNode): NodeInfo_ {
  const ret: NodeInfo_ = {
    generic_id: node.genericId.nodeId,
    concrete_id: node.concreteId?.nodeId,
    pins: node.pins.map(v => get_pin_info(v)),
  };
  return ret;
}