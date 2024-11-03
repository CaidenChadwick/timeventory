import { Status } from '@/types/databaseUtilityTypes'
import { getOrgInfoByName } from '@/Models/orgModel'

export async function getOrgInfo(orgName:string): Promise<Status> {
    return await getOrgInfoByName(orgName)
}
