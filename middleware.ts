import { NextRequest, NextResponse } from "next/server";

// This middleware runs on every request
export default async function middleware(req: NextRequest) {
	// Don't do anything for API routes - they handle payload initialization separately
	if (req.nextUrl.pathname.startsWith("/api")) {
		return NextResponse.next();
	}

	// Don't do anything for admin routes - Payload handles those
	if (req.nextUrl.pathname.startsWith("/admin")) {
		return NextResponse.next();
	}

	// For regular routes, continue normal processing
	return NextResponse.next();
}

// This specifies which routes this middleware should run on
export const config = {
	matcher: ["/((?!_next|_static|_vercel|public\\/).*)"],
};
