import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fills each {key} in a line of copy. */
export const fill = (line: string, values: Record<string, string | number>) => Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), line);
