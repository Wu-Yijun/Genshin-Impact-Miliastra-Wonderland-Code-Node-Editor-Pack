import { readFileSync, writeFileSync } from "fs";
import proto from "protobufjs";
import { type GraphNode, NodePin$Index$Kind, type Root } from "./gia.proto.ts";

const VERSION = "1.0.2";

interface GiaFile {
  _00_header: { // 4 * 5 = 20 bytes
    _00_left_size: number; // file_size - 4
    _04_schema_version: 1;
    _08_head_tag: 0x0326;
    _12_file_type: 3;
    _16_proto_size: number;
  };
  _20_proto: Uint8Array;
  _20_Data_footer: { // 4 bytes
    _20_Data_tail_tag: 0x0679;
  }
}

const bytes = readFileSync(import.meta.dirname + "/../../utils/ref/enumAll.gia").buffer;

const root = proto.loadSync(import.meta.dirname + "/gia.proto");
const message = root.lookupType("Root");
const msg = message.decode(new Uint8Array(bytes, 20, bytes.byteLength - 24)) as any as Root;

const nodes = msg.graph.graph!.inner.graph.nodes;
interface Info {
  index: number;
  id: number;
  type: number;
  from: number;
  to: number;
}
function getInfo(node: GraphNode): Info | null {
  const p: NodePin$Index$Kind = node.pins[1]?.i1.kind;
  console.log(p === NodePin$Index$Kind.InParam)
  const temp = {
    index: node.nodeIndex,
    id: node.concreteId?.nodeId,
    type: node.pins[0]?.value.bNodeValue?.classBase,
    from: node.pins[0]?.value.bNodeValue?.value.bEnum?.val,
    to: node.pins[1]?.value.bNodeValue?.value.bEnum?.val,
  };
  if (temp.id === undefined) {
    return null;
  }
  return temp as Info;
}

function getId() {
  let id = 0;
  return (() => ++id)();
}
function getNode(info: Info, x: number, y: number): GraphNode {
  const n = structuredClone(nodes[0]);
  n.x = x * 300;
  n.y = y * 200;
  n.nodeIndex = getId();
  n.concreteId.nodeId = info.id;
  n.pins[0].value.bNodeValue!.classBase = info.type;
  n.pins[1].value.bNodeValue!.classBase = info.type;
  n.pins[0].value.bNodeValue!.value.bEnum!.val = info.from;
  n.pins[1].value.bNodeValue!.value.bEnum!.val = info.to;
  return n;
}

// increase nodes ranging from `from` to `to`
function increase(info: Info): GraphNode[] {
  const f = 100 * Math.floor(info.from / 100);
  const len = Math.max((info.to - f + 3) / 2, 5);
  const result: GraphNode[] = [];
  for (let i = 0; i < len; i++) {
    const newInfo: Info = {
      ...info,
      from: f + i * 2,
      to: f + i * 2 + 1,
    };
    result.push(getNode(newInfo, info.index, i));
  }
  return result;
}


// const new_nodes = structuredClone(nodes); // test.
const new_nodes = nodes.map(getInfo).filter(x => x !== null).map(increase).flat();
msg.graph.graph!.inner.graph.nodes = new_nodes;

const newBytes = message.encode(msg).finish();
const newGiaFile: GiaFile = {
  _00_header: {
    _00_left_size: newBytes.byteLength + 20,
    _04_schema_version: 1,
    _08_head_tag: 0x0326,
    _12_file_type: 3,
    _16_proto_size: newBytes.byteLength,
  },
  _20_proto: newBytes,
  _20_Data_footer: {
    _20_Data_tail_tag: 0x0679,
  },
};

function to_bytes(file: GiaFile): Uint8Array {
  const res = new ArrayBuffer(file._00_header._00_left_size + 4);
  const view = new DataView(res);
  view.setUint32(0, file._00_header._00_left_size, false);
  view.setUint32(4, file._00_header._04_schema_version, false);
  view.setUint32(8, file._00_header._08_head_tag, false);
  view.setUint32(12, file._00_header._12_file_type, false);
  view.setUint32(16, file._00_header._16_proto_size, false);
  new Uint8Array(res, 20, file._20_proto.byteLength).set(file._20_proto);
  view.setUint32(20 + file._20_proto.byteLength, file._20_Data_footer._20_Data_tail_tag, false);
  return new Uint8Array(res);
}
const output = to_bytes(newGiaFile);
writeFileSync(import.meta.dirname + `/../../utils/ref/all_enums_v${VERSION}.gia`, Buffer.from(output));