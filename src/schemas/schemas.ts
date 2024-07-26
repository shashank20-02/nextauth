import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "please enter a valid email" }),
    password: z.string().min(1, { message: "please enter a valid password" }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "Please enter a valid name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Please enter a valid password" }),
});
