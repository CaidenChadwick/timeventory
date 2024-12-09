'use client';

import React from 'react';
import { Status } from '@/types/databaseUtilityTypes'; // Adjust the import path as necessary

interface VolunteerRequest {
    userID: string;
    userName: string;
    orgID: string;
    message: string;
}

interface VolunteerRequestsProps {
    requests: VolunteerRequest[];
    orgId: string;
    acceptRequest: (userID: string, orgID: string) => Promise<Status>;
    declineRequest: (userID: string, orgID: string) => Promise<Status>;
}

export default function VolunteerRequests({
    requests,
    orgId,
    acceptRequest,
    declineRequest,
}: VolunteerRequestsProps) {
    return (
        <div className="topBottomLine">
            <h2>Volunteer Requests</h2>
            {requests.length === 0 ? (
                <p>No requests available.</p>
            ) : (
                requests.map((request, index) => (
                    <div key={index}>
                        <p>Volunteer request from {request.userName}!</p>
                        <p>{request.message}</p>
                        <button onClick={async () => {
                            const status = await acceptRequest(request.userID, orgId);
                            if (status.success) {
                                window.location.reload(); // Refresh the page
                            } else {
                                alert('Failed to accept request.');
                            }
                        }}>
                            Accept
                        </button>
                        <button onClick={async () => {
                            const status = await declineRequest(request.userID, orgId);
                            if (status.success) {
                                window.location.reload(); // Refresh the page
                            } else {
                                alert('Failed to decline request.');
                            }
                        }}>
                            Decline
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}