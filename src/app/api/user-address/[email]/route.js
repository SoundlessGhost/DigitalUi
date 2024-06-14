import ConnectDB from "@/lib/ConnectDB";
import { UserAddress } from "@/models/User-address.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await ConnectDB(); // 1 Connect MongoDB

    const { email } = params; // 2 Get Email From Params
    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is missing" }, // Validation Check
        { status: 400 }
      );
    }

    const userAddress = await UserAddress.find({ email: email }); // 3 Find Item For Specific User
    if (!userAddress) {
      return NextResponse.json(
        { message: "userAddress not found" }, // Validation Check
        { status: 404 }
      );
    }

    return NextResponse.json(userAddress, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch userAddress:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to fetch userAddress." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await ConnectDB();

    const { email } = params;
    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is missing" },
        { status: 400 }
      );
    }

    const deleteAddress = await UserAddress.deleteOne({ email: email });
    if (!deleteAddress) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ deleteCount: 1 }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete user address" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await ConnectDB();

    const { email } = params;
    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is missing" },
        { status: 400 }
      );
    }

    const { name, address, number, division, city, area } =
      await request.json();

    if (!name || !address || !number || !division || !city || !area) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updateUserAddress = await UserAddress.findOneAndUpdate(
      { email },
      { name, address, number, division, city, area },
      { new: true }
    );

    if (!updateUserAddress) {
      return NextResponse.json(
        { message: "User address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateUserAddress, { status: 200 });
  } catch (error) {
    console.error("Error updating user address:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to update user address" },
      { status: 500 }
    );
  }
}
