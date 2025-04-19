import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { Routes } from './enums/routes';

const isProtectedRoute = createRouteMatcher(['/home(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { protect, userId } = await auth();

  // Protect authenticated routes
  if (isProtectedRoute(req)) {
    await protect();
  }

  // Redirect logged-in users away from login page
  if (userId && !isProtectedRoute(req)) {
    const url = new URL(Routes.Home, req.url); // redirect to home

    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
