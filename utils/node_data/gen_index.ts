import { readFileSync, writeFileSync } from "fs";
import { NODE_PIN_RECORDS, NODE_PIN_RECORDS_CLIENT, type NodePinsRecords, type SingleNodeData } from "./node_pin_records.ts";
import yaml from "yaml";
import { get_id, get_id_client, is_reflect, reflects } from "../gia_gen/nodes.ts";
import { get_index_of_concrete } from "./helpers.ts";
import { assert, assertEq } from "../../utils/utils.ts";
import { ENUM_ID, ENUM_VALUE } from "./enum_id.ts";
import { VarType } from "../protobuf/gia.proto.ts";
import { TYPES_LIST } from "./types_list.ts";
import { CLIENT_NODE_ID, NODE_ID } from "./node_id.ts";
import { inspect } from "util";


import { AUTHOR, type EnumItem, GAME_VERSION, DATA_SCHEMA_VERSION, type Document, type NodeEntry, type TypeMapping, GRAPH_CONSTS } from "./consts.ts";



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

function get_type_map_client(rec: NodePinsRecords, index: number): TypeMapping {
  const GenericId = rec.reflectMap![index][0];
  assert(typeof GenericId === "string");
  const Type = rec.reflectMap![index][1];
  const InputsIndexOfConcrete = rec.inputs.map((str, j) =>
    is_reflect(str) ?
      get_index_of_concrete(rec.id, true, j, get_id_client(reflects(str, Type))) :
      null
  );
  const OutputsIndexOfConcrete = rec.outputs.map((str, j) =>
    is_reflect(str) ?
      get_index_of_concrete(rec.id, false, j, get_id_client(reflects(str, Type))) :
      null
  );
  return { ConcreteId: parseInt(GenericId.split(" ")[1]), Type, InputsIndexOfConcrete, OutputsIndexOfConcrete };
}

function get_type_map(rec: NodePinsRecords, index: number): TypeMapping {
  const GenericId = rec.reflectMap![index][0];
  assert(typeof GenericId === "number");
  const Type = rec.reflectMap![index][1];
  const InputsIndexOfConcrete = rec.inputs.map((str, j) =>
    is_reflect(str) ?
      get_index_of_concrete(rec.id, true, j, get_id(reflects(str, Type))) :
      null
  );
  const OutputsIndexOfConcrete = rec.outputs.map((str, j) =>
    is_reflect(str) ?
      get_index_of_concrete(rec.id, false, j, get_id(reflects(str, Type))) :
      null
  );
  return { ConcreteId: GenericId, Type, InputsIndexOfConcrete, OutputsIndexOfConcrete };
}

