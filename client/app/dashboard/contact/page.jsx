import Link from "next/link";

export default function ContactPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff8e7", // cream background
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "#3b2f2f", // dark contrast text
          fontSize: "3rem",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          margin: "20px 0",
        }}
      >
        <Link
          href="https://www.linkedin.com/in/vansh-jain-82114b321/"
          target="_blank"
          style={{ color: "#3b2f2f", textDecoration: "none" }}
        >
          LinkedIn
        </Link>
      </h1>

      <h1
        style={{
          color: "#3b2f2f",
          fontSize: "3rem",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          margin: "20px 0",
        }}
      >
        <Link
          href="https://github.com/Vansh-ai12"
          target="_blank"
          style={{ color: "#3b2f2f", textDecoration: "none" }}
        >
          GitHub
        </Link>
      </h1>

      <h1
        style={{
          color: "#3b2f2f",
          fontSize: "3rem",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          margin: "20px 0",
          textAlign: "center",
        }}
      >
        Gmail: <span style={{ fontWeight: "normal" }}>vj2754108@gmail.com</span>
      </h1>
    </div>
  );
}

