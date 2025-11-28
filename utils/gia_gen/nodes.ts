import assert from "node:assert";
import { VarType } from "../protobuf/gia.proto.ts";
import { DEBUG, STRICT } from "./utils.ts";

export const BasicTypes = [
  "Int",
  "Flt",
  "Bol",
  "Str",
  "Vec",
  "Gid",
  "Ety",
  "Pfb",
  "Fct",
  "Cfg",
] as const;
export type BasicTypes = typeof BasicTypes[number];

type EnumId = number;
export type NodeType = {
  /** Type = Basic Types */
  t: "b";
  /** Basic Types */
  b: BasicTypes;
} | {
  /** Type = Basic Enums */
  t: "e";
  /** Enum Id */
  e: EnumId;
} | {
  /** Type = List */
  t: "l";
  /** item = NodeType*/
  i: NodeType;
} | {
  /** Type = Struct, or reflect src map */
  t: "s";
  /** fields = [name, NodeType][] */
  f: [string, NodeType][];
} | {
  /** Type = Dict */
  t: "d";
  /** Key = NodeType */
  k: NodeType;
  /** Value = NodeType */
  v: NodeType;
} | {
  /** Type = Reflect */
  t: "r";
  /** Reflect Name = string */
  r: string;
};

type NodeId = number;

/**
 * 将 NodeType（或字符串形式的类型表达式）转为可读字符串。
 * 用于序列化类型结构，例如：S<a:Int,b:L<Str>>
 */
export function stringify(node: NodeType | string): string {
  if (typeof node === "string") return node;
  switch (node.t) {
    case "b":
      return node.b;
    case "e":
      return `E<${node.e}>`;
    case "l":
      return `L<${stringify(node.i)}>`;
    case "s":
      const f = node.f.map(([name, t]) => (`${name}:${stringify(t)}`));
      return `S<${f.join(",")}>`;
    case "d":
      return `D<${stringify(node.k)},${stringify(node.v)}>`;
    case "r":
      return `R<${node.r}>`;
  }
}
/**
 * 将字符串形式的类型表达式解析为 NodeType。
 * 支持 L<>, D<,>, S< : >, R<>, E<> 等表达式。
 * 会在语法非法时抛出异常。
 */
