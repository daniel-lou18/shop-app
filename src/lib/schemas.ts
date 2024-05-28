import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(3).max(50),
  password: z.string().min(8).max(50),
});
