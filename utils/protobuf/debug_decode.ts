import proto from "protobufjs";

/** 
 * Usage:
 * ```ts
 * const root = proto.loadSync(proto_path);
 * const message = root.lookupType("Root");
 * const buffer = unwrap_gia({ gia_path });
 * debugDecode(message, buffer);
 * ```
 */
export function debugDecode(type: proto.Type, buffer: Uint8Array) {
  const r = new proto.Reader(buffer);
  try {
    while (r.pos < r.len) {
      const pos = r.pos;
      const tag = r.uint32();
      const fieldNo = tag >>> 3;
      const wireType = tag & 7;

      console.log(`[pos=${pos}] field=${fieldNo}, wireType=${wireType}`);

      // peek the field type in message schema
      const field = type.fieldsById[fieldNo];
      if (!field) {
        console.warn(`Unknown field ${fieldNo}, skipping…`);
        r.skipType(wireType);
        continue;
      }

      console.log(` → Field name: ${field.name}, type: ${field.type}`);

      // manually skip without decoding fully
      r.skipType(wireType);
    }
  } catch (err) {
    console.error("Decode failed at pos", r.pos);
    throw err;
  }
}
