import { db } from "@/lib/dbconnect";

export const getUserByEmail = async (email: string) => {
    const response = await db.user.findUnique({ where: { email } });
    return response;
};
