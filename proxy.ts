import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("iBuildThis")?.value;
    const pathname = req.nextUrl.pathname;

    const publicRoutes = [
        "/login",
        "/signup",
        "/explore",
        "/api/auth/login",
        "/api/auth/signup",
        "/api/explore",
        "/api/test"
    ];

    const isPublic =
        publicRoutes.includes(pathname) ||
        pathname.startsWith("/api/auth");

    if (isPublic) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("iBuiltThisUser", JSON.stringify(decoded));

        return NextResponse.next({
            request: { headers: requestHeaders }
        });

    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/profile",
        "/api/:path*"
    ]
};
