import { readFileSync, writeFileSync } from "fs";
import { AllTypes, AllKeyTypes, AllKeyTypes_, AllValTypes, AllValTypes_, SysEnumNames } from "../src/sysTypes.ts";
import type { int, str, float, bool, Int, Float, Bool, Str, Vec, GUID, Entity, Prefab, Faction, ConfigId, List, Dict, Struct, SysKeyTypes } from "../src/sysTypes.ts";

const version = "1.0.4";

// const RawTypes = ["int", "float", "bool", "str"] as const;
// const RawTypeMaps = ["bigint", "number", "boolean", "string"] as const;
// const ExtendTypes = ["Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const;
// const AllTypes = [...ExtendTypes, ...RawTypes] as const;
// const AllKeyTypes = ["Entity", "GUID", "Int", "Str", "Faction", "ConfigId", "Prefab"] as const satisfies (typeof ExtendTypes[number])[];
// const AllValTypes = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "Faction", "Vec", "ConfigId", "Prefab"] as const satisfies (typeof ExtendTypes[number])[];

// Just to avoid Errors in this file
type SysAllTypes = never;
type EnumInterruptStatus = never;
type EnumRoundMode = never;
type EnumSkillSlot = never;
type EnumGameMode = never;
type EnumDeathCause = never;
type EnumDevice = never;
type EnumEntityType = never;
type TimerCore<Time, Type> = never;
type Signal = never;
type ExecFun<T extends { [key: str]: any }> = bigint & { readonly __mybrand?: T };


declare namespace MathNodes {
  // function equal(x: int, y: int): boolean;
  /* <Equals> */
  /* <Enumeration Equals> */

  // ====== Type Convert ======
  function int(x: bool | float | Bool | Float): int;
  function Int(x: bool | float | Bool | Float): Int;
  function bool(x: int | Int): bool;
  function Bool(x: int | Int): Bool;
  function float(x: int | Int): float;
  function Float(x: int | Int): Float;
  function str(x: int | bool | float | Int | Bool | Float): str;
  function Str(x: int | bool | float | Int | Bool | Float): Str;
  function str(x: Vec | GUID | Entity | Faction): str;
  function Str(x: Vec | GUID | Entity | Faction): Str;

  function vec(x: float | Float, y: float | Float, z: float | Float): Vec;
  function vec([x, y, z]: [float | Float, float | Float, float | Float]): Vec;
  function split_vec(v: Vec): [x: float | Float, y: float | Float, z: float | Float];

  // ====== List ====== //
  /** @deprecated Please use list.length directly. */
  function list_len(list: List): int;
  function maximum(int_list: List): int;
  function maximum(float_list: List): float;
  function minimum(int_list: List): int;
  function minimum(float_list: List): float;

  // function list(...items: ANY[]): List;
  // function list(items: ANY[]): List;
  // /** @deprecated Please use `list.find(item)` directly. */
  // function indices_of(list: List, item: ANY): int;
  // /** @deprecated Please use `list[index]` or `list.get(index)` directly. */
  // function list_item(list: List, index: int): ANY;
  // /** @deprecated Please use `list.includes(item)` directly. */
  // function includes(list: List, item: ANY): boolean;
  /* <List> */


  // ====== Dict ====== //
  /** @deprecated Please use `dict.keys()` directly. */
  function dict_keys(): List;
  /** @deprecated Please use `dict.vals()` directly. */
  function dict_values(): List;

  function dict(keys: List, values: List): Dict;
  // function dict(pairs: [KEY, VALUE][]): Dict;
  // function dict(...pairs: [KEY, VALUE][]): Dict;
  // function dict(...pairs: (KEY | VALUE)[]): Dict;
  // /** @deprecated Please use `dict.has(key)` directly. */
  // function dict_has_key(dict: Dict, key: KEY): boolean;
  // /** @deprecated Please use `dict.get(key)` directly. */
  // function dict_get(): KEY;
  // /** @deprecated Please use `dict.includes(val)` directly. */
  // function dict_has_val(dict: Dict, value: VALUE): boolean;
  /* <Dict> */

  function struct(name: string, ...val: SysAllTypes[]): Struct;
  function struct(name: string, val: SysAllTypes[]): Struct;
  function struct(name: string, val: { [field: string]: SysAllTypes }): Struct;
  function split_struct(x: Struct): { [field: string]: SysAllTypes };


