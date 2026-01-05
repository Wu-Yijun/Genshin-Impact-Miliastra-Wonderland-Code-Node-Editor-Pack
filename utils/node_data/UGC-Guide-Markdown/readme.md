# 全部文档使用 MarkSnip 自动构建下载

见 Google Chrome 扩展程序: [MarkSnip](https://chromewebstore.google.com/detail/kcbaglhfgbkjdnpeokaamjjkddempipm)

可利用 Batch Processing 功能一次下载全部内容(链接见文档末尾)
扩展程序的配置可以导入导出到 [此JSON文件](./MarkSnipOption.json) 中

通过 [extract.ts](./extract.ts) 自动分析文档结构并构建数据(需要手动调整少量错误数据).

中文数据见 [nodes.zh.json](./nodes.zh.json), 英文数据见 [nodes.json](./nodes.json).

*P.S. 评价是多半是 AI 自动翻译的, 不然怎么连缺少字段的位置和错误类型都一样?*

*P.P.S 然后我就可以将数据补全进入我的 data.json 了...* 

## 文件清单

*存档构建日期: 2026-01-05*

### 服务器逻辑节点 (Server Nodes)

| 文档名称 | 描述 |
| :--- | :--- |
| [Event Nodes](./Event%20Nodes.md) | 事件节点：处理各类触发事件 |
| [Execution Nodes](./Execution%20Nodes.md) | 执行节点：由执行流触发的功能节点 |
| [Flow Control Node](./Flow%20Control%20Node.md) | 流程控制节点：控制执行流分支、循环等 |
| [Operation Nodes](./Operation%20Nodes.md) | 运算节点：数学运算与逻辑处理 |
| [Query Nodes](./Query%20Nodes.md) | 查询节点：获取实体、环境等各类数据信息 |

### 客户端表现节点 (Client Nodes)

| 文档名称 | 描述 |
| :--- | :--- |
| [Client Execution Nodes](./Client%20Execution%20Nodes.md) | 客户端执行节点：处理表现、技能等客户端逻辑 |
| [Client Flow Control Node](./Client%20Flow%20Control%20Node.md) | 客户端流程控制节点 |
| [Client Operation Nodes](./Client%20Operation%20Nodes.md) | 客户端运算节点 |
| [Client Query Nodes](./Client%20Query%20Nodes.md) | 客户端查询节点 |
| [Client Other Nodes](./Client%20Other%20Nodes.md) | 客户端其他辅助节点 |

### 链接地址:

供 MarkSnip 批量下载使用

```
英文版:

[ServerExecution](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhw66orrrfkm)
[ServerEvent](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhn7ko01v3yw)
[ServerFlowControl](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhe8yn9bysd6)
[ServerQuery](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhwbqlrw655q)
[ServerOperation](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhnd4l069tk0)
[ClientQuery](https://act.mihoyo.com/ys/ugc/tutorial/detail/mholjx05ji8w)
[ClientOperation](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhfmxw9fn6n6)
[ClientExecution](https://act.mihoyo.com/ys/ugc/tutorial/detail/mh6obvipqv1g)
[ClientFlowControl](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhxppurzujfq)
[ClientOther](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhor3u09y7u0)

中文版

[ServerExecution.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhw66orrrfkm)
[ServerEvent.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhn7ko01v3yw)
[ServerFlowControl.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhe8yn9bysd6)
[ServerQuery.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhwbqlrw655q)
[ServerOperation.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhnd4l069tk0)
[ClientQuery.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mholjx05ji8w)
[ClientOperation.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhfmxw9fn6n6)
[ClientExecution.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mh6obvipqv1g)
[ClientFlowControl.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhxppurzujfq)
[ClientOther.zh](https://act.mihoyo.com/ys/ugc/tutorial/detail/mhor3u09y7u0)

```