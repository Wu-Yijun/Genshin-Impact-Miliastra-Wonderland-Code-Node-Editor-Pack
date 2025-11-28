// src/runtime/sysTypes
// version 1.0.2

const todo = (): any => { throw new Error("TODO"); };

export interface TypeMaps {
  int: int;
  float: float;
  bool: bool;
  str: str;
  Int: Int;
  Float: Float;
  Bool: Bool;
  Str: Str;
  Vec: Vec;
  GUID: GUID;
  Entity: Entity;
  Prefab: Prefab;
  Faction: Faction;
  ConfigId: ConfigId;
  List: List;
  Dict: Dict;
  Struct: Struct;
}
export const AllTypes = ["int", "float", "bool", "str", "Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const satisfies (keyof TypeMaps)[];
export const AllKeyTypes = ["Entity", "GUID", "Int", "Str", "Faction", "ConfigId", "Prefab"] as const satisfies (keyof TypeMaps)[];
export const AllKeyTypes_ = ["Entity", "GUID", "Int", "Str", "int", "str", "Faction", "ConfigId", "Prefab"] as const satisfies (keyof TypeMaps)[];
export const AllValTypes = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "Faction", "Vec", "ConfigId", "Prefab"] as const satisfies (keyof TypeMaps)[];
export const AllValTypes_ = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "int", "bool", "float", "str", "Faction", "Vec", "ConfigId", "Prefab"] as const satisfies (keyof TypeMaps)[];

export type SysTypeNames = typeof AllTypes[number];
export type SysKeyTypeNames = typeof AllKeyTypes[number];
export type SysValTypeNames = typeof AllValTypes[number];
export type SysTypes = TypeMaps[SysTypeNames];
export type SysKeyTypes = TypeMaps[SysKeyTypeNames];
export type SysValTypes = TypeMaps[SysValTypeNames];

export type AnyTypePair = {
  [K in SysTypeNames]: { type: K; val: TypeMaps[K] };
}[SysTypeNames];

export abstract class SysTypeBase {
  private _type: SysTypeNames;
  get type(): SysTypeNames {
    return this._type;
  }
  constructor(type: SysTypeNames) {
    this._type = type;
  }
  abstract clone(): any;
  abstract toString(): string;
}

export type int = bigint;
export type float = number;
export type str = string;
export type bool = boolean;

export class Int extends SysTypeBase {
  val: bigint;
  constructor(val: number | bigint = 0) {
    super("Int");
    this.val = BigInt(val);
  }
  clone() {
    return new Int(this.val);
  }
  toString(): string {
    return `<${this.val}>`;
  }
}
export class Float extends SysTypeBase {
  val: number;
  constructor(val: number = 0) {
    super("Float");
    this.val = val;
  }
  clone() {
    return new Float(this.val);
  }
  toString(): string {
    return `<${this.val}>`;
  }
}
export class Bool extends SysTypeBase {
  val: boolean;
  constructor(val: boolean = false) {
    super("Bool");
    this.val = val;
  }
  clone() {
    return new Bool(this.val);
  }
  toString(): string {
    return `<${this.val}>`;
  }
}
export class Str extends SysTypeBase {
  val: string;
  constructor(val: string = "") {
    super("Str");
    this.val = val;
  }
  clone() {
    return new Str(this.val);
  }
  toString(): string {
    return `<"${this.val}">`;
  }
}
export class GUID extends SysTypeBase {
  val: bigint;
  constructor(init: number | bigint = 0) {
    super("GUID");
    this.val = BigInt(init);
  }
  clone() {
    return new GUID(this.val);
  }
  toString(): string {
    return `<GUID:${this.val}>`;
  }
}
export class Vec extends SysTypeBase {
  x: number;
  y: number;
  z: number;
  get val() {
    return [this.x, this.y, this.z];
  }
  get 0() {
    return this.x;
  }
  set 0(x: number) {
    this.x = x;
  }
  get 1() {
    return this.y;
  }
  get 2() {
    return this.z;
  }
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super("Vec");
    this.x = x;
    this.y = y;
    this.z = z;
  }
  clone() {
    return new Vec(this.x, this.y, this.z);
  }
  toString(): string {
    return `<${this.x}, ${this.y}, ${this.z}>`;
  }
}

export class Entity extends SysTypeBase {
  val: bigint;
  constructor(init: number | bigint = 0) {
    // TODO, Entity var
    super("Entity");
    this.val = BigInt(init);
  }
  clone() {
    return new Entity(this.val);
  }
  toString(): string {
    return `<Entity:${this.val}>`;
  }
}

export class Prefab extends SysTypeBase {
  val: bigint;
  constructor(init: number | bigint = 0) {
    super("Prefab");
    this.val = BigInt(init);
  }
  clone() {
    return new Prefab(this.val);
  }
  toString(): string {
    return `<Prefab:${this.val}>`;
  }
}

export class Faction extends SysTypeBase {
  val: bigint;
  constructor(init: number | bigint = 0) {
    super("Faction");
    this.val = BigInt(init);
  }
  clone() {
    return new Faction(this.val);
  }
  toString(): string {
    return `<Faction:${this.val}>`;
  }
}

