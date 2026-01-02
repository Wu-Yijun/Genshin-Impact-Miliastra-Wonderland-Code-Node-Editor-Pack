import { assert, assertEq } from "../utils.ts";

export const AtomTypes = [
  "Int",  // Integer
  "Flt",  // Float
  "Bol",  // Boolean
  "Str",  // String
  "Vec",  // Vector
  "Gid",  // GUID
  "Ety",  // Entity
  "Pfb",  // Prefab ID
  "Fct",  // Faction
  "Cfg",  // Configuration ID
  "Vss",  // Variable Snapshot
  "Loc",  // Local Variable
  "Unk",  // Unknown
] as const;
export type AtomTypes = typeof AtomTypes[number];

export type EnumId = string; // length 4, EnumIdentifier

export type BasicType = { t: "b", b: AtomTypes }; // 'Abc'
export type EnumType = { t: "e", e: EnumId };  // E<ABCD>
export type ListType = { t: "l", i: NodeType }; // L<Abc>
export type StructType = { t: "s", f: [string, NodeType][] }; // S<X:Abc,Y:L<Str>>
export type DictType = { t: "d", k: NodeType, v: NodeType }; // D<K:Abc,V:L<Str>>
export type ReflectType = { t: "r", r: string }; // R<Z>
export type ConstraintType = { t: "c", c: [string, NodeType][] }; // C<X:Abc,Y:L<Str>>
export type NodeType = BasicType | EnumType | ListType | StructType | DictType | ReflectType | ConstraintType;

export const UNK_TYPE: NodeType = { t: "b", b: "Unk" };

/**
 * 将 NodeType（或字符串形式的类型表达式）转为可读字符串。
 * 更新：支持 ConstraintTypes (C<...>) 和 String EnumId
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
    case "s": {
      const f = node.f.map(([name, t]) => (`${name}:${stringify(t)}`));
      return `S<${f.join(",")}>`;
    }
    case "d":
      return `D<${stringify(node.k)},${stringify(node.v)}>`;
    case "r":
      return `R<${node.r}>`;
    case "c": { // [Added] Support for ConstraintTypes
      const c = node.c.map(([name, t]) => (`${name}:${stringify(t)}`));
      return `C<${c.join(",")}>`;
    }
  }
}

/**
 * 将字符串形式的类型表达式解析为 NodeType。
 * 更新：支持 C<...> 解析，以及字符串格式的 E<...>
 */
export function parse(src: string): NodeType {
  if (src === undefined) return UNK_TYPE;
  let p = 0;
  const tokens = src.split(/([ ]+|\<|\,|\:|\>)/g).filter((x) =>
    x.trim().length > 0
  );

  // Throw Error for Invalid name
  const not_illegal_name = (str: string) => {
    assert(!AtomTypes.includes(str as AtomTypes), `System Type: "${str}"`);
    assert(/^[a-zA-Z][a-zA-Z0-9_]*$/s.test(str), `Invalid name: "${str}"`);
    assert(str !== "Unk", `Invalid name: "${str}"`);
  };


  // Helper to parse field lists (shared by Struct and Constraint)
  const parseFields = (): [string, NodeType][] => {
    assertEq(tokens[p++], "<");
    const fields: [string, NodeType][] = [];
    while (tokens[p] !== ">") {
      assert(tokens[p - 1] === "<" || tokens[p++] === ",");
      const field = tokens[p++];
      not_illegal_name(field);
      assertEq(tokens[p++], ":");
      const type = parseTokens(tokens);
      fields.push([field, type]);
    }
    assertEq(tokens[p++], ">");
    return fields;
  };

  const parseTokens = (tokens: string[]): NodeType => {
    switch (tokens[p++]) {
      case "L":
        assertEq(tokens[p++], "<");
        const item = parseTokens(tokens);
        assertEq(tokens[p++], ">");
        return { t: "l", i: item };
      case "D":
        assertEq(tokens[p++], "<");
        const key = parseTokens(tokens);
        assertEq(tokens[p++], ",");
        const value = parseTokens(tokens);
        assertEq(tokens[p++], ">");
        return { t: "d", k: key, v: value };
      case "R":
        assertEq(tokens[p++], "<");
        const name = tokens[p++];
        not_illegal_name(name);
        assertEq(tokens[p++], ">");
        return { t: "r", r: name };
      case "E":
        assertEq(tokens[p++], "<");
        const eid = tokens[p++];
        // [Modified] Support string EnumId (remove parseInt check)
        // Ensure it is not a syntax token
        assert(/^[A-Z]{4}$|^Unk$/s.test(eid), `Invalid EnumType: "${eid}"`);
        assertEq(tokens[p++], ">");
        return { t: "e", e: eid };
      case "S":
        return { t: "s", f: parseFields() };
      case "C": // [Added] Support for ConstraintTypes
        return { t: "c", c: parseFields() };
      default:
        assert(
          AtomTypes.includes(tokens[p - 1] as AtomTypes),
          `Invalid AtomType: "${tokens[p - 1]}"`,
        );
        return { t: "b", b: tokens[p - 1] as AtomTypes };
    }
  };
  const ret = parseTokens(tokens);
  assertEq(p, tokens.length);
  return ret;
}

