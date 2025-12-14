import type { NodePin } from "../../protobuf/gia.proto";
import { cls, collection, dir, gia, save } from "../util.ts";

import records_raw from "../dist/node_records_no_type.json" with {type: "json"};
import records_in from "./node_records_inputs.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import { assert, assertEq, assertEqs, assertNotEq, assertNotEqs } from "../../utils.ts";

import { ENUM_ID_CLIENT, ENUM_VALUE } from "../../node_data/index.ts";

const ENUM_VALUE_ = new Map(Object.entries(ENUM_ID_CLIENT).map(([k, v]) => [k.replaceAll("_", "").toLowerCase(), v]));
const ENUM_VALUE_TO_ID = new Map<number, number>(
  Object.entries(ENUM_VALUE)
    .map(([k, v]) => [v, ENUM_VALUE_.get(k.split("_")[0].toLowerCase())!] as [number, number])
    .filter(([k, v]) => v !== undefined)
);
ENUM_VALUE_TO_ID.set(0, -1);



function generate_all_links() {
  const graph = gia("skill");
  const node = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  let cnt = 0;
  // get custom variable: all types
  for (const t of type_name) {
    node.push({
      nodeIndex: ++cnt,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: t.gid,
      },
      concreteId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: t.cid,
      },
      pins: [{
        i1: {
          kind: 4,
          index: 0
        },
        i2: {
          kind: 4,
          index: 0
        },
        value: {
          class: 10000,
          alreadySetVal: true,
          bConcreteValue: {
            indexOfConcrete: t.ioc,
            value: {} as any,
          },
        },
        type: t.typeid,
        connects: []
      }],
      x: -cnt * 300,
      y: -300,
      usingStruct: []
    });
    if (t.ioc === -1) {
      node.pop();
    }
    assertEq(cnt, t.typeid);
  }
  for (const rec of records_raw) {
    for (let t = 0; t < type_name.length; t++) {
      const pins: NodePin[] = [];
      for (let pin = 0; pin < 50; pin++) {
        if (rec.inputs[pin] === undefined || rec.inputs[pin] === null) {
          pins.push({
            i1: {
              kind: 3,
              index: pin,
            },
            i2: {} as any,
            value: {} as any,
            type: type_name[t].typeid,
            connects: [{
              id: t + 1,
              connect: {
                kind: 4,
                index: 0
              },
              connect2: {
                kind: 4,
                index: 0
              },
            }]
          });
        }
      }
      node.push({
        nodeIndex: ++cnt,
        genericId: {
          class: info.node_class,
          type: info.node_type,
          kind: info.node_kind,
          nodeId: rec.id
        },
        pins,
        x: (cnt % 20) * 300,
        y: (cnt / 20) * 300,
        usingStruct: []
      });
    }
  }
  // dir(node[154]);
  save("all_link.gia", graph, true);
  // save("all_link.gia", graph, false);
  console.log("all_link saved");
}


