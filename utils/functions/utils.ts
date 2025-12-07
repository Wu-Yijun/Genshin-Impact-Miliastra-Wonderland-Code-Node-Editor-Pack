import { assert } from "../../utils/utils.ts";
import { extractArg, type Arg, type ArgArr, type strict_arg } from "./function_defs.ts";

export const AllTypes = ["int", "float", "bool", "str", "Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const;

export const SysEnumNames = [
  "EnumGeneric",
  "EnumComparisonOperators",
  "EnumLogicalOperators",
  "EnumMathematicalOperators",
  "EnumAttackShapes",
  "EnumSurvivalStatus",
  "EnumSortingRules",
  "EnumRoundingLogic",
  "EnumTypeConversions",
  "EnumMotionPathPointTypes",
  "EnumMotionTypes",
  "EnumFollowLocationType",
  "EnumCoordinateSystemType",
  "EnumElementalType",
  "EnumEntityType",
  "EnumUnitStatusAdditionResult",
  "EnumUnitStatusRemovalReason",
  "EnumUnitStatusRemovalStrategy",
  "EnumRevivePointSelectionStrategy",
  "EnumCauseOfBeingDown",
  "EnumTrigonometricFunctions",
  "EnumDisruptorDeviceType",
  "EnumDisruptorDeviceOrientation",
  "EnumUIControlGroupStatus",
  "EnumTargetType",
  "EnumTriggerRestriction",
  "EnumHitType",
  "EnumAttackType",
  "EnumHitPerformanceLevel",
  "EnumSkillSlot",
  "EnumSoundAttenuationMode",
  "EnumSelectCompletionReason",
  "EnumSettlementStatus",
  "EnumReasonForItemChange",
  "EnumItemLootType",
  "EnumDecisionRefreshMode",
  "EnumElementalReactionType",
  "EnumInterruptStatus",
  "EnumGameplayMode",
  "EnumInputDeviceType"
] as const;

export const AllKeyTypes = ["Entity", "GUID", "Int", "Str", "int", "str", "Faction", "ConfigId", "Prefab"] as const;
export const AllItemTypes = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "int", "bool", "float", "str", "Faction", "Vec", "ConfigId", "Prefab"] as const;
export const AllValTypes = [...AllItemTypes, "List"] as const;
const INT = ["int", "Int"] as const;
const BOOL = ["bool", "Bool"] as const;
const FLOAT = ["float", "Float"] as const;
const STR = ["str", "Str"] as const;

const any_type = [...AllTypes];
const any_enums = [...SysEnumNames];
const any_list_item_type = [...AllItemTypes];
const any_map_key_type = [...AllKeyTypes];
const any_map_val_type = [...AllValTypes];
const any_int = [...INT];
const any_float = [...FLOAT];
const any_bool = [...BOOL];
const any_str = [...STR];
export {
  any_type,
  any_enums,
  any_list_item_type,
  any_map_key_type,
  any_map_val_type,
  any_int,
  any_float,
  any_bool,
  any_str,
};

// ==== Helper functions ==== //
const T = () => "T";
function X(t: string): Arg { return { x: () => t } };
function Y(t: string): Arg { return { y: () => t } };
function Z(t: string): Arg { return { z: () => t } };
function XY(t: string): ArgArr { return [X(t), Y(t)] }
function XYZ(t: string): ArgArr { return [X(t), Y(t), Z(t)] }

export { T, X, Y, Z, XY, XYZ };

/** Args of different types will be combined each other
 * Returns ArgArr List (overloads)
 */
export function expandArgs(args: Arg[]): ArgArr[] {
  function recursiveExpand(args: strict_arg[]): Arg[][] {
    if (args.length == 1) {
      const ret: Arg[][] = [];
      for (const t of args[0].type) {
        let x: { [key: string]: any } = {};
        if (args[0].optional) {
          x[0] = true;
        }
        x[args[0].name] = t;
        ret.push([x]);
      }
      return ret;
    }
    const half = args.length >> 1;
    const l = recursiveExpand(args.slice(0, half));
    const r = recursiveExpand(args.slice(half));
    let ret: Arg[][] = [];
    for (const a1 of l) {
      for (const a2 of r) {
        ret.push([...a1, ...a2]);
      }
    }
    return ret;
  }
  const arg = extractArg(args);
  assert(arg.type === "args");
  const arr = arg.val;
  return recursiveExpand(arr);
}