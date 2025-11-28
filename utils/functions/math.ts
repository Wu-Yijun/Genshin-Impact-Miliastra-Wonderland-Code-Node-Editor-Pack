
import { writeFileSync } from "fs";
import { type Lambda, Parser } from "./function_defs.ts";
import {
  any_type,
  any_enums,
  any_list_item_type,
  any_map_key_type,
  any_map_val_type,
  any_int,
  any_float,
  any_bool,
  any_str,
  XYZ,
  X,
  expandArgs,
  XY,
} from "./utils.ts";

/** Levels:
 * - ArgType: AllTypes | AllTypes[] | (()=>string|ArgType)
 * - Arg: {name: ArgType, 0?: true} | ()=>Arg // 0 is optional
 * - ArgArr: Arg[] | ()=>ArgArr
 * - Overloads: { id: ArgArr } | ArgArr[]
 * - Args: ArgArr | Overloads | Args[] | ()=>Args
 * ---
 * - Lambda: { name:Names, generic:string, in:Arg, out:Arg }
 * - type Names = [name: string, ref_name: string | null, client_name: string | null];
 * where:
 * - name is function call name in math_raw.d.ts
 * - ref_name and client_name can be find in ref.math.yaml.
 */
export const MathNodes: Lambda[] = [
  // { name: ["equal", "math.equals", "client.math.isEqual"], generic: "T", in: [{ x: () => "T" }, { x: () => "T" }], out: [{ eq: "bool" }] },
  // { name: ["equal", "math.equals", "client.math.isEqual"], generic: "T", in: XY("T"), out: [{ eq: "bool" }] },
  {
    name: ["equal", "math.equals", "client.math.isEqual"],
    in: any_type.map(t => [XY(t)]),
    out: [{ out: "bool" }]
  },
  {
    name: ["equal", "math.enumEquals", "client.math.enumMatch"],
    in: any_enums.map(t => [XY(t)]),
    out: [{ out: "bool" }]
  },
  {
    name: ["int", "math.typeCast", "client.math.typeCast"],
    in: [...any_bool, ...any_float, "Int"].map(t => [X(t)]),
    out: [{ out: "int" }]
  },
  {
    name: ["bool", "math.typeCast", "client.math.typeCast"],
    in: [...any_bool, "Bool"].map(t => [X(t)]),
    out: [{ out: "bool" }]
  },
  {
    name: ["float", "math.typeCast", "client.math.typeCast"],
    in: [...any_int, "Float"].map(t => [X(t)]),
    out: [{ out: "float" }]
  },
  {
    name: ["str", "math.typeCast", "client.math.typeCast"],
    in: [...any_bool, ...any_float, ...any_bool, "Str", "Vec", "GUID", "Entity", "Faction"].map(t => [X(t)]),
    out: [{ out: "str" }],
  },
  {
    name: ["vec", "math.vector3.create", "client.math.makeVector3"],
    in: [any_float.map(t => [XYZ(t)]), [{ "xyz": () => "[float, float, float]" }], [{ "xyz": () => "[Float, Float, Float]" }]],
    out: [{ out: "Vec" }]
  },
  {
    name: ["split_vec", "math.vector3.split", "client.math.vector3.split"],
    in: [{ "v": "Vec" }],
    out: any_float.map(t => [XYZ(t)]),
  },
  {
    name: ["dict", "math.dict.create", null],
    in: [
      any_map_key_type.map((k) =>
        any_map_val_type.map(v => [{ pairs: `[${k}, ${v}][]` as any }])
      ).flat(),
      any_map_key_type.map((k) =>
        any_map_val_type.map(v => [{ "...pairs": `[${k}, ${v}][]` as any }])
      ).flat(),
      any_map_key_type.map((k) =>
        any_map_val_type.map(v => [{ "...pairs": `(${k}|${v})[]` as any }])
      ).flat(),
    ],
    out: [{ out: "Dict" }],
  },
  {
    name: ["dict", "math.dict.assemble", null],
    in: [{ keys: "List" }, { values: "List" }],
    out: [{ out: "Dict" }],
  },
  {
    name: ["dict_len", "query.dict.length", null],
    in: [{ dict: "Dict" }],
    out: [{ out: "int" }],
    comments: "@deprecated Please use dict.length directly."
  },
  {
    name: ["dict_has_key", "query.dict.containsKey", null],
    in: expandArgs([{ dict: "Dict" }, { key: any_map_key_type }]),
    out: [{ out: "bool" }],
    comments: "@deprecated Please use `dict.has(key)` directly."
  },
  {
    name: ["dict_keys", "query.dict.keys", null],
    in: [{ dict: "Dict" }],
    out: [{ out: "List" }],
    comments: "@deprecated Please use `dict.keys()` directly."
  },
  {
    name: ["dict_values", "query.dict.values", null],
    in: [{ dict: "Dict" }],
    out: [{ out: "List" }],
    comments: "@deprecated Please use `dict.vals()` directly."
  },
  {
    name: ["dict_get", "query.dict.getByKey", null],
    in: expandArgs([{ dict: "Dict" }, { key: any_map_key_type }]),
    out: expandArgs([{ out: any_map_val_type }]),
    comments: "@deprecated Please use `dict.get(key)` directly."
  },
  {
    name: ["dict_has_val", "query.dict.containsValue", null],
    in: expandArgs([{ dict: "Dict" }, { value: any_map_val_type }]),
    out: [{ out: "bool" }],
    comments: "@deprecated Please use `dict.includes(val)` directly."
  },
  {
    name: ["list_len", "query.list.length", "client.query.list.length"],
    in: [{ list: "List" }],
    out: [{ out: "int" }],
    comments: "@deprecated Please use list.length directly."
  },
  {
    name: ["maximum", "query.list.max", "client.query.list.max"],
    in: [
      { int_list: { list: "List" } },
      { float_list: { list: "List" } }
    ],
    out: {
      int_list: { out: "int" },
      float_list: { out: "float" }
    }
  },
  {
    name: ["minimum", "query.list.min", "client.query.list.min"],
    in: [
      { int_list: { list: "List" } },
      { float_list: { list: "List" } }
    ],
    out: {
      int_list: { out: "int" },
      float_list: { out: "float" }
    }
  },
  {
    name: ["list", "math.list.assemble", "client.math.assembleList"],
    in: [
      any_list_item_type.map(t => [{ "...items": `${t}[]` as any }]),
      any_list_item_type.map(t => [{ "items": `${t}[]` as any }])
    ].flat(),
    out: [{ out: "List" }],
  },
  {
    name: ["indices_of", "query.list.findIndicesByValue", null],
    in: expandArgs([{ list: "List" }, { item: any_list_item_type }]),
    out: [{ out: "int" }],
    comments: "@deprecated Please use `list.find(item)` directly."
  },
  {
    name: ["list_item", "query.list.getAt", "client.query.list.getValue"],
    in: expandArgs([{ list: "List" }, { index: any_int }]),
    out: expandArgs([{ out: any_list_item_type }]),
    comments: "@deprecated Please use `list[index]` or `list.get(index)` directly."
  },
  {
    name: ["includes", "query.list.contains", null],
    in: expandArgs([{ list: "List" }, { item: any_list_item_type }]),
    out: [{ out: "bool" }],
    comments: "@deprecated Please use `list.includes(item)` directly."
  },
  {
    name: ["struct", "math.struct.assemble", null],
    in: [
      expandArgs([{ "name": any_str }, { "...val": () => "SysAllTypes[]" }]),
      expandArgs([{ "name": any_str }, { "val": ["SysAllTypes[]", `{ [key:string]: SysAllTypes }`] as any }]),
    ],
    out: [{ out: "Struct" }],
  },
  {
    name: ["split_struct", "math.struct.decompose", null],
    in: [{ s: "Struct" }],
    out: [{ out: "{ [key:string]: SysAllTypes }" as any }],
  },
  {
    name: ["add", "math.add", "client.math.add"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },  // use tag to match inputs and outputs
      "f": { out: "float" },
    },
  },
  {
    name: ["add", "math.vector3.add", "client.math.addVector3"],
    in: [{ x: "Vec" }, { y: "Vec" }],
    out: [{ out: "Vec" }],
    comments: "[Todo: vec3 add in client is duplicated: [client.math.vectorAdd] [client.math.addVector3]]"
  },
  {
    name: ["sub", "math.sub", "client.math.subtract"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["sub", "math.vector3.sub", "client.math.subtractVector3"],
    in: [{ x: "Vec" }, { y: "Vec" }],
    out: [{ out: "Vec" }],
    comments: "[Todo: vec3 sub in client is duplicated: [client.math.vectorSubtract] [client.math.subtractVector3]]"
  },
  {
    name: ["mul", "math.mul", "client.math.math.multiply"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["div", "math.div", "client.math.math.divide"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["mod", "math.mod", null],
    in: expandArgs([{ x: any_int }, { y: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["min", "math.min", null],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["max", "math.max", null],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["range", "math.clamp", null],
    in: [
      expandArgs([{ min: any_int }, { max: any_int }, { x: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { min: any_float }, { max: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["abs", "math.abs", "client.math.abs"],
    in: [
      expandArgs([{ x: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["sgn", "math.sign", null],
    in: [
      expandArgs([{ x: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "int" },
      "f": { out: "float" },
    },
  },
  {
    name: ["shiftL", "math.shift.left", null],
    in: expandArgs([{ x: any_int }, { offset: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["shiftR", "math.shift.right", null],
    in: expandArgs([{ x: any_int }, { offset: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitand", "math.bit.and", null],
    in: expandArgs([{ x: any_int }, { y: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitor", "math.bit.or", null],
    in: expandArgs([{ x: any_int }, { y: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitxor", "math.bit.xor", null],
    in: expandArgs([{ x: any_int }, { y: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitnot", "math.bit.not", null],
    in: expandArgs([{ x: any_int }, { y: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitwrite", "math.bit.write", null],
    in: expandArgs([{ target: any_int }, { start: any_int }, { end: any_int }, { x: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["bitread", "math.bit.read", null],
    in: expandArgs([{ src: any_int }, { start: any_int }, { end: any_int }]),
    out: [{ out: "int" }],
  },

  {
    name: ["log", "math.log", null],
    in: expandArgs([{ x: any_float }, { base: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["pow", "math.pow", null],
    in: expandArgs([{ base: any_float }, { x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["cos", "math.cos", "client.math.cos"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["sin", "math.sin", "client.math.sin"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["tan", "math.tan", "client.math.tan"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["acos", "math.acos", "client.math.arcCos"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["asin", "math.asin", "client.math.arcSin"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["atan", "math.atan", "client.math.arcTan"],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["deg", "math.rad2deg", "client.math.radToDeg"],
    in: expandArgs([{ rad: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["rad", "math.deg2rad", "client.math.degToRad"],
    in: expandArgs([{ deg: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["sqrt", "math.sqrt", null],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["round", "math.truncate", null],
    in: expandArgs([{ x: any_float }, { mode: "EnumRoundingLogic" }]),
    out: [{ out: "int" }],
  },
  {
    name: ["floor", null, null],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "int" }],
  },
  {
    name: ["ceil", null, null],
    in: expandArgs([{ x: any_float }]),
    out: [{ out: "int" }],
  },
  {
    name: ["gt", "math.gt", "client.math.greaterThan"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "bool" },
      "f": { out: "bool" },
    },
  },
  {
    name: ["ge", "math.gte", "client.math.greaterOrEqual"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "bool" },
      "f": { out: "bool" },
    },
  },
  {
    name: ["lt", "math.lt", "client.math.lessThan"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "bool" },
      "f": { out: "bool" },
    },
  },
  {
    name: ["le", "math.lte", "client.math.lessOrEqual"],
    in: [
      expandArgs([{ x: any_int }, { y: any_int }]).map((args) => ({ "i": args })),
      expandArgs([{ x: any_float }, { y: any_float }]).map((args) => ({ "f": args })),
    ],
    out: {
      "i": { out: "bool" },
      "f": { out: "bool" },
    },
  },
  {
    name: ["not", "math.logic.not", "client.math.logicalNot"],
    in: expandArgs([{ x: any_bool }]),
    out: [{ out: "bool" }],
  },
  {
    name: ["or", "math.logic.or", "client.math.logicalOr"],
    in: expandArgs([{ x: any_bool }]),
    out: [{ out: "bool" }],
  },
  {
    name: ["xor", "math.logic.xor", "client.math.logicalXor"],
    in: expandArgs([{ x: any_bool }, { y: any_bool }]),
    out: [{ out: "bool" }],
  },
  {
    name: ["and", "math.logic.and", "client.math.logicalAnd"],
    in: expandArgs([{ x: any_bool }, { y: any_bool }]),
    out: [{ out: "bool" }],
  },
  {
    name: ["distance", "math.vector3.distance", null],
    in: [{ v1: "Vec" }, { v2: "Vec" }],
    out: [{ out: "float" }],
  },
  {
    name: ["normalize", "math.vector3.normalize", "client.math.normalizeVector3"],
    in: [{ v: "Vec" }],
    out: [{ out: "Vec" }],
    comments: "[Todo: vec3 normalize in client is duplicated: [client.math.normalizeVector3] [client.math.vectorNormalize]]"
  },
  {
    name: ["norm", "math.vector3.magnitude", "client.math.vector3Length"],
    in: [{ v: "Vec" }],
    out: [{ out: "float" }],
  },
  {
    name: ["scale", "math.vector3.scale", "client.math.scaleVector3"],
    in: expandArgs([{ v: "Vec" }, { x: any_float }]),
    out: [{ out: "Vec" }],
  },
  {
    name: ["dot", "math.vector3.dot", "client.math.dotVector3"],
    in: [{ v1: "Vec" }, { v2: "Vec" }],
    out: [{ out: "float" }],
    comments: "[Todo: vec3 dot in client is duplicated: [client.math.vectorDot] [client.math.dotVector3]]"
  },
  {
    name: ["cross", "math.vector3.cross", "client.math.crossVector3"],
    in: [{ v1: "Vec" }, { v2: "Vec" }],
    out: [{ out: "Vec" }],
    comments: "[Todo: vec3 cross in client is duplicated: [client.math.vectorCross] [client.math.crossVector3]]"
  },
  {
    name: ["angle", "math.vector3.angle", "client.math.angleBetweenVector3"],
    in: [{ v1: "Vec" }, { v2: "Vec" }],
    out: [{ out: "float" }],
  },
  {
    name: ["eula_rot", "math.direction.rotate", "client.math.directionVectorToRotation"],
    in: [{ front: "Vec" }, { up: "Vec" }],
    out: [{ out: "Vec" }],
    comments: "[Todo: vec3 cross in client is duplicated: [client.math.vector3.directionToRotation] [client.math.directionVectorToRotation]]"
  },
  {
    name: ["rotate", "math.vector3.rotate", "client.math.rotateVector3"],
    in: [{ target: "Vec" }, { rot: "Vec" }],
    out: [{ out: "Vec" }],
  },
  {
    name: ["random", "query.randomInt", null],
    in: expandArgs([{ min: any_int }, { max: any_int }]),
    out: [{ out: "int" }],
  },
  {
    name: ["random", "query.randomFloat", "client.math.randomInRange"],
    in: expandArgs([{ min: any_float }, { max: any_float }]),
    out: [{ out: "float" }],
  },
  {
    name: ["random", "query.weightedRandomIndex", null],
    in: [{ list: "List" }],
    out: [{ out: "int" }],
  },
  {
    name: ["ZERO", "query.vector3.zero", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["FRONT", "query.vector3.forward", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["BACK", "query.vector3.back", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["UP", "query.vector3.up", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["DOWN", "query.vector3.down", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["LEFT", "query.vector3.left", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["RIGHT", "query.vector3.right", null],
    in: [],
    out: [{ out: "Vec" }],
  },
  {
    name: ["Pi", "query.pi", null],
    in: [],
    out: [{ out: "float" }],
  },
  {
    name: ["PI", "query.pi", null],
    in: [],
    out: [{ out: "float" }],
  },


  {
    name: ["weekday", "math.time.weekdayFromTimestamp", null],
    in: expandArgs([{ timestamp: any_int }]),
    out: [{ day_of_week: "int" }],
  },
  {
    name: ["from_timestamp", "math.time.formatFromTimestamp", null],
    in: expandArgs([{ timestamp: any_int }]),
    out: [{ year: "int" }, { month: "int" }, { day: "int" }, { hour: "int" }, { minute: "int" }, { second: "int" }],
  },
  {
    name: ["to_timestamp", "math.time.timestampFromFormat", null],
    in: expandArgs([
      { year: any_int },
      { month: any_int },
      { day: any_int },
      { hour: any_int },
      { minute: any_int },
      { second: any_int }
    ]),
    out: [{ timestamp: "int" }],
  },

  // == NOTICE, NOTHING, BUT TO ADD DUMB FUNC_NAMES ==
  { name: ["", "", "client.math.vectorAdd"] },
  { name: ["", "", "client.math.vectorSubtract"] },
  { name: ["", "", "client.math.vectorDot"] },
  { name: ["", "", "client.math.vectorCross"] },
  { name: ["", "", "client.math.vectorNormalize"] },
  { name: ["", "", "client.math.vector3.directionToRotation"] },
];

const MathNodes2: Lambda[] = [
]

function test(out_file: string, print: boolean = true) {
  const d = new Parser();
  d.lambda(MathNodes);
  // d.lambda(MathNodes2);

  if (print) {
    // console.dir(d, { depth: null });
    console.log(d.gen().join("\n"))
    // console.log(d.gen_by_name("dict_get").join("\n"))
  } else {
    const res = "// @ts-nocheck\n\n" + d.gen().join("\n\n");
    writeFileSync(out_file, res);
  }
}

if (import.meta.main) {
  test(import.meta.dirname + "/math.temp.d.ts", true);
}
