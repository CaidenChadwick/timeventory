import { 
    checkToSeeIfThisUserMatchesProfile, 
    getUserInfo, 
    getAllOrgsThatUserOwns, 
    getAllOrgsThatUserFollows, 
    handleGetAllOrgVolunteer 
} from '../action';

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
    const userInfo = await getUserInfo(decodeURIComponent(params.username));

    if (userInfo.success && userInfo.payload) {
        const [username, email, id] = userInfo.payload;
        const orgsOwned = await getAllOrgsThatUserOwns(id);
        const orgsFollowed = await getAllOrgsThatUserFollows(id);
        const isUserLoggedIn = await checkToSeeIfThisUserMatchesProfile(decodeURIComponent(params.username));
        const orgsVolunteered = await handleGetAllOrgVolunteer(id);

        return (
            <div>
                <h1 className="orange">Name: {username}</h1>
                {email ? <h2>Email: {email}</h2> : <h2>No Email</h2>}

                <br />
                {isUserLoggedIn ? (
                    <div>
                        <a href={`/createOrg`} className="fakeButton">Create Org</a>
                    </div>
                ) : (
                    <p>User is not logged in</p>
                )}

                <div>
                    <h1 className="orange">--- Followed Organizations ---</h1>
                    {orgsFollowed.success && orgsFollowed.payload && orgsFollowed.payload.length > 0 ? (
                        orgsFollowed.payload.map((org: Organization) => (
                            <a className="link" key={org.id} href={`/organization/${org.organizationName}`}>
                                {org.organizationName}
                            </a>
                        ))
                    ) : (
                        <p className='grey'>No organizations followed.</p>
                    )}
                </div>

                {orgsOwned.success && orgsOwned.payload && orgsOwned.payload.length > 0 ? (
                    <div>
                        <h1 className="orange">--- Hosted Organizations ---</h1>
                        {orgsOwned.payload.map((org: Organization) => (
                            <a className="link" key={org.id} href={`/organization/${org.organizationName}`}>
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