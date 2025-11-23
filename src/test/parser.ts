import * as fs from "fs";
import { createParserState } from "../parser/tokenizer.ts"; //js
import { parseBlock } from "../parser/parseBlock.ts";

const str = fs.readFileSync("./src/test/test.ts").toString();

const i = performance.now();

/** Test tokenizer */
const state = createParserState(str);
// console.log(state);

/** Test parser */
const tree = parseBlock(state, true);

const j = performance.now();


console.dir(tree, { depth: null });
console.log("Parsing Elapse Time:", j - i, "ms");

