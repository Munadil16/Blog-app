import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must contain at least 6 characters"),
});

export type SignUpType = z.infer<typeof signUpSchema>;
