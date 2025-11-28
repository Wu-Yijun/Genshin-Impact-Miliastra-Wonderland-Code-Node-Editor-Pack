import { debugDecode } from "../protobuf/debug_decode.ts";
import { decode_gia_file, encode_gia_file, unwrap_gia } from "../protobuf/decode.ts";
import proto from "protobufjs";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function read() {
  const g = decode_gia_file({ gia_path: PATH + "pin.gia" });
  // const g = decode_gia_file({ gia_path: "./utils/ref/pins.gia" });
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
  encode_gia_file({ gia_struct: g, out_path: PATH + "pin.gia" })

}
read()

// const g = decode_gia_file({ gia_path: PATH + "pin2.gia" });
// const nodes = g.graph.graph?.inner.graph.nodes!;
// console.dir(nodes, { depth: null });

