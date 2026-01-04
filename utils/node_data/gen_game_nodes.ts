import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Document, NodeDef, PinDef, Translations } from './types.ts';
// 假设这是你项目中实际判断变体的函数
import { is_reflect } from './node_type.ts';

// =================================================================
// Configuration & Constants
// =================================================================

const INPUT_FILE = 'data.json'; // 你的 json 文件名
const OUTPUT_FILE = 'game_nodes';
const DEFAULT_LANG = 'en';

const ICONS = {
  System: { Server: "🖥️", Client: "📱" },
  Domain: { Execution: "⚙️", Trigger: "⚡", Query: "🔍", Arithmetic: "🔢", Control: "🔀", Others: "🔗", Hidden: "🚫" },
  Flow: { In: "▶️", Out: "⏩" },
  Data: { In: "🔹", Out: "🔸" },
  Variant: { In: "🔷", Out: "🔶" }, // 更显眼的实心方块用于变体
  Type: { Variant: "🧩", Fixed: "📌" }
};

// =================================================================
// Helper Functions
// =================================================================

/**
 * 格式化键名
 * 逻辑: 
 * 1. 将非字母数字(且非点号)后的字符转大写 (CamelCase处理, e.g. "my-var" -> "myVar")
 * 2. 将点号替换为下划线 (Hierarchy处理, e.g. "Action.Combat" -> "Action_Combat")
 */
function formatKey(identifier: string): string {
  // 排除点号，防止点号被正则吞掉导致无法转换为下划线
  let key = identifier.replace(/[^A-Za-z0-9.]+[A-Za-z0-9]/g, (match) =>
    match.slice(-1).toUpperCase()
  );
  // 首字母大写 (可选，根据个人喜好，这里保持原逻辑的大驼峰倾向)
  key = key.charAt(0).toUpperCase() + key.slice(1);
  return key.replace(/\./g, '_');
}

/**
 * 获取多语言文本
 */
function getLoc(t: Translations, lang: keyof Translations): string {
  return t === null ? "" : t[lang] || t['en'] || Object.values(t)[0] || "";
}

/**
 * 生成引脚部分的 Markdown 表格
 */
function generatePinSection(node: NodeDef, direction: "In" | "Out", lang: keyof Translations): string[] {
  const lines: string[] = [];

  // 合并 Flow 和 Data
  const flowPins = node.FlowPins.filter(p => p.Direction === direction && p.Visibility !== 'Hidden');
  const dataPins = node.DataPins.filter(p => p.Direction === direction && p.Visibility !== 'Hidden');

  if (flowPins.length === 0 && dataPins.length === 0) {
    return [];
  }

  lines.push(` * -----------`);
  lines.push(` *`);

  // 表头
  const title = direction === "In" ? "📥 Inputs" : "📤 Outputs";
  lines.push(` * #### ${title}`);
  lines.push(` * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |`);
  lines.push(` * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |`);

  // 1. 渲染 Flow Pins
  for (const p of flowPins) {
    const dirIcon = direction === "In" ? ICONS.Flow.In : ICONS.Flow.Out;
    const nameStr = `\`${p.Identifier}\``;
    const desc = [getLoc(p.Label, lang), getLoc(p.Description, lang)].filter(s => s.length > 0).join(": ");

    lines.push(` * | - || ${dirIcon} || - || ${nameStr} || ${desc} |`);
  }

  // 2. 渲染 Data Pins
  dataPins.forEach((p, index) => {
    const isVar = is_reflect(p.Type); // 使用你的 is_reflect 函数

    // 图标区分
    const dirIcon = isVar
      ? (direction === "In" ? ICONS.Variant.In : ICONS.Variant.Out)
      : (direction === "In" ? ICONS.Data.In : ICONS.Data.Out);

    // 类型样式区分
    const typeStr = isVar
      ? `**\`${p.Type ?? 'Unknown'}\`**` // 变体加粗
      : `\`${p.Type ?? 'Unknown'}\``; // 普通代码块

    // 索引显示 (可见索引)
    const nameStr = `\`${p.Identifier}\``;

    const desc = [getLoc(p.Label, lang), getLoc(p.Description, lang)].filter(s => s.length > 0).join(": ");

    lines.push(` * | ${index} || ${dirIcon} || ${typeStr} || ${nameStr} || ${desc} |`);
  });

  return lines;
}

