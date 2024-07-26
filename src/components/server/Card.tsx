import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { LoginUserWithGoogle } from "@/actions/UserActions";

type CardProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
    show?: boolean;
};

export default function Page({
    children,
    title,
    description,
    show,
}: CardProps) {
    return (
        <Card className="lg:w-1/4 w-full shadow-md">
            <CardHeader>
                <CardTitle className="text-center">{title}</CardTitle>
                <CardDescription className="text-center">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {show && (
                <CardFooter>
                    <form className="w-full" action={LoginUserWithGoogle}>
                        <Button
                            type="submit"
                            className="w-full flex items-center gap-x-2"
                            variant="outline"
                        >
                            Signin with Google
                            <FcGoogle size="1rem" />
                        </Button>
                    </form>
                </CardFooter>
            )}
        </Card>
    );
}
