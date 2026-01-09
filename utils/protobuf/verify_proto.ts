import { type ParsedResult } from './decode_raw.ts';
import { TypeLayers, type VarDef } from './proto2ts.ts';

export type ErrorType = | 'MISSING_FIELD' | 'EXTRA_FIELD' | 'TYPE_MISMATCH' |
  'REPEATED_MISMATCH' | 'INVALID_ENUM';

export interface ValidationError {
  type: ErrorType;
  path: string;  // e.g. "root.field1.subfield2"
  fieldIndex: number;
  content: any;    // The actual value or description of the error
  expected?: any;  // The expected type or value
}

const SystemTypeMap: Record<string, string> = {
  'int32': 'number',
  'int64': 'bigint',
  'uint32': 'number',
  'uint64': 'bigint',
  'sint32': 'number',
  'sint64': 'bigint',
  'fixed32': 'number',
  'fixed64': 'bigint',
  'sfixed32': 'number',
  'sfixed64': 'bigint',
  'bool': 'boolean',
  'string': 'string',
  'bytes': 'Uint8Array',
  'float': 'number',
  'double': 'number',
};

// 允许 Packed 编码的类型集合
const PackedAllowedTypes = new Set([
  'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32',
  'fixed64', 'sfixed32', 'sfixed64', 'float', 'double', 'bool'
  // enum is handled separately but follows int32 varint rules usually
]);

/**
 * Verifying parsed protobuf data against proto definitions.
 * Returns an object containing validation errors and the reconstructed data
 * structure (with field names).
 */
export function verifyProto(
  data: ParsedResult,
  layer: TypeLayers,
  {
    path = 'root',
    replaceEnum = false
  }: { path?: string, replaceEnum?: boolean } = {}
): { errors: ValidationError[], result: any } {
  const errors: ValidationError[] = [];
  const result: any = {};

  // 1. Check missing fields
  for (const [index, varDef] of layer.vars.entries()) {
    if (!varDef.optional && !varDef.repeated) {
      if (!data[index] || data[index].length === 0) {
        errors.push({
          type: 'MISSING_FIELD',
          path: `${path}.${varDef.name}`,
          fieldIndex: index,
          content: `Field ${varDef.name} (#${index}) is missing`,
        });
      }
    }
  }

  // 2. Process data fields
  for (const fieldKey in data) {
    const fieldIndex = parseInt(fieldKey);
    let values = data[fieldIndex];
    const varDef = layer.vars.get(fieldIndex);

    // 2a. Unknown field check
    if (!varDef) {
      const fieldName = `field_${fieldIndex}`;
      errors.push({
        type: 'EXTRA_FIELD',
        path: `${path}.${fieldName}`,
        fieldIndex: fieldIndex,
        content: `Unknown field index ${fieldIndex}`,
        expected: values,
      });
      result[fieldName] = values.length === 1 ? values[0] : values;
      continue;
    }

    const currentPath = `${path}.${varDef.name}`;
    const fieldName = varDef.name;
    const typeName = varDef.class[varDef.class.length - 1];

    // --- AUTO-CORRECTION LOGIC START ---
    // 检查是否存在 WireType 2 的原始数据，并尝试针对 Packed 字段进行矫正
    const rawBuffer = (values as any)['_wire_type_2'] as Uint8Array | undefined;

    if (rawBuffer && varDef.repeated) {
      const isPackedScalar = PackedAllowedTypes.has(typeName);
      const isEnum = !SystemTypeMap[typeName] && !layer.message.has(typeName) &&
        !layer.parent?.message.has(typeName);  // 简单判断 Enum

      // 如果是数值标量或者是 Enum，我们必须尝试以 Packed 格式重新解析
      if (isPackedScalar || isEnum) {
        try {
          // 只有当解析器原本推断的类型看起来不对（例如是 String 或
          // Bytes），或者我们要强制确保正确性时 这里我们选择：只要有 rawBuffer
          // 且是 packed 类型，就强制重新解析，这是最安全的
          const correctedValues = reparsePackedField(rawBuffer, typeName);
          values = correctedValues;  // 替换原来的值
        } catch (e) {
          errors.push({
            type: 'TYPE_MISMATCH',
            path: currentPath,
            fieldIndex,
            content: `Failed to decode packed data for ${typeName}: ${(e as Error).message}`,
            expected: 'Packed ' + typeName
          });
        }
      }
    }
    // --- AUTO-CORRECTION LOGIC END ---

    // 2b. Repeated logic check
    if (!varDef.repeated && values.length > 1) {
      errors.push({
        type: 'REPEATED_MISMATCH',
        path: currentPath,
        fieldIndex: fieldIndex,
        content: `Field is not repeated but found ${values.length} occurrences`,
      });
    }

    // 2c. Type check and assign
    const reconstructedValues: any[] = [];
    for (const value of values) {
      const { errors: typeErrors, value: processedValue } =
        checkType(value, varDef, layer, currentPath, replaceEnum);
      errors.push(...typeErrors);
      reconstructedValues.push(processedValue);
    }

    if (varDef.repeated) {
      result[fieldName] = reconstructedValues;
    } else {
      result[fieldName] = reconstructedValues.length === 1 ?
        reconstructedValues[0] :
        reconstructedValues;
    }
  }

  return { errors, result };
}

