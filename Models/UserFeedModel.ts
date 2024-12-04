'use server'

import prisma from '@/db'
import Fuse from 'fuse.js';

export async function getOrganizationBySearch(query: string): Promise<{ id: string; ownerId: string; organizationName: string; description: string | null; }[] | null> {

    try {
        // Use Fuse.js for case-insensitive search
        const items = await prisma.organization.findMany();
        const fuse = new Fuse(items, {
            keys: ["name", "description"],
            threshold: 0.3,
        });

        return fuse.search(query).map((result) => result.item);
    } catch (error) {
        console.error("Error in getOrganizationBySearch:", error);
        throw new Error("Search failed");
    }
}