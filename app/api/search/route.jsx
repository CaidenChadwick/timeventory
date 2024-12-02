'use server'

import getOrganizationBySearch from '@/Components/Models/UserFeedModel'
import Fuse from "fuse.js";

export default async function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        res.status(200).json([]);
        return;
    }

    try {
        // Fetch directly from the database for partial matches
        const items = await getOrganizationBySearch(q);

        // If you want to use Fuse.js for fuzzier matches:
        if (items.length < 1) {
            const allItems = await getAllItems(); // Fetch all items
            const fuse = new Fuse(allItems, {
                keys: ["name", "description"],
                threshold: 0.3,
            });
            const fuzzyResults = fuse.search(q).map((result) => result.item);
            res.status(200).json(fuzzyResults);
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Search failed:", error);
        res.status(500).json({ error: "Database query failed" });
    }
}