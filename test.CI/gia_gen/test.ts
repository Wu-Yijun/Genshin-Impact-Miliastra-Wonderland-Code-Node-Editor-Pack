
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
import { get_graph_client } from "./graph_client.ts";
import { ResourceClass } from "../../utils/node_data/types.ts";
import { main as test_all_nodes } from "./test_all_nodes.ts"


const DSL = `
[OnTab()[source=src, tab_id=id]].Switch(tab_id)(
    1 = If(m.eq(source.Plant_Level, 0))
      .CreatePrefab(1077236130, q.pos(), q.rot(), Self, level=1)
      .SetVal(source.Plant_Level, 1, true),
    2 = If(m.eq(Self.Plant_Level,0))
      .CreatePrefab(1077236131, q.pos(), q.rot(), Self, level=1)
      .SetVal(source.Plant_Level, 2, true),
    3 = If(m.eq(Self.Plant_Level,0))
      .PlayEffects(10002107, target=Self, "RootNode", true, true, zoom=0.1),
  );
`;

const DSL2 = `
[OnStart()].$(()=>q.attach_pos(Self, "GI_AvatarRoot"))[pos0] >> {
  0: SendSignal(Signal.Dash, pos0, q.rot(Self))
  1: $(()=>{
      const p1 = m.rot(q.rot(), vec(0, 2, 6));
      return [p1 + pos0, m.rot(q.rot(), vec(90, 0, 0))];
    })[pos1, rot1].PlayEffect(10006238, pos1, rot1, 1, true),
  2: PlayEffect(10011063, pos0, vec(0, 0, 0), 0, true),
  3: PlayEffect(208, pos0 + vec(0, 1, 6), m.rot(q.rot(), vec(80, 4, 0), 1.3, false),
}
`;


function test(system: ResourceClass) {

  console.log(`\n--- Testing System: ${system} ---`);
  console.time(`Total Test Time for ${system}`);

  console.time("Make Graph");
  let graph: Graph;
  switch (system) {
    case "ENTITY_NODE_GRAPH":
    case "STATUS_NODE_GRAPH":
    case "CLASS_NODE_GRAPH":
    case "ITEM_NODE_GRAPH":
      graph = get_graph_server(system);
      break;
    case "COMPOSITE_NODE_DECL":
      graph = get_graph_server(system);
      break;
    case "BOOLEAN_FILTER_GRAPH":
    case "INTEGER_FILTER_GRAPH":
    case "SKILL_NODE_GRAPH":
      graph = get_graph_client(system);
      break;
    default:
      throw new Error(`Unknown system: ${system}`);
  }
  // const graph = get_graph_server("ENTITY_NODE_GRAPH");
  // const graph = get_graph_client("SKILL_NODE_GRAPH");
  console.timeEnd("Make Graph");

  console.time("AutoLayout");
  graph.autoLayout();
  console.timeEnd("AutoLayout");

  console.time("Encode");
  const encoded = graph.encode();
  console.timeEnd("Encode");

  const path = `./dist/gia_gen.${system}.gia`;
  console.time("Dump to GIA File");
  encode_gia_file(path, encoded);
  console.timeEnd("Dump to GIA File");

  // 解码回图对象
  console.time("Decode from GIA File");
  const decoded = decode_gia_file(path);
  console.timeEnd("Decode from GIA File");


  console.time("Decode gia to graph");
  const graph_2 = Graph.decode(decoded);
  console.timeEnd("Decode gia to graph");

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

  writeFileSync(`./dist/gia_gen.${system}.log`, msg.join("\n"), { encoding: "utf-8" });

  console.time("Deep Equal Asserts (x3)");
  const options = { breakpoint: true, max_depth: 1000, precision: 1e-5 };
  assert(deepEqual(graph, graph_2, options), "Graphs are not equal");
  assert(deepEqual(graph, graph_3, options), "Graphs are not equal");
  assert(deepEqual(graph_2, graph_3, options), "Graphs are not equal");
  console.timeEnd("Deep Equal Asserts (x3)");

  console.timeEnd(`Total Test Time for ${system}`);
}

console.log("All tests passed!");

if (import.meta.main) {
  console.log("The equivalent DSL is:", DSL);

  console.log("\n====== Test Server Graph ======");
  test("ENTITY_NODE_GRAPH");
  test("COMPOSITE_NODE_DECL");
  test("CLASS_NODE_GRAPH");
  test("ITEM_NODE_GRAPH");
  test("STATUS_NODE_GRAPH");
  console.log("======== Test Complete ========\n");

  console.log("The equivalent DSL is:", DSL2);

  console.log("\n====== Test Client Graph ======");
  test("SKILL_NODE_GRAPH");
  test("INTEGER_FILTER_GRAPH");
  test("BOOLEAN_FILTER_GRAPH");
  console.log("======== Test Complete ========\n");


  console.log("======== Test Encode and Decode All nodes========");
  test_all_nodes();
  console.log("======== Test Complete ========\n");

}