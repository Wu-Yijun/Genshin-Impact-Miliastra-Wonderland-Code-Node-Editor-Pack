import { counter_dynamic_id, counter_index, get_system, is_empty, randomInt, tracker_index } from "./utils.ts";
import { assert, assertEq, todo } from "../utils.ts";

import * as Gia from "../protobuf/gia.proto.ts";

import type { ResourceClass, TypedValue } from "../node_data/types.ts";
import { type DictType, type ListType, type NodeType, parse, stringify, type StructType, type_equal, UNK_TYPE } from "../node_data/node_type.ts";
import { DocHelper, ServerTypeHelper, ClientTypeHelper } from "../node_data/instances.ts";
import type { TypedNodeDef, TypedPinDef } from "../node_data/core.ts";


export interface GraphBody_ {
  system: ResourceClass;
  /** 唯一标识符 */
  uid: number;
  /** 图的 ID */
  graph_id: number;
  /** 图文件的ID，可选, 通常是 graph_id + i */
  file_id?: number;
  /** 图的名称，可选 */
  graph_name?: string;
  /** 图中包含的节点列表，可选 */
  nodes?: Gia.NodeInstance[];
  comments?: Gia.Annotation[];
  graphValues?: Gia.GraphVariable[];
}

/**
 * 根据提供的参数构建一个图对象 (Gia.AssetBundle)
 */
export function graph_body(body: GraphBody_): Gia.AssetBundle {
  const graph_name = body.graph_name ?? "Graph " + randomInt(8).toString() + ".gia";
  const file_name = graph_name.replaceAll(/[^a-zA-Z0-9_.]+/gs, "_").replaceAll(/[A-Z]/g, (m) => m.toLowerCase());
  const timestamp = Math.floor(Date.now() / 1000);
  const file_id = body.file_id ?? body.graph_id + counter_dynamic_id.value;

  const Identifier = DocHelper.systemConstants.GRAPH_CATEGORY_CONSTS[body.system];
  const asset_locator = make_resource_locator({
    origin: Identifier.AssetsOrigin,
    category: Identifier.AssetsCategory,
    kind: Identifier.AssetsKind,
    guid: body.graph_id
  });
  const graph_locator = make_resource_locator({
    origin: Identifier.GraphOrigin,
    category: Identifier.GraphCategory,
    kind: Identifier.GraphKind,
    id: body.graph_id
  });

  const system = get_system(body.system);
  const nodeGraph: Gia.NodeGraph = {
    identity: graph_locator,
    display_name: graph_name,
    nodes: body.nodes ?? [],
    comments: body.comments ?? [],
    blackboard: body.graphValues ?? [],
    port_mappings: [],

    // Client only
    entry_slot_index: system === "Client" ? 1 : undefined,
    evaluation_interval: system === "Client" ? 0.3 : undefined,
  };

  const assetBundle: Gia.AssetBundle = {
    primary_resource: {
      identity: asset_locator,
      reference_list: [],
      internal_name: graph_name,
      resource_class: Identifier.AssetsWhich as Gia.ResourceEntry_ResourceClass,
      graph_data: {
        inner: {
          graph: nodeGraph
        }
      }
    },
    dependencies: [],
    export_tag: `${body.uid}-${timestamp}-${file_id}-\\${file_name}`,
    engine_version: DocHelper.doc.GameVersion,
  };

  return assetBundle;
}

export interface NodeBody_ {
  system: ResourceClass;
  def: TypedNodeDef;
  x: number;
  y: number;
  comment?: Gia.Annotation;
  pins: Gia.PinInstance[];
  /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
  unique_index?: number;
}

/**
 * 构建节点对象 (Gia.NodeInstance)
 */
export function node_body(body: NodeBody_): Gia.NodeInstance {
  const nodeIndex = body.unique_index ?? counter_index.value;

  const Identifier = DocHelper.systemConstants.GRAPH_CATEGORY_CONSTS[body.system];

  // Construct Shell Ref (UI Definition)
  const shell_ref = make_resource_locator({
    origin: Identifier.NodeOrigin,
    category: Identifier.NodeCategory,
    kind: Identifier.NodeKind,
    id: body.def.ID
  });

  const kernel_ref = body.def.KernelID === undefined ? undefined : make_resource_locator({
    origin: Identifier.NodeOrigin,
    category: Identifier.NodeCategory,
    kind: Identifier.NodeKind,
    id: body.def.KernelID
  });

  return {
    index: nodeIndex,
    shell_ref,
    kernel_ref,
    pins: body.pins,
    x_pos: body.x,
    y_pos: body.y,
    attached_comment: body.comment,
    using_structs: [], // To be populated if needed
  };
}

