graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082130443
  }
  name: "Github Actions CI Test Generated Graph_1"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082130443
        }
        name: "Github Actions CI Test Generated Graph_1"
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
          input {
            xxx: 6
          }
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
          pins {
            i1 {
              kind: ClientExecNode
            }
            i2 {
              kind: ClientExecNode
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
            clientExecNode {
              kind: ClientExecNode
              index: 1
              nodeId {
                id: 200124
              }
            }
          }
          pins {
            i1 {
              kind: ClientExecNode
              index: 1
            }
            i2 {
              kind: ClientExecNode
              index: 1
            }
            value {
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
                val: "Dash"
              }
            }
            type: 9
            clientExecNode {
              kind: 6
              index: 1
            }
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
              index: 4
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Configuration_
                }
              }
              bId {
                val: 10006238
              }
            }
            type: 18
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 1
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 4
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
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: ClientExecNode
            }
            i2 {
              kind: ClientExecNode
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
            clientExecNode {
              kind: ClientExecNode
              index: 1
              nodeId {
                id: 200038
              }
            }
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
              index: 4
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Configuration_
                }
              }
              bId {
                val: 10011063
              }
            }
            type: 18
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 4
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
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: ClientExecNode
            }
            i2 {
              kind: ClientExecNode
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
            clientExecNode {
              kind: ClientExecNode
              index: 1
              nodeId {
                id: 200038
              }
            }
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
              index: 4
            }
            value {
              class: IdBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Configuration_
                }
              }
              bId {
                val: 208
              }
            }
            type: 18
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 1.3
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 4
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
              kind: ClientExecNode
            }
            i2 {
              kind: ClientExecNode
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
            clientExecNode {
              kind: ClientExecNode
              index: 1
              nodeId {
                id: 200038
              }
            }
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
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Entity_
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
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
                val: "GI_AvatarRoot"
              }
            }
            type: 9
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
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Entity_
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  y: 2
                  z: 6
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 90
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 80
                  y: 4
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  y: 1
                }
              }
            }
            type: 11
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
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                }
              }
            }
            type: 11
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
          x: 2104.20557
          y: 1887.4176
        }
      }
    }
  }
}
filePath: "201176311-1766929379-1073741840-\\GeneratedGraphClient2.gia"
gameVersion: "6.2.0"
