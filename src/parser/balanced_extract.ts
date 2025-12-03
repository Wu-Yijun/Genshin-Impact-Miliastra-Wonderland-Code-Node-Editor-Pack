import { tokenEqual } from "./tokenizer.ts";
import type { ParserState, Token } from "../types/parser.ts";
import { expect, next, peek } from "./utils.ts";

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

/** Extract content inside balanced tokens, excluding the outer tokens */
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
      throw new Error("tokens terminate but unbalanced!");
    }
    let j = i - 1;
    if (divider.some((t2) => tokenEqual(tokens[j], t2))) {
      j -= 1;
    }
    res.push(tokens.slice(from, j + 1));
  }
  return res;
}

// type := identifier ( "<" type ( "," type )? ">" )?
export function try_capture_type(tokens: Token[], from: number, look_back: boolean = false): { success: boolean, tokens: Token[] } {
  const dir = look_back ? -1 : 1;
  const res = { success: true, tokens: [] as Token[] };
  if (!look_back) {
    if (tokens[from]?.type !== "identifier") return { success: false, tokens: [] };
    res.tokens.push(tokens[from]);
  }
  if (tokens[from + dir * res.tokens.length]?.value === "<") {
    res.tokens.push(tokens[from + dir * res.tokens.length]);
    const arg = try_capture_type(tokens, from + dir * res.tokens.length, look_back);
    if (!arg.success) return { success: false, tokens: [] };
    res.tokens.push(...arg.tokens);
    while (tokens[from + dir * res.tokens.length]?.value === ",") {
      res.tokens.push(tokens[from + dir * res.tokens.length]);
      const arg = try_capture_type(tokens, from + dir * res.tokens.length, look_back);
      if (!arg.success) return { success: false, tokens: [] };
      res.tokens.push(...arg.tokens);
    }
    if (tokens[from + dir * res.tokens.length]?.value === ">") {
      res.tokens.push(tokens[from + dir * res.tokens.length]);
      return res;
    }
    if (look_back) {
      if (tokens[from]?.type !== "identifier") return { success: false, tokens: [] };
      res.tokens.push(tokens[from]);
    }
    return { success: false, tokens: [] };
  }
  return res;
}