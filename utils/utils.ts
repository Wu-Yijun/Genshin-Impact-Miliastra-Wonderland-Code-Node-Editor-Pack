
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

export function assert(cond: boolean, msg?: string): asserts cond {
  if (cond) return;
  throw new Error(msg ?? "Assertion failed");
}
export function assertEq<T>(target: unknown, expect: T): asserts target is T {
  if (target === expect) return;
  console.error(target, "!=", expect);
  throw new Error("Assertion failed");
}
export function assertEqs<const T extends readonly any[]>(target: unknown, ...expects: T): asserts target is T[number] {
  if (expects.some((v) => v === target)) return;
  console.error(target, "!=", expects);
  throw new Error("Assertion failed");
}
export function assertNotEq<T, Excluded>(target: T | Excluded, exclude: Excluded): asserts target is Exclude<T | Excluded, Excluded> {
  if (target === exclude) { debugger; throw new Error(`Assert Unequal Fail: ${target} === ${exclude}`); }
}
export function assertNotEqs<T, const Excluded extends readonly any[]>(target: T | Excluded[number], ...excludes: Excluded): asserts target is Exclude<T | Excluded[number], Excluded[number]> {
  if (excludes.some((v) => v === target)) { debugger; throw new Error(`Assert Unequal Fail: ${target} === ${excludes}`); }
}
export function empty(v: any): v is null | undefined {
  return v === undefined || v === null;
}

