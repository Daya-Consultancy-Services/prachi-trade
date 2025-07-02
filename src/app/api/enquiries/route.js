import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function POST(req) {
    await dbConnect();
    const { name, email, mobile, message, product } = await req.json();
    if (!name || !email || !mobile || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const enquiry = await Enquiry.create({ name, email, mobile, message, product });
    return NextResponse.json(enquiry, { status: 201 });
}

export async function GET() {
    await dbConnect();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
}
