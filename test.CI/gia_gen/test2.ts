import { inspect } from "util";
import { Graph } from "../../utils/gia_gen/interface.ts";
import { NODE_NAMES, NODES } from "../../utils/node_data/game_nodes.ts";
import { writeFileSync } from "fs";
import { assertDeepEq } from "../../utils/utils.ts";

const graph = new Graph("ENTITY_NODE_GRAPH");
// const graph = new Graph("SKILL_NODE_GRAPH");

// column 1
const Trig = graph.add_node(NODES.Trigger_Tab_OnTabSelect)!;
// column 2
const Branch1 = graph.add_node(NODES.Control_General_Switch)!;
const get_val = graph.add_node(NODES.Query_CustomVariable_GetVariable)!;
Branch1.setConstraints("C<T:Int>");
get_val.setConstraints("C<T:Int>");
graph.flow(Trig, Branch1);
graph.connect(Trig, Branch1, "Output2", "key");
graph.connect(Trig, get_val, 0, 0);
// multiple def will override old def
get_val.connectPinWith("target_entity", Trig, "Output0");
graph.flow(Trig, Branch1, "FlowOut", "FlowIn", 3);

Branch1.setVal("cases", [1, 2, 3]);

Trig.setPosition(1, 1);
Branch1.setPosition(3, 1);
get_val.setPosition(4, 4);

Branch1.add_comment("Comment Attached to Node");
graph.add_comment("Comment Not Attached to Node", 600, 100);
graph.add_comment("Comment2 Also Attached to Node", Trig);

graph.add_graph_var("var1", "L<Int>", [1, 24, 5], true);
graph.add_graph_var("var1", "Int", 3, false); // skip redefine
graph.add_graph_var("var2", "Int", 3, false);

const g = graph.encode();

let str = "";
const logger = (...msg: string[]) => {
  // console.log(msg);
  str += msg.join(" ") + "\n";
}

const g2 = Graph.decode(g);
graph.debugPrint({ log: logger });
g2.debugPrint({ log: logger });

writeFileSync("temp.log", str);

assertDeepEq(graph, g2, { enable_debugger: true, print_l_r: false });

