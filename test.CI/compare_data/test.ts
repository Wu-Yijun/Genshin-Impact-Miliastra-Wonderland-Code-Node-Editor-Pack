import { readFileSync, writeFileSync } from "fs";
import { nodeDefinitions } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts";
import serverNodeList from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.server.ts";
import clientNodeList from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.client.ts";
import { assert } from "../../utils/utils.ts";

import { data } from "../../utils/node_data/data.ts";

function server() {
  const nodes = data.NodesList.filter(x => x.Range === "Server");
  const ref_nodes = nodeDefinitions;
  nodes.forEach((n) => n.Translations.en = n.Translations.en?.toLowerCase());
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


function client() {
  const nodes = data.NodesList.filter(x => x.Range === "Client");
  const ref_nodes = nodeDefinitions;
  nodes.forEach((n) => n.Translations.en = n.Translations.en?.toLowerCase());
  ref_nodes.forEach(n => n.displayNameEN = n.displayNameEN.toLowerCase());

  const clientNode = [...new Set(Object.values(clientNodeList).flat().map(id => ref_nodes.find(x => x.id === id)))];
  assert(clientNode.every(x => x !== undefined));

  const statistics = {
    find: 0,
    unfind: 0,
    // ref_without_id: [] as any[],
    ref_without_name: [] as any[],
    ref_with_wrong_name_id: [] as any[],
    missing_ref: [] as any[],
    missing_this: new Set(clientNode.map(x => x.id)),
  };
  for (const node of nodes) {
    const n = clientNode.find(n => n.officialID === node.ID);
    const m = clientNode.find(n => n.displayNameEN === node.Translations["en"]);
    statistics.find += 1;
    if (n === undefined) {
      if (m === undefined) {
        console.log("Not find in Columbina:", node.Translations["en"]);
        debugger;
        statistics.unfind += 1;
        statistics.find -= 1;
        statistics.missing_ref.push([node.ID, node.Translations["en"]]);
      } else {
        if (m.officialID !== undefined && m.officialID > 0) {
          statistics.ref_with_wrong_name_id.push([node.ID, node.Translations["en"], m.officialID]);
        } else {
          // statistics.ref_without_id.push([node.ID, node.Translations["en"]]);
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
  // console.dir(statistics, { depth: null });
  writeFileSync("./dist/client_diff.json", JSON.stringify(statistics));
  console.log("Saved to `./dist/client_diff.json`");
}

function main() {
  server();
  client();
}

main();