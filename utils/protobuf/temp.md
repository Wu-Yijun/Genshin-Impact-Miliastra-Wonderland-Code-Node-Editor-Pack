结合我给出的proto结构, 结合文件实际内容, 推断值系统的真实内部结构和逻辑与机制, 并根据具体含义重新命名.

```proto
enum VarType {
  UnknownVar       = 0;
  Entity           = 1;
  GUID             = 2;
  Integer          = 3;
  Boolean          = 4;
  Float            = 5;
  String           = 6;
  GUIDList         = 7;
  IntegerList      = 8;
  BooleanList      = 9;
  FloatList        = 10;
  StringList       = 11;
  Vector           = 12;
  EntityList       = 13;
  EnumItem         = 14;
  VectorList       = 15;
  LocalVariableRef = 16;
  Faction          = 17;
  EnumList         = 18;
  // reserved 19;
  Configuration       = 20;
  Prefab              = 21;
  ConfigurationList   = 22;
  PrefabList          = 23;
  FactionList         = 24;
  Struct              = 25;
  StructList          = 26;
  Dictionary          = 27;
  VariableSnapshotRef = 28;

  // EnumTypes 10001.....
  // reserved 10000 to 10099;   // server enum types
  // reserved 210000 to 210099; // client enum types
}

enum ClientVarType {
  UnknownVar_        = 0;
  Entity_            = 1; // type: Ety, typeid: 1
  EntityList_        = 2; // type: L<Ety>, typeid: 2
  Integer_           = 3; // type: Int, typeid: 3
  IntegerList_       = 4; // type: L<Int>, typeid: 4
  Boolean_           = 5; // type: Bol, typeid: 5
  BooleanList_       = 6; // type: L<Bol>, typeid: 6
  Float_             = 7; // type: Flt, typeid: 7
  FloatList_         = 8; // type: L<Flt>, typeid: 8
  String_            = 9; // type: Str, typeid: 9
  StringList_        = 10; // type: L<Str>, typeid: 10
  Vector_            = 11; // type: Vec, typeid: 11
  VectorList_        = 12; // type: L<Vec>, typeid: 12
  EnumItem_          = 13; // type: E<Unk>, typeid: 13
  GUID_              = 14; // type: Gid, typeid: 14
  GUIDList_          = 15; // type: L<Gid>, typeid: 15
  Faction_           = 16; // type: Fct, typeid: 16
  EnumList_          = 17; // type: L<E<Unk>>, typeid: 17
  Configuration_     = 18; // type: Cfg, typeid: 18
  Prefab_            = 19; // type: Pfb, typeid: 19
  ConfigurationList_ = 20; // type: L<Cfg>, typeid: 20
}

message VarBase {
  enum Class { // 似乎真实作用是控制 UI 外观输入样式
    Unknown      = 0;
    IdBase       = 1; //
    IntBase      = 2;
    SelectorBase = 3; // (But how to set options?)
    FloatBase    = 4;
    StringBase   = 5;
    EnumBase     = 6;
    VectorBase   = 7;

    TypeSelectorBase = 10000;
    StructBase       = 10001;
    ArrayBase        = 10002;
    MapBase          = 10003;

    MapPair = 10007;
  }
  message ItemType {
    message StructItem { int64 structId = 1; }
    message PairItems {
      VarType        key      = 1; // 客户端没有 Map, 因此是 VarType 不是 int
      VarType        value    = 2;
      optional int64 structId = 3; // only when value is struct
    }
    message ClientType {
      ClientVarType type = 2;
    }
    message ServerType {
      enum Kind {
        Normal = 0;
        Struct = 1;
        Pair   = 2;
      }
      VarType type = 1;
      Kind    kind = 2;
      oneof id {
        StructItem item  = 100;
        PairItems  items = 101;
      }
    }
    enum ClassBase {
      Unknown = 0;
      Server  = 1;
      Client  = 2;
    }
    ClassBase classBase = 1;
    oneof class {
      ServerType type_server = 100;
      ClientType type_client = 101;
    }
  }
  message StructInfo {
    message Inner {
      // 不论是不是同一类型的结构体, 计数器从 1 开始记录(仅对单张图生效)
      // 在同一张图中, 如果有多个结构体值, 会依次记录, 并显示为 (结构体名_index)
      int32 struct_index = 1;
    }
    int32 always_one = 1;
    Inner inner      = 100;
  }

  Class             class             = 1;
  int32             xxx_alreadySetVal = 2; // 是 varint 不是 bool 类型, 但只有 0,1 (原子类型, 且值为空(不包括 0, 空文本框), 这个字段就是 1, 非原子类型始终为 1)
  optional ItemType itemType          = 4;
  // Only Struct contains this field
  optional StructInfo structInfo = 5;

  // decided by class, id = class + 100, except Struct/Array/Map
  oneof baseValues {
    IdBaseValue      bId            = 101;
    IntBaseValue     bInt           = 102;
    FloatBaseValue   bFloat         = 104;
    StringBaseValue  bString        = 105;
    EnumBaseValue    bEnum          = 106;
    VectorBaseValue  bVector        = 107;
    StructBaseValue  bStruct        = 108;
    ArrayBaseValue   bArray         = 109;
    SelectedPinValue bSelectedValue = 110;
    MapPairBaseValue bMapPair       = 111;
    MapBaseValue     bMap           = 112;
  }
}

message IdBaseValue { int32 val = 1; }

message IntBaseValue { int32 val = 1; }

message FloatBaseValue { float val = 1; }

message StringBaseValue { string val = 1; }

message EnumBaseValue { int32 val = 1; } // enum.ts/EnumNode_Value

message VectorBaseValue {
  message Vec {
    float x = 1;
    float y = 2;
    float z = 3;
  }
  Vec val = 1;
}

message StructBaseValue { repeated VarBase items = 1; }

message ArrayBaseValue { repeated VarBase entries = 1; }

message MapBaseValue {
  // map pairs should be of Class MapPair
  repeated VarBase mapPairs = 1;
}

message MapPairBaseValue {
  VarBase key   = 1;
  VarBase value = 2;
}

message SelectedPinValue {
  // index of concrete node types
  // e.g. EnumNode.EnumEqualList
  int32                       typeIndex = 1;
  VarBase                     value     = 2;
  optional ComplexValueStruct structs   = 5;
}

message ComplexValueStruct { // Map KV, Array Item, Struct Item
  message Base { Wrapper wrapper = 1; }
  message Wrapper {
    VarBase.Class class = 1;
    oneof type {
      VarBase.ItemType.StructItem item    = 100;
      VarBase.ItemType.PairItems  mapPair = 102;
    }
  }
  int32 class = 4;
  Base  inner = 100;
}
```

