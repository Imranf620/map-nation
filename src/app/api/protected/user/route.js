import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req) {
  await connectDB();
  return NextResponse.json({ message: "This is a protected route" });
}