function main() {
  const DIR = import.meta.dirname + '/';
  const Schema = readFileSync(DIR + "consts.ts").toString().replaceAll("\r", "").match(/\/\/\s*=*\s*Begin\s*of\s*Document\s*Schema\s*.+?\/\/\s*=*\s*End\s*of\s*Document\s*Schema\s*=*.+?\n/s)![0];
  const doc: Document = {
    Version: DATA_SCHEMA_VERSION,
    GameVersion: GAME_VERSION,
    Author: AUTHOR,
    Date: new Date().toString(),
    Description: `This document contains all necessary information for this project, including types, nodes, and enums.`,
    Schema: Schema,
    TypesList: TYPES_LIST.sort((a, b) => a.ID - b.ID),
    NodesList: [],
    EnumList: [],
    ClientEnumList: [],
    GraphConstList: GRAPH_CONSTS,
  };
  assert(TYPES_LIST.length === Object.keys(VarType).length - 1);

  // ====== Nodes List ======
  const server: node_id_type = yaml.parse(readFileSync(DIR + "yaml/server_node_id.yaml").toString());
  const client: node_id_type = yaml.parse(readFileSync(DIR + "yaml/client_node_id.yaml").toString());

  // Server
  for (const rec of NODE_PIN_RECORDS as SingleNodeData[]) {
    const Name = rec.name!.replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^_/, "").replace(/^(?=\d)/, "_").replace(/_+$/, "");
    const Translations = { "en": rec.name! };
    const ID = rec.id;
    const [Class, Family, name] = find_class_family(server, rec.id);
    assertEq(rec.name, name);
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
  // Client
  for (const rec of NODE_PIN_RECORDS_CLIENT as (SingleNodeData & { cid?: number })[]) {
    const Name = rec.name!.replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^_/, "").replace(/^(?=\d)/, "_").replace(/_+$/, "");
    const Translations = { "en": rec.name };
    const ID = rec.id;
    const [Class, Family, name] = find_class_family(client, rec.id);
    assertEq(rec.name, name);
    const Type = rec.reflectMap === undefined ? "Simple" : "Generic";
    const Range = "Client";
    const Inputs = rec.inputs;
    const Outputs = rec.outputs;
    const ConcreteID = rec.cid;
    const TypeMappings = rec.reflectMap?.map((_, i) => get_type_map_client(rec, i));
    TypeMappings?.sort((a, b) => a.ConcreteId - b.ConcreteId);
    if (ID.toString() === CLIENT_NODE_ID.Enumeration_Match__Generic.split(" ")[0]) {
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
      ConcreteID,
      TypeMappings,
    });
  }
  doc.NodesList.sort((a, b) => a.ID - b.ID);

  // ====== Enum List ======

  (() => {
    const enum_id = (yaml.parse(readFileSync(DIR + "yaml/enum_id_raw.yaml").toString())["Enums"] as string)
      .split("\n").map(line => line.trim()).filter(line => line.length > 0)
      .map(line => line.split("_")).filter(([_, item]) => parseInt(item).toString() !== item);
    // console.log(enum_id);
    for (const [Name, ID] of Object.entries(ENUM_ID)) {
      // if (ID === ENUM_ID.Generic) continue;
      if (ID === ENUM_ID.LocalVariable) continue;
      if (ID === ENUM_ID.VariableSnapshot) continue;
      const Translations = {
        "en": Name.replaceAll("_", " ").replaceAll("For ", "for ").replaceAll("Of ", "of "),
      }
      const Items: EnumItem[] = [];
      const list = enum_id.filter(x => x[0] === Translations.en);
      if (Name !== "Generic") assert(list.length > 0);
      for (const l of list) {
        const Name1 = l[1].replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^(?=\d)/, "_").replace(/_+$/, "");
        const Translations1 = { "en": l[1] };
        const full_name = Name.replaceAll(/_([a-z]?)/g, (_, p1) => p1.toUpperCase()) + "_" + Name1.replaceAll(/_([a-z]?)/g, (_, p1) => p1.toUpperCase());
        let ID = ENUM_VALUE[full_name as keyof typeof ENUM_VALUE];
        Items.push({
          Name: Name1,
          Translations: Translations1,
          ID
        });
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
  })();

  // ====== Enum List 2 ======
  (() => {
    const data: { name: string, id: number, indexOfConcrete: number, items: Record<number, string> }[] =
      JSON.parse(readFileSync(DIR + "yaml/client_enum_list.json").toString());
    // console.log(enum_id);
    for (const item of data) {
      // if (ID === ENUM_ID.Generic) continue;
      if (item.id === ENUM_ID.LocalVariable) continue;
      if (item.id === ENUM_ID.VariableSnapshot) continue;
      const Translations = {
        "en": item.name,
      }
      const Name = item.name.replaceAll(/[^a-zA-Z0-9_]+/g, "_").replace(/^(?=\d)/, "_").replace(/_+$/, "");
      const Items: EnumItem[] = [];
      for (const [ID, Name1] of Object.entries(item.items)) {
        const Translations1 = { "en": Name1 };
        const full_name = Name1.replaceAll(/_([a-z]?)/g, (_, p1) => p1.toUpperCase());
        Items.push({
          Name: full_name,
          Translations: Translations1,
          ID: parseInt(ID),
        });
      }
      Items.sort((a, b) => a.ID - b.ID);

      doc.ClientEnumList.push({
        Name,
        Translations,
        ID: item.indexOfConcrete,
        Items,
      })
    }
    doc.ClientEnumList.sort((a, b) => a.ID - b.ID);
  })();


  // console.log(doc.EnumList[0]);

  writeFileSync(DIR + "index.yaml", yaml.stringify(doc, { lineWidth: 150 }));
  writeFileSync(DIR + "index.json", JSON.stringify(doc, null, 2));

  // generate ts version
  const FILE_DESC = `
/**
 * ${doc.Description}
 * 
 * Automatically generated by gen_index.ts
 * 
 * @author ${doc.Author}
 * @version ${doc.Version}
 * @date ${doc.Date}
 */
`;

  // const doc_keys = Object.keys(doc)
  const ts_file = [FILE_DESC];

  const upper = (str: string) => str.replace(/(?<=[a-z])(?=[A-Z])/g, "_").toUpperCase()

  ts_file.push(doc.Schema);
  for (const [key, val] of Object.entries(doc)) {
    let item_type = 'string';
    if (key === "NodesList") item_type = 'NodeEntry[]';
    if (key === "EnumList") item_type = 'EnumEntry[]';
    if (key === "ClientEnumList") item_type = 'EnumEntry[]';
    if (key === "TypesList") item_type = 'TypeEntry[]';
    if (key === "GraphConstList") item_type = 'GraphConst[]';
    ts_file.push(`export const ${upper(key)} = ${inspect(
      val,
      { depth: Infinity, maxArrayLength: Infinity, maxStringLength: Infinity, breakLength: item_type === "string" ? Infinity : 100 }
    )} as const satisfies ${item_type};`);
    ts_file.push(`export const ${key}: ${item_type} = ${upper(key)};`);
  }

  ts_file.push(`export const DOCUMENT = {
  ${Object.keys(doc).map(x => `${x}: ${upper(x)}`).join(",\n  ")}
} as const satisfies Document;`);
  ts_file.push("export const Document: Document = DOCUMENT;");
  ts_file.push("export const data: Document = Document;");

  writeFileSync(DIR + "data.ts", ts_file.join("\n\n"));
}



if (import.meta.main) {
  main();
}