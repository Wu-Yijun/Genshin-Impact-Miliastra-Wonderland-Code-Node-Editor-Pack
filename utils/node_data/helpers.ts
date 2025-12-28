import { get_type, get_id, type NodeType, get_id_client } from "../gia_gen/nodes.ts";
import { assert, DEBUG, STRICT } from "../utils.ts";
import { CONCRETE_MAP, type ConcreteMap } from "./concrete_map.ts";
import { GRAPH_CONSTS, type GraphConst } from "./consts.ts";
import { CLIENT_NODE_ID, NODE_ID } from "./node_id.ts";
import { NODE_PIN_RECORDS, type SingleNodeData } from "./node_pin_records.ts";



// ======================== Graph Consts Helpers ========================

export function get_graph_const(name: string | GraphConst): GraphConst {
  return typeof name === "string" ? GRAPH_CONSTS.find((g) => g.Name === name)! : name;
}
export function get_graph_const_by_which(which: number): GraphConst | undefined {
  return GRAPH_CONSTS.find((g) => g.Which === which);
}

// ======================== Concrete Map Helpers ========================

export function get_index_of_concrete(generic_id: number, is_input: boolean, pin_index: number, type: number): number | null;
export function get_index_of_concrete(generic_id: number, is_input: boolean, pin_index: number, type: NodeType, is_server: boolean): number | null;
/** Find index of concrete from type
 * - Note1: type should be type number corresponding to server or client
 * - Note2: if using NodeType, is_server should also be provided!
 */
export function get_index_of_concrete(
  generic_id: number,
  is_input: boolean,
  pin_index: number,
  type: number | NodeType,
  is_server?: boolean,
): number | null {
  const map = get_concrete_map(generic_id, is_input, pin_index);
  if (map === null) {
    if (typeof type !== "number" && type.t === "e") {
      return type.e;
    }
    return null;
  }
  let index = -1;
  if (is_server !== undefined) {
    assert(typeof type !== "number")
    type = is_server ? get_id(type) : get_id_client(type);
  }
  assert(typeof type === "number")
  index = map.indexOf(type);
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

const NODE_ID_Set: Map<number, string> = Object.freeze(new Map(
  Object.entries(NODE_ID as Record<string, number>)
    .map(([k, v]) => [v, k] as [number, string])
    .filter(([_, v]) => !v.endsWith("__Generic"))
));
const Client_NODE_ID_Set: Map<string, string> = Object.freeze(new Map(
  Object.entries(CLIENT_NODE_ID as Record<string, string>)
    .map(([k, v]) => [v, k] as [string, string])
    .filter(([_, v]) => !v.endsWith("__Generic"))
));
const NODE_ID_Generic_Set: Map<number, string> = Object.freeze(new Map(
  Object.entries(NODE_ID as Record<string, number>)
    .map(([k, v]) => [v, k] as [number, string])
    .filter(([_, v]) => v.endsWith("__Generic"))
));
const Client_NODE_ID_Generic_Set: Map<number, string> = Object.freeze(new Map(
  Object.entries(CLIENT_NODE_ID as Record<string, string>)
    .map(([k, v]) => [parseInt(v), k] as [number, string])
    .filter(([_, v]) => !v.endsWith("__Generic"))
));
export function get_server_node_name_from_cid(cid: number): string | null {
  return NODE_ID_Set.get(cid) ?? null;
}
export function get_server_node_name_from_gid(gid: number): string | null {
  return NODE_ID_Generic_Set.get(gid) ?? null;
}
export function get_client_node_name_from_cid(cid: string): string | null {
  return Client_NODE_ID_Set.get(cid) ?? null;
}
export function get_client_node_name_from_gid(gid: number): string | null {
  return Client_NODE_ID_Generic_Set.get(gid) ?? null;
}
export function get_node_name_from_cid(id: number | string): string | null {
  if (typeof id === "number") {
    return get_server_node_name_from_cid(id);
  } else {
    return get_client_node_name_from_cid(id);
  }
}
export function get_node_name_from_gid(id: number): string | null {
  const server_name = get_server_node_name_from_gid(id);
  if (server_name !== null) {
    return server_name;
  }
  const client_name = get_client_node_name_from_gid(id);
  if (client_name !== null) {
    return client_name;
  }
  return null;
}