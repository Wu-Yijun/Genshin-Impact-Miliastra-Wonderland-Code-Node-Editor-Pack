

export const BasicTypes = [
  "Int",
  "Flt",
  "Bol",
  "Str",
  "Vec",
  "Gid",
  "Ety",
  "Pfb",
  "Fct",
  "Cfg",
] as const;
export type BasicTypes = typeof BasicTypes[number];


type EnumId = number;
export type NodeType = {
  /** Type = Basic Types */
  t: "b";
  /** Basic Types */
  b: BasicTypes;
} | {
  /** Type = Basic Enums, or some unique vars */
  t: "e";
  /** Enum Id */
  e: EnumId;
} | {
  /** Type = List */
  t: "l";
  /** item = NodeType*/
  i: NodeType;
} | {
  /** Type = Struct, or reflect src map */
  t: "s";
  /** fields = [name, NodeType][] */
  f: [string, NodeType][];
} | {
  /** Type = Dict */
  t: "d";
  /** Key = NodeType */
  k: NodeType;
  /** Value = NodeType */
  v: NodeType;
} | {
  /** Type = Reflect */
  t: "r";
  /** Reflect Name = string */
  r: string;
};

export const UNK_TYPE: NodeType = { t: "b", b: "Unk" as BasicTypes } as const;

/**
 * 将 NodeType（或字符串形式的类型表达式）转为可读字符串。
 * 用于序列化类型结构，例如：S<a:Int,b:L<Str>>
 */
export function stringify(node: NodeType | string): string;
/**
 * 将字符串形式的类型表达式解析为 NodeType。
 * 支持 L<>, D<,>, S< : >, R<>, E<> 等表达式。
 * 会在语法非法时抛出异常。
 */
export function parse(src: string): NodeType;
/**
 * 在给定类型中执行一次单一反射替换。
 * 若遇到 R<refName>，则替换为对应节点结构。
 * 其他节点类型将递归替换。
 */
export function reflects(type: NodeType, ref: [string, NodeType]): NodeType;
/**
 * 对类型执行一次或多次 reflect() 替换。
 * type 与 refs 允许为字符串（自动 parse）。
 * allow_undefined=true 时允许输入 undefined。
 */
export function reflects(type: NodeType | string,refs: [string, NodeType][] | string): NodeType;
/**
 * 判断某个 NodeType 是否包含反射节点（R<...>）。
 */
export function is_reflect(type: NodeType | string | undefined): boolean;
export function get_id(type: NodeType|string):number;
export function get_type(id:number):NodeType;
export function get_id_client(type: NodeType|string):number;
export function get_type_client(id:number):NodeType;
// .......



composite 定义分为两个部分: 外壳定义与内部结构定义.
外壳定义非常简单: 有哪些引脚, 是什么类型, 有什么名字, 并分配一个全局的 composite pin id (从1开始)
内部结构定义包含基本的图结构, 并单独保存了对外的引脚列表(compositePins), 每一项均包含这些信息: 连接到了哪一个外壳引脚(组别和index), 内部连接的是哪个节点的哪个引脚(nodeIndex + pinType/Index of Shell and Kernel)


外壳定义非常简单: 有哪些引脚, 是什么类型, 有什么名字, 并分配一个全局的 composite pin id (从1开始) **可以用来导出枚举的id和类型扩展**
结构不能说很差吧, 反正不好.