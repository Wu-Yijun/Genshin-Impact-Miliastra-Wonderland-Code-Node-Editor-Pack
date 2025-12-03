import { type_equal, type NodeType } from "../../utils/gia_gen/nodes.ts";
import type { IR_NodeVarValue, NodeVarValue } from "./types.ts";

export function defaultValue(type: NodeType): NodeVarValue {
  switch (type.t) {
    case "b":
      switch (type.b) {
        case "Int":
          return 0n;
        case "Flt":
          return 0;
        case "Bol":
          return false;
        case "Str":
          return "";
        case "Vec":
          return [0, 0, 0];
        case "Gid":
        case "Ety":
        case "Pfb":
        case "Fct":
        case "Cfg":
          return 0;
      }
    case "e":
      return 0;
    case "l":
    case "d":
      return [];
    case "s": {
      const ret: NodeVarValue[] = [];
      for (const [k, v] of type.f) {
        ret.push([k, defaultValue(v)]);
      }
      return ret;
    }
    case "r":
      return 0;
  }
  throw new Error("Invalid type! " + JSON.stringify(type));
}

/** 检查类型并填入默认值 */
export function defaultTypeValue(type: NodeType, value: IR_NodeVarValue | undefined): NodeVarValue {
  if (value === undefined) return defaultValue(type);
  switch (type.t) {
    case "b":
      switch (type.b) {
        case "Int":
        case "Flt":
          if (typeof value !== "number" && typeof value !== "bigint") throw new Error("Invalid value! " + JSON.stringify(value));
          return type.b === "Flt" ? Number(value) : BigInt(value);
        case "Bol":
          if (typeof value !== "boolean") throw new Error("Invalid value! " + JSON.stringify(value));
          return value;
        case "Str":
          if (typeof value !== "string") throw new Error("Invalid value! " + JSON.stringify(value));
          return value;
        case "Vec":
          if (!Array.isArray(value)) throw new Error("Invalid value! " + JSON.stringify(value));
          const vec = [0, 0, 0];
          if (value[0] !== undefined && typeof value[0] !== "number" && typeof value[0] !== "bigint") throw new Error("Invalid value! " + JSON.stringify(value));
          if (value[1] !== undefined && typeof value[1] !== "number" && typeof value[1] !== "bigint") throw new Error("Invalid value! " + JSON.stringify(value));
          if (value[2] !== undefined && typeof value[2] !== "number" && typeof value[2] !== "bigint") throw new Error("Invalid value! " + JSON.stringify(value));
          vec[0] = Number(value[0]);
          vec[1] = Number(value[1]);
          vec[2] = Number(value[2]);
          return vec;
        case "Gid":
        case "Ety":
        case "Pfb":
        case "Fct":
        case "Cfg":
          if (typeof value !== "number" && typeof value !== "bigint") throw new Error("Invalid value! " + JSON.stringify(value));
          return Number(value);
        default:
          throw new Error("Invalid type! " + JSON.stringify(type));
      }
    case "e":
      if (typeof value !== "number" || typeof value !== "undefined") throw new Error("Invalid value! " + JSON.stringify(value));
      return value;
    case "l":
      if (!Array.isArray(value)) throw new Error("Invalid value! " + JSON.stringify(value));
      const arr: NodeVarValue[] = [];
      for (let i = 0; i < value.length; i++) {
        const v = value[i]
        if (typeof v === "object" && !Array.isArray(v)) throw new Error("Invalid value! " + JSON.stringify(value));
        arr.push(defaultTypeValue(type.i, v));
      }
      return arr;
    case "d":
      if (!Array.isArray(value)) throw new Error("Invalid value! " + JSON.stringify(value));
      const obj: [NodeVarValue, NodeVarValue][] = [];
      for (let i = 0; i < value.length; i++) {
        const kv = value[i];
        if (kv === undefined) {
          obj.push([defaultValue(type.k), defaultValue(type.v)]);
        } else if (Array.isArray(kv)) {
          obj.push([defaultTypeValue(type.k, kv[0]), defaultTypeValue(type.v, kv[1])]);
        } else if (typeof kv === "object") {
          obj.push([defaultTypeValue(type.k, kv["key"]), defaultTypeValue(type.v, kv["value"])]);
        } else {
          throw new Error("Invalid value! " + JSON.stringify(value));
        }
      }
      return obj;
    case "s": {
      if (!Array.isArray(value)) throw new Error("Invalid value! " + JSON.stringify(value));
      if (value.length === 0) {
        return defaultValue(type);
      }
      if (value.length !== type.f.length) throw new Error("Invalid struct length! " + JSON.stringify(value));
      const v0 = value[0];
      if (Array.isArray(v0)) { // [key, value][]
        if (!value.every(x => Array.isArray(x) && x.length === 2)) throw new Error("Invalid value! " + JSON.stringify(value));
        return type.f.map(([k, t]) => defaultTypeValue(t, (value as any[]).find(x => x[0] === k)[1]))
      } else if (typeof v0 === "object") { // {key: f, value}
        if (!value.every(x => typeof x === "object" && "key" in x && "value" in x)) throw new Error("Invalid value! " + JSON.stringify(value));
        return type.f.map(([k, t]) => defaultTypeValue(t, (value as any[]).find(x => x["key"] === k)["value"]))
      } else {  // value[]
        if (!value.every(x => typeof x !== "object")) throw new Error("Invalid value! " + JSON.stringify(value));
        return type.f.map(([k, t], i) => defaultTypeValue(t, value[i]));
      }
    }
    case "r":
      throw new Error("Invalid type! " + JSON.stringify(type));
  }
  throw new Error("Invalid type! " + JSON.stringify(type));
}

