import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/contact-us(.*)',
//   '/privacy-policy(.*)',
//   '/search(.*)',
//   '/shipping-and-returns(.*)',
//   '/terms-of-use(.*)',
//   '/api/uploadthing(.*)',
//   '/api/webhook(.*)'
// ]);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};