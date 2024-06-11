'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateEventProps, UpdateEventProps} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/event`;

export const getAllEvent = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all events:', error);
  }
};

export const getOneEvent = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all events:', error);
  }
};

export const createEvent = async (event: CreateEventProps) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: event}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export const updateEvent = async ({id, event}: UpdateEventProps) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: event}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating event:', error);
  }
};