export interface PinBody_ {
  system: ResourceClass;
  def: TypedPinDef; // Definition of the pin from NodeDef
  is_flow?: boolean; // Is a control flow pin, otherwise use data pin.
  /** Pin Value (if input) */
  value?: Gia.TypedValue;
  connections?: Gia.NodeConnection[];
}

/**
 * 构建引脚对象 (Gia.PinInstance)
 */
export function pin_body(body: PinBody_): Gia.PinInstance {
  const shell_sig = make_pin_sig(body.def.ShellIndex, body.def.Direction === "Out", body.is_flow);
  const kernel_sig = make_pin_sig(body.def.KernelIndex, body.def.Direction === "Out", body.is_flow);

  if (body.is_flow === true) {
    return {
      shell_sig,
      kernel_sig,
      value: null as any, // Pin has no value
      type: 0,
      connections: body.connections ?? [],
    };
  } else {
    let type = 0;
    if (get_system(body.system) === "Server") {
      type = ServerTypeHelper.get_type_id(body.def.Type) ?? 0;
    } else {
      type = ClientTypeHelper.get_type_id(body.def.Type) ?? 0;
    }
    return {
      shell_sig,
      kernel_sig,
      value: body.value ?? (null as any),
      type,
      connections: body.connections ?? [],
    }
  }
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function make_resource_locator(args: { origin: number, category: number, kind: number, guid?: number, id?: number }): Gia.ResourceLocator {
  return {
    source_domain: args.origin as 0,
    service_domain: args.category as 0,
    kind: args.kind as 0,
    asset_guid: args.guid ?? 0,
    runtime_id: args.id ?? 0
  }
}

function get_type_s(type: NodeType): Gia.ServerTypeId {
  return ServerTypeHelper.get_type_id(type) ?? ServerTypeHelper.DEFAULT_TYPE.ID as any;
}
function get_type_c(type: NodeType): Gia.ClientTypeId {
  return ClientTypeHelper.get_type_id(type) ?? ClientTypeHelper.DEFAULT_TYPE.ID as any;
}

function to_type_s(id: number): NodeType {
  return parse(ServerTypeHelper.getTypeByID(id)?.Identifier ?? ServerTypeHelper.DEFAULT_TYPE.Identifier);
}
function to_type_c(id: number): NodeType {
  return parse(ClientTypeHelper.getTypeByID(id)?.Identifier ?? ClientTypeHelper.DEFAULT_TYPE.Identifier);
}

function make_type_definition(type: NodeType, is_server: boolean, is_pair = false): Gia.TypeDefinition {
  if (is_server) {
    const ret: Gia.TypeDefinition = {
      backend: Gia.TypeDefinition_Backend.SERVER,
      server_side: {
        type_tag: get_type_s(type),
        impl: Gia.TypeDefinition_ServerType_Implementation.PRIMITIVE,
      }
    };
    if (type.t === "l" && type.i.t === "s") {
      // Special Struct List
      ret.server_side!.impl = Gia.TypeDefinition_ServerType_Implementation.STRUCT;
      let id = type.i._;
      if (id === undefined) {
        id = 0;
        console.warn("Struct ID is not set.");
      }
      ret.server_side!.struct_ref!.schema_id = id;
    } else if (type.t === "d") {
      if (is_pair) {
        // Special Pair Item
        ret.server_side!.impl = Gia.TypeDefinition_ServerType_Implementation.STRUCT;
      } else {
        ret.server_side!.impl = Gia.TypeDefinition_ServerType_Implementation.PAIR;
      }
      ret.server_side!.map_binding = {
        key_type: get_type_s(type.k),
        value_type: get_type_s(type.v),
      }
      let id = undefined;
      if (type.v.t === "s") {
        // Special Map<K, Struct>
        id = type.v._;
      } else if (type.v.t === "l" && type.v.i.t === "s") {
        // Special Map<K, List<Struct>>
        id = type.v.i._;
      }
      ret.server_side!.map_binding.value_struct_id = id;
    } else if (type.t == "s") {
      ret.server_side!.impl = Gia.TypeDefinition_ServerType_Implementation.STRUCT;
      let id = type._;
      if (id === undefined) {
        console.warn("Struct ID is not set.");
        id = 0;
      }
      ret.server_side!.struct_ref!.schema_id = id;
    }
    return ret;
  } else {
    return {
      backend: Gia.TypeDefinition_Backend.CLIENT,
      client_side: {
        type_tag: get_type_c(type)
      }
    }
  }
}


export function make_dynamic_type_metadata(type: NodeType): Gia.DynamicTypeMetadata {
  let ret: Gia.DynamicTypeMetadata_Config_Inner;
  if (type.t === "l" && type.i.t === "s") {
    // Special Struct List
    let id = type.i._;
    if (id === undefined) {
      id = 0;
      console.warn("Struct ID is not set.");
    }
    ret = {
      container_style: Gia.TypedValue_WidgetType.LIST_GROUP,
      item_style: Gia.TypedValue_WidgetType.STRUCT_BLOCK,
      list_item_struct_id: { schema_id: id }
    };
  } else if (type.t === "d") {
    let id = type.v.t === "s" ? type.v._ : undefined;
    ret = {
      container_style: Gia.TypedValue_WidgetType.MAP_GROUP,
      map_config: {
        key_type: get_type_s(type.k),
        value_type: get_type_s(type.v),
        value_struct_id: id
      }
    };
  } else if (type.t == "s") {
    let id = type._;
    if (id === undefined) {
      console.warn("Struct ID is not set.");
      id = 0;
    }
    ret = {
      container_style: Gia.TypedValue_WidgetType.STRUCT_BLOCK,
      target_struct_id: { schema_id: id }
    };
  } else {
    console.warn("Should not make dynamic type metadata for type: " + stringify(type));
    ret = {
      container_style: Gia.TypedValue_WidgetType.UNKNOWN,
    };
  }
  return {
    version: 1,
    config: {
      inner: ret
    }
  };
}

function make_tracker(): Gia.TypedValue_InstanceTracker {
  return {
    version_tag: 1,
    identity: { local_index: tracker_index.value },
  }
}

export function make_typed_value(type: NodeType, is_server: boolean, val?: TypedValue): Gia.TypedValue {
  // Helper to check basic types
  if (type.t === "b") {
    switch (type.b) {
      case "Int":
        return make_int_value(val ?? null, make_type_definition(type, is_server));
      case "Flt":
        return make_float_value(val ?? null, make_type_definition(type, is_server));
      case "Bol":
        return make_enum_value(val ?? null, make_type_definition(type, is_server));
      case "Str":
        return make_string_value(val ?? null, make_type_definition(type, is_server));
      case "Vec":
        return make_vector_value(val ?? null, make_type_definition(type, is_server));
      case "Gid":
      case "Pfb":
      case "Cfg":
      case "Fct":
        return make_id_value(val ?? null, make_type_definition(type, is_server));
      case "Vss":
      case "Loc":
      case "Ety":
        if (!is_empty(val)) {
          console.warn("Should not set val for " + type.b + ": " + typeof val, val);
        }
        return make_id_value(null, make_type_definition(type, is_server));
      default:
        console.warn("Invalid type: " + type.t);
        return { widget: Gia.TypedValue_WidgetType.UNKNOWN, is_value_set: 0 };
    }
  } else if (type.t === "e") {
    return make_enum_value(val ?? null, make_type_definition(type, is_server));
  } else if (type.t === "l") {
    return make_list_value(type, is_server, val ?? null);
  } else if (type.t === "d") {
    return make_map_value(type, is_server, val ?? null);
  } else if (type.t === "s") {
    return make_struct_value(type, is_server, val ?? null);
  } else {
    console.warn("Invalid type: " + type.t);
    return { widget: Gia.TypedValue_WidgetType.UNKNOWN, is_value_set: 0 };
  }
}


export function make_variant_value(type: NodeType, is_server: boolean, type_index: number, val?: TypedValue): Gia.TypedValue {
  const ret: Gia.TypedValue = {
    widget: Gia.TypedValue_WidgetType.TYPE_SELECTOR,
    is_value_set: 1,
    type_def: make_type_definition(type, is_server),
    val_poly: {
      chosen_type_index: type_index,
      actual_value: make_typed_value(type, is_server, val),
    }
  };
  if (type.t === "s" || type.t === "l" && type.i.t === "s" || type.t === "d") {
    // any struct involved, or map type involved
    ret.val_poly!.extra_meta = make_dynamic_type_metadata(type);
  }
  return ret;
}

/** must be **Server** */
export function make_graph_variable(type: NodeType, var_name: string, val: TypedValue, exposed: boolean): Gia.GraphVariable {
  /**
message GraphVariable {
  string var_name = 2;

  // 变量的数据类型定义
  ServerTypeId base_type = 3;

  // 变量的初始值/当前值
  TypedValue storage_value = 4;

  // 是否暴露为外部可配置参数
  bool is_public = 5;

  // 如果是结构体变量，指向其定义的 ID
  optional int64 schema_ref_id = 6;

  // 容器类型的子类型定义 (残留字段, 仅对 Map 有效)
  ServerTypeId container_key_type   = 7;
  ServerTypeId container_value_type = 8;
}
   */

  let ret: Gia.GraphVariable = {
    var_name: var_name,
    base_type: get_type_s(type),
    storage_value: make_typed_value(type, true, val),
    is_public: exposed,
    container_key_type: 6,
    container_value_type: 6,
  };
  if (type.t === "s") {
    ret.schema_ref_id = type._;
  } else if (type.t === "l" && type.i.t === "s") {
    ret.schema_ref_id = type.i._;
  } else if (type.t === "d") {
    ret.container_key_type = get_type_s(type.k);
    ret.container_value_type = get_type_s(type.v);
    if (type.k.t === "s") {
      ret.schema_ref_id = type.k._;
    } else if (type.k.t === "l" && type.k.i.t === "s") {
      ret.schema_ref_id = type.k.i._;
    }
  }
  return ret;
}


export function read_graph_variable(proto: Gia.GraphVariable): {
  type: NodeType;
  name: string;
  val: TypedValue;
  exposed: boolean;
} {

  const val = read_typed_value(proto.storage_value);
  const exposed = proto.is_public;
  const name = proto.var_name;
  const type = to_type_s(proto.base_type);
  if (type.t === "d") {
    type.k = to_type_s(proto.container_key_type);
    type.v = to_type_s(proto.container_value_type);
    if (type.k.t === "s") {
      type.k._ = proto.schema_ref_id;
    } else if (type.k.t === "l" && type.k.i.t === "s") {
      type.k.i._ = proto.schema_ref_id;
    }
  } else if (type.t === "l" && type.i.t === "s") {
    type.i._ = proto.schema_ref_id;
  } else if (type.t === "s") {
    type._ = proto.schema_ref_id;
  }
  return {
    type: type,
    name: name,
    val: val.value,
    exposed: exposed,
  };
}

export function make_int_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (typeof val === "number") {
    const ret: Gia.TypedValue = {
      widget: Gia.TypedValue_WidgetType.NUMBER_INPUT,
      is_value_set: 1,
      type_def: type_def,
      // tracker: undefined, 
      val_int: { int: val }
    };
    return ret;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Int: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.NUMBER_INPUT,
    is_value_set: 0,
    type_def: type_def,
  }
}

