'use server';

import KyInstance from "@/lib/kyInstance";
import { parseStringify } from "@/lib/utils";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/event`;

export const getAllEvent = async () => {
    try {
        const response = await KyInstance.get(baseUrl).json();
        return parseStringify(response);
    } catch (error) {
        console.error('Error fetching all events:', error);
    }
};

export const getEvent = async (id: getDataParams) => {
    try {
        return await KyInstance.get(`${baseUrl}/${id}`).json();
    } catch (error) {
        console.error(`Error fetching event with id ${id}:`, error);
    }
};

export const createEvent = async (data: createDataParams) => {
    try {
        return await KyInstance.post(baseUrl, { json: data }).json();
    } catch (error) {
        console.error('Error creating event:', error);
    }
};

export const updateEventAll = async ({ id, data }: updateDataParams) => {
    try {
        return await KyInstance.put(`${baseUrl}/${id}`, { json: data }).json();
    } catch (error) {
        console.error(`Error updating event with id ${id}:`, error);
    }
};

export const updateEvent = async ({ id, data }: updateDataParams) => {
    try {
        return await KyInstance.patch(`${baseUrl}/${id}`, { json: data }).json();
    } catch (error) {
        console.error(`Error partially updating event with id ${id}:`, error);
    }
};

export const removeEvent = async (id: deleteDataParams) => {
    try {
        return await KyInstance.delete(`${baseUrl}/${id}`).json();
    } catch (error) {
        console.error(`Error deleting event with id ${id}:`, error);
    }
};