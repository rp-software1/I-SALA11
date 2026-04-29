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

// ── Mesas ─────────────────────────────
export async function getMesas() {
    const response = await api.get('/api/mesas');
    return response.data;
}

export async function getMesasDisponibles() {
    const response = await api.get('/api/mesas?estado=disponible');
    return response.data;
}

// ── Pedidos ───────────────────────────
export async function crearPedido(pedidoData) {
    const response = await api.post('/api/pedidos', pedidoData);
    return response.data;
}

export async function getPedido(id) {
    const response = await api.get(`/api/pedidos/${id}`);
    return response.data;
}

export async function cambiarEstadoPedido(id, estado) {
    const response = await api.patch(`/api/pedidos/${id}/estado`, { estado });
    return response.data;
}