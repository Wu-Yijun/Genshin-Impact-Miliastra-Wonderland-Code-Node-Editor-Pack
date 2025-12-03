import { stringify, type NodeType } from "../../utils/gia_gen/nodes.ts";
import type { NodeVar } from "../types/class.ts";
import type { Token } from "../types/parser.ts";
import type {
  ComponentDecl,
  DefineDecl,
  GlobalDecl,
  GlobalVarDecl,
  ImportDecl,
  IRExtend,
  IR_AnchorNode,
  IR_BranchNode,
  IR_CallNode,
  IR_EvalNode,
  IR_ExecutionBlock,
  IR_FunctionArg,
  IR_GraphModule,
  IR_InOutNode,
  IR_JumpNode,
  IR_Node,
  IR_NodeChain,
  IR_Trigger,
  LambdaDecl,
  LocalVarDecl,
  NodeVarDecl,
  SharedFuncDecl,
  SignalDecl,
  StructDecl,
  TimerDecl
} from "../types/IR.ts";
import type { NodeVarValue } from "../types/types.ts";

const TAB_WIDTH = 2;

/** Convert any IR back into code */
export function decompile(ir: IRExtend, tab: number = 0): string {
  switch (ir.kind) {
    case "call":
    case "eval":
    case "branch":
    case "anchor":
    case "jump":
    case "inout":
      return decompile_node(ir, tab); // F(x) 
    case "trigger":
      return decompile_trigger(ir, tab); // [Trigger]
    case "shared":
    case "define":
    case "localVar":
      return decompile_decl(ir, tab); // const ... = ... ;
    case "import":
      return decompile_import(ir, tab); // import {...} from ... ;
    case "struct":
    case "globalVar":
    case "timer":
    case "signal":
    case "nodeVar":
      return decompile_fields(ir, tab); // interface/namespace {\n \TAB ... }
    case "global":
      return decompile_global(ir, tab); // declare global {\n \TAB ... \n}
    case "lambda":
      return decompile_lambda(ir, tab); // const ... = (args) => {\n ... \n};
    case "chain":
      return decompile_chain(ir, tab); // \n \TAB "<<"/">>"/"." ...
    case "block":
      return decompile_block(ir, tab); // \n [starter] chain;
    case "module":
      return decompile_module(ir, tab); // Everything      
    case "component":
      return decompile_component(ir, tab);
  }
  throw new Error(`Unknown IR: ${JSON.stringify(ir)}`);
}

export function ir_to_string(ir: IRExtend, src: string, depth: number = 0, MAX_LEN = 40): string {
  const { start, end } = ir._srcRange;
  let content = src.slice(start, end).replaceAll(/(\s|\r|\n)+/g, " ").trim();
  if (content.length > MAX_LEN) {
    content = content.slice(0, MAX_LEN / 2) + " ... " + content.slice(-MAX_LEN / 2);
  }
  // console.log(inspect(ir, { depth: 0, compact: true, breakLength: Infinity }));
  let res = `${depth}: \t${ir.kind.padEnd(8, " ")}: \t${content}\n`;
  for (const v of Object.values(ir)) {
    if (v instanceof Object && "_srcRange" in v) {
      res += ir_to_string(v as IRExtend, src, depth + 1);
    } else if (v instanceof Array) {
      for (const item of v) {
        if (item instanceof Object && "_srcRange" in item) {
          res += ir_to_string(item as IRExtend, src, depth + 1);
        }
      }
    }
  }
  return res;
}

// ================= Helper Functions =================

function indent(tab: number): string {
  return " ".repeat(tab * TAB_WIDTH);
}

function tokensToString(tokens: Token[]): string {
  // Simple concatenation for now, might need smarter spacing
  return tokens.map(t => t.value).join(" ");
}

function nodeTypeToString(type: NodeType): string {
  // TODO: convert to DSL forms
  return stringify(type);
}

