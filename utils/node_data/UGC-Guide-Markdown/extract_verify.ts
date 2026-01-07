import { assert } from "../../utils.ts";
import data from "./nodes.json" with {type: "json"};
import dataZH from "./nodes.zh.json" with {type: "json"};

const g1 = Object.groupBy(data, x => x.category + x.subcategory);
const g2 = Object.groupBy(dataZH, x => x.category + x.subcategory);

// console.log("EN nodes:", Object.entries(g1).map(([k, v]) => [k, v!.length]));
// console.log("ZH nodes:", Object.entries(g2).map(([k, v]) => [k, v!.length]));
//
// console.log(Object.entries(g2)[1][1])

const t: { [key: string]: string } = {
  "Input Parameter": "入参",
  "Output Parameter": "出参",
  "Enumeration": "枚举",
  "Complete list": "枚举列表",
  "Structure": "结构体",
  "Generic": "泛型",
  "Floating Point Numbers": "浮点数",
  "Boolean": "布尔值",
  "String": "字符串",
  "3D Vector": "三维向量",
  "Integer": "整数",
  "Entity": "实体",
  "Config ID": "配置ID",
  "Prefab ID": "元件ID",
  "Faction": "阵营",
  "Dictionary": "字典",
  "GUID": "GUID",
  "Integer List": "整数列表",
  "Floating Point Number List": "浮点数列表",
  "String List": "字符串列表",
  "3D Vector List": "三维向量列表",
  "Entity List": "实体列表",
  "Config ID List": "配置ID列表",
  "Faction List": "阵营列表",
  "GUID List": "GUID列表",
  "Generic List": "泛型列表",
  "Generic Dictionary": "泛型字典",
  "Local Variable": "局部变量",
  "Custom Variable Snapshot": "自定义变量快照",
  "": "!!保证不为空!!",
};

Object.entries(g1).forEach(([k, v], i) => {
  const v2 = Object.values(g2)[i];
  if (v!.length !== v2!.length) {
    console.log(`Mismatch in category ${k}: ${v!.length} (EN) vs ${v2!.length} (ZH)`);
  }
  v!.forEach((node, idx) => {
    const node2 = v2![idx];
    if (node.parameters.length !== node2.parameters.length) {
      console.log(`  Mismatch in node ${node.name}(${node2.name}) parameters: ${node.parameters.length} (EN) vs ${node2.parameters.length} (ZH)`);
    }
    for (let p = 0; p < node.parameters.length; p++) {
      const param1 = node.parameters[p];
      const param2 = node2.parameters[p];
      if (t[param1.type] !== param2.type) {
        console.log(`    Mismatch in parameter type: ${param1.type} (EN) vs ${param2.type} (ZH), node: ${node.name}(${node2.name}), param: ${param1.name}(${param2.name})`);
      }
      if (t[param1.dataType] !== param2.dataType) {
        console.log(`    Mismatch in parameter dataType: ${param1.dataType} (EN) vs ${param2.dataType} (ZH), node: ${node.name}(${node2.name}), param: ${param1.name}(${param2.name})`);
      }
    }
  });
});

assert(data.length === dataZH.length, `Node count mismatch: ${data.length} (EN) vs ${dataZH.length} (ZH)`);

console.log("Verification completed. No mismatches found.");