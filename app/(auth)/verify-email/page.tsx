import styles from "@/app/(auth)/layout.module.css";
import buttonStyles from "@/components/ui/Button.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutLink } from "@/components/auth/SignOutLink";

export const metadata = {
  title: "Verify Email | SecureGate",
  description: "Check your email for the verification link.",
};

export default async function VerifyEmailPendingPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  
  let emailProviderLink = "mailto:";
  if (email.endsWith("@gmail.com")) {
    emailProviderLink = "https://mail.google.com";
  } else if (email.endsWith("@outlook.com") || email.endsWith("@hotmail.com") || email.endsWith("@live.com")) {
    emailProviderLink = "https://outlook.live.com";
  } else if (email.endsWith("@yahoo.com")) {
    emailProviderLink = "https://mail.yahoo.com";
  }

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
          href={emailProviderLink}
          target={emailProviderLink !== "mailto:" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          style={{ textDecoration: "none" }}
        >
          Go to mail
        </a>

        <div style={{ textAlign: "center" }}>
          <SignOutLink />
        </div>
      </div>
    </>
  );
}
