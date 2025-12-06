import { readFileSync, writeFileSync } from "fs";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { execSync } from "child_process";
import type { Root, GraphUnit_Id_Class, GraphUnit_Id_Type, GraphUnit_Which, NodeGraph_Id_Class, NodeGraph_Id_Kind, NodeGraph_Id_Type, NodeProperty_Type } from "../protobuf/gia.proto.ts";

export const Names = ["server", "status", "class", "item", "bool", "int", "skill", "composite"] as const;
export type Names = typeof Names[number];
export const WORKSPACE = import.meta.dirname + "/";
export const DIST = import.meta.dirname + "/dist/";
export const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

export function save(name: string, data: string | object | Root, to_genshin: boolean = false) {
  if (typeof data === "object") {
    if (name.endsWith(".gia")) {
      const path = to_genshin ? PATH + name : DIST + name;
      encode_gia_file(path, data as Root);
      return;
    }
    data = JSON.stringify(data, null, 2);
  }
  writeFileSync(DIST + name, data);
}

export function gia(name: Names | string, from_genshin: boolean = false): Root {
  if (from_genshin) {
    return decode_gia_file(PATH + name);
  }
  const ret = decode_gia_file(WORKSPACE + "01_collection/" + name + ".gia");
  ret.graph.graph?.inner.graph.nodes.splice(0);
  return ret;
}

export function cls() {
  execSync("cls", { stdio: 'inherit' });
}

export interface GraphInfo {
  name: string;
  class: GraphUnit_Id_Class;
  type: GraphUnit_Id_Type;
  which: GraphUnit_Which;
  graph_class: NodeGraph_Id_Class;
  graph_type: NodeGraph_Id_Type;
  graph_kind: NodeGraph_Id_Kind;
  node_class: NodeGraph_Id_Class
  node_type: NodeProperty_Type;
  node_kind: NodeGraph_Id_Kind;
}

export function read_json(name: string): any {
  return JSON.parse(readFileSync(DIST + name + ".json").toString())
}
export function collection(): GraphInfo[] {
  return JSON.parse(readFileSync(DIST + "collection.json").toString())
}

export function dir(data: any, compact: boolean = false) {
  console.dir(data, { depth: Infinity, compact })
}