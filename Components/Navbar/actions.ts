'use server'

import { getUserId } from "@/Models/SessionModel";
import { getUsername } from "@/Models/UserModel"
import { getSessionToken } from "@/utils/cookieManager";


export async function getUsernameAction() {

    const sessionToken = await getSessionToken();
    if (!sessionToken)
        return null;
    const userID = await getUserId(sessionToken.toString());
    if (!userID)
        return null;
    const user = await getUsername(userID);

    return user;
}