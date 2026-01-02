结合文件结构, 推断系统真实的内部逻辑, 分析各个字段的真实含义, 并修改为更合适的名称. 同时, 分析为什么会有NodeGraphWrapper和CompositeDefWrapper这样的包装结构.并结合我新加入的字段以及我们之前的分析, 重新评估 GlobalIdentifier 是什么, 内部三个枚举的含义又是什么.

```

// .gia file root (Genshin Impact Assets)
message Gia {
  // 主要
  Asset          asset        = 1; // graph info
  repeated Asset accessories  = 2; // data_structure, input/output // 与导出的节点图相关联的全部资源, 包括系统生成的节点图(Signal/Structure), 结构体的定义, 信号的定义, 复合节点的内核等等
  string         file_path    = 3; // {UID}-{TIME}-{LEVEL_ID}-\{EXPORT_FILE_NAME}.gia // 或者叫导出信息?
  string         game_version = 5; // 6.2.0 by now
}

message Asset  {
  enum AssetType {
    UNKNOWN_TYPE            = 0; // 未知类型
    PREFAB                  = 1; // 预制体（元件）
    CREATION                = 2; // 造物
    ENTITY                  = 3; // 实体
    TERRAIN                 = 5; // 地形
    PRESET_POINT            = 6; // 预设点
    UNIT_STATUS             = 7; // 单位状态
    SKILL                   = 8; // 技能
    ENTITY_NODE_GRAPH       = 9; // 实体节点图
    BOOLEAN_FILTER_GRAPH    = 10; // 布尔过滤器 (节点图)
    SKILL_NODE_GRAPH        = 11; // 技能节点图
    COMPOSITE_NODE_DECL     = 12; // 复合节点声明 (含监听信号、修改/拆分/拼装结构体)
    CAMERA                  = 13; // 镜头
    SIGNAL_NODE_DECL        = 14; // 信号节点声明 (发送信号、向服务器节点图发送信号)
    UI_CONTROL              = 15; // 交互控件
    SKILL_RESOURCE          = 16; // 技能资源
    PLAYER                  = 18; // 玩家模板
    CHARACTER               = 19; // 角色模板
    INTERFACE_LAYOUT        = 20; // 界面布局
    UI_CONTROL_GROUP        = 21; // 界面控件组
    STATUS_NODE_GRAPH       = 22; // 状态节点图
    CLASS_NODE_GRAPH        = 23; // 职业节点图
    GLOBAL_TIMER            = 24; // 全局计时器
    ITEM                    = 26; // 道具
    DECORATION              = 28; // 装饰物
    STRUCTURE               = 29; // 结构体定义
    SHOP                    = 30; // 商店
    LEVEL_STRUCTURE         = 37; // 关卡结构体定义
    PATH                    = 38; // 路径
    SHIELD                  = 39; // 护盾
    ENTITY_DEPLOYMENT_GROUP = 43; // 实体布设组
    UNIT_TAG                = 44; // 单位标签
    SCAN_TAG                = 45; // 扫描标签
    ITEM_NODE_GRAPH         = 46; // 道具节点图
    INTEGER_FILTER_GRAPH    = 47; // 整数过滤器 (节点图)
    LIGHT_SOURCE            = 48; // 光源
    ENVIRONMENT             = 49; // 环境配置
    // reserved 4, 17, 25, 27, 31 to 36, 40 to 42;
  };

  GlobalIdentifier          id         = 1; // Self id
  repeated GlobalIdentifier relatedIds = 2; // Some related accompanying units(If exist)
  string                    name       = 3; // Node Graph Name
  AssetType                 assetType  = 5; // Enumeration of Node Graph Type

  oneof content {
    NodeGraphWrapper    graph        = 13; // Which is Node Graph
    CompositeDefWrapper compositeDef = 14; // Which is Composite Graph
    StructureDefWrapper structureDef = 22; // Which is Structure Definition

    // EntityDefinition      entity       = 11;
    // Configuration         config       = 15;
    // Terrain               terrain      = 16;
    // Camera                camera       = 17;
    // PresetPoint           point        = 18;
    // UiControlGroup        ui           = 19;
    // GlobalTimer           timer        = 20;
    // UnitTag               unit_tag     = 26;
    // EntityDeploymentGroup deployment   = 27;
  }
}

message NodeGraphWrapper {
  message InnerWrapper { NodeGraph graph = 1; }
  InnerWrapper inner = 1;
}

message CompositeDefWrapper {
  message InnerWrapper { CompositeDef def = 1; }
  InnerWrapper inner = 1;
}


// 通用资源标识符 (原 GlobalIdentifier, NodeProperty 等)
// 这是整个系统中"资源的身份证"
message GlobalIdentifier {
  enum Origin {
    UNKNOWN_CLASS  = 0;
    USER_DEFINED   = 10000; // 用户资产
    SYSTEM_DEFINED = 10001; // 系统内置
  }

  enum Category {
    UNKNOWN_TYPE = 0;

    // 资产类型
    FILTER_NODE_GRAPH     = 1; // Such as boolean filter
    BASIC_NODE_GRAPH      = 5; // Such as graph node
    AFFILIATED_NODE_GRAPH = 23; // Assembly/Split for Structure

    // Server Side Node Types
    SERVER_BASIC  = 20000;
    SERVER_STATUS = 20003;
    SERVER_CLASS  = 20004;
    SERVER_ITEM   = 20005;

    // Client Side Node Types
    CLIENT_FILTER     = 20001; // 筛选器类型(默认 Bool)
    CLIENT_SKILL      = 20002; // 技能节点图流程(客户端)
    CLIENT_INT_FILTER = 20006; // 整数筛选器类型
  }

  enum AssetKind {
    // 资产类型
    BASIC                   = 0; // 服务器节点图, 等一些列未定义的(默认值)
    PREFAB                  = 1; // 预制体（元件）、玩家模板或角色模板
    ENTITY                  = 2; // 实体或造物
    CLIENT_NODE_GRAPH       = 3; // 客户端节点图
    CONFIGURATION           = 4; // 配置信息 (可能有误)
    TERRAIN                 = 5; // 地形
    UI                      = 8; // 界面布局或交互控件
    PRESET_POINT            = 9; // 预设点
    DECORATION              = 14; // 装饰物
    STRUCTURE               = 15; // 结构体
    ENTITY_DEPLOYMENT_GROUP = 18; // 实体布设组
    PATH                    = 19; // 路径
    UNIT_TAG                = 23; // 单位标签

    // 节点图子类型
    CUSTOM_GRAPH    = 21001; // NodeGraph
    COMPOSITE_GRAPH = 21002; // CompositeGraph

    // 节点子类型
    SYS_CALL_STUB  = 22000; // SysCall (Kernel 2000/2001 等)
    GENERATED_STUB = 22001; // SysGraph (Struct/Signal 定义生成的节点)
  }

  Origin    origin   = 1;
  Category  category = 2;
  AssetKind kind     = 3;

  // ====== Optional ======
  int64 guid = 4; // 资源 ID
  int64 id   = 5; // ID
}
```