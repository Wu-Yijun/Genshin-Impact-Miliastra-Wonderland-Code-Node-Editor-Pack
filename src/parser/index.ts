import { parse } from "./parser.ts";
import { tokenize, createParserState, ParserState } from "./tokenizer.ts";
import { post_lexing_disambiguation } from "./disambiguation.ts";
import { decompile, ir_to_string } from "./decompiler.ts";
import { src_pos } from "./utils.ts";


function safe_parse(src: string) {
  src = src.replaceAll("\r", "");
  let tokens;
  try {
    tokens = tokenize(src);
    tokens = post_lexing_disambiguation(tokens);
  } catch (e) {
    console.error(e);
    return null;
  }
  const state = ParserState(src, tokens);
  try {
    const ir = parse(state);
    return ir;
  } catch (e) {
    console.error(e);
    const failure = src_pos(state);
    console.log("Source: ");
    console.log(state.source.slice(failure - 10, failure + 20).replaceAll("\n", " "));
    console.log(" ".repeat(10) + "^");
    return null;
  }
}

export { safe_parse, src_pos, parse, tokenize, createParserState, post_lexing_disambiguation, decompile, ir_to_string };