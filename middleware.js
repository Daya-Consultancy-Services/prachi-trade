import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith("/admin")) {
        console.log("request object:", request);
        const token = request.cookies.get("token")?.value;
        // If no token, redirect to login
        if (!token) {
            const loginUrl = new URL("/admin-portal-xyz-login", request.url);
            return NextResponse.redirect(loginUrl);
        }
        // Verify token
        try {
            await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        } catch (e) {
            const loginUrl = new URL("/admin-portal-xyz-login", request.url);
            return NextResponse.redirect(loginUrl);
        }
        // If accessing /admin root, redirect to /admin/dashboard
        if (pathname === "/admin" || pathname === "/admin/") {
            const dashboardUrl = new URL("/admin/dashboard", request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
