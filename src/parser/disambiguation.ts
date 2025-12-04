// TODO 对 TOKENs 进行后处理:
// 区分 brackets "<" ">" 为
//    - bracket: 仅可能出现在 identifier "<" 时 , 从 identifier 进行 `try_capture_type` 成功, 则保留为 bracket
//    - left/right: "<<" ">>"
//    - math: "<" ">"
// 判断 int/float 前的 math "+" "-" 是正负号(移除token并并入下一个token), 还是+/-运算符(保留), (文法中没有 ++ -- 规则.)

import { TOKENS } from "../types/consts.ts";
import type { Token } from "../types/types.ts";
import { try_capture_type } from "./balanced_extract.ts";
import { tokenEqual } from "./tokenizer.ts";

export function post_lexing_disambiguation(tokens: Token[]): Token[] {
  const result: Token[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "identifier" && tokenEqual(tokens[i + 1], TOKENS.openAngle)) {
      // Try to capture type starting from current position
      const typed = try_capture_type(tokens, i);
      if (typed.success) {
        // 保证下一个不是紧密相连的 ">"
        if (
          tokenEqual(tokens[i + typed.tokens.length], TOKENS.closeAngle)
          && tokens[i + typed.tokens.length].pos === tokens[i + typed.tokens.length - 1].pos + 1
        ) {
          // not a bracket
        } else {
          // Keep as bracket, skip the type tokens
          result.push(...typed.tokens);
          i += typed.tokens.length - 1;
          continue;
        }
      }
    }

    // Handle "<" and ">" disambiguation
    if (tokenEqual(token, TOKENS.openAngle) || tokenEqual(token, TOKENS.closeAngle)) {
      const nextToken = tokens[i + 1];

      // Check for "<<" or ">>"
      if (tokenEqual(nextToken, token) && token.pos + 1 === nextToken.pos) {
        // Convert to left/right token
        result.push({
          type: token.value === "<" ? "left" : "right",
          value: token.value + nextToken.value,
          pos: token.pos,
        });
        i++; // Skip the next token
        continue;
      }

      if (tokenEqual(nextToken, TOKENS.equal) && token.pos + 1 === nextToken.pos) {
        result.push({
          type: "math",
          value: token.value + nextToken.value,
          pos: token.pos,
        });
        i++;
        continue;
      }

      // Otherwise, convert to math token
      result.push({
        type: "math",
        value: token.value,
        pos: token.pos,
      });
      continue;
    }

    // Handle "+" and "-" before int/float
    if (tokenEqual(token, TOKENS.plus) || tokenEqual(token, TOKENS.minus)) {
      const nextToken = tokens[i + 1];

      // Check if next token is int or float
      if (nextToken && (nextToken.type === "int" || nextToken.type === "float")) {
        // Determine if this is a sign or an operator
        // It's a sign if:
        // 1. It's at the beginning of the token list
        // 2. The previous token is not a value-producing token (not identifier, int, float, string, boolean, or closing bracket)
        const prevToken = result[result.length - 1];

        const isSign = !prevToken || !(
          prevToken.type === "identifier" ||
          prevToken.type === "int" ||
          prevToken.type === "float" ||
          prevToken.type === "string" ||
          prevToken.type === "boolean" ||
          tokenEqual(prevToken, TOKENS.closeParentheses) ||
          tokenEqual(prevToken, TOKENS.closeSquare) ||
          tokenEqual(prevToken, TOKENS.closeCurly) ||
          tokenEqual(prevToken, TOKENS.closeAngle)
        );

        if (isSign) {
          // Merge sign into the next token
          result.push({
            type: nextToken.type,
            value: token.value + nextToken.value,
            pos: token.pos,
          });
          i++; // Skip the next token
          continue;
        }
      }
    }

    // Default: keep the token as-is
    result.push(token);
  }

  return result;
}