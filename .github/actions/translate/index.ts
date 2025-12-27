import path from "path";
import fg from "fast-glob";
import fse from "fs-extra";
import { GoogleGenAI } from "@google/genai";

import * as core from '@actions/core';

const apiKey = core.getInput('API_KEY');
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in environment variables.");
  process.exit(1);
}

// Initialize the new GenAI client
const ai = new GoogleGenAI({ apiKey: apiKey });

const DEV_PATH = path.join(process.cwd(), "dev");
const MAIN_PATH = path.join(process.cwd(), "main");
const TARGET_PATH = path.join(process.cwd(), "translate");

// ====================



const SRC_LAN = "zh";

const DST_LAN = ["en"] as const; // Currently supports English, extendable array
// const DST_LAN = ["en", "fr"] as const;

type DST_LAN = typeof DST_LAN[number];

const Language: ({ [key in typeof DST_LAN[number]]: string } & { [key: string]: string }) = {
  zh: "Chinese (Simple)",
  en: "English",
  fr: "French",
  jp: "Japanese",
  ru: "Russian",
};

const globs = [
  "!node_modules/**",
  "!.github/**",
  "Readme.md",
  // "**/readme.md",
];

// Helper: Delay to prevent hitting API rate limits immediately
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateContent(content: string, targetLang: DST_LAN): Promise<string> {
  const prompt = `
    You are a professional technical translator.
    Translate the following Markdown content from Chinese (Simple) to ${Language[targetLang]}.
    
    Rules:
    1. Preserve all Markdown formatting (headers, bold, lists, code blocks, links).
    2. DO NOT translate code blocks, variable names, or technical terms that should remain in English.
    3. Return ONLY the translated Markdown content. Do not add any "Here is the translation" text.
    
    Content:
    ${content}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (response.text) {
      return response.text!;
    } else {
      throw new Error("No text returned from Gemini API");
    }

  } catch (error) {
    console.error(`Translation API error for ${targetLang}:`, error);
    throw error;
  }
}

// Helper to construct the localized filename, e.g., README.md -> README.en.md
function getTargetFileName(filePath: string, lang: string): string {
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  return path.join(dir, `${base}.${lang}${ext}`);
}

async function main() {
  console.log("🔍 Scanning for file changes...");

  const new_files = fg.sync(globs, { cwd: DEV_PATH, dot: true });

  // Tasks queue: stores { file, lang, content }
  const tasks: { file: string; lang: DST_LAN; content: string }[] = [];

  for (const file of new_files) {
    const devFilePath = path.join(DEV_PATH, file);
    const mainFilePath = path.join(MAIN_PATH, file);

    const devContent = await fse.readFile(devFilePath, "utf-8");

    // Determine if source content has changed
    let isSourceChanged = true;

    if (fse.existsSync(mainFilePath)) {
      const mainContent = await fse.readFile(mainFilePath, "utf-8");
      if (devContent === mainContent) {
        isSourceChanged = false;
      }
    } else {
      console.log(`[NEW SOURCE] ${file}`);
    }

    if (isSourceChanged && fse.existsSync(mainFilePath)) {
      console.log(`[MODIFIED SOURCE] ${file}`);
    }

    // Check against each target language
    for (const lang of DST_LAN) {
      // Construct the expected translation path in MAIN to check existence
      // e.g., main/subfolder/README.en.md
      const langFileName = getTargetFileName(file, lang);
      const mainLangFilePath = path.join(MAIN_PATH, langFileName);

      const translationExists = fse.existsSync(mainLangFilePath);

      // SKIP LOGIC:
      // If the source hasn't changed AND the translation already exists in main, skip it.
      if (!isSourceChanged && translationExists) {
        continue;
      }

      // If we are here, we need to translate.
      // Reasons:
      // 1. Source changed (isSourceChanged = true) -> Re-translate
      // 2. Source didn't change, but translation is missing -> Backfill translation
      tasks.push({ file, lang, content: devContent });
    }
  }

  if (tasks.length === 0) {
    console.log("✅ No translations needed. Exiting.");
    return;
  }

  console.log(`🚀 Starting translation for ${tasks.length} tasks...`);

  // Process tasks
  for (const task of tasks) {
    const { file, lang, content } = task;

    // Construct target path: translate/subfolder/README.en.md
    const targetFileName = getTargetFileName(file, lang);
    const targetFilePath = path.join(TARGET_PATH, targetFileName);

    console.log(`Translating: ${file} -> ${targetFileName} (${lang})`);

    try {
      // 如果是英语，批量将相对路径的 .md 替换为 .lang.md
      const contentWithPath = content.replace(
        /(\[[^\]]+\]\(\.\/[^)]+)\.md(\))/g,
        `$1.${lang}.md$2`
      );
      const translatedContent = (await translateContent(contentWithPath, lang))


      // Save to target path
      await fse.outputFile(targetFilePath, translatedContent);
      console.log(`✅ Saved: ${targetFilePath}`);

      await delay(1000);

    } catch (err) {
      console.error(`❌ Failed to translate ${file} to ${lang}`, err);
    }
  }

  console.log("🎉 All translations processed.");
}

main().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});