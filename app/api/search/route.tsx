'use server'

import { NextApiRequest, NextApiResponse } from 'next';
import { getOrganizationBySearch } from "@/Models/UserFeedModel";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;

    if (!q) {
        res.status(200).json([]);
        return;
    }

    try {
        // Fetch directly from the database for partial matches
        const items = await getOrganizationBySearch(q as string);

        res.status(200).json(items);
    } catch (error) {
        console.error("Search failed:", error);
        res.status(500).json({ error: "Database query failed" });
    }
}