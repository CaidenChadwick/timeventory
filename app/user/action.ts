'uses server'
// eric
import { isLoggedIn, getUserId } from '@/Models/SessionModel'
import { getUserData, getUsername } from '@/Models/UserModel'
import { getOrgsUserFollows, getAllOrgs } from '@/Models/orgModel'
import { getSessionToken } from '@/utils/cookieManager';
import { Status } from '@/types/databaseUtilityTypes';
import { getAllOrgsUserVolunteersFor } from '@/Models/VolunteerModel'

export async function checkToSeeIfThisUserMatchesProfile(username:string): Promise<boolean> {
    return username === await getUserNameFromSession()
}

export async function getUserInfo(username: string):Promise<Status> {
    return getUserData(username)
}

export async function getUserNameFromSession():Promise<string | null>{
    const token = await getSessionToken();
    if (token) {
        const userID = await getUserId(token.toString());
        if (userID) {
            const userName = await getUsername(userID);
            if (userName) {
                return userName;
            }
        }
    }
    return null;
}

export async function getAllOrgsThatUserOwns(userId:string): Promise<Status> {
    return getOrgsUserFollows(userId);
}

export async function getAllOrgsThatUserFollows(userId:string):Promise<Status> {
    return await getAllOrgs(userId)
}

export async function handleGetAllOrgVolunteer(userID: string):Promise<Status> {
    return await getAllOrgsUserVolunteersFor(userID)
}