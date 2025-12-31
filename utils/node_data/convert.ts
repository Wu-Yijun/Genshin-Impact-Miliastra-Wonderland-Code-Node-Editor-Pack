import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {}) => writeFileSync(import.meta.dirname + "/" + path, JSON.stringify(data, null, 2));


let a = data.Nodes.filter(x => x.System === "Server").sort((l, r) => l.Identifier.localeCompare(r.Identifier)).map(x => x.Identifier.split(".").slice(0, 2).join("."));
let b = data.Nodes.filter(x => x.System === "Client").sort((l, r) => l.Identifier.localeCompare(r.Identifier)).map(x => x.Identifier.split(".").slice(0, 2).join(".") + " Client");

const raw = [...new Set([...a, ...b].sort())];
const res = new Map(read("temp.txt").split("\n").map((x, i) => (assertEq(x.split(":")[0].trim(), raw[i]), x.split(":").map(x => x.trim()))));

data.Nodes.forEach(x => {
  let id = x.Identifier.split(".");
  id[1] = res.get(id[0] + "." + id[1] + (x.System === "Client" ? " Client" : ""))!.trim();
  x.Identifier = id.join(".");
});

save("data.json", data);