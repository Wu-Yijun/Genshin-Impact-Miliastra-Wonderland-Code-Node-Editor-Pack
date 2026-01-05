import { TypedPinDef } from "../../node_data/core";
import { is_reflect, NodeType, stringify, type_equal } from "../../node_data/node_type";
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

// ================= 渲染器 =================

export class GraphRenderer {
    private viewport: HTMLElement;
    private world: HTMLElement; // 变换层
    private svgLayer: SVGSVGElement;
    private commentsLayer: HTMLElement; // 用于 Graph.comments

    // Tooltip 元素引用
    private tooltip: HTMLDivElement;

    // Panning State
    private translateX = 0;
    private translateY = 0;
    private isDragging = false;
    private lastMouseX = 0;
    private lastMouseY = 0;

    constructor(containerElement: HTMLElement) {
        this.viewport = containerElement;
        this.viewport.classList.add("graph-viewport");
        this.viewport.innerHTML = "";

        // 1. 创建世界层 (Transform Layer)
        this.world = document.createElement("div");
        this.world.classList.add("transform-layer");
        this.updateTransform();

        // 2. SVG 层 (z-index 0)
        this.svgLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgLayer.classList.add("graph-connections");

        // 3. 独立注释层 (z-index 5, 虽然同在 World 里, 但逻辑上分开)
        this.commentsLayer = document.createElement("div");

        // 组装 DOM
        this.world.appendChild(this.svgLayer);
        this.world.appendChild(this.commentsLayer);
        // Node 将直接 append 到 this.world (z-index 10)

        this.viewport.appendChild(this.world);

        // 初始化 Tooltip (挂载在 viewport 下，与 world 平级)
        this.tooltip = document.createElement("div");
        this.tooltip.classList.add("graph-tooltip");
        this.viewport.appendChild(this.tooltip);

        // 绑定拖拽事件
        this.setupInteraction();
    }

