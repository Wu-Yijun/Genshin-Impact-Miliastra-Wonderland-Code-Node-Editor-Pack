import { assert, assertEq } from "../utils.ts";

/**
 * AtomTypes - 原子类型常量
 * 
 * 定义所有基础原子类型的标识符。这些是类型系统中最基本的类型。
 */
export const AtomTypes = [
  "Int",  // 整数 (Integer)
  "Flt",  // 浮点数 (Float)
  "Bol",  // 布尔值 (Boolean)
  "Str",  // 字符串 (String)
  "Vec",  // 向量 (Vector)
  "Gid",  // 全局唯一标识符 (GUID)
  "Ety",  // 实体 (Entity)
  "Pfb",  // 预制体 ID (Prefab ID)
  "Fct",  // 阵营 (Faction)
  "Cfg",  // 配置 ID (Configuration ID)
  "Vss",  // 变量快照 (Variable Snapshot)
  "Loc",  // 本地变量 (Local Variable)
  "Unk",  // 未知类型 (Unknown)
] as const;

/**
 * AtomTypes type - 原子类型
 * 
 * 从 AtomTypes 常量数组派生的联合类型。
 */
export type AtomTypes = typeof AtomTypes[number];


/**
 * EnumId type - 枚举标识符
 * 
 * 四字符枚举标识符（FourCC），如 "ABCD"。
 */
export type EnumId = string;

/**
 * BasicType - 基础类型
 * 
 * 表示原子类型，如 Int, Str, Bool 等。
 * 
 * @example
 * ```typescript
 * const intType: BasicType = { t: "b", b: "Int" };
 * const strType: BasicType = { t: "b", b: "Str" };
 * ```
 */
export type BasicType = { t: "b", b: AtomTypes };

/**
 * EnumType - 枚举类型
 * 
 * 表示枚举类型，格式为 E<EnumId>。
 * 
 * @example
 * ```typescript
 * const enumType: EnumType = { t: "e", e: "ABCD" };
 * // 对应字符串表示：E<ABCD>
 * ```
 */
export type EnumType = { t: "e", e: EnumId };

/**
 * ListType - 列表类型
 * 
 * 表示列表类型，格式为 L<ItemType>。
 * 
 * @example
 * ```typescript
 * const intList: ListType = { 
 *   t: "l", 
 *   i: { t: "b", b: "Int" } 
 * };
 * // 对应字符串表示：L<Int>
 * ```
 */
export type ListType = { t: "l", i: NodeType };

/**
 * StructType - 结构体类型
 * 
 * 表示结构体类型，格式为 S<Field1:Type1,Field2:Type2>。
 * 
 * @property f - 字段列表，每个字段为 [字段名, 字段类型]
 * @property _ - 可选的结构体 ID
 * 
 * @example
 * ```typescript
 * const structType: StructType = { 
 *   t: "s", 
 *   f: [
 *     ["x", { t: "b", b: "Int" }],
 *     ["y", { t: "b", b: "Flt" }]
 *   ],
 *   _: 123
 * };
 * // 对应字符串表示：S<x:Int,y:Flt>
 * ```
 */
export type StructType = { t: "s", f: [string, NodeType][], _?: number };

/**
 * DictType - 字典类型
 * 
 * 表示字典类型，格式为 D<KeyType,ValueType>。
 * 
 * @example
 * ```typescript
 * const dictType: DictType = { 
 *   t: "d", 
 *   k: { t: "b", b: "Int" },
 *   v: { t: "b", b: "Str" }
 * };
 * // 对应字符串表示：D<Int,Str>
 * ```
 */
export type DictType = { t: "d", k: NodeType, v: NodeType };

/**
 * ReflectType - 反射类型
 * 
 * 表示泛型参数类型，格式为 R<ParamName>。
 * 用于可变类型节点的泛型引脚。
 * 
 * @example
 * ```typescript
 * const reflectType: ReflectType = { t: "r", r: "T" };
 * // 对应字符串表示：R<T>
 * ```
 */
export type ReflectType = { t: "r", r: string };

