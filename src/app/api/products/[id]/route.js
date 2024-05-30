import ConnectDB from "@/lib/ConnectDB";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params;
    const getSingleProduct = await Product.findOne({ _id: id });
    return NextResponse.json(getSingleProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch Product" },
      { status: 500 }
    );
  }
}