export function make_float_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (typeof val === "number") {
    const ret: Gia.TypedValue = {
      widget: Gia.TypedValue_WidgetType.DECIMAL_INPUT,
      is_value_set: 1,
      type_def: type_def,
      // tracker: undefined, 
      val_float: { float: val }
    };
    return ret;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Float: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.DECIMAL_INPUT,
    is_value_set: 0,
    type_def: type_def,
  };
}

export function make_id_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (typeof val === "number") {
    const ret: Gia.TypedValue = {
      widget: Gia.TypedValue_WidgetType.ID_INPUT,
      is_value_set: 1,
      type_def: type_def,
      // tracker: undefined, 
      val_id: { id: val }
    };
    return ret;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for ID: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.ID_INPUT,
    is_value_set: 0,
    type_def: type_def,
  }
}

export function make_enum_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (typeof val === "number") {
    const ret: Gia.TypedValue = {
      widget: Gia.TypedValue_WidgetType.ENUM_PICKER,
      is_value_set: 1,
      type_def: type_def,
      // tracker: undefined, 
      val_enum: { enum: val }
    };
    return ret;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Enum: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.ENUM_PICKER,
    is_value_set: 0,
    type_def: type_def,
  }
}


export function make_vector_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (Array.isArray(val)) {
    const x = val[0] ?? 0;
    const y = val[1] ?? 0;
    const z = val[2] ?? 0;
    if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
      const ret: Gia.TypedValue = {
        widget: Gia.TypedValue_WidgetType.VECTOR_GROUP,
        is_value_set: 0,
        type_def: type_def,
        // tracker: undefined, 
        val_vector: { vec: { x, y, z } },
      };
      return ret;
    } else {
      console.warn("Invalid item value type for Vector: " + typeof val, val);
    }
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Vector: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.VECTOR_GROUP,
    is_value_set: 0,
    type_def: type_def,
  }
}

