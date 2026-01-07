import { TypeDefinition_ServerType_Implementation } from "./protobuf/gia.proto.ts";

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
export function assertEq<T>(target: unknown, expect: T, msg?: string): asserts target is T {
  if (target === expect) return;
  console.error("[Assertion]", target, "!==", expect);
  throw new Error(msg ?? "Assertion failed");
}

export function deepEqualOld<T>(
  target: T,
  expect: T,
  {
    breakpoint = false,
    ignore_rules = (a: any, b: any) => false,
    reason = {
      stack: [],
      info: "",
    },
    pointers = new Set(),
    assumptions = new Map(),
    max_depth = 100,
    precision = 1e-10,
  }: {
    breakpoint?: boolean,
    ignore_rules?: (a: any, b: any) => boolean,
    reason?: {
      stack: string[],
      info: string,
    },
    pointers?: Set<object>,
    assumptions?: Map<object, Set<object>>,
    max_depth?: number,
    precision?: number,
  } = {}
): boolean {
  const add_assumption = (a: object, b: object) => {
    if (!assumptions.has(a)) {
      assumptions.set(a, new Set());
    }
    assumptions.get(a)!.add(b);
    if (!assumptions.has(b)) {
      assumptions.set(b, new Set());
    }
    assumptions.get(b)!.add(a);
  }
  const deep_equal = (a: any, b: any, depth: number): boolean => {
    if (depth <= 0) {
      reason.info = "Recursion depth exceeded";
      if (breakpoint) debugger;
      return false;
    }
    if (ignore_rules(a, b)) return true;
    if (typeof a === "function" && typeof b === "function") return true;
    if (typeof a === "number" && typeof b === "number") {
      if (isNaN(a) && isNaN(b)) return true;
      if (Math.abs(a - b) < precision) return true;
      reason.info = `Number mismatch: ${a} !== ${b}`;
      if (breakpoint) debugger;
      return false;
    }
    if (a === b) return true;
    if (a === undefined || a === null || b === undefined || b === null) {
      reason.info = `Null or Undefined: ${a} !== ${b}`;
      if (breakpoint) debugger;
      return false;
    }
    if (typeof a !== typeof b) {
      reason.info = `Type mismatch: ${typeof a} !== ${typeof b}`;
      if (breakpoint) debugger;
      return false;
    }
    if (typeof a === "object" && typeof b === "object") {
      // Avoid infinite loop and self-comparison
      if (pointers.has(a) && pointers.has(b)) {
        if (a === b) {
          return true;
        }
        if (assumptions.has(a) && assumptions.get(a)!.has(b)) {
          return true;
        }
        add_assumption(a, b);
        const new_pts = new Set(pointers);
        new_pts.delete(a);
        new_pts.delete(b);
        const ret = deepEqualOld(a, b, {
          breakpoint,
          ignore_rules,
          reason,
          pointers: new_pts,
          assumptions,
          max_depth: depth - 1,
          precision,
        });
        if (!ret) {
          reason.info = `Self-comparison: ${a} !== ${b}. ${reason.info}`;
          reason.stack.push("<recursion>");
          if (breakpoint) debugger;
          return false;
        }
        return true;
      }
      pointers.add(a);
      pointers.add(b);
      // Test Array
      if (a instanceof Array && b instanceof Array) {
        if (a.length !== b.length) {
          reason.info = `Array length mismatch: ${a.length} !== ${b.length}.`;
          if (breakpoint) debugger;
          return false;
        }
        for (let i = 0; i < a.length; i++) {
          if (!deep_equal(a[i], b[i], depth - 1)) {
            reason.stack.push(`\b[${i}]`);
            return false;
          }
        }
        return true;
      }
      // Test Set
      if (a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) {
          reason.info = `Set size mismatch: ${a.size} !== ${b.size}`;
          if (breakpoint) debugger;
          return false;
        }
        const a_arr = [...a];
        const b_arr = [...b];
        for (let i = 0; i < a_arr.length; i++) {
          if (!deep_equal(a_arr[i], b_arr[i], depth - 1)) {
            reason.stack.push(`Set(${i}:${a_arr[i]}|${b_arr[i]})`);
            return false;
          }
        }
        return true;
      }
      // Test Map
      if (a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) {
          reason.info = `Map size mismatch: ${a.size} !== ${b.size}`;
          if (breakpoint) debugger;
          return false;
        }
        const a_keys = [...a.keys()].sort();
        const b_keys = [...b.keys()].sort();
        for (let i = 0; i < a_keys.length; i++) {
          if (!deep_equal(a_keys[i], b_keys[i], depth - 1)) {
            reason.stack.push(`MapKey(${i}:${a_keys[i]}|${b_keys[i]})`);
            return false;
          }
          if (!deep_equal(a.get(a_keys[i]), b.get(b_keys[i]), depth - 1)) {
            reason.stack.push(`Map(${a_keys[i]}|${b_keys[i]})`);
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
          reason.info = `Object key Length Mismatch: ${a_keys.length} !== ${b_keys.length}`;
          if (breakpoint) debugger;
          return false;
        }
        for (let i = 0; i < a_keys.length; i++) {
          if (!deep_equal(a_keys[i], b_keys[i], depth - 1)) {
            reason.stack.push(`ObjectKey(${i}:${a_keys[i]})`);
            return false;
          }
          if (!deep_equal(a[a_keys[i]], b[b_keys[i]], depth - 1)) {
            reason.stack.push(`${a_keys[i]}`);
            return false;
          }
        }
        return true;
      }
      reason.info = `Should not reach here: ${a} !== ${b}`;
      if (breakpoint) debugger;
      return false;
    }
    reason.info = `[Value mismatch]: ${a} !== ${b}`;
    if (breakpoint) debugger;
    return false;
  }

  return deep_equal(target, expect, max_depth);
}

