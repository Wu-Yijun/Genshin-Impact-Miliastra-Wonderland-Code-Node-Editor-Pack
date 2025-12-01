import { execSync } from "child_process";
import assert from "assert";
import { writeFileSync } from "fs";
import util from "node:util";

import { Graph, Pin } from "../gia_gen/graph.ts";
import { decode_gia_file, encode_gia_file } from "./decode.ts";
import { BasicTypes, get_id, get_type } from "../gia_gen/nodes.ts";
import { NODE_PIN_RECORDS, NodePinsRecords } from "../node_data/node_pin_records.ts";
import { get_node_record } from "../node_data/helpers.ts";
import { VarType } from "./gia.proto.ts";


const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function log(name: string) {
  const g = decode_gia_file(PATH + name);
  console.dir(g.graph.graph?.inner.graph.nodes, { depth: null });
}

function generate_test_connect(type: BasicTypes = "Int", list = false) {
  const GetCustomVariable = 50;
  const concrete_id = get_node_record(GetCustomVariable)!.reflectMap!.find(x => x[1] === (list ? `S<T:L<${type}>>` : `S<T:${type}>`))![0];
  const var_type_id = list ? get_id({ t: "l", i: { t: "b", b: type } }) : get_id({ t: "b", b: type });
  const name = list ? "l-" + type : "g-" + type;

  const graph = new Graph("server", undefined, name);
  const var_node = graph.add_node(concrete_id);

  const recs = NODE_PIN_RECORDS as NodePinsRecords[];
  for (const rec of recs) {
    const dest = graph.add_node(rec.reflectMap?.[0][0] ?? rec.id);
    dest.setPos((graph.get_nodes().length / 2) % 10, (graph.get_nodes().length / 2) / 10);
    for (let i = 0; i < 20; i++) {
      if (dest.pins[i] !== undefined && dest.pins[i].type !== null) continue;
      const p = new Pin(rec.id, 3, i);
      p.setType(get_type(var_type_id));
      dest.pins[i] = p;
      graph.connect(var_node, dest, 0, i);
    }
  }
  const g = graph.encode();
  encode_gia_file(PATH + name + ".gia", g);
  // console.dir(graph, { depth: null });
  console.log("Add", name);
}

function get_all_test_connect() {
  function read_test_connect(type = "Int", list = false) {
    const g = decode_gia_file(PATH + (list ? `l-${type}.gia` : `g-${type}.gia`));
    const index = g.graph.graph?.inner.graph.nodes.slice(1).map(n => n.pins.filter(p => p.connects?.length ?? 0 > 0).map(p => p.i1.index))
    // console.dir(index, { depth: null });
    return index!;
  }
  const res = BasicTypes.map(t => ({ t, pins: read_test_connect(t) }));
  const res2 = BasicTypes.map(t => ({ t: `L<${t}>`, pins: read_test_connect(t, true) }));
  // read_test_connect();
  // console.log(res);
  for (const t of [...res, ...res2]) {
    assert(t.pins.length === NODE_PIN_RECORDS.length);
    for (let i = 0; i < NODE_PIN_RECORDS.length; i++) {
      const rec = NODE_PIN_RECORDS[i];
      for (const j of t.pins[i]) {
        assert(rec.inputs[j] === undefined);
        (rec.inputs as any)[j] = t.t;
      }
    }
  }
  NODE_PIN_RECORDS.forEach(x => { for (let i = 0; i < x.inputs.length; i++)(x.inputs as any)[i] ??= "Any" });
  // console.dir(NODE_PIN_RECORDS, { depth: null });
  writeFileSync("./temp.ts", util.inspect(NODE_PIN_RECORDS, { depth: null, maxArrayLength: null }));
}

