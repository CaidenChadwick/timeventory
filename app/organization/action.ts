import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName } from '@/Models/orgModel'
import { getSessionToken } from "@/utils/cookieManager";
import { createEventWithOrgID } from '@/Models/eventModel'

export async function getOrgInfo(orgName:string): Promise<Status> {
    return await getOrgInfoByName(orgName)
}

export async function saveEvent(orgId: string, formData: {
                                eventName: string; 
                                timeOfEvent: Date; 
                                placeOfEvent: string; 
                                description: string; }): Promise<boolean> {
    const token = await getSessionToken();
    let message = "";
    console.log(alert)
    if(token){
        try {
            const status = await createEventWithOrgID(orgId, token, formData.eventName, formData.timeOfEvent, formData.placeOfEvent, formData.description);
            alert(status.message)
            alert(status.success)
            return status.success;
        } catch (error) {
            alert(error)
            console.error("Failed to save organization:", error);
        }
    }
    alert(message)
    return false;
}