  function add(x: int | Int, y: int | Int): int;
  function Add(x: int | Int, y: int | Int): Int;
  function sub(x: int | Int, y: int | Int): int;
  function Sub(x: int | Int, y: int | Int): Int;
  function mul(x: int | Int, y: int | Int): int;
  function Mul(x: int | Int, y: int | Int): Int;
  function div(x: int | Int, y: int | Int): int;
  function Div(x: int | Int, y: int | Int): Int;
  function mod(x: int | Int, y: int | Int): int;
  function Mod(x: int | Int, y: int | Int): Int;
  function min(x: int | Int, y: int | Int): int;
  function Min(x: int | Int, y: int | Int): Int;
  function max(x: int | Int, y: int | Int): int;
  function Max(x: int | Int, y: int | Int): Int;
  function range(min: int | Int, max: int | Int, x: int | Int): int;
  function Range(min: int | Int, max: int | Int, x: int | Int): Int;
  function abs(x: int | Int): int;
  function abs(x: int | Int): Int;
  function sgn(x: int | Int): int;
  function Sgn(x: int | Int): Int;
  function shiftL(x: int | Int, offset: int | Int): int;
  function ShiftL(x: int | Int, offset: int | Int): Int;
  function shiftR(x: int | Int, offset: int | Int): int;
  function ShiftR(x: int | Int, offset: int | Int): Int;
  function bitand(x: int | Int, y: int | Int): int;
  function Bitand(x: int | Int, y: int | Int): Int;
  function bitor(x: int | Int, y: int | Int): int;
  function Bitor(x: int | Int, y: int | Int): Int;
  function bitxor(x: int | Int, y: int | Int): int;
  function Bitxor(x: int | Int, y: int | Int): Int;
  function bitnot(x: int | Int, y: int | Int): int;
  function Bitnot(x: int | Int, y: int | Int): Int;
  /** write x bitly from start to end(inclusive) */
  function bitwrite(target: int | Int, start: int | Int, end: int | Int, x: int | Int): int;
  function Bitwrite(target: int | Int, start: int | Int, end: int | Int, x: int | Int): Int;
  /** read x bitly from start to end(inclusive) */
  function bitread(src: int | Int, start: int | Int, end: int | Int): int;
  function Bitread(src: int | Int, start: int | Int, end: int | Int): Int;
  function add(x: float | Float, y: float | Float): float;
  function Add(x: float | Float, y: float | Float): Float;
  function sub(x: float | Float, y: float | Float): float;
  function Sub(x: float | Float, y: float | Float): Float;
  function mul(x: float | Float, y: float | Float): float;
  function Mul(x: float | Float, y: float | Float): Float;
  function div(x: float | Float, y: float | Float): float;
  function Div(x: float | Float, y: float | Float): Float;
  function min(x: float | Float, y: float | Float): float;
  function Min(x: float | Float, y: float | Float): Float;
  function max(x: float | Float, y: float | Float): float;
  function Max(x: float | Float, y: float | Float): Float;
  function range(x: float | Float, min: float | Float, max: float | Float): float;
  function Range(x: float | Float, min: float | Float, max: float | Float): Float;
  function log(x: float | Float, base: float | Float): float;
  function Log(x: float | Float, base: float | Float): Float;
  function pow(base: float | Float, x: float | Float): float;
  function Pow(base: float | Float, x: float | Float): Float;
  function cos(x: float | Float): float;
  function Cos(x: float | Float): Float;
  function sin(x: float | Float): float;
  function Sin(x: float | Float): Float;
  function tan(x: float | Float): float;
  function Tan(x: float | Float): Float;
  function acos(x: float | Float): float;
  function Acos(x: float | Float): Float;
  function asin(x: float | Float): float;
  function Asin(x: float | Float): Float;
  function atan(x: float | Float): float;
  function Atan(x: float | Float): Float;
  function deg(rad: float | Float): float;
  function Deg(rad: float | Float): Float;
  function rad(deg: float | Float): float;
  function Rad(deg: float | Float): Float;
  function abs(x: float | Float): float;
  function Abs(x: float | Float): Float;
  function sqrt(x: float | Float): float;
  function Sqrt(x: float | Float): Float;
  function sgn(x: float | Float): float;
  function Sgn(x: float | Float): Float;
  function round(x: float | Float, mode: EnumRoundMode): int;
  function Round(x: float | Float, mode: EnumRoundMode): Int;
  function floor(x: float | Float): int;
  function Floor(x: float | Float): Int;
  function ceil(x: float | Float): int;
  function Ceil(x: float | Float): Int;

  function gt(x: int | Int, y: int | Int): bool;
  function Gt(x: int | Int, y: int | Int): Bool;
  function ge(x: int | Int, y: int | Int): bool;
  function Ge(x: int | Int, y: int | Int): Bool;
  function lt(x: int | Int, y: int | Int): bool;
  function Lt(x: int | Int, y: int | Int): Bool;
  function le(x: int | Int, y: int | Int): bool;
  function Le(x: int | Int, y: int | Int): Bool;
  function gt(x: float | Float, y: float | Float): bool;
  function Gt(x: float | Float, y: float | Float): Bool;
  function ge(x: float | Float, y: float | Float): bool;
  function Ge(x: float | Float, y: float | Float): Bool;
  function lt(x: float | Float, y: float | Float): bool;
  function Lt(x: float | Float, y: float | Float): Bool;
  function le(x: float | Float, y: float | Float): bool;
  function Le(x: float | Float, y: float | Float): Bool;

  function not(x: bool | Bool): bool;
  function Not(x: bool | Bool): Bool;
  function or(x: bool | Bool): bool;
  function Or(x: bool | Bool): Bool;
  function xor(x: bool | Bool, y: bool | Bool): bool;
  function Xor(x: bool | Bool, y: bool | Bool): Bool;
  function and(x: bool | Bool, y: bool | Bool): bool;
  function And(x: bool | Bool, y: bool | Bool): Bool;
  // ---- Vec ---- //
  function distance(v1: Vec, v2: Vec): float;
  function Distance(v1: Vec, v2: Vec): Float;
  function normalize(v: Vec): Vec;
  /** Length of Vec */
  function norm(v: Vec): float;
  function Norm(v: Vec): Float;
  function add(v1: Vec, v2: Vec): Vec;
  function sub(v1: Vec, v2: Vec): Vec;
  function scale(v: Vec, x: float): Vec;
  function dot(v1: Vec, v2: Vec): float;
  function Dot(v1: Vec, v2: Vec): Float;
  function cross(v1: Vec, v2: Vec): Vec;
  /** rad */
  function angle(v1: Vec, v2: Vec): float;
  function Angle(v1: Vec, v2: Vec): Float;
  /** rot is in deg uint */
  function eula_rot(front: Vec, up: Vec): Vec;
  /** rot is in deg uint */
  function rotate(target: Vec, rot: Vec): Vec;

  // ---- Should in query but i put them here in math ---- //
  /** from min to max */
  function random(min: float | Float, max: float | Float): float;
  /** from min to max */
  function Random(min: float | Float, max: float | Float): Float;
  /** from 0 to max */
  function random(max: float | Float): float;
  /** from 0 to max */
  function Random(max: float | Float): Float;
  /** from 0 to 1 */
  function random(): float;
  /** from 0 to 1 */
  function Random(): Float;
  /** from min to max */
  function random(min: int | Int, max: int | Int): int;
  /** from min to max */
  function Random(min: int | Int, max: int | Int): Int;
  /** from 0 to max */
  function random(max: int | Int): int;
  /** from 0 to max */
  function Random(max: int | Int): Int;
  /** Random Weight using list of weights */
  function random(list: List): int;
  /** Random Weight using list of weights */
  function Random(list: List): Int;

