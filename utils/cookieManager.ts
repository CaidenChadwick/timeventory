'use server';

import { cookies } from 'next/headers';

export async function getSessionToken(): Promise<string | null> {
    // Get the session token from the cookie
    return cookies().get('sessionToken')?.value || null;
}