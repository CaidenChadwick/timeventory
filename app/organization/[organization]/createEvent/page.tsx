"use client"

import React from 'react';
import EventForm from '@/Components/htmlParts/eventStuff/EventForm';
import { saveEvent, getOrgInfo } from '../../action';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function NewEventPage() {
    const router = useRouter();
    const orgName = usePathname().split('/')[2];

    const handleFormSubmit = async (formData: { 
        eventName: string; 
        timeOfEvent: Date; 
        placeOfEvent: string; 
        description: string;  
    }) => {
        const orgInfo = await getOrgInfo(orgName);
        const success = await saveEvent(orgInfo.payload["id"], formData);
        if (success) {
            router.push("./");
        } else {
            alert("Failed to create event. Please try again.");
        }
    };

    return <EventForm onSubmit={handleFormSubmit} />;
}