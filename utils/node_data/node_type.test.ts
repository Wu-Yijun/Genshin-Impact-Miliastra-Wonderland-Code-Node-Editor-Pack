import { assert, assertEq, assertDeepEq } from "../utils.ts";
import {
  parse,
  stringify,
  type_equal,
  reflect,
  reflects,
  is_reflect,
  extract_reflect_names,
  extract_reflect_fields,
  type NodeType,
} from "./node_type.ts";

/**
 * Node Type Tests
 */
function test_basic_types() {
  console.log("Testing basic types...");
  const basics = [
    "Int", "Flt", "Bol", "Str", "Vec", "Gid", "Ety", "Pfb", "Fct", "Cfg", "Vss", "Loc", "Unk"
  ];
  for (const b of basics) {
    const type: NodeType = { t: "b", b: b as any };
    assertEq(stringify(type), b);
    assertDeepEq(parse(b), type);
  }
}

function test_complex_types() {
  console.log("Testing complex types...");

  // Enum
  const enumType: NodeType = { t: "e", e: "ABCD" };
  assertEq(stringify(enumType), "E<ABCD>");
  assertDeepEq(parse("E<ABCD>"), enumType);

  // List
  const listType: NodeType = { t: "l", i: { t: "b", b: "Int" } };
  assertEq(stringify(listType), "L<Int>");
  assertDeepEq(parse("L<Int>"), listType);

  // Struct
  const structType: NodeType = {
    t: "s",
    f: [
      ["x", { t: "b", b: "Int" }],
      ["y", { t: "b", b: "Str" }],
    ],
  };
  assertEq(stringify(structType), "S<x:Int,y:Str>");
  assertDeepEq(parse("S<x : Int , y : Str>"), structType);

  // Empty Struct
  const structEmpty: NodeType = { t: "s", f: [] };
  assertEq(stringify(structEmpty), "S<>");
  assertDeepEq(parse("S<>"), structEmpty);

  // Dict
  const dictType: NodeType = {
    t: "d",
    k: { t: "b", b: "Str" },
    v: { t: "b", b: "Int" },
  };
  assertEq(stringify(dictType), "D<Str,Int>");
  assertDeepEq(parse("D<Str,Int>"), dictType);

  // Complex Dict
  const dictComplex: NodeType = {
    t: "d",
    k: {
      t: "l",
      i: {
        t: "e",
        e: "CALC"
      }
    },
    v: {
      t: "d",
      k: {
        t: "r",
        r: "X"
      },
      v: {
        t: "b",
        b: "Unk",
      }
    },
  };
  assertEq(stringify(dictComplex), "D<L<E<CALC>>,D<R<X>,Unk>>");
  assertDeepEq(parse("D<L<E<CALC>>,D<R<X>,Unk>>"), dictComplex);

  // Reflect
  const reflectType: NodeType = { t: "r", r: "T" };
  assertEq(stringify(reflectType), "R<T>");
  assertDeepEq(parse("R<T>"), reflectType);

  // Constraint
  const constraintType: NodeType = {
    t: "c",
    c: [
      ["a", { t: "b", b: "Int" }],
      ["b", { t: "b", b: "Str" }],
    ],
  };
  assertEq(stringify(constraintType), "C<a:Int,b:Str>");
  assertDeepEq(parse("C<a:Int,b:Str>"), constraintType);

  // Complex Constraint
  const constraintComplex: NodeType = {
    t: "c",
    c: [
      ["a", { t: "b", b: "Int" }],
      ["M", dictComplex],
      ["b", { t: "b", b: "Str" }],
    ],
  };
  assertEq(stringify(constraintComplex), "C<a:Int,M:D<L<E<CALC>>,D<R<X>,Unk>>,b:Str>");
  assertDeepEq(parse("C<a:Int,M:D<L<E<CALC>>,D<R<X>,Unk>>,b:Str>"), constraintComplex);

}

function test_nested_types() {
  console.log("Testing nested types...");
  const nested = "S<id:Int,data:L<S<key:Str,val:E<WXYZ>>>>";
  const parsed = parse(nested);
  assertEq(stringify(parsed), nested);

  const expected: NodeType = {
    t: "s",
    f: [
      ["id", { t: "b", b: "Int" }],
      ["data", {
        t: "l",
        i: {
          t: "s",
          f: [
            ["key", { t: "b", b: "Str" }],
            ["val", { t: "e", e: "WXYZ" }],
          ]
        }
      }]
    ]
  };
  assertDeepEq(parsed, expected);
}

function test_type_equal() {
  console.log("Testing type_equal...");
  assert(type_equal(parse("Int"), parse("Int")));
  assert(!type_equal(parse("Int"), parse("Flt")));
  assert(type_equal(parse("S<a:Int,b:Str>"), parse("S<a:Int,b:Str>")));
  assert(!type_equal(parse("S<a:Int,b:Str>"), parse("S<b:Str,a:Int>"))); // Order matters in this implementation
  assert(type_equal(parse("L<R<T>>"), parse("L<R<T>>")));
  assert(type_equal(parse("C<x:Int>"), parse("C<x:Int>")));
}

function test_reflection() {
  console.log("Testing reflection...");

  // reflect
  const template = "L<R<T>>";
  const injected = "Int";
  const result = reflect(template, "T", injected);
  assertEq(stringify(result), "L<Int>");

  const nestedTemplate = "S<item:R<U>,list:L<R<U>>>";
  const result2 = reflect(nestedTemplate, "U", "Str");
  assertEq(stringify(result2), "S<item:Str,list:L<Str>>");

  // reflects
  const multiTemplate = "S<a:R<A>,b:R<B>>";
  const constraints = "C<A:Int,B:Str>";
  const result3 = reflects(multiTemplate, constraints);
  assertEq(stringify(result3), "S<a:Int,b:Str>");

  // is_reflect
  assert(is_reflect("R<T>"));
  assert(is_reflect("L<R<T>>"));
  assert(!is_reflect("L<Int>"));
  assert(is_reflect("S<a:Int,b:R<T>>"));

  // extract_reflect_names
  const names = extract_reflect_names(parse("S<a:R<A>,b:L<R<B>>,c:R<A>>"));
  assertDeepEq(names.sort(), ["A", "B"]);

  // extract_reflect_fields
  const refType = parse("S<val:R<V>,meta:R<M>>");
  const actualType = parse("S<val:Int,meta:Str>");
  const fields = extract_reflect_fields(actualType, refType);
  const fieldMap = new Map(fields);
  assertEq(stringify(fieldMap.get("V")!), "Int");
  assertEq(stringify(fieldMap.get("M")!), "Str");
}

function test_error_cases() {
  console.log("Testing error cases...");

  const invalidInputs = [
    "InvalidType",
    "S<:Int>",
    "L<Int",
    "E<123>", // EnumId must be 4 uppercase letters or Unk
    "S<Int:Str>", // Field name cannot be a system type
    "S<a:Invalid>",
    "D<Int>", // Dict needs two params
  ];

  for (const input of invalidInputs) {
    try {
      parse(input);
      assert(false, `Should have failed to parse: ${input}`);
    } catch (e) {
      // Expected
    }
  }
}

function run_all_tests() {
  try {
    test_basic_types();
    test_complex_types();
    test_nested_types();
    test_type_equal();
    test_reflection();
    test_error_cases();
    console.log("\nAll tests passed successfully!");
  } catch (e) {
    console.error("\nTests failed!");
    throw e;
  }
}

// Check if this script is being run directly (if possible to determine)
// For now, just export the runner or run it if needed.
run_all_tests();
