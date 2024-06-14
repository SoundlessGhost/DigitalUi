import ConnectDB from "@/lib/ConnectDB";
import { UserAddress } from "@/models/User-address.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const userAddress = await UserAddress.find();

    return NextResponse.json(userAddress, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch userAddress" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();
    console.log("server" , body);

    const createdUserAddress = await UserAddress.create(body);
    console.log("create address",createdUserAddress);
    return NextResponse.json(createdUserAddress, { status: 201 });
  } catch (error) {
    console.error("Failed to create user address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created userAddress" },
      { status: 500 }
    );
  }
}
