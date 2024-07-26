"use server";

import { LoginSchema, RegisterSchema } from "@/schemas/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/dbconnect";
import { getUserByEmail } from "@/data/Userdata";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export const RegisterUser = async (values: z.infer<typeof RegisterSchema>) => {
    const validateData = RegisterSchema.safeParse(values);
    if (!validateData.success) {
        return { error: "Invalid Fields", success: "" };
    }

    let { email, password, name } = validateData.data;
    password = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "User already Exists", success: "" };
    }

    await db.user.create({ data: { name, email, password } });

    return { success: "User created Successfully !", error: "" };
};

export const LoginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validateData = LoginSchema.safeParse(values);
    if (!validateData.success) return { error: "Invalid Fields", success: "" };

    const { email, password } = validateData.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/user",
        });
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials", success: "" };
                default:
                    return { error: "Something went wrong", success: "" };
            }
        }
        throw err;
    }
};

export const LoginUserWithGoogle = async () => {
    try {
        await signIn("google", { redirect: true, redirectTo: "/user" });
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials", success: "" };

                default:
                    return { error: "Something went wrong", success: "" };
            }
        }
        throw err;
    }
};
