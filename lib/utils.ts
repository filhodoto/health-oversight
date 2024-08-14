import { APP_NAME } from '@/constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

// Combines Tailwind classes and clsx functionality
export function cn(...inputs: ClassValue[]) {
  // Merge Tailwind classes using twMerge and then combine with clsx
  return twMerge(clsx(inputs));
}

// Safely parses and stringifies a value (avoiding circular references)
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// Converts a File object to a URL for use in the browser
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions,
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Simple AES-256-CBC encryption algorithm for key encryption with the provided key
// * NOTE:: For production we should use token authentication. Storing the encryption key, IV, and tag in local storage is highly insecure
export const encryptKey = (passkey: string) => {
  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);

  // Create a cipher using AES-256-CBC mode
  //* NOTE:: Although simple strings work, Buffers are the correct data type for cryptographic operations in Node.js
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key),
    Buffer.from(iv),
  );

  // Encrypt the data
  let encryptedData = cipher.update(passkey, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // Return encrypted data and the key and iv
  return { encryptedData, key, iv };
};

export const decryptKey = ({
  encryptedData,
  key,
  iv,
}: {
  encryptedData: string;
  key: string;
  iv: string;
}) => {
  // Create a decipher using AES-256-CBC mode
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key),
    Buffer.from(iv),
  );

  // Decrypt the data
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
};

// Helper function to know if value is Blob type
export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getCopyRightText(): string {
  return `© ${new Date().getFullYear()} ${APP_NAME}`;
}

export function getColorByStatus(status: Status): string {
  return status === 'scheduled'
    ? 'green'
    : status === 'pending'
      ? 'blue'
      : 'red';
}