  function ZERO(): Vec;
  function FRONT(): Vec;
  function BACK(): Vec;
  function UP(): Vec;
  function DOWN(): Vec;
  function LEFT(): Vec;
  function RIGHT(): Vec;

  function Pi(): float;
  function PI(): Float;
}
declare namespace QueryNodes {
  function game_mode(): EnumGameMode;
  function player_num(): int;

  function timezone(): int;
  function timestamp(): int;

  function env_time(): float;
  function env_day(): int;
  function game_time(): int;

  function timer(name: string, src?: Entity): float;

  function device(player?: Entity): EnumDevice;
  function which_ui(player?: Entity): int;

  function target_of(creation: Entity): Entity;
  function aggro_of(creation: Entity): List;

  function snapshot(): { [key: string]: SysAllTypes };
  /** @deprecated Directly use `_local_var` */
  function local_var(name: string): SysAllTypes;
  /** @deprecated Directly use `Self.var` or `entity.var` */
  function custom_var(name: string, target?: Entity): SysAllTypes;
  /** @deprecated Directly use `Node.var` */
  function graph_var(name: string): { [key: string]: SysAllTypes };
  /** @deprecated Directly use `Self` */
  function self(): { [key: string]: SysAllTypes };

  // ------ player ------ //
  function pre_status(index: int, target?: Entity): int;
  function speed(character?: Entity): float;
  function velocity(character?: Entity): Vec;

  function is_all_down(player: Entity): bool;
  function player(id: int): Entity;
  function player(character: Entity): Entity;
  function player_id(guid: GUID): int;

  function revive_time(player: Entity): int;
  function nickname(player: Entity): str;
  function left_revives(player: Entity): int;
  function all_players(): List;
  function all_characters(player: Entity): List;

  function level_of(player: Entity, class_id?: ConfigId): int;
  function class_id_of(player: Entity): ConfigId;
  function skill_of(player: Entity, skill_slot: EnumSkillSlot): ConfigId;
  // TODO: 16-22

  namespace attr {
    /** Character and Object and Creation */
    function level(target?: Entity): int;
    /** Character and Object and Creation */
    function hp(target?: Entity): float;
    /** Character and Object and Creation */
    function max_hp(target?: Entity): float;
    /** Character and Object and Creation */
    function atk(target?: Entity): float;
    /** Character and Object and Creation */
    function base_atk(target?: Entity): float;
    /** Character and Object and Creation */
    function def(target?: Entity): float;
    /** Character and Object and Creation */
    function base_def(target?: Entity): float;
    /** Character and Creation */
    function interrupt_threshold(target?: Entity): float;
    /** Character and Creation */
    function interrupt(target?: Entity): float;
    /** Character and Creation */
    function interrupt_status(target?: Entity): EnumInterruptStatus;

    /** Character Only */
    function crit_rate(target?: Entity): float;
    /** Character Only */
    function crit_dmg(target?: Entity): float;
    /** Character Only */
    function heal(target?: Entity): float;
    /** Character Only */
    function incoming_heal(target?: Entity): float;
    /** Character Only */
    function recharge(target?: Entity): float;
    /** Character Only */
    function cd_reduction(target?: Entity): float;
    /** Character Only */
    function shield(target?: Entity): float;

    // Object Only
    function pyro_dmg(target?: Entity): float;
    function pyro_res(target?: Entity): float;
    function hydro_dmg(target?: Entity): float;
    function hydro_res(target?: Entity): float;
    function dendro_dmg(target?: Entity): float;
    function dendro_res(target?: Entity): float;
    function electro_dmg(target?: Entity): float;
    function electro_res(target?: Entity): float;
    function anemo_dmg(target?: Entity): float;
    function anemo_res(target?: Entity): float;
    function cryo_dmg(target?: Entity): float;
    function cryo_res(target?: Entity): float;
    function geo_dmg(target?: Entity): float;
    function geo_res(target?: Entity): float;
    function physical_dmg(target?: Entity): float;
    function physical_res(target?: Entity): float;
  }

  // ------ entity ------ //
  function is_on_field(entity: Entity): bool;
  function on_field(type: EnumEntityType): List;
  function on_field(prefab: Prefab): List;
  function type(entity: Entity): EnumEntityType;

  function pos(entity?: Entity): Vec;
  function rot(entity?: Entity): Vec;
  function front(entity?: Entity): Vec;
  function right(entity?: Entity): Vec;
  function up(entity?: Entity): Vec;
  function children(entity?: Entity): List;

  function parent(entity?: Entity): Entity;
  function guid(entity: Entity): GUID;
  function entity(guid: GUID): Entity;
  function faction(entity: Entity): Faction;
  function hostile(f1: Faction, f2: Faction): bool;

  function filter(src: List, center: Vec, radius: float): List;
  function filter(src: List, type: EnumEntityType): List;
  function filter(src: List, prefab: Prefab): List;
  function filter(src: List, faction: Faction): List;

}
declare namespace ExecNodes {
  // function $(lambda: (...args: any[]) => any): ExecFun<{}>;
  function $<T extends SysAllTypes>(lambda: (...args: any[]) => T): ExecFun<{ out: T }>;
  function $<T extends { [key: string]: SysAllTypes }>(lambda: (...args: any[]) => T): ExecFun<T>;

  // function SendSignal(signal: () => Signal): ExecFun<{}>;
  function SendSignal<Args extends any[]>(signal: (...args: Args) => Signal, ...args: Args): ExecFun<{}>;

  // 选择分支
  function If(cond: bool | Bool): ExecFun<{}>;
  // 选择分支
  function Switch(key: bool | float | int | str | Bool | Float | Int | Str): ExecFun<{}>;

