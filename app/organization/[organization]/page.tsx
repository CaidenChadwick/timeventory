// displays org and all events and presents option to follow
import { getOrgInfo, findEventsOfOrg, isUserOrgOwner } from '../action'

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
    const isOwner = await isUserOrgOwner(orgInfo.payload["id"])
    const orgEvents = await findEventsOfOrg(orgInfo.payload["id"]);
    console.log(orgEvents.payload)
    if (orgInfo.success) {
        return (
            <div>
                <p>{orgInfo.payload["organizationName"]}</p>
                <p>{orgInfo.payload["description"]}</p>
                {orgEvents.success && orgEvents.payload ? (
                    <div>
                        {orgEvents.payload.map((event: EventData) => (
                            <a key={event.id} href={`./${params.organization}/events/${event.eventName}`}>{event.eventName}</a>
                        ))}
                    </div>
                ) : null}
                {isOwner ? (
                    <a href={`/organization/${params.organization}/createEvent`}>Create Event</a>
                ): null}
                
            </div>
        )
    }
    return null
}