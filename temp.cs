graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082130433
  }
  name: "New Skill Node Graph"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082130433
        }
        name: "New Skill Node Graph"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200042
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2001
          }
          8 {
            1: 6
          }
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200005
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              bConcreteValue {
                indexOfConcrete: -1
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
              class: ConcreteBase
              bConcreteValue {
                indexOfConcrete: -1
              }
            }
          }
          x: -285.6
          y: -411.4
        }
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200005
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 10
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Client
                    type_client {
                      type: EnumItem_
                    }
                  }
                  bEnum {
                    val: 102
                  }
                }
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
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Client
                    type_client {
                      type: EnumItem_
                    }
                  }
                  bEnum {
                    val: 104
                  }
                }
              }
            }
            type: 13
          }
          x: -29.6
          y: -341
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200005
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 10
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 4
                value {
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Client
                    type_client {
                      type: EnumItem_
                    }
                  }
                  bEnum {
                    val: 500
                  }
                }
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
                indexOfConcrete: 4
                value {
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Client
                    type_client {
                      type: EnumItem_
                    }
                  }
                  bEnum {
                    val: 501
                  }
                }
              }
            }
            type: 13
          }
          x: 460
          y: -340.2
        }
        xxx: 1
      }
    }
  }
}
filePath: "201176311-1766797686-1073741840-\\1.gia"
gameVersion: "6.2.0"
