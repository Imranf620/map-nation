import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword});
    await newUser.save();

    return NextResponse.json(
      { message: "User Created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === "ValidationError") {
      const firstErrorField = Object.keys(error.errors)[0];
      const message = error.errors[firstErrorField].message;
      return NextResponse.json({ message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
