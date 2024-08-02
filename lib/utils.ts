import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

// Simple Base64 encoding for key encryption (not secure for sensitive data)
export function encryptKey(passkey: string) {
  return btoa(passkey);
}

// Simple Base64 decoding for key decryption
export function decryptKey(passkey: string) {
  return atob(passkey);
}

// Helper function to know if value is Blob type
export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
