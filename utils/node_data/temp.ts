import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import type { EnumDef, EnumTypeDef } from "./types.ts";
import { assert, assertDeepEq, assertEq, assertEqs, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
import * as NT from "./node_type.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), { indent: 2, maxLength: 120 })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

data.Nodes.forEach((node) => {
  node.FlowPins.forEach((pin) => pin.Description ??= {});
  node.DataPins.forEach((pin) => pin.Description ??= {});
  node.Variants?.forEach((variant) => {
    const t = NT.parse(variant.Constraints);
    assertEq(t.t, "s");
    assertEq(variant.Constraints, NT.stringify({ t: "s", f: t.f }));
    variant.Constraints = NT.stringify({ t: "c", c: t.f });
  });
})

save("data.json", data);


// IMPORTANT 提取 ENUM id 信息的很新颖的方法: 导入composite节点时是不检查内外一致性的, 因此可以手动生成接口而不用找到内部实际对应的节点......
// const g = decode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia");
// console.log(g.asset.graph.inner.graph.nodes)
// g.graph.graph!.inner.graph.repeat_interval = 0.1;
// g.graph.graph!.inner.graph.xxx_exposed_pin_index = 2;


// const input = g.graph.compositeDef?.inner.def.inputs!;
// const output = g.graph.compositeDef?.inner.def.outputs!;
// for (let id = 0; id < 20; id++) {
//   // let k = (id % 2) + 10000 * (id >> 1);
//   let k = id;
//   const i = structuredClone(input[0]);
//   i.name = "ClassBase_id_" + k;
//   i.type.class = 10002; // array base
//   // i.type.type1 = 18; // Enum list
//   // i.type.type2 = 18;
//   i.type.listType.item_type.class = 6; // enum base
//   i.type.listType.item_type.type1 = 10000 + k; // bool enum
//   i.type.listType.item_type.type2 = 14; // enum item
//   i.type.listType.item_type.enumType = { enumId: k };

//   // i.type.class = 6; // enum base
//   i.type.type1 = 18; // Enum list
//   i.type.type2 = 18; // Enum list
//   i.type.enumType = { enumId: k };
//   // i.type.listType = undefined;


//   // i.type.enumType = { enumId: k };
//   i.index.index = id + 1;
//   i.pinIndex = 50 + id;
//   input[id] = i;
//   const o = structuredClone(i);
//   o.index.kind = 4;
//   output[id] = o;
// }
// input[1] = structuredClone(input[0]);
// input[1].index.index = 1;
// // input[0].xxxx_always_1 = 100;
// input[0].type.special_pin_state = { state: 4 };
// encode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia", g)

// data.Enums.filter(x => x.System === "Client" && x.TypeID === undefined).forEach(e => {
//   // console.log(e.Identifier);
//   let p = new Set();
//   e.Items.forEach(i => {
//     const a = data.Enums.find(x => x.System === 'Server' && x.Items.find(y => y.ID === i.ID) !== undefined);
//     if (a !== undefined) {
//       p.add(a);
//     }
//   });
//   if (p.size !== 1) {
//     console.log(e.Identifier, p);
//   }
// })

// save("data.json", data);