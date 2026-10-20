import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createSession, User } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (
      typeof username !== "string" ||
      !username.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 },
      );
    }

    // Check in all user tables (Student, Teacher, Parent, Admin)
    let user: {
      id: string;
      username: string;
      passwordHash: string | null;
    } | null = null;
    let role: User["role"] | null = null;
    const normalizedUsername = username.trim();

    // Try Student
    let result = await query(
      "SELECT id, username, passwordhash FROM Student WHERE username = ?",
      [normalizedUsername],
    );
    if (result.length > 0) {
      user = {
        id: result[0].id,
        username: result[0].username,
        passwordHash: result[0].passwordHash,
      };
      role = "student";
    }

    // Try Teacher
    if (!user) {
      result = await query(
        "SELECT id, username, passwordhash FROM Teacher WHERE username = ?",
        [normalizedUsername],
      );
      if (result.length > 0) {
        user = {
          id: result[0].id,
          username: result[0].username,
          passwordHash: result[0].passwordHash,
        };
        role = "teacher";
      }
    }

    // Try Parent
    if (!user) {
      result = await query(
        "SELECT id, username, passwordhash FROM Parent WHERE username = ?",
        [normalizedUsername],
      );
      if (result.length > 0) {
        user = {
          id: result[0].id,
          username: result[0].username,
          passwordHash: result[0].passwordHash,
        };
        role = "parent";
      }
    }

    // Try Admin
    if (!user) {
      result = await query(
        "SELECT id, username, passwordhash FROM Admin WHERE username = ?",
        [normalizedUsername],
      );
      if (result.length > 0) {
        user = {
          id: result[0].id,
          username: result[0].username,
          passwordHash: result[0].passwordHash,
        };
        role = "admin";
      }
    }

    if (
      !user?.passwordHash ||
      !role ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await createSession({
      id: user.id,
      username: user.username,
      role,
    });

    return NextResponse.json({ success: true, role }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
