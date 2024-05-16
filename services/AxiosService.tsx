import axios from "redaxios";

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-type": "application/json",
        //"Authorization": `Bearer ${auth}`,
    }
});

export default Axios;
