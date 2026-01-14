import { readFileSync } from "fs";
import path from "path";

// Define interfaces for data structures
interface NodeParam {
  index: number;
  name: string;
  nameZH: string;
  hint?: string;
  hintEN?: string;
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
}

interface NodeDef {
  Identifier: string;
  ID: number;
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
  const s1 = a || "";
  const s2 = b || "";
  return s1 !== s2;
}

// Comparison
const addedNodes: string[] = [];
const removedNodes: string[] = [];
const changes: string[] = [];

newNodes.forEach(newNode => {
  const oldNode = oldNodesMap.get(newNode.id);
  if (!oldNode) {
    addedNodes.push(`${newNode.id}: ${newNode.name}`);
    return;
  }

  const iden = oldNode.Identifier;

  // Compare Basic Info
  if (isDifferent(oldNode.InGameName?.["en"], newNode.name)) {
    changes.push(`[Value Changed] Src: ${iden}.InGameName["en"]\n    Old: ${oldNode.InGameName["en"]}\n    New: ${newNode.name}`);
  }
  if (isDifferent(oldNode.InGameName?.["zh-Hans"], newNode.nameZH)) {
    changes.push(`[Value Changed] Src: ${iden}.InGameName["zh-Hans"]\n    Old: ${oldNode.InGameName["zh-Hans"]}\n    New: ${newNode.nameZH}`);
  }
  // Only compare description if newNode has it (often it's empty in game text extract)
  if (newNode.desc && isDifferent(oldNode.Description["en"], newNode.desc)) {
    changes.push(`[Value Changed] Src: ${iden}.Description["en"]\n    Old: ${oldNode.Description["en"]}\n    New: ${newNode.desc}`);
  }
  if (newNode.descZH && isDifferent(oldNode.Description["zh-Hans"], newNode.descZH)) {
    changes.push(`[Value Changed] Src: ${iden}.Description["zh-Hans"]\n    Old: ${oldNode.Description["zh-Hans"]}\n    New: ${newNode.descZH}`);
  }

  // Compare Pins
  // Map existing pins for comparison
  const comparePins = (pins: PinDef[], newPins: NodeParam[] | undefined, kind: string) => {
    if (!newPins) return;
    newPins.forEach(np => {
      const op = pins.find(p => p.ShellIndex === np.index);
      if (!op) {
        // If we can't find by index, it might be a new pin or reordered, but for now we just log if something is different at that position
        return;
      }
      if (isDifferent(op.Label?.["en"], np.name)) {
        changes.push(`[Value Changed] Src: ${iden}.${kind}[${np.index}].Label["en"]\n    Old: ${op.Label["en"]}\n    New: ${np.name}`);
      }
      if (isDifferent(op.Label?.["zh-Hans"], np.nameZH)) {
        changes.push(`[Value Changed] Src: ${iden}.${kind}[${np.index}].Label["zh-Hans"]\n    Old: ${op.Label["zh-Hans"]}\n    New: ${np.nameZH}`);
      }
    });
  };

  // Note: oldData.Nodes separate FlowPins and DataPins, but newNode (from extract) has inPins, outPins (flow) and inParams, outParams (data).
  comparePins(oldNode.FlowPins.filter(p => p.Direction === "In"), newNode.inPins, "FlowPins(In)");
  comparePins(oldNode.FlowPins.filter(p => p.Direction === "Out"), newNode.outPins, "FlowPins(Out)");
  comparePins(oldNode.DataPins.filter(p => p.Direction === "In"), newNode.inParams, "DataPins(In)");
  comparePins(oldNode.DataPins.filter(p => p.Direction === "Out"), newNode.outParams, "DataPins(Out)");
});

oldNodesMap.forEach((oldNode, id) => {
  if (!newNodeIds.has(id)) {
    removedNodes.push(`${id}: ${oldNode.InGameName["en"] || oldNode.Identifier}`);
  }
});

// Output
if (changes.length > 0) {
  changes.forEach(c => console.log(c));
}

if (addedNodes.length > 0) {
  addedNodes.forEach(n => console.log(`[Added Nodes] ${n}`));
}

if (removedNodes.length > 0) {
  removedNodes.forEach(n => console.log(`[Removed Nodes] ${n}`));
}

if (changes.length === 0 && addedNodes.length === 0 && removedNodes.length === 0) {
  console.log("No differences found.");
}
