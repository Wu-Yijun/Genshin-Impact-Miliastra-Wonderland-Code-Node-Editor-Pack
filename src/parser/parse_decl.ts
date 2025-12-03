import type { GlobalDecl, GlobalVarDecl, NodeVarDecl, SignalDecl, StructDecl, TimerDecl } from "../types/IR_decl.ts";
import type { ParserState } from "../types/parser.ts";

import { IR_Id_Counter } from "../types/consts.ts";
import { try_capture_type } from "./balanced_extract.ts";
import { parse_type, parse_var_decl } from "./parse_utils.ts";
import { assert, assertEq, expect, next, peek, peekIs, src_pos } from "./utils.ts";

/** 全局声明和定义 (全部文件可用)
 * ```ts
 *  declare global {
 *    // StructDecls
 *    // GlobalVarDecls
 *    // TimerDecls
 *    // SignalDecls
 *  }
 * ```
 */
export function parseGlobal(state: ParserState): GlobalDecl {
  const ret: GlobalDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "global",
    structs: [],
    globals: [],
    timers: [],
    signals: [],
  };

  expect(state, "identifier", "declare");
  expect(state, "identifier", "global");
  expect(state, "brackets", "{");

  while (!peekIs(state, "brackets", "}")) {
    const t = peek(state);
    if (!t) break;
    if (peekIs(state, "symbol", ";")) {
      next(state);
      continue;
    }
    if (t.value === "interface") {
      ret.structs.push(parseStruct(state));
      continue;
    } else if (t.value === "namespace") {
      const ns = parseNamespace(state);
      // Distribute namespace contents based on namespace name
      if (ns.name === "Self") {
        ret.globals.push(...ns.globals);
        continue;
      } else if (ns.name === "Timer") {
        ret.timers.push(...ns.timers);
        continue;
      } else if (ns.name === "Signal") {
        ret.signals.push(...ns.signals);
        continue;
      }
    }
    console.warn("Unknown global member:", t.value);
    next(state); // Skip unknown tokens
  }

  expect(state, "brackets", "}");

  ret._srcRange.end = src_pos(state);
  return ret;
}

/** 声明节点图变量 (每个实体的每个节点图一个实例)
 * ```ts
 *  declare namespace node {
 *    export const varName: type = defaultValue;
 *  }
 * ```
 */
export function parseNodeVar(state: ParserState): NodeVarDecl[] {
  const ret: NodeVarDecl[] = [];

  expect(state, "identifier", "declare");
  expect(state, "identifier", "namespace");
  expect(state, "identifier", "node");
  expect(state, "brackets", "{");


  while (!peekIs(state, "brackets", "}")) {
    const res: NodeVarDecl = {
      _id: IR_Id_Counter.value,
      _srcRange: { start: src_pos(state), end: -1 },
      kind: "nodeVar",
      name: "",
      type: undefined as any,
      default: undefined as any,
      export: false,
    };
    // Check for export keyword
    if (peekIs(state, "identifier", "export")) {
      next(state);
      res.export = true;
    }

    expect(state, "identifier", "const");
    const { name, value } = parse_var_decl(state);
    res.name = name
    res.default = value;
    res.type = value.type;

    if (res.name[0] === "_" || res.name[0].toUpperCase() === res.name[0]) {
      console.warn("Bad global variable name:", res.name);
    }

    if (peekIs(state, "symbol", ";")) {
      next(state);
    }
    res._srcRange.end = src_pos(state);
    ret.push(res);
  }

  expect(state, "brackets", "}");

  return ret;
}

/** 声明自定义数据结构
 * ```ts
 *  interface StructName {
 *    name: type = defaultValue;
 *  }
 * ```
 */
function parseStruct(state: ParserState): StructDecl {
  const ret: StructDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "struct",
    name: "",
    fields: [],
  };

  expect(state, "identifier", "interface");
  ret.name = expect(state, "identifier").value;
  expect(state, "brackets", "{");

  while (!peekIs(state, "brackets", "}")) {
    const { name, value } = parse_var_decl(state);
    ret.fields.push({
      name: name,
      type: value.type,
      default: value,
    });

    if (peekIs(state, "symbol", ";")) {
      next(state);
    }
  }

  expect(state, "brackets", "}");

  ret._srcRange.end = src_pos(state);
  return ret;
}

