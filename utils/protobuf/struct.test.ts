import { readFileSync, writeFileSync } from "fs";
import { parse } from "./proto2ts.ts";
import { ProtobufParser } from "./decode_raw.ts";
import { verifyProto } from "./verify_proto.ts";
import { inspect } from "util";

const PATH = "c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia";


const layers = parse(readFileSync(import.meta.dirname + "/gia.proto").toString());
const parser = new ProtobufParser(true)
const { result } = parser.parseMessage(new Uint8Array(readFileSync(PATH)).slice(20, -4));

// console.log(result);

const res = verifyProto(result, layers.message.get("AssetBundle")!, { replaceEnum: true });
console.log("Errors:", inspect(res.errors.filter(x => x.type !== "MISSING_FIELD" && !x.path.startsWith("root.accessories.structureDef")), { depth: Infinity, colors: true }));

console.dir(res.result.primary_resource.graph_data.inner.graph.blackboard.map((val: any) => (val.storage_value)), { depth: Infinity, colors: true });

// writeFileSync(import.meta.dirname + "/temp.js", "const res = " + inspect(res.result, { depth: Infinity, maxArrayLength: Infinity }));