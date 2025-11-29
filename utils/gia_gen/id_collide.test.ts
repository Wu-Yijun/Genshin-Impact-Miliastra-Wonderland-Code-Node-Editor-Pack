import { readFileSync, writeFileSync } from "fs";
import util from "node:util";
import assert from "node:assert";
import { graph_body, node_body, node_type_node_body, node_type_node_body_empty, node_type_pin_body, type NodeTypePinBodyEmpty_ } from "./basic.ts";

import type { NodePin, GraphNode } from "../protobuf/gia.proto.ts";
import { NodePin_Index_Kind, VarBase_Class } from "../protobuf/gia.proto.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { get_id, get_type, type NodeType, parse, stringify, to_string, type NodePinsRecords, BasicTypes, reflect, reflects, extract_reflect_names, reflects_records, extract_reflect_fields, type_equal, is_reflect } from "./nodes.ts";
import { randomInt } from "./utils.ts";
import { derived_records } from "../node_data/ref/node_defines.ts";
import { get_pin_info, get_node_info, get_nodes } from "./extract.ts";
import { CONCRETE_MAP } from "../node_data/concrete_map.ts";
import yaml from 'yaml';
import { NODE_PIN_RECORDS, type SingleNodeData } from "../node_data/node_pin_records.ts";
import { Graph } from "./graph.ts"
import { get_node_record } from "../node_data/helpers.ts";

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
  writeFileSync("./utils/node_data/ref/generic.txt", res.join("\n"));
}
function get_graph_ids(type?: "Generic" | "Basic"): number[] {
  const data = readFileSync("./utils/node_data/ref/generic.txt").toString();
  const nodes = data.split("\n").map(x => x.split(":").map(s => s.trim()));
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

function create_node_lists() {

  // 手动读取57个泛类的引脚位置
  const list: (number | (number | null)[])[] = [
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
    for (let j = 0; j < 23; j++) {
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


const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

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
  writeFileSync("./utils/node_data/ref/derived.txt", res.join("\n"));

  const arr = Array(2000).fill("");
  get_graph_ids("Generic").forEach((i) => arr[i] = "ServerGeneric:" + i);
  get_graph_ids("Basic").forEach((i) => arr[i] = "ServerBasic");
  for (const a of g) {
    a.derived.forEach((i) => arr[i] = "ServerGeneric:" + a.id);
  }
  writeFileSync("./utils/node_data/ref/all_1.txt", arr.join("\n"));
}


function fixSparseArrays<T>(obj: T): T {
  if (Array.isArray(obj)) {
    // 将稀疏数组转换为密集数组，空位用 undefined 填充
    const denseArray = [];
    for (let i = 0; i < obj.length; i++) {
      denseArray[i] = obj.hasOwnProperty(i) ? fixSparseArrays(obj[i]) : undefined;
    }
    return denseArray as T;
  }

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = fixSparseArrays(obj[key]);
      }
    }
  }

  return obj;
}

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
      rec.reflectMap!.push([g[j].concreteId.nodeId, exp]);
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

