'use server'

import {cookies} from "next/headers";
import {parseStringify} from "@/lib/utils";
import KyInstance from "@/lib/kyInstance";
import {AuthResponse, SignInParams, SignUpParams} from "@/types";
import jwt from "jsonwebtoken";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/auth`;

const maxAge = 24 * 60 * 60;

export const login = async ({email, password}: SignInParams) => {
  try {
    const response = await KyInstance.post(`${baseUrl}/login`, {json: {email, password}}).json<AuthResponse>();
    const {token, user} = response;

    if (token) {
      const cookieStore = cookies();
      cookieStore.set('auth', token, {maxAge});
      cookieStore.set('firstname', user.firstname, {maxAge});
      cookieStore.set('lastname', user.lastname, {maxAge});
      cookieStore.set('email', user.email, {maxAge});
      if(user.associationId) cookieStore.set('associationId', user.associationId.toString(), {maxAge});
    }

    return parseStringify(user);
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export const signUp = async (userData: SignUpParams) => {
  try {
    const response = await KyInstance.post(`${baseUrl}/signup`, {json: userData}).json<AuthResponse>();
    const {token, user} = response;

    if (token) {
      const cookieStore = cookies();
      cookieStore.set('auth', token, {maxAge});
      cookieStore.set('firstname', user.firstname, {maxAge});
      cookieStore.set('lastname', user.lastname, {maxAge});
      cookieStore.set('email', user.email, {maxAge});
      if(user.associationId) cookieStore.set('associationId', user.associationId.toString(), {maxAge});
    }

    return parseStringify(user);
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export async function getLoggedInUser(): Promise<any> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth');

    if (token) {
      const { isSuperAdmin } = jwt.verify(token.value, process.env.JWT_SECRET || "") as any;


      const firstnameCookie = cookieStore.get('firstname');
      const lastnameCookie = cookieStore.get('lastname');
      const emailCookie = cookieStore.get('email');

      const firstname = firstnameCookie ? firstnameCookie.value : null;
      const lastname = lastnameCookie ? lastnameCookie.value : null;
      const email = emailCookie ? emailCookie.value : null;

      const user = {
        firstname,
        lastname,
        email,
        isSuperAdmin,
      };
      return parseStringify(user);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const cookieStore = cookies();

    const allCookies = cookieStore.getAll();

    allCookies.forEach(cookie => {
      cookieStore.delete(cookie.name);
    });
    return true;
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}