export function make_string_value(val: TypedValue, type_def: Gia.TypeDefinition): Gia.TypedValue {
  if (typeof val === "string") {
    const ret: Gia.TypedValue = {
      widget: Gia.TypedValue_WidgetType.TEXT_INPUT,
      is_value_set: 1,
      type_def: type_def,
      // tracker: undefined, 
      val_string: { str: val }
    };
    return ret;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for String: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.TEXT_INPUT,
    is_value_set: 0,
    type_def: type_def,
  }
}

export function make_pair_value(type: DictType, is_server: boolean, val: TypedValue): Gia.TypedValue {
  if (Array.isArray(val)) {
    const k = make_typed_value(type.k, is_server, val[0] ?? null);
    const v = make_typed_value(type.v, is_server, val[1] ?? null);
    return {
      widget: Gia.TypedValue_WidgetType.MAP_PAIR_ITEM,
      is_value_set: 1,
      type_def: make_type_definition(type, is_server, true),
      val_pair: {
        key: k,
        value: v
      }
    };
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Pair: " + typeof val, val);
  }
  return {
    widget: Gia.TypedValue_WidgetType.MAP_PAIR_ITEM,
    is_value_set: 0,
    type_def: make_type_definition(type, is_server),
  }
}


export function make_list_value(type: ListType, is_server: boolean, val: TypedValue): Gia.TypedValue {
  const ret: Gia.TypedValue = {
    widget: Gia.TypedValue_WidgetType.LIST_GROUP,
    is_value_set: 0,
    type_def: make_type_definition(type, is_server),
    val_list: {
      elements: [],
    }
  };
  if (type.i.t === "s") {
    ret.tracker = make_tracker();
  }
  if (Array.isArray(val)) {
    for (const v of val) {
      ret.val_list!.elements.push(make_typed_value(type.i, is_server, v));
    }
    ret.is_value_set = 1;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for List: " + typeof val, val);
  }
  return ret;
}

