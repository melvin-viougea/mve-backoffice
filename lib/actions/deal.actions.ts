'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {CreateDealParams, UpdateDealParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/deal`;

export const getAllDeal = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all deals:', error);
  }
};

export const getOneDeal = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching one deals:', error);
  }
};

export const createDeal = async (deal: CreateDealParams) => {
  try {
    const response = await KyInstance.post(baseUrl, {json: deal}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error creating deal:', error);
  }
};

export const updateDeal = async ({id, deal}: UpdateDealParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: deal}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating deal:', error);
  }
};

export const deleteDeal = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
  }
};