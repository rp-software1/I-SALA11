// src/services/api.js
/*import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
    const response = await axios.get(`${BASE_URL}/api/platos`);
    return response.data;
}*/


//import { platosMock } from "../data/platos.mock";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
    //try {
    const response = await axios.get(`${BASE_URL}/api/platos`);
    return response.data;
    /*} catch (error) {
        console.log("Usando mock temporalmente");
        return platosMock;
    }*/
}