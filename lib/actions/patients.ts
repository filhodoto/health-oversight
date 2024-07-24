'use server';

import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

// See more in appwrite docs: https://appwrite.io/docs/references/cloud/server-nodejs/users#create
export const createUser = async (
  user: CreateUserParams,
): Promise<User | undefined> => {
  try {
    /**
     * Create a new user with the provided details.
     *
     * @param user {CreateUserParams} User creation details.
     * @returns {Promise<User>} Promise resolving to the created user object.
     */
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
