/**
 * 分析有向图，返回孤立点和各无分叉/并入链的信息。
 *
 * 输出格式：
 * {
 *   single: number[],
 *   chain: {
 *     starter: number,
 *     chains: number[][],        // starter 的每一条链（节点列表）
 *     targets: (number|null)[]   // 对应每条链的汇入点（如果链在某个节点汇入则为该节点，否则为 null）。
 *   }[]
 * }
 *
 * 规则（实现细节）：
 * - 孤立点（single）：入度==0 且 出度==0 的节点。
 * - 无分叉/并入链：链上的“内部节点”定义为 入度==1 且 出度==1 的节点。
 *   每条链从一个起点（starter）出发：starter 的定义为 出度>0 且 (入度!=1 || 出度!=1)，
 *   对于 starter 的每一条出边，沿着该出边向前走：
 *     - 只把满足(入度==1 && 出度==1) 的内部节点加入链中；
 *     - 若下一个节点是一个合并点（入度>1 或属于已识别的纯环），则**不把该合并点加入链**，而把它作为该链的 target（汇入点）；
 *     - 若下一个节点是终点（出度==0），则把该终点加入链，且 target 为 null；
 *     - 若遇到一个没有分支的环（环中所有节点入度==1 && 出度==1），该环被单独识别：
 *         以环中编号最小的节点作为 starter，链包含整个环的节点（按边顺序），并把 target 设为该 starter（即环回到自身）。
 *
 * 算法复杂度：O(N+E)（构建度、Tarjan 求强连通分量、遍历链）。
  * 更新说明：
 * 纯环 的定义修改为：
 *   —— 一个强连通分量内所有节点 in=1、out=1，并且 **没有任何来自环外的入边或出边**（即不与其他结构相连）。
 *   只有这种完全孤立的环才作为“纯环”输出。
 *   若环与外部相连（无论是分叉或汇入），则将其拆开按普通链处理。
 *
 * 主要变化：
 *   - SCC 识别后，额外检查：是否存在来自 SCC 外的入边或出边。
 *   - 若存在，则不是纯环，全部作为普通链的一部分处理。
 *   - 只有完全孤立的 1-in-1-out 的 SCC 才认为是纯环。
 */

type Edge = [number, number];

export interface ChainResult {
  single: number[];
  chain: { starter: number; chains: number[][]; targets: (number | null)[] }[];
  in_deg: Map<number, number>;
  out_deg: Map<number, number>;
}