export class ConfigId extends SysTypeBase {
  val: bigint;
  constructor(init: number | bigint = 0) {
    super("ConfigId");
    this.val = BigInt(init);
  }
  clone() {
    return new ConfigId(this.val);
  }
  toString(): string {
    return `<ConfigId:${this.val}>`;
  }
}

export class List extends SysTypeBase {
  val: SysValTypes[];
  val_type: SysValTypeNames;
  get length() {
    return this.val.length;
  }
  constructor(init: SysValTypes[], val_type: SysValTypeNames) {
    super("List");
    this.val = init;
    this.val_type = val_type;

    return new Proxy(this, {
      get: (target, prop: string | symbol) => {
        // 处理数字索引访问
        if (typeof prop === 'string') {
          const n = Number(prop);
          if (!isNaN(n)) {
            return this.val[n];
          }
          const n2 = Number(prop.slice(1, -1));
          if (!isNaN(n2)) {
            return this.val[n2];
          }
          throw new Error("Cannot Index " + prop);
        }
        // 处理其他属性访问
        return (target as any)[prop];
      },
    })
  }
  clone() {
    return new List(clone(this.val), this.val_type);
  }
  toString(): string {
    return `<List:${this.val}>`;
  }
  find(item: SysValTypes): SysValTypes | null {
    return todo();
  }
  includes(item: SysValTypes): boolean {
    return this.find(item) !== null;
  }
  get(index: int | number | Int): SysValTypes {
    if (typeof index === "object") {
      return this.val[Number(index.val)];
    } else {
      return this.val[Number(index)];
    }
  }
  /** Decl */
  [k: number]: SysValTypes;
}

export class Dict extends SysTypeBase {
  key: SysKeyTypes[];
  val: (SysValTypes | List)[];
  key_type: SysKeyTypeNames;
  val_type: SysValTypeNames | "List";
  constructor(keys: SysKeyTypes[], vals: (SysValTypes | List)[], key_type: SysKeyTypeNames, val_type: SysValTypeNames | "List") {
    super("Dict");
    this.key = keys;
    this.val = vals;
    this.key_type = key_type;
    this.val_type = val_type;
  }
  clone() {
    return new Dict(clone(this.key), clone(this.val), this.key_type, this.val_type);
  }
  toString(): string {
    return `<Dict:${this.val}>`;
  }
  keys(): List {
    return new List(this.key, this.key_type);
  }
  vals(): List {
    if (this.val_type === "List") {
      throw new Error("Cannot get vals of List Map");
    }
    return new List(this.val as SysValTypes[], this.val_type);
  }
  has(key: SysKeyTypes): boolean {
    return todo();
  }
  includes(val: SysValTypes | List) {
    return todo();
  }
}

export class Struct extends SysTypeBase {
  id: string;
  name: string;
  fields: string[];
  val_type: SysTypeNames[];
  val: SysTypes[];
  constructor(id: string, name: string, fields: string[], val_type: SysTypeNames[], vals: SysTypes[]) {
    super("Struct");
    this.id = id;
    this.name = name;
    this.fields = fields;
    this.val_type = val_type;
    this.val = vals;
  }
  clone() {
    return new Struct(this.id, this.name, [...this.fields], [...this.val_type], clone(this.val));
  }
  toString(): string {
    return `<Struct:${this.val}>`;
  }
}

export function isSysTypes(instance: SysTypeBase | any): instance is SysTypes {
  return instance instanceof SysTypeBase ||
    typeof instance === "bigint" ||
    typeof instance === "number" ||
    typeof instance === "string" ||
    typeof instance === "boolean";
}
export function ClassOf(type: SysTypeNames) {
  switch (type) {
    case "int":
      return BigInt;
    case "float":
      return Number;
    case "bool":
      return Boolean;
    case "str":
      return String;
    case "Int":
      return Int;
    case "Float":
      return Float;
    case "Bool":
      return Bool;
    case "Str":
      return Str;
    case "Vec":
      return Vec;
    case "GUID":
      return GUID;
    case "Entity":
      return Entity;
    case "Prefab":
      return Prefab;
    case "ConfigId":
      return ConfigId;
    case "List":
      return List;
    case "Dict":
      return Dict;
    case "Struct":
      return Struct;
  }
  throw new Error(`Unknown Type: Not System Types. ${type}`);
}
export function TypeOf(instance: str): "str";
export function TypeOf(instance: float): "float";
export function TypeOf(instance: int): "int";
export function TypeOf(instance: bool): "bool";
export function TypeOf(instance: Int): "Int";
export function TypeOf(instance: Float): "Float";
export function TypeOf(instance: Vec): "Vec";
export function TypeOf(instance: GUID): "GUID";
export function TypeOf(instance: Entity): "Entity";
export function TypeOf(instance: Prefab): "Prefab";
export function TypeOf(instance: Faction): "Faction";
export function TypeOf(instance: ConfigId): "ConfigId";
export function TypeOf(instance: List): "List";
export function TypeOf(instance: Dict): "Dict";
export function TypeOf(instance: Struct): "Struct";
export function TypeOf(instance: SysTypes): SysTypeNames {
  switch (typeof instance) {
    case "string":
      return "str";
    case "number":
      return "float";
    case "bigint":
      return "int";
    case "boolean":
      return "bool";
    case "object":
      if (instance instanceof SysTypeBase) {
        return instance.type;
      }
  }
  throw new Error(`Unknown Type: Not System Types. ${instance}`);
}


