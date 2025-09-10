import { KindeAuth } from "@kinde-oss/kinde-auth-js";

export const auth = new KindeAuth({
  clientId: process.env.NEXT_PUBLIC_KINDE_CLIENT_ID,
  redirectUri:
    "https://krater-ndioeokdd-vansh-jains-projects-c99da508.vercel.app/api/auth/kindeauth",
  storage: "localStorage", // ← fixes state mismatch
  onRedirectCallback: (appState) => {
    window.location.href = appState?.targetUrl || "/dashboard";
  },
});
