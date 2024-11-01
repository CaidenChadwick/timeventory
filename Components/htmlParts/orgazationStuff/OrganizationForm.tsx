"use client"

import React, { useState } from 'react';

interface OrganizationFormProps {
    onSubmit: (formData: { name: string; description: string; email: string }) => void;
}

export default function OrganizationForm({ onSubmit }: OrganizationFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            alert("Name and email are required.");
            return;
        }
        onSubmit({ name, description, email });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Organization Name (required):</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
            <div>
                <label htmlFor="email">Email (required):</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}