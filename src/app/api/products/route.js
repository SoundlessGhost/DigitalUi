import ConnectDB from "@/lib/ConnectDB";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const product = await Product.find();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch Product" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();

    const createProduct = await Product.create(body);
    return NextResponse.json(createProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created Product" },
      { status: 500 }
    );
  }
}