export function parse(src: string): NodeType {
  if (src === undefined) return undefined as any;
  let p = 0;
  const tokens = src.split(/([ ]+|\<|\,|\:|\>)/g).filter((x) =>
    x.trim().length > 0
  );
  // Throw Error for Invalid name
  const not_illegal_name = (str: string) => {
    assert(!BasicTypes.includes(str as BasicTypes), `System Type: "${str}"`);
    assert(/^[a-zA-Z][a-zA-Z0-9_]*$/s.test(str), `Invalid name: "${str}"`);
  };
  const parseTokens = (tokens: string[]): NodeType => {
    switch (tokens[p++]) {
      case "L":
        assert.equal(tokens[p++], "<");
        const item = parseTokens(tokens);
        assert.equal(tokens[p++], ">");
        return { t: "l", i: item };
      case "D":
        assert.equal(tokens[p++], "<");
        const key = parseTokens(tokens);
        assert.equal(tokens[p++], ",");
        const value = parseTokens(tokens);
        assert.equal(tokens[p++], ">");
        return { t: "d", k: key, v: value };
      case "R":
        assert.equal(tokens[p++], "<");
        const name = tokens[p++];
        not_illegal_name(name);
        assert.equal(tokens[p++], ">");
        return { t: "r", r: name };
      case "E":
        assert.equal(tokens[p++], "<");
        const eid = tokens[p++];
        assert.equal(parseInt(eid).toString(), eid);
        assert.equal(tokens[p++], ">");
        return { t: "e", e: parseInt(eid) };
      case "S":
        assert.equal(tokens[p++], "<");
        const fields: [string, NodeType][] = [];
        while (tokens[p] !== ">") {
          assert(tokens[p - 1] === "<" || tokens[p++] === ",");
          const field = tokens[p++];
          not_illegal_name(field);
          assert.equal(tokens[p++], ":");
          const type = parseTokens(tokens);
          fields.push([field, type]);
        }
        assert.equal(tokens[p++], ">");
        return { t: "s", f: fields };
      default:
        assert(
          BasicTypes.includes(tokens[p - 1] as BasicTypes),
          `Invalid Basic Type: "${tokens[p - 1]}"`,
        );
        return { t: "b", b: tokens[p - 1] as BasicTypes };
    }
  };
  const ret = parseTokens(tokens);
  assert.equal(
    p,
    tokens.length,
    `Extra Tokens after end of expression('${tokens[p]}'): "${tokens.slice(p + 1).join("")
    }" `,
  );
  return ret;

  // Deprecated
  function parseString(
    src: string,
    position = 0,
  ): { node: NodeType; len: number } {
    const s = src.slice(position, position + 2);
    switch (s) {
      case "L<": {
        const { node, len } = parseString(src, position + 2);
        assert(
          src[position + 2 + len] === ">",
          `Cannot find ">" After List: ${src.slice(position, position + 2 + len + 1)
          }!`,
        );
        return { node: { t: "l", i: node }, len: 2 + len + 1 };
      }
      case "D<": {
        const { node, len } = parseString(src, position + 2);
        // console.log(node, len);
        assert(
          src[position + 2 + len] === ",",
          `Cannot find "," Inside Dict: ${src.slice(position, position + 2 + len + 1)
          }!`,
        );
        const { node: value, len: valueLen } = parseString(
          src,
          position + 2 + len + 1,
        );
        assert(
          src[position + 2 + len + valueLen + 1] === ">",
          `Cannot find ">" After Dict: ${src.slice(position, position + 2 + len + valueLen + 1)
          }!`,
        );
        return {
          node: { t: "d", k: node, v: value },
          len: 2 + len + 1 + valueLen + 1,
        };
      }
      case "R<": {
        const name = src.indexOf(">", position + 2);
        assert(
          name !== -1,
          `Cannot find ">" After Reflect: ${src.slice(position, position + 10)
          }!`,
        );
        return {
          node: { t: "r", r: src.slice(position + 2, name) },
          len: name + 1 - position,
        };
      }
      case "S<": {
        const fields: [string, NodeType][] = [];
        let pos = position + 2;
        while (pos < src.length) {
          const p = src.indexOf(":", pos);
          assert(
            p !== -1,
            `Cannot find ":" Inside Struct: ${src.slice(pos, pos + 10)}!`,
          );
          const name = src.slice(pos, p);
          const { node, len } = parseString(src, p + 1);
          fields.push([name, node]);
          pos = p + 1 + len;
          if (src[pos] === ">") break;
          assert(
            src[pos] === ",",
            `Cannot find "," Inside Struct: ${src.slice(p, pos)}!`,
          );
          pos++;
        }
        assert(
          src[pos] === ">",
          `"Cannot find ">" After Struct ${src.slice(position, pos)}!`,
        );
        return { node: { t: "s", f: fields }, len: pos + 1 - position };
      }
      default: {
        let pos = position;
        while (
          pos < src.length && src[pos] !== ">" && src[pos] !== "," &&
          src[pos] !== ":"
        ) pos++;
        const name = src.slice(position, pos) as BasicTypes;
        assert(BasicTypes.includes(name), `"${name}" is not a Basic Type!`);
        return { node: { t: "b", b: name }, len: pos - position };
      }
    }
  }
}

export type NodeReflectRecords = [node_id: NodeId, reflect: string];
``;
export interface NodePinsRecords {
  inputs: string[];
  outputs: string[];
  id: NodeId;
  /** Determines whether it is a basic node,
   * or a generic node with extensive ids.
   *
   * A map of NodeType[Struct]->NodeId */
  reflectMap?: NodeReflectRecords[];
}
/** ⚠️ Using of `NodePinsRecordsFull` is not suggested.
 *
 * Please use `NodePinsRecords` instead
 */
