// @ts-nocheck


declare global {
  interface FallingBlock {
    a: int;
    b: int;
    c: int;
    d: int;
    e: int;
  };
  namespace Self {

    const state: string = "init";
    const randomBag: List<int> = [0, 1, 2, 3, 4, 5, 6]; // 比特位标志, 记录7种方块是否已出现
    const currentIndex: int = 0; // 0-6
    /** @done: support negative numbers */
    const nextBlock: int = -1; // 下一个方块的类型, 0-6
    const currentBlock: int = -1; // 当前方块的类型, 0-6
    const holdBlock: int = -1; // 保留的方块类型, -1表示没有保留

    const existBlocks: List<int> = []; // 已存在的方块类型数组
    const level: int = 0;
    const frame_per_descend: int = 0;
    const descend_per_frame: int = 0;
    const left_frames: int = 1; // frames left to descend
    const lock_delay: int = 1; // frames left to lock

    const columns: List<Entity> = []; // 列管理器
    const tetris_c: Entity; // The current tetris
    const tetris_n: Entity; // The next tetris
    const tetris_h: Entity; // The held tetris

    // current falling block shape
    /** @done: support struct */
    const f_b: FallingBlock;
    // x offset of falling block
    const f_x: int; // [0, Padding, Width + Padding, Width + 2 * Padding)
    // y offset of falling block
    const f_y: int; // [0, Padding, Height + Padding)
    // rotation of falling block
    const f_r: int; // 0,1,2,3

    // const movement: "null" | "left" | "right" | "down" | "drop" | "hold" | "rotL" | "rotR";
    const movement: string;

  }
}

const POS: vec = [0, 0, 0];
const COLUMN_GAP: float = 1;
const COLUMN_ID: Prefab;

const is_between = (x: int, min: int, max: int): boolean => {
  return m.range(min, max, x) === x;
};
const not_colliding = (x: int, index: int): boolean => {
  return x & Self.existBlocks[index] === 0;
}

/** true = x, false = y */
const int_switcher = (x: int, y: int, b: boolean): int => {
  return m.int(b) * x + m.int(!b) * y;
}

/** @done: support hex digits */
const WALLS = 0xFFFFFFF;
const NO_WALLS = 0x00000F;

// ======================= Initialize ======================= //

Branch["Initialize"].Loop(0, PADDING * 2 + WIDTH - 1)[i_init](
  true = $((i_init) => {
    const b = is_between(i_init, PADDING, PADDING + WIDTH - 1);
    return int_switcher(NO_WALLS, WALLS, b);
  })[wall_0]
    .Insert(Self.existBlocks, wall_0),
  false = 0()
).SetVal(Self.level, -1)
  .SetVal(Self.randomBag, [0, 1, 2, 3, 4, 5, 6])
  .FisherYatesShuffle()
  .SetVal(Self.nextBlock, Self.randomBag[0])
  .SetVal(Self.currentBlock, -1)
  .SetVal(Self.currentIndex, 1)
  >> "FetchTetris"()
  >> "LevelUp"();

Branch["LevelUp"].SetVal(Self.level, Self.level + 1)
  .$(() => {
    // (0.8 - (level - 1) * 0.007) ** (level - 1) / fps
    const base = 0.8 - m.to_float(Self.level - 1) * 0.007;
    const speed = m.pow(base, m.to_float(Self.level - 1)) * Self.FPS;
    const frame = m.to_int(speed); // frame per descend
    const descend = m.to_int(1 / speed); //descend per frame
    return { frame, descend };
  })[frame_per_descend, descend_per_frame]
  .SetVal(Self.frame_per_descend, frame_per_descend)
  .SetVal(Self.descend_per_frame, descend_per_frame);


function FisherYatesShuffle() {
  const _j: int;
  const _swp: int;
  In().Loop(1, 6)[i_init](
    true = 0(),
    false = SetVal(Self.currentIndex, 0).Out()
  ).
    // i = 6 to 1, j = randomInt[1, i]
    $((i_init) => q.randomInt(0, 7 - i_init))[res_1]
    .SetVal(_j, res_1)
    // swap bag[i] bag[j]
    .SetVal(_swp, Self.randomBag[_j])
    .Modify(Self.randomBag, _j, Self.randomBag[7 - i_init])
    .Modify(Self.randomBag, 7 - i_init, _swp);
  return ExecFun<{}>();
}

