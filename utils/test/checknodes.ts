import { NODE_PIN_RECORDS } from "../node_data/node_pin_records.ts";
import { EncodeOptions, Graph, Pin } from "../gia_gen/graph.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { VarBase_Class, type GraphNode, type VarBase } from "../protobuf/gia.proto.ts";
import { get_concrete_index, get_generic_id, get_node_record, get_node_record_generic, is_generic_id } from "../node_data/helpers.ts";
import { get_id, is_reflect, type NodeType, parse, reflect, reflects, type_equal } from "../gia_gen/nodes.ts";
import { get_node_info } from "../gia_gen/extract.ts";
import { assert, assert_equal, assert_unequal } from "./utils.ts";
import { execSync } from "child_process";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
const FILE = PATH + "check_nodes.gia";


function check_val(pin: NodeType, p: VarBase) {
  // 对比值
  if (pin.t === "b") {
    switch (pin.b) {
      case "Int":
        assert_equal(p.bInt?.val, 1);
        break;
      case "Flt":
        assert_equal(p.bFloat?.val, 1.0);
        break;
      case "Bol":
        assert_equal(p.bEnum?.val, 1);
        break;
      case "Str":
        assert_equal(p.bString?.val, '1');
        break;
      case "Vec":
        assert_equal(p.bVector?.val.x, 1.0);
        assert_equal(p.bVector?.val.y, 1.0);
        assert_equal(p.bVector?.val.z, 1.0);
        break;
      case "Gid":
      case "Pfb":
      case "Fct":
      case "Cfg":
        assert_equal(p.bId?.val, 1);
        break;
      case "Ety":
        break;
    }
  }
}

function test_all_nodes(read = false) {

  let nodes: GraphNode[] = null as any, j = 0;
  if (read) {
    nodes = decode_gia_file(FILE).graph.graph?.inner.graph.nodes!;
  }
  const graph = new Graph();
  for (let i = 1; i < 4000; i++) {
    // for (let i = 136; i < 137; i++) {
    if (!read) {
      const node0 = graph.add_node(i);
      node0.setPos(i % 50, i / 50);
      continue;
    }
    // 检查一致性
    const gid = get_generic_id(i);
    if (gid === null) { // only basic node or generic node or not a node
      if (!is_generic_id(i)) {
        // node a node.
        assert_unequal(nodes[j]?.nodeIndex, i); // not exist
        continue;
      }
      const record = get_node_record_generic(i);
      assert(record !== null);
      const node = nodes[j++];
      assert_equal(node.nodeIndex, i); // exist(the same index as define)
      assert_equal(node.genericId.nodeId, i); // same generic id
      if (record.reflectMap === undefined) {
        // TODO: basic node
        assert_equal(node.concreteId.nodeId, i); // same index as define
        let k = 0;
        for (let j = 0; j < record.inputs.length; j++) {
          const pin = parse(record.inputs[j]);
          if (pin.t !== "b" && pin.t !== "e") continue;
          if (pin.t === "e" && (pin.e === 1016 || pin.e === 1028)) continue;
          if (record.inputs[j] === "Unk") continue;
          const p = node.pins[k++];
          assert_equal(p.i1.kind, 3);
          assert_equal(p.i1.index, j);
          assert_equal(p.type, get_id(pin));
          assert_unequal(p.value.class, VarBase_Class.ConcreteBase);

          check_val(pin, p.value);

        }
        assert(node.pins[k] === undefined || node.pins[k].i1.kind === 4); // 再无更多入引脚

        continue;
      }
      // generic node but without concrete node.
      assert_equal(node.concreteId, null); // without concrete id
      continue;
    }
    // reflected concrete node
    const node = nodes[j++];
    const record = get_node_record(i);
    assert(record !== null);
    assert(record.reflectMap !== null);
    assert_equal(node.nodeIndex, i); // exist(the same index as define)
    assert_equal(node.genericId.nodeId, gid);
    assert_equal(node.concreteId?.nodeId, i);
    // 引脚类型
    let k = 0;
    for (let j = 0; j < record.inputs.length; j++) {
      const pin = parse(record.inputs[j]);
      if (is_reflect(pin)) {
        const p = node.pins[k++];
        assert_equal(p.i1.kind, 3);
        assert_equal(p.i1.index, j);
        const ref = reflects(pin, record.reflectMap!.find(x => x[0] === i)![1]);
        assert_equal(p.type, get_id(ref));
        assert_equal(p.value.class, VarBase_Class.ConcreteBase);
        if (gid === 475) { assert_equal(ref.t, "e"); assert_equal(p.value.bConcreteValue!.indexOfConcrete, ref.e); }
        else { assert_equal(p.value.bConcreteValue!.indexOfConcrete, get_concrete_index(gid, 3, j, get_id(ref))); }

        if (ref.t === "l") {
          assert_equal(p.value.bConcreteValue!.value.class, VarBase_Class.ArrayBase);
          assert_equal(p.value.bConcreteValue!.value.itemType?.itemType.type, get_id(ref));
        } else if (ref.t === "d") {
          assert_equal(p.value.bConcreteValue!.value.class, VarBase_Class.MapBase);
          assert_equal(p.value.bConcreteValue!.value.itemType?.itemType.type, get_id(ref));
          assert_equal(p.value.bConcreteValue!.value.itemType?.itemType.kind, 2); //pair
          assert_equal(p.value.bConcreteValue!.value.itemType?.itemType.items?.key, get_id(ref.k)); //pair
          assert_equal(p.value.bConcreteValue!.value.itemType?.itemType.items?.value, get_id(ref.v)); //pair
        }
        check_val(pin, p.value.bConcreteValue!.value);
        continue;
      }
      if (pin.t !== "b" && pin.t !== "e") continue;
      if (pin.t === "e" && (pin.e === 1016 || pin.e === 1028)) continue; // special
      if (record.inputs[j] === "Unk") continue;
      const p = node.pins[k++];
      assert_equal(p.i1.kind, 3);
      assert_equal(p.i1.index, j);
      assert_equal(p.type, get_id(pin));
      assert_unequal(p.value.class, VarBase_Class.ConcreteBase);


      check_val(pin, p.value);
    }
    assert(node.pins[k] === undefined || node.pins[k].i1.kind === 4); // 再无更多入引脚
  }
  if (!read) {
    encode_gia_file(FILE, graph.encode(new EncodeOptions(true)));
  } else {
    console.info("All check Passed!")
  }
}

