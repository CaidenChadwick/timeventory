// This is a server-side wrapper for the navbar

import { isLoggedIn } from '@/Models/SessionModel';
import NavbarClient from "./NavbarClient";

export default async function Navigation() {

    // If the user is logged in
    const loggedIn = await isLoggedIn();

    return (
        <NavbarClient loggedIn={loggedIn} />
    );
}