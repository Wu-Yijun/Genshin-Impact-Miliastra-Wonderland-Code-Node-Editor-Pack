import { writeFileSync } from "fs";
import { read_data } from "./data.helper.ts";
import { stringify } from "yaml";

const p = read_data().Enums.filter(x => x.Category === "ElementReaction");

writeFileSync("temp.yaml", stringify(p));