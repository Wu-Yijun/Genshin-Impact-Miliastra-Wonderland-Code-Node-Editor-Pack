import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
// const short = readFileSync(import.meta.dirname + "/temp.txt").toString().replaceAll("\r", "").split("\n\n").map(x => {
//   const keys = x.split("\n").map(y => y.slice(0, y.lastIndexOf(":")).trim());
//   const vals = x.split("\n").map(y => y.slice(y.lastIndexOf(":") + 1).trim());
//   assert(keys.every(x => x.length > 0));
//   assert(vals.every(x => x.length > 0));
//   assert(vals[0].length === 4);
//   return {
//     key: keys[0],
//     keyv: vals[0],
//     vals: keys.slice(1),
//     valsv: vals.slice(1),
//   };
// });

// data.Enums.forEach((x, i) => {
//   const s = short[i];
//   assertEq(s.key, x.InGameName.en);
//   // if (x.InGameName.en === "Generic") return;
//   if (![58, 59].includes(i)) assertEq(s.valsv.length, x.Items.length);
//   x.Identifier = s.keyv;
//   x.Items.forEach((y, j) => y.Identifier = s.valsv[j]);
// });
// // console.log(ret);
// console.log(data.Enums);

// // const fcc = [];
// // fcc

// writeFileSync(import.meta.dirname + "/data.json", JSON.stringify(data, null, 2));

// data.Enums.every(x => x.Identifier.length === 4 && /[A-Z]{4}/.test(x.Identifier));
// data.Enums.every(x => x.Items.every(y => y.Identifier.length > 0 && /^[a-z_0-9]+$/.test(y.Identifier)));

// const p = data.Enums.map(x => x.Identifier);
// assertEq(p.length, new Set(p).size)

// const m = new Map();
// data.Enums.forEach(x => {
//   x.Items.forEach(z => {
//     // const y = exclude_keys(z, "Alias");
//     const y = z;
//     if (m.has(y.ID)) {
//       assertDeepEq(y, m.get(y.ID));
//     } else {
//       m.set(y.ID, y);
//     }
//   });
// })