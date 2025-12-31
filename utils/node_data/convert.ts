import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

// console.log(data.Nodes.map(x => x.Identifier.length));

save("temp.txt", data.Nodes.map(x => x.Identifier).sort((a, b) => -a.length + b.length).join("\n"))