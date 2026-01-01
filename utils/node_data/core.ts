import { readFileSync, statSync } from "fs";
import type * as D from "./types.ts";
import path from "path";

/**
 * TODO: 待实现功能:
 * - 先分析后面两个类的功能
 * - 看看还需要有什么功能, 并规划和实现
 */
export class Document {
  public readonly doc: D.Document;
  private nodes: Nodes | null = null;
  private enums: Enums | null = null;
  get Node(): Nodes {
    return this.nodes ?? (this.nodes = new Nodes(this));
  }
  get Enum(): Enums {
    return this.enums ?? (this.enums = new Enums(this));
  }
  constructor(doc?: Document | D.Document | string) {
    if (doc === undefined) doc = path.join(import.meta.dirname, "data.json");
    if (typeof doc === "string" && statSync(doc).isFile()) doc = readFileSync(doc).toString();
    if (typeof doc === "string") doc = JSON.parse(doc) as D.Document;
    if (doc instanceof Document) doc = doc.doc;
    this.doc = doc;
  }
}

/**
 * TODO: 待实现功能:
 * - 通过 Identifier 获取某个 NodeDef
 * - 通过 ID 获取某个 NodeDef
 * - 通过 Identifier 和 VariantConstraints 获得某个注入后的 NodeDef
 * - ...验证 X Y 的各种关系
 * - 请保证高效性
 */
export class Nodes {
  public readonly nodes: D.NodeDef[];
  constructor(nodes?: Document | Nodes | D.Document | D.NodeDef[] | string) {
    if (nodes === undefined) nodes = path.join(import.meta.dirname, "data.json");
    if (typeof nodes === "string" && statSync(nodes).isFile()) nodes = readFileSync(nodes).toString();
    if (typeof nodes === "string") nodes = (JSON.parse(nodes) as D.Document).Nodes;
    if (nodes instanceof Document) nodes = nodes.doc.Nodes;
    if (nodes instanceof Nodes) nodes = nodes.nodes;
    if ("Nodes" in nodes) nodes = (nodes as D.Document).Nodes;
    this.nodes = nodes;
  }
}

/**
 * TODO: 待实现功能:
 * - 通过 Identifier 获取某个 EnumDef
 * - 通过 ID 获取某个 EnumDef
 * - 通过 Identifier 获取某个 EnumTypeDef
 * - 通过 ID/TypeID 获取某个 EnumTypeDef
 * - 通过 Identifier 获取某个 EnumTypeDef 的 Collection 集合(返回EnumDef列表, 而不是Identifier列表)
 * - 获取某个 EnumDef 所属的 EnumTypeDef[]
 * - 获取某个 EnumDef 所属的 Category
 * - 获取某个 EnumTypeDef 所属的 Category
 * - 获取某个 Category 下所有相关的 EnumTypeDef 
 * - 获取某个 Category 下所有的 EnumDef
 * - ...验证 X Y 的各种关系
 * - 请保证高效性
 */
export class Enums {
  public readonly enums: D.EnumDef[];
  public readonly enumTypes: D.EnumTypeDef[];
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
}