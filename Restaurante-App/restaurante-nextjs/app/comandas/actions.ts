'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoPedido, Pedido } from '../../src/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function avanzarEstadoPedido(
  pedidoId: string,
  nuevoEstado: EstadoPedido
): Promise<{ ok: true; pedido: Pedido } | { ok: false; error: string }> {

  if (!BASE_URL) {
    return { ok: false, error: 'NEXT_PUBLIC_API_URL no configurada' };
  }

  try {
    const res = await fetch(`${BASE_URL}/pedidos/${pedidoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, error: `Error ${res.status}: ${txt}` };
    }

    const pedido: Pedido = await res.json();

    revalidatePath('/comandas');

    return { ok: true, pedido };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return { ok: false, error: msg };
  }
}
