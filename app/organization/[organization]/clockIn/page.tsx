import { getOrgInfo, getTheUserId, userVolunteerStatus, isUserClockedIn, handleClockIn, getTheVolunteerLogs } from '../../action';
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
        const logsResponse = await getTheVolunteerLogs(userID, orgInfo.payload["id"]);

        // Check if logs were fetched successfully
        const logs = logsResponse.success ? logsResponse.payload : [];
        
        // Calculate total time
        const totalDuration = logs.reduce((total, log) => {
            const startTime = new Date(log.startTime);
            const endTime = log.endTime ? new Date(log.endTime) : new Date(); // Use current time if still clocked in
            return total + (endTime.getTime() - startTime.getTime());
        }, 0);

        // Convert total milliseconds to hours and minutes
        const totalHours = Math.floor(totalDuration / (1000 * 60 * 60)); // total milliseconds to hours
        const totalMinutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

        return (
            <div>
                <ClockInButton 
                    userID={userID} 
                    orgID={orgInfo.payload["id"]} 
                    onClockIn={handleClockIn} // Pass clock-in function
                    initialClockedInStatus={clockedInStatus} // Pass the initial clocked-in status
                />
                
                <h2>Volunteer Logs:</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'orange', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Start Time</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid black' }}>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        {new Date(log.startTime).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        {log.endTime ? new Date(log.endTime).toLocaleString() : "Still Active"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center' }}>No logs available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {logs.length > 0 && (
                    <div>
                        <h3>Total Volunteer Time:</h3>
                        <p>{totalHours} hours and {totalMinutes} minutes</p>
                    </div>
                )}
            </div>
        );
    } else {
        redirect(`/organization/${params.organization}`);
    }
}