import { useState } from "react";
import { useWorkflowStore } from "../store/workflowStore";
import { simulateWorkflow } from "../api/mockApi";

type Props = {
  theme: "dark" | "light";
  setActiveNodeId: (id: string | null) => void;
};

export default function SimulatorPanel({ theme, setActiveNodeId }: Props) {
  const { nodes, edges } = useWorkflowStore();
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");

  const panelBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const textColor = theme === "dark" ? "white" : "#0f172a";

  const validateWorkflow = () => {
    const hasStart = nodes.some((n) => n.data?.nodeType === "start");
    const hasEnd = nodes.some((n) => n.data?.nodeType === "end");

    if (!hasStart) return "Missing Start node";
    if (!hasEnd) return "Missing End node";

    return null;
  };

  const runSimulation = async () => {
    const validationError = validateWorkflow();

    if (validationError) {
      setError(validationError);
      setActiveNodeId(null);
      return;
    }

    setError("");
    setResult([]);

    const workflow = { nodes, edges };
    const res = await simulateWorkflow(workflow);

    for (let i = 0; i < res.steps.length; i += 1) {
      const step = res.steps[i];

      setResult((prev) => [...prev, step]);

      const nodeLabel = step.split(": ")[1];
      const node = nodes.find((n) => n.data?.label === nodeLabel);

      if (node) {
        setActiveNodeId(node.id);
      }

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 800);
      });
    }

    setActiveNodeId(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        zIndex: 5,
        background: panelBg,
        padding: 16,
        borderRadius: "12px",
        border: theme === "dark" ? "1px solid #1e293b" : "1px solid #cbd5e1",
        width: 260,
      }}
    >
      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          color: textColor,
          cursor: "pointer",
        }}
        onClick={runSimulation}
      >
        Run Workflow
      </button>

      {error && (
        <div style={{ color: "#f87171", marginTop: 10 }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        {result.map((step, i) => (
          <div
            key={i}
            style={{
              padding: "6px 10px",
              marginBottom: 6,
              background: theme === "dark" ? "#1e293b" : "#e2e8f0",
              borderRadius: "6px",
              fontSize: 14,
              color: textColor,
            }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
