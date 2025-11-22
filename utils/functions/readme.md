# Function Definitions & Generation

该文件夹包含用于生成和管理服务器节点算术操作（Math 及部分 Query）定义的工具和源文件。主要目的是将节点定义统一为结构化的 TypeScript 函数声明。方便通过自动化脚本生成 DSL 语言扩展.

## 文件说明

### 核心定义
- **`math.ts`**  
  包含核心的函数定义列表 (`MathNodes`)。使用 `function_defs.ts` 规定的格式描述函数的输入、输出、重载和泛型。这是主要的工作文件。

### 基础设施
- **`function_defs.ts`**  
  定义了描述函数所需的类型系统（`Lambda`, `FunDef`, `Arg` 等），并提供了一个 `Parser` 类，用于解析这些定义并生成标准的 TypeScript 函数签名。
- **`utils.ts`**  
  提供辅助工具和常量（如 `AllTypes`, `SysEnumNames`），以及简化定义的帮助函数（如 `expandArgs`, `XY`, `XYZ`），用于减少 `math.ts` 中的样板代码。

### 验证与工具
- **`check.ts`**  
  验证脚本。用于检查 `math.ts` 中的定义是否：
  1. 覆盖了 `ref.math.yaml` 中的所有引用。
  2. 与 `math_raw.d.ts` 中的手动声明匹配。
- **`tools.ts`**  
  工具脚本。从外部项目（`WebMiliastraNodesEditor`）导入节点定义，并提取相关信息生成 `ref.math.yaml` 和 `ref.query.yaml` 供参考。

### 参考文件
- **`math_raw.d.ts`**  
  手动编写的函数声明文件，作为生成目标的参考模板。
- **`ref.math.yaml`, `ref.query.yaml`**  
  由 `tools.ts` 生成的临时参考文件，包含原始节点的 ID、名称和描述，用于辅助 AI 生成或人工校对。

## 工作流程

1.  **提取参考**: 运行 `tools.ts` 生成 `ref.*.yaml`。
2.  **编写定义**: 在 `math.ts` 中使用 `function_defs.ts` 规定的格式编写或更新函数定义。
3.  **验证**: 运行 `check.ts` 确保定义完整且正确。
4.  **生成**: `/utils/gen_def` 将会调用 `math.ts` 并生成 `def.d.ts` 供 DSL 编写时使用.


## 格式定义说明

函数定义主要基于 `function_defs.ts` 描述的类型系统，通过组合输入 (`in`) 和输出 (`out`) 的不同形态来生成函数重载。

### 详细使用指南 (Usage Guide)

以下是各层级定义的合法形式与使用示例：

#### 1. `ArgType` (参数类型)
表示参数的类型定义。
*   **字符串 (String)**: 直接使用系统类型名或枚举名。
    *   合法值: `"int"`, `"float"`, `"bool"`, `"str"`, `"Vec"`, `"List"`, `"EnumRoundingLogic"` 等。
*   **数组 (Array)**: 表示联合类型 (Union Type) 或多种可能的类型。
    *   示例: `["int", "float"]` → 生成 `int | float`。
*   **函数 (Function)**: 延迟求值，常用于泛型或复杂嵌套类型。
    *   示例: `() => "T"` (泛型 T), `() => "SysAllTypes[]"`。

#### 2. `Arg` (单个参数)
定义函数中的一个命名参数。
*   **对象 (Object)**: `{ 参数名: 类型 }`。
    *   示例: `{ x: "int" }` → 参数名为 `x`，类型为 `int`。
    *   示例: `{ val: ["int", "bool"] }` → 参数名为 `val`，类型为 `int | bool`。
*   **可选参数**: 在对象中添加 `0: true`。
    *   示例: `{ msg: "str", 0: true }` → `msg?: str`。
*   **函数**: 返回上述对象的函数。

#### 3. `ArgArr` (参数列表)
定义一次函数调用所需的完整参数序列（即一个重载签名）。
*   **数组 (Array)**: `Arg` 的列表 `[Arg, Arg, ...]`。
    *   示例: `[{ x: "int" }, { y: "int" }]` → `(x: int, y: int)`。
*   **函数**: 返回上述数组的函数。

**参数列表必须包裹在 `[]` 内(除了在Overloads中的单一参数), 且每个参数对应一个唯一的 `{}` 才是合法的**

#### 4. `Overloads` (带键重载集合)
用于创建**绑定关系**的重载组。通过 `key` 将特定的输入参数列表与输出参数列表关联起来（见“核心机制”）。
*   **对象 (Object)**: `{ key: ArgArr | Arg }`。
    *   示例: `{ i: [{ x: "int" }] }` → 标记为 `i` 的重载 `(x: int)`。
    *   简写: `{ f: { x: "float" } }` → 等同于 `{ f: [{ x: "float" }] }` (自动包裹为数组)。