export type NodeReflectRecordsFull = [node_id: NodeId, reflect: NodeType];
/** ⚠️ Using of `NodePinsRecordsFull` is not suggested.
 *
 * Please use `NodePinsRecords` instead
 */
export interface NodePinsRecordsFull {
  inputs: NodeType[];
  outputs: NodeType[];
  id: NodeId;
  /** Determines whether it is a basic node,
   * or a generic node with extensive ids.
   *
   * A map of NodeType[Struct]->NodeId */
  reflectMap?: NodeReflectRecordsFull[];
}

export interface NodePins {
  inputs: NodeType[];
  outputs: NodeType[];
  id: NodeId;
}

/**
 * 在给定类型中执行一次单一反射替换。
 * 若遇到 R<refName>，则替换为对应节点结构。
 * 其他节点类型将递归替换。
 */
export function reflect(type: NodeType, ref: [string, NodeType]): NodeType {
  switch (type.t) {
    case "r":
      return type.r === ref[0] ? structuredClone(ref[1]) : type;
    case "b":
      return type;
    case "e":
      return type;
    case "l":
      return { t: "l", i: reflect(type.i, ref) };
    case "d":
      return { t: "d", k: reflect(type.k, ref), v: reflect(type.v, ref) };
    case "s":
      return {
        t: "s",
        f: type.f.map(([name, node]) => [name, reflect(node, ref)]),
      };
  }
}
/**
 * 对类型执行一次或多次 reflect() 替换。
 * type 与 refs 允许为字符串（自动 parse）。
 * allow_undefined=true 时允许输入 undefined。
 */
export function reflects(
  type: NodeType | string,
  refs: [string, NodeType][] | string,
  allow_undefined = false,
): NodeType {
  // console.log(type, refs);
  if (type === undefined && allow_undefined === true) return undefined as any;
  const t = typeof type === "string" ? parse(type) : type;
  const r = typeof refs === "string"
    ? ((x) => (assert(x.t === "s"), x.f))(parse(refs))
    : refs;
  return r.reduce((type, ref) => reflect(type, ref), t);
}
/**
 * 对 NodePinsRecords 执行 reflect 替换并返回展开后的 NodePins。
 * 若记录无 reflectMap，则直接 parse 基础类型。
 * 若有 reflectMap，则根据 refs 选择正确的特化 NodeId。
 */
export function reflects_records(
  rec: NodePinsRecords,
  refs?: [string, NodeType][] | string,
  allow_undefined = false,
): NodePins {
  // find id
  if (rec.reflectMap === undefined) {
    assert(refs === undefined);
    return rec_to_full(rec);
  }
  assert(refs !== undefined);
  const refs_str = typeof refs === "string"
    ? refs
    : stringify({ t: "s", f: refs });
  const id = rec.reflectMap!.find((r) => r[1] === refs_str)?.[0];
  assert(id !== undefined || allow_undefined);
  // reflect expression
  let refs_exp;
  if (typeof refs === "string") {
    const exp = parse(refs);
    assert(exp.t === "s");
    refs_exp = exp.f;
  } else {
    refs_exp = refs;
  }
  return {
    inputs: rec.inputs.map((node) =>
      reflects(parse(node), refs_exp, allow_undefined)
    ),
    outputs: rec.outputs.map((node) =>
      reflects(parse(node), refs_exp, allow_undefined)
    ),
    id: id ?? rec.id,
  };
}
/**
 * 将包含 reflectMap 的 NodePinsRecords 全部展开，
 * 返回所有实例化后的 NodePins（每个 reflect 对应一个条目）。
 */
