import styles from "@/app/(auth)/layout.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
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
      
      <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <a 
          href="mailto:"
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          style={{ textDecoration: "none" }}
        >
          Go to mail
        </a>

        <div style={{ textAlign: "center" }}>
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
      </div>
    </>
  );
}
