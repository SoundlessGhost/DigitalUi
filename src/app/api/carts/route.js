import ConnectDB from "@/lib/ConnectDB";
import { Cart } from "@/models/Cart.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const cart = await Cart.find();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();

    const createdCart = await Cart.create(body);
    return NextResponse.json(createdCart, { status: 201 });
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created cart product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteCart = await Cart.findByIdAndDelete(id);
    if (!deleteCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ deleteCount: 1 }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { message: "Something Went Wrong. Failed to delete cart." },
      { status: 500 }
    );
  }
}
