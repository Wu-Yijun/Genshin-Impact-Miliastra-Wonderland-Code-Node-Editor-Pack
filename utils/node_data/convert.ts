import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), {
    //   indent: 2,
    //   maxLength: 120 // 关键：超过 120 字符才换行
    // })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others
// TODO: get Enum Real Id

// TODO: 添加 index of type selector


save("data.json", data);
exit();
import { NodesList as old } from "./data.ts";
import { exit } from "process";
data.Nodes.forEach(node => {
  if (node.Variants === undefined) return;
  const ref = old.filter(x => x.ID === node.ID);
  assert(ref.length === 1);
  assertEq(node.Variants.length, ref[0].TypeMappings?.length);
  const in_n = node.DataPins.filter(x => x.Direction === "In" && /R<.+>/.test(x.Type));
  const out_n = node.DataPins.filter(x => x.Direction === "Out" && /R<.+>/.test(x.Type));
  node.Variants.forEach((variant, i) => {
    assert(variant.InjectedContents.length === 0);
    const old_id = variant.Constraints.replace(/\b[A-Z]{4}\b/g, x => data.Enums.find(y => y.Identifier === x)!.ID.toString());
    assertEq(old_id, ref[0].TypeMappings![i].Type);
    // console.log(node.Identifier);
    let cnt = 0;
    ref[0].TypeMappings![i].InputsIndexOfConcrete.forEach((x, j) => {
      if (x === null) {
        assert(in_n[cnt]?.ShellIndex !== j);
        return;
      }
      const n = in_n[cnt++];
      assertEq(n.ShellIndex, j);
      (variant.InjectedContents as any).push({
        PinIdentifier: n.Identifier,
        TypeSelectorIndex: x,
      });
    });
    assertEq(cnt, in_n.length);
    if (ref[0].TypeMappings![i].InputsIndexOfConcrete.length !== node.DataPins.filter(x => x.Direction === "In").length) {
      console.log("In Len unequal", node.ID, node.Identifier);
      // Manually check pass
    }
    cnt = 0;
    ref[0].TypeMappings![i].OutputsIndexOfConcrete.forEach((x, j) => {
      if (x === null) {
        assert(out_n[cnt]?.ShellIndex !== j);
        return;
      }
      const n = out_n[cnt++];
      assertEq(n.ShellIndex, j);
      (variant.InjectedContents as any).push({
        PinIdentifier: n.Identifier,
        TypeSelectorIndex: x,
      })
    });
    assertEq(cnt, out_n.length);
    assertEq(ref[0].TypeMappings![i].OutputsIndexOfConcrete.length, node.DataPins.filter(x => x.Direction === "Out").length);
  })
});


save("data.json", data);