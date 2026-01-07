import { readFileSync, statSync } from "fs";
import type * as D from "./types.ts";
import path from "path";
import * as NT from "./node_type.ts";
import Fuse from "fuse.js";


export interface TypedNodeDef extends Omit<D.NodeDef, "DataPins" | "FlowPins"> {
  DataPins: TypedPinDef[];
  FlowPins: TypedPinDef[];
}
export interface TypedPinDef extends Omit<D.PinDef, "Type"> {
  Type: NT.NodeType;
  TypeSelectorIndex?: number;
}

/**
 * Document class - Main entry point for accessing node data
 * 
 * Provides lazy-loaded access to Nodes and Enums collections with efficient caching.
 * Supports loading from file path, JSON string, or existing Document/D.Document objects.
 */
export class Document {
  public readonly doc: D.Document;
  private nodes: Nodes | null = null;
  private enums: Enums | null = null;
  private typeEngine: TypeEngine | null = null;
  private clientTypeEngine: TypeEngine | null = null;

  /** Lazy-loaded Nodes collection */
  get Node(): Nodes {
    return this.nodes ?? (this.nodes = new Nodes(this));
  }

  /** Lazy-loaded Enums collection */
  get Enum(): Enums {
    return this.enums ?? (this.enums = new Enums(this));
  }

  /** Lazy-loaded TypeEngine (Server) */
  get Type(): TypeEngine {
    return this.typeEngine ?? (this.typeEngine = new TypeEngine(this, "Server"));
  }

  /** Lazy-loaded TypeEngine (Client) */
  get ClientType(): TypeEngine {
    return this.clientTypeEngine ?? (this.clientTypeEngine = new TypeEngine(this, "Client"));
  }

  /**
   * Creates a Document instance
   * @param doc - Can be a file path, JSON string, Document instance, or D.Document object
   */
  constructor(doc?: Document | D.Document | string) {
    if (doc === undefined) doc = path.join(import.meta.dirname, "data.json");
    if (typeof doc === "string" && statSync(doc).isFile()) doc = readFileSync(doc).toString();
    if (typeof doc === "string") doc = JSON.parse(doc) as D.Document;
    if (doc instanceof Document) doc = doc.doc;
    this.doc = doc;
  }

  /** Get document version information */
  get version() {
    return {
      version: this.doc.Version,
      gameVersion: this.doc.GameVersion,
      author: this.doc.Author,
      date: this.doc.Date,
      description: this.doc.Description,
    };
  }

  /** Get all type definitions */
  get types(): D.TypeDef[] {
    return this.doc.Types;
  }

  /** Get system constants */
  get systemConstants(): D.SystemConstDef {
    return this.doc.SystemConstants;
  }
}

/**
 * Nodes class - Efficient access to node definitions
 * 
 * Provides O(1) lookup by Identifier or ID using Map-based caching.
 * Supports variant node injection and relationship validation.
 */
export class Nodes {
  public readonly nodes: D.NodeDef[];

  // Lazy-loaded lookup maps for O(1) access
  private byIdentifier: Map<string, D.NodeDef> | null = null;
  private byID: Map<number, D.NodeDef> | null = null;
  private fuse: Fuse<D.NodeDef> | null = null;

  constructor(nodes?: Document | Nodes | D.Document | D.NodeDef[] | string) {
    if (nodes === undefined) nodes = path.join(import.meta.dirname, "data.json");
    if (typeof nodes === "string" && statSync(nodes).isFile()) nodes = readFileSync(nodes).toString();
    if (typeof nodes === "string") nodes = (JSON.parse(nodes) as D.Document).Nodes;
    if (nodes instanceof Document) nodes = nodes.doc.Nodes;
    if (nodes instanceof Nodes) nodes = nodes.nodes;
    if ("Nodes" in nodes) nodes = nodes.Nodes;
    this.nodes = nodes;
  }

  /** Initialize identifier lookup map */
  private ensureIdentifierMap(): Map<string, D.NodeDef> {
    if (!this.byIdentifier) {
      this.byIdentifier = new Map();
      for (const node of this.nodes) {
        this.byIdentifier.set(node.Identifier, node);
        // Also register aliases for backward compatibility
        if (node.Alias) {
          for (const alias of node.Alias) {
            this.byIdentifier.set(alias, node);
          }
        }
      }
    }
    return this.byIdentifier;
  }

  /** Initialize ID lookup map */
  private ensureIDMap(): Map<number, D.NodeDef> {
    if (!this.byID) {
      this.byID = new Map();
      for (const node of this.nodes) {
        this.byID.set(node.ID, node);
      }
    }
    return this.byID;
  }

