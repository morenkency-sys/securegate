"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validations";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import styles from "./AuthForm.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "CredentialsSignin" ? "Invalid credentials" : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [showResetSuccess, setShowResetSuccess] = useState(searchParams.get("reset") === "success");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    setShowResetSuccess(false); // Hide success message on new submit
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password.");
        } else {
          setError(result.error);
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onFocus={() => setError(null)}>
      {showResetSuccess && !error && (
        <div className={styles.successAlertGreen}>
          <span>Password reset successfully. You can now log in.</span>
          <button type="button" onClick={() => setShowResetSuccess(false)} className={styles.closeButton} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
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
        id="login-email"
        placeholder="name@example.com"
        autoComplete="email"
        isValidated={touchedFields.email && !errors.email}
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        id="login-password"
        placeholder="••••••••"
        autoComplete="current-password"
        isValidated={touchedFields.password && !errors.password}
        {...register("password")}
        error={errors.password?.message}
      />

      <div className={styles.forgotLink}>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>

      <Button type="submit" id="login-submit" isLoading={isLoading} className={styles.submitBtn}>
        Log In
      </Button>
    </form>
  );
}