// 枚举每一个接口可能的类型
function generate_concrete_map() {
  const ds = derived_records as NodePinsRecords[];
  const nodes: GraphNode[] = [];
  for (const d of ds) {
    for (let i = 0; i < 30; i++) {
      const p1 = d.inputs.map((x, idx) => {
        if (x === undefined) return undefined;
        return {
          kind: 3,
          index: idx,
          indexOfConcrete: i
        };
      }).filter(x => x !== undefined);
      const p2 = d.outputs.map((x, idx) => {
        if (x === undefined) return undefined;
        return {
          kind: 4,
          index: idx,
          indexOfConcrete: i
        };
      }).filter(x => x !== undefined);
      nodes.push(node_type_node_body_empty(d.id, [...p1, ...p2]))
    }
  }

  encode_gia_file({
    out_path: PATH + "temp.gia",
    gia_struct: graph_body({
      uid: randomInt(9, "201"),
      graph_id: randomInt(10, "102"),
      nodes: nodes,
    })
  });
}
function read_concrete_map() {
  // const nodes = get_nodes(decode_gia_file({ gia_path: "./utils/ref/all_reflect_trim.gia" }))!;
  // const nodes = get_nodes(decode_gia_file({ gia_path: "./utils/ref/all_reflect_concrete_trim.gia" }))!;
  const nodes = get_nodes(decode_gia_file({ gia_path: PATH + "temp4.gia" }))!;
  const cm = new Set<string>();
  const concrete_id_mapping =
    Object.entries(Object.groupBy(nodes.map(n => [n.genericId.nodeId, n.concreteId?.nodeId]), x => x[0]))
      .map(([k, v]) => [[parseInt(k)], [...new Set(v.map(x => x[1]))].filter(x => x !== undefined).sort()])
  // .filter(x => x[0] === "1938")
  // util.inspect , { maxArrayLength: null }

  const data = concrete_id_mapping.map(x => [x[0][0], x[1].length, x[1].join(",")].join(":")).join("\n");
  writeFileSync("./utils/node_data/ref/derived.txt", data);
  // return;
  for (const n of nodes) {
    const info = get_node_info(n);
    if (!(info.concrete_id > 0)) {
      // console.log(ii);
      // console.dir(info, { depth: null })
      // return;
      // continue;
    }
    assert(info.generic_id > 0)
    for (const i of info.pins) {
      assert(i.indexOfConcrete >= 0);
      if (i.type > 0)
        cm.add(info.generic_id + ":" + + i.kind + ":" + i.index + "|" + i.indexOfConcrete + ":" + i.type);
    }
  }
  // console.log(iii);
  // return;
  const p = Array.from(cm).sort()
    // .filter(x => x.startsWith("1788"))
    .map(x => x.split("|"));
  // console.log(p);
  // return;
  const group = Object.groupBy(p, x => x[0]);
  const m = Object.entries(group)
    .map(([k, v]) => ({ k, v: v!.map(arr => arr[1].split(":").map(x => parseInt(x))) }))
    .sort((a, b) => -a.v.length + b.v.length)
    // .filter(x => x.v.length > 1)
    .map(({ k, v }) => {
      const d: (number | null)[] = Array(30).fill(null);
      v.forEach((s) => {
        assert(d[s[0]] === null);
        d[s[0]] = s[1];
      })
      return { k, v: d }
    });
  // console.log(m.slice(0, 3));
  const groups: (null | number)[][] = [];
  const index: string[][] = [];
  for (const { k, v } of m) {
    let find = false;
    for (let gi = 0; gi < groups.length; gi++) {
      const g = groups[gi];
      let fail = false;
      for (let i = 0; i < v.length; i++) {
        if (v[i] !== null && g[i] !== null && v[i] !== g[i]) {
          fail = true;
          break;
        }
      }
      if (!fail) {
        find = true;
        v.forEach((i, j) => i !== null && (g[j] = i));
        index[gi].push(k);
        break;
      }
    }
    if (!find) {
      index.push([k]);
      groups.push(v);
    }
  }
  console.log(groups);
  console.log(index);

  const a = index.map(x => x.map(s => s.split(":")[0]));
  const as = a.map(x => new Set(x));
  // console.log(as);
  const b = new Set(a.flat()).forEach((i) => {
    console.log("Check", i, as.map((x, i) => ({ x, i })).filter(x => x.x.has(i)).map(x => x.i))
  });
  groups.forEach(g => assert.equal(g.findLastIndex(x => x !== null) + 1, g.findIndex(x => x === null)));
  const map = {
    maps: groups.map(arr => arr.filter(g => g !== null)),
    pins: index.map((arr, i) => arr.map(a => [a, i])).flat(),
  };
  console.dir(map, { depth: null, maxArrayLength: null })
  // console.log(groups[0].filter(g => g !== null))

}
// 为dict分配KV, 测试id列表
function generate_concrete_dict_map(read = false) {
  const kvp = CONCRETE_MAP.maps[3].map(k => CONCRETE_MAP.maps[3].map(v => [stringify(get_type(k)), stringify(get_type(v))])).flat();
  const ds = derived_records as NodePinsRecords[];
  // console.log(kvp);
  // return;
  const nodes: GraphNode[] = [];
  const records: NodePinsRecords[] = [];
  let nodes_len = 0;
  if (read) {
    // nodes.push(...get_nodes(decode_gia_file({ gia_path: PATH + "temp4.gia" }))!);
    nodes.push(...get_nodes(decode_gia_file({ gia_path: "./utils/node_data/ref/all_reflect_concrete_trim.gia" }))!);
  }
  for (const d of ds) {
    let ret: NodePinsRecords = {
      inputs: [...d.inputs],
      outputs: [...d.outputs],
      id: d.id,
      reflectMap: [],
    };
    for (const [_, r] of d.reflectMap!) {
      if (r === "S<>" || r === "L<S<>>") continue;
      const ps = [
        ...d.inputs.map((x, i) => x === undefined ? x : { x, i, k: 3 }).filter(x => x !== undefined),
        ...d.outputs.map((x, i) => x === undefined ? x : { x, i, k: 4 }).filter(x => x !== undefined),
      ];
      // console.log(d, r);
      let pins;
      if (r === "D<R<K>,R<V>>") {
        if (read) {
          kvp.forEach(([k, v]) => {
            const info = get_node_info(nodes[nodes_len++]);
            if (!(info.concrete_id > 0)) return;
            ret.reflectMap!.push([info.concrete_id, `S<T:D<${k},${v}>>`])
          });
          continue;
        }
        // T:KV
        pins = kvp.map(([k, v]) => ps.map((x) => {
          return {
            kind: x.k,
            index: x.i,
            type: reflects(x.x, `S<T:D<${k},${v}>>`),
          }
        }));
      } else if (r === "D<>") {
        if (read) {
          kvp.forEach(([k, v]) => {
            const info = get_node_info(nodes[nodes_len++]);
            if (!(info.concrete_id > 0)) return;
            ret.reflectMap!.push([info.concrete_id, `S<K:${k},V:${v}>`])
          });
          continue;
        }
        // KV
        pins = kvp.map(([k, v]) => ps.map((x) => ({
          kind: x.k,
          index: x.i,
          type: reflects(x.x, `S<K:${k},V:${v}>`),
        })));
      } else {
        if (read) {
          const info = get_node_info(nodes[nodes_len++]);
          if (!(info.concrete_id > 0)) return;
          ret.reflectMap!.push([info.concrete_id, r])
          continue;
        }
        pins = [ps.map((x) => ({
          kind: x.k,
          index: x.i,
          type: reflects(x.x, r)
        }))];
      }
      // console.log(nodes.length, JSON.stringify(pins));
      if (d.id === 1158) { debugger }
      pins = pins.map(x => x.map(y => ({
        ...y,
        indexOfConcrete: get_concrete_index(d.id, y.kind, y.index, get_id(y.type)),
        map_type: y.type.t === "d" ? [get_id(y.type.k), get_id(y.type.v)] as [number, number] : undefined,
      })));
      pins.forEach((p) => {
        nodes.push(node_type_node_body_empty(d.id, p, nodes.length % 100, nodes.length / 100));
      })
      // console.log(pins.length);
    }
    records.push(ret);
  }
  if (read) {
    console.log("Records Len:", records.length);
    const str = util.inspect(records, { depth: null, maxArrayLength: null });
    const doc = `/** Node defines(reflective nodes only, auto generated). */
import type { NodePinsRecords } from "../gia_gen/nodes.ts";
export const NODE_PIN_RECORDS: NodePinsRecords[] = ${str};`;
    writeFileSync("./utils/node_data/node_pin_records.ts", doc);
    return;
  }
  console.log(nodes.length, "In total");


  encode_gia_file({
    out_path: PATH + "temp3.gia",
    gia_struct: graph_body({
      uid: randomInt(9, "201"),
      graph_id: randomInt(10, "102"),
      nodes: nodes
    })
  });
}

