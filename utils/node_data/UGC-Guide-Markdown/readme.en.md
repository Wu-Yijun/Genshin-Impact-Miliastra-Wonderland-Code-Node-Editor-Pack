# All Documents Automatically Built for Download using MarkSnip

See the Google Chrome extension: [MarkSnip](https://chromewebstore.google.com/detail/kcbaglhfgbkjdnpeokaamjjkddempipm)

You can use the Batch Processing feature to download all content at once (links at the end of the document)
The extension's configuration can be imported from and exported to [this JSON file](./MarkSnipOption.json)

Using [extract.ts](./extract.ts) to automatically analyze document structure and build data (a small amount of erroneous data needs manual adjustment).

Chinese data can be found in [nodes.zh.json](./nodes.zh.json), English data in [nodes.json](./nodes.json).

*P.S Then I can complete the data into my data.json...*

## File List

*Archive Build Date: 2026-01-05*

### Server Logic Nodes (Server Nodes)

| Document Name | Description |
| :--- | :--- |
| [Event Nodes](./Event%20Nodes.en.md) | Event Nodes: Handles various triggered events |
| [Execution Nodes](./Execution%20Nodes.en.md) | Execution Nodes: Functional nodes triggered by execution flow |
| [Flow Control Node](./Flow%20Control%20Node.en.md) | Flow Control Node: Controls execution flow branches, loops, etc. |
| [Operation Nodes](./Operation%20Nodes.en.md) | Operation Nodes: Mathematical operations and logical processing |
| [Query Nodes](./Query%20Nodes.en.md) | Query Nodes: Retrieves various data information such as entities, environment, etc. |

### Client Presentation Nodes (Client Nodes)

| Document Name | Description |
| :--- | :--- |
| [Client Execution Nodes](./Client%20Execution%20Nodes.en.md) | Client Execution Nodes: Handles client logic such as presentation, skills, etc. |
| [Client Flow Control Node](./Client%20Flow%20Control%20Node.en.md) | Client Flow Control Node |
| [Client Operation Nodes](./Client%20Operation%20Nodes.en.md) | Client Operation Nodes |
| [Client Query Nodes](./Client%20Query%20Nodes.en.md) | Client Query Nodes |
| [Client Other Nodes](./Client%20Other%20Nodes.en.md) | Client Other Auxiliary Nodes |

### Links:

For use with MarkSnip batch download

```
English Version:

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

Chinese Version:

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

It seems some tables might be skipped; you can manually process them in the console first:
```js
document.querySelectorAll('.doc-view>h2').forEach(x=>x.outerHTML=`<h3>${x.innerHTML}</h3>`);
document.querySelectorAll('.doc-view>h1').forEach(x=>x.outerHTML=`<h2>${x.innerHTML}</h2>`);
document.querySelectorAll('div>table').forEach(x=>x.parentNode.replaceWith(x));
document.querySelectorAll('img').forEach(el => el.remove());
document.querySelectorAll('p').forEach(x=>x.textContent.trim().length === 0 && x.remove());
```