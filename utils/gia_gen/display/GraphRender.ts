import { TypedPinDef } from "../../node_data/core";
import { NodeType, stringify } from "../../node_data/node_type";
import type { Graph, Node, Connection, Comment } from "../interface";

// ==========================================
// 1. 配置 & 颜色映射
// ==========================================

// 节点 Domain 对应的标题栏颜色 (6种)
const DomainColors: Record<string, string> = {
    "Combat": "rgba(180, 50, 50, 0.8)",  // 红
    "Logic": "rgba(255, 255, 255, 0.8)", // 白/灰
    "Math": "rgba(50, 180, 150, 0.8)",  // 青绿
    "Variable": "rgba(150, 50, 180, 0.8)",// 紫
    "Event": "rgba(180, 50, 50, 0.8)",   // 红 (事件)
    "Default": "rgba(50, 100, 200, 0.8)", // 蓝
};

// 基础颜色表 (14种基础色)
const BaseColors = {
    Bol: "#920101", // 深红
    Int: "#22cc99", // 青色
    Flt: "#33ff33", // 绿色
    Str: "#ff00ff", // 洋红
    Vec: "#ffcc00", // 黄色
    Ety: "#ffffff",// 白
    Fct: "#0099ff", // 蓝色
    Cfg: "#0099ff", // 蓝色
    Pfb: "#5500ff", // 深紫
    Gid: "#5500ff", // 深紫
    Loc: "#000000", // 黑色
    Vss: "#7f7f7f", // 灰色
    Enum: "#9999ff", // 浅蓝
    Struct: "#004488", // 深蓝结构体
    List: "#ff6600",// 橙色
    Dict: "#ccaa00", // 金色
    Unk: "#ff3333", // 红色
};

/**
 * 根据 NodeType 获取颜色
 * 这里简单实现了一个映射，实际可根据 type 字符串匹配
 */
