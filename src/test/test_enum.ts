import { readFileSync, writeFileSync } from "fs";

const get_node = (index: number, node_id: number, classBase: number, val: number, x: number, y: number) =>
  `        nodes {
          node_index: ${index}
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            node_id: 475
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            node_id: ${node_id}
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBaseValue
              contain_any_val: true
              b_nodeValue {
                classBase: ${classBase}
                value {
                  class: EnumBase
                  contain_any_val: true
                  item_type {
                    classBase: 1
                    item_type {
                      type: EnumItem
                    }
                  }
                  b_enum {
                    val: ${val}
                  }
                }
              }
            }
            type: EnumItem
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
              class: ConcreteBaseValue
              contain_any_val: true
              b_nodeValue {
                classBase: ${classBase}
                value {
                  class: EnumBase
                  contain_any_val: true
                  item_type {
                    classBase: 1
                    item_type {
                      type: EnumItem
                    }
                  }
                  b_enum {
                    val: ${val + 1}
                  }
                }
              }
            }
            type: EnumItem
          }
          x: ${x * 300}
          y: ${y * 200}
        }
`;
const searcher = "        }";
const doc = readFileSync("./src/test/enum.gia.cs").toString();
const i = doc.lastIndexOf(searcher) + searcher.length + 1;

const new_node = [];
for (let i = 0; i < 17; i++) {
  new_node.push(get_node(16 + i, 3351, 30, 3100 + i * 2, 8, i));
}

const new_doc = doc.slice(0, i) + new_node + doc.slice(i);

writeFileSync("./temp.cs", new_doc);