  // ------ 执行节点函数 ------ //
  // 打印字符串
  function Log(str: str | Str): ExecFun<{}>;

  // 设置局部变量: SetVal(_local_val, new_val)
  // 设置节点图变量: SetVal(self.val, new_val)
  // 设置自定义变量: SetVal(node.val, new_val)
  // function SetVal<T>( // 
  //   val: T,
  //   new_val: T,
  //   target?: Entity,
  //   trigger_event?: bool | Bool,
  // ): ExecFun<{}>;
  /* <SetVal> */

  // 有限循环 (from <= i <= to)
  function Loop(
    from: int,
    to: int,
    id: string,
  ): ExecFun<{ i: int }>;
  // 列表迭代循环
  function ForEach(list: List): ExecFun<{ item: SysAllTypes }>;
  // 对列表插入值
  function Insert(list: List, index: int | Int, val: SysAllTypes): ExecFun<{}>;
  // 对列表修改值
  function Modify(list: List, index: int | Int, val: SysAllTypes): ExecFun<{}>;
  // 对列表移除值
  function Remove(list: List, index: int | Int): ExecFun<{}>;
  // 对列表移除值
  function Sort(list: List, is_increase?: bool | Bool): ExecFun<{}>;
  // 拼接列表
  function Concat(target: List, src: List): ExecFun<{}>;
  // 清除列表
  function Clear(list: List): ExecFun<{}>;

  // 创建实体
  function NewEntity(guid: GUID, tags?: List): ExecFun<{}>;
  // 创建元件
  function NewPrefab(
    id: Prefab,
    pos?: Vec,
    rot?: Vec,
    level?: int | Int,
    use_level?: bool | Bool,
    parent?: Entity,
    tags?: List,
  ): [entity: Entity][];
  // 创建元件组
  function NewPrefabs(
    idex: int | Int,
    pos?: Vec,
    rot?: Vec,
    level?: int | Int,
    use_level?: bool | Bool,
    parent?: Entity,
    tags?: List,
  ): [entities: List][];
  // 销毁实体: RemoveEntity(target, true)
  // 移除实体: RemoveEntity(target, false)
  function RemoveEntity(target: Entity, is_destroy?: bool | Bool): ExecFun<{}>;
  // 激活/关闭模型显示
  function ModelDisplay(target: Entity, display: bool | Bool): ExecFun<{}>;

  // 结算关卡
  function Complete(): ExecFun<{}>;

  // 传送玩家
  function Teleport(player?: Entity, pos?: Vec, rot?: Vec): ExecFun<{}>;
  // 复苏角色
  // 复苏玩家所有角色
  function Revive(player: Entity): ExecFun<{}>;
  // 激活复苏点/注销复苏点: SetRevive(p, enable=true/false, point=id);
  // 允许/禁止玩家复苏: SetRevive(p, enable=true/false)
  // 设置玩家剩余复苏次数: SetRevive(p, left=count)
  // 设置玩家复苏耗时: SetRevive(p, duration=t)
  function SetRevive(
    player: Entity,
    enable?: bool | Bool,
    duration?: float | Float,
    left?: int | Int,
    point?: int | Int,
  ): ExecFun<{}>;
  // 击倒玩家所有角色
  function Kill(player: Entity): ExecFun<{}>;

  // 激活/关闭额外碰撞 SetCollision(e, true/false)
  // 激活/关闭额外碰撞可攀爬性 SetCollision(e, true/false, id=i, is_climb=true)
  // 激活/关闭原生碰撞  SetCollision(e, true/false)
  // 激活/关闭原生碰撞可攀爬性 SetCollision(e, true/false, is_climb=true)
  function SetCollision(
    target: Entity,
    enable: bool | Bool,
    id?: int | Int,
    is_climb?: bool | Bool,
  ): ExecFun<{}>;
  // 激活/关闭碰撞触发器
  function SetCollisionTrigger(
    target: Entity,
    enable: bool | Bool,
    id?: int | Int,
  ): ExecFun<{}>;

  // 转发事件
  function ForwardTrigger(target: Entity): ExecFun<{}>;

  // 设置当前环境时间(立即切换环境时间到指定小时，参数需要是0~24之间的浮点数值)
  function SetTime(hour: float | Float): ExecFun<{}>;
  // 设置环境时间流逝速度(min/second, 0~60)
  function SetTimeSpeed(minutes: float | Float): ExecFun<{}>;
}
declare namespace TrigNodes {
  // ------ 系统事件函数 ------ //
  // 注意, 一些重要参数的位置被前置了, 方便直接填入/读取

  // 节点图变量变化时
  // function OnVarChange(name?: symbol):
  //   [new_val: TYPE, old_val: TYPE, name: string, src: Entity, src_guid: GUID][];
  /* <OnVarChange> */

  // 实体创建时
  function OnCreate(): [src: Entity, src_guid: GUID][];
  // 实体销毁时(仅在关卡实体上触发)
  function OnDestroy(): [
    src: Entity,
    src_guid: GUID,
    pos: Vec,
    dir: Vec,
    damage_src: Entity,
    snapshot: Entity,
    type: EnumEntityType,
    parent: Entity,
  ][];

  // 角色倒下时(角色实体上的节点图可以触发该事件)
  function OnDeath(): [
    character: Entity,
    cause: EnumDeathCause,
    damage_src: Entity,
  ][];
  // 角色复苏时(角色实体上的节点图可以触发该事件)
  function OnRevive(): [character: Entity][];
  // 玩家传送完成时
  function OnTeleport(): [character: Entity, character_guid: GUID][];

  // 进入碰撞触发器时
  function OnCollision(): [
    src: Entity,
    src_guid: GUID,
    trigger_id: int,
    entity: Entity,
    entity_guid: GUID,
  ][];
  // 离开碰撞触发器时
  function OnExitCollision(): [
    src: Entity,
    src_guid: GUID,
    trigger_id: int,
    entity: Entity,
    entity_guid: GUID,
  ][];

