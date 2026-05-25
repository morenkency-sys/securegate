import styles from "@/app/(auth)/layout.module.css";
import Link from "next/link";

export const metadata = {
  title: "Verify Email | SecureGate",
  description: "Check your email for the verification link.",
};

export default function VerifyEmailPendingPage() {
  return (
    <>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Check your email</h1>
        <p className={styles.formSubtitle}>
          We sent a verification link to your inbox. Please click it to continue.
        </p>
      </div>
      <div 
        style={{ 
          textAlign: "center", 
          backgroundColor: "#fafafa", 
          padding: "32px 24px", 
          borderRadius: "12px",
          border: "1px solid var(--color-outline)",
          color: "#000000"
        }}
      >
        <p style={{ marginBottom: "24px", fontSize: "15px", lineHeight: "1.6" }}>
          You must verify your email address before you can access the dashboard. Please check your inbox for the verification link.
        </p>
        <Link 
          href="/login" 
          style={{ 
            color: "var(--color-primary)", 
            fontWeight: 600, 
            textDecoration: "none",
            fontSize: "14px"
          }}
        >
          Back to Login
        </Link>
      </div>
    </>
  );
}
