'use server';

import { ID } from 'node-appwrite';
import { APPOINTMENT_CL_ID, DATABASE_ID, databases } from '../appwrite.config';
import { isBlob, parseStringify } from '../utils';
import { Appointment } from '@/types/appwrite.types';

export const createAppointment = async (
  appointment: CreateAppointmentParams,
): Promise<Appointment | undefined> => {
  try {
    // Create new appointment document in database
    const newAppointment = await databases.createDocument(
      DATABASE_ID,
      APPOINTMENT_CL_ID,
      ID.unique(),
      appointment,
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
  }
};
