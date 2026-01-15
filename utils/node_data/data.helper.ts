import { readFileSync, writeFileSync } from "fs";
import type { Document } from "./types.ts";
import { assertDeepEq } from "../utils.ts"

const PATH = import.meta.dirname + "/data.json";
const SCHEMA = import.meta.dirname + "/types.ts";

function read_data(): Document {
  return JSON.parse(readFileSync(PATH).toString())
}

function get_schema(): string[] {
  const raw = readFileSync(SCHEMA).toString();
  const trimmed = raw.replaceAll(/\/\/.*?$|\/\*(.*?)\*\//gms, "")
    .split("\n")
    .map(x => x.trim())
    .filter(x => x.length > 0);
  return trimmed;
  // console.log(trimmed);
}

function expand_schema(schema: string): string {
  schema += `
export interface Translations {
  cs?: string;
  de?: string;
  es?: string;
  en?: string;
  fr?: string;
  it?: string;
  ja?: string;
  ko?: string;
  pl?: string;
  "pt-BR"?: string;
  ru?: string;
  tr?: string;
  "zh-Hans"?: string;
  "zh-Hant"?: string;
}`;
  return schema;
}

function get_order_list(def: string, schema: string): [name: string[], type: string[]] {
  if (!def || def.startsWith("Record<")) {
    return [[], []];
  }
  const match = new RegExp(`export interface ${def} {(.*?)}`, "s").exec(schema);
  const patterns = match![1].split(";")
    .map(x => x.split(":").map(t => t.trim()))
    .filter(x => (x?.[0]?.length ?? 0) > 0);
  const ret: [string[], string[]] = [[], []];
  patterns.forEach(([name, type]) => { ret[0].push(name.replace(/['"?]/g, "")); ret[1].push(type); },);
  return ret;
}

function with_order<T>(schema: string, obj: T, type: string): T {
  if (obj === undefined || obj === null) {
    return obj;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(o => with_order(schema, o, type.slice(0, -2))) as T;
  }
  const order = get_order_list(type, schema);
  const keys = Object.keys(obj) as (keyof T & string)[];
  keys.sort((a, b) => order[0].indexOf(a) - order[0].indexOf(b));

  return Object.fromEntries(keys.map((k) => {
    const v = obj[k];
    const type = order[1][order[0].indexOf(k)];
    return [k, with_order(schema, v, type)];
  })) as T;
}

function reorderObjectKeys(old_doc: Document): Document {
  const doc = with_order(expand_schema(old_doc.Schema), old_doc, "Document");
  assertDeepEq(old_doc, doc); // to confirm the data is not corrupted
  doc.Types.sort((a, b) => a.ID - b.ID);
  doc.Nodes.sort((a, b) => a.ID - b.ID);
  doc.Nodes.forEach(node => {
    node.FlowPins.sort((a, b) => a.Direction.localeCompare(b.Direction) || a.ShellIndex - b.ShellIndex);
    node.DataPins.sort((a, b) => a.Direction.localeCompare(b.Direction) || a.ShellIndex - b.ShellIndex);
    node.ExtraPins?.sort((a, b) => a.Direction.localeCompare(b.Direction) || a.ShellIndex - b.ShellIndex);
  });
  doc.Enums.sort((a, b) => a.ID - b.ID);
  doc.EnumTypes.sort((a, b) => a.ID - b.ID);
  // doc.SystemConstants.GRAPH_CATEGORY_CONSTS = Object.fromEntries(
  //   Object.entries(doc.SystemConstants.GRAPH_CATEGORY_CONSTS)
  //     .sort((a, b) => a[1].AssetsWhich - b[1].AssetsWhich)
  // ) as any;
  return doc;
}

function save_data(data: Document, resort = false) {
  // update info
  const Version = data.Version.split(".");
  Version[2] = (Number(Version[2]) + 1).toString();
  data.Version = Version.join(".");
  data.Date = new Date().toString();
  data.Schema = get_schema().join("\n");
  // sort and save
  const final = resort ? reorderObjectKeys(data) : data;
  writeFileSync(PATH, JSON.stringify(final, null, 2));
}

export { read_data, save_data };

if (import.meta.main) {
  save_data(read_data(), true);
  // const d = read_data();
  // console.log(with_order(d.Schema, d, "Document"));
}