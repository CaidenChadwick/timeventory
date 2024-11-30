import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName, checkIfOwner } from '@/Models/orgModel'
import { getSessionToken } from "@/utils/cookieManager";
import { getUserId } from "@/Models/SessionModel"
import { createEventWithOrgID, getOrgEvents, getEventData, getEventID } from '@/Models/eventModel'

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