import { inspect } from "util";
import { decode_gia_file } from "../../protobuf/decode.ts";

const names = ["server", "status", "class", "item", "bool", "int", "skill", "composite"] as const;
type names = typeof names[number];

const dir = import.meta.dirname;

for (const name of names) {
  const g = decode_gia_file(dir + "/" + name + ".gia");
  const ID = g.graph.id;
  const Type = g.graph.type;
  console.log(JSON.stringify({ name, ID, Type }));
  // console.log(inspect(, { depth: null, showHidden: true, compact: true }));
}