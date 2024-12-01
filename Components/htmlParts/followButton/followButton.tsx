'use client';

import React, { useState } from 'react';

export default function FollowButton({
    followButtonValue,
    orgID,
    followOrg,
    unfollowOrg,
}: {
    followButtonValue: number;
    orgID: string;
    followOrg: (orgID: string) => Promise<boolean>;
    unfollowOrg: (orgID: string) => Promise<boolean>;
}) {
    const [state, setState] = useState(followButtonValue);

    const handleFollow = async () => {
        const success = await followOrg(orgID);
        if (success) {
            setState(2); // Update state to reflect "following"
        } else {
            alert('Failed to follow the organization. Please try again.');
        }
    };

    const handleUnfollow = async () => {
        const success = await unfollowOrg(orgID);
        if (success) {
            setState(1); // Update state to reflect "not following"
        } else {
            alert('Failed to unfollow the organization. Please try again.');
        }
    };

    if (state === 0) {
        return <button disabled>Please log in to follow this organization</button>;
    }

    if (state === 1) {
        return <button onClick={handleFollow}>Follow Organization</button>;
    }

    if (state === 2) {
        return <button onClick={handleUnfollow}>Unfollow Organization</button>;
    }

    return null;
}