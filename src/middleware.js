import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    req.user = payload;
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/protected/:path*",
};
