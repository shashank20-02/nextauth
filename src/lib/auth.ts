import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./dbconnect";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({ token }) {
            const user = await db.user.findUnique({
                where: {
                    email: token.email as string,
                },
            });
            token.userId = user?.id;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token?.userId as string;
            return session;
        },
    },
});
