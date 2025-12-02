import { readFileSync, writeFileSync } from "fs";
import { nodeDefinitions } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts";
import serverNodeList from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.server.ts";
import assert from "assert";


interface NodeEntry {
  Name: string;
  Translations: Translations;
  ID: number;
  Type: "Simple" | "Generic";
  Range: "Server" | "Client";
  Class: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | "Hidden";
  Family: string;
  Inputs: string[];
  Outputs: string[];
  TypeMappings?: {
    ConcreteId: number;
    Type: string;
    InputsIndexOfConcrete: (number | null)[];
    OutputsIndexOfConcrete: (number | null)[];
  }[];
}
const Language = ["cs", "de", "es", "en", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "tr", "zh-Hans", "zh-Hant"] as const;
type Translations = Partial<{ [key in typeof Language[number]]: string }>;



function main() {
  const data = JSON.parse(readFileSync("./utils/node_data/index.json").toString());
  const nodes: NodeEntry[] = data.NodesList;
  const ref_nodes = nodeDefinitions;
  nodes.forEach((n) => n.Translations["en"] = n.Translations["en"]?.toLowerCase());
  ref_nodes.forEach(n => n.displayNameEN = n.displayNameEN.toLowerCase());

  const serverNode = serverNodeList.map(id => ref_nodes.find(x => x.id === id));
  assert(serverNode.every(x => x !== undefined));

  const statistics = {
    find: 0,
    unfind: 0,
    ref_without_id: [] as any[],
    ref_without_name: [] as any[],
    ref_with_wrong_name_id: [] as any[],
    missing_ref: [] as any[],
    missing_this: new Set(serverNode.map(x => x.id)),
  };
  for (const node of nodes) {
    const n = serverNode.find(n => n.officialID === node.ID);
    const m = serverNode.find(n => n.displayNameEN === node.Translations["en"]);
    statistics.find += 1;
    if (node.ID == 725) debugger;
    if (n === undefined) {
      if (m === undefined) {
        statistics.unfind += 1;
        statistics.find -= 1;
        statistics.missing_ref.push([node.ID, node.Translations["en"]]);
      } else {
        if (m.officialID !== undefined && m.officialID > 0) {
          statistics.ref_with_wrong_name_id.push([node.ID, node.Translations["en"], m.officialID]);
        } else {
          statistics.ref_without_id.push([node.ID, node.Translations["en"]]);
        }
        assert(statistics.missing_this.delete(m.id));
      }
    } else {
      assert(statistics.missing_this.delete(n.id));
      if (m === undefined) {
        if (n.displayNameEN !== undefined && n.displayNameEN !== node.Translations["en"]) {
          statistics.ref_with_wrong_name_id.push([node.ID, node.Name, n.displayNameEN]);
        } else {
          statistics.ref_without_name.push([node.ID, node.Name, n.displayNameEN]);
        }
      } else {
        if (m !== n) {
          statistics.ref_with_wrong_name_id.push([node.ID, node.Name, [n.displayNameEN, n.officialID], [m.displayNameEN, m.officialID]]);
        }
        // console.log(node.ID, m.officialID);
      }
    }
  }
  console.dir(statistics, { depth: null });
  writeFileSync("./dist/server_diff.json", JSON.stringify(statistics));
  console.log("Saved to `./dist/server_diff.json`");
}

main();