graph {
  id {
    type_id: Basic
    graph_id: 1073741828
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
          id: 1073741828
        }
        name: "New Node Graph"
        nodes {
          nodeIndex: 16
          shellId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 757
          }
          kernelId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 757
          }
          pins {
            i1 {
              kind: InParam
              index: 3
            }
            i2 {
              kind: InParam
              index: 3
            }
            type: 1
            connects {
              id: 17
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
          }
          x: -267.2
          y: -335.4
        }
        nodes {
          nodeIndex: 17
          shellId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 128
          }
          kernelId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 130
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
                indexOfConcrete: 2
                value {
                  class: ArrayBase
                  itemType {
                    classBase: Server
                    type_server {
                      type: EntityList
                    }
                  }
                  bArray {
                  }
                }
              }
            }
            type: 13
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
                  itemType {
                    classBase: Server
                    type_server {
                      type: Entity
                    }
                  }
                }
              }
            }
            type: 1
          }
          x: -707.2
          y: -3.4
        }
      }
    }
  }
}
filePath: "201176311-1767196784-1073741840-\\1.gia"
gameVersion: "6.2.0"
