import axios from "redaxios";
import {cookies} from "next/headers";

const cookieStore = cookies()
const auth = cookieStore.get('auth')

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${auth}`,
    }
});

export default Axios;
