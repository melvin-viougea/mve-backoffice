'use server';

import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";
import KyInstance from "@/lib/kyInstance";
import jwt, { JwtPayload } from 'jsonwebtoken';

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/auth`;

export const login = async ({ email, password }: signInProps) => {
    try {
        const response = await KyInstance.post(`${baseUrl}/login`, { json: { email, password } }).json<AuthResponse>();
        const { token, user } = response;

        if (token) {
            const cookieStore = cookies();
            cookieStore.set('auth', token);
            cookieStore.set('firstname', user.firstname);
            cookieStore.set('lastname', user.lastname);
            cookieStore.set('email', user.email);
        }

        return parseStringify(user);
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const response = await KyInstance.post(`${baseUrl}/signup`, { json: userData }).json<AuthResponse>();
        const { token, user } = response;

        if (token) {
            const cookieStore = cookies();
            cookieStore.set('auth', token);
            cookieStore.set('firstname', user.firstname);
            cookieStore.set('lastname', user.lastname);
            cookieStore.set('email', user.email);
        }

        return parseStringify(user);
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

export async function getLoggedInUser(): Promise<any> {
    function isJwtPayload(token: string | JwtPayload): token is JwtPayload {
        return typeof token === 'object' && 'exp' in token;
    }

    try {
        const cookieStore = cookies();
        const token = cookieStore.get('auth');

        if (token) {
            const decodedToken = jwt.decode(token.value);

            if (decodedToken && isJwtPayload(decodedToken) && decodedToken.exp !== undefined && Date.now() >= decodedToken.exp * 1000) {
                return null;
            }

            const firstnameCookie = cookieStore.get('firstname');
            const lastnameCookie = cookieStore.get('lastname');
            const emailCookie = cookieStore.get('email');

            const firstname = firstnameCookie ? firstnameCookie.value : null;
            const lastname = lastnameCookie ? lastnameCookie.value : null;
            const email = emailCookie ? emailCookie.value : null;

            const user = {
                firstname,
                lastname,
                email
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