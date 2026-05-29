'use server';

import type { EstadoPedidoContext, Pedido } from '../../src/types';

const BASE_URL = '/api';

export async function enviarComanda(
  pedido: EstadoPedidoContext
): Promise<{ ok: true; pedidoId: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${BASE_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mesaId: pedido.tipo === 'mesa' ? pedido.mesaId : null,
        tipo: pedido.tipo,
        estado: 'pendiente',
        items: pedido.items,
        total: pedido.total,
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const texto = await res.text();
      return { ok: false, error: `Error ${res.status}: ${texto}` };
    }

    const nuevoPedido: Pedido = await res.json();
    return { ok: true, pedidoId: nuevoPedido._id };
  } catch (err: unknown) {
    const mensaje = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: mensaje };
  }
}
