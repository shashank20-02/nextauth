import Wrapper from "@/components/server/Wrapper";
import Card from "@/components/server/Card";
import LoginForm from "@/components/client/LoginForm";
export default function page() {
    return (
        <Wrapper>
            <main className="w-full h-screen flex items-center justify-center">
                <Card
                    title="Notes-Application"
                    description="Login into your account"
                    show
                >
                    <LoginForm />
                </Card>
            </main>
        </Wrapper>
    );
}