function read_enum() {
  const y: EnumList = yaml.parse(readFileSync("./utils/node_data/yaml/yaml/enum_id.yaml").toString());
  console.log(y.EnumList.map(x => `[${x.id}, "S<T:E<${x.varClassBase}>>"],`).join("\n"));
}

function combine_id_list() {
  const names = new Map(
    readFileSync("./utils/node_data/yaml/server_node_id.yaml")
      .toString().split('\n').map(s => s.trim())
      .map(s => /^(\d+): (\d+\. )?(.+)$/s.exec(s)).filter(x => x !== null)
      .map(([_, d, _2, s]) => [d, s])
  );
  // console.log(names);
  const b = get_graph_ids("Basic").map(x => ({ gid: x, cid: x, type: "ServerBasic", name: names.get(x.toString()) }));
  const g = NODE_PIN_RECORDS.map(x => x.reflectMap!.map(y => ({ cid: y[0], gid: x.id, type: "ServerGeneric " + y[1], name: names.get(x.id.toString()) })));
  const all = [...g, ...b].flat()
    .sort((a, b) => a.cid - b.cid);

  // console.log(b);
  writeFileSync("./utils/node_data/yaml/server.yaml", all.map(x => `${x.cid}: ${x.gid} # ${x.type} # ${x.name}`).join("\n"));
  return;
  const rec: SingleNodeData[] = [];
  all.forEach((x) => {
    const p = rec.find(y => y.id === x.gid);
    if (p === undefined) {
      const r = get_node_record(x.gid);
      if (r) {
        rec.push({
          name: x.name,
          id: x.gid,
          inputs: r.inputs,
          outputs: r.outputs,
          reflectMap: r.reflectMap,
        });
      } else {
        rec.push({
          name: x.name,
          id: x.gid,
          inputs: [],
          outputs: [],
        });
      }
    } else {
      assert(p.reflectMap?.find(y => y[0] === x.cid) !== null);
      assert.equal(p.name, x.name);
    }
  });
  const ret = util.inspect(rec, { depth: null, maxArrayLength: null });
  writeFileSync("./temp", ret);
}