#### 5. `Args` (输入/输出入口)
`in` 和 `out` 属性的顶层类型，支持嵌套组合。
*   **`ArgArr`**: 单组参数（默认组）。
    *   示例: `in: [{ x: "int" }]`
*   **`Overloads`**: 带标签的多组参数。
    *   示例: `in: { i: ..., f: ... }`
*   **`Args[]`**: 数组列表。列表中的每一项都会被解析并扁平化，用于罗列多种独立的重载情况。
    *   示例: `in: [ [{x:"int"}], [{x:"float"}] ]` → 相当于提供了两个独立的参数列表供组合。

---

### 常见模式示例

**1. 简单函数**
`add(x: int, y: int): int`
```typescript
{
  name: ["add", ...],
  in: [{ x: "int" }, { y: "int" }], // ArgArr
  out: [{ res: "int" }]
}
```

**2. 绑定重载 (Key Matching)**
`abs(int): int` 和 `abs(float): float` (不生成 `int->float` 的交叉组合)
```typescript
{
  name: ["abs", ...],
  in: {
    i: [{ x: "int" }],   // Key: i
    f: [{ x: "float" }]  // Key: f
  },
  out: {
    i: [{ r: "int" }],   // Key: i (仅与 in.i 匹配)
    f: [{ r: "float" }]  // Key: f (仅与 in.f 匹配)
  }
}
```

**3. 笛卡尔积扩增 (Cartesian Product)**
`cast(x: int|float): int|float` (生成 4 种组合: `i->i`, `i->f`, `f->i`, `f->f`)
```typescript
{
  name: ["cast", ...],
  // 使用数组列出两种独立情况，它们都是"默认组"，因此会两两交叉
  in: [ [{x: "int"}], [{x: "float"}] ], 
  out: [ [{r: "int"}], [{r: "float"}] ]
}
```

### 核心机制：匹配与扩增

解析器 (`Parser`) 通过以下逻辑将 `in` 和 `out` 组合生成最终的 TypeScript 函数签名：

1.  **键值匹配 (Key Matching)**:
    解析器通过 `Overloads` 中的 **`key`** 将输入和输出进行对齐。
    *   `in` 中标记为 `key: A` 的参数组，只会与 `out` 中标记为 `key: B` 的返回组进行组合。

2.  **默认组 (Default Group)**:
    直接作为 `ArgArr` 传入 `Args` (未包裹在 Key 中) 的定义被视为“默认组”或“无键组”。
    *   `in` 中的所有默认组会与 `out` 中的所有默认组进行组合。

3.  **笛卡尔积扩增 (Cartesian Product)**:
    在匹配的组内部（同 Key 或同为默认组），所有的输入形态和输出形态会进行**两两组合扩增**。
    *   例如：若某 Key 下 `in` 有 M 种形态，`out` 有 N 种形态，则该 Key 会生成 M × N 个函数重载。

这种机制允许通过极简的定义（如分别列出所有可能的输入类型和输出类型），自动生成大量排列组合后的重载列表。

### 工具函数用法 (Utils)

`utils.ts` 提供了一系列辅助函数来简化定义编写，最核心的是 `expandArgs`。

#### `expandArgs(args: Arg[])`
**功能**: 对参数列表进行笛卡尔积展开。
当一个函数的多个参数各自支持多种类型时，使用 `expandArgs` 可以自动生成所有可能的参数组合列表。这在需要精确控制每个重载（例如为了绑定特定的输出类型）时非常有用。

**示例**:
假设 `add` 函数接受两个参数，它们都可以是 `int` 或 `float`。
```typescript
// 定义: x 和 y 都可以是 int 或 float
const args = [{ x: ["int", "float"] }, { y: ["int", "float"] }];

// expandArgs(args) 将生成 4 个独立的参数列表:
// [
//   [{ x: "int" }, { y: "int" }],
//   [{ x: "int" }, { y: "float" }],
//   [{ x: "float" }, { y: "int" }],
//   [{ x: "float" }, { y: "float" }]
// ]
```

**常见用法**:
配合 `map` 使用，为展开后的每一种情况打上标签 (Key)，以便与 `out` 进行精确匹配。
```typescript
in: [
  // 展开 int 的所有组合，并标记为 "i"
  ...expandArgs([{ x: any_int }, { y: any_int }]).map(args => ({ i: args })),
  // 展开 float 的所有组合，并标记为 "f"
  ...expandArgs([{ x: any_float }, { y: any_float }]).map(args => ({ f: args }))
]
```

#### 其他简写助手
*   **`X(t)`, `Y(t)`, `Z(t)`**: 快速创建单参数对象 `{x: t}`, `{y: t}`, `{z: t}`。
*   **`XY(t)`, `XYZ(t)`**: 快速创建参数列表 `[{x:t}, {y:t}]` 等。
*   **`any_int`, `any_float`**: 预定义的类型常量数组 `int | Int` 和 `float | Float` 等。
