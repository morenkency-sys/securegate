"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "@/components/forms/AuthForm.module.css";

export function VerifyEmailClient({ token }: { token?: string }) {
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (tokenStr: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenStr }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.error || "Verification failed");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
      setStatus("error");
    }
  };

  const [email, setEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resendMsg, setResendMsg] = useState("");

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendStatus("loading");
    setResendMsg("");
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) {
        setResendMsg(result.error || "Failed to resend");
        setResendStatus("error");
      } else {
        setResendMsg(result.message);
        setResendStatus("success");
      }
    } catch {
      setResendMsg("An unexpected error occurred.");
      setResendStatus("error");
    }
  };

  if (status === "loading") {
    return <div style={{ textAlign: "center", padding: "20px" }}>Verifying your email...</div>;
  }

  if (status === "success") {
    return (
      <div className={styles.form} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p style={{ color: "var(--color-on-surface)", fontSize: "16px", lineHeight: "1.5" }}>
          Email verified successfully!
        </p>
        <Button onClick={() => router.push("/login")} style={{ width: "100%" }}>
          Go to Login
        </Button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.form}>
        {errorMsg && (
          <div className={styles.errorAlert}>
            <span>{errorMsg}</span>
            <button type="button" onClick={() => setErrorMsg("")} className={styles.closeButton} aria-label="Dismiss">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        
        {resendStatus === "success" ? (
          <div className={styles.successAlert}>{resendMsg}</div>
        ) : (
          <form onSubmit={handleResend} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            <p style={{ fontSize: "14px", color: "var(--color-on-surface-variant)" }}>
              Need a new link? Enter your email address to request another verification email.
            </p>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid var(--color-outline)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-on-surface)",
                fontFamily: "var(--typography-body-medium-font-family)",
                fontSize: "var(--typography-body-medium-font-size)",
                width: "100%",
                outline: "none"
              }}
            />
            <Button type="submit" isLoading={resendStatus === "loading"}>
              Resend Verification Link
            </Button>
            {resendStatus === "error" && <div className={styles.errorAlert} style={{marginTop: "8px"}}>{resendMsg}</div>}
          </form>
        )}

        <div className={styles.footer} style={{ marginTop: "24px" }}>
          <Link href="/login" className={styles.link}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.form} style={{ textAlign: "center" }}>
      <p style={{ marginBottom: "16px" }}>Please check your email for the verification link.</p>
      <div className={styles.footer}>
        <Link href="/login" className={styles.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
