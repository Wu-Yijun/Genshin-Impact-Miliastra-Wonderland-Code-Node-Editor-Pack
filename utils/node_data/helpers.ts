import { DEBUG, STRICT } from "../gia_gen/utils.ts";
import { CONCRETE_MAP, type ConcreteMap } from "./concrete_map.ts";
import { NODE_PIN_RECORDS, type SingleNodeData } from "./node_pin_records.ts";


// ======================== Concrete Map Helpers ========================

/** Find concrete index from type */
export function get_concrete_index(
  generic_id: number,
  pin_type: number,
  pin_index: number,
  type: number,
  maps: ConcreteMap = CONCRETE_MAP,
) {
  const map = get_concrete_map(generic_id, pin_type, pin_index, maps);
  const index = map.indexOf(type);
  if (index === -1) {
    if (DEBUG || STRICT) {
      console.warn("Type", type, "Is not in map!");
    }
    if (STRICT) throw new Error();
    return 0;
  }
  return index;
}
/** return true if the pin is reflective kind */
export function is_concrete_pin(
  generic_id: number,
  pin_type: number,
  pin_index: number,
  maps: ConcreteMap = CONCRETE_MAP
): boolean {
  return maps.pins.has(
    generic_id + ":" + pin_type + ":" + pin_index,
  );
}
/** Get Concrete Map for a certain pin */
export function get_concrete_map(
  generic_id: number,
  pin_type: number,
  pin_index: number,
  maps = CONCRETE_MAP,
): number[] {
  const index = maps.pins.get(generic_id + ":" + pin_type + ":" + pin_index);
  if (index === undefined) {
    if (DEBUG || STRICT) {
      console.warn(
        "Cannot find concrete map with:",
        generic_id,
        pin_type,
        pin_index,
      );
      console.log("It may be non-reflective pin.");
    }
    if (STRICT) throw new Error();
    return [];
  }
  return maps.maps[index];
}
/** Find concrete type from index */
export function get_concrete_type(
  generic_id: number,
  pin_type: number,
  pin_index: number,
  index: number,
  maps: ConcreteMap = CONCRETE_MAP,
) {
  const map = get_concrete_map(generic_id, pin_type, pin_index, maps);
  const type = map[index];
  if (type === -1) {
    if (DEBUG || STRICT) {
      console.warn("Index", index, "is not in included!");
    }
    if (STRICT) throw new Error();
    return 0;
  }
  return type;
}
export function stringify_concrete_map(map = CONCRETE_MAP) {
  const m = map.maps.map((x) => x.join(",")).join("|");
  const p = [...map.pins.entries()].map(([k, v]) => k + "," + v).join("|");
  return [m, p].join(";");
}
export function parse_concrete_map(str: string): ConcreteMap {
  const [m, p] = str.split(";");
  const maps = m.split("|").map((str) =>
    str.split(",").map((x) => parseInt(x))
  );
  const pins = new Map(
    p.split("|").map((str) => str.split(",")).map(
      (x) => [x[0], parseInt(x[1])],
    ),
  );
  return { maps, pins };
}


// ======================== Node Records Helpers ========================

const NODE_RECORDS_INDEX_MAP: Map<number, number> = new Map(
  NODE_PIN_RECORDS.map((r, i) => [r.id, i])
);
const NODE_ID_MAP: Map<number, number> = new Map(
  NODE_PIN_RECORDS.map(r =>
    r.reflectMap!.map(ref => [ref[0], r.id] as [number, number])
  ).flat()
);

export function get_generic_id(concrete_id: number): number | null {
  return NODE_ID_MAP.get(concrete_id) ?? null;
}
export function get_node_record(gid_cid: number): SingleNodeData | null {
  const id = get_generic_id(gid_cid) ?? gid_cid;
  const idx = NODE_RECORDS_INDEX_MAP.get(id);
  return idx === undefined ? null : NODE_PIN_RECORDS[idx] ?? null;
}