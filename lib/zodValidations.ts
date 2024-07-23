import { z } from 'zod';

/** Validation for homepage user form */
export const userFormSchema = z.object({
  username: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be max 50 characters'),
  email: z.string().email(),
  phone: z
    .string()
    // Add a custom validation rule to the schema.
    .refine(
      (value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value),
      'Invalid phone format'
    ),
});
