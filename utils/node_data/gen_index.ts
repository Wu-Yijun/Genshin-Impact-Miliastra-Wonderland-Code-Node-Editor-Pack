import { readFileSync, writeFileSync } from "fs";
import { NODE_PIN_RECORDS, type SingleNodeData } from "./node_pin_records.ts";
import yaml from "yaml";
import { get_id, is_reflect, type NodePinsRecords, reflects } from "../gia_gen/nodes.ts";
import { get_concrete_index } from "./helpers.ts";
import assert from "assert";
import { ENUM_ID, ENUM_VALUE } from "./enum_id.ts";
import { VarType } from "../protobuf/gia.proto.ts";
import { TYPES_LIST } from "./types_list.ts";
import { NODE_ID } from "./node_id.ts";

// ====== Begin of Document Schema ====== //
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
const Language = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as const;
type Translations = Partial<{ [key in typeof Language[number]]: string }>; // Display names of the entry in different languages
// ====== End of Document Schema ====== //

export type { Document, NodeEntry as NodeList, TypeMapping };

type node_id_type = {
  [key in NodeEntry["Class"]]: { [key: string]: { [key: number]: string; } }[];
} & {
  Header: { [key: string]: string };
};

function find_class_family(server: node_id_type, id: number): [NodeEntry["Class"], string, string] {
  for (const [class_, value] of Object.entries(server)) {
    if (class_ === "Header") continue;
    for (const families of value as { [key: string]: { [key: number]: string } }[]) {
      for (const [family, items] of Object.entries(families)) {
        if (items[id]) return [class_ as NodeEntry["Class"], family, items[id].replace(/^\d+\./, "").trim()];
      }
    }
  }
  throw new Error("Cannot find class and family for " + id);
}

function get_type_map(rec: NodePinsRecords, index: number): TypeMapping {
  const GenericId = rec.reflectMap![index][0];
  const Type = rec.reflectMap![index][1];
  const InputsIndexOfConcrete = rec.inputs.map((str, j) =>
    is_reflect(str) ?
      get_concrete_index(rec.id, 3, j, get_id(reflects(str, Type))) :
      null
  );
  const OutputsIndexOfConcrete = rec.outputs.map((str, j) =>
    is_reflect(str) ?
      get_concrete_index(rec.id, 4, j, get_id(reflects(str, Type))) :
      null
  );
  return { ConcreteId: GenericId, Type, InputsIndexOfConcrete, OutputsIndexOfConcrete };
}

function main() {
  const DIR = "./utils/node_data/";
  const file = readFileSync(DIR + "concrete_map.ts").toString();
  const Schema = readFileSync(import.meta.filename).toString().replaceAll("\r", "").match(/\/\/\s*=*\s*Begin\s*of\s*Document\s*Schema\s*.+?\/\/\s*=*\s*End\s*of\s*Document\s*Schema\s*=*.+?\n/s)![0];
  const doc: Document = {
    Version: file.match(/@version (.+)/)![1],
    Author: file.match(/@author (.+)/)![1],
    Date: new Date().toString(),
    Description: `This document contains all necessary information for this project, including types, nodes, and enums.`,
    Schema: Schema,
    TypesList: TYPES_LIST.sort((a, b) => a.ID - b.ID),
    NodesList: [],
    EnumList: [],
  };
  assert(TYPES_LIST.length === Object.keys(VarType).length - 1);

  // ====== Nodes List ======
  const server: node_id_type = yaml.parse(readFileSync(DIR + "yaml/server_node_id.yaml").toString());
  // const client = readFileSync(DIR + "client_node_id.yaml").toString();

  for (const rec of NODE_PIN_RECORDS as SingleNodeData[]) {
    const Name = rec.name!.replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^(?=\d)/, "_").replace(/_+$/, "");
    const Translations = { "en": rec.name! };
    const ID = rec.id;
    const [Class, Family, name] = find_class_family(server, rec.id);
    assert.equal(rec.name, name);
    const Type = rec.reflectMap === undefined ? "Simple" : "Generic";
    const Range = "Server";
    const Inputs = rec.inputs;
    const Outputs = rec.outputs;
    const TypeMappings = rec.reflectMap?.map((_, i) => get_type_map(rec, i));
    TypeMappings?.sort((a, b) => a.ConcreteId - b.ConcreteId);
    if (ID === NODE_ID.Enumerations_Equal__Generic) {
      TypeMappings!.forEach(t => t.InputsIndexOfConcrete.fill(parseInt(t.Type.slice(6, -2))))
    }
    doc.NodesList.push({
      Name,
      Translations,
      ID,
      Type,
      Range,
      Class,
      Family,
      Inputs,
      Outputs,
      TypeMappings,
    });
  }
  doc.NodesList.sort((a, b) => a.ID - b.ID);

  // ====== Enum List ======
  const values = Object.entries(ENUM_VALUE);
  const enum_id = (yaml.parse(readFileSync(DIR + "yaml/enum_id_raw.yaml").toString())["Enums"] as string)
    .split("\n").map(line => line.trim()).filter(line => line.length > 0)
    .map(line => line.split("_")).filter(([_, item]) => parseInt(item).toString() !== item);
  // console.log(enum_id);
  for (const [Name, ID] of Object.entries(ENUM_ID)) {
    if (ID === ENUM_ID.Generic) continue;
    if (ID === ENUM_ID.LocalVariable) continue;
    if (ID === ENUM_ID.VariableSnapshot) continue;
    const Translations = {
      "en": Name.replaceAll("_", " ").replaceAll("For ", "for ").replaceAll("Of ", "of "),
    }
    const Items: EnumItem[] = [];
    const list = enum_id.filter(x => x[0] === Translations.en);
    assert(list.length > 0);
    for (const l of list) {
      const Name1 = l[1].replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^(?=\d)/, "_").replace(/_+$/, "");
      const Translations1 = { "en": l[1] };
      const full_name = Name.replaceAll(/_([a-z]?)/g, (_, p1) => p1.toUpperCase()) + "_" + Name1.replaceAll(/_([a-z]?)/g, (_, p1) => p1.toUpperCase());
      let ID = ENUM_VALUE[full_name as keyof typeof ENUM_VALUE];
      Items.push({
        Name: Name1,
        Translations: Translations1,
        ID
      })
    }
    Items.sort((a, b) => a.ID - b.ID);

    doc.EnumList.push({
      Name,
      Translations,
      ID,
      Items,
    })
  }
  doc.EnumList.sort((a, b) => a.ID - b.ID);

  // console.log(doc.EnumList[0]);

  writeFileSync(DIR + "index.yaml", yaml.stringify(doc, { lineWidth: 150 }));
  writeFileSync(DIR + "index.json", JSON.stringify(doc, null, 2));
}

if (import.meta.main) {
  main();
}