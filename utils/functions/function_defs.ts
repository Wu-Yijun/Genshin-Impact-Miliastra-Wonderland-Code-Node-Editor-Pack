import { assert } from "../utils.ts";
import { type SysEnumNameTypes, type SysTypeNames } from "../../src/test/sysTypes.ts";


/** `ArgTypes` could be string or string list (means either type in the list) */
type ArgType =
  | SysTypeNames   // basic types
  | SysEnumNameTypes  // enum types
  | ArgType[]       // type array
  | (() => ArgType | string | string[]); // other types
/** 
 * - `key` is parameter name and should only be used once.
 * - `0: true` to mark if an `arg` is optional 
 * */
type Arg = ({ [key: string]: ArgType } & { 0?: true }) | (() => Arg);
/** `ArgArr` means `fun(arg1, arg2, ...)` , or return type `[arg1, arg2, ...]` */
type ArgArr = Arg[] | (() => ArgArr);
/** Overloads: 
 * - `{ [key: string]: ArgArr }` use key to match in/out args.
 *    - `key: Arg` Stands for `fun(arg)`.
 *    - `key: Arg[]` Stands for `fun(arg1, arg2, ...)`.
 *    - If counterpart key is not found, use `[]` by default.
 *  - `Args[]` means overloads: `fun(arg1_1, arg1_2, ...)` | `fun(arg2_1, arg2_2, ...)` | ...
 * */
type Overloads = { [key: string]: ArgArr | Arg };
/** By default in and out overloads will be merged (in_len * out_len)
 * 
 * If one of in or out args uses a key which can not be matched, 
 * the other one will be set as null and Print Warnings.
 */
type Args = ArgArr | Overloads | Args[] | (() => Args);

/** define of system Execution functions */
interface FunDef {
  /** Convert " " to "" with next character in Capital. */
  name: Names;
  /** Fun<T> */
  generic?: string | string[];
  /** Arg[][] stands for function overloads */
  in?: Args;
  out?: Args;
  comments?: string | string[];
}

interface Lambda extends FunDef {
  /** Convert " " to "_" with all character in lower form */
  name: Names;
}

/** Declarations of names */
// export type Names = [name: string, id: number, full_name: string, ref_name: string];
export type Names = [name: string, ref_name: string | null, client_name: string | null];

/**
 * Type: str | str[]
 * Arg: {name: Type}
 * ArgArr: Arg[]
 * Overloads: { id: ArgArr } | ArgArr[]
 * Args: Overloads | Overloads | ArgArr
 */

/** Extract and flatten and map all args */
interface StrictArgs {
  id: string | null;
  in_params: {
    name: string;
    type: string[];
    optional: boolean;
  }[];
  out_params: {
    name: string;
    type: string[];
  }[];
}

interface StrictFunc {
  type: "lambda" | "function";
  name: Names;
  generic: string[]
  overloads: StrictArgs[];
  comments: string[];
}

export type strict_arg = { name: string; type: string[]; optional: boolean; };
export type arg_type =
  // | { type: "null"; }
  | { type: "empty"; } // empty string[] or empty args[]
  | { type: "str"; val: string[]; }
  | { type: "bool"; val: boolean; }
  | { type: "arg"; val: strict_arg; } // Arg
  | { type: "args"; val: strict_arg[]; } // ArgArr
  | { type: "overloads"; val: { val: strict_arg[]; id: string | null }[]; }
  ;

