/* eslint-disable no-unused-vars */
/*
 * This file can be used to augment existing type definitions or create custom types for your project.
 * It is often used for:
 * - Declaring global variables or interfaces
 * - Extending built-in types
 * - Adding types for external libraries that lack type definitions
 * - Overriding default types
 * "*.d.ts files are used to provide typescript type information about a module that's written in JavaScript,"
 *
 * NOTE:: By declaring interfaces with "declare interface ..." we don't need to import them in our files
 */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// NOTE:: These should come from constants. But if we import constants, all declarations stop working without import.
// So we would need to import all these interfaces in the files they are called
declare type Gender = 'male' | 'female' | 'other';

declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
// Add id key created by Appwrite when we add user to database
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note?: string;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
