import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import type { EnumDef, EnumTypeDef } from "./types.ts";
import { assert, assertDeepEq, assertEq, assertEqs, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
import * as NT from "./node_type.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { type Document, type NodeDef } from "./types.ts";
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


const dict = data.Nodes.find(x => x.Identifier === "Arithmetic.Dictionary.Assemble_Dictionary")!;

dict.Variants?.forEach(v => {
  v.InjectedContents.forEach(i => {
    if (i.Identifier.startsWith("Input")) {
      const idx = parseInt(i.Identifier.slice(5));
      i.Identifier = idx % 2 === 1 ? "key" + (idx - 1) / 2 : "val" + (idx - 2) / 2;
    }
  })
})

save("data.json", data);