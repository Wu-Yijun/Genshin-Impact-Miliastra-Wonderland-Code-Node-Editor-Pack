export const ALL_SYS_CALL = ["If", "Switch", "Loop", "ForEach", "Selector"];
export type ALL_SYS_CALL = typeof ALL_SYS_CALL[number];

export const ALL_SYS_CALL_Set = Object.freeze(new Set(ALL_SYS_CALL));