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
    reflectMap: [[0, 'S<T:Int>', 3], [1, 'S<T:Str>', 4]],
    len: 2
  },
  {
    id: 14,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Str>', 14],
      [1, 'S<T:Gid>', 15],
      [2, 'S<T:Ety>', 16],
      [3, 'S<T:Vec>', 17],
      [4, 'S<T:Fct>', 254],
      [5, 'S<T:Int>', 370],
      [6, 'S<T:Flt>', 371],
      [7, 'S<T:Cfg>', 581],
      [8, 'S<T:Pfb>', 582]
    ],
    len: 9
  },
  {
    id: 18,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Bol>', 18],
      [1, 'S<T:Int>', 20],
      [2, 'S<T:Str>', 2656],
      [3, 'S<T:Ety>', 2657],
      [4, 'S<T:Gid>', 2658],
      [5, 'S<T:Flt>', 2659],
      [6, 'S<T:Vec>', 2660],
      [7, 'S<T:L<Int>>', 2661],
      [8, 'S<T:L<Str>>', 2662],
      [9, 'S<T:L<Ety>>', 2663],
      [10, 'S<T:L<Gid>>', 2664],
      [11, 'S<T:L<Flt>>', 2665],
      [12, 'S<T:L<Vec>>', 2666],
      [13, 'S<T:L<Bol>>', 2667],
      [14, 'S<T:Cfg>', 2668],
      [15, 'S<T:Pfb>', 2669],
      [16, 'S<T:L<Cfg>>', 2670],
      [17, 'S<T:L<Pfb>>', 2671],
      [18, 'S<T:Fct>', 2672],
      [19, 'S<T:L<Fct>>', 2673]
    ],
    len: 20
  },
  {
    id: 19,
    inputs: [undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Bol>', 19],
      [1, 'S<T:Int>', 21],
      [2, 'S<T:Str>', 2674],
      [3, 'S<T:Ety>', 2675],
      [4, 'S<T:Gid>', 2676],
      [5, 'S<T:Flt>', 2677],
      [6, 'S<T:Vec>', 2678],
      [7, 'S<T:L<Int>>', 2679],
      [8, 'S<T:L<Str>>', 2680],
      [9, 'S<T:L<Ety>>', 2681],
      [10, 'S<T:L<Gid>>', 2682],
      [11, 'S<T:L<Flt>>', 2683],
      [12, 'S<T:L<Vec>>', 2684],
      [13, 'S<T:L<Bol>>', 2685],
      [14, 'S<T:Cfg>', 2686],
      [15, 'S<T:Pfb>', 2687],
      [16, 'S<T:L<Cfg>>', 2688],
      [17, 'S<T:L<Pfb>>', 2689],
      [18, 'S<T:Fct>', 2690],
      [19, 'S<T:L<Fct>>', 2691]
    ],
    len: 20
  },
  {
    id: 22,
    inputs: [undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 22],
      [1, 'S<T:Str>', 23],
      [2, 'S<T:Ety>', 24],
      [3, 'S<T:Gid>', 25],
      [4, 'S<T:Flt>', 26],
      [5, 'S<T:Vec>', 27],
      [6, 'S<T:Bol>', 28],
      [7, 'S<T:L<Int>>', 29],
      [8, 'S<T:L<Str>>', 30],
      [9, 'S<T:L<Ety>>', 31],
      [10, 'S<T:L<Gid>>', 32],
      [11, 'S<T:L<Flt>>', 33],
      [12, 'S<T:L<Vec>>', 34],
      [13, 'S<T:L<Bol>>', 35],
      [14, 'S<T:Cfg>', 572],
      [15, 'S<T:Pfb>', 573],
      [16, 'S<T:L<Cfg>>', 574],
      [17, 'S<T:L<Pfb>>', 575],
      [18, 'S<T:Fct>', 622],
      [19, 'S<T:L<Fct>>', 692],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 36,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [0, 'S<T:Int>', 36],
      [1, 'S<T:Str>', 37],
      [2, 'S<T:Ety>', 38],
      [3, 'S<T:Gid>', 39],
      [4, 'S<T:Flt>', 40],
      [5, 'S<T:Vec>', 41],
      [6, 'S<T:Bol>', 42],
      [7, 'S<T:L<Int>>', 43],
      [8, 'S<T:L<Str>>', 44],
      [9, 'S<T:L<Ety>>', 45],
      [10, 'S<T:L<Gid>>', 46],
      [11, 'S<T:L<Flt>>', 47],
      [12, 'S<T:L<Vec>>', 48],
      [13, 'S<T:L<Bol>>', 49],
      [14, 'S<T:Cfg>', 546],
      [15, 'S<T:Pfb>', 547],
      [16, 'S<T:L<Cfg>>', 548],
      [17, 'S<T:L<Pfb>>', 549],
      [18, 'S<T:Fct>', 623],
      [19, 'S<T:L<Fct>>', 2716],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 50,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [0, 'S<T:Int>', 50],
      [1, 'S<T:Str>', 51],
      [2, 'S<T:Ety>', 52],
      [3, 'S<T:Gid>', 53],
      [4, 'S<T:Flt>', 54],
      [5, 'S<T:Vec>', 55],
      [6, 'S<T:Bol>', 56],
      [7, 'S<T:L<Int>>', 57],
      [8, 'S<T:L<Str>>', 58],
      [9, 'S<T:L<Ety>>', 59],
      [10, 'S<T:L<Gid>>', 60],
      [11, 'S<T:L<Flt>>', 61],
      [12, 'S<T:L<Vec>>', 62],
      [13, 'S<T:L<Bol>>', 63],
      [14, 'S<T:Cfg>', 576],
      [15, 'S<T:Pfb>', 577],
      [16, 'S<T:L<Cfg>>', 578],
      [17, 'S<T:L<Pfb>>', 579],
      [18, 'S<T:Fct>', 624],
      [19, 'S<T:L<Fct>>', 693],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 100,
    inputs: ['L<R<T>>', 'L<R<T>>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 100],
      [1, 'S<T:Str>', 101],
      [2, 'S<T:Ety>', 102],
      [3, 'S<T:Gid>', 103],
      [4, 'S<T:Flt>', 104],
      [5, 'S<T:Vec>', 105],
      [6, 'S<T:Bol>', 106],
      [7, 'S<T:Cfg>', 550],
      [8, 'S<T:Pfb>', 551],
      [9, 'S<T:Fct>', 2654],
      [-1, 'S<>', -1],
    ],
    len: 10
  },
  {
    id: 107,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 107],
      [1, 'S<T:Str>', 108],
      [2, 'S<T:Ety>', 109],
      [3, 'S<T:Gid>', 110],
      [4, 'S<T:Flt>', 111],
      [5, 'S<T:Vec>', 112],
      [6, 'S<T:Bol>', 113],
      [7, 'S<T:Cfg>', 552],
      [8, 'S<T:Pfb>', 553],
      [9, 'S<T:Fct>', 2653],
      [-1, 'S<>', -1],
    ],
    len: 10
  },
  { // list include?
    id: 114,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 114],
      [1, 'S<T:Str>', 115],
      [2, 'S<T:Ety>', 116],
      [3, 'S<T:Gid>', 117],
      [4, 'S<T:Flt>', 118],
      [5, 'S<T:Vec>', 119],
      [6, 'S<T:Bol>', 120],
      [7, 'S<T:Cfg>', 554],
      [8, 'S<T:Pfb>', 555],
      [9, 'S<T:Fct>', 2655]
    ],
    len: 10
  },
  {
    id: 121,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: ['L<Int>'],
    reflectMap: [
      [0, 'S<T:Int>', 121],
      [1, 'S<T:Str>', 122],
      [2, 'S<T:Ety>', 123],
      [3, 'S<T:Gid>', 124],
      [4, 'S<T:Flt>', 125],
      [5, 'S<T:Vec>', 126],
      [6, 'S<T:Bol>', 127],
      [7, 'S<T:Cfg>', 556],
      [8, 'S<T:Pfb>', 557],
      [9, 'S<T:Fct>', 2652]
    ],
    len: 10
  },
  {
    id: 128,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [
      [0, 'S<T:Int>', 128],
      [1, 'S<T:Str>', 129],
      [2, 'S<T:Ety>', 130],
      [3, 'S<T:Gid>', 131],
      [4, 'S<T:Flt>', 132],
      [5, 'S<T:Vec>', 133],
      [6, 'S<T:Bol>', 134],
      [7, 'S<T:Cfg>', 558],
      [8, 'S<T:Pfb>', 559],
      [9, 'S<T:Fct>', 2651],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {
    id: 135,
    inputs: ['L<R<T>>', 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 135],
      [1, 'S<T:Str>', 136],
      [2, 'S<T:Ety>', 137],
      [3, 'S<T:Gid>', 138],
      [4, 'S<T:Flt>', 139],
      [5, 'S<T:Vec>', 140],
      [6, 'S<T:Bol>', 141],
      [7, 'S<T:Cfg>', 560],
      [8, 'S<T:Pfb>', 561],
      [9, 'S<T:Fct>', 2650],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {
    id: 142,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 142],
      [1, 'S<T:Str>', 143],
      [2, 'S<T:Ety>', 144],
      [3, 'S<T:Gid>', 145],
      [4, 'S<T:Flt>', 146],
      [5, 'S<T:Vec>', 147],
      [6, 'S<T:Bol>', 148],
      [7, 'S<T:Cfg>', 562],
      [8, 'S<T:Pfb>', 563],
      [9, 'S<T:Fct>', 2645],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {
    id: 149,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 2648], [1, 'S<T:Flt>', 2649]],
    len: 2
  },
  {
    id: 151,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 2646], [1, 'S<T:Flt>', 2647]],
    len: 2
  },
  {
    id: 153,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 153],
      [1, 'S<T:Str>', 154],
      [2, 'S<T:Ety>', 155],
      [3, 'S<T:Gid>', 156],
      [4, 'S<T:Flt>', 157],
      [5, 'S<T:Vec>', 158],
      [6, 'S<T:Bol>', 159],
      [7, 'S<T:Cfg>', 564],
      [8, 'S<T:Pfb>', 565],
      [9, 'S<T:Fct>', 2644],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {
    id: 160,
    inputs: ['L<R<T>>', undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 160],
      [1, 'S<T:Str>', 161],
      [2, 'S<T:Ety>', 162],
      [3, 'S<T:Gid>', 163],
      [4, 'S<T:Flt>', 164],
      [5, 'S<T:Vec>', 165],
      [6, 'S<T:Bol>', 166],
      [7, 'S<T:Cfg>', 566],
      [8, 'S<T:Pfb>', 567],
      [9, 'S<T:Fct>', 2643],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {
    id: 167,
    inputs: ['L<R<T>>'],
    outputs: [],
    reflectMap: [[0, 'S<T:Int>', 167], [1, 'S<T:Flt>', 168]],
    len: 2
  },
  { // Assemble List 
    id: 169,
    inputs: [undefined, ...Array(99).fill('R<T>')],
    outputs: ['L<R<T>>'],
    reflectMap: [
      [0, 'S<T:Int>', 169],
      [1, 'S<T:Str>', 170],
      [2, 'S<T:Ety>', 171],
      [3, 'S<T:Gid>', 172],
      [4, 'S<T:Flt>', 173],
      [5, 'S<T:Vec>', 174],
      [6, 'S<T:Bol>', 175],
      [7, 'S<T:Cfg>', 568],
      [8, 'S<T:Pfb>', 569],
      [9, 'S<T:Fct>', 2640],
      [-1, 'S<>', -1]
    ],
    len: 10
  },
  {// Data Type Conversion TODO
    id: 180,
    inputs: ['R<T>'],
    outputs: ['R<V>'],
    reflectMap: [
      // [0, 'S<T:Int>', 180],
      // [2, 'S<T:Gid>', 184],
      // [3, 'S<T:Bol>', 185],
      // [-1, "", -1],
    ],
    len: 3
  },
  {
    id: 200,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 200], [1, 'S<T:Flt>', 201]],
    len: 2
  },
  {
    id: 202,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 202], [1, 'S<T:Flt>', 203]],
    len: 2
  },
  {
    id: 204,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 204], [1, 'S<T:Flt>', 205]],
    len: 2
  },
  {
    id: 206,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 206], [1, 'S<T:Flt>', 207]],
    len: 2
  },
  {
    id: 209,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 209], [1, 'S<T:Flt>', 210]],
    len: 2
  },
  {
    id: 211,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 211], [1, 'S<T:Flt>', 212]],
    len: 2
  },
  {
    id: 213,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 213], [1, 'S<T:Flt>', 214]],
    len: 2
  },
  {
    id: 216,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 216], [1, 'S<T:Flt>', 217]],
    len: 2
  },
  {
    id: 218,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 218], [1, 'S<T:Flt>', 219]],
    len: 2
  },
  {
    id: 222,
    inputs: ['R<T>', 'R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 222], [1, 'S<T:Flt>', 223]],
    len: 2
  },
  {
    id: 230,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 230], [1, 'S<T:Flt>', 235]],
    len: 2
  },
  {
    id: 231,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 231], [1, 'S<T:Flt>', 236]],
    len: 2
  },
  {
    id: 232,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 232], [1, 'S<T:Flt>', 237]],
    len: 2
  },
  {
    id: 233,
    inputs: ['R<T>', 'R<T>'],
    outputs: ['R<T>'],
    reflectMap: [[0, 'S<T:Int>', 233], [1, 'S<T:Flt>', 238]],
    len: 2
  },
  {
    id: 323,
    inputs: [undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 323],
      [1, 'S<T:Flt>', 324],
      [2, 'S<T:Bol>', 325],
      [3, 'S<T:Str>', 326],
      [4, 'S<T:Gid>', 327],
      [5, 'S<T:Ety>', 328],
      [6, 'S<T:L<Gid>>', 329],
      [7, 'S<T:L<Int>>', 330],
      [8, 'S<T:L<Bol>>', 331],
      [9, 'S<T:L<Flt>>', 332],
      [10, 'S<T:L<Str>>', 333],
      [11, 'S<T:Vec>', 334],
      [12, 'S<T:L<Ety>>', 335],
      [13, 'S<T:L<Vec>>', 336],
      [14, 'S<T:Cfg>', 534],
      [15, 'S<T:Pfb>', 535],
      [16, 'S<T:L<Cfg>>', 536],
      [17, 'S<T:L<Pfb>>', 537],
      [18, 'S<T:Fct>', 625],
      [19, 'S<T:L<Fct>>', 2857],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 337,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [0, 'S<T:Ety>', 337],
      [1, 'S<T:Gid>', 338],
      [2, 'S<T:Int>', 339],
      [3, 'S<T:Bol>', 340],
      [4, 'S<T:Flt>', 341],
      [5, 'S<T:Str>', 342],
      [6, 'S<T:L<Gid>>', 343],
      [7, 'S<T:L<Int>>', 344],
      [8, 'S<T:L<Bol>>', 345],
      [9, 'S<T:L<Flt>>', 346],
      [10, 'S<T:L<Str>>', 347],
      [11, 'S<T:Vec>', 348],
      [12, 'S<T:L<Ety>>', 349],
      [13, 'S<T:L<Vec>>', 350],
      [14, 'S<T:Cfg>', 538],
      [15, 'S<T:Pfb>', 539],
      [16, 'S<T:L<Cfg>>', 540],
      [17, 'S<T:L<Pfb>>', 541],
      [18, 'S<T:Fct>', 626],
      [19, 'S<T:L<Fct>>', 2998],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 351,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [0, 'S<T:Ety>', 351],
      [1, 'S<T:Gid>', 352],
      [2, 'S<T:Int>', 353],
      [3, 'S<T:Bol>', 354],
      [4, 'S<T:Flt>', 355],
      [5, 'S<T:Str>', 356],
      [6, 'S<T:L<Gid>>', 357],
      [7, 'S<T:L<Int>>', 358],
      [8, 'S<T:L<Bol>>', 359],
      [9, 'S<T:L<Flt>>', 360],
      [10, 'S<T:L<Str>>', 361],
      [11, 'S<T:Vec>', 362],
      [12, 'S<T:L<Ety>>', 363],
      [13, 'S<T:L<Vec>>', 364],
      [14, 'S<T:Cfg>', 542],
      [15, 'S<T:Pfb>', 543],
      [16, 'S<T:L<Cfg>>', 544],
      [17, 'S<T:L<Pfb>>', 545],
      [18, 'S<T:Fct>', 627],
      [19, 'S<T:L<Fct>>', 3139],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 428,
    inputs: [],
    outputs: [undefined, undefined, undefined, 'R<T>', 'R<T>'],
    reflectMap: [
      [0, 'S<T:Int>', 428],
      [1, 'S<T:Str>', 432],
      [2, 'S<T:Ety>', 433],
      [3, 'S<T:Gid>', 434],
      [4, 'S<T:Flt>', 435],
      [5, 'S<T:Vec>', 436],
      [6, 'S<T:Bol>', 437],
      [7, 'S<T:L<Int>>', 438],
      [8, 'S<T:L<Str>>', 439],
      [9, 'S<T:L<Ety>>', 440],
      [10, 'S<T:L<Gid>>', 441],
      [11, 'S<T:L<Flt>>', 442],
      [12, 'S<T:L<Vec>>', 443],
      [13, 'S<T:L<Bol>>', 444],
      [14, 'S<T:Cfg>', 522],
      [15, 'S<T:Pfb>', 523],
      [16, 'S<T:L<Cfg>>', 524],
      [17, 'S<T:L<Pfb>>', 525],
      [18, 'S<T:Fct>', 628],
      [19, 'S<T:L<Fct>>', 2490],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 445,
    inputs: [undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 445],
      [1, 'S<T:Str>', 446],
      [2, 'S<T:Ety>', 447],
      [3, 'S<T:Gid>', 448],
      [4, 'S<T:Flt>', 449],
      [5, 'S<T:Vec>', 450],
      [6, 'S<T:Bol>', 451],
      [7, 'S<T:L<Int>>', 452],
      [8, 'S<T:L<Str>>', 453],
      [9, 'S<T:L<Ety>>', 454],
      [10, 'S<T:L<Gid>>', 455],
      [11, 'S<T:L<Flt>>', 456],
      [12, 'S<T:L<Vec>>', 457],
      [13, 'S<T:L<Bol>>', 458],
      [14, 'S<T:Cfg>', 526],
      [15, 'S<T:Pfb>', 527],
      [16, 'S<T:L<Cfg>>', 528],
      [17, 'S<T:L<Pfb>>', 529],
      [18, 'S<T:Fct>', 629],
      [19, 'S<T:L<Fct>>', 2208],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  {
    id: 459,
    inputs: [],
    outputs: ['R<T>'],
    reflectMap: [
      [0, 'S<T:Int>', 459],
      [1, 'S<T:Str>', 460],
      [2, 'S<T:Ety>', 461],
      [3, 'S<T:Gid>', 462],
      [4, 'S<T:Flt>', 463],
      [5, 'S<T:Vec>', 464],
      [6, 'S<T:Bol>', 465],
      [7, 'S<T:L<Int>>', 466],
      [8, 'S<T:L<Str>>', 467],
      [9, 'S<T:L<Ety>>', 468],
      [10, 'S<T:L<Gid>>', 469],
      [11, 'S<T:L<Flt>>', 470],
      [12, 'S<T:L<Vec>>', 471],
      [13, 'S<T:L<Bol>>', 472],
      [14, 'S<T:Cfg>', 530],
      [15, 'S<T:Pfb>', 531],
      [16, 'S<T:L<Cfg>>', 532],
      [17, 'S<T:L<Pfb>>', 533],
      [18, 'S<T:Fct>', 630],
      [19, 'S<T:L<Fct>>', 2349],
      [-1, 'D<R<K>,R<V>>', -1],
      [-1, 'S<>', -1],
      [-1, 'L<S<>>', -1],
    ],
    len: 20
  },
  { // ENUM EQUAL
    id: 475,
    inputs: ['R<T>', 'R<T>'],
    outputs: [],
    reflectMap: [
      // [0, 'S<T:E<0>>', 475],
      // [1, 'S<T:E<0>>', 476],
      // [2, 'S<T:E<0>>', 477],
      // [3, 'S<T:E<0>>', 478],
      // [4, 'S<T:E<0>>', 479],
      // [5, 'S<T:E<0>>', 480],
      // [6, 'S<T:E<0>>', 481],
      // [7, 'S<T:E<0>>', 482],
      // [8, 'S<T:E<0>>', 483],
      // [9, 'S<T:E<0>>', 484],
      // [10, 'S<T:E<0>>', 485],
      // [11, 'S<T:E<0>>', 486],
      // [12, 'S<T:E<0>>', 487],
      // [13, 'S<T:E<0>>', 488],
      // [14, 'S<T:E<0>>', 489],
      // [16, 'S<T:E<0>>', 491],
      // [17, 'S<T:E<0>>', 492],
      // [18, 'S<T:E<0>>', 493],
      // [19, 'S<T:E<0>>', 494],
      // [20, 'S<T:E<0>>', 495],
      // [-1, 'Enum', -1],
    ],
    len: 19
  },
  {
    id: 509,
    inputs: ['L<R<T>>'],
    outputs: ['R<T>'],
    reflectMap: [
      [0, 'S<T:Bol>', 509],
      [1, 'S<T:Ety>', 510],
      [2, 'S<T:Flt>', 511],
      [3, 'S<T:Gid>', 512],
      [4, 'S<T:Int>', 513],
      [5, 'S<T:Str>', 514],
      [6, 'S<T:Vec>', 515],
      [7, 'S<T:Cfg>', 570],
      [8, 'S<T:Pfb>', 571],
      [9, 'S<T:Fct>', 3280],
      [-1, 'S<>', -1],
    ],
    len: 10
  },
  {
    id: 647,
    inputs: [undefined, undefined, undefined, 'R<T>'],
    outputs: [],
    reflectMap: [
      [0, 'S<T:Int>', 647],
      [1, 'S<T:Flt>', 648],
      [2, 'S<T:Str>', 649]
    ],
    len: 3
  },
  {
    id: 948,
    inputs: ['D<R<K>,R<V>>', 'R<K>', 'R<V>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 1
  },
  {
    id: 1088,
    inputs: ['L<R<K>>', 'L<R<V>>'],
    outputs: ['D<R<K>,R<V>>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 7
  },
  {
    id: 1158,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: ['R<V>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 1
  },
  {
    id: 1298,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1368,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1438,
    inputs: ['D<R<K>,R<V>>', 'R<K>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1508,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['R<K>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1578,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['R<V>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1648,
    inputs: ['D<R<K>,R<V>>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1718,
    inputs: ['D<R<K>,R<V>>'],
    outputs: [],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1788,
    inputs: [undefined, ...Array(99).fill(['R<K>', 'R<V>']).flat(2)],
    outputs: ['D<R<K>,R<V>>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 0
  },
  {
    id: 1928,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<K>>', 'L<R<V>>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 1
  },
  {
    id: 1938,
    inputs: ['D<R<K>,R<V>>'],
    outputs: ['L<R<K>>', 'L<R<V>>'],
    reflectMap: [[-1, 'D<>', -1]],
    len: 1
  }
];