/**
 * ConstraintType - 约束类型
 * 
 * 表示类型约束，格式为 C<Param1:Type1,Param2:Type2>。
 * 用于可变类型节点的具体类型实例化。
 * 
 * @example
 * ```typescript
 * const constraint: ConstraintType = { 
 *   t: "c", 
 *   c: [
 *     ["T", { t: "b", b: "Int" }],
 *     ["K", { t: "b", b: "Str" }]
 *   ]
 * };
 * // 对应字符串表示：C<T:Int,K:Str>
 * ```
 */
export type ConstraintType = { t: "c", c: [string, NodeType][] };

/**
 * NodeType - 节点类型
 * 
 * 类型系统的核心联合类型，包含所有可能的类型。
 * 
 * @example
 * ```typescript
 * const types: NodeType[] = [
 *   { t: "b", b: "Int" },              // 基础类型
 *   { t: "e", e: "ABCD" },             // 枚举类型
 *   { t: "l", i: { t: "b", b: "Int" } }, // 列表类型
 *   { t: "s", f: [["x", { t: "b", b: "Int" }]] }, // 结构体类型
 *   { t: "d", k: { t: "b", b: "Int" }, v: { t: "b", b: "Str" } }, // 字典类型
 *   { t: "r", r: "T" },                // 反射类型
 *   { t: "c", c: [["T", { t: "b", b: "Int" }]] } // 约束类型
 * ];
 * ```
 */
export type NodeType = BasicType | EnumType | ListType | StructType | DictType | ReflectType | ConstraintType;

/**
 * UNK_TYPE - 未知类型常量
 * 
 * 表示未知或未定义的类型。
 */
export const UNK_TYPE: NodeType = { t: "b", b: "Unk" };

/**
 * StringifyOptions interface - 字符串化选项
 * 
 * 控制 stringify 函数的输出格式。
 */
interface StringifyOptions {
  /** 是否为未知列表输出 L<Unk> */
  unknown_list?: boolean;

  /** 是否为未知枚举输出 E<Unk> */
  unknown_enum?: boolean;

  /** 是否为未知字典键输出 D<Unk,val> */
  unknown_dict_key?: boolean;

  /** 是否为未知字典值输出 D<key,Unk> */
  unknown_dict_val?: boolean;

  /** 是否为未知字典输出 D<Unk,Unk> */
  unknown_dict?: boolean;

  /** 是否为空结构体输出 S<> */
  empty_struct?: boolean;
}

/**
 * stringify - 将 NodeType 转换为可读字符串
 * 
 * 将 NodeType 对象或字符串形式的类型表达式转换为标准字符串表示。
 * 支持所有类型，包括约束类型 (C<...>) 和字符串枚举 ID。
 * 
 * @param node - 要转换的类型（NodeType 对象或字符串）
 * @param options - 字符串化选项
 * @returns 类型的字符串表示
 * 
 * @example
 * ```typescript
 * stringify({ t: "b", b: "Int" });                    // "Int"
 * stringify({ t: "l", i: { t: "b", b: "Int" } });     // "L<Int>"
 * stringify({ t: "e", e: "ABCD" });                   // "E<ABCD>"
 * stringify({ t: "s", f: [["x", { t: "b", b: "Int" }]] }); // "S<x:Int>"
 * stringify({ t: "c", c: [["T", { t: "b", b: "Int" }]] }); // "C<T:Int>"
 * ```
 */
export function stringify(node: NodeType | string, options: StringifyOptions = {}): string {
  if (typeof node === "string") return node;
  switch (node.t) {
    case "b":
      return node.b;
    case "e":
      if (options.unknown_enum) {
        return "E<Unk>";
      }
      return `E<${node.e}>`;
    case "l":
      if (node.i.t === "b" && node.i.b === "Unk" && options.unknown_list) {
        return "L<Unk>";
      }
      return `L<${stringify(node.i, options)}>`;
    case "s": {
      if (node.f.length === 0 && options.empty_struct) {
        return "S<>";
      }
      const f = node.f.map(([name, t]) => (`${name}:${stringify(t, options)}`));
      return `S<${f.join(",")}>`;
    }
    case "d": {
      const key = (options.unknown_dict || options.unknown_dict_key) ? "Unk" : stringify(node.k, options);
      const val = (options.unknown_dict || options.unknown_dict_val) ? "Unk" : stringify(node.v, options);
      return `D<${key},${val}>`;
    }
    case "r":
      return `R<${node.r}>`;
    case "c": { // [Added] Support for ConstraintTypes
      const c = node.c.map(([name, t]) => (`${name}:${stringify(t, options)}`));
      return `C<${c.join(",")}>`;
    }
  }
}

