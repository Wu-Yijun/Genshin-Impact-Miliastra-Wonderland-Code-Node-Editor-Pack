
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
const id_set = new Set(oldData.Enums.map(x => x.Identifier));
assertEq(id_set.size, oldData.Enums.length);

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
    console.warn(`[Mismatch Length] ${e.id}: ${e.name}`);
    return;
  }

  // compare data
  def.Collection.forEach((c, i) => {
    let old = oldData.Enums.find(x => x.Identifier === c);
    if (old === undefined) {
      console.warn(`[Missing Enum] ${c}`);
      old = {
        Identifier: c,
        ID: 0,
        Category: c.split(".")[0],
        InGameName: {},
        Alias: [],
      };
      oldData.Enums.push(old);
      // return;
    }
    id_set.delete(c);
    const item = e.enums[i];
    let name = item.name;
    if (name.startsWith(e.name + "_")) name = name.slice(e.name.length + 1);
    if (name.includes("_")) {
      console.warn(`[Enum Name Prefix] Different: ${e.name}: ${name}`);
      name = name.slice(name.indexOf("_") + 1);
    }
    if (old.InGameName.en !== name && !old.Alias?.includes(name)) {
      console.warn(`[Enum Name Changed] ${def.Identifier} ${old.ID}: ${old.Identifier}`);
      console.warn(`    old: ${old.InGameName.en} ${old.InGameName["zh-Hans"]}`);
      console.warn(`    new: ${item.name} ${item.nameZH}`);
      // 需要手动核查
      // 添加Alias / name
      old.InGameName.en ??= name;
      const nameZH = item.nameZH.slice(item.nameZH.indexOf("_") + 1);
      old.InGameName["zh-Hans"] ??= nameZH;
      changed = true;
      if (old.InGameName.en !== name && !old.Alias?.includes(name)) {
        old.Alias?.push(name);
      }
      if (old.InGameName.en !== item.name && !old.Alias?.includes(item.name)) {
        old.Alias?.push(item.name);
      }
      if (old.InGameName["zh-Hans"] !== nameZH && !old.Alias?.includes(nameZH)) {
        old.Alias?.push(nameZH);
      }
      if (old.InGameName["zh-Hans"] !== item.nameZH && !old.Alias?.includes(item.nameZH)) {
        old.Alias?.push(item.nameZH);
      }
    }
  })
});

oldData.EnumTypes.filter(e => enums.find(i => i.textMapId === e.ID) === undefined).forEach(e => {
  console.warn(`[Incorrect TextMapId] ${e.ID}: ${e.InGameName["en"]}`)
})

if (id_set.size > 0) console.warn("[Unused Enum]", id_set);

if (changed) {
  save_data(oldData, true);
}