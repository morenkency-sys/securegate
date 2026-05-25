import { Resend } from "resend";
import { VerificationEmail } from "@/emails/VerificationEmail";
import { PasswordResetEmail } from "@/emails/PasswordResetEmail";

import { render } from "@react-email/components";

export async function sendVerificationEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const confirmLink = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;

  try {
    const htmlBody = await render(VerificationEmail({ confirmLink }));
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Verify your email — SecureGate",
      html: htmlBody,
    });

    console.log("-----------------------------------------");
    console.log(`📩 VERIFICATION LINK FOR ${email}:`);
    console.log(confirmLink);
    console.log("-----------------------------------------");

    if (error) {
      console.error("Resend API Error:", error);
    } else {
      console.log("Resend API Success Data:", data);
    }
  } catch (err) {
    console.error("Unexpected error in sendVerificationEmail:", err);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  
  const htmlBody = await render(PasswordResetEmail({ resetLink }));

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Reset your password — SecureGate",
    html: htmlBody,
  });
}
