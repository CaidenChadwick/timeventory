import { getOrgInfo, findEventsOfOrg, isUserOrgOwner, isUserFollowingOrg, unfollowOrganization, followOrganization, getTheUserId, userVolunteerStatus, createVolunteeringRequest } from '../action';
import FollowButton from '@/Components/htmlParts/followButton/followButton'; 
import VolunteerButton from '@/Components/htmlParts/VolunteerRequestButton/volunteerButton'; 

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
    var followButtonValue = 0
    var volunteerButtonValue = 0
    if (!isOwner) {
        followButtonValue = await isUserFollowingOrg(userID, orgInfo.payload["id"]);
        volunteerButtonValue = await userVolunteerStatus(userID, orgInfo.payload["id"]);
    }
    

    if (orgInfo.success) {
        return (
            <div>
                <p>{orgInfo.payload["organizationName"]}</p>
                <p>{orgInfo.payload["description"]}</p>

                {orgEvents.success && orgEvents.payload ? (
                    <div>
                        {orgEvents.payload.map((event: EventData) => (
                            <a key={event.id} href={`./${params.organization}/events/${event.eventName}`}>
                                {event.eventName}
                            </a>
                        ))}
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

                {!isOwner && (
                    <VolunteerButton
                    VolunteerButtonValue={volunteerButtonValue}
                    orgID={orgInfo.payload["id"]}
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