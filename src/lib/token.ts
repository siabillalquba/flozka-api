import { sign } from "hono/jwt";

export async function signToken(userId: string) {
  const payload = {
    sub: userId, // Subject = user ID
  };
  const secret = String(process.env.TOKEN_SECRET_KEY);
  return await sign(payload, secret);
}
