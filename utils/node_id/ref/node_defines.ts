import type { NodePinsRecords } from "../../gia_gen/nodes.ts";

/*

T:
'D<R<K>,R<V>>' # done
S<> 
L<S<>>

K,V:
D<> # done

Enum:
 */

export const derived_records: (NodePinsRecords | { len: number })[] = [
  {
    id: 3,
    inputs: ['R<T>'],
    outputs: [],
    reflectMap: [[3, 'S<T:Int>'], [4, 'S<T:Str>']],
    len: 2
  },
  {
    id: 14,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [14, 'S<T:Str>'],
      [15, 'S<T:Gid>'],
      [16, 'S<T:Ety>'],
      [17, 'S<T:Vec>'],
      [254, 'S<T:Fct>'],
      [370, 'S<T:Int>'],
      [371, 'S<T:Flt>'],
      [581, 'S<T:Cfg>'],
      [582, 'S<T:Pfb>']
    ],
    len: 9
  },
  {
    id: 18,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [18, 'S<T:Bol>'],
      [20, 'S<T:Int>'],
      [2656, 'S<T:Str>'],
      [2657, 'S<T:Ety>'],
      [2658, 'S<T:Gid>'],
      [2659, 'S<T:Flt>'],
      [2660, 'S<T:Vec>'],
      [2661, 'S<T:L<Int>>'],
      [2662, 'S<T:L<Str>>'],
      [2663, 'S<T:L<Ety>>'],
      [2664, 'S<T:L<Gid>>'],
      [2665, 'S<T:L<Flt>>'],
      [2666, 'S<T:L<Vec>>'],
      [2667, 'S<T:L<Bol>>'],
      [2668, 'S<T:Cfg>'],
      [2669, 'S<T:Pfb>'],
      [2670, 'S<T:L<Cfg>>'],
      [2671, 'S<T:L<Pfb>>'],
      [2672, 'S<T:Fct>'],
      [2673, 'S<T:L<Fct>>']
    ],
    len: 20
  },
  {
    id: 19,
    inputs: [undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [19, 'S<T:Bol>'],
      [21, 'S<T:Int>'],
      [2674, 'S<T:Str>'],
      [2675, 'S<T:Ety>'],
      [2676, 'S<T:Gid>'],
      [2677, 'S<T:Flt>'],
      [2678, 'S<T:Vec>'],
      [2679, 'S<T:L<Int>>'],
      [2680, 'S<T:L<Str>>'],
      [2681, 'S<T:L<Ety>>'],
      [2682, 'S<T:L<Gid>>'],
      [2683, 'S<T:L<Flt>>'],
      [2684, 'S<T:L<Vec>>'],
      [2685, 'S<T:L<Bol>>'],
      [2686, 'S<T:Cfg>'],
      [2687, 'S<T:Pfb>'],
      [2688, 'S<T:L<Cfg>>'],
      [2689, 'S<T:L<Pfb>>'],
      [2690, 'S<T:Fct>'],
      [2691, 'S<T:L<Fct>>']
    ],
    len: 20
  },
  {
    id: 22,
    inputs: [undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [22, 'S<T:Int>'],
      [23, 'S<T:Str>'],
      [24, 'S<T:Ety>'],
      [25, 'S<T:Gid>'],
      [26, 'S<T:Flt>'],
      [27, 'S<T:Vec>'],
      [28, 'S<T:Bol>'],
      [29, 'S<T:L<Int>>'],
      [30, 'S<T:L<Str>>'],
      [31, 'S<T:L<Ety>>'],
      [32, 'S<T:L<Gid>>'],
      [33, 'S<T:L<Flt>>'],
      [34, 'S<T:L<Vec>>'],
      [35, 'S<T:L<Bol>>'],
      [572, 'S<T:Cfg>'],
      [573, 'S<T:Pfb>'],
      [574, 'S<T:L<Cfg>>'],
      [575, 'S<T:L<Pfb>>'],
      [622, 'S<T:Fct>'],
      [692, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 36,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [36, 'S<T:Int>'],
      [37, 'S<T:Str>'],
      [38, 'S<T:Ety>'],
      [39, 'S<T:Gid>'],
      [40, 'S<T:Flt>'],
      [41, 'S<T:Vec>'],
      [42, 'S<T:Bol>'],
      [43, 'S<T:L<Int>>'],
      [44, 'S<T:L<Str>>'],
      [45, 'S<T:L<Ety>>'],
      [46, 'S<T:L<Gid>>'],
      [47, 'S<T:L<Flt>>'],
      [48, 'S<T:L<Vec>>'],
      [49, 'S<T:L<Bol>>'],
      [546, 'S<T:Cfg>'],
      [547, 'S<T:Pfb>'],
      [548, 'S<T:L<Cfg>>'],
      [549, 'S<T:L<Pfb>>'],
      [623, 'S<T:Fct>'],
      [2716, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 50,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [50, 'S<T:Int>'],
      [51, 'S<T:Str>'],
      [52, 'S<T:Ety>'],
      [53, 'S<T:Gid>'],
      [54, 'S<T:Flt>'],
      [55, 'S<T:Vec>'],
      [56, 'S<T:Bol>'],
      [57, 'S<T:L<Int>>'],
      [58, 'S<T:L<Str>>'],
      [59, 'S<T:L<Ety>>'],
      [60, 'S<T:L<Gid>>'],
      [61, 'S<T:L<Flt>>'],
      [62, 'S<T:L<Vec>>'],
      [63, 'S<T:L<Bol>>'],
      [576, 'S<T:Cfg>'],
      [577, 'S<T:Pfb>'],
      [578, 'S<T:L<Cfg>>'],
      [579, 'S<T:L<Pfb>>'],
      [624, 'S<T:Fct>'],
      [693, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 100,
    inputs: ['L<R<T>>', 'L<R<T>>'],
    outputs: [],
    reflectMap: [
      [100, 'S<T:Int>'],
      [101, 'S<T:Str>'],
      [102, 'S<T:Ety>'],
      [103, 'S<T:Gid>'],
      [104, 'S<T:Flt>'],
      [105, 'S<T:Vec>'],
      [106, 'S<T:Bol>'],
      [550, 'S<T:Cfg>'],
      [551, 'S<T:Pfb>'],
      [2654, 'S<T:Fct>'],
      [-1, 'S<>'],
    ],
    len: 10
  },
  {
    id: 107,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [107, 'S<T:Int>'],
      [108, 'S<T:Str>'],
      [109, 'S<T:Ety>'],
      [110, 'S<T:Gid>'],
      [111, 'S<T:Flt>'],
      [112, 'S<T:Vec>'],
      [113, 'S<T:Bol>'],
      [552, 'S<T:Cfg>'],
      [553, 'S<T:Pfb>'],
      [2653, 'S<T:Fct>'],
      [-1, 'S<>'],
    ],
    len: 10
  },
  { // list include?
    id: 114,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [114, 'S<T:Int>'],
      [115, 'S<T:Str>'],
      [116, 'S<T:Ety>'],
      [117, 'S<T:Gid>'],
      [118, 'S<T:Flt>'],
      [119, 'S<T:Vec>'],
      [120, 'S<T:Bol>'],
      [554, 'S<T:Cfg>'],
      [555, 'S<T:Pfb>'],
      [2655, 'S<T:Fct>']
    ],
    len: 10
  },
  {
    id: 121,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: ['L<Int>'],
    reflectMap: [
      [121, 'S<T:Int>'],
      [122, 'S<T:Str>'],
      [123, 'S<T:Ety>'],
      [124, 'S<T:Gid>'],
      [125, 'S<T:Flt>'],
      [126, 'S<T:Vec>'],
      [127, 'S<T:Bol>'],
      [556, 'S<T:Cfg>'],
      [557, 'S<T:Pfb>'],
      [2652, 'S<T:Fct>']
    ],
    len: 10
  },
  {
    id: 128,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [
      [128, 'S<T:Int>'],
      [129, 'S<T:Str>'],
      [130, 'S<T:Ety>'],
      [131, 'S<T:Gid>'],
      [132, 'S<T:Flt>'],
      [133, 'S<T:Vec>'],
      [134, 'S<T:Bol>'],
      [558, 'S<T:Cfg>'],
      [559, 'S<T:Pfb>'],
      [2651, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {
    id: 135,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [135, 'S<T:Int>'],
      [136, 'S<T:Str>'],
      [137, 'S<T:Ety>'],
      [138, 'S<T:Gid>'],
      [139, 'S<T:Flt>'],
      [140, 'S<T:Vec>'],
      [141, 'S<T:Bol>'],
      [560, 'S<T:Cfg>'],
      [561, 'S<T:Pfb>'],
      [2650, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {
    id: 142,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [142, 'S<T:Int>'],
      [143, 'S<T:Str>'],
      [144, 'S<T:Ety>'],
      [145, 'S<T:Gid>'],
      [146, 'S<T:Flt>'],
      [147, 'S<T:Vec>'],
      [148, 'S<T:Bol>'],
      [562, 'S<T:Cfg>'],
      [563, 'S<T:Pfb>'],
      [2645, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {
    id: 149,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [[2648, 'S<T:Int>'], [2649, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 151,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [[2646, 'S<T:Int>'], [2647, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 153,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [153, 'S<T:Int>'],
      [154, 'S<T:Str>'],
      [155, 'S<T:Ety>'],
      [156, 'S<T:Gid>'],
      [157, 'S<T:Flt>'],
      [158, 'S<T:Vec>'],
      [159, 'S<T:Bol>'],
      [564, 'S<T:Cfg>'],
      [565, 'S<T:Pfb>'],
      [2644, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {
    id: 160,
    inputs: ['L<R<T>>', undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [160, 'S<T:Int>'],
      [161, 'S<T:Str>'],
      [162, 'S<T:Ety>'],
      [163, 'S<T:Gid>'],
      [164, 'S<T:Flt>'],
      [165, 'S<T:Vec>'],
      [166, 'S<T:Bol>'],
      [566, 'S<T:Cfg>'],
      [567, 'S<T:Pfb>'],
      [2643, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {
    id: 167,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [[167, 'S<T:Int>'], [168, 'S<T:Flt>']],
    len: 2
  },
  { // Assemble List 
    id: 169,
    inputs: [undefined, ...Array(50).fill('R<T>')],
    outputs: ['L<R<T>>'],
    reflectMap: [
      [169, 'S<T:Int>'],
      [170, 'S<T:Str>'],
      [171, 'S<T:Ety>'],
      [172, 'S<T:Gid>'],
      [173, 'S<T:Flt>'],
      [174, 'S<T:Vec>'],
      [175, 'S<T:Bol>'],
      [568, 'S<T:Cfg>'],
      [569, 'S<T:Pfb>'],
      [2640, 'S<T:Fct>'],
      [-1, 'S<>']
    ],
    len: 10
  },
  {// Data Type Conversion TODO
    id: 180,
    inputs: ['R<T>'],
    outputs: ['R<V>'],
    reflectMap: [
      // [180, 'S<T:Int>'],
      // [184, 'S<T:Gid>'],
      // [185, 'S<T:Bol>'],
      // [-1, ""],
    ],
    len: 3
  },
  {
    id: 200,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[200, 'S<T:Int>'], [201, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 202,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[202, 'S<T:Int>'], [203, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 204,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[204, 'S<T:Int>'], [205, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 206,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[206, 'S<T:Int>'], [207, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 209,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[209, 'S<T:Int>'], [210, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 211,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[211, 'S<T:Int>'], [212, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 213,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[213, 'S<T:Int>'], [214, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 216,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[216, 'S<T:Int>'], [217, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 218,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[218, 'S<T:Int>'], [219, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 222,
    inputs: ['R<T>', 'R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[222, 'S<T:Int>'], [223, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 230,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[230, 'S<T:Int>'], [235, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 231,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[231, 'S<T:Int>'], [236, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 232,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[232, 'S<T:Int>'], [237, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 233,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[233, 'S<T:Int>'], [238, 'S<T:Flt>']],
    len: 2
  },
  {
    id: 323,
    inputs: [undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [323, 'S<T:Int>'],
      [324, 'S<T:Flt>'],
      [325, 'S<T:Bol>'],
      [326, 'S<T:Str>'],
      [327, 'S<T:Gid>'],
      [328, 'S<T:Ety>'],
      [329, 'S<T:L<Gid>>'],
      [330, 'S<T:L<Int>>'],
      [331, 'S<T:L<Bol>>'],
      [332, 'S<T:L<Flt>>'],
      [333, 'S<T:L<Str>>'],
      [334, 'S<T:Vec>'],
      [335, 'S<T:L<Ety>>'],
      [336, 'S<T:L<Vec>>'],
      [534, 'S<T:Cfg>'],
      [535, 'S<T:Pfb>'],
      [536, 'S<T:L<Cfg>>'],
      [537, 'S<T:L<Pfb>>'],
      [625, 'S<T:Fct>'],
      [2857, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 337,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [337, 'S<T:Ety>'],
      [338, 'S<T:Gid>'],
      [339, 'S<T:Int>'],
      [340, 'S<T:Bol>'],
      [341, 'S<T:Flt>'],
      [342, 'S<T:Str>'],
      [343, 'S<T:L<Gid>>'],
      [344, 'S<T:L<Int>>'],
      [345, 'S<T:L<Bol>>'],
      [346, 'S<T:L<Flt>>'],
      [347, 'S<T:L<Str>>'],
      [348, 'S<T:Vec>'],
      [349, 'S<T:L<Ety>>'],
      [350, 'S<T:L<Vec>>'],
      [538, 'S<T:Cfg>'],
      [539, 'S<T:Pfb>'],
      [540, 'S<T:L<Cfg>>'],
      [541, 'S<T:L<Pfb>>'],
      [626, 'S<T:Fct>'],
      [2998, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 351,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [351, 'S<T:Ety>'],
      [352, 'S<T:Gid>'],
      [353, 'S<T:Int>'],
      [354, 'S<T:Bol>'],
      [355, 'S<T:Flt>'],
      [356, 'S<T:Str>'],
      [357, 'S<T:L<Gid>>'],
      [358, 'S<T:L<Int>>'],
      [359, 'S<T:L<Bol>>'],
      [360, 'S<T:L<Flt>>'],
      [361, 'S<T:L<Str>>'],
      [362, 'S<T:Vec>'],
      [363, 'S<T:L<Ety>>'],
      [364, 'S<T:L<Vec>>'],
      [542, 'S<T:Cfg>'],
      [543, 'S<T:Pfb>'],
      [544, 'S<T:L<Cfg>>'],
      [545, 'S<T:L<Pfb>>'],
      [627, 'S<T:Fct>'],
      [3139, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 428,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [428, 'S<T:Int>'],
      [432, 'S<T:Str>'],
      [433, 'S<T:Ety>'],
      [434, 'S<T:Gid>'],
      [435, 'S<T:Flt>'],
      [436, 'S<T:Vec>'],
      [437, 'S<T:Bol>'],
      [438, 'S<T:L<Int>>'],
      [439, 'S<T:L<Str>>'],
      [440, 'S<T:L<Ety>>'],
      [441, 'S<T:L<Gid>>'],
      [442, 'S<T:L<Flt>>'],
      [443, 'S<T:L<Vec>>'],
      [444, 'S<T:L<Bol>>'],
      [522, 'S<T:Cfg>'],
      [523, 'S<T:Pfb>'],
      [524, 'S<T:L<Cfg>>'],
      [525, 'S<T:L<Pfb>>'],
      [628, 'S<T:Fct>'],
      [2490, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 445,
    inputs: [undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [445, 'S<T:Int>'],
      [446, 'S<T:Str>'],
      [447, 'S<T:Ety>'],
      [448, 'S<T:Gid>'],
      [449, 'S<T:Flt>'],
      [450, 'S<T:Vec>'],
      [451, 'S<T:Bol>'],
      [452, 'S<T:L<Int>>'],
      [453, 'S<T:L<Str>>'],
      [454, 'S<T:L<Ety>>'],
      [455, 'S<T:L<Gid>>'],
      [456, 'S<T:L<Flt>>'],
      [457, 'S<T:L<Vec>>'],
      [458, 'S<T:L<Bol>>'],
      [526, 'S<T:Cfg>'],
      [527, 'S<T:Pfb>'],
      [528, 'S<T:L<Cfg>>'],
      [529, 'S<T:L<Pfb>>'],
      [629, 'S<T:Fct>'],
      [2208, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  {
    id: 459,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [459, 'S<T:Int>'],
      [460, 'S<T:Str>'],
      [461, 'S<T:Ety>'],
      [462, 'S<T:Gid>'],
      [463, 'S<T:Flt>'],
      [464, 'S<T:Vec>'],
      [465, 'S<T:Bol>'],
      [466, 'S<T:L<Int>>'],
      [467, 'S<T:L<Str>>'],
      [468, 'S<T:L<Ety>>'],
      [469, 'S<T:L<Gid>>'],
      [470, 'S<T:L<Flt>>'],
      [471, 'S<T:L<Vec>>'],
      [472, 'S<T:L<Bol>>'],
      [530, 'S<T:Cfg>'],
      [531, 'S<T:Pfb>'],
      [532, 'S<T:L<Cfg>>'],
      [533, 'S<T:L<Pfb>>'],
      [630, 'S<T:Fct>'],
      [2349, 'S<T:L<Fct>>'],
      [-1, 'D<R<K>,R<V>>'],
      [-1, 'S<>'],
      [-1, 'L<S<>>'],
    ],
    len: 20
  },
  { // ENUM EQUAL
    id: 475,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      // [475, 'S<T:E<0>>'],
      // [476, 'S<T:E<0>>'],
      // [477, 'S<T:E<0>>'],
      // [478, 'S<T:E<0>>'],
      // [479, 'S<T:E<0>>'],
      // [480, 'S<T:E<0>>'],
      // [481, 'S<T:E<0>>'],
      // [482, 'S<T:E<0>>'],
      // [483, 'S<T:E<0>>'],
      // [484, 'S<T:E<0>>'],
      // [485, 'S<T:E<0>>'],
      // [486, 'S<T:E<0>>'],
      // [487, 'S<T:E<0>>'],
      // [488, 'S<T:E<0>>'],
      // [489, 'S<T:E<0>>'],
      // [491, 'S<T:E<0>>'],
      // [492, 'S<T:E<0>>'],
      // [493, 'S<T:E<0>>'],
      // [494, 'S<T:E<0>>'],
      // [495, 'S<T:E<0>>'],
      // [-1, 'Enum'],
    ],
    len: 19
  },
  {
    id: 509,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [
      [509, 'S<T:Bol>'],
      [510, 'S<T:Ety>'],
      [511, 'S<T:Flt>'],
      [512, 'S<T:Gid>'],
      [513, 'S<T:Int>'],
      [514, 'S<T:Str>'],
      [515, 'S<T:Vec>'],
      [570, 'S<T:Cfg>'],
      [571, 'S<T:Pfb>'],
      [3280, 'S<T:Fct>'],
      [-1, 'S<>'],
    ],
    len: 10
  },
  {
    id: 647,
    inputs: [undefined, undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [647, 'S<T:Int>'],
      [648, 'S<T:Flt>'],
      [649, 'S<T:Str>']
    ],
    len: 3
  },
  {
    id: 948,
    inputs: ['D<R<K>,R<V>>', 'R<K>', 'R<V>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 1
  },
  {
    id: 1088,
    inputs: ['L<R<K>>', 'L<R<V>>'],
    outputs: ['D<R<K>,R<V>>'],
    reflectMap: [[-1, 'D<>']],
    len: 7
  },
  {
    id: 1158,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: ['R<V>'],
    reflectMap: [[-1, 'D<>']],
    len: 1
  },
  {
    id: 1298,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1368,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1438,
    inputs: ['D<R<K>,R<V>>', 'R<V>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1508,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<K>>'],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1578,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<V>>'],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1648,
    inputs: ['D<R<K>,R<V>>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1718,
    inputs: ['D<R<K>,R<V>>'],
    outputs: [],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1788,
    inputs: [undefined, ...Array(99).fill(['R<K>', 'R<V>']).flat(2)],
    outputs: ['D<R<K>,R<V>>'],
    reflectMap: [[-1, 'D<>']],
    len: 0
  },
  {
    id: 1928,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<K>>', 'L<R<V>>'],
    reflectMap: [[-1, 'D<>']],
    len: 1
  },
  {
    id: 1938,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<K>>', 'L<R<V>>'],
    reflectMap: [[-1, 'D<>']],
    len: 1
  }
];