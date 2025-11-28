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
const out_dir = process.argv[2] ?? "main";
const in_dir = process.argv[3] ?? "dev";
const sync_path = process.argv[4] ?? path.join(in_dir, "sync-list.json");

function loadConfig(): SyncConfig {
  if (!fs.existsSync(sync_path)) {
    throw new Error("sync-list.json not found");
  }
  return JSON.parse(fs.readFileSync(sync_path, "utf8"));
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
  return fg.sync(finalPatterns, { cwd: in_dir, dot: true });
}

function syncFiles(config: SyncConfig) {
  // console.log("🟦 Cleaning main/ ...");
  // fse.emptyDirSync(out_dir);

  console.log("🟩 Collecting include files...");
  let included = collectFiles(config.include);

  console.log("🚫 Applying exclude rules...");
  let excluded = new Set(collectFiles(config.exclude));

  let finalFiles = included.filter(f => !excluded.has(f));

  console.log(`📦 Total files to sync: ${finalFiles.length}`);

  for (let file of finalFiles) {
    const srcPath = path.join(in_dir, file);
    const dstPath = path.join(out_dir, file);

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
