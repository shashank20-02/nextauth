"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/schemas";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/components/client/Form-error";
import FormSuccess from "@/components/client/Form-success";
import { RegisterUser } from "@/actions/UserActions";
import Loader from "@/components/server/Loader";
import Link from "next/link";

export default function RegisterForm() {
    const [ispending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [flg, setflg] = useState(false);
    const [success, setSuccess] = useState("");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("");
        setError("");
        startTransition(() => {
            RegisterUser(values).then((data) => {
                setflg(true);
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
            name: "name",
            placeholder: "Your name",
            label: "Name",
            type: "text",
        },
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
                className="space-y-2"
            >
                {Inputs.map((item, idx) => (
                    <FormField
                        key={idx}
                        disabled={ispending}
                        control={form.control}
                        name={
                            item.name === "email"
                                ? "email"
                                : item.name === "password"
                                ? "password"
                                : "name"
                        }
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
                {flg ? (
                    <Button type="button" className="w-full">
                        <Link href="/signin" className="text-[.9rem]">
                            Signin
                        </Link>
                    </Button>
                ) : (
                    <Button
                        disabled={ispending}
                        className="w-full"
                        type="submit"
                    >
                        {ispending ? <Loader /> : "Submit"}
                    </Button>
                )}
            </form>
        </Form>
    );
}