function read_all_links() {
  const graph = gia("all_link.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  // return dir(nodes.slice(11, 14));
  // const info = collection().find(x => x.name === "skill")!;
  const types: string[] = [];
  let cnt = 0;
  // get custom variable: all types
  for (const t of type_name) {
    types.push(t.type);
    if (t.ioc !== -1) cnt++;
  }
  // console.log(nodes.length, cnt, cnt * records_raw.length);
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (pin.connects.length > 0) {
        // if (node.genericId.nodeId === 200051) debugger;
        assertEqs(ip[pin.i1.index], undefined, null);
        assertEq(pin.connects[0].id, pin.type);
        ip[pin.i1.index] = type_name.find(x => x.typeid === pin.type)!.type;
      }
    }
  }
  const state = {
    type0: new Set(),
    type3: new Set(),
    restricted_pin: [] as any[],
    default_val: [] as any[],
  };
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (pin.i1.kind === 5) {
        assertNotEq(pin.clientExecNode, undefined);
        if (node.genericId.nodeId === 200124 && pin.type !== 3) {
          assertEq(pin.clientExecNode.nodeId, undefined);
          assertEq(pin.clientExecNode.kind, 6);
          assertEq(pin.type, 9);
        } else {
          assertEq(pin.clientExecNode.nodeId?.id, node.genericId.nodeId);
          assertEq(pin.clientExecNode.kind, 5);
          assertEqs(pin.value.itemType?.type_client?.type, 3, 0);
          if (pin.value.itemType?.type_client?.type === 3) {
            state.type0.add(node.genericId.nodeId);
            assertEq(pin.value.bInt?.val, 0);
          } else {
            assertEq(pin.value.itemType?.type_client?.type, 0);
            state.type3.add(node.genericId.nodeId);
          }
        }
        assertEq(pin.clientExecNode.index, 1);
        continue;
      }
      assertEq(pin.i1.kind, 3);
      // if (node.genericId.nodeId === 200051) debugger;
      if (ip[pin.i1.index] === undefined || ip[pin.i1.index] === null) {
        assertEq(pin.connects.length, 0);
        if (pin.type === 13) {
          assertNotEq(pin.value.bEnum?.val, undefined);
          const type_id = ENUM_VALUE_TO_ID.get(pin.value.bEnum.val);
          assertNotEq(type_id, undefined);
          ip[pin.i1.index] = `E<${type_id}>`;
          if (type_id !== -1) {
            state.default_val.push({
              node: node.genericId.nodeId,
              pin: pin.i1.index,
              type: `E<${type_id}>`,
              val: pin.value.bEnum.val,
            });
          }
        } else {
          // restricted_pin: 无法通过连线传入值的
          state.restricted_pin.push({
            node: node.genericId.nodeId,
            pin: pin.i1.index,
            type: pin.type,
          });
          const val = pin.value.bEnum?.val
            ?? pin.value.bInt?.val
            ?? pin.value.bFloat?.val
            ?? pin.value.bString?.val
            ?? pin.value.bId?.val;
          if (val !== undefined && val !== 0 && val !== "") {
            console.warn("N/A");
            state.default_val.push({
              node: node.genericId.nodeId,
              pin: pin.i1.index,
              type: pin.type,
              val,
            });
          }
          const tp = type_name.find(t => t.typeid === pin.type)!.type;
          ip[pin.i1.index] = tp;
        }
      } else {
        if (pin.type === 0 || pin.type === 13) {

        } else {
          // ensure the types are all right
          assertEqs(type_name.find(x => x.typeid === pin.type)?.type, ip[pin.i1.index]);
        }
      }
    }
  }
  dir(state);
  // dir(records_raw.find(x => x.id === 200116));
  console.log("全部 37 个 Execution Node 均含有一个 kind=5 的引脚, 不知道是干啥的, 感觉是个中间体, 没啥有效信息. 且200124有两个 kind=5 的引脚.");
  save("node_pins_no_links.json", state.restricted_pin);
  save("node_pins_default_vals.json", state.default_val);
  save("../06_match_types/node_records_inputs.json", records_raw);
  // save("all_link.gia", graph, true);
  console.log("all_link saved");
}

// 生成所有包含枚举输入的节点. 手动添加枚举, 方便获取枚举类型
function create_all_enums() {
  const rec = records_in.filter(x => x.inputs.some(y => y === "E<-1>" || y === "L<E<0>>"));
  // dir(rec.map(x => x.id));
  // [200040,200043,200044,200050,200051,200059,200060,200062,200109,200110,200111,200112,200113,200114,200115,200116]
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  for (let i = 0; i < rec.length; i++) {
    nodes.push({
      nodeIndex: i + 1,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: rec[i].id
      },
      pins: [],
      x: i * 300,
      y: 0,
      usingStruct: []
    })
  }
  dir(rec.map((x, i) => ({
    index: i + 1,
    id: x.id,
    name: x.name,
    inputs: x.inputs.map((y, j) => (j + ":" + y)).filter(y => y.endsWith("E<-1>") || y.endsWith("L<E<0>>"))
  })));
  save("all_enums.gia", graph, true);
  console.log("all_enums saved");
}