  /**
   * Get a NodeDef by its Identifier (supports aliases)
   * @param identifier - Node identifier (e.g., "Execution.Action.DoSomething")
   * @returns NodeDef or undefined if not found
   */
  getByIdentifier(identifier: string): D.NodeDef | undefined {
    return this.ensureIdentifierMap().get(identifier);
  }

  findSimilar(identifier: string, limit = 3): D.NodeDef[] {
    if (!this.fuse) {
      this.fuse = new Fuse(this.nodes, {
        includeScore: true,
        keys: ["Identifier", "Alias"],
      });
    }
    const results = this.fuse.search(identifier, { limit });
    const trimmed = results.filter(r => r.score !== undefined && r.score < 0.5);
    if (trimmed.length === 0) trimmed.push(results[0]);
    return trimmed.map(r => r.item);
  }

  /**
   * Get a NodeDef by its ID
   * @param id - Node ID
   * @returns NodeDef or undefined if not found
   */
  getByID(id: number): D.NodeDef | undefined {
    return this.ensureIDMap().get(id);
  }

  toTypedNodeDef(node: D.NodeDef): TypedNodeDef {
    return {
      ...node,
      DataPins: node.DataPins.map(dp => ({
        ...dp,
        Type: dp.Type ? NT.parse(dp.Type) : NT.UNK_TYPE
      })),
      FlowPins: node.FlowPins.map(fp => ({
        ...fp,
        Type: fp.Type ? NT.parse(fp.Type) : NT.UNK_TYPE
      }))
    };
  }

  /**
   * Get a variant-injected NodeDef by Identifier and VariantConstraints
   * @param identifier - Node identifier
   * @param constraints - Variant constraints string (e.g., "T=Int32")
   * @returns A new NodeDef with injected contents applied, or undefined if not found
   */
  getVariant(identifier: string, constraints: NT.ConstraintType): TypedNodeDef | undefined {
    const node = this.getByIdentifier(identifier);
    if (!node || node.Type !== "Variant" || !node.Variants) {
      return undefined;
    }
    const cons_str = NT.stringify(constraints, { empty_struct: true });

    // Find matching variant
    const variant = node.Variants.find(v => v.Constraints === cons_str);
    if (!variant) {
      return undefined;
    }
    const ij = new Map<string, D.InjectedDef>(variant.InjectedContents.map(ic => [ic.Identifier, ic]));

    // Clone the node and apply injections
    const injectedNode = this.toTypedNodeDef(node);
    injectedNode.KernelID = variant.KernelID;

    injectedNode.FlowPins.forEach(pin => {
      const injection = ij.get(pin.Identifier);
      if (injection === undefined) return;
      // Apply injections
      if (injection.TypeSelectorIndex !== undefined) {
        console.warn("Warning: TypeSelectorIndex injection on FlowPin is ignored.");
      }
      if (injection.DefaultValue !== undefined) {
        console.warn("Warning: DefaultValue injection on FlowPin is ignored.");
      }
      if (injection.ShellIndex !== undefined) pin.ShellIndex = injection.ShellIndex;
      if (injection.KernelIndex !== undefined) pin.KernelIndex = injection.KernelIndex;
      if (injection.Visibility !== undefined) pin.Visibility = injection.Visibility;
      if (injection.Connectability !== undefined) pin.Connectability = injection.Connectability;
    });

    injectedNode.DataPins.forEach(pin => {
      const injection = ij.get(pin.Identifier);
      if (injection === undefined) return;

      // Apply injections
      pin.Type = NT.reflects(pin.Type, constraints);
      if (injection.TypeSelectorIndex !== undefined) pin.TypeSelectorIndex = injection.TypeSelectorIndex;
      if (injection.ShellIndex !== undefined) pin.ShellIndex = injection.ShellIndex;
      if (injection.KernelIndex !== undefined) pin.KernelIndex = injection.KernelIndex;
      if (injection.DefaultValue !== undefined) pin.DefaultValue = injection.DefaultValue;
      if (injection.Visibility !== undefined) pin.Visibility = injection.Visibility;
      if (injection.Connectability !== undefined) pin.Connectability = injection.Connectability;
    });

    return injectedNode;
  }