function generate_test_connect_out(type: BasicTypes = "Int", list = false) {
  const SetCustomVariable = 22;
  const concrete_id = get_node_record(SetCustomVariable)!.reflectMap!.find(x => x[1] === (list ? `S<T:L<${type}>>` : `S<T:${type}>`))![0];
  const var_type_id = list ? get_id({ t: "l", i: { t: "b", b: type } }) : get_id({ t: "b", b: type });
  const name = list ? "ol-" + type : "og-" + type;

  const graph = new Graph("server", undefined, name);

  const recs = NODE_PIN_RECORDS as NodePinsRecords[];
  for (const rec of recs) {
    const src = graph.add_node(rec.reflectMap?.[0][0] ?? rec.id);
    src.setPos(0, graph.get_nodes().length / 21 / 2);
    for (let i = 0; i < 20; i++) {
      const dest = graph.add_node(concrete_id);
      dest.setPos(i + 1, graph.get_nodes().length / 21 / 2);
      // @ts-ignore
      const index = src.pin_len[0] + i;
      if (src.pins[index] !== undefined && src.pins[index].type !== null) continue;
      const p = new Pin(rec.id, 4, index);
      p.setType(get_type(var_type_id));
      src.pins[index] = p;
      graph.connect(src, dest, i, 2);
    }
  }
  const g = graph.encode();
  encode_gia_file(PATH + name + ".gia", g);
  // console.dir(graph, { depth: null });
  console.log("Add", name);
}

function read_test_connect_out(type = "Bol", list = false) {
  const g = decode_gia_file(PATH + (list ? `ol-${type}.gia` : `og-${type}.gia`));
  const index = [];
  const n = g.graph.graph!.inner.graph.nodes!;
  for (let i = 0; i < n.length; i += 21) {
    const t: number[] = [];
    assert(n[i].genericId.nodeId === NODE_PIN_RECORDS[i / 21].id);
    for (let j = 0; j < 20; j++) {
      const c = n[i + j + 1].pins[0]?.connects;
      if (c === undefined || c.length === 0) continue;
      assert(c.length === 1);
      assert(c[0].connect.index === j);
      t.push(c[0].connect.index);
    }
    index.push(t);
    // break;
  }
  // console.dir(index, { depth: null });
  return index!;
}
function get_all_test_connect_out() {
  const res = BasicTypes.map(t => ({ t, pins: read_test_connect_out(t) }));
  const res2 = BasicTypes.map(t => ({ t: `L<${t}>`, pins: read_test_connect_out(t, true) }));
  // read_test_connect();
  // const res = [read_test_connect_out("Bol")], res2 = [];
  // console.log(res[1]);
  // console.log(res);
  for (const t of [...res, ...res2]) {
    assert.equal(t.pins.length, NODE_PIN_RECORDS.length);
    for (let i = 0; i < NODE_PIN_RECORDS.length; i++) {
      const rec = NODE_PIN_RECORDS[i];
      for (const j of t.pins[i]) {
        assert(rec.outputs[j] === undefined);
        (rec.outputs as any)[j] = t.t;
      }
    }
    // break;
  }
  NODE_PIN_RECORDS.forEach(x => { for (let i = 0; i < x.outputs.length; i++)(x.outputs as any)[i] ??= "Any" });
  // console.dir(NODE_PIN_RECORDS, { depth: null });
  writeFileSync("./temp2.ts", util.inspect(NODE_PIN_RECORDS, { depth: null, maxArrayLength: null }));
}

if (import.meta.main) {
  execSync("cls", { stdio: 'inherit' });
  console.time("test");

  log("fields.gia");

  // EnumNode_Value.Coma
  /**
   *  "Get Custom Variable",     inputs: ["Ety", "Str", "Bol"],
   *  "Remove Unit Status", hidden inputs 
   *   "", hidden unknown input
   * "Activate/Disable Character Disruptor Device", wrong pin type!
   *  "Activate/Disable Collision Trigger Source", ...
   * 
   *  Activate Fixed-Point Motion Device: Movement mode: Instant Movement, Uniform
   */
  // log("1.gia");
  // generate_test_connect("Str");;
  // BasicTypes.map(t => generate_test_connect(t));
  // BasicTypes.map(t => generate_test_connect(t, true));
  // get_all_test_connect();

  // BasicTypes.map(t => generate_test_connect_out(t));
  // BasicTypes.map(t => generate_test_connect_out(t, true));

  // generate_test_connect_out("Bol");
  // get_all_test_connect_out();
  // console.log(read_test_connect_out("Int"));

  // const i = read_test_connect_out("Bol");
  // console.log(i.filter(x => x.length > 0))

  console.timeEnd("test");
}