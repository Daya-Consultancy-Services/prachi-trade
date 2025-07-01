import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcategory from "@/models/Subcategory";
import Category from "@/models/Category";

export async function GET() {
    await dbConnect();
    const subcategories = await Subcategory.find().populate("products");
    return NextResponse.json(subcategories);
}

export async function POST(req) {
    await dbConnect();
    const { name, categoryId } = await req.json();
    if (!name || !categoryId) {
        return NextResponse.json({ error: "Name and categoryId are required." }, { status: 400 });
    }
    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();
    // Add subcategory to category
    await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory._id } });
    return NextResponse.json(subcategory, { status: 201 });
}
