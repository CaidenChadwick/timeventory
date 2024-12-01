import { getOrgInfo, findEventsOfOrg, isUserOrgOwner, isUserFollowingOrg, unfollowOrganization, followOrganization } from '../action';
import FollowButton from '@/Components/htmlParts/followButton/followButton'; // Import the client component

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

    const isOwner = await isUserOrgOwner(orgInfo.payload["id"]);
    const orgEvents = await findEventsOfOrg(orgInfo.payload["id"]);
    const followButtonValue = await isUserFollowingOrg(orgInfo.payload["id"]);

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
                    followOrg={followOrganization}
                    unfollowOrg={unfollowOrganization}
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