

import type { ImportDecl, IR_GraphModule } from "../types/IR.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { parseExecutionBlock } from "./parse_block.ts";
import { parseComponent } from "./parse_component.ts";
import { parseConst } from "./parse_const.ts";
import { parseGlobal, parseNodeVar } from "./parse_decl.ts";
import { expect, next, peek, peekIs, src_pos } from "./utils.ts";
import { name_style } from "./parse_utils.ts";

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
        ret.imports.push(parseImport(s));
        break;
      }
      case "declare": {
        if (peek(s, 1)?.value === "global") {
          ret.globals.push(parseGlobal(s));
        } else if (peek(s, 1)?.value === "namespace") {
          ret.node_vars.push(parseNodeVar(s));
        }
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
        ret.components.push(parseComponent(s));
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

export function parseImport(s: ParserState): ImportDecl {
  const ret: ImportDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(s), end: -1 },
    kind: "import",
    file_name: "",
    components: [],
    lambdas: [],
    defines: [],
  };

  expect(s, "identifier", "import");
  expect(s, "brackets", "{");
  while (peek(s)?.value !== "}") {
    const name = expect(s, "identifier");
    switch (name_style(name.value)) {
      case "UpperCamelCase": // Component
        ret.components.push(name.value);
        break;
      case "snake_case": // lambdas
        ret.lambdas.push(name.value);
        break;
      case "UPPER_SNAKE_CASE": // DEFINES
        ret.defines.push(name.value);
        break;
      case "_snake_case": // local
        ret.defines.push(name.value);
        console.warn("Should not import local variables:", name.value);
        break;
      // throw new Error("Cannot import local variables: " + name.value);
      case "lowerCamelCase":
      case "BAD":
        // throw new Error("Cannot import variables with bad names: " + name.value);
        console.warn("Importing bad names:", name.value);
        ret.defines.push(name.value);
        break;
    }
    if (peekIs(s, "symbol", ",")) {
      next(s);
    }
  }
  expect(s, "brackets", "}");
  expect(s, "identifier", "from");
  ret.file_name = expect(s, "string").value.slice(1, -1);

  if (peekIs(s, "symbol", ";")) {
    next(s);
  }

  ret._srcRange.end = src_pos(s, true);
  return ret;
}