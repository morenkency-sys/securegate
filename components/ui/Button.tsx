import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  isLoading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = styles.button;
  const variantClass = styles[variant];
  const disabledClass = disabled || isLoading ? styles.disabled : "";

  return (
    <button
      className={`${baseClass} ${variantClass} ${disabledClass} ${className || ""}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
