import { readFileSync, statSync } from "fs";
import type * as D from "./types.ts";
import path from "path";

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

  /** Lazy-loaded Nodes collection */
  get Node(): Nodes {
    return this.nodes ?? (this.nodes = new Nodes(this));
  }

  /** Lazy-loaded Enums collection */
  get Enum(): Enums {
    return this.enums ?? (this.enums = new Enums(this));
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

  constructor(nodes?: Document | Nodes | D.Document | D.NodeDef[] | string) {
    if (nodes === undefined) nodes = path.join(import.meta.dirname, "data.json");
    if (typeof nodes === "string" && statSync(nodes).isFile()) nodes = readFileSync(nodes).toString();
    if (typeof nodes === "string") nodes = (JSON.parse(nodes) as D.Document).Nodes;
    if (nodes instanceof Document) nodes = nodes.doc.Nodes;
    if (nodes instanceof Nodes) nodes = nodes.nodes;
    if ("Nodes" in nodes) nodes = (nodes as D.Document).Nodes;
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

  /**
   * Get a NodeDef by its ID
   * @param id - Node ID
   * @returns NodeDef or undefined if not found
   */
  getByID(id: number): D.NodeDef | undefined {
    return this.ensureIDMap().get(id);
  }

  /**
   * Get a variant-injected NodeDef by Identifier and VariantConstraints
   * @param identifier - Node identifier
   * @param constraints - Variant constraints string (e.g., "T=Int32")
   * @returns A new NodeDef with injected contents applied, or undefined if not found
   */
  getVariant(identifier: string, constraints: string): D.NodeDef | undefined {
    const node = this.getByIdentifier(identifier);
    if (!node || node.Type !== "Variant" || !node.Variants) {
      return undefined;
    }

    // Find matching variant
    const variant = node.Variants.find(v => v.Constraints === constraints);
    if (!variant) {
      return undefined;
    }

    // Clone the node and apply injections
    const injectedNode: D.NodeDef = JSON.parse(JSON.stringify(node));
    injectedNode.KernelID = variant.KernelID;

    // Apply injected contents to pins
    for (const injection of variant.InjectedContents) {
      // Find the pin in DataPins or FlowPins
      const pin = [...injectedNode.DataPins, ...injectedNode.FlowPins].find(
        p => p.Identifier === injection.Identifier
      );

      if (pin) {
        // Apply injections
        if (injection.TypeSelectorIndex !== undefined) {
          // This is for UI purposes, store in Remarks or custom field
          pin.Remarks = (pin.Remarks || "") + ` [TypeSelector:${injection.TypeSelectorIndex}]`;
        }
        if (injection.ShellIndex !== undefined) pin.ShellIndex = injection.ShellIndex;
        if (injection.KernelIndex !== undefined) pin.KernelIndex = injection.KernelIndex;
        if (injection.DefaultValue !== undefined) pin.DefaultValue = injection.DefaultValue;
        if (injection.Visibility !== undefined) pin.Visibility = injection.Visibility;
        if (injection.Connectability !== undefined) pin.Connectability = injection.Connectability;
      }
    }

    return injectedNode;
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