// undefined 名称
function get_missing() {
  const lines = readFileSync("./utils/node_data/yaml/server.yaml").toString().split("\n")
    .filter(x => x.length > 0 && x.trim().endsWith("undefined"))
    .map(x => parseInt(x.split("#")[0].split(":")[1]));
  const ids = [...new Set(lines)].sort();

  console.log(ids);
  const g = new Graph();
  ids.forEach((x, i) => g.add_node(x).setPos(i, 0))
  encode_gia_file({ gia_struct: g.encode(), out_path: "./utils/ref/missing_name.gia" });
}


function get_missing2() {
  const lines = readFileSync("./utils/node_data/yaml/server.yaml").toString().split("\n")
    .map(x => x.split("#")[0].split(":").map(y => parseInt(y))).flat();
  const set = new Set(lines);
  // console.log(set)
  const g = new Graph();
  const a = [];
  for (let i = 0; i < lines[lines.length - 1]; i++) {
    if (set.has(i)) continue;
    g.add_node(i).setPos(i % 10, i / 10);
    a.push([a.length, i]);
  }
  console.log(a);
  encode_gia_file({ gia_struct: g.encode(), out_path: "./utils/ref/missing_name2.gia" });
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

  // generate_concrete_map();
  // read_concrete_map();
  // generate_concrete_dict_map(true);

  // combine_id_list();
  // get_missing();
  // get_missing2();



  // const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
  // const graph = decode_gia_file({
  //   // gia_path: "./utils/ref/correct_reflect_trim.gia",
  //   gia_path: "./utils/ref/correct_reflect.gia",
  // });
  // const nodes = graph.graph.graph!.inner.graph.nodes!;
  // console.dir(nodes[0], { depth: null });
  // const graph2 = decode_gia_file({
  //   // gia_path: PATH + "correct_reflect.gia",
  //   gia_path: PATH + "temp4.gia",
  // });
  // const nodes2 = graph2.graph.graph!.inner.graph.nodes!;
  // console.dir(nodes2[100], { depth: null });

  // nodes2[0].pins[0].value.bNodeValue!.value = {} as any;
  // nodes2[0].pins[0].type = 0;
  // nodes2[0].pins[1].value.bNodeValue!.value = {} as any;
  // nodes2[0].pins[1].type = 0;
  // nodes2[0].pins[2].value.bNodeValue!.value = {} as any;
  // nodes2[0].concreteId.nodeId = 1088 as any;
  // nodes2.pop();
  // nodes2.push(node_type_node_body_empty(1088, [
  //   {
  //     kind: 3,
  //     index: 0,
  //     indexOfConcrete: 3
  //   },
  //   {
  //     kind: 3,
  //     index: 1,
  //     indexOfConcrete: 5
  //   },
  //   {
  //     kind: 4,
  //     index: 0,
  //     indexOfConcrete: 1,
  //     // map_type: [3, 6],
  //   },
  // ]))
  // encode_gia_file({ gia_struct: graph2, out_path: PATH + "temp1.gia", });

  // 下一步, 针对可变引脚, **分别**测试其 indexOfConcrete...... 太愚蠢了, 一个联合类型的节点引脚居然可以乱来......


  get_missing();
  // get_missing2();

  console.timeEnd("Time Consume")
}