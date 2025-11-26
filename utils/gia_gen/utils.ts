class Counter {
  private count = 0;
  get value() {
    this.count++;
    return this.count;
  }
}

/** 节点 Index 计数器 */
export const counter_index = new Counter();
/** 节点动态 id 计时器 */
export const counter_dynamic_id = new Counter();

export function randomInt(len: number, starting: string = ""): number {
  let ret = "";
  while (true) {
    if (len > 8) {
      ret += Math.random().toString(10).slice(-8);
      len -= 8;
    } else {
      ret += Math.random().toString(10).slice(-len);
      break;
    }
  }
  if (ret[0] === "0") {
    ret = Math.floor(Math.random() * 9 + 1).toString() + ret.slice(1);
  }
  if (starting.length > 0) {
    return parseInt(starting + ret.slice(starting.length));
  }
  return parseInt(ret);
}

const DEBUG = false;
export function todo<T>(msg?: string, strict = DEBUG): T {
  const err = "TODO: Not implemented yet." + (msg ? ` Details: ${msg}` : "")
  if (strict) throw new Error(err);
  else console.error(err);
  return 0 as any;
}