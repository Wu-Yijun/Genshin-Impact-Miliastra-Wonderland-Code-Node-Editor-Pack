export interface Root {
  /** Index = 1 */
  graph: NodeUnit;
  /** Index = 2 */
  utils: NodeUnit[];
  /** Index = 3 */
  filePath: string;
}
export interface NodeUnit {
  /** Index = 1 */
  id: NodeUnit$Id;
  /** Index = 2 */
  relatedIds: NodeUnit$Id[];
  /** Index = 3 */
  name: string;
  /** Index = 5 */
  type: NodeUnit$Type;
  /** Index = 13
   *
   * One of the field: graphType
   */
  graph?: NodeGraphWrapper;
  /** Index = 14
   *
   * One of the field: graphType
   */
  compositeDef?: CompositeDefWrapper;
  /** Index = 22
   *
   * One of the field: graphType
   */
  structureDef?: StructureDefWrapper;
}
export interface NodeUnit$Id {
  /** Index = 2 */
  type: NodeUnit$Id$Type;
  /** Index = 3 */
  kind?: NodeUnit$Id$NodeType;
  /** Index = 4 */
  id: number;
}
export const NodeUnit$Id$Type = {
  Unknown1: 0,
  Node: 1,
  Basic: 5,
  AffiliatedNode: 23,
} as const;
export type NodeUnit$Id$Type = (typeof NodeUnit$Id$Type)[keyof typeof NodeUnit$Id$Type];
export const NodeUnit$Id$NodeType = {
  Unknown2: 0,
  ClientGraph: 3,
  StructureDefinition: 15,
} as const;
export type NodeUnit$Id$NodeType = (typeof NodeUnit$Id$NodeType)[keyof typeof NodeUnit$Id$NodeType];
export const NodeUnit$Type = {
  Unknown: 0,
  EntityNode: 9,
  BooleanFilter: 10,
  Skills: 11,
  CompositeGraph: 12,
  StatusNode: 22,
  ClassNode: 23,
  StructureDefinition: 29,
  ItemNode: 46,
  IntegerFilter: 47,
} as const;
export type NodeUnit$Type = (typeof NodeUnit$Type)[keyof typeof NodeUnit$Type];
export interface NodeGraphWrapper {
  /** Index = 1 */
  inner: NodeGraphWrapper$InnerWrapper;
}
export interface NodeGraphWrapper$InnerWrapper {
  /** Index = 1 */
  graph: NodeGraph;
}
export interface CompositeDefWrapper {
  /** Index = 1 */
  inner: CompositeDefWrapper$InnerWrapper;
}
export interface CompositeDefWrapper$InnerWrapper {
  /** Index = 1 */
  def: CompositeDef;
}
export interface CompositeDef {
  /** Index = 4 */
  id: CompositeDef$Id;
  /** Index = 100 */
  inflows: CompositeDef$ControlFlow[];
  /** Index = 101 */
  outflows: CompositeDef$ControlFlow[];
  /** Index = 102 */
  inputs: CompositeDef$ParameterFlow[];
  /** Index = 103 */
  outputs: CompositeDef$ParameterFlow[];
  /** Index = 107 */
  type: CompositeDef$Type;
  /** Index = 200 */
  name: string;
  /** Index = 201 */
  description: string;
}
export interface CompositeDef$Id {
  /** Index = 1 */
  genericId: NodeGraph$Id;
  /** Index = 2 */
  concreteId: NodeGraph$Id;
  /** Index = 4 */
  graphId: NodeGraph$Id;
}
export interface CompositeDef$ParameterFlow {
  /** Index = 1 */
  name: string;
  /** Index = 2 */
  visible: boolean;
  /** Index = 3 */
  index: NodePin$Index;
  /** Index = 4 */
  type: CompositeDef$ParameterFlow$Type;
  /** Index = 8 */
  pinIndex: number;
}
export interface CompositeDef$ParameterFlow$Type {
  /** Index = 1 */
  class: VarBase$Class;
  /** Index = 3 */
  type1: VarType;
  /** Index = 4 */
  type2: VarType;
  /** Index = 105
   *
   * One of the field: type
   */
  mapType?: CompositeDef$ParameterFlow$Type$MapType;
  /** Index = 104 */
  valueId: CompositeDef$ParameterFlow$Type$ID;
}
export interface CompositeDef$ParameterFlow$Type$MapType {
  /** Index = 3 */
  key: VarType;
  /** Index = 4 */
  value: VarType;
}
export interface CompositeDef$ParameterFlow$Type$ID {
  /** Index = 2 */
  id: number;
}
export interface CompositeDef$ControlFlow {
  /** Index = 1 */
  name: string;
  /** Index = 2 */
  visible: boolean;
  /** Index = 3 */
  index: NodePin$Index;
  /** Index = 4 */
  description: string;
  /** Index = 8 */
  pinIndex: number;
}
export interface CompositeDef$Type {
  /** Index = 1 */
  kind: CompositeDef$Type$Kind;
  /** Index = 104
   *
   * One of the field: parent
   */
  assemble?: CompositeDef$Type$Id;
  /** Index = 105
   *
   * One of the field: parent
   */
  split?: CompositeDef$Type$Id;
  /** Index = 106
   *
   * One of the field: parent
   */
  modify?: CompositeDef$Type$Id;
}
export const CompositeDef$Type$Kind = {
  Unknown: 0,
  Composite: 1000,
  Assemble: 1003,
  Split: 1004,
  Modify: 1005,
} as const;
export type CompositeDef$Type$Kind = (typeof CompositeDef$Type$Kind)[keyof typeof CompositeDef$Type$Kind];
export interface CompositeDef$Type$Id {
  /** Index = 1 */
  id: number;
}
export interface NodeGraph {
  /** Index = 1 */
  id: NodeGraph$Id;
  /** Index = 2 */
  name: string;
  /** Index = 3 */
  nodes: GraphNode[];
  /** Index = 4 */
  compositePins: CompositePin[];
  /** Index = 6 */
  graphValues: GraphVariable[];
  /** Index = 7 */
  affiliations: GraphAffiliation[];
}
export interface NodeGraph$Id {
  /** Index = 1 */
  class: NodeGraph$Id$Class;
  /** Index = 2 */
  type: NodeGraph$Id$Type;
  /** Index = 3 */
  kind: NodeGraph$Id$Kind;
  /** Index = 5 */
  id: number;
}
export const NodeGraph$Id$Class = {
  Unknown1: 0,
  UserDefined: 10000,
  SystemDefined: 10001,
} as const;
export type NodeGraph$Id$Class = (typeof NodeGraph$Id$Class)[keyof typeof NodeGraph$Id$Class];
export const NodeGraph$Id$Type = {
  Unknown2: 0,
  BasicNode: 20000,
  BooleanFilter: 20001,
  Skills: 20002,
  StatusNode: 20003,
  ClassNode: 20004,
  ItemNode: 20005,
  IntegerFilter: 20006,
} as const;
export type NodeGraph$Id$Type = (typeof NodeGraph$Id$Type)[keyof typeof NodeGraph$Id$Type];
export const NodeGraph$Id$Kind = {
  Unknown3: 0,
  NodeGraph: 21001,
  CompositeGraph: 21002,
  SysCall: 22000,
  SysGraph: 22001,
} as const;
export type NodeGraph$Id$Kind = (typeof NodeGraph$Id$Kind)[keyof typeof NodeGraph$Id$Kind];
export interface GraphAffiliation {
  /** Index = 1 */
  info: GraphAffiliation$Info;
  /** Index = 2 */
  type: GraphAffiliation$Type;
}
export interface GraphAffiliation$Info {
  /** Index = 1 */
  source: NodeGraph$Id;
  /** Index = 2 */
  typeXxx: number;
  /** Index = 3 */
  alwaysOneXxxx: number;
  /** Index = 100
   *
   * One of the field: extend
   */
  structId?: VarBase$ItemType$StructItem;
}
export interface GraphAffiliation$Type {
  /** Index = 1 */
  type: number;
}
export interface StructureDefWrapper {
  /** Index = 1 */
  def: StructureDefWrapper$StructureDef;
}
export interface StructureDefWrapper$StructureDef {
  /** Index = 1 */
  genericField: StructureDefWrapper$Field;
  /** Index = 2 */
  connectField: StructureDefWrapper$Field;
  /** Index = 3 */
  index: number;
  /** Index = 4 */
  itemCount: number;
}
export interface StructureDefWrapper$Field {
  /** Index = 1 */
  id: number;
  /** Index = 3 */
  vars: StructureDefWrapper$VarDef[];
  /** Index = 501 */
  structName: string;
  /** Index = 502 */
  classBase: number;
  /** Index = 503 */
  index: number;
}
export interface StructureDefWrapper$VarDef {
  /** Index = 1 */
  id: StructureDefWrapper$VarDef$Id;
  /** Index = 3 */
  def: StructureDefWrapper$VarDef$Content;
  /** Index = 5 */
  name: string;
  /** Index = 501 */
  name2: string;
  /** Index = 502 */
  type: VarType;
  /** Index = 503 */
  index: number;
}
export interface StructureDefWrapper$VarDef$SubType {
  /** Index = 1 */
  xxx: number;
  /** Index = 2 */
  xxxx: number;
  /** Index = 502 */
  key: VarType;
  /** Index = 503 */
  value: VarType;
  /** Index = 504 */
  valueId: number;
}
export interface StructureDefWrapper$VarDef$Id {
  /** Index = 1 */
  type: VarType;
  /** Index = 2 */
  sub: StructureDefWrapper$VarDef$SubType;
}
export interface StructureDefWrapper$VarDef$Content {
  /** Index = 1 */
  type: VarType;
  /** Index = 2 */
  sub: StructureDefWrapper$VarDef$SubType;
  /** Index = 13
   *
   * One of the field: val
   */
  intVal?: IntBaseValue;
  /** Index = 14
   *
   * One of the field: val
   */
  boolVal?: EnumBaseValue;
  /** Index = 16
   *
   * One of the field: val
   */
  strVal?: StringBaseValue;
}
export const VarType = {
  UnknownVar: 0,
  Entity: 1,
  GUID: 2,
  Integer: 3,
  Boolean: 4,
  Float: 5,
  String: 6,
  GUIDList: 7,
  IntegerList: 8,
  BooleanList: 9,
  FloatList: 10,
  StringList: 11,
  Vector: 12,
  EntityList: 13,
  EnumItem: 14,
  VectorList: 15,
  Faction: 17,
  Configuration: 20,
  Prefab: 21,
  ConfigurationList: 22,
  PrefabList: 23,
  FactionList: 24,
  Struct: 25,
  StructList: 26,
  Dictionary: 27,
} as const;
export type VarType = (typeof VarType)[keyof typeof VarType];
export interface GraphVariable {
  /** Index = 2 */
  name: string;
  /** Index = 3 */
  type: VarType;
  /** Index = 4 */
  values: VarBase;
  /** Index = 5 */
  exposed: boolean;
  /** Index = 6 */
  structId: number;
  /** Index = 7 */
  keyType: VarType;
  /** Index = 8 */
  valueType: VarType;
}
export interface VarBase {
  /** Index = 1 */
  class: VarBase$Class;
  /** Index = 2 */
  alreadySetVal: boolean;
  /** Index = 4 */
  itemType?: VarBase$ItemType;
  /** Index = 5 */
  structInfo?: VarBase$StructInfo;
  /** Index = 101
   *
   * One of the field: baseValues
   */
  bId?: IdBaseValue;
  /** Index = 102
   *
   * One of the field: baseValues
   */
  bInt?: IntBaseValue;
  /** Index = 104
   *
   * One of the field: baseValues
   */
  bFloat?: FloatBaseValue;
  /** Index = 105
   *
   * One of the field: baseValues
   */
  bString?: StringBaseValue;
  /** Index = 106
   *
   * One of the field: baseValues
   */
  bEnum?: EnumBaseValue;
  /** Index = 107
   *
   * One of the field: baseValues
   */
  bVector?: VectorBaseValue;
  /** Index = 108
   *
   * One of the field: baseValues
   */
  bStruct?: StructBaseValue;
  /** Index = 109
   *
   * One of the field: baseValues
   */
  bArray?: ArrayBaseValue;
  /** Index = 110
   *
   * One of the field: baseValues
   */
  bNodeValue?: NodeValueBaseValue;
  /** Index = 111
   *
   * One of the field: baseValues
   */
  bMapPair?: MapPairBaseValue;
  /** Index = 112
   *
   * One of the field: baseValues
   */
  bMap?: MapBaseValue;
}
export const VarBase$Class = {
  Unknown: 0,
  IdBase: 1,
  IntBase: 2,
  FloatBase: 4,
  StringBase: 5,
  EnumBase: 6,
  VectorBase: 7,
  NodeValueBase: 10000,
  StructBase: 10001,
  ArrayBase: 10002,
  MapBase: 10003,
  MapPair: 10007,
} as const;
export type VarBase$Class = (typeof VarBase$Class)[keyof typeof VarBase$Class];
export interface VarBase$ItemType {
  /** Index = 1 */
  classBase: number;
  /** Index = 100 */
  itemType: VarBase$ItemType$Inner;
}
export interface VarBase$ItemType$StructItem {
  /** Index = 1 */
  structId: number;
}
export interface VarBase$ItemType$Inner {
  /** Index = 1 */
  type: VarType;
  /** Index = 2 */
  kind: VarBase$ItemType$Inner$Kind;
  /** Index = 100
   *
   * One of the field: id
   */
  item?: VarBase$ItemType$StructItem;
  /** Index = 101
   *
   * One of the field: id
   */
  items?: VarBase$ItemType$Inner$PairItems;
}
export const VarBase$ItemType$Inner$Kind = {
  Normal: 0,
  Struct: 1,
  Pair: 2,
} as const;
export type VarBase$ItemType$Inner$Kind = (typeof VarBase$ItemType$Inner$Kind)[keyof typeof VarBase$ItemType$Inner$Kind];
export interface VarBase$ItemType$Inner$PairItems {
  /** Index = 1 */
  key: VarType;
  /** Index = 2 */
  value: VarType;
  /** Index = 3 */
  structId: number;
}
export interface VarBase$StructInfo {
  /** Index = 1 */
  xxx: number;
  /** Index = 100 */
  inner: VarBase$StructInfo$Inner;
}
export interface VarBase$StructInfo$Inner {
  /** Index = 1 */
  xxx: number;
}
export interface IdBaseValue {
  /** Index = 1 */
  val: number;
}
export interface IntBaseValue {
  /** Index = 1 */
  val: number;
}
export interface FloatBaseValue {
  /** Index = 1 */
  val: number;
}
export interface StringBaseValue {
  /** Index = 1 */
  val: string;
}
export interface EnumBaseValue {
  /** Index = 1 */
  val: number;
}
export interface VectorBaseValue {
  /** Index = 1 */
  val: VectorBaseValue$Vec;
}
export interface VectorBaseValue$Vec {
  /** Index = 1 */
  x: number;
  /** Index = 2 */
  y: number;
  /** Index = 3 */
  z: number;
}
export interface StructBaseValue {
  /** Index = 1 */
  items: VarBase[];
}
export interface ArrayBaseValue {
  /** Index = 1 */
  entries: VarBase[];
}
export interface MapBaseValue {
  /** Index = 1 */
  mapPairs: VarBase[];
}
export interface MapPairBaseValue {
  /** Index = 1 */
  key: VarBase;
  /** Index = 2 */
  value: VarBase;
}
export interface NodeValueBaseValue {
  /** Index = 1 */
  classBase: number;
  /** Index = 2 */
  value: VarBase;
  /** Index = 5 */
  wrapper?: NodeValueBaseValue$Wrapper;
}
export interface NodeValueBaseValue$Wrapper {
  /** Index = 4 */
  classBase: number;
  /** Index = 100 */
  inner: NodeValueBaseValue$Wrapper$Inner;
}
export interface NodeValueBaseValue$Wrapper$Inner {
  /** Index = 1 */
  wrapper: NodeValueBaseValue$Wrapper$Inner$Wrapper;
}
export interface NodeValueBaseValue$Wrapper$Inner$Wrapper {
  /** Index = 1 */
  class: VarBase$Class;
  /** Index = 100
   *
   * One of the field: type
   */
  item?: VarBase$ItemType$StructItem;
}
export interface GraphNode {
  /** Index = 1 */
  nodeIndex: number;
  /** Index = 2 */
  genericId: NodeProperty;
  /** Index = 3 */
  concreteId: NodeProperty;
  /** Index = 4 */
  pins: NodePin[];
  /** Index = 5 */
  x: number;
  /** Index = 6 */
  y: number;
  /** Index = 10 */
  usingStruct: GraphAffiliation$Info[];
}
export interface NodeProperty {
  /** Index = 1 */
  class: NodeGraph$Id$Class;
  /** Index = 2 */
  type: NodeProperty$Type;
  /** Index = 3 */
  kind: NodeGraph$Id$Kind;
  /** Index = 5 */
  nodeId: number;
}
export const NodeProperty$Type = {
  Unknown: 0,
  Server: 20000,
  Client: 20002,
} as const;
export type NodeProperty$Type = (typeof NodeProperty$Type)[keyof typeof NodeProperty$Type];
export interface NodePin {
  /** Index = 1 */
  i1: NodePin$Index;
  /** Index = 2 */
  i2: NodePin$Index;
  /** Index = 3 */
  value: VarBase;
  /** Index = 4 */
  type: VarType;
  /** Index = 5 */
  connects: NodeConnection[];
}
export interface NodePin$Index {
  /** Index = 1 */
  kind: NodePin$Index$Kind;
  /** Index = 2 */
  index: number;
}
export const NodePin$Index$Kind = {
  Unknown: 0,
  InFlow: 1,
  OutFlow: 2,
  InParam: 3,
  OutParam: 4,
} as const;
export type NodePin$Index$Kind = (typeof NodePin$Index$Kind)[keyof typeof NodePin$Index$Kind];
export interface NodeConnection {
  /** Index = 1 */
  id: number;
  /** Index = 2 */
  connect: NodePin$Index;
  /** Index = 3 */
  connect2: NodePin$Index;
}
export interface CompositePin {
  /** Index = 1 */
  outerPin: NodePin$Index;
  /** Index = 2 */
  innerNodeId: number;
  /** Index = 3 */
  innerPin: NodePin$Index;
  /** Index = 4 */
  innerPin2: NodePin$Index;
}
