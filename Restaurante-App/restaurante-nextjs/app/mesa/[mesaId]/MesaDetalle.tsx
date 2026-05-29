'use client';

import { useState, useTransition } from 'react';
import type { Mesa, EstadoMesa } from '../../../src/types';
import { cambiarEstadoMesa } from './actions';

interface MesaDetalleProps {
  mesa: Mesa;
}

const ESTADOS: { valor: EstadoMesa; etiqueta: string; color: string; icon: string }[] = [
  { valor: 'disponible', etiqueta: 'Disponible', color: 'bg-green-600 hover:bg-green-700 active:bg-green-800', icon: '✓' },
  { valor: 'ocupada', etiqueta: 'Ocupada', color: 'bg-red-600 hover:bg-red-700 active:bg-red-800', icon: '👤' },
  { valor: 'reservada', etiqueta: 'Reservada', color: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700', icon: '📅' },
  { valor: 'fuera_servicio', etiqueta: 'Fuera servicio', color: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700', icon: '✕' },
];

export default function MesaDetalle({ mesa }: MesaDetalleProps) {
  const [estadoActual, setEstadoActual] = useState<EstadoMesa>(mesa.estado);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  const handleCambiarEstado = (nuevoEstado: EstadoMesa) => {
    if (nuevoEstado === estadoActual) return;

    startTransition(async () => {
      const resultado = await cambiarEstadoMesa(mesa._id, nuevoEstado);
      if (resultado.ok) {
        setEstadoActual(nuevoEstado);
        setToast(`Estado cambiado a: ${ESTADOS.find(e => e.valor === nuevoEstado)?.etiqueta}`);
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast(`Error: ${resultado.error}`);
        setTimeout(() => setToast(null), 4000);
      }
    });
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Cambiar estado
        </h2>
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map(({ valor, etiqueta, color, icon }) => (
            <button
              key={valor}
              onClick={() => handleCambiarEstado(valor)}
              disabled={isPending || valor === estadoActual}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200
                ${color}
                ${valor === estadoActual ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'opacity-80 hover:opacity-100'}
                ${isPending ? 'opacity-50 cursor-wait' : ''}
                ${!isPending && valor !== estadoActual ? 'hover:shadow-md hover:-translate-y-0.5 active:scale-95' : ''}
              `}
            >
              <span className="text-base">{icon}</span>
              {valor === estadoActual ? `✓ ${etiqueta}` : etiqueta}
            </button>
          ))}
        </div>
        {isPending && (
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Actualizando...
          </div>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-in-right
          ${toast.startsWith('Error') ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}
        `}>
          <div className="flex items-center gap-2">
            <span>{toast.startsWith('Error') ? '✕' : '✓'}</span>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
