import { NextResponse } from 'next/server';
import type { Pedido, EstadoPedido, TipoPedido, ItemPedido } from '../../../src/types';

let pedidos: Pedido[] = [];

function calcularTotal(items: ItemPedido[]) {
  return items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
}

export async function GET() {
  return NextResponse.json({ pedidos });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { mesaId = null, tipo = 'mesa', items } = body as {
    mesaId?: string | null;
    tipo?: TipoPedido;
    items: ItemPedido[];
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'El pedido debe contener al menos un plato.' }, { status: 400 });
  }

  const total = calcularTotal(items);
  const nuevoPedido: Pedido = {
    _id: `pedido_${Date.now()}`,
    mesaId,
    tipo,
    estado: 'pendiente',
    items,
    total,
    creadoEn: new Date().toISOString(),
    actualizadoEn: new Date().toISOString()
  };

  pedidos.push(nuevoPedido);

  return NextResponse.json(nuevoPedido, { status: 201 });
}
