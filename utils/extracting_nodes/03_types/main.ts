import { NodeGraph_Id_Kind, NodePin_Index_Kind, VarBase_Class } from "../../protobuf/gia.proto.ts";
import { collection, dir, gia, Names, read_json, save } from "../util.ts";

import { assert, assertEq } from "../../utils.ts";
import { enum_val, enums, records, records as records_raw } from "./records.ts";
import { ENUM_ID, ENUM_VALUE } from "../../node_data/index.ts";
import { ENUM_ID_CLIENT } from "./enum_id.ts";
import yaml from "yaml";
import { readFileSync } from "fs";

function create_types_ids() {
  // 200016,40
  const graph = gia("skill", "01_collection");
  const info = collection().find(x => x.name === "skill")!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  for (let i = 0; i < 30; i++) {
    nodes.push({
      nodeIndex: i + 1,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: 200016,
      },
      pins: [{
        i1: {
          kind: NodePin_Index_Kind.OutParam,
          index: 0
        },
        i2: {
          kind: NodePin_Index_Kind.OutParam,
          index: 0
        },
        value: {
          class: VarBase_Class.ConcreteBase,
          bConcreteValue: {
            indexOfConcrete: i,
            value: {} as any,
          },
          alreadySetVal: true,
        },
        type: 0,
        connects: []
      }],
      x: i * 200,
      y: 0,
      usingStruct: []
    });
  }
  save("temp.gia", graph, true);
}

function get_type_ids() {
  const graph = gia("temp.gia", true);
  const info = collection().find(x => x.name === "skill")!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const types = Object.entries({
    Bol: 1,
    Int: 2,
    Flt: 3,
    Str: 4,
    Gid: 5,
    Ety: 6,
    Vec: 7,
    "L<Int>": 8,
    "L<Str>": 9,
    "L<Ety>": 10,
    "L<Gid>": 11,
    "L<Flt>": 12,
    "L<Vec>": 13,
    "L<Bol>": 14,
    "Cfg": 15,
    "Pfb": 16,
    "L<Cfg>": 17,
    "L<Pfb>": 18,
    "Fct": 19,
  });
  const ret = nodes.map((n, i) => {
    const type = types[i]?.[0];
    const p = n.pins.find(x => x.i2.kind === 4);
    assertEq(n.concreteId?.nodeId === undefined, type === undefined);
    return {
      type: type,
      typeid: p?.type,
      typeid2: p?.value.bConcreteValue?.value?.itemType?.type_client?.type,
      gid: n.genericId.nodeId,
      cid: n.concreteId?.nodeId,
      ioc: p?.value.bConcreteValue?.indexOfConcrete,
    }
  }).filter(x => x.type !== undefined).sort((a, b) => a.typeid! - b.typeid!);
  dir(ret);
  dir(ret.map(x => { return { type: x.type, typeid: x.typeid } }));
  save("type_ids.json", ret);
}

// 测试每一个引脚的每一种可能的泛类, 查看哪些引脚是有反射的
function create_concrete_pins() {
  // 200016,40
  const graph = gia("skill", "01_collection");
  const info = collection().find(x => x.name === "skill")!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const ids = (read_json(`node_id_skill.json`) as any[]).filter(x => x.cid === undefined);

  let y = 1;
  for (const id of ids) {
    for (let ioc = 0; ioc < 22; ioc++) {
      const pin = (idx: number, is_in = true) => ({
        i1: {
          kind: is_in ? NodePin_Index_Kind.InParam : NodePin_Index_Kind.OutParam,
          index: idx
        },
        i2: {
          kind: is_in ? NodePin_Index_Kind.InParam : NodePin_Index_Kind.OutParam,
          index: idx
        },
        value: {
          class: VarBase_Class.ConcreteBase,
          bConcreteValue: {
            indexOfConcrete: ioc,
            value: {} as any,
          },
          alreadySetVal: true,
        },
        type: 0,
        connects: []
      });
      nodes.push({
        nodeIndex: (id.gid % 1000) * 100 + ioc,
        genericId: {
          class: info.node_class,
          type: info.node_type,
          kind: info.node_kind,
          nodeId: id.gid,
        },
        pins: [...Array.from({ length: 10 }, (_, i) => pin(i)), ...Array.from({ length: 10 }, (_, i) => pin(i, false))],
        x: ioc * 300,
        y: y * 200,
        usingStruct: []
      });
    }
    y++;
  }
  dir(nodes.length);
  save("temp.gia", graph, true);
}

