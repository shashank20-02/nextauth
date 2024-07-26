import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/Userdata";
import google from "next-auth/providers/google";

const credentialsProvider = credentials({
    name: "credentials",
    credentials: {
        email: { name: "email", type: "text" },
        password: { name: "password", type: "password" },
    },
    async authorize(credentials) {
        const validatePath = LoginSchema.safeParse(credentials);
        if (!validatePath.success) return null;

        const { email, password } = validatePath.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
            return null;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;
        return user;
    },
});

const googleProvider = google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export default {
    providers: [credentialsProvider, googleProvider],
} satisfies NextAuthConfig;
