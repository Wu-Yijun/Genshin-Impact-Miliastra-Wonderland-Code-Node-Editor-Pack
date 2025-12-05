import { analyzeGraph } from "./graph_chain_split.ts";

function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) throw new Error(msg ?? "Assertion failed");
}
function randomInt(n: number) { return Math.floor(Math.random() * n); }

/**
* 自动测试函数：
* - 随机生成图
* - 调用 analyzeGraph
* - 验证：
* 1. 链中内部点入度出度=1
* 2. 链起点/终点入度或出度>1（特殊 #starter==#target==1 则=1）
* 3. 总连接数 = 所有链的节点数 + 非 null 的 target 数量 = 输入边数
*/
function testAnalyzeGraph(max_id: number = 10000, nodeCount: number = 20, edgeCount: number = 30) {
  const nodes = [...new Set(Array.from({ length: nodeCount }, () => randomInt(max_id)))];
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];


  for (let e = 0; e < edgeCount; e++) {
    const u = randomInt(nodes.length);
    const v = randomInt(nodes.length);
    if (u === v) continue;
    const key = `${u},${v}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push([nodes[u], nodes[v]]);
    }
  }


  const res = analyzeGraph(nodes, edges);
  const inOut = new Map<number, [number, number]>();
  for (const n of nodes) inOut.set(n, [0, 0]);
  for (const [u, v] of edges) {
    inOut.get(u)![1]++;
    inOut.get(v)![0]++;
  }

  let chainEdgeCount = 0;

  for (const group of res.chain) {
    const { starter, chains, targets } = group;
    assert(chains.length === targets.length && chains.length > 0, `链与目标数量不匹配: ${chains.length} != ${targets.length}`);


    for (let i = 0; i < chains.length; i++) {
      const chain = chains[i];
      const target = targets[i];


      chainEdgeCount += chain.length - 1 + (target === null ? 0 : 1);


      for (let j = 1; j < chain.length; j++) {
        const x = chain[j];
        const [ind, outd] = inOut.get(x)!;
        assert(ind === 1 && (outd === 1 || outd === 0 && target === null), `内部点度错误: ${x}`);
      }


      const start = chain[0];
      assert(start === starter, `链起点错误: ${start} != ${starter}`);
      const [sind, sout] = inOut.get(start)!;


      const specialLoop = (target === start && chains.length === 1 && inOut.get(start)![0] === 1 && inOut.get(start)![1] === 1);
      if (specialLoop) {
      } else {
        assert(sind !== 1 || sout !== 1, `起点度错误: ${inOut.get(start)}`);
        if (target !== null) {
          const [eind, eout] = inOut.get(target)!;
          assert(eind !== 1 || eout !== 1, `终点度错误: ${inOut.get(target)}`);
        }
      }

    }
  }

  if (chainEdgeCount !== edges.length) {
    console.dir({ edges, res }, { depth: null });
    throw new Error(`边数不一致: 链计算 ${chainEdgeCount}, 实际 ${edges.length}`);
  }
}

class Test {
  static analyzeGraph(iter = 1000, max_count: number = 50) {
    console.log("开始随机测试 analyzeGraph...","参数:","iter =", iter, ", max_count =", max_count);
    for (let i = 0; i < iter; i++) {
      const count = randomInt(max_count) + 1;
      const edgeNum = randomInt(count * (count - 1) / 2);
      const max_id = count * (randomInt(10) + 1);
      testAnalyzeGraph(max_id, count, edgeNum);
    }
    console.log("随机测试通过!");
  }
}

if (import.meta.main) {
  Test.analyzeGraph(2000, 100);
}