Branch["AddColumns"].Loop(0, Self.WIDTH - 1)[i_column]
  .$((i_column) => m.add3(Self.POS, m.to_float(i_column) * Self.COLUMN_GAP))[coord_1]
  .NewPrefab(Self.COLUMN_ID, coord_1)[new_column]
  .Insert(Self.columns, val = new_column);

[OnCreate()] >> {
  0: "Initialize"(),
  1: "AddColumns"(),
  2: 0()
}
  .SetVal(Self.state, 'start', true)
  .AddTimer("Start", m.list(3));
// Wait 3 sec... for level loading
// About to create 20 * 10 = 200 blocks

[Timer(Timer.Start)].SetTimer("Frame", m.list(0.1), repeat = true);

// ======================= Game Frame ======================= //

[Timer(Timer.Frame)] >> {
  0: "GameDataUpdate"(),
  1: "RenderFrame"(),
  2: "FetchTetris"()
};

const extract_tetris_shape = (tetris: int, rot: int) => {
  const p = Self.BLOCK_SHAPES[tetris][rot];
  const a = m.bit_read(p, 0, 4);
  const b = m.bit_read(p, 5, 9);
  const c = m.bit_read(p, 10, 14);
  const d = m.bit_read(p, 15, 19);
  const e = m.bit_read(p, 20, 24);
  const res: FallingBlock = m.struct(a, b, c, d, e);
  return res;
}

Branch["FetchTetris"]
  // set currentBlock if it is -1
  .If(Self.currentBlock === -1) //then:
  .SetVal(Self.currentBlock, Self.nextBlock)
  .SetVal(Self.nextBlock, Self.randomBag[Self.currentIndex])
  .SetVal(Self.currentIndex, Self.currentIndex + 1)
  .SetVal(Self.f_r, 0)
  .SetVal(Self.f_x, Self.PADDING + Self.WIDTH / 2)
  .SetVal(Self.f_y, Self.PADDING + Self.HEIGHT)
  .SetVal(id, Self.nextBlock, Self.tetris_n, true)
  .SetVal(a, Self.f_x - Self.PADDING, Self.tetris_c, true)
  .SetVal(b, Self.f_y - Self.PADDING, Self.tetris_c, true)
  .SetVal(id, Self.currentBlock, Self.tetris_c, true)
  .SetVal(Self.f_b, extract_tetris_shape(Self.currentBlock, 0))
  // Shuffle a new Bag
  /** @done: distinguish comparing or type */
  .If(Self.currentIndex >= 7)
  .FisherYatesShuffle();

const _translate_x = 0;
const _rotate_t = 0;
// 游戏计算方式
// 计算位置下降(几帧一格/一帧几格)(是否触底)
//
Branch["GameDataUpdate"]
  .Switch(Self.movement)(
    "left" = SetVal(Self.movement, "null").SetVal(_translate_x, -1) >> "TranslateX"(),
    "right" = SetVal(Self.movement, "null").SetVal(_translate_x, 1) >> "TranslateX"(),
    "down" = SetVal(Self.movement, "null").SetVal(Self.left_frames, 0) >> 0(),
    "drop" = todo("Not Impl"),
    "hold" = todo("Not Impl"),
    "rotL" = SetVal(Self.movement, "null").SetVal(_rotate_t, 3) >> "RotateT"(),
    "rotR" = SetVal(Self.movement, "null").SetVal(_rotate_t, 1) >> "RotateT"(),
    /** @done: add null branch */
    null = 0(),
  )
  .If(Self.descend_per_frame === 0)(
    true = SetVal(Self.left_frames, Self.left_frames - 1)
      /** @done: distinguish comparing or type */
      .If(Self.left_frames <= 0)(
        true = "DescendOne"(),
        // false = SetVal(Self.left_frames, Self.frame_per_descend)
      ),
    false = todo("Not Implemented")
  );

