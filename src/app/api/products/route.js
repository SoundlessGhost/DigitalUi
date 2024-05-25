import ConnectDB from "@/lib/ConnectDB";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();
    const product = await Product.find();

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching product", { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();
    const createProduct = Product.create(body);
    return new NextResponse(JSON.stringify(createProduct), { status: 200 });
  } catch (error) {
    return new NextResponse("failed to create product", { status: 500 });
  }
}
