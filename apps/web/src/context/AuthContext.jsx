// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { api, setToken } from "../api/klien.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [pengguna, setPengguna] = useState(null);
  const [siap, setSiap] = useState(false);

  // saat halaman dimuat ulang, pulihkan sesi dari cookie refreshToken
  useEffect(() => {
    api("/auth/refresh", { method: "POST" })
      .then((d) => { setToken(d.accessToken); setPengguna(d.pengguna); })
      .catch(() => {})
      .finally(() => setSiap(true));
  }, []);

  async function masuk(email, sandi) {
    const d = await api("/auth/masuk", { method: "POST", body: { email, sandi } });
    setToken(d.accessToken);
    setPengguna(d.pengguna);
    return d.pengguna;
  }

  async function keluar() {
    await api("/auth/keluar", { method: "POST" });
    setToken(null);
    setPengguna(null);
  }

  return (
    <AuthContext.Provider value={{ pengguna, siap, masuk, keluar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
