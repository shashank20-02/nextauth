import Wrapper from "@/components/server/Wrapper";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { REDIRECT_URL } from "@/routes";
import Card from "@/components/server/Card";

export default async function page() {
    const session = await auth();
    return (
        <Wrapper>
            <section className="w-full min-h-screen flex items-center justify-center">
                <Card title="Notes-Application" description="User Details">
                    <div className="w-full flex flex-col gap-y-2">
                        <h1 className="text-lg">Name: {session?.user?.name}</h1>
                        <p className="text-lg">Email: {session?.user?.email}</p>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({
                                    redirect: true,
                                    redirectTo: REDIRECT_URL,
                                });
                            }}
                        >
                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                            >
                                Sign out
                            </Button>
                        </form>
                    </div>
                </Card>
            </section>
        </Wrapper>
    );
}
