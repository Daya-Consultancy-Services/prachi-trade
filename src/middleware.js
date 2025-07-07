import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // you had this commented, needs to be imported if verifying JWT

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect only /admin routes
    if (pathname.startsWith("/admin")) {
        // Ensure JWT_SECRET is available
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = request.cookies.get("token")?.value;

        // If no token, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL("/admin-portal-xyz-login", request.url));
        }

        // Verify the token
        try {
            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );

            // Optional: Token expiry check (although jose does this internally too)
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                throw new Error("Token expired");
            }

            // Add any user info to headers if required
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-user-id", payload.userId);

            // Redirect /admin to /admin/dashboard
            if (pathname === "/admin" || pathname === "/admin/") {
                return NextResponse.redirect(new URL("/admin/dashboard", request.url));
            }

            // Allow to proceed
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (err) {
            console.error("JWT verification failed:", err);
            return NextResponse.redirect(new URL("/admin-portal-xyz-login", request.url));
        }
    }

    // Allow all other routes
    return NextResponse.next();
}

// Apply to these routes
export const config = {
    matcher: ["/admin/:path*"],
};
