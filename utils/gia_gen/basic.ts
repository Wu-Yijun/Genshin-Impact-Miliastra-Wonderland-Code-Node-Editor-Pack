import {
  EnumNode_ClassBase,
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
  type Root,
  type VarBase,
  VarBase_Class,
  VarType,
} from "../protobuf/gia.proto.ts";

import { counter_dynamic_id, counter_index, randomInt } from "./utils.ts";

export { enum_value, graph_body, node_body, pin_body, pin_value };
export type { EnumValue, GraphBody, NodeBody, PinBody, PinValue };

interface GraphBody {
  uid: number;
  graph_id: number;
  graph_name?: string;
  nodes?: GraphNode[];
}
function graph_body(body: GraphBody): Root {
  const graph_name = body.graph_name ?? "Graph " + randomInt(8).toString() + ".gia";
  const file_name = graph_name.replaceAll(/[^a-zA-Z0-9_.]+/gs, "_").replaceAll(/[A-Z]/g, (m) => m.toLowerCase());
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

interface NodeBody {
  generic_id: NodeId;
  concrete_id: NodeId;
  x: number;
  y: number;
}
function node_body(body: NodeBody): GraphNode {
  const nodeIndex = counter_index.value;
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
    pins: [],
    x: body.x * 300 + Math.random() * 10,
    y: body.y * 200 + Math.random() * 10,
    usingStruct: [],
  };
  return node;
}

interface PinBody {
  kind: NodePin_Index_Kind;
  index: number;
  value?: VarBase;
  type: VarType;
}
function pin_body(body: PinBody): NodePin {
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

interface PinValue {
  varClassBase: EnumNode_ClassBase;
  value?: VarBase;
}
function pin_value(body: PinValue): VarBase {
  const value: VarBase = {
    class: VarBase_Class.NodeValueBase,
    alreadySetVal: true,
    bNodeValue: {
      classBase: body.varClassBase,
      value: body.value ?? {} as any,
    },
  };
  return value;
}

interface EnumValue {
  value: EnumNode_Value;
}
function enum_value(body: EnumValue) {
  const value: VarBase = {
    class: VarBase_Class.EnumBase,
    alreadySetVal: true,
    itemType: {
      classBase: 1,
      itemType: {
        type: VarType.EnumItem,
        kind: 0,
      },
    },
    bEnum: {
      val: body.value,
    },
  };
  return value;
}
