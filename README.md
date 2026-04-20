# Workflow Builder

Live Demo: [Open Application](https://workflow-designer-silk.vercel.app/)

A visual workflow builder with dynamic forms, validation, and execution simulation.

---

## Features

- Add and connect nodes (Start, Task, Approval, Automated, End)
- Drag and reposition nodes on a canvas
- Dynamic configuration panel based on node type
- Delete individual nodes and clear entire workflow
- Workflow simulation with step-by-step execution
- Validation for missing Start and End nodes
- Visual execution highlighting during simulation
- Dark and light mode support

---

## Tech Stack

- React (Vite)
- TypeScript
- Zustand (state management)
- React Flow

---

## Architecture Overview

- Centralized state using Zustand
- Nodes and edges stored globally
- selectedNodeId avoids stale state issues
- Config panel derives data from store
- Simulation runs asynchronously with step-by-step updates

---

## How to Run Locally

```bash
npm install
npm run dev
```

## Usage

- Add nodes from the sidebar
- Connect nodes to define workflow order
- Click a node to edit its properties
- Run the workflow to simulate execution
- Use Clear All to reset the canvas

---

## Future Improvements

- Save and load workflows
- Export workflow as JSON
- Advanced validation for complex flows
- Improved execution logic
