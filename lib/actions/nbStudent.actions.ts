'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/nbStudent`;

export const getAllNbStudent = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all student number:', error);
  }
};