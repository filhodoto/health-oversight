'use server';

import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

// See more in appwrite docs: https://appwrite.io/docs/references/cloud/server-nodejs/users#create

/**
 * Create a new user with the provided details.
 *
 * @param user {CreateUserParams} User creation details.
 * @returns {User}
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
