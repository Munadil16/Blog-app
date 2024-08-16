import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must contain at least 6 characters"),
});

export type SignInType = z.infer<typeof signInSchema>;
