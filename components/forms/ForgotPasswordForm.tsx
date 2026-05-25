"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "@/lib/validations";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import styles from "./AuthForm.module.css";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "An error occurred");
      } else {
        setSuccess(result.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    const emailStr = getValues("email") || "";
    let emailProviderLink = "mailto:";
    
    if (emailStr.endsWith("@gmail.com")) {
      emailProviderLink = "https://mail.google.com";
    } else if (emailStr.endsWith("@outlook.com") || emailStr.endsWith("@hotmail.com") || emailStr.endsWith("@live.com")) {
      emailProviderLink = "https://outlook.live.com";
    } else if (emailStr.endsWith("@yahoo.com")) {
      emailProviderLink = "https://mail.yahoo.com";
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <p style={{ color: "var(--color-on-surface)", fontSize: "16px", lineHeight: "1.5", textAlign: "center" }}>
          {success}
        </p>
        <Button 
          onClick={() => window.open(emailProviderLink, "_blank")}
          style={{ width: "100%" }}
        >
          Go to Email
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className={styles.errorAlert}>
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className={styles.closeButton} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        id="forgot-email"
        placeholder="name@example.com"
        autoComplete="email"
        isValidated={touchedFields.email && !errors.email}
        {...register("email")}
        error={errors.email?.message}
      />

      <Button type="submit" id="forgot-submit" isLoading={isLoading} className={styles.submitBtn}>
        Send Reset Link
      </Button>
    </form>
  );
}
