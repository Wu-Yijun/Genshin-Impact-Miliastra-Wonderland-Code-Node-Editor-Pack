/**
 * ProtobufParser - A lightweight, library-free Protobuf raw decoder.
 * Based on decode_raw.py
 */

import { readFileSync } from "fs";

export interface ParsedResult {
  [field: number]: any[];
}

export interface TagResult {
  [field: number]: string[];
}

export class ProtobufParser {
  private strict: boolean;
  private textDecoder = new TextDecoder("utf-8", { fatal: true });

  constructor(strict: boolean = true) {
    this.strict = strict;
  }

  // ----- Basic Reading -----

  /**
   * Reads a varint from the data buffer.
   */
  public readVarint(data: Uint8Array, pos: number): { value: bigint; pos: number } {
    let value = 0n;
    let shift = 0n;
    const startPos = pos;

    while (true) {
      if (pos >= data.length) {
        throw new Error(`Unexpected EOF while reading varint at ${startPos}`);
      }

      const b = data[pos];
      pos += 1;

      value |= BigInt(b & 0x7f) << shift;
      if (!(b & 0x80)) {
        break;
      }

      shift += 7n;
      if (shift > 70n) {
        throw new Error("Varint too long, likely corrupted");
      }
    }

    return { value, pos };
  }

  /**
   * Reads a 32-bit fixed-length integer.
   */
  public readFixed32(data: Uint8Array, pos: number): { value: number; pos: number } {
    if (pos + 4 > data.length) {
      throw new Error("Unexpected EOF in fixed32");
    }
    const view = new DataView(data.buffer, data.byteOffset + pos, 4);
    const value = view.getUint32(0, true);
    return { value, pos: pos + 4 };
  }

  /**
   * Reads a 64-bit fixed-length integer.
   */
  public readFixed64(data: Uint8Array, pos: number): { value: bigint; pos: number } {
    if (pos + 8 > data.length) {
      throw new Error("Unexpected EOF in fixed64");
    }
    const view = new DataView(data.buffer, data.byteOffset + pos, 8);
    const value = view.getBigUint64(0, true);
    return { value, pos: pos + 8 };
  }

  // ----- Main Parsing Function -----

  /**
   * Parses a Protobuf message from the data buffer.
   */
  public parseMessage(
    data: Uint8Array,
    pos: number = 0,
    length?: number
  ): { result: ParsedResult; tags: TagResult } {
    const end = length !== undefined ? pos + length : data.length;
    const result: ParsedResult = {};
    const resultTags: TagResult = {};

    const append = (field: number, value: any, tag: string) => {
      if (!result[field]) {
        result[field] = [];
        resultTags[field] = [];
      }
      result[field].push(value);
      resultTags[field].push(tag);
    };

    while (pos < end) {
      // Read tag (field_number << 3 | wire_type)
      const tagInfo = this.readVarint(data, pos);
      const tag = Number(tagInfo.value);
      pos = tagInfo.pos;

      const fieldNumber = tag >> 3;
      const wireType = tag & 0b111;

      if (fieldNumber === 0) {
        throw new Error(`Invalid field_number=0 at pos=${pos}`);
      }

      let value: any;
      let tagDesc: any;

      switch (wireType) {
        case 0: {
          // Varint
          const varintInfo = this.readVarint(data, pos);
          value = varintInfo.value;
          pos = varintInfo.pos;
          tagDesc = "wire_type=0 (Varint: int32/int64/bool/enum)";
          break;
        }
        case 1: {
          // 64-bit
          const fixed64Info = this.readFixed64(data, pos);
          value = fixed64Info.value;
          pos = fixed64Info.pos;
          tagDesc = "wire_type=1 (fixed64/double)";
          break;
        }
        case 2: {
          // Length-delimited
          const sizeInfo = this.readVarint(data, pos);
          const size = Number(sizeInfo.value);
          pos = sizeInfo.pos;

          if (pos + size > end) {
            throw new Error("Length-delimited field exceeds message boundary");
          }

          const raw = data.slice(pos, pos + size);

          // Recursively parse inner message if possible
          try {
            // Validation: a sub-message must be valid. 
            // We use a separate parser instance to avoid side effects if strictness differs
            const subParser = new ProtobufParser(true);
            const { result: subMsg, tags: subTag } = subParser.parseMessage(raw, 0, raw.length);

            // Heuristic check: if it's an empty message but size > 0, it might just be string/bytes
            if (Object.keys(subMsg).length === 0 && size > 0) {
              throw new Error("Empty sub-message with non-zero size");
            }

            value = subMsg;
            tagDesc = subTag;
          } catch (e) {
            // If not a message, treat as string or bytes
            try {
              value = this.textDecoder.decode(raw);
              tagDesc = "wire_type=2 (string)";
            } catch {
              value = raw;
              tagDesc = "wire_type=2 (bytes)";
            }
          }

          pos += size;
          break;
        }
        case 5: {
          // 32-bit
          const fixed32Info = this.readFixed32(data, pos);
          value = fixed32Info.value;
          pos = fixed32Info.pos;
          tagDesc = "wire_type=5 (fixed32/float32)";
          break;
        }
        default:
          if (this.strict) {
            throw new Error(`Unsupported wire type ${wireType} at pos ${pos}`);
          } else {
            // Non-strict mode: try to jump out or skip (though skipping unknown wire types is hard without length)
            return { result, tags: resultTags };
          }
      }

      append(fieldNumber, value, tagDesc);
    }

    return { result, tags: resultTags };
  }
}

// CLI entry point (optional, similar to Python script)
if (import.meta.main || (typeof process !== "undefined" && process.argv[1]?.endsWith("decode_raw.ts"))) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: ts-node decode_raw.ts <FILE_PATH>");
    process.exit(1);
  }

  try {
    const data = readFileSync(filePath);
    // Mimic the Python logic of skipping Gia header if needed (can be customized)
    const rawData = new Uint8Array(data);
    const parser = new ProtobufParser(true);
    const { result } = parser.parseMessage(rawData.slice(20, -4));
    console.log(JSON.stringify(result, (key, value) => typeof value === "bigint" ? value.toString() : value, 2));
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
