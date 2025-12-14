import { assert } from "../../utils/utils.ts";
import { readFileSync, writeFileSync } from "fs";
import { argv } from "process";



type Root = {
  type: "message"; // message
  name: string[]; // Name { ... }
  inner: Root[]; // message | enum | oneof | var
} | {
  type: "enum"; // enum
  name: string[]; // Name { ... }
  inner: [string, number][]; // Name = Val
} | {
  type: "oneof"; // oneof
  name: string;  // name { ... }
  inner: VarDef[]; // x = 1
} | VarDef;

type VarDef = {
  type: "var";
  class: string[];
  name: string;
  index: number;
  optional: boolean;
  repeated: boolean;
  comment?: string;
}

type Token =
  | { type: ";"; }
  // | { type: " "; }
  | { type: "."; }
  | { type: ","; }
  | { type: "{"; }
  | { type: "}"; }
  | { type: "="; }
  | { type: "I"; val: string; }
  | { type: "N"; val: number; }
  ;

function tokenize(str: string) {
  let i = 0;
  const tokens: Token[] = [];
  while (i < str.length) {
    const p = str[i];
    switch (p) {
      case " ":
        i++;
        continue;
      case ";":
      case ",":
      case ".":
      case "=":
      case "{":
      case "}":
        tokens.push({ type: p });
        i++;
        continue;
    }
    const q = str.slice(i);
    const I = /^[a-zA-Z_][0-9a-zA-Z_]*/.exec(q);
    if (I) {
      tokens.push({ type: "I", val: I[0] });
      i += I[0].length;
      continue;
    }
    const N = /^[0-9]+/.exec(q);
    if (N) {
      tokens.push({ type: "N", val: parseInt(N[0]) });
      i += N[0].length;
      continue;
    }
    throw new Error("Unknown token: " + q.slice(0, 10));
  }
  return tokens;
}


function parseDoc(tokens: Token[], index = [0]): Root[] {

  const doc: Root[] = [];
  let i = index[0];
  while (i < tokens.length) {
    const t = tokens[i];
    if (t.type === ";") {
      i++;
      continue;
    }
    if (t.type === "}") {
      index[0] = i;
      return doc;
    }
    if (t.type === 'I') {
      switch (t.val) {
        case "message": {
          const I = tokens[i + 1];
          const L = tokens[i + 2];
          assert(I.type === "I" && L.type === "{");

          index[0] = i + 3;
          const inner = parseDoc(tokens, index);
          i = index[0];

          doc.push({ type: "message", name: [I.val], inner });
          assert(tokens[i].type === "}");
          i++;
          continue;
        }
        case "enum": {
          const I = tokens[i + 1];
          const L = tokens[i + 2];
          assert(I.type === "I" && L.type === "{");
          i += 3;
          const inner: [string, number][] = [];
          while (tokens[i].type !== "}" && i < tokens.length) {
            if (tokens[i].type === ";") {
              i++;
              continue;
            }
            const rev = parseReserved(tokens, i);
            if (rev !== null) {
              inner.push(...rev[0].map<[string, number]>(i => ["_reserved_" + i, i]));
              i = rev[1];
            } else {
              const I = tokens[i];
              const E = tokens[i + 1];
              const N = tokens[i + 2];
              assert(I.type === "I" && E.type === "=" && N.type === "N");
              inner.push([I.val, N.val]);
              i += 3;
            }
          }
          doc.push({ type: "enum", name: [I.val], inner })
          assert(tokens[i].type === "}");
          i++;
          continue;
        }
        case "oneof": {
          const I = tokens[i + 1];
          const L = tokens[i + 2];
          assert(I.type === "I" && L.type === "{");
          i += 3;
          const arr: VarDef[] = [];
          while (tokens[i].type !== "}" && i < tokens.length) {
            if (tokens[i].type === ";") {
              i++;
              continue;
            }
            const rev = parseReserved(tokens, i);
            if (rev !== null) {
              arr.push(...rev[0].map(t => ({
                type: "var" as const,
                class: ["int32"],
                name: "_reserved_" + t,
                index: t,
                optional: true,
                repeated: false
              })));
              i = rev[1];
            } else {
              const [v, i_] = parseVar(tokens, i);
              i = i_;
              arr.push(v);
            }
          }
          doc.push({ type: "oneof", name: I.val, inner: arr });
          assert(tokens[i].type === "}");
          i++;
          continue;
        }
        default: {
          // reserved
          const rev = parseReserved(tokens, i);
          if (rev !== null) {
            doc.push(...rev[0].map(t => ({
              type: "var" as const,
              class: ["int32"],
              name: "_reserved_" + t,
              index: t,
              optional: true,
              repeated: false
            })));
            i = rev[1];
            continue;
          }
          // var def;
          const [v, i_] = parseVar(tokens, i);
          i = i_;
          if (v instanceof Array) {
            doc.push(...v);
          } else {
            doc.push(v);
          }
          continue;
        }
      }
    }
    console.error("Doc", doc);
    throw new Error("Encounter Invalid Token: " + tokens.slice(i, i + 5).forEach(console.dir));
  }
  return doc;
}

