// --- AST Definitions ---
import type { NodeType } from "../../utils/node_data/node_type.ts";

export type ASTNode =
  | ArithmeticProgram
  | VariableDeclaration
  | ReturnStatement
  | CallExpression
  | Identifier
  | Literal
  | ArrayExpression
  | ObjectExpression;

export type ASTExpr =
  | CallExpression
  | Identifier
  | Literal;

export interface ArithmeticProgram {
  type: 'ArithmeticProgram';
  body: (VariableDeclaration | ReturnStatement)[];
}

export interface VariableDeclaration {
  type: 'VariableDeclaration';
  identifier: string;
  var_type?: NodeType;
  init: ASTExpr;
}

type ASTReturn = ASTExpr | ArrayExpression | ObjectExpression;
export interface ReturnStatement {
  type: 'ReturnStatement';
  argument: ASTReturn;
}

/** * 核心节点: 涵盖了 m.sin(), a+b (m.add), struct.x (m.split), arr[i] (m.list_item) 
 */
export interface CallExpression {
  type: 'CallExpression';
  callee: string; // e.g., "m.add", "m.split", "user_func"
  arguments: ASTExpr[];
}

export interface Identifier {
  type: 'Identifier';
  name: string;
}

export interface Literal {
  type: 'Literal';
  value: number | boolean | string;
  raw: string;
  var_type: NodeType;
}

// 仅用于 Return 语句
export interface ArrayExpression {
  type: 'ArrayExpression';
  elements: ASTExpr[];
}

// 仅用于 Return 语句
export interface ObjectExpression {
  type: 'ObjectExpression';
  properties: { key: string; value: ASTExpr }[];
}
