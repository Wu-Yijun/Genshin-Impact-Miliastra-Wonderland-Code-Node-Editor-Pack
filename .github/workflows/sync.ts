import fs from "fs";
import path from "path";
import fg from "fast-glob";
import fse from "fs-extra";
import { execSync } from "child_process";

interface SyncConfig {
  include: string[];
  // exclude: string[];
  commitMessage?: string;
  notSync?: boolean;
}

if(
  process.argv.length < 2 || process.argv.length > 5 || 
  process.argv.includes("--help") || process.argv.includes("-h")
) {
  console.error("Usage: ts-node sync.ts [out_dir] [in_dir] [sync_path]");
  process.exit(1);
}

const out_dir = process.argv[2] ?? "main";
const in_dir = process.argv[3] ?? "dev";
const sync_path = process.argv[4] ?? path.join(in_dir, "sync-list.json");

function loadConfig(): SyncConfig {
  if (!fs.existsSync(sync_path)) {
    throw new Error(`${sync_path} not found`);
  }
  return JSON.parse(fs.readFileSync(sync_path, "utf8"));
}

function cleanDir(dir: string) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory does not exist. Make sure you checkout main into '${dir}' folder.`);
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file === ".git") continue; // keep git metadata
    fse.removeSync(path.join(dir, file));
  }
}

function syncFiles(config: SyncConfig) {
  console.log(`🟦 Cleaning ${out_dir}/ ...`);
  cleanDir(out_dir);

  console.log("🟩 Collecting include files...");
  const included = fg.sync(config.include, { cwd: in_dir, dot: true });

  // console.log("🚫 Applying exclude rules...");
  // let excluded = new Set(collectFiles(config.exclude));

  // let finalFiles = included.filter(f => !excluded.has(f));
  const finalFiles = included;

  // console.debug(config, included, excluded, finalFiles);

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
  if(config.notSync) {
    console.log("⚠️ Sync is disabled via 'notSync' flag in sync-list.json. Exiting.");
    return;
  }

  syncFiles(config);

  let commitMessage =
    config.commitMessage && config.commitMessage.trim() !== ""
      ? config.commitMessage
      : getDevCommitMessage();

  console.log(`📝 Commit message: "${commitMessage}"`);

  console.log("💾 Adding files to git (main/) ...");

  // Commit inside main directory
  const gitCmd = `
    cd ${out_dir} &&
    git config user.name "github-actions[bot]" &&
    git config user.email "github-actions[bot]@users.noreply.github.com" &&
    git add -A &&
    (git commit -m "${commitMessage.replace(/"/g, '\\"')}" || echo "No changes") &&
    git push
  `;

  execSync(gitCmd, { stdio: "inherit", shell: "/bin/bash" });
}

main();
