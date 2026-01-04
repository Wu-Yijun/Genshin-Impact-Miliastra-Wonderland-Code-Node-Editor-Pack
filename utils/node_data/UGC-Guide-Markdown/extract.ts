import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

interface NodeParameter {
  type: string;
  name: string;
  dataType: string;
  description: string;
}

interface NodeEntry {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  parameters: NodeParameter[];
}

const EN = {
  "**Node Functions**": "**Node Functions**",
  "**Node Parameters**": "**Node Parameters**",
  "| Parameter Type | Parameter Name | Type | Description |": "| Parameter Type | Parameter Name | Type | Description |",
  "| Parameter Type | Parameter Name | Type | Description | Description |": "| Parameter Type | Parameter Name | Type | Description | Description |",
  'General': 'General',
  "/^## \d+\.(\s+.+)$/": /^## \d+\.(\s+.+)$/,
  "/^[IVXLC]+\./": /^[IVXLC]+\./,
  "/^[0-9A-Z]/": /^[0-9A-Z]/
};
const ZH = {
  "**Node Functions**": "**节点功能**",
  "**Node Parameters**": "**节点参数**",
  "| Parameter Type | Parameter Name | Type | Description |": "| 参数类型 | 参数名 | 类型 | 说明 |",
  "| Parameter Type | Parameter Name | Type | Description | Description |": "| 参数类型 | 参数名 | 类型 | 说明 | 说明 |",
  'General': '通用',
  "/^## \d+\.(\s+.+)$/": /^## \d+\.(\p{Script=Han}.+)$/u,
  "/^[IVXLC]+\./": /^[一二三四五六七八九十]+、/,
  "/^[0-9A-Z]/": /^\p{Script=Han}/u
};

const t = ZH;

const workingDir = 'd:/Program/GenshinImpact/projs/Convertor/utils/node_data/UGC-Guide-Markdown';
const outputFile = path.join(workingDir, 'nodes.zh.json');

type S = "ready" | "header" | "desc" | "params" | "th" | "ts" | "tb";

