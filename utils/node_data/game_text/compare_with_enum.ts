
import { readFileSync } from "fs";
import { read_data, save_data } from "../data.helper.ts";
import { assertEq } from "../../utils.ts";

interface EnumData {
  id: number;
  textMapId: number;
  name: string;
  nameZH: string;
  enums: EnumDef[];
}
interface EnumDef {
  index: number;
  name: string;
  nameZH: string;
}

// Load data
const enums: EnumData[] = JSON.parse(readFileSync("utils/node_data/game_text/enums.json", "utf-8"));
const oldData = read_data();

let changed = false;

enums.filter(e => {
  const def = oldData.EnumTypes.find(t => t.ID === e.textMapId);
  if (def === undefined) {
    console.warn(`[Missing EnumType] ${e.textMapId}: ${e.name} ${e.nameZH}`);
    e.enums.forEach(i => console.warn(`    ${i.index}: ${i.name} ${i.nameZH}`));
    return;
  }
  if (def?.InGameName.en !== e.name) {
    console.warn(`[Name Changed] ${e.textMapId}`);
    console.warn(`    old: ${def.InGameName["en"]} ${def.InGameName["zh-Hans"]}`);
    console.warn(`    new: ${e.name} ${e.nameZH}`);
    def.Alias ??= [];
    if (def.InGameName["en"]) def.Alias.push(def.InGameName["en"])
    def.InGameName["en"] = e.name;
    changed = true;
  }
  def.InGameName["en"] ??= e.name;
  def.InGameName["zh-Hans"] ??= e.nameZH;

  // length
  if (def.Collection.length !== e.enums.length) {
    debugger;
  }
});

oldData.EnumTypes.filter(e => enums.find(i => i.textMapId === e.ID) === undefined).forEach(e => {
  console.warn(`[Incorrect TextMapId] ${e.ID}: ${e.InGameName["en"]}`)
})

if (changed) {
  save_data(oldData);
}