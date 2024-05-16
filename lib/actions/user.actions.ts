'use server';

import { cookies } from "next/headers";
import {parseStringify} from "@/lib/utils";
import AuthService from "@/services/AuthService";

export async function getLoggedInUser() {
    try {
        const cookieStore = cookies()
        const user = cookieStore.get('auth')
        if (!user) {
            return null;
        }

        return parseStringify(user);
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const login = async ({ email, password }: signInProps) => {
    try {
        const response = await AuthService.login({ email, password });
        const setCookieHeader = response.headers.get("Set-Cookie");
        if (setCookieHeader) {
            const token = setCookieHeader.split(";")[0].split("=")[1];
            cookies().set({
                name: "auth",
                value: token,
                secure: true,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });
        }

        return parseStringify(response);
    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const response = await AuthService.signUp(userData);
        const { session, user } = response.data;

        cookies().set("secret", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        cookies().set("user", user, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(user);
    } catch (error) {
        console.error('Error', error);
    }
}




// import { ID, Query } from "node-appwrite";
// import { createAdminClient, createSessionClient } from "../appwrite";
// import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
// import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
// import { plaidClient } from '@/lib/plaid';
// import { revalidatePath } from "next/cache";
// import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
//
// const {
//     APPWRITE_DATABASE_ID: DATABASE_ID,
//     APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
//     APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
// } = process.env;
//
// export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//     try {
//         const { database } = await createAdminClient();
//
//         const user = await database.listDocuments(
//             DATABASE_ID!,
//             USER_COLLECTION_ID!,
//             [Query.equal('userId', [userId])]
//         )
//
//         return parseStringify(user.documents[0]);
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const logoutAccount = async () => {
//     try {
//         const { account } = await createSessionClient();
//
//         cookies().delete('appwrite-session');
//
//         await account.deleteSession('current');
//     } catch (error) {
//         return null;
//     }
// }
//
// export const createLinkToken = async (user: User) => {
//     try {
//         const tokenParams = {
//             user: {
//                 client_user_id: user.$id
//             },
//             client_name: `${user.firstName} ${user.lastName}`,
//             products: ['auth'] as Products[],
//             language: 'en',
//             country_codes: ['US'] as CountryCode[],
//         }
//
//         const response = await plaidClient.linkTokenCreate(tokenParams);
//
//         return parseStringify({ linkToken: response.data.link_token })
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// export const createBankAccount = async ({
//                                             userId,
//                                             bankId,
//                                             accountId,
//                                             accessToken,
//                                             fundingSourceUrl,
//                                             shareableId,
//                                         }: createBankAccountProps) => {
//     try {
//         const { database } = await createAdminClient();
//
//         const bankAccount = await database.createDocument(
//             DATABASE_ID!,
//             BANK_COLLECTION_ID!,
//             ID.unique(),
//             {
//                 userId,
//                 bankId,
//                 accountId,
//                 accessToken,
//                 fundingSourceUrl,
//                 shareableId,
//             }
//         )
//
//         return parseStringify(bankAccount);
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// export const exchangePublicToken = async ({
//                                               publicToken,
//                                               user,
//                                           }: exchangePublicTokenProps) => {
//     try {
//         // Exchange public token for access token and item ID
//         const response = await plaidClient.itemPublicTokenExchange({
//             public_token: publicToken,
//         });
//
//         const accessToken = response.data.access_token;
//         const itemId = response.data.item_id;
//
//         // Get account information from Plaid using the access token
//         const accountsResponse = await plaidClient.accountsGet({
//             access_token: accessToken,
//         });
//
//         const accountData = accountsResponse.data.accounts[0];
//
//         // Create a processor token for Dwolla using the access token and account ID
//         const request: ProcessorTokenCreateRequest = {
//             access_token: accessToken,
//             account_id: accountData.account_id,
//             processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
//         };
//
//         const processorTokenResponse = await plaidClient.processorTokenCreate(request);
//         const processorToken = processorTokenResponse.data.processor_token;
//
//         // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
//         const fundingSourceUrl = await addFundingSource({
//             dwollaCustomerId: user.dwollaCustomerId,
//             processorToken,
//             bankName: accountData.name,
//         });
//
//         // If the funding source URL is not created, throw an error
//         if (!fundingSourceUrl) throw Error;
//
//         // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
//         await createBankAccount({
//             userId: user.$id,
//             bankId: itemId,
//             accountId: accountData.account_id,
//             accessToken,
//             fundingSourceUrl,
//             shareableId: encryptId(accountData.account_id),
//         });
//
//         // Revalidate the path to reflect the changes
//         revalidatePath("/");
//
//         // Return a success message
//         return parseStringify({
//             publicTokenExchange: "complete",
//         });
//     } catch (error) {
//         console.error("An error occurred while creating exchanging token:", error);
//     }
// }
//
// export const getBanks = async ({ userId }: getBanksProps) => {
//     try {
//         const { database } = await createAdminClient();
//
//         const banks = await database.listDocuments(
//             DATABASE_ID!,
//             BANK_COLLECTION_ID!,
//             [Query.equal('userId', [userId])]
//         )
//
//         return parseStringify(banks.documents);
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const getBank = async ({ documentId }: getBankProps) => {
//     try {
//         const { database } = await createAdminClient();
//
//         const bank = await database.listDocuments(
//             DATABASE_ID!,
//             BANK_COLLECTION_ID!,
//             [Query.equal('$id', [documentId])]
//         )
//
//         return parseStringify(bank.documents[0]);
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
//     try {
//         const { database } = await createAdminClient();
//
//         const bank = await database.listDocuments(
//             DATABASE_ID!,
//             BANK_COLLECTION_ID!,
//             [Query.equal('accountId', [accountId])]
//         )
//
//         if(bank.total !== 1) return null;
//
//         return parseStringify(bank.documents[0]);
//     } catch (error) {
//         console.log(error)
//     }
// }