  /** 
   * filter variant constraints that match the given pin types
   * 
   * @param def Node definition
   * @param constraints Array of tuples containing pin identifier and node type
   * @returns Array of ConstraintType that match the given pin types
   */
  filterVariantConstraints(def: D.NodeDef | TypedNodeDef, constraints: [string, NT.NodeType][]): NT.ConstraintType[] {
    if (def.Type !== "Variant" || !def.Variants) {
      return [];
    }
    const d = constraints.map(c => {
      const p = def.DataPins.find(p => p.Identifier === c[0]);
      if (!p) {
        console.error(`[Error] Pin ${c[0]} not found in node ${def.Identifier}`);
        return NT.UNK_TYPE;
      }
      return p.Type ? NT.parse(p.Type) : NT.UNK_TYPE;
    });
    const ret: NT.ConstraintType[] = [];
    def.Variants.forEach(v => {
      const cts = NT.parse(v.Constraints);
      if (cts.t !== "c") {
        console.error(`[Error] Unsupported constraint type '${cts.t}' in variant constraints '${v.Constraints}'`);
        return;
      }
      let pass = true;
      for (let i = 0; i < d.length; i++) {
        if (d[i] === NT.UNK_TYPE) continue;  // Skip unknown types
        if (!NT.type_equal(NT.reflects(d[i], cts), constraints[i][1], { omit_unknown: true })) {
          pass = false;
          break;
        }
      }
      if (pass) ret.push(cts);
    });
    return ret;
  }

  /**
   * Filter nodes by system (Server/Client)
   * @param system - "Server" or "Client"
   * @returns Array of NodeDefs matching the system
   */
  filterBySystem(system: "Server" | "Client"): D.NodeDef[] {
    return this.nodes.filter(n => n.System === system);
  }

  /**
   * Filter nodes by domain
   * @param domain - Node domain
   * @returns Array of NodeDefs matching the domain
   */
  filterByDomain(domain: D.NodeDef["Domain"]): D.NodeDef[] {
    return this.nodes.filter(n => n.Domain === domain);
  }

  /**
   * Filter nodes by type (Fixed/Variant)
   * @param type - "Fixed" or "Variant"
   * @returns Array of NodeDefs matching the type
   */
  filterByType(type: "Fixed" | "Variant"): D.NodeDef[] {
    return this.nodes.filter(n => n.Type === type);
  }

  /**
   * Validate if a node has a specific pin
   * @param nodeIdentifier - Node identifier
   * @param pinIdentifier - Pin identifier
   * @returns true if the pin exists
   */
  hasPin(nodeIdentifier: string, pinIdentifier: string): boolean {
    const node = this.getByIdentifier(nodeIdentifier);
    if (!node) return false;
    return [...node.DataPins, ...node.FlowPins].some(p => p.Identifier === pinIdentifier);
  }

  /**
   * Get all variant constraints for a variant node
   * @param identifier - Node identifier
   * @returns Array of constraint strings, or empty array if not a variant node
   */
  getVariantConstraints(identifier: string): string[] {
    const node = this.getByIdentifier(identifier);
    if (!node || node.Type !== "Variant" || !node.Variants) {
      return [];
    }
    return node.Variants.map(v => v.Constraints);
  }

