import type { ClientVarType, NodeConnection, GraphNode, NodePin } from "../../protobuf/gia.proto.ts";
import { VarBase_Class, VarBase_ItemType_ClassBase } from "../../protobuf/gia.proto.ts";
import { collection, dir, gia, save } from "../util.ts";
import { assert, assertDeepEq, assertEq, exclude_keys } from "../../utils.ts";
import { is_reflect, reflects } from "../../node_data/node_type.ts";

import RECORDS from "../dist/node_records.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import NO_LINK from "../dist/node_pins_no_links.json" with { type: 'json' };

// 1. 对于每一个 node, 尽可能连接全部的引脚, 或设置初值(reflective pin除外). 观测是否完全连接(或被标记无连接), 然后验证输入输出类型是否完全一致.
// 2. 对于每一个 reflective node, 构造全部的反射类型, 并连接/设置初值, 然后验证输入输出类型是否完全一致
// 3. 对于每一个 enum 类型, 设置每一种可能的值, 然后验证输入输出值是否一致(或有固定值)
// 4. 对于每一个 simple 类型, 设置多个值, 然后验证输入输出值是否一致(或有固定值)


const info = collection().find(x => x.name === "skill")!;
function create_node(index: number, gid: number, cid?: number, pins?: NodePin[], pos: [number, number] = [0, 0]): GraphNode {
  return {
    nodeIndex: index++,
    genericId: {
      class: info.node_class,
      type: info.node_type,
      kind: info.node_kind,
      nodeId: gid
    },
    concreteId: cid === undefined ? undefined : {
      class: info.node_class,
      type: info.node_type,
      kind: info.node_kind,
      nodeId: cid
    },
    pins: pins ?? [],
    x: pos[0],
    y: pos[1],
    usingStruct: []
  };
}
// set local var/get local var
function get_var_node(type: string, index: number, pos?: [number, number]) {
  const tp = type_name.find(x => x.type === type);
  if (tp === undefined || tp.type === "E<0>" || tp.type === "L<E<0>>") {
    return null;
  }
  const node = create_node(index, 200082, tp.cid, [{
    i1: {
      kind: 4,
      index: 0,
    },
    i2: {
      kind: 4,
      index: 0,
    },
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      itemType: {
        classBase: VarBase_ItemType_ClassBase.Client,
        type_client: {
          type: tp.typeid as ClientVarType,
        }
      },
      bConcreteValue: {
        indexOfConcrete: tp.ioc,
        value: {} as any,
      }
    },
    type: tp.typeid,
    connects: [],
  }], pos);
  // 从 Target 引脚连接到 node 引脚
  const connect: NodeConnection = {
    id: index,
    connect: {
      kind: 4,
      index: 0,
    },
    connect2: {
      kind: 4,
      index: 0
    }
  };
  return { node, connect };

}
function set_var_node(type: string, index: number, connect_node: [number, number], pos?: [number, number]) {
  const tp = type_name.find(x => x.type === type);
  if (tp === undefined || tp.type === "E<0>" || tp.type === "L<E<0>>") {
    return null;
  }
  const node = create_node(index, 200081, tp.cid, [{
    i1: {
      kind: 3,
      index: 1,
    },
    i2: {
      kind: 3,
      index: 1,
    },
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      itemType: {
        classBase: VarBase_ItemType_ClassBase.Client,
        type_client: {
          type: tp.typeid as ClientVarType,
        }
      },
      bConcreteValue: {
        indexOfConcrete: tp.ioc,
        value: {} as any,
      }
    },
    type: tp.typeid,
    connects: [{
      id: connect_node[0],
      connect: {
        kind: 4,
        index: connect_node[1],
      },
      connect2: {
        kind: 4,
        index: 0,
      }
    }],
  }], pos);
  return node;
}

