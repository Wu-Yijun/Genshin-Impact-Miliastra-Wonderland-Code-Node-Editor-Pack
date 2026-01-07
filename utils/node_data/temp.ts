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
import docZH from "./UGC-Guide-Markdown/nodes.zh.json" with {type: "json"};

const used = new Set();
const unused = new Set(doc);

data.Nodes.forEach(node => {
  if (node.Domain === "Hidden") return;
  let ref_node = doc.find(n => n.name === node.InGameName.en && n.category.startsWith(node.System));

  if (!ref_node) {
    ref_node = doc.find(n => node.Alias.includes(n.name) && n.category.startsWith(node.System));
    if (ref_node) {
      // console.log("Alias node:", node.InGameName.en, node.Identifier, "->", ref_node.name);
      // Manually checked, all good
    } else {
      // console.log("Missing node:", node.InGameName.en, node.Identifier);
      return;
    }
  }
  if (used.has(ref_node)) {
    // console.log("Duplicate node:", node.InGameName.en, node.Identifier);
  }
  used.add(ref_node);
  if (!unused.has(ref_node)) {
    // console.log("Duplicate unused node:", node.InGameName.en, node.Identifier);
  }
  unused.delete(ref_node);

  const ref_node_zh = docZH[doc.indexOf(ref_node)]; // has been verified equal

  // node.InGameName["zh-Hans"] ??= ref_node_zh.name;
  // if(ref_node_zh.name !== node.InGameName["zh-Hans"]) {
  //   console.log(`[Name Mismatch] in node ${node.InGameName.en}(${ref_node.name}): "${node.InGameName["zh-Hans"]}" (DATA) vs "${ref_node_zh.name}" (MD)`);
  // }


  const t: { [key: string]: string } = {
    "Input Parameter": "In",
    "Output Parameter": "Out",
    "Enumeration": "E<Unk>",
    "Complete list": "L<E<Unk>>",
    "Structure": "S<>",
    "Generic": "R<T>",
    "Floating Point Numbers": "Flt",
    "Boolean": "Bol",
    "String": "Str",
    "3D Vector": "Vec",
    "Integer": "Int",
    "Entity": "Ety",
    "Config ID": "Cfg",
    "Prefab ID": "Pfb",
    "Faction": "Fct",
    "Dictionary": "D<Unk,Unk>",
    "GUID": "Gid",
    "Integer List": "L<Int>",
    "Floating Point Number List": "L<Flt>",
    "String List": "L<Str>",
    "3D Vector List": "L<Vec>",
    "Entity List": "L<Ety>",
    "Config ID List": "L<Cfg>",
    "Faction List": "L<Fct>",
    "GUID List": "L<Gid>",
    "Generic List": "L<R<T>>",
    "Generic Dictionary": "D<R<K>,R<V>>",
    "Local Variable": "Loc",
    "Custom Variable Snapshot": "Vss",
    "": "!!保证不为空!!",
  };
  const pins = node.DataPins.filter(p => p.Visibility !== "Hidden");
  if (pins.length !== ref_node.parameters.length) {
    // console.log(`[Length Mismatch] in node ${node.InGameName.en}(${ref_node_zh.name}) parameters: ${pins.length} (DATA) vs ${ref_node.parameters.length} (MD)`);
    return;
  }
  for (let i = 0; i < pins.length; i++) {
    if (t[ref_node.parameters[i].type] !== pins[i].Direction) {
      // console.log(`[Direction Mismatch] in node ${node.InGameName.en}(${ref_node_zh.name}) parameter ${pins[i].Identifier}: ${pins[i].Direction} (DATA) vs ${t[ref_node.parameters[i].type]} (MD)`);
      // checked, problems of mistakes in MD, not DATA
    }
    const p = pins[i];
    const rp = t[ref_node.parameters[i].dataType];
    if (rp !== p.Type) {
      let skip = false;
      if (NT.is_reflect(p.Type) && NT.is_reflect(rp)) {
        skip = true;
      } else if (NT.stringify(NT.parse(p.Type), { unknown_enum: true, unknown_dict: true, empty_struct: true }) === rp) {
        skip = true;
      }
      if (!skip) {
        // console.log(`[Type Mismatch] in node ${node.InGameName.en}(${ref_node_zh.name}) parameter ${pins[i].Identifier}: ${p.Type} (DATA) vs ${rp} (MD)`);
        return;
      }
    }
  }
  // 类型与参数均能对应上, 填充标签和注释
});

console.log("Unused nodes:");
for (const n of unused) {
  console.log("-", n.name, `(${n.category})`);
}

// save("nodes.json", nodes);
// save("data.json", data);

