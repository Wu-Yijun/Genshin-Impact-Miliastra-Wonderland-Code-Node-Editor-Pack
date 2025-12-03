import type { IR_ExecutionBlock, IR_Node, IR_NodeChain, IRExtend } from "../types/IR.ts";

const TAB_WIDTH = 2;

/** Convert any IR back into code */
export function decompile(ir: IRExtend, tab: number = 0) {
  switch (ir.kind) {
    case "call":
    case "eval":
    case "branch":
    case "anchor":
    case "jump":
    case "inout":
      return decompile_node(ir, tab); // F(x) 
    case "trigger":
      return decompile_trigger(ir, tab); // [Trigger]
    case "shared":
    case "define":
    case "localVar":
      return decompile_decl(ir, tab); // const ... = ... ;
    case "import":
      return decompile_import(ir, tab); // import {...} from ... ;
    case "struct":
    case "globalVar":
    case "timer":
    case "signal":
    case "nodeVar":
      return decompile_fields(ir, tab); // interface/namespace {\n \TAB ... }
    case "global":
      return decompile_global(ir, tab); // declare global {\n \TAB ... \n}
    case "lambda":
      return decompile_lambda(ir, tab); // const ... = (args) => {\n ... \n};
    case "chain":
      return decompile_chain(ir, tab); // \n \TAB "<<"/">>"/"." ...
    case "block":
      return decompile_block(ir, tab); // \n [starter] chain;
    case "module":
      return decompile_module(ir, tab); // Everything      
  }
  throw new Error(`Unknown IR: ${ir}`);
}

function decompile_node(ir: IR_Node, tab: number = 0) {
  switch (ir.kind) {
    case "call":
    case "eval":
    case "branch":
    case "anchor":
    case "jump":
    case "inout":
  }
}

function decompile_block(ir: IR_ExecutionBlock, tab: number = 0) {

}

// ...