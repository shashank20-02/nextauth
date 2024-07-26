import { BsExclamationTriangle } from "react-icons/bs";

interface Props {
    message?: string;
}

export default function Page({ message }: Props) {
    if (!message) return null;

    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <BsExclamationTriangle size="1rem" />
            <p>{message}</p>
        </div>
    );
}
