import { Counter } from "../../utils/index.ts";
import type { PatternTypes, Token } from "./types.ts";

export const IR_Id_Counter = new Counter();


/** Default token fot quick access */
export const TOKENS = {
  //Parentheses, square brackets, curly braces, angle brackets
  openParentheses: { type: "brackets", value: "(", pos: 0 },
  openSquare: { type: "brackets", value: "[", pos: 0 },
  openCurly: { type: "brackets", value: "{", pos: 0 },
  openAngle: { type: "brackets", value: "<", pos: 0 },
  closeParentheses: { type: "brackets", value: ")", pos: 0 },
  closeSquare: { type: "brackets", value: "]", pos: 0 },
  closeCurly: { type: "brackets", value: "}", pos: 0 },
  closeAngle: { type: "brackets", value: ">", pos: 0 },
  comma: { type: "symbol", value: ",", pos: 0 },
  plus: { type: "math", value: "+", pos: 0 },
  minus: { type: "math", value: "-", pos: 0 },
  semicolon: { type: "symbol", value: ";", pos: 0 },
  equal: { type: "assign", value: "=", pos: 0 },
} as const satisfies Record<string, Token>;

/** Groups of brackets tokens for quick access */
export const TOKEN_GROUPS = {
  opening: [
    TOKENS.openParentheses,
    TOKENS.openSquare,
    TOKENS.openCurly,
    TOKENS.openAngle,
  ],
  closing: [
    TOKENS.closeParentheses,
    TOKENS.closeSquare,
    TOKENS.closeCurly,
    TOKENS.closeAngle,
  ],
} as const satisfies Record<string, Token[]>;


/** Tokenizer rules */
export const TOKENIZER_PATTERNS = [
  { type: "whitespace", regex: /^[\s\r\n\t]+/ },
  { type: "comment", regex: /^\/\/.*/ },
  { type: "comment", regex: /^\/\*.*?\*\//s },
  { type: "arrow", regex: /^=>/ },
  { type: "equal", regex: /^==(=)?/ },
  { type: "notequal", regex: /^!=(=)?/ },
  { type: "assign", regex: /^=/ },
  { type: "ellipsis", regex: /^\.\.\./ },
  { type: "boolean", regex: /^(true|false)\b/ },
  { type: "identifier", regex: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
  { type: "float", regex: /^(([1-9]([0-9_]*)|0))\.([0-9]([0-9_]*))?|^\.([0-9]([0-9_]*))/ },
  { type: "int", regex: /^0[xX][0-9a-fA-F_]+/ },
  { type: "int", regex: /^0[oO][0-7_]+/ },
  { type: "int", regex: /^0[bB][01_]+/ },
  { type: "int", regex: /^0[dD][0-9_]+/ },
  { type: "int", regex: /^[1-9]([0-9_]*)|^0/ },
  { type: "string", regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'|^`(?:[^`\\]|\\.)*`/ },
  { type: "brackets", regex: /^[\[\]\(\)\{\}<>]/ },
  { type: "decorator", regex: /^[@]/ },
  { type: "dot", regex: /^[\.]/ },
  { type: "symbol", regex: /^[,;:]/ },
  { type: "math", regex: /^\|\||^\&\&/ },
  { type: "math", regex: /^[+\-*\/^&|~!%]/ },
  { type: "Unknown", regex: /^./ },
] as const satisfies { type: PatternTypes; regex: RegExp }[];

const BUILD_IN_SYS_NODE = [
  "If", "Switch", "Loop", "ForEach", "Selector",
  "SetVal", "In", "Out", "Trigger", "Timer", "Signal"
] as const;
export const BUILD_IN_SYS_NODE_MAP: { [key: string]: string } = {
  "If": "Control.General.Branch",
  "Switch": "Control.General.Switch",
  "Loop": "Execution.Common_Node.For_Loop",
  "ForEach": "Execution.List_Operation.For_Each",
  "SetVal": "Execution.Custom_Variable.Set_Variable",
  "Trigger": "Control.General.Trigger",
  "Timer": "Trigger.Timer.On_Timer_Trigger",
  "Signal": "Trigger.Signal.On_Signal",
} as const satisfies { [key: string]: string };

type BUILD_IN_SYS_NODE = typeof BUILD_IN_SYS_NODE[number];
const BUILD_IN_SYS_NODE_Set = Object.freeze(new Set(BUILD_IN_SYS_NODE));



// 优先级表 (Precedence)
export const AST_PRECEDENCE = {
  NONE: 0,
  ASSIGN: 1,
  LOGICAL: 2,   // ||, &&
  COMPARE: 3,   // ===, <, >
  SHIFT: 4,     // <<, >>
  SUM: 5,       // +, -
  PRODUCT: 6,   // *, /, %
  PREFIX: 7,    // -x, !x, ~x
  CALL: 8,      // func(), m.func()
  MEMBER: 9,    // struct.x, arr[i]
};

// // 优先级定义 (数值需与 Parser 的 BP 保持相对顺序一致)
// export const PRECEDENCE: Record<string, number> = {
//   SEQUENCE: 0,
//   ASSIGN: 1,
//   LOGICAL: 2,    // ||, &&
//   COMPARE: 3,    // ===, <
//   SHIFT: 4,      // <<
//   SUM: 5,        // +, -
//   PRODUCT: 6,    // *, /
//   PREFIX: 7,     // !
//   CALL: 8,       // . () []
//   MEMBER: 9,
// };

// 二元操作符映射 -> m.xxx
export const AST_BINARY_OP_MAP: Record<string, string> = {
  '+': 'm.add',
  '-': 'm.sub',
  '*': 'm.mul',
  '/': 'm.div',
  '%': 'm.mod',
  '&&': 'm.and',
  '||': 'm.or',
  '===': 'm.eq',
  '!==': 'm.neq',
  '>=': 'm.ge',
  '>': 'm.gt',
  '<=': 'm.le',
  '<': 'm.lt',
  '<<': 'm.lshift',
  '>>': 'm.rshift',
  '&': 'm.bit_and',
  '|': 'm.bit_or',
  '^': 'm.bit_xor',
};

// 系统函数 -> 运算符符号映射
export const AST_BINARY_OP_SYMBOLS: Record<string, string> = {
  'm.add': '+',
  'm.sub': '-',
  'm.mul': '*',
  'm.div': '/',
  'm.mod': '%',
  'm.and': '&&',
  'm.or': '||',
  'm.eq': '===',
  'm.neq': '!==',
  'm.gt': '>',
  'm.ge': '>=',
  'm.lt': '<',
  'm.le': '<=',
  'm.lshift': '<<',
  'm.rshift': '>>',
  'm.bit_and': '&',
  'm.bit_or': '|',
  'm.bit_xor': '^',
};

// 前缀一元操作符映射 -> m.xxx
export const AST_UNARY_OP_MAP: Record<string, string> = {
  '-': 'm.neg',
  '!': 'm.not',
  '~': 'm.bit_not',
};

// 系统函数 -> 运算符符号映射
export const AST_UNARY_OP_SYMBOLS: Record<string, string> = {
  'm.neg': '-',
  'm.not': '!',
  'm.bit_not': '~'
};