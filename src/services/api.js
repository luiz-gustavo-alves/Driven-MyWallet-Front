import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const createConfig = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}};
}

const signIn = (body) => axios.post(`${BASE_URL}/`, body);

const signUp = (body) => axios.post(`${BASE_URL}/cadastro`, body);

const getTransactions = (token) => {

    const config = createConfig(token);
    return axios.get(`${BASE_URL}/home`, config);
};

const newTransaction = (body, type, token) => {

    const config = createConfig(token);
    return axios.post(`${BASE_URL}/nova-transacao/${type}`, body, config);
}

const API = {
    signIn,
    signUp,
    getTransactions,
    newTransaction
}

export default API;