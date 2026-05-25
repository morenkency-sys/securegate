import { z } from "zod";

const passwordRules = z
  .string()
  .min(1, "Field cannot be empty")
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number");

export const signUpSchema = z.object({
  name: z.string().min(1, "Field cannot be empty"),
  email: z.string().min(1, "Field cannot be empty").email("Enter a valid email address"),
  password: passwordRules,
});

export const loginSchema = z.object({
  email: z.string().min(1, "Field cannot be empty").email("Enter a valid email address"),
  password: z.string().min(1, "Field cannot be empty"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Field cannot be empty").email("Enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: passwordRules,
  confirmPassword: z.string().min(1, "Field cannot be empty").min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