常规引脚的值 (通常复杂类型不能手动设置值, 但是在 blackboard 变量中可以为复杂类型设置值)

```
{
  class: 'StringBase',
  xxx_alreadySetVal: 1,
  itemType: { classBase: 'Server', type_server: { type: 'String' } },
  bString: { val: 'string' }
},
{
  class: 'EnumBase',
  xxx_alreadySetVal: 1,
  itemType: { classBase: 'Server', type_server: { type: 'Boolean' } },
  bEnum: { val: 1 }
},
{
  class: 'IdBase',
  itemType: { classBase: 'Server', type_server: { type: 'Entity' } },
  bId: { } // Entity 不允许设置初值
},
{ // list<Faction>
  class: 'ArrayBase',
  xxx_alreadySetVal: 1,
  itemType: { classBase: 'Server', type_server: { type: 'FactionList' } },
  bArray: {
    entries: [
      {
        class: 'IdBase',
        xxx_alreadySetVal: 1,
        itemType: { classBase: 'Server', type_server: { type: 'Faction' } },
        bId: { val: 1234 }
      },
      {
        class: 'IdBase',
        xxx_alreadySetVal: 1,
        itemType: { classBase: 'Server', type_server: { type: 'Faction' } },
        bId: { val: 5678 }
      }
    ]
  }
},
{ // dict<guid, List<boolean>>
  class: 'MapBase',
  xxx_alreadySetVal: 1,
  itemType: {
    classBase: 'Server',
    type_server: {
      type: 'Dictionary',
      kind: 'Pair',
      items: { key: 'GUID', value: 'BooleanList' }
    }
  },
  bMap: {
    mapPairs: [
      {
        class: 'MapPair',
        xxx_alreadySetVal: 1,
        itemType: {
          classBase: 'Server',
          type_server: {
            type: 'Struct',
            kind: 'Pair',
            items: { key: 'GUID', value: 'BooleanList' }
          }
        },
        bMapPair: {
          key: {
            class: 'IdBase',
            xxx_alreadySetVal: 1,
            itemType: { classBase: 'Server', type_server: { type: 'GUID' } },
            bId: { val: 1 }
          },
          value: {
            class: 'ArrayBase',
            xxx_alreadySetVal: 1,
            itemType: {
              classBase: 'Server',
              type_server: { type: 'BooleanList' }
            },
            bArray: {
              entries: [
                {
                  class: 'EnumBase',
                  itemType: {
                    classBase: 'Server',
                    type_server: { type: 'Boolean' }
                  },
                  bEnum: {}
                },
                {
                  class: 'EnumBase',
                  xxx_alreadySetVal: 1,
                  itemType: {
                    classBase: 'Server',
                    type_server: { type: 'Boolean' }
                  },
                  bEnum: { val: 1 }
                }
              ]
            }
          }
        }
      },
      {
        class: 'MapPair',
        xxx_alreadySetVal: 1,
        itemType: {
          classBase: 'Server',
          type_server: {
            type: 'Struct',
            kind: 'Pair',
            items: { key: 'GUID', value: 'BooleanList' }
          }
        },
        bMapPair: {
          key: {
            class: 'IdBase',
            xxx_alreadySetVal: 1,
            itemType: { classBase: 'Server', type_server: { type: 'GUID' } },
            bId: { val: 2 }
          },
          value: {
            class: 'ArrayBase',
            itemType: {
              classBase: 'Server',
              type_server: { type: 'BooleanList' }
            },
            bArray: {}
          }
        }
      }
    ]
  }
}
```

