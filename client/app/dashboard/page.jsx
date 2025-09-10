export default function DashboardPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fdfcf7, #f7f3e9)", // soft cream gradient
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Dashboard Title */}
      <h1
        style={{
          color: "#000000", // black for cream background
          fontSize: "4rem",
          fontWeight: "800",
          letterSpacing: "4px",
          textTransform: "uppercase",
          textShadow: "2px 2px 6px rgba(0,0,0,0.1)", // subtle depth
          fontFamily: "'Orbitron', sans-serif", // futuristic font
          marginBottom: "15px",
        }}
      >
        Dashboard
      </h1>

      {/* Subtitle */}
      <h2
        style={{
          color: "#333333", // dark gray for readability
          fontSize: "1.5rem",
          fontWeight: "400",
          letterSpacing: "1px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Welcome back 👋 
      </h2>
    </div>
  );
}
