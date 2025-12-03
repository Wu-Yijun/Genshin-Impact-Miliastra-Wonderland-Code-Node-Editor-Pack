import type { ParserState, PatternTypes, Token } from "../types/parser.ts";

/** Get current token */
export function peek(state: ParserState, offset = 0): Token | null {
  return state.tokens[state.index + offset] ?? null;
}

// export function src_pos(state: ParserState, to_end = false): number {
export function src_pos(state: ParserState): number {
  if (state.index >= state.tokens.length) {
    return state.source.length;
  }
  // return state.tokens[state.index].pos + (to_end ? state.tokens[state.index].value.length : 0);
  return state.tokens[state.index].pos;
}

/** Lookahead n tokens */
export function lookahead(state: ParserState, n: number): Token | null {
  return state.tokens[state.index + n] ?? null;
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
  type: PatternTypes,
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
  type: PatternTypes,
  value?: string,
): Token {
  const t = match(state, type, value);
  if (!t) {
    const p = peek(state);
    throw new Error(
      `Expected ${type}${value ? `(${value})` : ""} but got ${p ? `${p.type}(${p.value})` : "EOF"
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
  if (value !== undefined && t.value !== value) return false;
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

export function assert(cond: boolean, msg?: string): asserts cond {
  if (cond) return;
  throw new Error(msg || "Assertion failed");
}

export function assertEq<T>(l: unknown, r: T, r2?: T, r3?: T, r4?: T): asserts l is T {
  if (l === r || l === r2 || l === r3 || l === r4) {
    return;
  }
  throw new Error(`The '${l}' is not strict Equal to '${r}'!`);
}

