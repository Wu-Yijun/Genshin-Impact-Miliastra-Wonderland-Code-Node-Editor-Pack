import type { NodeType } from "../../utils/index.ts";
import type { ArithmeticProgram, VariableDeclaration, ReturnStatement, ObjectExpression, ArrayExpression, ASTExpr, Literal, Identifier, CallExpression } from "../types/AST_expr.ts";
import { AST_BINARY_OP_MAP, AST_PRECEDENCE, AST_UNARY_OP_MAP } from "../types/consts.ts";
import type { ParserState, Token } from "../types/types.ts";
import { parsePureArguments as parsePureArguments } from "./parse_args.ts";
import { parse_type } from "./parse_utils.ts";
import { expect, expectIdentifier, match, next, peek, peekIs } from "./utils.ts";



/** 获取操作符的左结合优先级 */
function getBindingPower(token: Token): number {
  if (token.type === 'assign') return AST_PRECEDENCE.ASSIGN;
  if (token.value === '||' || token.value === '&&') return AST_PRECEDENCE.LOGICAL;
  if (['===', '!==', '<', '<=', '>', '>='].includes(token.value)) return AST_PRECEDENCE.COMPARE;
  if (['<<', '>>'].includes(token.value)) return AST_PRECEDENCE.SHIFT;
  if (['+', '-'].includes(token.value)) return AST_PRECEDENCE.SUM;
  if (['*', '/', '%', '&', '|', '^'].includes(token.value)) return AST_PRECEDENCE.PRODUCT;
  if (token.value === '(' || token.value === '[' || token.value === '.') return AST_PRECEDENCE.CALL;
  return AST_PRECEDENCE.NONE;
}

export function parse_expr_program(state: ParserState): ArithmeticProgram {
  const body: (VariableDeclaration | ReturnStatement)[] = [];

  while (peek(state)) {
    // end if encounter a "}"
    if (peekIs(state, "brackets", "}")) {
      break;
    }
    body.push(parseStatement(state));
  }

  return { type: 'ArithmeticProgram', body };
}

function parseStatement(state: ParserState): VariableDeclaration | ReturnStatement {
  const token = peek(state);

  // 1. const x = ...
  if (token?.type === 'identifier' && token.value === 'const') {
    return parseVariableDeclaration(state);
  }

  // 2. return ...
  if (token?.type === 'identifier' && token.value === 'return') {
    return parseReturnStatement(state);
  }

  // 这里的语法只允许 const 和 return 语句，不允许裸表达式
  throw new Error(`Unexpected token at start of statement: ${token?.value}`);
}

function parseVariableDeclaration(state: ParserState): VariableDeclaration {
  expect(state, 'identifier', 'const');
  const id = expectIdentifier(state);
  let var_type = undefined;
  if (peekIs(state, "symbol", ":")) {
    // : type
    next(state);
    var_type = parse_type(state);
  }
  expect(state, 'assign', '=');

  const init = parse_expr(state, AST_PRECEDENCE.NONE);

  // const 语句强制要求分号
  expect(state, 'symbol', ';');

  return {
    type: 'VariableDeclaration',
    identifier: id.value,
    var_type,
    init
  };
}

function parseReturnStatement(state: ParserState): ReturnStatement {
  expect(state, 'identifier', 'return');

  let argument: ASTExpr | ArrayExpression | ObjectExpression;
  const nextToken = peek(state);

  // 处理返回对象 { a: 1 }
  if (nextToken?.value === '{') {
    argument = parseObjectLiteral(state);
  }
  // 处理返回数组 [ a, b ]
  else if (nextToken?.value === '[') {
    argument = parseArrayLiteral(state);
  }
  // 处理普通表达式
  else {
    argument = parse_expr(state, AST_PRECEDENCE.NONE);
  }

  // Return 的分号是可选的 (Optional Semicolon)
  if (peek(state)?.value === ';') {
    next(state);
  } else if (peek(state)) {
    // 如果没有分号且不是 EOF，这通常是错误，除非我们处于宽松模式
    // 按照规则：如果遇到 EOF 自动结束，否则报错
    throw new Error("Expected ';' after return statement or End of Input");
  }

  return { type: 'ReturnStatement', argument };
}

// 辅助: 解析 { key: val, ... }
function parseObjectLiteral(state: ParserState): ObjectExpression {
  expect(state, 'brackets', '{');
  const properties: { key: string; value: ASTExpr; }[] = [];

  while (!match(state, 'brackets', '}')) {
    const keyToken = expectIdentifier(state); // Key 必须是 Identifier
    let value: ASTExpr;
    if (peekIs(state, 'symbol', ':')) {
      expect(state, 'symbol', ':');
      value = parse_expr(state, AST_PRECEDENCE.NONE);
    } else {
      value = {
        type: 'Identifier',
        name: keyToken.value
      };
    }

    properties.push({ key: keyToken.value, value });

    if (!match(state, 'symbol', ',')) {
      // 如果没有逗号，必须紧接着结束大括号
      if (peek(state)?.value !== '}') {
        throw new Error("Expected ',' or '}' in object literal");
      }
    }
  }
  return { type: 'ObjectExpression', properties };
}

