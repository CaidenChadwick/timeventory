'use server';

import { Prisma } from '@prisma/client'
import prisma from '@/db'
import * as argon2 from 'argon2';
import { createSession, deleteSession, isLoggedIn } from '@/Models/SessionModel';
import { Status, LoginData } from '@/types/databaseUtilityTypes';
import { getSessionToken } from '@/utils/cookieManager';

/**
 * Register a new user
 * @param email - User's email
 * @param username - User's username
 * @param password - User's password
 * @param receiveEmails - Whether user wants to receive emails
 * @returns Status object
*/

export async function registerUser(email: string, username: string, password: string, receiveEmails: boolean): Promise<Status> {

    // Set up status object
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    // Hash the password
    const hash = await argon2.hash(password);

    // Try to create a new user
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                passwordHash: hash,
                receiveEmails: receiveEmails
            }
        })

        // Create a new session for the user
        const sessionToken = await createSession(user.id, false)

        // Set status payload
        status.payload = sessionToken;

        // Return the session token
        return status;

    }
    catch (e) {

        // Set status code and message
        status.success = false;
        status.code = 500;
        status.message = "Internal Server Error";

        // Check if the error is a unique constraint violation
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            status.code = 409;
            status.message = "Conflict";
            return status;
        }

        // Return the status object
        return status;

    }
}


/**
 * Log in an existing user
 * @param username - User's username
 * @param password - User's password
 * @returns Status object
*/

export async function login(loginData: LoginData): Promise<Status> {

    const { username, password } = loginData;

    // Set up status object
    const status: Status = {
        success: false,
        code: 200,
        message: "OK",
        payload: null
    }

    // Obtain password hash and id for user
    const hash = await getUserHash(username);
    const id = await getUserId(username);

    try {

        // Verify given password with hash
        if (id && hash && await argon2.verify(hash, password)) {
            // Create a new session for the user
            const sessionToken = await createSession(id, false)

            // Set status payload
            status.payload = sessionToken;

            // Return the session token
            status.success = true;
        } else {
            // If passwords do not match or username not found, set status
            status.code = 401;
            status.message = "Unauthorized";
        }

    } catch (err) {

        // Internal failure
        status.success = false;
        status.code = 500;
        status.message = "Internal Server Error";
        return status;

    }

    // Return the status object
    return status;

}

/**
 * Sign out user
 */
export async function logOutUser(): Promise<Status> {

    // Set up status object
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    // Attempt log out
    try {
        const sessionToken = await getSessionToken();
        if (!sessionToken) {
            status.success = false;
            status.code = 440;
            status.message = "Login Timeout";
            return status;
        }
        await deleteSession(sessionToken.toString());
        return status;
    }

    catch (e) {
        // Set status code and message
        status.success = false;
        status.code = 500;
        status.message = "Internal Server Error";
        return status;
    }

}

/**
 * Get the user hash via username
 * @param username - Given username
 * @returns User hash if username is valid, otherwise null
 */

async function getUserHash(username: string): Promise<string | null> {

    // Get the hash from the database
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    // If the user does not exist, return null
    if (!user) return null;

    // Otherwise, return hash
    return user.passwordHash;
}

// eric
export async function getUsername(userID: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
        where: {
            id: userID
        }
    })

    if (user) {
        return user.username;
    }
    else {
        return null;
    }
}

// gets user's data for the user page. Don't give them the password
// Eric
export async function getUserData(username: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "Got user information",
        payload: null
    };

    try {
        const tempUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (tempUser) {
            const userData = [username, tempUser?.email, tempUser?.id];
            status.payload = userData
        }
        else {
            status.success = false
            status.code = 404
        }
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = "Internal Sever Error";
    }
    return status;
}

export async function getUsernameFromId(userID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userID },
            select: { username: true }, // Adjust the field name if necessary
        });

        if (!user) {
            status.success = false;
            status.message = "user not found";
            status.code = 404;
            return status;
        }
        status.payload = user.username;
        return status;
    } catch (error) {
        console.error('Error fetching username:', error);
        status.success = false;
        status.message = "internal server error";
        status.code = 500;
        return status;
    }
}

/**
 * Get user id via username
 * @param username - Given username
 * @returns User id if username is valid, otherwise null
 */

async function getUserId(username: string): Promise<string | null> {

    // Get the hash from the database
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    // If the user does not exist, return null
    if (!user) return null;

    // Otherwise, return hash
    return user.id;
}