/**
 * 在给定类型中执行一次单一反射替换。
 * 更新：支持 ConstraintTypes 的递归替换
 */
export function reflect(src_type: NodeType | string, injected_name: string, injected_type: NodeType | string): NodeType {
  const src_type_ = typeof src_type === "string" ? parse(src_type) : src_type;
  const injected_type_ = typeof injected_type === "string" ? parse(injected_type) : injected_type;
  switch (src_type_.t) {
    case "r":
      return src_type_.r === injected_name ? structuredClone(injected_type_) : src_type_;
    case "b":
      return src_type_;
    case "e":
      return src_type_;
    case "l":
      return { t: "l", i: reflect(src_type_.i, injected_name, injected_type) };
    case "d":
      return { t: "d", k: reflect(src_type_.k, injected_name, injected_type), v: reflect(src_type_.v, injected_name, injected_type) };
    case "s":
      return {
        t: "s",
        f: src_type_.f.map(([name, node]) => [name, reflect(node, injected_name, injected_type)]),
      };
    case "c": // [Added] ConstraintTypes handling
      return {
        t: "c",
        c: src_type_.c.map(([name, node]) => [name, reflect(node, injected_name, injected_type)]),
      };
    default:
      throw new Error(`Invalid NodeType: ${stringify(src_type)}`);
  }
}

/**
 * 对类型执行一次或多次 reflect() 替换。
 */
export function reflects(
  type: NodeType | string,
  injected_types: ConstraintType | string,
): NodeType {
  const t = typeof type === "string" ? parse(type) : type;
  const injected_types_ = typeof injected_types === "string" ? parse(injected_types) : injected_types;
  assertEq(injected_types_.t, "c");
  const r = injected_types_.c;
  return r.reduce((type, ref) => reflect(type, ref[0], ref[1]), t);
}

/**
 * 判断某个 NodeType 是否包含反射节点（R<...>）。
 */
export function is_reflect(type: NodeType | string | undefined): boolean {
  if (type === undefined) return false;
  if (typeof type === "string") type = parse(type);
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
    case "c":
      return type.c.some((x) => is_reflect(x[1]));
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
      case "c":
        t.c.forEach((x) => core(x[1]));
        return;
    }
  };
  core(type);
  return Array.from(set);
}

/**
 * 将类型中所有 R<name> 的位置映射为实际的字段类型。
 * 更新：支持 ConstraintTypes 递归，并修复 Struct 字段访问的逻辑错误。
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
    assertEq(t.t, r.t);
    switch (r.t) {
      case "b":
        assertEq(r.b, (t as any).b);
        return;
      case "e":
        assertEq(r.e, (t as any).e);
        return;
      case "l":
        core(r.i, (t as any).i);
        return;
      case "s": {
        // [Fixed] Cannot access array via string key like (t as any).f[name]
        const targetFields = (t as StructType).f;
        r.f.forEach(([name, subType]) => {
          const targetField = targetFields.find(x => x[0] === name);
          assert(!!targetField, `Field ${name} missing in target type`);
          core(subType, targetField![1]);
        });
        return;
      }
      case "c": { // [Added] ConstraintTypes handling
        const targetFields = (t as ConstraintType).c;
        r.c.forEach(([name, subType]) => {
          const targetField = targetFields.find(x => x[0] === name);
          assert(!!targetField, `Constraint field ${name} missing in target type`);
          core(subType, targetField![1]);
        });
        return;
      }
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
 * 更新：支持 ConstraintTypes 比较
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
    case "c": { // [Added] ConstraintTypes comparison
      const bc = (b as ConstraintType).c;
      if (a.c.length !== bc.length) return false;
      for (let i = 0; i < a.c.length; i++) {
        if (a.c[i][0] !== bc[i][0]) return false;
        if (!type_equal(a.c[i][1], bc[i][1])) return false;
      }
      return true;
    }
    case "r":
      return a.r === (b as any).r;
  }
  throw new Error("Unreachable");
}