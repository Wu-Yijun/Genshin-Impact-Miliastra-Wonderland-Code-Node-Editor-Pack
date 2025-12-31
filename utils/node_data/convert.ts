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
  // 确实有正确的引脚
  assert(node.DataPins.filter(x => x.Direction === "In").every((x, i) => x.ShellIndex === i));
  assert(node.DataPins.filter(x => x.Direction === "Out").every((x, i) => x.ShellIndex === i));
  assert(node.DataPins.every(x => x.Direction === "Out" || x.Direction === "In"));
  assert(node.DataPins.every(x => x.Type.length >= 3));

  if (node.__ref_id === undefined) return;
  const ref = REF.find(x => x.id === node.__ref_id)!;
  assert(ref !== undefined);

  const refIn = ref.ports.filter(p => p.kind === "data-in");
  const realIn = node.DataPins.filter(x => x.Direction === "In" && x.Visibility !== "Hidden");
  if (realIn.length !== refIn.length) {
    // console.log(
    //   "Input Pin Count is not Equal:",
    //   node.Identifier,
    //   realIn.length,
    //   refIn.length
    // );
    // console.log(...realIn.map((x, i) => [i, x.Type, refIn[i]?.valueType]).flat())
    node.__todo_set_in_pin = true;
    return;
  }


  let warn: any[] = [];
  let isStrCfg = false;
  realIn.forEach((pin, i) => {
    const refp = refIn[i];
    assert(refp.kind === "data-in");
    const pat = TypeMap[refp.valueType];
    if (typeof pat === "string" ? pat === pin.Type : pat.test(pin.Type)) {

    } else {
      // if (typeof pat !== "string") debugger;
      warn.push([node.Identifier, i, pat, pin.Type]);
      if (pat === "Int" && pin.Type === "Cfg") isStrCfg = true;
    }
  });
  // if (warn.length > 1) console.log(warn); // all pass
  // if (warn.length === 1 && warn[0][1] < refIn.length - 1) console.log(isStrCfg && "", warn);// manually checked // not likely to be wrong 
  // if (warn.length === 1 && warn[0][1] === refIn.length - 1) console.log(warn); // manually checked

  // return;
  if (["Control.General_Client.Branch", "Control.General.Branch", "Control.General.Switch"].includes(node.Identifier)) {
    // skip
    node.__todo_set_in_manually = true;
    return;
  }

  let j = 0;
  node.DataPins.filter(x => x.Direction === "In").forEach((pin, i) => {
    assertEq(pin.Identifier, "Input" + i);
    assertEq(pin.ShellIndex, i);
    if (pin.Visibility === "Hidden") {
      return;
    }
    const refp = refIn[j++];
    const identifier = refp.id.replace(/[A-Z]/g, x => "_" + x.toLowerCase());
    if (!/^[a-z][a-z_]*$/.test(identifier)) console.log(identifier); // pass
    assertEq(pin.Identifier, "Input" + i);
    pin.Identifier = identifier;
    pin.Label ??= {};
    const nameCN = refp.label.trim();
    if (nameCN.length === 0) {
      console.log(node.Identifier, i);
      pin.__todo_set_in_label_manually = true;
      return;
    }
    pin.Label["zh-Hans"] = nameCN;
  });

});

save("data.json", data);