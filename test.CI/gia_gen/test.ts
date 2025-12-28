import type { AllModes, ClientModes, ServerModes } from "../../utils/gia_gen/graph.ts";
import { Graph, NODE_ID, CLIENT_NODE_ID, encode_gia_file } from "../../utils/index.ts";
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


function createGraph(mode: ServerModes) {
  console.log("Creating Graph......", mode);
  const graph = new Graph(mode, undefined, "Github Actions CI Test Generated Graph");

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

function createGraphClient(mode: ClientModes) {
  console.log("Creating Client Graph......", mode);
  const graph = new Graph(mode, undefined, "Github Actions CI Test Generated Graph");

  const Begin = graph.add_node(CLIENT_NODE_ID.Node_Graph_Begins);
  const Signal = graph.add_node(CLIENT_NODE_ID.Send_Signal_to_Server_Node_Graph);
  const Eff1 = graph.add_node(CLIENT_NODE_ID.Play_Timed_Effects);
  const Eff2 = graph.add_node(CLIENT_NODE_ID.Play_Timed_Effects);
  const Eff3 = graph.add_node(CLIENT_NODE_ID.Play_Timed_Effects);
  // Inputs: [ 'Cfg', 'Vec', 'Vec', 'Flt', HIDDEN:'Int', 'Bol' ],

  graph.add_comment("Wind vortex", Eff1);
  graph.add_comment("sound effect", Eff2);
  graph.add_comment("Wind column", Eff3);

  graph.flow(Begin, Eff1);
  graph.flow(Begin, Signal);
  graph.flow(Begin, Eff2);
  graph.flow(Begin, Eff3);

  const get_att_pt = graph.add_node(CLIENT_NODE_ID.Get_Target_Attachment_Point_Location);
  const get_rot = graph.add_node(CLIENT_NODE_ID.Get_Entity_Rotation);
  const get_slf = graph.add_node(CLIENT_NODE_ID.Get_Self_Entity);
  const rot_v1 = graph.add_node(CLIENT_NODE_ID._3D_Vector_Rotation);
  const rot_v2 = graph.add_node(CLIENT_NODE_ID._3D_Vector_Rotation);
  const rot_v3 = graph.add_node(CLIENT_NODE_ID._3D_Vector_Rotation);
  const add_v1 = graph.add_node(CLIENT_NODE_ID._3D_Vector_Addition);
  const add_v2 = graph.add_node(CLIENT_NODE_ID._3D_Vector_Addition);
  // Inputs: [ HIDDEN:'E<2>', 'Vec', 'Vec' ],

  graph.connect(get_slf, get_rot, 0, 0);
  graph.connect(get_slf, get_att_pt, 0, 0);

  graph.connect(get_att_pt, add_v2, 0, 2);
  graph.connect(get_att_pt, Signal, 0, 1);
  graph.connect(get_att_pt, Eff2, 0, 1);
  graph.connect(get_att_pt, add_v1, 0, 1);

  graph.connect(get_rot, rot_v1, 0, 1);
  graph.connect(get_rot, rot_v2, 0, 1);
  graph.connect(get_rot, Signal, 0, 2);
  graph.connect(get_rot, rot_v3, 0, 1);

  graph.connect(rot_v1, add_v1, 0, 2);
  graph.connect(rot_v2, Eff1, 0, 2);
  graph.connect(add_v1, Eff3, 0, 1);
  graph.connect(rot_v3, Eff3, 0, 2);
  graph.connect(add_v2, Eff1, 0, 1);

  get_att_pt.setVal(1, "GI_AvatarRoot");
  rot_v1.setVal(0, [0, 2, 6]);
  rot_v2.setVal(0, [90, 0, 0]);
  Signal.setVal(0, "Dash");
  add_v2.setVal(1, [0, 1, 0]);
  rot_v3.setVal(0, [80, 4, 0]);

  Eff1.setVal(0, 10006238);
  Eff1.setVal(3, 1);
  Eff1.setVal(5, true);

  Eff2.setVal(0, 10011063);
  Eff2.setVal(2, [0, 0, 0]);
  Eff2.setVal(3, 0);
  Eff2.setVal(5, true);

  Eff3.setVal(0, 208);
  Eff3.setVal(3, 1.3);
  Eff3.setVal(5, false);

  // auto analysis layout
  graph.autoLayout(2, 2);
  return graph;
}

function test<T extends AllModes>(fun: (type: T) => Graph<T>, type: T) {
  const graph = fun(type);

  const encoded = graph.encode({ pos_jitter: false, fill_undefined: false });
  const decode = Graph.decode(encoded);
  const encoded2 = decode.encode({ pos_jitter: false });
  const decode2 = Graph.decode(encoded2);

  const encoded3 = decode2.encode({ pos_jitter: false, fill_undefined: true });
  const encoded3p = decode2.encode({ pos_jitter: false, fill_undefined: 123 });
  const decode3 = Graph.decode(encoded3);
  const decode3p = Graph.decode(encoded3p);


  // assertDeepEq(encoded, encoded2);
  // assertDeepEq(decode, decode2);

  (graph as any).connects = new Set([...graph.connects].sort((a, b) => a.from.node_index - b.from.node_index || a.to.node_index - b.to.node_index));
  (decode as any).connects = new Set([...decode.connects].sort((a, b) => a.from.node_index - b.from.node_index || a.to.node_index - b.to.node_index));

  console.log([...graph.connects].map(c => `${c.from}${c.from_index} -> ${c.to}${c.to_index}`).join("\n"));
  console.log([...decode.connects].map(c => `${c.from}${c.from_index} -> ${c.to}${c.to_index}`).join("\n"));
  return;
  // console.log(inspect(graph.connects));
  // console.log(inspect(decode.connects));

  assertDeepEq(graph, decode, {
    enable_debugger: true,
    ignore_rules: (a, b) =>
      a === null && (b instanceof Array && b.length === 0)
      || a === true && b === 1
      || a === false && b === 0
  });

  assertDeepEq(decode2, decode3, {
    ignore_rules: (a, b) =>
      a === null && (b === 0 || b instanceof Array && b.toString() === '0,0,0')
  });
  assertDeepEq(decode2, decode3p, {
    ignore_rules: (a, b) =>
      a === null && (b === 123 || b === 1 || b instanceof Array && b.toString() === '123,123,123')
  });

  /** graph --> encoded --> decode --> encoded2 --> decode2
   * 
   * Encode and Decode is Stable:
   * - encoded === encoded2
   * - decode === decode2
   * Encode and Decode is lossless:
   * - graph.sort() === decode.sort()
   * 
  */
}

if (import.meta.main) {
  // console.log("The equivalent DSL is:", DSL);
  // encode_gia_file("./dist/GeneratedGraph.gia", createGraph("item").encode());
  // console.log("Saved to `./dist/GeneratedGraph.gia`");

  // console.log("\n====== Test Server Graph ======");
  // test(createGraph, "server");
  // test(createGraph, "class");
  // test(createGraph, "item");
  // test(createGraph, "status");
  // console.log("======== Test Complete ========\n");

  console.log("The equivalent DSL is:", DSL2);
  encode_gia_file("./dist/GeneratedGraphClient.gia", createGraphClient("skill").encode());


  // test(createGraphClient, "skill");


}