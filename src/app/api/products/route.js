import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Subcategory from "@/models/Subcategory";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const subcategoryId = searchParams.get("subcategory");
    if (subcategoryId) {
        const products = await Product.find({ subcategory: subcategoryId });
        return NextResponse.json(products);
    }
    const products = await Product.find();
    return NextResponse.json(products);
}

export async function POST(req) {
    await dbConnect();
    try {
        // Read the body ONCE and store it
        const body = await req.json();

        const { name, description, image, brand, subcategoryId, price, unit } = body;

        if (!name || !subcategoryId) {
            return NextResponse.json(
                { error: "Name and subcategoryId are required." },
                { status: 400 }
            );
        }

        // Force price to be a number (in case client sends string)
        const parsedPrice = Number(price);
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ error: "Price must be a number." }, { status: 400 });
        }

        const product = new Product({
            name,
            description,
            image,
            brand,
            subcategory: subcategoryId,
            price: parsedPrice,
            unit,
        });

        await product.save();

        await Subcategory.findByIdAndUpdate(subcategoryId, { $push: { products: product._id } });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}
