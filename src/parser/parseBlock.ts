import type { ParserState, Token } from "./tokenizer.ts";
import { TOKEN_GROUPS, TOKENS } from "./tokenizer.ts"; //js
import {
  assert,
  expect,
  expectIdentifier,
  next,
  peek,
  peekIs,
  peekIsIdentifier,
  peekIsIdLiteral,
} from "./utils.ts"; //js
import type {
  BranchId,
  IR_AnchorNode,
  IR_BranchNode,
  IR_EvalNode,
  IR_ForEachNode,
  IR_IfNode,
  IR_JumpNode,
  IR_LoopNode,
  IR_MultiJumpNode,
  IR_SwitchNode,
  IRNode,
} from "../IR/IR_node.ts";
import { allocNodeId } from "../IR/IR_node.ts"; //js
import {
  getJumpZeroNode,
  matchArgs,
  parseBranchIndex,
  parseIdentifier,
  parseIdLiteral,
  parseInputArgs,
  parseLiteral,
  parseOutList,
} from "./parseParams.ts"; //js
import {
  extractBalanced,
  extractBalancedTokens,
  splitBalancedTokens,
} from "./balancedExtract.ts"; //js
import type { TypeName } from "../IR/IR_defs.ts";
import {
  type FunctionCallType,
  refractSystemFunction,
  refractUserFunction,
  systemFunctionIncludes,
} from "./functions.ts"; //js

/** 这是解析触发器主体、component 主体、case 语句内的通用逻辑。
 * `[Trigger]|Branch[id]` % `.Fun().....Fun() >> Branch?` $ `;|,|)|}`
 *
 * No Prefix means `??` % `Fun().....Fun() >> Branch?` $ `;|,|)|}`
 */
export function parseBlock(
  state: ParserState,
  no_prefix: boolean = false,
): IRNode {
  // sequence head
  type hd = { next: IRNode | null };
  let head = { next: null };
  let tail: IRNode | hd = head;

  if (no_prefix) {
    if (peekIs(state, "identifier")) {
      const nextNode = parseCallOrControlNode(state);
      tail.next = nextNode;
      tail = nextNode;
    } else if (peekIs(state, "symbol", "$")) {
      const nextNode = parseEvalNode(state);
      tail.next = nextNode;
      tail = nextNode;
    } else {
      throw new Error(
        `Function Block Without prefix should start with Func or $, not '${
          peek(state)?.value
        }'`,
      );
    }
  }

  // while ".Foo()" / ".$()" / ".Branch" / "<...>"
  while (true) {
    // ".Fun" / ".$()"
    if (peekIs(state, "symbol", ".") || peekIs(state, "symbol", ">")) {
      next(state);
      // $()
      if (peekIs(state, "symbol", "$")) {
        const nextNode = parseEvalNode(state);
        tail.next = nextNode;
        tail = nextNode;
        continue;
      }
      const nextNode = parseCallOrControlNode(state);
      tail.next = nextNode;
      tail = nextNode;
      continue;
    }

    // sugar: <id, id>
    if (peekIs(state, "symbol", "<")) {
      next(state);
      const sugarNode = parseAngleBranchSugar(state);
      if (!peekIs(state, "symbol", ">") && !peekIs(state, "goto", ">>")) {
        throw new Error(
          `Invalid Usage in Branch Sugar! Expect > or >> but got '${
            peek(state)?.value
          }'!`,
        );
      }
      tail.next = sugarNode;
      tail = sugarNode;
      continue;
    }

    // should be ">>" otherwise the block is finished.
    if (!peekIs(state, "goto", ">>")) {
      break;
    }
    next(state);

    // Literals(Terminate) `FunX()` % `>> BranchId` $ `;|,|)|}`
    if (peekIsIdLiteral(state)) {
      const nextNode = parseJumpBranch(state);
      tail.next = nextNode;
      // Note: Return!
      break;
    }

    // Function ">> FunX()"
    if (peekIs(state, "identifier")) {
      const nextNode = parseCallOrControlNode(state);
      tail.next = nextNode;
      tail = nextNode;
      continue;
    }

    // >> {...}
    if (peekIs(state, "symbol", "{")) {
      next(state);
      const branchNode = parseBranchBlock(state);
      expect(state, "symbol", "}");
      tail.next = branchNode;
      tail = branchNode;
      // Do not need to parse continuation (the node after `}` )
      // The next loop will do that!
      continue;
    }

    break;
  }
  return head.next!;
}

/** `.|>>|>|:|=` % `$(lambda) [outs]?` $
 */
