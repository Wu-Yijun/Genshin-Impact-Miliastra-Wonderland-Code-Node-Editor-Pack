import assert from 'assert';
import yaml from 'yaml';
import { decode_gia_file } from '../protobuf/decode.ts';
import { read_file, write_file } from '../../src/util.ts';

const inputFileName = 'enum_id_raw.yaml';
const outputFileName = 'enum_id.yaml';

function get_enum_id_list() {
  interface Info {
    classId: number;
    id: number;
    from: number;
  }
  function getInfo(node: any): Info | null {
    const p = node.pins[1]?.i1.kind;
    const temp = {
      id: node.concreteId?.nodeId,
      classId: node.pins[0]?.value.bNodeValue?.classBase,
      from: node.pins[0]?.value.bNodeValue?.value.bEnum?.val,
    };
    if (temp.id === undefined) {
      return null;
    }
    return temp as Info;
  }

  const msg = decode_gia_file({ gia_path: import.meta.dirname + "/../ref/enumAll.gia" });
  const nodes = msg.graph.graph!.inner.graph.nodes;
  const list = nodes.map(getInfo).filter(x => x !== null).map(x => {
    x.from = 100 * Math.floor(x.from / 100)
    return x;
  })
  return [{ id: 475, classId: 0, from: 0 }, ...list];
}
const id_list = get_enum_id_list();


interface EnumEntry {
  name: string;
  id: number;
  varClassBase: number;
  items: Record<number, string>;
}
interface Document {
  Version: string;
  EnumList: EnumEntry[];
  Enums: string;
}

// Read and parse the YAML file
const fileContent = read_file(inputFileName, "rel");
const parsedYaml: Document = yaml.parse(fileContent);

const enums = parsedYaml.Enums.split("\n")
  .filter(line => line.trim() !== "")
  .map(line => line.trim().split("_"));
// check format
enums.forEach(parts => assert(parts.length === 2, `Invalid enum format: [${parts}]`));

const old_list = parsedYaml.EnumList;
const list: EnumEntry[] = [];
let count = 0;
// Generate TypeScript enum definitions
for (let i = 0; i < old_list.length; i++) {
  const id = id_list[i];
  const entry: EnumEntry = {
    name: old_list[i].name,
    id: old_list[i].id,
    varClassBase: id.classId,
    items: {},
  };
  list.push(entry);
  assert(entry.id === id.id, `Enum id mismatch: [${i}] expected ${id.id}, got ${entry.id}`);
  entry.varClassBase = id.classId;

  const parts = enums.filter(p => p[0] === entry.name).map(p => p[1]);
  assert(parts.length >= 1 || i === 0, `Enum name mismatch: ${entry.name} not found in Enums`);
  entry.items = {};
  let j = id.from;
  for (const part of parts) {
    count++;
    assert(part.length > 0);
    const i = parseInt(part);
    if (i.toString() === part) {
      j += i;
      continue;
    }
    if (entry.name === "Reason For Item Change") {
      if (part === "Pick Up") {
        j = 4950;
      } else if (part === "Default") {
        j = 0;
      }
    }
    entry.items[j] = part;
    j++;
  }
}
assert(count === enums.length, `Enum count mismatch: expected ${enums.length}, got ${count}`);




const output = {
  Version: parsedYaml.Version,
  Author: "Aluria",
  Date: new Date().toString(),
  EnumList: list,
};
const outputContent = `# This file is auto-generated. Do not edit manually.\n` + yaml.stringify(output);

write_file(outputFileName, outputContent, "rel");
