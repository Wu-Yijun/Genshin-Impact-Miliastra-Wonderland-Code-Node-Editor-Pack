import { writeFileSync } from "fs";
import { Graph, NODE_ID, encode_gia_file } from "../../utils/index.ts";
import { assertDeepEq, assertEq, exclude_keys } from "../../utils/utils.ts";
import { inspect } from "util";

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


function createGraph() {
  console.log("Creating Graph......");
  const graph = new Graph("class", undefined, "Github Actions CI Test Generated Graph");

  // column 1
  const Trig = graph.add_node(NODE_ID.When_Tab_Is_Selected);
  // column 2
  const Branch1 = graph.add_node(NODE_ID.Multiple_Branches__Int);
  const get_val = graph.add_node(NODE_ID.Get_Custom_Variable__Int);
  graph.flow(Trig, Branch1);
  graph.connect(Trig, Branch1, 2, 0);
  graph.connect(Trig, get_val, 0, 0);
  Branch1.setVal(1, [1, 2, 3]);
  get_val.setVal(1, "Plant Level");
  // column 3
  const Branch2 = graph.add_node(NODE_ID.Double_Branch);
  const eq1 = graph.add_node(NODE_ID.Equal__Int);
  const Branch3 = graph.add_node(NODE_ID.Double_Branch);
  const eq2 = graph.add_node(NODE_ID.Equal__Int);
  const Branch4 = graph.add_node(NODE_ID.Double_Branch);
  const eq3 = graph.add_node(NODE_ID.Equal__Int);
  graph.flow(Branch1, Branch2, 1, 0);
  graph.flow(Branch1, Branch3, 2);
  graph.flow(Branch1, Branch4, 3);
  graph.connect(get_val, eq1, 0, 0);
  graph.connect(get_val, eq2, 0, 0);
  graph.connect(get_val, eq3, 0, 0);
  graph.connect(eq1, Branch2, 0, 0);
  graph.connect(eq2, Branch3, 0, 0);
  graph.connect(eq3, Branch4, 0, 0);
  eq1.setVal(1, 0);
  eq2.setVal(1, 1);
  eq3.setVal(1, 2);
  // column 4
  const slf1 = graph.add_node(NODE_ID.Get_Self_Entity);
  const loc1 = graph.add_node(NODE_ID.Get_Entity_Location_and_Rotation);
  const Pfb1 = graph.add_node(NODE_ID.Create_Prefab);
  const loc2 = graph.add_node(NODE_ID.Get_Entity_Location_and_Rotation);
  const Pfb2 = graph.add_node(NODE_ID.Create_Prefab);
  const slf2 = graph.add_node(NODE_ID.Get_Self_Entity);
  const Eff1 = graph.add_node(NODE_ID.Mount_Looping_Special_Effect);
  graph.flow(Branch2, Pfb1);
  graph.flow(Branch3, Pfb2);
  graph.flow(Branch4, Eff1);
  graph.connect(slf1, loc1, 0, 0);
  graph.connect(loc1, Pfb1, 0, 1);
  graph.connect(loc1, Pfb1, 1, 2);
  graph.connect(slf1, Pfb1, 0, 3);
  graph.connect(slf1, loc2, 0, 0);
  graph.connect(loc2, Pfb2, 0, 1);
  graph.connect(loc2, Pfb2, 1, 2);
  graph.connect(slf1, Pfb2, 0, 3);
  graph.connect(slf2, Eff1, 0, 1);
  Pfb1.setVal(0, 1077236130);
  Pfb1.setVal(6, 1);
  Pfb2.setVal(0, 1077236131);
  Pfb2.setVal(6, 1);
  Eff1.setVal(0, 10002107);
  Eff1.setVal(2, "RootNode");
  Eff1.setVal(3, true);
  Eff1.setVal(4, true);
  Eff1.setVal(7, 0.1);
  // column 5
  const set_val1 = graph.add_node(NODE_ID.Set_Custom_Variable__Int);
  const set_val2 = graph.add_node(NODE_ID.Set_Custom_Variable__Int);
  graph.flow(Pfb1, set_val1);
  graph.flow(Pfb2, set_val2);
  graph.connect(slf1, set_val1, 0, 0);
  graph.connect(slf1, set_val2, 0, 0);
  set_val1.setVal(1, "Plant Level");
  set_val1.setVal(2, 1);
  set_val1.setVal(4, true);
  set_val2.setVal(1, "Plant Level");
  set_val2.setVal(2, 2);
  set_val2.setVal(4, true);

  // auto analysis layout
  graph.autoLayout(1, 2);

  return graph;

}

if (import.meta.main) {
  console.log("The equivalent DSL is:", DSL);
  const graph = createGraph();

  const encoded = graph.encode({ pos_jitter: false, fill_undefined: false });
  const decode = Graph.decode(encoded);
  const encoded2 = decode.encode({ pos_jitter: false });
  const decode2 = Graph.decode(encoded2);

  const graph_trim = exclude_keys(graph, ["nodes", "set", "record"]);
  // const graph_trim = exclude_keys(graph, ["connects", "set", "to", "pins", "array", "value"], ["nodes", "set", "record"]);
  graph_trim.connects = new Set([...graph_trim.connects].sort((a, b) => a.from.node_index - b.from.node_index || a.to.node_index - b.to.node_index));

  const decode_trim = exclude_keys(decode, ["nodes", "set", "record"]);
  // const decode_trim = exclude_keys(decode, ["connects", "set", "to", "pins", "array", "value"], ["nodes", "set", "record"]);
  decode_trim.connects = new Set([...decode_trim.connects].sort((a, b) => a.from.node_index - b.from.node_index || a.to.node_index - b.to.node_index));

  writeFileSync("./dist/graph.cs", inspect(graph_trim, { depth: Infinity }));
  writeFileSync("./dist/decode.cs", inspect(decode_trim, { depth: Infinity }));
  writeFileSync("./dist/encode.cs", inspect(encoded, { depth: Infinity }));
  // writeFileSync("./dist/encode2.cs", inspect(encode2, { depth: Infinity }));

  assertDeepEq(encoded, encoded2);
  assertDeepEq(decode, decode2);
  assertDeepEq(graph_trim, decode_trim);

  /** graph --> encoded --> decode --> encoded2 --> decode2
   * 
   * Encode and Decode is Stable:
   * - encoded === encoded2
   * - decode === decode2
   * Encode and Decode is lossless:
   * - graph.sort() === decode.sort()
  */
  encode_gia_file("./dist/GeneratedGraph.gia", graph.encode());
  console.log("Saved to `./dist/GeneratedGraph.gia`");
}