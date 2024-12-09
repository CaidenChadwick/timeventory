'use server'

import prisma from '@/db'
import Fuse from 'fuse.js';
import { Status } from '@/types/databaseUtilityTypes';


/**
 * Get Organizations using fuzzy search
 * @param query - search term
 * @returns organization items matching search
*/

export async function getOrganizationBySearch(query: string): Promise<{ id: string; ownerId: string; organizationName: string; description: string | null; }[] | null> {

    try {
        // Use Fuse.js for case-insensitive search
        const items = await prisma.organization.findMany();
        const fuse = new Fuse(items, {
            keys: ["organizationName", "description"],
            threshold: 0.45,
        });

        return fuse.search(query, { limit: 2 }).map((result) => result.item);
    } catch (error) {
        console.error("Error in getOrganizationBySearch:", error);
        throw new Error("Search failed");
    }
}


/**
 * Get organizations with the most followers
 * @param username - User's username
 * @param password - User's password
 * @returns Status object
*/

export async function getPopularOrganizations(): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null,
    };

    try {
        const items = await prisma.organization.findMany({
            orderBy: {
                followers: {
                    _count: 'desc',
                }
            },
            take: 10 // Limit results
        });
        status.payload = items;
        return status;
    } catch (error) {
        console.error("Error in getRandomOrganization:", error);
        throw new Error("Search failed");
    }
}