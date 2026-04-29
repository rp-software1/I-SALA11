// TYPESCRIPT D2
import axios from 'axios';
import type { Mesa, Pedido, EstadoPedido, Plato } from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// MESAS
export async function getMesas(): Promise<Mesa[]> {
    const response = await api.get<Mesa[]>('/mesas');
    return response.data;
}

// PLATOS
export async function getPlatos(): Promise<Plato[]> {
    const response = await api.get<Plato[]>('/platos');
    return response.data;
}

// PEDIDOS
export async function crearPedido(
    datos: Omit<Pedido, '_id' | 'creadoEn' | 'actualizadoEn'>
): Promise<Pedido> {
    const response = await api.post<Pedido>('/pedidos', datos);
    return response.data;
}

export async function cambiarEstadoPedido(
    pedidoId: string,
    estado: EstadoPedido
): Promise<Pedido> {
    const response = await api.patch<Pedido>(
        `/pedidos/${pedidoId}/estado`,
        { estado }
    );
    return response.data;
}

export default api;

// ------------------------------------------------------------------------

// TYPESCRIPT D1
/*import axios from "axios";

// AXIOS INSTANCE
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export type EstadoMesa =
    | "disponible"
    | "ocupada"
    | "reservada"
    | "fuera_servicio";

export type EstadoPedido =
    | "pendiente"
    | "en_preparacion"
    | "lista"
    | "entregada"
    | "cancelada"
    | "cerrada";

export type TipoPedido = "mesa" | "para_llevar";

export interface Mesa {
    _id: string;
    numero: number;
    capacidad: number;
    estado: EstadoMesa;
    pedidoActivoId: string | null;
}

export interface ItemPedido {
    platoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
}

export interface Pedido {
    _id: string;
    mesaId: string | null;
    tipo: TipoPedido;
    estado: EstadoPedido;
    items: ItemPedido[];
    total: number;
}

export interface Plato {
    _id: string;
    nombre: string;
    precio: number;
    descripcion?: string;
    categoria?: string;
}

export async function getPlatos(): Promise<Plato[]> {
    const res = await api.get("/platos");
    return res.data;
}

export async function getMesas(): Promise<Mesa[]> {
    const res = await api.get("/mesas");
    return res.data;
}

export async function getMesasDisponibles(): Promise<Mesa[]> {
    const res = await api.get("/mesas?estado=disponible");
    return res.data;
}

export async function crearPedido(data: any): Promise<Pedido> {
    const res = await api.post("/pedidos", data);
    return res.data;
}

export async function getPedido(id: string): Promise<Pedido> {
    const res = await api.get(`/pedidos/${id}`);
    return res.data;
}

export async function cambiarEstadoPedido(
    id: string,
    estado: EstadoPedido
): Promise<Pedido> {
    const res = await api.patch(`/pedidos/${id}/estado`, { estado });
    return res.data;
}*/

//------------------------------------------------------------------------

// REACT DIA8
// src/services/api.js
/*import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
    const response = await axios.get(`${BASE_URL}/api/platos`);
    return response.data;
}*/

// REACT DIA9
//import { platosMock } from "../data/platos.mock";
/*import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
    //try {
    const response = await axios.get(`${BASE_URL}/api/platos`);
    return response.data;
    /*} catch (error) {
        console.log("Usando mock temporalmente");
        return platosMock;
    }
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
*/