function parseReserved(tokens: Token[], i: number): [number[], new_i: number] | null {
  const t = tokens[i];
  if (t.type === "I" && t.val === "reserved") {
    i += 1;
    const arr: number[] = [];
    while (i + 1 < tokens.length) {
      const N = tokens[i];
      const T = tokens[i + 1];
      assert(N.type === "N");
      if (T?.type === "I" && T.val === "to") {
        // reserved n to m;
        const M = tokens[i + 2];
        assert(M.type === "N");
        i += 3;
        assert(M.val >= N.val);
        arr.push(...Array.from({ length: M.val - N.val + 1 }, (_, i) => N.val + i));
      } else {
        // reserved n;
        arr.push(N.val);
        i++;
      }
      if (tokens[i].type === ",") {
        i++;
      } else {
        break;
      }
    }
    return [arr, i];
  }
  return null;
}

function parseVar(token: Token[], i: number): [VarDef, new_i: number] {
  const res: VarDef = {
    type: "var",
    class: [],
    name: "",
    index: 0,
    optional: false,
    repeated: false
  }
  while (i < token.length) {
    const p = token[i];
    assert(p.type === "I");
    switch (p.val) {
      case "optional":
        res.optional = true;
        i++;
        continue;
      case "repeated":
        res.repeated = true;
        i++;
        continue;
    }
    break;
  }
  while (true) {
    const P = token[i];
    const Q = token[i + 1];
    i += 2;
    assert(P.type === "I");
    res.class.push(P.val);
    switch (Q.type) {
      case ".":
        continue;
      case "I":
        res.name = Q.val;
        break;
      default:
        throw new Error("Invalid var def!");
    }
    break;
  }
  const R = token[i];
  const S = token[i + 1];
  i += 2;
  assert(R.type === "=" && S.type === "N");
  res.index = S.val;
  return [res, i];
}

