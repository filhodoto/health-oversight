'use server';

import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_CL_ID,
  PROJECT_ID,
  storage,
  users,
} from '../appwrite.config';
import { isBlob, parseStringify } from '../utils';

/**
 * Create a new user with the provided details.
 *
 * @param user {CreateUserParams} User creation details.
 * @returns {User}
 * See more in appwrite docs: https://appwrite.io/docs/references/cloud/server-nodejs/users#create
 */
export const createUser = async (
  user: CreateUserParams,
): Promise<User | undefined> => {
  try {
    const result = await users.create(
      ID.unique(), // Generate a unique user ID
      user.email,
      user.phone,
      undefined, // Password not provided in this request
      user.name,
    );

    return result;
  } catch (error: any) {
    console.error('Error creating user:', error);

    // Handle conflict error (user already exists)
    if (error && error.code === 409) {
      console.warn('User with email already exists:', user.email);

      try {
        // Attempt to find existing users with the same email
        const existingUsers = await users.list([
          Query.equal('email', [user.email]),
        ]);

        // Return the first existing user if found
        if (existingUsers.users.length > 0) return existingUsers.users[0];
      } catch (listError) {
        console.error('Error fetching existing users:', listError);
      }
    }

    // Return undefined for other errors (consider throwing an error for specific cases)
    return undefined;
  }
};

/**
 * Get user by id
 *
 * @param userId {string} User creation details.
 * @returns {User}
 */
export const getUser = async (userId: string): Promise<User | undefined> => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

/**
 * Register patient
 *
 * @param userId {string} User creation details.
 * @returns {User}
 */
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams): Promise<RegisterUserParams | undefined> => {
  try {
    // Variable where we will store uploaded file
    let file;

    // 1. If user passed identification document, we need to store it in Appwrite storage
    // NOTE:: We do this before we create patient because when we create a patient we need to get the image, which means it needs to exist in our storage when we try to get
    if (identificationDocument) {
      // Get the Blob object from the identificationDocument
      const blob = identificationDocument?.get('blobFile');

      // Make sure we have a blob type of file in identificationDocument
      if (!blob || !isBlob(blob)) throw new Error('Blob file was not found');

      // !! Transform blob into buffer so we can use it and fix "TypeError [ERR_INVALID_STATE]" error
      // !! See solution here: https://github.com/adrianhajdin/healthcare/issues/32
      const bufferFile = await blob.arrayBuffer();

      const inputFile = InputFile.fromBuffer(
        // @ts-ignore
        bufferFile, // !! Typescript is correct in complaining. However at the moment Blob does not work so for now we keep it like this
        identificationDocument?.get('fileName') as string,
      );

      /**
       * Create file in Appwrite storage
       *
       * @param bucketId {string}. Storage bucket unique ID
       * @param fileId {string}. Choose a custom ID or generate a random ID with ID.unique()
       * @param file {File}. Binary file
       * @returns {File}
       *
       * See more here: https://appwrite.io/docs/references/cloud/client-web/storage#createFile
       */
      file = await storage.createFile(BUCKET_ID, ID.unique(), inputFile);
      console.log('file >>> ', file);
    }

    // 2. Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_CL_ID,
      ID.unique(),
      {
        ...patient,
        // If file exists we pass file values
        ...(file && {
          identificationDocumentId: file.$id,
          // The url of the document we created above
          identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        }),
      },
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.error('Error registering patient:', error);
  }
};
