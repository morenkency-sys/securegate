"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PasswordStrength } from "../ui/PasswordStrength";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/navigation";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
    mode: "all",
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "An error occurred");
      } else {
        // Automatically redirect to login page after successful reset
        router.push("/login?reset=success");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <input type="hidden" {...register("token")} />

      <Input
        label="New Password"
        type="password"
        id="reset-password"
        placeholder="••••••••"
        autoComplete="new-password"
        isValidated={touchedFields.password && !errors.password}
        {...register("password")}
        error={errors.password && watch("password")?.length === 0 ? "Field cannot be empty" : undefined}
      />
      <PasswordStrength password={watch("password")} />
      
      <Input
        label="Confirm Password"
        type="password"
        id="reset-confirm-password"
        placeholder="••••••••"
        autoComplete="new-password"
        isValidated={touchedFields.confirmPassword && !errors.confirmPassword}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" id="reset-submit" isLoading={isLoading} className={styles.submitBtn}>
        Reset Password
      </Button>
    </form>
  );
}
