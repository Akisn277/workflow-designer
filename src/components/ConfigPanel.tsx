import { useEffect, useState } from "react";
import { getAutomations } from "../api/mockApi";
import { useWorkflowStore } from "../store/workflowStore";

type Props = {
  theme: "dark" | "light";
};

type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export default function ConfigPanel({ theme }: Props) {
  const { nodes, selectedNodeId, updateNode, deleteNode } = useWorkflowStore();
  const [actions, setActions] = useState<AutomationAction[]>([]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  useEffect(() => {
    getAutomations().then(setActions);
  }, []);

  if (!selectedNode) {
    return (
      <div style={{ padding: 16, color: "#94a3b8" }}>
        Select a node
      </div>
    );
  }

  const type = selectedNode.data?.nodeType;

  const assigneeOptions = ["Alice", "Bob", "Charlie", "Diana"];

  const panelBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const textColor = theme === "dark" ? "white" : "#0f172a";

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    marginBottom: "12px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "white",
  };

  return (
    <div
      style={{
        width: 260,
        padding: 14,
        background: panelBg,
        color: textColor,
        height: "100%",
        borderLeft: "1px solid #1e293b",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>Edit Node</h3>

      <div style={{ marginBottom: 10, color: theme === "dark" ? "#94a3b8" : "#475569" }}>
        {selectedNode.data?.label || "Selected node"}
      </div>

      <input
        style={inputStyle}
        value={selectedNode.data?.label || ""}
        onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
        placeholder="Label"
      />

      {type === "task" && (
        <>
          <select
            style={inputStyle}
            value={selectedNode.data?.assignee || ""}
            onChange={(e) =>
              updateNode(selectedNode.id, { assignee: e.target.value })
            }
          >
            <option value="">Assign To</option>
            {assigneeOptions.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </>
      )}

      {type === "approval" && (
        <>
          <input
            style={inputStyle}
            placeholder="Approver Role"
            value={selectedNode.data?.role || ""}
            onChange={(e) =>
              updateNode(selectedNode.id, { role: e.target.value })
            }
          />
        </>
      )}

      {type === "automated" && (
        <>
          <select
            style={inputStyle}
            value={selectedNode.data?.action || ""}
            onChange={(e) =>
              updateNode(selectedNode.id, { action: e.target.value })
            }
          >
            <option value="">Select Action</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>

          {actions
            .find((action) => action.id === selectedNode.data?.action)
            ?.params.map((param) => (
              <input
                key={param}
                style={inputStyle}
                placeholder={param}
                value={selectedNode.data?.[param] || ""}
                onChange={(e) =>
                  updateNode(selectedNode.id, {
                    [param]: e.target.value,
                  })
                }
              />
            ))}
        </>
      )}

      <button
        onClick={() => {
          if (confirm("Delete this node?")) {
            deleteNode(selectedNode.id);
          }
        }}
        style={{
          marginTop: 14,
          width: "100%",
          padding: "9px",
          background: "#b91c1c",
          border: "1px solid #7f1d1d",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Delete Node
      </button>
    </div>
  );
}