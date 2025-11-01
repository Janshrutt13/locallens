import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // fallback for local

// --- Create a token ---
export function signJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // token lasts for 7 days
  });
}

// --- Verify a token ---
export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// --- Decode without verifying (optional) ---
export function decodeJWT(token: string) {
  return jwt.decode(token);
}
