import { useState } from "react";
import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const bg = theme === "dark" ? "#020617" : "#f1f5f9";
  const color = theme === "dark" ? "white" : "black";

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: bg,
        color,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div style={{ flex: 1 }}>
        <Canvas theme={theme} />
      </div>
    </div>
  );
}