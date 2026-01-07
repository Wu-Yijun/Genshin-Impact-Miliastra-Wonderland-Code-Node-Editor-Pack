import { Graph } from "../../utils/gia_gen/interface.ts";
import { get_system } from "../../utils/gia_gen/utils.ts";
import { NodeHelper } from "../../utils/node_data/instances.ts";
import type { ResourceClass } from "../../utils/node_data/types.ts";
import { assertDeepEq } from "../../utils/utils.ts";

function test_all_nodes(s: ResourceClass) {
  console.time("Make Graph");
  const g = new Graph(s);
  const nodes = NodeHelper.filterBySystem(get_system(s));
  let i = 0;
  for (const node of nodes.slice(0, 500)) {
    if (node.Variants) {
      for (const v of node.Variants) {
        // const v = node.Variants[3];
        const n = g.add_node(node.Identifier)!;
        n.setPosition(i % 40, i / 40, 400, 400);
        i++;
        n.setConstraints(v.Constraints);
      }
    } else {
      const n = g.add_node(node.Identifier)!;
      n.setPosition(i % 40, i / 40, 400, 400);
      i++;
    }
  }
  console.timeEnd("Make Graph");


  console.time("Encode");
  const encoded = g.encode();
  console.timeEnd("Encode");

  console.time("Decode");
  const g2 = Graph.decode(encoded);
  console.timeEnd("Decode");

  g.debugClearEmptyVars();
  g2.debugClearEmptyVars();

  console.time("Comparing encoded");
  assertDeepEq(g, g2);
  console.timeEnd("Comparing encoded");
}

export function main() {
  console.log("\n====== Test Server Graph ======");
  test_all_nodes("ENTITY_NODE_GRAPH");
  test_all_nodes("COMPOSITE_NODE_DECL");
  test_all_nodes("CLASS_NODE_GRAPH");
  test_all_nodes("ITEM_NODE_GRAPH");
  test_all_nodes("STATUS_NODE_GRAPH");
  console.log("======== Test Complete ========\n");

  console.log("\n====== Test Client Graph ======");
  test_all_nodes("SKILL_NODE_GRAPH");
  test_all_nodes("INTEGER_FILTER_GRAPH");
  test_all_nodes("BOOLEAN_FILTER_GRAPH");
  console.log("======== Test Complete ========\n");
}

// console.time("main");
// main();
// console.timeEnd("main");
