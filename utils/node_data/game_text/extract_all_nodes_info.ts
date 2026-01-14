import { readFileSync, writeFileSync } from "fs";
import { assert, assertDeepEq } from "../../utils.ts";

const data = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/ExcelBinOutput/ManualTextMapConfigData.json").toString());
const enText = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/TextMap/TextMapEN.json").toString());
const zhText = JSON.parse(readFileSync("ref/DimbreathBot/AnimeGameData/TextMap/TextMapCHS.json").toString());

const nodesText = data.filter((x: any) => x.textMapId.startsWith("BeyondEditorInstructionNodeConfig_"));

nodesText.every((x: any) => assertDeepEq(
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
nodesText.forEach((x: any) => {
  delete x.paramTypes;
  x.en = enText[x.textMapContentTextMapHash] ?? "";
  x.zh = zhText[x.textMapContentTextMapHash] ?? "";
});

console.log("Total texts:", nodesText.length);

writeFileSync("./utils/node_data/game_text/nodes.json", JSON.stringify(nodesText, null, 2));

// combine nodes
interface NodeData {
  id: number;
  name: string;
  nameZH: string;
  desc: string;
  descZH: string;
  inPins?: NodeParam[];
  outPins?: NodeParam[];
  inParams?: NodeParam[];
  outParams?: NodeParam[];
  extraParams?: NodeParam[];
}
interface NodeParam {
  index: number;
  name: string;
  nameZH: string;
  // for override hint
  hint?: string;
  hintZH?: string;
}

const name = /^BeyondEditorInstructionNodeConfig_(name)_(\d+)$/;
const desc = /^BeyondEditorInstructionNodeConfig_(desc)_(\d+)$/;
const inParams = /^BeyondEditorInstructionNodeConfig_inParamList_(\d+)_name_(\d+)$/;
const outParams = /^BeyondEditorInstructionNodeConfig_outParamList_(\d+)_name_(\d+)$/;
const extraParams = /^BeyondEditorInstructionNodeConfig_extraParamList_(\d+)_name_(\d+)$/;
const inPin = /^BeyondEditorInstructionNodeConfig_inPinList_(\d+)_name_(\d+)$/;
const outPin = /^BeyondEditorInstructionNodeConfig_outPinList_(\d+)_name_(\d+)$/;
const inHint = /^BeyondEditorInstructionNodeConfig_inParamList_(\d+)_valueConfig_overrideHints_0_hint_(\d+)$/;
const patterns = { name, desc, inParams, outParams, extraParams, inPin, outPin, inHint };

const nodes: Map<number, NodeData> = new Map();

nodesText.forEach((node: any) => {
  let matched = false;
  Object.entries(patterns).forEach(([kind, pattern]) => {
    const match = node.textMapId.match(pattern);
    if (match) {
      matched = true;
      const [_, index, id] = match;
      if (!nodes.has(Number(id))) {
        nodes.set(Number(id), {
          id: Number(id),
          name: "",
          nameZH: "",
          desc: "",
          descZH: "",
          inPins: [],
          outPins: [],
          inParams: [],
          outParams: []
        });
      }
      const data = nodes.get(Number(id))!;
      switch (kind) {
        case "name":
          data.name = node.en;
          data.nameZH = node.zh;
          break;
        case "desc":
          data.desc = node.en;
          data.descZH = node.zh;
          break;
        case "inParams":
          data.inParams ??= [];
          data.inParams.push({
            index: Number(index),
            name: node.en,
            nameZH: node.zh
          });
          break;
        case "outParams":
          data.outParams ??= [];
          data.outParams.push({
            index: Number(index),
            name: node.en,
            nameZH: node.zh
          });
          break;
        case "extraParams":
          data.extraParams ??= [];
          data.extraParams.push({
            index: Number(index),
            name: node.en,
            nameZH: node.zh
          });
          break;
        case "inPin":
          data.inPins ??= [];
          data.inPins.push({
            index: Number(index),
            name: node.en,
            nameZH: node.zh
          });
          break;
        case "outPin":
          data.outPins ??= [];
          data.outPins.push({
            index: Number(index),
            name: node.en,
            nameZH: node.zh
          });
          break;
        case "inHint":
          const pin = data.inParams?.find(p => p.index == Number(index));
          if (pin) {
            pin.hint = node.en;
            pin.hintZH = node.zh;
          } else {
            console.error("[Error] Pin not found", node.textMapId, index);
          }
          break;
        default:
          console.warn("[Warning] Not Implemented", kind);
      }
    }
  });
  // assert(matched);
  if (!matched) {
    console.warn("[Warning] Cannot resolve textMapId:", node.textMapId);
  }
});

const node_arr = Array.from(nodes.values()).sort((a, b) => a.id - b.id);
node_arr.forEach(node => {
  node.inPins = node.inPins?.sort((a, b) => a.index - b.index);
  node.outPins = node.outPins?.sort((a, b) => a.index - b.index);
  node.inParams = node.inParams?.sort((a, b) => a.index - b.index);
  node.outParams = node.outParams?.sort((a, b) => a.index - b.index);
  node.extraParams = node.extraParams?.sort((a, b) => a.index - b.index);
});
console.log("Total nodes:", node_arr.length);

writeFileSync("./utils/node_data/game_text/nodes.json", JSON.stringify(node_arr, null, 2));
