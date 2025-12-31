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

data.Nodes.filter(x => x.System === "Client").forEach(node => {
  if (node.DataPins[0]?.Direction === "In" && node.DataPins[0].Type.startsWith("E<")) {
    if (node.Domain === "Arithmetic") {
      console.log("Hide Pin[0]", node.Identifier);
      node.DataPins[0].Visibility = "Hidden";
    }
  }
});

save("data.json", data);

exit(0);

const dft_map = new Map(DFT_VAL.map(x => [x.node, x]));

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
  if (refIn.length === 0) return;
  if (realIn.length > refIn.length) {
    console.log(
      "Input Pin Count is not Equal:",
      node.Identifier,
      realIn.length,
      refIn.length
    );
    console.log(...realIn.map((x, i) => [i, x.Type]).flat())
    node.__todo_set_in_pin = true;
    return;
  }

  return;

  let warn: any[] = [];
  let isStrCfg = false;
  node.DataPins.filter(x => x.Direction === "In").forEach((pin, i) => {
    const refp = refIn[i];
    assert(refp.kind === "data-out");
    const pat = TypeMap[refp.valueType];
    if (typeof pat === "string" ? pat === pin.Type : pat.test(pin.Type)) {

    } else {
      warn.push([node.Identifier, i, pat, pin.Type]);
      if (pat === "Int" && pin.Type === "Cfg") isStrCfg = true;
    }
  });
  // if (warn.length > 1) console.log(warn); // allows
  // if (warn.length === 1 && warn[0][1] < refOut.length - 1) console.log(warn); // not likely to be wrong 
  // if (warn.length === 1 && warn[0][1] === refOut.length - 1) console.log(warn); // manually checked

  node.DataPins.filter(x => x.Direction === "In").forEach((pin, i) => {
    const refp = refIn[i];
    const identifier = refp.id.replace(/[A-Z]/g, x => "_" + x.toLowerCase());
    const nameCN = refp.label.trim();
    assert(nameCN.length > 0);
    if (!/^[a-z][a-z_]*$/.test(identifier)) console.log(identifier); // pass
    assertEq(pin.Identifier, "Output" + i);
    pin.Identifier = identifier;
    pin.Label ??= {};
    pin.Label["zh-Hans"] = nameCN;
  });

});

// save("data.json", data);