import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const signIn = (body) => axios.post(`${BASE_URL}/`, body);

const signUp = (body) => axios.post(`${BASE_URL}/cadastro`, body);

const API = {
    signIn,
    signUp
}

export default API;