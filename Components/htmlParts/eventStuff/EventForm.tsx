"use client"

import React, { useState } from 'react';

interface EventFormProps {
    onSubmit: (formData: { 
        eventName: string; 
        timeOfEvent: Date; 
        placeOfEvent: string; 
        description: string; 
    }) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
    const [eventName, setEventName] = useState('');
    const [timeOfEvent, setTimeOfEvent] = useState('');
    const [placeOfEvent, setPlaceOfEvent] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventName || !timeOfEvent || !placeOfEvent) {
            alert("All fields except description are required.");
            return;
        }
        
        // Convert `timeOfEvent` to a Date object
        const timeOfEventDate = new Date(timeOfEvent);

        onSubmit({
            eventName,
            timeOfEvent: timeOfEventDate,
            placeOfEvent,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="eventName">Event Name (required):</label>
                <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="timeOfEvent">Time of Event (required):</label>
                <input
                    type="datetime-local"
                    id="timeOfEvent"
                    value={timeOfEvent}
                    onChange={(e) => setTimeOfEvent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="placeOfEvent">Place of Event (required):</label>
                <input
                    type="text"
                    id="placeOfEvent"
                    value={placeOfEvent}
                    onChange={(e) => setPlaceOfEvent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description (optional):</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}