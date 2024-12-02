'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';

export async function createVolunteer(userId: string, orgId: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const volunteer = await prisma.volunteer.create({
            data: { userID: userId, orgID: orgId },
        });
        status.payload = volunteer;
    } catch (error) {
        console.error('Error creating volunteer:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to create volunteer.";
    }
    return status;
}

// Delete a volunteer record
export async function deleteVolunteer(userId: string, orgId: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const volunteer = await prisma.volunteer.delete({
            where: { userID_orgID: { userID: userId, orgID: orgId } },
        });
        status.payload = volunteer;
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to delete volunteer.";
    }
    return status;
}

// Create a volunteer log
export async function createVolunteerLog(
    orgId: string,
    userId: string,
    startTime: Date,
    endTime?: Date,
    message?: string
): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const log = await prisma.volunteerLog.create({
            data: {
                orgID: orgId,
                volunteerUserID: userId,
                volunteerOrgID: orgId,
                startTime,
                endTime,
                messesage: message,
            },
        });
        status.payload = log;
    } catch (error) {
        console.error('Error creating volunteer log:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to create volunteer log.";
    }
    return status;
}

// Delete a volunteer log
export async function deleteVolunteerLog(logId: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const log = await prisma.volunteerLog.delete({ where: { id: logId } });
        status.payload = log;
    } catch (error) {
        console.error('Error deleting volunteer log:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to delete volunteer log.";
    }
    return status;
}

// Create a volunteer request
export async function createVolunteerRequest(
    userId: string,
    orgId: string,
    message: string
): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const request = await prisma.volunteeringRequest.create({
            data: { userID: userId, orgID: orgId, messesage: message },
        });
        status.payload = request;
    } catch (error) {
        console.error('Error creating volunteer request:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to create volunteer request.";
    }
    return status;
}

// Delete a volunteer request
export async function deleteVolunteerRequest(userId: string, orgId: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const request = await prisma.volunteeringRequest.delete({
            where: { userID_orgID: { userID: userId, orgID: orgId } },
        });
        status.payload = request;
    } catch (error) {
        console.error('Error deleting volunteer request:', error);
        status.success = false;
        status.code = 500;
        status.message = "Failed to delete volunteer request.";
    }
    return status;
}

export async function doesRequestExist(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    }
    try {
        const request = await prisma.volunteeringRequest.findUnique({
            where: {
                userID_orgID: {
                    userID,
                    orgID,
                },
            },
        });
  
        if (request) {
            status.payload = request
            return status
        } else {
            status.success = false
            status.message = "It doesn't exist"
            status.code = 404;
            return status
        }
    } catch (error) {
        status.success = false;
        status.message = "Failed to check request existence.";
        status.code = 500; // Internal server error
        console.error('Error checking request existence:', error);
    }
    return status;
}

export async function isUserVolunteer(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    };

    try {
        const volunteer = await prisma.volunteer.findUnique({
            where: {
                userID_orgID: {
                    userID,
                    orgID,
                },
            },
        });

        if (volunteer) {
            status.payload = volunteer;
        } else {
            status.success = false;
            status.code = 404;
            status.message = "User is not a volunteer for theorganization.";
        }
    } catch (error) {
        status.success = false;
        status.code = 500;
        status.message = "Error checking volunteer status.";
        console.error('Error checking volunteer status:', error);
    }
    return status;
}