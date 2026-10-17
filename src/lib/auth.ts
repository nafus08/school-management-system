import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
  }
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export interface User {
  id: string;
  username: string;
  role: "admin" | "teacher" | "student" | "parent";
}

export async function createSession(user: User) {
  const token = await new SignJWT({
    id: user.id,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const secret = getSecret();
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as unknown as User;
  } catch (err) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