function test1(read = false) {
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const records = RECORDS.filter(x => !x.name.startsWith("Node Graph End"));
  let nodes_read = read ? gia("all_nodes", true, true).graph.graph?.inner.graph.nodes! : [];
  // let nodes_read = read ? gia("../dist/all_nodes", undefined, true).graph.graph?.inner.graph.nodes! : [];
  let y_pos = 0;
  let index = 1;
  let read_index = 0;
  let read_node = nodes[0];
  records.slice(0, 5).forEach((rec, i) => {
    const pins: NodePin[] = [];
    const index0 = index++;
    nodes.push(create_node(index0, rec.id, undefined, pins, [0, y_pos]));
    if (read) {
      read_node = nodes_read[read_index++];
      assertEq(read_node.genericId.nodeId, rec.id);
    }
    for (let i = 0; i < rec.inputs.length; i++) {
      if (is_reflect(rec.inputs[i])) continue;
      const get_var = get_var_node(rec.inputs[i], index++, [-500 - i * 200, y_pos]);
      if (get_var === null) continue;
      nodes.push(get_var.node);
      const type_id = type_name.find(x => x.type === rec.inputs[i])!.typeid;
      pins.push({
        i1: { kind: 3, index: i },
        i2: { kind: 3, index: 0 },
        value: {} as any,
        type: type_id,
        connects: [get_var.connect]
      });
      if (read) {
        const read_node_get = nodes_read[read_index++];
        assertEq(read_node_get.pins.length, 1); // should have a out pin
        assertEq(read_node_get.pins[0].type, type_id); // type should match
        if (NO_LINK.find(x => x.node === read_node.genericId.nodeId && x.pin === i)) {
          assertEq(read_node_get.pins[0].connects.length, 0); // should be not connected to it
          continue;
        }
        assertEq(read_node.pins.find(x => x.i1.index === i)?.connects.length, 1); // should be connected to it
        assertDeepEq(
          exclude_keys(read_node.pins.find(x => x.i1.index === i), "value"),
          exclude_keys(pins[pins.length - 1], "value")
        ); // should be same  
      }
    }
    for (let i = 0; i < rec.outputs.length; i++) {
      if (is_reflect(rec.outputs[i])) continue;
      const set_var = set_var_node(rec.outputs[i], index++, [index0, i], [500 + i * 200, y_pos]);
      if (set_var === null) continue;
      nodes.push(set_var);
      if (read) {
        const read_node_set = nodes_read[read_index++];
        const type_id = type_name.find(x => x.type === rec.outputs[i])!.typeid;
        assertEq(read_node_set.pins.length, 1); // should have a in pin
        assertEq(read_node_set.pins[0].type, type_id); // type should match
        assertEq(read_node_set.pins[0].connects.length, 1); // should be connected to it
        assertDeepEq(
          exclude_keys(read_node_set.pins[0], "value"),
          exclude_keys(set_var.pins[0], "value")
        ); // should be same
      }
    }
    y_pos += 100 + 30 * rec.inputs.length;
  });
  if (!read) {
    save("all_nodes.gia", graph, true);
    console.log("all_nodes.gia saved with", nodes.length, "nodes");
  } else {
    console.log("all_nodes.gia verified with", nodes.length, "nodes");
  }
}

function test2(read = false) {
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const records = RECORDS.filter(x => x.reflectMap !== undefined);
  // let nodes_read = read ? gia("all_nodes", true, true).graph.graph?.inner.graph.nodes! : [];
  // let nodes_read = read ? gia("../dist/all_nodes", undefined, true).graph.graph?.inner.graph.nodes! : [];
  let y_pos = 0;
  let index = 1;
  // let read_index = 0;
  // let read_node = nodes[0];
  records.slice(0, 5).forEach((rec, i) => {
    rec.reflectMap.forEach(reflect_type => {
      const [gid, cid, type_str] = reflect_type[0].split(" ");
      assertEq(gid, rec.id.toString());
      assertEq(type_str, reflect_type[1]);
      const index0 = index++;
      const pins: NodePin[] = [];
      nodes.push(create_node(index0, parseInt(gid), parseInt(cid), pins, [0, y_pos]));
      for (let i = 0; i < rec.inputs.length; i++) {
        if (!is_reflect(rec.inputs[i])) continue;
        const type = reflects(rec.inputs[i], type_str);

      }
    });
  });
}

test1(false);
// test1(true);

// test2(false);
// test2(true);