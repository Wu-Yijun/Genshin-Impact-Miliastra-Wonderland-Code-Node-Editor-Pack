import { readFileSync, writeFileSync } from "fs";
import util from "node:util";
import assert from "node:assert";
import { graph_body, node_body, node_type_pin_body } from "./basic.ts";

import type { NodePin, GraphNode } from "../protobuf/gia.proto.ts";
import { NodePin_Index_Kind, VarBase_Class } from "../protobuf/gia.proto.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { get_id, get_type, type NodeType, parse, stringify, to_string, type NodePinsRecords, BasicTypes, reflect, reflects } from "./nodes.ts";
import { fixSparseArrays } from "../../src/util.ts";
import { randomInt } from "./utils.ts";
import { derived_records } from "../node_id/node_defines.ts";

function generate_all_nodes(from: number, size: number = 300, line_width: number = 20, offsets: number = 1): GraphNode[] {
  const ret = [];
  for (let i = 0; i < size; i++) {
    const y = Math.floor(i / line_width);
    const x = i % line_width;
    for (let k = 0; k < offsets; k++) {
      ret.push(node_body({
        generic_id: from + i as any,
        concrete_id: from + i + k as any,
        x: x,
        y: y * 2,
        pins: []
      }));
    }
  }
  return ret;
}
function gen_node(id1: number, id2?: number) {
  const i2 = id2 ?? id1;
  return node_body({
    generic_id: id1 as any,
    concrete_id: i2 as any,
    x: id1,
    y: i2 - id1,
    pins: [],
  });
}

// ====== Step 1 ======
function create_graph(w: number = 20, h: number = 15, len: number = 1) {
  const N = w * h * len;
  console.time(`Create ${N} nodes in`);

  const uid = randomInt(9, "201");
  const graph_id = randomInt(10, "102");
  const nodes = [];
  const graph = graph_body({
    uid: uid,
    graph_id: graph_id,
    nodes: generate_all_nodes(1, w * h, w, len),
  });

  console.timeEnd(`Create ${N} nodes in`);
  console.log(graph);

  console.time(`Encode ${N} nodes in`);
  encode_gia_file({
    out_path: "./utils/ref/all_server_nodes.gia",
    gia_struct: graph
  })
  console.timeEnd(`Encode ${N} nodes in`);
  console.log("Saved to", "./utils/ref/all_server_nodes.gia");
}
function read_trimmed_graph() {
  const graph = decode_gia_file({
    gia_path: "./utils/ref/all_server_nodes_trim.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  const tags = nodes.map(x => [x.genericId.nodeId, x.concreteId?.nodeId]);
  const res = tags.map(([b, d]) => d === undefined ? `${b}:Generic` : `${b}:Basic`);
  writeFileSync("./utils/node_id/ref/generic.txt", res.join("\n"));
}
function get_graph_ids(type?: "Generic" | "Basic"): number[] {
  const data = readFileSync("./utils/node_id/ref/generic.txt").toString();
  const nodes = data.split("\n").map(x => x.split(":"));
  return nodes.filter((x) => type === undefined || x[1] === type).map(x => parseInt(x[0]));
}



// ====== Step 2 ======
function create_derived() {
  const ids = get_graph_ids("Generic");
  const uid = randomInt(9, "201");
  const graph_id = randomInt(10, "102");
  const nodes: GraphNode[] = [];
  for (let index = 0; index < ids.length; index++) {
    const id1 = ids[index];
    const node = node_body({
      generic_id: id1 as any,
      concrete_id: id1 as any,
      x: index * 1.5,
      y: 0,
      pins: [],
    });
    nodes.push(node);
  }
  const graph = graph_body({
    uid: uid,
    graph_id: graph_id,
    nodes: nodes,
  });
  encode_gia_file({
    out_path: "./utils/ref/derived_server_nodes.gia",
    gia_struct: graph
  })
  console.log("Saved to", "./utils/ref/derived_server_nodes.gia");
}

function create_node_with_pin(id: number, pin_index: number[], type: number, x = 0, y = 0) {
  const pin: NodePin = {
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
        indexOfConcrete: type,
        value: {} as any,
      }
    },
    type: undefined as any,
    connects: undefined as any,
  };
  const pins: NodePin[] = [];
  for (let i = -6; i < 6; i++) {
    const p = structuredClone(pin);
    if (!pin_index.includes(i)) {
      p.value.bNodeValue!.indexOfConcrete = 0;
    }
    if (i < 0) {
      p.i1.kind = NodePin_Index_Kind.OutParam;
      p.i2.kind = NodePin_Index_Kind.OutParam;
      p.i1.index = -1 - i;
      p.i2.index = -1 - i;
    } else {
      p.i1.index = i;
      p.i2.index = i;
    }
    pins.push(p);
  }
  return node_body({
    generic_id: id as any,
    concrete_id: id as any,
    x: x,
    y: y,
    pins: pins,
  });
}
function create_node_lists(list: (number | (number | null)[])[]) {
  const ids = get_graph_ids("Generic");
  const nodes: GraphNode[] = [];
  for (let i = 0; i < list.length; i++) {
    let neg = false;
    const pin = [list[i]].flat().map(x => {
      if (neg) {
        return -x! - 1;
      } else if (x === null) {
        neg = true;
        return null;
      }
      return x;
    }).filter(x => x !== null);
    for (let j = 0; j < 21; j++) {
      nodes.push(create_node_with_pin(ids[i], pin, j, i, j));
    }
  }
  const graph = graph_body({
    uid: randomInt(9, "201"),
    graph_id: randomInt(10, "102"),
    nodes: nodes,
  });
  encode_gia_file({
    out_path: "./utils/ref/derived_server_nodes_pin.gia",
    gia_struct: graph
  })
}



