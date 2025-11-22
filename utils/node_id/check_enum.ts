/** 
 * 通过将 enum_id.yaml 中的节点保存为 .gia 文件, 然后在原神中加载 .gia 文件, 
 * 检查是否全部节点均已被定义, 且与yaml中定义一致.
 */

import yaml from 'yaml';
import { readFileSync } from 'fs';
import { encode_gia_file } from "../protobuf/decode.ts";
import { type GraphNode, NodeGraph$Id$Class, NodeGraph$Id$Kind, NodeGraph$Id$Type, type NodePin, NodePin$Index$Kind, NodeProperty$Type, NodeUnit$Id$Type, NodeUnit$Type, type Root, VarBase$Class, VarType } from "../protobuf/gia.proto.ts";
import "./enum_id.yaml.d.ts";

function save_nodes(graph_name: string, file_name: string, nodes: GraphNode[]): Root {
  const uid = parseInt("201" + randomDigits(6));
  const graph_id = parseInt("10" + randomDigits(8));
  const file_id = graph_id + 1;
  const gia: Root = {
    graph: {
      id: {
        type: NodeUnit$Id$Type.Basic,
        id: graph_id,
      },
      relatedIds: [],
      name: graph_name,
      type: NodeUnit$Type.EntityNode,
      graph: {
        inner: {
          graph: {
            id: {
              class: NodeGraph$Id$Class.UserDefined,
              type: NodeGraph$Id$Type.BasicNode,
              kind: NodeGraph$Id$Kind.NodeGraph,
              id: graph_id,
            },
            name: graph_name,
            nodes: nodes,
            compositePins: [],
            graphValues: [],
            affiliations: []
          }
        }
      }
    },
    utils: [],
    filePath: `${uid}-${Math.floor(Date.now() / 1000)}-${file_id}-\\${file_name}`,
  }
  return gia;
}

function randomDigits(len: number): string {
  let ret = "";
  while (true) {
    if (len > 8) {
      ret += Math.random().toString(10).slice(-8);
    } else {
      ret += Math.random().toString(10).slice(-len);
      break;
    }
  }
  return ret;
}



interface EnumOptions {
  generic_id: number;
  concrete_id: number;
  pos: [number, number];
  varClassBase: number;
  enum_item_id: [number, number];
}
let index = 0;
function create_enum_node(option: EnumOptions) {
  const pin1: NodePin = {
    i1: {
      kind: NodePin$Index$Kind.InParam,
      index: 0
    },
    i2: {
      kind: NodePin$Index$Kind.InParam,
      index: 0
    },
    value: {
      class: VarBase$Class.NodeValueBase,
      alreadySetVal: true,
      bNodeValue: {
        classBase: option.varClassBase,
        value: {
          class: VarBase$Class.EnumBase,
          alreadySetVal: true,
          itemType: {
            classBase: 1,
            itemType: {
              type: VarType.EnumItem,
              kind: 0
            }
          },
          bEnum: {
            val: option.enum_item_id[0],
          },
        },
      }
    },
    type: VarType.EnumItem,
    connects: []
  }
  const pin2 = structuredClone(pin1);
  pin2.i1.index = 1;
  pin2.i2.index = 1;
  pin2.value.bNodeValue!.value.bEnum!.val = option.enum_item_id[1];

  const node: GraphNode = {
    nodeIndex: ++index,
    genericId: {
      class: NodeGraph$Id$Class.SystemDefined,
      type: NodeProperty$Type.Server,
      kind: NodeGraph$Id$Kind.SysCall,
      nodeId: option.generic_id,
    },
    concreteId: {
      class: NodeGraph$Id$Class.SystemDefined,
      type: NodeProperty$Type.Server,
      kind: NodeGraph$Id$Kind.SysCall,
      nodeId: option.concrete_id,
    },
    pins: [pin1, pin2],
    x: option.pos[0] * 300 + Math.random() * 10,
    y: option.pos[1] * 200 + Math.random() * 10,
    usingStruct: []
  };
  return node;
}

function check_create_enums(v: number) {
  const enum_list: EnumList = yaml.parse(readFileSync(import.meta.dirname + "/enum_id.yaml").toString());

  const nodes: GraphNode[] = [];
  for (let i = 0; i < enum_list.EnumList.length; i++) {
    const e = enum_list.EnumList[i];
    const keys: number[] = Object.keys(e.items).map(x => parseInt(x));
    for (let j = 0; j < keys.length; j += 2) {
      const val = keys[j];
      const val2 = (j + 1) < keys.length ? keys[j + 1] : val;
      // const value = e.items[key];
      const node = create_enum_node({
        generic_id: 475,
        concrete_id: e.id,
        pos: [i, j / 2],
        varClassBase: e.varClassBase,
        enum_item_id: [val, val2],
      });
      nodes.push(node);
    }
  }

  const graph_name = "Generated Enums v" + v;
  const file_name = graph_name.toLowerCase().replaceAll(" ", "_") + ".gia";
  const root = save_nodes(graph_name, file_name, nodes);
  encode_gia_file({
    out_path: import.meta.dirname + "/" + file_name,
    gia_struct: root
  });
}


if (import.meta.main) {
  const v = 4;
  check_create_enums(v);
}