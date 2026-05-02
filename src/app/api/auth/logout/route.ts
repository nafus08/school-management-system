import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true });
}

export async function GET() {
  await deleteSession();
  return NextResponse.redirect(
    new URL("/sign-in", process.env.NEXTAUTH_URL || "http://localhost:3002"),
  );
}
