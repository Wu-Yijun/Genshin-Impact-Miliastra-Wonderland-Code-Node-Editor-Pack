import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import type { EnumDef, EnumTypeDef } from "./types.ts";
import { assert, assertDeepEq, assertEq, assertEqs, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
import * as NT from "./node_type.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { type Document } from "./types.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), { indent: 2, maxLength: 120 })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

// const nodes = (data as any as Document).Nodes.filter(x => Object.keys(x).find(x => x.startsWith("__todo")) !== undefined);
// console.log(nodes.length);

// console.log(data.Nodes.filter(n => n.DataPins.find(p => p.Identifier.startsWith('Input')) !== undefined).length);

import doc from "./UGC-Guide-Markdown/nodes.json" with {type: "json"};

const used = new Set();
const unused = new Set(doc);

data.Nodes.forEach(node => {
  if (node.Domain === "Hidden") return;
  let ref_node = doc.find(n => n.name === node.InGameName.en && n.category.startsWith(node.System));
  
  if (!ref_node) {
    ref_node = doc.find(n => node.Alias.includes(n.name) && n.category.startsWith(node.System));
    if (ref_node) {
      console.log("Alias node:", node.InGameName.en, node.Identifier, "->", ref_node.name);
    } else{
      console.log("Missing node:", node.InGameName.en, node.Identifier);
    return;
    }
  }
  if(used.has(ref_node)) {
    console.log("Duplicate node:", node.InGameName.en, node.Identifier);
  }
  used.add(ref_node);
  if(!unused.has(ref_node)) {
    console.log("Duplicate unused node:", node.InGameName.en, node.Identifier);
  }
  unused.delete(ref_node);
});

console.log("Unused nodes:");
for(const n of unused) {
  console.log("-", n.name, `(${n.category})`);
}

// save("nodes.json", nodes);