// 辅助: 解析 [ val, val ]
function parseArrayLiteral(state: ParserState): ArrayExpression {
  expect(state, 'brackets', '[');
  const elements: ASTExpr[] = [];

  while (!match(state, 'brackets', ']')) {
    elements.push(parse_expr(state, AST_PRECEDENCE.NONE));

    if (!match(state, 'symbol', ',')) {
      if (peek(state)?.value !== ']') {
        throw new Error("Expected ',' or ']' in array literal");
      }
    }
  }
  return { type: 'ArrayExpression', elements };
}

// --- Pratt Parser Core (Expressions) ---

export function parse_expr(state: ParserState, minBp: number = AST_PRECEDENCE.NONE): ASTExpr {
  // 1. NUD (Null Denotation): 处理前缀
  let left = parsePrefix(state);

  while (true) {
    const token = peek(state);
    if (!token) break;

    // 遇到分号、逗号、右括号等停止符号时，退出表达式解析
    if (token.type === 'symbol' || token.type === 'brackets') {
      // 特殊情况：如果是左括号 '(' 或左方括号 '['，它们是中缀操作符 (函数调用/索引)，不能退出
      if (token.value !== '(' && token.value !== '[' && token.value !== '.') break;
    }

    const bp = getBindingPower(token);
    if (bp <= minBp) break;

    next(state); // 消费操作符

    // 2. LED (Left Denotation): 处理中缀
    left = parseInfix(state, left, token, bp);
  }

  return left;
}

function parsePrefix(state: ParserState): ASTExpr {
  const token = next(state);

  // 字面量
  if (token.type === 'int' || token.type === 'float') {
    // 假设 Tokenizer 已经处理了 0x, 0o 等格式，这里简单转换
    const var_type: NodeType = token.type === 'int' ? { t: "b", b: "Int" } : { t: "b", b: "Flt" };
    return { type: 'Literal', var_type, value: Number(token.value.replaceAll("_", "")), raw: token.value };
  }
  if (token.type === 'boolean') {
    return { type: 'Literal', var_type: { t: "b", b: "Bol" }, value: token.value === 'true', raw: token.value };
  }
  if (token.type === 'string') {
    return { type: 'Literal', var_type: { t: "b", b: "Str" }, value: token.value, raw: token.value };
  }

  // 标识符
  if (token.type === 'identifier') {
    // **逻辑**: 检测是否是 m.xxx 或 q.xxx
    if ((token.value === 'm' || token.value === 'q') && peek(state)?.value === '.') {
      next(state); // 消费 '.'
      const methodToken = expectIdentifier(state);
      // 将其组合为一个单一的 Identifier，方便 parseInfix 中的 Call 处理
      return { type: 'Identifier', name: `${token.value}.${methodToken.value}` };
    }
    return { type: 'Identifier', name: token.value };
  }

  // 分组 ( expr )
  if (token.value === '(') {
    const expr = parse_expr(state, AST_PRECEDENCE.NONE);
    expect(state, 'brackets', ')');
    return expr;
  }

  // 前缀操作符 (!, -, ~)
  if (AST_UNARY_OP_MAP[token.value]) {
    const arg = parse_expr(state, AST_PRECEDENCE.PREFIX);
    return {
      type: 'CallExpression',
      callee: AST_UNARY_OP_MAP[token.value],
      arguments: [arg]
    };
  }

  // 忽略一元 '+' (根据需求)
  if (token.value === '+' && token.type === 'math') {
    // 递归调用 parsePrefix，相当于跳过这个 +
    return parsePrefix(state);
  }

  throw new Error(`Unexpected token in expression: ${token.value}`);
}

function parseInfix(state: ParserState, left: ASTExpr, op: Token, bp: number): ASTExpr {
  // 1. 函数调用: identifier(args)
  if (op.value === '(') {
    if (left.type !== 'Identifier') {
      throw new Error("Function call must follow an identifier or m.xxx/q.xxx");
    }
    const args = parsePureArguments(state);
    return {
      type: 'CallExpression',
      callee: left.name,
      arguments: args
    };
  }

  // 2. 列表访问: arr[i] -> m.list_item(arr, i)
  if (op.value === '[') {
    const indexExpr = parse_expr(state, AST_PRECEDENCE.NONE);
    expect(state, 'brackets', ']');
    return {
      type: 'CallExpression',
      callee: 'm.list_item',
      arguments: [left, indexExpr]
    };
  }

  // 3. 成员访问/结构体拆分: struct.x -> m.split(struct, 'x')
  if (op.value === '.') {
    const propToken = expectIdentifier(state);

    // 注意: m.xxx 和 q.xxx 已经在 parsePrefix 中被合成了 Identifier
    // 所以能进入这里的 '.' 必定是普通变量的成员访问 (struct access)
    return {
      type: 'CallExpression',
      callee: 'm.split',
      arguments: [
        left,
        { type: 'Literal', value: propToken.value, raw: `'${propToken.value}'` }
      ]
    };
  }

  // 4. 普通二元运算 -> 映射为函数调用
  const funcName = AST_BINARY_OP_MAP[op.value];
  if (funcName) {
    // 右结合 (如幂运算) 通常用 bp - 1，但这里都是左结合，用 bp
    const right = parse_expr(state, bp);
    return {
      type: 'CallExpression',
      callee: funcName,
      arguments: [left, right]
    };
  }

  throw new Error(`Unknown infix operator: ${op.value}`);
}
