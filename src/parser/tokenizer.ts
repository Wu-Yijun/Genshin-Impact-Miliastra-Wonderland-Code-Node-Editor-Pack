
import { TOKENIZER_PATTERNS } from "../types/consts.ts";
import type { ParserState, Token } from "../types/parser.ts";

export function tokenEqual(t1: Token, t2: Token) {
  return t1.value === t2.value && t1.type === t2.type;
}

/** Create a new parser state */
export function createParserState(source: string): ParserState {
  const src = source.replaceAll("\r", "")
  const tokens = tokenize(src);
  return {
    tokens,
    index: 0,
    source: src,
  };
}


/** Simple tokenizer using scan rules */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < input.length) {
    let matched = false;

    for (const p of TOKENIZER_PATTERNS) {
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
        `Unexpected token near: ${input.slice(Math.max(0, pos - 5), pos + 20)
        }...`,
      );
    }
  }
  return tokens;
}

/** Get the source string between a pair of tokens, including themselves.  */
export function getSource(state: ParserState, start: Token, end: Token): string {
  return state.source.slice(start.pos, end.pos + end.value.length);
}
