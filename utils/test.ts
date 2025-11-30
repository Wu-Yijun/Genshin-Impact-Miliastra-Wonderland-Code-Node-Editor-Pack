
// ====== Begin of Document Schema ====== //

import { readFileSync, writeFileSync } from "fs";
import { parse, stringify } from "./gia_gen/nodes.ts";
import assert from "assert";
import { inspect } from "util";
import { NODE_ID } from "./node_data/node_id.ts";
import { ENUM_ID } from "./node_data/enum_id.ts";

interface Document {
  Version: string;
  Author: string;
  Date: string;
  Description: string;
  Schema: string;
  TypesList: TypeEntry[];
  NodesList: NodeEntry[];
  EnumList: EnumEntry[];
}

interface Entry {
  Name: string;               // Safe name used as object keys or query keys
  Translations: Translations; // Raw texts displayed in game
  ID: number;                 // An in-game unique id of the entry
}

interface TypeEntry extends Entry {
  Expression: string;     // Static representation expression for convertor
  DSLName: string;        // Name of var class(type) in DSL
  BaseType: string;       // Base type of the entry in game runtime
  BaseTypeID: number;     // Id of the base type
}

interface NodeEntry extends Entry {
  Type: "Simple" | "Generic";         // Whether a node is fixed-defined or generic-defined 
  Range: "Server" | "Client";         // The applicable range of the node
  Class: typeof NodeClasses[number];  // The class of the node
  Family: string;                     // Family(sub-class) of the node
  Inputs: string[];                   // List of Input parameter types of the node
  Outputs: string[];                  // List of Output parameter types of the node
  TypeMappings?: TypeMapping[];       // Type mappings is required when the node Type is Generic. 
}

interface EnumEntry extends Entry {
  Items: EnumItem[];  // List of Enum items of current enum
}

interface TypeMapping {
  ConcreteId: number;                         // Id of this concrete type
  Type: string;                               // Type mapping rules of this concrete type
  InputsIndexOfConcrete: (number | null)[];   // List of Input parameters' index of concrete
  OutputsIndexOfConcrete: (number | null)[];  // List of Output parameters' index of concrete
}

interface EnumItem extends Entry {

}

const NodeClasses = ["Execution", "Trigger", "Control", "Query", "Arithmetic", "Hidden"] as const;

const Language = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as
  const;

type Translations = Partial<{ [key in typeof Language[number]]: string }>; // Display names of the entry in different

// ====== End of Document Schema ====== //

const doc: Document = JSON.parse(readFileSync("./utils/node_data/index.json").toString());
const res: Record<string, number> = {};
const rep = {
  L_: "List_",
  D_: "Dict_",
  S_: "Struct_",
  Int: "Int",
  Flt: "Float",
  Bol: "Bool",
  Str: "Str",
  Vec: "Vec",
  Gid: "GUID",
  Ety: "Entity",
  Pfb: "Prefab",
  Fct: "Faction",
  Cfg: "Config",
}
doc.NodesList.forEach(x => {
  if (!x.TypeMappings) {
    res[x.Name] = x.ID;
  }
  res[x.Name + "__Generic"] = x.ID;
  x.TypeMappings?.forEach(y => {
    const t = parse(y.Type);
    assert(t.t === "s");
    let str = t.f.map(x => stringify(x[1])).join(",").replaceAll(/[^0-9A-Za-z]+/gs, "_").replace(/^_/, "").replace(/_$/, "");
    Object.entries(rep).forEach(([k, v]) => {
      str = str.replaceAll(k, v);
    })
    if (x.ID === NODE_ID.Enumerations_Equal__Generic) {
      assert(t.f[0][1].t === "e")
      str = Object.keys(ENUM_ID)[Object.values(ENUM_ID).indexOf(t.f[0][1].e as any)];
    }
    res[x.Name + "__" + str] = y.ConcreteId;
  })
})

// console.log(res);
writeFileSync("./temp", inspect(res, { maxArrayLength: null }));