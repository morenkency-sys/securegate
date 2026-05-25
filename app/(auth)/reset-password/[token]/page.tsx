import Link from "next/link";
import styles from "@/app/(auth)/layout.module.css";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { Suspense } from "react";

export const metadata = {
  title: "Reset Password | SecureGate",
  description: "Create a new password for your SecureGate account.",
};

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  
  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Create new password</h1>
        <p className={styles.formSubtitle}>
          Enter your new password below.{" "}
          <Link href="/login">Back to Login</Link>
        </p>
      </div>
      <ResetPasswordForm token={resolvedParams.token} />
    </>
  );
}
