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
            data: { userID: userId, orgID: orgId, message: message },
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

export async function getRequestOfOrg(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "OK",
        payload: null
    };

    try {
        // Check if the user is the owner of the organization
        const organization = await prisma.organization.findUnique({
            where: { id: orgID },
            select: { ownerId: true }
        });

        if (!organization) {
            status.success = false;
            status.message = "Organization not found.";
            status.code = 404;
            return status;
        }

        if (organization.ownerId !== userID) {
            status.success = false;
            status.message = "Unauthorized: User is not the owner of the organization.";
            status.code = 403;
            return status;
        }

        // Fetch all volunteer requests for the organization
        const requests = await prisma.volunteeringRequest.findMany({
            where: { orgID: orgID }
        });

        status.payload = requests;

    } catch (error) {
        console.error('Error fetching volunteer requests:', error);
        status.success = false;
        status.message = 'Failed to fetch volunteer requests.';
        status.code = 500;
    }

    return status;
}

export async function acceptRequest(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "Request accepted and user added as volunteer.",
        payload: null
    };

    try {
        // Create a volunteer entry
        const volunteerStatus = await createVolunteer(userID, orgID);
        if (!volunteerStatus.success) {
            return {
                success: false,
                code: volunteerStatus.code,
                message: "Failed to create volunteer.",
                payload: volunteerStatus.payload,
            };
        }

        // Delete the volunteer request
        const requestStatus = await deleteVolunteerRequest(userID, orgID);
        if (!requestStatus.success) {
            return {
                success: false,
                code: requestStatus.code,
                message: "Failed to delete volunteer request.",
                payload: requestStatus.payload,
            };
        }

        status.payload = {
            volunteer: volunteerStatus.payload,
            requestDeleted: requestStatus.payload,
        };
        
    } catch (error) {
        console.error('Error accepting volunteer request:', error);
        status.success = false;
        status.message = 'Failed to accept request.';
        status.code = 500;
    }

    return status;
}

export async function declineRequest(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "Request declined.",
        payload: null
    };

    try {
        // Delete the volunteer request
        const requestStatus = await deleteVolunteerRequest(userID, orgID);
        if (!requestStatus.success) {
            return {
                success: false,
                code: requestStatus.code,
                message: "Failed to delete volunteer request.",
                payload: requestStatus.payload,
            };
        }

    } catch (error) {
        console.error('Error declining volunteer request:', error);
        status.success = false;
        status.message = 'Failed to decline request.';
        status.code = 500;
    }

    return status;
}

// if user clocked in, finish the last log
// if user not clocked in, create log
export async function clockInAction(userID: string, orgID: string): Promise<Status> {
    const status: Status = {
        success: true,
        code: 200,
        message: "ok",
        payload: null
    };

    try {
        // Check if the user is a volunteer for the organization
        const volunteerStatus = await isUserVolunteer(userID, orgID);
        if (!volunteerStatus.success) {
            return volunteerStatus; // Return the error status
        }

        const volunteer = volunteerStatus.payload;

        if (volunteer.isClockedIn) {
            // Clock out
            await prisma.volunteer.update({
                where: { userID_orgID: { userID, orgID } },
                data: { isClockedIn: false }
            });

            // Update the end time of the active log
            const logUpdateStatus = await prisma.volunteerLog.updateMany({
                where: {
                    volunteerUserID: userID,
                    orgID: orgID,
                    endTime: null // Open-ended logs
                },
                data: { endTime: new Date() }
            });

            if (logUpdateStatus.count === 0) {
                return {
                    success: false,
                    code: 404,
                    message: "No active log found to update",
                    payload: null
                };
            }

            return {
                success: true,
                code: 200,
                message: "User successfully clocked out",
                payload: { action: "clockedOut" }
            };
        } else {
            // Clock in
            await prisma.volunteer.update({
                where: { userID_orgID: { userID, orgID } },
                data: { isClockedIn: true }
            });

            // Create a new volunteer log
            const logStatus = await createVolunteerLog(orgID, userID, new Date());
            if (!logStatus.success) {
                return logStatus; // Return the error if log creation failed
            }

            return {
                success: true,
                code: 200,
                message: "User successfully clocked in",
                payload: { action: "clockedIn" }
            };
        }
    } catch (error) {
        console.error("Error in clockInAction:", error);
        return {
            success: false,
            code: 500,
            message: "An error occurred during the clock-in process",
            payload: null
        };
    }
}

export async function getClockInStatus(userID: string, orgID: string): Promise<boolean> {
    try {
        // Fetch the volunteer record for the given user and organization
        const volunteer = await prisma.volunteer.findUnique({
            where: {
                userID_orgID: {
                    userID: userID,
                    orgID: orgID,
                },
            },
            select: {
                isClockedIn: true, // Select only the isClockedIn field
            },
        });

        // If volunteer record exists, return the clock-in status; otherwise, return false
        return volunteer ? volunteer.isClockedIn : false;
    } catch (error) {
        console.error("Failed to retrieve clock-in status:", error);
        return false; // Return false in case of error
    }
}