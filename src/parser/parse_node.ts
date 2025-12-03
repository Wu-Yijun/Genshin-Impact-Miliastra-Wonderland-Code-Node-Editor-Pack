
import type { IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_EvalNode, IR_FunctionArg, IR_InOutNode, IR_JumpNode, IR_Node } from "../types/IR_node.ts";
import type { ParserState } from "../types/parser.ts";

import { TOKEN_GROUPS, TOKENS } from "../types/consts.ts";
import { extractBalancedTokens, splitBalancedTokens, try_capture_type } from "./balanced_extract.ts";
import { parse_type } from "./parse_type.ts";
import { peek, peekIs } from "./utils.ts";

export function parseNode(
  s: ParserState,
): IR_Node {
  if (peekIs(s, "identifier")) {
    if (peekIs(s, "identifier", "$")) {
      return parse_eval(s);
    }
    if (peekIs(s, "identifier", "Branch")) {
      return parseAnchorNode(s);
    }
    if (peekIs(s, "identifier", "In") || peekIs(s, "identifier", "Out")) {
      return parseInOutNode(s);
    }
    return parseCallNode(s);
  }
  if (peekIs(s, "brackets", "{")) {
    return parse_branch(s);
  }
  if (peekIs(s, "int") || peekIs(s, "string") || peekIs(s, "boolean")) {
    return parse_jump(s);
  }
  throw new Error("Unexpected token");
}

function parse_eval(s: ParserState): IR_EvalNode {

}
export function parseAnchorNode(s: ParserState): IR_AnchorNode {

}
export function parseInOutNode(s: ParserState): IR_InOutNode {

}
export function parseCallNode(s: ParserState): IR_CallNode {

}
function parse_branch(s: ParserState): IR_BranchNode {

}
function parse_jump(s: ParserState): IR_JumpNode {

}


function parse_args(s: ParserState, type: "in" | "out"): IR_FunctionArg[] {
  const BRACKETS = {
    "in": "()",
    "out": "[]",
  };
  const ret = [];

  const tokens = extractBalancedTokens(s, BRACKETS[type][0], BRACKETS[type][1]);
  const args = splitBalancedTokens(tokens, TOKEN_GROUPS.opening, TOKEN_GROUPS.closing, [TOKENS.comma]);
  for (const arg of args) {
    const len = arg.length;
    if (length === 0) {
      continue;
    } else if (len === 1) {
      ret.push({
        expr: arg,
        name: null,
        type: null,
      });
    }
    // (name =)? expr
    const alias = arg[0].type === "identifier" && arg[1].type === "assign";
    // expr (as type)?
    const { success: typed, tokens: typename } = try_capture_type(arg, arg.length - 1, true);
    ret.push({
      expr: arg.slice(alias ? 2 : 0, arg.length - (typed ? typename.length : 0)),
      name: alias ? arg[0].value : null,
      type: typed ? parse_type(typename) : null,
    });
  }
  return ret;
}

