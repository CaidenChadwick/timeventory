// displays org and all events and presents option to follow
import { getOrgInfo } from '../action'

export default async function UrlInformation({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(params.organization);
    console.log(orgInfo.success)
    console.log(orgInfo.message)
    console.log(orgInfo.code)
    if (orgInfo.success) {
        return (
            <div>
                <p>{orgInfo.payload[0]}</p>
                <p>{orgInfo.payload[1]}</p>
                <p>{orgInfo.payload[2]}</p>
                <p>{orgInfo.payload[3]}</p>
            </div>
        )
    }
    return null
}