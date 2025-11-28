/** 
 * 通过将 enum_id.yaml 中的节点保存为 .gia 文件, 然后在原神中加载 .gia 文件, 
 * 检查是否全部节点均已被定义, 且与yaml中定义一致.
 */

import yaml from 'yaml';
import { encode_gia_file } from "../protobuf/decode.ts";
import { EnumNode_Value, type GraphNode, NodeGraph_Id_Class, NodeGraph_Id_Kind, NodeGraph_Id_Type, NodeId, type NodePin, NodePin_Index_Kind, NodeProperty_Type, NodeUnit_Id_Type, NodeUnit_Type, type Root, VarBase_Class, VarType } from "../protobuf/gia.proto.ts";
import "./enum_id.yaml";
import assert from 'assert';
import { readFileSync } from 'fs';

function save_nodes(graph_name: string, file_name: string, nodes: GraphNode[]): Root {
  const uid = parseInt("201" + randomDigits(6));
  const graph_id = parseInt("10" + randomDigits(8));
  const file_id = graph_id + 1;
  const gia: Root = {
    graph: {
      id: {
        type: NodeUnit_Id_Type.Basic,
        id: graph_id,
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
  generic_id: NodeId;
  concrete_id: NodeId;
  pos: [number, number];
  indexOfConcrete: number;
  enum_item_id: [EnumNode_Value, EnumNode_Value];
}
let index = 0;
function create_enum_node(option: EnumOptions) {
  const pin1: NodePin = {
    i1: {
      kind: NodePin_Index_Kind.InParam,
      index: 0
    },
    i2: {
      kind: NodePin_Index_Kind.InParam,
      index: 0
    },
    value: {
      class: VarBase_Class.NodeValueBase,
      alreadySetVal: true,
      bNodeValue: {
        indexOfConcrete: option.indexOfConcrete,
        value: {
          class: VarBase_Class.EnumBase,
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
  pin2.value.bNodeValue!.value.bEnum!.val = option.enum_item_id[1] as any;

  const node: GraphNode = {
    nodeIndex: ++index,
    genericId: {
      class: NodeGraph_Id_Class.SystemDefined,
      type: NodeProperty_Type.Server,
      kind: NodeGraph_Id_Kind.SysCall,
      nodeId: option.generic_id,
    },
    concreteId: {
      class: NodeGraph_Id_Class.SystemDefined,
      type: NodeProperty_Type.Server,
      kind: NodeGraph_Id_Kind.SysCall,
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
        concrete_id: e.id as any,
        pos: [i, j / 2],
        indexOfConcrete: e.indexOfConcrete,
        enum_item_id: [val as any, val2 as any],
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

function get_enums_as_proto() {
  const enum_list: EnumList = yaml.parse(readFileSync("enum_id.yaml").toString());
  const data = enum_list.EnumList.map(x => {
    const name = x.name.replaceAll(/([^a-zA-Z0-9])+/g, "_");
    const items = Object.entries(x.items).map(([k, v]) => {
      const y = parseInt(k);
      assert(y.toString() === k);
      return {
        id: y,
        name: v
          .replaceAll(/([^a-zA-Z])([a-z])/gs, ([m1, m2]) => m1 + m2.toUpperCase())
          .replaceAll(/([^a-zA-Z0-9])+/gs, "_")
          .replaceAll(/(^_+)|(_+$)/g, ""),
      }
    });
    return {
      name,
      id: x.id,
      varClassBase: x.indexOfConcrete,
      items,
    };
  });

  const node_ids: [string, number][] = data.map(x => [x.name, x.id]); // `${PAD}${name} = ${id};
  const node_var_base: [string, number][] = data.map(x => [x.name, x.varClassBase]); // `${PAD}${name} = ${varClassBase};
  const node_enum: [string, number][] = data.map(x => {
    return x.items.map(y => {
      return [x.name.replaceAll(/_/g, "") + "_" + y.name.replaceAll(/_/g, ""), y.id];
    }) as [string, number][];
  }).flat();
  // console.log(node_ids, node_var_base, node_enum);
  assert(node_ids.length === new Map(node_ids).size);
  assert(node_var_base.length === new Map(node_var_base).size);
  assert(node_enum.length === new Map(node_enum).size);
  assert(node_ids.length === new Set(node_ids.map(x => x[1])).size);
  assert(node_var_base.length === new Set(node_var_base.map(x => x[1])).size);
  assert(node_enum.length === new Set(node_enum.map(x => x[1])).size);



  const node_ids_str = node_ids.map(([k, v]) => `  EnumEqual_${k} = ${v};`).join("\n");
  const node_var_base_str = node_var_base.map(([k, v]) => `    ${k} = ${v};`).join("\n");
  const node_enum_str = node_enum.map(([k, v]) => `    ${k} = ${v};`).join("\n");
  return `
// All nodes id includes server and client
enum NodeId{
  // ==== enum nodes ====
${node_ids_str}
}
message EnumNode{
  // an enum info only message
  enum EnumNodeClassBase {
${node_var_base_str}
  }
  enum EnumNodeValue {
${node_enum_str}
  }
}
`;
}


if (import.meta.main) {
  const v = 4;
  // generate `Generated Enum v${v}.gia`
  check_create_enums(v);

  // print all enum structures in protobuf form
  const proto = get_enums_as_proto();
  console.log(proto);
}