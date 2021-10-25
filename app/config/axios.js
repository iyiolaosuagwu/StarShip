import axios from 'axios';
import { API_URL } from "@env"

export const api_instance = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});
