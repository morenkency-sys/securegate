"use client";

import { signOut } from "next-auth/react";

export function SignOutLink() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{ 
        color: "var(--color-primary)", 
        fontWeight: 600, 
        textDecoration: "none",
        fontSize: "14px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0
      }}
    >
      Back to Login
    </button>
  );
}