    private setupInteraction() {
        this.viewport.addEventListener("mousedown", (e) => {
            // 只有左键或中键点击背景才拖拽 (简单判断：点击的是 viewport 或 world)
            if (e.target === this.viewport || e.target === this.world || e.target === this.svgLayer) {
                this.isDragging = true;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            this.translateX += dx;
            this.translateY += dy;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.updateTransform();
        });

        window.addEventListener("mouseup", () => {
            this.isDragging = false;
        });
    }

    private updateTransform() {
        // 使用 translate3d 开启硬件加速
        this.world.style.transform = `translate3d(${this.translateX}px, ${this.translateY}px, 0)`;
    }

    // [新增 4] Tooltip 控制逻辑
    private showTooltip(node: Node, e: MouseEvent) {
        const escape_html = (raw: string): string => {
            return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        }
        // 格式化要显示的数据
        // 这里可以自定义你想看的任何深层数据
        const info: [any, any][] = Object.entries({
            Index: node.node_index,
            System: node.system,
            DefID: node.def.Identifier,
            Domain: node.def.Domain,
            Pos: `(${node.x}, ${node.y})`,
        });
        if (node.constraint) {
            info.push(['Constraints', undefined]);
            node.constraint.c.forEach(([k, v]) => {
                info.push(["   " + k, `${k} -> ${stringify(v)}`]);
            });
        }
        if (node.def.DataPins.find((p) => p.Direction === "In")) {
            info.push(['Inputs', undefined]);
            node.def.DataPins.filter((p) => p.Direction === "In").forEach((p) => {
                let label = p.Label?.en ?? p.Label?.["zh-Hans"];
                label = label === undefined ? "" : `(${label})`;
                let val = node.pin_values.get(p.Identifier) ?? "(unset)";
                let type = p.Type;
                let typename = stringify(type);
                let vp = node.variant_def?.DataPins.find((vp) => vp.Identifier === p.Identifier)?.Type;
                if (vp !== undefined && !type_equal(vp, type)) {
                    typename += " as " + stringify(vp);
                }
                info.push([
                    "   " + p.Identifier + label,
                    val + " as " + escape_html(typename)
                ]);
            });
        }
        if (node.def.DataPins.find((p) => p.Direction === "Out")) {
            info.push(['Outputs', undefined]);
            node.def.DataPins.filter((p) => p.Direction === "Out").forEach((p) => {
                let label = p.Label?.en ?? p.Label?.["zh-Hans"];
                label = label === undefined ? "" : `(${label})`;
                let val = node.pin_values.get(p.Identifier) ?? "(unset)";
                let type = p.Type;
                let typename = stringify(type);
                let vp = node.variant_def?.DataPins.find((vp) => vp.Identifier === p.Identifier)?.Type;
                if (vp !== undefined && !type_equal(vp, type)) {
                    typename += "(" + stringify(vp) + ")";
                }
                info.push([
                    "   " + p.Identifier + label,
                    val + " as " + escape_html(typename)
                ]);
            });
        }


        // 生成 HTML (简单的 JSON 高亮)
        const contentHtml = info.map(([k, v]) =>
            `<div><span class="key">${k}:</span> <span class="val">${v === undefined ? "" : JSON.stringify(v)}</span></div>`
        ).join("");

        this.tooltip.innerHTML = `<span class="title">${node.def.InGameName?.en || "Node"}</span>${contentHtml}`;

        this.tooltip.style.display = "block";
        this.moveTooltip(e); // 立即更新一次位置
    }

    private moveTooltip(e: MouseEvent) {
        // 让 Tooltip 跟随鼠标，并稍微偏移一点以免遮挡光标
        const offset = 15;
        let left = e.clientX + offset;
        let top = e.clientY + offset;

        // 简单的边界检测 (防止超出屏幕右边/底边)
        if (left + 200 > window.innerWidth) left = e.clientX - 210;
        if (top + 100 > window.innerHeight) top = e.clientY - 110;

        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
    }

    private hideTooltip() {
        this.tooltip.style.display = "none";
    }

    public render(graph: Graph) {
        // 清理旧内容 (保留 SVG 和 Comments 容器本身，清理内部)
        this.svgLayer.innerHTML = "";
        this.commentsLayer.innerHTML = "";
        // 清理旧节点: 移除 world 中所有 class 为 ue-node 的元素
        const oldNodes = this.world.querySelectorAll(".ue-node");
        oldNodes.forEach(n => n.remove());

        // 1. 渲染节点
        graph.nodes.forEach((node) => {
            this.renderNode(node);
        });

        // 2. 渲染 Graph 级注释 (独立浮动)
        if (graph.comments) {
            graph.comments.forEach(comment => this.renderGraphComment(comment));
        }

        // 3. 渲染连线 (需要等待 DOM 布局)
        // 这里的坐标计算现在变得简单了，因为 SVG 和 Node 都在同一个 World 坐标系下
        requestAnimationFrame(() => {
            this.updateConnections(graph);
        });
    }

    private renderNode(node: Node) {
        const el = document.createElement("div");
        el.classList.add("ue-node");
        // 直接使用 raw px，不进行缩放
        el.style.left = `${node.x}px`;
        el.style.top = `${node.y}px`;
        el.dataset.nodeIndex = node.node_index.toString();

        // 绑定鼠标悬浮事件
        el.addEventListener("mouseenter", (e) => this.showTooltip(node, e));
        el.addEventListener("mousemove", (e) => this.moveTooltip(e));
        el.addEventListener("mouseleave", () => this.hideTooltip());

        // --- Attached Comment (Node 上方的气泡) ---
        if (node.comment) {
            const commentEl = document.createElement("div");
            commentEl.classList.add("ue-node-comment-bubble");
            commentEl.innerText = node.comment.content;
            el.appendChild(commentEl);
        }

        // --- Header ---
        const header = document.createElement("div");
        header.classList.add("ue-node-header");
        const domainColor = DomainColors[node.def.Domain] || DomainColors["Default"];
        header.style.backgroundColor = domainColor;

        const title = document.createElement("span");
        title.classList.add("ue-node-title");
        title.innerText = node.def.InGameName?.en || node.def.Identifier;
        header.appendChild(title);
        el.appendChild(header);

        // --- Body ---
        const body = document.createElement("div");
        body.classList.add("ue-node-body");

        const leftCol = document.createElement("div");
        leftCol.classList.add("ue-column", "inputs");
        const rightCol = document.createElement("div");
        rightCol.classList.add("ue-column", "outputs");

        // Helper to create pins
        const appendPin = (pin: TypedPinDef, isFlow: boolean, container: HTMLElement) => {
            container.appendChild(this.createPinElement(node, pin, isFlow));
        };

        // Render Pins
        (node.variant_def ?? node.def).FlowPins.filter(p => p.Direction === "In").forEach(p => appendPin(p, true, leftCol));
        (node.variant_def ?? node.def).DataPins.filter(p => p.Direction === "In").forEach(p => appendPin(p, false, leftCol));

        (node.variant_def ?? node.def).FlowPins.filter(p => p.Direction === "Out").forEach(p => appendPin(p, true, rightCol));
        (node.variant_def ?? node.def).DataPins.filter(p => p.Direction === "Out").forEach(p => appendPin(p, false, rightCol));

        body.appendChild(leftCol);
        body.appendChild(rightCol);
        el.appendChild(body);

        this.world.appendChild(el);
    }

    private createPinElement(node: Node, pinDef: TypedPinDef, isFlow: boolean): HTMLElement {
        const row = document.createElement("div");
        row.classList.add("pin-row");
        const socketId = `socket-${node.node_index}-${pinDef.Identifier}`;

        const socket = document.createElement("div");
        socket.id = socketId;
        socket.classList.add("pin-socket");
        socket.classList.add(isFlow ? "flow" : "data");

        if (!isFlow) {
            socket.style.setProperty("--pin-color", getPinColor(pinDef.Type));
        }

        const label = document.createElement("span");
        label.classList.add("pin-label");
        label.innerText = pinDef.Label?.en || pinDef.Identifier;

        // Static Value Display
        let valueDisplay: HTMLElement | null = null;
        if (pinDef.Direction === "In" && !isFlow) {
            const isConnected = node.data_from.has(pinDef.Identifier);
            if (!isConnected && node.pin_values.has(pinDef.Identifier)) {
                const val = node.pin_values.get(pinDef.Identifier);
                valueDisplay = document.createElement("span");
                valueDisplay.classList.add("pin-value-static");
                valueDisplay.innerText = String(val);
            }
        }

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

    // --- Graph-level Comments ---
    private renderGraphComment(comment: Comment) {
        const el = document.createElement("div");
        el.classList.add("ue-comment-box");
        el.innerText = comment.content;

        // 直接使用 x, y (px)
        const x = comment.x || 0;
        const y = comment.y || 0;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        this.commentsLayer.appendChild(el);
    }

    // --- Connections ---
    private updateConnections(graph: Graph) {
        this.svgLayer.innerHTML = ""; // Clear

        // 关键修正：获取坐标时，需要减去 World 层的偏移，或者更简单：
        // 因为 SVG 是 World 的子元素，且 SVG overflow visible, width 0, height 0
        // 所以 SVG 内部的坐标 (100, 100) 就在 World 的 (100, 100) 位置。
        // 我们只需要算出 Socket 元素相对于 World 原点的位置。

        const worldRect = this.world.getBoundingClientRect();

        const getSocketPos = (nodeIndex: number, pinName: string) => {
            const id = `socket-${nodeIndex}-${pinName}`;
            const el = document.getElementById(id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            // 相对 World 左上角的坐标 = Socket屏幕坐标 - World屏幕坐标
            return {
                x: rect.left + rect.width / 2 - worldRect.left,
                y: rect.top + rect.height / 2 - worldRect.top
            };
        };

        const drawLine = (fromNode: Node, fromPin: string, toNode: Node, toPin: string, isFlow: boolean) => {
            const p1 = getSocketPos(fromNode.node_index, fromPin);
            const p2 = getSocketPos(toNode.node_index, toPin);

            if (!p1 || !p2) return;

            // 颜色逻辑
            let color = "#fff";
            if (!isFlow) {
                const pinDef = (fromNode.variant_def ?? fromNode.def).DataPins.find(p => p.Identifier === fromPin);
                if (pinDef) color = getPinColor(pinDef.Type);
            }

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            // 贝塞尔曲线
            const dist = Math.abs(p2.x - p1.x);
            const controlDist = Math.max(dist * 0.5, 50); // 稍微调整了平滑度

            const d = `M ${p1.x} ${p1.y} C ${p1.x + controlDist} ${p1.y}, ${p2.x - controlDist} ${p2.y}, ${p2.x} ${p2.y}`;



            path.setAttribute("d", d);
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", isFlow ? "5" : "2");
            path.setAttribute("fill", "none");
            this.svgLayer.appendChild(path);


            if (isFlow) {
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", d);
                path.setAttribute("stroke", "#aaaaaa");
                path.setAttribute("stroke-width", "3.5");
                path.setAttribute("fill", "none");
                this.svgLayer.appendChild(path);
            }
        };

        // 遍历绘制
        graph.nodes.forEach(node => {
            node.flow_to.forEach((conns, pinName) => {
                conns.forEach(conn => drawLine(node, pinName, conn.to, conn.to_pin.Identifier, true));
            });
            node.data_to.forEach((connSet, pinName) => {
                connSet.forEach(conn => drawLine(node, pinName, conn.to, conn.to_pin.Identifier, false));
            });
        });
    }
}