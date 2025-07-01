import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
}
