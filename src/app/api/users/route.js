import ConnectDB from "@/lib/ConnectDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const user = await User.find();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();

    const createdUser = User.create(body);
    return NextResponse.json(createdUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created User" },
      { status: 500 }
    );
  }
}
