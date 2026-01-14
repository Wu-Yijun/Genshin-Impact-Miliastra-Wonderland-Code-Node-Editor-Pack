import { readFileSync, writeFileSync } from "fs";
import path from "path";

// Define interfaces for data structures
interface NodeParam {
  index: number;
  name: string;
  nameZH: string;
  hint?: string;
  hintZH?: string;
}

interface NewNodeData {
  id: number;
  name: string;
  nameZH: string;
  desc: string;
  descZH: string;
  inPins?: NodeParam[];
  outPins?: NodeParam[];
  inParams?: NodeParam[];
  outParams?: NodeParam[];
  extraParams?: NodeParam[];
}

interface PinDef {
  Identifier: string;
  Direction: "In" | "Out";
  ShellIndex: number;
  Label: { [lang: string]: string };
  Description: { [lang: string]: string };
  Placeholder?: { [lang: string]: string };
}

interface NodeDef {
  Identifier: string;
  ID: number;
  Alias: string[];
  InGameName: { [lang: string]: string };
  Description: { [lang: string]: string };
  FlowPins: PinDef[];
  DataPins: PinDef[];
}

interface OldData {
  Nodes: NodeDef[];
}

// Load data
const baseDir = "utils/node_data/game_text";
const newNodesPath = path.join(baseDir, "nodes.json");
const oldDataPath = "utils/node_data/data.json";

const newNodes: NewNodeData[] = JSON.parse(readFileSync(newNodesPath, "utf-8"));
const oldData: OldData = JSON.parse(readFileSync(oldDataPath, "utf-8"));

// Index old nodes by ID
const oldNodesMap = new Map<number, NodeDef>();
oldData.Nodes.forEach(node => {
  oldNodesMap.set(node.ID, node);
});

const newNodeIds = new Set<number>();
newNodes.forEach(node => newNodeIds.add(node.id));

// Helper for comparing strings (handling null/undefined/empty)
function isDifferent(a: string | undefined | null, b: string | undefined | null): boolean {
  const s1 = (a || "").trim();
  const s2 = (b || "").trim();
  return s1 !== s2;
}

// Comparison and Sync
const addedNodes: string[] = [];
const removedNodes: string[] = [];
const changes: string[] = [];
let hasChanges = false;

