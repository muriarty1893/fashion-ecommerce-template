import axios from "axios";

const customFetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    headers: {
        Accept: "application/json"
    }
})

export default customFetch;
