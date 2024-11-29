// This is a server-side wrapper for the navbar

import { isLoggedIn } from '@/Models/SessionModel';
import NavbarClient from "./NavbarClient";
import { getUsernameAction } from './actions';


export default async function Navigation() {

    // If the user is logged in
    const loggedIn = await isLoggedIn();
    const user = await getUsernameAction();

    return (
        <NavbarClient loggedIn={loggedIn} user={user} />
    );
}