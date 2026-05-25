"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/Button";

export function LogoutButton() {
  return (
    <Button 
      variant="secondary" 
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{ width: "auto", padding: "8px 16px" }}
    >
      Log Out
    </Button>
  );
}
