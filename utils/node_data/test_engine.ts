
import { TypeEngine } from "./core.ts";
import { Doc } from "./instances.ts";
import * as NT from "./node_type.ts";

// Helper to log results
const log = (label: string, valid: boolean, details?: any) => {
  console.log(`[${valid ? "PASS" : "FAIL"}] ${label}`);
  if (!valid && details) console.log("Details:", details);
};

// Test Suite
const runTests = () => {
  const engine = Doc.Type;

  console.log("--- Starting TypeEngine Verification ---");

  // 1. Test basic type conversion
  const intNode: NT.NodeType = { t: "b", b: "Int" };
  const intDef = engine.toTypeDef(intNode);
  log("Basic Type (Int) Lookup", !!intDef && intDef.BaseType === "Int", intDef);

  // 2. Test Dict lossy conversion
  const dictNode: NT.NodeType = {
    t: "d",
    k: { t: "b", b: "Str" },
    v: { t: "b", b: "Int" }
  };
  const dictDef = engine.toTypeDef(dictNode);
  // Should return generic D<Unk,Unk> or similar logic if implemented as lossy
  // Based on implementation: return this._typeByStructure!.get("D<Unk,Unk>");
  // We assume "D<Unk,Unk>" exists in the loaded data.
  log("Dict Lossy Lookup", !!dictDef && dictDef.BaseType === "D<Unk,Unk>", dictDef?.BaseType);

  // 3. Test Full Dict Resolution
  const fullDict = engine.toTypeDefFull(dictNode);
  const validFullDict = fullDict &&
    fullDict.map_type &&
    fullDict.map_type[0].BaseType === "Str" &&
    fullDict.map_type[1].BaseType === "Int";
  log("Dict Full Resolution", !!validFullDict, fullDict);

  // 4. Test Enum Lookup
  // We need a valid Enum Identifier from the data to test properly.
  // For now, let's mock or just check logic safely.
  // Assuming "Unk" enum or similar exists.
  const enumNode: NT.NodeType = { t: "e", e: "Unk" }; // "Unk" as generic enum
  const enumDef = engine.toTypeDef(enumNode);
  // Should return E<Unk>
  log("Enum Lossy Lookup", !!enumDef && enumDef.BaseType === "E<Unk>", enumDef?.BaseType);

  // 5. Test Full Enum Resolution
  // This requires a real Enum ID.
  // Let's try to grab a real EnumType if possible
  const firstEnumType = engine.enumTypes[0];
  if (firstEnumType) {
    const validEnumNode: NT.NodeType = { t: "e", e: firstEnumType.Identifier };
    const fullEnum = engine.toTypeDefFull(validEnumNode);
    log("Enum Full Resolution", !!fullEnum && fullEnum.enum_type?.Identifier === firstEnumType.Identifier, fullEnum?.enum_type);
  } else {
    console.warn("No EnumTypes found to test full resolution");
  }

  // 6. Test List
  const listNode: NT.NodeType = { t: "l", i: { t: "b", b: "Str" } };
  const listDef = engine.toTypeDef(listNode);
  // This might fail if L<Str> is not in data directly, depends on data.json content
  // But we can check full resolution which resolves inner item
  const fullList = engine.toTypeDefFull(listNode);
  log("List Full Resolution", !!fullList && fullList.list_type?.BaseType === "Str", fullList);

  console.log("--- Verification Complete ---");
};

runTests();
