type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export const getAutomations = async (): Promise<AutomationAction[]> => {
  return [
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject"],
    },
    {
      id: "generate_report",
      label: "Generate Report",
      params: ["report", "recipient"],
    },
  ];
};

export const simulateWorkflow = async (workflow: any) => {
  const { nodes, edges } = workflow;

  const startNode = nodes.find(
    (n: any) => n.data?.nodeType === "start" || n.data?.type === "start"
  );
  if (!startNode) return { steps: ["No start node found"] };

  const steps: string[] = [];
  let current = startNode;

  while (current) {
    steps.push(current.data.label);

    const nextEdge = edges.find((e: any) => e.source === current.id);
    if (!nextEdge) break;

    current = nodes.find((n: any) => n.id === nextEdge.target);
  }

  return {
    steps: steps.map((s, i) => `Step ${i + 1}: ${s}`),
  };
};
