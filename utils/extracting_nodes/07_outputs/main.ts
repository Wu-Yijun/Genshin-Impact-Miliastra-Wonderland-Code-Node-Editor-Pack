import { collection, dir, gia, save } from "../util.ts";
import RECORDS from "../dist/node_records_inputs.json" with { type: "json" };
import { VarBase_Class, type NodePin } from "../../protobuf/gia.proto.ts";
import { assert, assertEq } from "../../utils.ts";
import type_name from "../dist/type_ids.json" with { type: 'json' };

// 每一个节点尝试分别连接到不同indexOfConcrete的 SetLocalVariable(200081) 的第二个入引脚上. 为一行(1 + 19(0~18))
function create_outputs_links() {
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  RECORDS.forEach((rec, i) => {
    const pins: NodePin[] = [];
    nodes.push({
      nodeIndex: (i + 1) * 100,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: rec.id
      },
      pins,
      x: -1000,
      y: i * 300,
      usingStruct: []
    });
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 19; k++) {
        nodes.push({
          nodeIndex: (i + 1) * 100 + j * 20 + k + 1,
          genericId: {
            class: info.node_class,
            type: info.node_type,
            kind: info.node_kind,
            nodeId: 200081
          },
          pins: [{
            i1: {
              kind: 3,
              index: 1,
            },
            i2: {} as any,
            value: {
              class: VarBase_Class.ConcreteBase,
              alreadySetVal: true,
              bConcreteValue: {
                indexOfConcrete: k,
                value: {} as any
              }
            },
            type: 0,
            connects: [{
              id: (i + 1) * 100,
              connect: {
                kind: 4,
                index: j,
              },
              connect2: {
                kind: 4,
                index: j,
              }
            }],
          }],
          x: (j * 20 + k) * 100,
          y: i * 300,
          usingStruct: []
        })
      }
    }
  });
  save("outputs.gia", graph, true);
  console.log("outputs.gia saved with", nodes.length, "nodes");
}

function read_output_links() {
  const graph = gia("outputs.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  nodes.forEach(n => {
    n.pins.filter(p => p.connects.length > 0).forEach(p => {
      p.connects.forEach(c => {
        assertEq(c.id % 100, 0);
        const index = c.id / 100 - 1;
        const type = type_name.find(t => t.typeid === p.type)!.type;
        if (RECORDS[index].outputs[c.connect.index]?.startsWith("R<")) {
          return;
        }
        if (RECORDS[index].outputs[c.connect.index]?.startsWith("L<R<")) {
          return;
        }
        assertEq(RECORDS[index].outputs[c.connect.index], undefined);
        RECORDS[index].outputs[c.connect.index] = type;
      })
    })
  });
  // dir(RECORDS.map(r => r.outputs).filter(x => x.length > 0));
  save("../07_outputs/node_records_outputs.json", RECORDS);
}

import record2 from "../07_outputs/node_records_outputs.json" with { type: "json" };
function create_outputs_special() {
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  record2.filter((x, i) => [46, 51, 110, 120, 123].includes(i + 1)).forEach((rec, i) => {
    const pins: NodePin[] = [];
    nodes.push({
      nodeIndex: (i + 1),
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: rec.id
      },
      pins,
      x: 0,
      y: i * 300,
      usingStruct: []
    });
  });
  save("outputs_special.gia", graph, true);
  console.log("outputs_special.gia saved with", nodes.length, "nodes");
}

function create_node_graph_end() {
  const graph = gia("int");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "int")!;
  record2.filter((x, i) => x.name.startsWith("Node Graph End")).forEach((rec, i) => {
    const pins: NodePin[] = [];
    nodes.push({
      nodeIndex: (i + 1),
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: rec.id
      },
      pins,
      x: 0,
      y: i * 300,
      usingStruct: []
    });
  });
  save("outputs_int.gia", graph, true);
  console.log("outputs_int.gia saved with", nodes.length, "nodes");
}

function add_type_manually() {
  const setType = (name: string, pos: number, type: string, is_in = false) => {
    const rec = record2.find(r => r.name === name)!;
    const p = is_in ? rec.inputs : rec.outputs;
    assertEq(p[pos], undefined);
    p[pos] = type;
  }
  setType("Get Entity's Type", 0, "E<13>");
  setType("Get Entity Type List", 0, "L<E<30>>");
  setType("Get Ray Filter Type List", 0, "L<E<13>>");
  setType("Get Entity's Scan Status", 0, "E<40>");
  setType("Get Player Client Input Device Type", 0, "E<41>");

  setType("Node Graph End (Boolean)", 0, "Bol", true);
  setType("Node Graph End (Boolean)", 1, "E<38>", true); // 1000010
  setType("Node Graph Ends", 0, "Int", true);
  setType("Node Graph Ends", 1, "E<38>", true); // 1000011
  setType("Node Graph End (Integer)", 0, "Bol", true);
  setType("Node Graph End (Integer)", 1, "E<38>", true); // 10000011

  save("../07_outputs/node_records_outputs.json", record2);
}

function add_enum_cid_format() {
  record2.forEach(rec => {
    switch (rec.name) {
      case "Enumeration Match":
      case "Data Type Conversion":
      case "Assembly List":
        rec.reflectMap!.forEach(x => x[0] = rec.id + " " + x[0]);
        break;
    }
    rec.reflectMap?.forEach(([id, type]) => {
      const [gid, cid, tp, undef] = id.split(" ");
      assertEq(gid, rec.id.toString());
      assertEq(tp, type);
      assertEq(undef, undefined);
    })
  })
  save("node_records.json", record2);
}

// create_outputs_links();
// read_output_links();

// create_outputs_special();
// create_node_graph_end();
// add_type_manually();
// 46, 51, 110, 120, 123

add_enum_cid_format();