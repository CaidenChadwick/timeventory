'use server';

import { registerUser } from '@/Models/UserModel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RegistrationData } from '@/types/databaseUtilityTypes';

export async function registerUserAction(registrationData: RegistrationData): Promise<string> {

    const { email, username, password } = registrationData;

    const status = await registerUser(email, username, password);

    if (!status.success) {
        switch (status.code) {
            case 409:
                return "Username or email already exists. Please try again.";
            default:
                return "Unknown error occurred. Please try again later.";
        }
    }

    const sessionToken = status.payload;

    // Set the session token in a cookie
    const cookieObj = cookies();
    cookieObj.set('sessionToken', sessionToken);

    // Redirect to profile page
    redirect('/profile');
}
