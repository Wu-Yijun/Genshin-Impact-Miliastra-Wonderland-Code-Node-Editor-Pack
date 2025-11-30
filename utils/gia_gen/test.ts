import { debugDecode } from "../protobuf/debug_decode.ts";
import { decode_gia_file, encode_gia_file, unwrap_gia } from "../protobuf/decode.ts";
import proto from "protobufjs";
import { Graph } from "./graph.ts";
import { NODE_ID } from "../node_data/node_id.ts";
import { NODE_PIN_RECORDS } from "../node_data/node_pin_records.ts";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function read() {
  const g = decode_gia_file(PATH + "pin.gia");
  // const g = decode_gia_file("./utils/ref/pins.gia");
  const nodes = g.graph.graph?.inner.graph.nodes!;
  // const pins = nodes.map((n) => n.pins.map(p => [p.type, p.value.bNodeValue?.indexInSelector]));

  const n = nodes[0] as any;
  console.dir(n, { depth: null })
  // const n = nodes[0];

  n.pins[1].connects = undefined;
  n.pins[1].type = undefined;
  n.pins[1].value.bNodeValue!.value = {};
  n.pins[1].value.bNodeValue!.indexOfConcrete = 1;
  n.pins[0].connects = undefined;
  n.pins[0].value.bNodeValue!.value = {};
  n.pins[0].value.bNodeValue!.indexOfConcrete = 1;
  n.pins[0].type = undefined;
  n.pins[2].connects = undefined;
  n.pins[2].value.bNodeValue!.value = {};
  n.pins[2].value.bNodeValue!.indexOfConcrete = 1;
  n.pins[2].type = undefined;


  // console.dir(n.pins[0], { depth: null })
  console.dir(n, { depth: null })
  encode_gia_file(g, PATH + "pin.gia")

}
// read()

// const g = decode_gia_file(PATH + "pin2.gia");
// const nodes = g.graph.graph?.inner.graph.nodes!;
// console.dir(nodes, { depth: null });


function graph_ts() {
  // Test Graph Encoding
  console.time("graph_encode");
  const graph = new Graph("server");
  const node1 = graph.add_node(1001);
  const node2 = graph.add_node(1002);
  const node3 = graph.add_node(250);
  node1.setPos(1, 2);
  node2.setPos(3, 4);
  node3.setPos(5, 6);
  const g = graph.encode();
  console.timeEnd("graph_encode");
  encode_gia_file(g, "./utils/ref/graph_ts.gia");

}

graph_ts();

