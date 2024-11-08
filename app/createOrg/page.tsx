"use client"

import React from 'react';
import OrganizationForm from '@/Components/htmlParts/orgazationStuff/OrganizationForm';
import { saveOrganization } from './action';
import { useRouter } from 'next/navigation';

export default function NewOrganizationPage() {
    const router = useRouter();

    const handleFormSubmit = async (formData: { name: string; description: string; email: string }) => {
        const success = await saveOrganization(formData);
        
        if (success) {
            router.push(`/organization/${formData.name}`);
        } else {
            alert("Failed to create organization. Please try again.");
        }
    };

    return <OrganizationForm onSubmit={handleFormSubmit} />;
}