export function unwrap_records(rec: NodePinsRecords): NodePins[] {
  if (rec.reflectMap === undefined) {
    return [{
      inputs: rec.inputs.map(parse),
      outputs: rec.outputs.map(parse),
      id: rec.id,
    }];
  }
  const map: [NodeType, NodeId][] = rec.reflectMap.sort((r) => r[0]).map(
    (r) => [parse(r[1]), r[0]],
  );
  const rs = map.map((x) => {
    const n = x[0];
    assert(n.t === "s");
    return n.f;
  });
  const ids = map.map((x) => x[1]);
  return rs.map((r, i) => ({
    inputs: rec.inputs.map((node) => reflects(parse(node), r)),
    outputs: rec.outputs.map((node) => reflects(parse(node), r)),
    id: ids[i],
  }));
}

/**
 * 判断某个 NodeType 是否包含反射节点（R<...>）。
 */
export function is_reflect(type: NodeType): boolean {
  switch (type.t) {
    case "b":
      return false;
    case "e":
      return false;
    case "l":
      return is_reflect(type.i);
    case "d":
      return is_reflect(type.k) || is_reflect(type.v);
    case "s":
      return type.f.some((x) => is_reflect(x[1]));
    case "r":
      return true;
  }
}
/**
 * 获取 NodeType 中出现过的所有 reflect 名字。
 * 例如 R<A>, S<a:R<B>, b:L<R<C>>> => ["A","B","C"]
 */
export function extract_reflect_names(type: NodeType): string[] {
  const set = new Set<string>();
  const core = (t: NodeType) => {
    switch (t.t) {
      case "d":
        core(t.k);
        core(t.v);
        return;
      case "s":
        t.f.forEach((x) => core(x[1]));
        return;
      case "r":
        set.add(t.r);
        return;
      case "l":
        core(t.i);
        return;
    }
  };
  core(type);
  return Array.from(set);
}
/**
 * 将类型中所有 R<name> 的位置映射为实际的字段类型。
 * 相当于根据类型与模板 ref 反向推导反射字段的最终结构。
 */
export function extract_reflect_fields(
  type: NodeType,
  ref: NodeType,
): [string, NodeType][] {
  const fields = new Map<string, NodeType>();
  const core = (r: NodeType, t: NodeType) => {
    if (r.t === "r") {
      const f = fields.get(r.r);
      if (!f) {
        fields.set(r.r, t);
      } else {
        assert(type_equal(f, t));
      }
      return;
    }
    assert.equal(t.t, r.t);
    switch (r.t) {
      case "b":
        assert.equal(r.b, (t as any).b);
        return;
      case "e":
        assert.equal(r.e, (t as any).e);
        return;
      case "l":
        core(r.i, (t as any).i);
        return;
      case "s":
        r.f.forEach(([name, type]) => core(type, (t as any).f[name]));
        return;
      case "d":
        core(r.k, (t as any).k);
        core(r.v, (t as any).v);
        return;
    }
  };
  core(ref, type);
  return [...fields.entries()];
}

/**
 * 判断两个 NodeType 是否结构完全相同。
 * 会严格比较字段顺序、列表嵌套、枚举值等。
 */
export function type_equal(a: NodeType, b: NodeType): boolean {
  if (a.t !== b.t) return false;
  switch (a.t) {
    case "b":
      return a.b === (b as any).b;
    case "e":
      return a.e === (b as any).e;
    case "l":
      return type_equal(a.i, (b as any).i);
    case "d":
      return type_equal(a.k, (b as any).k) && type_equal(a.v, (b as any).v);
    case "s": {
      const bf = (b as any).f as [string, NodeType][];
      if (a.f.length !== bf.length) return false;
      for (let i = 0; i < a.f.length; i++) {
        if (a.f[i][0] !== bf[i][0]) return false;
        if (!type_equal(a.f[i][1], bf[i][1])) return false;
      }
      return true;
    }
    case "r":
      return a.r === (b as any).r;
  }
  throw new Error("Unreachable");
}

/**
 * 将 NodeType 映射为底层 VarType（整型枚举值）。
 *
 * 主要作用：
 * - 用于把逻辑类型系统（b/e/l/s/d/r）映射到 protobuf 层的 VarType。
 * - 若类型结构无法直接映射（如 Struct、Dict、Reflect），抛错。
 *
 * @param node 逻辑类型描述 NodeType
 * @returns 底层序列化使用的 VarType 整数 ID
 */