/**
 * parse - 解析类型表达式字符串
 * 
 * 将字符串形式的类型表达式解析为 NodeType 对象。
 * 支持所有类型语法，包括 C<...> 约束类型和字符串格式的 E<...> 枚举。
 * 
 * @param src - 类型表达式字符串或 NodeType 对象
 * @returns 解析后的 NodeType 对象
 * 
 * @example
 * ```typescript
 * parse("Int");                    // { t: "b", b: "Int" }
 * parse("L<Int>");                 // { t: "l", i: { t: "b", b: "Int" } }
 * parse("E<ABCD>");                // { t: "e", e: "ABCD" }
 * parse("S<x:Int,y:Flt>");         // { t: "s", f: [["x", ...], ["y", ...]] }
 * parse("D<Int,Str>");             // { t: "d", k: ..., v: ... }
 * parse("R<T>");                   // { t: "r", r: "T" }
 * parse("C<T:Int>");               // { t: "c", c: [["T", ...]] }
 * parse("C<T:Int,K:Str>");         // { t: "c", c: [["T", ...], ["K", ...]] }
 * ```
 */
export function parse(src: string | NodeType): NodeType {
  if (src === undefined) return UNK_TYPE;
  if (typeof src === "object") return src;
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
 * reflect - 执行单次反射替换
 * 
 * 在给定类型中将所有 R<name> 替换为指定的具体类型。
 * 支持所有类型的递归替换，包括约束类型。
 * 
 * @param src_type - 源类型（可能包含反射类型）
 * @param injected_name - 要替换的反射参数名
 * @param injected_type - 替换后的具体类型
 * @returns 替换后的类型
 * 
 * @example
 * ```typescript
 * // 将 R<T> 替换为 Int
 * reflect({ t: "r", r: "T" }, "T", { t: "b", b: "Int" });
 * // 结果：{ t: "b", b: "Int" }
 * 
 * // 将 L<R<T>> 中的 R<T> 替换为 Str
 * reflect(
 *   { t: "l", i: { t: "r", r: "T" } }, 
 *   "T", 
 *   { t: "b", b: "Str" }
 * );
 * // 结果：{ t: "l", i: { t: "b", b: "Str" } }
 * ```
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
        _: src_type_._,
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
 * reflects - 执行多次反射替换
 * 
 * 对类型执行一次或多次 reflect() 替换，通常用于实例化可变类型节点。
 * 
 * @param type - 源类型（可能包含多个反射类型）
 * @param injected_types - 约束类型，包含所有要替换的参数
 * @returns 完全替换后的类型
 * 
 * @example
 * ```typescript
 * // 将 S<a:R<T>,b:R<K>> 替换为 S<a:Int,b:Str>
 * reflects(
 *   { t: "s", f: [["a", { t: "r", r: "T" }], ["b", { t: "r", r: "K" }]] },
 *   { t: "c", c: [["T", { t: "b", b: "Int" }], ["K", { t: "b", b: "Str" }]] }
 * );
 * // 结果：{ t: "s", f: [["a", { t: "b", b: "Int" }], ["b", { t: "b", b: "Str" }]] }
 * 
 * // 也可以使用字符串
 * reflects("S<a:R<T>,b:R<K>>", "C<T:Int,K:Str>");
 * ```
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
 * is_reflect - 判断类型是否包含反射类型
 * 
 * 递归检查 NodeType 是否包含任何 R<...> 反射类型。
 * 
 * @param type - 要检查的类型
 * @returns 是否包含反射类型
 * 
 * @example
 * ```typescript
 * is_reflect({ t: "b", b: "Int" });                    // false
 * is_reflect({ t: "r", r: "T" });                      // true
 * is_reflect({ t: "l", i: { t: "r", r: "T" } });       // true
 * is_reflect({ t: "s", f: [["x", { t: "r", r: "T" }]] }); // true
 * is_reflect("Int");                                   // false
 * is_reflect("R<T>");                                  // true
 * is_reflect("L<R<T>>");                               // true
 * ```
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
 * extract_reflect_names - 提取所有反射参数名
 * 
 * 获取 NodeType 中出现过的所有反射参数名称。
 * 
 * @param type - 要分析的类型
 * @returns 反射参数名称数组
 * 
 * @example
 * ```typescript
 * extract_reflect_names({ t: "r", r: "A" });
 * // 结果：["A"]
 * 
 * extract_reflect_names(parse("S<a:R<B>,b:L<R<C>>>"));
 * // 结果：["B", "C"]
 * 
 * extract_reflect_names(parse("D<R<K>,R<V>>"));
 * // 结果：["K", "V"]
 * ```
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
 * extract_reflect_fields - 提取反射字段映射
 * 
 * 将类型中所有 R<name> 的位置映射为实际的字段类型。
 * 用于从具体类型实例中提取泛型参数的实际类型。
 * 
 * @param type - 具体类型（已实例化的类型）
 * @param ref - 引用类型（包含反射类型的模板）
 * @returns 反射参数到具体类型的映射数组
 * 
 * @example
 * ```typescript
 * // 从 L<Int> 中提取 L<R<T>> 的 T 类型
 * extract_reflect_fields(
 *   { t: "l", i: { t: "b", b: "Int" } },
 *   { t: "l", i: { t: "r", r: "T" } }
 * );
 * // 结果：[["T", { t: "b", b: "Int" }]]
 * 
 * // 从 S<x:Int,y:Str> 中提取 S<x:R<A>,y:R<B>> 的类型
 * extract_reflect_fields(
 *   parse("S<x:Int,y:Str>"),
 *   parse("S<x:R<A>,y:R<B>>")
 * );
 * // 结果：[["A", { t: "b", b: "Int" }], ["B", { t: "b", b: "Str" }]]
 * ```
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
 * type_equal - 判断两个类型是否相等
 * 
 * 递归比较两个 NodeType 是否结构完全相同。
 * 支持所有类型，包括约束类型。
 * 
 * @param a - 第一个类型
 * @param b - 第二个类型
 * @returns 两个类型是否相等
 * 
 * @example
 * ```typescript
 * type_equal(
 *   { t: "b", b: "Int" },
 *   { t: "b", b: "Int" }
 * ); // true
 * 
 * type_equal(
 *   { t: "b", b: "Int" },
 *   { t: "b", b: "Str" }
 * ); // false
 * 
 * type_equal(
 *   { t: "l", i: { t: "b", b: "Int" } },
 *   { t: "l", i: { t: "b", b: "Int" } }
 * ); // true
 * 
 * type_equal(
 *   parse("S<x:Int,y:Str>"),
 *   parse("S<x:Int,y:Str>")
 * ); // true
 * 
 * type_equal(
 *   parse("C<T:Int>"),
 *   parse("C<T:Int>")
 * ); // true
 * ```
 */
export function type_equal(a: NodeType, b: NodeType, options: { omit_unknown?: boolean } = {}): boolean {
  if (a.t !== b.t) return false;
  switch (a.t) {
    case "b":
      if (options.omit_unknown && b.t === "b") {
        return a.b === b.b || a.b === "Unk" || b.b === "Unk";
      }
      return a.b === (b as any).b;
    case "e":
      if (options.omit_unknown && b.t === "e") {
        return a.e === b.e || a.e === "Unk" || b.e === "Unk";
      }
      return a.e === (b as any).e;
    case "l":
      return type_equal(a.i, (b as any).i, options);
    case "d":
      return type_equal(a.k, (b as any).k, options) && type_equal(a.v, (b as any).v, options);
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