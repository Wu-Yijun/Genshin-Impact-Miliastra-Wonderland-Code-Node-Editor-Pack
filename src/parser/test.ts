import { test } from "./parse_node.ts";
import { createParserState, tokenize } from "./tokenizer.ts";

class Test {
  static tokenizer() {
    const doc = "(a as dict<int, a>, b=c,)[x=y as int, z=b+c as string]()[](x)(y.z, a+b)(as int)[1=](l as list<str>)[x as dict<S<int, L<str>>,int>]";
    const s = createParserState(doc);
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "out"), { depth: null });
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "out"), { depth: null });
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "out"), { depth: null });
    console.dir(test.parse_args(s, "in"), { depth: null });
    console.dir(test.parse_args(s, "out"), { depth: null });
  }
  static evalNode() {
    const doc = `$((a, b)=>  (c + d) * e )
      $((a as int, b as list<str>)=>{return {x:b[0],y:b[a]}})[out1, out2=x+y as int]
    `;
    const s = createParserState(doc);
    // console.log(s);
    console.dir(test.parse_eval(s), { depth: null });
    console.dir(test.parse_eval(s), { depth: null });
  }
}


if (import.meta.main) {
  console.log("Running parser tests...");
  // Add test cases here in the future
  // Test.tokenizer();
  Test.evalNode();

  console.log("All tests passed!");
}