export function get_id(node: NodeType): number {
  switch (node.t) {
    case "b":
      switch (node.b) {
        case "Int":
          return VarType.Integer;
        case "Flt":
          return VarType.Float;
        case "Bol":
          return VarType.Boolean;
        case "Str":
          return VarType.String;
        case "Vec":
          return VarType.Vector;
        case "Gid":
          return VarType.GUID;
        case "Ety":
          return VarType.Entity;
        case "Pfb":
          return VarType.Prefab;
        case "Fct":
          return VarType.Faction;
        case "Cfg":
          return VarType.Configuration;
      }
      break;
    case "e":
      return VarType.EnumItem;
    case "l":
      switch (node.i.t) {
        case "b":
          switch (node.i.b) {
            case "Int":
              return VarType.IntegerList;
            case "Flt":
              return VarType.FloatList;
            case "Bol":
              return VarType.BooleanList;
            case "Str":
              return VarType.StringList;
            case "Vec":
              return VarType.VectorList;
            case "Gid":
              return VarType.GUIDList;
            case "Ety":
              return VarType.EntityList;
            case "Pfb":
              return VarType.PrefabList;
            case "Fct":
              return VarType.FactionList;
            case "Cfg":
              return VarType.ConfigurationList;
          }
          break;
        case "s":
          return VarType.StringList;
        default:
          break;
      }
      break;
    case "d":
      return VarType.Dictionary;
    case "r":
      break;
    case "s":
      return VarType.Struct;
  }
  if (STRICT) {
    throw new Error(
      stringify(node) + "is not a basic type! Fallback to id = 0 !",
    );
  }
  if (DEBUG) console.warn(node, "is not a basic type! Fallback to id = 0 !");
  return 0;
}
/**
 * 获取运行时用于“类型系统判断”的类型标签。
 *
 * 不同于 get_id（其返回 protobuf 的 VarType），
 * get_type 返回可用于 DSL / 运行时系统的内部标签字符串。
 *
 * 例：
 *   b:Int   -> "Int"
 *   e:Enum  -> "Enum"
 *   l:Int   -> "List"
 *   s:{...} -> "Struct"
 *   r:R<T>  -> "Reflect"
 *
 * 用于运行时调试、序列化、人类可读展示。
 *
 * @param node NodeType
 */
export function get_type(id: number): NodeType {
  switch (id) {
    case VarType.Entity:
      return { t: "b", b: "Ety" };
    case VarType.GUID:
      return { t: "b", b: "Gid" };
    case VarType.Integer:
      return { t: "b", b: "Int" };
    case VarType.Boolean:
      return { t: "b", b: "Bol" };
    case VarType.Float:
      return { t: "b", b: "Flt" };
    case VarType.String:
      return { t: "b", b: "Str" };
    case VarType.GUIDList:
      return { t: "l", i: { t: "b", b: "Gid" } };
    case VarType.IntegerList:
      return { t: "l", i: { t: "b", b: "Int" } };
    case VarType.BooleanList:
      return { t: "l", i: { t: "b", b: "Bol" } };
    case VarType.FloatList:
      return { t: "l", i: { t: "b", b: "Flt" } };
    case VarType.StringList:
      return { t: "l", i: { t: "b", b: "Str" } };
    case VarType.Vector:
      return { t: "b", b: "Vec" };
    case VarType.EntityList:
      return { t: "l", i: { t: "b", b: "Ety" } };
    case VarType.EnumItem:
      return { t: "e", e: 0 };
    case VarType.VectorList:
      return { t: "l", i: { t: "b", b: "Vec" } };
    case VarType.Faction:
      return { t: "b", b: "Fct" };
    case VarType.Configuration:
      return { t: "b", b: "Cfg" };
    case VarType.Prefab:
      return { t: "b", b: "Pfb" };
    case VarType.ConfigurationList:
      return { t: "l", i: { t: "b", b: "Cfg" } };
    case VarType.PrefabList:
      return { t: "l", i: { t: "b", b: "Pfb" } };
    case VarType.FactionList:
      return { t: "l", i: { t: "b", b: "Fct" } };
    case VarType.Struct:
      return { t: "s", f: [] };
    case VarType.StringList:
      return { t: "l", i: { t: "s", f: [] } };
    case VarType.Dictionary:
      return { t: "d", k: { t: "b", b: "Ety" }, v: { t: "b", b: "Ety" } };
  }
  // throw new Error("Invalid ID: " + id);
  // console.error("Invalid ID: " + id);
  return undefined as any;
}

