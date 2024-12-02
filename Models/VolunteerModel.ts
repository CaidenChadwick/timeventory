'use server';

import prisma from '@/db';
import { Status } from '@/types/databaseUtilityTypes';

export async function createVolunteer(userId: string, orgId: string) {
    try {
      const volunteer = await prisma.volunteer.create({
        data: {
          userID: userId,
          orgID: orgId,
        },
      });
      console.log('Volunteer created:', volunteer);
      return volunteer;
    } catch (error) {
      console.error('Error creating volunteer:', error);
      throw error;
    }
  }
  
  // Delete a volunteer record
  export async function deleteVolunteer(userId: string, orgId: string) {
    try {
      const volunteer = await prisma.volunteer.delete({
        where: {
          userID_orgID: { userID: userId, orgID: orgId },
        },
      });
      console.log('Volunteer deleted:', volunteer);
      return volunteer;
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      throw error;
    }
  }
  
  // Create a volunteer log
  export async function createVolunteerLog(
    orgId: string,
    userId: string,
    startTime: Date,
    endTime?: Date,
    message?: string
  ) {
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
      console.log('Volunteer log created:', log);
      return log;
    } catch (error) {
      console.error('Error creating volunteer log:', error);
      throw error;
    }
  }
  
  // Delete a volunteer log
  export async function deleteVolunteerLog(logId: string) {
    try {
      const log = await prisma.volunteerLog.delete({
        where: { id: logId },
      });
      console.log('Volunteer log deleted:', log);
      return log;
    } catch (error) {
      console.error('Error deleting volunteer log:', error);
      throw error;
    }
  }

  export async function createVolunteerRequest(userId: string, orgId: string, message: string) {
    try {
      const request = await prisma.volunteeringRequest.create({
        data: {
          userID: userId,
          orgID: orgId,
          messesage: message,
        },
      });
      console.log('Volunteer request created:', request);
      return request;
    } catch (error) {
      console.error('Error creating volunteer request:', error);
      throw error;
    }
  }
  
  // Delete a volunteer request
  export async function deleteVolunteerRequest(userId: string, orgId: string) {
    try {
      const request = await prisma.volunteeringRequest.delete({
        where: {
          userID_orgID: { userID: userId, orgID: orgId },
        },
      });
      console.log('Volunteer request deleted:', request);
      return request;
    } catch (error) {
      console.error('Error deleting volunteer request:', error);
      throw error;
    }
  }