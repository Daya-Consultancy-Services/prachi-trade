import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Subcategory from "@/models/Subcategory";

export async function GET() {
    await dbConnect();
    const categories = await Category.find().populate("subcategories");
    return NextResponse.json(categories);
}

export async function POST(req) {
    await dbConnect();
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    const exists = await Category.findOne({ name });
    if (exists) {
        return NextResponse.json({ error: "Category already exists." }, { status: 409 });
    }
    const category = new Category({ name });
    await category.save();
    return NextResponse.json(category, { status: 201 });
}
