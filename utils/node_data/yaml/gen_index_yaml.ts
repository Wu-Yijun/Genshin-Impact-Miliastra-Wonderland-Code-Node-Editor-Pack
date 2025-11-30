import { readFileSync, writeFileSync } from "fs";
import { NODE_PIN_RECORDS } from "../node_pin_records.ts";
import yaml from "yaml";
import { get_id, is_reflect, type NodePinsRecords, reflects } from "../../gia_gen/nodes.ts";
import { get_concrete_index } from "../helpers.ts";
import assert from "assert";
import { EnumIdList, EnumNode_Value } from "../enums.ts";

// ====== Begin of Document Schema ====== //
interface Document {
  Version: string;
  Author: string;
  Date: string;
  Schema: string;
  TypesList: TypeList[];
  BaseTypesList: TypeList[];
  NodesList: NodeList[];
  EnumList: EnumEntry[];
}
interface TypeList {
  Name: string;
  Translations: Translations;
  ID: number;
  BaseType: string;
}
interface NodeList {
  Name: string;
  Translations: Translations;
  ID: number;
  Type: "Simple" | "Generic";
  Range: "Server" | "Client";
  Class: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Hidden";
  Family: string;
  Inputs: string[];
  Outputs: string[];
  TypeMappings?: TypeMapping[];
}
interface TypeMapping {
  GenericId: number;
  Type: string;
  InputsIndexOfConcrete: (number | null)[];
  OutputsIndexOfConcrete: (number | null)[];
}
const Language = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"];
type Language = typeof Language[number];
type Translations = {
  [key in Language]: string;
}
interface EnumEntry {
  Name: string;
  Translations: Translations;
  ID: number; // This id is selected as index of concrete in Node EnumEqual
  Items: EnumItem[];
}
interface EnumItem {
  Name: string;
  Translations: Translations;
  ID: number; // This id is unique value for each item
}
// ====== End of Document Schema ====== //

export type { Document, NodeList, TypeMapping };

type node_id_type = {
  [key in NodeList["Class"]]: { [key: string]: { [key: number]: string; } }[];
} & {
  Header: { [key: string]: string };
};

function find_class_family(server: node_id_type, id: number): [NodeList["Class"], string, string] {
  for (const [class_, value] of Object.entries(server)) {
    if (class_ === "Header") continue;
    for (const families of value as { [key: string]: { [key: number]: string } }[]) {
      for (const [family, items] of Object.entries(families)) {
        if (items[id]) return [class_ as NodeList["Class"], family, items[id].replace(/^\d+\./, "").trim()];
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
  return { GenericId, Type, InputsIndexOfConcrete, OutputsIndexOfConcrete };
}

function main() {
  const DIR = "./utils/node_data/yaml/";
  const file = readFileSync(DIR + "../concrete_map.ts").toString();
  const Schema = readFileSync(import.meta.filename).toString().replaceAll("\r", "").match(/\/\/\s*=*\s*Begin\s*of\s*Document\s*Schema\s*.+?\/\/\s*=*\s*End\s*of\s*Document\s*Schema\s*=*.+?\n/s)![0];
  const doc: Document = {
    Version: file.match(/@version (.+)/)![1],
    Author: file.match(/@author (.+)/)![1],
    Date: new Date().toString(),
    Schema: Schema,
    TypesList: [],
    BaseTypesList: [],
    NodesList: [],
    EnumList: [],
  };

  // ====== Nodes List ======
  const server: node_id_type = yaml.parse(readFileSync(DIR + "server_node_id.yaml").toString());
  // const client = readFileSync(DIR + "client_node_id.yaml").toString();

  for (const rec of NODE_PIN_RECORDS) {
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
    TypeMappings?.sort((a, b) => a.GenericId - b.GenericId);
    if (Name === "Enumerations_Equal") {
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
  const values = Object.entries(EnumNode_Value);
  const enum_id = (yaml.parse(readFileSync(DIR + "./enum_id_raw.yaml").toString())["Enums"] as string)
    .split("\n").map(line => line.trim()).filter(line => line.length > 0)
    .map(line => line.split("_")).filter(([_, item]) => parseInt(item).toString() !== item);
  // console.log(enum_id);
  for (const [Name, ID] of Object.entries(EnumIdList)) {
    if (ID === EnumIdList.Generic) continue;
    if (ID === EnumIdList.LocalVariable) continue;
    if (ID === EnumIdList.VariableSnapshot) continue;
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
      let ID = EnumNode_Value[full_name as keyof typeof EnumNode_Value];
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

  writeFileSync(DIR + "../index.yaml", yaml.stringify(doc));
}

if (import.meta.main) {
  main();
}