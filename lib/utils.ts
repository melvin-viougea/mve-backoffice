import {type ClassValue, clsx} from "clsx";
import qs from "query-string";
import {twMerge} from "tailwind-merge";
import {z} from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: "numeric", // numeric day of the month (e.g., "25")
    month: "short", // abbreviated month name (e.g., "Oct")
    minute: "numeric", // numeric minute (e.g., "30")
    hour: "numeric", // numeric hour (e.g., "8")
    weekday: "short", // abbreviated weekday name (e.g., "Mon")
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit", // numeric day of the month (e.g., "25")
    month: "2-digit", // abbreviated month name (e.g., "Oct")
    year: "numeric", // numeric year (e.g., "2023")
    weekday: "short", // abbreviated weekday name (e.g., "Mon")
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit", // numeric day of the month (e.g., "25)
    month: "2-digit", // abbreviated month name (e.g., "Oct")
    year: "numeric", // numeric year (e.g., "2023")
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., "8")
    minute: "numeric", // numeric minute (e.g., "30")
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({params, key, value}: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {skipNull: true}
  );
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  return parts[parts.length - 1];
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstname: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(20),
  lastname: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(20),
  address: type === 'sign-in' ? z.string().optional() : z.string().min(1).max(60),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(1).max(20),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(5).max(5),
  // both
  email: z.string().email(),
  password: z.string().min(8),
})