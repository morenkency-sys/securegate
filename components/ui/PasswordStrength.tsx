import React from "react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password || password.length === 0) return null;

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const metCount = [hasLength, hasUpper, hasLower, hasNumber].filter(Boolean).length;
  
  let strengthLabel = "Weak";
  let strengthColor = "#ef4444"; // Red
  let strengthWidth = "25%";

  if (metCount === 3) {
    strengthLabel = "Average";
    strengthColor = "#eab308"; // Yellow
    strengthWidth = "75%";
  } else if (metCount === 4) {
    strengthLabel = "Strong";
    strengthColor = "#22c55e"; // Green
    strengthWidth = "100%";
  } else if (metCount === 2) {
    strengthWidth = "50%";
  }

  return (
    <div style={{ marginTop: "-12px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: 1, height: "4px", backgroundColor: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ width: strengthWidth, height: "100%", backgroundColor: strengthColor, transition: "all 0.3s ease" }} />
        </div>
        <span style={{ fontSize: "12px", fontWeight: 600, color: strengthColor, minWidth: "48px", textAlign: "right" }}>
          {strengthLabel}
        </span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "4px" }}>
        {!hasLength && <span style={{ fontSize: "12px", color: "var(--color-on-surface-variant)" }}>• Minimum of 8 characters</span>}
        {!hasUpper && <span style={{ fontSize: "12px", color: "var(--color-on-surface-variant)" }}>• Must contain an uppercase letter</span>}
        {!hasLower && <span style={{ fontSize: "12px", color: "var(--color-on-surface-variant)" }}>• Must contain a lowercase letter</span>}
        {!hasNumber && <span style={{ fontSize: "12px", color: "var(--color-on-surface-variant)" }}>• Must contain a number</span>}
      </div>
    </div>
  );
}
