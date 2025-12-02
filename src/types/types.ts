
export const SysTypeNames = ["int", "float", "bool", "str", "Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const;
export type SysTypeNames = typeof SysTypeNames[number];

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