
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
  else if (DEBUG) console.error(err);
  return 0 as any;
}

export function assert(cond: boolean, msg?: string): asserts cond {
  if (cond) return;
  throw new Error(msg || "Assertion failed");
}

export function assertEq<T>(l: unknown, r: T, msg?: string): asserts l is T {
  if (l === r) return;
  console.error(l, "!=", r);
  throw new Error(msg || "Assertion failed");
}
