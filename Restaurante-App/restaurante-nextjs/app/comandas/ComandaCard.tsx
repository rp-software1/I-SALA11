'use client';

import { useTransition } from 'react';
import type { Pedido, EstadoPedido } from '../../src/types';
import { avanzarEstadoPedido } from './actions';

const SIGUIENTE: Partial<Record<EstadoPedido, EstadoPedido>> = {
  pendiente: 'en_preparacion',
  en_preparacion: 'lista',
  lista: 'entregada',
};

const CONFIG: Record<EstadoPedido, { color: string; label: string }> = {
  pendiente:      { color: 'bg-orange-100 border-orange-400 text-orange-800', label: 'Pendiente' },
  en_preparacion: { color: 'bg-blue-100 border-blue-400 text-blue-800',   label: 'En preparación' },
  lista:          { color: 'bg-purple-100 border-purple-400 text-purple-800', label: 'Lista' },
  entregada:      { color: 'bg-green-100 border-green-400 text-green-800',  label: 'Entregada' },
  cancelada:      { color: 'bg-gray-100 border-gray-400 text-gray-600',    label: 'Cancelada' },
  cerrada:        { color: 'bg-gray-100 border-gray-400 text-gray-600',    label: 'Cerrada' },
};

export default function ComandaCard({ pedido }: { pedido: Pedido }) {
  const [isPending, startTransition] = useTransition();
  const config = CONFIG[pedido.estado] ?? CONFIG.cancelada;
  const siguiente = SIGUIENTE[pedido.estado];
  const hora = new Date(pedido.creadoEn).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAvanzar = (): void => {
    if (!siguiente) return;
    startTransition(async () => {
      const r = await avanzarEstadoPedido(pedido._id, siguiente);
      if (!r.ok) alert(`Error: ${r.error}`);
    });
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${config.color}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-bold text-sm">
            {pedido.tipo === 'mesa' ? `Mesa ${pedido.mesaId ?? '?'}` : 'Para llevar'}
          </span>
          <span className="ml-2 text-xs opacity-75">{hora}</span>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
          {config.label}
        </span>
      </div>

      <ul className="text-sm mb-3 space-y-1">
        {pedido.items.map(item => (
          <li key={item.platoId} className="flex justify-between">
            <span>{item.cantidad}x {item.nombre}</span>
            <span>S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold text-sm border-t border-current/20 pt-2 mb-3">
        <span>Total</span>
        <span>S/ {pedido.total.toFixed(2)}</span>
      </div>

      {siguiente && (
        <button
          onClick={handleAvanzar}
          disabled={isPending}
          className="w-full py-2 rounded bg-white/70 hover:bg-white/90 text-sm font-medium disabled:opacity-50"
        >
          {isPending
            ? 'Actualizando...'
            : `Marcar como: ${CONFIG[siguiente].label}`}
        </button>
      )}
    </div>
  );
}