function parseMarkdownFile(filePath: string): NodeEntry[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const old_lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const lines: string[] = [];
  for (let i = 0; i < old_lines.length; i++) {
    if (old_lines[i].startsWith("|") && !old_lines[i].endsWith("|")) {
      let l = old_lines[i];
      while (!old_lines[i].endsWith("|")) l += '\n' + old_lines[++i];
      lines.push(l);
      // console.log(JSON.stringify(l));
      if (l.split("").filter(x => x === "|").length !== 5) {
        console.log("[NOTE]: Multiple Lines In Table:", JSON.stringify(l));
      }
      continue;
    }
    lines.push(old_lines[i]);
  }

  let s = "ready" as S;
  let l_len = 0;
  let param = 0;

  // format checker
  lines.forEach((l, ii) => {
    if (l.startsWith("## ")) {
      let a = l.slice(3).replace(/\*\*/g, "").trim();
      if (/^\d+\./.test(a)) {
        // ## 1.
        if (s !== "ready" && s !== "tb" && s !== "header") {
          if (s === "th") {
            console.warn(l.slice(ii - 3, ii));// 允许空表
          } else {
            debugger;
          }
        }
        s = "desc";
      } else if (t["/^[IVXLC]+\./"].test(a)) {
        // ## I.
        if (s !== "ready" && s !== "tb") {
          if (s === "th") {
            console.warn(l.slice(ii - 3, ii));// 允许空表
          } else {
            debugger;
          }
        }
        s = "header";
      } else {
        console.log(filePath, lines.slice(ii - 1, ii + 1));
        debugger;
      }
    } else if (l.startsWith("**")) {
      if (l === t["**Node Functions**"]) {
        if (s !== "desc") debugger;
        s = "params";
        param = 0;
      } else if (l === t["**Node Parameters**"]) {
        if (s !== "params") {
          console.log(filePath, lines.slice(ii - 1, ii + 1));
          debugger;
        }
        s = "th";
      }
    } else if (l.startsWith("|")) {
      if (s === "th") {
        s = "ts";
        if (l !== t["| Parameter Type | Parameter Name | Type | Description |"]
          && l !== t["| Parameter Type | Parameter Name | Type | Description | Description |"]) debugger;
        l_len = l.split("|").length;
      } else if (s === "ts") {
        if (!/^\|-+\|-+\|-+\|-+\|(-+\|)?$/.test(l)) debugger;
        s = "tb";
        if (l_len !== l.split("|").length) debugger;
      } else if (s === 'tb') {
        const cells = l.split("|").map(x => x.trim());
        if (l_len !== cells.length) debugger;
        if (l_len === 7) {
          if (cells[4] !== cells[5] && cells[5] !== "") debugger;
        }
        if (cells.every(l => l.length === 0)) {
          return;
        }
        if (cells[1] === "" || cells[3] === "") {
          debugger;
        }

      } else {
        debugger;
      }
    } else if (t["/^[0-9A-Z]/"].test(l)) {
      if (s !== "params") {
        console.log(filePath, lines.slice(ii - 1, ii + 1));
        debugger;
      }
      param++;
      if (param > 5) {
        console.log(filePath, lines.slice(ii - 5, ii));
        debugger;
      }
    } else {
      console.log(filePath, lines.slice(ii - 1, ii + 1));
      debugger;
    }
  });

  // 保证结构正确 (手动处理异常)


  const filename = path.basename(filePath, '.md');

  let subcategory = t['General'];
  const nodes: NodeEntry[] = [];

  let i = 0;
  while (i < lines.length) {
    let line = lines[i].trim();

    // H2: Potential Node or Subcategory
    if (line.startsWith('## ')) {
      const headerText = line.replace(/\*\*/g, "").substring(3);
      console.log(headerText)
      assert(headerText.match(t["/^[IVXLC]+\./"]) || headerText.match(/^\d+\./));
      if (headerText.match(t["/^[IVXLC]+\./"])) {
        subcategory = headerText;
        i++;
        continue;
      }
    }

    const nodeMatch = line.replace(/\*\*/g, "").match(t["/^## \d+\.(\s+.+)$/"]);
    // console.log(line.replace(/\*\*/g, ""));
    assert(nodeMatch !== null);

    const currentNode: NodeEntry = {
      name: nodeMatch[1].trim(),
      category: filename,
      subcategory: subcategory,
      description: '',
      parameters: []
    };

    assert(lines[++i] === t["**Node Functions**"]);
    while ((line = lines[++i]) !== t['**Node Parameters**']) {
      currentNode!.description += line + '\n';
    }

    line = lines[++i];
    if (line === undefined || line.startsWith("## ")) {
      // 跳过表格
      continue;
    }
    assert(line === t["| Parameter Type | Parameter Name | Type | Description |"] ||
      line === t["| Parameter Type | Parameter Name | Type | Description | Description |"]);
    ++i; // skip header
    while ((line = lines[++i])?.startsWith("|")) {
      const cells = line.split("|").slice(1, 5).map(x => x.trim());
      if (cells.every(l => l.length === 0)) {
        continue;
      }
      currentNode!.parameters!.push({
        type: cells[0],
        name: cells[1],
        dataType: cells[2],
        description: cells[3]
      });
    }
    nodes.push(currentNode);
  }

  return nodes;
}

function main() {
  // const files = fs.readdirSync(workingDir).filter(f => f.endsWith('.md') && !f.endsWith(".zh.md") && f !== 'readme.md');
  const files = fs.readdirSync(workingDir).filter(f => f.endsWith(".zh.md") && f !== 'readme.md');
  const allNodes: NodeEntry[] = [];

  for (const file of files) {
    console.log(`Parsing ${file}...`);
    const nodes = parseMarkdownFile(path.join(workingDir, file));
    console.log(`Extracted ${nodes.length} nodes from ${file}`);
    allNodes.push(...nodes);
  }


  fs.writeFileSync(outputFile, JSON.stringify(allNodes, null, 2));
  console.log(`Done! Saved to ${outputFile}`);
}

main();
