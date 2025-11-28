import { decode_gia_file } from "../protobuf/decode.ts";


const g = decode_gia_file({
  gia_path: "./utils/ref/dict.gia"
});

const node = g.graph.graph?.inner.graph.nodes!;
console.dir(node[1].pins, { depth: null });