export function AnyTypeOf(val: SysTypes): AnyTypePair {
  switch (typeof val) {
    case "string":
      return { type: "str", val };
    case "number":
      return { type: "float", val };
    case "bigint":
      return { type: "int", val };
    case "boolean":
      return { type: "bool", val };
    case "object":
      if (val instanceof SysTypeBase) {
        return { type: val.type, val: val as any };
      }
  }
  throw new Error(`Unknown Type: Not System Types. ${val}`);
}

type Cloneable = SysTypes | Cloneable[] | { [key: string]: Cloneable };
export function clone<T extends Cloneable>(val: T): T {
  if (isSysTypes(val)) {
    if (val instanceof SysTypeBase) {
      return val.clone() as T;
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(v => clone(v)) as T;
  }
  if (typeof val === "object") {
    const result: any = {};
    for (const [key, v] of Object.entries(val)) {
      result[key] = clone(v);
    }
    return result as T;
  }
  throw new Error("Unable to clone value");
}

function to_int(x: int | Int | float | Float | bool | Bool): int {
  const p = AnyTypeOf(x);
  switch (p.type) {
    case "float":
    case "int":
    case "bool":
      return BigInt(p.val);
    case "Int":
    case "Float":
    case "Bool":
      return BigInt(p.val.val);
  }
  throw new Error("Invalid Type!");
}
function to_float(x: int | Int | float | Float): float {
  const p = AnyTypeOf(x);
  switch (p.type) {
    case "float":
    case "int":
      return Number(p.val);
    case "Int":
    case "Float":
      return Number(p.val.val);
  }
  throw new Error("Invalid Type!");
}
function to_str(x: SysTypes) {
  switch (typeof x) {
    case "bigint":
    case "number":
    case "boolean":
      return x.toString();
    case "string":
      return `"${x}"`;
  }
  return x.toString();
}
function to_bool(x: bool | Bool | int | Int): bool {
  const p = AnyTypeOf(x);
  switch (p.type) {
    case "bool":
    case "int":
      return Boolean(p.val);
    case "Bool":
    case "Int":
      return Boolean(p.val.val);
  }
  throw new Error("Invalid Type!");
}

function Lower(x: Int): int;
function Lower(x: Str): str;
function Lower(x: Float): float;
function Lower(x: Bool): bool;
function Lower(x: Int | Str | Float | Bool) {
  return x.val;
}

function Upper(x: int): Int;
function Upper(x: str): Str;
function Upper(x: float): Float;
function Upper(x: bool): Bool;
function Upper<T>(x: T): T;
function Upper(x: int | str | float | bool) {
  switch (typeof x) {
    case "string":
      return new Str(x);
    case "number":
      return new Float(x);
    case "bigint":
      return new Int(x);
    case "boolean":
      return new Bool(x);
  }
  return x;
}
export { Upper, Lower as lower, to_int, to_str, to_float, to_bool };


export const SysEnumNames = [
  "EnumGeneric", "EnumComparisonOperators", "EnumLogicalOperators", "EnumMathematicalOperators", "EnumAttackShapes",
  "EnumSurvivalStatus", "EnumSortingRules", "EnumRoundingLogic", "EnumTypeConversions", "EnumMotionPathPointTypes",
  "EnumMotionTypes", "EnumFollowLocationType", "EnumCoordinateSystemType", "EnumElementalType", "EnumEntityType",
  "EnumUnitStatusAdditionResult", "EnumUnitStatusRemovalReason", "EnumUnitStatusRemovalStrategy",
  "EnumRevivePointSelectionStrategy", "EnumCauseOfBeingDown", "EnumTrigonometricFunctions",
  "EnumDisruptorDeviceTypes", "EnumDisruptorDeviceOrientation", "EnumUIControlGroupStatus", "EnumTargetType",
  "EnumTriggerRestriction", "EnumHitType", "EnumAttackType", "EnumHitPerformanceLevel", "EnumSkillSlot",
  "EnumSoundAttenuationMode", "EnumSelectCompletionReason", "EnumSettlementStatus", "EnumReasonForItemChange",
  "EnumItemLootType", "EnumDecisionRefreshMode", "EnumElementalReactionType", "EnumInterruptStatus",
  "EnumGameplayMode", "EnumInputDeviceType"
] as const;
export type SysEnumNameTypes = typeof SysEnumNames[number];

// test
// const p = new List([1n, 2n, 4n], "int");

// console.log(p, p[0n], p[new Int(1)]);