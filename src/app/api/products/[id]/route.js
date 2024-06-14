import ConnectDB from "@/lib/ConnectDB";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch Product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteProduct = await Product.deleteOne({ _id: id });
    if (!deleteProduct) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ deleteCount: 1 }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete product" },
      { status: 500 }
    );
  }
}
