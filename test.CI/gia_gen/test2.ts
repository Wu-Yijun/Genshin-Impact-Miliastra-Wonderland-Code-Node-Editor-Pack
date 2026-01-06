// 节点图接口
import { Graph } from "../../utils/gia_gen/interface.ts";
// 节点定义(调取标识符)(你也可以直接用字符串/id)
import { NODE_NAMES, NODES } from "../../utils/node_data/game_nodes.ts";
// 另存为 gia 文件
import { decode_gia_file, encode_gia_file } from "../../utils/protobuf/decode.ts"

// 测试: 验证数据转换一致性
import { assert, assertDeepEq, deepEqual } from "../../utils/utils.ts";
import { writeFileSync } from "fs";
import { get_graph_server } from "./graph_server.ts";

console.time("Make Graph");
const graph = get_graph_server("ENTITY_NODE_GRAPH");
console.timeEnd("Make Graph");

console.time("AutoLayout");
graph.autoLayout();
console.timeEnd("AutoLayout");

console.time("Encode");
const encoded = graph.encode();
console.timeEnd("Encode");

console.time("Dump to GIA File");
encode_gia_file("temp.gia", encoded);
console.timeEnd("Dump to GIA File");

// 解码回图对象
const decoded = decode_gia_file("temp.gia");



console.time("Decode gia File");
const graph_2 = Graph.decode(decoded);
console.timeEnd("Decode gia File");

console.time("Decode gia obj");
const graph_3 = Graph.decode(encoded);
console.timeEnd("Decode gia obj");


const msg: string[] = [];
console.time("Debug Print (x3)");
msg.push("---- Original Graph ----");
graph.debugPrint({ log: (...m: string[]) => msg.push(...m) });
msg.push("---- Decoded Graph from Object ----");
graph_3.debugPrint({ log: (...m: string[]) => msg.push(...m) });
msg.push("---- Decoded Graph from File ----");
graph_2.debugPrint({ log: (...m: string[]) => msg.push(...m) });
console.timeEnd("Debug Print (x3)");

writeFileSync("temp.log", msg.join("\n"), { encoding: "utf-8" });

console.time("DeepEqual (x3)");
const options = { breakpoint: true, max_depth: 1000, precision: 1e-5 };
assert(deepEqual(graph, graph_2, options), "Graphs are not equal");
assert(deepEqual(graph, graph_3, options), "Graphs are not equal");
assert(deepEqual(graph_2, graph_3, options), "Graphs are not equal");
console.timeEnd("DeepEqual (x3)");

console.log("All tests passed!");