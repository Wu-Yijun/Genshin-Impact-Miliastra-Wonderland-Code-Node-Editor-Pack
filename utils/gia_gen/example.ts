import { NODE_ID } from "../node_data/node_id.ts";
import { encode_gia_file } from "../protobuf/decode.ts";
import { Graph } from "./graph.ts";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function simple_create() {
  const graph = new Graph();
  const node1 = graph.add_node(NODE_ID.When_Entity_Is_Created);
  const node2 = graph.add_node(NODE_ID.Teleport_Player);
  const node3 = graph.add_node(NODE_ID.Create_3D_Vector);
  const node4 = graph.add_node(NODE_ID.Get_Self_Entity);
  graph.flow(node1, node2)
  graph.connect(node3, node2, 0, 1);
  graph.connect(node4, node2, 0, 0);
  encode_gia_file(PATH + "out.gia", graph.encode());
  // Same as DSL:
  // [OnCreate()]
  //   .$(() => new Vec())[pos]
  //   .Teleport(Self.self, pos);
}

simple_create();