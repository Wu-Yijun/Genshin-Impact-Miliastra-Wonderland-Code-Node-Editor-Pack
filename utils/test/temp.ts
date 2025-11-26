
// function merge(src: [number, number][][]): Group[] {
//   // TODO
//   return [];
// }

function merge(srcList: [number, number][][]) {
  interface Group {
    /** Different groups of (key, value pairs) */
    map: [number, number][];
    /** Index of src that fit in the group */
    src_list: number[];
  }
  function isCompatible(map: [number, number][], S: [number, number][]): boolean {
    const k2v = new Map(map.map(([k, v]) => [k, v]));
    const v2k = new Map(map.map(([k, v]) => [v, k]));

    for (const [k, v] of S) {
      if (k2v.has(k) && k2v.get(k) !== v) return false;
      if (v2k.has(v) && v2k.get(v) !== k) return false;
    }
    return true;
  }
  function mergeInto(G: Group, S: [number, number][], idx: number) {
    for (const pair of S) G.map.push(pair);
    G.src_list.push(idx);
  }

  const groups = [];

  for (let i = 0; i < srcList.length; i++) {
    const S = srcList[i];
    let placed = false;
    for (const G of groups) {
      if (isCompatible(G.map, S)) {
        mergeInto(G, S, i);
        placed = true;
        break;
      }
    }
    if (!placed) {
      groups.push({
        map: [...S],
        src_list: [i]
      });
    }
  }
  return groups;
}
