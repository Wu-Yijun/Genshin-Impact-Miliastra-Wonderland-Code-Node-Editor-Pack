import { decompile, ir_to_string } from "./decompiler.ts";
import { parseExecutionBlock } from "./parse_block.ts";
import { parseEval } from "./parse_node.ts";
import { parse_args } from "./parse_utils.ts";
import { parse } from "./types.ts";
import { createParserState } from "./tokenizer.ts";
import { src_pos } from "./utils.ts";

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
    // import {MyComp, my_add, MY_CONST} from "./file.dsl.ts";
    // declare global {
    //   namespace Self {
    //     const x: int;
    //     const y: str = "123";
    //     const z = 123.45;
    //     const w = GUID(123);
    //     const a = Vec([1,2,3]);
    //     const b:Dict<Int,Vec> = [[1,[4,5,6]]];
    //     const b = Dict<ConfigId,List<Vec>>({1:[[4,5,6]]});
    //   }
        
    //   namespace Timer {
    //     const x: Count<10>;
    //     const y: CountDown<12>;
    //   }
    // }
    // declare global {
    //   namespace Signal {
    //     function MySig(name: int, pos: Vector): Signal;
    //   }
    //   // 2. 定义自定义数据结构
    //   interface PlayerData {
    //     id: int;
    //     name: string;
    //   }
    // }

    // declare namespace node {
    //   export const nodeVar1 = 1;
    //   const nodeVar2 = [1,2,3];
    // }

    const _local_var1 = true;
    const _local_var2 = Entity(12);

    // const DEFINE_A = 1;
    // const DEFINE_B:GUID = 23456787654;

    // const my_add = (a:int,b:int)=>{
    //   const c = a+b;
    //   return c;
    // };

    function MyComp(x:vec, y:str){
      const _comp_local = 1;
      In().Out("branch1");
      In("2").Out(2);
      return ExecFun<{a:guid,b:int}>("branch1",2,true);
    }

    const P1 = Shared(MyComp);
    const P2 = Shared(MyComp, "2");

    Branch["aaa"].FunX().FunY() >> {
      0: U(),
      1: 1(),
    } >> 2() << Fun().$((x)=>x)[y].If(y===0)(
      true = 0(),
      false = Log("Hello") >> 1()
    ) >> Log("Bye").Branch["bbb"]
      .SetVal(Self.x, 100);
    
    [Signal(Signal.Sig1, "1", 2)] >> "bbb"();
    [Timer(Timer.time)] >> "bbb"();

    `
    const s = createParserState(doc);
    try {
      const ir = parse(s);

      console.log(decompile(ir));
      console.log(ir_to_string(ir, doc));
    } catch (e) {
      console.error(e);
      const failure = src_pos(s);
      console.log("Source: ");
      console.log(s.source.slice(failure - 10, failure + 20).replaceAll("\n", " "));
      console.log(" ".repeat(10) + "^");
    }
    // console.dir(ir, { depth: null });
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