graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082131043
  }
  name: "Github Actions CI Test Generated Graph"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082131043
        }
        name: "Github Actions CI Test Generated Graph"
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
            connects {
              id: 5
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
            connects {
              id: 4
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
            connects {
              id: 2
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: 1208.93225
          y: 201.336075
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200124
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
          }
          x: 2116.92212
          y: 1315.94617
        }
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200038
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: GUID
                }
              }
              bId {
                val: 10006238
              }
            }
            type: 20
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 13
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
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 10
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
              index: 3
            }
            i2 {
              kind: InParam
              index: 3
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Float
                }
              }
              bFloat {
                val: 1
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 4
            }
            i2 {
              kind: InParam
              index: 4
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Integer
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 5
            }
            i2 {
              kind: InParam
              index: 5
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Boolean
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 4
          }
          x: 3011.90625
          y: 1179.42993
          comments {
            content: "Wind vortex"
          }
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200038
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: GUID
                }
              }
              bId {
                val: 10011063
              }
            }
            type: 20
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 6
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
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 12
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
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Float
                }
              }
              bFloat {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 4
            }
            i2 {
              kind: InParam
              index: 4
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Integer
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 5
            }
            i2 {
              kind: InParam
              index: 5
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Boolean
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 4
          }
          x: 2101.78076
          y: 611.070679
          comments {
            content: "sound effect"
          }
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200038
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: GUID
                }
              }
              bId {
                val: 208
              }
            }
            type: 20
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 12
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
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 11
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
              index: 3
            }
            i2 {
              kind: InParam
              index: 3
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Float
                }
              }
              bFloat {
                val: 1.3
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 4
            }
            i2 {
              kind: InParam
              index: 4
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Integer
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 5
            }
            i2 {
              kind: InParam
              index: 5
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Boolean
                }
              }
              bEnum {
              }
            }
            type: 4
          }
          x: 3901.80078
          y: 2027.25061
          comments {
            content: "Wind column"
          }
        }
        nodes {
          nodeIndex: 6
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200047
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 1022
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: GUID
                }
              }
            }
            type: 1
            connects {
              id: 8
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
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: String
                }
              }
              bString {
                val: "GI_AvatarRoot"
              }
            }
            type: 6
          }
          pins {
            i1 {
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 1200.95764
          y: 1177.37256
        }
        nodes {
          nodeIndex: 7
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200031
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 1009
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: GUID
                }
              }
            }
            type: 1
            connects {
              id: 8
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 1202.81604
          y: 2323.09058
        }
        nodes {
          nodeIndex: 8
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200033
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 1013
          }
          pins {
            i1 {
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 1
          }
          x: 305.00531
          y: 1724.09167
        }
        nodes {
          nodeIndex: 9
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200068
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 136
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                  y: 2
                  z: 6
                }
              }
            }
            type: 12
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 7
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 2113.70068
          y: 3049.42114
        }
        nodes {
          nodeIndex: 10
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200068
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 136
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                  x: 90
                }
              }
            }
            type: 12
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 7
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 2116.60889
          y: 2476.5
        }
        nodes {
          nodeIndex: 11
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200068
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 136
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                  x: 80
                  y: 4
                }
              }
            }
            type: 12
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 7
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 3001.14307
          y: 2736.3689
        }
        nodes {
          nodeIndex: 12
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200071
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 34
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
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Server
                    type_server {
                      type: EnumItem
                    }
                  }
                  bEnum {
                  }
                }
              }
            }
            type: 14
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 6
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
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 9
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 3004.86987
          y: 1873.22314
        }
        nodes {
          nodeIndex: 13
          genericId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200071
          }
          concreteId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 34
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
                  class: EnumBase
                  alreadySetVal: true
                  itemType {
                    classBase: Server
                    type_server {
                      type: EnumItem
                    }
                  }
                  bEnum {
                  }
                }
              }
            }
            type: 14
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                  y: 1
                }
              }
            }
            type: 12
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
              }
            }
            type: 12
            connects {
              id: 6
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
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
            }
            type: 12
          }
          x: 2104.20557
          y: 1887.4176
        }
      }
    }
  }
}
filePath: "201861045-1766929338-1082131044-\\github_actions_ci_test_generated_graph"
gameVersion: "6.2.0"
