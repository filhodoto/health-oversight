import * as sdk from 'node-appwrite';

// TODO:: This should be declared in a ".d.ts" file but I wasn't abel to make it work so for now I'm putting it here

/*
 * Type environment variables used in the application.
 * This way we ensure type safety and prevent potential runtime errors caused by missing or incorrectly typed
 */
interface EnvironmentVariables {
  PROJECT_ID: string;
  API_KEY: string;
  DATABASE_ID: string;
  PATIENT_CL_ID: string;
  DOCTOR_CL_ID: string;
  APPOINTMENT_CL_ID: string;
  NEXT_PUBLIC_BUCKET_ID: string;
  NEXT_PUBLIC_ENDPOINT: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_CL_ID,
  DOCTOR_CL_ID,
  APPOINTMENT_CL_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// Initialize the Appwrite client
let client = new sdk.Client();

// Configure the Appwrite client with your project details
client
  .setEndpoint(ENDPOINT) // Set the Appwrite API endpoint URL
  .setProject(PROJECT_ID) // Set your Appwrite project ID
  .setKey(API_KEY); // Set your secret Appwrite API key

// Export Appwrite services with typed instances
export const databases = new sdk.Databases(client); // Database service instance
export const storage = new sdk.Storage(client); // Storage service instance
export const Messaging = new sdk.Messaging(client); // Messaging service instance
export const Users = new sdk.Users(client); // Users service instance
