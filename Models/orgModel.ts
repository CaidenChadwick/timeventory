'use server';

import prisma from '@/db';
import { getUserId } from '@/Models/SessionModel';
import { Status } from '@/types/databaseUtilityTypes';

// creates an orgzation
// requires a user to be owner
// requires a unique name
// the user must be logged in
export async function createOrg(session:string, name: string, email: string, description:string = ""): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    // step 2: see if user is logged in before continuing
    const userID = await getUserId(session);

    if (userID != null) {
        //step 3; they are logged in; attempt to make org
        try {
            const org = await prisma.organization.create({
                data: {
                    ownerId: userID,
                    organizationName: name,
                    description: description
                }
            })
            console.log(org)
            status.payload = org.id;
        }
        catch(e: any) {
            // if the name isn't unique
            if (e.code === 'P2002') {
                status.success = false;
                status.code = 409;
                status.message = `Org name "${name}" already taken!`;
            }
            else {
                status.success = false;
                status.code = 500;
                status.message = "Internal Server Error: " + e;
            }
        }
    }
    else {
        // we are not logged in
        status.success = false;
        status.code = 401;
        status.message = "User isn't logged in!"
    }
    return status;
}

export async function getOrgNameById(orgID: string): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const org = await prisma.organization.findUnique({
            where: {
                id: orgID
            }
        });

        if (org) {
            status.payload = org.organizationName;
        }
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = `getOrgNameByIdCriticalFail`;
    }
    return status
}

export async function getOrgID(): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    return status
}

// TODO: Event stuff not done, come back later
export async function getOrgEvents(): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    return status
}

export async function getOrgOwnerIdByName(orgName: string): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const org = await prisma.organization.findUnique({
            where: {
                organizationName: orgName
            }
        });

        if (org) {
            status.payload = org.id;
        }
        else {
            status.success = false;
            status.code = 404;
            status.message = "getOrgOwnerIdByName failed. Couldn't find org";
        }
    }
    catch (e: any){
        status.success = false;
        status.code = 500;
        status.message = "getOrgOwnerIdByName failed. Internal Server Error";
    }
    return status
}

//if good, status is true and "ok"; else, success is false
export async function checkIfOwner(userID: string, orgID: string): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const org = await prisma.organization.findFirst({
            where: {
                id: orgID,
                ownerId: userID
            }
        });
        if (!org) {
            status.success = false;
            status.code = 403;
            status.message = `forbidden exception in checkIfOwner. either org doesn't exist or user isn't the owner`;
        }
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = "checkIfOwner failed. Internal Server Error";
    }
    return status
}

export async function getOrgsUserFollows(userId: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    };

    try {
        const userOrganizations = await prisma.organization.findMany({
            where: {
                ownerId: userId
            }
        });
        status.payload = userOrganizations;
    } catch (error) {
        status.success = false;
        status.code = 500;
        status.message = "Error retrieving organizations";
    }

    return status;
}

export async function getOrgInfoByName(orgName: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    };
    try {
        const organization = await prisma.organization.findUnique({
            where: {
                organizationName: orgName
            }
        });

        if (organization) {
            status.payload = organization;
        } else {
            status.success = false;
            status.code = 404;
            status.message = "Organization not found";
        }
    } catch (error) {
        status.success = false;
        status.code = 500;
        status.message = "An error occurred while retrieving organization information" + error;
    }

    return status;
}