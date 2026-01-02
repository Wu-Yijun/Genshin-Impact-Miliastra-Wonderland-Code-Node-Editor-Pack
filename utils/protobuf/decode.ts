import { readFileSync, writeFileSync } from "fs";
import proto from "protobufjs";

import { type GraphNode, NodePin_Index_Kind, type Root } from "./gia.proto.ts";
import { assert } from "../../utils/utils.ts";

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

export function unwrap_gia(gia_path_or_data: string | Uint8Array<ArrayBufferLike> | ArrayBuffer, check_header: boolean = true): Uint8Array {
  if (typeof gia_path_or_data === "string") {
    const bytes = new Uint8Array(readFileSync(gia_path_or_data));
    if (check_header === true) {
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
      console.info("Gia file header Check Pass!");
    }
    return bytes.slice(20, -4);
  } else {
    return new Uint8Array(gia_path_or_data);
  }
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

export function decode_gia_file(gia_path_or_data: string | Uint8Array<ArrayBufferLike> | ArrayBuffer, proto_path?: string, check_header: boolean = false): Root {
  proto_path ??= import.meta.dirname + "/gia.proto";
  const root = new proto.Root().loadSync(proto_path, { keepCase: true });
  const message = root.lookupType("Root");

  const msg = message.decode(unwrap_gia(gia_path_or_data, check_header));
  // return msg as Root;
  return message.toObject(msg, { defaults: true, longs: Number }) as Root;
}


export function encode_gia_file(out_path: string, gia_struct: Root, proto_path?: string) {
  proto_path ??= import.meta.dirname + "/gia.proto";
  const root = new proto.Root().loadSync(proto_path, { keepCase: true });
  const message = root.lookupType("Root");

  writeFileSync(out_path, Buffer.from(wrap_gia(message, gia_struct)));
}


if (import.meta.main) {
  // test();
}