'use server'

import KyInstance from "@/lib/kyInstance";
import {parseStringify} from "@/lib/utils";
import {UpdateUserParams} from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/user`;

export const getAllUser = async () => {
  try {
    const response = await KyInstance.get(baseUrl).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all users:', error);
  }
};

export const getOneUser = async (id: number) => {
  try {
    const response = await KyInstance.get(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error fetching all users:', error);
  }
};

export const updateUser = async ({id, user}: UpdateUserParams) => {
  try {
    const response = await KyInstance.patch(`${baseUrl}/${id}`, {json: user}).json();
    return parseStringify(response);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await KyInstance.delete(`${baseUrl}/${id}`).json();
    return parseStringify(response);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
  }
};