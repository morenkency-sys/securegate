import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SecureGate",
  description: "Production-grade authentication system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
