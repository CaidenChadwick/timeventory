"use server";

import React from 'react';
import { getOrgInfo, getAllRequest, getTheUserId, getUsername } from '../../action';
import { redirect } from 'next/navigation';
import { acceptRequest, declineRequest } from '@/Models/VolunteerModel';
import VolunteerRequests from '@/Components/htmlParts/VolunteerRequestButton/acceptRequestButton';

interface UpdatedRequest {
    userID: string;
    userName: string;
    orgID: string;
    message: string;
}

export default async function NewEventPage({
    params,
}: {
    params: { organization: string };
}) {
    const orgInfo = await getOrgInfo(decodeURIComponent(params.organization));

    if (!orgInfo || !orgInfo.payload) {
        return <div>404 - Organization Not Found</div>;
    }

    const user = await getTheUserId();
    if (user !== orgInfo.payload["ownerId"]) {
        redirect(`/organization/${params.organization}`);
    }

    const orgId = orgInfo.payload["id"];
    const allRequests = await getAllRequest(user, orgId);
    
    const updatedRequests: UpdatedRequest[] = await Promise.all(
        allRequests.payload.map(async (request: any) => {
            const usernameResponse = await getUsername(request.userID);

            return {
                userID: request.userID,
                usernameResponse,
                orgID: orgId,
                message: request.message,
            };
        })
    );

    return (
        <VolunteerRequests
            requests={updatedRequests}
            orgId={orgId}
            acceptRequest={acceptRequest}
            declineRequest={declineRequest}
        />
    );
}