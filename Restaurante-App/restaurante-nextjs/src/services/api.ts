import type { Mesa, Plato, Pedido, EstadoPedido } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está definida en .env.local");
}

// Funciones de fetching — se llaman desde Server Components
// cache: "no-store" = siempre pide datos frescos al backend
// cache: "force-cache" = cachea la respuesta (default Next.js)

export async function getMesas(): Promise<Mesa[]> {
    const res = await fetch(`${BASE_URL}/mesas`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Error al obtener mesas: ${res.status}`);
    return res.json();
}

export async function getPlatos(): Promise<Plato[]> {
    const res = await fetch(`${BASE_URL}/platos`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Error al obtener platos: ${res.status}`);
    return res.json();
}

export async function crearPedido(
    datos: Omit<Pedido, '_id' | 'creadoEn' | 'actualizadoEn'>
): Promise<Pedido> {
    const res = await fetch(`${BASE_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Error al crear pedido: ${res.status}`);
    return res.json();
}

export async function cambiarEstadoPedido(
    pedidoId: string,
    estado: EstadoPedido
): Promise<Pedido> {
    const res = await fetch(`${BASE_URL}/pedidos/${pedidoId}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Error al cambiar estado: ${res.status}`);
    return res.json();
}

// Dia4
// Opción A: si el backend tiene GET /mesas/:id
export async function getMesaById(id: string): Promise<Mesa> {
    const res = await fetch(`${BASE_URL}/mesas/${id}`, { cache: 'no-store' });
    if (res.status === 404) {
        throw new Error(`Mesa con ID ${id} no encontrada`);
    }
    if (!res.ok) throw new Error(`Error al obtener mesa: ${res.status}`);
    return res.json();
}

// Opción B: si el backend NO tiene GET /mesas/:id
// export async function getMesaById(id: string): Promise<Mesa> {
//   const todas = await getMesas();
//   const mesa = todas.find(m => m._id === id);
//   if (!mesa) throw new Error(`Mesa con ID ${id} no encontrada`);
//   return mesa;
// }

// Usar la opción que corresponda según el resultado de Postman

// Dia5
export async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${BASE_URL}/pedidos`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error al obtener pedidos: ${res.status}`);
  return res.json();
}
