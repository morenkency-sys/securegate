import styles from "@/app/(auth)/layout.module.css";
import { VerifyEmailClient } from "@/components/auth/VerifyEmailClient";
import { Suspense } from "react";

export const metadata = {
  title: "Verify Email | SecureGate",
  description: "Verify your email address to access SecureGate.",
};

export default async function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  
  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Email Verification</h1>
        <p className={styles.formSubtitle}>
          Verifying your account token...
        </p>
      </div>
      <VerifyEmailClient token={resolvedParams.token} />
    </>
  );
}
