'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';

export async function createEventWithOrgID(orgID: string, eventName: string, timeOfEvent: Date, placeOfEvent: string, description: string): Promise<Status> {
    //step 1: make status to track ourselve
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }

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
            status.message = `Event name "${eventName}" already taken!`;
        }
        else {
            status.success = false;
            status.code = 500;
            status.message = "createEventWithOrgName failed! Internal Sever Error";
        }
    }

    return status;
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