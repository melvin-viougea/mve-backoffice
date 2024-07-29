'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreatePartnerParams, UpdatePartnerParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/partner`;

export const getAllPartner = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all partners:', error);
  }
};

export const getOnePartner = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching one partners:', error);
  }
};

export const createPartner = async (partner: CreatePartnerParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: partner}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating partner:', error);
  }
};

export const updatePartner = async ({id, partner}: UpdatePartnerParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: partner}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating partner:', error);
  }
};

export const deletePartner = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting partner with id ${id}:`, error);
  }
};