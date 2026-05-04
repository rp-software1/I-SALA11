const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Plato {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    disponible: boolean;
    stock: number;
    enOferta: boolean;
    precioOferta?: number;
}

export type EstadoMesa = 'libre' | 'ocupada' | 'reservada';

export interface Mesa {
    _id: string;
    numero: number;
    capacidad: number;
    estado: EstadoMesa;
    comensales?: number;
}

export async function getPlatos(): Promise<Plato[]> {
    // Lanza error intencionalmente — se usan datos mock en lugar de API real
    throw new Error("API no configurada, usando datos mock");
}

export async function getMesas(): Promise<Mesa[]> {
    const response = await fetch(`${BASE_URL}/mesas`);
    if (!response.ok) throw new Error("Error al obtener las mesas");
    return response.json();
}