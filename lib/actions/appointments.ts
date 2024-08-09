'use server';

import { ID, Query } from 'node-appwrite';
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

/**
 * Get getRecentAppointments data
 *
 */
export const getRecentAppointments = async (): Promise<
  | {
      totalCount: number;
      documents: Document[];
      counts: Record<Status, number>;
    }
  | undefined
> => {
  try {
    // Get all appointments information from appointments collection
    const appointmentsList = await databases.listDocuments(
      DATABASE_ID,
      APPOINTMENT_CL_ID,
      [Query.orderDesc('$createdAt')],
    );

    // Get numbers of appointments by the types we need (scheduled/pending/cancelled)
    const initialValue: Record<Status, number> = {
      scheduled: 0,
      pending: 0,
      cancelled: 0,
    };

    const appointmentCounts = appointmentsList.documents.reduce(
      (acc, currentVal) => {
        // Add +1 to acc count based on status of appointment.
        // eg: acc['pending'] += 1;
        acc[currentVal.status as Status] += 1;
        return acc;
      },
      initialValue,
    );

    const data = {
      totalCount: appointmentsList.total,
      documents: appointmentsList.documents,
      counts: appointmentCounts,
    };

    return parseStringify(data);
  } catch (error) {
    console.error('Error getting appointments:', error);
  }
};
