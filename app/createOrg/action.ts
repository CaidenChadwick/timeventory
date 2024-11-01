'use client'

import { isLoggedIn, getUserId } from "@/Models/SessionModel";
import { getSessionToken } from "@/utils/cookieManager";
import { getUsername } from "@/Models/UserModel";
import { createOrg } from "@/Models/orgModel";
// eric

export async function getUserNameFromSession():Promise<string | null>{
    const token = await getSessionToken();
    if (token) {
        const userID = await getUserId(token.toString());
        if (userID) {
            const userName = await getUsername(userID);
            if (userName) {
                return userName;
            }
        }
    }
    return null;
}

export async function isUserLoggedIn():Promise<boolean> {
    return isLoggedIn();
}

export async function saveOrganization(formData: { name: string; description?: string; email: string }): Promise<boolean> {
    const token = await getSessionToken();
    let message = "";
    console.log(alert)
    if(token){
        try {
            const status = await createOrg(token, formData.name, formData.email, formData.description);
            alert(status.message)
            alert(status.success)
            return status.success;
        } catch (error) {
            alert(error)
            console.error("Failed to save organization:", error);
        }
    }
    alert(message)
    return false;
}