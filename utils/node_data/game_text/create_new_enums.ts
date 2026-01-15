import { decode_gia_file, encode_gia_file } from "../../protobuf/decode.ts";
import { assertEq } from "../../utils.ts";
import { read_data, save_data } from "../data.helper.ts";

const graph = decode_gia_file(import.meta.dirname + "/enum.gia");
const inputs = graph.dependencies[0].interface_data?.inner.interface.inputs!;
const ip = inputs.pop()!;

const oldData = read_data();


// const added = oldData.EnumTypes.filter(t => t.Collection.find(c => oldData.Enums.find(e => e.Identifier === c) === undefined) !== undefined);

// // console.log(added);
// added.forEach((def, i) => {
//   const p = structuredClone(ip);
//   p.name = def.Identifier + "_" + def.ID;
//   p.type.var_type_shell = def.TypeID as 0;
//   p.type.enum_id!.val = def.ID as 0;
//   p.persistent_pin_uid = i + 1;
//   p.sig.index = i + 1;
//   inputs.push(p);
// });

// encode_gia_file(import.meta.dirname + "/enum_out.gia", graph);

// ============== After manually read the enum id ==============
const enumId: Record<string, number> = {
  "MovementSpeed.WALK": 3601,
  "MovementSpeed.RUN": 3602,
  "TargetEntity.Aggro": 6000,
  "TargetEntity.Self": 6003,
  "TargetEntity.Stage": 6007,
  "RotateDirection.DEFAULT": 6100,
  "RotateDirection.CLOCKWISE": 6101,
  "RotateDirection.COUNTER_CLOCKWISE": 6102,
  "Tactical.STAND": 6200,
  "Tactical.TARGET_POS": 6201,
  "Tactical.TARGET_ENTITY": 6202,
  "Tactical.ROTATE_TO_DIRECTION": 6203,
  "Tactical.ROTATE_BY_ANGLE": 6204,
  "Tactical.PURSUIT": 6205,
  "Tactical.ESCAPE": 6206,
  "Tactical.IDLE": 6207,
  "Tactical.SPAWN_POINT": 6208,
  "Tactical.CONFRONT": 6209,
  "Tactical.PATROL": 6210,
  "Tactical.ROTATE_TO_ENTITY": 6211,
  "Tactical.NODE": 0,
};

oldData.Enums.forEach(e => {
  const id = enumId[e.Identifier];
  if (id) {
    e.ID ||= id;
    assertEq(e.ID, id);
  }
});

save_data(oldData, true);