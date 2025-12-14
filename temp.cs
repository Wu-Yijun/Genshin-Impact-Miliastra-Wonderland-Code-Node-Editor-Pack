graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082130448
  }
  name: "int"
  which: IntegerFilter
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: IntegerFilter
          kind: NodeGraph
          id: 1082130448
        }
        name: "int"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200000
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
            connects {
              id: 4
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 1000010
              }
            }
            type: 13
          }
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200104
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Integer_
                }
              }
              bInt {
                val: 1
              }
            }
            type: 3
            connects {
              id: 5
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 1000011
              }
            }
            type: 13
          }
          y: 300
        }
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200122
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IntBase
              itemType {
                classBase: Client
                type_client {
                  type: Integer_
                }
              }
              bInt {
              }
            }
            type: 3
            connects {
              id: 5
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 10000011
              }
            }
            type: 13
          }
          y: 600
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200001
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 1
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          x: -381.6
          y: -60.2
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200011
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 30
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 300
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: IntBase
                  itemType {
                    classBase: Client
                    type_client {
                      type: Integer_
                    }
                  }
                  bInt {
                  }
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: IntBase
                  itemType {
                    classBase: Client
                    type_client {
                      type: Integer_
                    }
                  }
                  bInt {
                  }
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: IntBase
                  itemType {
                    classBase: Client
                    type_client {
                      type: Integer_
                    }
                  }
                  bInt {
                  }
                }
              }
            }
            type: 3
          }
          x: -585.6
          y: 367.8
        }
        xxx: 1
        xxxx: 0.3
      }
    }
  }
}
filePath: "201176311-1765730448-1073741840-\\outputs_int.gia"
gameVersion: "6.2.0"
