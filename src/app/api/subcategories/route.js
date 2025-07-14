import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcategory from "@/models/Subcategory";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
    await dbConnect();
    try {
        const subcategories = await Subcategory.find()
            .populate({
                path: "products",
                select: "name image brand price unit stock subcategory createdAt updatedAt",
                model: Product,
            })
            .populate("category", "name");
        return NextResponse.json(subcategories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const { name, description, categoryId } = await req.json();

        if (!name || !categoryId) {
            return NextResponse.json(
                { error: "Name and categoryId are required." },
                { status: 400 }
            );
        }

        // Check if subcategory with same name already exists in this category
        const exists = await Subcategory.findOne({ name, category: categoryId });
        if (exists) {
            return NextResponse.json(
                { error: "Subcategory with this name already exists in this category." },
                { status: 409 }
            );
        }

        const subcategory = new Subcategory({ name, description, category: categoryId });
        await subcategory.save();

        // Add to parent category
        await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory._id } });

        return NextResponse.json(subcategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create subcategory" }, { status: 500 });
    }
}

export async function PUT(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const subcategoryId = searchParams.get("id");
        const { name, description, categoryId } = await req.json();

        if (!subcategoryId) {
            return NextResponse.json({ error: "Subcategory ID is required." }, { status: 400 });
        }

        if (!name || !categoryId) {
            return NextResponse.json(
                { error: "Name and categoryId are required." },
                { status: 400 }
            );
        }

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subcategoryId,
            { name, description, category: categoryId },
            { new: true, runValidators: true }
        ).populate("category", "name");

        if (!updatedSubcategory) {
            return NextResponse.json({ error: "Subcategory not found." }, { status: 404 });
        }

        return NextResponse.json(updatedSubcategory);
    } catch (error) {
        console.error("Error updating subcategory:", error);
        return NextResponse.json({ error: "Failed to update subcategory" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const subcategoryId = searchParams.get("id");

        if (!subcategoryId) {
            return NextResponse.json({ error: "Subcategory ID is required." }, { status: 400 });
        }

        // First find the subcategory to get its category and products
        const subcategory = await Subcategory.findById(subcategoryId);
        if (!subcategory) {
            return NextResponse.json({ error: "Subcategory not found." }, { status: 404 });
        }

        // Remove from parent category
        await Category.findByIdAndUpdate(subcategory.category, {
            $pull: { subcategories: subcategoryId },
        });

        // Delete all associated products
        await Product.deleteMany({ subcategory: subcategoryId });

        // Then delete the subcategory
        await Subcategory.findByIdAndDelete(subcategoryId);

        return NextResponse.json(
            { message: "Subcategory and its products deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        return NextResponse.json({ error: "Failed to delete subcategory" }, { status: 500 });
    }
}