function get_missing_node(read = false) {
  const missing = get_node_record_generic(50)!;
  missing.id = 3360;

  if (!read) {
    const g = new Graph();
    for (const [_, ref] of missing.reflectMap!) {
      const n = g.add_node(3360);
      const p = new Pin(3360, 4, 0);
      n.pins.push(p);
      const refl = parse(ref as string);
      assert_equal(refl.t, "s");
      p.setType(refl.f[0][1]);
      p.concrete_id = get_concrete_index(50, 4, 0, get_id(refl.f[0][1]));
      console.log(p);
    }
    encode_gia_file(FILE, g.encode());
    return;

  }
  const g = decode_gia_file(FILE).graph.graph?.inner.graph.nodes!;
  assert_equal(g.length, missing.reflectMap!.length);
  for (let i = 0; i < missing.reflectMap!.length; i++) {
    const info = get_node_info(g[i]);
    const refl = parse(missing.reflectMap![i][1] as string);
    assert_equal(refl.t, "s");
    assert_equal(info.generic_id, missing.id);
    assert_equal(info.pins[0].indexOfConcrete, get_concrete_index(50, 4, 0, get_id(refl.f[0][1])));
    assert(type_equal(info.pins[0].node_type, refl.f[0][1]))
    missing.reflectMap![i][0] = info.concrete_id;
  }
  console.dir(missing, { maxArrayLength: null });
}





execSync("cls", { stdio: 'inherit' });
console.time("Time consume");

// 生成全部节点列表
// test_all_nodes();
// 检查全部节点存在性
test_all_nodes(true);

// console.dir(decode_gia_file(PATH + "temp.gia").graph.graph?.inner.graph.nodes.map(n => ({ id: n.concreteId.nodeId, p: n.pins.map(p => p.value.bConcreteValue?.indexOfConcrete) })), { depth: null, maxArrayLength: null });
// console.dir(decode_gia_file(PATH + "temp.gia").graph.graph?.inner.graph.nodes, { depth: null, maxArrayLength: null });
// console.dir(decode_gia_file(FILE).graph.graph?.inner.graph.nodes, { depth: null, maxArrayLength: null });



// encode_gia_file(FILE, g.encode());



console.timeEnd("Time consume");