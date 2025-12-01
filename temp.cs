graph {
  id {
    type: Basic
    id: 1073741839
  }
  name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276"
  type: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1073741839
        }
        name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 3
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 4
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
                indexOfConcrete: 1
                value {
                  class: StringBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: String
                    }
                  }
                  bString {
                    val: "14"
                  }
                }
              }
            }
            type: String
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
                indexOfConcrete: 1
                value {
                  class: ArrayBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: StringList
                    }
                  }
                  bArray {
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "12"
                      }
                    }
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "23"
                      }
                    }
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "43"
                      }
                    }
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "55"
                      }
                    }
                  }
                }
              }
            }
            type: StringList
          }
          x: -228
          y: -204.2
        }
      }
    }
  }
}
filePath: "201176311-1764580498-1073741837-\\GeneratedGraph.gia"
