import { Graph } from "../interface";
import { GraphRenderer } from "./GraphRender";
import { get_graph_server } from "./gen";
import "./graph-style.css"; // 引入 CSS

const sleep = async (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000));

// 获取 DOM
const app = document.getElementById("app");

if (app) {
    // 初始化渲染器
    const renderer = new GraphRenderer(app);
    const graph = get_graph_server();
    
    graph.autoLayout();

    // 渲染
    renderer.render(graph);
    console.log("Graph rendered!");


    await sleep(5);

    console.log("Change Data");

    graph.autoLayout({
        node_sep: 200,
    })
    graph.comments.keys().next().value!.content = "Graph can be updated and re-rendered."

    renderer.render(graph);
} else {
    console.error("Root element #app not found");
}