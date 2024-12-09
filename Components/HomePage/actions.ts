'use server'

import { getPopularOrganizations } from "@/Models/feedModel";
import { isLoggedIn } from "@/Models/SessionModel";
import { getSessionToken } from "@/utils/cookieManager";
import { getUserId } from "@/Models/SessionModel";
import { getAllOrgs } from "@/Models/orgModel";

export async function getSuggestions(): Promise<Item[] | null> {
    const status = await getPopularOrganizations();
    return status.payload;
}

interface Item {
    id: string;
    ownerId: string;
    organizationName: string;
    description: string | null;
}

export async function getUserOrganizations(): Promise<Item[] | null> {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
        return null;
    }
    const token = await getSessionToken();
    if (!token) {
        return null;
    }
    const userId = await getUserId(token);
    if (!userId) {
        return null;
    }
    const status = await getAllOrgs(userId);
    return status.payload;

}