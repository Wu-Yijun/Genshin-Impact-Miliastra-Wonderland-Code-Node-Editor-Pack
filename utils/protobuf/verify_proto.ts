import { type ParsedResult } from "./decode_raw.ts";
import { TypeLayers, type VarDef } from "./proto2ts.ts";

export type ErrorType =
  | "MISSING_FIELD"
  | "EXTRA_FIELD"
  | "TYPE_MISMATCH"
  | "REPEATED_MISMATCH"
  | "INVALID_ENUM";

export interface ValidationError {
  type: ErrorType;
  path: string; // e.g. "root.field1.subfield2"
  fieldIndex: number;
  content: any; // The actual value or description of the error
  expected?: any; // The expected type or value
}

const SystemTypeMap: Record<string, string> = {
  "int32": "number",
  "int64": "bigint",
  "uint32": "number",
  "uint64": "bigint",
  "sint32": "number",
  "sint64": "bigint",
  "fixed32": "number",
  "fixed64": "bigint",
  "sfixed32": "number",
  "sfixed64": "bigint",
  "bool": "boolean",
  "string": "string",
  "bytes": "Uint8Array",
  "float": "number",
  "double": "number",
};

/**
 * Verifying parsed protobuf data against proto definitions.
 * Returns an object containing validation errors and the reconstructed data structure (with field names).
 */
export function verifyProto(
  data: ParsedResult,
  layer: TypeLayers,
  { path = "root", replaceEnum = false }: { path?: string, replaceEnum?: boolean } = {}
): { errors: ValidationError[], result: any } {
  const errors: ValidationError[] = [];
  const result: any = {};

  // 1. Check for missing required fields (not optional)
  for (const [index, varDef] of layer.vars.entries()) {
    if (!varDef.optional && !varDef.repeated) {
      if (!data[index] || data[index].length === 0) {
        errors.push({
          type: "MISSING_FIELD",
          path: `${path}.${varDef.name}`,
          fieldIndex: index,
          content: `Field ${varDef.name} (#${index}) is missing`,
        });
      }
    }
  }

  // 2. Check each field in the parsed data
  for (const fieldKey in data) {
    const fieldIndex = parseInt(fieldKey);
    const values = data[fieldIndex];
    const varDef = layer.vars.get(fieldIndex);

    // 2a. Extra field check
    if (!varDef) {
      const fieldName = `field_${fieldIndex}`;
      errors.push({
        type: "EXTRA_FIELD",
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

    // 2b. Repeated field check
    if (!varDef.repeated && values.length > 1) {
      errors.push({
        type: "REPEATED_MISMATCH",
        path: currentPath,
        fieldIndex: fieldIndex,
        content: `Field is not repeated but found ${values.length} occurrences`,
      });
    }

    // 2c. Type check for each value and reconstruct
    const reconstructedValues: any[] = [];
    for (const value of values) {
      const { errors: typeErrors, value: processedValue } = checkType(value, varDef, layer, currentPath, replaceEnum);
      errors.push(...typeErrors);
      reconstructedValues.push(processedValue);
    }

    // Assign to result
    if (varDef.repeated) {
      result[fieldName] = reconstructedValues;
    } else {
      // If not repeated but has multiple values, we still take the last one or all? 
      // Usually, the last one wins in protobuf if not repeated. 
      // But here we might want to see the "wrong" ones too if there's a REPEATED_MISMATCH.
      // However, for "reconstructed structure", we focus on the mapping.
      result[fieldName] = reconstructedValues.length === 1 ? reconstructedValues[0] : reconstructedValues;
    }
  }

  return { errors, result };
}

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

  // System Types
  if (SystemTypeMap[typeName]) {
    const expectedType = SystemTypeMap[typeName];
    const actualType = value instanceof Uint8Array ? "Uint8Array" : typeof value;

    if (expectedType === "number" && (actualType === "number" || actualType === "bigint")) {
      return { errors, value: Number(value) };
    }

    if (expectedType === "bigint" && (actualType === "number" || actualType === "bigint")) {
      return { errors, value: BigInt(value) };
    }

    if (actualType !== expectedType) {
      errors.push({
        type: "TYPE_MISMATCH",
        path: path,
        fieldIndex: fieldIndex,
        content: `Expected '${expectedType}', got '${actualType}'`,
        expected: value,
      });
      // Keep original format on error
      return { errors, value };
    }
    return { errors, value };
  }

  // Message or Enum
  let typeLayer: TypeLayers | undefined = undefined;

  let search: TypeLayers | null = currentLayer;
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

  if (!typeLayer) {
    errors.push({
      type: "TYPE_MISMATCH",
      path: path,
      fieldIndex: fieldIndex,
      content: `Definition for ${varDef.class.join(".")} not found`,
    });
    return { errors, value };
  }

  // If it's an enum
  const enumValues = typeLayer.parent?.enums.get(typeLayer.name);
  if (enumValues) {
    const val = Number(value);
    const isValid = enumValues.find(([_, v]) => v === val);
    if (isValid === undefined) {
      errors.push({
        type: "INVALID_ENUM",
        path: path,
        fieldIndex: fieldIndex,
        content: `Value ${val} is not a valid enum value for ${typeLayer.name}`,
        expected: enumValues.map(e => `${e[0]}=${e[1]}`).join(", "),
      });
      // Keep original
      return { errors, value };
    }
    return { errors, value: replaceEnum ? isValid[0] : val };
  }

  // If it's a message
  if (typeof value === "object" && value !== null && !(value instanceof Uint8Array)) {
    const { errors: subErrors, result: subResult } = verifyProto(value as ParsedResult, typeLayer, { path, replaceEnum });
    errors.push(...subErrors);
    return { errors, value: subResult };
  } else {
    errors.push({
      type: "TYPE_MISMATCH",
      path: path,
      fieldIndex: fieldIndex,
      content: `Expected message ${typeLayer.name}, but got ${typeof value}`,
    });
    return { errors, value };
  }
}
