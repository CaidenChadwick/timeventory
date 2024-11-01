'uses server'
// eric
import { isLoggedIn, getUserId } from '@/Models/SessionModel'
import { getUserData, getUsername } from '@/Models/UserModel'
import { getSessionToken } from '@/utils/cookieManager';
import { Status } from '@/types/databaseUtilityTypes';

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