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

    const products = await Product.find().populate("subcategory");
    return NextResponse.json(products);
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const { name, description, image, brand, subcategoryId, price, unit } = body;

        if (!name || !subcategoryId) {
            return NextResponse.json(
                { error: "Name and subcategoryId are required." },
                { status: 400 }
            );
        }

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

export async function PUT(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, name, description, image, brand, price, unit } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Product ID is required for update." },
                { status: 400 }
            );
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (image !== undefined) updateData.image = image;
        if (brand !== undefined) updateData.brand = brand;
        if (price !== undefined) {
            const parsedPrice = Number(price);
            if (isNaN(parsedPrice)) {
                return NextResponse.json({ error: "Price must be a number." }, { status: 400 });
            }
            updateData.price = parsedPrice;
        }
        if (unit !== undefined) updateData.unit = unit;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found." }, { status: 404 });
        }

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Product ID is required for deletion." },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found." }, { status: 404 });
        }

        // Remove product reference from subcategory
        await Subcategory.findByIdAndUpdate(product.subcategory, {
            $pull: { products: product._id },
        });

        // Delete the product
        await Product.findByIdAndDelete(id);

        return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}
