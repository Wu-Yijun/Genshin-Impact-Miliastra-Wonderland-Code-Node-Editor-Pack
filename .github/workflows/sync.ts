import fs from "fs";
import path from "path";
import fg from "fast-glob";
import fse from "fs-extra";
import { execSync } from "child_process";

interface SyncConfig {
  include: string[];
  exclude: string[];
  commitMessage?: string;
}

const ROOT = process.cwd();
const MAIN_DIR = path.join(ROOT, "main");

function loadConfig(): SyncConfig {
  const configPath = path.join(ROOT, "sync-list.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("sync-list.json not found");
  }
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function resolvePattern(pattern: string): string {
  // Absolute ("/src") → remove leading slash, match from root
  if (pattern.startsWith("/")) {
    return pattern.substring(1);
  }
  // Relative ("src") → match anywhere
  return "**/" + pattern;
}

function collectFiles(patterns: string[]): string[] {
  const finalPatterns = patterns.map(resolvePattern);
  return fg.sync(finalPatterns, { dot: true });
}

function syncFiles(config: SyncConfig) {
  console.log("🟦 Cleaning main/ ...");
  fse.emptyDirSync(MAIN_DIR);

  console.log("🟩 Collecting include files...");
  let included = collectFiles(config.include);

  console.log("🚫 Applying exclude rules...");
  let excluded = new Set(collectFiles(config.exclude));

  let finalFiles = included.filter(f => !excluded.has(f));

  console.log(`📦 Total files to sync: ${finalFiles.length}`);

  for (let file of finalFiles) {
    const srcPath = path.join(ROOT, file);
    const dstPath = path.join(MAIN_DIR, file);

    fse.ensureDirSync(path.dirname(dstPath));
    fse.copyFileSync(srcPath, dstPath);
  }
}

function getDevCommitMessage(): string {
  try {
    return execSync("git log -1 --pretty=%B", { encoding: "utf8" }).trim();
  } catch {
    return "Sync from dev";
  }
}

function main() {
  const config = loadConfig();

  syncFiles(config);

  let commitMessage =
    config.commitMessage && config.commitMessage.trim() !== ""
      ? config.commitMessage
      : getDevCommitMessage();

  console.log(`📝 Commit message: "${commitMessage}"`);

  console.log("💾 Adding files to git (main/) ...");

  // Commit inside main directory
  const gitCmd = `
    cd main &&
    git add -A &&
    (git commit -m "${commitMessage.replace(/"/g, '\\"')}" || echo "No changes") &&
    git push
  `;

  execSync(gitCmd, { stdio: "inherit", shell: "/bin/bash" });
}

main();
