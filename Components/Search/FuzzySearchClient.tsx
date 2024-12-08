'use client'

import React, { useState } from "react";
import Link from "next/link";
import { Form, InputGroup, Dropdown } from "react-bootstrap";

export default function FuzzySearchClient() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const res = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(searchTerm)}`, {
                method: "GET"
            });

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
        id: string;
        ownerId: string;
        organizationName: string;
        description: string | null;
    }

    return (
        <div className="relative flex">
            <InputGroup className="">
                <Form.Control
                    type="text"
                    placeholder="Find an Organization"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // To allow click events
                    className="text-white bg-gray-800"
                />
            </InputGroup>
            {isDropdownOpen && results.length > 0 && (
                <Dropdown.Menu show={isDropdownOpen} className="w-100 bg-white max-h-80">
                    {results.map((item: Item) => (
                        <Dropdown.Item key={item.id} as="li" className="border-top border-bottom hover:bg-gray-500">
                            <Link href={`/organization/${item.organizationName}`} className="text-black">
                                {item.organizationName}
                            </Link>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )}
        </div>
    );
}