import { inspect } from "util";
import { Graph } from "../../utils/gia_gen/interface.ts";
import { NODES } from "../../utils/node_data/game_nodes.ts";
import { writeFileSync } from "fs";

const graph = new Graph("ENTITY_NODE_GRAPH");

// column 1
const Trig = graph.add_node(NODES.Trigger_Tab_OnTabSelect)!;
// column 2
const Branch1 = graph.add_node(NODES.Control_General_Switch)!;
const get_val = graph.add_node(NODES.Query_CustomVariable_GetVariable)!;
Branch1.setConstraints({ t: "c", c: [["T", { t: "b", b: "Int" }]] });
graph.flow(Trig, Branch1);
graph.connect(Trig, Branch1, 2, 0);
// graph.connect(Trig, get_val, 0, 0);

writeFileSync("temp.cs",  inspect(graph, { depth: null }));