import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Fallback pattern for environment variable dependent processes
const isClerkConfigured = !!process.env.CLERK_SECRET_KEY && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function middleware(request: any) {
  if (!isClerkConfigured) {
    console.warn("Clerk environment variables are missing. Auth middleware is disabled.");
    return NextResponse.next();
  }
  
  // Clerk middleware returns a handler
  return clerkMiddleware()(request, {} as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