  /**
   * Validate if two pins can be connected
   * @param sourceNode - Source node identifier
   * @param sourcePin - Source pin identifier
   * @param targetNode - Target node identifier
   * @param targetPin - Target pin identifier
   * @returns true if connection is valid
   */
  canConnect(sourceNode: string, sourcePin: string, targetNode: string, targetPin: string): boolean {
    const src = this.getByIdentifier(sourceNode);
    const tgt = this.getByIdentifier(targetNode);
    if (!src || !tgt) return false;

    const srcPin = [...src.DataPins, ...src.FlowPins].find(p => p.Identifier === sourcePin);
    const tgtPin = [...tgt.DataPins, ...tgt.FlowPins].find(p => p.Identifier === targetPin);

    if (!srcPin || !tgtPin) return false;

    // Check direction: source must be Out, target must be In
    if (srcPin.Direction !== "Out" || tgtPin.Direction !== "In") return false;

    // Check connectability
    if (srcPin.Connectability === false || tgtPin.Connectability === false) return false;

    // Check type compatibility (if types are defined)
    if (srcPin.Type && tgtPin.Type && srcPin.Type !== tgtPin.Type) {
      // Allow generic types to match (basic check)
      if (!srcPin.Type.includes("<") && !tgtPin.Type.includes("<")) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Enums class - Efficient access to enum definitions and enum types
 * 
 * Provides O(1) lookup for EnumDef and EnumTypeDef by Identifier or ID.
 * Supports category-based queries and relationship validation.
 */
export class Enums {
  public readonly enums: D.EnumDef[];
  public readonly enumTypes: D.EnumTypeDef[];

  // Lazy-loaded lookup maps for O(1) access
  private enumByIdentifier: Map<string, D.EnumDef> | null = null;
  private enumByID: Map<number, D.EnumDef> | null = null;
  private enumTypeByIdentifier: Map<string, D.EnumTypeDef> | null = null;
  private enumTypeByID: Map<number, D.EnumTypeDef> | null = null;
  private enumTypeByTypeID: Map<number, D.EnumTypeDef> | null = null;
  private enumsByCategory: Map<string, D.EnumDef[]> | null = null;
  private enumTypesByCategory: Map<string, D.EnumTypeDef[]> | null = null;

  constructor(enums?: Document | Enums | D.Document | string) {
    if (enums === undefined) enums = path.join(import.meta.dirname, "data.json");
    if (typeof enums === "string" && statSync(enums).isFile()) enums = readFileSync(enums).toString();
    if (typeof enums === "string") enums = JSON.parse(enums) as D.Document;
    if (enums instanceof Document) enums = enums.doc;
    if (enums instanceof Enums) {
      this.enums = enums.enums;
      this.enumTypes = enums.enumTypes;
      return;
    }
    this.enums = enums.Enums;
    this.enumTypes = enums.EnumTypes;
  }

  /** Initialize EnumDef identifier lookup map */
  private ensureEnumIdentifierMap(): Map<string, D.EnumDef> {
    if (!this.enumByIdentifier) {
      this.enumByIdentifier = new Map();
      for (const enumDef of this.enums) {
        this.enumByIdentifier.set(enumDef.Identifier, enumDef);
        // Also register aliases for backward compatibility
        if (enumDef.Alias) {
          for (const alias of enumDef.Alias) {
            this.enumByIdentifier.set(alias, enumDef);
          }
        }
      }
    }
    return this.enumByIdentifier;
  }

  /** Initialize EnumDef ID lookup map */
  private ensureEnumIDMap(): Map<number, D.EnumDef> {
    if (!this.enumByID) {
      this.enumByID = new Map();
      for (const enumDef of this.enums) {
        this.enumByID.set(enumDef.ID, enumDef);
      }
    }
    return this.enumByID;
  }

  /** Initialize EnumTypeDef identifier lookup map */
  private ensureEnumTypeIdentifierMap(): Map<string, D.EnumTypeDef> {
    if (!this.enumTypeByIdentifier) {
      this.enumTypeByIdentifier = new Map();
      for (const enumType of this.enumTypes) {
        this.enumTypeByIdentifier.set(enumType.Identifier, enumType);
        // Also register aliases for backward compatibility
        if (enumType.Alias) {
          for (const alias of enumType.Alias) {
            this.enumTypeByIdentifier.set(alias, enumType);
          }
        }
      }
    }
    return this.enumTypeByIdentifier;
  }

  /** Initialize EnumTypeDef ID lookup map */
  private ensureEnumTypeIDMap(): Map<number, D.EnumTypeDef> {
    if (!this.enumTypeByID) {
      this.enumTypeByID = new Map();
      for (const enumType of this.enumTypes) {
        this.enumTypeByID.set(enumType.ID, enumType);
      }
    }
    return this.enumTypeByID;
  }

  /** Initialize EnumTypeDef TypeID lookup map */
  private ensureEnumTypeTypeIDMap(): Map<number, D.EnumTypeDef> {
    if (!this.enumTypeByTypeID) {
      this.enumTypeByTypeID = new Map();
      for (const enumType of this.enumTypes) {
        this.enumTypeByTypeID.set(enumType.TypeID, enumType);
      }
    }
    return this.enumTypeByTypeID;
  }

  /** Initialize EnumDef category grouping map */
  private ensureEnumsByCategoryMap(): Map<string, D.EnumDef[]> {
    if (!this.enumsByCategory) {
      this.enumsByCategory = new Map();
      for (const enumDef of this.enums) {
        const category = enumDef.Category;
        if (!this.enumsByCategory.has(category)) {
          this.enumsByCategory.set(category, []);
        }
        this.enumsByCategory.get(category)!.push(enumDef);
      }
    }
    return this.enumsByCategory;
  }

  /** Initialize EnumTypeDef category grouping map */
  private ensureEnumTypesByCategoryMap(): Map<string, D.EnumTypeDef[]> {
    if (!this.enumTypesByCategory) {
      this.enumTypesByCategory = new Map();
      for (const enumType of this.enumTypes) {
        const category = enumType.Category;
        if (!this.enumTypesByCategory.has(category)) {
          this.enumTypesByCategory.set(category, []);
        }
        this.enumTypesByCategory.get(category)!.push(enumType);
      }
    }
    return this.enumTypesByCategory;
  }

  /**
   * Get an EnumDef by its Identifier (supports aliases)
   * @param identifier - Enum identifier (e.g., "Category.EnumName")
   * @returns EnumDef or undefined if not found
   */
  getEnumByIdentifier(identifier: string): D.EnumDef | undefined {
    return this.ensureEnumIdentifierMap().get(identifier);
  }

  /**
   * Get an EnumDef by its ID
   * @param id - Enum ID
   * @returns EnumDef or undefined if not found
   */
  getEnumByID(id: number): D.EnumDef | undefined {
    return this.ensureEnumIDMap().get(id);
  }

  /**
   * Get an EnumTypeDef by its Identifier (supports aliases)
   * @param identifier - EnumType identifier (FourCC code)
   * @returns EnumTypeDef or undefined if not found
   */
  getEnumTypeByIdentifier(identifier: string): D.EnumTypeDef | undefined {
    return this.ensureEnumTypeIdentifierMap().get(identifier);
  }

  /**
   * Get an EnumTypeDef by its ID
   * @param id - EnumType ID
   * @returns EnumTypeDef or undefined if not found
   */
  getEnumTypeByID(id: number): D.EnumTypeDef | undefined {
    return this.ensureEnumTypeIDMap().get(id);
  }

  /**
   * Get an EnumTypeDef by its TypeID
   * @param typeId - EnumType TypeID (ID + 10000)
   * @returns EnumTypeDef or undefined if not found
   */
  getEnumTypeByTypeID(typeId: number): D.EnumTypeDef | undefined {
    return this.ensureEnumTypeTypeIDMap().get(typeId);
  }

  /**
   * Get the collection of EnumDefs for a given EnumTypeDef
   * @param identifier - EnumType identifier
   * @returns Array of EnumDefs in the collection, or empty array if not found
   */
  getEnumTypeCollection(identifier: string): D.EnumDef[] {
    const enumType = this.getEnumTypeByIdentifier(identifier);
    if (!enumType) return [];

    // Map Collection identifiers to actual EnumDef objects
    return enumType.Collection
      .map(enumIdentifier => this.getEnumByIdentifier(enumIdentifier))
      .filter((e): e is D.EnumDef => e !== undefined);
  }

  /**
   * Get all EnumTypeDefs that contain a specific EnumDef
   * @param identifier - Enum identifier
   * @returns Array of EnumTypeDefs that include this enum in their collection
   */
  getEnumTypesForEnum(identifier: string): D.EnumTypeDef[] {
    const enumDef = this.getEnumByIdentifier(identifier);
    if (!enumDef) return [];

    return this.enumTypes.filter(enumType =>
      enumType.Collection.includes(identifier) ||
      (enumDef.Alias && enumDef.Alias.some(alias => enumType.Collection.includes(alias)))
    );
  }

  /**
   * Get the category of an EnumDef
   * @param identifier - Enum identifier
   * @returns Category string or undefined if not found
   */
  getEnumCategory(identifier: string): string | undefined {
    return this.getEnumByIdentifier(identifier)?.Category;
  }

  /**
   * Get the category of an EnumTypeDef
   * @param identifier - EnumType identifier
   * @returns Category string or undefined if not found
   */
  getEnumTypeCategory(identifier: string): string | undefined {
    return this.getEnumTypeByIdentifier(identifier)?.Category;
  }

  /**
   * Get all EnumTypeDefs in a specific category
   * @param category - Category name
   * @returns Array of EnumTypeDefs in the category
   */
  getEnumTypesByCategory(category: string): D.EnumTypeDef[] {
    return this.ensureEnumTypesByCategoryMap().get(category) || [];
  }

  /**
   * Get all EnumDefs in a specific category
   * @param category - Category name
   * @returns Array of EnumDefs in the category
   */
  getEnumsByCategory(category: string): D.EnumDef[] {
    return this.ensureEnumsByCategoryMap().get(category) || [];
  }

  getEnumsByIdentifier(identifier: string): D.EnumDef[] {
    return this.getEnumsByCategory(this.getEnumTypeByIdentifier(identifier)?.Category ?? "");
  }

  /**
   * Get all unique categories for EnumDefs
   * @returns Array of category names
   */
  getEnumCategories(): string[] {
    return Array.from(this.ensureEnumsByCategoryMap().keys());
  }

  /**
   * Get all unique categories for EnumTypeDefs
   * @returns Array of category names
   */
  getEnumTypeCategories(): string[] {
    return Array.from(this.ensureEnumTypesByCategoryMap().keys());
  }

  /**
   * Filter EnumTypeDefs by system (Server/Client)
   * @param system - "Server" or "Client"
   * @returns Array of EnumTypeDefs matching the system
   */
  filterEnumTypesBySystem(system: "Server" | "Client"): D.EnumTypeDef[] {
    return this.enumTypes.filter(et => et.System === system);
  }

  /**
   * Validate if an EnumDef belongs to a specific EnumTypeDef
   * @param enumIdentifier - Enum identifier
   * @param enumTypeIdentifier - EnumType identifier
   * @returns true if the enum is in the enumType's collection
   */
  isEnumInType(enumIdentifier: string, enumTypeIdentifier: string): boolean {
    const enumType = this.getEnumTypeByIdentifier(enumTypeIdentifier);
    if (!enumType) return false;

    const enumDef = this.getEnumByIdentifier(enumIdentifier);
    if (!enumDef) return false;

    return enumType.Collection.includes(enumIdentifier) ||
      (enumDef.Alias?.some(alias => enumType.Collection.includes(alias)) ?? false);
  }

  /**
   * Validate if two EnumDefs share any common EnumTypeDef
   * @param identifier1 - First enum identifier
   * @param identifier2 - Second enum identifier
   * @returns true if they share at least one EnumTypeDef
   */
  shareEnumType(identifier1: string, identifier2: string): boolean {
    const types1 = this.getEnumTypesForEnum(identifier1);
    const types2 = this.getEnumTypesForEnum(identifier2);

    return types1.some(t1 => types2.some(t2 => t1.Identifier === t2.Identifier));
  }
}

export interface TypeDefFull extends D.TypeDef {
  /** list item's type */
  list_type?: D.TypeDef;
  /** enum type */
  enum_type?: D.EnumTypeDef;
  /** map key type and val type */
  map_type?: [D.TypeDef, D.TypeDef];
}

/**
 * TypeEngine class - Manages type system, conversions, and enum mappings
 * 
 * Provides conversion between high-level TypeDefs and structural NodeTypes.
 * Handles ID <-> Identifier mappings for Types and Enums.
 * Respects Server/Client system context.
 */
export class TypeEngine {
  public readonly types: D.TypeDef[];
  public readonly enumTypes: D.EnumTypeDef[];
  public readonly system: "Server" | "Client";

  public readonly DEFAULT_TYPE: D.TypeDef;
  public readonly DEFAULT_ENUM: D.EnumTypeDef;

  // Lazy-loaded lookup maps
  private _typeByID: Map<number, D.TypeDef> | null = null;
  private _typeByIdentifier: Map<string, D.TypeDef> | null = null;
  private _typeByStructure: Map<string, D.TypeDef> | null = null; // Map stringified structure -> TypeDef

  private _enumTypeByID: Map<number, D.EnumTypeDef> | null = null;
  private _enumTypeByTypeID: Map<number, D.EnumTypeDef> | null = null;
  private _enumTypeByIdentifier: Map<string, D.EnumTypeDef> | null = null;

  constructor(doc?: Document | TypeEngine | D.Document | string, system: "Server" | "Client" = "Server") {
    if (doc === undefined) doc = path.join(import.meta.dirname, "data.json");
    if (typeof doc === "string" && statSync(doc).isFile()) doc = readFileSync(doc).toString();
    if (typeof doc === "string") doc = JSON.parse(doc) as D.Document;

    if (doc instanceof Document) {
      this.types = doc.types;
      this.enumTypes = doc.Enum.enumTypes; // Use Enum accessor to get EnumTypes
    } else if (doc instanceof TypeEngine) {
      this.types = doc.types;
      this.enumTypes = doc.enumTypes;
      system = doc.system; // Inherit system if copying engine
    } else {
      // D.Document
      this.types = doc.Types;
      this.enumTypes = doc.EnumTypes;
    }
    this.system = system;

    this.DEFAULT_TYPE = this.types.find(x => x.ID === 0)!;
    this.DEFAULT_ENUM = this.enumTypes.find(x => x.Category === "Generic" && x.System === system)!;
  }

  // --- Initialization Helpers ---

  private ensureTypeMaps() {
    if (this._typeByID) return;
    this._typeByID = new Map();
    this._typeByIdentifier = new Map();
    this._typeByStructure = new Map();

    for (const t of this.types) {
      // Map by ID based on system
      const id = this.system === "Server" ? t.ID : t.ClientID;
      if (id !== null) {
        this._typeByID.set(id, t);
      }

      // Map by Identifier
      this._typeByIdentifier.set(t.Identifier, t);

      // Map by Structure (Identifier)
      // Note: Identifier is assumed to be the unique structural representation (e.g. "Int", "List<...>")
      // If multiple TypeDefs share the same structure, the LAST one wins or checks precedence?
      // Assuming 1:1 or taking first/last found. Here we overwrite, effectively taking the last one.
      // Ideally TypeDefs should differ by Identifier but might share structure.
      // The TODO asks "From NodeType get type TypeDef", implying we want *a* TypeDef that matches.
      if (!this._typeByStructure.has(t.Identifier)) {
        this._typeByStructure.set(t.Identifier, t);
      }
    }
  }

  private ensureEnumTypeMaps() {
    if (this._enumTypeByID) return;
    this._enumTypeByID = new Map();
    this._enumTypeByTypeID = new Map();
    this._enumTypeByIdentifier = new Map();

    for (const et of this.enumTypes) {
      // Filter by system if strict mapping is needed, but EnumTypes usually exist in both or have specific flags
      // The EnumTypeDef has a 'System' field.
      // If we are strictly in one system, we might only want to index compatible Enums?
      // But "Server" might use "Client" enums and vice versa in some contexts?
      // For safety, we index all, but we could filter.
      // Given the requirement "From EnumID get EnumIdentifier", we assume global visibility or filter by system.
      // Let's index all but maybe prefer system match? For straight ID lookup, ID should be unique within expected range.

      // Map by ID
      this._enumTypeByID.set(et.ID, et);
      this._enumTypeByTypeID.set(et.TypeID, et);
      this._enumTypeByIdentifier.set(et.Identifier, et);

      if (et.Alias) {
        for (const alias of et.Alias) {
          this._enumTypeByIdentifier.set(alias, et);
        }
      }
    }
  }

  // --- Type Conversions ---

  /**
   * Get values of the TypeDef by ID (ServerID or ClientID depending on System)
   */
  getTypeByID(id: number): D.TypeDef | undefined {
    this.ensureTypeMaps();
    return this._typeByID!.get(id);
  }

  /**
   * Get values of the TypeDef by Identifier
   */
  getTypeByIdentifier(identifier: string): D.TypeDef | undefined {
    this.ensureTypeMaps();
    return this._typeByIdentifier!.get(identifier);
  }

  /**
   * Convert a TypeDef (or Type ID) to a structural NodeType
   */
  toNodeType(typeOrId: D.TypeDef | number): NT.NodeType | undefined {
    let typeDef: D.TypeDef | undefined;
    if (typeof typeOrId === "number") {
      typeDef = this.getTypeByID(typeOrId);
    } else {
      typeDef = typeOrId;
    }

    if (!typeDef) return undefined;

    // Parse the structural string from Identifier
    try {
      return NT.parse(typeDef.Identifier);
    } catch (e) {
      console.error(`Failed to parse Identifier '${typeDef.Identifier}' for TypeDef ${typeDef.Identifier}`, e);
      return undefined;
    }
  }

  /**
   * Convert a structural NodeType to a matching TypeDef
   * Finds a TypeDef whose Identifier matches stringified nodeType.
   * 
   * NOTE: This is a lossy conversion for non-atomic types like Dict and Enum,
   * which resolve to their generic counterparts D<Unk,Unk> and E<Unk>.
   */
  toTypeDef(nodeType: NT.NodeType): D.TypeDef | undefined {
    this.ensureTypeMaps();

    // Handle specialized lookups
    switch (nodeType.t) {
      case "l": {
        // List: Try to find L<SpecificItem>
        // Item is guaranteed to be atomic or specialized list itself (recursively)
        // But for toTypeDef we just look up the string structure
        const structure = NT.stringify(nodeType, { empty_struct: true });
        const type = this._typeByStructure!.get(structure);
        if (!type) {
          console.warn(`[TypeEngine] Missing specialized list type: ${structure}`);
          // Fallback to Unk if strictly required, but returning undefined is safer for now
          // Or find 'Unk' type as a last resort? 
          // Assuming Unk type exists with structure "Unk"
          return undefined;
        }
        return type;
      }
      case "d":
        // Dict: Lossy lookup -> D<Unk,Unk>
        return this._typeByStructure!.get("D<Unk,Unk>");
      case "e":
        // Enum: Lossy lookup -> E<Unk>
        return this._typeByStructure!.get("E<Unk>");
      case "s":
        // Struct: Not fully supported, return generic S<...> if exists or warn
        console.warn(`[TypeEngine] Struct resolution not fully supported: ${NT.stringify(nodeType)}`);
        return this._typeByStructure!.get("S<>")!; // Fallback
      default:
        // Basic and others: Direct lookup
        return this._typeByStructure!.get(NT.stringify(nodeType));
    }
  }

  /**
   * Convert a structural NodeType to a full TypeDef with detailed inner types
   */
  toTypeDefFull(nodeType: NT.NodeType): TypeDefFull | undefined {
    const baseType = this.toTypeDef(nodeType);
    if (!baseType) return undefined;

    const fullType: TypeDefFull = { ...baseType };

    switch (nodeType.t) {
      case "l": {
        // List: Resolve item type
        const itemType = this.toTypeDef(nodeType.i);
        if (itemType) {
          fullType.list_type = itemType;
        }
        break;
      }
      case "d": {
        // Dict: Resolve key and value types
        const keyType = this.toTypeDef(nodeType.k);
        const valType = this.toTypeDef(nodeType.v);
        if (keyType && valType) {
          fullType.map_type = [keyType, valType];
        }
        break;
      }
      case "e": {
        // Enum: Resolve EnumTypeDef
        // nodeType.e is the Identifier (FourCC) or string ID
        // We need the EnumTypeDef associated with this Identifier
        // If node.e is "E<ABCD>", then identifier is "ABCD"
        const enumTypeDef = this.getEnumTypeByIdentifier(nodeType.e);
        if (enumTypeDef) {
          fullType.enum_type = enumTypeDef;
        }
        break;
      }
    }

    return fullType;
  }

  /**
   * Get TypeDef for a List of a specific Item Type ID
   */
  getListTypeByID(itemId: number): D.TypeDef | undefined {
    const itemType = this.getTypeByID(itemId);
    if (!itemType) return undefined;

    // Construct the expected structure L<ItemIdentifier>
    // Note: This relies on the item type being atomic or having a simple Identifier name
    const listStructure = `L<${itemType.Identifier}>`;
    return this._typeByStructure!.get(listStructure);
  }

  /**
   * Get TypeDef for a Dict (always generic D<Unk,Unk>)
   * Parameters are provided for API completeness but logic is lossy.
   */
  getDictTypeByID(keyId: number, valueId: number): D.TypeDef | undefined {
    // Dict types are generic in the type system
    return this._typeByStructure!.get("D<Unk,Unk>");
  }

  // --- Type Data Extraction ---

  private _ensureNodeType(nodeType: NT.NodeType | string): NT.NodeType {
    return typeof nodeType === "string" ? NT.parse(nodeType) : nodeType;
  }

  /**
   * Get the primary ID of the type (ServerID or ClientID depending on System)
   * Directly from NodeType or string representation.
   */
  get_type_id(nodeType: NT.NodeType | string): number | undefined {
    const type = this.toTypeDef(this._ensureNodeType(nodeType));
    if (!type) return undefined;
    return (this.system === "Server" ? type.ID : type.ClientID) ?? undefined;
  }

  /**
   * Get the BaseTypeID of the type
   * Directly from NodeType or string representation.
   */
  get_type_base_id(nodeType: NT.NodeType | string): number | undefined {
    const type = this.toTypeDef(this._ensureNodeType(nodeType));
    return type?.BaseTypeID;
  }

  /**
   * Get the ID of the EnumTypeDef
   * Only applicable for Enum nodes (t: "e").
   */
  get_enum_type_id(nodeType: NT.NodeType | string): number | undefined {
    const nt = this._ensureNodeType(nodeType);
    if (nt.t !== "e") return undefined;
    return this.getEnumTypeByIdentifier(nt.e)?.ID;
  }

  /**
   * Get the ID of the item type for a list
   * Only applicable for List nodes (t: "l").
   */
  get_item_id(nodeType: NT.NodeType | string): number | undefined {
    const nt = this._ensureNodeType(nodeType);
    if (nt.t !== "l") return undefined;
    return this.get_type_id(nt.i);
  }

  /**
   * Get the IDs of the key and value types for a dictionary
   * Only applicable for Dict nodes (t: "d").
   */
  get_key_value_id(nodeType: NT.NodeType | string): [number | undefined, number | undefined] | undefined {
    const nt = this._ensureNodeType(nodeType);
    if (nt.t !== "d") return undefined;
    return [this.get_type_id(nt.k), this.get_type_id(nt.v)];
  }

  // --- Enum Conversions ---

  getEnumTypeByID(id: number): D.EnumTypeDef | undefined {
    this.ensureEnumTypeMaps();
    return this._enumTypeByID!.get(id);
  }

  getEnumTypeByTypeID(typeId: number): D.EnumTypeDef | undefined {
    this.ensureEnumTypeMaps();
    return this._enumTypeByTypeID!.get(typeId);
  }

  getEnumTypeByIdentifier(identifier: string): D.EnumTypeDef | undefined {
    this.ensureEnumTypeMaps();
    return this._enumTypeByIdentifier!.get(identifier);
  }

  /**
   * Get EnumIdentifier (FourCC) from EnumID
   */
  getEnumIdentifierFromID(id: number): string | undefined {
    return this.getEnumTypeByID(id)?.Identifier;
  }

  /**
   * Get EnumID from EnumIdentifier (FourCC)
   */
  getEnumIDFromIdentifier(identifier: string): number | undefined {
    return this.getEnumTypeByIdentifier(identifier)?.ID;
  }
}