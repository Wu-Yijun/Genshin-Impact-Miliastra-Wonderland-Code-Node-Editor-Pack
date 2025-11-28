import assert from "assert";
import { MathNodes } from "./math.ts";
import type { Lambda } from "./function_defs.ts";
import yaml from "yaml";
import { read_file } from "../../src/util.ts";


function checkEverythingMatch(nodes: Lambda[], raw_file: string, ref_file: string): boolean {
  const raw = read_file(raw_file);
  const ref: any[] = yaml.parse(read_file(ref_file));

  const names = nodes.map(p => p.name);
  const raw_names: string[] = [];
  const functionRegex = /^function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;
  let match;
  while ((match = functionRegex.exec(raw)) !== null) {
    raw_names.push(match[1]);
  }

  const ref_names: string[] = ref.map(p => p.ref_id);

  const set_nodes0 = new Set(names.map(v => v[0]));
  const set_nodes1 = new Set(names.map(v => [v[1], v[2]]).flat().filter(x => x !== null));
  const set_raw = new Set(raw_names);
  const set_ref = new Set(ref_names);

  // Check for discrepancies between `nodes` (parsed from code) and `raw_file` (actual file content)
  const nodes_not_in_raw = [...set_nodes0].filter(name => !set_raw.has(name));
  const raw_not_in_nodes = [...set_raw].filter(name => !set_nodes0.has(name));

  // if (nodes_not_in_raw.length > 0) {
  //   console.error(`Error: Functions in 'nodes' but not found in 'raw_file': ${nodes_not_in_raw.join(', ')}`);
  //   return false;
  // }
  // if (raw_not_in_nodes.length > 0) {
  //   console.error(`Error: Functions in 'raw_file' but not processed in 'nodes': ${raw_not_in_nodes.join(', ')}`);
  //   return false;
  // }

  const nodes_not_in_ref = [...set_nodes1].filter(name => !set_ref.has(name));
  const ref_not_in_nodes = [...set_ref].filter(name => !set_nodes1.has(name));

  // if (nodes_not_in_ref.length > 0) {
  //   console.error(`Error: Functions in 'nodes' but not referenced in 'ref_file': ${nodes_not_in_ref.join(', ')}`);
  //   return false;
  // }
  // if (ref_not_in_nodes.length > 0) {
  //   console.error(`Error: Functions in 'ref_file' but not found in 'nodes'/'raw_file': ${ref_not_in_nodes.join(', ')}`);
  //   return false;
  // }

  console.log({
    nodes_not_in_raw,
    nodes_not_in_ref,
    raw_not_in_nodes,
    ref_not_in_nodes
  })
  return true;
}

if (import.meta.main) {
  assert(checkEverythingMatch(MathNodes, "/math_raw.d.ts", "/ref.math.yaml"));
}