import { get_type, get_id, NodeType } from "../gia_gen/nodes.ts";
import { assert, DEBUG, STRICT } from "../utils.ts";
import { CONCRETE_MAP, type ConcreteMap } from "./concrete_map.ts";
import { NODE_ID } from "./node_id.ts";
import { NODE_PIN_RECORDS, type SingleNodeData } from "./node_pin_records.ts";

// ======================== Concrete Map Helpers ========================

/** Find index of concrete from type */
export function get_index_of_concrete(
  generic_id: number,
  is_input: boolean,
  pin_index: number,
  type: number | NodeType,
): number | null {
  const map = get_concrete_map(generic_id, is_input, pin_index);
  if (map === null) {
    return null;
  }
  const index = map.indexOf(typeof type === "number" ? type : get_id(type));
  if (index === -1) {
    if (typeof type !== "number" && type.t === "e") {
      return type.e;
    }
    return null;
  }
  return index;
}
/** return true if the pin is reflective kind */
export function is_concrete_pin(
  generic_id: number,
  is_input: boolean,
  pin_index: number,
  maps: ConcreteMap = CONCRETE_MAP
): boolean {
  return maps.pins.has(
    generic_id + ":" + (is_input ? 3 : 4) + ":" + pin_index,
  );
}
/** Get Concrete Map for a certain pin */
export function get_concrete_map(
  generic_id: number,
  is_input: boolean,
  pin_index: number,
): number[] | null {
  const index = CONCRETE_MAP.pins.get(generic_id + ":" + (is_input ? 3 : 4) + ":" + pin_index);
  if (index === undefined) {
    return null;
  }
  const ret = CONCRETE_MAP.maps[index];
  assert(ret !== undefined);
  return ret;
}

/** Find concrete type from index */
export function get_concrete_type(
  generic_id: number,
  is_input: boolean,
  pin_index: number,
  index_of_concrete: number,
): NodeType | null {
  const map = get_concrete_map(generic_id, is_input, pin_index);
  if (map === null) {
    return null;
  }
  const type = map[index_of_concrete];
  assert(type !== undefined);
  return get_type(type);
}

// ======================== Node Records Helpers ========================

/** generic id --> index */
const NODE_RECORDS_INDEX_MAP: Map<number, number> = Object.freeze(new Map(
  NODE_PIN_RECORDS.map((r, i) => [r.id, i])
));
/** concrete id --> generic id */
const NODE_ID_MAP: Map<number | string, number> = Object.freeze(new Map(
  NODE_PIN_RECORDS.map(r =>
    "reflectMap" in r ?
      r.reflectMap?.map(ref => [ref[0], r.id] as [number | string, number])
      : undefined
  ).filter(x => x !== undefined).flat()
));
/** generic id -- NODE_REC[id].reflectMap --> concrete id */

/** Notice that generic id and concrete id are in different spaces. */
export function get_generic_id(concrete_id: number | string): number | null {
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
export function get_node_record(concrete_id: number | string): SingleNodeData | null {
  const id = get_generic_id(concrete_id);
  if (id === null) return null;
  const idx = NODE_RECORDS_INDEX_MAP.get(id);
  return idx === undefined ? null : NODE_PIN_RECORDS[idx] ?? null;
}

// ======================== GIA IR Convertor ========================

// const NODE_ID_Set: Map<number, string> = Object.freeze(new Map(
//   Object.entries(NODE_ID as Record<string, number>)
//     .map(([k, v]) => [v, k] as [number, string])
//     .filter(([_, v]) => !v.endsWith("__Generic"))
// ));
// const NODE_ID_Generic_Set: Map<number, string> = Object.freeze(new Map(
//   Object.entries(NODE_ID as Record<string, number>)
//     .map(([k, v]) => [v, k] as [number, string])
//     .filter(([_, v]) => !v.endsWith("__Generic"))
// ));
// export function get_node_name_from_id(cid: number, is_generic?: boolean): string | null {
//   if (is_generic === true) {
//     return NODE_ID_Generic_Set.get(cid) ?? null;
//   } else {
//     return NODE_ID_Set.get(cid) ?? null;
//   }
// }