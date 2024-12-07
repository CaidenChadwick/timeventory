"use client"
import React, { useState } from 'react';

interface ClockInButtonProps {
    userID: string;
    orgID: string;
    onClockIn: (userID: string, orgID: string) => Promise<any>; // Function prop to handle clock in/out
    initialClockedInStatus: boolean; // Prop for initial clocked-in status
}

const ClockInButton: React.FC<ClockInButtonProps> = ({
    userID,
    orgID,
    onClockIn,
    initialClockedInStatus,
}) => {
    const [isClockedIn, setIsClockedIn] = useState<boolean>(initialClockedInStatus);

    const toggleClockIn = async () => {
        const status = await onClockIn(userID, orgID); // Call the passed clock in function
        if (status.success) {
            setIsClockedIn(prev => !prev); // Toggle clocked-in status
        } else {
            console.error("Failed to toggle clock in/out");
        }
    };

    return (
        <button onClick={toggleClockIn} className="clock-in-button">
            {isClockedIn ? 'Clock Out' : 'Clock In'}
        </button>
    );
};

export default ClockInButton;