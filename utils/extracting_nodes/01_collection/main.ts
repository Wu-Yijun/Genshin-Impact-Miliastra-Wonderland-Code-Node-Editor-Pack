import { inspect } from "util";
import { decode_gia_file } from "../../protobuf/decode.ts";
import { assert, assertEq } from "../../utils.ts";
import { GraphInfo, Names, save } from "../util.ts";



const dir = import.meta.dirname;

function step1() {
  const range = [];
  for (const name of Names) {
    const g = decode_gia_file(dir + "/" + name + ".gia");
    const ID = g.graph.id;
    const Which = g.graph.which;
    const graph = g.graph.graph;
    const Graph = graph?.inner.graph.id ?? g.graph.compositeDef?.inner.def.id;
    // console.log(graph?.inner.graph)
    assertEq(graph?.inner.graph.name ?? g.graph.compositeDef?.inner.def.name, name);


    const Gid = (graph?.inner.graph ?? g.accessories[0].graph?.inner.graph)?.nodes.map(n => n.genericId);
    const Cid = (graph?.inner.graph ?? g.accessories[0].graph?.inner.graph)?.nodes.map(n => n.concreteId);

    console.log({ name, ID, Which, Graph, Gid, Cid });
    // console.log(inspect(g, { depth: null, compact: true }));
    // break;
    range.push({ name, max: Math.max(...Gid!.map(x => x.nodeId)), min: Math.min(...Gid!.map(x => x.nodeId)) });
  }
  console.log("从输出中看出, Node Id 仅与 Server/Client 有关, 不受子图的影响");
  console.log(range);
}

function step2() {
  const ret = [];
  for (const name of Names) {
    const g = decode_gia_file(dir + "/" + name + ".gia");
    const ID = g.graph.id;
    const Which = g.graph.which;
    const graph = g.graph.graph;
    const Graph = graph?.inner.graph.id ?? g.graph.compositeDef?.inner.def.id.graphId;
    // console.log(graph?.inner.graph)
    assertEq(graph?.inner.graph.name ?? g.graph.compositeDef?.inner.def.name, name);


    const Gid = (graph?.inner.graph ?? g.accessories[0].graph?.inner.graph)?.nodes.map(n => n.genericId);
    const Cid = (graph?.inner.graph ?? g.accessories[0].graph?.inner.graph)?.nodes.map(n => n.concreteId);

    const info: GraphInfo = {
      name,
      class: ID.class,
      type: ID.type,
      which: Which,
      graph_class: Graph!.class,
      graph_type: Graph!.type,
      graph_kind: Graph!.kind,
      node_class: Gid![0].class,
      node_type: Gid![0].type,
      node_kind: Gid![0].kind,
    }
    ret.push(info);
  }
  console.log(ret);
  save("collection.json", ret);
}



step1();
// step2();