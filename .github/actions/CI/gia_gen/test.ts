import { readdirSync, writeFileSync } from "fs";

console.log(readdirSync("./"))

// console.log(process.argv);
// console.log(import.meta);

writeFileSync("./dist/1.txt", "hello, world!");

console.log("Pass!");
