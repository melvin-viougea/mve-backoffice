'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateEventPeopleParams, UpdateEventPeopleParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/eventPeople`;

export const getAllEventPeople = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all eventPeople:', error);
  }
};

export const getOneEventPeople = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all eventPeople:', error);
  }
};

export const createEventPeople = async (eventPeople: CreateEventPeopleParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: eventPeople}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating eventPeople:', error);
  }
};

export const updateEventPeople = async ({id, eventPeople}: UpdateEventPeopleParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: eventPeople}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating eventPeople:', error);
  }
};

export const deleteEventPeople = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting eventPeople with id ${id}:`, error);
  }
};