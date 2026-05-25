import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {/* ── Left branding panel ── */}
      <aside className={styles.left}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>SG</div>
          <span className={styles.logoName}>SecureGate</span>
        </div>

        {/* Hero copy */}
        <div className={styles.hero}>
          <h2 className={styles.headline}>
            Authentication built <br /> for the modern web.
          </h2>
          <p className={styles.subheadline}>
            Secure sessions, email verification, and password recovery — all
            handled with production-grade security practices.
          </p>
          <div className={styles.features}>
            {[
              "bcrypt password hashing",
              "Email verification flow",
              "Secure HTTP-only sessions",
              "Rate-limited API endpoints",
              "Middleware route protection",
            ].map((f) => (
              <div key={f} className={styles.featureItem}>
                <div className={styles.featureDot} />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Trust card */}
        <div className={styles.trustCard}>
          <p className={styles.trustQuote}>
            &ldquo;SecureGate gave us a fully hardened auth system out of the
            box. Token expiry, rate limiting, and verified email — everything
            just works.&rdquo;
          </p>
          <div className={styles.trustAuthor}>
            <div className={styles.trustAvatar}>AO</div>
            <div>
              <div className={styles.trustName}>Adeola A.</div>
              <div className={styles.trustRole}>Lead Engineer</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <main className={styles.right}>
        <div className={styles.formArea}>{children}</div>
      </main>
    </div>
  );
}
