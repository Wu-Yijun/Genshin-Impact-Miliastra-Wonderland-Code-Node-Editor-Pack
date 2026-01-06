// 节点图接口
import { Graph } from "../../utils/gia_gen/interface.ts";
// 节点定义(调取标识符)(你也可以直接用字符串/id)
import { NODE_NAMES, NODES } from "../../utils/node_data/game_nodes.ts";

import { ResourceClass } from "../../utils/node_data/types.ts";


// ========= 示例代码 ========= //
export function get_graph_server(system: ResourceClass){
  
  // 创建不同类型的节点图
  // const graph = new Graph("ENTITY_NODE_GRAPH");
  // const graph = new Graph("SKILL_NODE_GRAPH");
  const graph = new Graph(system);
  
  // 光标移动到 `.Trigger_Tab_OnTabSelect` 上方会有节点说明与引脚接口定义
  const Trig = graph.add_node(NODES.Trigger_Tab_OnTabSelect)!;
  const Branch1 = graph.add_node(NODES.Control_General_Switch)!;
  const get_val = graph.add_node(NODES.Query_CustomVariable_GetVariable)!; // 鼠标移动到 `Query_CustomVariable_GetVariable` 上方试一试
  // 对于可变类型节点, 设置类型约束
  Branch1.setConstraints("C<T:Int>");
  get_val.setConstraints("C<T:Int>");
  
  // 控制流连线
  graph.flow(Trig, Branch1); // 默认从第零个引脚连接
  // 运算流连接
  graph.connect(Trig, Branch1, "tab_id", "key"); // 可以使用 identifier 指定引脚
  graph.connect(Trig, get_val, 0, 0); // 也可以使用索引
  // 设置引脚值
  Branch1.setVal(1, [1, 2, 3]); // 设置第 1 个引脚的值
  get_val.setVal("var_name", "Plant Level"); // 设置 identifier 为 var_name 的引脚的值
  
  NODES.Control_General_Branch
  // 创建节点: 不同方式的效果相同(推荐使用 NODES.Control_General_Branch )
  const Branch2 = graph.add_node("Control.General.Branch")!; // 使用 identifier (试试打错单词了会怎样?)
  const Branch3 = graph.add_node(NODE_NAMES.Double_Branch)!; // 使用名称
  const Branch4 = graph.add_node(2)!; // 使用 id
  // 创建可变节点: 不同方式的效果相同
  const eq1 = graph.add_node(NODES.Arithmetic_General_Equal)!.setConstraints("C<T:Int>")!;
  const eq2 = graph.add_node(NODES.Arithmetic_General_Equal, "C<T:Int>")!;
  const eq3 = graph.add_node("Arithmetic.General.Equal.C<T:Int>")!;
  // 使用名称比使用序号可读性更强
  graph.flow(Branch1, Branch2, "Case1", "FlowIn");
  graph.flow(Branch1, Branch3, "Case2", "FlowIn");
  graph.flow(Branch1, Branch4, "Case3", "FlowIn"); // graph.connect/graph.flow 需注意先后顺序
  graph.connect(get_val, eq1, 0, 0);
  graph.connect(get_val, eq2, 0, "input1");
  graph.connect(get_val, eq3, "value", "input1");
  // 也可直接将两个节点连接
  eq1.connectPinWith("result", Branch2, "cond"); // 不可以使用索引
  eq2.connectPinWith("result", Branch3, "cond");
  Branch4.connectPinWith("cond", eq3, "result"); // 此方法的先后顺序是无关的, 会自动分析
  // 设置引脚值
  eq1.setVal("input2", 0);
  eq2.setVal("input2", 1);
  eq3.setVal(1, 2);

  // 添加注释
  Branch1.add_comment("Comment Attached to Node");
  graph.add_comment("Comment Not Attached to Node", 600, 100);
  graph.add_comment("Comment2 Also Attached to Node", Trig);
  
  // 添加图变量
  graph.add_graph_var("var1", "L<Int>", [1, 24, 5], true);
  // graph.add_graph_var("var1", "Int", 3, false); // 重复定义的会被跳过
  graph.add_graph_var("var2", "Int", 3, false);


  // 添加更多节点以丰富图内容
  const slf1 = graph.add_node(NODES.Query_EntityRelated_GetSelf)!;
  const loc1 = graph.add_node(NODES.Query_EntityRelated_GetTransform)!;
  const Pfb1 = graph.add_node(NODES.Execution_EntityRelated_CreatePrefab)!;
  const loc2 = graph.add_node(NODES.Query_EntityRelated_GetTransform)!;
  const Pfb2 = graph.add_node(NODES.Execution_EntityRelated_CreatePrefab)!;
  const slf2 = graph.add_node(NODES.Query_EntityRelated_GetSelf)!;
  const Eff1 = graph.add_node(NODES.Execution_SpecialEffect_PlayLoop)!;
  
  graph.flow(Branch2, Pfb1);
  graph.flow(Branch3, Pfb2);
  graph.flow(Branch4, Eff1);
  graph.connect(slf1, loc1, 0, 0);
  graph.connect(loc1, Pfb1, 0, 1);
  graph.connect(loc1, Pfb1, 1, 2);
  graph.connect(slf1, Pfb1, 0, 3);
  graph.connect(slf1, loc2, 0, 0);
  graph.connect(loc2, Pfb2, 0, 1);
  graph.connect(loc2, Pfb2, 1, 2);
  graph.connect(slf1, Pfb2, 0, 3);
  graph.connect(slf2, Eff1, 0, 1);
  Pfb1.setVal("component_id", 1077236130);
  Pfb1.setVal("level", 1);
  Pfb2.setVal("component_id", 1077236131);
  Pfb2.setVal("level", 1);
  Eff1.setVal("effect_asset", 10002107);
  Eff1.setVal('socket_name', "RootNode");
  Eff1.setVal("follow_move", true);
  Eff1.setVal('follow_rotate', true);
  Eff1.setVal("scale", 0.1);
  
  
  const set_val1 = graph.add_node(NODES.Execution_CustomVariable_SetVariable, "C<T:Int>")!;
  const set_val2 = graph.add_node(NODES.Execution_CustomVariable_SetVariable, "C<T:Int>")!;
  graph.flow(Pfb1, set_val1);
  graph.flow(Pfb2, set_val2);
  graph.connect(slf1, set_val1, "self", "target_entity");
  graph.connect(slf1, set_val2, "self", "target_entity");
  set_val1.setVal("variable_name", "Plant Level");
  set_val1.setVal("value", 1);
  set_val1.setVal("should_trigger_event", true);
  set_val2.setVal("variable_name", "Plant Level");
  set_val2.setVal("value", 2);
  set_val2.setVal("should_trigger_event", true);

  return graph;
}