// ... checkType 函数保持大部分不变，但在 Message 判断部分需要加强 ...
function checkType(
  value: any,
  varDef: VarDef,
  currentLayer: TypeLayers,
  path: string,
  replaceEnum: boolean
): { errors: ValidationError[], value: any } {
  const errors: ValidationError[] = [];
  const fieldIndex = varDef.index;
  const typeName = varDef.class[varDef.class.length - 1];

  // System Types (Handle basic types)
  if (SystemTypeMap[typeName]) {
    // ... (保持原有的 checkType 逻辑) ...
    const expectedType = SystemTypeMap[typeName];
    const actualType =
      value instanceof Uint8Array ? 'Uint8Array' : typeof value;

    if (expectedType === 'number' &&
      (actualType === 'number' || actualType === 'bigint'))
      return { errors, value: Number(value) };
    if (expectedType === 'bigint' &&
      (actualType === 'number' || actualType === 'bigint'))
      return { errors, value: BigInt(value) };
    if (actualType !== expectedType) {
      errors.push({
        type: 'TYPE_MISMATCH',
        path,
        fieldIndex,
        content: `Expected '${expectedType}', got '${actualType}'`,
        expected: value
      });
      return { errors, value };
    }
    return { errors, value };
  }

  // Find Type Definition (Message or Enum)
  let typeLayer: TypeLayers | undefined = undefined;
  let search: TypeLayers | null = currentLayer;
  // ... (查找定义的逻辑保持不变) ...
  while (search) {
    let found = true;
    let current: TypeLayers = search;
    for (const p of varDef.class) {
      const next = current.message.get(p);
      if (next) {
        current = next;
      } else {
        found = false;
        break;
      }
    }
    if (found) {
      typeLayer = current;
      break;
    }
    search = search.parent;
  }

  // Enum Handling
  if (!typeLayer) {
    // Check Enums in parent scope usually
    const enumValues = currentLayer.parent?.enums.get(typeName) ||
      currentLayer.enums.get(typeName);  // 简化查找
    if (enumValues) {
      const val = Number(value);
      if (isNaN(val)) {
        // 如果原本被解析成了 string 且不是数字，这绝对是个错误 (除非是 packed
        // 矫正失败)
        errors.push({
          type: 'TYPE_MISMATCH',
          path,
          fieldIndex,
          content: `Expected Enum(number) but got ${typeof value}`
        });
        return { errors, value };
      }
      const isValid = enumValues.find(([_, v]) => v === val);
      if (!isValid) {
        errors.push({
          type: 'INVALID_ENUM',
          path,
          fieldIndex,
          content: `Invalid enum value ${val}`,
          expected: enumValues
        });
        return { errors, value };
      }
      return { errors, value: replaceEnum ? isValid[0] : val };
    }
    errors.push({
      type: 'TYPE_MISMATCH',
      path,
      fieldIndex,
      content: `Definition for ${typeName} not found`
    });
    return { errors, value };
  }

  // Message Handling
  // 关键：如果类型是 Message，但值是 Uint8Array 或 string，说明 Parser
  // 没能识别出这是个 Message Parser 只有在认为是 WireType 2 (Length Delimited)
  // 且成功递归解析时才会返回 Object
  if (typeof value === 'object' && value !== null &&
    !(value instanceof Uint8Array)) {
    const { errors: subErrors, result: subResult } =
      verifyProto(value as ParsedResult, typeLayer, { path, replaceEnum });
    errors.push(...subErrors);
    return { errors, value: subResult };
  } else {
    // 这是一个 Message 类型，但我们得到了非 Message 数据
    errors.push({
      type: 'TYPE_MISMATCH',
      path: path,
      fieldIndex: fieldIndex,
      content: `Expected Message structure for '${typeLayer.name}', but got '${typeof value}' (likely parsing failed or data corrupted)`,
      expected: 'Message Object'
    });
    return { errors, value };
  }
}