/** 带有剪枝的 bisimulation 等价比较算法  */
export function deepEqual<T>(
  target: T,
  expect: T,
  options: {
    ignore_rules?: (a: any, b: any) => boolean;
    precision?: number;
    diff?: { path: string[]; message: string };
  } = {}
): boolean {
  const { ignore_rules, precision = 1e-10, diff } = options;

  // 【正向缓存】合并了 "Stack (正在比较)" 和 "Cache (比较成功)"
  // 含义: (a, b) 要么正在验证中(视为真)，要么已经验证为真
  const memo = new WeakMap<object, Set<object>>();

  // 【负向缓存】专门记录 "已知不相等" 的对象对
  // 含义: (a, b) 已经被证明不相等，不要再浪费算力比较了
  const knownUnequal = new WeakMap<object, Set<object>>();

  function internalEqual(a: any, b: any, isTentative: boolean = false): boolean {

    // --- 1. 快速检查 ---
    if (a === b) return true;

    if (ignore_rules !== undefined) {
      if (ignore_rules(a, b)) return true;
    }

    if (typeof a === 'number' && typeof b === 'number') {
      if (isNaN(a) && isNaN(b)) return true;
      if (Math.abs(a - b) < precision) return true;
      if (!isTentative && diff && !diff.message) {
        diff.message = `Number mismatch: ${a} !== ${b}`;
        diff.path = [];
      }
      return false;
    }


    if (typeof a !== 'object' || a === null || b === null || typeof b !== 'object') {
      // 简单类型不匹配，直接返回
      if (!isTentative && diff && !diff.message) {
        diff.message = `Type/Value mismatch: ${typeof a}(${String(a)}) !== ${typeof b}(${String(b)})`;
        diff.path = [];
      }
      return false;
    }

    // --- 2. 缓存查询 (性能优化的关键) ---

    // 2.1 检查负向缓存 (针对 Set/Map 的 O(N^2) 剪枝)
    const unequalSet = knownUnequal.get(a);
    if (unequalSet && unequalSet.has(b)) {
      return false;
    }

    // 2.2 检查正向缓存 (包含 Pending 和 Proven True)
    let memoSet = memo.get(a);
    if (memoSet && memoSet.has(b)) {
      // 无论是 "正在递归中(闭环)" 还是 "之前已经比过且相等"，都返回 true
      return true;
    }

    // --- 3. 记录状态：假设相等 (Pending) ---
    if (!memoSet) {
      memoSet = new Set();
      memo.set(a, memoSet);
    }
    memoSet.add(b);

    // 默认结果
    let result = false;

    try {
      // --- 4. 具体的结构比较 ---
      if (a instanceof Date && b instanceof Date) {
        // Date
        if (a.getTime() !== b.getTime()) {
          if (!isTentative && diff && !diff.message) {
            diff.message = `Date mismatch: ${a.toISOString()} !== ${b.toISOString()}`;
            diff.path = [];
          }
          result = false;
        } else {
          result = true;
        }
      } else if (a instanceof RegExp && b instanceof RegExp) {
        // RegExp
        if (a.toString() !== b.toString()) {
          if (!isTentative && diff && !diff.message) {
            diff.message = `RegExp mismatch: ${a} !== ${b}`;
            diff.path = [];
          }
          result = false;
        } else {
          result = true;
        }
      } else if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
          result = false;
        } else {
          result = true;
          for (let i = 0; i < a.length; i++) {
            if (!internalEqual(a[i], b[i], isTentative)) {
              result = false;
              if (!isTentative && diff) diff.path.push(`[${i}]`);
              break;
            }
          }
        }
      } else if (a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) {
          result = false;
        } else {
          // Set 匹配优化
          const bValues = Array.from(b);
          result = true;
          for (const aVal of a) {
            // 在这里递归调用时，会利用 negativeCache 快速跳过不可能匹配的项
            const index = bValues.findIndex((bVal) => internalEqual(aVal, bVal, true));
            if (index === -1) {
              result = false;
              if (!isTentative && diff && !diff.message) {
                diff.message = `Set element missing: ${String(aVal)}`;
                diff.path = [];
              }
              break;
            }
            bValues.splice(index, 1);
          }
        }
      } else if (a instanceof Map && b instanceof Map) {
        // Map 逻辑同理，省略以节省篇幅...
        // (代码结构同上一版，只是调用 internalEqual 时会自动走缓存)
        if (a.size !== b.size) {
          result = false;
          if (!isTentative && diff && !diff.message) {
            diff.message = `Map size mismatch: ${a.size} !== ${b.size}`;
            diff.path = [];
          }
        } else {
          result = true; // 假设成功，除非下面循环 break
          const bKeys = Array.from(b.keys());
          for (const [aKey, aVal] of a) {
            const bKeyIndex = bKeys.findIndex(k => internalEqual(aKey, k, true));
            if (bKeyIndex === -1) {
              result = false;
              if (!isTentative && diff && !diff.message) {
                diff.message = `Map key missing in expect: ${String(aKey)}`;
                diff.path = [];
              }
              break;
            }
            const matchBKey = bKeys[bKeyIndex];
            if (!internalEqual(aVal, b.get(matchBKey), isTentative)) {
              if (!isTentative && diff) {
                diff.path.push(`Map(${String(aKey)})`);
                diff.path = [];
              }
              result = false;
              break;
            }
            bKeys.splice(bKeyIndex, 1);
          }
        }
      }
      else {
        // 普通对象
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) result = false;
        else {
          result = true;
          for (const key of keysA) {
            if (!Object.prototype.hasOwnProperty.call(b, key) || !internalEqual(a[key], b[key], isTentative)) {
              result = false;
              if (!isTentative && diff) diff.path.push(`.${key}`);
              break;
            }
          }
        }
      }

    } catch (e) {
      result = false;
      throw e;
    } finally {
      // --- 5. 状态结算 (你的核心提议) ---

      if (result) {
        // A. 如果相等：保留在 memo 中！
        // 这样下次遇到 (a, b) 直接返回 true (Memoization)
        // 不需要做任何 delete 操作
      } else {
        // B. 如果不相等：
        // 1. 从 memo (正向缓存) 中移除，因为它不是 true
        if (memoSet) {
          memoSet.delete(b);
          // 可选: if (memoSet.size === 0) memo.delete(a);
        }

        // 2. 加入 knownUnequal (负向缓存)
        // 这样下次 Set/Map 匹配时，如果遇到这一对，直接跳过
        let unequalSet = knownUnequal.get(a);
        if (!unequalSet) {
          unequalSet = new Set();
          knownUnequal.set(a, unequalSet);
        }
        unequalSet.add(b);
      }
    }

    return result;
  }


  // 重置 diff 内容
  if (diff) {
    diff.path = [];
    diff.message = '';
  }

  // ... 后处理 diff path (reverse 等)
  const finalRes = internalEqual(target, expect);
  if (!finalRes && diff && diff.path) diff.path.reverse();
  return finalRes;
}


export function assertDeepEq<T>(
  target: T,
  expect: T,
  {
    client = false,
    print_l_r = true,
    ignore_rules = (a: any, b: any) => false,
    enable_debugger = false,
  }: {
    client?: boolean,
    print_l_r?: boolean,
    ignore_rules?: (a: any, b: any) => boolean,
    enable_debugger?: boolean
  } = {}
): asserts target is T {
  const diff = { path: [] as string[], message: '' };
  const eq = deepEqual(target, expect, {
    ignore_rules,
    diff,
  });
  if (eq) return;
  if (!client) {
    if (print_l_r) console.error("[Assertion]", target, "not deep equal to", expect);
    console.error("[Assertion Stack]", diff.path.reverse().join("."));
    console.error("[Fail Reason]", diff.message);
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

