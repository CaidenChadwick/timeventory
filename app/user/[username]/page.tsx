import { checkToSeeIfThisUserMatchesProfile, getUserInfo, getAllOrgsThatUserOwns } from '../action'
interface Organization {
    id: string;
    organizationName: string;
}

interface Status {
    success: boolean;
    code: number;
    message: string;
    payload: any[] | null; // Adjust as per actual payload structure
}

export default async function UrlInformation({
    params,
}: {
    params: { username: string };
}) {
    const userInfo = await getUserInfo(params.username);

    if (userInfo.success && userInfo.payload) {
        const [username, email, id] = userInfo.payload;
        const orgsOwned = await getAllOrgsThatUserOwns(id);
        const isUserLoggedIn = await checkToSeeIfThisUserMatchesProfile(params.username);
        return (
            <div>
                <h1>Name: {username}</h1>
                {email ? <h2>Email: {email}</h2> : <h2>No Email</h2>}

                {isUserLoggedIn ? (
                    <a href={`/createOrg`}>Create Org</a>
                ) : (
                    <p>User is not logged in</p>
                )}
                
                {orgsOwned.success && orgsOwned.payload ? (
                    <div>
                        {orgsOwned.payload.map((org: Organization) => (
                            <a key={org.id} href = {`/organization/${org.organizationName}`}>{org.organizationName}</a>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    } else {
        return (
            <div>
                <h1>404, user does not exist!</h1>
            </div>
        );
    }
}