import { readFileSync } from "fs";
import { collection, dir, gia, read_json, save } from "../util.ts";
import yaml from "yaml";
import { data } from "./client.js";
import { assertEq } from "../../utils.ts";

function create_nodes_to_get_their_names_and_ids() {
  const graph = gia("skill", "01_collection");
  const info = collection().find(x => x.name === "skill")!;
  const records = read_json("node_id_skill.json");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  nodes.length = 0;
  let pair: Record<number, number> = {};
  for (let r = 0; r < records.length; r++) {
    nodes.push({
      nodeIndex: r + 1,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: records[r].gid,
      },
      pins: [],
      x: 0,
      y: 50 * r,
      usingStruct: []
    })
    pair[r + 1] = records[r].gid;
  }
  save("all_nodes.gia", graph, true);
  dir(pair);
  console.log("Saved", nodes.length, "nodes to all_nodes.gia!");
}

function create_client_yaml() {
  /**
   * 增强版：使用多种策略进行字符串匹配
   * 1. 完全匹配
   * 2. 最长公共前缀
   * 3. 编辑距离（备选）
   */
  function findNearestEnhanced(source: string[], targets: string[]): number[] {
    if (targets.length === 0) {
      return source.map(() => -1);
    }

    if (source.length === 0) {
      return [];
    }

    // 计算编辑距离的辅助函数
    function levenshteinDistance(a: string, b: string): number {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;

      const matrix = [];

      // 初始化矩阵
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // 填充矩阵
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // 替换
              matrix[i][j - 1] + 1,     // 插入
              matrix[i - 1][j] + 1      // 删除
            );
          }
        }
      }

      return matrix[b.length][a.length];
    }

    return source.map(src => {
      if (!src) return -1;

      let bestIndex = -1;
      let bestScore = -Infinity;

      targets.forEach((target, index) => {
        if (!target) return;

        // 策略1：完全匹配（最高优先级）
        if (src === target) {
          bestIndex = index;
          bestScore = Infinity;
          return;
        }

        // 如果已经找到完全匹配，跳过后续计算
        if (bestScore === Infinity) return;

        // // 策略2：计算最长公共前缀长度
        // const maxLength = Math.min(src.length, target.length);
        // let prefixLength = 0;

        // for (let i = 0; i < maxLength; i++) {
        //   if (src[i] === target[i]) {
        //     prefixLength++;
        //   } else {
        //     break;
        //   }
        // }

        // 策略3：计算编辑距离相似度（字符串较短时使用）
        const editDistance = levenshteinDistance(src, target);
        const maxLen = Math.max(src.length, target.length);
        const similarity = 1 - (editDistance / maxLen);

        // 综合得分：公共前缀权重 + 编辑距离相似度
        // const score = (prefixLength * 0.6) + (similarity * 0.4 * maxLen);
        const score = 1 / editDistance;

        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });

      return bestIndex;
    });
  }

  const yaml_data: { [key: string]: { [key: string]: string[] }[] } = yaml.parse(readFileSync(import.meta.dirname + "/client.yaml").toString());
  const name_pair = Object.entries(data);
  const yaml_str = Object.values(yaml_data).map(x => x.map(y => Object.values(y)[0].map(z => z.toLowerCase().replaceAll(/[^a-z]/g, "")))).flat(2);
  const name_str = name_pair.map(x => x[1].toLowerCase().replaceAll(/[^a-z]/g, ""));
  // dir(name_pair);
  // dir(name_str.length);
  // dir(yaml_str.length);
  const index = findNearestEnhanced(name_str, yaml_str);
  const yaml_map = new Map(index.map((x, i) => [x, i]));
  assertEq(yaml_str.length, name_str.length);
  assertEq(index.length, yaml_map.size);
  let i = 0;
  Object.values(yaml_data).forEach(x => x.forEach(y => {
    const key = Object.keys(y)[0];
    const rec: { [key: number]: string } = {};
    for (let k = 0; k < y[key].length; k++) {
      const index = yaml_map.get(i++);
      rec[index === undefined ? -i : parseInt(name_pair[index][0])] = y[key][k];
    }
    y[key] = rec as any;
  }));
  dir(yaml_data);
  save("client.yaml", yaml.stringify(yaml_data));
}

function compare_displayName_with_yaml() {
  const yaml_data: { [key: string]: { [key: string]: { [key: string]: string } }[] } = yaml.parse(readFileSync(import.meta.dirname + "/../dist/client.yaml").toString());
  const name_pair = Object.entries(data).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  const yaml_pair = Object.values(yaml_data).map(x => Object.values(x).map(y => Object.values(y).map(z => Object.entries(z)))).flat(3)
    .map(x => [x[0], x[1].replace(/^\d+./, "").trim()])
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  // dir(yaml_pair);
  // dir(name_pair);
  const diff = [];
  for (let i = 0; i < yaml_pair.length; i++) {
    assertEq(yaml_pair[i][0], name_pair[i][0]);
    try {
      assertEq(yaml_pair[i][1], name_pair[i][1]);
    } catch (e) {
      diff.push([yaml_pair[i][1], name_pair[i][1]]);
    }
  }
  dir(diff);
}

// create_nodes_to_get_their_names_and_ids();
// compare_js_and_yaml();
compare_displayName_with_yaml();