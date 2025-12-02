import type { ParserState, PatternTypes, Token } from "../types/parser.ts";

/** Get current token */
export function peek(state: ParserState): Token | null {
  return state.tokens[state.index] || null;
}

/** Lookahead n tokens */
export function lookahead(state: ParserState, n: number): Token | null {
  return state.tokens[state.index + n] || null;
}

/** Advance and return next token */
export function next(state: ParserState): Token {
  const t = state.tokens[state.index];
  if (!t) throw new Error("Unexpected end of input");
  state.index++;
  // console.log(t);
  return t;
}

/** Whether next token matches */
export function match(
  state: ParserState,
  type: string,
  value?: string,
): Token | null {
  const t = peek(state);
  if (!t) return null;

  if (t.type !== type) return null;
  if (value != null && t.value !== value) return null;

  next(state);
  return t;
}

/** Require next token to match, otherwise throw */
export function expect(
  state: ParserState,
  type: string,
  value?: string,
): Token {
  const t = match(state, type, value);
  if (!t) {
    const p = peek(state);
    throw new Error(
      `Expected ${type}${value ? `(${value})` : ""} but got ${
        p ? `${p.type}(${p.value})` : "EOF"
      }`,
    );
  }
  return t;
}

export function expectIdentifier(
  state: ParserState,
  name: string,
): Token {
  return expect(state, "identifier", name);
}

/** Check without consuming */
export function peekIs(
  state: ParserState,
  type: PatternTypes,
  value?: string,
): boolean {
  const t = peek(state);
  if (!t) return false;
  if (t.type !== type) return false;
  if (value != null && t.value !== value) return false;
  return true;
}

/** Check identifier */
export function peekIsIdentifier(state: ParserState, name: string): boolean {
  const t = peek(state);
  return !!(t && t.type === "identifier" && t.value === name);
}

/** Check ID Literal
 * string: "BranchId"
 * int: -1234
 * boolean: true
 * null: null
 */
export function peekIsIdLiteral(state: ParserState): boolean {
  const t = peek(state);
  if (!t) {
    return false;
  }
  if (t.type === "string" || t.type === "int" || t.type === "boolean") {
    return true;
  }
  if (t.type === "identifier" && t.value === "null") {
    return true;
  }
  return false;
}

export function assert<L, R>(l: L, r: L | R, r2?: L | R) {
  if (l === r) {
    return;
  }
  if (l === r2) {
    return;
  }
  throw new Error(`The '${l}' is not strict Equal to '${r}'!`);
}
