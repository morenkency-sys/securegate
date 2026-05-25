import { Html, Body, Head, Heading, Container, Text, Link, Preview, Section } from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  resetLink: string;
}

export const PasswordResetEmail = ({ resetLink }: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password for SecureGate</Preview>
    <Body style={{ backgroundColor: "#f6f9fc", padding: "10px 0" }}>
      <Container style={{ backgroundColor: "#ffffff", border: "1px solid #f0f0f0", padding: "45px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: "normal", textAlign: "center", padding: "0" }}>
          Reset your password
        </Heading>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#404040" }}>
          Click the link below to reset your password. This link will expire in 1 hour.
        </Text>
        <Section style={{ textAlign: "center", marginTop: "32px", marginBottom: "32px" }}>
          <Link
            href={resetLink}
            style={{
              backgroundColor: "#8431F0",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </Link>
        </Section>
        <Text style={{ fontSize: "14px", color: "#9ca299" }}>
          If you didn't request this email, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;
