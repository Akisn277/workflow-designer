import type { CSSProperties } from "react";
import { useWorkflowStore } from "../store/workflowStore";

type Props = {
  onAdd: (type: string) => void;
  theme: "dark" | "light";
};

export default function Sidebar({ onAdd, theme }: Props) {
  const { clearWorkflow } = useWorkflowStore();
  const panelBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const textColor = theme === "dark" ? "white" : "#0f172a";

  const btnStyle: CSSProperties = {
    width: "110%",
    marginLeft: "-10%",
    padding: "10px",
    marginBottom: "10px",
    background: "linear-gradient(135deg, #1e293b, #111827)",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: panelBg,
        padding: 16,
      }}
    >
      <h2 style={{ marginBottom: 16, color: textColor }}>Nodes</h2>

      <button
        style={btnStyle}
        onClick={() => onAdd("start")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)";
        }}
      >
        Start
      </button>

      <button
        style={btnStyle}
        onClick={() => onAdd("task")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)";
        }}
      >
        Task
      </button>

      <button
        style={btnStyle}
        onClick={() => onAdd("approval")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)";
        }}
      >
        Approval
      </button>

      <button
        style={btnStyle}
        onClick={() => onAdd("automated")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)";
        }}
      >
        Automated
      </button>

      <button
        style={btnStyle}
        onClick={() => onAdd("end")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)";
        }}
      >
        End
      </button>

      <button
        onClick={() => {
          if (confirm("Clear entire workflow?")) {
            clearWorkflow();
          }
        }}
        style={{
          width: "100%",
          padding: "9px",
          marginTop: "12px",
          background: "#b91c1c",
          color: "white",
          border: "1px solid #7f1d1d",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Clear All
      </button>
    </div>
  );
}