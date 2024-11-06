'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';
import {getUserId} from '@/Models/SessionModel';
import {checkIfOwner, getOrgIdByName } from '@/Models/orgModel';

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

export async function createEventWithOrgName(orgName: string, session: string, eventName: string, timeOfEvent: Date, placeOfEvent: string, description: string): Promise<Status> {
    //step 1: make status to track ourselve
    let status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    const orgId = await getOrgIdByName(orgName)
    if (!orgId) {
        status.success = false
        status.code = 500
        status.message = "Server Error With getOrgIdByName in createEventWithOrgName"
        return status
    }

    try {
        status = await createEventWithOrgID(orgId.payload, session, eventName, timeOfEvent, placeOfEvent, description)
    }
    catch (e: any) {
        status.success = false;
        status.code = 500;
        status.message = "createEventWithOrgName failed! Internal Sever Error";
    }

    return status;
}

export async function getOrgEvents(orgID:string): Promise<Status>{
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

    try {
        const event = await prisma.event.findMany({
            where: {
                organizationId: orgID
            }
        });

        if (event) {
            status.payload = event;
        }
        else {
            status.success = false;
            status.code = 404;
            status.message = "getOrgEvents failed. Couldn't find org";
        }
    }
    catch (e: any){
        status.success = false;
        status.code = 500;
        status.message = "getOrgEvents failed. Internal Server Error";
    }
    return status
}

export async function getEventData(eventID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: eventID
            }
        });
        if (event) {
            status.payload = event
        }
        else {
            status.code = 404
            status.message = "Event Not Found"
            status.success = false
        }
    }
    catch (e: any) {
        status.code = 500
        status.message = e
        status.success = false
    }
    return status
}

export async function getEventID(eventName: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const event = await prisma.event.findUnique({
            where: {
                eventName: eventName
            }
        });
        if (event) {
            status.payload = event["id"]
        }
        else {
            status.code = 404
            status.message = "Event Not Found"
            status.success = false
        }
    }
    catch (e: any) {
        status.code = 500
        status.message = e
        status.success = false
    }
    return status
}