/**
 * 生成单个节点的完整 Markdown 文档
 */
function generateDoc(node: NodeDef, lang: keyof Translations): string {
  const lines: string[] = [];

  // --- Header ---
  const title = getLoc(node.InGameName, lang);
  lines.push(`/**`);
  lines.push(` * **${title}** \`(${node.Identifier})\``);

  if (node.Description) {
    lines.push(` * - ${getLoc(node.Description, lang)}`);
  }
  lines.push(` *`);

  // --- Metadata ---
  const sysIcon = node.System === 'Server' ? ICONS.System.Server : ICONS.System.Client;
  const domainIcon = ICONS.Domain[node.Domain as keyof typeof ICONS.Domain] || "";
  const typeDisplay = ICONS.Type[node.Type] + node.Type;

  lines.push(` * -----------`);
  lines.push(` *`);

  lines.push(` * | ID | │ | System | │ | Domain | │ | Type |`);
  lines.push(` * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |`);
  lines.push(` * | **${node.ID}** || ${sysIcon} ${node.System} || ${domainIcon} ${node.Domain} || ${typeDisplay} |`);

  // --- I/O Tables ---
  const inputLines = generatePinSection(node, "In", lang);
  if (inputLines.length > 0) {
    lines.push(` *`);
    lines.push(...inputLines);
  }

  const outputLines = generatePinSection(node, "Out", lang);
  if (outputLines.length > 0) {
    lines.push(` *`);
    lines.push(...outputLines);
  }

  // --- Constraints (Variant Only) ---
  if (node.Type === 'Variant' && node.Variants && node.Variants.length > 0) {
    lines.push(` *`);
    lines.push(` * #### 🧬 Variant Constraints`);
    const unique = Array.from(new Set(node.Variants.map(v => v.Constraints)));
    unique.forEach(c => lines.push(` * * \`${c}\``));
  }

  lines.push(` */`);
  return lines.join('\n');
}

// =================================================================
// Main Entry
// =================================================================

function main(lang?: keyof Translations) {
  lang = lang || (process.argv[2] as keyof Translations) || DEFAULT_LANG;
  const inputPath = join(import.meta.dirname, INPUT_FILE);
  const outputPath = join(import.meta.dirname, OUTPUT_FILE + (lang === 'en' ? '.ts' : `.${lang}.ts`));

  console.log(`Reading ${inputPath}...`);
  const raw = readFileSync(inputPath, 'utf-8');
  const doc: Document = JSON.parse(raw);

  const entries: string[] = [];
  const name_entries: string[] = [];

  // for (const node of doc.Nodes.slice(0,10)) {
  for (const node of doc.Nodes) {
    // 1. 生成文档块
    const docBlock = generateDoc(node, lang);

    // 2. 生成键值对
    const key = formatKey(node.Identifier);
    const value = node.Identifier;

    // 3. 组合
    entries.push(`${docBlock}\n  ${key}: "${value}",`);

    // 生成名称映射
    let nodeName = getLoc(node.InGameName, lang);
    if(node.System==="Client"){
      nodeName += "_Client";
    }
    if (lang === "en") {
      nodeName = nodeName
        .replace(/[^0-9A-Za-z]+/g, '_')
        .replace(/^(?=\d)/, '_')
        .replace(/_$/g, "");
    }else{
      nodeName = JSON.stringify(nodeName);
    }
    const comment = `See \`NODES.${key}\` for detailed documentation.`;
    name_entries.push(`/**  ${comment} */`);
    name_entries.push(`${nodeName}: "${node.Identifier}",`);
  }



  // 4. 构建最终文件内容
  const fileContent = `
// ==================================================================
// AUTO-GENERATED FILE. DO NOT EDIT.
// ==================================================================

export const NODES = {
  ${entries.join('\n\n  ')}
} as const;

export type NodeIdentifier = typeof NODES[keyof typeof NODES];

export const NODE_NAMES = {
  ${name_entries.join('\n  ')}
} as const;
`;

  writeFileSync(outputPath, fileContent.trim());
  console.log(`✅ Generated ${entries.length} nodes to ${outputPath} (Lang: ${lang})`);
}

main("en");
// main("zh-Hans");