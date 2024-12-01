"use server"

import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName, checkIfOwner } from '@/Models/orgModel'
import { getSessionToken } from "@/utils/cookieManager";
import { getUserId } from "@/Models/SessionModel"
import { createEventWithOrgID, getOrgEvents, getEventData, getEventID } from '@/Models/eventModel'
import { isFollowing, followOrg, unfollowOrg } from '@/Models/followingModel'

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

export async function isUserOrgOwner(orgID: string): Promise<boolean> {
    const token = await getSessionToken();
    if (token) {
        const user = await getUserId(token);
        if (user) {
            return (await checkIfOwner(user, orgID)).success;
        }
    }
    return false;
}

// 0 = user isn't logged in; print no button
// 1 = user is logged and isn't following in; show the follow button
// 2 = user is logged and is following; show the unfollow button
export async function isUserFollowingOrg(orgID: string): Promise<number> {
    const token = await getSessionToken();
    if (token) {
        const user = await getUserId(token);
        if (user) {
            const temp = await isFollowing(user, orgID);
            if (temp) {
                return 2;
            }
            else {
                return 1;
            }
        }
    }
    return 0;
}

export async function unfollowOrganization(orgID: string): Promise<boolean> {
    const token = await getSessionToken();
    if (token) {
        const user = await getUserId(token);
        if (user) {
            const status = await unfollowOrg(user, orgID);
            if (status) {
                return true;
            }
        }
    }
    return false;
}

export async function followOrganization(orgID: string): Promise<boolean> {
    const token = await getSessionToken();
    if (token) {
        const user = await getUserId(token);
        if (user) {
            const status = await followOrg(user, orgID);
            if (status) {
                return true;
            }
        }
    }
    return false;
}