function nodeValueToString(value: NodeVarValue): string {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "number":
      return value.toString();
    case "bigint":
      return value.toString();
    case "boolean":
      return value.toString();
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => nodeValueToString(v)).join(", ")}]`;
  }
  return String(value);
}

function functionArgToString(arg: IR_FunctionArg, isInput: boolean): string {
  let parts: string[] = [];
  if (arg.name) {
    parts.push(`${arg.name} =`);
  }
  parts.push(tokensToString(arg.expr));
  if (arg.type) {
    parts.push(`as ${nodeTypeToString(arg.type)}`);
  }
  return parts.join(" ");
}

// ================= Node Decompiler =================

function decompile_node(ir: IR_Node, tab: number = 0): string {
  switch (ir.kind) {
    case "call":
      return decompile_call(ir, tab);
    case "eval":
      return decompile_eval(ir, tab);
    case "branch":
      return decompile_branch(ir, tab);
    case "anchor":
      return `Branch[${JSON.stringify(ir.id)}]`;
    case "jump":
      return `${JSON.stringify(ir.id)}()`;
    case "inout":
      return `${ir.specific}(${JSON.stringify(ir.id)})`;
  }
}

function decompile_call(ir: IR_CallNode, tab: number = 0): string {
  let res = `${ir.name}(`;
  res += ir.inputs.map(arg => functionArgToString(arg, true)).join(", ");
  res += ")";

  if (ir.outputs.length > 0) {
    res += "[";
    res += ir.outputs.map(arg => functionArgToString(arg, false)).join(", ");
    res += "]";
  }

  if (ir.branches.length > 0) {
    res += "(\n";
    res += ir.branches.map(b => {
      const branchCode = b.nodes.map((n, i) => decompile_chain(n, tab + 3, i === 0)).join("");
      return `${indent(tab + 2)}${JSON.stringify(b.branchId)} = ${branchCode}`;
    }).join(",\n");
    res += `\n${indent(tab + 1)})`;
  }
  return res;
}

function decompile_eval(ir: IR_EvalNode, tab: number = 0): string {
  let res = `$((`;
  // Reconstruct args from captures if possible, or just empty if not stored explicitly
  // The captures are inputs' captured function-output names.
  // The lambda body is in ir.lambda
  res += ir.captures.map(arg => functionArgToString(arg, false)).join(", ");
  res += ") => ";
  res += tokensToString(ir.lambda);
  res += ")";

  if (ir.outputs.length > 0) {
    res += "[";
    res += ir.outputs.map(arg => functionArgToString(arg, false)).join(", ");
    res += "]";
  }
  return res;
}

function decompile_branch(ir: IR_BranchNode, tab: number = 0): string {
  let res = "{\n";
  res += ir.branches.map(b => {
    const branchCode = b.nodes.map((n, i) => decompile_chain(n, tab + 2, i === 0)).join("");
    return `${indent(tab + 1)}${b.id}: ${branchCode}`;
  }).join(",\n");
  res += `\n${indent(tab)}}`;
  return res;
}

function decompile_trigger(ir: IR_Trigger, tab: number = 0): string {
  // [OnEventName(args)[outs]]
  // ir.node is an IR_CallNode
  return `[${decompile_call(ir.node, tab)}]`;
}

function decompile_chain(ir: IR_NodeChain, tab: number = 0, no_prefix: boolean = false): string {
  // \n \TAB "<<"/">>"/"." ...
  const prefix = ir.suspend ? "<<" : ">>";
  // The first node doesn't need a dot if it follows << or >>? 
  // Actually the comment says: << IR_Node.IR_Node
  // So we join nodes with "."
  const nodesCode = ir.chain.map(n => decompile_node(n, tab)).join(".");
  if (no_prefix) {
    return nodesCode;
  }
  return `\n${indent(tab)}${prefix} ${nodesCode}`;
}

function decompile_block(ir: IR_ExecutionBlock, tab: number = 0): string {
  // \n [starter] chain;
  let res = `\n${indent(tab)}`;

  if (ir.starter.kind === "trigger") {
    res += decompile_trigger(ir.starter, tab);
  } else if (ir.starter.kind === "anchor") {
    res += decompile_node(ir.starter, tab);
  } else if (ir.starter.kind === "inout") {
    res += decompile_node(ir.starter, tab);
  }

  res += "." + ir.chain.map((c, i) => decompile_chain(c, tab + 1, i === 0)).join("");
  res += ";";
  return res;
}

// ================= Declaration Decompiler =================

function decompile_import(ir: ImportDecl, tab: number = 0): string {
  // import { ComponentName, lambda_name } from "file_name";
  const items = [...ir.components, ...ir.lambdas, ...ir.defines].join(", ");
  return `${indent(tab)}import { ${items} } from "${ir.file_name}";`;
}

function decompile_decl(ir: SharedFuncDecl | DefineDecl | LocalVarDecl, tab: number = 0): string {
  const i = indent(tab);
  if (ir.kind === "shared") {
    // const sharedFuncName = Shared(ComponentName, PortId?)
    let val = `Shared(${ir.component_name}`;
    if (ir.port !== null) val += `, ${JSON.stringify(ir.port)}`;
    val += ")";
    return `${i}const ${ir.name} = ${val};`;
  } else if (ir.kind === "define") {
    // const VAR_NAME: type = defaultValue;
    return `${i}const ${ir.name}: ${nodeTypeToString(ir.type)} = ${nodeValueToString(ir.default.value)};`;
  } else if (ir.kind === "localVar") {
    // const _var_name: type = defaultValue;
    return `${i}const ${ir.name}: ${nodeTypeToString(ir.type)}${ir.default !== null ? " = " + nodeValueToString(ir.default.value) : ""};`;
  }
  return "";
}

function decompile_fields(ir: StructDecl | GlobalVarDecl | TimerDecl | SignalDecl | NodeVarDecl, tab: number = 0): string {
  // These are usually inside other blocks (GlobalDecl or namespace), so we just return the line
  // But wait, decompile() main switch calls this.
  // If called directly, it should probably be wrapped?
  // Actually, GlobalDecl contains lists of these.
  // But if we have to decompile them individually:

  const i = indent(tab);

  switch (ir.kind) {
    case "struct":
      // interface StructName { name: type = defaultValue; }
      let s = `${i}interface ${ir.name} {\n`;
      s += ir.fields.map(f =>
        `${indent(tab + 1)}${f.name}: ${nodeTypeToString(f.type)}${f.default !== null ? ` = ${nodeValueToString(f.default.value)}` : ""};`
      ).join("\n");
      s += `\n${i}}`;
      return s;

    case "globalVar":
      return `${i}const ${ir.name}: ${nodeTypeToString(ir.type)}${ir.default !== null ? ` = ${nodeValueToString(ir.default.value)}` : ""};`;

    case "timer":
      const typeStr = ir.countdown ? `CountDown < ${ir.time}> ` : `Count < ${ir.time}> `;
      return `${i}const ${ir.name}: ${typeStr};`;

    case "signal":
      const args = ir.params.map(p => `${p.name}: ${nodeTypeToString(p.type)} `).join(", ");
      return `${i}const ${ir.name}(${args}): Signal;`;

    case "nodeVar":
      const exp = ir.export ? "export " : "";
      return `${i}${exp}const ${ir.name}: ${nodeTypeToString(ir.type)} = ${nodeValueToString(ir.default.value)};`;
  }
}

function decompile_global(ir: GlobalDecl, tab: number = 0): string {
  // declare global { ... }
  let res = `${indent(tab)}declare global {\n`;
  tab += 1;

  // Structs
  if (ir.structs.length > 0) {
    res += ir.structs.map(s => decompile_fields(s, tab)).join("\n");
  }

  // Globals
  if (ir.globals.length > 0) {
    res += `\n${indent(tab)}namespace Self {\n`
    res += ir.globals.map(g => decompile_fields(g, tab + 1)).join("\n");
    res += `\n${indent(tab)}}\n`;
  }

  // Timers
  if (ir.timers.length > 0) {
    res += `\n${indent(tab)}namespace Timer {\n`
    res += ir.timers.map(t => decompile_fields(t, tab + 1)).join("\n");
    res += `\n${indent(tab)}}\n`;
  }

  // Signals
  if (ir.signals.length > 0) {
    res += `\n${indent(tab)}namespace Signal {\n`
    res += ir.signals.map(s => decompile_fields(s, tab + 1)).join("\n");
    res += `\n${indent(tab)}}\n`;
  }

  tab -= 1;
  res += `\n${indent(tab)}}\n`;
  return res;
}

function decompile_lambda(ir: LambdaDecl, tab: number = 0): string {
  // const lambdaName = (arg_name: type): type => { body; return ret; }
  const i = indent(tab);
  const args = ir.args.map(a => `${a.name}: ${nodeTypeToString(a.type)} `).join(", ");

  let res = `${i}const ${ir.name} = (${args})${ir.returns_type !== undefined ? `: ${nodeTypeToString(ir.returns_type)}` : ""} => {\n`;
  res += `${indent(tab + 1)}${tokensToString(ir.body)}; \n`;

  res += `${i}}; `;
  return res;
}

function decompile_component(ir: ComponentDecl, tab: number = 0): string {
  // function ComponentName(arg_name: type) { ... }
  const i = indent(tab);
  const args = ir.args.map(a => `${a.name}: ${nodeTypeToString(a.type)}`).join(", ");

  let res = `${i}function ${ir.name}(${args}) {\n`;

  // Locals
  res += ir.locals.map(l => decompile_decl(l, tab + 1)).join("\n");
  if (ir.locals.length > 0) res += "\n";

  // Blocks
  res += ir.blocks.map(b => decompile_block(b, tab + 1)).join("\n");
  if (ir.blocks.length > 0) res += "\n";

  // Return
  // return ExecFun<{out_name: type}>(outBranchId)
  // ComponentDecl has outBranchIds.
  // We need to reconstruct the return statement.
  // The comment says: return ExecFun<{out_name: type}>(outBranchId)

  const retTypes = ir.returns.map(r => `${r.name}: ${nodeTypeToString(r.type)}`).join(", ");
  const outBranches = ir.outBranchIds.map(id => JSON.stringify(id)).join(", ");
  res += `\n${indent(tab + 1)}return ExecFun<{${retTypes}}>(${outBranches});`;

  res += `\n${i}}\n`;
  return res;
}

function decompile_module(ir: IR_GraphModule, tab: number = 0): string {
  let res = "";

  // Imports
  res += ir.imports.map(i => decompile_import(i, tab)).join("\n");
  if (ir.imports.length > 0) res += "\n\n";

  // Globals
  res += ir.globals.map(g => decompile_global(g, tab)).join("\n\n");
  if (ir.globals.length > 0) res += "\n\n";

  // Node Vars
  // NodeVars
  if (ir.node_vars.length > 0) {
    res += `\n${indent(tab)}declare namespace node {\n`
    res += ir.node_vars.map(s => decompile_fields(s, tab + 1)).join("\n");
    res += `\n${indent(tab)}}\n`;
  }

  // Defines
  res += ir.defines.map(d => decompile_decl(d, tab)).join("\n");
  if (ir.defines.length > 0) res += "\n\n";

  // Local Vars (Top level?)
  res += ir.local_vars.map(l => decompile_decl(l, tab)).join("\n");
  if (ir.local_vars.length > 0) res += "\n\n";

  // Shared Funcs
  res += ir.shared_funcs.map(s => decompile_decl(s, tab)).join("\n");
  if (ir.shared_funcs.length > 0) res += "\n\n";

  // Lambdas
  res += ir.lambdas.map(l => decompile_lambda(l, tab)).join("\n\n");
  if (ir.lambdas.length > 0) res += "\n\n";

  // Components
  res += ir.components.map(c => decompile_component(c, tab)).join("\n\n");
  if (ir.components.length > 0) res += "\n\n";

  // Graph (Main execution blocks)
  res += ir.graph.map(b => decompile_block(b, tab)).join("\n");

  res += "\n\n"; // EOF
  return res;
}