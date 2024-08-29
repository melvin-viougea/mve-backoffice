'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateEventTicketParams, UpdateEventTicketParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/eventTicket`;

export const getAllEventTicket = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all eventTickets:', error);
  }
};

export const getOneEventTicket = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all eventTickets:', error);
  }
};

export const createEventTicket = async (eventTicket: CreateEventTicketParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: eventTicket}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating eventTicket:', error);
  }
};

export const updateEventTicket = async ({id, eventTicket}: UpdateEventTicketParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: eventTicket}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating eventTicket:', error);
  }
};

export const deleteEventTicket = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting eventTicket with id ${id}:`, error);
  }
};