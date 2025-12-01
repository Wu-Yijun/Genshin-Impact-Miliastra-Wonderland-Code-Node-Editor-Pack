import { execSync } from "child_process";
import { readdirSync, cpSync, existsSync } from "fs";
import path from "path";

const PATH = path.join(path.dirname(path.dirname(path.dirname(import.meta.dirname))), "main");
console.log(PATH);

// call npm ci
// Using /bin/bash as in original code, assuming environment supports it (e.g. Git Bash on Windows)
execSync("npm ci", { stdio: "inherit", shell: "/bin/bash", cwd: PATH });

const ciDir = import.meta.dirname;
const tests = readdirSync(ciDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && !dirent.name.startsWith('.'))
  .map(dirent => dirent.name);

console.log("Found tests:", tests);

const testDestDir = path.join(PATH, "test");

let passCount = 0;
let failCount = 0;
const errors: string[] = [];

for (const testName of tests) {
  const srcDir = path.join(ciDir, testName);
  const destDir = path.join(testDestDir, testName);

  console.log(`Preparing test: ${testName}`);
  try {
    // Copy test dir
    cpSync(srcDir, destDir, { recursive: true, force: true });

    const testIndex = path.join(destDir, "index.ts");
    if (existsSync(testIndex)) {
      console.log(`Running test: ${testName}`);
      // Execute index.ts using npx tsx to ensure TS support
      // Not specifying shell to use default (cmd on Windows, sh on Unix)
      execSync(`npx tsx "${testIndex}"`, { stdio: "inherit", cwd: destDir });
      passCount++;
    } else {
      console.warn(`Skipping ${testName}: index.ts not found.`);
    }
  } catch (e: any) {
    console.error(`Test failed: ${testName}`);
    failCount++;
    errors.push(`${testName}: ${e.message}`);
  }
}

console.log(`Tests completed. Pass: ${passCount}, Fail: ${failCount}`);
if (errors.length > 0) {
  console.error("Errors:", errors);
}

// Archive dist and move to PATH/../
const distPath = path.join(PATH, "dist");
if (existsSync(distPath)) {
  const archiveName = "dist.tar.gz";
  const destArchiveDir = path.dirname(PATH); // PATH/../
  const archivePath = path.join(destArchiveDir, archiveName);

  console.log(`Archiving dist to ${archivePath}...`);
  try {
    // tar -czf <archive> -C <parent_of_dist> dist
    // Using tar which is generally available in git bash / windows 10+
    execSync(`tar -czf "${archivePath}" -C "${PATH}" dist`, { stdio: "inherit" });
    console.log("Archive created successfully.");
  } catch (e) {
    console.error("Failed to archive dist:", e);
    errors.push(`Archive failed: ${e}`);
  }
} else {
  console.warn("dist directory not found, skipping archive.");
}

if (failCount > 0) {
  process.exit(1);
}
