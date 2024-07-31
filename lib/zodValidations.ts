import { FEMALE, OTHER, MALE } from '@/constants';
import { Mali } from 'next/font/google';
import z from 'zod';

/* Set common validation types here so we don't need to repeat ourselves. Keep it DRY */
const nameValidation = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be max 50 characters');
export const emailValidation = z.string().email();
export const phoneValidation = z
  .string()
  .refine(
    (value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value),
    'Invalid phone format',
  );

const addressValidation = z
  .string()
  .min(5, 'Address must be at least 5 characters')
  .max(500, 'Address must be at most 500 characters');

const occupationValidation = z
  .string()
  .min(2, 'Occupation must be at least 2 characters')
  .max(500, 'Occupation must be at most 500 characters');
export const contactNameValidation = z
  .string()
  .min(2, 'Contact name must be at least 2 characters')
  .max(50, 'Contact name must be at most 50 characters');

const consentValidation = z
  .boolean()
  .default(false)
  .refine((value) => value === true, {
    message: 'You must consent to this in order to proceed',
  });

const doctorValidation = z.string().min(2, 'Select at least one doctor');

const optionalStringValidation = z.string().optional();

/** Validation for Register patient form */
export const UserFormSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
});

/** Validation for Register patient form */
export const PatientFormSchema = z
  .object({
    name: nameValidation,
    email: emailValidation,
    phone: phoneValidation,
    birthDate: z.coerce.date(),
    /* Can't directly import GENDER_OPTIONS because it's a string[]. 
  here we need tuple, which is an immutable array-like structure */
    gender: z.enum([MALE, FEMALE, OTHER]),
    address: addressValidation,
    occupation: occupationValidation,
    emergencyContactName: contactNameValidation,
    emergencyContactNumber: phoneValidation,
    primaryPhysician: doctorValidation,
    insuranceProvider: z
      .string()
      .min(2, 'Insurance name must be at least 2 characters')
      .max(50, 'Insurance name must be at most 50 characters'),
    insurancePolicyNumber: z
      .string()
      .min(2, 'Policy number must be at least 2 characters')
      .max(50, 'Policy number must be at most 50 characters'),
    allergies: optionalStringValidation,
    currentMedication: optionalStringValidation,
    familyMedicalHistory: optionalStringValidation,
    pastMedicalHistory: optionalStringValidation,
    identificationType: optionalStringValidation,
    identificationNumber: optionalStringValidation,
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: consentValidation,
    disclosureConsent: consentValidation,
    privacyConsent: consentValidation,
  })
  // Make sure user provides identificationNumber if identificationDocument is provided
  .refine(
    (data) => {
      // Check if identificationDocument without identification number. If so, do not validate form
      return data.identificationDocument &&
        data.identificationDocument.length > 0 &&
        !data.identificationNumber
        ? false
        : true;
    },
    {
      message: 'Please add identification number',
      path: ['identificationNumber'], // Specify the path to the field that should display the error
    },
  );

export const CreateAppointmentSchema = z.object({
  primaryPhysician: doctorValidation,
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: optionalStringValidation,
  cancellationReason: optionalStringValidation,
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: doctorValidation,
  schedule: z.coerce.date(),
  reason: optionalStringValidation,
  note: optionalStringValidation,
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: doctorValidation,
  schedule: z.coerce.date(),
  reason: optionalStringValidation,
  note: optionalStringValidation,
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
