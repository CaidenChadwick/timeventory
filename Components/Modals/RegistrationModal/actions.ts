'use server';

import { Status } from '@/types/databaseUtilityTypes'
import { registerUser } from '@/Models/UserModel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RegistrationData } from '@/types/databaseUtilityTypes';

export async function registerUserAction(registrationData: RegistrationData): Promise<string> {

    const { email, username, password, receiveEmails } = registrationData;

    const status = await registerUser(email, username, password, receiveEmails);

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
    redirect('/user');
}

export async function sendEmail(email: string, user: string): Promise<boolean> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', user);

    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    };

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/email/join`, {
            method: 'POST',
            body: formData,
        });

        if (response.status != 200) {
            status.success = false;
            status.code = response.status;
            status.message = "Email Failed to Send.";
        }
    }
    catch (e) {
        console.error('Error:', e);
    }

    return status.success;
}
