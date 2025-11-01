// app/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signJwt = (payload: object | string | Buffer) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
};

export async function getUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("locallens_token")?.value;
  if (!token) return null;
  const decoded = verifyJwt(token);
  if (!decoded?.id) return null;
  return prisma.user.findUnique({ where: { id: decoded.id } });
}
