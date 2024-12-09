import { getOrgInfo, getTheUserId, isUserOrgOwner } from '../../action';
import { getAllVolunteers } from '@/Models/VolunteerModel';
import { redirect } from 'next/navigation';

export default async function timesheet({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(decodeURIComponent(params.organization));
    if (!orgInfo.success) {
        return <div>404 - Organization Not Found</div>;
    }

    const userID = await getTheUserId();
    if (await isUserOrgOwner(userID, orgInfo.payload['id'])) {
        const volunteersResponse = await getAllVolunteers(orgInfo.payload['id']);

        if (!volunteersResponse.success || !volunteersResponse.payload) {
            return <div>Error fetching volunteer information.</div>;
        }

        const volunteers = volunteersResponse.payload;

        return (
            <div>
                <h1 className='orange'>Timesheet for {orgInfo.payload.organizationName}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Hours</th>
                            <th>Clock-In Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.map((volunteer: any) => (
                            <tr key={volunteer.user.id}>
                                <td>{volunteer.user.username}</td>
                                <td>{volunteer.user.email || 'No Email'}</td>
                                <td>{volunteer.totalHours}</td>
                                <td>{volunteer.isClockedIn ? 'Clocked In' : 'Clocked Out'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        redirect(`/organization/${params.organization}`);
    }
}