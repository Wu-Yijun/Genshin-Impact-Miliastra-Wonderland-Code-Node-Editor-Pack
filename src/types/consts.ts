import type { NodeType } from "../../utils/index.ts";
import { Counter } from "../../utils/index.ts";
import type { PatternTypes, Token } from "./types.ts";

export const IR_Id_Counter = new Counter();

export const UNK_TYPE: NodeType = { t: "b", b: "Unk" as "Int" } as const;

/** Default token fot quick access */
export const TOKENS = {
  //Parentheses, square brackets, curly braces, angle brackets
  openParentheses: { type: "brackets", value: "(", pos: 0 },
  openSquare: { type: "brackets", value: "[", pos: 0 },
  openCurly: { type: "brackets", value: "{", pos: 0 },
  openAngle: { type: "brackets", value: "<", pos: 0 },
  closeParentheses: { type: "brackets", value: ")", pos: 0 },
  closeSquare: { type: "brackets", value: "]", pos: 0 },
  closeCurly: { type: "brackets", value: "}", pos: 0 },
  closeAngle: { type: "brackets", value: ">", pos: 0 },
  comma: { type: "symbol", value: ",", pos: 0 },
  plus: { type: "math", value: "+", pos: 0 },
  minus: { type: "math", value: "-", pos: 0 },
  semicolon: { type: "symbol", value: ";", pos: 0 },
  equal: { type: "assign", value: "=", pos: 0 },
} as const satisfies Record<string, Token>;

/** Groups of brackets tokens for quick access */
export const TOKEN_GROUPS = {
  opening: [
    TOKENS.openParentheses,
    TOKENS.openSquare,
    TOKENS.openCurly,
    TOKENS.openAngle,
  ],
  closing: [
    TOKENS.closeParentheses,
    TOKENS.closeSquare,
    TOKENS.closeCurly,
    TOKENS.closeAngle,
  ],
} as const satisfies Record<string, Token[]>;


/** Tokenizer rules */
export const TOKENIZER_PATTERNS = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "comment", regex: /^\/\/.*/ },
  { type: "comment", regex: /^\/\*.*?\*\//s },
  { type: "arrow", regex: /^=>/ },
  { type: "equal", regex: /^==(=)?/ },
  { type: "notequal", regex: /^!=(=)?/ },
  { type: "assign", regex: /^=/ },
  { type: "ellipsis", regex: /^\.\.\./ },
  { type: "boolean", regex: /^(true|false)\b/ },
  { type: "identifier", regex: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
  { type: "float", regex: /^(([1-9]([0-9_]*)|0))\.([0-9]([0-9_]*))?|^\.([0-9]([0-9_]*))/ },
  { type: "int", regex: /^0[xX][0-9a-fA-F_]+/ },
  { type: "int", regex: /^0[oO][0-7_]+/ },
  { type: "int", regex: /^0[bB][01_]+/ },
  { type: "int", regex: /^0[dD][0-9_]+/ },
  { type: "int", regex: /^[1-9]([0-9_]*)|^0/ },
  { type: "string", regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'|^`(?:[^`\\]|\\.)*`/ },
  { type: "brackets", regex: /^[\[\]\(\)\{\}<>]/ },
  { type: "decorator", regex: /^[@]/ },
  { type: "dot", regex: /^[\.]/ },
  { type: "symbol", regex: /^[,;:]/ },
  { type: "math", regex: /^[+\-*\/^&|~!%]/ },
  { type: "Unknown", regex: /^./ },
] as const satisfies { type: PatternTypes; regex: RegExp }[];

export const BUILD_IN_SYS_NODE = [
  "If", "Switch", "Loop", "ForEach", "Selector",
  "SetVal", "In", "Out", "Trigger", "Timer", "Signal"
] as const;
export type BUILD_IN_SYS_NODE = typeof BUILD_IN_SYS_NODE[number];
export const BUILD_IN_SYS_NODE_Set = Object.freeze(new Set(BUILD_IN_SYS_NODE));