  // 基础运动器停止时
  function OnMotionFinish(): [name: string, src: Entity, src_guid: GUID][];
  // 路径到达路点时
  function OnPathFinish(): [
    name: string,
    point_index: int,
    src: Entity,
    src_guid: GUID,
  ][];

  // 命中检测触发时
  function OnHit(): [
    target: Entity,
    pos: Vec,
    is_hitbox: boolean,
    src: Entity,
    src_guid: GUID,
  ][];

  // 定时器触发时
  function OnTimer(name: string): [
    name: string,
    index: int,
    i: int,
    src: Entity,
    src_guid: GUID,
  ][];
  // 全局计时器触发时
  // function Timer(): [name: string, src: Entity, src_guid: GUID][];
  function Timer<Time extends number, Type extends "Count Down" | "Count">(timer: TimerCore<Time, Type>): [src: Entity, src_guid: GUID][];

  // 界面控件组触发时(只有触发交互的玩家节点图可以获取)
  function OnUI(): [id: int, group_id: int, src: Entity, src_guid: GUID][];
  // 选项卡选中时
  function OnTab(): [id: int, selector: Entity, src: Entity, src_guid: GUID][];

  // 监听信号
  // function Signal(  name: string, ):
  //  [...params: any[], sender: Entity, src: Entity, src_guid: GUID][];
  function Signal<Args extends any[]>(
    name: (...args: Args) => Signal,
  ): [...params: Args, sender: Entity, src: Entity, src_guid: GUID][];

}

class Reader {
  content: string;
  constructor(content: string) {
    this.content = content;
  }
  find_namespace(name: string): string {
    const reg = new RegExp(`namespace\\s+${name}\\s+{`, "gm");
    const match = reg.exec(this.content);
    if (!match) {
      throw new Error(`Namespace ${name} not found`);
    }
    const start = match.index + match[0].length;
    return this.balancePairs(start - 1);
  }
  balancePairs(start: number, depth: number = 0): string {
    const open = new Set(["{", "(", "["]);
    const close = new Set(["}", ")", "]"]);
    let i = start;
    while (i < this.content.length) {
      const char = this.content[i];
      if (open.has(char)) {
        depth++;
      } else if (close.has(char)) {
        depth--;
      } else if (char === '"' || char === "'") {
        // skip string
        const quote = char;
        i++;
        while (i < this.content.length && this.content[i] !== quote) {
          if (this.content[i] === "\\") {
            i += 2;
          } else {
            i++;
          }
        }
      } else if (this.content.startsWith("//", i)) {
        // skip line comment
        i += 2;
        while (i < this.content.length && this.content[i] !== "\n") {
          i++;
        }
      } else if (this.content.startsWith("/*", i)) {
        // skip block comment
        i += 2;
        while (i < this.content.length && !this.content.startsWith("*/", i)) {
          i++;
        }
        i += 1;
      }
      i++;
      if (depth === 0) {
        return this.content.slice(start, i);
      }
    }
    throw new Error("Unbalanced pairs");
  }
}

type OpenPair = "{" | "[" | '(' | "<" | '`' | '"' | "'";
type ClosePair = "}" | "]" | ')' | ">" | '`' | '"' | "'";
const PAIRS: [OpenPair, ClosePair][] = [
  ["{", "}"],
  ["[", "]"],
  ['(', ')'],
  ['<', '>'],
  ['`', '`'],
  ['\'', '\''],
  ['"', '"'],
];
class Generator {
  tab: string = "  ";
  stacks: string[] = [];
  content: string = "";
  constructor(version: string) {
    this.addLines(`/** Types And Functions declarations for DSL
 * This file is auto generated by utils/gen_def.ts
 * Do not edit this file directly.
 *
 * @version ${version}
 * @date ${new Date().toString()}
 * @author Aluria
 */\n`);
    this.addLine(`export { };\n`);
  }
  push(open?: OpenPair) {
    this.stacks.push(PAIRS.find(pair => pair[0] === open)?.[1] ?? "");
  }
  pop() {
    const close = this.stacks.pop();
    if (close) {
      this.addRaw(this.tab.repeat(this.stacks.length) + close);
    }
  }
  addRaw(line: string) {
    this.content += line + "\n";
  }
  addLine(line: string = "") {
    const first = line.trimStart()[0];
    const last = line.trimEnd().slice(-1);
    if (first === this.stacks.slice(-1)[0]) {
      this.stacks.pop();
    }
    this.content += this.tab.repeat(this.stacks.length) + line + "\n";
    if (last === "{" || last === "[" || last === "(" || last === "<") {
      this.push(last as OpenPair);
    } else if (first !== last && last === this.stacks.slice(-1)[0]) {
      this.stacks.pop();
    }
  }
  addLines(lines: string, trim: boolean = false) {
    for (const line of lines.split(/\r\n|\n|\r/)) {
      const l = trim ? line.trim() : line;
      this.addLine(l);
    }
  }
  dump() {
    return this.content;
  }

