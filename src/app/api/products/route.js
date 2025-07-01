import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Subcategory from "@/models/Subcategory";

export async function GET() {
    await dbConnect();
    const products = await Product.find();
    return NextResponse.json(products);
}

export async function POST(req) {
    await dbConnect();
    const { name, description, image, brand, subcategoryId } = await req.json();
    if (!name || !subcategoryId) {
        return NextResponse.json(
            { error: "Name and subcategoryId are required." },
            { status: 400 }
        );
    }
    const product = new Product({ name, description, image, brand, subcategory: subcategoryId });
    await product.save();
    // Add product to subcategory
    await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { products: product._id } });
    return NextResponse.json(product, { status: 201 });
}
