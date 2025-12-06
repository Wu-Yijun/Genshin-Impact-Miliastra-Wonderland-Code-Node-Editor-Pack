export class Counter {
  private count = 0;
  constructor(start_from: number = 0) {
    this.count = start_from;
  }
  set lower_bound(v: number) {
    if (v > this.count) this.count = v;
  }
  get value() {
    this.count++;
    return this.count;
  }
}

/** 节点 Index 计数器 */
export const counter_index = new Counter();
/** 节点动态 id 计数器 */
export const counter_dynamic_id = new Counter();



export function randomInt(len: number, starting: string = ""): number {
  return Number(randomBigInt(len, starting));
}
export function randomBigInt(len: number, starting: string = ""): bigint {
  let ret = "";
  while (true) {
    if (len > 8) {
      ret += Math.random().toString(10).slice(-8);
      len -= 8;
    } else {
      ret += Math.random().toString(10).slice(-len);
      break;
    }
  }
  if (ret[0] === "0") {
    ret = Math.floor(Math.random() * 9 + 1).toString() + ret.slice(1);
  }
  if (starting.length > 0) {
    return BigInt(starting + ret.slice(starting.length));
  }
  return BigInt(ret);
}


const names = "the of and to in a is was that for as with by on are from be or his were it an at not which have he had this has also their but one can its other been more they used first all two citation than into would only time who most may such some many when after between over these her about there use no them new him will out during made both then often so any being such as where number could main through system people known each while if called convert same later three because well work before the same under part very different became year did large example several city early until much government found own since she even form power do those around state including set high life against second century within world still end using small name what now usually without however began like as well area make common the most water another way due must long less four death said film order due to back public does left based few become known as given country major place group considered among game point used to period support war music down million important systems control should took day family language last original result political line members case well as see single just process along similar take following we although countries right either times areas published the other local include population never data home every various the time modern further development per how led possible military popular term though history generally you off rather men law developed".split(" ");
export function randomName(words_count: number = 1): string {
  let res = [];
  while (words_count-- > 0)
    res.push(names[Math.floor(Math.random() * names.length)]);
  return res.join(" ");
}