function read_concrete_pins() {
  const graph = gia("temp.gia", true);
  const info = collection().find(x => x.name === "skill")!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const ids = (read_json(`node_id_skill.json`) as any[]).filter(x => x.cid === undefined);

  // dir(nodes.length);
  // return;

  let i = 0;
  const ret = [];
  for (const id of ids) {
    let res = { gid: id.gid, in: [] as string[], out: [] as string[], ref_maps: [] as number[][] };
    for (let ioc = 0; ioc < 22; ioc++) {
      const node = nodes[i++];
      // assert(node !== undefined);
      if (node.concreteId?.nodeId !== undefined) {
        const pins = node.pins.filter(x => x.value.bConcreteValue?.indexOfConcrete !== undefined);
        const types = pins.map(x => x.type);
        const type = Math.min(...types);
        res.ref_maps.push([node.concreteId.nodeId!, type, ioc]);
        pins.forEach((p) => {
          const port = p.i1.kind === NodePin_Index_Kind.InParam ? res.in : res.out;
          if (port[p.i1.index] !== undefined) assertEq(port[p.i1.index], p.type === type ? "R<T>" : "L<R<T>>")
          port[p.i1.index] = p.type === type ? "R<T>" : "L<R<T>>";
        })
      }
    }
    ret.push(res);
  }
  dir(ret);
  save("node_reflects_records.json", ret);
  // save("temp.gia", graph, true);
}

// 测试 enum equal
function gen_enums_equals() {
  const graph = gia("skill", "01_collection");
  const info = collection().find(x => x.name === "skill")!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;

  for (let ioc = 0; ioc < 50; ioc++) {
    const pin = (idx: number, is_in = true) => ({
      i1: {
        kind: is_in ? NodePin_Index_Kind.InParam : NodePin_Index_Kind.OutParam,
        index: idx
      },
      i2: {
        kind: is_in ? NodePin_Index_Kind.InParam : NodePin_Index_Kind.OutParam,
        index: idx
      },
      value: {
        class: VarBase_Class.ConcreteBase,
        bConcreteValue: {
          indexOfConcrete: ioc,
          value: {} as any,
        },
        alreadySetVal: true,
      },
      type: 0,
      connects: []
    });
    nodes.push({
      nodeIndex: ioc + 100,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: 200005,
      },
      pins: [...Array.from({ length: 3 }, (_, i) => pin(i))],
      x: ioc * 300,
      y: 0,
      usingStruct: []
    });
  }
  dir(nodes.length);
  save("temp.gia", graph, true);
}

