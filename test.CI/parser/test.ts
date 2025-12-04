import { src_pos, createParserState, parse, decompile, ir_to_string, safe_parse } from "../../src/parser/index.ts";

import { readFileSync, writeFileSync } from "fs";
import { inspect } from "util";
import assert from "assert";

function BigIntStringify(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string
  }
  return value; // Return other values unchanged
}

function compile(dsl: string) {
  console.log("Testing parser and decompiling")
  console.log("The original DSL is:", JSON.stringify(dsl.slice(0, 40)), "... <", dsl.length, "in total >");
  try {
    const ir = safe_parse(dsl);
    console.log("Compile Ok!", "A brief view of IR:");
    console.log(inspect(ir, { depth: 2 }));
    writeFileSync("./dist/IR.json", JSON.stringify(ir, BigIntStringify, 2));
    console.log("IR saved to `dist/IR.json`");
    return ir;
  } catch (e) {
    console.error(e);
  }
}

function main() {
  const dsl = readFileSync(import.meta.dirname + "/test.dsl.ts").toString().replaceAll("\r", "");
  const ir = compile(dsl);

  if (!ir) return;

  console.log("\nFile structure is:");
  console.log(ir_to_string(ir, dsl));

  console.log("\nDecompiling");
  const dsl_new = decompile(ir);
  console.log("Decompile Ok!", "Generated DSL is:");
  console.log(dsl_new);
  writeFileSync("./dist/GeneratedDSL.dsl.ts", dsl_new);
  console.log("Decompile IR to generated DSL saved to `dist/GeneratedDSL.dsl.ts`");
}

/** After `dsl -> IR1 -> DSL1 -> IR2 -> DSL2`
 * - Check if `IR1 === IR2`
 * - Check if `DSL1 === DSL2`
 * */
function double_check() {
  function remove_id(p: any) {
    if (!p) return p;
    if (typeof p === "object") {
      if (p instanceof Array) {
        p.forEach(remove_id);
      } else {
        delete p._id;
        delete p._srcRange;
        delete p.pos;
        Object.values(p).forEach(remove_id);
      }
    }
    return p;
  }

  const dsl = readFileSync(import.meta.dirname + "/test.dsl.ts").toString().replaceAll("\r", "");
  const ir1 = safe_parse(dsl)!;
  const dsl1 = decompile(ir1);
  const ir2 = safe_parse(dsl1)!;
  const dsl2 = decompile(ir2);
  console.log("Double parsing done. Checking...")
  assert(dsl1 === dsl2, "DSL1 !== DSL2");
  const IR1 = JSON.stringify(remove_id(ir1), BigIntStringify);
  const IR2 = JSON.stringify(remove_id(ir2), BigIntStringify);
  assert(IR1 === IR2, "IR1 !== IR2");
  console.info("Double check passed");
}



if (import.meta.main) {
  main();
  double_check();
}