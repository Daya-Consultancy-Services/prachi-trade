import { NextResponse } from "next/server";
import HeroSlide from "@/models/HeroSlide";
import dbConnect from "@/lib/mongodb";


// GET single hero slide
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const slide = await HeroSlide.findById(params.id);

        if (!slide) {
            return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
        }

        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hero slide" }, { status: 500 });
    }
}

// UPDATE hero slide
export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const { title, description, imageUrl, isActive } = await request.json();

        const updatedSlide = await HeroSlide.findByIdAndUpdate(
            params.id,
            { title, description, imageUrl, isActive, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedSlide) {
            return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
        }

        return NextResponse.json(updatedSlide);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
    }
}

// DELETE hero slide
export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const deletedSlide = await HeroSlide.findByIdAndDelete(params.id);

        if (!deletedSlide) {
            return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Hero slide deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
    }
}
