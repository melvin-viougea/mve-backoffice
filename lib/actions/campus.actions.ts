'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateCampusParams, UpdateCampusParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/campus`;

export const getAllCampus = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all campuss:', error);
  }
};

export const getOneCampus = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all campuss:', error);
  }
};

export const createCampus = async (campus: CreateCampusParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: campus}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating campus:', error);
  }
};

export const updateCampus = async ({id, campus}: UpdateCampusParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: campus}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating campus:', error);
  }
};

export const deleteCampus = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting campus with id ${id}:`, error);
  }
};