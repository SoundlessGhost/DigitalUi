import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const key = process.env.JWT_SECRET_KEY || "defaultSecretKey";

  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { message: "Request body not found" },
        { status: 400 }
      );
    }

    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        username: "Shahed Abid",
        admin: email === "shahedak47mk47@gmail.com",
      },
      key
    );

    return NextResponse.json(
      { token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create JSON web token:", error);
    return NextResponse.json(
      { message: "Something went wrong, Failed to create JSON web token" },
      { status: 500 }
    );
  }
}
