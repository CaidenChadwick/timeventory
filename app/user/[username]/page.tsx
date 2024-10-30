import { checkToSeeIfThisUserMatchesProfile, getUserInfo } from '../action'

export default async function UrlInformation({
    params,
}: {
    params: { username: string };
}) {
    const userInfo = await getUserInfo(params.username);

    if (userInfo.success) {
        const isUserLoggedIn = await checkToSeeIfThisUserMatchesProfile(params.username);

        return (
            <div>
                <h1>Name: {userInfo.payload[0]}</h1>
                {userInfo.payload[1] != null ? (
                    <h2>Email: {userInfo.payload[1]}</h2>
                ) : (
                    <h2>No Email</h2>
                )}

                {isUserLoggedIn ? (
                    <a href={`/createOrg/${params.username}`}>Create Org</a>
                ) : (
                    <p>User is not logged in</p>
                )}
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