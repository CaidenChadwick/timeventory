import { getOrgInfo, getTheUserId, userVolunteerStatus, isUserClockedIn, handleClockIn } from '../../action';
import { redirect } from 'next/navigation';
import ClockInButton from '@/Components/htmlParts/clockIn/clockInButton';

export default async function clockIn({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(decodeURIComponent(params.organization));
    if (!orgInfo.success) {
        return <div>404 - Organization Not Found</div>;
    }

    const userID = await getTheUserId();
    const volunteerStatus = await userVolunteerStatus(userID, orgInfo.payload["id"]);
    if (volunteerStatus === 4) {
        const clockedInStatus = await isUserClockedIn(userID, orgInfo.payload["id"]);

        return (
            <div>
                <ClockInButton 
                    userID={userID} 
                    orgID={orgInfo.payload["id"]} 
                    onClockIn={handleClockIn} // Pass clock-in function
                    initialClockedInStatus={clockedInStatus} // Pass the initial clocked-in status
                />
            </div>
        );
    } else {
        redirect(`/organization/${params.organization}`);
    }
}