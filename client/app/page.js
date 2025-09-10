import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fdfcf7, #f7f3e9)", // soft cream gradient
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Auth Buttons */}
      {!isUserAuthenticated ? (
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          <li>
            <LoginLink className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md hover:scale-105 transition">
              Login
            </LoginLink>
          </li>
          <li>
            <RegisterLink className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-md hover:scale-105 transition">
              Sign Up
            </RegisterLink>
          </li>
        </ul>
      ) : (
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          <li>
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <LogoutLink className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-medium shadow-md hover:scale-105 transition">
              Logout
            </LogoutLink>
          </li>
        </ul>
      )}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        {/* Krater Title */}
        <h1
          style={{
            fontSize: "6rem",
            fontWeight: "900",
            color: "#000000", // Black
            textShadow: "3px 3px 10px rgba(0,0,0,0.2)",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "6px",
          }}
        >
          KRATER
        </h1>

        {/* Start Coding Subtitle */}
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#b026ff", // Neon purple
            marginTop: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textShadow: "0 0 20px rgba(176,38,255,0.6)", // glow effect
          }}
        >
          Start Coding!!!
        </h2>
      </div>
    </div>
  );
}
