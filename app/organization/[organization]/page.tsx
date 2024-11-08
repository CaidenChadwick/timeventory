// displays org and all events and presents option to follow
import { getOrgInfo, findEventsOfOrg } from '../action'

interface EventData {
    id: string;
    eventName: string;
}

export default async function UrlInformation({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(params.organization);
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
                <a href={`/organization/${params.organization}/createEvent`}>Create Event</a>
            </div>
        )
    }
    return null
}