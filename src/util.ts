import { readFileSync, writeFileSync } from "fs";
import path from "path";


export function get_rel_dir(layer: number = 1) {
  const e = new Error();
  const stack = e.stack!.split('\n')[layer + 1]; // 跳过前两行
  const match = stack.match(/file:\/\/\/(.*):\d+:\d+/)!;
  return path.dirname(match[1]);
}

function try_read(path: string, binary: boolean): string | ArrayBuffer | null {
  try {
    if (binary === true) {
      return readFileSync(path).buffer;
    } else {
      return readFileSync(path).toString();
    }
  } catch (error) {
    console.log("Cannot read file from: ", path);
    console.error(error);
    return null;
  }
}
function try_write(path: string, content: string | ArrayBuffer): boolean {
  try {
    if (typeof content === "string") {
      writeFileSync(path, content);
    } else {
      writeFileSync(path, new Uint8Array(content));
    }
    return true
  } catch (error) {
    console.log("Cannot write file to: ", path);
    console.error(error);
    return false;
  }
}


export function read_file(path: string, type: "root" | "abs" | "rel"): string;
export function read_file(path: string, type: "root" | "abs" | "rel", binary: true): ArrayBuffer;
/** 
 * type = root: read files relative to working dictionary
 * type = abs: read files using absolute dictionary
 * type = rel: read files relative to caller's dictionary
 * */
export function read_file(path: string, type: "root" | "abs" | "rel" = "root", binary = false) {
  if (type === "root") {
    const root_path = import.meta.dirname + "/../" + path;
    const f = try_read(root_path, binary);
    if (f !== null) {
      return f;
    }
    console.log("Try reading from absolute:", path, "as fallback");
  }
  if (type !== "rel") {
    const f2 = try_read(path, binary)
    if (f2 !== null) {
      return f2;
    }
    console.log("Try reading from relative:", path, "as fallback");
  }
  const p = get_rel_dir(2) + "/" + path;
  const f = try_read(p, binary);
  if (f !== null) {
    return f;
  }
  throw new Error("File Not Found: " + path);
}

/**
 * type = root: write files relative to working dictionary
 * type = abs: write files using absolute dictionary
 * type = rel: write files relative to caller's dictionary
 */
export function write_file(path: string, content: string | ArrayBuffer, type: "root" | "abs" | "rel" = "root") {
  if (type === "root") {
    const root_path = import.meta.dirname + "/../" + path;
    if (try_write(root_path, content)) {
      return;
    }
    console.log("Try writing to absolute:", path, "as fallback");
  }
  if (type !== "rel") {
    if (try_write(path, content)) {
      return;
    }
    console.log("Try writing to relative:", path, "as fallback");
  }
  const p = get_rel_dir(2) + "/" + path;
  if (try_write(p, content)) {
    return;
  }
  throw new Error("Cannot write file to: " + path);
}


export function fixSparseArrays<T>(obj: T): T {
  if (Array.isArray(obj)) {
    // 将稀疏数组转换为密集数组，空位用 undefined 填充
    const denseArray = [];
    for (let i = 0; i < obj.length; i++) {
      denseArray[i] = obj.hasOwnProperty(i) ? fixSparseArrays(obj[i]) : undefined;
    }
    return denseArray as T;
  }

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = fixSparseArrays(obj[key]);
      }
    }
  }

  return obj;
}