import { getOrgInfo, findEventsOfOrg, isUserOrgOwner, isUserFollowingOrg, unfollowOrganization, followOrganization, getTheUserId, userVolunteerStatus, createVolunteeringRequest } from '../action';
import FollowButton from '@/Components/htmlParts/followButton/followButton'; 
import VolunteerButton from '@/Components/htmlParts/VolunteerRequestButton/volunteerButton'; 
import { getFollowerCount } from '@/Models/orgModel'

interface EventData {
    id: string;
    eventName: string;
}

export default async function UrlInformation({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(decodeURIComponent(params.organization));
    if (!orgInfo.success) {
        return <div>404 - Organization Not Found</div>;
    }

    const userID = await getTheUserId();
    const isOwner = await isUserOrgOwner(userID, orgInfo.payload["id"]);
    const orgEvents = await findEventsOfOrg(orgInfo.payload["id"]);
    const followerCount = await getFollowerCount(orgInfo.payload["id"]);
    var followButtonValue = 0
    var volunteerButtonValue = 0
    if (!isOwner) {
        followButtonValue = await isUserFollowingOrg(userID, orgInfo.payload["id"]);
        volunteerButtonValue = await userVolunteerStatus(userID, orgInfo.payload["id"]);
    }
    

    if (orgInfo.success) {
        return (
            <div>
                <p className='orange'>{orgInfo.payload["organizationName"]}</p>
                <p>Follower Count: {followerCount}</p>
                <p>{orgInfo.payload["description"]}</p>

                {orgEvents.success && orgEvents.payload ? (
                    <div>
                        <p className='orange'>--- Events ---</p>
                        {orgEvents.payload.length > 0 ? (
                            orgEvents.payload.map((event: EventData) => (
                                <p key={event.id}>
                                    <a className='link' href={`./${params.organization}/events/${event.eventName}`}> {event.eventName}</a>
                                </p>
                            ))
                        ) : (
                            <p className = "grey">This Org Has No Events</p>
                        )}
                    </div>
                ) : null}

                {!isOwner && (
                    <FollowButton
                    followButtonValue={followButtonValue}
                    orgID={orgInfo.payload["id"]}
                    userID={userID}
                    followOrg={followOrganization}
                    unfollowOrg={unfollowOrganization}
                    />
                )}

                {true && (
                    <VolunteerButton
                    VolunteerButtonValue={volunteerButtonValue}
                    orgID={orgInfo.payload["id"]}
                    orgName={params.organization}
                    userID={userID}
                    createVolunteeringRequest={createVolunteeringRequest}
                />
                )}

                {isOwner && (
                    <a href={`/organization/${params.organization}/createEvent`}>Create Event</a>
                )}
            </div>
        );
    }
    return null;
}