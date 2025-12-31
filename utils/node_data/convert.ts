import * as OLD from "./data.old.ts";
import { type Document, GRAPH_CATEGORY_CONSTS, GRAPH_ID_RANGE, type NodeDef, type PinDef, type EnumDef, type TypeDef } from "./consts.ts";

import { writeFileSync } from "fs";

const doc: Document = {
  Version: OLD.Version,
  GameVersion: OLD.GameVersion,
  Author: OLD.Author,
  Date: OLD.Date,
  Description: OLD.Description,
  Schema: "Skip",
  SystemConstants: { GRAPH_CATEGORY_CONSTS, GRAPH_ID_RANGE },
  Types: OLD.TypesList.map((item: any) => ({
    Identifier: null as any,
    Alias: [item.Name],
    ID: item.ID,
    ClientID: item.ClientID,
    InGameName: item.Translations,
    DSLName: item.DSLName,
    BaseType: item.BaseType,
    BaseTypeID: item.BaseTypeID,
  } as any as TypeDef)),
  Nodes: (OLD as any).NODES_LIST.map((item: any) => ({
    Identifier: `${item.Class}.${item.Family.replace(/^(IVXL)+\. /, "").replace(/\./g, "")}.${item.Name}`,
    ID: item.ID,
    KernelID: item.ConcreteID,
    InGameName: item.Translations,
    Alias: [item.Name],
    Type: item.Type === "Simple" ? "Fixed" : "Variant",
    System: item.Range,
    Domain: item.Class as any,
    FlowPins: (function () {
      if (item.Class === "Trigger") return [{ Identifier: "FlowOut", Direction: "Out" } as any];
      if (["Execution", "Control"].includes(item.Class)) return [{ Identifier: "FlowIn", Direction: "In" }, { Identifier: "FlowOut", Direction: "Out" }] as any;
      return [];
    })(),
    DataPins: [
      ...item.Inputs.map((type: string, i: number) => ({
        Identifier: `Input${i}`,
        Direction: "In",
        Type: type,
        Label: null as any,
        Placeholder: null as any,
        ShellIndex: i,
        KernelIndex: i,
        Visibility: "Display",
        Connectability: true,
      })),
      ...item.Outputs.map((type: string, i: number) => ({
        Identifier: `Output${i}`,
        Direction: "Out",
        Type: type,
        Label: null as any,
        Placeholder: null as any,
        ShellIndex: i,
        KernelIndex: i,
        Visibility: "Display",
        Connectability: true,
      })),
    ] as PinDef[],
    Variants: item.TypeMappings?.map((m: any) => ({
      Constraints: m.Type,
      KernelID: m.ConcreteId,
      InjectedContents: [],
    })),
    Implementation: null as any,
  } as NodeDef)),
  Enums: [
    ...OLD.EnumList.map(item => ({ item, System: "Server" as const })),
    ...OLD.ClientEnumList.map(item => ({ item, System: "Client" as const })),
  ].map(({ item, System }) => ({
    Identifier: null as any,
    System: System,
    ID: item.ID,
    InGameName: item.Translations,
    Alias: [item.Name],
    Items: item.Items.map((entry: any) => ({
      Identifier: null as any,
      ID: entry.ID,
      InGameName: entry.Translations,
      Alias: [entry.Name],
    })),
  } as EnumDef)),
};

writeFileSync(import.meta.dirname + "/data.json", JSON.stringify(doc, null, 2));