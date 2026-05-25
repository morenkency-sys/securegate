"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PasswordStrength } from "../ui/PasswordStrength";
import styles from "./AuthForm.module.css";
import layoutStyles from "@/app/(auth)/layout.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "An error occurred");
      } else {
        setSuccess("Account created! Please check your email to verify your account.");
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
        <div className={layoutStyles.formHeader} style={{ marginBottom: "0" }}>
          <h1 className={layoutStyles.formTitle}>Account created!</h1>
          <p className={layoutStyles.formSubtitle}>
            Please check your email to verify your account.
          </p>
        </div>
        <Button 
          onClick={() => window.open(emailProviderLink, "_blank")}
          style={{ width: "100%" }}
        >
          Go to Email
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link href="/login" className={styles.link} style={{ fontSize: "14px", color: "var(--color-primary)", fontWeight: 600 }}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={layoutStyles.formHeader}>
        <h1 className={layoutStyles.formTitle}>Create an account</h1>
        <p className={layoutStyles.formSubtitle}>
          Already have an account?{" "}
          <Link href="/login">Log In</Link>
        </p>
      </div>
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
          label="Full Name"
          type="text"
          id="signup-name"
          placeholder="John Doe"
          autoComplete="name"
          isValidated={touchedFields.name && !errors.name}
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email Address"
          type="email"
          id="signup-email"
          placeholder="name@example.com"
          autoComplete="email"
          isValidated={touchedFields.email && !errors.email}
          {...register("email")}
          error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        id="signup-password"
        placeholder="••••••••"
        autoComplete="new-password"
        isValidated={touchedFields.password && !errors.password}
        {...register("password")}
        error={errors.password && watch("password")?.length === 0 ? "Field cannot be empty" : undefined}
      />
      <PasswordStrength password={watch("password")} />

      <Button type="submit" id="signup-submit" isLoading={isLoading} className={styles.submitBtn}>
        Create Account
      </Button>
    </form>
    </>
  );
}
