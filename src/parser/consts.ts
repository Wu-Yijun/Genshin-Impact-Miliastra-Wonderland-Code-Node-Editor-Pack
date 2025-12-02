import type { PatternTypes, Token } from "./types.ts";

/** Default token fot quick access */
export const TOKENS = {
  //Parentheses, square brackets, curly braces, angle brackets
  openParentheses: { type: "brackets", value: "(", pos: 0 },
  openSquare: { type: "brackets", value: "[", pos: 0 },
  openCurly: { type: "brackets", value: "{", pos: 0 },
  openAngle: { type: "symbol", value: "<", pos: 0 },
  closeParentheses: { type: "brackets", value: ")", pos: 0 },
  closeSquare: { type: "brackets", value: "]", pos: 0 },
  closeCurly: { type: "brackets", value: "}", pos: 0 },
  closeAngle: { type: "brackets", value: ">", pos: 0 },
  comma: { type: "symbol", value: ",", pos: 0 },
} as const satisfies Record<string, Token>;

/** Groups of brackets tokens for quick access */
export const TOKEN_GROUPS = {
  opening: [
    TOKENS.openParentheses,
    TOKENS.openSquare,
    TOKENS.openCurly,
  ],
  closing: [
    TOKENS.closeParentheses,
    TOKENS.closeSquare,
    TOKENS.closeCurly,
  ],
} as const satisfies Record<string, Token[]>;


/** Tokenizer rules */
export const patterns = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "comment", regex: /^\/\/.*/ },
  { type: "comment", regex: /^\/\*.*?\*\//s },
  { type: "right", regex: /^>>/ },
  { type: "left", regex: /^<</ },
  { type: "equal", regex: /^==(=)?/ },
  { type: "assign", regex: /^=/ },
  { type: "ellipsis", regex: /^\.\.\./ },
  { type: "boolean", regex: /^(true|false)\b/ },
  { type: "identifier", regex: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
  { type: "float", regex: /^([0-9]*)\.([0-9]([0-9_]*))?/ },
  { type: "int", regex: /^[0-9]([0-9_]*)/ },
  { type: "string", regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'|^`(?:[^`\\]|\\.)*`/ },
  { type: "brackets", regex: /^[\[\]\(\)\{\}]/ },
  { type: "decorator", regex: /^[@]/ },
  { type: "dot", regex: /^[\.]/ },
  { type: "symbol", regex: /^[,;:<>]/ },
  { type: "math", regex: /^[+\-*\/^&|~!%|]/ },
  { type: "Unknown", regex: /^./ },
] as const satisfies { type: PatternTypes; regex: RegExp }[];