export function possibleType(value: IR_NodeVarValue): NodeType {
  switch (typeof value) {
    case "string":
      return { t: "b", b: "Str" };
    case "number":
      return { t: "b", b: "Flt" };
    case "bigint":
      return { t: "b", b: "Int" };
    case "boolean":
      return { t: "b", b: "Bol" };
  }
  if (value instanceof Array) {
    if (value.length === 0) throw new Error("Invalid value! " + JSON.stringify(value));
    const v0 = value[0];
    if (typeof v0 === "object" && "key" in v0 && "value" in v0) {
      // dict
      if (!value.every(x => typeof x === "object" && "key" in x && "value" in x)) {
        throw new Error("Invalid value! " + JSON.stringify(value));
      }
      const keys = (value as any[]).map(x => possibleType(x["key"]));
      const values = (value as any[]).map(x => possibleType(x["value"]));
      if (!keys.every(x => type_equal(x, keys[0])) || !values.every(x => type_equal(x, values[0]))) {
        throw new Error("Invalid value! " + JSON.stringify(value));
      }
      return { t: "d", k: keys[0], v: values[0] };
    } else {
      // array
      const values = (value as any[]).map(x => possibleType(x));
      if (!values.every(x => type_equal(x, values[0]))) {
        throw new Error("Invalid value! " + JSON.stringify(value));
      }
      return { t: "l", i: values[0] };
    }
  }
  throw new Error("Invalid value! " + JSON.stringify(value));
}

export class NodeVar {
  type: NodeType;
  value: NodeVarValue;
  constructor(type: NodeType, val: NodeVarValue) {
    this.type = type;
    this.value = val;
  }
  static from(type?: NodeType | null, val?: IR_NodeVarValue | null): NodeVar {
    if (type === undefined || type === null) {
      if (val === undefined || val === null) {
        throw new Error("Invalid value! ");
      }
      return NodeVar.from_value(val);
    }
    if (val === undefined || val === null) {
      return NodeVar.from_type(type);
    }
    return NodeVar.from_type_value(type, val);
  }
  static from_type(type: NodeType): NodeVar {
    return new NodeVar(type, defaultValue(type));
  }
  static from_value(val: IR_NodeVarValue): NodeVar {
    return NodeVar.from_type_value(possibleType(val), val);
  }
  /** 创建前检查一致性并填入默认值 */
  static from_type_value(type: NodeType, val: IR_NodeVarValue): NodeVar {
    const v = defaultTypeValue(type, val);
    return new NodeVar(type, v);
  }

}