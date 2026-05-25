import Link from "next/link";
import styles from "@/app/(auth)/layout.module.css";
import { LoginForm } from "@/components/forms/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Log In | SecureGate",
  description: "Log in to your SecureGate account securely.",
};

export default function LoginPage() {
  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Welcome back!</h1>
        <p className={styles.formSubtitle}>
          Don&apos;t have an account?{" "}
          <Link href="/signup">Sign Up</Link>
        </p>
      </div>
      <Suspense fallback={<div>Loading…</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
