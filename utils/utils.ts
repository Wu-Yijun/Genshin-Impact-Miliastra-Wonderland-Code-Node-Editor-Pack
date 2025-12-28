
/** 是否显示警告输出 */
export const DEBUG = true;
/** 是否在错误时直接中断, 或返回空值 */
export const STRICT = false;


export function panic<T>(msg?: string): T {
  throw new Error("Panic: Unrecoverable error occurred." + (msg ? ` Details: ${msg}` : ""));
}
export function todo<T>(msg?: string): T {
  const err = "TODO: Not implemented yet." + (msg ? ` Details: ${msg}` : "")
  if (STRICT) throw new Error(err);
  if (DEBUG) console.error(err);
  return 0 as any;
}

export function exclude_keys(obj: any, ...keys: (string[] | string)[]): any {
  function remove_key(o: any, key: string[]) {
    if (key.length === 1) {
      if (o instanceof Set && o.has(key[0])) {
        o.delete(key[0]);
      }
      if (o instanceof Map && o.has(key[0])) {
        o.delete(key[0]);
      }
      if (o instanceof Array && parseInt(key[0]).toString() === key[0]) {
        delete o[parseInt(key[0])];
      }
      delete o[key[0]];
    } else {
      const k = key[0];
      if (k === "array" && o instanceof Array) {
        for (let i = 0; i < o.length; i++) {
          remove_key(o[i], key.slice(1));
        }
      }
      if (k === "set" && o instanceof Set) {
        o.forEach((v) => remove_key(v, key.slice(1)));
      }
      if (k === "map" && o instanceof Map) {
        o.forEach((v) => remove_key(v, key.slice(1)));
      }
      if (o instanceof Map && o.has(k)) {
        remove_key(o.get(k), key.slice(1));
      }
      if (k in o) {
        remove_key(o[k], key.slice(1));
      }
    }
  }
  const ret = structuredClone(obj);
  for (const key of keys) {
    if (typeof key === "string") {
      delete ret[key];
    } else {
      remove_key(ret, key);
    }
  }
  return ret;
}


export function assert(cond: boolean, msg?: string): asserts cond {
  if (cond) return;
  throw new Error(msg ?? "Assertion failed");
}
export function assertEq<T>(target: unknown, expect: T): asserts target is T {
  if (target === expect) return;
  console.error("[Assertion]", target, "!==", expect);
  throw new Error("Assertion failed");
}
export function assertDeepEq<T>(target: T, expect: T, { client = false, print_l_r = true }: { client?: boolean, print_l_r?: boolean } = {}): asserts target is T {
  const isObject = (v: any) => v && typeof v === "object";
  const failure = {
    stack: [] as string[],
    info: ""
  };
  const pts = new Set();
  function deepEqual(a: any, b: any, depth = 0): boolean {
    if (depth > 100) {
      failure.info = "Recursion depth exceeded";
      return false;
    }
    if (typeof a === "function" && typeof b === "function") return true;
    if (a === b) return true;
    if (a === undefined || a === null || b === undefined || b === null) {
      failure.info = `Null or Undefined: ${a} !== ${b}`;
      return false;
    }
    if (typeof a !== typeof b) {
      failure.info = `Type mismatch: ${typeof a} !== ${typeof b}`;
      return false;
    }
    if (isObject(a)) {
      // Avoid infinite loop and self-comparison
      if (pts.has(a) && pts.has(b)) return true;
      pts.add(a);
      pts.add(b);
      // Test Array
      if (a instanceof Array && b instanceof Array) {
        if (a.length !== b.length) {
          failure.info = `Array length mismatch: ${a.length} !== ${b.length}`;
          return false;
        }
        for (let i = 0; i < a.length; i++) {
          if (!deepEqual(a[i], b[i], depth + 1)) {
            failure.stack.push(`\b[${i}]`);
            return false;
          }
        }
        return true;
      }
      // Test Set
      if (a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) {
          failure.info = `Set size mismatch: ${a.size} !== ${b.size}`;
          return false;
        }
        const a_arr = [...a];
        const b_arr = [...b];
        for (let i = 0; i < a_arr.length; i++) {
          if (!deepEqual(a_arr[i], b_arr[i], depth + 1)) {
            failure.stack.push(`Set(${i}:${a_arr[i]})`);
            return false;
          }
        }
        return true;
      }
      // Test Map
      if (a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) {
          failure.info = `Map size mismatch: ${a.size} !== ${b.size}`;
          return false;
        }
        const a_keys = [...a.keys()].sort();
        const b_keys = [...b.keys()].sort();
        for (let i = 0; i < a_keys.length; i++) {
          if (!deepEqual(a_keys[i], b_keys[i])) {
            failure.stack.push(`MapKey(${i}:${a_keys[i]})`);
            return false;
          }
          if (!deepEqual(a.get(a_keys[i]), b.get(b_keys[i]), depth + 1)) {
            failure.stack.push(`Map(${a_keys[i]})`);
            return false;
          }
        }
        return true;
      }
      // Otherwise normal obj
      if (a instanceof Object && b instanceof Object) {
        const a_keys = Object.keys(a).sort();
        const b_keys = Object.keys(b).sort();
        if (a_keys.length !== b_keys.length) {
          failure.info = `Object key Length Mismatch: ${a_keys.length} !== ${b_keys.length}`;
          return false;
        }
        for (let i = 0; i < a_keys.length; i++) {
          if (!deepEqual(a_keys[i], b_keys[i])) {
            failure.stack.push(`ObjectKey(${i}:${a_keys[i]})`);
            return false;
          }
          if (!deepEqual(a[a_keys[i]], b[b_keys[i]], depth + 1)) {
            failure.stack.push(`${a_keys[i]}`);
            return false;
          }
        }
        return true;
      }
      failure.info = "UNKNOWN"
      return false;
    }
    failure.info = `[Value mismatch]: ${a} !== ${b}`;
    return false;
  }
  if (deepEqual(target, expect)) return;
  if (!client) {
    if (print_l_r) console.error("[Assertion]", target, "not deep equal to", expect);
    console.error("[Assertion Stack]", failure.stack.reverse().join("."));
    console.error("[Fail Reason]", failure.info);
  }
  throw new Error("Deep Assertion failed");
}
export function assertEqs<const T extends readonly any[]>(target: unknown, ...expects: T): asserts target is T[number] {
  if (expects.some((v) => v === target)) return;
  console.error("[Assertion]", target, "is not in", expects);
  throw new Error("Assertion failed");
}
export function assertNotEq<T, Excluded>(target: T | Excluded, exclude: Excluded): asserts target is Exclude<T | Excluded, Excluded> {
  if (target === exclude) {
    debugger;
    console.error("[Assertion]", target, "===", exclude);
    throw new Error(`Assert Unequal Failed`);
  }
}
export function assertNotEqs<T, const Excluded extends readonly any[]>(target: T | Excluded[number], ...excludes: Excluded): asserts target is Exclude<T | Excluded[number], Excluded[number]> {
  if (excludes.some((v) => v === target)) {
    debugger;
    console.error("[Assertion]", target, "is in", excludes);
    throw new Error(`Assert Unequal Failed`);
  }
}
export function empty(v: any): v is null | undefined {
  return v === undefined || v === null;
}