export function make_map_value(type: DictType, is_server: boolean, val: TypedValue): Gia.TypedValue {
  const ret: Gia.TypedValue = {
    widget: Gia.TypedValue_WidgetType.MAP_GROUP,
    is_value_set: 0,
    type_def: make_type_definition(type, is_server),
    val_map: {
      pairs: [],
    }
  };
  if (Array.isArray(val)) {
    for (const v of val) {
      ret.val_map!.pairs.push(make_pair_value(type, is_server, v));
    }
    ret.is_value_set = 1;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Map: " + typeof val, val);
  }
  return ret;
}


export function make_struct_value(type: StructType, is_server: boolean, val: TypedValue): Gia.TypedValue {
  const ret: Gia.TypedValue = {
    widget: Gia.TypedValue_WidgetType.STRUCT_BLOCK,
    is_value_set: 0,
    type_def: make_type_definition(type, is_server),
    tracker: make_tracker(),
    val_struct: {
      fields: [],
    }
  };
  if (Array.isArray(val)) {
    if (val.length !== type.f.length) {
      console.warn("Invalid value length for Struct: " + val.length, val);
    }
    for (let i = 0; i < type.f.length; i++) {
      ret.val_struct?.fields.push(make_typed_value(type.f[i][1], is_server, val[i]));
    }
    ret.is_value_set = 1;
  } else if (!is_empty(val)) {
    console.warn("Invalid value type for Struct: " + typeof val, val);
  }
  return ret;
}


// ------------------------------------------------------------------
// Connection Helpers
// ------------------------------------------------------------------

export function make_pin_sig(index = 0, is_out = false, is_flow = false): Gia.PinSignature {
  const kind = is_flow ?
    (is_out ? Gia.PinSignature_Kind.OUT_FLOW : Gia.PinSignature_Kind.IN_FLOW) :
    (is_out ? Gia.PinSignature_Kind.OUT_PARAM : Gia.PinSignature_Kind.IN_PARAM);
  return {
    kind,
    index
  }
}

export function make_connection(target_index: number, target_pin: TypedPinDef, is_flow: boolean = false): Gia.NodeConnection {
  const shell = make_pin_sig(target_pin.ShellIndex, target_pin.Direction === "Out", is_flow);
  const kernel = make_pin_sig(target_pin.KernelIndex, target_pin.Direction === "Out", is_flow);
  return {
    target_node_index: target_index,
    target_pin_shell: shell,
    target_pin_kernel: kernel
  };
}


