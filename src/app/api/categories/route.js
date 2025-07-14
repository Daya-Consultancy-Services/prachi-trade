import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Subcategory from "@/models/Subcategory";
import Product from "@/models/Product";

export async function GET() {
    console.log("getCategories called");
    await dbConnect();
    try {
        const categories = await Category.find().populate({
            path: "subcategories",
            populate: {
                path: "products",
                select: "name brand", 
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.log("getCategories error   :", error)
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const { name, description } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required." }, { status: 400 });
        }

        const exists = await Category.findOne({ name });
        if (exists) {
            return NextResponse.json({ error: "Category already exists." }, { status: 409 });
        }

        const category = new Category({ name, description });
        await category.save();

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function PUT(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("id");
        const { name, description } = await req.json();

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, description },
            { new: true, runValidators: true }
        ).populate("subcategories");

        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found." }, { status: 404 });
        }

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("id");

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
        }

        // First find the category to get its subcategories
        const category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json({ error: "Category not found." }, { status: 404 });
        }

        // Delete all associated subcategories
        await Subcategory.deleteMany({ _id: { $in: category.subcategories } });

        // Then delete the category
        await Category.findByIdAndDelete(categoryId);

        return NextResponse.json(
            { message: "Category and its subcategories deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
