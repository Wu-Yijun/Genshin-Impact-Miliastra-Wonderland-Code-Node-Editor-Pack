graph {
  id {
    class: Basic
    id: 1073741825
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612737
  }
  name: "New Node Graph"
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1073741825
        }
        name: "New Node Graph"
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612737
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612737
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            type: 6
            connects {
              id: 5
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
            compositePinIndex: 3
          }
          x: -245.6
          y: -267.8
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
            }
            connects {
              id: 3
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: -731.2
          y: -248.6
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 180
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
                indexOfConcrete: 2
                value {
                  class: StringBase
                  itemType {
                    classBase: Server
                    type_server {
                      type: String
                    }
                  }
                  bString {
                  }
                }
              }
            }
            type: 6
          }
          x: -615.2
          y: -17.4
        }
        nodes {
          nodeIndex: 6
          genericId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612737
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612737
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            type: 6
            connects {
              id: 5
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
            compositePinIndex: 3
          }
          x: 236
          y: -155.8
        }
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612737
  }
  relatedIds {
    class: Basic
    id: 1610612737
  }
  name: "Create Composite Node"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612737
          }
          concreteId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612737
          }
          graphId {
            class: UserDefined
            type: BasicNode
            kind: CompositeGraph
            id: 1610612737
          }
        }
        inflows {
          visible: true
          index {
            kind: InFlow
          }
          pinIndex: 1
        }
        outflows {
          visible: true
          index {
            kind: OutFlow
          }
          pinIndex: 2
        }
        inputs {
          name: "String"
          visible: true
          index {
            kind: InParam
          }
          type {
            class: StringBase
            type1: String
            type2: String
          }
          pinIndex: 3
        }
        type {
          kind: Composite
        }
        name: "Create Composite Node"
        description: "AAAAAAAA"
        xxx: 6
      }
    }
  }
}
accessories {
  id {
    class: Basic
    id: 1610612737
  }
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: CompositeGraph
          id: 1610612737
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          x: -249
          y: -210.2
        }
        compositePins {
          outerPin {
            kind: InFlow
          }
          innerNodeId: 4
          innerPin {
            kind: InFlow
          }
          innerPin2 {
            kind: InFlow
          }
        }
        compositePins {
          outerPin {
            kind: OutFlow
          }
          innerNodeId: 4
          innerPin {
            kind: OutFlow
          }
          innerPin2 {
            kind: OutFlow
          }
        }
        compositePins {
          outerPin {
            kind: InParam
          }
          innerNodeId: 4
          innerPin {
            kind: InParam
          }
          innerPin2 {
            kind: InParam
          }
        }
      }
    }
  }
}
filePath: "201176311-1765700859-1073741840-\\22.gia"
gameVersion: "6.2.0"
