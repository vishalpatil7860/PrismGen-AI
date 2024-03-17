import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // If the user is signed in and not on a route that requires redirection,
    // redirect them directly to the dashboard.
    if (auth.userId && req.nextUrl.pathname === "/") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    // Redirect users who are not signed in and trying to access protected routes
    // to the sign-in page.
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: '/' });
    }
    // Allow users visiting public routes or the dashboard to proceed.
    return NextResponse.next();
  },
  // Define public routes that won't trigger the sign-in redirection
  publicRoutes: ["/", "/api/webhook", "/api/stripe"], // Add any other public routes here
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
