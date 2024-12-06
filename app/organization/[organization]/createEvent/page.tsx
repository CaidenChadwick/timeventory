"use server";

import React from 'react';
import EventForm from '@/Components/htmlParts/eventStuff/EventForm';
import { getOrgInfo, saveEvent, getTheUserId, sendEmails } from '../../action';
import { redirect } from 'next/navigation'; // Import redirect function

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

    return <EventForm orgId={orgId} orgName={params.organization} saveEvent={saveEvent} sendEmails={sendEmails} />;
}