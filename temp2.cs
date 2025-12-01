graph {
  id {
    type: Basic
    id: 1028520892
  }
  name: "Branch"
  type: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1028520892
        }
        name: "Branch"
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
          x: 1.10094059
          y: 3.45784545
        }
      }
    }
  }
}
filePath: "201866411-1764582041-1028520893-\\branch"
