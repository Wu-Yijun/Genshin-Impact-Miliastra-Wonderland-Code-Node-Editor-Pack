import type { DefineDecl, LocalVarDecl } from "../types/IR_decl.ts"
import type { LambdaDecl, SharedFuncDecl } from "../types/IR_func.ts"
import type { ParserState } from "../types/parser.ts"


export function parseConst(state: ParserState): LocalVarDecl | DefineDecl | SharedFuncDecl | LambdaDecl {

}
