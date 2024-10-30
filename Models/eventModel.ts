'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';
import {getUserId} from '@/Models/SessionModel';
import {checkIfOwner} from '@/Models/orgModel';

// also requires userID
export async function createEventWithOrgID(orgID: string, session: string, eventName: string, timeOfEvent: Date, placeOfEvent: string, description: string): Promise<Status> {
    //step 1: make status to track ourselve
    var status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    const userID = await getUserId(session);

    if (userID) {
        // if failed here. org doesn't exist or user isn't the owner
        status = await checkIfOwner(userID, orgID);
    }
    else {
        // bad session
        status.success = false;
        status.code = 401;
        status.message = `error in createEventWithOrgId. user isn't logged in`;
    }
    
    // if true. we are good to create a event
    if (status.success) {
        try {
            const event = await prisma.event.create({
                data: {
                    organizationId: orgID,
                    eventName: eventName,
                    timeOfEvent: timeOfEvent,
                    placeOfEvent: placeOfEvent,
                    description: description
                }
            });
            status.payload = event.id;
        }
        catch (e: any) {
            if (e.code === 'P2002') {
                status.success = false;
                status.code = 409;
                status.message = `createEventWithOrgName failed! Event name "${eventName}" already taken!`;
            }
            /////
            else {
                status.success = false;
                status.code = 500;
                status.message = "createEventWithOrgName failed! Internal Sever Error";
            }
        }
    }

    return status;
}
/*
export async function getAllEventsOfOrg(orgID: string): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const events = await prisma.event.findMany({
            where: {
                organizationId: orgID
            }
        })
        if (events) {
            
        }
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = "error in getAllEventsOfOrg. Internal server error";
    }
    return status
}
/*
export async function createEventWithOrgName(orgName: string, timeOfEvent: Date, placeOfEvent: string, description: string): Promise<Status> {
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const event = await prisma.organization.create({
            data: {

            }
        })
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = "createEventWithOrgName failed! Internal Sever Error";
    }

    return status;
}
    */