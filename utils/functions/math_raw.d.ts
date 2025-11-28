// @ts-nocheck

// function equal(x: T, y: T): bool;
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

/* <List> */
function list(...items: ANY[]): List;
function list(items: ANY[]): List;
/** @deprecated Please use `list.find(item)` directly. */
function indices_of(list: List, item: ANY): int;
/** @deprecated Please use `list[index]` or `list.get(index)` directly. */
function list_item(list: List, index: int): ANY;
/** @deprecated Please use `list.includes(item)` directly. */
function includes(list: List, item: ANY): boolean;
/* <List> */


// ====== Dict ====== //
/** @deprecated Please use `dict.keys()` directly. */
function dict_keys(): List;
/** @deprecated Please use `dict.vals()` directly. */
function dict_values(): List;

/* <Dict> */
function dict(keys: List, values: List): Dict;
function dict(pairs: [KEY, VALUE][]): Dict;
function dict(...pairs: [KEY, VALUE][]): Dict;
function dict(...pairs: (KEY | VALUE)[]): Dict;
/** @deprecated Please use `dict.has(key)` directly. */
function dict_has_key(dict: Dict, key: KEY): boolean;
/** @deprecated Please use `dict.get(key)` directly. */
function dict_get(dict: Dict, key: KEY): VALUE;
/** @deprecated Please use `dict.includes(val)` directly. */
function dict_has_val(dict: Dict, value: VALUE): boolean;
/* <Dict> */

function struct(name: str | Str, ...val: SysAllTypes[]): Struct;
function struct(name: str | Str, val: SysAllTypes[]): Struct;
function struct(name: str | Str, val: { [field: str | Str]: SysAllTypes }): Struct;
function split_struct(x: Struct): { [field: str]: SysAllTypes };


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
