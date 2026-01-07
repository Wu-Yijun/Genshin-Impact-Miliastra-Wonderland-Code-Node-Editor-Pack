import { Document } from "./core.ts";
import json from "./data.json" with { type: "json" };


/**
 * Global singleton document instance loading default data.json
 */
export const DocHelper = new Document(json as any);

/**
 * Global singleton helpers derived from the default document
 */
export const NodeHelper = DocHelper.Node;
export const EnumHelper = DocHelper.Enum;
export const ServerTypeHelper = DocHelper.Type;
export const ClientTypeHelper = DocHelper.ClientType;

// Re-export types for convenience if needed, though usually handled by index.ts
