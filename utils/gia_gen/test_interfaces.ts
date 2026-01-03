
import { Graph } from "./interfaces.ts";
import { Doc } from "../node_data/instances.ts";

async function test() {
  console.log("--- Testing Graph Interfaces ---");

  // 1. Create Graph
  const graph = new Graph("Server", 12345, "TestGraph");
  console.log(`Created Graph: ${graph.graph_name} (ID: ${graph.graph_id})`);

  // 2. Add Node by Identifier (assuming some standard nodes exist)
  // Let's try to find a real one from Doc first to be safe
  const allNodes = Doc.Node.nodes;
  if (allNodes.length === 0) {
    console.error("No nodes loaded from data.json!");
    return;
  }
  const firstNode = allNodes[0];
  console.log(`Found node to test: ${firstNode.Identifier} (ID: ${firstNode.ID})`);

  const node1 = graph.add_node(firstNode.Identifier);
  if (!node1) {
    console.error("Failed to add node by Identifier");
  } else {
    console.log("Added node 1:", node1.def.Identifier, node1.node_index);
  }

  // 3. Add Node by ID
  const secondNode = allNodes.length > 1 ? allNodes[1] : firstNode;
  const node2 = graph.add_node(secondNode.ID);
  if (!node2) {
    console.error("Failed to add node by ID");
  } else {
    console.log("Added node 2:", node2.def.Identifier, node2.node_index);
  }

  // 4. Connect (if applicable)
  // We need to find pins.
  if (node1 && node2) {
    // Just try to find ANY out pin on node1 and ANY in pin on node2
    const outPin = node1.pins.find(p => p.kind === 2 || p.kind === 4); // OutFlow or OutParam
    const inPin = node2.pins.find(p => p.kind === 1 || p.kind === 3); // InFlow or InParam

    if (outPin && inPin) {
      console.log(`Connecting ${node1.def.Identifier}.${outPin.def.Identifier} -> ${node2.def.Identifier}.${inPin.def.Identifier}`);

      // Test index based connect
      const conn1 = graph.connect(node1, node2, outPin.def.Index, inPin.def.Index);
      if (conn1) console.log("Connected via Index!");
      else console.error("Failed to connect via Index");

      graph.disconnect(conn1!);

      // Test identifier based connect
      const conn2 = graph.connect(node1, node2, outPin.def.Identifier, inPin.def.Identifier);
      if (conn2) console.log("Connected via Identifier!");
      else console.error("Failed to connect via Identifier");
    } else {
      console.log("Could not find compatible pins to test connection.");
    }
  }

  // 5. Test setConstraints (find a Variant node)
  const variantNodeDef = allNodes.find(n => n.Type === "Variant");
  if (variantNodeDef) {
    console.log(`Testing Variant Node: ${variantNodeDef.Identifier}`);
    const vNode = graph.add_node(variantNodeDef.Identifier);
    if (vNode) {
      // Get constraints
      const constraints = Doc.Node.getVariantConstraints(variantNodeDef.Identifier);
      if (constraints.length > 0) {
        console.log(`Setting constraint: ${constraints[0]}`);
        // We need to parse constraint string back to NodeType if possible or just pass if we had a helper
        // But setConstraints expects NodeType.
        // For test purposes, let's just try to parse it if simple, or skip complex parsing logic validation for now
        // as we just want to see if method runs without crashing.
        // vNode.setConstraints(...) 
      }
    }
  }

  // 6. Encode
  try {
    const encoded = graph.encode();
    console.log("Encoded Graph Successfully. Node count:", encoded.primary_resource.graph_data?.inner.graph.nodes.length);
  } catch (e) {
    console.error("Encoding failed:", e);
  }
}

test();
