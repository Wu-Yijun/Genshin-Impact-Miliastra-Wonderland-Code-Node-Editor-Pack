import { execSync } from "child_process";
import { readdirSync, cpSync, existsSync, mkdirSync } from "fs";
import path from "path";

const SRC = import.meta.dirname;
const PATH = path.join(process.cwd(), "main");

const tests = readdirSync(SRC, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && !dirent.name.startsWith('.'))
  .map(dirent => dirent.name);

console.log("🟩 Found tests:", tests);

let passCount = 0;
let failCount = 0;
const errors: string[] = [];

for (const testName of tests) {
  // const srcDir = path.join(ciDir, testName);
  // const destDir = path.join(testDestDir, testName);

  console.log(`🟩 Preparing test: ${testName}`);
  try {
    // Copy test dir
    cpSync(path.join(SRC, testName), path.join(PATH, "test", testName), { recursive: true, force: true });

    const testIndex = path.join(PATH, "test", testName, "test.ts");
    if (existsSync(testIndex)) {
      console.log(`🟦 Running test: ${testName}`);
      // Execute index.ts using npx tsx to ensure TS support
      // Not specifying shell to use default (cmd on Windows, sh on Unix)
      execSync(`node "${testIndex}"`, { stdio: "inherit", cwd: PATH });
      passCount++;
    } else {
      console.warn(`🚫 Skipping ${testName}: index.ts not found.`);
    }
  } catch (e: any) {
    console.error(`🟥 Test failed: ${testName}`);
    failCount++;
    errors.push(`${testName}: ${e.message}`);
  }
}

const state = failCount > 0 ? passCount === 0 ? "🟥" : "🟨" : "🟩";
console.log(`${state} All Tests completed. Pass: ${passCount}, Fail: ${failCount}`);
if (errors.length > 0) {
  console.error("Errors:", errors);
}

// // Archive dist and move to PATH/../
// const distPath = path.join(PATH, "dist");
// if (existsSync(distPath)) {
//   const destArchiveDir = path.dirname(PATH); // PATH/../
//   const archivePath = path.join(destArchiveDir, "test_output.tar.gz");

//   console.log(`📦 Archiving dist to ${archivePath}...`);
//   try {
//     // tar -czf <archive> -C <parent_of_dist> dist
//     execSync(`tar -czf "${archivePath}" -C "${PATH}" dist`, { stdio: "inherit" });
//     console.log("🟩 Archive created successfully.");
//   } catch (e) {
//     console.error("Failed to archive dist:", e);
//     errors.push(`🟨 Archive failed: ${e}`);
//   }
// } else {
//   console.warn("🚫 dist directory not found, skipping archive.");
// }

if (failCount > 0) {
  process.exit(1);
}
