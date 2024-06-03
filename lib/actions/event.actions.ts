'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {createEventProps} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/event`;

export const getAllEvent = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all events:', error);
  }
};

export const createEvent = async (event: createEventProps) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: event}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};