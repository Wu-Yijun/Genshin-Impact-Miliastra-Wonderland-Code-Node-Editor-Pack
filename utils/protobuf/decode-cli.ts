import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { parse } from "./proto2ts.ts";
import { ProtobufParser } from "./decode_raw.ts";
import { verifyProto } from "./verify_proto.ts";
import { inspect } from "util";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function showHelp() {
  console.log(`
Usage: node decode-cli.ts <input_path> [options]

Required:
  input_path                Path to the .gia or protobuf binary file.

Options:
  -h, --help                Show this help message.
  -o, --out <path>          Output file path for the decoded JSON (default will not save to file).
  -p, --protobuf <path>     Protobuf file path (default will load gia.proto).
  -m, --message <name>      Protobuf message name to decode (default: Root).
  -q, --quiet               Disable all console output.
  -s, --strict <boolean>    Enable strict parsing (default: true).
  -n, --no-slice            Disable default slicing (20:-4) of the input file.
  -e, --print-errors        Show all errors in error output.
  --missing-error           Show Missing Field errors in error output.
  --extra-error             Show Extra Field errors in error output.
  --type-error              Show Type Mismatch errors in error output.
  --repeated-error          Show Repeated Mismatch errors in error output.
  --enum-error              Show Invalid Enum errors in error output.
  --skip-paths <paths>      List of error paths to skip (case-sensitive, prefix match).
                            Multiple paths can be separated by spaces.
    `);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("-h")) {
    showHelp();
    return;
  }

  let inputPath: string | undefined;
  let outPath: string | undefined;
  let protobuf_path = join(__dirname, "gia.proto");
  let message_name = "AssetBundle";
  let keepEnum = false;
  let strict = true;
  let slice = true;
  let printErrors = new Set<string>();
  let printAllError = false;
  let skipPaths: string[] = [];
  let quiet = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-o" || arg === "--out") {
      outPath = args[++i];
    } else if (arg === "-p" || arg === "--protobuf") {
      protobuf_path = args[++i];
    } else if (arg === "-m" || arg === "--message") {
      message_name = args[++i];
    } else if (arg === "-q" || arg === "--quiet") {
      quiet = true;
    } else if (arg === "-s" || arg === "--strict") {
      strict = args[++i] !== "false";
    } else if (arg === "-e" || arg === "--print-errors") {
      printAllError = true;
    } else if (arg === "-n" || arg === "--no-slice") {
      slice = false;
    } else if (arg === "-k" || arg === "--keep-enum") {
      keepEnum = true;
    } else if (arg === "--missing-error") {
      printErrors.add("MISSING_FIELD");
    } else if (arg === "--extra-error") {
      printErrors.add("EXTRA_FIELD");
    } else if (arg === "--type-error") {
      printErrors.add("TYPE_MISMATCH");
    } else if (arg === "--repeated-error") {
      printErrors.add("REPEATED_MISMATCH");
    } else if (arg === "--enum-error") {
      printErrors.add("INVALID_ENUM");
    } else if (arg === "--skip-paths") {
      // Collect all following arguments until the next flag
      while (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        skipPaths.push(args[++i]);
      }
    } else if (!arg.startsWith("-")) {
      if (inputPath === undefined) {
        inputPath = arg;
      } else {
        console.error("Error: unknown argument: " + arg);
        showHelp();
        process.exit(1);
      }
    } else {
      console.error("Error: unknown argument: " + arg);
      showHelp();
      process.exit(1);
    }
  }

  if (!inputPath) {
    console.error("Error: input_path is required.");
    showHelp();
    process.exit(1);
  }

  if (!existsSync(inputPath)) {
    console.error(`Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  if (protobuf_path) {
    if (!existsSync(protobuf_path)) {
      console.error(`Error: File not found: ${protobuf_path}`);
      process.exit(1);
    }
  }

  if (!existsSync(protobuf_path)) {
    console.error(`Error: gia.proto not found in ${__dirname}`);
    process.exit(1);
  }

  if (!quiet) console.log(`Loading proto from ${protobuf_path}...`);
  const layers = parse(readFileSync(protobuf_path).toString());
  const rootLayer = layers.message.get(message_name);

  if (!rootLayer) {
    console.error(`Error: ${message_name} message not found in ${protobuf_path}`);
    process.exit(1);
  }

  if (!quiet) console.log(`Reading input from ${inputPath}...`);
  let data = new Uint8Array(readFileSync(inputPath));
  if (slice) {
    if (!quiet) console.log("Applying default slice (20:-4)...");
    data = data.slice(20, -4);
  }

  const parser = new ProtobufParser(strict);
  const { result } = parser.parseMessage(data);

  if (!quiet) console.log("Verifying against proto structure...");
  const res = verifyProto(result, rootLayer, { path: message_name.toLowerCase(), replaceEnum: !keepEnum });

  let filteredErrors = res.errors;

  // Filter by error types if specified
  if (!printAllError) {
    filteredErrors = filteredErrors.filter(err => printErrors.has(err.type));
  }

  // Apply skip paths
  if (skipPaths.length > 0) {
    filteredErrors = filteredErrors.filter(err => {
      return !skipPaths.some(skip => err.path.startsWith(skip));
    });
  }


  if (!quiet) {
    console.log("Errors :", inspect(filteredErrors, { depth: 5, maxArrayLength: Infinity, colors: true }));
    console.log("Filtered Error Count:", filteredErrors.length, "/", res.errors.length);
    const errorCount = Object.entries(Object.groupBy(res.errors, r => r.type)).map(([k, v]) => ([k, v.length]));
    for (const [k, v] of errorCount) {
      console.log("  |--", k, ":", v);
    }
  }

  const finalResult = res.result;

  if (outPath) {
    if (!quiet) console.log(`Writing result to ${outPath}...`);
    if (outPath.endsWith(".json")) {
      // Use JSON.stringify with bigint support like in test_verify.ts
      const jsonContent = JSON.stringify(finalResult, (k, v) => typeof v === "bigint" ? v.toString() : v, 2);
      writeFileSync(outPath, jsonContent);
    } else if (outPath.endsWith(".cs")) {
      writeFileSync(outPath, inspect(finalResult, { depth: Infinity, maxArrayLength: Infinity }));
    } else {
      writeFileSync(outPath, "const " + message_name + " = " + inspect(finalResult, { depth: Infinity, maxArrayLength: Infinity }));
    }
    if (!quiet) console.log("Done.");
  }
}

main().catch(err => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
