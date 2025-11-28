export interface Token {
  type: PatternTypes;
  value: string;
  pos: number;
}
export function tokenEqual(t1: Token, t2: Token) {
  return t1.value === t2.value && t1.type === t2.type;
}
export const TOKENS: Record<string, Token> = {
  //Parentheses, square brackets, curly braces, angle brackets
  openParentheses: { type: "symbol", value: "(", pos: 0 },
  openSquare: { type: "symbol", value: "[", pos: 0 },
  openCurly: { type: "symbol", value: "{", pos: 0 },
  openAngle: { type: "symbol", value: "<", pos: 0 },
  closeParentheses: { type: "symbol", value: ")", pos: 0 },
  closeSquare: { type: "symbol", value: "]", pos: 0 },
  closeCurly: { type: "symbol", value: "}", pos: 0 },
  closeAngle: { type: "symbol", value: ">", pos: 0 },
  comma: { type: "symbol", value: ",", pos: 0 },
};
export const TOKEN_GROUPS: Record<string, Token[]> = {
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
};

export interface ParserState {
  tokens: Token[];
  index: number;
  source: string;
}

/** Create a new parser state */
export function createParserState(source: string): ParserState {
  const tokens = tokenize(source);
  return {
    tokens,
    index: 0,
    source,
  };
}

export type PatternTypes =
  | "whitespace"
  | "comment"
  | "arrow"
  | "goto"
  | "ellipsis"
  | "boolean"
  | "identifier"
  | "int"
  | "float"
  | "string"
  | "symbol"
  | "math"
  | "Unknown";

/** Tokenizer rules */
const patterns: { type: PatternTypes; regex: RegExp }[] = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "comment", regex: /^\/\/.*/ },
  { type: "arrow", regex: /^=>/ },
  { type: "goto", regex: /^>>/ },
  { type: "ellipsis", regex: /^\.\.\./ },
  { type: "boolean", regex: /^(true|false)\b/ },
  { type: "identifier", regex: /^[A-Za-z_][A-Za-z0-9_]*/ },
  { type: "float", regex: /^(-?)([0-9]+)\.[0-9]([0-9_]*)/ },
  { type: "int", regex: /^(-?)[0-9]+/ },
  {
    type: "string",
    regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'|^`(?:[^`\\]|\\.)*`/,
  },
  { type: "symbol", regex: /^==/ },
  { type: "symbol", regex: /^[\[\]\(\)\{\}\.,;:<>=$]/ },
  { type: "math", regex: /^[+\-*\/^&|~!%|]/ },
  { type: "Unknown", regex: /^./ },
];

/** Main tokenizer */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < input.length) {
    let matched = false;

    for (const p of patterns) {
      const m = p.regex.exec(input.slice(pos));
      if (m) {
        matched = true;
        const text = m[0];

        if (p.type !== "whitespace" && p.type !== "comment") {
          tokens.push({
            type: p.type,
            value: text,
            pos,
          });
        }

        pos += text.length;
        break;
      }
    }

    if (!matched) {
      throw new Error(
        `Unexpected token near: ${
          input.slice(Math.max(0, pos - 5), pos + 20)
        }...`,
      );
    }
  }

  return tokens;
}
