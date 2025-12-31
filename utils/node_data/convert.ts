import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

// console.log(data.Nodes.map(x => x.Identifier.length));

// save("temp.txt", data.Nodes.map(x => x.Identifier).sort((a, b) => -a.length + b.length).join("\n"))

const CREF = REF.filter(x => x.id.startsWith("client."))
  .map(x => ({ ...x, _name: x.displayNameEN.replace(/[^A-Za-z]/g, "").toUpperCase() }));

data.Nodes.forEach(node => {
  let ref = REF.filter(x => x.officialID === node.ID && !x.id.startsWith("client"));
  assert(ref.length <= 1);
  if (ref.length === 0) {
    if (node.System !== "Client") {
      console.log("Not Matched", node.Identifier);
      node.__not_find_in_ref = true;
      return;
    }
    const pat = node.InGameName.en.replace(/[^A-Za-z]/g, "").toUpperCase();
    ref = CREF.filter(x => x._name === pat);
    if (ref.length !== 1) {
      console.log("Not Matched", node.Identifier);
      node.__not_find_in_ref = true;
      return;
    } else {
      // console.log(node.InGameName.en, p[0].displayNameEN);
    }
  }
  const p = ref[0];
  assert(p.displayName !== undefined);
  assert(p.id.length > 0);
  assert(ref.filter(x => x.id === p.id).length === 1);
  node.__ref_id = p.id;
});

save("data.json", data);