/** Parse namespace declarations (Self, Timer, Signal) */
function parseNamespace(state: ParserState): {
  name: string;
  globals: GlobalVarDecl[];
  timers: TimerDecl[];
  signals: SignalDecl[];
} {
  const result = {
    name: "",
    globals: [] as GlobalVarDecl[],
    timers: [] as TimerDecl[],
    signals: [] as SignalDecl[],
  };

  expect(state, "identifier", "namespace");
  result.name = expect(state, "identifier").value;
  expect(state, "brackets", "{");

  while (!peekIs(state, "brackets", "}")) {
    const t = peek(state);
    if (!t) break;

    if (result.name === "Self" && t.value === "const") {
      result.globals.push(parseGlobalVar(state));
    } else if (result.name === "Timer" && t.value === "const") {
      result.timers.push(parseTimer(state));
    } else if (result.name === "Signal" && t.value === "function") {
      result.signals.push(parseSignal(state));
    } else {
      console.warn("Unknown namespace member:", t.value);
      next(state); // Skip unknown tokens
    }
  }

  expect(state, "brackets", "}");
  return result;
}

/** 声明实体的全局变量 (每个实体一个实例, 所有节点图可访问)
 * ```ts
 *  namespace Self {
 *    const varName: type = defaultValue;
 *  }
 * ```
 */
function parseGlobalVar(state: ParserState): GlobalVarDecl {
  const ret: GlobalVarDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "globalVar",
    name: "",
    type: undefined as any,
    default: undefined as any,
  };

  expect(state, "identifier", "const");
  const { name, value } = parse_var_decl(state);
  ret.name = name
  ret.default = value;
  ret.type = value.type;

  if (ret.name[0] === "_" || ret.name[0].toUpperCase() === ret.name[0]) {
    console.warn("Bad global variable name:", ret.name);
  }

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}


/** 声明全局计时器
 * ```ts
 *  namespace Timer {
 *    const five_second: CountDown<5>;
 *    const time: Count<10>;
 *  }
 * ```
 */
function parseTimer(state: ParserState): TimerDecl {
  const ret: TimerDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "timer",
    name: "",
    time: 0,
    countdown: false,
  };

  expect(state, "identifier", "const");
  ret.name = expect(state, "identifier").value;
  expect(state, "symbol", ":");

  const timerType = expect(state, "identifier").value;
  assertEq(timerType, "Count", "CountDown")
  ret.countdown = timerType === "CountDown";

  expect(state, "symbol", "<");
  const timeValue = expect(state, "int").value;
  ret.time = parseInt(timeValue);
  expect(state, "symbol", ">");

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}

/** 声明全局可发送和接收的信号
 * ```ts
 *  namespace Signal {
 *    function signal_name(args: types): Signal;
 *  }
 * ```
 */
function parseSignal(state: ParserState): SignalDecl {
  const ret: SignalDecl = {
    _id: IR_Id_Counter.value,
    _srcRange: { start: src_pos(state), end: -1 },
    kind: "signal",
    name: "",
    params: [],
  };

  expect(state, "identifier", "function");
  ret.name = expect(state, "identifier").value;

  expect(state, "brackets", "(");
  while (!peekIs(state, "brackets", ")")) {
    const paramName = expect(state, "identifier").value;
    expect(state, "symbol", ":");
    const typed = try_capture_type(state.tokens, state.index);
    assert(typed.success, "Failed to parse type");
    state.index += typed.tokens.length;
    const paramType = parse_type(typed.tokens);

    ret.params.push({ name: paramName, type: paramType });

    if (peekIs(state, "symbol", ",")) {
      next(state);
    }
  }
  expect(state, "brackets", ")");

  // Skip return type annotation
  if (peekIs(state, "symbol", ":")) {
    next(state);
    expect(state, "identifier", "Signal");
  }

  if (peekIs(state, "symbol", ";")) {
    next(state);
  }

  ret._srcRange.end = src_pos(state);
  return ret;
}
