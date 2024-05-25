import ConnectDB from "@/lib/ConnectDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();
    User.create(body);
    return new NextResponse("user create successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("failed to create user", { status: 500 });
  }
}
