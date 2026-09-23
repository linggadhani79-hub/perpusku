// app/masuk/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Masuk() {
  const { masuk } = useAuth();
  const router = useRouter();
  const [galat, setGalat] = useState("");

  async function kirim(formData) {
    const res = await fetch("/api/auth/masuk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email"), sandi: formData.get("sandi") }),
    });
    const data = await res.json();
    if (!res.ok) return setGalat(data.pesan);
    masuk(data);
    router.push("/katalog");
  }

  return (
    <form action={kirim}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="sandi" type="password" placeholder="Kata sandi" required />
      <button type="submit">Masuk</button>
      {galat && <p role="alert">{galat}</p>}
    </form>
  );
}