function read_all_enums() {
  const rec = records_in.filter(x => x.inputs.some(y => y === "E<-1>" || y === "L<E<0>>"));
  // dir(rec.map(x => x.id));
  // [200040,200043,200044,200050,200051,200059,200060,200062,200109,200110,200111,200112,200113,200114,200115,200116]
  const graph = gia("all_enums.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  for (let i = 0; i < rec.length; i++) {
    assertEq(nodes[i].nodeIndex, i + 1);
    assertEq(nodes[i].genericId.nodeId, rec[i].id);
    const pins = nodes[i].pins;
    rec[i].inputs.forEach((t, index) => {
      if (t !== 'E<-1>') return;
      const type = pins.find(p => p.i1.index === index)!.value.bEnum!.val;
      const tp = ENUM_VALUE_TO_ID.get(type);
      assertNotEqs(tp, undefined);
      if (tp !== -1) {
        rec[i].inputs[index] = `E<${tp}>`;
        return;
      }
      if (rec[i].name === "Get Entity Type List" || rec[i].name === "Get Ray Filter Type List") {
        rec[i].inputs[index] = rec[i].inputs[index - 1];
      }
    })
  }
  rec.forEach(r => r.inputs.forEach((t, index) => {
    if (t === "E<-1>")
      r.inputs[index] = r.inputs[index - 1];
  }));
  const setType = (name: string, pos: number, type: string) => {
    const r = rec.find(r => r.name === name)!.inputs;
    assertEq(r[pos], "L<E<0>>");
    r[pos] = type;
  }
  const entity_type = "L<E<13>>";
  const attack_layer_config = "L<E<30>>";
  setType("Trigger Hitbox at Specific Location", 5, entity_type);
  setType("Trigger Hitbox at Specified Attachment Point", 6, entity_type);
  setType("Get Ray Detection Result", 5, entity_type);
  setType("Get Ray Detection Result", 6, attack_layer_config);
  setType("Trigger Spherical Hitbox at Specific Location", 5, entity_type);
  setType("Trigger Rectangular Hitbox at Specific Location", 5, entity_type);
  setType("Trigger Sector Hitbox at Specific Location", 5, entity_type);
  setType("Trigger Spherical Hitbox at Specified Attachment Point", 6, entity_type);
  setType("Trigger Rectangular Hitbox at Specified Attachment Point", 6, entity_type);
  setType("Trigger Sector Hitbox at Specified Attachment Point", 6, entity_type);
  dir({
    "Should be empty": rec.map((x, i) => ({
      index: i + 1,
      id: x.id,
      name: x.name,
      inputs: x.inputs.map((y, j) => (j + ":" + y)).filter(y => y.endsWith("E<-1>") || y.endsWith("L<E<0>>"))
    })).filter(x => x.inputs.length > 0)
  });
  save("node_records_inputs.json", records_in);
  console.log("node_records_inputs saved");
}

// 验证枚举类型是一致的
import records_2 from "../dist/node_records_inputs.json" with { type: "json" };
function create_all_nodes_enums() {
  const ENUM_ID_TO_VALUE = new Map([...ENUM_VALUE_TO_ID.entries()].map(([k, v]) => [v, k]));
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  for (let i = 0; i < records_2.length; i++) {
    const pins: NodePin[] = [];
    records_2[i].inputs.forEach((t, j) => {
      const type = records_2[i].inputs[j];
      if (type.startsWith("E<")) {
        const val = ENUM_ID_TO_VALUE.get(parseInt(type.slice(2, -1))!);
        assertNotEq(val, undefined);
        pins.push({
          i1: {
            kind: 3,
            index: j,
          },
          i2: {
            kind: 3,
            index: 0,
          },
          value: {
            class: 6,
            alreadySetVal: true,
            itemType: {
              classBase: 1,
              type_client: {
                type: 13
              }
            },
            bEnum: {
              val
            },
          },
          type: 13,
          connects: []
        })
      }
    });
    nodes.push({
      nodeIndex: i + 1,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: records_2[i].id
      },
      pins,
      x: (i % 10) * 500,
      y: i / 10 * 500,
      usingStruct: []
    });
  }
  save("all_nodes_enums.gia", graph, true);
  console.log("all_nodes saved");
}

function read_all_nodes_enums() {
  const graph = gia("all_nodes_enums.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  for (let i = 0, j = 0; i < nodes.length; i++, j++) {
    const pins = nodes[i].pins;
    while (nodes[i].nodeIndex > j + 1) { j++; }
    assertEq(records_2[j].id, nodes[i].genericId.nodeId);
    records_2[j].inputs.forEach((t, index) => {
      if (!t.startsWith('E<')) return;
      const val = parseInt(t.slice(2, -1));
      const type = pins.find(p => p.i1.index === index)!.value.bEnum?.val!;
      const val_type = ENUM_VALUE_TO_ID.get(type);
      assertEqs(val_type, val, undefined);
      console.log(records_2[j].id, index, val, val_type, type);
    })
  }
  console.log("Verified!")
}

cls();

// generate_all_links();
// read_all_links();

// create_all_enums();
// read_all_enums();

// create_all_nodes_enums();
read_all_nodes_enums();