const SystemVar = new Map([
  ["int32", "number"],
  ["int64", "number"],
  ["bool", "boolean"],
  ["float", "number"],
  ["string", "string"]
]);
class TypeLayers {
  parent: TypeLayers | null;
  name: string;
  message: Map<string, TypeLayers>;
  enums: Map<string, [string, number][]>;
  vars: Map<number, VarDef>;
  var_names: Set<string>;
  constructor(name: string, doc: Root[] | null, parent?: TypeLayers) {
    this.parent = parent ?? null;
    this.vars = new Map<number, VarDef>();
    this.var_names = new Set<string>();
    this.name = name;
    this.message = new Map<string, TypeLayers>();
    this.enums = new Map<string, [string, number][]>();
    for (const d of doc ?? []) {
      switch (d.type) {
        case "message":
          assert(d.name.length === 1 && !this.message.has(d.name[0]));
          this.message.set(d.name[0], new TypeLayers(d.name[0], d.inner, this));
          break;
        case "enum":
          assert(d.name.length === 1 && !this.message.has(d.name[0]));
          this.message.set(d.name[0], new TypeLayers(d.name[0], null, this));
          this.enums.set(d.name[0], structuredClone(d.inner));
          break;
        case "oneof":
          for (const p of d.inner) {
            assert(!this.vars.has(p.index) && !this.var_names.has(p.name));
            this.var_names.add(p.name);
            const p1 = structuredClone(p);
            p1.optional = true;
            p1.comment = `One of the field: ${d.name}`;
            this.vars.set(p.index, p1);
          }
          break;
        case "var":
          assert(!this.vars.has(d.index) && !this.var_names.has(d.name));
          this.var_names.add(d.name);
          this.vars.set(d.index, structuredClone(d));
          break;
      }
    }
  }
  getPath(): string[] {
    if (this.parent === null) {
      return [];
    }
    return [...this.parent.getPath(), this.name];
  }
  hasChild(path: string[]): boolean {
    if (path.length <= 1) {
      return this.message.has(path[0]);
    }
    return this.message.get(path[0])?.hasChild(path.slice(1)) ?? false;
  }
  searchFullPath(path: string[]): string[] | null {
    if (this.hasChild(path)) {
      return [...this.getPath(), ...path];
    }
    return this.parent?.searchFullPath(path) ?? null;
  }
  searchVars() {
    for (const v of this.message.values()) {
      v.searchVars();
    }
    for (const v of this.vars.values()) {
      assert(v.class.length > 0);
      if (v.class.length === 1 && SystemVar.has(v.class[0])) {
        // System Var
        continue;
      }
      const c = this.searchFullPath(v.class);
      if (!c) {
        throw new Error(`Cannot find class '${v.class.join(".")}' At '${this.getPath().join(".")}'!`)
      }
      v.class = c;
    }
  }
  dump(type: "ts", config: {
    version: string,
    padding?: number,
    src_path: string,
    dest_path?: string,
    separator?: string,
  }) {
    switch (type) {
      case "ts":
        const out_file = config.dest_path ?? (config.src_path + ".ts");
        const header = `/** Types declaration for protobuf
 * This file is auto generated by utils/protobuf/proto2ts.ts
 * Do not edit this file directly.
 *
 * @version ${config.version}
 * @date ${new Date().toString()}
 * @author Aluria
 * 
 * @source ${config.src_path}
 * @dest ${out_file}
 * @program ${import.meta.url}
 */\n\n`;
        const separator = config.separator ?? "$";
        const ts = this.dump_ts(0, config.padding ?? 2, separator);
        writeFileSync(out_file, header + ts);
        break;
    }
  }
  /**
   * [Vars]
   * [Nodes]
   */
  private dump_ts(depth: number, padding: number, SEP: string): string {
    const PAD = " ".repeat(padding);
    let ts = "";
    if (depth > 0) ts += "export interface " + this.getPath().join(SEP) + " {\n";
    for (const v of this.vars.values()) {
      // /** Id = var_index
      //  *
      //  * var_comments
      //  */
      // or /** Id = var_index */
      // var_name?: var_type[];
      ts += `${PAD}/** Index = ${v.index}${v.comment === undefined ? "" : `\n${PAD} *\n${PAD} * ${v.comment}\n${PAD}`} */\n`;
      const _type = v.class.length === 1 ?
        SystemVar.get(v.class[0]) ?? v.class.join(SEP) :
        v.class.join(SEP);
      const var_name = v.name + (v.optional ? "?" : "");
      const var_type = _type + (v.repeated ? "[]" : "");
      if (depth > 0) ts += `${PAD}${var_name}: ${var_type};\n`;
      else ts += `export type ${var_name} = ${var_type};\n`;
    }
    if (depth > 0) ts += "}\n";


    for (const v of this.message.values()) {
      if (this.enums.has(v.name)) {
        const class_name = v.getPath().join(SEP);

        ts += "export const " + class_name + " = {\n";
        for (const e of this.enums.get(v.name)!) {
          ts += `${PAD}${e[0]}: ${e[1]},\n`;
        }
        ts += "} as const;\n";
        ts += `export type ${class_name} = (typeof ${class_name})[keyof typeof ${class_name}];\n`;
      } else {
        ts += v.dump_ts(depth + 1, padding, SEP);
      }
    }
    return ts;
  }
}



if (import.meta.main) {
  if (argv[2] === "-h" || argv[2] === "--help") {
    console.log("Usage: node ./utils/protobuf/proto2ts.ts [output_path] [input_path]");
  } else {
    const path = argv[3] ?? import.meta.dirname + '/gia.proto';
    main(path);
  }
}

function main(input_path: string) {
  const proto_raw = readFileSync(input_path).toString();
  const version = /^\s*\/\/\s*@?version:?\s*(.+)$/m.exec(proto_raw);
  if (version === null) {
    throw new Error("ProtoBuf file is lack of version info such as '// @version: 1.0.0'");
  }
  const proto = proto_raw
    .split("\n")
    .map(s => s.replace(/\/\/.*$/m, ""))
    .join(" ")
    .replaceAll(/(\s|\n|\r)+/g, " ")
    .replace(/^syntax\s*=.+?;/, "");
  // console.log(proto);

  const t = tokenize(proto);
  const doc = parseDoc(t);
  const layers = new TypeLayers("root", doc);
  layers.searchVars();
  layers.dump("ts", {
    version: version[1].trim(),
    src_path: input_path,
    separator: "_",
  });

}