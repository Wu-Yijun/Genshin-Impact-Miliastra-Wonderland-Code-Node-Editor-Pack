import { readFileSync, writeFileSync } from "fs";
import type { Document } from "./types.ts";

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

function reorderObjectKeys(old_doc: Document): Document {
  const doc = {} as Document;
  const keys = Object.keys(old_doc) as (keyof Document)[];
  keys.sort((a, b) => old_doc.Schema.indexOf(a) - old_doc.Schema.indexOf(b));
  // console.log(keys);
  keys.forEach(key => (doc as any)[key] = old_doc[key]);
  return doc;
}

function save_data(data: Document) {
  // update info
  const Version = data.Version.split(".");
  Version[2] = (Number(Version[2]) + 1).toString();
  data.Version = Version.join(".");
  data.Date = new Date().toString();
  data.Schema = get_schema().join("\n");
  // sort and save
  writeFileSync(PATH, JSON.stringify(reorderObjectKeys(data), null, 2));
}

export { read_data, save_data };

if (import.meta.main) {
  save_data(read_data());
  // console.log(get_schema());
}