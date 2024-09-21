'use server'

import { login } from '@/Models/UserModel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginData } from '@/types/databaseUtilityTypes';

export async function loginAction(loginData: LoginData): Promise<boolean> {

    const status = await login(loginData);

    if (!status.success) {
        return false;
    }

    const sessionToken = status.payload;

    // Set the session token in a cookie
    const cookieObj = cookies();
    cookieObj.set('sessionToken', sessionToken);

    // Redirect to profile page
    redirect('/profile');
}