// --- 重新解析逻辑 (Reparsing Logic) ---

function reparsePackedField(buffer: Uint8Array, typeName: string): any[] {
  const result: any[] = [];
  let pos = 0;
  const view =
    new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  // Helper: Read Varint
  const readVarint = (): bigint => {
    let value = 0n;
    let shift = 0n;
    while (true) {
      if (pos >= buffer.length) throw new Error('EOF in Varint');
      const b = buffer[pos++];
      value |= BigInt(b & 0x7f) << shift;
      if (!(b & 0x80)) break;
      shift += 7n;
    }
    return value;
  };

  while (pos < buffer.length) {
    let val: any;
    switch (typeName) {
      case 'double':
        val = view.getFloat64(pos, true);
        pos += 8;
        break;
      case 'float':
        val = view.getFloat32(pos, true);
        pos += 4;
        break;
      case 'int64':
      case 'uint64':
        val = readVarint();  // Unsigned varint for uint64, signed for int64 (in
        // complement)
        if (typeName === 'int64') {
          // BigInt 在 JS 中处理补码需要注意，但通常 Varint
          // 读出来直接就是正确的位 Proto buffer varint int64 is stored as two's
          // complement 64-bit
          const temp64 = BigInt.asIntN(64, val);
          val = temp64;
        }
        break;
      case 'int32':
      case 'uint32':
      case 'bool':
      case 'enum':  // Enum 也是 Varint
        val = Number(readVarint());
        if (typeName === 'int32') val = val | 0;  // Force 32-bit signed
        if (typeName === 'bool') val = val !== 0;
        break;
      case 'sint32':
        const zz32 = Number(readVarint());
        val = (zz32 >>> 1) ^ -(zz32 & 1);  // ZigZag decode
        break;
      case 'sint64':
        const zz64 = readVarint();
        val = (zz64 >> 1n) ^ -(zz64 & 1n);  // ZigZag decode BigInt
        break;
      case 'fixed64':
      case 'sfixed64':
        val = view.getBigUint64(pos, true);
        pos += 8;
        if (typeName === 'sfixed64') val = BigInt.asIntN(64, val);
        break;
      case 'fixed32':
      case 'sfixed32':
        val = view.getUint32(pos, true);
        pos += 4;
        if (typeName === 'sfixed32') val = val | 0;
        break;
      default:
        // 如果进入这里，说明 PackedAllowedTypes 配置有误或逻辑漏洞
        throw new Error(`Type ${typeName} is not supported for packed parsing`);
    }
    result.push(val);
  }
  return result;
}