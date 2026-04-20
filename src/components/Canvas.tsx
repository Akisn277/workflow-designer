import { createContext, useContext, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
} from "reactflow";
import type { Connection, NodeChange, NodeProps } from "reactflow";
import "reactflow/dist/style.css";

import ConfigPanel from "./ConfigPanel";
import SimulatorPanel from "./SimulatorPanel";
import Sidebar from "./Sidebar";
import { useWorkflowStore } from "../store/workflowStore";

type CanvasNodeData = {
  label?: string;
  nodeType?: string;
};

const colors: Record<string, string> = {
  start: "#22c55e",
  task: "#3b82f6",
  approval: "#f59e0b",
  automated: "#8b5cf6",
  end: "#ef4444",
};

const ActiveNodeContext = createContext<string | null>(null);

const DefaultNode = ({ data, id, selected }: NodeProps<CanvasNodeData>) => {
  const activeNodeId = useContext(ActiveNodeContext);
  const isActive = id === activeNodeId;

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "12px",
        background: "#1e293b",
        border: isActive
          ? "2px solid #22c55e"
          : selected
            ? "2px solid #60a5fa"
            : `2px solid ${colors[data.nodeType || ""] || "#334155"}`,
        color: "white",
        minWidth: 120,
        textAlign: "center",
        fontWeight: 500,
        boxShadow: isActive
          ? "0 0 20px rgba(34,197,94,0.7)"
          : selected
            ? "0 0 15px rgba(96,165,250,0.5)"
            : "0 4px 10px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  default: DefaultNode,
};

type Props = {
  theme: "dark" | "light";
};

export default function Canvas({ theme }: Props) {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNode,
  } = useWorkflowStore();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const onConnect = (params: Connection) => {
    setEdges(addEdge(params, edges));
  };

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const addNode = (type: string) => {
    const id = Date.now().toString();

    const newNode = {
      id,
      type: "default",
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        nodeType: type,
        label: type,
      },
    };

    setNodes([...nodes, newNode]);
  };

  const canvasBg = theme === "dark" ? "#020617" : "#e2e8f0";

  const sidePanelBg = theme === "dark" ? "#0f172a" : "#ffffff";

  const sidePanelBorder = theme === "dark" ? "1px solid #1e293b" : "1px solid #cbd5e1";

  return (
    <div style={{ height: "100%", width: "100%", display: "flex" }}>
      <div
        style={{
          width: 240,
          height: "100%",
          zIndex: 2,
          background: sidePanelBg,
          borderRight: sidePanelBorder,
        }}
      >
        <Sidebar onAdd={addNode} theme={theme} />
      </div>

      <div
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: canvasBg,
        }}
      >
        <ActiveNodeContext.Provider value={activeNodeId}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges.map((e) => ({
                ...e,
                type: "smoothstep",
                animated: true,
              }))}
              fitView
              snapToGrid
              snapGrid={[20, 20]}
              nodeTypes={nodeTypes}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onNodeClick={(_, node) => {
                setSelectedNode(node.id);
              }}
            >
              <MiniMap />
              <Controls position="bottom-right" />
              <Background
                gap={16}
                size={1}
                color={theme === "dark" ? "#334155" : "#94a3b8"}
              />
            </ReactFlow>
          </ReactFlowProvider>
        </ActiveNodeContext.Provider>

        <SimulatorPanel theme={theme} setActiveNodeId={setActiveNodeId} />
      </div>

      <div
        style={{
          width: 260,
          height: "100%",
          background: sidePanelBg,
          borderLeft: sidePanelBorder,
        }}
      >
        <ConfigPanel theme={theme} />
      </div>
    </div>
  );
}