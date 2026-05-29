'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoPedidoContext, Pedido } from '../../src/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function enviarComanda(
  data: EstadoPedidoContext
): Promise<{ ok: true; pedidoId: string } | { ok: false; error: string }> {

  if (!BASE_URL) {
    return { ok: false, error: 'NEXT_PUBLIC_API_URL no configurada' };
  }

  const ahora = new Date().toISOString();

  const body = {
    mesaId: data.mesaId,
    tipo: data.tipo,
    estado: 'pendiente',
    items: data.items,
    total: data.total,
    creadoEn: ahora,
    actualizadoEn: ahora,
  };

  try {
    const res = await fetch(`${BASE_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, error: `Error ${res.status}: ${txt}` };
    }

    const pedido: Pedido = await res.json();
    revalidatePath('/comandas');
    revalidatePath('/mesas');

    return { ok: true, pedidoId: pedido._id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return { ok: false, error: msg };
  }
}
