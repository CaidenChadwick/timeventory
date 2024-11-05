import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName } from '@/Models/orgModel'
import { getSessionToken } from "@/utils/cookieManager";
import { createEventWithOrgID, getOrgEvents } from '@/Models/eventModel'

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

export async function findEventsOfOrg(ordID: string): Promise<Status> {
    return await getOrgEvents(ordID)
}