export function extractArg(arg: any): arg_type {
  // if (arg === null || arg === undefined) {
  //   return { type: "null" };
  // }
  if (typeof arg === "function" || arg instanceof Function) {
    return extractArg(arg());
  }
  switch (typeof arg) {
    case "string":
      return { type: "str", val: [arg] };
    case "boolean":
      return { type: "bool", val: arg };
    case "object":
      break;
    default:
      console.dir(arg, { depth: null });
      throw new Error("Cannot Parse <" + typeof arg + "> type!");
  }
  if (arg instanceof Array) {
    if (arg.length === 0) {
      return { type: "empty" };
    }
    let args = arg.map(extractArg);
    const t = args.find(a => a.type !== "empty")?.type ?? "empty";
    args = args.filter(a => a.type !== "empty");
    switch (t) {
      case "empty":
        return { type: "empty" };
      case "str":
        assert(
          args.every(a => a.type === "str"),
          "Array should be str. Not: " + JSON.stringify({ arg, where: args })
        );
        return {
          type: "str",
          val: args.map(a => a.val).flat()
        };
      case "arg":
        assert(
          args.every(a => a.type === "arg"),
          "Array should be arg. Not: " + JSON.stringify({ arg, where: args })
        );
        return {
          type: "args",
          val: args.map(a => a.val),
        };
      case "args":
      case "overloads":
        assert(
          args.every(a => a.type === "args" || a.type === "overloads"),
          "Array should be args or overloads. Not: " + JSON.stringify({ arg, where: args })
        );
        return {
          type: "overloads",
          val: args.map(a => a.type === "overloads" ? a.val : { val: a.val, id: null }).flat()
        };
      default:
        throw new Error("Cannot Parse <" + t + " []> type!");
    }
  }
  if (arg instanceof Object) {
    let args: [string, arg_type][] = Object.entries(arg).map(([k, v]) => [k, extractArg(v)]);
    if (args.length === 0) {
      return { type: "args", val: [] };
    }
    const t = args.find(a => a[1].type !== "empty")?.[1].type ?? "empty";
    switch (t) {
      case "str":
      case "bool":
        const optional = args.findIndex(a => a[0] === "0");
        if (optional >= 0) {
          assert(
            args[optional][1].type === "bool" && args[optional][1].val === true,
            "Object should be {0: true}. Not: " + JSON.stringify({ arg, where: args[optional] })
          );
          args.splice(optional, 1);
        }
        assert(args.length === 1);
        assert(args[0][1].type === "str");
        return {
          type: "arg",
          val: {
            name: args[0][0],
            type: args[0][1].val,
            optional: optional >= 0
          }
        };
      case "empty":
      case "arg":
      case "args":
        return {
          type: "overloads",
          val: args.map(a => {
            const t = a[1].type;
            assert(
              t === "arg" || t === "args" || t === "empty",
              "Object should be arg or args or empty. Not: " + JSON.stringify({ arg, where: a })
            );
            switch (t) {
              case "empty":
                return {
                  val: [],
                  id: a[0],
                };
              case "arg":
                return {
                  val: [a[1].val],
                  id: a[0],
                };
              case "args":
                return {
                  val: a[1].val,
                  id: a[0],
                };
            }
          }).flat()
        };
      default:
        throw new Error("Cannot Parse <" + t + " {}> type!");
    }
  }
  throw new Error("Unknown type: " + arg);
}

function parseArg(arg: Args | null, out: boolean = false): StrictArgs[] {
  if (arg === null) {
    return [];
  }
  const ext = extractArg(arg);
  assert(ext.type === "args" || ext.type === "overloads" || ext.type === "empty");
  const args = ext.type === "overloads" ?
    ext.val : [{ val: ext.type === "args" ? ext.val : [], id: null }];
  const ret = args.map(a => {
    if (out === true) {
      return {
        id: a.id,
        in_params: [],
        out_params: a.val.map(v => (assert(v.optional === false), { name: v.name, type: v.type })),
      };
    }
    return {
      id: a.id,
      in_params: a.val.map(v => ({ name: v.name, type: v.type, optional: v.optional })),
      out_params: [],
    };
  });
  return ret;
}

