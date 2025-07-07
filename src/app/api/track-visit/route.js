import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Visit from "@/models/Visit";

export async function POST(req) {
    await dbConnect();
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    await Visit.create({ userAgent, ip });
    return NextResponse.json({ success: true });
}
