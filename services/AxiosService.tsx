import axios from "redaxios";

const Axios = axios.create({
    baseURL: `${import.meta.env.NEXT_PUBLIC_HOST}/api`,
    headers: {
        "Content-type": "application/json",
        //"Authorization": `Bearer ${auth}`,
    }
});

export default Axios;