class Parser {
  func: StrictFunc[];
  constructor() {
    this.func = [];
  }
  lambda(f: Lambda | Lambda[], overwrite = false) {
    if (f instanceof Array) {
      for (const i of f) {
        this.add(i, "lambda", overwrite)
      }
      return;
    }
    this.add(f, "lambda", overwrite)
  }
  fun(f: FunDef | FunDef[], overwrite = false) {
    if (f instanceof Array) {
      for (const i of f) {
        this.add(i, "function", overwrite)
      }
      return;
    }
    this.add(f, "function", overwrite);
  }
  add(f: FunDef, type: "lambda" | "function", overwrite = false) {
    const fun: StrictFunc = {
      type,
      name: f.name,
      generic: [f.generic ?? []].flat(),
      overloads: [],
      comments: [f.comments ?? []].flat(),
    }
    const f_in: StrictArgs[] = parseArg(f.in ?? null);
    const f_out: StrictArgs[] = parseArg(f.out ?? null, true);
    // match
    // const out_ids = f_out.filter(a => a.id).map((a, i) => [a.id, i]) as [string, number][];
    // const out_map = new Map<string, number>(out_ids);
    let unused_in = new Array(f_in.length).fill(true);
    let unused_out = new Array(f_out.length).fill(true);
    for (let i = 0; i < f_in.length; i++) {
      const in_args = f_in[i];
      for (let j = 0; j < f_out.length; j++) {
        const out_args = f_out[j];
        // both id is null, or they share the same id
        if (in_args.id === out_args.id) {
          unused_in[i] = false;
          unused_out[j] = false;
          fun.overloads.push({
            id: in_args.id,
            in_params: in_args.in_params,
            out_params: out_args.out_params,
          });
        }
      }
    }
    for (let i = 0; i < f_in.length; i++) {
      if (unused_in[i] === false) {
        continue;
      }
      const in_args = f_in[i];
      if (in_args.id !== null) {
        console.warn(`Function ${f.name[0]} has an in arg '${in_args.id}' which can not be matched in out args.`);
      } else {
        console.info(`[info] Function ${f.name[0]} does not have free out args, while existing free in args.`);
      }
      fun.overloads.push({
        id: in_args.id,
        in_params: in_args.in_params,
        out_params: [],
      });
    }
    for (let i = 0; i < f_out.length; i++) {
      if (unused_out[i] === false) {
        continue;
      }
      const out_args = f_out[i];
      if (out_args.id !== null) {
        console.warn(`Function ${f.name[0]} has an out arg '${out_args.id}' which can not be matched in in args.`);
      } else {
        console.info(`[info] Function ${f.name[0]} does not have free in args, while existing free out args.`);
      }
      fun.overloads.push({
        id: out_args.id,
        in_params: [],
        out_params: out_args.out_params,
      });
    }
    this.func.push(fun);
    return fun;
  }
  get_fun_by_name(name: string): StrictFunc[] {
    return this.func.filter((f) => f.name[0] === name);
  }
  gen_args(args: { name: string; type: string[]; optional?: boolean; }[]): string {
    return args.map((a) => `${a.name}${a.optional === true ? "?" : ""}: ${a.type.join(" | ")}`).join(", ");
  }
  gen_fun(fun: StrictFunc): string[] {
    const comments = fun.comments.length > 0 ? `/** ${fun.comments.join("\n * ")} */\n` : "";
    const generic = fun.generic.length > 0 ? `<${fun.generic.join(",")}>` : "";
    const fun_part = `${comments}function ${fun.name[0]}${generic}`
    return fun.overloads.map((o) => {
      if (o.out_params.length === 1) {
        return `${fun_part}(${this.gen_args(o.in_params)}): ${o.out_params[0].type.join(" | ")}`
      }
      return `${fun_part}(${this.gen_args(o.in_params)}): {${this.gen_args(o.out_params)}}`
    })
  }
  gen(): string[] {
    return this.gen_by_name();
  }
  gen_by_name(name?: string): string[] {
    const fun = name === undefined ? this.func : this.get_fun_by_name(name);
    return fun.map((f) => this.gen_fun(f)).flat();
  }

}

export type {
  SysTypeNames,
  StrictArgs,
  StrictFunc,
  FunDef,
  Lambda,
  Args,
  ArgType,
  Arg,
  ArgArr,
  Overloads,
};
export { Parser };