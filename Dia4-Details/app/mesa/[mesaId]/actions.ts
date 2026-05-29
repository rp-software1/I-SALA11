'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoMesa, Mesa } from '../../../src/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function cambiarEstadoMesa(
  mesaId: string,
  nuevoEstado: EstadoMesa
): Promise<{ ok: true; mesa: Mesa } | { ok: false; error: string }> {
  if (!BASE_URL) {
    return { ok: false, error: 'NEXT_PUBLIC_API_URL no configurada' };
  }

  try {
    const res = await fetch(`${BASE_URL}/mesas/${mesaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const texto = await res.text();
      return { ok: false, error: `Error ${res.status}: ${texto}` };
    }

    const mesaActualizada: Mesa = await res.json();

    revalidatePath('/mesas');
    revalidatePath(`/mesa/${mesaId}`);

    return { ok: true, mesa: mesaActualizada };
  } catch (err: unknown) {
    const mensaje = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: mensaje };
  }
}
