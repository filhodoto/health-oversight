'use server';

import { ID } from 'node-appwrite';
import { APPOINTMENT_CL_ID, DATABASE_ID, databases } from '../appwrite.config';
import { parseStringify } from '../utils';
import { Appointment } from '@/types/appwrite.types';

/**
 * Create a new appointment with the provided details.
 *
 * @param appointment {CreateAppointmentParams} User creation details.
 * @returns {Appointment}
 * See more in appwrite docs: https://appwrite.io/docs/references/cloud/server-nodejs/users#create
 */
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

/**
 * Get appointment by id
 *
 * @param appointmentId {string} Appointment id
 * @returns {Appointment}
 * See more here: https://appwrite.io/docs/references/cloud/client-web/databases
 */
export const getAppointmentById = async (
  appointmentId: string,
): Promise<Appointment | undefined> => {
  try {
    // Get appointment information from appointment collection
    const appointment = await databases.getDocument(
      DATABASE_ID,
      APPOINTMENT_CL_ID,
      appointmentId,
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error('Error getting appointment:', error);
  }
};
