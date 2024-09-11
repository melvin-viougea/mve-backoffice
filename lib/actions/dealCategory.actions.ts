'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/dealCategory`;

export const getAllDealCategory = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all dealCategory:', error);
  }
};