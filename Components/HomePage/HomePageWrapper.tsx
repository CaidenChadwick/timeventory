'use server'

import { isLoggedIn } from "@/Models/SessionModel";
import { getSessionToken } from "@/utils/cookieManager";
import { getUserId } from "@/Models/SessionModel";
import HomePageClient from "./HomePageClient";
import { getSuggestions } from "./actions";
import { getUserOrganizations } from "./actions";


export default async function HomePageWrapper() {
    const loggedIn = await isLoggedIn();
    let userOrganizations = null;

    if (loggedIn) {
        const token = await getSessionToken();
        if (token) {
            const userId = await getUserId(token);
            if (userId) {
                userOrganizations = await getUserOrganizations();
            }
        }
    }
    const suggestions = await getSuggestions();

    return (
        <HomePageClient loggedIn={loggedIn} userOrganizations={userOrganizations} suggestions={suggestions} />
    )
}