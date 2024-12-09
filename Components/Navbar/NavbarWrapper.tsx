// This is a server-side wrapper for the navbar

import { isLoggedIn } from '@/Models/SessionModel';
import { getSessionToken } from '@/utils/cookieManager';
import { getUserNameFromSession } from '@/app/user/action';
import NavbarClient from "./NavbarClient";

export default async function Navigation() {

    // If the user is logged in
    const loggedIn = await isLoggedIn();
    let user = null;
    if (loggedIn) {
        user = await getUserNameFromSession();
    }

    return (
        <NavbarClient loggedIn={loggedIn} user={user} />
    );
}