export function make_annotation(text: string, x = 0, y = 0): Gia.Annotation {
  return {
    text,
    x_pos: x,
    y_pos: y
  }
}


// ===================== Decoder Helpers =====================

export function get_resource_class(rc: Gia.ResourceEntry_ResourceClass): ResourceClass | null {
  switch (rc) {
    case Gia.ResourceEntry_ResourceClass.ENTITY_NODE_GRAPH:
      return "ENTITY_NODE_GRAPH";
    case Gia.ResourceEntry_ResourceClass.STATUS_NODE_GRAPH:
      return "STATUS_NODE_GRAPH";
    case Gia.ResourceEntry_ResourceClass.CLASS_NODE_GRAPH:
      return "CLASS_NODE_GRAPH";
    case Gia.ResourceEntry_ResourceClass.ITEM_NODE_GRAPH:
      return "ITEM_NODE_GRAPH";
    case Gia.ResourceEntry_ResourceClass.BOOLEAN_FILTER_GRAPH:
      return "BOOLEAN_FILTER_GRAPH";
    case Gia.ResourceEntry_ResourceClass.INTEGER_FILTER_GRAPH:
      return "INTEGER_FILTER_GRAPH";
    case Gia.ResourceEntry_ResourceClass.SKILL_NODE_GRAPH:
      return "SKILL_NODE_GRAPH";
    case Gia.ResourceEntry_ResourceClass.COMPOSITE_NODE_DECL:
      return "COMPOSITE_NODE_DECL";
    default:
      return null;
  }
}

export function read_typed_value(tv: Gia.TypedValue): { value: TypedValue, type: NodeType, poly?: number } {
  if (!tv) return { value: null, type: UNK_TYPE };
  const atomic = tv.val_id?.id ?? tv.val_int?.int ?? tv.val_float?.float ?? tv.val_string?.str ?? tv.val_enum?.enum;
  if (atomic !== undefined) {
    return { value: atomic, type: UNK_TYPE };
  }
  if (tv.val_vector) {
    const vec = tv.val_vector.vec;
    return { value: [vec.x, vec.y, vec.z], type: { t: "b", b: "Vec" } };
  }
  if (tv.val_list) {
    const v = tv.val_list.elements.map(e => read_typed_value(e));
    if (!v.every(i => type_equal(i.type, v[0].type, { omit_unknown: true }))) {
      console.warn("Invalid list type", v.map(i => stringify(i.type)));
    }
    return { value: v.map(i => i.value), type: { t: "l", i: v[0]?.type ?? UNK_TYPE } };
  }
  if (tv.val_map) {
    return {
      value: tv.val_map.pairs.map(p => [
        read_typed_value(p.val_pair!.key).value,
        read_typed_value(p.val_pair!.value).value
      ]),
      type: {
        t: "d",
        k: to_type_s(tv.type_def?.server_side?.map_binding?.key_type ?? 0),
        v: to_type_s(tv.type_def?.server_side?.map_binding?.value_type ?? 0)
      }
    };
  }
  if (tv.val_struct) {
    return {
      value: tv.val_struct.fields.map(f => read_typed_value(f).value),
      type: { t: "s", f: [], _: tv.type_def?.server_side?.struct_ref?.schema_id }
    };
  }
  if (tv.val_pair) {
    const k = read_typed_value(tv.val_pair.key);
    const v = read_typed_value(tv.val_pair.value);
    return {
      value: [k.value, v.value],
      type: {
        t: "d",
        k: k.type,
        v: v.type
      }
    };
  }
  if (tv.val_poly) {
    return { ...read_typed_value(tv.val_poly.actual_value), poly: tv.val_poly.chosen_type_index ?? 0 };
  }
  return { value: null, type: UNK_TYPE };
}

export function read_connections(nc: Gia.NodeConnection): { node_index: number, kind: "Flow" | "Data", shell_index: number } | null {
  switch (nc.target_pin_kernel.kind) {
    case Gia.PinSignature_Kind.IN_FLOW:
      return {
        node_index: nc.target_node_index,
        kind: "Flow",
        shell_index: nc.target_pin_shell.index,
      }
    case Gia.PinSignature_Kind.OUT_PARAM:
      return {
        node_index: nc.target_node_index,
        kind: "Data",
        shell_index: nc.target_pin_shell.index,
      }
    default:
      return null;
  }
}