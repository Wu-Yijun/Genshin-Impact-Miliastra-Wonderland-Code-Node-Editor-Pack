/**
 * ProtobufParser - A lightweight, library-free Protobuf raw decoder.
 * Based on decode_raw.py
 */

import { readFileSync } from "fs";

export interface ParsedResult {
  [field: number]: any[] ;
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
      if (shift > 1000n) {
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

    const append = (field: number, value: any, tag: string, meta?: { [key: string]: any }) => {
      if (!result[field]) {
        result[field] = [];
        resultTags[field] = [];
      }
      result[field].push(value);
      if(meta) Object.entries(meta).forEach(([k,v]) => (result[field] as any)["_"+k] = v);
      resultTags[field].push(tag);
    };

    while (pos < end) {
      // Read tag (field_number << 3 | wire_type)
      const tagInfo = this.readVarint(data, pos);
      const tag = tagInfo.value;
      pos = tagInfo.pos;

      const fieldNumber = Number(tag >> 3n);
      const wireType = Number(tag & 0b111n);

      if (fieldNumber === 0) {
        throw new Error(`Invalid field_number=0 at pos=${pos}`);
      }

      let value: any;
      let tagDesc: any;
      let meta: { [key: string]: any } = {};

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
          meta["wire_type_2"] = raw; // Keep raw data for potential use
          let resolved = false;
          // 1. 尝试作为 Sub-Message 解析
          // 只有当数据量足够大，且看起来像 Protobuf 结构时才认为是 Message
          // 简单的防守：如果是极短的数据(如2字节 01 02)，解析为 Message 会抛错(Invalid Field 0)或解析出空对象
          if (!resolved) {
             try {
               const subParser = new ProtobufParser(true); // 严格模式
               const { result: subMsg,  tags: subTag } = subParser.parseMessage(raw);
               
               // 启发式过滤：如果有合法的解析结果，且不是空的，认为是 Message
               if (Object.keys(subMsg).length > 0) {
                 value = subMsg;
                 tagDesc = subTag;
                 resolved = true;
               }
             } catch (e) { /* 不是 Message */ }
          }

          // 2. 尝试作为 String 解析 (优先于 Packed Varint，因为文本更常见)
          if (!resolved) {
             try {
                // 如果看起来像文本，才解码
                if (this.isLikelyString(raw)) {
                    value = this.textDecoder.decode(raw);
                    tagDesc = "wire_type=2 String (Heuristic)";
                    resolved = true;
                }
             } catch (e) { /* UTF-8 解码失败 */ }
          }

          // 3. 尝试作为 Packed Varint 解析 (Repeated Int32)
          if (!resolved) {
             if (this.isValidPackedVarint(raw)) {
                // 真正的解析
                value = [];
                let p = 0;
                while(p < raw.length) {
                    const vInfo = this.readVarint(raw, p);
                    value.push(vInfo.value);
                    p = vInfo.pos;
                }
                tagDesc = "wire_type=2 Packed Varint (Heuristic)";
                resolved = true;
             }
          }

          // 4. 无法识别，作为 Bytes
          if (!resolved) {
              value = raw;
              tagDesc = "wire_type=2 Bytes";
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

      append(fieldNumber, value, tagDesc, meta);
    }

    return { result, tags: resultTags };
  }

  /**
   * 检查是否像是一个有意义的字符串
   * 启发式：如果包含太多不可见字符（控制字符），则认为不是 String
   */
  private isLikelyString(data: Uint8Array): boolean {
    if (data.length === 0) return true;
    
    // 统计可打印字符 (ASCII 32-126, 以及 \t \n \r)
    let printableCount = 0;
    for (let i = 0; i < data.length; i++) {
      const b = data[i];
      if ((b >= 32 && b <= 126) || b === 9 || b === 10 || b === 13) {
        printableCount++;
      } else if (b > 127) {
        // 对于非 ASCII，如果是合法的 UTF-8 序列首字节，我们假设它是文本
        // 这里简化处理，不做完整的 UTF-8 校验，主要依靠下面的 TextDecoder 抛错
        printableCount++; 
      }
    }
    
    // 阈值：如果 90% 以上是可打印字符，我们倾向于是 String
    return (printableCount / data.length) > 0.9;
  }

  /**
   * 检查 Buffer 是否符合 Packed Varint 的结构规则
   * 规则：必须能被完整解析，不能有剩余字节，且 Varint 格式合法
   */
  private isValidPackedVarint(data: Uint8Array): boolean {
    if (data.length === 0) return false;
    let pos = 0;
    while (pos < data.length) {
      const startPos = pos;
      let shift = 0;
      let b = 0;
      // 模拟读取 Varint，不实际存储值，只看结构
      while (true) {
        if (pos >= data.length) return false; // Varint 被截断，非完整流
        b = data[pos++];
        if (!(b & 0x80)) break; // MSB 为 0，该数结束
        shift += 7;
        if (shift > 70) return false; // Varint 太长，显然是非法的
      }
    }
    return pos === data.length; // 必须精确读取完所有字节
  }
}

// CLI entry point (optional, similar to Python script)
if (import.meta.main || (typeof process !== "undefined" && process.argv[1]?.endsWith("decode_raw.ts"))) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: ts-node decode_raw.ts <FILE_PATH>");
    process.exit(1);
  }

  const data = readFileSync(filePath);
  // Mimic the Python logic of skipping Gia header if needed (can be customized)
  const rawData = new Uint8Array(data);
  const parser = new ProtobufParser(true);
  const { result } = parser.parseMessage(rawData.slice(20, -4));
  console.log(JSON.stringify(result, (key, value) => typeof value === "bigint" ? value.toString() : value, 2));

}
