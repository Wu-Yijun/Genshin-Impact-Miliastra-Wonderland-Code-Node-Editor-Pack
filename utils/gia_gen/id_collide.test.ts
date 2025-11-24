
import { gia } from "./index.ts";
import type { NodePin, GraphNode } from "../protobuf/gia.proto.ts";
import { NodePin_Index_Kind, VarBase_Class } from "../protobuf/gia.proto.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { readFileSync, writeFileSync } from "fs";

function generate_all_nodes(from: number, size: number = 300, line_width: number = 20, offsets: number = 1): GraphNode[] {
  const ret = [];
  for (let i = 0; i < size; i++) {
    const y = Math.floor(i / line_width);
    const x = i % line_width;
    for (let k = 0; k < offsets; k++) {
      ret.push(gia.basic_node_body({
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
  return gia.basic_node_body({
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

  const uid = gia.random_int(9, "201");
  const graph_id = gia.random_int(10, "102");
  const nodes = [];
  const graph = gia.basic_graph_body({
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
  const uid = gia.random_int(9, "201");
  const graph_id = gia.random_int(10, "102");
  const nodes: GraphNode[] = [];
  for (let index = 0; index < ids.length; index++) {
    const id1 = ids[index];
    const node = gia.basic_node_body({
      generic_id: id1 as any,
      concrete_id: id1 as any,
      x: index * 1.5,
      y: 0,
      pins: [],
    });
    nodes.push(node);
  }
  const graph = gia.basic_graph_body({
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
  return gia.basic_node_body({
    generic_id: id as any,
    concrete_id: id as any,
    x: x,
    y: y,
    pins: pin_index.map(x => {
      const p = structuredClone(pin);
      if (x < 0) {
        p.i1.kind = NodePin_Index_Kind.OutParam;
        p.i2.kind = NodePin_Index_Kind.OutParam;
        p.i1.index = -1 - x;
        p.i2.index = -1 - x;
        return p;
      }
      p.i1.index = x;
      p.i2.index = x;
      return p;
    }),
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
  const graph = gia.basic_graph_body({
    uid: gia.random_int(9, "201"),
    graph_id: gia.random_int(10, "102"),
    nodes: nodes,
  });
  encode_gia_file({
    out_path: "./utils/ref/derived_server_nodes_pin.gia",
    gia_struct: graph
  })
}

// 手动读取57个泛类的引脚位置
const LIST: (number | (number | null)[])[] = [
  0,
  [0, 1],
  0,
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
  [0, null, 0], // Assem
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


  const res = g.map(({ id, derived }) => `${id}:${derived.join(",")}`);
  writeFileSync("./utils/node_id/ref/derived.txt", res.join("\n"));

  const arr = Array(2000).fill("");
  get_graph_ids("Generic").forEach((i) => arr[i] = "ServerGeneric:" + i);
  get_graph_ids("Basic").forEach((i) => arr[i] = "ServerBasic");
  for (const a of g) {
    a.derived.forEach((i) => arr[i] = "ServerGeneric:" + a.id);
  }
  writeFileSync("./utils/node_id/ref/all_1.txt", arr.join("\n"));
}


if (import.meta.main) {
  // ====== Step 1
  // create_graph(100, 30, 1);
  // read_trimmed_graph();


  // ====== Step 2 
  // create_derived();
  // create_node_lists(LIST);
  read_derive_graph();


}