'use server'

import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationBySearch } from '@/Models/feedModel';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 }); // Enforce GET-only
    }

    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get('q')

    if (!q || typeof q !== 'string') {
        return NextResponse.json({ message: "Invalid query" }, { status: 400 }); // Validate input
    }

    try {
        const items = await getOrganizationBySearch(q); // Return Search Result

        return NextResponse.json(items);
    } catch (error) {
        console.error('Search failed:', error);
        return NextResponse.json({ message: "Could not retrieve search results" }, { status: 500 }); // Handle server error
    }
}