  newNamespace(name: string) {
    this.addLine(`namespace ${name} {`);
  }
  addType(name: string, def: string) {
    this.addLine(`type ${name} = ${def};`);
  }
  addConst(name: string, type: string, val = false) {
    this.addLine(`const ${name} ${val ? "=" : ":"} ${type};`);
  }
  addFun(
    name: string,
    args: [name: string, type: string][],
    ret: string,
    no_func: boolean = false,
  ) {
    const argsStr = args.map(([n, t]) => `${n}: ${t}`).join(", ");
    this.addLine(`${no_func ? "" : "function "}${name}(${argsStr}): ${ret};`);
  }
  addComments(comment: string) {
    this.addLines(`/** ${comment.split("\n").join("\n * ")} */`);
  }
  addComment(comment: string) {
    this.addLines(`// ${comment.replaceAll(/\n+/g, s => s + "// ")}`);
  }
  addClass(
    name: string,
    extendsClass: string | null = null,
    body?: null | {
      val?: [name: string, type: string, comment?: string][],
      fun?: [
        name: string,
        args: [name: string, type: string][],
        ret: string,
        comment?: string
      ][]
    },
    is_interface = false,
  ) {
    this.addLine(`${is_interface ? "interface" : "class"} ${name}${extendsClass ? ` extends ${extendsClass}` : ""} {`);
    if (body?.val) {
      for (const [n, t, c] of body.val) {
        if (c) this.addComments(c);
        this.addLine(`${n}: ${t};`);
      }
    }
    if (body?.fun) {
      for (const [n, args, ret, c] of body.fun) {
        if (c) this.addComments(c);
        this.addFun(n, args, ret, true);
      }
    }
    this.addLine(`}\n`);
  }
  addEnumType(name: string, cases?: (string | number)[], comment?: string) {
    if (comment) this.addComments(comment);
    if (cases) {
      this.addLine(`type ${name} =`);
      this.push();
      for (const c of cases ?? []) {
        this.addLine(`| ${typeof c === "string" ? `"${c}"` : c}`);
      }
      this.addLine(`;`);
      this.pop();
    } else {
      this.addLine(`type ${name} = "TODO";`);
    }
  }
}

function addEnumType(gen: Generator) {
  /** TODO
   *   Turn to this;
  type EnumEntityType = (typeof EnumEntityType)[keyof typeof EnumEntityType];
  const EnumEntityType: {
    Stage: 10;
    Object: 11;
    Player: 12;
    Character: 13;
    Creation: 14;
  }
   */
  gen.addEnumType("EnumGeneric", undefined, "Enum Equal Id = 475");
  gen.addEnumType("EnumComparisonOperators", undefined, "Enum Equal Id = 476");
  gen.addEnumType("EnumLogicalOperators", undefined, "Enum Equal Id = 477");
  gen.addEnumType("EnumMathematicalOperators", undefined, "Enum Equal Id = 478");
  gen.addEnumType("EnumAttackShapes", undefined, "Enum Equal Id = 479");
  gen.addEnumType("EnumSurvivalStatus", undefined, "Enum Equal Id = 480");
  gen.addEnumType("EnumSortingRules", undefined, "Enum Equal Id = 481");
  gen.addEnumType("EnumRoundingLogic", ["Round", "RoundUp", "RoundDown", "Truncate"], "Enum Equal Id = 482");
  gen.addEnumType("EnumTypeConversions", undefined, "Enum Equal Id = 483");
  gen.addEnumType("EnumMotionPathPointTypes", undefined, "Enum Equal Id = 484");
  gen.addEnumType("EnumMotionTypes", undefined, "Enum Equal Id = 485");
  gen.addEnumType("EnumFollowLocationType", undefined, "Enum Equal Id = 486");
  gen.addEnumType("EnumCoordinateSystemType", undefined, "Enum Equal Id = 487");
  gen.addEnumType("EnumElementalType", undefined, "Enum Equal Id = 488");
  gen.addEnumType("EnumEntityType", ["Stage", "Object", "Player", "Character", "Creation"], "Enum Equal Id = 489");
  gen.addEnumType("EnumUnitStatusAdditionResult", undefined, "Enum Equal Id = 491");
  gen.addEnumType("EnumUnitStatusRemovalReason", undefined, "Enum Equal Id = 492");
  gen.addEnumType("EnumUnitStatusRemovalStrategy", undefined, "Enum Equal Id = 493");
  gen.addEnumType("EnumRevivePointSelectionStrategy", undefined, "Enum Equal Id = 494");
  gen.addEnumType("EnumCauseOfBeingDown", ["NodeGraph", "Defeat", "Accident"], "Enum Equal Id = 495");
  gen.addEnumType("EnumTrigonometricFunctions", undefined, "Enum Equal Id = 496");
  gen.addEnumType("EnumDisruptorDeviceTypes", undefined, "Enum Equal Id = 497");
  gen.addEnumType("EnumDisruptorDeviceOrientation", undefined, "Enum Equal Id = 498");
  gen.addEnumType("EnumUIControlGroupStatus", undefined, "Enum Equal Id = 499");
  gen.addEnumType("EnumTargetType", undefined, "Enum Equal Id = 500");
  gen.addEnumType("EnumTriggerRestriction", undefined, "Enum Equal Id = 501");
  gen.addEnumType("EnumHitType", undefined, "Enum Equal Id = 502");
  gen.addEnumType("EnumAttackType", undefined, "Enum Equal Id = 503");
  gen.addEnumType("EnumHitPerformanceLevel", undefined, "Enum Equal Id = 504");
  gen.addEnumType("EnumSkillSlot", ["Attack", "E", "Q", "R", "T", "Custom"], "Enum Equal Id = 3351");
  gen.addEnumType("EnumSoundAttenuationMode", undefined, "Enum Equal Id = 3352");
  gen.addEnumType("EnumSelectCompletionReason", undefined, "Enum Equal Id = 3353");
  gen.addEnumType("EnumSettlementStatus", undefined, "Enum Equal Id = 3354");
  gen.addEnumType("EnumReasonForItemChange", undefined, "Enum Equal Id = 3356");
  gen.addEnumType("EnumItemLootType", undefined, "Enum Equal Id = 3357");
  gen.addEnumType("EnumDecisionRefreshMode", undefined, "Enum Equal Id = 3358");
  gen.addEnumType("EnumElementalReactionType", undefined, "Enum Equal Id = 3359");
  gen.addEnumType("EnumInterruptStatus", undefined, "Enum Equal Id = 759");
  gen.addEnumType("EnumGameplayMode", ["PlayTest", "RoomPlay", "MatchmakingPlay"], "Enum Equal Id = 776");
  gen.addEnumType("EnumInputDeviceType", ["Keyboard", "Gamepad", "Touchscreen"], "Enum Equal Id = 777");
}

