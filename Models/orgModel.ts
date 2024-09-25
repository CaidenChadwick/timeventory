'use server';

import prisma from '@/db';
import { getUserId } from '@/Models/SessionModel';
import { Status } from '@/types/databaseUtilityTypes';

// 
export async function createOrg(name: string, session: string): Promise<Status>{
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    // see if user is logged in before continuing
    const userID = await getUserId(session);

    if (userID != null) {
        try {
            const org = await prisma.Organization.create({
                data: {
                    ownerId: userID,
                    organizationName: name
                }
            })
            return status;
        }
        catch(e) {
            status.success = false;
            status.code = 500;
            status.message = "Internal Server Error";
            //todo: if error cause name not unique, send special error messesage
        }
    }

    return status;
}