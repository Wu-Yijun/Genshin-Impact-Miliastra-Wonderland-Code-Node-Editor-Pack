import { BUILD_IN_SYS_NODE } from "./consts.ts";


export const SYS_TRIGGER_NODE = ["OnCreate", "OnTab"] as const;
export type SYS_TRIGGER_NODE = typeof SYS_TRIGGER_NODE[number];

export const SYS_TRIGGER_NODE_SET = Object.freeze(new Set(SYS_TRIGGER_NODE));



export const ALL_SYS_NODE = [...SYS_TRIGGER_NODE, ...BUILD_IN_SYS_NODE] as const;
export type ALL_SYS_NODE = typeof ALL_SYS_NODE[number];

export const ALL_SYS_NODE_Set = Object.freeze(new Set(ALL_SYS_NODE));