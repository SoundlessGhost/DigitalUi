import ConnectDB from "@/lib/ConnectDB";
import { Cart } from "@/models/Cart.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await ConnectDB();
    
    const { email } = params;
    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is missing" },
        { status: 400 }
      );
    }

    const cart = await Cart.find({ user: email });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to fetch cart." },
      { status: 500 }
    );
  }
}
