// src/api/klien.js
const BASE = import.meta.env.VITE_API_URL ?? "/api";
let tokenAkses = null;
export const setToken = (t) => { tokenAkses = t; };

export async function api(path, { method = "GET", body, ulang = true } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include",
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(tokenAkses && { Authorization: `Bearer ${tokenAkses}` }),
    },
    body: body && JSON.stringify(body),
  });

  if (res.status === 401 && ulang && !path.startsWith("/auth/")) {
    const r = await fetch(`${BASE}/auth/refresh`, { method: "POST", credentials: "include" });
    if (r.ok) {
      setToken((await r.json()).accessToken);
      return api(path, { method, body, ulang: false });
    }
  }
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data.pesan), { status: res.status, detail: data.galat });
  return data;
}
