'use client'

import React, { useState } from 'react';

export default function VolunteerButton({
    VolunteerButtonValue,
    orgID,
    orgName,
    userID,
    createVolunteeringRequest,
}: {
    VolunteerButtonValue: number;
    orgID: string;
    orgName: string;
    userID: string;
    createVolunteeringRequest: (userID: string, orgID: string, message: string) => Promise<boolean>;
}) {
    const [state, setState] = useState(VolunteerButtonValue);
    const [message, setMessage] = useState(''); // State for the user's message

    const handleCreateRequest = async () => {
        if (!message.trim()) {
            alert('Please enter a message before submitting.');
            return;
        }
        const status = await createVolunteeringRequest(userID, orgID, message);
        if (status) {
            setState(3); // Update state to "request pending"
        } else {
            alert('Failed to create volunteer request. Please try again.');
        }
    };

    return (
        <div>
            {/* State 0: User is owner */}
            {state === 0 && (
                <button
                    onClick={() => {
                        window.location.href = `/organization/${orgName}/request`;
                    }}
                >
                    Volunteer Request Tracker
                </button>
            )}

            {state === 0 && (
                <button
                    onClick={() => {
                        window.location.href = `/organization/${orgName}/timesheet`;
                    }}
                >
                    Volunteer Time Tracker
                </button>
            )}  

            {/* State 1: User not logged in */}
            {state === 1 && (
                <button
                    onClick={() => {
                        window.location.href = '/login';
                    }}
                >
                    Log in to Volunteer
                </button>
            )}

            {/* State 2: User logged in and hasn't sent a request */}
            {state === 2 && (
                <div>
                    <textarea
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        cols={50}
                        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                    />
                    <button onClick={handleCreateRequest}>
                        Volunteer for This Organization
                    </button>
                </div>
            )}

            {/* State 3: Volunteer request pending */}
            {state === 3 && <p>Your volunteer request is pending approval.</p>}

            {/* State 4: User is a volunteer */}
            {state === 4 && (
                <button
                    onClick={() => {
                        window.location.href = `/organization/${orgName}/clockIn`;
                    }}
                >
                    Time Sheet Page
                </button>
            )}
        </div>
    );
}