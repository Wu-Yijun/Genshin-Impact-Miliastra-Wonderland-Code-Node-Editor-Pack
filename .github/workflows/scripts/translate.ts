import path from "path";
import fg from "fast-glob";
import fse from "fs-extra";
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import { exit } from "process";

const notSync = JSON.parse(readFileSync(path.join(process.cwd(), "dev", "sync-list.json"), "utf-8")).notSync;
if (notSync === true) {
  console.log("Sync is disabled, skip translation.");
  exit(0);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in environment variables.");
  process.exit(1);
}

// Initialize the new GenAI client
const ai = new GoogleGenAI({ apiKey: apiKey });

const DEV_PATH = path.join(process.cwd(), "dev");
const MAIN_PATH = path.join(process.cwd(), "main");
const TARGET_PATH = path.join(process.cwd(), "translate");


const SRC_LAN = "zh";

const DST_LAN = ["en"] as const; // Currently supports English, extendable array
// const DST_LAN = ["en", "fr"] as const;

type DST_LAN = typeof DST_LAN[number];

const Language: ({ [key in typeof DST_LAN[number]]: string } & { [key: string]: string }) = {
  zh: "Chinese (Simplified)",
  zhTW: "Chinese (Traditional)",
  en: "English",
  fr: "French",
  jp: "Japanese",
  ru: "Russian",
  ko: "Korean",
  vi: "Vietnamese",
  es: "Spanish",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  id: "Indonesian",
  pl: "Polish",
  el: "Greek",
  la: "Latin",
};

// Model fallback list in order of preference
const MODELS = [
  "gemini-3-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2-flash",
  "gemini-2.5-pro",
  "gemini-3-pro",
];

const globs = [
  "!node_modules/**",
  "!.github/**",
  "!ref/**",
  "!test.CI/**",
  "Readme.md",
  // "utils/**/readme.md",
  "**/readme.md",

  "docs/**/*.md",
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

  let lastError: any;

  // Try each model in sequence
  for (const modelName of MODELS) {
    try {
      // console.log(`Attempting translation with model: ${modelName}`); 
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      if (response.text) {
        console.log(`   └─ ✅ Success using ${modelName}`);
        return response.text!;
      } else {
        throw new Error("No text returned from Gemini API");
      }

    } catch (error: any) {
      // Analyze error type
      const isQuotaError = error.status === 429 ||
        (error.message && error.message.includes("Resource has been exhausted")) ||
        (error.toString().includes("429"));

      const errorMessage = error.message || error.toString();

      if (isQuotaError) {
        console.warn(`   └─ ⚠️ Quota exceeded (RPD/RPM) for ${modelName}. Switching to next model...`);
      } else {
        console.warn(`   └─ ⚠️ Failed with ${modelName}: ${errorMessage}. Switching to next model...`);
      }

      lastError = error;
      // Loop continues to next model
    }
  }

  console.error(`❌ All models failed for this file.`);
  throw lastError || new Error("All translation models failed.");
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
    let needNewTranslation = false;

    if (!fse.existsSync(mainFilePath)) {
      // no need to sync
      console.log(`[SKIP SOURCE] ${file}`);
      continue;
    }

    const mainContent = await fse.readFile(mainFilePath, "utf-8");
    if (devContent === mainContent) {
      // source is unchanged, only need to translate if translation is missing
      isSourceChanged = false;
    } else {
      // source is changed, need to translate all
      console.log(`[MODIFIED SOURCE] ${file}`);
    }

    // Check against each target language
    for (const lang of DST_LAN) {
      // Construct the expected translation path in MAIN to check existence
      // e.g., main/subfolder/README.en.md
      const langFileName = getTargetFileName(file, lang);
      const mainLangFilePath = path.join(MAIN_PATH, langFileName);

      const translationExists = fse.existsSync(mainLangFilePath);
      if (translationExists) {
        // copy the translation from main to translate (as backup)
        const dest = path.join(TARGET_PATH, langFileName);
        fse.ensureDirSync(path.dirname(dest));
        fse.copyFileSync(mainLangFilePath, dest);
      }

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
      needNewTranslation = true;
    }

    if (!isSourceChanged) {
      if (needNewTranslation) {
        console.log(`[NEW TRANSLATION FILE REQUESTED] ${file}`);
      } else {
        console.log(`[UNCHANGED SOURCE] ${file}`);
      }
    }
  }

  if (tasks.length === 0) {
    console.log("✅ No translations needed. Exiting.");
    return;
  }

  console.log(`🚀 Starting translation for ${tasks.length} tasks...`);

  // Process tasks
  for (let i = 0; i < tasks.length; i++) {
    const { file, lang, content } = tasks[i];

    // Construct target path: translate/subfolder/README.en.md
    const targetFileName = getTargetFileName(file, lang);
    const targetFilePath = path.join(TARGET_PATH, targetFileName);

    console.log(`Translating: ${file} -> ${targetFileName} (${lang})`);

    try {
      // replace relative path from .md to .lang.md
      const contentWithPath = content.replace(
        /(\[[^\]]+\]\((?!http)[^)]+)\.md(\))/g,
        `$1.${lang}.md$2`
      );
      const translatedContent = (await translateContent(contentWithPath, lang))


      // Save to target path
      await fse.outputFile(targetFilePath, translatedContent);
      console.log(`✅ Saved: ${targetFilePath}`);

      if (i !== tasks.length - 1) {
        await delay(15000); // waiting for 15 seconds
      }
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