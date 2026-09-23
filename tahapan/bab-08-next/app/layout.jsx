// app/layout.jsx
import { AuthProvider } from "../context/AuthContext";

export const metadata = { title: "PerpusKu" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
