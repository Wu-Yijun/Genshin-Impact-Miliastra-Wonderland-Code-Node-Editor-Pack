
import { exit } from "process";
import { TypeEngine } from "./core.ts";
import { Doc } from "./instances.ts";
import * as NT from "./node_type.ts";

let fail = false;
// Helper to log results
const log = (label: string, valid: boolean, details?: any) => {
  console.log(`[${valid ? "PASS" : "FAIL"}] ${label}`);
  if (!valid && details) console.log("Details:", details);
  if (!valid) fail = true;
};

// Test Suite
const runTests = () => {
  const engine = Doc.Type;

  console.log("--- Starting TypeEngine Verification ---");

  // DEBUG: Inspect TypeEngine internal maps
  // Access private member via any cast
  const typeByStructure = (engine as any)._typeByStructure as Map<string, any>;
  if (!typeByStructure) {
    // Force init
    engine.getTypeByID(0);
  }
  const map = (engine as any)._typeByStructure as Map<string, any>;

  // 1. Test basic type conversion
  const intNode: NT.NodeType = { t: "b", b: "Int" };
  const intDef = engine.toTypeDef(intNode);
  log("Basic Type (Int) Lookup", !!intDef && intDef.Identifier === "Int", intDef);

  const unkNode: NT.NodeType = { t: "b", b: "Unk" };
  const unkDef = engine.toTypeDef(unkNode);
  log("Basic Type (Unk) Lookup", !!unkDef && unkDef.Identifier === "Unk", unkDef);
  const undNode: NT.NodeType = { t: "b", b: "Xyz" as "Unk" };
  const undDef = engine.toTypeDef(undNode);
  log("Basic Type (Undef) Lookup", !undDef, undDef);

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
  log("Dict Lossy Lookup", !!dictDef && dictDef.Identifier === "D<Unk,Unk>", dictDef?.Identifier);

  // 3. Test Full Dict Resolution
  const fullDict = engine.toTypeDefFull(dictNode);
  const validFullDict = fullDict &&
    fullDict.map_type &&
    fullDict.map_type[0].Identifier === "Str" &&
    fullDict.map_type[1].Identifier === "Int";
  log("Dict Full Resolution", !!validFullDict, {
    baseType: fullDict?.Identifier,
    mapKeys: fullDict?.map_type?.map(t => t.Identifier)
  });

  // 4. Test Enum Lookup
  // We need a valid Enum Identifier from the data to test properly.
  // For now, let's mock or just check logic safely.
  // Assuming "Unk" enum or similar exists.
  const enumNode: NT.NodeType = { t: "e", e: "Unk" }; // "Unk" as generic enum
  const enumDef = engine.toTypeDef(enumNode);
  // Should return E<Unk>
  log("Enum Lossy Lookup", !!enumDef && enumDef.Identifier === "E<Unk>", enumDef?.Identifier);

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
  const fullList = engine.toTypeDefFull(listNode);
  log("List Full Resolution", !!fullList && fullList.list_type?.Identifier === "Str", {
    baseType: fullList?.Identifier,
    listType: fullList?.list_type?.Identifier
  });

  console.log("--- Verification Complete ---");

  if (fail) exit(1);
};

runTests();