export function rec_to_str(rec: NodePinsRecords): string {
  return [
    rec.id,
    rec.inputs.join("&"),
    rec.outputs.join("&"),
    ...rec.reflectMap?.join("&") ?? [],
  ].join("|");
}
export function full_to_str(rec: NodePinsRecordsFull): string {
  return [
    rec.id,
    rec.inputs.map(stringify).join("&"),
    rec.outputs.map(stringify).join("&"),
    ...rec.reflectMap?.map((x) => [x[0], stringify(x[1])].join("&")) ?? [],
  ].join("|");
}
export function rec_to_full(rec: NodePinsRecords): NodePinsRecordsFull {
  return {
    inputs: rec.inputs.map(parse),
    outputs: rec.outputs.map(parse),
    id: rec.id,
    reflectMap: rec.reflectMap?.map((x) => [x[0], parse(x[1])]),
  };
}
export function full_to_rec(rec: NodePinsRecordsFull): NodePinsRecords {
  return {
    inputs: rec.inputs.map(stringify),
    outputs: rec.outputs.map(stringify),
    id: rec.id,
    reflectMap: rec.reflectMap?.map((x) => [x[0], stringify(x[1])]),
  };
}
export function str_to_full(str: string): NodePinsRecordsFull {
  const [id, i, o, ...maps] = str.split("|");
  const ref: any = maps.map((r) => r.split("&")).map(
    (x) => [parseInt(x[0]), parse(x[1])],
  );
  return {
    inputs: i.split("&").map(parse),
    outputs: o.split("&").map(parse),
    id: parseInt(id),
    reflectMap: ref.length === 0 ? undefined : ref,
  };
}
/** ⚠️ This function will NOT validate node_pin_records.
 *
 * Please use `node_def.to_records(str: string)` instead
 */
export function str_to_rec(str: string): NodePinsRecords {
  const [id, i, o, ...maps] = str.split("|");
  const ref: any = maps.map((r) => r.split("&")).map(
    (x) => [parseInt(x[0]), x[1]],
  );
  return {
    inputs: i.split("&"),
    outputs: o.split("&"),
    id: parseInt(id),
    reflectMap: ref.length === 0 ? undefined : ref,
  };
}

export function to_string(node: NodePinsRecordsFull | NodePinsRecords): string {
  return full_to_str(node as any);
}
/** Will first validate rec and then return a valid NodePinsRecords */
export function to_records(rec: string | NodePinsRecordsFull): NodePinsRecords {
  if (typeof rec === "string") {
    rec = str_to_full(rec);
  }
  rec.reflectMap?.map((x, i) =>
    assert(x[1].t === "s", `reflectMap[${i}] ("${x[1]}") is not Struct Type!`)
  );
  return full_to_rec(rec as any);
}
/** ⚠️ Using of `NodePinsRecordsFull` is not suggested.
 *
 * Please use `NodePinsRecords` instead
 */
export function to_records_full(
  rec: string | NodePinsRecords,
): NodePinsRecordsFull {
  if (typeof rec === "string") {
    return str_to_full(rec);
  }
  return rec_to_full(rec);
}