export function analyzeGraph(nodes: number[], edges: Edge[]): ChainResult {
  const nodeSet = new Set(nodes);
  const outMap = new Map<number, number[]>();
  const inMap = new Map<number, number[]>();

  for (const n of nodes) {
    outMap.set(n, []);
    inMap.set(n, []);
  }
  for (const [u, v] of edges) {
    if (!nodeSet.has(u) || !nodeSet.has(v)) continue;
    outMap.get(u)!.push(v);
    inMap.get(v)!.push(u);
  }

  const outDeg = new Map<number, number>();
  const inDeg = new Map<number, number>();
  for (const n of nodes) {
    outDeg.set(n, outMap.get(n)!.length);
    inDeg.set(n, inMap.get(n)!.length);
  }

  const single = nodes.filter(n => inDeg.get(n) === 0 && outDeg.get(n) === 0);

  /** Tarjan 寻找 SCC */
  const indexMap = new Map<number, number>();
  const lowlink = new Map<number, number>();
  const onStack = new Map<number, boolean>();
  const stack: number[] = [];
  let index = 0;
  const sccs: number[][] = [];

  function strongconnect(v: number) {
    indexMap.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.set(v, true);

    for (const w of outMap.get(v)!) {
      if (!indexMap.has(w)) {
        strongconnect(w);
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.get(w)) {
        lowlink.set(v, Math.min(lowlink.get(v)!, indexMap.get(w)!));
      }
    }

    if (lowlink.get(v) === indexMap.get(v)) {
      const comp: number[] = [];
      while (true) {
        const w = stack.pop()!;
        onStack.set(w, false);
        comp.push(w);
        if (w === v) break;
      }
      sccs.push(comp);
    }
  }

  for (const v of nodes) if (!indexMap.has(v)) strongconnect(v);

  /**
   * 识别真正的“孤立纯环”：
   *   - scc size>=2，且 所有节点 in=1 和 out=1
   *   - 并且没有边来自或去往 SCC 之外
   */
  const cycleNodes = new Set<number>();
  const cycles: number[][] = [];

  for (const comp of sccs) {
    if (comp.length <= 1) continue;

    let pure = true;
    for (const n of comp) {
      if (inDeg.get(n) !== 1 || outDeg.get(n) !== 1) {
        pure = false;
        break;
      }
    }
    if (!pure) continue;

    // 检查是否与外界相连
    let isolated = true;
    const compSet = new Set(comp);
    for (const n of comp) {
      for (const from of inMap.get(n)!) if (!compSet.has(from)) isolated = false;
      for (const to of outMap.get(n)!) if (!compSet.has(to)) isolated = false;
      if (!isolated) break;
    }

    if (isolated) {
      for (const n of comp) cycleNodes.add(n);
      cycles.push(comp.slice());
    }
  }

  const visitedEdge = new Set<string>();
  const chainResults: { starter: number; chains: number[][]; targets: (number | null)[] }[] = [];

  /** 处理真正的孤立纯环 */
  for (const comp of cycles) {
    const start = Math.min(...comp);
    const order: number[] = [];
    let cur = start;
    do {
      order.push(cur);
      const nxt = outMap.get(cur)![0];
      visitedEdge.add(`${cur}->${nxt}`);
      cur = nxt;
    } while (cur !== start);

    chainResults.push({ starter: start, chains: [order], targets: [start] });
  }

  const mark = (u: number, v: number) => visitedEdge.add(`${u}->${v}`);
  const used = (u: number, v: number) => visitedEdge.has(`${u}->${v}`);

  /** 其他 starter: 出度>0 且不是内部点(in=1&&out=1) */
  const starters = nodes.filter(n => outDeg.get(n)! > 0 && !(inDeg.get(n) === 1 && outDeg.get(n) === 1));

  for (const s of starters) {
    const chains: number[][] = [];
    const targets: (number | null)[] = [];

    for (const v of outMap.get(s)!) {
      if (used(s, v)) continue;

      const chainNodes: number[] = [s];
      mark(s, v);

      let next = v;
      while (true) {
        // 终点（sink）
        if (outDeg.get(next) === 0 && inDeg.get(next) == 1) {
          chainNodes.push(next);
          targets.push(null);
          break;
        }

        // 不加入链：合并/分叉点（入度!=1 或 出度!=1），但要避免 sink 误被当作链尾节点加入链
        if (inDeg.get(next)! !== 1 || outDeg.get(next)! !== 1) {
          targets.push(next);
          break;
        }

        // 内部点：添加
        chainNodes.push(next);
        const outN = outMap.get(next)![0];
        mark(next, outN);

        // 环返回 starter（但此环非孤立纯环，只需截断为链）
        if (outN === s) {
          targets.push(s);
          break;
        }

        next = outN;
      }

      chains.push(chainNodes);
    }

    if (chains.length > 0) chainResults.push({ starter: s, chains, targets });
  }

  chainResults.sort((a, b) => a.starter - b.starter);
  single.sort((a, b) => a - b);

  return { single, chain: chainResults, in_deg: inDeg, out_deg: outDeg };
}



/**
* 识别真正的“孤立纯环”：
* - scc size>=2，且 所有节点 in=1 和 out=1
 
/* 示例（可在本地 TypeScript 环境测试）：
 
const nodes = [1,2,3,4,5,6,7,8];
const edges: Edge[] = [[1,2],[2,3],[3,4],[2,4],[1,5],[5,6],[6,7],[7,8]];
// 这里 2-3-4 是一个纯环（2->3->4->2），starter = 2
// 1->2 链会进入环，1 的一条链为 [1], target = 2
// 1->5->6->7->8 是一条链，终点 8 为 sink, target = null
// 节点若没有边（孤立）将出现在 single
 
console.log(analyzeGraph(nodes, edges));
*/

if (import.meta.main) {
  const nodes = [1, 2, 3, 4, 5, 6, 7, 8];
  const edges: Edge[] = [[1, 2], [2, 3], [3, 4], [2, 4], [5, 6], [6, 7], [7, 5]];
  console.dir(analyzeGraph(nodes, edges), { depth: null });
}