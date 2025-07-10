import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

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
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = user.password;
    if (!isMatch) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
    });

    // Set cookie (secure, httpOnly, sameSite)
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
}
