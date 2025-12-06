import { collection, gia, Names, read_json, save } from "../util";

function create_exist_nodes(which: Names) {
  const graph = gia(which);
  const info = collection().find(x => x.name === which)!;
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const ids = read_json(`node_id_${which}`) as any[];
  // dir(ids);
  const g = ids.filter(x => x.cid !== undefined);
  const r = ids.filter(x => x.cid === undefined);
  // dir({ g, r }, true);

  let id = 1;
  let index = 0;
  for (const x of g) {
    nodes.push({
      nodeIndex: id++,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: x.gid,
      },
      pins: [],
      x: (index % 20) * 300,
      y: Math.floor(index / 20) * 200,
      usingStruct: []
    });
    index++;
  }
  index = 500;
  for (const x of r) {
    nodes.push({
      nodeIndex: id++,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: x.gid,
      },
      pins: [],
      x: (index % 20) * 300,
      y: Math.floor(index / 20) * 200,
      usingStruct: []
    });
    index++;
  }
  save(which + ".gia", graph, true);
  console.log("Saved", id, "nodes to", which, ".gia!");
}
