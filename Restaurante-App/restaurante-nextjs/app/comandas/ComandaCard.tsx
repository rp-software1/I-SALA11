'use client';

import { useState, useEffect, useTransition } from 'react';
import type { Pedido, EstadoPedido } from '../../src/types';
import { avanzarEstadoPedido } from './actions';

const ORDEN_ESTADOS: EstadoPedido[] = ['pendiente', 'en_preparacion', 'lista', 'entregada', 'cancelada', 'cerrada'];

const SIGUIENTE: Partial<Record<EstadoPedido, EstadoPedido>> = {
  pendiente: 'en_preparacion',
  en_preparacion: 'lista',
  lista: 'entregada',
};

const CONFIG: Record<string, { color: string; bg: string; border: string; label: string }> = {
  pendiente:      { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'Pendiente' },
  en_preparacion: { color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200',   label: 'Preparación' },
  lista:          { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', label: 'Lista' },
  entregada:      { color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  label: 'Entregada' },
  cancelada:      { color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200',   label: 'Cancelada' },
  cerrada:        { color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200',   label: 'Cerrada' },
};

const ESTADOS_PROGRESO: EstadoPedido[] = ['pendiente', 'en_preparacion', 'lista', 'entregada'];

function TiempoTranscurrido({ creadoEn }: { creadoEn: string }) {
  const [ahora, setAhora] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setAhora(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.floor((ahora - new Date(creadoEn).getTime()) / 60000);
  if (diff < 1) return <span>Ahora</span>;

  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return <span>{h}h {m}m</span>;
  return <span>{m} min</span>;
}

function BarraProgreso({ estado }: { estado: EstadoPedido }) {
  const idxActual = ORDEN_ESTADOS.indexOf(estado);
  if (idxActual >= 4) return null;

  return (
    <div className="flex items-center gap-1 mb-3">
      {ESTADOS_PROGRESO.map((e, i) => {
        const completado = i <= idxActual;
        return (
          <div key={e} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full h-1.5 rounded-full transition-colors duration-300 ${completado ? 'bg-brand-500' : 'bg-gray-200'}`} />
            <span className={`text-[10px] font-medium ${completado ? 'text-brand-600' : 'text-gray-400'}`}>
              {CONFIG[e].label.slice(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function ComandaCard({ pedido }: { pedido: Pedido }) {
  const [isPending, startTransition] = useTransition();
  const config = CONFIG[pedido.estado] ?? CONFIG.cancelada;
  const siguiente = SIGUIENTE[pedido.estado];
  const hora = new Date(pedido.creadoEn).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAvanzar = () => {
    if (!siguiente) return;
    startTransition(async () => {
      const r = await avanzarEstadoPedido(pedido._id, siguiente);
      if (!r.ok) alert(`Error: ${r.error}`);
    });
  };

  return (
    <div className={`rounded-xl border-2 ${config.border} ${config.bg} p-5 transition-all duration-300 ${isPending ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.color.replace('text', 'bg')}`} />
          <div>
            <span className="font-bold text-sm text-gray-900">
              {pedido.tipo === 'mesa' ? `Mesa ${pedido.mesaId ?? '?'}` : 'Para llevar'}
            </span>
            <span className="ml-2 text-xs text-gray-500">{hora}</span>
          </div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
          {config.label}
        </span>
      </div>

      <BarraProgreso estado={pedido.estado} />

      <ul className="text-sm space-y-1.5 mb-3">
        {pedido.items.map(item => (
          <li key={item.platoId} className="flex justify-between text-gray-700">
            <span>
              <span className="font-medium text-gray-900">{item.cantidad}x</span> {item.nombre}
            </span>
            <span className="text-gray-500">S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center border-t border-current/10 pt-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <TiempoTranscurrido creadoEn={pedido.creadoEn} />
        </div>
        <span className="font-bold text-sm text-gray-900">S/ {pedido.total.toFixed(2)}</span>
      </div>

      {siguiente && (
        <button
          onClick={handleAvanzar}
          disabled={isPending}
          className="w-full py-2.5 rounded-lg bg-white/80 hover:bg-white text-sm font-medium text-gray-700 border border-gray-200 transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Actualizando...
            </span>
          ) : (
            `Marcar: ${CONFIG[siguiente].label}`
          )}
        </button>
      )}
    </div>
  );
}
