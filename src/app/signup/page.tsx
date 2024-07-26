import Wrapper from "@/components/server/Wrapper";
import Card from "@/components/server/Card";
import RegisterForm from "@/components/client/RegisterForm";
export default function page() {
    return (
        <Wrapper>
            <main className="w-full h-screen flex items-center justify-center">
                <Card
                    title="Notes-Application"
                    description="Signup into Notes-Application"
                    show
                >
                    <RegisterForm />
                </Card>
            </main>
        </Wrapper>
    );
}
