
/** Also used as EnumEqual IndexOfConcrete in client */
export const ENUM_ID_CLIENT = {
  Generic: -1,
  Comparison_Operators: 0,
  Logical_Operators: 1,
  Basic_Mathematical_Operators: 2,
  Attack_Shapes: 3,
  Survival_Status: 4,
  Sorting_Rules: 5,
  Rounding_Logic: 6,
  Type_Conversions: 7,
  Motion_Path_Point_Types: 8,
  Motion_Types: 9,
  Follow_Location_Type: 10,
  Coordinate_System_Type: 11,
  Elemental_Type: 12,
  Entity_Type: 13,
  Unit_Status_Addition_Failure_Reason: 14,
  Unit_Status_Addition_Success_Type: 15,
  Unit_Status_Removal_Reason: 16,
  Unit_Status_Removal_Strategy: 17,
  Revive_Point_Selection_Strategy: 18,
  Cause_Of_Being_Down: 19,
  Trigonometric_Functions: 20,
  Disruptor_Device_Type: 21,
  Disruptor_Device_Orientation: 22,
  UI_Control_Group_Status: 23,
  Target_Type: 24,
  Quick_Mathematical_Operators: 25, // TODO: Add Values
  Hit_Type: 26,
  Attack_Type: 27,
  Hit_Performance_Level: 28,
  Target_Sorting_Rules: 29,  // TODO: Add Values
  Attack_Layer_Config: 30, // TODO: Add Values
  Knockback_Direction_Type: 31, // TODO: Add Values
  Rotation_Type: 32,// TODO: Add Values
  Sector_Detection_Direction: 33,// TODO: Add Values
  Type_Conversions_Same: 34,// Wtf Same Enums inside 
  Retracing_Type: 35,// TODO: Add Values
  Hit_Level: 36,// TODO: Add Values
  Elemental_Reaction_Type: 37,
  Filter_Return_Type: 38,// TODO: Add Values
  Target_Type_For_Camera_Orientation_Node: 39,// TODO: Add Values
  Scan_Status: 40,// TODO: Add Values
  Input_Device_Type: 41,
} as const satisfies { [key: string]: number };
export type EnumId = (typeof ENUM_ID_CLIENT)[keyof typeof ENUM_ID_CLIENT];
