'use client'

import { useState, useEffect } from 'react';

interface Organization {
    id: number;
    name: string;
}

export default function LiveFeed() {
    const [searchTerm, setSearchTerm] = useState('');
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm === '') {
            setOrganizations([]);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/suggestions?query=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setOrganizations(data.organizations);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchData, 300); // Add debounce to reduce API calls
        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for organizations..."
                className="border p-2"
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {organizations.map((org) => (
                        <li key={org.id}>{org.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}