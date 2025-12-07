import type * as dTypes from 'dagre';

import { createRequire } from 'module';
import { Graph, Node } from './graph.ts';
const require = createRequire(import.meta.url);
const d = require("@dagrejs/dagre");

const WIDTH = 300, HEIGHT = 200;
export function auto_layout(graph: Graph<any>, distance = 1.0, separation = 1.0) {

  const nodes_names = new Map<Node<any>, string>(graph.get_nodes().map((n, i) => [n, i.toString()]));

  const g: dTypes.graphlib.Graph = new d.graphlib.Graph();
  g.setGraph({
    rankdir: "LR",
    align: undefined,
    nodesep: 80 * separation,
    edgesep: 20 * separation,
    ranksep: 150 * separation,
    acyclicer: "greedy",
  });
  g.setDefaultEdgeLabel(function () { return {}; });

  for (const [_, name] of nodes_names) {
    g.setNode(name, { width: WIDTH * distance, height: HEIGHT * distance });
  }
  for (const flow of graph.get_flows()) {
    g.setEdge(nodes_names.get(flow.from)!, nodes_names.get(flow.to)!);
  }
  for (const connect of graph.get_connects()) {
    g.setEdge(nodes_names.get(connect.from)!, nodes_names.get(connect.to)!);
  }

  // Arrange Layout
  d.layout(g);

  nodes_names.forEach((name, node) => {
    const n = g.node(name);
    node.setPos(n.x / WIDTH, n.y / HEIGHT);
  })
}

function test() {
  const g: dTypes.graphlib.Graph = new d.graphlib.Graph();
  g.setGraph({
    rankdir: "LR",
    align: undefined,
    nodesep: 50,
    edgesep: 10,
    ranksep: 100,
    acyclicer: "greedy",
  });

  g.setDefaultEdgeLabel(function () { return {}; });
  g.setNode("A", { width: 300, height: 200 });
  g.setNode("B", { width: 300, height: 200 });
  g.setNode("C", { width: 300, height: 200 });
  g.setNode("E", { width: 300, height: 200 });
  g.setNode("D", { width: 300, height: 200 });
  g.setNode("T", { width: 300, height: 200 });

  g.setEdge("A", "B");
  g.setEdge("A", "E");
  g.setEdge("B", "T");
  g.setEdge("C", "T");
  g.setEdge("E", "D");
  g.setEdge("D", "T");

  d.layout(g);

  g.nodes().forEach(function (v) {
    console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
  });
  g.edges().forEach(function (e) {
    console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
  });
}

if (import.meta.main) {
  test();
}