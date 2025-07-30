import { NextResponse } from "next/server";
import HeroSlide from "@/models/HeroSlide";// Assuming you have a DB connection utility
import dbConnect from "@/lib/mongodb";

// GET all hero slides
export async function GET() {
    try {
        await dbConnect();
        const slides = await HeroSlide.find().sort({ createdAt: -1 });
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
    }
}

// POST a new hero slide
export async function POST(request) {
    try {
        await dbConnect();
        const { title, description, imageUrl, isActive } = await request.json();

        const newSlide = new HeroSlide({
            title,
            description,
            imageUrl,
            isActive: isActive || true,
        });

        await newSlide.save();
        return NextResponse.json(newSlide, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
    }
}
