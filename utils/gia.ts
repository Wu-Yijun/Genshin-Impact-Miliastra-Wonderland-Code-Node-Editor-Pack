import { readFileSync } from "fs";
import proto from "protobufjs";

const bytes = readFileSync(import.meta.dirname + "/../src/test/enumAll.gia").buffer;

const root = proto.loadSync(import.meta.dirname + "/gia.proto");
const message = root.lookupType("Root");
// console.log(message);

const msg: any = message.decode(new Uint8Array(bytes, 20, bytes.byteLength - 24));

const nodes = msg.graph.graph.inner.graph.nodes;
console.log(nodes.map(x => x.nodeIndex));