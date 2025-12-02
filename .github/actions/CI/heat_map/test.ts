import { writeFile,rm, readFile } from "fs/promises";

// const path = import.meta.dirname + '/jpeg-js.js'
// const code = await (await fetch('https://cdn.jsdelivr.net/npm/jpeg-js@0.4.4/+esm')).text();
// await writeFile(path, code);
// const { encode } = await import('file:///' + path);
// await rm(path);

async function main(){
  const data = JSON.parse((await readFile("./utils/node_data/index.json")).toString());
  const nodes = data.NodesList;
  const class_array: string[] = [];
  for(const node of nodes){
    class_array[node.ID] = node.Class;
    if(node["TypeMappings"]){
      for(const type_mapping of node["TypeMappings"]){
        class_array[type_mapping.ConcreteId] = node.Class+"/Type";
      }
    }
  }
  for(let i=0;i<class_array.length;i++){
    if(!class_array[i]){
      class_array[i] = "Empty";
    }
  }
  console.log(class_array);

  const COLORS = {
    "Empty": [255,255,255],
    "Control": [255,0,0],
    "Execution": [0,255,0],
    "Query": [0,255,0],
    "Arithmetic": [0,255,0],
  }
}

await main();