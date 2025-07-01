import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
    await dbConnect();
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ error: "Both fields are required." }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return NextResponse.json({ token }, { status: 200 });
}
