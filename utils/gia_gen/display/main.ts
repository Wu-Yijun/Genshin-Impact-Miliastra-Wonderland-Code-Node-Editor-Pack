import { get_graph_client } from "../../../test.CI/gia_gen/graph_client";
import { get_graph_server } from "../../../test.CI/gia_gen/graph_server";
import { Graph } from "../interface";
import { GraphRenderer } from "./GraphRender";
import "./graph-style.css"; // 引入 CSS

const sleep = async (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000));

// 获取 DOM
const app = document.getElementById("app");

if (app) {
    // 初始化渲染器
    const renderer = new GraphRenderer(app);
    const graph = get_graph_server("ENTITY_NODE_GRAPH");

    
    graph.autoLayout();

    // 渲染
    renderer.render(graph);
    console.log("Graph rendered!");


    await sleep(3);

    console.log("Change Data");
    
    const graph2 = get_graph_client("SKILL_NODE_GRAPH");
    graph2.autoLayout();
    graph2.add_comment("This is a different graph from client.", 100,100);
    
    renderer.render(graph2);

    await sleep(5);


    graph.autoLayout({
        node_sep: 200,
    })
    graph.comments.keys().next().value!.content = "Graph can be updated and re-rendered."

    renderer.render(graph);
} else {
    console.error("Root element #app not found");
}