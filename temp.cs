graph {
  id {
    class: Basic
    id: 1073741832
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612743
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612742
  }
  name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276_1"
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1073741832
        }
        name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276_1"
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612743
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612743
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
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
            compositePinIndex: 22
          }
          pins {
            i1 {
              kind: ClientExecNode
            }
            value {
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                }
              }
              bString {
                val: "MySignal"
              }
            }
            clientExecNode {
              kind: 6
              index: 1
            }
            compositePinIndex: 23
          }
          x: -357.6
          y: -237
          9: 1
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612742
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysGraph
            nodeId: 1610612742
          }
          pins {
            i1 {
              kind: ClientExecNode
            }
            value {
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                }
              }
              bString {
                val: "MySignal"
              }
            }
            clientExecNode {
              kind: 6
              index: 1
            }
            compositePinIndex: 19
          }
          x: 126.4
          y: -269
          9: 1
        }
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612743
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612742
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612744
  }
  name: "\347\233\221\345\220\254\344\277\241\345\217\267"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612743
          }
          concreteId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612743
          }
          graphId {
          }
          5: 1
        }
        outflows {
          visible: true
          index {
            kind: OutFlow
          }
          pinIndex: 22
        }
        outputs {
          name: "\344\272\213\344\273\266\346\272\220\345\256\236\344\275\223"
          visible: true
          index {
            kind: OutParam
          }
          type {
            type1: Entity
            type2: Entity
          }
          pinIndex: 24
        }
        outputs {
          name: "\344\272\213\344\273\266\346\272\220GUID"
          visible: true
          index {
            kind: OutParam
            index: 1
          }
          type {
            class: IdBase
            type1: GUID
            type2: GUID
          }
          pinIndex: 25
        }
        outputs {
          name: "\344\277\241\345\217\267\346\235\245\346\272\220\345\256\236\344\275\223"
          visible: true
          index {
            kind: OutParam
            index: 2
          }
          type {
            type1: Entity
            type2: Entity
          }
          pinIndex: 26
        }
        outputs {
          name: "int1"
          visible: true
          index {
            kind: OutParam
            index: 3
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 27
        }
        outputs {
          name: "flt2"
          visible: true
          index {
            kind: OutParam
            index: 4
          }
          type {
            class: FloatBase
            type1: Float
            type2: Float
          }
          pinIndex: 28
        }
        type {
          kind: 1002
          102 {
            1: "MySignal"
            2 {
              1: 10001
              2: 20000
              3: 22001
              5: 1610612742
            }
            3 {
              1: 10001
              2: 20002
              3: 22001
              5: 1610612744
            }
          }
        }
        name: "\347\233\221\345\220\254\344\277\241\345\217\267"
        xxx: 2
        106 {
          1: "\344\277\241\345\217\267\345\220\215"
          4 {
            1: 5
            7 {
              1: 4
            }
          }
          5 {
            1: 6
            2: 1
          }
          8: 23
        }
        204: 8
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612742
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612743
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612744
  }
  name: "\345\217\221\351\200\201\344\277\241\345\217\267"
  which: 14
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612742
          }
          concreteId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612742
          }
          graphId {
          }
          5: 1
        }
        inflows {
          visible: true
          index {
            kind: InFlow
          }
          pinIndex: 17
        }
        outflows {
          visible: true
          index {
            kind: OutFlow
          }
          pinIndex: 18
        }
        inputs {
          name: "int1"
          visible: true
          index {
            kind: InParam
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 20
        }
        inputs {
          name: "flt2"
          visible: true
          index {
            kind: InParam
            index: 1
          }
          type {
            class: FloatBase
            type1: Float
            type2: Float
          }
          pinIndex: 21
        }
        type {
          kind: 1001
          101 {
            1: "MySignal"
            2 {
              1: 10001
              2: 20000
              3: 22001
              5: 1610612743
            }
            3 {
              1: 10001
              2: 20002
              3: 22001
              5: 1610612744
            }
          }
        }
        name: "\345\217\221\351\200\201\344\277\241\345\217\267"
        xxx: 1
        106 {
          1: "\344\277\241\345\217\267\345\220\215"
          4 {
            1: 5
            7 {
              1: 4
            }
          }
          5 {
            1: 6
            2: 1
          }
          8: 19
        }
        204: 8
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612744
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612743
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612742
  }
  name: "\345\220\221\346\234\215\345\212\241\345\231\250\350\212\202\347\202\271\345\233\276\345\217\221\351\200\201\344\277\241\345\217\267"
  which: 14
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: Skills
            kind: SysGraph
            id: 1610612744
          }
          concreteId {
            class: SystemDefined
            type: Skills
            kind: SysCall
            id: 2000
          }
          graphId {
          }
          5: 1
        }
        inflows {
          visible: true
          index {
            kind: InFlow
          }
          pinIndex: 29
        }
        outflows {
          visible: true
          index {
            kind: OutFlow
          }
          pinIndex: 30
        }
        inputs {
          name: "int1"
          visible: true
          index {
            kind: InParam
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 33
        }
        inputs {
          name: "flt2"
          visible: true
          index {
            kind: InParam
            index: 1
          }
          type {
            class: FloatBase
            type1: GUIDList
            type2: GUIDList
          }
          pinIndex: 34
        }
        type {
          kind: 1001
          101 {
            1: "MySignal"
            2 {
              1: 10001
              2: 20000
              3: 22001
              5: 1610612743
            }
            3 {
              1: 10001
              2: 20000
              3: 22001
              5: 1610612742
            }
          }
        }
        name: "\345\220\221\346\234\215\345\212\241\345\231\250\350\212\202\347\202\271\345\233\276\345\217\221\351\200\201\344\277\241\345\217\267"
        xxx: 1
        106 {
          2: 1
          3 {
            1: 5
          }
          4 {
            1: 2
            4: 3
          }
          5 {
            1: 5
            2: 1
            100 {
              1: 200124
            }
          }
          8: 31
        }
        106 {
          1: "\344\277\241\345\217\267\345\220\215"
          2: 1
          3 {
            1: 5
            2: 1
          }
          4 {
            1: 5
            4: 9
            7 {
              1: 4
            }
          }
          5 {
            1: 6
            2: 1
          }
          8: 32
        }
        204: 8
      }
    }
  }
}
filePath: "201176311-1767027021-1073741840-\\1.gia"
gameVersion: "6.2.0"
