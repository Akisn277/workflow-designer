type Props = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export default function Navbar({ theme, toggleTheme }: Props) {
  return (
    <div
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: theme === "dark" ? "#020617" : "#f8fafc",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 600,
          color: theme === "dark" ? "white" : "#0f172a",
        }}
      >
        Workflow Builder
      </h2>

      <button
        onClick={toggleTheme}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: theme === "dark" ? "#1e293b" : "#e2e8f0",
          color: theme === "dark" ? "white" : "#0f172a",
        }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
