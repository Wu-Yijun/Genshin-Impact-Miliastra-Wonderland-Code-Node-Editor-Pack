
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

export function exclude_keys(obj: any, ...keys: (string | string[])[]): any {
  function remove_key(o: any, key: string[]) {
    if (key.length === 1) {
      delete o[key[0]];
    } else {
      const k = key[0];
      if (o[k] === undefined) return;
      remove_key(o[k], key.slice(1));
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
export function assertDeepEq<T>(target: T, expect: T): asserts target is T {
  const isObject = (v: any) => v && typeof v === "object";
  function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (isObject(a) && isObject(b)) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!deepEqual(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  }
  if (deepEqual(target, expect)) return;
  console.error("[Assertion]", target, "not deep equal to", expect);
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

