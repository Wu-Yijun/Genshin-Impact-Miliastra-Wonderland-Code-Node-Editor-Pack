import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

import DFT_VAL from "../extracting_nodes/dist/node_pins_default_vals.json" with {type: "json"};
import { exit } from "process";

const TypeMap = {
  "string": "Str",
  "bool": "Bol",
  "int": "Int",
  "float": "Flt",
  "vector3": "Vec",
  "entity": 'Ety',
  "guid": "Gid",
  "list": /^L<.+>$/,
  "enum": /^E<[A-Z]{4}>$/,
  "any": /R<.+>|^D<.+>$/,
  "camp": "Fct",
  "configId": "Cfg",
  "componentId": "Pfb",
};

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

data.Nodes.forEach(node => {
  // 验证每一个出入口数量与类型对应
  if (["Others", "Hidden"].includes(node.Domain)) {
    switch (node.Identifier.split(".")[1]) {
      case "Execution":
        node.FlowPins.push({
          "Identifier": "FlowIn",
          "Direction": "In",
        });
      case "Trigger":
        node.FlowPins.push({
          "Identifier": "FlowOut",
          "Direction": "Out",
        });
        return;
    }
  }
  assertEq(node.FlowPins.length > 0, ["Execution", "Control", "Trigger"].includes(node.Domain))
})


save("data.json", data);