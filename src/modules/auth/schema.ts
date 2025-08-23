import { z } from "@hono/zod-openapi";

export const AuthRegisterSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  //  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AuthLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
  //  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AuthLoginSuccessSchema = z.string();

export const AuthMeSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  //  password: z.string().min(6, "Password must be at least 6 characters long"),
  createdAt: z.date(),
  updatedAt: z.date(),
});
