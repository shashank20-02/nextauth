type WrapperProps = {
    children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
    return <section className="w-full min-h-screen">{children}</section>;
}
