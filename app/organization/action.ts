"use server"

import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName, checkIfOwner } from '@/Models/orgModel'
import { getSessionToken } from "@/utils/cookieManager";
import { getUserId } from "@/Models/SessionModel"
import { createEventWithOrgID, getOrgEvents, getEventData, getEventID } from '@/Models/eventModel'
import { isFollowing, followOrg, unfollowOrg } from '@/Models/followingModel'
import { doesRequestExist, isUserVolunteer, createVolunteerRequest, getRequestOfOrg } from '@/Models/VolunteerModel'
import { getUsernameFromId } from '@/Models/UserModel'

export async function getOrgInfo(orgName:string): Promise<Status> {
    const status = await getOrgInfoByName(orgName)
    return status
}

export async function saveEvent(orgId: string, formData: {
                                eventName: string; 
                                timeOfEvent: Date; 
                                placeOfEvent: string; 
                                description: string; }): Promise<boolean> {
    const token = await getSessionToken();
    if(token){
        try {
            const status = await createEventWithOrgID(orgId, token, formData.eventName, formData.timeOfEvent, formData.placeOfEvent, formData.description);
            return status.success;
        } catch (error) {
            console.error("Failed to save event:", error);
        }
    }
    return false;
}

export async function findEventsOfOrg(orgID: string): Promise<Status> {
    return await getOrgEvents(orgID)
}

export async function getEventDataWithName(eventName: string): Promise<Status> {
    const eventID = await getEventID(eventName)
    if (!eventID.success) {
        return eventID
    }
    else {
        return await getEventData(eventID.payload)
    }
}

export async function isUserOrgOwner(user:string, orgID: string): Promise<boolean> {
    return (await checkIfOwner(user, orgID)).success;
}

// 0 = user isn't logged in; print no button
// 1 = user is logged and isn't following in; show the follow button
// 2 = user is logged and is following; show the unfollow button
export async function isUserFollowingOrg(user:string, orgID: string): Promise<number> {
    const temp = await isFollowing(user, orgID);
    if (temp) {
        return 2;
    }
    else {
        return 1;
    }
    return 0;
}

export async function unfollowOrganization(user:string, orgID: string): Promise<boolean> {
    const status = await unfollowOrg(user, orgID);
    if (status) {
        return true;
    }
    return false;
}

export async function followOrganization(user: string, orgID: string): Promise<boolean> {
    const status = await followOrg(user, orgID);
    if (status) {
        return true;
    }
    return false;
}

// 0 = user is owner, show link to volunteer tracker page instead
// 1 = user isn't logged in, show log in request
// 2 = user is logged in and hasn't sent a request, show volunteer button
// 3 = user is logged in and has sent a request but isn't a volunteer yet, request pending
// 4 = user is logged in and is a volunteer, link to their user page's volunteer status
export async function userVolunteerStatus(userID: string, orgID: string): Promise<number> {
    if (userID) {
        if (await isUserOrgOwner(userID, orgID)) {
            return 0;
        }
        if ((await isUserVolunteer(userID, orgID)).success) {
            return 4;
        }
        if ((await doesRequestExist(userID, orgID)).success) {
            return 3;
        }
        return 2;
    }
    return 1;
}

export async function getTheUserId(): Promise<string> {
    const token = await getSessionToken();
    if (token) {
        const userID = await getUserId(token);
        if (userID) {
            return userID;
        }
    }
    return "";
}

export async function createVolunteeringRequest(userID: string, orgID: string, message: string): Promise<boolean> {
    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHH\n" + message);
    return (await createVolunteerRequest(userID, orgID, message)).success
}

export async function getAllRequest(userID: string, orgID: string): Promise<Status> {
    return await getRequestOfOrg(userID, orgID);
}

export async function getUsername(userID: string): Promise<string> {
    return (await getUsernameFromId(userID)).payload;
}