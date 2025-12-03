import { decompile } from "./decompile.ts";
import { parseExecutionBlock } from "./parse_block.ts";
import { parseEval } from "./parse_node.ts";
import { parse_args } from "./parse_utils.ts";
import { parse } from "./parser.ts";
import { createParserState } from "./tokenizer.ts";

class Test {
  static tokenizer() {
    const doc = "(a as dict<int, a>, b=c,)[x=y as int, z=b+c as string]()[](x)(y.z, a+b)(as int)[1=](l as list<str>)[x as dict<S<int, L<str>>,int>]";
    const s = createParserState(doc);
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "out"), { depth: null });
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "out"), { depth: null });
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "out"), { depth: null });
    console.dir(parse_args(s, "in"), { depth: null });
    console.dir(parse_args(s, "out"), { depth: null });
  }
  static evalNode() {
    const doc = `$((a, b)=>  (c + d) * e )
      $((a as int, b as list<str>)=>{return {x:b[0],y:b[a]}})[out1, out2=x+y as int]
    `;
    const s = createParserState(doc);
    // console.log(s);
    console.dir(parseEval(s), { depth: null });
    console.dir(parseEval(s), { depth: null });
  }
  static executionBlock() {
    const doc = `[OnCreate()].MyComp(x)[y](
      true=$((x)=>x+1)[z].F(z) >> 0(),
      false = $((a as int, b as list<str>)=>{return {x:b[0],y:b[a]}})[out1, out2=x+y as int]
        >> {
          1: U(),
          2: V() >> "2"() >> false().W()
        },
    ) << G().R() >> S();
    `
    const s = createParserState(doc);
    const ir = parseExecutionBlock(s);
    // console.dir(ir, { depth: null });
    console.log(ir);
    console.log(decompile(ir));
  }

  static module() {
    const doc = `
    `
    const s = createParserState(doc);
    const ir = parse(s);
    // console.dir(ir, { depth: null });
    console.log(decompile(ir));
  }
}


if (import.meta.main) {
  console.log("Running parser tests...");
  // Add test cases here in the future
  // Test.tokenizer();
  // Test.evalNode();
  // Test.executionBlock();
  Test.module();

  console.log("All tests passed!");
}