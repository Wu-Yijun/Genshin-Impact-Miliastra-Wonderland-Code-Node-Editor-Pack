import { writeFileSync } from "fs";
import { nodeDefinitions } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts";
import yaml from 'yaml';
import { type NodeDefinition } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/types/node.ts";

function create_ref_yaml() {
  const def = nodeDefinitions;
  function save(def: NodeDefinition[], filter = "math") {
    const math = def
      .filter(d => d.kind === filter)
      .map(d => {
        const args = d.ports.filter(p => p.kind === "data-in").map(p => `${p.id}, ${p.valueType}, ${p.label}`);
        const outputs = d.ports.filter(p => p.kind == "data-out").map(p => `${p.id}, ${p.valueType}, ${p.label}`);
        return { ref_id: d.id as string, category: d.category, chinese: d.displayName, description: d.description, args, outputs };
      }).filter(d => !d.ref_id.includes('.list.') && !d.ref_id.includes('.dict.') && !d.ref_id.includes('.veector3.'))
      .filter(d => !d.ref_id.includes('.vector3.') && !d.ref_id.includes('random') && !d.ref_id.includes('Random') && !d.ref_id.includes('.pi'));
    const doc = yaml.stringify(math);
    writeFileSync(import.meta.dirname + `/ref.${filter}.yaml`, doc);
  }
  // save(def);
  save(def, "query");
}


create_ref_yaml();