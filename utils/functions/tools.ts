import { nodeDefinitions } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts";
import yaml from 'yaml';
import { write_file } from "../../src/util.ts";

function create_ref_yaml() {
  const def = nodeDefinitions;
  function save(def: any[], filter = "math") {
    const math = def
      .filter(d => d.kind === filter)
      .map(d => ({ ref_id: d.id, category: d.category, chinese: d.displayName, description: d.description }))
    const doc = yaml.stringify(math);
    write_file(`/ref.${filter}.yaml`, doc, "rel");
  }
  save(def);
  save(def, "query");
}

create_ref_yaml();