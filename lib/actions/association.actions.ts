'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateAssociationParams, UpdateAssociationParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/association`;

export const getAllAssociation = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all associations:', error);
  }
};

export const getOneAssociation = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all associations:', error);
  }
};

export const createAssociation = async (association: CreateAssociationParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: association}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating association:', error);
  }
};

export const updateAssociation = async ({id, association}: UpdateAssociationParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: association}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating association:', error);
  }
};

export const deleteAssociation = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting association with id ${id}:`, error);
  }
};