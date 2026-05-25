import Link from "next/link";
import styles from "@/app/(auth)/layout.module.css";
import { SignUpForm } from "@/components/forms/SignUpForm";

export const metadata = {
  title: "Sign Up | SecureGate",
  description: "Create your SecureGate account.",
};

export default function SignUpPage() {
  return (
    <SignUpForm />
  );
}