function read_derive_graph() {
  const graph = decode_gia_file({
    gia_path: "./utils/ref/derived_server_nodes_ids.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  const missing = new Set(nodes.map(x => x.genericId.nodeId as number));
  const tags = nodes.filter(x => x.concreteId?.nodeId !== undefined)
    .map(x => ({ id: x.genericId.nodeId, derived: x.concreteId.nodeId }));
  const g = Object.entries(Object.groupBy(tags, x => x.id)).map(([k, v]) => ({ id: parseInt(k), derived: v.map(x => x.derived) }));
  g.forEach(({ id }) => missing.delete(id));

  const ids = get_graph_ids("Generic");
  const m = [];
  for (const k of missing) {
    m.push([ids.findIndex((x) => x === k), k].join(":"));
  }
  console.log("Missing Concrete Id:", m);


  const res = g.map(({ id, derived }) => `${id}:${derived.length}:${derived.join(",")}`);
  writeFileSync("./utils/node_id/ref/derived.txt", res.join("\n"));

  const arr = Array(2000).fill("");
  get_graph_ids("Generic").forEach((i) => arr[i] = "ServerGeneric:" + i);
  get_graph_ids("Basic").forEach((i) => arr[i] = "ServerBasic");
  for (const a of g) {
    a.derived.forEach((i) => arr[i] = "ServerGeneric:" + a.id);
  }
  writeFileSync("./utils/node_id/ref/all_1.txt", arr.join("\n"));
}

// /** number for pure type, [number, number] for key-value */
// type PinType = number | [number, number];
// /** Positive number starting from 1 for input, negative for output */
// type PinTypes = { [id: number]: PinType };
// type NodeTypes = { [node_id: number]: PinTypes };

function extract_types() {
  // 手动读取57个泛类的引脚位置
  const LIST: (number | (number | null)[])[] = [
    0,
    [0, 1],
    [0, 1],
    1,
    2, // Set Cus Var
    [null, 3, 4],
    [null, 0],
    [0, 1],
    0,
    [0, 1], // List Includes
    [0, 1],
    0,
    0,
    0,
    [0, null, 0], // Maximum
    [0, null, 0],
    0,
    [0, 3],
    0,
    [0, null, 0], // Assemble
    [0, null, 0], // Convert
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0], // Div
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0], // Sgn
    [0, 1, 2, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0],
    [0, 1, null, 0], // GE
    [1],
    [null, 0],
    [null, 3, 4],
    [null, 3, 4],
    2, // Native Setting CV
    [null, 0],
    [0, 1],
    [0, null, 0],
    3,
    [0, 1, 2], // Set KV
    [0, 1, null, 1],
    [0, 1, null, 0],
    [0, 1],
    [0, 1],
    [0, 1], // Query dict V
    [0, null, 0],
    [0, null, 0],
    [0, null, 0],
    [0], // Clear D
    [0, 1, null, 0],
    [0, null, 0, 1],
    [0, null, 0, 1],
  ];
  const list: [number[], number[]][] = LIST.map(x => [x].flat())
    .map(x => { const p = x.indexOf(null); return p === -1 ? [x, []] : [x.slice(0, p), x.slice(p + 1)]; }) as any;
  const graph = decode_gia_file({
    gia_path: "./utils/ref/derived_server_nodes_ids.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  const group = Object.groupBy(nodes, (n) => n.genericId.nodeId as number);
  const keys = Object.keys(group);

  const ret: NodePinsRecords[] = [];
  for (let i = 0; i < keys.length; i++) {
    const g = group[parseInt(keys[i])]!;
    const rec: NodePinsRecords = {
      id: g[0].genericId.nodeId,
      inputs: [],
      outputs: [],
      reflectMap: [],
    };
    // for (const n of g.find(x => x.concreteId?.nodeId !== undefined)?.pins ?? []) {
    //   if (n.i1.kind === NodePin_Index_Kind.InParam) {
    //     rec.inputs[n.i1.index ?? 0] = "R<T>";
    //   } else if (n.i1.kind === NodePin_Index_Kind.OutParam) {
    //     rec.outputs[n.i1.index ?? 0] = "R<T>";
    //   }
    // }
    const [inputs, outputs] = list[i];
    inputs.forEach(x => rec.inputs[x] = "R<T>");
    outputs.map(x => rec.outputs[x] = "R<T>");
    for (let j = 0; j < g.length; j++) {
      if (g[j].concreteId?.nodeId === undefined) {
        continue;
      }
      for (const p of g[j].pins) {
        // console.log(i, j, p.i1);
        // assert.equal(p.i1.kind, NodePin_Index_Kind.InParam);
        if (p.i1.kind === NodePin_Index_Kind.InParam) {
          assert.equal(rec.inputs[p.i1.index ?? 0], "R<T>");
        } else {
          assert.equal(rec.outputs[p.i1.index ?? 0], "R<T>");
        }
      }
      const type = get_type(g[j].pins[0].type);
      const exp = stringify({ t: "s", f: [["T", type]] });
      rec.reflectMap!.push([j, exp, g[j].concreteId.nodeId]);
    }
    ret.push(rec);
    // console.log(to_string(rec));
  }
  const res = util.inspect(
    fixSparseArrays(ret).map(x => ((x as any).len = x.reflectMap?.length, x)),
    { depth: null }
  );
  console.log(res);
}

function generate_reflect() {
  const d = derived_records as NodePinsRecords[];
  const VALUE_MAP = [...BasicTypes, ...BasicTypes.map(v => `L<${v}>`)];

  const nodes = [];

  for (let i = 0; i < d.length; i++) {
    const node = d[i]
    const ins = node.inputs.map(parse);
    const outs = node.outputs.map(parse);
    for (let j = 0; j < node.reflectMap!.length; j++) {
      const [index, type, id] = node.reflectMap![j];
      const idx = index === -1 ? j : index;
      assert(idx === j);
      if (type !== "D<R<K>,R<V>>" && type !== "D<>") continue;
      for (const k of BasicTypes) {
        for (const v of VALUE_MAP) {
          let is, os;
          if (type === "D<>") {
            const n = parse(`S<K:${k},V:${v}>`);
            assert(n.t === "s");
            is = ins.map(x => x === undefined || reflects(x, n.f));
            os = outs.map(x => x === undefined || reflects(x, n.f));
          } else {
            const n = parse(`D<${k},${v}>`);
            is = ins.map(x => x === undefined || reflect(x, ["T", n]));
            os = outs.map(x => x === undefined || reflect(x, ["T", n]));
          }
          const pins: NodePin[] = [];
          let valid = true;
          is.forEach((x, i) => {
            if (x === true) return;
            if (x.t === "l" && x.i.t === "l") {
              console.warn("Cannot Create List of List:", x);
              valid = false;
              return;
            }
            pins.push(node_type_pin_body({
              indexOfConcrete: idx,
              kind: NodePin_Index_Kind.InParam,
              index: i,
              type: x,
            }))
          });
          os.forEach((x, i) => {
            if (x === true) return;
            if (x.t === "l" && x.i.t === "l") {
              console.warn("Id", node.id, k, v, "Cannot Create List of List:", x);
              valid = false;
              return;
            }
            pins.push(node_type_pin_body({
              indexOfConcrete: idx,
              kind: NodePin_Index_Kind.OutParam,
              index: i,
              type: x,
            }))
          });
          if (!valid) continue;
          if (pins.length === 0) {
            console.warn("Invalid Node:", node.id, "With kv:", k, v);
            continue;
          }
          const n = node_body({
            pins: pins,
            generic_id: node.id as any,
            concrete_id: node.id as any,
            x: nodes.length % 100,
            y: nodes.length / 100,
          });
          nodes.push(n);
        }
      }
    }
  }

  const uid = randomInt(9, "201");
  const graph_id = randomInt(10, "102");
  const graph = graph_body({ uid, graph_id, nodes: nodes });
  const out_path = "./utils/ref/all_reflect.gia";
  encode_gia_file({ out_path, gia_struct: graph });

  // console.dir(nodes[1], { depth: null });
  console.log("Created", nodes.length, "reflected nodes and saved to", out_path);
}

function read_all_reflect() {
  const nodes = decode_gia_file({ gia_path: "./utils/ref/all_reflect_trim.gia" }).graph.graph?.inner.graph.nodes;
  console.log(nodes?.map(n => n.concreteId?.nodeId).filter(x => x));
  // console.log(nodes?.map(n => n.));

}


if (import.meta.main) {
  console.time("Time Consume");

  // ====== Step 1 ======
  // create_graph(100, 30, 1);
  // read_trimmed_graph();


  // ====== Step 2 ======
  // create_derived();
  // create_node_lists();
  // read_derive_graph();
  // extract_types();

  const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
  const graph = decode_gia_file({
    gia_path: "./utils/ref/all_reflect_trim.gia",
    // gia_path: PATH + "all_reflect.gia",
    // gia_path: "./utils/node_id/dicts.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  console.dir(nodes[1], { depth: null });


  // generate_reflect();
  // read_all_reflect();


  console.timeEnd("Time Consume")
}