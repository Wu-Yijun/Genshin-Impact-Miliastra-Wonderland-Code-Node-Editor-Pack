import { Graph } from "../../utils/gia_gen/index.ts";
import { NODE_ID } from "../../utils/node_data/index.ts";
import { encode_gia_file } from "../../utils/protobuf/decode.ts";

const graph = new Graph("server", undefined, "Github Actions CI Test Generated Graph");

// column 1
const trig = graph.add_node(NODE_ID.When_Tab_Is_Selected);
// column 2
const branch1 = graph.add_node(NODE_ID.Multiple_Branches__Int);
const get_val = graph.add_node(NODE_ID.Get_Custom_Variable__Int);
graph.flow(trig, branch1);
graph.connect(trig, branch1, 2, 0);
graph.connect(trig, get_val, 0, 0);
branch1.setVal(1, ["1", "2", "3"]);
get_val.setVal(1, "Plant Level");
// column 3
const branch2 = graph.add_node(NODE_ID.Double_Branch);
const eq1 = graph.add_node(NODE_ID.Equal__Int);
const branch3 = graph.add_node(NODE_ID.Double_Branch);
const eq2 = graph.add_node(NODE_ID.Equal__Int);
const branch4 = graph.add_node(NODE_ID.Double_Branch);
const eq3 = graph.add_node(NODE_ID.Equal__Int);
graph.flow(branch1, branch2, 1, 0);
graph.flow(branch1, branch3, 2);
graph.flow(branch1, branch4, 3);
graph.connect(get_val, eq1, 0, 0);
graph.connect(get_val, eq2, 0, 0);
graph.connect(get_val, eq3, 0, 0);
graph.connect(eq1, branch2, 0, 0);
graph.connect(eq2, branch3, 0, 0);
graph.connect(eq3, branch4, 0, 0);
eq1.setVal(1, 0);
eq2.setVal(1, 1);
eq3.setVal(1, 2);
// auto analysis layout
graph.autoLayout();
encode_gia_file("./dist/GeneratedGraph.gia", graph.encode());