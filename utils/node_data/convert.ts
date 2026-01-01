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
// TODO: 添加 index of type selector

data.Nodes.forEach(node => {
  node.FlowPins.forEach(p => {
    p.Label ??= {};
    p.Label["en"] ??= "";
    p.Label["zh-Hans"] ??= "";
  });
  // 校验 flow-pin 数量一致:
  const ref = REF.find(ref => ref.id === node.__ref_id);
  if (!ref) return;
  if (node.FlowPins.length !== ref.ports.filter(x => x.kind.startsWith("flow-")).length) {
    // console.log(node.Identifier);
    return;
  }
  let incnt = node.FlowPins.filter(x => x.Direction === "In").length;
  node.FlowPins.forEach((pin, i) => {
    const j = pin.Direction === "In" ? i : i - incnt;
    const refp = ref.ports.filter(x => x.kind.startsWith("flow-"))[i];
    assert(refp.kind.startsWith("flow-"));
    assertEq(pin.Direction === "In", refp.kind.endsWith("-in"));
    pin.ShellIndex ??= j;
    pin.KernelIndex ??= j;
    assertEq(pin.ShellIndex, pin.KernelIndex);
    assertEq(pin.ShellIndex, j);
    if (!["执行", "完成", "事件"].includes(refp.label)) {
      console.log(node.Identifier, refp.label);
    }
  });

  /** 手动编辑这些:
Control.General.Branch 是
Control.General.Branch 否
Execution.Common_Node.For_Loop 跳出循环
Execution.Common_Node.For_Loop 循环体
Execution.Common_Node.For_Loop 循环完成
Execution.List_Operation.For_Each 跳出循环
Execution.List_Operation.For_Each 循环体
Execution.List_Operation.For_Each 循环完成
Control.General_Client.Branch 是
Control.General_Client.Branch 否
Execution.General_Client.For_Loop 跳出循环
Execution.General_Client.For_Loop 循环体
Execution.General_Client.For_Loop 循环完成
  */
})


save("data.json", data);