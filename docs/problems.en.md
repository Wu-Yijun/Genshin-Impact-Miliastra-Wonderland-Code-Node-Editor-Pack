1.2.3 Merge and Goto
1.3.1 Capture List
Captured variables can come from:
1.4 Component Model
1.4.1 Component Structure
Explicit visual port declaration return ExecFunc({ ...outputs })

2.2 Major Revisions
2.3 Extensions

Your syntax summary omitted/misunderstood some relatively important content. Please re-understand it based on my description and provide a more rigorous and correct EBNF.
1. In a Component definition, the return value is `return ExecFunc<{ arg1:type1, arg2:type2,... }>("Out_id_1", "Out_id_2");` where generic types specify the output parameter types, and function arguments specify the output pin labels. The minimum structure is `return ExecFunc<{}>()` with no output parameters, using default pins.
2. In a Component definition, the execution chain must start with `In()` or `In("id")`, but `Id()` can also be placed within the execution chain. `Out()` also does not need to be at the end of the expression and can be placed anywhere.
3. System-defined execution functions are all single-input, single-output (except for `If`/`Switch`/`Loop`/`ForEach` which have multiple exits). If a user-defined Component has multiple entry points, direct calls default to entering through the first entry point; if an entry point needs to be specified not as a `Tag`, but by using the function `Selector(MyComponent, "PortId", ...args)`; for scenarios where multiple execution chains connect to the same user-defined component, a component instance is created by using `const CompInstance = Shared(MyComponent)` at the top level of the file, and then called via `CompInstance("PortId", ...args)`; or by creating a component port instance using `const CompPortInstance = Shared(MyComponent, "PortId")` and then calling it via `CompPortInstance(...args)`, which explicitly declares that all callers invoke the same node, rather than an expansion of the component.
4. Furthermore, the call structure for all functions is `<NodeName>( arguments? )[ capture? ]( cases? )` pattern. Most functions do not have `cases` and thus omit them. For the four additional system functions and user-defined functions with multiple outputs, the branching behavior is consistent, as in `If(pred)( true = FunA().FunB(), false = FunC().FunD() )`. And there is **no additional special structure like `If(){}`**.
5. Do not prefix function calls with `.`. The meaning of `.` is to connect into a single chain. Therefore, `A() >> B()` or `A() . B()` are legal. Between any two elements, there must be exactly one separator, which can only be one of `.`,`<<`,`>>`,`:`,`=`. Functions following `:` and `=` in branches/selections also do not use `.`.
6. The so-called "jump" / "merge" are essentially the same thing. The reason `>> 0()` can be considered a jump is that there's nothing after it. So, after the jumped-out chain completes, it returns to execute forward, finds nothing subsequent, and thus ends. If there is `>> 0().A() >> 0().B()`, after the external nodes are executed, it will return to execute the `A()` function, then jump out again to execute the external nodes, and after completion, return to execute `B()`.

Operator precedence is `<<` `>>` greater than `.`. Therefore, if `A << B >> C` and a symmetrical structure is forgotten between B and C, directly connecting with `.` will cause `B.C....` to be entirely suspended until the first `>>` or `<<` is encountered.