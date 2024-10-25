'use server'

import { logOutUser } from "@/Models/UserModel"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {

    const status = await logOutUser();

    if (!status.success) {
        switch (status.code) {
            case 440:
                redirect("/");
            default:
                return "Unknown error occurred. Please try again later.";
        }
    }

    // Delete Cookie
    cookies().delete('sessionToken');

    // Redirect to main page
    redirect("/");
}