function read_enum_equals() {
  const graph = gia("temp.gia", true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  nodes.forEach((n, i) => {
    if (i > 41) return;
    assertEq(n.concreteId?.nodeId, 10);
    assertEq(n.pins[0].value.bConcreteValue?.indexOfConcrete, i);
  });
}

function compare_with_server() {
  const es = enums.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  const ES = Object.values(ENUM_ID);
  for (let ioc = 0; ioc < 41; ioc++) {
    const name = es[ioc].replaceAll(/[^a-zA-Z]+/g, "_");
    const e = (ENUM_ID as any)[name];
    console.log(e ?? -1, "\t", ioc, "\t", name);
  }
}

function read_enum_values() {
  const graph = gia("skill_enum_new", "03_types", true);
  const ret = new Map<number, number[]>();
  const es = enums.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  graph.graph.graph?.inner.graph.nodes!.forEach(n => {
    if (n.genericId.nodeId !== 200005) return;
    if (n.nodeIndex > 99) return;
    const ioc = n.pins[0].value.bConcreteValue?.indexOfConcrete!;
    if (!ret.has(ioc)) ret.set(ioc, []);
    ret.get(ioc)!.push(n.pins[0].value.bConcreteValue?.value.bEnum?.val!);
    ret.get(ioc)!.push(n.pins[1].value.bConcreteValue?.value.bEnum?.val!);
  });
  // dir(ret);
  const val = enum_val.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  assertEq(es.length, ret.size);
  // return dir(es)
  let i = 0, ii = 0;
  const ret2 = {} as any;
  for (const [ioc, vs] of ret) {
    const ids = vs.filter(x => x > 0);
    // console.log(ids);
    for (const id of ids) {
      const n2 = val[i++].replaceAll(/[ ][a-z]/g, a => a.toUpperCase()).replaceAll(/[^0-9A-Za-z]+/g, "")
      ret2[es[ii]![0].replaceAll("_", "") + "_" + n2] = id;
    }
    ii++;
  }
  assertEq(i, val.length);
  dir(ret2);
  save("enum_values.json", ret2);
}

import "../../node_data/yaml/enum_id.yaml.d.ts";
function create_enum_list() {
  const es = enums.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  const val = enum_val.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  const ret: { name: string, id: number, indexOfConcrete: number, items: Record<number, string> }[] = [];
  const data: EnumList = yaml.parse(readFileSync("./utils/node_data/yaml/enum_id.yaml").toString());
  let i = 0, j = 0;
  for (const name of es) {
    const id = (ENUM_ID_CLIENT as any)[name.replaceAll(/[^0-9A-Za-z]+/g, " ").trim().replaceAll(/[ ][a-z]/g, s => s.toUpperCase()).replaceAll(" ", "_")];
    assert(id !== undefined, "Cannot find " + name);
    const res = {
      name: name,
      id: 10,
      indexOfConcrete: id,
      items: {} as Record<number, string>
    }
    const sn = name.replaceAll(/[^a-zA-Z]/g, "").toLowerCase();
    const ids = Object.entries(ENUM_VALUE).filter(x => x[0].toLowerCase().startsWith(sn));
    const server_id = data.EnumList.find(x => name.toLowerCase().endsWith(x.name.toLowerCase()))?.items;
    for (let k = 0; k < ids.length; k++) {
      const v = val[j]?.replaceAll(/[^a-zA-Z]/g, "").toLowerCase();
      if (ids[k][0].toLowerCase().endsWith(v)) {
        res.items[ids[k][1]] = val[j++];
      } else if (server_id) {
        res.items[ids[k][1]] = server_id[ids[k][1]];
      } else {
        console.error("Not found:", name);
      }
    }
    ret.push(res);
  }
  assertEq(j, val.length);
  // dir(ret);
  save("client_enum_list.json", ret);
}

function compare_enum_value() {
  const ev = Object.entries(read_json("enum_values.json"));
  const EV = Object.entries(ENUM_VALUE);
  for (const [k, v] of ev) {
    const e = EV.find(x => x[1] === v);
    if (e !== undefined) {
      console.log(e[1], "\t", e[0], "\t", k);
    }
  }
}

function read_type_conv_types() {
  const graph = gia("skill_type_conv", "03_types", true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  nodes.forEach(n => {
    if (n.genericId.nodeId !== 200022) return;
    const cid = n.concreteId?.nodeId;
    const ioc = n.pins[1].value.bConcreteValue?.indexOfConcrete!;
    const t1 = n.pins[1].type;
    const ioc2 = n.pins[2].value.bConcreteValue?.indexOfConcrete!;
    const t2 = n.pins[2].type;
    // assertEq(ioc, n.nodeIndex);
    dir({ cid, ioc, ioc2, t1, t2 });
  });
}


// create_types_ids();
// get_type_ids()
// create_concrete_pins();
// read_concrete_pins();
// gen_enums_equals();
// read_enum_equals();
// compare_with_server()

// read_enum_values();
// compare_enum_value();
// create_enum_list();

// read_type_conv_types();

// convert_records_to_name();