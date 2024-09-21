'use server';

import prisma from '@/db'
import { getSessionToken } from '@/utils/cookieManager';

/**
 * Create a new session for a user
 * @param userId - User ID
 * @param stayLoggedIn - Whether the user wants to stay logged in
 * @returns Session token if successful, null otherwise
 */

export async function createSession(userId: string, stayLoggedIn: boolean): Promise<String | null> {
    
    let exp;
    // Set expiration date based on stayLoggedIn
    if (stayLoggedIn) {
        exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // 1 year
    } else {
        exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
    }

    try {
        
        // Create a new session in the database
        await prisma.session.create({
            data: {
                userId: userId,
                expiration: exp
            }
        })
        
        // Get the session from the database
        const session = await prisma.session.findFirst({
            where: {
                userId: userId,
                expiration: exp
            }
        })

        // If the session does not exist, return null
        if (!session) return null

        // Return the session token
        return session.sessionToken

    } catch (e) {
        return null
    }
}

/**
 * Get the user ID from a session token
 * @param sessionToken - Session token from cookie
 * @returns User ID if session is valid, null otherwise
 */

export async function getUserId(sessionToken: string): Promise<string | null>{

    // Get the session from the database
    const session = await prisma.session.findUnique({
        where: {
            sessionToken: sessionToken
        }
    })

    // If the session does not exist, return null
    if (!session) return null

    // If the session has expired, delete it from the database and return null
    if (session.expiration < new Date()) {
        await deleteSession(sessionToken)
        return null
    }
    
    // If the session is still valid, return the userId
    return session.userId
}

/**
 * Delete a session from the database
 * @param sessionToken - Session token
 */

export async function deleteSession(sessionToken: string): Promise<void> {
    await prisma.session.delete({
        where: {
            sessionToken: sessionToken
        }
    })
}

/*
 * Check if a user is logged in
 * @returns True if the user is logged in, false otherwise
 */

export async function isLoggedIn() {
    const sessionToken = await getSessionToken();
    if (!sessionToken) return false;
    const userId = await getUserId(sessionToken.toString());
    if (!userId) return false;
    return true;
}