import axios from "redaxios";
import {cookies} from "next/headers";

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-type": "application/json",
        "Cookie": cookies( ).toString(),
    }
});

export default Axios;