if (import.meta.main) {
  function check_parse(str: string) {
    const node = parse(str);
    assert.equal(stringify(node), str);
    console.log(str);
    console.dir(node, { depth: null });
    console.log("Check Pass!\n\n\n");
  }
  function test_parse() {
    // Basic
    check_parse("Flt");
    check_parse("L<Int>");
    check_parse("D<Bol,Str>");
    check_parse("S<a:Gid,b:Vec,c:Flt>");
    check_parse("R<X>");

    // Nested
    check_parse("L<S<a:Gid,b:Vec,c:Flt>>");
    check_parse("D<S<a:Gid,b:Vec,c:Flt>,L<S<a:Gid,b:Vec,c:Flt>>>");
    check_parse("S<aaaa:S<a:Gid,b:Vec,c:Flt>,b:L<S<a:Gid,b:Vec,c:Flt>>>");
    check_parse(
      "S<aaaa:S<a:Gid,b:Vec,c:R<X>>,b:L<S<a:Gid,b:Vec,c:Flt>>,c:Flt>",
    );

    // More
    check_parse(
      "D<S<a:Gid,b:Vec,c:Flt>,L<S<a:S<aaaa:S<a:Gid,b:Vec,c:R<X>>,b:L<S<a:R<d>,b:Vec,c:Flt>>,c:Flt>,b:Vec,c:Flt>>>",
    );
  }

  function test_id() {
    for (let i = 1; i <= 27; i++) {
      if ([16, 18, 19].includes(i)) continue;
      const t = get_type(i);
      const n = stringify(t);
      console.log(i, t, n);
      assert.equal(n, stringify(parse(n)));
      assert.equal(i, get_id(parse(n)));
      assert.equal(i, get_id(t));
    }
  }
  const node_def1: NodePinsRecords = {
    inputs: ["D<R<Key>,R<Value>>"],
    outputs: ["L<R<Key>>"],
    id: 1,
    reflectMap: [
      [1, "S<R:Int,Value:Flt>"],
    ],
  };
  const node_def: NodePinsRecords = {
    inputs: ["D<Bol,D<S<k:R<Key>,Value:R<Value>>,R<Value>>>"],
    outputs: ["L<R<Key>>"],
    id: 1,
    reflectMap: [
      [10, "S<Key:Int,Value:Flt>"],
      [2, "S<Key:Bol,Value:Str>"],
      [5, "S<Value:Ety,Key:Str>"],
      [4, "S<Key:D<Str,R<Value>>,Value:Ety>"],
    ],
  };
  function test_ref() {
    // const node = reflects_records(node_def, node_def.reflectMap?.[0][1]);
    const node = unwrap_records(node_def);
    console.dir(node, { depth: null });
    console.dir(
      node.map((x) => [x.inputs.map(get_id), x.outputs.map(get_id)]),
      { depth: null },
    );
    console.dir(
      node.map((x) => [x.inputs.map(stringify), x.outputs.map(stringify)]),
      { depth: null },
    );
  }
  function test_str() {
    const s = to_string(node_def);
    console.log(s);
    console.dir(to_records_full(s), { depth: null });

    const node = unwrap_records(node_def).map(to_records);
    console.dir(node, { depth: null });

    assert.equal(s, to_string(to_records_full(s)));
  }

  function test_enum() {
    const enum_def: NodePinsRecordsFull = {
      inputs: [parse("D<Bol,D<S<k:R<Key>,Value:R<Value>>,R<Value>>>")],
      outputs: [parse("L<E<123>>"), { t: "e", e: 123 }],
      id: 1,
      reflectMap: [
        [10, parse("S<Key:Int,Value:Flt>")],
        [2, parse("S<Key:Bol,Value:Str>")],
        [5, parse("S<Value:Ety,Key:Str>")],
        [4, parse("S<Key:D<Str,R<Value>>,Value:Ety>")],
      ],
    };
    const node = unwrap_records(to_records(enum_def)).map(to_records);
    console.dir(node, { depth: null });
  }
  test_enum();
  test_str();
  console.log(to_string(node_def1));
}
