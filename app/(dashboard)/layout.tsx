import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ 
        padding: "16px 24px", 
        borderBottom: "1px solid var(--color-outline)", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        backgroundColor: "var(--color-surface)"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--color-primary)" }}>
          SecureGate
        </div>
        <LogoutButton />
      </header>
      <main style={{ flex: 1, padding: "24px" }}>
        {children}
      </main>
    </div>
  );
}
