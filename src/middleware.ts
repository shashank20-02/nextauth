import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { Apiroutes, AuthRoutes, PublicRoutes, REDIRECT_URL } from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
    const isLogged = !!req.auth;
    const { nextUrl } = req;
    const isApiAuthRoute = nextUrl.pathname.startsWith(Apiroutes);
    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    const isauthRoutes = AuthRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }
    if (isauthRoutes) {
        if (isLogged) {
            return NextResponse.redirect(new URL(REDIRECT_URL, nextUrl));
        }
        return;
    }
    if (!isLogged && !isPublicRoute) {
        return NextResponse.redirect(new URL(REDIRECT_URL, nextUrl));
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
