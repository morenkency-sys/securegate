import Link from "next/link";
import styles from "@/app/(auth)/layout.module.css";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | SecureGate",
  description: "Reset your SecureGate password.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Reset your password</h1>
        <p className={styles.formSubtitle}>
          Enter your email and we&apos;ll send you a reset link.{" "}
          <Link href="/login">Back to Login</Link>
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