可变类型引脚的值(bSelectedValue.value 即为正常值结构)
```
{
  class: 'TypeSelectorBase',
  xxx_alreadySetVal: 1,
  bSelectedValue: {
    typeIndex: 0, // 直接决定了 bSelectedValue.value 的类型, 而不是 itemType (Map, struct 还需要同时 itemType 的详细信息)
    value: {
      class: 'IntBase',
      xxx_alreadySetVal: 1,
      itemType: { classBase: 'Server', type_server: { type: 'Integer' } },
      bInt: { val: 1234 }
    }
  }
}
```

结构体的值
```
{
  class: 'StructBase',
  xxx_alreadySetVal: 1,
  itemType: {
    classBase: 'Server',
    type_server: {
      type: 'Struct',
      kind: 'Struct',
      item: { structId: 1077936129n }
    }
  },
  structInfo: { always_one: 1, inner: { struct_index: 1 } },
  bStruct: {
    items: [
      {
        class: 'StringBase',
        xxx_alreadySetVal: 1,
        itemType: {
          classBase: 'Server',
          type_server: { type: 'String' }
        },
        bString: { val: 'str' }
      },
      {
        class: 'ArrayBase',
        xxx_alreadySetVal: 1,
        itemType: {
          classBase: 'Server',
          type_server: { type: 'IntegerList' }
        },
        bArray: {
          entries: [
            {
              class: 'IntBase',
              xxx_alreadySetVal: 1,
              itemType: {
                classBase: 'Server',
                type_server: { type: 'Integer' }
              },
              bInt: { val: 1234 }
            },
            {
              class: 'IntBase',
              itemType: {
                classBase: 'Server',
                type_server: { type: 'Integer' }
              },
              bInt: {}
            }
          ]
        }
      },

    ]
  }
}
```