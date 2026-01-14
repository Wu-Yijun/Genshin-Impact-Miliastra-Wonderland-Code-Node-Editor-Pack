## usage

### Step1
从原始游戏数据中提取全部节点的全部信息: [extract_all_nodes_info](extract_all_nodes_info.ts)

输入(读取)文件:
- [ManualTextMapConfigData](../../../ref/DimbreathBot/AnimeGameData/ExcelBinOutput/ManualTextMapConfigData.json)
- [TextMapCHS](../../../ref/DimbreathBot/AnimeGameData/TextMap/TextMapCHS.json)
- [TextMapEN](../../../ref/DimbreathBot/AnimeGameData/TextMap/TextMapEN.json)

输出文件:
- [nodes](nodes.json)

输出文件结构:
```ts
type JSON_Schema = NodeData[];
interface NodeData {
  id: number;
  name: string;
  nameZH: string;
  desc: string;
  descZH: string;
  inPins?: NodeParam[];
  outPins?: NodeParam[];
  inParams?: NodeParam[];
  outParams?: NodeParam[];
  extraParams?: NodeParam[];
}
interface NodeParam {
  index: number;
  name: string;
  nameZH: string;
  // for override hint
  hint?: string;
  hintEN?: string;
}
```

### Step2
与现有节点数据对比, 寻找差异/增量