function getPinColor(t: NodeType): string {
    function Lighter(color: string): string {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r},${g},${b},0.6)`;
    }
    switch (t.t) {
        case "b":
            return BaseColors[t.b]
        case "e":
            return BaseColors.Enum;
        case "l":
            return Lighter(BaseColors[((t.i as any).b ?? "") as "List"] ?? BaseColors.List);
        case "s":
            return BaseColors.Struct;
        case "d":
            return BaseColors.Dict;
    }
    return BaseColors.Unk;
}

// ==========================================
// 2. 渲染器类
// ==========================================

export class GraphRenderer {
    private container: HTMLElement;
    private svgLayer: SVGSVGElement;
    private nodeLayer: HTMLDivElement;
    private commentLayer: HTMLDivElement;

    constructor(containerElement: HTMLElement) {
        this.container = containerElement;
        this.container.classList.add("graph-container");
        this.container.innerHTML = ""; // 清空

        // 初始化层级
        this.svgLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgLayer.classList.add("graph-connections");

        this.commentLayer = document.createElement("div");

        this.nodeLayer = document.createElement("div");

        this.container.appendChild(this.svgLayer);
        this.container.appendChild(this.commentLayer);
        this.container.appendChild(this.nodeLayer);
    }

    /**
     * 主入口：渲染图表
     */
    public render(graph: Graph) {
        // 1. 渲染所有节点 (HTML)
        graph.nodes.forEach((node) => {
            this.renderNode(node);
        });

        // 2. 渲染注释 (HTML)
        if (graph.comments) {
            graph.comments.forEach(comment => this.renderComment(comment));
        }

        // 3. 渲染连线 (SVG)
        // 必须等 DOM 渲染完成后再计算位置，这里使用 setTimeout 0 这里的技巧
        // 或者因为是同步操作，appendChild 后通常可以直接获取布局，除非有异步加载资源
        // 这里假设是同步的，直接计算
        this.updateConnections(graph);
    }

    // --- Node Rendering ---

    private renderNode(node: Node) {
        const el = document.createElement("div");
        el.classList.add("ue-node");
        el.style.left = `${node.x}px`;
        el.style.top = `${node.y}px`;
        // 设置 ID 方便连线查找
        el.dataset.nodeIndex = node.node_index.toString();

        // Header
        const header = document.createElement("div");
        header.classList.add("ue-node-header");
        const domainColor = DomainColors[node.def.Domain] || DomainColors["Default"];
        header.style.backgroundColor = domainColor;

        const title = document.createElement("span");
        title.classList.add("ue-node-title");
        // 优先显示 InGameName，否则 fallback
        title.innerText = node.def.InGameName?.en || node.def.Identifier || `Node ${node.node_index}`;
        header.appendChild(title);
        el.appendChild(header);

        // Body
        const body = document.createElement("div");
        body.classList.add("ue-node-body");

        const leftCol = document.createElement("div");
        leftCol.classList.add("ue-column", "inputs");

        const rightCol = document.createElement("div");
        rightCol.classList.add("ue-column", "outputs");

        // Pins Generation
        // Order: Flow Inputs -> Data Inputs -> Flow Outputs -> Data Outputs

        // 1. Flow In
        node.def.FlowPins.filter(p => p.Direction === "In").forEach(p =>
            leftCol.appendChild(this.createPinElement(node, p, true))
        );
        // 2. Data In
        node.def.DataPins.filter(p => p.Direction === "In").forEach(p =>
            leftCol.appendChild(this.createPinElement(node, p, false))
        );

        // 3. Flow Out
        node.def.FlowPins.filter(p => p.Direction === "Out").forEach(p =>
            rightCol.appendChild(this.createPinElement(node, p, true))
        );
        // 4. Data Out
        node.def.DataPins.filter(p => p.Direction === "Out").forEach(p =>
            rightCol.appendChild(this.createPinElement(node, p, false))
        );

        body.appendChild(leftCol);
        body.appendChild(rightCol);
        el.appendChild(body);

        this.nodeLayer.appendChild(el);
    }

    private createPinElement(node: Node, pinDef: TypedPinDef, isFlow: boolean): HTMLElement {
        const row = document.createElement("div");
        row.classList.add("pin-row");
        // 标记 Socket 元素 ID 用于连线坐标计算
        // 格式: socket-{nodeIndex}-{pinName}
        const socketId = `socket-${node.node_index}-${pinDef.Identifier}`;

        const socket = document.createElement("div");
        socket.id = socketId;
        socket.classList.add("pin-socket");
        socket.classList.add(isFlow ? "flow" : "data");

        // 颜色处理
        if (!isFlow) {
            socket.style.setProperty("--pin-color", getPinColor(pinDef.Type));
        }

        const label = document.createElement("span");
        label.classList.add("pin-label");
        label.innerText = pinDef.Label?.en || pinDef.Identifier;

        // 静态值展示逻辑:
        // 如果是输入引脚(In) 且 Data引脚 且 没有连线(data_from中找不到该key)
        // 且 pin_values 中有值，则显示值
        let valueDisplay: HTMLElement | null = null;
        if (pinDef.Direction === "In" && !isFlow) {
            const isConnected = node.data_from.has(pinDef.Identifier);
            if (!isConnected && node.pin_values.has(pinDef.Identifier)) {
                const val = node.pin_values.get(pinDef.Identifier);
                valueDisplay = document.createElement("span");
                valueDisplay.classList.add("pin-value-static");
                // 简单转字符串展示
                valueDisplay.innerText = String(val);
            }
        }

        // 布局顺序：Input [Socket Label Value], Output [Label Socket]
        if (pinDef.Direction === "In") {
            row.appendChild(socket);
            row.appendChild(label);
            if (valueDisplay) row.appendChild(valueDisplay);
        } else {
            row.appendChild(label);
            row.appendChild(socket);
        }

        return row;
    }

    // --- Comment Rendering ---

    private renderComment(comment: Comment) {
        const el = document.createElement("div");
        el.classList.add("ue-comment");
        el.innerText = comment.content;

        let x = comment.x || 0;
        let y = comment.y || 0;

        // 如果依附于节点，叠加坐标
        if (comment.attached_node) {
            x += comment.attached_node.x;
            y += comment.attached_node.y - 30; // 简单地放在节点上方
        }

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        this.commentLayer.appendChild(el);
    }

    // --- Connection Rendering ---

    private updateConnections(graph: Graph) {
        // 必须清空旧连线如果重绘
        this.svgLayer.innerHTML = "";

        // 我们需要 SVG 容器的 offset，以便将页面绝对坐标转换为 SVG 内部坐标
        // 但由于 .graph-container 是 relative 且 svg 是 absolute(0,0)，
        // getBoundingClientRect 应该可以直接做减法。
        const containerRect = this.container.getBoundingClientRect();

        // 辅助函数：获取 Socket 中心坐标 relative to container
        const getSocketPos = (nodeIndex: number, pinName: string) => {
            const id = `socket-${nodeIndex}-${pinName}`;
            const el = document.getElementById(id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - containerRect.left + this.container.scrollLeft,
                y: rect.top + rect.height / 2 - containerRect.top + this.container.scrollTop
            };
        };

        // 绘制连线的函数
        const drawLine = (fromNode: Node, fromPin: string, toNode: Node, toPin: string, isFlow: boolean) => {
            const p1 = getSocketPos(fromNode.node_index, fromPin);
            const p2 = getSocketPos(toNode.node_index, toPin);

            if (!p1 || !p2) {
                console.warn(`Missing socket element for connection: ${fromNode.node_index}:${fromPin} -> ${toNode.node_index}:${toPin}`);
                return;
            }

            // 颜色
            let color = "#fff"; // Flow default
            if (!isFlow) {
                // 查找 output pin 的类型定义来决定颜色
                const pinDef = fromNode.def.DataPins.find(p => p.Identifier === fromPin);
                if (pinDef) {
                    color = getPinColor(pinDef.Type);
                }
            }

            // 创建 SVG Path
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            // 贝塞尔曲线逻辑 (Unreal 风格)
            // 控制点通常水平延伸
            const curvature = 0.5; // 弯曲力度
            const dist = Math.abs(p2.x - p1.x);
            // 最小控制点距离，避免太近时线扭曲
            const controlDist = Math.max(dist * curvature, 30);

            const cp1 = { x: p1.x + controlDist, y: p1.y };
            const cp2 = { x: p2.x - controlDist, y: p2.y };

            const d = `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;

            path.setAttribute("d", d);
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", isFlow ? "3" : "2"); // Flow 线粗一点
            path.setAttribute("fill", "none");

            // 如果是 Flow 线，可能需要虚线效果或者特定的样式，这里保持实线

            this.svgLayer.appendChild(path);
        };

        // 遍历所有节点，绘制所有 Out 连线
        graph.nodes.forEach(node => {
            // 1. Flow Connections (Map<string, Connection[]>)
            node.flow_to.forEach((conns, pinName) => {
                conns.forEach(conn => {
                    drawLine(node, pinName, conn.to, conn.to_pin.Identifier, true);
                });
            });

            // 2. Data Connections (Map<string, Set<Connection>>)
            node.data_to.forEach((connSet, pinName) => {
                connSet.forEach(conn => {
                    drawLine(node, pinName, conn.to, conn.to_pin.Identifier, false);
                });
            });
        });
    }
}