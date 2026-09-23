// context/AuthContext.jsx
"use client"; // wajib di Next.js karena memakai state; di Vite baris ini diabaikan
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesi, setSesi] = useState(null);   // { accessToken, pengguna } dari /api/auth/masuk
  const masuk = (data) => setSesi(data);
  const keluar = () => setSesi(null);
  return (
    <AuthContext.Provider value={{ pengguna: sesi?.pengguna ?? null, token: sesi?.accessToken ?? null, masuk, keluar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {                // custom hook
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
