'use client'

import React, { useState } from 'react';

export default function FollowButton({
    followButtonValue,
    orgID,
    userID,
    followOrg,
    unfollowOrg,
}: {
    followButtonValue: number;
    orgID: string;
    userID: string;
    followOrg: (userID: string, orgID: string) => Promise<boolean>;
    unfollowOrg: (userID: string, orgID: string) => Promise<boolean>;
}) {
    const [state, setState] = useState(followButtonValue);

    const handleFollow = async () => {
        const success = await followOrg(userID, orgID);
        if (success) {
            setState(2); // Update state to reflect "following"
            window.location.reload(); // Reload the page
        } else {
            alert('Failed to follow the organization. Please try again.');
        }
    };

    const handleUnfollow = async () => {
        const success = await unfollowOrg(userID, orgID);
        if (success) {
            setState(1); // Update state to reflect "not following"
            window.location.reload(); // Reload the page
        } else {
            alert('Failed to unfollow the organization. Please try again.');
        }
    };

    if (state === 0) {
        return <button className='nopadding' disabled>Please log in to follow this organization</button>;
    }

    if (state === 1) {
        return <button className='nopadding' onClick={handleFollow}>Follow Organization</button>;
    }

    if (state === 2) {
        return <button className='nopadding' onClick={handleUnfollow}>Unfollow Organization</button>;
    }

    return null;
}