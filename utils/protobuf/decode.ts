import { readFileSync, writeFileSync } from "fs";
import proto from "protobufjs";

import { type GraphNode, NodePin_Index_Kind, type Root } from "./gia.proto.ts";
import assert from "assert";

const VERSION = "1.1.0";

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

export interface DecodeGiaInterface {
  /** path to gia file */
  gia_path: string | null;
  /** binary date without header and footer */
  proto_bytes?: Uint8Array<ArrayBufferLike> | ArrayBuffer;
  /** path to def file: *.proto */
  proto_path?: string;
  /** enable checking header and tail */
  check_header?: boolean;
}

export function unwrap_gia(config: DecodeGiaInterface): Uint8Array {
  if (config.proto_bytes === undefined) {
    if (config.gia_path === null) {
      throw new Error("Either path or bytes is required");
    }
    const bytes = new Uint8Array(readFileSync(config.gia_path));
    if (config.check_header === true) {
      const header = new DataView(bytes.buffer);
      const left_size = header.getUint32(0, false);
      const schema_version = header.getUint32(4, false);
      const head_tag = header.getUint32(8, false);
      const file_type = header.getUint32(12, false);
      const proto_size = header.getUint32(16, false);
      const tail_tag = header.getUint32(bytes.byteLength - 4, false);

      assert(bytes.byteLength - 4 === left_size);
      assert(schema_version === 1);
      assert(head_tag === 0x0326);
      assert(tail_tag === 0x0679);
      assert(file_type === 3);
      assert(proto_size === bytes.byteLength - 24);
      console.info("Gia file header Check Pass!")
    }
    config.proto_bytes = bytes.slice(20, -4);
  } else {
    config.proto_bytes = new Uint8Array(config.proto_bytes);
  }
  return config.proto_bytes;
}
export function wrap_gia(message: proto.Type, data: Root) {
  const newBytes = message.encode(data).finish();
  const header = [newBytes.byteLength + 20, 1, 0x0326, 3, newBytes.byteLength];
  const tail = [0x0679];

  const buffer = new ArrayBuffer(header[0] + 4);
  const view = new DataView(buffer);
  for (let i = 0; i < header.length; i++) {
    view.setUint32(i * 4, header[i], false);
  }
  new Uint8Array(buffer, 20).set(newBytes);
  view.setUint32(buffer.byteLength - 4, tail[0], false);
  return buffer;
}

export function decode_gia_file(config: DecodeGiaInterface): Root {
  config.proto_path ??= import.meta.dirname + "/gia.proto";
  const root = new proto.Root().loadSync(config.proto_path, { keepCase: true });
  const message = root.lookupType("Root");

  const msg = message.decode(unwrap_gia(config)) as any as Root;
  return msg;
}

export interface EncodeGiaInterface {
  /** path to save gia file */
  out_path: string;
  /** path to def file: *.proto */
  proto_path?: string;
  /** Graph */
  gia_struct: Root
}
export function encode_gia_file(config: EncodeGiaInterface) {
  config.proto_path ??= import.meta.dirname + "/gia.proto";
  const root = new proto.Root().loadSync(config.proto_path, { keepCase: true });
  const message = root.lookupType("Root");

  writeFileSync(config.out_path, Buffer.from(wrap_gia(message, config.gia_struct)));
}

// 内部测试, 请自己写你自己的, 用 decode_gia_file encode_gia_file 函数
function test() {
  interface Info {
    index: number;
    id: number;
    type: number;
    from: number;
    to: number;
  }
  function getInfo(node: GraphNode): Info | null {
    const p: NodePin_Index_Kind = node.pins[1]?.i1.kind;
    const temp = {
      index: node.nodeIndex,
      id: node.concreteId?.nodeId,
      type: node.pins[0]?.value.bNodeValue?.indexOfConcrete,
      from: node.pins[0]?.value.bNodeValue?.value.bEnum?.val,
      to: node.pins[1]?.value.bNodeValue?.value.bEnum?.val,
    };
    if (temp.id === undefined) {
      return null;
    }
    return temp as Info;
  }

  let id = 0;
  function getId() {
    return ++id;
  }
  function getNode(info: Info, x: number, y: number, node: GraphNode): GraphNode {
    const n = structuredClone(node);
    n.x = x * 300 + 0.124356;
    n.y = y * 200 + 0.12345;
    n.nodeIndex = getId();
    n.concreteId.nodeId = info.id as any;
    n.pins[0].value.bNodeValue!.indexOfConcrete = info.type as any;
    n.pins[1].value.bNodeValue!.indexOfConcrete = info.type as any;
    n.pins[0].value.bNodeValue!.value.bEnum!.val = info.from as any;
    n.pins[1].value.bNodeValue!.value.bEnum!.val = info.to as any;
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
      result.push(getNode(newInfo, info.index, i, node));
    }
    return result;
  }


  const msg = decode_gia_file({ gia_path: import.meta.dirname + "/../../utils/ref/enumAll.gia" });
  const nodes = msg.graph.graph!.inner.graph.nodes;

  const node = nodes[0];

  const new_nodes = nodes.map(getInfo).filter(x => x !== null).map(increase).flat();
  msg.graph.graph!.inner.graph.nodes = new_nodes;

  encode_gia_file({ out_path: import.meta.dirname + `/../../utils/ref/all_enums_v${VERSION}.gia`, gia_struct: msg })
}

if (import.meta.main) {
  test();
}