// src/components/RuteTerlindungi.jsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function RuteTerlindungi({ peran }) {
  const { pengguna, siap } = useAuth();
  const lokasi = useLocation();
  if (!siap) return null;                      // tunggu pemulihan sesi
  if (!pengguna) return <Navigate to="/masuk" state={{ dari: lokasi }} replace />;
  if (peran && !peran.includes(pengguna.peran)) return <p className="kosong">Anda tidak memiliki akses ke halaman ini.</p>;
  return <Outlet />;
}