function parseEvalNode(state: ParserState): IR_EvalNode {
  expect(state, "symbol", "$");
  expect(state, "symbol", "(");

  const lambdaSrc = extractBalanced(state, "(", ")"); // "(a,b)=>"
  expect(state, "arrow", "=>");
  let lambdaBody;
  if (peekIs(state, "symbol", "{")) {
    // complex lambda ()=> {...}
    lambdaBody = extractBalanced(state, "{", "}");
    expect(state, "symbol", ")");
  } else if (peekIs(state, "symbol", "(")) {
    // simple lambda ()=> (...)
    lambdaBody = extractBalanced(state, "(", ")");
    expect(state, "symbol", ")");
  } else {
    // bad lambda ((a, b)=> a + b)
    //                           ^ balance until here
    lambdaBody = "(" + extractBalanced(state, "(", ")", 1);
  }

  const outs = peekIs(state, "symbol", "[") ? parseOutList(state) : [];

  const params = lambdaSrc.split(",");
  const body = lambdaBody;

  return {
    kind: "eval",
    capture: params, // 你的 DSL 要求 capture 明确列出
    lambdaParams: params,
    lambdaBody: body,
    outputs: outs,
    id: allocNodeId(),
    next: null,
  };
}

/**
 * * `.|>|>>|:|=` % `Fun <NameType>? (params) [outs]? ( cases )?` $
 * * `.|>|>>|:|=` % `Branch[branchId]` $
 */
function parseCallOrControlNode(state: ParserState): IRNode {
  if (peekIsIdentifier(state, "Branch")) {
    return parseAnchorDefinition(state);
  }

  const fun = parseFunctionCall(state);
  switch (fun.name) {
    case "If":
      return refractIfNode(fun);

    case "Switch":
      return refractSwitchNode(fun);

    case "Loop":
      return refractLoopNode(fun);

    case "ForEach":
      return refractForEachNode(fun);
  }
  if (systemFunctionIncludes(fun.name)) {
    return refractSystemFunction(fun);
  }
  return refractUserFunction(fun);
}

/** `>> {` % `IdLiteral1: Block1, IdLiteral2: Block2, ...` $ `}` */
function parseBranchBlock(state: ParserState): IR_BranchNode {
  // expect(state, "symbol", "{");

  let branches = [];
  while (!peekIs(state, "symbol", "}")) {
    const id = parseBranchIndex(state);
    expect(state, "symbol", ":");
    let node: IRNode;
    // const node = parseBlock(state, true);
    if (peekIsIdLiteral(state)) {
      node = parseJumpBranch(state);
    } else {
      // true means on prefix "."
      node = parseBlock(state, true);
    }
    branches.push({ id, node });

    if (peekIs(state, "symbol", ",")) next(state);
  }
  assert(peek(state)?.value, "}");
  // expect(state, "symbol", "}");

  return { kind: "branch", branches, id: allocNodeId(), next: null };
}

/** `>>` % `int|string|boolean|null` $ `,|;|}|)` */
function parseJumpBranch(state: ParserState): IR_JumpNode {
  const id = parseIdLiteral(state);
  return {
    kind: "jump",
    target: id,
    id: allocNodeId(),
    next: undefined,
  };
}

/** `<` % `Branch1, Branch2` $ `>` */
function parseAngleBranchSugar(state: ParserState): IR_MultiJumpNode {
  let ids: (number | string | boolean)[] = [];
  while (peekIsIdLiteral(state)) {
    const id = parseIdLiteral(state);
    if (id !== null) {
      ids.push(id);
    } else {
      console.warn("Sugar Branch Should not be null!");
    }
    if (peekIs(state, "symbol", ",")) next(state);
  }
  // expect(state, "symbol", ">");
  return { kind: "multiJump", targets: ids, id: allocNodeId(), next: null };
}

/** % `FunName <InBranchTag>? (args) [outs]? (cases...)?` $ */
function parseFunctionCall(state: ParserState): FunctionCallType {
  const name = parseIdentifier(state);

  let inBranchTag = null;
  if (peekIs(state, "symbol", "<")) {
    next(state);
    inBranchTag = parseIdLiteral(state)!;
    expect(state, "symbol", "<");
  }

  if (!peekIs(state, "symbol", "(")) {
    throw new Error(`Expect function args but found '${peek(state)?.value}'!`);
  }

  const args = parseInputArgs(state);
  const outs = peekIs(state, "symbol", "[") ? parseOutList(state) : [];

  let exits = null;
  if (peekIs(state, "symbol", "(")) {
    next(state);
    exits = parseCaseBranchBlock(state); // user multi-branch function
    expect(state, "symbol", ")");
  }

  return {
    inBranchTag,
    name,
    args,
    outs,
    exits,
    id: allocNodeId(),
  };
}

/** `FunX()[](` % `branchId = block, branchId2 = block2, ...` $ `) .FunY()` */
function parseCaseBranchBlock(
  state: ParserState,
): Map<BranchId | null, IRNode> {
  const output = new Map<BranchId | null, IRNode>();

  while (!peekIs(state, "symbol", ")")) {
    const key = parseIdLiteral(state); // literal string/number/bool
    expect(state, "symbol", "=");
    let node: IRNode;
    if (peekIsIdLiteral(state)) {
      node = parseJumpBranch(state);
    } else {
      // true means on prefix "."
      node = parseBlock(state, true);
    }
    output.set(key, node);
    if (peekIs(state, "symbol", ",")) next(state);
  }
  return output;
}

