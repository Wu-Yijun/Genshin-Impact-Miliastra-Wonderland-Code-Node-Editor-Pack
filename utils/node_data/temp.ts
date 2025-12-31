const a = [
  {
    "Name": "server",
    "Class": 5,
    "Type": 0,
    "Which": 9,
    "GraphClass": 10000,
    "GraphType": 20000,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "status",
    "Class": 5,
    "Type": 0,
    "Which": 22,
    "GraphClass": 10000,
    "GraphType": 20003,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "class",
    "Class": 5,
    "Type": 0,
    "Which": 23,
    "GraphClass": 10000,
    "GraphType": 20004,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "item",
    "Class": 5,
    "Type": 0,
    "Which": 46,
    "GraphClass": 10000,
    "GraphType": 20005,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  },
  {
    "Name": "bool",
    "Class": 1,
    "Type": 3,
    "Which": 10,
    "GraphClass": 10000,
    "GraphType": 20001,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20001,
    "NodeKind": 22000
  },
  {
    "Name": "int",
    "Class": 1,
    "Type": 3,
    "Which": 47,
    "GraphClass": 10000,
    "GraphType": 20006,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20001,
    "NodeKind": 22000
  },
  {
    "Name": "skill",
    "Class": 1,
    "Type": 3,
    "Which": 11,
    "GraphClass": 10000,
    "GraphType": 20002,
    "GraphKind": 21001,
    "NodeClass": 10001,
    "NodeType": 20002,
    "NodeKind": 22000
  },
  {
    "Name": "composite",
    "Class": 23,
    "Type": 0,
    "Which": 12,
    "GraphClass": 10000,
    "GraphType": 20000,
    "GraphKind": 21002,
    "NodeClass": 10001,
    "NodeType": 20000,
    "NodeKind": 22000
  }
];

const b: Map<string, {
  AssetsOrigin: number;
  AssetsCategory: number;
  AssetsKind: number;
  AssetsWhich: number;

  GraphOrigin: number;
  GraphCategory: number;
  GraphKind: number;

  NodeOrigin: number;
  NodeCategory: number;
  NodeKind: number;
}> = new Map();
a.forEach(x => {
  b.set(x.Name, {
    AssetsOrigin: 0,
    AssetsCategory: x.Class,
    AssetsKind: x.Type,
    AssetsWhich: x.Which,
    GraphOrigin: x.GraphClass,
    GraphCategory: x.GraphType,
    GraphKind: x.GraphKind,
    NodeOrigin: x.NodeClass,
    NodeCategory: x.NodeType,
    NodeKind: x.NodeKind,
  })
});

console.log(Object.fromEntries([...b.entries()]));