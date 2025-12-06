import { DEBUG, STRICT } from "../utils.ts";
import { CONCRETE_MAP, type ConcreteMap } from "./concrete_map.ts";
import { NODE_ID } from "./node_id.ts";
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
  maps: ConcreteMap = CONCRETE_MAP,
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

/** generic id --> index */
const NODE_RECORDS_INDEX_MAP: Map<number, number> = new Map(
  NODE_PIN_RECORDS.map((r, i) => [r.id, i])
);
/** concrete id --> generic id */
const NODE_ID_MAP: Map<number, number> = new Map(
  NODE_PIN_RECORDS.map(r =>
    "reflectMap" in r ?
      r.reflectMap?.map(ref => [ref[0], r.id] as [number, number])
      : undefined
  ).filter(x => x !== undefined).flat()
);
/** generic id -- NODE_REC[id].reflectMap --> concrete id */

/** Notice that generic id and concrete id are in different spaces. */
export function get_generic_id(concrete_id: number): number | null {
  return NODE_ID_MAP.get(concrete_id) ?? null;
}
/** Is it a valid generic id */
export function is_generic_id(generic_id: number): boolean {
  return NODE_RECORDS_INDEX_MAP.has(generic_id);
}

/** using a valid generic id to get node record */
export function get_node_record_generic(generic_id: number): SingleNodeData | null {
  const idx = NODE_RECORDS_INDEX_MAP.get(generic_id);
  return idx === undefined ? null : NODE_PIN_RECORDS[idx] ?? null;
}

/** using a valid concrete id to get node record */
export function get_node_record(concrete_id: number): SingleNodeData | null {
  const id = get_generic_id(concrete_id);
  if (!id) return null;
  const idx = NODE_RECORDS_INDEX_MAP.get(id);
  return idx === undefined ? null : NODE_PIN_RECORDS[idx] ?? null;
}

// ======================== GIA IR Convertor ========================

const NODE_ID_Set: Map<number, string> = Object.freeze(new Map(
  Object.entries(NODE_ID as Record<string, number>)
    .map(([k, v]) => [v, k] as [number, string])
    .filter(([_, v]) => !v.endsWith("__Generic"))
));
const NODE_ID_Generic_Set: Map<number, string> = Object.freeze(new Map(
  Object.entries(NODE_ID as Record<string, number>)
    .map(([k, v]) => [v, k] as [number, string])
    .filter(([_, v]) => !v.endsWith("__Generic"))
));
export function get_node_name_from_id(cid: number, is_generic?: boolean): string | null {
  if (is_generic === true) {
    return NODE_ID_Generic_Set.get(cid) ?? null;
  } else {
    return NODE_ID_Set.get(cid) ?? null;
  }
}