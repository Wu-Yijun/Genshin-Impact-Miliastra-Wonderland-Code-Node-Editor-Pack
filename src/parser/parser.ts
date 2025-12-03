

import type { ImportDecl, IR_GraphModule } from "../types/IR.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { parseExecutionBlock } from "./parse_block.ts";
import { parseComponent } from "./parse_component.ts";
import { parseConst } from "./parse_const.ts";
import { parseGlobal, parseNodeVar } from "./parse_decl.ts";
import { peek, src_pos } from "./utils.ts";

/** Parse a whole document (Module) */
export function parse(s: ParserState): IR_GraphModule {
  const ret: IR_GraphModule = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "module",
    imports: [],
    globals: [],
    node_vars: [],
    local_vars: [],
    defines: [],
    components: [],
    lambdas: [],
    shared_funcs: [],
    graph: [],
  };
  let t;
  while (t = peek(s)) {
    switch (t.value) {
      case ";":
        continue;
      case "import": {
        ret.imports.push(parse_import(s));
        break;
      }
      case "global": {
        ret.globals.push(parseGlobal(s));
        break;
      }
      case "declare": {
        ret.node_vars.push(parseNodeVar(s));
        break;
      }
      case "const": {
        const res = parseConst(s);
        switch (res.kind) {
          case "localVar":
            ret.local_vars.push(res);
            break;
          case "define":
            ret.defines.push(res);
            break;
          case "shared":
            ret.shared_funcs.push(res);
            break;
          case "lambda":
            ret.lambdas.push(res);
            break;
        }
        break;
      }
      case "function": {
        ret.shared_funcs.push(parseComponent(s));
        break;
      }
      case "[":
      case "Branch": {
        ret.graph.push(parseExecutionBlock(s));
        break;
      }
      default:
        throw new Error(`Unexpected token: ${t.value}`);
    }
  }

  ret._srcRange.end = src_pos(s, true);
  return ret;
}

function parse_import(s: ParserState): ImportDecl {
}