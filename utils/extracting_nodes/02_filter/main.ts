
import { cls, collection, dir, gia, Names, read_json, save } from "../util.ts";

// [
//   { name: 'server', max: 3360, min: 1 },
//   { name: 'status', max: 3360, min: 1 },
//   { name: 'class', max: 3360, min: 1 },
//   { name: 'item', max: 3360, min: 1 },
//   { name: 'bool', max: 200109, min: 200000 },
//   { name: 'int', max: 200122, min: 200006 },
//   { name: 'skill', max: 200109, min: 200006 },
//   { name: 'composite', max: 3360, min: 1 }
// ]


function create_nodes(which: Names, start = 200000, count = 20, span = 0, repeat = 1) {
  const graph = gia(which);
  const info = collection().find(x => x.name === which)!;
  // console.log({ graph: graph.graph.graph?.inner.graph.nodes, info });
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  let index = 0;
  for (let r = 0; r < repeat; r++) {
    for (let i = 0; i < count; i++) {
      const id = i + start + span * r;
      nodes.push({
        nodeIndex: index + 100,
        genericId: {
          class: info.node_class,
          type: info.node_type,
          kind: info.node_kind,
          nodeId: id,
        },
        pins: [],
        x: (index % 300) * 300,
        y: (index / 300) * 200,
        usingStruct: []
      })
      index++;
    }
  }
  save(which + ".gia", graph, true);
  console.log("Saved", index, "nodes to", which, ".gia!");
}

function read_nodes(which: Names) {
  const nodes = gia(which + ".gia", true).graph.graph?.inner.graph.nodes!;
  dir(nodes?.length);
  save(`node_id_${which}.json`, nodes.map(x => ({ i: x.nodeIndex, gid: x.genericId.nodeId, cid: x.concreteId?.nodeId })));
}

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

function compare() {
  const id1 = read_json(`node_id_bool`) as any[];
  const id2 = read_json(`node_id_skill`) as any[];
  const id = new Set(id2.map(x => x.gid + "-" + x.cid));
  id1.forEach(x => {
    const k = x.gid + "-" + x.cid;
    if (!id.has(k)) {
      console.log("gid", x);
    } else {
      id.delete(k);
    }
  })
  console.log([...id]);

  /**
   * Outputs: 
```
gid { i: 4100, gid: 200000, cid: 0 }
gid { i: 4204, gid: 200104, cid: 0 }
gid { i: 4222, gid: 200122, cid: 0 }
[
  '200038-2000',      '200039-2000',      '200040-2000',
...
  ];
```
  */
  console.log("得到结论: skill 节点图的节点与filter的完全一致, 除了三个:")
  console.log(200000, "Node Graph End (Boolean)")
  console.log(200104, "Node Graph Ends")
  console.log(200122, "Node Graph End (Integer)")
  console.log("因此, 我们仅需要从 skill 节点图中提取信息即可.")
}

// cls();

// create_nodes("bool", 0, 2000, 100000, 10);
// create_nodes("skill", 0, 2000, 100000, 10);
// create_nodes("int", 0, 2000, 100000, 10);
// create_nodes(which, 0, 200, 10000, 100); // these two does the same job
// /** Export and import */
// read_nodes("bool");
// read_nodes("skill");
// read_nodes("int");

// create_exist_nodes("bool");
// create_exist_nodes("skill");
// create_exist_nodes("int");

compare();