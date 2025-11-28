import type { ParserState, Token } from "./tokenizer.ts";
import { tokenEqual } from "./tokenizer.ts"; //js
import { expect, next, peek } from "./utils.ts"; //js

export function extractBalancedTokens(
  state: ParserState,
  open: string,
  close: string,
  depth = 0,
): Token[] {
  const token: Token[] = [];

  // consume opening
  if (depth === 0) {
    token.push(expect(state, "symbol", open));
    depth++;
  }

  while (state.index < state.tokens.length) {
    const t = peek(state);
    if (!t) break;

    if (t.type === "symbol" && t.value === open) {
      depth++;
    } else if (t.type === "symbol" && t.value === close) {
      depth--;
    }

    token.push(t);
    next(state);

    if (depth === 0) break;
  }

  if (depth !== 0) throw new Error("Unbalanced parentheses");

  return token;
}
/** Extract text inside balanced parentheses, including outer "()" */
export function extractBalanced(
  state: ParserState,
  open: string,
  close: string,
  depth: number = 0,
): string {
  return extractBalancedTokens(state, open, close, depth).map((t) => t.value)
    .join(" ");
}

export function splitBalancedTokens(
  tokens: Token[],
  open: Token[],
  close: Token[],
  divider: Token[],
): Token[][] {
  const res: Token[][] = [];
  let i = 0;
  while (i < tokens.length) {
    const from = i;
    let d = 0;
    do {
      const t = tokens[i];
      i += 1;
      if (d === 0 && divider.some((t2) => tokenEqual(t, t2))) {
        break;
      } else if (open.some((t2) => tokenEqual(t, t2))) {
        d += 1;
      } else if (close.some((t2) => tokenEqual(t, t2))) {
        d -= 1;
      }
    } while (i < tokens.length);
    if (d !== 0) {
      throw new Error("tokens unbalanced!");
    }
    let j = i - 1;
    if (divider.some((t2) => tokenEqual(tokens[j], t2))) {
      j -= 1;
    }
    res.push(tokens.slice(from, j + 1));
  }
  return res;
}