// 此处检测可能的 开头锚点 + 初始调用：
function parseSequenceElement(state: ParserState): IRNode {
  // top-level anchor
  if (peekIsIdentifier(state, "Branch")) {
    const anchor = parseAnchorDefinition(state);
    if (peekIs(state, "symbol", ".")) {
      const nextNode = parseCallOrControlNode(state);
      anchor.next = nextNode;
      return anchor;
    }
    return anchor;
  }

  // must start with a call like .Fun() or .$(...)
  if (peekIs(state, "symbol", ".")) {
    return parseCallOrControlNode(state);
  }

  throw new Error("Block must start with call or Branch[...]");
}

/** FunctionCallType -> IR_IfNode */
function refractIfNode(fun: FunctionCallType): IR_IfNode {
  assert(fun.args.length, 1);
  if (fun.args[0].type) assert(fun.args[0].type, "boolean");
  const ifNode: IR_IfNode = {
    kind: "if",
    conditionExpr: fun.args[0].expr,
    id: fun.id,
    trueNode: fun.exits?.get(true) ?? null,
    falseNode: fun.exits?.get(false) ?? null,
    next: null,
  };
  if (fun.exits === null) {
    // Sugar `If(bool)` === `If(bool)(true = 0)`
    ifNode.trueNode = getJumpZeroNode();
  }
  return ifNode;
}

/** FunctionCallType -> IR_SwitchNode */
function refractSwitchNode(fun: FunctionCallType): IR_SwitchNode {
  assert(fun.args.length, 1);
  const cases = [];
  if (!fun.exits || fun.exits.size === 0) {
    console.warn("The Switch Cases is of zero length!");
  }
  const kv = fun.exits?.entries() ?? [];
  for (const [key, node] of kv) {
    if (key !== null) {
      cases.push({ key, node });
    }
  }
  const switchNode: IR_SwitchNode = {
    kind: "switch",
    switchExpr: fun.args[0].expr,
    cases: cases,
    defaultCase: fun.exits?.get(null) ?? null,
    next: null,
    id: fun.id,
  };
  return switchNode;
}

/** FunctionCallType -> IR_LoopNode */
function refractLoopNode(fun: FunctionCallType): IR_LoopNode {
  const args = matchArgs(fun.args, [["from", "int"], ["to", "int"], [
    "identifier",
    "string",
  ]], 2);
  const out = fun.outs[0].name ?? fun.outs[0].alias;

  const loopNode: IR_LoopNode = {
    kind: "loop",
    startExpr: args[0]!.expr,
    endExpr: args[1]!.expr,
    loopVar: out,
    loopId: args[2]?.expr ?? null,
    trueNode: fun.exits?.get(true) ?? null,
    falseNode: fun.exits?.get(false) ?? null,
    next: null,
    id: fun.id,
  };
  if (fun.exits === null) {
    // Sugar `Loop(from, to, var)` === `Loop(from, to, var)(true = 0)`
    loopNode.trueNode = getJumpZeroNode();
  }
  if (loopNode.trueNode === null) {
    console.warn("The loop is not used!");
  }
  return loopNode;
}

/** FunctionCallType -> IR_ForEachNode */
function refractForEachNode(fun: FunctionCallType): IR_ForEachNode {
  const args = matchArgs(fun.args, [["list"], ["identifier", "string"]], 1);
  if (args[0]!.type && args[0]!.type.startsWith("List < ")) {
    console.warn("Foreach list should be a list!");
  }
  const out = fun.outs[0].alias;

  const forEachNode: IR_ForEachNode = {
    kind: "foreach",
    listExpr: args[0]!.expr,
    loopId: args[1]?.expr ?? null,
    iterVar: out,
    trueNode: fun.exits?.get(true) ?? null,
    falseNode: fun.exits?.get(false) ?? null,
    next: null,
    id: fun.id,
  };
  if (fun.exits === null) {
    // Sugar `ForEach(list, var)` === `ForEach(list, var)(true = 0)`
    forEachNode.trueNode = getJumpZeroNode();
  }
  if (forEachNode.trueNode === null) {
    console.warn("The forEach is not used!");
  }
  return forEachNode;
}

/** % `Branch[branchId]` $ */
function parseAnchorDefinition(state: ParserState): IR_AnchorNode {
  expectIdentifier(state, "Branch");
  expect(state, "symbol", "[");
  const id = parseIdLiteral(state); // string/number/boolean literal
  expect(state, "symbol", "]");
  return { kind: "anchor", anchorId: id!, id: allocNodeId(), next: null };
}
