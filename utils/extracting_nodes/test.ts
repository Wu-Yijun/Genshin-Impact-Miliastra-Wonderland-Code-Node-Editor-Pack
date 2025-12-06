import { writeFileSync } from "fs";
import { Graph } from "../gia_gen/graph.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { inspect } from "util";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
const DIR = import.meta.dirname;

const g = decode_gia_file(PATH + "temp.gia");
// console.dir(g, { depth: null });
g.graph.graph?.inner.graph.nodes.forEach((n, i) => i === 0 || n.pins.splice(0, 1));
console.dir(g, { depth: null });
writeFileSync(DIR + "/temp.cs", inspect(g, { depth: Infinity }));

encode_gia_file(PATH + "temp2.gia", g);

// const graph = Graph.decode(g);
// console.dir(graph, { depth: null });