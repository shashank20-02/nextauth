import { CiCircleCheck } from "react-icons/ci";

interface Props {
    message?: string;
}

export default function Page({ message }: Props) {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CiCircleCheck size="1rem" />
            <p>{message}</p>
        </div>
    );
}
