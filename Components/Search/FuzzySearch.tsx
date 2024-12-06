'use client'

import React, { useState } from "react";

const FuzzySearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(`/api/search?q=${searchTerm}`);
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    interface Item {
        id: string,
        ownerId: string,
        organizationName: string,
        description: string | null
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
            />
            <ul className="mt-4">
                {results.length > 0 ? (
                    results.map((item: Item) => <li key={item.id}>{item.organizationName}</li>)
                ) : (
                    <li>No results found</li>
                )}
            </ul>
        </div>
    );
};

export default FuzzySearch;
