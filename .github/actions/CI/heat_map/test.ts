import { writeFile, rm, readFile } from "fs/promises";
import DATA from "../../utils/node_data/data.json" with {type: "json"};

async function Import(url: string) {
  const path = import.meta.dirname + '/' + url.replaceAll(/[^A-Za-z0-9]+/g, "_") + ".ts";
  const code = await (await fetch(url)).text();
  await writeFile(path, code);
  const module = await import('file:///' + path);
  await rm(path);
  return module;
}

const { encode } = await Import('https://cdn.jsdelivr.net/npm/jpeg-js@0.4.4/+esm');

function arrangeColors(colors: [number, number, number][], width: number, grid_size: number = 10) {
  const height = Math.ceil(colors.length / width);
  const H = height * grid_size + 1;
  const W = width * grid_size + 1;
  const data = new Uint8Array(H * W * 4).fill(128);
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const x = i % width;
    const y = Math.floor(i / width);
    for (let j = 0; j < grid_size - 1; j++) {
      for (let k = 0; k < grid_size - 1; k++) {
        const index = ((y * grid_size + j + 1) * W + (x * grid_size + k) + 1) * 4;
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255;
      }
    }
  }
  // Prepare the raw image data object
  return {
    data: data,
    width: W,
    height: H,
  };
}

async function main(system: "Server" | "Client") {
  const nodes = DATA.Nodes.filter((node) => node.System === system);
  const class_array: string[] = [];
  for (const node of nodes) {
    class_array[node.ID % 10000] = node.Domain;
    if (node.KernelID !== undefined) class_array[node.KernelID % 10000] = node.Domain;
    node.Variants?.forEach(v => {
      class_array[v.KernelID % 10000] = node.Domain + "/Type";
    });
  }
  for (let i = 0; i < class_array.length; i++) {
    if (class_array[i] === undefined) {
      class_array[i] = "Empty";
    }
  }
  console.log("Read " + class_array.length + " nodes.");
  // console.log(class_array.slice(30));

  const color = (str: string): [number, number, number] => {
    const r = parseInt(str.slice(1, 3), 16);
    const g = parseInt(str.slice(3, 5), 16);
    const b = parseInt(str.slice(5, 7), 16);
    return [r, g, b];
  }
  const COLORS = {
    "Empty": color("#FFFFFF"),

    "Control": color("#FAAD5F"),
    "Execution": color("#FAEA76"),
    "Query": color("#8684FA"),
    "Arithmetic": color("#89DFFA"),
    "Trigger": color("#E080D8"),
    "Hidden": color("#6FE07D"),
    "Others": color("#6FE07D"),

    "Control/Type": color("#FAB98A"),
    "Execution/Type": color("#FAF5AC"),
    "Query/Type": color("#C6C3F9"),
    "Arithmetic/Type": color("#BDFAF8"),
    "Trigger/Type": color("#E09ACE"),
    "Hidden/Type": color("#ABE0BC"),
    "Others/Type": color("#ABE0BC"),
  }

  const colors = class_array.map(x => COLORS[x as keyof typeof COLORS]);
  const img_data = arrangeColors(colors, 100, 16);
  const img = encode(img_data, 95);
  console.log("Image Size:", img_data.width, img_data.height);
  await writeFile(`./dist/heat_map_${system}.jpg`, img.data);
  console.log(`Heat map saved to "./dist/heat_map_${system}.jpg"!`);
}

await main("Server");
await main("Client");