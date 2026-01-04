// ==================================================================
// AUTO-GENERATED FILE. DO NOT EDIT.
// ==================================================================

export const NODES = {
  /**
 * **Print String** `(Execution.Common_Node.Print)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Str` || `text` || 字符串 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CommonNode_Print: "Execution.Common_Node.Print",

  /**
 * **Double Branch** `(Control.General.Branch)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **2** || 🖥️ Server || 🔀 Control || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Bol` || `Condition` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `True` || Yes |
 * | - || ⏩ || - || `False` || No |
 */
  Control_General_Branch: "Control.General.Branch",

  /**
 * **Multiple Branches** `(Control.General.Switch)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **3** || 🖥️ Server || 🔀 Control || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`R<T>`** || `Statement` ||  |
 * | 1 || 🔷 || **`L<R<T>>`** || `CasesList` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `DefaultBranch` || Default |
 * | - || ⏩ || - || `Case1` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case2` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case3` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case4` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case5` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case6` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case7` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case8` ||  : Visibility Depends on the length of CasesList |
 * | - || ⏩ || - || `Case9` ||  : Visibility Depends on the length of CasesList |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 */
  Control_General_Switch: "Control.General.Switch",

  /**
 * **Finite Loop** `(Execution.Common_Node.For_Loop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **5** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `Start` ||  |
 * | - || ▶️ || - || `Break` || Break Loop |
 * | 0 || 🔹 || `Int` || `start_index` || 循环起始值 |
 * | 1 || 🔹 || `Int` || `end_index` || 循环终止值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `Iteration` || Loop Body |
 * | - || ⏩ || - || `End` || Loop Complete |
 * | 0 || 🔸 || `Int` || `current_index` || 当前循环值 |
 */
  Execution_CommonNode_ForLoop: "Execution.Common_Node.For_Loop",

  /**
 * **Break Loop** `(Execution.Common_Node.Break)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **6** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CommonNode_Break: "Execution.Common_Node.Break",

  /**
 * **Get Random Floating Point Number** `(Query.Math.Random_Float)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **7** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `lower` || 下限 |
 * | 1 || 🔹 || `Flt` || `upper` || 上限 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Query_Math_RandomFloat: "Query.Math.Random_Float",

  /**
 * **Weighted Random** `(Query.Math.Weighted_Random)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **8** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `L<Int>` || `weights` || 权重列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `index` || 权重序号 |
 */
  Query_Math_WeightedRandom: "Query.Math.Weighted_Random",

  /**
 * **Split 3D Vector** `(Arithmetic.Math.Split_Vector)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **9** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `x` || X分量 |
 * | 1 || 🔸 || `Flt` || `y` || Y分量 |
 * | 2 || 🔸 || `Flt` || `z` || Z分量 |
 */
  Arithmetic_Math_SplitVector: "Arithmetic.Math.Split_Vector",

  /**
 * **3D Vector Addition** `(Arithmetic.Math.Vector_Add)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **10** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `a` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `b` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorAdd: "Arithmetic.Math.Vector_Add",

  /**
 * **3D Vector Subtraction** `(Arithmetic.Math.Vector_Subtract)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **11** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `a` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `b` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorSubtract: "Arithmetic.Math.Vector_Subtract",

  /**
 * **3D Vector Zoom** `(Arithmetic.Math.Vector_Scale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **12** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `v` || 三维向量 |
 * | 1 || 🔹 || `Flt` || `scale` || 缩放倍率 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorScale: "Arithmetic.Math.Vector_Scale",

  /**
 * **3D Vector Angle** `(Arithmetic.Math.Vector_Angle)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **13** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `a` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `b` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 夹角(弧度) |
 */
  Arithmetic_Math_VectorAngle: "Arithmetic.Math.Vector_Angle",

  /**
 * **Equal** `(Arithmetic.General.Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **14** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input1` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `input2` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:Vec>`
 * * `C<T:Fct>`
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Bol>`
 */
  Arithmetic_General_Equal: "Arithmetic.General.Equal",

  /**
 * **Get Local Variable** `(Query.General.Get_Local)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **18** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `initial_value` || 初始值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Loc` || `local_variable` || 局部变量 |
 * | 1 || 🔶 || **`R<T>`** || `value` || 值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 */
  Query_General_GetLocal: "Query.General.Get_Local",

  /**
 * **Set Local Variable** `(Execution.Common_Node.Set_Local)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **19** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Loc` || `variable` || 局部变量 |
 * | 1 || 🔷 || **`R<T>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 */
  Execution_CommonNode_SetLocal: "Execution.Common_Node.Set_Local",

  /**
 * **Set Custom Variable** `(Execution.Custom_Variable.Set_Variable)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **22** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `variable_name` || 变量名 |
 * | 2 || 🔷 || **`R<T>`** || `value` || 变量值 |
 * | 3 || 🔹 || `Bol` || `should_trigger_event` || 是否触发事件 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Execution_CustomVariable_SetVariable: "Execution.Custom_Variable.Set_Variable",

  /**
 * **When Custom Variable Changes** `(Trigger.Custom_Variable.On_Variable_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **36** || 🖥️ Server || ⚡ Trigger || 🧩Variant |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Str` || `variable_name` || 变量名 |
 * | 3 || 🔶 || **`R<T>`** || `old_value` || 变化前值 |
 * | 4 || 🔶 || **`R<T>`** || `new_value` || 变化后值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Trigger_CustomVariable_OnVariableChange: "Trigger.Custom_Variable.On_Variable_Change",

  /**
 * **Get Custom Variable** `(Query.Custom_Variable.Get_Variable)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **50** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `var_name` || 变量名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 变量值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Query_CustomVariable_GetVariable: "Query.Custom_Variable.Get_Variable",

  /**
 * **Set Preset Status** `(Execution.Preset_Status.Set_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **66** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `preset_index` || 预设状态索引 |
 * | 2 || 🔹 || `Int` || `preset_value` || 预设状态值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_PresetStatus_SetStatus: "Execution.Preset_Status.Set_Status",

  /**
 * **When Preset Status Changes** `(Trigger.Preset_Status.On_Status_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **67** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Int` || `preset_index` || 预设状态索引 |
 * | 3 || 🔸 || `Int` || `old_value` || 变化前值 |
 * | 4 || 🔸 || `Int` || `new_value` || 变化后值 |
 */
  Trigger_PresetStatus_OnStatusChange: "Trigger.Preset_Status.On_Status_Change",

  /**
 * **Get Preset Status** `(Query.Preset_Status.Get_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **68** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `preset_index` || 预设状态索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `preset_value` || 预设状态值 |
 */
  Query_PresetStatus_GetStatus: "Query.Preset_Status.Get_Status",

  /**
 * **Destroy Entity** `(Execution.Entity_Related.Destroy_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **69** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_EntityRelated_DestroyEntity: "Execution.Entity_Related.Destroy_Entity",

  /**
 * **Create Entity** `(Execution.Entity_Related.Create_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **70** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Gid` || `guid` || 目标GUID |
 * | 1 || 🔹 || `L<Int>` || `unit_tag_indexes` || 单位标签索引列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_EntityRelated_CreateEntity: "Execution.Entity_Related.Create_Entity",

  /**
 * **When Entity Is Created** `(Trigger.Entity_Related.On_Created)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **71** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_EntityRelated_OnCreated: "Trigger.Entity_Related.On_Created",

  /**
 * **When Entity Is Removed/Destroyed** `(Trigger.Entity_Related.On_Removed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **72** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_EntityRelated_OnRemoved: "Trigger.Entity_Related.On_Removed",

  /**
 * **Get Self Entity** `(Query.Entity_Related.Get_Self)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **73** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `self` || 自身实体 |
 */
  Query_EntityRelated_GetSelf: "Query.Entity_Related.Get_Self",

  /**
 * **3D Vector Normalization** `(Arithmetic.Math.Vector_Normalize)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **74** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `v` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorNormalize: "Arithmetic.Math.Vector_Normalize",

  /**
 * **Query Entity by GUID** `(Query.Entity_Related.Get_By_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **75** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Gid` || `guid` || GUID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `entity` || 实体 |
 */
  Query_EntityRelated_GetByGUID: "Query.Entity_Related.Get_By_GUID",

  /**
 * **Query GUID by Entity** `(Query.Entity_Related.Get_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **76** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `entity` || 实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Gid` || `guid` || GUID |
 */
  Query_EntityRelated_GetGUID: "Query.Entity_Related.Get_GUID",

  /**
 * **Settle Stage** `(Execution.Stage_Related.Settle)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **77** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageRelated_Settle: "Execution.Stage_Related.Settle",

  /**
 * **Start Timer** `(Execution.Timer.Start)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **79** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 定时器名称 |
 * | 2 || 🔹 || `Bol` || `loop` || 是否循环 |
 * | 3 || 🔹 || `L<Flt>` || `timer_sequence` || 定时器序列 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Timer_Start: "Execution.Timer.Start",

  /**
 * **Pause Timer** `(Execution.Timer.Pause)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **80** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 定时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Timer_Pause: "Execution.Timer.Pause",

  /**
 * **Resume Timer** `(Execution.Timer.Resume)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **81** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 定时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Timer_Resume: "Execution.Timer.Resume",

  /**
 * **Stop Timer** `(Execution.Timer.Stop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **82** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 定时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Timer_Stop: "Execution.Timer.Stop",

  /**
 * **When Timer Is Triggered** `(Trigger.Timer.On_Timer_Trigger)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **83** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `Output0` ||  |
 * | 1 || 🔸 || `Gid` || `Output1` ||  |
 * | 2 || 🔸 || `Str` || `Output2` ||  |
 * | 3 || 🔸 || `Int` || `Output3` ||  |
 * | 4 || 🔸 || `Int` || `Output4` ||  |
 * | 5 || 🔸 || `Gid` || `Output5` ||  |
 */
  Trigger_Timer_OnTimerTrigger: "Trigger.Timer.On_Timer_Trigger",

  /**
 * **Add Uniform Basic Linear Motion Device** `(Execution.Motion_Device.Add_Linear_Motion)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **84** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 * | 2 || 🔹 || `Flt` || `duration` || 运动器时长 |
 * | 3 || 🔹 || `Vec` || `velocity` || 速度向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_AddLinearMotion: "Execution.Motion_Device.Add_Linear_Motion",

  /**
 * **Add Uniform Basic Rotation-Based Motion Device** `(Execution.Motion_Device.Add_Rotation_Motion)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **85** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 * | 2 || 🔹 || `Flt` || `duration` || 运动器时长 |
 * | 3 || 🔹 || `Flt` || `angular_velocity` || 角速度(角度/秒) |
 * | 4 || 🔹 || `Vec` || `axis` || 旋转轴朝向 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_AddRotationMotion: "Execution.Motion_Device.Add_Rotation_Motion",

  /**
 * **Stop and Delete Basic Motion Device** `(Execution.Motion_Device.Stop_Delete)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **86** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 * | 2 || 🔹 || `Bol` || `stop_all` || 是否停止所有基础运动器 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_StopDelete: "Execution.Motion_Device.Stop_Delete",

  /**
 * **Pause Basic Motion Device** `(Execution.Motion_Device.Pause)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **87** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_Pause: "Execution.Motion_Device.Pause",

  /**
 * **Recover Basic Motion Device** `(Execution.Motion_Device.Resume)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **88** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_Resume: "Execution.Motion_Device.Resume",

  /**
 * **When Basic Motion Device Stops** `(Trigger.Motion_Device.On_Motion_Stop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **89** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Str` || `mover_name` || 运动器名称 |
 */
  Trigger_MotionDevice_OnMotionStop: "Trigger.Motion_Device.On_Motion_Stop",

  /**
 * **Activate/Disable Collision Trigger** `(Execution.Collision_Trigger.Set_Trigger_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **90** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `collision_trigger_guid` || 碰撞触发器GUID |
 * | 1 || 🔹 || `Int` || `collision_unit_index` || 碰撞单位索引 |
 * | 2 || 🔹 || `Bol` || `should_register` || 是否注册 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CollisionTrigger_SetTriggerState: "Execution.Collision_Trigger.Set_Trigger_State",

  /**
 * **When Exiting Collision Trigger** `(Trigger.Collision_Trigger.On_Exit)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **91** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `leaver_entity` || 离开者实体 |
 * | 1 || 🔸 || `Gid` || `leaver_guid` || 离开者实体GUID |
 * | 2 || 🔸 || `Ety` || `trigger_entity` || 触发器实体 |
 * | 3 || 🔸 || `Gid` || `trigger_guid` || 触发器实体GUID |
 * | 4 || 🔸 || `Int` || `trigger_index` || 触发器序号 |
 */
  Trigger_CollisionTrigger_OnExit: "Trigger.Collision_Trigger.On_Exit",

  /**
 * **When Entering Collision Trigger** `(Trigger.Collision_Trigger.On_Enter)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **92** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `enterer_entity` || 进入者实体 |
 * | 1 || 🔸 || `Gid` || `enterer_guid` || 进入者实体GUID |
 * | 2 || 🔸 || `Ety` || `trigger_entity` || 触发器实体 |
 * | 3 || 🔸 || `Gid` || `trigger_guid` || 触发器实体GUID |
 * | 4 || 🔸 || `Int` || `trigger_index` || 触发器序号 |
 */
  Trigger_CollisionTrigger_OnEnter: "Trigger.Collision_Trigger.On_Enter",

  /**
 * **Play Timed Effects** `(Execution.Special_Effect.Play_Timed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **93** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Cfg` || `effect_asset` || 特效资产 |
 * | 1 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 2 || 🔹 || `Str` || `socket_name` || 挂接点名称 |
 * | 3 || 🔹 || `Bol` || `follow_move` || 是否跟随目标运动 |
 * | 4 || 🔹 || `Bol` || `follow_rotate` || 是否跟随目标旋转 |
 * | 5 || 🔹 || `Vec` || `pos_offset` || 位置偏移 |
 * | 6 || 🔹 || `Vec` || `rot_offset` || 旋转偏移 |
 * | 7 || 🔹 || `Flt` || `scale` || 缩放倍率 |
 * | 8 || 🔹 || `Bol` || `play_built_in_sfx` || 是否播放自带的音效 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SpecialEffect_PlayTimed: "Execution.Special_Effect.Play_Timed",

  /**
 * **Mount Looping Special Effect** `(Execution.Special_Effect.Play_Loop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **94** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Cfg` || `effect_asset` || 特效资产 |
 * | 1 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 2 || 🔹 || `Str` || `socket_name` || 挂接点名称 |
 * | 3 || 🔹 || `Bol` || `follow_move` || 是否跟随目标运动 |
 * | 4 || 🔹 || `Bol` || `follow_rotate` || 是否跟随目标旋转 |
 * | 5 || 🔹 || `Vec` || `pos_offset` || 位置偏移 |
 * | 6 || 🔹 || `Vec` || `rot_offset` || 旋转偏移 |
 * | 7 || 🔹 || `Flt` || `scale` || 缩放倍率 |
 * | 8 || 🔹 || `Bol` || `play_built_in_sfx` || 是否播放自带的音效 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Int` || `effect_instance_id_out` || 特效实例ID |
 */
  Execution_SpecialEffect_PlayLoop: "Execution.Special_Effect.Play_Loop",

  /**
 * **Clear Looping Special Effect** `(Execution.Special_Effect.Stop_Loop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **95** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `effect_instance_id` || 特效实例ID |
 * | 1 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SpecialEffect_StopLoop: "Execution.Special_Effect.Stop_Loop",

  /**
 * **Get Entity Location and Rotation** `(Query.Entity_Related.Get_Transform)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **99** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `position` || 位置 |
 * | 1 || 🔸 || `Vec` || `rotation` || 旋转 |
 */
  Query_EntityRelated_GetTransform: "Query.Entity_Related.Get_Transform",

  /**
 * **Concatenate List** `(Execution.List_Operation.Concatenate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **100** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `target_list` || 目标列表 |
 * | 1 || 🔷 || **`L<R<T>>`** || `incoming_list` || 接入的列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_Concatenate: "Execution.List_Operation.Concatenate",

  /**
 * **Clear List** `(Execution.List_Operation.Clear)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **107** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_Clear: "Execution.List_Operation.Clear",

  /**
 * **List Includes This Value** `(Query.List_Related.Contains)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **114** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔷 || **`R<T>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 是否包含 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Query_ListRelated_Contains: "Query.List_Related.Contains",

  /**
 * **Search List and Return Value ID** `(Query.List_Related.Find_Index)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **121** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `target_list` || 目标列表 |
 * | 1 || 🔷 || **`R<T>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `index_list` || 序号列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Query_ListRelated_FindIndex: "Query.List_Related.Find_Index",

  /**
 * **Get Corresponding Value From List** `(Query.List_Related.Get_At_Index)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **128** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔹 || `Int` || `index` || 序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Query_ListRelated_GetAtIndex: "Query.List_Related.Get_At_Index",

  /**
 * **Insert Value Into List** `(Execution.List_Operation.Insert)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **135** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔹 || `Int` || `index` || 插入序号 |
 * | 2 || 🔷 || **`R<T>`** || `value` || 插入值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_Insert: "Execution.List_Operation.Insert",

  /**
 * **Get List Length** `(Query.List_Related.Get_Length)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **142** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `length` || 长度 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Query_ListRelated_GetLength: "Query.List_Related.Get_Length",

  /**
 * **Get Maximum Value from List** `(Query.List_Related.Get_Max)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **149** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `max` || 最大值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Query_ListRelated_GetMax: "Query.List_Related.Get_Max",

  /**
 * **Get Minimum Value From List** `(Query.List_Related.Get_Min)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **151** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `min` || 最小值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Query_ListRelated_GetMin: "Query.List_Related.Get_Min",

  /**
 * **Remove Value From List** `(Execution.List_Operation.Remove)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **153** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔹 || `Int` || `index` || 移除序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_Remove: "Execution.List_Operation.Remove",

  /**
 * **Modify Value in List** `(Execution.List_Operation.Modify_Index)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **160** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔹 || `Int` || `index` || 序号 |
 * | 2 || 🔷 || **`R<T>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_ModifyIndex: "Execution.List_Operation.Modify_Index",

  /**
 * **List Sorting** `(Execution.List_Operation.Sort)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **167** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 * | 1 || 🔹 || `E<SORT>` || `mode` || 排序方式 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Execution_ListOperation_Sort: "Execution.List_Operation.Sort",

  /**
 * **Assembly List** `(Arithmetic.General.Assemble_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **169** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔷 || **`R<T>`** || `Input1` ||  |
 * | 2 || 🔷 || **`R<T>`** || `Input2` ||  |
 * | 3 || 🔷 || **`R<T>`** || `Input3` ||  |
 * | 4 || 🔷 || **`R<T>`** || `Input4` ||  |
 * | 5 || 🔷 || **`R<T>`** || `Input5` ||  |
 * | 6 || 🔷 || **`R<T>`** || `Input6` ||  |
 * | 7 || 🔷 || **`R<T>`** || `Input7` ||  |
 * | 8 || 🔷 || **`R<T>`** || `Input8` ||  |
 * | 9 || 🔷 || **`R<T>`** || `Input9` ||  |
 * | 10 || 🔷 || **`R<T>`** || `Input10` ||  |
 * | 11 || 🔷 || **`R<T>`** || `Input11` ||  |
 * | 12 || 🔷 || **`R<T>`** || `Input12` ||  |
 * | 13 || 🔷 || **`R<T>`** || `Input13` ||  |
 * | 14 || 🔷 || **`R<T>`** || `Input14` ||  |
 * | 15 || 🔷 || **`R<T>`** || `Input15` ||  |
 * | 16 || 🔷 || **`R<T>`** || `Input16` ||  |
 * | 17 || 🔷 || **`R<T>`** || `Input17` ||  |
 * | 18 || 🔷 || **`R<T>`** || `Input18` ||  |
 * | 19 || 🔷 || **`R<T>`** || `Input19` ||  |
 * | 20 || 🔷 || **`R<T>`** || `Input20` ||  |
 * | 21 || 🔷 || **`R<T>`** || `Input21` ||  |
 * | 22 || 🔷 || **`R<T>`** || `Input22` ||  |
 * | 23 || 🔷 || **`R<T>`** || `Input23` ||  |
 * | 24 || 🔷 || **`R<T>`** || `Input24` ||  |
 * | 25 || 🔷 || **`R<T>`** || `Input25` ||  |
 * | 26 || 🔷 || **`R<T>`** || `Input26` ||  |
 * | 27 || 🔷 || **`R<T>`** || `Input27` ||  |
 * | 28 || 🔷 || **`R<T>`** || `Input28` ||  |
 * | 29 || 🔷 || **`R<T>`** || `Input29` ||  |
 * | 30 || 🔷 || **`R<T>`** || `Input30` ||  |
 * | 31 || 🔷 || **`R<T>`** || `Input31` ||  |
 * | 32 || 🔷 || **`R<T>`** || `Input32` ||  |
 * | 33 || 🔷 || **`R<T>`** || `Input33` ||  |
 * | 34 || 🔷 || **`R<T>`** || `Input34` ||  |
 * | 35 || 🔷 || **`R<T>`** || `Input35` ||  |
 * | 36 || 🔷 || **`R<T>`** || `Input36` ||  |
 * | 37 || 🔷 || **`R<T>`** || `Input37` ||  |
 * | 38 || 🔷 || **`R<T>`** || `Input38` ||  |
 * | 39 || 🔷 || **`R<T>`** || `Input39` ||  |
 * | 40 || 🔷 || **`R<T>`** || `Input40` ||  |
 * | 41 || 🔷 || **`R<T>`** || `Input41` ||  |
 * | 42 || 🔷 || **`R<T>`** || `Input42` ||  |
 * | 43 || 🔷 || **`R<T>`** || `Input43` ||  |
 * | 44 || 🔷 || **`R<T>`** || `Input44` ||  |
 * | 45 || 🔷 || **`R<T>`** || `Input45` ||  |
 * | 46 || 🔷 || **`R<T>`** || `Input46` ||  |
 * | 47 || 🔷 || **`R<T>`** || `Input47` ||  |
 * | 48 || 🔷 || **`R<T>`** || `Input48` ||  |
 * | 49 || 🔷 || **`R<T>`** || `Input49` ||  |
 * | 50 || 🔷 || **`R<T>`** || `Input50` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`L<R<T>>`** || `list` || 列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Arithmetic_General_AssembleList: "Arithmetic.General.Assemble_List",

  /**
 * **When Path Reaches Waypoint** `(Trigger.Motion_Device.On_Reach_Waypoint)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **177** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `Output0` ||  |
 * | 1 || 🔸 || `Gid` || `Output1` ||  |
 * | 2 || 🔸 || `Str` || `Output2` ||  |
 * | 3 || 🔸 || `Int` || `Output3` ||  |
 * | 4 || 🔸 || `Int` || `Output4` ||  |
 */
  Trigger_MotionDevice_OnReachWaypoint: "Trigger.Motion_Device.On_Reach_Waypoint",

  /**
 * **Activate/Disable Entity Deployment Group** `(Execution.Entity_Deployment.Set_Group_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **178** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `group_index` || 实体布设组索引 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_EntityDeployment_SetGroupState: "Execution.Entity_Deployment.Set_Group_State",

  /**
 * **Get Currently Active Entity Deployment Groups** `(Query.Entity_Layout.Get_Active_Groups)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **179** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `group_index_list` || 实体布设组索引列表 |
 */
  Query_EntityLayout_GetActiveGroups: "Query.Entity_Layout.Get_Active_Groups",

  /**
 * **Data Type Conversion** `(Arithmetic.General.Convert_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **180** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<K>`** || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<V>`** || `output` || 输出 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Bol,V:Int>`
 * * `C<K:Bol,V:Str>`
 * * `C<K:Flt,V:Int>`
 * * `C<K:Flt,V:Str>`
 * * `C<K:Vec,V:Str>`
 * * `C<K:Fct,V:Str>`
 */
  Arithmetic_General_ConvertType: "Arithmetic.General.Convert_Type",

  /**
 * **Forwarding Event** `(Execution.Common_Node.Forward_Event)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **190** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CommonNode_ForwardEvent: "Execution.Common_Node.Forward_Event",

  /**
 * **Pi (π)** `(Query.Math.Pi)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **191** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `pi` || 圆周率（π） |
 */
  Query_Math_Pi: "Query.Math.Pi",

  /**
 * **3D Vector: Zero Vector** `(Query.Math.Vector_Zero)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **192** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (0,0,0) |
 */
  Query_Math_VectorZero: "Query.Math.Vector_Zero",

  /**
 * **3D Vector: Up** `(Query.Math.Vector_Up)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **193** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (0,1,0) |
 */
  Query_Math_VectorUp: "Query.Math.Vector_Up",

  /**
 * **3D Vector: Down** `(Query.Math.Vector_Down)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **194** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (0,-1,0) |
 */
  Query_Math_VectorDown: "Query.Math.Vector_Down",

  /**
 * **3D Vector: Left** `(Query.Math.Vector_Left)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **195** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (-1,0,0) |
 */
  Query_Math_VectorLeft: "Query.Math.Vector_Left",

  /**
 * **3D Vector: Right** `(Query.Math.Vector_Right)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **196** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (1,0,0) |
 */
  Query_Math_VectorRight: "Query.Math.Vector_Right",

  /**
 * **3D Vector: Forward** `(Query.Math.Vector_Forward)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **197** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (0,0,1) |
 */
  Query_Math_VectorForward: "Query.Math.Vector_Forward",

  /**
 * **3D Vector: Backward** `(Query.Math.Vector_Backward)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **198** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || (0,0,-1) |
 */
  Query_Math_VectorBackward: "Query.Math.Vector_Backward",

  /**
 * **Addition** `(Arithmetic.Math.Add)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Add: "Arithmetic.Math.Add",

  /**
 * **Subtraction** `(Arithmetic.Math.Subtract)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **202** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Subtract: "Arithmetic.Math.Subtract",

  /**
 * **Multiplication** `(Arithmetic.Math.Multiply)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **204** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Multiply: "Arithmetic.Math.Multiply",

  /**
 * **Division** `(Arithmetic.Math.Divide)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **206** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Divide: "Arithmetic.Math.Divide",

  /**
 * **Modulo Operation** `(Arithmetic.Math.Modulo)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **208** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `a` || 输入整数 |
 * | 1 || 🔹 || `Int` || `b` || 输入整数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_Modulo: "Arithmetic.Math.Modulo",

  /**
 * **Exponentiation** `(Arithmetic.Math.Power)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **209** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `base` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `exp` || 指数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Power: "Arithmetic.Math.Power",

  /**
 * **Take Larger Value** `(Arithmetic.Math.Max)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **211** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `max` || 较大值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Max: "Arithmetic.Math.Max",

  /**
 * **Take Smaller Value** `(Arithmetic.Math.Min)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **213** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `min` || 较小值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Min: "Arithmetic.Math.Min",

  /**
 * **Logarithm Operation** `(Arithmetic.Math.Log)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **215** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `Input0` ||  |
 * | 1 || 🔹 || `Flt` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_Log: "Arithmetic.Math.Log",

  /**
 * **Absolute Value Operation** `(Arithmetic.Math.Abs)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **216** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Abs: "Arithmetic.Math.Abs",

  /**
 * **Sign Operation** `(Arithmetic.Math.Sign)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **218** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Sign: "Arithmetic.Math.Sign",

  /**
 * **3D Vector Modulo Operation** `(Arithmetic.Math.Vector_Length)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **220** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `v` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_VectorLength: "Arithmetic.Math.Vector_Length",

  /**
 * **Arithmetic Square Root Operation** `(Arithmetic.Math.Sqrt)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **221** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_Sqrt: "Arithmetic.Math.Sqrt",

  /**
 * **Range Limiting Operation** `(Arithmetic.Math.Clamp)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **222** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input` || 输入 |
 * | 1 || 🔷 || **`R<T>`** || `min` || 下限 |
 * | 2 || 🔷 || **`R<T>`** || `max` || 上限 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_Clamp: "Arithmetic.Math.Clamp",

  /**
 * **Round to Integer Operation** `(Arithmetic.Math.Round)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **224** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 * | 1 || 🔹 || `E<ROND>` || `mode` || 取整方式 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_Round: "Arithmetic.Math.Round",

  /**
 * **Create 3D Vector** `(Arithmetic.Math.Create_Vector)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **225** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `x` || X分量 |
 * | 1 || 🔹 || `Flt` || `y` || Y分量 |
 * | 2 || 🔹 || `Flt` || `z` || Z分量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || 三维向量 |
 */
  Arithmetic_Math_CreateVector: "Arithmetic.Math.Create_Vector",

  /**
 * **Logical AND Operation** `(Arithmetic.Math.And)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **226** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 输入1 |
 * | 1 || 🔹 || `Bol` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_Math_And: "Arithmetic.Math.And",

  /**
 * **Logical OR Operation** `(Arithmetic.Math.Or)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **227** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 输入1 |
 * | 1 || 🔹 || `Bol` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_Math_Or: "Arithmetic.Math.Or",

  /**
 * **Logical XOR Operation** `(Arithmetic.Math.Xor)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **228** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 输入1 |
 * | 1 || 🔹 || `Bol` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_Math_Xor: "Arithmetic.Math.Xor",

  /**
 * **Logical NOT Operation** `(Arithmetic.Math.Not)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **229** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_Math_Not: "Arithmetic.Math.Not",

  /**
 * **Less Than** `(Arithmetic.Math.Less_Than)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **230** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `ok` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_LessThan: "Arithmetic.Math.Less_Than",

  /**
 * **Less Than or Equal To** `(Arithmetic.Math.Less_Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **231** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `ok` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_LessEqual: "Arithmetic.Math.Less_Equal",

  /**
 * **Greater Than** `(Arithmetic.Math.Greater_Than)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **232** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `ok` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_GreaterThan: "Arithmetic.Math.Greater_Than",

  /**
 * **Greater Than or Equal To** `(Arithmetic.Math.Greater_Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **233** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` || 输入1 |
 * | 1 || 🔷 || **`R<T>`** || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `ok` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_Math_GreaterEqual: "Arithmetic.Math.Greater_Equal",

  /**
 * **Activate/Disable Native Collision** `(Execution.Collision.Set_Native_Collision)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **240** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Collision_SetNativeCollision: "Execution.Collision.Set_Native_Collision",

  /**
 * **Activate/Disable Native Collision Climbability** `(Execution.Collision.Set_Native_Climb)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **241** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Collision_SetNativeClimb: "Execution.Collision.Set_Native_Climb",

  /**
 * **Activate/Disable Extra Collision** `(Execution.Collision.Set_Extra_Collision)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **242** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `extra_collision_index` || 额外碰撞序号 |
 * | 2 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Collision_SetExtraCollision: "Execution.Collision.Set_Extra_Collision",

  /**
 * **Activate/Disable Extra Collision Climbability** `(Execution.Collision.Set_Extra_Climb)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **243** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `extra_collision_index` || 额外碰撞序号 |
 * | 2 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Collision_SetExtraClimb: "Execution.Collision.Set_Extra_Climb",

  /**
 * **Distance Between Two Coordinate Points** `(Arithmetic.Math.Distance)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **244** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `p1` || 坐标点1 |
 * | 1 || 🔹 || `Vec` || `p2` || 坐标点2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `distance` || 距离 |
 */
  Arithmetic_Math_Distance: "Arithmetic.Math.Distance",

  /**
 * **Switch Follow Motion Device Target by GUID** `(Execution.Follow_Motion.Set_Target_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **245** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Gid` || `follow_guid` || 跟随目标GUID |
 * | 2 || 🔹 || `Str` || `socket_name` || 跟随目标挂接点名称 |
 * | 3 || 🔹 || `Vec` || `pos_offset` || 位置偏移 |
 * | 4 || 🔹 || `Vec` || `rot_offset` || 旋转偏移 |
 * | 5 || 🔹 || `E<SYSC>` || `coord_sys` || 跟随坐标系 |
 * | 6 || 🔹 || `E<FOLO>` || `follow_type` || 跟随类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_FollowMotion_SetTargetGUID: "Execution.Follow_Motion.Set_Target_GUID",

  /**
 * **Get Follow Motion Device Target** `(Query.Follow_Motion.Get_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **246** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `follower` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `target_entity` || 跟随目标实体 |
 * | 1 || 🔸 || `Gid` || `target_guid` || 跟随目标GUID |
 */
  Query_FollowMotion_GetTarget: "Query.Follow_Motion.Get_Target",

  /**
 * **Get List of Player Entities on the Field** `(Query.Character_Related.Get_All_Players)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **248** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `players` || 玩家实体列表 |
 */
  Query_CharacterRelated_GetAllPlayers: "Query.Character_Related.Get_All_Players",

  /**
 * **Query Entity Faction** `(Query.Faction_Related.Get_Faction)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **249** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Fct` || `camp` || 阵营 |
 */
  Query_FactionRelated_GetFaction: "Query.Faction_Related.Get_Faction",

  /**
 * **Modify Entity Faction** `(Execution.Faction_Related.Set_Faction)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **250** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Fct` || `faction` || 阵营 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_FactionRelated_SetFaction: "Execution.Faction_Related.Set_Faction",

  /**
 * **When Entity Faction Changes** `(Trigger.Faction_Related.On_Faction_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **251** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Fct` || `old_camp` || 变化前阵营 |
 * | 3 || 🔸 || `Fct` || `new_camp` || 变化后阵营 |
 */
  Trigger_FactionRelated_OnFactionChange: "Trigger.Faction_Related.On_Faction_Change",

  /**
 * **Create Prefab** `(Execution.Entity_Related.Create_Prefab)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **252** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Pfb` || `component_id` || 元件ID |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Ety` || `owner_entity` || 拥有者实体 |
 * | 4 || 🔹 || `Bol` || `override_level` || 是否覆盖等级 |
 * | 5 || 🔹 || `Int` || `level` || 等级 |
 * | 6 || 🔹 || `L<Int>` || `unit_tag_indexes` || 单位标签索引列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `created_entity` || 创建后实体 |
 */
  Execution_EntityRelated_CreatePrefab: "Execution.Entity_Related.Create_Prefab",

  /**
 * **When On-Hit Detection Is Triggered** `(Trigger.Hit_Detection.On_Hit_Detected)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **253** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Bol` || `hit_hurtbox` || 是否命中受击盒 |
 * | 3 || 🔸 || `Ety` || `hit_entity` || 命中实体 |
 * | 4 || 🔸 || `Vec` || `hit_position` || 命中位置 |
 */
  Trigger_HitDetection_OnHitDetected: "Trigger.Hit_Detection.On_Hit_Detected",

  /**
 * **Create Projectile** `(Execution.Projectile.Create)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **256** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Pfb` || `component_id` || 元件ID |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Ety` || `owner_entity` || 拥有者实体 |
 * | 4 || 🔹 || `Ety` || `track_target` || 追踪目标 |
 * | 5 || 🔹 || `Bol` || `override_level` || 是否覆盖等级 |
 * | 6 || 🔹 || `Int` || `level` || 等级 |
 * | 7 || 🔹 || `L<Int>` || `unit_tag_indexes` || 单位标签索引列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `created_entity` || 创建出的实体 |
 */
  Execution_Projectile_Create: "Execution.Projectile.Create",

  /**
 * **Get Random Integer** `(Query.Math.Random_Int)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **257** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `lower` || 下限 |
 * | 1 || 🔹 || `Int` || `upper` || 上限 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Query_Math_RandomInt: "Query.Math.Random_Int",

  /**
 * **Get All Character Entities of Specified Player** `(Query.Character_Related.Get_Player_Characters)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **258** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `characters` || 角色实体列表 |
 */
  Query_CharacterRelated_GetPlayerCharacters: "Query.Character_Related.Get_Player_Characters",

  /**
 * **Get Player Entity to Which the Character Belongs** `(Query.Character_Related.Get_Owner_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **259** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `character` || 角色实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `owner` || 所属玩家实体 |
 */
  Query_CharacterRelated_GetOwnerPlayer: "Query.Character_Related.Get_Owner_Player",

  /**
 * **Get Entity Type** `(Query.Entity_Related.Get_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **260** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<ENTY>` || `entity_type` || 实体类型 |
 */
  Query_EntityRelated_GetType: "Query.Entity_Related.Get_Type",

  /**
 * **Switch Main Camera Template** `(Execution.Camera.Switch_Template)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **261** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `target_players` || 目标玩家列表 |
 * | 1 || 🔹 || `Str` || `template_name` || 镜头模板名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Camera_SwitchTemplate: "Execution.Camera.Switch_Template",

  /**
 * **Activate Entity Camera** `(Hidden.Execution.Activate_Entity_Camera)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **262** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `Input0` ||  |
 * | 1 || 🔹 || `Ety` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_ActivateEntityCamera: "Hidden.Execution.Activate_Entity_Camera",

  /**
 * **Disable Entity Camera** `(Hidden.Execution.Disable_Entity_Camera)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **263** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `Input0` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_DisableEntityCamera: "Hidden.Execution.Disable_Entity_Camera",

  /**
 * **Activate Focus Camera** `(Hidden.Execution.Activate_Focus_Camera)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **264** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `Input0` ||  |
 * | 1 || 🔹 || `Ety` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_ActivateFocusCamera: "Hidden.Execution.Activate_Focus_Camera",

  /**
 * **Disable Focus Camera** `(Hidden.Execution.Disable_Focus_Camera)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **265** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `Input0` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_DisableFocusCamera: "Hidden.Execution.Disable_Focus_Camera",

  /**
 * **Activate Screen Shake** `(Hidden.Execution.Play_Screen_Shake)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **266** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Ety>` || `Input0` ||  |
 * | 1 || 🔹 || `Flt` || `Input1` ||  |
 * | 2 || 🔹 || `Flt` || `Input2` ||  |
 * | 3 || 🔹 || `Flt` || `Input3` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_PlayScreenShake: "Hidden.Execution.Play_Screen_Shake",

  /**
 * **Activate Basic Motion Device** `(Execution.Motion_Device.Activate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **267** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_Activate: "Execution.Motion_Device.Activate",

  /**
 * **Query Preset Point Position Rotation** `(Query.Preset_Point.Get_Transform)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **270** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `point_index` || 点位索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `position` || 位置 |
 * | 1 || 🔸 || `Vec` || `rotation` || 旋转 |
 */
  Query_PresetPoint_GetTransform: "Query.Preset_Point.Get_Transform",

  /**
 * **Get Preset Point List by Unit Tag** `(Query.Preset_Point.Get_By_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **271** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `unit_tag_index` || 单位标签索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `index_list` || 点位索引列表 |
 */
  Query_PresetPoint_GetByTag: "Query.Preset_Point.Get_By_Tag",

  /**
 * **Activate Revive Point** `(Execution.Character_Related.Activate_Revive_Point)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **272** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `revive_point_index` || 复苏点序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_ActivateRevivePoint: "Execution.Character_Related.Activate_Revive_Point",

  /**
 * **Deactivate Revive Point** `(Execution.Character_Related.Deactivate_Revive_Point)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **273** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `revive_point_index` || 复苏点序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_DeactivateRevivePoint: "Execution.Character_Related.Deactivate_Revive_Point",

  /**
 * **Allow/Forbid Player to Revive** `(Execution.Character_Related.Set_Revive_Allowed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **274** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Bol` || `allow_revive` || 是否允许 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_SetReviveAllowed: "Execution.Character_Related.Set_Revive_Allowed",

  /**
 * **Get Player Remaining Revives** `(Query.Character_Related.Get_Revives)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **275** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `count` || 剩余次数 |
 */
  Query_CharacterRelated_GetRevives: "Query.Character_Related.Get_Revives",

  /**
 * **Set Player Remaining Revives** `(Execution.Character_Related.Set_Revive_Count)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **276** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `remaining_count` || 剩余次数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_SetReviveCount: "Execution.Character_Related.Set_Revive_Count",

  /**
 * **Get Player Revive Time** `(Query.Character_Related.Get_Revive_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **277** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `duration` || 时长 |
 */
  Query_CharacterRelated_GetReviveTime: "Query.Character_Related.Get_Revive_Time",

  /**
 * **Set Player Revive Time** `(Execution.Character_Related.Set_Revive_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **278** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `duration` || 时长 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_SetReviveTime: "Execution.Character_Related.Set_Revive_Time",

  /**
 * **Revive Character** `(Execution.Character_Related.Revive_Single)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **279** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `character_entity` || 角色实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_ReviveSingle: "Execution.Character_Related.Revive_Single",

  /**
 * **When the Character Is Down** `(Trigger.Character_Related.On_Character_Down)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **280** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `character_entity` || 角色实体 |
 * | 1 || 🔸 || `E<DWNR>` || `reason` || 原因 |
 * | 2 || 🔸 || `Ety` || `attacker_entity` || 击倒者实体 |
 */
  Trigger_CharacterRelated_OnCharacterDown: "Trigger.Character_Related.On_Character_Down",

  /**
 * **When Character Revives** `(Trigger.Character_Related.On_Character_Revive)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **281** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `character_entity` || 角色实体 |
 */
  Trigger_CharacterRelated_OnCharacterRevive: "Trigger.Character_Related.On_Character_Revive",

  /**
 * **Defeat All Player's Characters** `(Execution.Character_Related.Defeat_All)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **282** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_DefeatAll: "Execution.Character_Related.Defeat_All",

  /**
 * **Revive All Player's Characters** `(Execution.Character_Related.Revive_All)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **283** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Bol` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_ReviveAll: "Execution.Character_Related.Revive_All",

  /**
 * **When All Player's Characters Are Down** `(Trigger.Character_Related.On_All_Down)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **284** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔸 || `E<DWNR>` || `reason` || 原因 |
 */
  Trigger_CharacterRelated_OnAllDown: "Trigger.Character_Related.On_All_Down",

  /**
 * **When Player Is Abnormally Downed and Revives** `(Trigger.Character_Related.On_Abnormal_Revive)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **285** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `player_entity` || 玩家实体 |
 */
  Trigger_CharacterRelated_OnAbnormalRevive: "Trigger.Character_Related.On_Abnormal_Revive",

  /**
 * **When All Player's Characters Are Revived** `(Trigger.Character_Related.On_All_Revived)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **286** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `player_entity` || 玩家实体 |
 */
  Trigger_CharacterRelated_OnAllRevived: "Trigger.Character_Related.On_All_Revived",

  /**
 * **Query If All Player Characters Are Down** `(Query.Character_Related.Is_All_Down)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **287** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Query_CharacterRelated_IsAllDown: "Query.Character_Related.Is_All_Down",

  /**
 * **Teleport Player** `(Execution.Character_Related.Teleport)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **288** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Vec` || `target_position` || 目标位置 |
 * | 2 || 🔹 || `Vec` || `target_rotation` || 目标旋转 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_Teleport: "Execution.Character_Related.Teleport",

  /**
 * **When Player Teleport Completes** `(Trigger.Character_Related.On_Teleport_Complete)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **289** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔸 || `Gid` || `player_guid` || 玩家GUID |
 */
  Trigger_CharacterRelated_OnTeleportComplete: "Trigger.Character_Related.On_Teleport_Complete",

  /**
 * **Query Game Time Elapsed** `(Query.Stage_Related.Get_Elapsed_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **290** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `elapsed` || 游戏已进行时间 |
 */
  Query_StageRelated_GetElapsedTime: "Query.Stage_Related.Get_Elapsed_Time",

  /**
 * **Sine Function** `(Arithmetic.Math.Sin)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **291** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radians` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_Sin: "Arithmetic.Math.Sin",

  /**
 * **Cosine Function** `(Arithmetic.Math.Cos)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **292** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radians` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_Cos: "Arithmetic.Math.Cos",

  /**
 * **Tangent Function** `(Arithmetic.Math.Tan)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **293** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radians` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_Tan: "Arithmetic.Math.Tan",

  /**
 * **Arcsine Function** `(Arithmetic.Math.Asin)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **294** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_Math_Asin: "Arithmetic.Math.Asin",

  /**
 * **Arccosine Function** `(Arithmetic.Math.Acos)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **295** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_Math_Acos: "Arithmetic.Math.Acos",

  /**
 * **Arctangent Function** `(Arithmetic.Math.Atan)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **296** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_Math_Atan: "Arithmetic.Math.Atan",

  /**
 * **Add Unit Status** `(Execution.Unit_Status.Add_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **297** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `applier` || 施加者实体 |
 * | 1 || 🔹 || `Ety` || `target` || 施加目标实体 |
 * | 2 || 🔹 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 3 || 🔹 || `Int` || `stacks` || 施加层数 |
 * | 4 || 🔹 || `D<Str,Flt>` || `params_dict` || 单位状态参数字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `E<STAD>` || `apply_result` || 施加结果 |
 * | 1 || 🔸 || `Int` || `slot_index` || 槽位序号 |
 */
  Execution_UnitStatus_AddStatus: "Execution.Unit_Status.Add_Status",

  /**
 * **When Unit Status Ends** `(Trigger.Unit_Status.On_Status_End)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **299** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 3 || 🔸 || `Ety` || `applier_entity` || 施加者实体 |
 * | 4 || 🔸 || `Bol` || `is_infinite` || 持续时间是否无限 |
 * | 5 || 🔸 || `Flt` || `time_remain` || 状态剩余时长 |
 * | 6 || 🔸 || `Int` || `layer_remain` || 状态剩余层数 |
 * | 7 || 🔸 || `Ety` || `remover_entity` || 移除者实体 |
 * | 8 || 🔸 || `E<STRE>` || `remove_reason` || 移除原因 |
 * | 9 || 🔸 || `Int` || `slot_index` || 槽位序号 |
 */
  Trigger_UnitStatus_OnStatusEnd: "Trigger.Unit_Status.On_Status_End",

  /**
 * **When Unit Status Changes** `(Trigger.Unit_Status.On_Status_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 3 || 🔸 || `Ety` || `applier_entity` || 施加者实体 |
 * | 4 || 🔸 || `Bol` || `is_infinite` || 持续时间是否无限 |
 * | 5 || 🔸 || `Flt` || `time_remain` || 状态剩余时长 |
 * | 6 || 🔸 || `Int` || `layer_remain` || 状态剩余层数 |
 * | 7 || 🔸 || `Int` || `layer_original` || 状态原始层数 |
 * | 8 || 🔸 || `Int` || `slot_index` || 槽位序号 |
 */
  Trigger_UnitStatus_OnStatusChange: "Trigger.Unit_Status.On_Status_Change",

  /**
 * **Remove Unit Status** `(Execution.Unit_Status.Remove_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **301** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `remove_target` || 移除目标实体 |
 * | 1 || 🔹 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 2 || 🔹 || `E<STRS>` || `remove_mode` || 移除方式 |
 * | 3 || 🔹 || `Ety` || `remover` || 移除者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UnitStatus_RemoveStatus: "Execution.Unit_Status.Remove_Status",

  /**
 * **Modifying Character Disruptor Device** `(Execution.Character_Disruptor.Modify_Device)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **302** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `device_index` || 装置序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterDisruptor_ModifyDevice: "Execution.Character_Disruptor.Modify_Device",

  /**
 * **Initiate Attack** `(Execution.Combat.Attack)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **303** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Flt` || `damage_coeff` || 伤害系数 |
 * | 2 || 🔹 || `Flt` || `damage_delta` || 伤害增量 |
 * | 3 || 🔹 || `Vec` || `pos_offset` || 位置偏移 |
 * | 4 || 🔹 || `Vec` || `rot_offset` || 旋转偏移 |
 * | 5 || 🔹 || `Str` || `ability_unit` || 能力单元 |
 * | 6 || 🔹 || `Bol` || `override_ability_unit` || 是否覆盖能力单元配置 |
 * | 7 || 🔹 || `Ety` || `attacker_entity` || 发起者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Combat_Attack: "Execution.Combat.Attack",

  /**
 * **When Attacked** `(Trigger.Combat.On_Be_Attacked)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **304** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `attacker` || 攻击者实体 |
 * | 3 || 🔸 || `Flt` || `damage` || 伤害量 |
 * | 4 || 🔸 || `L<Str>` || `attack_tags` || 攻击标签列表 |
 * | 5 || 🔸 || `E<ELMT>` || `element_type` || 元素类型 |
 * | 6 || 🔸 || `Flt` || `element_adv` || 元素攻击强效 |
 */
  Trigger_Combat_OnBeAttacked: "Trigger.Combat.On_Be_Attacked",

  /**
 * **When Attack Hits** `(Trigger.Combat.On_Hit_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **305** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `victim` || 受击者实体 |
 * | 3 || 🔸 || `Flt` || `damage` || 伤害量 |
 * | 4 || 🔸 || `L<Str>` || `attack_tags` || 攻击标签列表 |
 * | 5 || 🔸 || `E<ELMT>` || `element_type` || 元素类型 |
 * | 6 || 🔸 || `Flt` || `element_adv` || 元素攻击强效 |
 */
  Trigger_Combat_OnHitTarget: "Trigger.Combat.On_Hit_Target",

  /**
 * **Activate/Disable Tab** `(Execution.Tab.Set_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **306** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `tab_index` || 选项卡序号 |
 * | 2 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Tab_SetState: "Execution.Tab.Set_State",

  /**
 * **When Tab Is Selected** `(Trigger.Tab.On_Tab_Select)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **307** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `Output0` ||  |
 * | 1 || 🔸 || `Gid` || `Output1` ||  |
 * | 2 || 🔸 || `Int` || `Output2` ||  |
 * | 3 || 🔸 || `Ety` || `Output3` ||  |
 * | 4 || 🔸 || `Gid` || `Output4` ||  |
 */
  Trigger_Tab_OnTabSelect: "Trigger.Tab.On_Tab_Select",

  /**
 * **Activate/Disable Model Display** `(Execution.Entity_Related.Set_Model_Visible)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **308** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_EntityRelated_SetModelVisible: "Execution.Entity_Related.Set_Model_Visible",

  /**
 * **Pause Global Timer** `(Execution.Global_Timer.Pause)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **309** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GlobalTimer_Pause: "Execution.Global_Timer.Pause",

  /**
 * **Get Current Global Timer Time** `(Query.Global_Timer.Get_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **310** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `current_time` || 当前时间 |
 */
  Query_GlobalTimer_GetTime: "Query.Global_Timer.Get_Time",

  /**
 * **Start Global Timer** `(Execution.Global_Timer.Start)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **311** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GlobalTimer_Start: "Execution.Global_Timer.Start",

  /**
 * **Recover Global Timer** `(Execution.Global_Timer.Resume)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **312** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GlobalTimer_Resume: "Execution.Global_Timer.Resume",

  /**
 * **Stop Global Timer** `(Execution.Global_Timer.Stop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **313** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GlobalTimer_Stop: "Execution.Global_Timer.Stop",

  /**
 * **Modify Global Timer** `(Execution.Global_Timer.Modify)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **314** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `timer_name` || 计时器名称 |
 * | 2 || 🔹 || `Flt` || `delta` || 变化值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GlobalTimer_Modify: "Execution.Global_Timer.Modify",

  /**
 * **When Global Timer Is Triggered** `(Trigger.Global_Timer.On_Timer_Trigger)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **315** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Str` || `timer_name` || 计时器名称 |
 */
  Trigger_GlobalTimer_OnTimerTrigger: "Trigger.Global_Timer.On_Timer_Trigger",

  /**
 * **When UI Control Group Is Triggered** `(Trigger.UI_Control_Group.On_Group_Trigger)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **316** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Int` || `group_combo_index` || 界面控件组组合索引 |
 * | 3 || 🔸 || `Int` || `group_index` || 界面控件组索引 |
 */
  Trigger_UIControlGroup_OnGroupTrigger: "Trigger.UI_Control_Group.On_Group_Trigger",

  /**
 * **Get Player's Current UI Layout** `(Query.UI_Control_Group.Get_Current_Layout)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **317** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `layout_idx` || 布局索引 |
 */
  Query_UIControlGroup_GetCurrentLayout: "Query.UI_Control_Group.Get_Current_Layout",

  /**
 * **Get All Entities on the Field** `(Query.Entity_Related.Get_All_Entities)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **318** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_EntityRelated_GetAllEntities: "Query.Entity_Related.Get_All_Entities",

  /**
 * **Get Specified Type of Entity on the Field** `(Query.Entity_Related.Get_Entity_By_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **319** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `E<ENTY>` || `entity_type` || 实体类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_EntityRelated_GetEntityByType: "Query.Entity_Related.Get_Entity_By_Type",

  /**
 * **Get Entities With Specified Prefab on the Field** `(Query.Entity_Related.Get_With_Prefab)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **320** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Pfb` || `component_id` || 元件ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_EntityRelated_GetWithPrefab: "Query.Entity_Related.Get_With_Prefab",

  /**
 * **Radians to Degrees** `(Arithmetic.Math.Rad_To_Deg)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **321** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radians` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `degrees` || 角度 |
 */
  Arithmetic_Math_RadToDeg: "Arithmetic.Math.Rad_To_Deg",

  /**
 * **Degrees to Radians** `(Arithmetic.Math.Deg_To_Rad)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **322** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `degrees` || 角度值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度值 |
 */
  Arithmetic_Math_DegToRad: "Arithmetic.Math.Deg_To_Rad",

  /**
 * **Set Node Graph Variable** `(Execution.Custom_Variable.Set_Graph_Variable)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **323** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Str` || `variable_name` || 变量名 |
 * | 1 || 🔷 || **`R<T>`** || `value` || 变量值 |
 * | 2 || 🔹 || `Bol` || `should_trigger_event` || 是否触发事件 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Bol>`
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Bol>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Str>>`
 * * `C<T:Vec>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Vec>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Execution_CustomVariable_SetGraphVariable: "Execution.Custom_Variable.Set_Graph_Variable",

  /**
 * **Get Node Graph Variable** `(Query.Custom_Variable.Get_Graph_Variable)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **337** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Str` || `var_name` || 变量名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 变量值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Int>`
 * * `C<T:Bol>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Bol>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Str>>`
 * * `C<T:Vec>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Vec>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Query_CustomVariable_GetGraphVariable: "Query.Custom_Variable.Get_Graph_Variable",

  /**
 * **When Node Graph Variable Changes** `(Trigger.Custom_Variable.On_Graph_Variable_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **351** || 🖥️ Server || ⚡ Trigger || 🧩Variant |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Str` || `variable_name` || 变量名 |
 * | 3 || 🔶 || **`R<T>`** || `old_value` || 变化前值 |
 * | 4 || 🔶 || **`R<T>`** || `new_value` || 变化后值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Int>`
 * * `C<T:Bol>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Bol>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Str>>`
 * * `C<T:Vec>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Vec>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Trigger_CustomVariable_OnGraphVariableChange: "Trigger.Custom_Variable.On_Graph_Variable_Change",

  /**
 * **Activate/Disable Follow Motion Device** `(Execution.Follow_Motion.Set_Device_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **365** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_FollowMotion_SetDeviceState: "Execution.Follow_Motion.Set_Device_State",

  /**
 * **Activate/Disable Character Disruptor Device** `(Hidden.Execution.Set_Disruptor_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **366** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Unk` || `Input1` ||  |
 * | 2 || 🔹 || `Bol` || `Input2` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_SetDisruptorState: "Hidden.Execution.Set_Disruptor_State",

  /**
 * **Activate/Disable Collision Trigger Source** `(Execution.Collision_Trigger_Source.Set_Source_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **367** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_activate` || 是否激活 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CollisionTriggerSource_SetSourceState: "Execution.Collision_Trigger_Source.Set_Source_State",

  /**
 * **Remove Entity** `(Execution.Entity_Related.Remove_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **372** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_EntityRelated_RemoveEntity: "Execution.Entity_Related.Remove_Entity",

  /**
 * **When Entity Is Destroyed** `(Trigger.Entity_Related.On_Destroyed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **373** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Vec` || `position` || 位置 |
 * | 3 || 🔸 || `Vec` || `rotation` || 朝向 |
 * | 4 || 🔸 || `E<ENTY>` || `entity_type` || 实体类型 |
 * | 5 || 🔸 || `Fct` || `camp` || 阵营 |
 * | 6 || 🔸 || `Ety` || `damage_source` || 伤害来源 |
 * | 7 || 🔸 || `Ety` || `owner_entity` || 归属者实体 |
 * | 8 || 🔸 || `Vss` || `custom_vars_snap` || 自定义变量组件快照 |
 */
  Trigger_EntityRelated_OnDestroyed: "Trigger.Entity_Related.On_Destroyed",

  /**
 * **When Creation Enters Combat** `(Trigger.Creation.On_Enter_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **374** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_Creation_OnEnterCombat: "Trigger.Creation.On_Enter_Combat",

  /**
 * **When Creation Leaves Combat** `(Trigger.Creation.On_Leave_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **375** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_Creation_OnLeaveCombat: "Trigger.Creation.On_Leave_Combat",

  /**
 * **Get Creation's Current Target** `(Query.Creation.Get_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **376** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `creation` || 造物实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `target` || 目标实体 |
 */
  Query_Creation_GetTarget: "Query.Creation.Get_Target",

  /**
 * **Get Entity List by Specified Type** `(Query.Entity_Related.Get_By_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **377** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `L<Ety>` || `source_list` || 目标实体列表 |
 * | 1 || 🔹 || `E<ENTY>` || `entity_type` || 实体类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result_list` || 结果列表 |
 */
  Query_EntityRelated_GetByType: "Query.Entity_Related.Get_By_Type",

  /**
 * **Get Entity List by Specified Prefab** `(Query.Entity_Related.Get_By_Prefab)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **378** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `L<Ety>` || `source_list` || 目标实体列表 |
 * | 1 || 🔹 || `Pfb` || `component_id` || 元件ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result_list` || 结果列表 |
 */
  Query_EntityRelated_GetByPrefab: "Query.Entity_Related.Get_By_Prefab",

  /**
 * **Get Entity List by Specified Faction** `(Query.Entity_Related.Get_By_Faction)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **379** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `L<Ety>` || `source_list` || 目标实体列表 |
 * | 1 || 🔹 || `Fct` || `camp` || 阵营 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result_list` || 结果列表 |
 */
  Query_EntityRelated_GetByFaction: "Query.Entity_Related.Get_By_Faction",

  /**
 * **Get Entity List by Specified Range** `(Query.Entity_Related.Get_By_Range)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **380** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `L<Ety>` || `source_list` || 目标实体列表 |
 * | 1 || 🔹 || `Vec` || `center` || 中心点 |
 * | 2 || 🔹 || `Flt` || `radius` || 半径 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result_list` || 结果列表 |
 */
  Query_EntityRelated_GetByRange: "Query.Entity_Related.Get_By_Range",

  /**
 * **Get Creation Attribute** `(Query.Creation.Get_Attribute)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **381** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `creation` || 造物实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `level` || 等级 |
 * | 1 || 🔸 || `Flt` || `hp_cur` || 当前生命值 |
 * | 2 || 🔸 || `Flt` || `hp_max` || 上限生命值 |
 * | 3 || 🔸 || `Flt` || `atk_cur` || 当前攻击力 |
 * | 4 || 🔸 || `Flt` || `atk_base` || 基础攻击力 |
 * | 5 || 🔸 || `Flt` || `poise_max` || 受打断值上限 |
 * | 6 || 🔸 || `Flt` || `poise_cur` || 当前受打断值 |
 * | 7 || 🔸 || `E<CIRS>` || `poise_state` || 当前受打断状态 |
 */
  Query_Creation_GetAttribute: "Query.Creation.Get_Attribute",

  /**
 * **Switch Current Interface Layout** `(Execution.UI_Control_Group.Switch_Layout)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **382** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `layout_index` || 布局索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UIControlGroup_SwitchLayout: "Execution.UI_Control_Group.Switch_Layout",

  /**
 * **Activate UI Control Group in Control Group Library** `(Execution.UI_Control_Group.Activate_Group)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **383** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `group_index` || 界面控件组索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UIControlGroup_ActivateGroup: "Execution.UI_Control_Group.Activate_Group",

  /**
 * **Modify UI Control Status Within the Interface Layout** `(Execution.UI_Control_Group.Modify_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **384** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `control_index` || 界面控件索引 |
 * | 2 || 🔹 || `E<UICG>` || `display_state` || 显示状态 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UIControlGroup_ModifyStatus: "Execution.UI_Control_Group.Modify_Status",

  /**
 * **When Player Class Changes** `(Trigger.Class.On_Class_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **385** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Cfg` || `career_config_id_old` || 更改前职业配置ID |
 * | 3 || 🔸 || `Cfg` || `career_config_id_new` || 更改后职业配置ID |
 */
  Trigger_Class_OnClassChange: "Trigger.Class.On_Class_Change",

  /**
 * **When Player Class Level Changes** `(Trigger.Class.On_Level_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **386** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Int` || `level_old` || 变化前等级 |
 * | 3 || 🔸 || `Int` || `level_new` || 变化后等级 |
 */
  Trigger_Class_OnLevelChange: "Trigger.Class.On_Level_Change",

  /**
 * **Query Player Class** `(Query.Class.Get_Class)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **387** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `career_id` || 职业配置ID |
 */
  Query_Class_GetClass: "Query.Class.Get_Class",

  /**
 * **Query Player Class Level** `(Query.Class.Get_Level)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **388** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 * | 1 || 🔹 || `Cfg` || `career_id` || 职业配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `level` || 等级 |
 */
  Query_Class_GetLevel: "Query.Class.Get_Level",

  /**
 * **Change Player Class** `(Execution.Class.Change_Class)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **389** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Cfg` || `class_id` || 职业配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Class_ChangeClass: "Execution.Class.Change_Class",

  /**
 * **Increase Player's Current Class EXP** `(Execution.Class.Add_Exp)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **390** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `exp` || 经验值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Class_AddExp: "Execution.Class.Add_Exp",

  /**
 * **Change Player's Current Class Level** `(Execution.Class.Set_Level)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **391** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `level` || 等级 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Class_SetLevel: "Execution.Class.Set_Level",

  /**
 * **When Skill Node Is Called** `(Trigger.Skill.On_Skill_Call)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **392** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `invoker_entity` || 调用者实体 |
 * | 1 || 🔸 || `Gid` || `invoker_guid` || 调用者GUID |
 * | 2 || 🔸 || `Str` || `param1` || 参数1 |
 * | 3 || 🔸 || `Str` || `param2` || 参数2 |
 * | 4 || 🔸 || `Str` || `param3` || 参数3 |
 */
  Trigger_Skill_OnSkillCall: "Trigger.Skill.On_Skill_Call",

  /**
 * **Modify Skill Resource Amount** `(Execution.Skill.Modify_Resource)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **393** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `resource_config_id` || 技能资源配置ID |
 * | 2 || 🔹 || `Flt` || `delta_value` || 变更值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_ModifyResource: "Execution.Skill.Modify_Resource",

  /**
 * **Set Skill Resource Amount** `(Execution.Skill.Set_Resource)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **394** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `resource_config_id` || 技能资源配置ID |
 * | 2 || 🔹 || `Flt` || `target_value` || 目标值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_SetResource: "Execution.Skill.Set_Resource",

  /**
 * **Add Character Skill** `(Execution.Skill.Add_Skill)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **395** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `skill_config_id` || 技能配置ID |
 * | 2 || 🔹 || `E<SLOT>` || `skill_slot` || 技能槽位 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_AddSkill: "Execution.Skill.Add_Skill",

  /**
 * **Delete Character Skill by ID** `(Execution.Skill.Remove_By_ID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **396** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `skill_config_id` || 技能配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_RemoveByID: "Execution.Skill.Remove_By_ID",

  /**
 * **Initialize Character Skill** `(Execution.Skill.Init_Skill)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **397** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<SLOT>` || `skill_slot` || 角色技能槽位 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_InitSkill: "Execution.Skill.Init_Skill",

  /**
 * **Query Character Skill** `(Query.Skill.Get_Skill_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **398** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `character` || 角色实体 |
 * | 1 || 🔹 || `E<SLOT>` || `slot` || 角色技能槽位 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `skill_config` || 技能配置ID |
 */
  Query_Skill_GetSkillInfo: "Query.Skill.Get_Skill_Info",

  /**
 * **Delete Character Skill by Slot** `(Execution.Skill.Remove_By_Slot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **399** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<SLOT>` || `skill_slot` || 角色技能槽位 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_RemoveBySlot: "Execution.Skill.Remove_By_Slot",

  /**
 * **When Native Custom Value Changes** `(Hidden.Trigger.On_Native_Value_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **428** || 🖥️ Server || 🚫 Hidden || 🧩Variant |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `Output0` ||  |
 * | 1 || 🔸 || `Gid` || `Output1` ||  |
 * | 2 || 🔸 || `Str` || `Output2` ||  |
 * | 3 || 🔶 || **`R<T>`** || `Output3` ||  |
 * | 4 || 🔶 || **`R<T>`** || `Output4` ||  |
 * | 5 || 🔸 || `Bol` || `Output5` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Hidden_Trigger_OnNativeValueChange: "Hidden.Trigger.On_Native_Value_Change",

  /**
 * **Native Setting Custom Value** `(Hidden.Execution.Set_Native_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **445** || 🖥️ Server || 🚫 Hidden || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔷 || **`R<T>`** || `Input2` ||  |
 * | 3 || 🔹 || `Bol` || `Input3` ||  |
 * | 4 || 🔹 || `Bol` || `Input4` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Hidden_Execution_SetNativeValue: "Hidden.Execution.Set_Native_Value",

  /**
 * **Native Query Custom Value** `(Hidden.Query.Get_Native_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **459** || 🖥️ Server || 🚫 Hidden || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Unk` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔹 || `Bol` || `Input2` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `Output0` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Hidden_Query_GetNativeValue: "Hidden.Query.Get_Native_Value",

  /**
 * **Clear Special Effects Based on Special Effect Assets** `(Execution.Special_Effect.Stop_By_Asset)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **473** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `effect_asset` || 特效资产 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SpecialEffect_StopByAsset: "Execution.Special_Effect.Stop_By_Asset",

  /**
 * **3D Vector Rotation** `(Arithmetic.Math.Vector_Rotate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **474** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 1 || 🔹 || `Vec` || `vector` || 被旋转的三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorRotate: "Arithmetic.Math.Vector_Rotate",

  /**
 * **Enumerations Equal** `(Arithmetic.General.Enum_Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **475** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `enum1` || 枚举1 |
 * | 1 || 🔷 || **`R<T>`** || `enum2` || 枚举2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:E<OCMP>>`
 * * `C<T:E<LOGC>>`
 * * `C<T:E<MATH>>`
 * * `C<T:E<SHAP>>`
 * * `C<T:E<SURV>>`
 * * `C<T:E<SORT>>`
 * * `C<T:E<ROND>>`
 * * `C<T:E<TCOV>>`
 * * `C<T:E<MPPT>>`
 * * `C<T:E<MOTN>>`
 * * `C<T:E<FOLO>>`
 * * `C<T:E<SYSC>>`
 * * `C<T:E<ELMT>>`
 * * `C<T:E<ENTY>>`
 * * `C<T:E<STAD>>`
 * * `C<T:E<STRE>>`
 * * `C<T:E<STRS>>`
 * * `C<T:E<RPSS>>`
 * * `C<T:E<DWNR>>`
 * * `C<T:E<TRIG>>`
 * * `C<T:E<DDVT>>`
 * * `C<T:E<DDOR>>`
 * * `C<T:E<UICG>>`
 * * `C<T:E<TGTT>>`
 * * `C<T:E<TIGR>>`
 * * `C<T:E<HITT>>`
 * * `C<T:E<ATKT>>`
 * * `C<T:E<HITP>>`
 * * `C<T:E<CIRS>>`
 * * `C<T:E<GMOD>>`
 * * `C<T:E<IDVT>>`
 * * `C<T:E<SLOT>>`
 * * `C<T:E<SNDM>>`
 * * `C<T:E<SLCR>>`
 * * `C<T:E<SETL>>`
 * * `C<T:E<ITMC>>`
 * * `C<T:E<LOOT>>`
 * * `C<T:E<DRFM>>`
 * * `C<T:E<REAC>>`
 */
  Arithmetic_General_EnumEqual: "Arithmetic.General.Enum_Equal",

  /**
 * **3D Vector Dot Product** `(Arithmetic.Math.Vector_Dot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **505** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `a` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `b` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_Math_VectorDot: "Arithmetic.Math.Vector_Dot",

  /**
 * **3D Vector Cross Product** `(Arithmetic.Math.Vector_Cross)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **506** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `a` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `b` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorCross: "Arithmetic.Math.Vector_Cross",

  /**
 * **Query If Entity Is on the Field** `(Query.Entity_Related.Is_Active)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **507** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `is_alive` || 是否在场 |
 */
  Query_EntityRelated_IsActive: "Query.Entity_Related.Is_Active",

  /**
 * **Query If Entity Has Unit Status** `(Query.Unit_Status.Has_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **508** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 单位状态配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `exists` || 是否具有 |
 */
  Query_UnitStatus_HasStatus: "Query.Unit_Status.Has_Status",

  /**
 * **List Iteration Loop** `(Execution.List_Operation.For_Each)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **509** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `Start` ||  |
 * | - || ▶️ || - || `Break` ||  |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 迭代列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `Iteration` ||  |
 * | - || ⏩ || - || `End` ||  |
 * | 0 || 🔶 || **`R<T>`** || `item` || 迭代值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Ety>`
 * * `C<T:Flt>`
 * * `C<T:Gid>`
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Vec>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_ListOperation_ForEach: "Execution.List_Operation.For_Each",

  /**
 * **Get Entity Forward Vector** `(Query.Entity_Related.Get_Forward)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **516** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `forward` || 向前向量 |
 */
  Query_EntityRelated_GetForward: "Query.Entity_Related.Get_Forward",

  /**
 * **Get Entity Right Vector** `(Query.Entity_Related.Get_Right)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **517** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `right` || 向右向量 |
 */
  Query_EntityRelated_GetRight: "Query.Entity_Related.Get_Right",

  /**
 * **Get Entity Upward Vector** `(Query.Entity_Related.Get_Up)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **518** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `up` || 向上向量 |
 */
  Query_EntityRelated_GetUp: "Query.Entity_Related.Get_Up",

  /**
 * **Direction Vector to Rotation** `(Arithmetic.Math.Vector_To_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **519** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 1 || 🔹 || `Vec` || `dir` || 方向向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_Math_VectorToRotation: "Arithmetic.Math.Vector_To_Rotation",

  /**
 * **Add Target-Oriented Rotation-Based Motion Device** `(Execution.Motion_Device.Add_Target_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **520** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 * | 2 || 🔹 || `Flt` || `duration` || 运动器时长 |
 * | 3 || 🔹 || `Vec` || `target_euler` || 目标角度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_AddTargetRotation: "Execution.Motion_Device.Add_Target_Rotation",

  /**
 * **Remove Interface Control Group From Control Group Library** `(Execution.UI_Control_Group.Remove_Group)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **521** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `group_index` || 界面控件组索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UIControlGroup_RemoveGroup: "Execution.UI_Control_Group.Remove_Group",

  /**
 * **Get Object Attribute** `(Query.Entity_Related.Get_Obj_Attr)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **580** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `object_entity` || 物件实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `level` || 等级 |
 * | 1 || 🔸 || `Flt` || `hp_cur` || 当前生命值 |
 * | 2 || 🔸 || `Flt` || `hp_max` || 上限生命值 |
 * | 3 || 🔸 || `Flt` || `atk_cur` || 当前攻击力 |
 * | 4 || 🔸 || `Flt` || `atk_base` || 基础攻击力 |
 * | 5 || 🔸 || `Flt` || `def_cur` || 当前防御力 |
 * | 6 || 🔸 || `Flt` || `def_base` || 基础防御力 |
 */
  Query_EntityRelated_GetObjAttr: "Query.Entity_Related.Get_Obj_Attr",

  /**
 * **Recover HP** `(Execution.Combat.Recover_HP)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **583** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Flt` || `heal_amount` || 恢复量 |
 * | 2 || 🔹 || `Str` || `ability_unit` || 能力单元 |
 * | 3 || 🔹 || `Bol` || `override_ability_unit` || 是否覆盖能力单元配置 |
 * | 4 || 🔹 || `Ety` || `heal_source` || 恢复发起者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Combat_RecoverHP: "Execution.Combat.Recover_HP",

  /**
 * **When HP Is Recovered** `(Trigger.Combat.On_HP_Recover)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **584** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `healer` || 治疗者实体 |
 * | 3 || 🔸 || `Flt` || `heal_amount` || 恢复量 |
 * | 4 || 🔸 || `L<Str>` || `heal_tags` || 恢复标签列表 |
 */
  Trigger_Combat_OnHPRecover: "Trigger.Combat.On_HP_Recover",

  /**
 * **When Initiating HP Recovery** `(Trigger.Combat.On_HP_Recovery_Start)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **585** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `heal_target` || 恢复目标实体 |
 * | 3 || 🔸 || `Flt` || `heal_amount` || 恢复量 |
 * | 4 || 🔸 || `L<Str>` || `heal_tags` || 恢复标签列表 |
 */
  Trigger_Combat_OnHPRecoveryStart: "Trigger.Combat.On_HP_Recovery_Start",

  /**
 * **Add Unit Tag to Entity** `(Execution.Unit_Tag.Add_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **586** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `tag_index` || 单位标签索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UnitTag_AddTag: "Execution.Unit_Tag.Add_Tag",

  /**
 * **Remove Unit Tag from Entity** `(Execution.Unit_Tag.Remove_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **587** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `tag_index` || 单位标签索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UnitTag_RemoveTag: "Execution.Unit_Tag.Remove_Tag",

  /**
 * **Clear Unit Tags from Entity** `(Execution.Unit_Tag.Clear_Tags)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **588** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_UnitTag_ClearTags: "Execution.Unit_Tag.Clear_Tags",

  /**
 * **Get Entity Unit Tag List** `(Query.Unit_Tag.Get_Tags)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **589** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `unit_tags` || 单位标签列表 |
 */
  Query_UnitTag_GetTags: "Query.Unit_Tag.Get_Tags",

  /**
 * **Get Entity List by Unit Tag** `(Query.Unit_Tag.Get_By_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **590** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `unit_tag_index` || 单位标签索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_UnitTag_GetByTag: "Query.Unit_Tag.Get_By_Tag",

  /**
 * **Close Specified Sound Effect Player** `(Execution.Sound_Effect.Close_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **591** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `player_index` || 音效播放器序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_ClosePlayer: "Execution.Sound_Effect.Close_Player",

  /**
 * **Start/Pause Specified Sound Effect Player** `(Execution.Sound_Effect.Toggle_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **592** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `player_index` || 音效播放器序号 |
 * | 2 || 🔹 || `Bol` || `should_resume` || 是否恢复 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_TogglePlayer: "Execution.Sound_Effect.Toggle_Player",

  /**
 * **Adjust Specified Sound Effect Player** `(Execution.Sound_Effect.Adjust_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **593** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `player_index` || 音效播放器序号 |
 * | 2 || 🔹 || `Int` || `volume` || 音量 |
 * | 3 || 🔹 || `Flt` || `playback_rate` || 播放速度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_AdjustPlayer: "Execution.Sound_Effect.Adjust_Player",

  /**
 * **Add Sound Effect Player** `(Execution.Sound_Effect.Add_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **594** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `audio_asset_index` || 音效资产索引 |
 * | 2 || 🔹 || `Int` || `volume` || 音量 |
 * | 3 || 🔹 || `Flt` || `playback_rate` || 播放速度 |
 * | 4 || 🔹 || `Bol` || `loop` || 是否循环播放 |
 * | 5 || 🔹 || `Flt` || `loop_interval` || 循环间隔时间 |
 * | 6 || 🔹 || `Bol` || `is3_d` || 是否为3D音效 |
 * | 7 || 🔹 || `Flt` || `radius` || 范围半径 |
 * | 8 || 🔹 || `E<SNDM>` || `attenuation` || 衰减方式 |
 * | 9 || 🔹 || `Str` || `socket_name` || 挂接点名称 |
 * | 10 || 🔹 || `Vec` || `socket_offset` || 挂接点偏移 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Int` || `created_player_index` || 音效播放器序号 |
 */
  Execution_SoundEffect_AddPlayer: "Execution.Sound_Effect.Add_Player",

  /**
 * **Start/Pause Player Background Music** `(Execution.Sound_Effect.Toggle_BGM)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **595** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `should_resume` || 是否恢复 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_ToggleBGM: "Execution.Sound_Effect.Toggle_BGM",

  /**
 * **Adjust Player Background Music Volume** `(Execution.Sound_Effect.Set_BGM_Volume)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **596** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `volume` || 音量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_SetBGMVolume: "Execution.Sound_Effect.Set_BGM_Volume",

  /**
 * **Modify Player Background Music** `(Execution.Sound_Effect.Set_BGM)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **597** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `bgm_index` || 背景音乐索引 |
 * | 2 || 🔹 || `Flt` || `start_time` || 开始时间 |
 * | 3 || 🔹 || `Flt` || `end_time` || 结束时间 |
 * | 4 || 🔹 || `Int` || `volume` || 音量 |
 * | 5 || 🔹 || `Bol` || `loop` || 是否循环播放 |
 * | 6 || 🔹 || `Flt` || `loop_interval` || 循环播放间隔 |
 * | 7 || 🔹 || `Flt` || `playback_rate` || 播放速度 |
 * | 8 || 🔹 || `Bol` || `allow_join_leave` || 是否允许新入/新出 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_SetBGM: "Execution.Sound_Effect.Set_BGM",

  /**
 * **Player Plays One-Shot 2D Sound Effect** `(Execution.Sound_Effect.Play_2D_One_Shot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **598** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `audio_asset_index` || 音效资产索引 |
 * | 2 || 🔹 || `Int` || `volume` || 音量 |
 * | 3 || 🔹 || `Flt` || `playback_rate` || 播放速度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SoundEffect_Play2DOneShot: "Execution.Sound_Effect.Play_2D_One_Shot",

  /**
 * **Set the Aggro Value of Specified Entity** `(Execution.Custom_Aggro.Set_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **599** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner_entity` || 仇恨拥有者实体 |
 * | 2 || 🔹 || `Int` || `hatred_value` || 仇恨值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggro_SetAggro: "Execution.Custom_Aggro.Set_Aggro",

  /**
 * **Remove Target Entity From Aggro List** `(Execution.Custom_Aggro.Remove_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **600** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner_entity` || 仇恨拥有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggro_RemoveAggro: "Execution.Custom_Aggro.Remove_Aggro",

  /**
 * **Clear Specified Target's Aggro List** `(Execution.Custom_Aggro.Clear_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **601** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 仇恨拥有者 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggro_ClearAggro: "Execution.Custom_Aggro.Clear_Aggro",

  /**
 * **Taunt Target** `(Execution.Custom_Aggro.Taunt)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **602** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `taunter` || 嘲讽者实体 |
 * | 1 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggro_Taunt: "Execution.Custom_Aggro.Taunt",

  /**
 * **Query the Aggro Value of the Specified Entity** `(Query.Custom_Aggro.Get_Aggro_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **603** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标 |
 * | 1 || 🔹 || `Ety` || `owner_entity` || 仇恨拥有者 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `hatred` || 仇恨值 |
 */
  Query_CustomAggro_GetAggroValue: "Query.Custom_Aggro.Get_Aggro_Value",

  /**
 * **Query the Aggro Multiplier of the Specified Entity** `(Query.Custom_Aggro.Get_Multiplier)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **604** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `multiplier` || 仇恨倍率 |
 */
  Query_CustomAggro_GetMultiplier: "Query.Custom_Aggro.Get_Multiplier",

  /**
 * **Query Global Aggro Transfer Multiplier** `(Query.Custom_Aggro.Get_Global_Multiplier)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **605** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `multiplier` || 全局仇恨转移倍率 |
 */
  Query_CustomAggro_GetGlobalMultiplier: "Query.Custom_Aggro.Get_Global_Multiplier",

  /**
 * **Get the Aggro Target of the Specified Entity** `(Query.Custom_Aggro.Get_Aggro_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **606** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 仇恨拥有者 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `hatred_target` || 仇恨目标 |
 */
  Query_CustomAggro_GetAggroTarget: "Query.Custom_Aggro.Get_Aggro_Target",

  /**
 * **Get List of Owners Who Have the Target in Their Aggro List** `(Query.Custom_Aggro.Get_Aggro_Owners)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **607** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `owners` || 仇恨拥有者列表 |
 */
  Query_CustomAggro_GetAggroOwners: "Query.Custom_Aggro.Get_Aggro_Owners",

  /**
 * **Get List of Owners That Have the Target As Their Aggro Target** `(Query.Custom_Aggro.Get_Targeting_Owners)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **608** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `owners` || 仇恨拥有者列表 |
 */
  Query_CustomAggro_GetTargetingOwners: "Query.Custom_Aggro.Get_Targeting_Owners",

  /**
 * **Get the Aggro List of the Specified Entity** `(Query.Custom_Aggro.Get_Aggro_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **609** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `hatred_list` || 仇恨列表 |
 */
  Query_CustomAggro_GetAggroList: "Query.Custom_Aggro.Get_Aggro_List",

  /**
 * **Query if Specified Entity Is in Combat** `(Query.Custom_Aggro.Is_In_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **610** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `in_combat` || 是否入战 |
 */
  Query_CustomAggro_IsInCombat: "Query.Custom_Aggro.Is_In_Combat",

  /**
 * **When Aggro Target Changes** `(Trigger.Custom_Aggro.On_Target_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **611** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `target_old` || 变化前仇恨目标 |
 * | 3 || 🔸 || `Ety` || `target_new` || 变化后仇恨目标 |
 */
  Trigger_CustomAggro_OnTargetChange: "Trigger.Custom_Aggro.On_Target_Change",

  /**
 * **When Self Enters Combat** `(Trigger.Custom_Aggro.On_Enter_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **612** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_CustomAggro_OnEnterCombat: "Trigger.Custom_Aggro.On_Enter_Combat",

  /**
 * **When Self Leaves Combat** `(Trigger.Custom_Aggro.On_Leave_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **613** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 */
  Trigger_CustomAggro_OnLeaveCombat: "Trigger.Custom_Aggro.On_Leave_Combat",

  /**
 * **Query If Faction Is Hostile** `(Query.Faction_Related.Is_Hostile)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **614** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Fct` || `camp_a` || 阵营1 |
 * | 1 || 🔹 || `Fct` || `camp_b` || 阵营2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `hostile` || 是否敌对 |
 */
  Query_FactionRelated_IsHostile: "Query.Faction_Related.Is_Hostile",

  /**
 * **Add Entity Active Nameplate** `(Hidden.Execution.Add_Nameplate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **615** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Cfg` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_AddNameplate: "Hidden.Execution.Add_Nameplate",

  /**
 * **Delete Entity Active Nameplate** `(Hidden.Execution.Remove_Nameplate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **616** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Cfg` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_RemoveNameplate: "Hidden.Execution.Remove_Nameplate",

  /**
 * **Set Entity Active Nameplate** `(Execution.Nameplate.Set_Nameplate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **617** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `L<Cfg>` || `config_id_list` || 铭牌配置ID列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Nameplate_SetNameplate: "Execution.Nameplate.Set_Nameplate",

  /**
 * **Switch Creation Patrol Template** `(Execution.Creation_Patrol.Switch_Template)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **618** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `construct_entity` || 造物实体 |
 * | 1 || 🔹 || `Int` || `template_index` || 巡逻模板序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CreationPatrol_SwitchTemplate: "Execution.Creation_Patrol.Switch_Template",

  /**
 * **Get Current Creation's Patrol Template** `(Query.Creature_Patrol.Get_Patrol_Template)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **619** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `creation` || 造物实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `template_idx` || 巡逻模板序号 |
 * | 1 || 🔸 || `Int` || `path_index` || 路径索引 |
 * | 2 || 🔸 || `Int` || `target_point` || 目标路点序号 |
 */
  Query_CreaturePatrol_GetPatrolTemplate: "Query.Creature_Patrol.Get_Patrol_Template",

  /**
 * **When Creation Reaches Patrol Waypoint** `(Trigger.Creation_Patrol.On_Reach_Waypoint)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **620** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `construct_entity` || 造物实体 |
 * | 1 || 🔸 || `Gid` || `construct_guid` || 造物GUID |
 * | 2 || 🔸 || `Int` || `patrol_template_index` || 当前巡逻模板序号 |
 * | 3 || 🔸 || `Int` || `path_index` || 当前路径索引 |
 * | 4 || 🔸 || `Int` || `current_waypoint_index` || 当前抵达路点序号 |
 * | 5 || 🔸 || `Int` || `next_waypoint_index` || 即将前往路点序号 |
 */
  Trigger_CreationPatrol_OnReachWaypoint: "Trigger.Creation_Patrol.On_Reach_Waypoint",

  /**
 * **Get Specified Waypoint Info** `(Query.Global_Path.Get_Waypoint)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **621** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `path_index` || 路径索引 |
 * | 1 || 🔹 || `Int` || `point_index` || 路径路点序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `position` || 路点位置 |
 * | 1 || 🔸 || `Vec` || `rotation` || 路点朝向 |
 */
  Query_GlobalPath_GetWaypoint: "Query.Global_Path.Get_Waypoint",

  /**
 * **Switch Active Text Bubble** `(Execution.Text_Bubble.Set_Bubble)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **631** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 文本气泡配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_TextBubble_SetBubble: "Execution.Text_Bubble.Set_Bubble",

  /**
 * **Invoke Deck Selector** `(Execution.Deck_Selector.Open)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **632** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `picker_index` || 卡牌选择器索引 |
 * | 2 || 🔹 || `Flt` || `duration` || 选择时长 |
 * | 3 || 🔹 || `L<Int>` || `result_map_list` || 选择结果对应列表 |
 * | 4 || 🔹 || `L<Int>` || `display_map_list` || 选择显示对应列表 |
 * | 5 || 🔹 || `Int` || `select_min` || 选择数量下限 |
 * | 6 || 🔹 || `Int` || `select_max` || 选择数量上限 |
 * | 7 || 🔹 || `E<DRFM>` || `refresh_mode` || 刷新方式 |
 * | 8 || 🔹 || `Int` || `refresh_min` || 刷新数量下限 |
 * | 9 || 🔹 || `Int` || `refresh_max` || 刷新数量上限 |
 * | 10 || 🔹 || `L<Int>` || `default_return` || 默认返回选择 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_DeckSelector_Open: "Execution.Deck_Selector.Open",

  /**
 * **When Deck Selector Is Complete** `(Trigger.Deck_Selector.On_Deck_Selected)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **633** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `target_player` || 目标玩家 |
 * | 1 || 🔸 || `L<Int>` || `result_list` || 选择结果列表 |
 * | 2 || 🔸 || `E<SLCR>` || `complete_reason` || 完成原因 |
 * | 3 || 🔸 || `Int` || `picker_index` || 卡牌选择器索引 |
 */
  Trigger_DeckSelector_OnDeckSelected: "Trigger.Deck_Selector.On_Deck_Selected",

  /**
 * **Modify Mini-Map Zoom** `(Execution.Minimap_Marker.Set_Zoom)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **634** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_player` || 目标玩家 |
 * | 1 || 🔹 || `Flt` || `scale` || 缩放尺寸 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MinimapMarker_SetZoom: "Execution.Minimap_Marker.Set_Zoom",

  /**
 * **Modify Mini-Map Marker Activation Status** `(Execution.Minimap_Marker.Set_Marker_State)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **635** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `L<Int>` || `marker_index_list` || 小地图标识序号列表 |
 * | 2 || 🔹 || `Bol` || `enabled` || 是否生效 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MinimapMarker_SetMarkerState: "Execution.Minimap_Marker.Set_Marker_State",

  /**
 * **Modify Player List for Visible Mini-Map Markers** `(Execution.Minimap_Marker.Set_Visible_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **636** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `marker_index` || 小地图标识序号 |
 * | 2 || 🔹 || `L<Ety>` || `player_list` || 玩家列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MinimapMarker_SetVisibleList: "Execution.Minimap_Marker.Set_Visible_List",

  /**
 * **Modify Player List for Tracking Mini-Map Markers** `(Execution.Minimap_Marker.Set_Track_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **637** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `marker_index` || 小地图标识序号 |
 * | 2 || 🔹 || `L<Ety>` || `player_list` || 玩家列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MinimapMarker_SetTrackList: "Execution.Minimap_Marker.Set_Track_List",

  /**
 * **Query Specified Mini-Map Marker Information** `(Query.Minimap_Marker.Get_Marker_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **638** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `marker_index` || 小地图标识序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `enabled` || 生效状态 |
 * | 1 || 🔸 || `L<Ety>` || `visible_players` || 可见标识的玩家列表 |
 * | 2 || 🔸 || `L<Ety>` || `tracking_players` || 追踪标识的玩家列表 |
 */
  Query_MinimapMarker_GetMarkerInfo: "Query.Minimap_Marker.Get_Marker_Info",

  /**
 * **Get Entity's Mini-Map Marker Status** `(Query.Minimap_Marker.Get_Marker_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **639** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `all_markers` || 全量小地图标识序号列表 |
 * | 1 || 🔸 || `L<Int>` || `enabled_markers` || 生效的小地图标识序号列表 |
 * | 2 || 🔸 || `L<Int>` || `disabled_markers` || 未生效的小地图标识序号列表 |
 */
  Query_MinimapMarker_GetMarkerStatus: "Query.Minimap_Marker.Get_Marker_Status",

  /**
 * **Modify Player Markers on the Mini-Map** `(Execution.Minimap_Marker.Update_Markers)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **640** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `marker_index` || 小地图标识序号 |
 * | 2 || 🔹 || `Ety` || `player_entity` || 对应玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MinimapMarker_UpdateMarkers: "Execution.Minimap_Marker.Update_Markers",

  /**
 * **Close Deck Selector** `(Execution.Deck_Selector.Close)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **641** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_player` || 目标玩家 |
 * | 1 || 🔹 || `Int` || `picker_index` || 卡牌选择器索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_DeckSelector_Close: "Execution.Deck_Selector.Close",

  /**
 * **When Elemental Reaction Event Occurs** `(Trigger.Unit_Status.On_Element_Reaction)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **642** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `E<REAC>` || `reaction_type` || 元素反应类型 |
 * | 3 || 🔸 || `Ety` || `trigger_entity` || 触发者实体 |
 * | 4 || 🔸 || `Gid` || `trigger_guid` || 触发者GUID |
 */
  Trigger_UnitStatus_OnElementReaction: "Trigger.Unit_Status.On_Element_Reaction",

  /**
 * **When Shield Is Attacked** `(Trigger.Unit_Status.On_Shield_Hit)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **643** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `attacker_entity` || 攻击者实体 |
 * | 3 || 🔸 || `Gid` || `attacker_guid` || 攻击者GUID |
 * | 4 || 🔸 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 5 || 🔸 || `Int` || `layer_before` || 攻击前层数 |
 * | 6 || 🔸 || `Int` || `layer_after` || 攻击后层数 |
 * | 7 || 🔸 || `Flt` || `shield_amount_before` || 攻击前该单位状态的护盾含量 |
 * | 8 || 🔸 || `Flt` || `shield_amount_after` || 攻击后该单位状态的护盾含量 |
 */
  Trigger_UnitStatus_OnShieldHit: "Trigger.Unit_Status.On_Shield_Hit",

  /**
 * **Query If Achievement Is Completed** `(Query.Achievement.Is_Completed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **644** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `achievement_index` || 成就序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `completed` || 是否完成 |
 */
  Query_Achievement_IsCompleted: "Query.Achievement.Is_Completed",

  /**
 * **Set Achievement Progress Tally** `(Execution.Achievement.Set_Progress)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **645** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 设置实体 |
 * | 1 || 🔹 || `Int` || `achievement_index` || 成就序号 |
 * | 2 || 🔹 || `Int` || `progress_count` || 进度计数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Achievement_SetProgress: "Execution.Achievement.Set_Progress",

  /**
 * **Change Achievement Progress Tally** `(Execution.Achievement.Add_Progress)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **646** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 变更实体 |
 * | 1 || 🔹 || `Int` || `achievement_index` || 成就序号 |
 * | 2 || 🔹 || `Int` || `delta` || 进度计数变更值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Achievement_AddProgress: "Execution.Achievement.Add_Progress",

  /**
 * **Set Player Settlement Scoreboard Data Display** `(Execution.Stage_Settlement.Set_Scoreboard)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **647** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 设置实体 |
 * | 1 || 🔹 || `Int` || `order` || 数据顺序 |
 * | 2 || 🔹 || `Str` || `name` || 数据名称 |
 * | 3 || 🔷 || **`R<T>`** || `value` || 数据值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 */
  Execution_StageSettlement_SetScoreboard: "Execution.Stage_Settlement.Set_Scoreboard",

  /**
 * **Set Player Settlement Ranking Value** `(Execution.Stage_Settlement.Set_Player_Rank)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **650** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `rank_value` || 排名数值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageSettlement_SetPlayerRank: "Execution.Stage_Settlement.Set_Player_Rank",

  /**
 * **Get Player Settlement Ranking Value** `(Query.Stage_Settlement.Get_Player_Rank)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **651** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `rank_value` || 排名数值 |
 */
  Query_StageSettlement_GetPlayerRank: "Query.Stage_Settlement.Get_Player_Rank",

  /**
 * **Set Player Settlement Success Status** `(Execution.Stage_Settlement.Set_Player_Result)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **652** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `E<SETL>` || `result_state` || 结算状态 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageSettlement_SetPlayerResult: "Execution.Stage_Settlement.Set_Player_Result",

  /**
 * **Get Player Settlement Success Status** `(Query.Stage_Settlement.Get_Player_Result)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **653** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<SETL>` || `success` || 结算状态 |
 */
  Query_StageSettlement_GetPlayerResult: "Query.Stage_Settlement.Get_Player_Result",

  /**
 * **Set Faction Settlement Ranking Value** `(Execution.Stage_Settlement.Set_Faction_Rank)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **654** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Fct` || `camp` || 阵营 |
 * | 1 || 🔹 || `Int` || `rank_value` || 排名数值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageSettlement_SetFactionRank: "Execution.Stage_Settlement.Set_Faction_Rank",

  /**
 * **Get Faction Settlement Ranking Value** `(Query.Stage_Settlement.Get_Faction_Rank)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **655** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Fct` || `camp` || 阵营 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `rank_value` || 排名数值 |
 */
  Query_StageSettlement_GetFactionRank: "Query.Stage_Settlement.Get_Faction_Rank",

  /**
 * **Set Faction Settlement Success Status** `(Execution.Stage_Settlement.Set_Faction_Result)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **656** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Fct` || `camp` || 阵营 |
 * | 1 || 🔹 || `E<SETL>` || `result_state` || 结算状态 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageSettlement_SetFactionResult: "Execution.Stage_Settlement.Set_Faction_Result",

  /**
 * **Get Faction Settlement Success Status** `(Query.Stage_Settlement.Get_Faction_Result)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **657** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Fct` || `camp` || 阵营 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<SETL>` || `success` || 结算状态 |
 */
  Query_StageSettlement_GetFactionResult: "Query.Stage_Settlement.Get_Faction_Result",

  /**
 * **Get Player Ranking Info** `(Query.Rank_Tier.Get_Rank_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **658** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `total` || 玩家段位总分 |
 * | 1 || 🔸 || `Int` || `win_streak` || 玩家连胜次数 |
 * | 2 || 🔸 || `Int` || `lose_streak` || 玩家连败次数 |
 * | 3 || 🔸 || `Int` || `run_streak` || 玩家连续逃跑次数 |
 */
  Query_RankTier_GetRankInfo: "Query.Rank_Tier.Get_Rank_Info",

  /**
 * **Set Player Rank Score Change** `(Execution.Rank.Modify_Score)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **659** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `E<SETL>` || `settlement_state` || 结算状态 |
 * | 2 || 🔹 || `Int` || `delta_score` || 变化分数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Rank_ModifyScore: "Execution.Rank.Modify_Score",

  /**
 * **Get Player Rank Score Change** `(Query.Rank_Tier.Get_Score_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **660** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 * | 1 || 🔹 || `E<SETL>` || `result` || 结算状态 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `score` || 分数 |
 */
  Query_RankTier_GetScoreChange: "Query.Rank_Tier.Get_Score_Change",

  /**
 * **Set Player Escape Validity** `(Execution.Rank.Set_Escape_Valid)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **661** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Bol` || `is_valid` || 是否合法 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Rank_SetEscapeValid: "Execution.Rank.Set_Escape_Valid",

  /**
 * **Get Player Escape Validity** `(Query.Rank_Tier.Get_Escape_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **662** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `legal` || 是否合法 |
 */
  Query_RankTier_GetEscapeStatus: "Query.Rank_Tier.Get_Escape_Status",

  /**
 * **Switch the scoring group that affects player's competitive rank** `(Execution.Rank.Switch_Score_Group)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **663** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `group_index` || 计分组序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Rank_SwitchScoreGroup: "Execution.Rank.Switch_Score_Group",

  /**
 * **Query Current Environment Time** `(Query.Stage_Related.Get_Env_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **664** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `env_time` || 当前环境时间 |
 * | 1 || 🔸 || `Int` || `day_count` || 当前循环天数 |
 */
  Query_StageRelated_GetEnvTime: "Query.Stage_Related.Get_Env_Time",

  /**
 * **Set Current Environment Time** `(Execution.Stage_Related.Set_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **665** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Flt` || `environment_time` || 环境时间 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageRelated_SetTime: "Execution.Stage_Related.Set_Time",

  /**
 * **Set Environment Time Passage Speed** `(Execution.Stage_Related.Set_Time_Speed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **666** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Flt` || `environment_time_rate` || 环境时间流逝速度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_StageRelated_SetTimeSpeed: "Execution.Stage_Related.Set_Time_Speed",

  /**
 * **Toggle Entity Light Source** `(Execution.Light_Component.Toggle_Light)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **667** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `light_index` || 光源序号 |
 * | 2 || 🔹 || `Bol` || `toggle_mode` || 打开或关闭 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_LightComponent_ToggleLight: "Execution.Light_Component.Toggle_Light",

  /**
 * **Switch Follow Motion Device Target by Entity** `(Execution.Follow_Motion.Set_Target_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **668** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `follow_entity` || 跟随目标实体 |
 * | 2 || 🔹 || `Str` || `socket_name` || 跟随目标挂接点名称 |
 * | 3 || 🔹 || `Vec` || `pos_offset` || 位置偏移 |
 * | 4 || 🔹 || `Vec` || `rot_offset` || 旋转偏移 |
 * | 5 || 🔹 || `E<SYSC>` || `coord_sys` || 跟随坐标系 |
 * | 6 || 🔹 || `E<FOLO>` || `follow_type` || 跟随类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_FollowMotion_SetTargetEntity: "Execution.Follow_Motion.Set_Target_Entity",

  /**
 * **Get All Entities Within the Collision Trigger** `(Query.Collision_Trigger.Get_Overlapping_Entities)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **669** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `trigger_index` || 触发器序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_CollisionTrigger_GetOverlappingEntities: "Query.Collision_Trigger.Get_Overlapping_Entities",

  /**
 * **Get Entity Advanced Attribute** `(Query.Entity_Related.Get_Adv_Attr)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **670** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `Output0` ||  |
 * | 1 || 🔸 || `Flt` || `Output1` ||  |
 * | 2 || 🔸 || `Flt` || `Output2` ||  |
 * | 3 || 🔸 || `Flt` || `Output3` ||  |
 * | 4 || 🔸 || `Flt` || `Output4` ||  |
 * | 5 || 🔸 || `Flt` || `Output5` ||  |
 * | 6 || 🔸 || `Flt` || `Output6` ||  |
 * | 7 || 🔸 || `Flt` || `Output7` ||  |
 */
  Query_EntityRelated_GetAdvAttr: "Query.Entity_Related.Get_Adv_Attr",

  /**
 * **Get Entity Elemental Attribute** `(Query.Entity_Related.Get_Elem_Attr)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **671** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `pyro_bonus` || 火元素伤害加成 |
 * | 1 || 🔸 || `Flt` || `pyro_res` || 火元素抗性 |
 * | 2 || 🔸 || `Flt` || `hydro_bonus` || 水元素伤害加成 |
 * | 3 || 🔸 || `Flt` || `hydro_res` || 水元素抗性 |
 * | 4 || 🔸 || `Flt` || `dendro_bonus` || 草元素伤害加成 |
 * | 5 || 🔸 || `Flt` || `dendro_res` || 草元素抗性 |
 * | 6 || 🔸 || `Flt` || `electro_bonus` || 雷元素伤害加成 |
 * | 7 || 🔸 || `Flt` || `electro_res` || 雷元素抗性 |
 * | 8 || 🔸 || `Flt` || `anemo_bonus` || 风元素伤害加成 |
 * | 9 || 🔸 || `Flt` || `anemo_res` || 风元素抗性 |
 * | 10 || 🔸 || `Flt` || `cryo_bonus` || 冰元素伤害加成 |
 * | 11 || 🔸 || `Flt` || `cryo_res` || 冰元素抗性 |
 * | 12 || 🔸 || `Flt` || `geo_bonus` || 岩元素伤害加成 |
 * | 13 || 🔸 || `Flt` || `geo_res` || 岩元素抗性 |
 * | 14 || 🔸 || `Flt` || `physical_bonus` || 物理伤害加成 |
 * | 15 || 🔸 || `Flt` || `physical_res` || 物理抗性 |
 */
  Query_EntityRelated_GetElemAttr: "Query.Entity_Related.Get_Elem_Attr",

  /**
 * **Add Affix to Equipment** `(Execution.Equipment.Add_Affix)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **672** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Cfg` || `affix_config_id` || 词条配置ID |
 * | 2 || 🔹 || `Bol` || `overwrite` || 是否覆盖词条值 |
 * | 3 || 🔹 || `Flt` || `affix_value` || 词条数值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Equipment_AddAffix: "Execution.Equipment.Add_Affix",

  /**
 * **Remove Equipment Affix** `(Execution.Equipment.Remove_Affix)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **673** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Int` || `affix_index` || 词条序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Equipment_RemoveAffix: "Execution.Equipment.Remove_Affix",

  /**
 * **Modify Equipment Affix Value** `(Execution.Equipment.Modify_Affix)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **674** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Int` || `affix_index` || 词条序号 |
 * | 2 || 🔹 || `Flt` || `affix_value` || 词条数值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Equipment_ModifyAffix: "Execution.Equipment.Modify_Affix",

  /**
 * **Get Equipment Affix List** `(Query.Equipment.Get_Affixes)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **675** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `entry_list` || 装备词条列表 |
 */
  Query_Equipment_GetAffixes: "Query.Equipment.Get_Affixes",

  /**
 * **Get Equipment Affix Config ID** `(Query.Equipment.Get_Affix_Config)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **676** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Int` || `entry_index` || 词条序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `entry_config_id` || 词条配置ID |
 */
  Query_Equipment_GetAffixConfig: "Query.Equipment.Get_Affix_Config",

  /**
 * **Get Equipment Affix Value** `(Query.Equipment.Get_Affix_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **677** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Int` || `entry_index` || 词条序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `entry_value` || 装备数值 |
 */
  Query_Equipment_GetAffixValue: "Query.Equipment.Get_Affix_Value",

  /**
 * **Update Player Leaderboard Score** `(Hidden.Execution.Update_Leaderboard)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **678** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Int>` || `Input0` ||  |
 * | 1 || 🔹 || `Int` || `Input1` ||  |
 * | 2 || 🔹 || `Int` || `Input2` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Hidden_Execution_UpdateLeaderboard: "Hidden.Execution.Update_Leaderboard",

  /**
 * **When Text Bubble Is Completed** `(Trigger.Text_Bubble.On_Bubble_Complete)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **679** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 气泡归属者实体 |
 * | 1 || 🔸 || `Ety` || `character_entity` || 角色实体 |
 * | 2 || 🔸 || `Cfg` || `bubble_config_id` || 文本气泡配置ID |
 * | 3 || 🔸 || `Int` || `complete_count` || 文本气泡完成次数 |
 */
  Trigger_TextBubble_OnBubbleComplete: "Trigger.Text_Bubble.On_Bubble_Complete",

  /**
 * **When Equipment Affix Value Changes** `(Trigger.Equipment.On_Affix_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **680** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 装备持有者 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 装备持有者GUID |
 * | 2 || 🔸 || `Int` || `equip_index` || 装备索引 |
 * | 3 || 🔸 || `Int` || `affix_index` || 词条序号 |
 * | 4 || 🔸 || `Flt` || `value_old` || 改变前数值 |
 * | 5 || 🔸 || `Flt` || `value_new` || 改变后数值 |
 */
  Trigger_Equipment_OnAffixChange: "Trigger.Equipment.On_Affix_Change",

  /**
 * **When Item Is Added to Inventory** `(Trigger.Item.On_Item_Add)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **681** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 道具持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 道具持有者GUID |
 * | 2 || 🔸 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 3 || 🔸 || `Int` || `gain_count` || 获得数量 |
 */
  Trigger_Item_OnItemAdd: "Trigger.Item.On_Item_Add",

  /**
 * **When Item Is Lost From Inventory** `(Trigger.Item.On_Item_Lose)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **682** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 道具持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 道具持有者GUID |
 * | 2 || 🔸 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 3 || 🔸 || `Int` || `lost_count` || 失去数量 |
 */
  Trigger_Item_OnItemLose: "Trigger.Item.On_Item_Lose",

  /**
 * **When the Quantity of Inventory Item Changes** `(Trigger.Item.On_Item_Quantity_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **683** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 道具持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 道具持有者GUID |
 * | 2 || 🔸 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 3 || 🔸 || `Int` || `count_before` || 变化前数量 |
 * | 4 || 🔸 || `Int` || `count_after` || 变化后数量 |
 * | 5 || 🔸 || `E<ITMC>` || `change_reason` || 变化原因 |
 */
  Trigger_Item_OnItemQuantityChange: "Trigger.Item.On_Item_Quantity_Change",

  /**
 * **When the Quantity of Inventory Currency Changes** `(Trigger.Item.On_Currency_Change)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **684** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 货币持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 货币持有者GUID |
 * | 2 || 🔸 || `Cfg` || `currency_config_id` || 货币配置ID |
 * | 3 || 🔸 || `Int` || `currency_delta` || 货币变化值 |
 */
  Trigger_Item_OnCurrencyChange: "Trigger.Item.On_Currency_Change",

  /**
 * **Increase Maximum Inventory Capacity** `(Execution.Inventory.Expand_Capacity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **685** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 背包持有者实体 |
 * | 1 || 🔹 || `Int` || `delta_capacity` || 增加容量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_ExpandCapacity: "Execution.Inventory.Expand_Capacity",

  /**
 * **Modify Inventory Item Quantity** `(Execution.Inventory.Modify_Item)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **686** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 背包持有者实体 |
 * | 1 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 2 || 🔹 || `Int` || `delta` || 变更值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_ModifyItem: "Execution.Inventory.Modify_Item",

  /**
 * **Set Inventory Loot Item/Currency Quantity** `(Execution.Inventory.Set_Drop_Amount)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **687** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 背包持有者实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 道具/货币配置ID |
 * | 2 || 🔹 || `Int` || `drop_count` || 掉落数量 |
 * | 3 || 🔹 || `E<LOOT>` || `drop_type` || 掉落类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_SetDropAmount: "Execution.Inventory.Set_Drop_Amount",

  /**
 * **Modify Inventory Currency Quantity** `(Execution.Inventory.Modify_Currency)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **688** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 背包持有者实体 |
 * | 1 || 🔹 || `Cfg` || `currency_config_id` || 货币配置ID |
 * | 2 || 🔹 || `Int` || `delta` || 变更值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_ModifyCurrency: "Execution.Inventory.Modify_Currency",

  /**
 * **Get Inventory Capacity** `(Query.Item.Get_Capacity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **689** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `capacity` || 背包容量 |
 */
  Query_Item_GetCapacity: "Query.Item.Get_Capacity",

  /**
 * **Get Inventory Item Quantity** `(Query.Item.Get_Item_Amount)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **690** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 * | 1 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `item_count` || 道具数量 |
 */
  Query_Item_GetItemAmount: "Query.Item.Get_Item_Amount",

  /**
 * **Get Inventory Currency Quantity** `(Query.Item.Get_Currency_Amount)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **691** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 * | 1 || 🔹 || `Cfg` || `currency_id` || 货币配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `resource_num` || 资源数量 |
 */
  Query_Item_GetCurrencyAmount: "Query.Item.Get_Currency_Amount",

  /**
 * **When Equipment Is Initialized** `(Trigger.Equipment.On_Init)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **694** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 装备持有者 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 装备持有者GUID |
 * | 2 || 🔸 || `Int` || `equip_index` || 装备索引 |
 */
  Trigger_Equipment_OnInit: "Trigger.Equipment.On_Init",

  /**
 * **When Equipment Is Equipped** `(Trigger.Equipment.On_Equip)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **695** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 装备持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 装备持有者GUID |
 * | 2 || 🔸 || `Int` || `equip_index` || 装备索引 |
 */
  Trigger_Equipment_OnEquip: "Trigger.Equipment.On_Equip",

  /**
 * **When Equipment Is Unequipped** `(Trigger.Equipment.On_Unequip)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **696** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 装备持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 装备持有者GUID |
 * | 2 || 🔸 || `Int` || `equip_index` || 装备索引 |
 */
  Trigger_Equipment_OnUnequip: "Trigger.Equipment.On_Unequip",

  /**
 * **Loss HP** `(Execution.Combat.Loss_HP)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **697** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Flt` || `hp_loss` || 生命损失量 |
 * | 2 || 🔹 || `Bol` || `is_fatal` || 是否致命 |
 * | 3 || 🔹 || `Bol` || `can_be_blocked_by_invincible` || 是否可被无敌抵挡 |
 * | 4 || 🔹 || `Bol` || `can_be_blocked_by_lock_hp` || 是否可被锁定生命值抵挡 |
 * | 5 || 🔹 || `E<CDMG>` || `damage_floating_text_type` || 伤害跳字类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Combat_LossHP: "Execution.Combat.Loss_HP",

  /**
 * **Recover HP Directly** `(Execution.Combat.Recover_HP_Instant)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **698** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `heal_source` || 恢复发起实体 |
 * | 1 || 🔹 || `Ety` || `heal_target` || 恢复目标实体 |
 * | 2 || 🔹 || `Flt` || `heal_amount` || 恢复量 |
 * | 3 || 🔹 || `Bol` || `ignore_adjust` || 是否忽略恢复量调整 |
 * | 4 || 🔹 || `Flt` || `hatred_rate` || 产生仇恨的倍率 |
 * | 5 || 🔹 || `Flt` || `hatred_delta` || 产生仇恨的增量 |
 * | 6 || 🔹 || `L<Str>` || `heal_tags` || 治疗标签列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Combat_RecoverHPInstant: "Execution.Combat.Recover_HP_Instant",

  /**
 * **When Custom Shop Item Is Sold** `(Trigger.Shop.On_Custom_Item_Sold)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **700** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `shop_owner` || 商店持有者 |
 * | 1 || 🔸 || `Gid` || `shop_owner_guid` || 商店持有者GUID |
 * | 2 || 🔸 || `Ety` || `buyer_entity` || 购买者实体 |
 * | 3 || 🔸 || `Int` || `shop_index` || 商店序号 |
 * | 4 || 🔸 || `Int` || `item_index` || 商品序号 |
 * | 5 || 🔸 || `Int` || `buy_count` || 购买数量 |
 */
  Trigger_Shop_OnCustomItemSold: "Trigger.Shop.On_Custom_Item_Sold",

  /**
 * **When Selling Inventory Items in the Shop** `(Trigger.Shop.On_Inv_Item_Sold)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **701** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `shop_owner` || 商店持有者 |
 * | 1 || 🔸 || `Gid` || `shop_owner_guid` || 商店持有者GUID |
 * | 2 || 🔸 || `Ety` || `buyer_entity` || 购买者实体 |
 * | 3 || 🔸 || `Int` || `shop_index` || 商店序号 |
 * | 4 || 🔸 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 5 || 🔸 || `Int` || `buy_count` || 购买数量 |
 */
  Trigger_Shop_OnInvItemSold: "Trigger.Shop.On_Inv_Item_Sold",

  /**
 * **Open Shop** `(Execution.Shop.Open)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **702** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 2 || 🔹 || `Int` || `shop_index` || 商店序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_Open: "Execution.Shop.Open",

  /**
 * **Close Shop** `(Execution.Shop.Close)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **703** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_Close: "Execution.Shop.Close",

  /**
 * **Modify Custom Shop Item Sales Info** `(Execution.Shop.Modify_Custom_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **704** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Int` || `item_index` || 商品序号 |
 * | 3 || 🔹 || `Cfg` || `config_id` || 道具配置ID |
 * | 4 || 🔹 || `D<Cfg,Int>` || `sell_currency` || 出售价币字典 |
 * | 5 || 🔹 || `Int` || `page_index` || 所属页签序号 |
 * | 6 || 🔹 || `Bol` || `is_limited` || 是否限购 |
 * | 7 || 🔹 || `Int` || `limit_count` || 限购数量 |
 * | 8 || 🔹 || `Int` || `priority` || 排序优先级 |
 * | 9 || 🔹 || `Bol` || `is_sellable` || 是否可出售 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_ModifyCustomSale: "Execution.Shop.Modify_Custom_Sale",

  /**
 * **When selling items to the shop** `(Trigger.Shop.On_Sell_Item)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **705** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `shop_owner` || 商店持有者 |
 * | 1 || 🔸 || `Gid` || `shop_owner_guid` || 商店持有者GUID |
 * | 2 || 🔸 || `Ety` || `seller_entity` || 出售者实体 |
 * | 3 || 🔸 || `Int` || `shop_index` || 商店序号 |
 * | 4 || 🔸 || `D<Cfg,Int>` || `buy_dict` || 收购物品字典 |
 */
  Trigger_Shop_OnSellItem: "Trigger.Shop.On_Sell_Item",

  /**
 * **Modify Inventory Shop Item Sales Info** `(Execution.Shop.Modify_Inventory_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **706** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `config_id` || 道具配置ID |
 * | 3 || 🔹 || `D<Cfg,Int>` || `sell_currency` || 出售价币字典 |
 * | 4 || 🔹 || `Int` || `page_index` || 所属页签序号 |
 * | 5 || 🔹 || `Int` || `priority` || 排序优先级 |
 * | 6 || 🔹 || `Bol` || `is_sellable` || 是否可出售 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_ModifyInventorySale: "Execution.Shop.Modify_Inventory_Sale",

  /**
 * **Modify Item Purchase Info in the Purchase List** `(Execution.Shop.Modify_Cart_Item)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **707** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 商品道具配置ID |
 * | 3 || 🔹 || `D<Cfg,Int>` || `buy_currency` || 收购货币字典 |
 * | 4 || 🔹 || `Bol` || `is_purchasable` || 是否可收购 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_ModifyCartItem: "Execution.Shop.Modify_Cart_Item",

  /**
 * **Add New Item to Custom Shop Sales List** `(Execution.Shop.Add_Custom_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **708** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 商品道具配置ID |
 * | 3 || 🔹 || `D<Cfg,Int>` || `sell_currency` || 出售价币字典 |
 * | 4 || 🔹 || `Int` || `page_index` || 所属页签序号 |
 * | 5 || 🔹 || `Bol` || `is_limited` || 是否限购 |
 * | 6 || 🔹 || `Int` || `limit_count` || 限购数量 |
 * | 7 || 🔹 || `Int` || `priority` || 排序优先级 |
 * | 8 || 🔹 || `Bol` || `is_sellable` || 是否可出售 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Int` || `item_index_out` || 商品索引 |
 */
  Execution_Shop_AddCustomSale: "Execution.Shop.Add_Custom_Sale",

  /**
 * **Add New Item to Inventory Shop Sales List** `(Execution.Shop.Add_Inventory_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **709** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 商品道具配置ID |
 * | 3 || 🔹 || `D<Cfg,Int>` || `sell_currency` || 出售价币字典 |
 * | 4 || 🔹 || `Int` || `page_index` || 所属页签序号 |
 * | 5 || 🔹 || `Int` || `priority` || 排序优先级 |
 * | 6 || 🔹 || `Bol` || `is_sellable` || 是否可出售 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_AddInventorySale: "Execution.Shop.Add_Inventory_Sale",

  /**
 * **Add Items to the Purchase List** `(Execution.Shop.Add_To_Cart)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **710** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 商品道具配置ID |
 * | 3 || 🔹 || `D<Cfg,Int>` || `buy_currency` || 收购货币字典 |
 * | 4 || 🔹 || `Bol` || `is_purchasable` || 是否可收购 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_AddToCart: "Execution.Shop.Add_To_Cart",

  /**
 * **Remove Item From Custom Shop Sales List** `(Execution.Shop.Remove_Custom_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **711** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Int` || `item_index` || 商品序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_RemoveCustomSale: "Execution.Shop.Remove_Custom_Sale",

  /**
 * **Remove Item From Inventory Shop Sales List** `(Execution.Shop.Remove_Inventory_Sale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **712** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `config_id` || 道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_RemoveInventorySale: "Execution.Shop.Remove_Inventory_Sale",

  /**
 * **Remove item from purchase list** `(Execution.Shop.Remove_From_Cart)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **713** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 商品道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Shop_RemoveFromCart: "Execution.Shop.Remove_From_Cart",

  /**
 * **Query Custom Shop Item Sales List** `(Query.Shop.Get_Custom_Sales)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **714** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `goods_index_list` || 商品序号列表 |
 */
  Query_Shop_GetCustomSales: "Query.Shop.Get_Custom_Sales",

  /**
 * **Query Inventory Shop Item Sales List** `(Query.Shop.Get_Inv_Sales)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **715** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Cfg>` || `item_ids` || 道具配置ID列表 |
 */
  Query_Shop_GetInvSales: "Query.Shop.Get_Inv_Sales",

  /**
 * **Query Shop Purchase Item List** `(Query.Shop.Get_Cart_Items)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **716** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Cfg>` || `item_ids` || 道具配置ID列表 |
 */
  Query_Shop_GetCartItems: "Query.Shop.Get_Cart_Items",

  /**
 * **Query Custom Shop Item Sales Info** `(Query.Shop.Get_Custom_Item_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **717** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Int` || `goods_index` || 商品序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `item_config` || 道具配置ID |
 * | 1 || 🔸 || `D<Cfg,Int>` || `sell_currency` || 出售货币字典 |
 * | 2 || 🔸 || `Int` || `tab_index` || 所属页签序号 |
 * | 3 || 🔸 || `Bol` || `limited` || 是否限购 |
 * | 4 || 🔸 || `Int` || `limit_count` || 限购数量 |
 * | 5 || 🔸 || `Int` || `priority` || 排序优先级 |
 * | 6 || 🔸 || `Bol` || `can_sell` || 是否可出售 |
 */
  Query_Shop_GetCustomItemInfo: "Query.Shop.Get_Custom_Item_Info",

  /**
 * **Query Inventory Shop Item Sales Info** `(Query.Shop.Get_Inv_Item_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **718** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `sell_currency` || 出售货币字典 |
 * | 1 || 🔸 || `Int` || `priority` || 排序优先级 |
 * | 2 || 🔸 || `Bol` || `can_sell` || 是否可出售 |
 */
  Query_Shop_GetInvItemInfo: "Query.Shop.Get_Inv_Item_Info",

  /**
 * **Query Shop Item Purchase Info** `(Query.Shop.Get_Purchase_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **719** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `shop_owner` || 商店归属者实体 |
 * | 1 || 🔹 || `Int` || `shop_index` || 商店序号 |
 * | 2 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `currency_dict` || 收购货币字典 |
 * | 1 || 🔸 || `Bol` || `can_purchase` || 是否可收购 |
 */
  Query_Shop_GetPurchaseInfo: "Query.Shop.Get_Purchase_Info",

  /**
 * **Set Inventory Item Drop Content** `(Execution.Inventory.Set_Drop_Items)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **720** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `owner_entity` || 背包持有者实体 |
 * | 1 || 🔹 || `D<Cfg,Int>` || `item_drop_dict` || 道具掉落字典 |
 * | 2 || 🔹 || `E<LOOT>` || `drop_type` || 掉落类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_SetDropItems: "Execution.Inventory.Set_Drop_Items",

  /**
 * **Get all basic items from Inventory** `(Query.Item.Get_Basic_Items)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **721** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `basic_dict` || 基础道具字典 |
 */
  Query_Item_GetBasicItems: "Query.Item.Get_Basic_Items",

  /**
 * **Get All Currency From Inventory** `(Query.Item.Get_Currency_All)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **722** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `coins` || 货币字典 |
 */
  Query_Item_GetCurrencyAll: "Query.Item.Get_Currency_All",

  /**
 * **Get all equipment from Inventory** `(Query.Item.Get_Equipment_All)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **723** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `owner` || 背包持有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `equip_index_list` || 装备索引列表 |
 */
  Query_Item_GetEquipmentAll: "Query.Item.Get_Equipment_All",

  /**
 * **Trigger Loot Drop** `(Execution.Inventory.Trigger_Drop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **724** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `dropper_entity` || 掉落者实体 |
 * | 1 || 🔹 || `E<LOOT>` || `drop_type` || 掉落类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_TriggerDrop: "Execution.Inventory.Trigger_Drop",

  /**
 * **Set Loot Drop Content** `(Execution.Inventory.Set_Loot_Content)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **725** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `dropper_entity` || 掉落者实体 |
 * | 1 || 🔹 || `D<Cfg,Int>` || `loot_dict` || 战利品掉落字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_SetLootContent: "Execution.Inventory.Set_Loot_Content",

  /**
 * **Modify Loot Item Component Quantity** `(Execution.Inventory.Modify_Loot_Item)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **726** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `drop_entity` || 掉落物实体 |
 * | 1 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 2 || 🔹 || `Int` || `item_count` || 道具数量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_ModifyLootItem: "Execution.Inventory.Modify_Loot_Item",

  /**
 * **Modify Loot Component Currency Amount** `(Execution.Inventory.Modify_Loot_Currency)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **727** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `drop_entity` || 掉落物实体 |
 * | 1 || 🔹 || `Cfg` || `currency_config_id` || 货币配置ID |
 * | 2 || 🔹 || `Int` || `currency_count` || 货币数量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Inventory_ModifyLootCurrency: "Execution.Inventory.Modify_Loot_Currency",

  /**
 * **Get Loot Component Item Quantity** `(Query.Item.Get_Loot_Item_Amount)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **728** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `drop_entity` || 掉落物实体 |
 * | 1 || 🔹 || `Cfg` || `item_config_id` || 道具配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `item_count` || 道具数量 |
 */
  Query_Item_GetLootItemAmount: "Query.Item.Get_Loot_Item_Amount",

  /**
 * **Get Loot Component Currency Quantity** `(Query.Item.Get_Loot_Currency_Amount)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **729** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `drop_entity` || 掉落物实体 |
 * | 1 || 🔹 || `Cfg` || `currency_id` || 货币配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `coin_count` || 货币数量 |
 */
  Query_Item_GetLootCurrencyAmount: "Query.Item.Get_Loot_Currency_Amount",

  /**
 * **Get All Items from Loot Component** `(Query.Item.Get_Loot_Items)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **730** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `looter` || 掉落者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `items` || 道具字典 |
 */
  Query_Item_GetLootItems: "Query.Item.Get_Loot_Items",

  /**
 * **Get All Currency from Loot Component** `(Query.Item.Get_Loot_Currency)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **731** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `looter` || 掉落者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `D<Cfg,Int>` || `coins` || 货币字典 |
 */
  Query_Item_GetLootCurrency: "Query.Item.Get_Loot_Currency",

  /**
 * **Get All Equipment from Loot Component** `(Query.Item.Get_Loot_Equipment)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **732** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `drop_entity` || 掉落物实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `equip_index_list` || 装备索引列表 |
 */
  Query_Item_GetLootEquipment: "Query.Item.Get_Loot_Equipment",

  /**
 * **When Items in the Inventory Are Used** `(Trigger.Item.On_Item_Use)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **733** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 道具持有者实体 |
 * | 1 || 🔸 || `Gid` || `owner_guid` || 道具持有者GUID |
 * | 2 || 🔸 || `Cfg` || `item_config_id` || 道具配置ID |
 * | 3 || 🔸 || `Int` || `use_count` || 使用数量 |
 */
  Trigger_Item_OnItemUse: "Trigger.Item.On_Item_Use",

  /**
 * **Query Equipment Tag List** `(Query.Equipment.Get_Tags)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **734** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Cfg>` || `tags` || 标签列表 |
 */
  Query_Equipment_GetTags: "Query.Equipment.Get_Tags",

  /**
 * **Set Scan Tag Rules** `(Execution.Scan_Tag.Set_Rules)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **735** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<STPT>` || `rule_type` || 规则类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_ScanTag_SetRules: "Execution.Scan_Tag.Set_Rules",

  /**
 * **Set Scan Component's Active Scan Tag ID** `(Execution.Scan_Tag.Set_Active_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **736** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `tag_index` || 扫描标签序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_ScanTag_SetActiveTag: "Execution.Scan_Tag.Set_Active_Tag",

  /**
 * **Get the Currently Active Scan Tag Config ID** `(Query.Scan_Tag.Get_Active_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **737** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `config_id` || 扫描标签配置ID |
 */
  Query_ScanTag_GetActiveTag: "Query.Scan_Tag.Get_Active_Tag",

  /**
 * **Get Character Attribute** `(Query.Entity_Related.Get_Character_Attr)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **738** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `level` || 等级 |
 * | 1 || 🔸 || `Flt` || `hp_cur` || 当前生命值 |
 * | 2 || 🔸 || `Flt` || `hp_max` || 上限生命值 |
 * | 3 || 🔸 || `Flt` || `atk_cur` || 当前攻击力 |
 * | 4 || 🔸 || `Flt` || `atk_base` || 基础攻击力 |
 * | 5 || 🔸 || `Flt` || `def_cur` || 当前防御力 |
 * | 6 || 🔸 || `Flt` || `def_base` || 基础防御力 |
 * | 7 || 🔸 || `Flt` || `poise_max` || 受打断值上限 |
 * | 8 || 🔸 || `Flt` || `poise_cur` || 当前受打断值 |
 * | 9 || 🔸 || `E<CIRS>` || `poise_state` || 当前受打断状态 |
 */
  Query_EntityRelated_GetCharacterAttr: "Query.Entity_Related.Get_Character_Attr",

  /**
 * **Set Character Skill CD** `(Execution.Skill.Set_CD)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **739** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<SLOT>` || `skill_slot` || 角色技能槽位 |
 * | 2 || 🔹 || `Flt` || `remain_seconds` || 冷却剩余时间 |
 * | 3 || 🔹 || `Bol` || `limit_max` || 是否限制最大冷却时间 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_SetCD: "Execution.Skill.Set_CD",

  /**
 * **Modify Character Skill CD** `(Execution.Skill.Modify_CD)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **740** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<SLOT>` || `skill_slot` || 角色技能槽位 |
 * | 2 || 🔹 || `Flt` || `delta_seconds` || 冷却时间修改值 |
 * | 3 || 🔹 || `Bol` || `limit_max` || 是否限制最大冷却时间 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_ModifyCD: "Execution.Skill.Modify_CD",

  /**
 * **Modify Skill CD Percentage Based on Max CD** `(Execution.Skill.Modify_CD_Ratio)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **741** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `E<SLOT>` || `skill_slot` || 角色技能槽位 |
 * | 2 || 🔹 || `Flt` || `ratio_delta` || 冷却比例修改值 |
 * | 3 || 🔹 || `Bol` || `limit_max` || 是否限制最大冷却时间 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Skill_ModifyCDRatio: "Execution.Skill.Modify_CD_Ratio",

  /**
 * **Add Affix to Equipment at Specified ID** `(Execution.Equipment.Add_Affix_By_ID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **742** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 * | 1 || 🔹 || `Cfg` || `affix_config_id` || 词条配置ID |
 * | 2 || 🔹 || `Int` || `insert_index` || 插入序号 |
 * | 3 || 🔹 || `Bol` || `overwrite` || 是否覆盖词条值 |
 * | 4 || 🔹 || `Flt` || `affix_value` || 词条数值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Equipment_AddAffixByID: "Execution.Equipment.Add_Affix_By_ID",

  /**
 * **Random Deck Selector Selection List** `(Execution.Deck_Selector.Get_Random_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **743** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Int>` || `selection_list` || 选择列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_DeckSelector_GetRandomList: "Execution.Deck_Selector.Get_Random_List",

  /**
 * **Get Owner Entity** `(Query.Entity_Related.Get_Owner)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **744** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `owner_entity` || 拥有者实体 |
 */
  Query_EntityRelated_GetOwner: "Query.Entity_Related.Get_Owner",

  /**
 * **Get List of Entities Owned by the Entity** `(Query.Entity_Related.Get_Owned_Entities)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **745** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_EntityRelated_GetOwnedEntities: "Query.Entity_Related.Get_Owned_Entities",

  /**
 * **Execution.UI_Control_Group.Modify_Status** `(Query.Unit_Status.Get_Status_Stacks)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **746** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 单位状态配置ID |
 * | 2 || 🔹 || `Int` || `slot_index` || 槽位序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `layers` || 层数 |
 */
  Query_UnitStatus_GetStatusStacks: "Query.Unit_Status.Get_Status_Stacks",

  /**
 * **Query Unit Status Applier by Slot ID** `(Query.Unit_Status.Get_Status_Applier)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **747** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 单位状态配置ID |
 * | 2 || 🔹 || `Int` || `slot_index` || 槽位序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `applier` || 施加者实体 |
 */
  Query_UnitStatus_GetStatusApplier: "Query.Unit_Status.Get_Status_Applier",

  /**
 * **List of Slot IDs Querying Unit Status** `(Query.Unit_Status.Get_Status_Slots)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **748** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 查询目标实体 |
 * | 1 || 🔹 || `Cfg` || `config_id` || 单位状态配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `slot_index_list` || 槽位序号列表 |
 */
  Query_UnitStatus_GetStatusSlots: "Query.Unit_Status.Get_Status_Slots",

  /**
 * **Query Equipment Config ID by Equipment ID** `(Query.Equipment.Get_Config_ID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **749** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `equip_index` || 装备索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `equip_config_id` || 装备配置ID |
 */
  Query_Equipment_GetConfigID: "Query.Equipment.Get_Config_ID",

  /**
 * **Get Player GUID by Player ID** `(Query.Character_Related.Get_GUID_By_ID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **750** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `player_index` || 玩家序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Gid` || `player_guid` || 玩家GUID |
 */
  Query_CharacterRelated_GetGUIDByID: "Query.Character_Related.Get_GUID_By_ID",

  /**
 * **Get Player ID by Player GUID** `(Query.Character_Related.Get_ID_By_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **751** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Gid` || `player_guid` || 玩家GUID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `player_index` || 玩家序号 |
 */
  Query_CharacterRelated_GetIDByGUID: "Query.Character_Related.Get_ID_By_GUID",

  /**
 * **Calculate formatted time from timestamp** `(Arithmetic.Math.Timestamp_To_Time)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **752** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `timestamp` || 时间戳 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `year` || 年 |
 * | 1 || 🔸 || `Int` || `month` || 月 |
 * | 2 || 🔸 || `Int` || `day` || 日 |
 * | 3 || 🔸 || `Int` || `hour` || 时 |
 * | 4 || 🔸 || `Int` || `minute` || 分 |
 * | 5 || 🔸 || `Int` || `second` || 秒 |
 */
  Arithmetic_Math_TimestampToTime: "Arithmetic.Math.Timestamp_To_Time",

  /**
 * **Calculate Timestamp From Formatted Time** `(Arithmetic.Math.Time_To_Timestamp)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **753** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `year` || 年 |
 * | 1 || 🔹 || `Int` || `month` || 月 |
 * | 2 || 🔹 || `Int` || `day` || 日 |
 * | 3 || 🔹 || `Int` || `hour` || 时 |
 * | 4 || 🔹 || `Int` || `minute` || 分 |
 * | 5 || 🔹 || `Int` || `second` || 秒 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `timestamp` || 时间戳 |
 */
  Arithmetic_Math_TimeToTimestamp: "Arithmetic.Math.Time_To_Timestamp",

  /**
 * **Calculate day of the week from timestamp** `(Arithmetic.Math.Timestamp_To_Weekday)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **754** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `timestamp` || 时间戳 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `weekday` || 星期几 |
 */
  Arithmetic_Math_TimestampToWeekday: "Arithmetic.Math.Timestamp_To_Weekday",

  /**
 * **Query Timestamp (UTC+0)** `(Query.Math.Get_Timestamp)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **755** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `timestamp` || 时间戳 |
 */
  Query_Math_GetTimestamp: "Query.Math.Get_Timestamp",

  /**
 * **Query Server Time Zone** `(Query.Math.Get_Timezone)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **756** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `timezone` || 时区 |
 */
  Query_Math_GetTimezone: "Query.Math.Get_Timezone",

  /**
 * **Create Prefab Group** `(Execution.Entity_Related.Create_Prefab_Group)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **757** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `component_group_index` || 元件组索引 |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Ety` || `owner_entity` || 归属者实体 |
 * | 4 || 🔹 || `Int` || `level` || 等级 |
 * | 5 || 🔹 || `L<Int>` || `unit_tag_indexes` || 单位标签索引列表 |
 * | 6 || 🔹 || `Bol` || `override_level` || 是否覆盖等级 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `L<Ety>` || `created_entities` || 创建后实体列表 |
 */
  Execution_EntityRelated_CreatePrefabGroup: "Execution.Entity_Related.Create_Prefab_Group",

  /**
 * **Get Aggro List of Creation in Default Mode** `(Query.Creation.Get_Aggro_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **758** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `creation` || 造物实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `aggro` || 仇恨列表 |
 */
  Query_Creation_GetAggroList: "Query.Creation.Get_Aggro_List",

  /**
 * **Set Player Leaderboard Score as an Integer** `(Execution.Leaderboard.Set_Score_Int)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **761** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Int>` || `player_index_list` || 玩家序号列表 |
 * | 1 || 🔹 || `Int` || `score` || 排行榜分数 |
 * | 2 || 🔹 || `Int` || `board_index` || 排行榜序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Leaderboard_SetScoreInt: "Execution.Leaderboard.Set_Score_Int",

  /**
 * **Set Player Leaderboard Score as a Float** `(Execution.Leaderboard.Set_Score_Float)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **762** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `L<Int>` || `player_index_list` || 玩家序号列表 |
 * | 1 || 🔹 || `Flt` || `score` || 排行榜分数 |
 * | 2 || 🔹 || `Int` || `board_index` || 排行榜序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Leaderboard_SetScoreFloat: "Execution.Leaderboard.Set_Score_Float",

  /**
 * **Modify environment settings** `(Execution.Character_Related.Modify_Environment)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **763** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `config_index` || 环境配置索引 |
 * | 1 || 🔹 || `L<Ety>` || `target_players` || 目标玩家列表 |
 * | 2 || 🔹 || `Bol` || `enable_weather_preset` || 是否启用天气配置 |
 * | 3 || 🔹 || `Int` || `weather_preset_index` || 天气配置序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterRelated_ModifyEnvironment: "Execution.Character_Related.Modify_Environment",

  /**
 * **When Player Class Is Removed** `(Trigger.Class.On_Class_Remove)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **764** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Cfg` || `career_config_id_old` || 更改前职业配置ID |
 * | 3 || 🔸 || `Cfg` || `career_config_id_new` || 更改后职业配置ID |
 */
  Trigger_Class_OnClassRemove: "Trigger.Class.On_Class_Remove",

  /**
 * **When Entering an Interruptible State** `(Trigger.Combat.On_Interruptible)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **765** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `attacker` || 攻击者 |
 */
  Trigger_Combat_OnInterruptible: "Trigger.Combat.On_Interruptible",

  /**
 * **Query Game Mode and Player Number** `(Query.General.Get_Game_Info)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **766** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `player_count` || 游玩人数 |
 * | 1 || 🔸 || `E<GMOD>` || `mode` || 游玩方式 |
 */
  Query_General_GetGameInfo: "Query.General.Get_Game_Info",

  /**
 * **Get Player Nickname** `(Query.Character_Related.Get_Nickname)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **767** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Str` || `nickname` || 玩家昵称 |
 */
  Query_CharacterRelated_GetNickname: "Query.Character_Related.Get_Nickname",

  /**
 * **Get Player Client Input Device Type** `(Query.Character_Related.Get_Input_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **768** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<IDVT>` || `input_type` || 输入设备类型 |
 */
  Query_CharacterRelated_GetInputType: "Query.Character_Related.Get_Input_Type",

  /**
 * **Set Chat Channel Switch** `(Execution.Chat_Channel.Set_Switch)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **769** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Int` || `channel_index` || 频道索引 |
 * | 1 || 🔹 || `Bol` || `text_enabled` || 文字开关 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_ChatChannel_SetSwitch: "Execution.Chat_Channel.Set_Switch",

  /**
 * **Modify Player Channel Permission** `(Execution.Chat_Channel.Modify_Permission)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **770** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Gid` || `player_guid` || 玩家GUID |
 * | 1 || 🔹 || `Int` || `channel_index` || 频道索引 |
 * | 2 || 🔹 || `Bol` || `join` || 是否加入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_ChatChannel_ModifyPermission: "Execution.Chat_Channel.Modify_Permission",

  /**
 * **Set Player's Current Channel** `(Execution.Chat_Channel.Set_Current_Channel)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **771** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Gid` || `player_guid` || 玩家GUID |
 * | 1 || 🔹 || `L<Int>` || `channel_index_list` || 频道索引列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_ChatChannel_SetCurrentChannel: "Execution.Chat_Channel.Set_Current_Channel",

  /**
 * **Consume Gift Box** `(Execution.Wonderland_Box.Consume_Box)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **772** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `box_index` || 礼盒索引 |
 * | 2 || 🔹 || `Int` || `consume_count` || 消耗数量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_WonderlandBox_ConsumeBox: "Execution.Wonderland_Box.Consume_Box",

  /**
 * **Query Corresponding Gift Box Quantity** `(Query.Wonderland_Box_Related.Get_Box_Quantity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **773** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `box_index` || 礼盒索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `count` || 数量 |
 */
  Query_WonderlandBoxRelated_GetBoxQuantity: "Query.Wonderland_Box_Related.Get_Box_Quantity",

  /**
 * **Query Corresponding Gift Box Consumption** `(Query.Wonderland_Box_Related.Get_Box_Consumption)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **774** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player` || 玩家实体 |
 * | 1 || 🔹 || `Int` || `box_index` || 礼盒索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `count` || 数量 |
 */
  Query_WonderlandBoxRelated_GetBoxConsumption: "Query.Wonderland_Box_Related.Get_Box_Consumption",

  /**
 * **Activate Fixed-Point Motion Device** `(Execution.Motion_Device.Activate_Fixed_Point)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **775** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `mover_name` || 运动器名称 |
 * | 2 || 🔹 || `E<MOVE>` || `move_mode` || 移动方式 |
 * | 3 || 🔹 || `Flt` || `move_speed` || 移动速度 |
 * | 4 || 🔹 || `Vec` || `target_position` || 目标位置 |
 * | 5 || 🔹 || `Vec` || `target_rotation` || 目标旋转 |
 * | 6 || 🔹 || `Bol` || `lock_rotation` || 是否锁定旋转 |
 * | 7 || 🔹 || `E<FMPR>` || `param_type` || 参数类型 |
 * | 8 || 🔹 || `Flt` || `move_time` || 移动时间 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_MotionDevice_ActivateFixedPoint: "Execution.Motion_Device.Activate_Fixed_Point",

  /**
 * **Left Shift Operation** `(Arithmetic.Math.Left_Shift)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **778** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `value` || 输入1 |
 * | 1 || 🔹 || `Int` || `offset` || 偏移位数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_LeftShift: "Arithmetic.Math.Left_Shift",

  /**
 * **Right Shift Operation** `(Arithmetic.Math.Right_Shift)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **779** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `value` || 输入1 |
 * | 1 || 🔹 || `Int` || `offset` || 偏移位数 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_RightShift: "Arithmetic.Math.Right_Shift",

  /**
 * **Bitwise AND** `(Arithmetic.Math.Bitwise_And)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **780** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `a` || 输入1 |
 * | 1 || 🔹 || `Int` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_BitwiseAnd: "Arithmetic.Math.Bitwise_And",

  /**
 * **Bitwise OR** `(Arithmetic.Math.Bitwise_Or)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **781** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `a` || 输入1 |
 * | 1 || 🔹 || `Int` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_BitwiseOr: "Arithmetic.Math.Bitwise_Or",

  /**
 * **XOR (Exclusive OR)** `(Arithmetic.Math.Bitwise_Xor)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **782** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `a` || 输入1 |
 * | 1 || 🔹 || `Int` || `b` || 输入2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_BitwiseXor: "Arithmetic.Math.Bitwise_Xor",

  /**
 * **Bitwise Complement** `(Arithmetic.Math.Bitwise_Not)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **783** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `value` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_BitwiseNot: "Arithmetic.Math.Bitwise_Not",

  /**
 * **Write by bit** `(Arithmetic.Math.Write_Bit)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **784** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔹 || `Int` || `Input1` ||  |
 * | 2 || 🔹 || `Int` || `Input2` ||  |
 * | 3 || 🔹 || `Int` || `Input3` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_WriteBit: "Arithmetic.Math.Write_Bit",

  /**
 * **Read by bit** `(Arithmetic.Math.Read_Bit)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **785** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔹 || `Int` || `Input1` ||  |
 * | 2 || 🔹 || `Int` || `Input2` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `result` || 结果 |
 */
  Arithmetic_Math_ReadBit: "Arithmetic.Math.Read_Bit",

  /**
 * **When Character Movement SPD Meets Condition** `(Trigger.Entity_Related.On_Speed_Condition)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **946** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Cfg` || `state_config_id` || 单位状态配置ID |
 * | 3 || 🔸 || `E<OCMP>` || `cmp_type` || 条件：比较类型 |
 * | 4 || 🔸 || `Flt` || `cmp_value` || 条件：比较值 |
 * | 5 || 🔸 || `Flt` || `current_speed` || 当前移动速度 |
 */
  Trigger_EntityRelated_OnSpeedCondition: "Trigger.Entity_Related.On_Speed_Condition",

  /**
 * **Query Character's Current Movement SPD** `(Query.Entity_Related.Get_Move_Speed)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **947** || 🖥️ Server || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `character` || 角色实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `speed` || 当前速度 |
 * | 1 || 🔸 || `Vec` || `speed_vector` || 速度向量 |
 */
  Query_EntityRelated_GetMoveSpeed: "Query.Entity_Related.Get_Move_Speed",

  /**
 * **Set or Add Key Value Pairs to Dictionary** `(Execution.Dictionary.Set_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **948** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔷 || **`R<K>`** || `key` || 键 |
 * | 2 || 🔷 || **`R<V>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Execution_Dictionary_SetValue: "Execution.Dictionary.Set_Value",

  /**
 * **Create Dictionary** `(Arithmetic.Dictionary.Create_Dictionary)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1088** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<K>>`** || `keys` || 键列表 |
 * | 1 || 🔷 || **`L<R<V>>`** || `values` || 值列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 */
  Arithmetic_Dictionary_CreateDictionary: "Arithmetic.Dictionary.Create_Dictionary",

  /**
 * **Query Dictionary Value by Key** `(Query.Dictionary.Get_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1158** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔷 || **`R<K>`** || `key` || 键 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<V>`** || `value` || 值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Query_Dictionary_GetValue: "Query.Dictionary.Get_Value",

  /**
 * **Remove Key Value Pairs from Dictionary by Key** `(Execution.Dictionary.Remove_By_Key)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1298** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔷 || **`R<K>`** || `key` || 键 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Execution_Dictionary_RemoveByKey: "Execution.Dictionary.Remove_By_Key",

  /**
 * **Query If Dictionary Contains Specific Key** `(Query.Dictionary.Has_Key)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1368** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔷 || **`R<K>`** || `key` || 键 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `contains` || 是否包含 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Query_Dictionary_HasKey: "Query.Dictionary.Has_Key",

  /**
 * **Query If Dictionary Contains Specific Value** `(Query.Dictionary.Has_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1438** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔷 || **`R<V>`** || `value` || 值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `contains` || 是否包含 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 */
  Query_Dictionary_HasValue: "Query.Dictionary.Has_Value",

  /**
 * **Get List of Keys from Dictionary** `(Query.Dictionary.Get_Keys)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1508** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`L<R<K>>`** || `keys` || 键列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Query_Dictionary_GetKeys: "Query.Dictionary.Get_Keys",

  /**
 * **Get List of Values from Dictionary** `(Query.Dictionary.Get_Values)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1578** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`L<R<V>>`** || `values` || 值列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 */
  Query_Dictionary_GetValues: "Query.Dictionary.Get_Values",

  /**
 * **Query Dictionary's Length** `(Query.Dictionary.Get_Length)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1648** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `length` || 长度 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Query_Dictionary_GetLength: "Query.Dictionary.Get_Length",

  /**
 * **Clear Dictionary** `(Execution.Dictionary.Clear)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1718** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Execution_Dictionary_Clear: "Execution.Dictionary.Clear",

  /**
 * **Assembly Dictionary** `(Arithmetic.Dictionary.Assemble_Dictionary)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1788** || 🖥️ Server || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔷 || **`R<K>`** || `Input1` ||  |
 * | 2 || 🔷 || **`R<V>`** || `Input2` ||  |
 * | 3 || 🔷 || **`R<K>`** || `Input3` ||  |
 * | 4 || 🔷 || **`R<V>`** || `Input4` ||  |
 * | 5 || 🔷 || **`R<K>`** || `Input5` ||  |
 * | 6 || 🔷 || **`R<V>`** || `Input6` ||  |
 * | 7 || 🔷 || **`R<K>`** || `Input7` ||  |
 * | 8 || 🔷 || **`R<V>`** || `Input8` ||  |
 * | 9 || 🔷 || **`R<K>`** || `Input9` ||  |
 * | 10 || 🔷 || **`R<V>`** || `Input10` ||  |
 * | 11 || 🔷 || **`R<K>`** || `Input11` ||  |
 * | 12 || 🔷 || **`R<V>`** || `Input12` ||  |
 * | 13 || 🔷 || **`R<K>`** || `Input13` ||  |
 * | 14 || 🔷 || **`R<V>`** || `Input14` ||  |
 * | 15 || 🔷 || **`R<K>`** || `Input15` ||  |
 * | 16 || 🔷 || **`R<V>`** || `Input16` ||  |
 * | 17 || 🔷 || **`R<K>`** || `Input17` ||  |
 * | 18 || 🔷 || **`R<V>`** || `Input18` ||  |
 * | 19 || 🔷 || **`R<K>`** || `Input19` ||  |
 * | 20 || 🔷 || **`R<V>`** || `Input20` ||  |
 * | 21 || 🔷 || **`R<K>`** || `Input21` ||  |
 * | 22 || 🔷 || **`R<V>`** || `Input22` ||  |
 * | 23 || 🔷 || **`R<K>`** || `Input23` ||  |
 * | 24 || 🔷 || **`R<V>`** || `Input24` ||  |
 * | 25 || 🔷 || **`R<K>`** || `Input25` ||  |
 * | 26 || 🔷 || **`R<V>`** || `Input26` ||  |
 * | 27 || 🔷 || **`R<K>`** || `Input27` ||  |
 * | 28 || 🔷 || **`R<V>`** || `Input28` ||  |
 * | 29 || 🔷 || **`R<K>`** || `Input29` ||  |
 * | 30 || 🔷 || **`R<V>`** || `Input30` ||  |
 * | 31 || 🔷 || **`R<K>`** || `Input31` ||  |
 * | 32 || 🔷 || **`R<V>`** || `Input32` ||  |
 * | 33 || 🔷 || **`R<K>`** || `Input33` ||  |
 * | 34 || 🔷 || **`R<V>`** || `Input34` ||  |
 * | 35 || 🔷 || **`R<K>`** || `Input35` ||  |
 * | 36 || 🔷 || **`R<V>`** || `Input36` ||  |
 * | 37 || 🔷 || **`R<K>`** || `Input37` ||  |
 * | 38 || 🔷 || **`R<V>`** || `Input38` ||  |
 * | 39 || 🔷 || **`R<K>`** || `Input39` ||  |
 * | 40 || 🔷 || **`R<V>`** || `Input40` ||  |
 * | 41 || 🔷 || **`R<K>`** || `Input41` ||  |
 * | 42 || 🔷 || **`R<V>`** || `Input42` ||  |
 * | 43 || 🔷 || **`R<K>`** || `Input43` ||  |
 * | 44 || 🔷 || **`R<V>`** || `Input44` ||  |
 * | 45 || 🔷 || **`R<K>`** || `Input45` ||  |
 * | 46 || 🔷 || **`R<V>`** || `Input46` ||  |
 * | 47 || 🔷 || **`R<K>`** || `Input47` ||  |
 * | 48 || 🔷 || **`R<V>`** || `Input48` ||  |
 * | 49 || 🔷 || **`R<K>`** || `Input49` ||  |
 * | 50 || 🔷 || **`R<V>`** || `Input50` ||  |
 * | 51 || 🔷 || **`R<K>`** || `Input51` ||  |
 * | 52 || 🔷 || **`R<V>`** || `Input52` ||  |
 * | 53 || 🔷 || **`R<K>`** || `Input53` ||  |
 * | 54 || 🔷 || **`R<V>`** || `Input54` ||  |
 * | 55 || 🔷 || **`R<K>`** || `Input55` ||  |
 * | 56 || 🔷 || **`R<V>`** || `Input56` ||  |
 * | 57 || 🔷 || **`R<K>`** || `Input57` ||  |
 * | 58 || 🔷 || **`R<V>`** || `Input58` ||  |
 * | 59 || 🔷 || **`R<K>`** || `Input59` ||  |
 * | 60 || 🔷 || **`R<V>`** || `Input60` ||  |
 * | 61 || 🔷 || **`R<K>`** || `Input61` ||  |
 * | 62 || 🔷 || **`R<V>`** || `Input62` ||  |
 * | 63 || 🔷 || **`R<K>`** || `Input63` ||  |
 * | 64 || 🔷 || **`R<V>`** || `Input64` ||  |
 * | 65 || 🔷 || **`R<K>`** || `Input65` ||  |
 * | 66 || 🔷 || **`R<V>`** || `Input66` ||  |
 * | 67 || 🔷 || **`R<K>`** || `Input67` ||  |
 * | 68 || 🔷 || **`R<V>`** || `Input68` ||  |
 * | 69 || 🔷 || **`R<K>`** || `Input69` ||  |
 * | 70 || 🔷 || **`R<V>`** || `Input70` ||  |
 * | 71 || 🔷 || **`R<K>`** || `Input71` ||  |
 * | 72 || 🔷 || **`R<V>`** || `Input72` ||  |
 * | 73 || 🔷 || **`R<K>`** || `Input73` ||  |
 * | 74 || 🔷 || **`R<V>`** || `Input74` ||  |
 * | 75 || 🔷 || **`R<K>`** || `Input75` ||  |
 * | 76 || 🔷 || **`R<V>`** || `Input76` ||  |
 * | 77 || 🔷 || **`R<K>`** || `Input77` ||  |
 * | 78 || 🔷 || **`R<V>`** || `Input78` ||  |
 * | 79 || 🔷 || **`R<K>`** || `Input79` ||  |
 * | 80 || 🔷 || **`R<V>`** || `Input80` ||  |
 * | 81 || 🔷 || **`R<K>`** || `Input81` ||  |
 * | 82 || 🔷 || **`R<V>`** || `Input82` ||  |
 * | 83 || 🔷 || **`R<K>`** || `Input83` ||  |
 * | 84 || 🔷 || **`R<V>`** || `Input84` ||  |
 * | 85 || 🔷 || **`R<K>`** || `Input85` ||  |
 * | 86 || 🔷 || **`R<V>`** || `Input86` ||  |
 * | 87 || 🔷 || **`R<K>`** || `Input87` ||  |
 * | 88 || 🔷 || **`R<V>`** || `Input88` ||  |
 * | 89 || 🔷 || **`R<K>`** || `Input89` ||  |
 * | 90 || 🔷 || **`R<V>`** || `Input90` ||  |
 * | 91 || 🔷 || **`R<K>`** || `Input91` ||  |
 * | 92 || 🔷 || **`R<V>`** || `Input92` ||  |
 * | 93 || 🔷 || **`R<K>`** || `Input93` ||  |
 * | 94 || 🔷 || **`R<V>`** || `Input94` ||  |
 * | 95 || 🔷 || **`R<K>`** || `Input95` ||  |
 * | 96 || 🔷 || **`R<V>`** || `Input96` ||  |
 * | 97 || 🔷 || **`R<K>`** || `Input97` ||  |
 * | 98 || 🔷 || **`R<V>`** || `Input98` ||  |
 * | 99 || 🔷 || **`R<K>`** || `Input99` ||  |
 * | 100 || 🔷 || **`R<V>`** || `Input100` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Ety>`
 * * `C<K:Ety,V:Gid>`
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Bol>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Ety,V:Fct>`
 * * `C<K:Ety,V:Vec>`
 * * `C<K:Ety,V:Cfg>`
 * * `C<K:Ety,V:Pfb>`
 * * `C<K:Ety,V:L<Ety>>`
 * * `C<K:Ety,V:L<Gid>>`
 * * `C<K:Ety,V:L<Int>>`
 * * `C<K:Ety,V:L<Bol>>`
 * * `C<K:Ety,V:L<Flt>>`
 * * `C<K:Ety,V:L<Str>>`
 * * `C<K:Ety,V:L<Fct>>`
 * * `C<K:Ety,V:L<Vec>>`
 * * `C<K:Ety,V:L<Cfg>>`
 * * `C<K:Gid,V:Ety>`
 * * `C<K:Gid,V:Gid>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Bol>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Gid,V:Fct>`
 * * `C<K:Gid,V:Vec>`
 * * `C<K:Gid,V:Cfg>`
 * * `C<K:Gid,V:Pfb>`
 * * `C<K:Gid,V:L<Ety>>`
 * * `C<K:Gid,V:L<Gid>>`
 * * `C<K:Gid,V:L<Int>>`
 * * `C<K:Gid,V:L<Bol>>`
 * * `C<K:Gid,V:L<Flt>>`
 * * `C<K:Gid,V:L<Str>>`
 * * `C<K:Gid,V:L<Fct>>`
 * * `C<K:Gid,V:L<Vec>>`
 * * `C<K:Gid,V:L<Cfg>>`
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 * * `C<K:Int,V:L<Ety>>`
 * * `C<K:Int,V:L<Gid>>`
 * * `C<K:Int,V:L<Int>>`
 * * `C<K:Int,V:L<Bol>>`
 * * `C<K:Int,V:L<Flt>>`
 * * `C<K:Int,V:L<Str>>`
 * * `C<K:Int,V:L<Fct>>`
 * * `C<K:Int,V:L<Vec>>`
 * * `C<K:Int,V:L<Cfg>>`
 * * `C<K:Str,V:Ety>`
 * * `C<K:Str,V:Gid>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Bol>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Str,V:Str>`
 * * `C<K:Str,V:Fct>`
 * * `C<K:Str,V:Vec>`
 * * `C<K:Str,V:Cfg>`
 * * `C<K:Str,V:Pfb>`
 * * `C<K:Str,V:L<Ety>>`
 * * `C<K:Str,V:L<Gid>>`
 * * `C<K:Str,V:L<Int>>`
 * * `C<K:Str,V:L<Bol>>`
 * * `C<K:Str,V:L<Flt>>`
 * * `C<K:Str,V:L<Str>>`
 * * `C<K:Str,V:L<Fct>>`
 * * `C<K:Str,V:L<Vec>>`
 * * `C<K:Str,V:L<Cfg>>`
 * * `C<K:Fct,V:Ety>`
 * * `C<K:Fct,V:Gid>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Bol>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Fct,V:Str>`
 * * `C<K:Fct,V:Fct>`
 * * `C<K:Fct,V:Vec>`
 * * `C<K:Fct,V:Cfg>`
 * * `C<K:Fct,V:Pfb>`
 * * `C<K:Fct,V:L<Ety>>`
 * * `C<K:Fct,V:L<Gid>>`
 * * `C<K:Fct,V:L<Int>>`
 * * `C<K:Fct,V:L<Bol>>`
 * * `C<K:Fct,V:L<Flt>>`
 * * `C<K:Fct,V:L<Str>>`
 * * `C<K:Fct,V:L<Fct>>`
 * * `C<K:Fct,V:L<Vec>>`
 * * `C<K:Fct,V:L<Cfg>>`
 * * `C<K:Cfg,V:Ety>`
 * * `C<K:Cfg,V:Gid>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Bol>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Cfg,V:Str>`
 * * `C<K:Cfg,V:Fct>`
 * * `C<K:Cfg,V:Vec>`
 * * `C<K:Cfg,V:Cfg>`
 * * `C<K:Cfg,V:Pfb>`
 * * `C<K:Cfg,V:L<Ety>>`
 * * `C<K:Cfg,V:L<Gid>>`
 * * `C<K:Cfg,V:L<Int>>`
 * * `C<K:Cfg,V:L<Bol>>`
 * * `C<K:Cfg,V:L<Flt>>`
 * * `C<K:Cfg,V:L<Str>>`
 * * `C<K:Cfg,V:L<Fct>>`
 * * `C<K:Cfg,V:L<Vec>>`
 * * `C<K:Cfg,V:L<Cfg>>`
 * * `C<K:Pfb,V:Ety>`
 * * `C<K:Pfb,V:Gid>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Bol>`
 * * `C<K:Pfb,V:Flt>`
 * * `C<K:Pfb,V:Str>`
 * * `C<K:Pfb,V:Fct>`
 * * `C<K:Pfb,V:Vec>`
 * * `C<K:Pfb,V:Cfg>`
 * * `C<K:Pfb,V:Pfb>`
 * * `C<K:Pfb,V:L<Ety>>`
 * * `C<K:Pfb,V:L<Gid>>`
 * * `C<K:Pfb,V:L<Int>>`
 * * `C<K:Pfb,V:L<Bol>>`
 * * `C<K:Pfb,V:L<Flt>>`
 * * `C<K:Pfb,V:L<Str>>`
 * * `C<K:Pfb,V:L<Fct>>`
 * * `C<K:Pfb,V:L<Vec>>`
 * * `C<K:Pfb,V:L<Cfg>>`
 */
  Arithmetic_Dictionary_AssembleDictionary: "Arithmetic.Dictionary.Assemble_Dictionary",

  /**
 * **Sort Dictionary by Key** `(Execution.Dictionary.Sort_By_Key)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1928** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔹 || `E<SORT>` || `order` || 排序方式 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔶 || **`L<R<K>>`** || `keys_out` || 键列表 |
 * | 1 || 🔶 || **`L<R<V>>`** || `values_out` || 值列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Int,V:Ety>`
 * * `C<K:Int,V:Gid>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Bol>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Int,V:Fct>`
 * * `C<K:Int,V:Vec>`
 * * `C<K:Int,V:Cfg>`
 * * `C<K:Int,V:Pfb>`
 */
  Execution_Dictionary_SortByKey: "Execution.Dictionary.Sort_By_Key",

  /**
 * **Sort Dictionary by Value** `(Execution.Dictionary.Sort_By_Value)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **1938** || 🖥️ Server || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔷 || **`D<R<K>,R<V>>`** || `dict` || 字典 |
 * | 1 || 🔹 || `E<SORT>` || `order` || 排序方式 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔶 || **`L<R<K>>`** || `keys_out` || 键列表 |
 * | 1 || 🔶 || **`L<R<V>>`** || `values_out` || 值列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Ety,V:Int>`
 * * `C<K:Ety,V:Flt>`
 * * `C<K:Gid,V:Int>`
 * * `C<K:Gid,V:Flt>`
 * * `C<K:Int,V:Int>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Str,V:Int>`
 * * `C<K:Str,V:Flt>`
 * * `C<K:Fct,V:Int>`
 * * `C<K:Fct,V:Flt>`
 * * `C<K:Cfg,V:Int>`
 * * `C<K:Cfg,V:Flt>`
 * * `C<K:Pfb,V:Int>`
 * * `C<K:Pfb,V:Flt>`
 */
  Execution_Dictionary_SortByValue: "Execution.Dictionary.Sort_By_Value",

  /**
 * **Query Custom Variable Snapshot** `(Query.Custom_Variable.Get_Snapshot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **3360** || 🖥️ Server || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vss` || `snapshot` || 自定义变量组件快照 |
 * | 1 || 🔹 || `Str` || `var_name` || 变量名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 变量值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 * * `C<T:L<Fct>>`
 * * `C<T:D<Ety,Ety>>`
 * * `C<T:D<Ety,Gid>>`
 * * `C<T:D<Ety,Int>>`
 * * `C<T:D<Ety,Bol>>`
 * * `C<T:D<Ety,Flt>>`
 * * `C<T:D<Ety,Str>>`
 * * `C<T:D<Ety,Fct>>`
 * * `C<T:D<Ety,Vec>>`
 * * `C<T:D<Ety,Cfg>>`
 * * `C<T:D<Ety,Pfb>>`
 * * `C<T:D<Ety,L<Ety>>>`
 * * `C<T:D<Ety,L<Gid>>>`
 * * `C<T:D<Ety,L<Int>>>`
 * * `C<T:D<Ety,L<Bol>>>`
 * * `C<T:D<Ety,L<Flt>>>`
 * * `C<T:D<Ety,L<Str>>>`
 * * `C<T:D<Ety,L<Fct>>>`
 * * `C<T:D<Ety,L<Vec>>>`
 * * `C<T:D<Ety,L<Cfg>>>`
 * * `C<T:D<Gid,Ety>>`
 * * `C<T:D<Gid,Gid>>`
 * * `C<T:D<Gid,Int>>`
 * * `C<T:D<Gid,Bol>>`
 * * `C<T:D<Gid,Flt>>`
 * * `C<T:D<Gid,Str>>`
 * * `C<T:D<Gid,Fct>>`
 * * `C<T:D<Gid,Vec>>`
 * * `C<T:D<Gid,Cfg>>`
 * * `C<T:D<Gid,Pfb>>`
 * * `C<T:D<Gid,L<Ety>>>`
 * * `C<T:D<Gid,L<Gid>>>`
 * * `C<T:D<Gid,L<Int>>>`
 * * `C<T:D<Gid,L<Bol>>>`
 * * `C<T:D<Gid,L<Flt>>>`
 * * `C<T:D<Gid,L<Str>>>`
 * * `C<T:D<Gid,L<Fct>>>`
 * * `C<T:D<Gid,L<Vec>>>`
 * * `C<T:D<Gid,L<Cfg>>>`
 * * `C<T:D<Int,Ety>>`
 * * `C<T:D<Int,Gid>>`
 * * `C<T:D<Int,Int>>`
 * * `C<T:D<Int,Bol>>`
 * * `C<T:D<Int,Flt>>`
 * * `C<T:D<Int,Str>>`
 * * `C<T:D<Int,Fct>>`
 * * `C<T:D<Int,Vec>>`
 * * `C<T:D<Int,Cfg>>`
 * * `C<T:D<Int,Pfb>>`
 * * `C<T:D<Int,L<Ety>>>`
 * * `C<T:D<Int,L<Gid>>>`
 * * `C<T:D<Int,L<Int>>>`
 * * `C<T:D<Int,L<Bol>>>`
 * * `C<T:D<Int,L<Flt>>>`
 * * `C<T:D<Int,L<Str>>>`
 * * `C<T:D<Int,L<Fct>>>`
 * * `C<T:D<Int,L<Vec>>>`
 * * `C<T:D<Int,L<Cfg>>>`
 * * `C<T:D<Str,Ety>>`
 * * `C<T:D<Str,Gid>>`
 * * `C<T:D<Str,Int>>`
 * * `C<T:D<Str,Bol>>`
 * * `C<T:D<Str,Flt>>`
 * * `C<T:D<Str,Str>>`
 * * `C<T:D<Str,Fct>>`
 * * `C<T:D<Str,Vec>>`
 * * `C<T:D<Str,Cfg>>`
 * * `C<T:D<Str,Pfb>>`
 * * `C<T:D<Str,L<Ety>>>`
 * * `C<T:D<Str,L<Gid>>>`
 * * `C<T:D<Str,L<Int>>>`
 * * `C<T:D<Str,L<Bol>>>`
 * * `C<T:D<Str,L<Flt>>>`
 * * `C<T:D<Str,L<Str>>>`
 * * `C<T:D<Str,L<Fct>>>`
 * * `C<T:D<Str,L<Vec>>>`
 * * `C<T:D<Str,L<Cfg>>>`
 * * `C<T:D<Fct,Ety>>`
 * * `C<T:D<Fct,Gid>>`
 * * `C<T:D<Fct,Int>>`
 * * `C<T:D<Fct,Bol>>`
 * * `C<T:D<Fct,Flt>>`
 * * `C<T:D<Fct,Str>>`
 * * `C<T:D<Fct,Fct>>`
 * * `C<T:D<Fct,Vec>>`
 * * `C<T:D<Fct,Cfg>>`
 * * `C<T:D<Fct,Pfb>>`
 * * `C<T:D<Fct,L<Ety>>>`
 * * `C<T:D<Fct,L<Gid>>>`
 * * `C<T:D<Fct,L<Int>>>`
 * * `C<T:D<Fct,L<Bol>>>`
 * * `C<T:D<Fct,L<Flt>>>`
 * * `C<T:D<Fct,L<Str>>>`
 * * `C<T:D<Fct,L<Fct>>>`
 * * `C<T:D<Fct,L<Vec>>>`
 * * `C<T:D<Fct,L<Cfg>>>`
 * * `C<T:D<Cfg,Ety>>`
 * * `C<T:D<Cfg,Gid>>`
 * * `C<T:D<Cfg,Int>>`
 * * `C<T:D<Cfg,Bol>>`
 * * `C<T:D<Cfg,Flt>>`
 * * `C<T:D<Cfg,Str>>`
 * * `C<T:D<Cfg,Fct>>`
 * * `C<T:D<Cfg,Vec>>`
 * * `C<T:D<Cfg,Cfg>>`
 * * `C<T:D<Cfg,Pfb>>`
 * * `C<T:D<Cfg,L<Ety>>>`
 * * `C<T:D<Cfg,L<Gid>>>`
 * * `C<T:D<Cfg,L<Int>>>`
 * * `C<T:D<Cfg,L<Bol>>>`
 * * `C<T:D<Cfg,L<Flt>>>`
 * * `C<T:D<Cfg,L<Str>>>`
 * * `C<T:D<Cfg,L<Fct>>>`
 * * `C<T:D<Cfg,L<Vec>>>`
 * * `C<T:D<Cfg,L<Cfg>>>`
 * * `C<T:D<Pfb,Ety>>`
 * * `C<T:D<Pfb,Gid>>`
 * * `C<T:D<Pfb,Int>>`
 * * `C<T:D<Pfb,Bol>>`
 * * `C<T:D<Pfb,Flt>>`
 * * `C<T:D<Pfb,Str>>`
 * * `C<T:D<Pfb,Fct>>`
 * * `C<T:D<Pfb,Vec>>`
 * * `C<T:D<Pfb,Cfg>>`
 * * `C<T:D<Pfb,Pfb>>`
 * * `C<T:D<Pfb,L<Ety>>>`
 * * `C<T:D<Pfb,L<Gid>>>`
 * * `C<T:D<Pfb,L<Int>>>`
 * * `C<T:D<Pfb,L<Bol>>>`
 * * `C<T:D<Pfb,L<Flt>>>`
 * * `C<T:D<Pfb,L<Str>>>`
 * * `C<T:D<Pfb,L<Fct>>>`
 * * `C<T:D<Pfb,L<Vec>>>`
 * * `C<T:D<Pfb,L<Cfg>>>`
 */
  Query_CustomVariable_GetSnapshot: "Query.Custom_Variable.Get_Snapshot",

  /**
 * **When Calling GM (This Node is Hidden Externally)** `(Hidden.Trigger.On_GM_Call)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **100000** || 🖥️ Server || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `Output0` ||  |
 * | 1 || 🔸 || `Gid` || `Output1` ||  |
 * | 2 || 🔸 || `Int` || `Output2` ||  |
 * | 3 || 🔸 || `Int` || `Output3` ||  |
 * | 4 || 🔸 || `Str` || `Output4` ||  |
 * | 5 || 🔸 || `Str` || `Output5` ||  |
 */
  Hidden_Trigger_OnGMCall: "Hidden.Trigger.On_GM_Call",

  /**
 * **Node Graph End (Boolean)** `(Others.Port_Client.Graph_End_Bool)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200000** || 📱 Client || 🔗 Others || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `result` || 输出结果（布尔型） |
 */
  Others_PortClient_GraphEndBool: "Others.Port_Client.Graph_End_Bool",

  /**
 * **Logical AND Operation** `(Arithmetic.Math_Client.And)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200001** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 条件1 |
 * | 1 || 🔹 || `Bol` || `b` || 条件2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_MathClient_And: "Arithmetic.Math_Client.And",

  /**
 * **Logical OR Operation** `(Arithmetic.Math_Client.Or)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200002** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 条件1 |
 * | 1 || 🔹 || `Bol` || `b` || 条件2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_MathClient_Or: "Arithmetic.Math_Client.Or",

  /**
 * **Logical NOT Operation** `(Arithmetic.Math_Client.Not)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200003** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `cond` || 条件 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_MathClient_Not: "Arithmetic.Math_Client.Not",

  /**
 * **Logical XOR Operation** `(Arithmetic.Math_Client.Xor)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200004** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `a` || 条件1 |
 * | 1 || 🔹 || `Bol` || `b` || 条件2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 */
  Arithmetic_MathClient_Xor: "Arithmetic.Math_Client.Xor",

  /**
 * **Enumeration Match** `(Arithmetic.General_Client.Enum_Match)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200005** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `enum1` || 枚举1 |
 * | 1 || 🔷 || **`R<T>`** || `enum2` || 枚举2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:E<CGEN>>`
 * * `C<T:E<CCMP>>`
 * * `C<T:E<CLOG>>`
 * * `C<T:E<CBMO>>`
 * * `C<T:E<CASH>>`
 * * `C<T:E<CSVL>>`
 * * `C<T:E<CSRT>>`
 * * `C<T:E<CRND>>`
 * * `C<T:E<CCOV>>`
 * * `C<T:E<CMPP>>`
 * * `C<T:E<CMOT>>`
 * * `C<T:E<CFLL>>`
 * * `C<T:E<CCOR>>`
 * * `C<T:E<CELM>>`
 * * `C<T:E<CETY>>`
 * * `C<T:E<CUSF>>`
 * * `C<T:E<CUSS>>`
 * * `C<T:E<CUSR>>`
 * * `C<T:E<CUSX>>`
 * * `C<T:E<CRPT>>`
 * * `C<T:E<CDWN>>`
 * * `C<T:E<CTFX>>`
 * * `C<T:E<CDDT>>`
 * * `C<T:E<CDDO>>`
 * * `C<T:E<CUIS>>`
 * * `C<T:E<CTTP>>`
 * * `C<T:E<CQMA>>`
 * * `C<T:E<CHIT>>`
 * * `C<T:E<CATK>>`
 * * `C<T:E<CHLV>>`
 * * `C<T:E<CTST>>`
 * * `C<T:E<CALC>>`
 * * `C<T:E<CKBD>>`
 * * `C<T:E<CROT>>`
 * * `C<T:E<CSCT>>`
 * * `C<T:E<CCON>>`
 * * `C<T:E<CRTR>>`
 * * `C<T:E<CHTS>>`
 * * `C<T:E<CERE>>`
 * * `C<T:E<CFLT>>`
 * * `C<T:E<CCAM>>`
 * * `C<T:E<CSCN>>`
 * * `C<T:E<CDEV>>`
 */
  Arithmetic_GeneralClient_EnumMatch: "Arithmetic.General_Client.Enum_Match",

  /**
 * **Equal** `(Arithmetic.General_Client.Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200006** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:Vec>`
 * * `C<T:Fct>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 */
  Arithmetic_GeneralClient_Equal: "Arithmetic.General_Client.Equal",

  /**
 * **Greater Than** `(Arithmetic.Math_Client.Greater_Than)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200007** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_GreaterThan: "Arithmetic.Math_Client.Greater_Than",

  /**
 * **Less Than** `(Arithmetic.Math_Client.Less_Than)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200008** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_LessThan: "Arithmetic.Math_Client.Less_Than",

  /**
 * **Less Than or Equal To** `(Arithmetic.Math_Client.Less_Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200009** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_LessEqual: "Arithmetic.Math_Client.Less_Equal",

  /**
 * **Greater Than or Equal To** `(Arithmetic.Math_Client.Greater_Equal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200010** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_GreaterEqual: "Arithmetic.Math_Client.Greater_Equal",

  /**
 * **Addition** `(Arithmetic.Math_Client.Add)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200011** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Add: "Arithmetic.Math_Client.Add",

  /**
 * **Subtraction** `(Arithmetic.Math_Client.Subtract)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200012** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Subtract: "Arithmetic.Math_Client.Subtract",

  /**
 * **Multiplication** `(Arithmetic.Math_Client.Multiply)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200013** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Multiply: "Arithmetic.Math_Client.Multiply",

  /**
 * **Division** `(Arithmetic.Math_Client.Divide)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200014** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `a` ||  |
 * | 1 || 🔷 || **`R<T>`** || `b` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Divide: "Arithmetic.Math_Client.Divide",

  /**
 * **Absolute Value Operation** `(Arithmetic.Math_Client.Abs)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200015** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Abs: "Arithmetic.Math_Client.Abs",

  /**
 * **Get Custom Variable** `(Query.Custom_Variable_Client.Get_Variable)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200016** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `variable_name` || 变量名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `variable_value` || 变量值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:Vec>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:L<Cfg>>`
 * * `C<T:L<Pfb>>`
 * * `C<T:Fct>`
 */
  Query_CustomVariableClient_GetVariable: "Query.Custom_Variable_Client.Get_Variable",

  /**
 * **Get Corresponding Value From List** `(Query.List_Related_Client.Get_At_Index)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200017** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `index` || 序号 |
 * | 1 || 🔷 || **`L<R<T>>`** || `data_list` || 数据列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:Vec>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 */
  Query_ListRelatedClient_GetAtIndex: "Query.List_Related_Client.Get_At_Index",

  /**
 * **Get List Length** `(Query.List_Related_Client.Get_Length)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200018** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `input_list` || 输入列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `length` || 长度 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:L<Bol>>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Vec>>`
 */
  Query_ListRelatedClient_GetLength: "Query.List_Related_Client.Get_Length",

  /**
 * **List Includes This Value** `(Query.List_Related_Client.Contains)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200019** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `value` || 值 |
 * | 1 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `result` || 结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Bol>`
 * * `C<T:Int>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:Gid>`
 * * `C<T:Ety>`
 * * `C<T:Vec>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 */
  Query_ListRelatedClient_Contains: "Query.List_Related_Client.Contains",

  /**
 * **Get Maximum Value From List** `(Query.List_Related_Client.Get_Max)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200020** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `max_value` || 最大值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Query_ListRelatedClient_GetMax: "Query.List_Related_Client.Get_Max",

  /**
 * **Get Minimum Value From List** `(Query.List_Related_Client.Get_Min)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200021** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`L<R<T>>`** || `list` || 列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `min_value` || 最小值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Query_ListRelatedClient_GetMin: "Query.List_Related_Client.Get_Min",

  /**
 * **Data Type Conversion** `(Arithmetic.General_Client.Convert_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200022** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<K>`** || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<V>`** || `converted` || 转换结果 |
 *
 * #### 🧬 Variant Constraints
 * * `C<K:Int,V:Bol>`
 * * `C<K:Bol,V:Int>`
 * * `C<K:Flt,V:Int>`
 * * `C<K:Int,V:Flt>`
 * * `C<K:Bol,V:Str>`
 * * `C<K:Int,V:Str>`
 * * `C<K:Flt,V:Str>`
 * * `C<K:Gid,V:Str>`
 * * `C<K:Ety,V:Str>`
 * * `C<K:Vec,V:Str>`
 * * `C<K:Fct,V:Str>`
 */
  Arithmetic_GeneralClient_ConvertType: "Arithmetic.General_Client.Convert_Type",

  /**
 * **Query Entity by GUID** `(Query.Entity_Related_Client.Get_By_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200023** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Gid` || `guid` || GUID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `entity` || 实体 |
 */
  Query_EntityRelatedClient_GetByGUID: "Query.Entity_Related_Client.Get_By_GUID",

  /**
 * **Get Character Entity of Specified Player** `(Query.Character_Related_Client.Get_Player_Character)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200024** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `player_entity` || 玩家实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `character_entity` || 角色实体 |
 */
  Query_CharacterRelatedClient_GetPlayerCharacter: "Query.Character_Related_Client.Get_Player_Character",

  /**
 * **Get Player Entity to Which the Character Belongs** `(Query.Character_Related_Client.Get_Owner_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200025** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `character_entity` || 角色实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `owner_player_entity` || 所属玩家实体 |
 */
  Query_CharacterRelatedClient_GetOwnerPlayer: "Query.Character_Related_Client.Get_Owner_Player",

  /**
 * **Get List of Player Entities on the Field** `(Query.Character_Related_Client.Get_All_Players)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200026** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `player_entities` || 玩家实体列表 |
 */
  Query_CharacterRelatedClient_GetAllPlayers: "Query.Character_Related_Client.Get_All_Players",

  /**
 * **Query GUID by Entity** `(Query.Character_Related_Client.Get_GUID)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200027** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `entity` || 实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Gid` || `guid` || GUID |
 */
  Query_CharacterRelatedClient_GetGUID: "Query.Character_Related_Client.Get_GUID",

  /**
 * **Get Preset Status** `(Query.Preset_Status_Client.Get_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200028** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `entity` || 实体 |
 * | 1 || 🔹 || `Int` || `preset_index` || 预设状态索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `preset_value` || 预设状态值 |
 */
  Query_PresetStatusClient_GetStatus: "Query.Preset_Status_Client.Get_Status",

  /**
 * **Query Entity Faction** `(Query.Faction_Related_Client.Get_Faction)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200029** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Fct` || `camp` || 阵营 |
 */
  Query_FactionRelatedClient_GetFaction: "Query.Faction_Related_Client.Get_Faction",

  /**
 * **Get Entity Location** `(Query.Entity_Related_Client.Get_Location)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200030** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `entity` || 实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `position` || 位置 |
 */
  Query_EntityRelatedClient_GetLocation: "Query.Entity_Related_Client.Get_Location",

  /**
 * **Get Entity Rotation** `(Query.Entity_Related_Client.Get_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200031** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `entity` || 实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `rotation` || 旋转 |
 */
  Query_EntityRelatedClient_GetRotation: "Query.Entity_Related_Client.Get_Rotation",

  /**
 * **Get Random Number** `(Arithmetic.Math_Client.Random)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200032** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔷 || **`R<T>`** || `min` || 下限 |
 * | 1 || 🔷 || **`R<T>`** || `max` || 上限 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 随机数 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Flt>`
 */
  Arithmetic_MathClient_Random: "Arithmetic.Math_Client.Random",

  /**
 * **Get Self Entity** `(Query.Entity_Related_Client.Get_Self)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200033** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `self` || 自身实体 |
 */
  Query_EntityRelatedClient_GetSelf: "Query.Entity_Related_Client.Get_Self",

  /**
 * **Get Target Entity** `(Query.Entity_Related_Client.Get_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200034** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `target_entity` || 目标实体 |
 */
  Query_EntityRelatedClient_GetTarget: "Query.Entity_Related_Client.Get_Target",

  /**
 * **Get Unit Attack Target** `(Query.Entity_Related_Client.Get_Attack_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200035** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `unit_entity` || 单位实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `attack_target_entity` || 攻击目标实体 |
 */
  Query_EntityRelatedClient_GetAttackTarget: "Query.Entity_Related_Client.Get_Attack_Target",

  /**
 * **Get Current Camera Template** `(Hidden.Query_Client.Get_Camera_Template)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200036** || 📱 Client || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Int` || `Output0` ||  |
 */
  Hidden_QueryClient_GetCameraTemplate: "Hidden.Query_Client.Get_Camera_Template",

  /**
 * **Query If Self Is in Combat** `(Query.Character_Related_Client.Is_In_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200037** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `is_in_combat` || 是否入战 |
 */
  Query_CharacterRelatedClient_IsInCombat: "Query.Character_Related_Client.Is_In_Combat",

  /**
 * **Play Timed Effects** `(Execution.Character_Skill_Client.Play_Timed_FX)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200038** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Cfg` || `effect_config_id` || 特效资产配置ID |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Flt` || `scale` || 缩放倍率 |
 * | 4 || 🔹 || `Bol` || `play_default_sfx` || 是否播放默认音效 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_PlayTimedFX: "Execution.Character_Skill_Client.Play_Timed_FX",

  /**
 * **Notify Server Node Graph** `(Execution.Character_Skill_Client.Notify_Server)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200039** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Str` || `str1` || 字符串1 |
 * | 1 || 🔹 || `Str` || `str2` || 字符串2 |
 * | 2 || 🔹 || `Str` || `str3` || 字符串3 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_NotifyServer: "Execution.Character_Skill_Client.Notify_Server",

  /**
 * **Player Turning** `(Execution.Character_Skill_Client.Turn_Player)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200040** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CROT>` || `turn_mode` || 转向模式 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TurnPlayer: "Execution.Character_Skill_Client.Turn_Player",

  /**
 * **Set Own Attack Target** `(Execution.Character_Skill_Client.Set_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200041** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Bol` || `instant_turn` || 是否立即转向 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_SetTarget: "Execution.Character_Skill_Client.Set_Target",

  /**
 * **Node Graph Begins** `(Others.Port_Client.Graph_Start)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200042** || 📱 Client || 🔗 Others || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Others_PortClient_GraphStart: "Others.Port_Client.Graph_Start",

  /**
 * **Filter Entity List Within Spherical Range** `(Query.Entity_Related_Client.Filter_Sphere)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200043** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radius` || 半径 |
 * | 1 || 🔹 || `Vec` || `center` || 中心位置 |
 * | 2 || 🔹 || `Int` || `limit` || 筛选数量上限 |
 * | 3 || 🔹 || `E<CTST>` || `rule` || 筛选规则 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result` || 筛选结果 |
 */
  Query_EntityRelatedClient_FilterSphere: "Query.Entity_Related_Client.Filter_Sphere",

  /**
 * **Filter Entity List Within Square Range** `(Query.Entity_Related_Client.Filter_Square)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200044** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `width` || 宽度 |
 * | 1 || 🔹 || `Flt` || `height` || 高度 |
 * | 2 || 🔹 || `Flt` || `length` || 长度 |
 * | 3 || 🔹 || `Vec` || `center` || 中心位置 |
 * | 4 || 🔹 || `Int` || `limit` || 筛选数量上限 |
 * | 5 || 🔹 || `E<CTST>` || `rule` || 筛选规则 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `result` || 筛选结果 |
 */
  Query_EntityRelatedClient_FilterSquare: "Query.Entity_Related_Client.Filter_Square",

  /**
 * **Get Entity's Type** `(Query.Entity_Related_Client.Get_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200045** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<CETY>` || `entity_type` || 实体类型 |
 */
  Query_EntityRelatedClient_GetType: "Query.Entity_Related_Client.Get_Type",

  /**
 * **Get Camera Orientation** `(Hidden.Query_Client.Get_Camera_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200046** || 📱 Client || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `Output0` ||  |
 */
  Hidden_QueryClient_GetCameraRotation: "Hidden.Query_Client.Get_Camera_Rotation",

  /**
 * **Get Target Attachment Point Location** `(Query.Entity_Related_Client.Get_Socket_Loc)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200047** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `attachment_name` || 挂接点名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `attachment_position` || 挂接点位置 |
 */
  Query_EntityRelatedClient_GetSocketLoc: "Query.Entity_Related_Client.Get_Socket_Loc",

  /**
 * **Get Target Attachment Point Rotation** `(Query.Entity_Related_Client.Get_Socket_Rot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200048** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Str` || `attachment_name` || 挂接点名称 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `attachment_rotation` || 挂接点旋转 |
 */
  Query_EntityRelatedClient_GetSocketRot: "Query.Entity_Related_Client.Get_Socket_Rot",

  /**
 * **Assembly List** `(Arithmetic.List_Client.Assemble_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200049** || 📱 Client || 🔢 Arithmetic || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔷 || **`R<T>`** || `Input1` ||  |
 * | 2 || 🔷 || **`R<T>`** || `Input2` ||  |
 * | 3 || 🔷 || **`R<T>`** || `Input3` ||  |
 * | 4 || 🔷 || **`R<T>`** || `Input4` ||  |
 * | 5 || 🔷 || **`R<T>`** || `Input5` ||  |
 * | 6 || 🔷 || **`R<T>`** || `Input6` ||  |
 * | 7 || 🔷 || **`R<T>`** || `Input7` ||  |
 * | 8 || 🔷 || **`R<T>`** || `Input8` ||  |
 * | 9 || 🔷 || **`R<T>`** || `Input9` ||  |
 * | 10 || 🔷 || **`R<T>`** || `Input10` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`L<R<T>>`** || `list` || 列表 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Ety>`
 * * `C<T:Int>`
 * * `C<T:Bol>`
 * * `C<T:Flt>`
 * * `C<T:Str>`
 * * `C<T:Vec>`
 * * `C<T:Gid>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 */
  Arithmetic_ListClient_AssembleList: "Arithmetic.List_Client.Assemble_List",

  /**
 * **Get Entity Type List** `(Query.List_Related_Client.Get_Entity_Types)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200050** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔹 || `E<CETY>` || `Input1` ||  |
 * | 2 || 🔹 || `E<CETY>` || `Input2` ||  |
 * | 3 || 🔹 || `E<CETY>` || `Input3` ||  |
 * | 4 || 🔹 || `E<CETY>` || `Input4` ||  |
 * | 5 || 🔹 || `E<CETY>` || `Input5` ||  |
 * | 6 || 🔹 || `E<CETY>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CETY>` || `Input7` ||  |
 * | 8 || 🔹 || `E<CETY>` || `Input8` ||  |
 * | 9 || 🔹 || `E<CETY>` || `Input9` ||  |
 * | 10 || 🔹 || `E<CETY>` || `Input10` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<E<CETY>>` || `list` || 列表 |
 */
  Query_ListRelatedClient_GetEntityTypes: "Query.List_Related_Client.Get_Entity_Types",

  /**
 * **Trigger Hitbox at Specific Location** `(Execution.Character_Skill_Client.Trigger_Hitbox_Loc)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200051** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `Input0` ||  |
 * | 1 || 🔹 || `Vec` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Flt` || `Input3` ||  |
 * | 4 || 🔹 || `Flt` || `Input4` ||  |
 * | 5 || 🔹 || `L<E<CETY>>` || `Input5` ||  |
 * | 6 || 🔹 || `E<CTRG>` || `Input6` ||  |
 * | 7 || 🔹 || `Int` || `Input7` ||  |
 * | 8 || 🔹 || `E<CASH>` || `Input8` ||  |
 * | 9 || 🔹 || `Vec` || `Input9` ||  |
 * | 10 || 🔹 || `Flt` || `Input10` ||  |
 * | 11 || 🔹 || `Flt` || `Input11` ||  |
 * | 12 || 🔹 || `Flt` || `Input12` ||  |
 * | 13 || 🔹 || `Flt` || `Input13` ||  |
 * | 14 || 🔹 || `Flt` || `Input14` ||  |
 * | 15 || 🔹 || `E<CSCT>` || `Input15` ||  |
 * | 16 || 🔹 || `E<CALC>` || `Input16` ||  |
 * | 17 || 🔹 || `L<Str>` || `Input17` ||  |
 * | 18 || 🔹 || `E<CELM>` || `Input18` ||  |
 * | 19 || 🔹 || `Flt` || `Input19` ||  |
 * | 20 || 🔹 || `E<CHIT>` || `Input20` ||  |
 * | 21 || 🔹 || `E<CATK>` || `Input21` ||  |
 * | 22 || 🔹 || `Flt` || `Input22` ||  |
 * | 23 || 🔹 || `Bol` || `Input24` ||  |
 * | 24 || 🔹 || `Int` || `Input25` ||  |
 * | 25 || 🔹 || `E<CKBD>` || `Input27` ||  |
 * | 26 || 🔹 || `Bol` || `Input28` ||  |
 * | 27 || 🔹 || `Vec` || `Input32` ||  |
 * | 28 || 🔹 || `Vec` || `Input33` ||  |
 * | 29 || 🔹 || `Flt` || `Input34` ||  |
 * | 30 || 🔹 || `Vec` || `Input38` ||  |
 * | 31 || 🔹 || `Vec` || `Input39` ||  |
 * | 32 || 🔹 || `Flt` || `Input40` ||  |
 * | 33 || 🔹 || `Flt` || `Input41` ||  |
 * | 34 || 🔹 || `Int` || `Input42` ||  |
 * | 35 || 🔹 || `E<CHTS>` || `Input44` ||  |
 * | 36 || 🔹 || `Flt` || `Input45` ||  |
 * | 37 || 🔹 || `Flt` || `Input46` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerHitboxLoc: "Execution.Character_Skill_Client.Trigger_Hitbox_Loc",

  /**
 * **Fixed-Point Projectile Launch** `(Execution.Character_Skill_Client.Launch_Projectile)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200052** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Pfb` || `projectile_component_id` || 投射物的元件ID |
 * | 1 || 🔹 || `Vec` || `spawn_position` || 创建位置 |
 * | 2 || 🔹 || `Vec` || `spawn_rotation` || 创建旋转 |
 * | 3 || 🔹 || `Ety` || `tracking_target` || 追踪目标 |
 * | 4 || 🔹 || `Fct` || `projectile_camp` || 投射物阵营 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_LaunchProjectile: "Execution.Character_Skill_Client.Launch_Projectile",

  /**
 * **Fixed-Point Displacement** `(Execution.Character_Skill_Client.Move_To_Point)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200053** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Flt` || `duration` || 位移时长 |
 * | 1 || 🔹 || `Flt` || `damping_duration` || 位移衰减时长 |
 * | 2 || 🔹 || `Flt` || `speed` || 位移速度 |
 * | 3 || 🔹 || `Vec` || `target_position` || 位移目标位置 |
 * | 4 || 🔹 || `Bol` || `stop_on_collision` || 碰撞是否终止位移 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_MoveToPoint: "Execution.Character_Skill_Client.Move_To_Point",

  /**
 * **Traverse Entity List** `(Execution.Character_Skill_Client.For_Each_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200055** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `Start` ||  |
 * | 0 || 🔹 || `L<Ety>` || `entity_list` || 实体列表 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `Iteration` ||  |
 * | - || ⏩ || - || `End` ||  |
 * | 0 || 🔸 || `Ety` || `current_entity` || 当前实体 |
 */
  Execution_CharacterSkillClient_ForEachEntity: "Execution.Character_Skill_Client.For_Each_Entity",

  /**
 * **Double Branch** `(Control.General_Client.Branch)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200056** || 📱 Client || 🔀 Control || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Bol` || `Condition` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `True` || Yes |
 * | - || ⏩ || - || `False` || No |
 */
  Control_GeneralClient_Branch: "Control.General_Client.Branch",

  /**
 * **Add Unit Status** `(Execution.Character_Skill_Client.Add_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200057** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 施加目标 |
 * | 1 || 🔹 || `Int` || `stack_count` || 层数 |
 * | 2 || 🔹 || `Cfg` || `state_config_id` || 单位状态配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_AddStatus: "Execution.Character_Skill_Client.Add_Status",

  /**
 * **Remove Unit Status** `(Execution.Character_Skill_Client.Remove_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200058** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 移除目标 |
 * | 1 || 🔹 || `Cfg` || `state_config_id` || 单位状态配置ID |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_RemoveStatus: "Execution.Character_Skill_Client.Remove_Status",

  /**
 * **Trigger Hitbox at Specified Attachment Point** `(Execution.Character_Skill_Client.Trigger_Hitbox_Socket)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200059** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Vec` || `Input3` ||  |
 * | 4 || 🔹 || `Flt` || `Input4` ||  |
 * | 5 || 🔹 || `Flt` || `Input5` ||  |
 * | 6 || 🔹 || `L<E<CETY>>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CTRG>` || `Input7` ||  |
 * | 8 || 🔹 || `Int` || `Input8` ||  |
 * | 9 || 🔹 || `E<CASH>` || `Input9` ||  |
 * | 10 || 🔹 || `Vec` || `Input10` ||  |
 * | 11 || 🔹 || `Flt` || `Input11` ||  |
 * | 12 || 🔹 || `Flt` || `Input12` ||  |
 * | 13 || 🔹 || `Flt` || `Input13` ||  |
 * | 14 || 🔹 || `Flt` || `Input14` ||  |
 * | 15 || 🔹 || `Flt` || `Input15` ||  |
 * | 16 || 🔹 || `E<CSCT>` || `Input16` ||  |
 * | 17 || 🔹 || `E<CALC>` || `Input17` ||  |
 * | 18 || 🔹 || `L<Str>` || `Input18` ||  |
 * | 19 || 🔹 || `E<CELM>` || `Input19` ||  |
 * | 20 || 🔹 || `Flt` || `Input20` ||  |
 * | 21 || 🔹 || `E<CHIT>` || `Input21` ||  |
 * | 22 || 🔹 || `E<CATK>` || `Input22` ||  |
 * | 23 || 🔹 || `Flt` || `Input23` ||  |
 * | 24 || 🔹 || `Bol` || `Input25` ||  |
 * | 25 || 🔹 || `Int` || `Input26` ||  |
 * | 26 || 🔹 || `E<CKBD>` || `Input28` ||  |
 * | 27 || 🔹 || `Bol` || `Input29` ||  |
 * | 28 || 🔹 || `Vec` || `Input33` ||  |
 * | 29 || 🔹 || `Vec` || `Input34` ||  |
 * | 30 || 🔹 || `Flt` || `Input35` ||  |
 * | 31 || 🔹 || `Vec` || `Input39` ||  |
 * | 32 || 🔹 || `Vec` || `Input40` ||  |
 * | 33 || 🔹 || `Flt` || `Input41` ||  |
 * | 34 || 🔹 || `Flt` || `Input42` ||  |
 * | 35 || 🔹 || `Int` || `Input43` ||  |
 * | 36 || 🔹 || `E<CHTS>` || `Input45` ||  |
 * | 37 || 🔹 || `Flt` || `Input46` ||  |
 * | 38 || 🔹 || `Flt` || `Input47` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerHitboxSocket: "Execution.Character_Skill_Client.Trigger_Hitbox_Socket",

  /**
 * **Remove Specified Character Disruptor Device** `(Execution.Character_Skill_Client.Remove_Device)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200060** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CDDT>` || `device_type` || 扰动装置类型 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_RemoveDevice: "Execution.Character_Skill_Client.Remove_Device",

  /**
 * **Modify Attack Weight** `(Execution.Character_Skill_Client.Modify_Weight)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200061** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Flt` || `current_target_weight` || 当前攻击目标的权重 |
 * | 1 || 🔹 || `Bol` || `force_select_once` || 是否强制选一次目标 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_ModifyWeight: "Execution.Character_Skill_Client.Modify_Weight",

  /**
 * **Camera Orientation Detection Data** `(Execution.Character_Skill_Client.Get_Camera_Data)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200062** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CCAM>` || `target_type` || 目标类型 |
 * | 1 || 🔹 || `Vec` || `origin` || 出射位置 |
 * | 2 || 🔹 || `Flt` || `min_distance` || 最近距离 |
 * | 3 || 🔹 || `Flt` || `max_distance` || 最远距离 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Vec` || `target_rotation` || 目标旋转 |
 * | 1 || 🔸 || `Vec` || `target_position` || 目标位置 |
 */
  Execution_CharacterSkillClient_GetCameraData: "Execution.Character_Skill_Client.Get_Camera_Data",

  /**
 * **3D Vector Dot Product** `(Arithmetic.Math_Client.Vector_Dot)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200063** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector1` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `vector2` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `dot` || 计算结果 |
 */
  Arithmetic_MathClient_VectorDot: "Arithmetic.Math_Client.Vector_Dot",

  /**
 * **3D Vector Cross Product** `(Arithmetic.Math_Client.Vector_Cross)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200064** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector1` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `vector2` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `cross` || 计算结果 |
 */
  Arithmetic_MathClient_VectorCross: "Arithmetic.Math_Client.Vector_Cross",

  /**
 * **Split 3D Vector** `(Arithmetic.Math_Client.Split_Vector)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200065** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `x` || X分量 |
 * | 1 || 🔸 || `Flt` || `y` || Y分量 |
 * | 2 || 🔸 || `Flt` || `z` || Z分量 |
 */
  Arithmetic_MathClient_SplitVector: "Arithmetic.Math_Client.Split_Vector",

  /**
 * **3D Vector Zoom** `(Arithmetic.Math_Client.Vector_Scale)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200066** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `scale` || 缩放倍率 |
 * | 1 || 🔹 || `Vec` || `vector` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_MathClient_VectorScale: "Arithmetic.Math_Client.Vector_Scale",

  /**
 * **3D Vector Angle** `(Arithmetic.Math_Client.Vector_Angle)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200067** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector1` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `vector2` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `angle_degrees` || 夹角角度 |
 */
  Arithmetic_MathClient_VectorAngle: "Arithmetic.Math_Client.Vector_Angle",

  /**
 * **3D Vector Rotation** `(Arithmetic.Math_Client.Vector_Rotate)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200068** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector` || 被旋转的三维向量 |
 * | 1 || 🔹 || `Vec` || `rotation` || 旋转 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_MathClient_VectorRotate: "Arithmetic.Math_Client.Vector_Rotate",

  /**
 * **3D Vector Modulo Operation** `(Arithmetic.Math_Client.Vector_Length)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200069** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_MathClient_VectorLength: "Arithmetic.Math_Client.Vector_Length",

  /**
 * **Create 3D Vector** `(Arithmetic.Math_Client.Create_Vector)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200070** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `x` || X分量 |
 * | 1 || 🔹 || `Flt` || `y` || Y分量 |
 * | 2 || 🔹 || `Flt` || `z` || Z分量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `vector` || 三维向量 |
 */
  Arithmetic_MathClient_CreateVector: "Arithmetic.Math_Client.Create_Vector",

  /**
 * **3D Vector Addition** `(Arithmetic.Math_Client.Vector_Add)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200071** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector1` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `vector2` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `sum` || 计算结果 |
 */
  Arithmetic_MathClient_VectorAdd: "Arithmetic.Math_Client.Vector_Add",

  /**
 * **3D Vector Subtraction** `(Arithmetic.Math_Client.Vector_Subtract)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200072** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector1` || 三维向量1 |
 * | 1 || 🔹 || `Vec` || `vector2` || 三维向量2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `diff` || 计算结果 |
 */
  Arithmetic_MathClient_VectorSubtract: "Arithmetic.Math_Client.Vector_Subtract",

  /**
 * **Direction Vector to Rotation** `(Arithmetic.Math_Client.Vector_To_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200073** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `forward` || 向前向量 |
 * | 1 || 🔹 || `Vec` || `up` || 向上向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `rotation` || 旋转 |
 */
  Arithmetic_MathClient_VectorToRotation: "Arithmetic.Math_Client.Vector_To_Rotation",

  /**
 * **Orientation to Rotation** `(Arithmetic.Math_Client.Orientation_To_Rotation)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200074** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `Input0` ||  |
 * | 1 || 🔹 || `Vec` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `Output0` ||  |
 */
  Arithmetic_MathClient_OrientationToRotation: "Arithmetic.Math_Client.Orientation_To_Rotation",

  /**
 * **Recover HP** `(Execution.Character_Skill_Client.Recover_HP)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200075** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Flt` || `heal_amount` || 恢复量 |
 * | 2 || 🔹 || `Bol` || `ignore_healing_adjustments` || 是否忽略恢复调整效果 |
 * | 3 || 🔹 || `Flt` || `aggro_multiplier` || 本次治疗的仇恨倍率 |
 * | 4 || 🔹 || `Int` || `aggro_increment` || 本次治疗的仇恨增量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_RecoverHP: "Execution.Character_Skill_Client.Recover_HP",

  /**
 * **Get Current Character** `(Query.Character_Related_Client.Get_Current_Character)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200076** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `character_entity` || 角色实体 |
 */
  Query_CharacterRelatedClient_GetCurrentCharacter: "Query.Character_Related_Client.Get_Current_Character",

  /**
 * **Get Entity's Unit Tag List** `(Query.Unit_Tag_Client.Get_Tags)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200077** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Int>` || `indexes` || 列表 |
 */
  Query_UnitTagClient_GetTags: "Query.Unit_Tag_Client.Get_Tags",

  /**
 * **Get Entity List by Unit Tag** `(Query.Unit_Tag_Client.Get_By_Tag)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200078** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `unit_tag_index` || 单位标签索引 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_UnitTagClient_GetByTag: "Query.Unit_Tag_Client.Get_By_Tag",

  /**
 * **Finite Loop** `(Execution.General_Client.For_Loop)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200079** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `Start` ||  |
 * | - || ▶️ || - || `Break` || Break Loop |
 * | 0 || 🔹 || `Int` || `start_index` || 循环起始值 |
 * | 1 || 🔹 || `Int` || `end_index` || 循环终止值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `Iteration` || Loop Body |
 * | - || ⏩ || - || `End` || Loop Complete |
 * | 0 || 🔸 || `Int` || `current_index` || 当前循环值 |
 */
  Execution_GeneralClient_ForLoop: "Execution.General_Client.For_Loop",

  /**
 * **Break Loop** `(Execution.General_Client.Break)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200080** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_GeneralClient_Break: "Execution.General_Client.Break",

  /**
 * **Set Local Variable** `(Execution.General_Client.Set_Local)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200081** || 📱 Client || ⚙️ Execution || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Str` || `variable_name` || 变量名 |
 * | 1 || 🔷 || **`R<T>`** || `variable_value` || 变量值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Execution_GeneralClient_SetLocal: "Execution.General_Client.Set_Local",

  /**
 * **Get Local Variable** `(Query.General_Client.Get_Local)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200082** || 📱 Client || 🔍 Query || 🧩Variant |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Str` || `variable_name` || 变量名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔶 || **`R<T>`** || `value` || 变量值 |
 *
 * #### 🧬 Variant Constraints
 * * `C<T:Int>`
 * * `C<T:Str>`
 * * `C<T:Ety>`
 * * `C<T:Gid>`
 * * `C<T:Flt>`
 * * `C<T:Vec>`
 * * `C<T:Bol>`
 * * `C<T:L<Int>>`
 * * `C<T:L<Str>>`
 * * `C<T:L<Ety>>`
 * * `C<T:L<Gid>>`
 * * `C<T:L<Flt>>`
 * * `C<T:L<Vec>>`
 * * `C<T:L<Bol>>`
 * * `C<T:Cfg>`
 * * `C<T:Pfb>`
 * * `C<T:Fct>`
 */
  Query_GeneralClient_GetLocal: "Query.General_Client.Get_Local",

  /**
 * **Set the Aggro Value of the Specified Entity** `(Execution.Custom_Aggro_Client.Set_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200083** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner` || 仇恨拥有者实体 |
 * | 2 || 🔹 || `Int` || `value` || 仇恨值 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_SetAggro: "Execution.Custom_Aggro_Client.Set_Aggro",

  /**
 * **Modify the Aggro Value of the Specified Entity** `(Execution.Custom_Aggro_Client.Modify_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200084** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner` || 仇恨拥有者实体 |
 * | 2 || 🔹 || `Int` || `delta` || 仇恨值增量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_ModifyAggro: "Execution.Custom_Aggro_Client.Modify_Aggro",

  /**
 * **Modify the Aggro Value of the Specified Entity Proportionally** `(Execution.Custom_Aggro_Client.Modify_Aggro_Ratio)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200085** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner` || 仇恨拥有者实体 |
 * | 2 || 🔹 || `Flt` || `ratio` || 修改的仇恨值比例 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_ModifyAggroRatio: "Execution.Custom_Aggro_Client.Modify_Aggro_Ratio",

  /**
 * **Transfer the Aggro Value of the Specified Entity Proportionally** `(Execution.Custom_Aggro_Client.Transfer_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200086** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 转移目标实体 |
 * | 1 || 🔹 || `Ety` || `source` || 转移来源实体 |
 * | 2 || 🔹 || `Ety` || `owner` || 仇恨拥有者实体 |
 * | 3 || 🔹 || `Flt` || `ratio` || 转移比例 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_TransferAggro: "Execution.Custom_Aggro_Client.Transfer_Aggro",

  /**
 * **Clear the Aggro List of the Specified Entity** `(Execution.Custom_Aggro_Client.Clear_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200087** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_ClearAggro: "Execution.Custom_Aggro_Client.Clear_Aggro",

  /**
 * **Remove Target Entity From Aggro List** `(Execution.Custom_Aggro_Client.Remove_Aggro)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200088** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `target` || 目标实体 |
 * | 1 || 🔹 || `Ety` || `owner` || 仇恨拥有者实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_RemoveAggro: "Execution.Custom_Aggro_Client.Remove_Aggro",

  /**
 * **Taunt Target** `(Execution.Custom_Aggro_Client.Taunt)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200089** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Ety` || `taunter` || 嘲讽者实体 |
 * | 1 || 🔹 || `Ety` || `target` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CustomAggroClient_Taunt: "Execution.Custom_Aggro_Client.Taunt",

  /**
 * **Get the Aggro Target of the Specified Entity** `(Query.Custom_Aggro_Client.Get_Aggro_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200090** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `specified_entity` || 指定实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `hate_target` || 仇恨目标 |
 */
  Query_CustomAggroClient_GetAggroTarget: "Query.Custom_Aggro_Client.Get_Aggro_Target",

  /**
 * **Get the Aggro List of the Specified Entity** `(Query.Custom_Aggro_Client.Get_Aggro_List)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200091** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `specified_entity` || 指定实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `hate_list` || 仇恨列表 |
 */
  Query_CustomAggroClient_GetAggroList: "Query.Custom_Aggro_Client.Get_Aggro_List",

  /**
 * **Query if Specified Entity is in Combat** `(Query.Custom_Aggro_Client.Is_In_Combat)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200092** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `is_in_combat` || 是否入战 |
 */
  Query_CustomAggroClient_IsInCombat: "Query.Custom_Aggro_Client.Is_In_Combat",

  /**
 * **Query If Faction Is Hostile** `(Query.Faction_Related_Client.Is_Hostile)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200093** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Fct` || `camp1` || 阵营1 |
 * | 1 || 🔹 || `Fct` || `camp2` || 阵营2 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `is_hostile` || 是否敌对 |
 */
  Query_FactionRelatedClient_IsHostile: "Query.Faction_Related_Client.Is_Hostile",

  /**
 * **Sine Function** `(Arithmetic.Math_Client.Sin)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200094** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radian` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_MathClient_Sin: "Arithmetic.Math_Client.Sin",

  /**
 * **Cosine Function** `(Arithmetic.Math_Client.Cos)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200095** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radian` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `result` || 结果 |
 */
  Arithmetic_MathClient_Cos: "Arithmetic.Math_Client.Cos",

  /**
 * **Tangent Function** `(Arithmetic.Math_Client.Tan)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200096** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `Input1` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `Output0` ||  |
 */
  Arithmetic_MathClient_Tan: "Arithmetic.Math_Client.Tan",

  /**
 * **Arcsine Function** `(Arithmetic.Math_Client.Asin)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200097** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_MathClient_Asin: "Arithmetic.Math_Client.Asin",

  /**
 * **Arccosine Function** `(Arithmetic.Math_Client.Acos)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200098** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_MathClient_Acos: "Arithmetic.Math_Client.Acos",

  /**
 * **Arctangent Function** `(Arithmetic.Math_Client.Atan)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200099** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `input` || 输入 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radians` || 弧度 |
 */
  Arithmetic_MathClient_Atan: "Arithmetic.Math_Client.Atan",

  /**
 * **3D Vector Normalization** `(Arithmetic.Math_Client.Vector_Normalize)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200100** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Vec` || `vector` || 三维向量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `result` || 结果 |
 */
  Arithmetic_MathClient_VectorNormalize: "Arithmetic.Math_Client.Vector_Normalize",

  /**
 * **Radians to Degrees** `(Arithmetic.Math_Client.Rad_To_Deg)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200101** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `radian` || 弧度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `degree` || 角度 |
 */
  Arithmetic_MathClient_RadToDeg: "Arithmetic.Math_Client.Rad_To_Deg",

  /**
 * **Degrees to Radians** `(Arithmetic.Math_Client.Deg_To_Rad)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200102** || 📱 Client || 🔢 Arithmetic || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Flt` || `degree` || 角度 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Flt` || `radian` || 弧度 |
 */
  Arithmetic_MathClient_DegToRad: "Arithmetic.Math_Client.Deg_To_Rad",

  /**
 * **Query If Entity Is on the Field** `(Query.Entity_Related_Client.Is_Active)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200103** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Bol` || `is_present` || 是否在场 |
 */
  Query_EntityRelatedClient_IsActive: "Query.Entity_Related_Client.Is_Active",

  /**
 * **Node Graph Ends** `(Hidden.Other_Client.Graph_End)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200104** || 📱 Client || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔹 || `E<CFLT>` || `Input1` ||  |
 */
  Hidden_OtherClient_GraphEnd: "Hidden.Other_Client.Graph_End",

  /**
 * **Player Turns to Face Set Direction** `(Execution.Character_Skill_Client.Turn_To_Face)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200105** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Vec` || `direction` || 朝向 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TurnToFace: "Execution.Character_Skill_Client.Turn_To_Face",

  /**
 * **Reset Skill Target** `(Execution.Character_Skill_Client.Reset_Target)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200106** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_ResetTarget: "Execution.Character_Skill_Client.Reset_Target",

  /**
 * **Get All Entities Within the Collision Trigger** `(Query.Trigger_Client.Get_Overlapping_Entities)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200107** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 * | 1 || 🔹 || `Int` || `trigger_index` || 触发器序号 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `entities` || 实体列表 |
 */
  Query_TriggerClient_GetOverlappingEntities: "Query.Trigger_Client.Get_Overlapping_Entities",

  /**
 * **Force Exit Aiming State** `(Execution.Character_Skill_Client.Exit_Aiming)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200108** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_ExitAiming: "Execution.Character_Skill_Client.Exit_Aiming",

  /**
 * **Get Ray Detection Result** `(Query.Ray_Client.Get_Ray_Result)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200109** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `Input0` ||  |
 * | 1 || 🔹 || `Vec` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Flt` || `Input3` ||  |
 * | 4 || 🔹 || `E<CCAM>` || `Input4` ||  |
 * | 5 || 🔹 || `L<E<CETY>>` || `Input5` ||  |
 * | 6 || 🔹 || `L<E<CATX>>` || `Input6` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Vec` || `Output0` ||  |
 * | 1 || 🔸 || `Ety` || `Output1` ||  |
 */
  Query_RayClient_GetRayResult: "Query.Ray_Client.Get_Ray_Result",

  /**
 * **Get Ray Filter Type List** `(Query.List_Related_Client.Get_Ray_Filters)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200110** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Int` || `Input0` ||  |
 * | 1 || 🔹 || `E<CATX>` || `Input1` ||  |
 * | 2 || 🔹 || `E<CATX>` || `Input2` ||  |
 * | 3 || 🔹 || `E<CATX>` || `Input3` ||  |
 * | 4 || 🔹 || `E<CATX>` || `Input4` ||  |
 * | 5 || 🔹 || `E<CATX>` || `Input5` ||  |
 * | 6 || 🔹 || `E<CATX>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CATX>` || `Input7` ||  |
 * | 8 || 🔹 || `E<CATX>` || `Input8` ||  |
 * | 9 || 🔹 || `E<CATX>` || `Input9` ||  |
 * | 10 || 🔹 || `E<CATX>` || `Input10` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<E<CATX>>` || `list` || 列表 |
 */
  Query_ListRelatedClient_GetRayFilters: "Query.List_Related_Client.Get_Ray_Filters",

  /**
 * **Trigger Spherical Hitbox at Specific Location** `(Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200111** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `camp_filter` || 目标阵营筛选 |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Flt` || `damage_ratio` || 伤害系数 |
 * | 4 || 🔹 || `Flt` || `damage_offset` || 伤害增量 |
 * | 5 || 🔹 || `L<E<CETY>>` || `entity_type_filter_list` || 攻击盒实体类型筛选列表 |
 * | 6 || 🔹 || `E<CTRG>` || `trigger_type` || 触发类型 |
 * | 7 || 🔹 || `Int` || `hit_scene_fx` || 命中场景特效 |
 * | 8 || 🔹 || `Vec` || `sphere_radius` || 攻击盒为球体时的半径 |
 * | 9 || 🔹 || `E<CALC>` || `hit_layer_filter` || 攻击层筛选 |
 * | 10 || 🔹 || `L<Str>` || `attack_tags` || 攻击标签列表 |
 * | 11 || 🔹 || `E<CELM>` || `element_type` || 元素类型 |
 * | 12 || 🔹 || `Flt` || `element_attack_enhance` || 元素攻击强效 |
 * | 13 || 🔹 || `E<CHIT>` || `hit_type` || 打击类型 |
 * | 14 || 🔹 || `E<CATK>` || `attack_type` || 攻击类型 |
 * | 15 || 🔹 || `Flt` || `interrupt_value` || 打断值 |
 * | 16 || 🔹 || `Bol` || `absolute_damage` || 是否是绝对伤害 |
 * | 17 || 🔹 || `Int` || `hit_fx` || 命中特效 |
 * | 18 || 🔹 || `E<CKBD>` || `knockback_direction` || 受击击退朝向 |
 * | 19 || 🔹 || `Bol` || `suppress_floating_text` || 是否屏蔽伤害跳字 |
 * | 20 || 🔹 || `Vec` || `hit_scene_fx_offset` || 命中场景特效偏移 |
 * | 21 || 🔹 || `Vec` || `hit_scene_fx_rotation` || 命中场景特效旋转 |
 * | 22 || 🔹 || `Flt` || `hit_scene_fx_scale` || 命中场景特效缩放 |
 * | 23 || 🔹 || `Vec` || `hit_fx_offset` || 命中特效偏移 |
 * | 24 || 🔹 || `Vec` || `hit_fx_rotation` || 命中特效旋转 |
 * | 25 || 🔹 || `Flt` || `hit_fx_scale` || 命中特效缩放 |
 * | 26 || 🔹 || `Flt` || `aggro_multiplier` || 本次攻击的仇恨倍率 |
 * | 27 || 🔹 || `Int` || `aggro_increment` || 本次攻击的仇恨增量 |
 * | 28 || 🔹 || `E<CHTS>` || `hit_level` || 受击等级 |
 * | 29 || 🔹 || `Flt` || `horizontal_impulse` || 命中水平冲量 |
 * | 30 || 🔹 || `Flt` || `vertical_impulse` || 命中垂直冲量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerSphereHitboxLoc: "Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc",

  /**
 * **Trigger Rectangular Hitbox at Specific Location** `(Execution.Character_Skill_Client.Trigger_Rect_Hitbox_Loc)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200112** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `camp_filter` || 目标阵营筛选 |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Flt` || `damage_ratio` || 伤害系数 |
 * | 4 || 🔹 || `Flt` || `damage_offset` || 伤害增量 |
 * | 5 || 🔹 || `L<E<CETY>>` || `entity_type_filter_list` || 攻击盒实体类型筛选列表 |
 * | 6 || 🔹 || `E<CTRG>` || `trigger_type` || 触发类型 |
 * | 7 || 🔹 || `Int` || `hit_scene_fx` || 命中场景特效 |
 * | 8 || 🔹 || `Vec` || `box_scale` || 攻击盒为长方体时的缩放 |
 * | 9 || 🔹 || `E<CALC>` || `hit_layer_filter` || 攻击层筛选 |
 * | 10 || 🔹 || `L<Str>` || `attack_tags` || 攻击标签列表 |
 * | 11 || 🔹 || `E<CELM>` || `element_type` || 元素类型 |
 * | 12 || 🔹 || `Flt` || `element_attack_enhance` || 元素攻击强效 |
 * | 13 || 🔹 || `E<CHIT>` || `hit_type` || 打击类型 |
 * | 14 || 🔹 || `E<CATK>` || `attack_type` || 攻击类型 |
 * | 15 || 🔹 || `Flt` || `interrupt_value` || 打断值 |
 * | 16 || 🔹 || `Bol` || `absolute_damage` || 是否是绝对伤害 |
 * | 17 || 🔹 || `Int` || `hit_fx` || 命中特效 |
 * | 18 || 🔹 || `E<CKBD>` || `knockback_direction` || 受击击退朝向 |
 * | 19 || 🔹 || `Bol` || `suppress_floating_text` || 是否屏蔽伤害跳字 |
 * | 20 || 🔹 || `Vec` || `hit_scene_fx_offset` || 命中场景特效偏移 |
 * | 21 || 🔹 || `Vec` || `hit_scene_fx_rotation` || 命中场景特效旋转 |
 * | 22 || 🔹 || `Flt` || `hit_scene_fx_scale` || 命中场景特效缩放 |
 * | 23 || 🔹 || `Vec` || `hit_fx_offset` || 命中特效偏移 |
 * | 24 || 🔹 || `Vec` || `hit_fx_rotation` || 命中特效旋转 |
 * | 25 || 🔹 || `Flt` || `hit_fx_scale` || 命中特效缩放 |
 * | 26 || 🔹 || `Flt` || `aggro_multiplier` || 本次攻击的仇恨倍率 |
 * | 27 || 🔹 || `Int` || `aggro_increment` || 本次攻击的仇恨增量 |
 * | 28 || 🔹 || `E<CHTS>` || `hit_level` || 受击等级 |
 * | 29 || 🔹 || `Flt` || `horizontal_impulse` || 命中水平冲量 |
 * | 30 || 🔹 || `Flt` || `vertical_impulse` || 命中垂直冲量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerRectHitboxLoc: "Execution.Character_Skill_Client.Trigger_Rect_Hitbox_Loc",

  /**
 * **Trigger Sector Hitbox at Specific Location** `(Execution.Character_Skill_Client.Trigger_Sector_Hitbox_Loc)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200113** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `camp_filter` || 目标阵营筛选 |
 * | 1 || 🔹 || `Vec` || `position` || 位置 |
 * | 2 || 🔹 || `Vec` || `rotation` || 旋转 |
 * | 3 || 🔹 || `Flt` || `damage_ratio` || 伤害系数 |
 * | 4 || 🔹 || `Flt` || `damage_offset` || 伤害增量 |
 * | 5 || 🔹 || `L<E<CETY>>` || `entity_type_filter_list` || 攻击盒实体类型筛选列表 |
 * | 6 || 🔹 || `E<CTRG>` || `trigger_type` || 触发类型 |
 * | 7 || 🔹 || `Int` || `hit_scene_fx` || 命中场景特效 |
 * | 8 || 🔹 || `Flt` || `sector_height` || 攻击盒为扇形时的高度 |
 * | 9 || 🔹 || `Flt` || `sector_angle` || 攻击盒为扇形时的扇角度 |
 * | 10 || 🔹 || `Flt` || `sector_radius` || 攻击盒为扇形时的扇半径 |
 * | 11 || 🔹 || `Flt` || `sector_inner_radius` || 攻击盒为扇形时的内半径 |
 * | 12 || 🔹 || `E<CSCT>` || `sector_direction` || 攻击盒为扇形时的检测方向 |
 * | 13 || 🔹 || `E<CALC>` || `hit_layer_filter` || 攻击层筛选 |
 * | 14 || 🔹 || `L<Str>` || `attack_tags` || 攻击标签列表 |
 * | 15 || 🔹 || `E<CELM>` || `element_type` || 元素类型 |
 * | 16 || 🔹 || `Flt` || `element_attack_enhance` || 元素攻击强效 |
 * | 17 || 🔹 || `E<CHIT>` || `hit_type` || 打击类型 |
 * | 18 || 🔹 || `E<CATK>` || `attack_type` || 攻击类型 |
 * | 19 || 🔹 || `Flt` || `interrupt_value` || 打断值 |
 * | 20 || 🔹 || `Bol` || `absolute_damage` || 是否是绝对伤害 |
 * | 21 || 🔹 || `Int` || `hit_fx` || 命中特效 |
 * | 22 || 🔹 || `E<CKBD>` || `knockback_direction` || 受击击退朝向 |
 * | 23 || 🔹 || `Bol` || `suppress_floating_text` || 是否屏蔽伤害跳字 |
 * | 24 || 🔹 || `Vec` || `hit_scene_fx_offset` || 命中场景特效偏移 |
 * | 25 || 🔹 || `Vec` || `hit_scene_fx_rotation` || 命中场景特效旋转 |
 * | 26 || 🔹 || `Flt` || `hit_scene_fx_scale` || 命中场景特效缩放 |
 * | 27 || 🔹 || `Vec` || `hit_fx_offset` || 命中特效偏移 |
 * | 28 || 🔹 || `Vec` || `hit_fx_rotation` || 命中特效旋转 |
 * | 29 || 🔹 || `Flt` || `hit_fx_scale` || 命中特效缩放 |
 * | 30 || 🔹 || `Flt` || `aggro_multiplier` || 本次攻击的仇恨倍率 |
 * | 31 || 🔹 || `Int` || `aggro_increment` || 本次攻击的仇恨增量 |
 * | 32 || 🔹 || `E<CHTS>` || `hit_level` || 受击等级 |
 * | 33 || 🔹 || `Flt` || `horizontal_impulse` || 命中水平冲量 |
 * | 34 || 🔹 || `Flt` || `vertical_impulse` || 命中垂直冲量 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerSectorHitboxLoc: "Execution.Character_Skill_Client.Trigger_Sector_Hitbox_Loc",

  /**
 * **Trigger Spherical Hitbox at Specified Attachment Point** `(Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Socket)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200114** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Vec` || `Input3` ||  |
 * | 4 || 🔹 || `Flt` || `Input4` ||  |
 * | 5 || 🔹 || `Flt` || `Input5` ||  |
 * | 6 || 🔹 || `L<E<CETY>>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CTRG>` || `Input7` ||  |
 * | 8 || 🔹 || `Int` || `Input8` ||  |
 * | 9 || 🔹 || `Flt` || `Input12` ||  |
 * | 10 || 🔹 || `Flt` || `Input13` ||  |
 * | 11 || 🔹 || `Flt` || `Input14` ||  |
 * | 12 || 🔹 || `Flt` || `Input15` ||  |
 * | 13 || 🔹 || `E<CSCT>` || `Input16` ||  |
 * | 14 || 🔹 || `E<CALC>` || `Input17` ||  |
 * | 15 || 🔹 || `L<Str>` || `Input18` ||  |
 * | 16 || 🔹 || `E<CELM>` || `Input19` ||  |
 * | 17 || 🔹 || `Flt` || `Input20` ||  |
 * | 18 || 🔹 || `E<CHIT>` || `Input21` ||  |
 * | 19 || 🔹 || `E<CATK>` || `Input22` ||  |
 * | 20 || 🔹 || `Flt` || `Input23` ||  |
 * | 21 || 🔹 || `Bol` || `Input25` ||  |
 * | 22 || 🔹 || `Int` || `Input26` ||  |
 * | 23 || 🔹 || `E<CKBD>` || `Input28` ||  |
 * | 24 || 🔹 || `Bol` || `Input29` ||  |
 * | 25 || 🔹 || `Vec` || `Input33` ||  |
 * | 26 || 🔹 || `Vec` || `Input34` ||  |
 * | 27 || 🔹 || `Flt` || `Input35` ||  |
 * | 28 || 🔹 || `Vec` || `Input39` ||  |
 * | 29 || 🔹 || `Vec` || `Input40` ||  |
 * | 30 || 🔹 || `Flt` || `Input41` ||  |
 * | 31 || 🔹 || `Flt` || `Input42` ||  |
 * | 32 || 🔹 || `Int` || `Input43` ||  |
 * | 33 || 🔹 || `E<CHTS>` || `Input45` ||  |
 * | 34 || 🔹 || `Flt` || `Input46` ||  |
 * | 35 || 🔹 || `Flt` || `Input47` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerSphereHitboxSocket: "Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Socket",

  /**
 * **Trigger Rectangular Hitbox at Specified Attachment Point** `(Execution.Character_Skill_Client.Trigger_Rect_Hitbox_Socket)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200115** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Vec` || `Input3` ||  |
 * | 4 || 🔹 || `Flt` || `Input4` ||  |
 * | 5 || 🔹 || `Flt` || `Input5` ||  |
 * | 6 || 🔹 || `L<E<CETY>>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CTRG>` || `Input7` ||  |
 * | 8 || 🔹 || `Int` || `Input8` ||  |
 * | 9 || 🔹 || `Vec` || `Input10` ||  |
 * | 10 || 🔹 || `E<CALC>` || `Input17` ||  |
 * | 11 || 🔹 || `L<Str>` || `Input18` ||  |
 * | 12 || 🔹 || `E<CELM>` || `Input19` ||  |
 * | 13 || 🔹 || `Flt` || `Input20` ||  |
 * | 14 || 🔹 || `E<CHIT>` || `Input21` ||  |
 * | 15 || 🔹 || `E<CATK>` || `Input22` ||  |
 * | 16 || 🔹 || `Flt` || `Input23` ||  |
 * | 17 || 🔹 || `Bol` || `Input25` ||  |
 * | 18 || 🔹 || `Int` || `Input26` ||  |
 * | 19 || 🔹 || `E<CKBD>` || `Input28` ||  |
 * | 20 || 🔹 || `Bol` || `Input29` ||  |
 * | 21 || 🔹 || `Vec` || `Input33` ||  |
 * | 22 || 🔹 || `Vec` || `Input34` ||  |
 * | 23 || 🔹 || `Flt` || `Input35` ||  |
 * | 24 || 🔹 || `Vec` || `Input39` ||  |
 * | 25 || 🔹 || `Vec` || `Input40` ||  |
 * | 26 || 🔹 || `Flt` || `Input41` ||  |
 * | 27 || 🔹 || `Flt` || `Input42` ||  |
 * | 28 || 🔹 || `Int` || `Input43` ||  |
 * | 29 || 🔹 || `E<CHTS>` || `Input45` ||  |
 * | 30 || 🔹 || `Flt` || `Input46` ||  |
 * | 31 || 🔹 || `Flt` || `Input47` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerRectHitboxSocket: "Execution.Character_Skill_Client.Trigger_Rect_Hitbox_Socket",

  /**
 * **Trigger Sector Hitbox at Specified Attachment Point** `(Execution.Character_Skill_Client.Trigger_Sector_Hitbox_Socket)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200116** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `E<CTTP>` || `Input0` ||  |
 * | 1 || 🔹 || `Str` || `Input1` ||  |
 * | 2 || 🔹 || `Vec` || `Input2` ||  |
 * | 3 || 🔹 || `Vec` || `Input3` ||  |
 * | 4 || 🔹 || `Flt` || `Input4` ||  |
 * | 5 || 🔹 || `Flt` || `Input5` ||  |
 * | 6 || 🔹 || `L<E<CETY>>` || `Input6` ||  |
 * | 7 || 🔹 || `E<CTRG>` || `Input7` ||  |
 * | 8 || 🔹 || `Int` || `Input8` ||  |
 * | 9 || 🔹 || `Flt` || `Input12` ||  |
 * | 10 || 🔹 || `Flt` || `Input13` ||  |
 * | 11 || 🔹 || `Flt` || `Input14` ||  |
 * | 12 || 🔹 || `Flt` || `Input15` ||  |
 * | 13 || 🔹 || `E<CSCT>` || `Input16` ||  |
 * | 14 || 🔹 || `E<CALC>` || `Input17` ||  |
 * | 15 || 🔹 || `L<Str>` || `Input18` ||  |
 * | 16 || 🔹 || `E<CELM>` || `Input19` ||  |
 * | 17 || 🔹 || `Flt` || `Input20` ||  |
 * | 18 || 🔹 || `E<CHIT>` || `Input21` ||  |
 * | 19 || 🔹 || `E<CATK>` || `Input22` ||  |
 * | 20 || 🔹 || `Flt` || `Input23` ||  |
 * | 21 || 🔹 || `Bol` || `Input25` ||  |
 * | 22 || 🔹 || `Int` || `Input26` ||  |
 * | 23 || 🔹 || `E<CKBD>` || `Input28` ||  |
 * | 24 || 🔹 || `Bol` || `Input29` ||  |
 * | 25 || 🔹 || `Vec` || `Input33` ||  |
 * | 26 || 🔹 || `Vec` || `Input34` ||  |
 * | 27 || 🔹 || `Flt` || `Input35` ||  |
 * | 28 || 🔹 || `Vec` || `Input39` ||  |
 * | 29 || 🔹 || `Vec` || `Input40` ||  |
 * | 30 || 🔹 || `Flt` || `Input41` ||  |
 * | 31 || 🔹 || `Flt` || `Input42` ||  |
 * | 32 || 🔹 || `Int` || `Input43` ||  |
 * | 33 || 🔹 || `E<CHTS>` || `Input45` ||  |
 * | 34 || 🔹 || `Flt` || `Input46` ||  |
 * | 35 || 🔹 || `Flt` || `Input47` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_CharacterSkillClient_TriggerSectorHitboxSocket: "Execution.Character_Skill_Client.Trigger_Sector_Hitbox_Socket",

  /**
 * **(Test) Send Client Signal** `(Hidden.Execution_Client.Test_Send_Signal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200117** || 📱 Client || 🚫 Hidden || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Str` || `Input0` ||  |
 * | 1 || 🔹 || `Ety` || `Input1` ||  |
 * | 2 || 🔹 || `L<Ety>` || `Input2` ||  |
 * | 3 || 🔹 || `Int` || `Input3` ||  |
 * | 4 || 🔹 || `L<Int>` || `Input4` ||  |
 * | 5 || 🔹 || `Bol` || `Input5` ||  |
 * | 6 || 🔹 || `L<Bol>` || `Input6` ||  |
 * | 7 || 🔹 || `Flt` || `Input7` ||  |
 * | 8 || 🔹 || `L<Flt>` || `Input8` ||  |
 * | 9 || 🔹 || `Str` || `Input9` ||  |
 * | 10 || 🔹 || `L<Str>` || `Input10` ||  |
 * | 11 || 🔹 || `Vec` || `Input11` ||  |
 * | 12 || 🔹 || `L<Vec>` || `Input12` ||  |
 * | 13 || 🔹 || `Gid` || `Input13` ||  |
 * | 14 || 🔹 || `L<Gid>` || `Input14` ||  |
 * | 15 || 🔹 || `Fct` || `Input15` ||  |
 * | 16 || 🔹 || `Cfg` || `Input16` ||  |
 * | 17 || 🔹 || `L<Cfg>` || `Input17` ||  |
 * | 18 || 🔹 || `Pfb` || `Input18` ||  |
 * | 19 || 🔹 || `L<Pfb>` || `Input19` ||  |
 */
  Hidden_ExecutionClient_TestSendSignal: "Hidden.Execution_Client.Test_Send_Signal",

  /**
 * **Get Entity Currently Scanned by Scan Component** `(Query.Scanning_Client.Get_Scanned_Entity)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200118** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Ety` || `entity` || 对应实体 |
 * | 1 || 🔸 || `Cfg` || `scan_tag_config_id` || 扫描标签配置ID |
 */
  Query_ScanningClient_GetScannedEntity: "Query.Scanning_Client.Get_Scanned_Entity",

  /**
 * **Get All Valid Entities That Are Scannable by Scan Component** `(Query.Scanning_Client.Get_Scannable_Entities)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200119** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `L<Ety>` || `objects` || 对象列表 |
 */
  Query_ScanningClient_GetScannableEntities: "Query.Scanning_Client.Get_Scannable_Entities",

  /**
 * **Get Entity's Scan Status** `(Query.Scanning_Client.Get_Scan_Status)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200120** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<CSCN>` || `scan_state` || 扫描状态 |
 */
  Query_ScanningClient_GetScanStatus: "Query.Scanning_Client.Get_Scan_Status",

  /**
 * **Get Entity's Current Active Scan Tags** `(Query.Scanning_Client.Get_Active_Tags)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200121** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Ety` || `target_entity` || 目标实体 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `Cfg` || `scan_tag_config_id` || 扫描标签配置ID |
 */
  Query_ScanningClient_GetActiveTags: "Query.Scanning_Client.Get_Active_Tags",

  /**
 * **Node Graph End (Integer)** `(Others.Port_Client.Graph_End_Int)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200122** || 📱 Client || 🔗 Others || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Bol` || `Input0` ||  |
 * | 1 || 🔹 || `E<CFLT>` || `Input1` ||  |
 */
  Others_PortClient_GraphEndInt: "Others.Port_Client.Graph_End_Int",

  /**
 * **Get Player Client Input Device Type** `(Query.Character_Related_Client.Get_Input_Type)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200123** || 📱 Client || 🔍 Query || 📌Fixed |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔸 || `E<CDEV>` || `input_device_type` || 输入设备类型 |
 */
  Query_CharacterRelatedClient_GetInputType: "Query.Character_Related_Client.Get_Input_Type",

  /**
 * **Send Signal to Server Node Graph** `(Execution.Signal_Client.Send_To_Server)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **200124** || 📱 Client || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_SignalClient_SendToServer: "Execution.Signal_Client.Send_To_Server",

  /**
 * **Send Signal** `(Execution.Signal.Send)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300000** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 * | 0 || 🔹 || `Str` || `Input0` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Signal_Send: "Execution.Signal.Send",

  /**
 * **Monitor Signal** `(Trigger.Signal.On_Signal)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300001** || 🖥️ Server || ⚡ Trigger || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | 0 || 🔹 || `Str` || `signal_name` || 信号名 |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 * | 0 || 🔸 || `Ety` || `source_entity` || 事件源实体 |
 * | 1 || 🔸 || `Gid` || `source_guid` || 事件源GUID |
 * | 2 || 🔸 || `Ety` || `signal_from` || 信号来源实体 |
 */
  Trigger_Signal_OnSignal: "Trigger.Signal.On_Signal",

  /**
 * **Assemble Structure** `(Arithmetic.Structure.Assemble_Struct)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300002** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 */
  Arithmetic_Structure_AssembleStruct: "Arithmetic.Structure.Assemble_Struct",

  /**
 * **Split Structure** `(Arithmetic.Structure.Split_Struct)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300003** || 🖥️ Server || 🔢 Arithmetic || 📌Fixed |
 */
  Arithmetic_Structure_SplitStruct: "Arithmetic.Structure.Split_Struct",

  /**
 * **Modify Structure** `(Execution.Structure.Modify)`
 *
 * -----------
 *
 * | ID | │ | System | │ | Domain | │ | Type |
 * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
 * | **300004** || 🖥️ Server || ⚙️ Execution || 📌Fixed |
 *
 * -----------
 *
 * #### 📥 Inputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ▶️ || - || `FlowIn` ||  |
 *
 * -----------
 *
 * #### 📤 Outputs
 * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
 * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
 * | - || ⏩ || - || `FlowOut` ||  |
 */
  Execution_Structure_Modify: "Execution.Structure.Modify",
} as const;

export type NodeIdentifier = typeof NODES[keyof typeof NODES];