import type { NodePin } from "../../protobuf/gia.proto";
import { collection, dir, gia, save } from "../util.ts";

import records_raw from "../dist/node_records_no_type.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import { assert, assertEqs } from "../../utils.ts";

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
    })
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
  // const info = collection().find(x => x.name === "skill")!;
  const types: string[] = [];
  let cnt = 0;
  // get custom variable: all types
  for (const t of type_name) {
    types.push(t.type);
    cnt++;
  }
  // console.log(nodes.length, cnt, cnt * records_raw.length);
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (pin.connects.length > 0) {
        assertEqs(ip[pin.i1.index], undefined, null);
        ip[pin.i1.index] = types[pin.connects[0].id - 1];
      }
    }
  }
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (ip[pin.i1.index] === undefined || ip[pin.i1.index] === null) {
        assertEqs(pin.connects.length, 0);
        if (pin.type !== 13 && pin.value.bConcreteValue?.indexOfConcrete !== -1) {
          ip[pin.i1.index] = type_name.find(t => t.typeid === pin.type)!.type;
          console.log(node.genericId.nodeId, pin.i1.index, pin.type)
        }
        // ip[pin.i1.index] = types[pin.connects[0].id - 1];
      }
    }
  }
  // dir(records_raw);
  // save("node_records_no_outs.json", records_raw);
  // save("all_link.gia", graph, true);
  // console.log("all_link saved");
}

// generate_all_links();
read_all_links();