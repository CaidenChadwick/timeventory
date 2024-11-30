'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';


// connects a user and org together!
export async function followOrg(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null,
    };

    try {
        const following = await prisma.following.create({
            data: {
                userID: userID,
                orgID: orgID,
                receiveEmails: true, // @cadien@. is it fine to set this to true?
                receiveAlerts: true,
            },
        });

        status.payload = following;
    } catch (error: any) {
        if (error.code === 'P2002') {
            status.success = false;
            status.code = 409;
            status.message = 'User already follwoed this org';
        } else {
            status.success = false;
            status.code = 500;
            status.message = 'internal sever error';
        }
    }
    return status;
}

// unfollow
export async function unfollowOrg(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null,
    };
    try {
        const deletedFollowing = await prisma.following.delete({
            where: {
                userID_orgID: { userID, orgID },
            },
        });

        status.payload = deletedFollowing;
    } catch (error: any) {
        status.success = false;
        status.code = 500;
        status.message = 'internal sever error';
    }
    return status;
}

// see if the user is already following the org
export async function isFollowing(userID: string, orgID: string): Promise<boolean> {
    try {
        const following = await prisma.following.findUnique({
            where: {
                userID_orgID: {
                    userID: userID,
                    orgID: orgID,
                },
            },
        });
        if (following) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    }
}