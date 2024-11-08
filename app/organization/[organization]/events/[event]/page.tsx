import { getEventDataWithName } from "../../../action"

export default async function UrlInformation({
  params,
}: {
  params: { event: string };
}) {
  const eventName = decodeURIComponent(params.event);
  console.log(eventName)
  const eventData = await getEventDataWithName(eventName);
    if (eventData.success) {
      const dateString = eventData.payload["timeOfEvent"].toLocaleString()
        return (
            <div>
                <h1>{eventData.payload["eventName"]}</h1>
                <p>{dateString}</p>
                <p>{eventData.payload["placeOfEvent"]}</p>
                <p>{eventData.payload["description"]}</p>
            </div>
        );
    }
    else {
        console.log("failed to display event data" + eventData.message)
        return (
          <div>
            <h1>404 - Event Not Found</h1>
          </div>
        );
    }
}