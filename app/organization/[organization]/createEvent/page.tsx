"use client"

import React from 'react';
import EventForm from '@/Components/htmlParts/eventStuff/EventForm';
import { saveEvent } from '../../action';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function NewEventPage() {
    const router = useRouter();
    const { orgname } = useParams();

    const 

    const handleFormSubmit = async (formData: { 
        eventName: string; 
        timeOfEvent: string; 
        placeOfEvent: string; 
        description: string;  
    }) => {
        const success = await saveEvent(orgname, formData);
        
        if (success) {
            router.push('/organization');
        } else {
            alert("Failed to create event. Please try again.");
        }
    };

    return <EventForm onSubmit={handleFormSubmit} />;
}