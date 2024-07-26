import Wrapper from "@/components/server/Wrapper";
import Card from "@/components/server/Card";
import Link from "next/link";
export default function Home() {
    return (
        <Wrapper>
            <section className="w-full min-h-screen flex items-center justify-center">
                <Card title="Notes-Application">
                    <div className="w-full flex flex-col items-center gap-y-2">
                        <h1>An Authjs Based Authetication Web Application</h1>
                        <div className="w-full flex items-center gap-x-2">
                            <Link
                                className="px-4 py-2 border-[1px] border-black rounded-md text-[1rem] flex-1 text-center"
                                href="/signin"
                            >
                                SignIn
                            </Link>
                            <Link
                                className="px-4 py-2 border-2 border-black rounded-md text-[1rem] flex-1 text-center bg-black text-white hover:bg-transparent hover:text-black"
                                href="/signup"
                            >
                                SignUp
                            </Link>
                        </div>
                    </div>
                </Card>
            </section>
        </Wrapper>
    );
}
