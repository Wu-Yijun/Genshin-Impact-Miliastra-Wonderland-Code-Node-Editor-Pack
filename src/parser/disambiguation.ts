// TODO 对 TOKENs 进行后处理:
// 区分 brackets "<" ">" 为
//    - bracket: 仅可能出现在 "as" literal "<" 时, 从 literal 进行 `try_capture_type` 成功, 则保留为 bracket
//    - left/right: "<<" ">>"
//    - math: "<" ">"
// 判断 int/float 前的 math "+" "-" 是正负号(移除token并并入下一个token), 还是+/-运算符(保留), (文法中没有 ++ -- 规则.)

import { Token } from "../types/types.ts";
import { try_capture_type } from "./balanced_extract.ts";

export function post_lexing_disambiguation(tokens: Token[]): Token[] {
  const result: Token[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Handle "<" and ">" disambiguation
    if (token.type === "brackets" && (token.value === "<" || token.value === ">")) {
      const nextToken = tokens[i + 1];

      // Check for "<<" or ">>"
      if (nextToken && nextToken.type === "brackets" && nextToken.value === token.value) {
        // Convert to left/right token
        result.push({
          type: token.value === "<" ? "left" : "right",
          value: token.value + nextToken.value,
          pos: token.pos,
        });
        i++; // Skip the next token
        continue;
      }

      // Check if this is after "as" literal - try to capture type
      if (token.value === "<") {
        const prevToken = result[result.length - 1];
        const prevPrevToken = result[result.length - 2];

        // Check if previous token is "as" (identifier)
        if (prevToken && prevToken.type === "identifier" && prevToken.value === "as") {
          // Try to capture type starting from current position
          const { success } = try_capture_type(tokens, i);

          if (success) {
            // Keep as bracket
            result.push(token);
            continue;
          }
        }
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
    if (token.type === "math" && (token.value === "+" || token.value === "-")) {
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
          (prevToken.type === "brackets" && (prevToken.value === ")" || prevToken.value === "]" || prevToken.value === "}"))
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