function addMath(gen: Generator, reader: Reader) {
  function get_list_fun(type: string): string {
    return `function list(...items: ANY[]): List;
function list(items: ANY[]): List;
/** @deprecated Please use \`list.find(item)\` directly. */
function indices_of(list: List, item: ANY): int;
/** @deprecated Please use \`list[index]\` or \`list.get(index)\` directly. */
function list_item(list: List, index: int): ANY;
/** @deprecated Please use \`list.includes(item)\` directly. */
function includes(list: List, item: ANY): boolean;
`.replaceAll("ANY", type);
  }
  function get_dict_all_fun(): string {
    const a1 = AllKeyTypes_.map(t => `/** @deprecated Please use \`dict.has(key)\` directly. */
function dict_has_key(dict: Dict, key: KEY): boolean;
`.replaceAll("KEY", t)).join("\n");
    const a2 = AllValTypes_.map(t => `/** @deprecated Please use \`dict.includes(val)\` directly. */
function dict_has_val(dict: Dict, value: VALUE): boolean;
`.replaceAll("VALUE", t)).join("\n");
    const a3 =
      AllKeyTypes_.map(t =>
        AllValTypes_.map(v =>
          `
/** @deprecated Please use \`dict.get(key)\` directly. */
function dict_get(dict: Dict, key: KEY): VALUE;
function dict(pairs: [KEY, VALUE][]): Dict;
function dict(...pairs: [KEY, VALUE][]): Dict;
function dict(...pairs: (KEY | VALUE)[]): Dict;
`.replaceAll("VALUE", v)).join("\n")
          .replaceAll("KEY", t)).join("\n");
    return a1 + a2 + a3;
  }

  let content = reader.find_namespace("MathNodes");

  const eqs_types = ["Str", "str", "GUID", "Entity", "Vec", "Faction", "Int", "int", "Float", "ConfigId", "Prefab"]
  content = content.replace(
    "/* <Equals> */",
    eqs_types.map((e) =>
      `function equal(x: ${e}, y: ${e}): boolean;`
    ).join("\n")
  );
  content = content.replace(
    "/* <Enumeration Equals> */",
    SysEnumNames.map(
      (e) => `function equal(e1: ${e}, e2: ${e}): boolean;`
    ).join("\n")
  );

  content = content.replace(
    "/* <List> */",
    AllValTypes_.map(get_list_fun).join("\n")
  )

  content = content.replace(
    "/* <Dict> */",
    get_dict_all_fun()
  )

  gen.addLines("namespace m " + content, true);
}

function addQuery(gen: Generator, reader: Reader) {
  let content = reader.find_namespace("QueryNodes");
  // console.log(content);
  gen.addLines("namespace q " + content, true);
}


function addExec(gen: Generator, reader: Reader, to_interface = false) {
  let content = reader.find_namespace("ExecNodes").slice(1, -1);
  function SetVal(type: string): string {
    return `function SetVal(
val: TYPE,
new_val: TYPE,
target?: Entity,
trigger_event?: bool | Bool,
): ExecFun<{}>;`
      .replaceAll("TYPE", type);
  }
  content = content.replace(
    "/* <SetVal> */",
    AllTypes.map(SetVal).join("\n")
  );
  if (to_interface === true) {
    content = content.replaceAll(/^\s*function\s+/gm, "");
  }
  gen.addLines(content, true);
}

function addTrig(gen: Generator, reader: Reader) {
  function OnVarChange(type: string): string {
    return `function OnVarChange(
  name?: symbol,
): [new_val: TYPE, old_val: TYPE, name: string, src: Entity, src_guid: GUID][];`
      .replaceAll("TYPE", type);
  }
  let content = reader.find_namespace("TrigNodes").slice(1, -1);
  content = content.replace(
    "/* <OnVarChange> */",
    AllTypes.map(OnVarChange).join("\n")
  );
  gen.addLines(content, true);
}



