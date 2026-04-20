Workflow Builder

A web-based workflow editor that allows users to visually create, configure, and simulate business workflows using a node-based interface.

Features
Drag-and-drop style node creation (Start, Task, Approval, Automated, End)
Connect nodes to define workflow logic
Dynamic configuration panel based on node type
Task: assign user
Approval: define role
Automated: configure email details
Delete individual nodes and clear entire workflow
Workflow simulation with step-by-step execution
Validation for missing Start/End nodes
Visual execution highlighting
Dark and light mode support
Tech Stack
React (Vite)
TypeScript
Zustand (state management)
React Flow (graph rendering)
Architecture Overview
Global state managed using Zustand
Nodes and edges stored centrally
selectedNodeId used to avoid stale state issues
Config panel derives node data from store
Simulation runs asynchronously and updates UI step-by-step
How to Run
npm install
npm run dev

Open http://localhost:5173
 in your browser.

Usage
Add nodes from the left sidebar
Connect nodes by dragging edges
Click a node to edit its properties on the right panel
Run the workflow using the "Run Workflow" button
Use "Clear All" to reset the canvas
Notes
Automated nodes simulate an API call
Execution order is based on defined connections
UI is designed for clarity and ease of use
Future Improvements
Save/load workflows
Export workflow as JSON
Enhanced validation for complex flows
Role-based execution logic
