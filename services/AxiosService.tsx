import axios from "redaxios";

const Axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}/api`,
    headers: {
        "Content-type": "application/json",
        //"Authorization": `Bearer ${auth}`,
    }
});

export default Axios;
