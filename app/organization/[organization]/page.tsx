// displays org and all events and presents option to follow
import { getOrgInfo } from '../action'

export default async function UrlInformation({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(params.organization);
    if (orgInfo.success) {
        return (
            <div>
                <p>{orgInfo.payload["organizationName"]}</p>
                <p>{orgInfo.payload["description"]}</p>
            </div>
        )
    }
    return null
}