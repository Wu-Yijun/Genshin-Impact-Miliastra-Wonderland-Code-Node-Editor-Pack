import { readFileSync, writeFileSync } from "fs";
import { assert, assertDeepEq, assertEq } from "../../utils.ts";
import { exit } from "process";

const data = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/ExcelBinOutput/ManualTextMapConfigData.json").toString());
const enText = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/TextMap/TextMapEN.json").toString());
const zhText = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/TextMap/TextMapCHS.json").toString());

const enumsText = data.filter((x: any) => x.textMapId.startsWith("BeyondAssistantEditorConfigGlobal_configEnum_maps_"));

enumsText.every((x: any) => assertDeepEq(
  x.paramTypes,
  [
    "TEXT_PARAM_NONE",
    "TEXT_PARAM_NONE",
    "TEXT_PARAM_NONE",
    "TEXT_PARAM_NONE",
    "TEXT_PARAM_NONE"
  ])
);

// get all texts
enumsText.forEach((x: any) => {
  delete x.paramTypes;
  x.en = enText[x.textMapContentTextMapHash] ?? "";
  x.zh = zhText[x.textMapContentTextMapHash] ?? "";
});

console.log("Total texts:", enumsText.length);

writeFileSync("./utils/node_data/game_text/enums.json", JSON.stringify(enumsText, null, 2));


// combine enums
interface EnumData {
  id: number;
  textMapId: number | null;
  name: string;
  nameZH: string;
  enums: EnumDef[];
}
interface EnumDef {
  index: number;
  name: string;
  nameZH: string;
}

const name = /^BeyondAssistantEditorConfigGlobal_configEnum_maps_(\d+)_mapTitle$/;
const def = /^BeyondAssistantEditorConfigGlobal_configEnum_maps_(\d+)_map_(\d+)_textMapId_(\d+)$/;
const patterns = { name, def };

const enums: Map<number, EnumData> = new Map();

enumsText.forEach((item: any) => {
  let matched = false;
  Object.entries(patterns).forEach(([kind, pattern]) => {
    const match = item.textMapId.match(pattern);
    if (match) {
      matched = true;
      const [id, index, textMapId] = match.slice(1).map((x: string) => parseInt(x));
      if (!enums.has(id)) {
        enums.set(id, {
          id: id,
          textMapId: null,
          name: "",
          nameZH: "",
          enums: [],
        });
      }
      const data = enums.get(id)!;
      switch (kind) {
        case "name":
          data.name = item.en;
          data.nameZH = item.zh;
          break;
        case "def":
          data.textMapId ??= textMapId;
          assertEq(data.textMapId, textMapId);
          data.enums.push({
            index: index,
            name: item.en,
            nameZH: item.zh,
          });
          break;
        default:
          console.warn("[Warning] Not Implemented", kind);
      }
    }
  });
  // assert(matched);
  if (!matched) {
    console.warn("[Warning] Cannot resolve textMapId:", item.textMapId);
  }
});

const enum_arr = Array.from(enums.values()).sort((a, b) => a.id - b.id);
console.log("Total enums:", enum_arr.length);

writeFileSync("./utils/node_data/game_text/enums.json", JSON.stringify(enum_arr, null, 2));
