import { checkToSeeIfThisUserMatchesProfile, getUserInfo, getAllOrgsThatUserOwns, getAllOrgsThatUserFollows } from '../action';

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
        const orgsFollowed = await getAllOrgsThatUserFollows(id); // Ensure you're passing the correct ID or username
        
        return (
            <div>
                <h1 className = "orange">Name: {username}</h1>
                {email ? <h2>Email: {email}</h2> : <h2>No Email</h2>}

                <br></br>
                {isUserLoggedIn ? (
                    <a href={`/createOrg`} className = "fakeButton">Create Org</a>
                ) : (
                    <p>User is not logged in</p>
                )}
                
                {orgsFollowed.success && orgsFollowed.payload && orgsFollowed.payload.length > 0 ? (
                    <div>
                        <h1 className = "orange">--- Followed Organizations ---</h1>
                        {orgsFollowed.payload.map((org: Organization) => (
                            <a className = "link" key={org.id} href={`/organization/${org.organizationName}`}>
                                {org.organizationName}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p>No organizations followed.</p>
                )}

                {orgsOwned.success && orgsOwned.payload && orgsOwned.payload.length > 0 ? (
                    <div>
                        <h1 className = "orange">--- Hosted Organizations ---</h1>
                        {orgsOwned.payload.map((org: Organization) => (
                            <a className = "link" key={org.id} href={`/organization/${org.organizationName}`}>
                                {org.organizationName}
                            </a>
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