/** @done: support structs */
const tetris_fit_in = (fb: FallingBlock, x: int, y: int) => {
  const { a, b, c, d, e } = fb;
  const collide = m.and(
    m.and(
      not_colliding(a << y, x - 2),
      not_colliding(b << y, x - 1),
    ),
    m.and(
      not_colliding(c << y, x),
      m.and(
        not_colliding(d << y, x + 1),
        not_colliding(e << y, x + 2),
      )
    )
  );
  return collide;
}

const can_descend = (dy: int) => {
  return tetris_fit_in(Self.f_b, Self.f_x, Self.f_y - dy);
};

const estimate_descend = (x: int, index: int) => {
  const t = Self.existBlocks[index + Self.PADDING];
  const h = m.int(m.log(2.0, m.float(t)));
  return (Self.f_y - 2 - h) + m.int(x === 0) * 20;
}

function TestMaxDescend(dy: int) {
  const _y = 0;
  In().$((dy) => {
    const { a, b, c, d, e }: FallingBlock = Self.f_b;
    const t = m.max(
      m.max(
        estimate_descend(a, Self.f_x - 2),
        estimate_descend(b, Self.f_x - 1),
      ),
      m.max(
        m.max(
          estimate_descend(c, Self.f_x),
          estimate_descend(d, Self.f_x + 1),
        ),
        m.max(
          estimate_descend(e, Self.f_x + 2),
          dy as int,
        )
      )
    );
    return m.max(t, 0) + 1;
  })[max_y].SetVal(_y, max_y)
    .Loop(_y, dy, "collide")[i](
      true = If(!can_descend(i)).StopLoop("collide").SetVal(_y, i - 1),
      false = Out(),
    );
  return ExecFun<{ _y: int }>();
}


Branch["DescendOne"].If(can_descend(1))(
  true = SetVal(Self.f_y, Self.f_y - 1)
    .SetVal(b, Self.f_y - Self.PADDING, Self.tetris_c, true)
    .SetVal(Self.left_frames, Self.frame_per_descend),
  /** @done: distinguish comparing or type */
  false = If(Self.lock_delay <= 0)(
    true = SetVal(Self.lock_delay, Self.LOCK_DELAY),
    false = SetVal(Self.lock_delay, Self.lock_delay - 1)
      /** @done: distinguish comparing or type */
      .If(Self.lock_delay <= 0) >> "LockTetris"()
  )
);

function LockTetrisAtColumn(x: int, t: int) {
  In().If(t !== 0)
    /** @done: distinguish comparing or type or shifting */
    .Modify(Self.existBlocks, x, Self.existBlocks[x] | (t << Self.f_y))
    /** @done: distinguish comparing or type or shifting */
    .SetVal(change_rows, Self.existBlocks[x] >> Self.PADDING, target = Self.columns[x - Self.PADDING], trigger_event = true)
    .Out();
};

Branch["LockTetris"] >> {
  0: LockTetrisAtColumn(Self.f_x - 2, Self.f_b.a),
  1: LockTetrisAtColumn(Self.f_x - 1, Self.f_b.b),
  2: LockTetrisAtColumn(Self.f_x, Self.f_b.c),
  3: LockTetrisAtColumn(Self.f_x + 1, Self.f_b.d),
  4: LockTetrisAtColumn(Self.f_x + 2, Self.f_b.e),
  5: SetVal(Self.currentBlock, -1).SetVal(Self.movement, "null"),
};

Branch["TranslateX"]
  .If(tetris_fit_in(Self.f_b, Self.f_x + _translate_x, Self.f_y))
  .SetVal(Self.left_frames, Self.frame_per_descend)
  .SetVal(Self.f_x, Self.f_x + _translate_x);


/** @done: support structs */
const _temp_f_b: FallingBlock;
Branch["RotateT"]
  .SetVal(_temp_f_b, extract_tetris_shape(Self.currentBlock, (Self.f_r + _rotate_t) % 4))
  .If(tetris_fit_in(_temp_f_b, Self.f_x, Self.f_y))
  .SetVal(Self.left_frames, Self.frame_per_descend)
  .SetVal(Self.f_r, (Self.f_r + _rotate_t) % 4);