function main() {

  // read self
  const reader = new Reader(readFileSync(import.meta.filename).toString());
  const gen = new Generator(version);

  gen.addClass(`TypeBase`);
  gen.addType(
    'TimerCore<Time extends number, Type extends "Count" | "Count Down">',
    '{ t0: Time; type: Type; }'
  );
  gen.addType("SysAllTypes", AllTypes.join(" | "));
  gen.addType("SysItemTypes", AllValTypes_.join(" | "));
  gen.addType("SysKeyTypes", AllKeyTypes_.join(" | "));
  gen.addType("SysValTypes", AllValTypes_.join(" | ") + " | List");
  gen.addLine(`declare global {`);

  gen.newNamespace("Self");
  gen.addConst("Self", "global.Self", true);
  gen.pop();
  gen.newNamespace("node");
  gen.addConst("Self", "global.node", true);
  gen.pop();
  gen.newNamespace("local");
  gen.addConst("Self", "global.local", true);
  gen.pop();
  gen.newNamespace("Signal");
  gen.addConst("Self", "global.Signal", true);
  gen.pop();
  gen.newNamespace("Timer");
  gen.addConst("Self", "global.Timer", true);
  gen.pop();

  gen.addLine();
  gen.addComment("====== System Basic Types ======");
  gen.addType("int", "bigint");
  gen.addType("float", "number");
  gen.addType("bool", "boolean");
  gen.addType("str", "string");

  gen.addClass("Float", "TypeBase", {
    val: [["type", `"Float"`], ["val", `number`]],
    fun: [["toString", [], "str"], ["private clone", [], "Float"]]
  });
  gen.addClass("Bool", "TypeBase", {
    val: [["type", `"Bool"`], ["val", `boolean`]],
    fun: [["toString", [], "str"], ["private clone", [], "Bool"]]
  });
  gen.addClass("Str", "TypeBase", {
    val: [["type", `"Str"`], ["val", `string`]],
    fun: [["toString", [], "str"], ["private clone", [], "Str"]]
  });
  gen.addClass("Vec", "TypeBase", {
    val: [["type", `"Vec"`], ["val", `[number, number, number]`]],
    fun: [
      ["get x", [], "number"], ["get y", [], "number"], ["get z", [], "number"],
      ["get 0", [], "number"], ["get 1", [], "number"], ["get 2", [], "number"],
      ["toString", [], "str"], ["private clone", [], "Vec"],
    ]
  });
  ["Int", "GUID", "Entity", "Prefab", "Faction", "ConfigId"]
    .forEach((type) => {
      gen.addClass(type, "TypeBase", {
        val: [["type", `"${type}"`], ["val", `bigint`]],
        fun: [["toString", [], "str"], ["private clone", [], `${type}`]]
      });
    });
  gen.addClass("List", "TypeBase", {
    val: [
      ["type", `"List"`], ["val", `SysItemTypes[]`],
      ["val_type", AllValTypes.map(t => `"${t}"`).join(" | ")],
      ["[index: number]", "SysItemTypes"]
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "List"],
    ]
  });
  gen.addClass("Dict", "TypeBase", {
    val: [
      ["type", `"Dict"`], ["key", `SysKeyTypes[]`], ["val", `SysValTypes[]`],
      ["key_type", AllKeyTypes.map(t => `"${t}"`).join(" | ")],
      ["val_type", [...AllValTypes, "List"].map(t => `"${t}"`).join(" | ")],
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "Dict"],
    ]
  });
  gen.addClass("Struct", "TypeBase", {
    val: [
      ["type", `"Struct"`], ["fields", "string[]"], ["val", `SysValTypes[]`],
      ["val_type", AllTypes.map(t => `"${t}"`).join(" | ")],
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "Struct"],
    ]
  });

  gen.addLine();
  gen.addComment("====== System Enum Types ======");
  addEnumType(gen);

  gen.addLine();
  gen.addComment("====== System Extended Types ======");
  gen.addType("Signal", '"Send Signal"');
  gen.addType("Count<Time extends number>", 'TimerCore<Time, "Count">');
  gen.addType("CountDown<Time extends number>", 'TimerCore<Time, "Count Down">');
  gen.addClass("EntityVarSnapshot", undefined, {
    val: [["type", `"EntityVarSnapshot"`]]
  });
  gen.addComments("Return types for all execution nodes");
  gen.addType("ExecFun<T extends { [key: str]: any }>", "bigint & { readonly __mybrand?: T }");
  gen.addComments("Use Default Out Branch");
  gen.addFun("ExecFun<T extends { [key: str]: any }>", [], "ExecFun<T>");
  gen.addComments("Use Specified Out Branch");
  gen.addFun("ExecFun<T extends { [key: str]: any }>", [["default_branch", "string"], ["...more_branches", "string[]"]], "ExecFun<T>");

  gen.addLine();
  gen.addComment("====== Math Namespace ======");
  addMath(gen, reader);

  gen.addLine();
  gen.addComment("====== Query Namespace ======");
  addQuery(gen, reader);

  gen.addLine();
  gen.addComment("====== Execution Nodes ======");
  addExec(gen, reader);

  gen.addLine();
  gen.addComment("====== Trigger Nodes ======");
  addTrig(gen, reader);

  gen.addComments("Declarations for Exec Chain");
  gen.addClass("BigInt", "ExecFunctions", {
    val: [
      ["[index: string | float | symbol]", "ExecFun<{}>", "`[ret_1, ret_2]`: 获取函数返回值"],
      ["(...cases: ExecFun<{}>[])", "ExecFun<{}>", "分支选择, cases is of `int` | `str` | `bool` | `null`"],
      ["Branch", "Branch", '`.Branch["name" | number]`: 创建分支接入点'],
    ]
  }, true);

  gen.addComments("Declarations for jumping to Branch");
  gen.addClass("Number", null, {
    val: [
      ["()", "ExecFun<{}>", "\n- `>> n()` 先执行用户定义的跳转分支 `n` , 再继续执行\n- `>> 0()` 执行主线分支\n- `>> -1()` 不执行主线分支(无动作)"],
    ]
  }, true);
  gen.addComments("Declarations for jumping to Branch");
  gen.addClass("String", null, {
    val: [
      ["()", "ExecFun<{}>", '`>> "branch name"()` 先执行跳转分支 `"branch name"'],
    ]
  }, true);
  // gen.addComments("Declarations for jumping to Branch");
  // gen.addClass("Boolean", null, {
  //   val: [
  //     ["()", "ExecFun<{}>", "先执行跳转分支, 再继续执行"],
  //   ]
  // }, true);

  gen.addComments("Declarations for object behaviors");
  gen.addClass("Object", "ExecFunctions", {
    val: [
      ["Branch", "Branch", '`.Branch["name" | number]`: 创建分支接入点'],
    ]
  }, true);
  ``
  // MyFun: T extends null ? () => ExecFun<{}> : never;
  gen.addComments("Declarations for Trigger behaviors");
  gen.addClass("Array<T>", null, {
    val: [
      // TODO: ["Branch", "Branch", "创建分支接入点"],
    ]
  }, true);

  gen.addComments('`Branch["name" | number]`: 创建分支接入点 (顶格写)');
  gen.addConst("Branch", "Branch");

  gen.addComment("====== End of Global ======");
  gen.pop();

  gen.addLine();
  gen.addComment("====== Declare for type branch ======");
  gen.addClass("Branch", "Array<ExecFun<{}>>", {
    val: [
      ["[index: string | number | boolean]", "ExecFun<{}>", "创建分支接入点"],
    ]
  }, true);

  gen.addLine();
  gen.addComment("====== Execution Nodes Helper ======");
  gen.addLines("interface ExecFunctions {");
  addExec(gen, reader, true);
  gen.pop();

  writeFileSync("./src/test/def.d.ts", gen.dump());
}


main();

export { };