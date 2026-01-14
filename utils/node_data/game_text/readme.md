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
与现有节点数据对比, 寻找差异/增量, 自动更新差异: [compare_with_data](compare_with_data.ts)

输入(读取)文件:
- [new_nodes](nodes.json)
- [old_nodes](../data.json): 格式参见 [types.ts](../types.ts)

输出文件: 
- [comparison_result.log](comparison_result.log): 仅包含增减节点信息

控制台输出: 仅包含新增的节点以及删除的节点 (Value Changed 的内容会自动更新入 data.json 而不再输出)
```log
[Added Nodes] <node id>: <node name>
[Removed Nodes] <node id>: <node name>
# repeated of the above
```