newNodes.forEach(newNode => {
  const oldNode = oldNodesMap.get(newNode.id);
  if (!oldNode) {
    addedNodes.push(`${newNode.id}: ${newNode.name}`);
    return;
  }

  const iden = oldNode.Identifier;
  // Sync Basic Info
  if (isDifferent(oldNode.InGameName?.["en"], newNode.name)) {
    if (!oldNode.InGameName) oldNode.InGameName = {};
    changes.push(`[Value Changed] Src: ${iden}.InGameName["en"]\n    Old: ${oldNode.InGameName["en"]}\n    New: ${newNode.name}`);
    if ((oldNode.InGameName["en"]?.trim().length ?? 0) > 0) oldNode.Alias.push(oldNode.InGameName["en"])
    oldNode.InGameName["en"] = newNode.name;
    hasChanges = true;
  }
  if (isDifferent(oldNode.InGameName?.["zh-Hans"], newNode.nameZH)) {
    if (!oldNode.InGameName) oldNode.InGameName = {};
    changes.push(`[Value Changed] Src: ${iden}.InGameName["zh-Hans"]\n    Old: ${oldNode.InGameName["zh-Hans"]}\n    New: ${newNode.nameZH}`);
    if ((oldNode.InGameName["zh-Hans"]?.trim().length ?? 0) > 0) oldNode.Alias.push(oldNode.InGameName["zh-Hans"])
    oldNode.InGameName["zh-Hans"] = newNode.nameZH;
    hasChanges = true;
  }

  // Only sync description if newNode has it
  if (newNode.desc && isDifferent(oldNode.Description?.["en"], newNode.desc)) {
    if (!oldNode.Description) oldNode.Description = {};
    changes.push(`[Value Changed] Src: ${iden}.Description["en"]\n    Old: ${oldNode.Description["en"]}\n    New: ${newNode.desc}`);
    oldNode.Description["en"] = newNode.desc;
    hasChanges = true;
  }
  if (newNode.descZH && isDifferent(oldNode.Description?.["zh-Hans"], newNode.descZH)) {
    if (!oldNode.Description) oldNode.Description = {};
    changes.push(`[Value Changed] Src: ${iden}.Description["zh-Hans"]\n    Old: ${oldNode.Description["zh-Hans"]}\n    New: ${newNode.descZH}`);
    oldNode.Description["zh-Hans"] = newNode.descZH;
    hasChanges = true;
  }

  // Sync Pins
  const syncPins = (pins: PinDef[], newPins: NodeParam[] | undefined, kind: string) => {
    if (newPins?.length !== pins.length) {
      console.error(`[Error] Pin length mismatch for ${iden}.${kind}`, pins.length, newPins?.length);
      const added = newPins!.find(p => pins.findIndex(p2 => p2.ShellIndex === p.index) === -1)!;
      console.info(`    [Added Pin] ${added.index} ${added.name} ${added.nameZH}`);
      return;
    }
    // if (!newPins) return;
    newPins.forEach(np => {
      const op = pins.find(p => p.ShellIndex === np.index);
      if (!op) {
        console.error("[Error] pin not found!");
        return;
      }

      if (isDifferent(op.Label?.["en"], np.name)) {
        if (!op.Label) op.Label = {};
        changes.push(`[Value Changed] Src: ${iden}.${kind}[${np.index}].Label["en"]\n    Old: ${op.Label["en"]}\n    New: ${np.name}`);
        op.Label["en"] = np.name;
        hasChanges = true;
      }
      if (isDifferent(op.Label?.["zh-Hans"], np.nameZH)) {
        if (!op.Label) op.Label = {};
        changes.push(`[Value Changed] Src: ${iden}.${kind}[${np.index}].Label["zh-Hans"]\n    Old: ${op.Label["zh-Hans"]}\n    New: ${np.nameZH}`);
        op.Label["zh-Hans"] = np.nameZH;
        hasChanges = true;
      }

      if (kind === 'DataIn' && (np.hint?.length ?? 0) > 0) {
        op.Placeholder ??= {};
        changes.push(`[Value Changed] Src: ${iden}.${kind}[${np.index}].Placeholder["zh-Hans"]\n    Old: ${op.Placeholder["zh-Hans"]}\n    New: ${np.hintZH}`);
        op.Placeholder["en"] = np.hint!;
        op.Placeholder["zh-Hans"] = np.hintZH!;
        hasChanges = true;
      }
    });
  };

  syncPins(oldNode.FlowPins.filter(p => p.Direction === "In"), newNode.inPins, "FlowIn");
  syncPins(oldNode.FlowPins.filter(p => p.Direction === "Out"), newNode.outPins, "FlowOut");
  syncPins(oldNode.DataPins.filter(p => p.Direction === "In"), newNode.inParams, "DataIn");
  syncPins(oldNode.DataPins.filter(p => p.Direction === "Out"), newNode.outParams, "DataOut");
});

// Identify Removed Nodes
oldNodesMap.forEach((oldNode, id) => {
  if (!newNodeIds.has(id)) {
    removedNodes.push(`${id}: ${oldNode.InGameName?.["en"] || oldNode.Identifier}`);
  }
});

// Save updated data if changes occurred
if (hasChanges) {
  writeFileSync(oldDataPath, JSON.stringify(oldData, null, 2), "utf-8");
  console.error(`[Updated] data.json has been updated with modified node text.`);
}

// Output Logs (All)
if (changes.length > 0) {
  changes.forEach(c => console.log(c));
}

// if (addedNodes.length > 0) {
//   addedNodes.forEach(n => console.log(`[Added Nodes] ${n}`));
// }

// if (removedNodes.length > 0) {
//   removedNodes.forEach(n => console.log(`[Removed Nodes] ${n}`));
// }
// Save Logs (Added/Removed only)
// writeFileSync("utils/node_data/game_text/comparison_result.log", ["", ...addedNodes].join("\n[Added Nodes] ") + "\n" + ["", ...removedNodes].join("\n[Removed Nodes] "), "utf-8");

if (addedNodes.length === 0 && removedNodes.length === 0) {
  if (!hasChanges) {
    console.error("No differences found.");
  } else {
    console.error("Only value changes found and synced to data.json.");
  }
}


