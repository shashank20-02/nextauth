"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/schemas";
import { z } from "zod";
import FormError from "@/components/client/Form-error";
import FormSuccess from "@/components/client/Form-success";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import Loader from "../server/Loader";
import { LoginUser } from "@/actions/UserActions";

export default function LoginForm() {
    const [ispending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            LoginUser(values).then((data) => {
                setSuccess(data?.success as string);
                setError(data?.error as string);
            });
        });
    };

    const Inputs: Array<{
        name: string;
        placeholder: string;
        label: string;
        type: string;
    }> = [
        {
            name: "email",
            placeholder: "Your email address",
            label: "Email",
            type: "text",
        },
        {
            name: "password",
            placeholder: "Your password",
            label: "Password",
            type: "password",
        },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {Inputs.map((item, idx) => (
                    <FormField
                        key={idx}
                        control={form.control}
                        name={item.name === "email" ? "email" : "password"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{item.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={item.placeholder}
                                        type={item.type}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={ispending} className="w-full" type="submit">
                    {ispending ? <Loader /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
