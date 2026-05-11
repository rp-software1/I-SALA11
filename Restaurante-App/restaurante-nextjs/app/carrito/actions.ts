// Dia3
// app/carrito/actions.ts
// 'use server' al inicio — todas las funciones exportadas son Server Actions
'use server';

import type { EstadoPedidoContext, Pedido } from '../../src/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Server Action — corre en el servidor, llama al backend NestJS
// El Client Component la llama como una función normal
export async function enviarComanda(
    pedido: EstadoPedidoContext
): Promise<{ ok: true; pedidoId: string } | { ok: false; error: string }> {

    if (!BASE_URL) {
        return { ok: false, error: 'NEXT_PUBLIC_API_URL no configurada' };
    }

    try {
        const res = await fetch(`${BASE_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mesaId: pedido.mesaId,
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

