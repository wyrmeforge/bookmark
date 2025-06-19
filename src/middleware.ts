import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { Routes } from './shared/enums/routes';

const isProtectedRoute = createRouteMatcher(['/home(.*)', '/friends(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { protect, userId } = await auth();

  if (isProtectedRoute(req)) {
    await protect();
  }

  if (userId && !isProtectedRoute(req)) {
    const url = new URL(Routes.Home, req.url);

    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
