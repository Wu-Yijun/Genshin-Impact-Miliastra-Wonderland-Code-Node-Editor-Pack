import { debugDecode } from "../protobuf/debug_decode.ts";
import { decode_gia_file, encode_gia_file, unwrap_gia } from "../protobuf/decode.ts";
import proto from "protobufjs";
import { Graph } from "./graph.ts";
import { CLIENT_NODE_ID, NODE_ID } from "../node_data/node_id.ts";
import { NODE_PIN_RECORDS } from "../node_data/node_pin_records.ts";
import { assert, assertEq, assertEqs } from "../utils.ts";
import { get_type_client, stringify } from "./nodes.ts";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function gen() {
  // const g = new Graph("server");
  // Object.values(NODE_ID).forEach((x, i) => g.add_node(x).setPos(i % 30, i / 30));
  const g = new Graph("skill");
  Object.values(CLIENT_NODE_ID).forEach((x, i) => g.add_node(x).setPos(i % 10, i / 10));
  encode_gia_file(PATH + "test.gia", g.encode());
}


import { NodesList } from "../node_data/data.ts";
function read() {
  const g = decode_gia_file(PATH + "test.gia");
  const nodes = g.graph.graph?.inner.graph.nodes!;
  const tmp: any = {};
  Object.entries(CLIENT_NODE_ID).forEach((x, i) => {
    // NodesList.filter(x => x.Range === "Client").forEach(data => {
    const data = NodesList.find(n => n.ID === parseInt(x[1]))!;
    const node = nodes.find(n => n.genericId.nodeId === data.ID);
    if (node === undefined) {
      // console.log('skip', x[0]);
      return;
    }
    const pins = node.pins;
    let pin5 = false;
    let pin50 = false;
    pins.forEach(p => {
      // pin5 
      if (![1, 2, 3, 4].includes(p.i1.kind)) {
        if (data.Name === "Send_Signal_to_Server_Node_Graph" && p.i1.index === 1) {
          return;
        }
        assert(pin5 === false);
        pin5 = true;
        if (p.type === 0) {
          pin50 = true;
          return;
        }
        assertEq(p.type, 3);
        assertEq(p.value.bInt?.val, 0);
      }
    });

    if (pin5) {
      assertEq(node.pins.find(x => x.i1.kind === 5)!.clientExecNode?.nodeId?.id, data.ID)
      assertEqs(data.Class, "Execution", "Trigger", "Control", "Hidden");
      if (pin50) {
        assertEqs(data.Class, "Execution", "Control");
        // if (data.Class === "Execution")
        console.log("++++", data.Name, node.nodeIndex);
      } else {
        assertEqs(data.Class, "Execution", "Trigger", "Hidden");
        // if (data.Class === "Execution") console.log("----", data.Name);
        if (data.Class === "Hidden") console.log("<<<<", data.Name);
      }
    } else assertEqs(data.Class, "Arithmetic", "Query", "Others", "Hidden");
    if (data.Class === "Others" || data.Class === "Hidden") {
      console.log(">>>>", data.Name);
    }
  });

}

// gen();
read();