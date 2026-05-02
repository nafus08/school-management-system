import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 },
      );
    }

    // Check in all user tables (Student, Teacher, Parent, Admin)
    let user: any = null;
    let role: string = "";

    // Try Student
    let result: any = await query(
      "SELECT id, username FROM Student WHERE username = ?",
      [username],
    );
    if (result.length > 0) {
      user = result[0];
      role = "student";
    }

    // Try Teacher
    if (!user) {
      result = await query(
        "SELECT id, username FROM Teacher WHERE username = ?",
        [username],
      );
      if (result.length > 0) {
        user = result[0];
        role = "teacher";
      }
    }

    // Try Parent
    if (!user) {
      result = await query(
        "SELECT id, username FROM Parent WHERE username = ?",
        [username],
      );
      if (result.length > 0) {
        user = result[0];
        role = "parent";
      }
    }

    // Try Admin
    if (!user) {
      result = await query(
        "SELECT id, username FROM Admin WHERE username = ?",
        [username],
      );
      if (result.length > 0) {
        user = result[0];
        role = "admin";
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await createSession({
      id: user.id,
      username: user.username,
      role: role as any,
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
